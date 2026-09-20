/**
 * DairyLift Veterinary Health & IoT Anomaly Service
 * Handles IoT collar alerts, vaccination schedules, and health checkup reports
 */

import { VeterinaryAlertFlag } from '../types/farm';
import { VETERINARY_ALERTS } from '../mockData/farm';

let alertsStore: VeterinaryAlertFlag[] = [...VETERINARY_ALERTS];

export interface NewHealthReportInput {
  cattleId: string;
  rfidTag: string;
  cattleName: string;
  assignedInvestorId: string | null;
  diagnosis: string;
  treatmentNotes: string;
  followUpDate: string; // YYYY-MM-DD
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO';
  veterinarianName: string;
}

export const healthService = {
  /**
   * Retrieve active veterinary alerts
   */
  async getAlerts(filter?: { status?: string }): Promise<VeterinaryAlertFlag[]> {
    await new Promise((res) => setTimeout(res, 35));
    if (!filter?.status || filter.status === 'all') return [...alertsStore];
    return alertsStore.filter((a) => a.status === filter.status);
  },

  /**
   * Acknowledge and resolve an IoT alert
   */
  async acknowledgeAlert(id: string, notes?: string): Promise<VeterinaryAlertFlag> {
    await new Promise((res) => setTimeout(res, 50));
    const index = alertsStore.findIndex((a) => a.id === id);
    if (index === -1) throw new Error(`Alert ${id} not found`);

    alertsStore[index] = {
      ...alertsStore[index],
      status: 'RESOLVED',
      resolvedAt: new Date().toISOString(),
      treatmentProtocolPrescribed: notes || alertsStore[index].treatmentProtocolPrescribed,
    };
    return alertsStore[index];
  },

  /**
   * File a veterinary health report and generate linked alert
   */
  async createHealthReport(input: NewHealthReportInput): Promise<VeterinaryAlertFlag> {
    await new Promise((res) => setTimeout(res, 80));

    if (!input.diagnosis || !input.followUpDate) {
      throw new Error('Diagnosis and follow-up date are mandatory for veterinary records.');
    }

    const created: VeterinaryAlertFlag = {
      id: `ALT-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(alertsStore.length + 1).padStart(2, '0')}`,
      timestamp: new Date().toISOString(),
      cattleId: input.cattleId,
      rfidTag: input.rfidTag,
      cattleName: input.cattleName,
      assignedInvestorId: input.assignedInvestorId,
      alertType: 'MASTITIS_EARLY_WARNING',
      severity: input.severity,
      headline: `Veterinary Checkup: ${input.diagnosis.slice(0, 60)}`,
      detailedDiagnosis: `${input.diagnosis} | Follow-up mandatory by: ${input.followUpDate}`,
      telemetrySnapshot: {
        metricName: 'Clinical Observation',
        recordedValue: 'Physical Exam Completed',
        referenceRange: 'Routine Inspection',
      },
      assignedVeterinarian: input.veterinarianName,
      status: 'IN_TREATMENT',
      treatmentProtocolPrescribed: input.treatmentNotes,
    };

    alertsStore = [created, ...alertsStore];
    return created;
  },
};
