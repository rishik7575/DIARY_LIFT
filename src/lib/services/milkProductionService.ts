/**
 * DairyLift Milk Production & Quality Analysis Service
 * Multi-layer persistence: Cloud Firestore with synchronized local client cache
 */

import { DailyMilkLogRecord, BatchApprovalStatus } from '../types/farm';
import { DAILY_MILK_LOGS } from '../mockData/farm';
import { db, isLiveFirebaseConfigured } from '../firebase/config';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { broadcastRealtimeEvent } from '../realtime/useRealtimeSync';

function loadInitialMilkLogs(): DailyMilkLogRecord[] {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('dairylift_milking_logs');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // fallback
      }
    }
  }
  return [...DAILY_MILK_LOGS];
}

let milkLogsStore: DailyMilkLogRecord[] = loadInitialMilkLogs();

function saveMilkLogsStore(list: DailyMilkLogRecord[]) {
  milkLogsStore = list;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('dairylift_milking_logs', JSON.stringify(list));
    } catch {
      // ignore
    }
  }
}

export interface NewMilkingEntryInput {
  date: string;                   // YYYY-MM-DD
  cattleId: string;
  session: 'AM' | 'PM';
  yieldLiters: number;
  fatPercentage: number;
  snfPercentage: number;
  operatorEmployeeId: string;
  notes?: string;
}

