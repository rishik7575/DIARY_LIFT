/**
 * DairyLift Milk Production & Quality Analysis Service
 * Asynchronous service interface with duplicate detection and quality grading
 */

import { DailyMilkLogRecord, BatchApprovalStatus } from '../types/farm';
import { DAILY_MILK_LOGS } from '../mockData/farm';

let milkLogsStore: DailyMilkLogRecord[] = [...DAILY_MILK_LOGS];

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
    await new Promise((res) => setTimeout(res, 40));
    if (!date) return [...milkLogsStore];
    return milkLogsStore.filter((log) => log.date === date);
  },

  /**
   * Log milking session with domain validation & duplicate detection
   */
  async logMilking(input: NewMilkingEntryInput, cattleLookup: { name: string; rfidTag: string; investorId: string | null }): Promise<DailyMilkLogRecord> {
    await new Promise((res) => setTimeout(res, 80));

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
      const updatedTotal = (input.session === 'AM' ? input.yieldLiters : existing.amYieldLiters) +
                           (input.session === 'PM' ? input.yieldLiters : existing.pmYieldLiters);

      const updatedRecord: DailyMilkLogRecord = {
        ...existing,
        amYieldLiters: input.session === 'AM' ? input.yieldLiters : existing.amYieldLiters,
        pmYieldLiters: input.session === 'PM' ? input.yieldLiters : existing.pmYieldLiters,
        totalDailyYieldLiters: Math.round(updatedTotal * 10) / 10,
        operatorNotes: input.notes ? `${existing.operatorNotes || ''} | ${input.notes}` : existing.operatorNotes,
      };

      milkLogsStore[existingLogIndex] = updatedRecord;
      return updatedRecord;
    }

    // Calculate quality grade
    const compositeScore = Math.min(100, Math.round((input.fatPercentage * 10) + (input.snfPercentage * 5)));
    const grade = compositeScore >= 90 ? 'Grade-A+' : compositeScore >= 80 ? 'Grade-A' : 'Grade-B';
    const batchApproval: BatchApprovalStatus = grade === 'Grade-A+' ? 'APPROVED_PREMIUM_COMMERCE' : 'APPROVED_BULK_DAIRY';

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
      // Legacy compatibility
      morningYield: input.session === 'AM' ? input.yieldLiters : 0,
      eveningYield: input.session === 'PM' ? input.yieldLiters : 0,
      totalYield: input.yieldLiters,
      milkedBy: input.operatorEmployeeId,
      notes: input.notes || '',
    };

    milkLogsStore = [newRecord, ...milkLogsStore];
    return newRecord;
  },

  /**
   * Aggregate daily production metrics
   */
  async getDailyStats(date?: string): Promise<{ totalLiters: number; avgFat: number; avgSnf: number; recordCount: number }> {
    await new Promise((res) => setTimeout(res, 30));
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