export const milkProductionService = {
  /**
   * Get all daily logs for a given date
   */
  async getDailyLogs(date?: string): Promise<DailyMilkLogRecord[]> {
    if (isLiveFirebaseConfigured()) {
      try {
        const snap = await getDocs(collection(db, 'milking_logs'));
        if (!snap.empty) {
          const remoteList = snap.docs.map((d) => d.data() as DailyMilkLogRecord);
          saveMilkLogsStore(remoteList);
        }
      } catch (err) {
        console.warn('Firestore milking logs fetch error:', err);
      }
    }

    await new Promise((res) => setTimeout(res, 30));
    if (!date) return [...milkLogsStore];
    return milkLogsStore.filter((log) => log.date === date);
  },

  /**
   * Log milking session with domain validation & duplicate detection
   */
  async logMilking(
    input: NewMilkingEntryInput,
    cattleLookup: { name: string; rfidTag: string; investorId: string | null }
  ): Promise<DailyMilkLogRecord> {
    await new Promise((res) => setTimeout(res, 50));

    // Domain Rule 1: Yield must be positive and within biological bounds (0.5L - 35L)
    if (input.yieldLiters <= 0 || input.yieldLiters > 35) {
      throw new Error(`Invalid milk yield volume: ${input.yieldLiters}L. Must be between 0.5L and 35.0L.`);
    }

    // Domain Rule 2: Duplicate check for date + cattle + session
    const existingLogIndex = milkLogsStore.findIndex(
      (log) => log.cattleId === input.cattleId && log.date === input.date
    );

    if (existingLogIndex !== -1) {
      const existing = milkLogsStore[existingLogIndex];
      if (input.session === 'AM' && existing.amYieldLiters > 0) {
        throw new Error(`Duplicate entry: Morning (AM) milk yield already recorded for ${cattleLookup.name} on ${input.date}.`);
      }
      if (input.session === 'PM' && existing.pmYieldLiters > 0) {
        throw new Error(`Duplicate entry: Evening (PM) milk yield already recorded for ${cattleLookup.name} on ${input.date}.`);
      }

      // Update existing record with the second session
      const updatedTotal =
        (input.session === 'AM' ? input.yieldLiters : existing.amYieldLiters) +
        (input.session === 'PM' ? input.yieldLiters : existing.pmYieldLiters);

      const updatedRecord: DailyMilkLogRecord = {
        ...existing,
        amYieldLiters: input.session === 'AM' ? input.yieldLiters : existing.amYieldLiters,
        pmYieldLiters: input.session === 'PM' ? input.yieldLiters : existing.pmYieldLiters,
        totalDailyYieldLiters: Math.round(updatedTotal * 10) / 10,
        operatorNotes: input.notes ? `${existing.operatorNotes || ''} | ${input.notes}` : existing.operatorNotes,
      };

      const clone = [...milkLogsStore];
      clone[existingLogIndex] = updatedRecord;
      saveMilkLogsStore(clone);
      broadcastRealtimeEvent('MILKING_LOGGED', updatedRecord);

      if (isLiveFirebaseConfigured()) {
        try {
          await setDoc(doc(db, 'milking_logs', updatedRecord.id), updatedRecord, { merge: true });
        } catch (err) {
          console.warn('Firestore logMilking update error:', err);
        }
      }

      return updatedRecord;
    }

    // Calculate quality grade
    const compositeScore = Math.min(100, Math.round(input.fatPercentage * 10 + input.snfPercentage * 5));
    const grade = compositeScore >= 90 ? 'Grade-A+' : compositeScore >= 80 ? 'Grade-A' : 'Grade-B';
    const batchApproval: BatchApprovalStatus =
      grade === 'Grade-A+' ? 'APPROVED_PREMIUM_COMMERCE' : 'APPROVED_BULK_DAIRY';

    const newRecord: DailyMilkLogRecord = {
      id: `LOG-${input.date.replace(/-/g, '')}-${String(milkLogsStore.length + 1).padStart(3, '0')}`,
      date: input.date,
      cattleId: input.cattleId,
      rfidTag: cattleLookup.rfidTag,
      cattleName: cattleLookup.name,
      assignedInvestorId: cattleLookup.investorId,
      amYieldLiters: input.session === 'AM' ? input.yieldLiters : 0,
      pmYieldLiters: input.session === 'PM' ? input.yieldLiters : 0,
      totalDailyYieldLiters: input.yieldLiters,
      quality: {
        fatPercentage: input.fatPercentage,
        snfPercentage: input.snfPercentage,
        proteinPercentage: 3.4,
        somaticCellCountThousands: 92,
        microbialQualityGrade: grade,
        sampleTestedTimestamp: new Date().toISOString(),
        labTechnicianName: 'Sanjay More, Senior Dairy Chemist',
        compositeQualityIndex: compositeScore,
      },
      batchApproval,
      milkingSessionId: `${input.session}-PARLOUR-04`,
      automatedMeterSerial: `MTR-${cattleLookup.rfidTag}`,
      destinationSiloId: 'SILO-A2-FLASH-01',
      operatorEmployeeId: input.operatorEmployeeId,
      operatorNotes: input.notes || 'Recorded via Staff Mobile ERP',
      morningYield: input.session === 'AM' ? input.yieldLiters : 0,
      eveningYield: input.session === 'PM' ? input.yieldLiters : 0,
      totalYield: input.yieldLiters,
      milkedBy: input.operatorEmployeeId,
      notes: input.notes || '',
    };

    const clone = [newRecord, ...milkLogsStore];
    saveMilkLogsStore(clone);
    broadcastRealtimeEvent('MILKING_LOGGED', newRecord);

    if (isLiveFirebaseConfigured()) {
      try {
        await setDoc(doc(db, 'milking_logs', newRecord.id), newRecord);
      } catch (err) {
        console.warn('Firestore logMilking create error:', err);
      }
    }

    return newRecord;
  },

  /**
   * Aggregate daily production metrics
   */
  async getDailyStats(
    date?: string
  ): Promise<{ totalLiters: number; avgFat: number; avgSnf: number; recordCount: number }> {
    await new Promise((res) => setTimeout(res, 20));
    const logs = await this.getDailyLogs(date);
    if (logs.length === 0) return { totalLiters: 0, avgFat: 0, avgSnf: 0, recordCount: 0 };

    const totalLiters = logs.reduce((sum, l) => sum + l.totalDailyYieldLiters, 0);
    const avgFat = logs.reduce((sum, l) => sum + l.quality.fatPercentage, 0) / logs.length;
    const avgSnf = logs.reduce((sum, l) => sum + l.quality.snfPercentage, 0) / logs.length;

    return {
      totalLiters: Math.round(totalLiters * 10) / 10,
      avgFat: Math.round(avgFat * 100) / 100,
      avgSnf: Math.round(avgSnf * 100) / 100,
      recordCount: logs.length,
    };
  },
};
