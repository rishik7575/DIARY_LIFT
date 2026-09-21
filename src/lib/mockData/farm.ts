/**
 * Dairy-Lift Enterprise Mock Dataset: Daily Farm Operations & Veterinary Logs
 * Relational Entity adhering to DailyMilkLogRecord and VeterinaryAlertFlag
 */

import {
  DailyMilkLogRecord,
  VeterinaryAlertFlag,
  FarmFacilityMetrics,
  VaccinationScheduleItem,
  CalfBirthRecord,
} from '../types/farm';

export const FARM_FACILITY_OVERVIEW: FarmFacilityMetrics = {
  facilityId: 'FAC-NSK-01',
  name: 'Nashik High-Tech Agro-Park Unit A',
  location: 'Dindori Valley Agro-Zone, Nashik, Maharashtra 422007',
  totalCattleCount: 1280,
  milkingCount: 1045,
  dryCount: 185,
  quarantineCount: 50,
  todayTotalMilkProducedLiters: 15840.5,
  averageFat: 4.85,
  averageSnf: 9.12,
  activeVetAlerts: 4,
  coldChainTemperatureCelsius: 3.6, // Monitored sub-zero cold chain
};

const RAW_DAILY_MILK_LOGS: DailyMilkLogRecord[] = [
  {
    id: 'LOG-20260920-001',
    date: '2026-09-20',
    cattleId: 'DL-C-001',
    rfidTag: 'DL-8824-A2',
    cattleName: 'Radha',
    assignedInvestorId: 'INV-DL-1001', // Arjun Mehta
    amYieldLiters: 8.2,
    pmYieldLiters: 7.4,
    totalDailyYieldLiters: 15.6,
    quality: {
      fatPercentage: 4.75,
      snfPercentage: 9.10,
      proteinPercentage: 3.42,
      somaticCellCountThousands: 88, // Very low SCC = pristine quality
      microbialQualityGrade: 'Grade-A+',
      sampleTestedTimestamp: '2026-09-20T12:15:00Z',
      labTechnicianName: 'Sanjay More, Senior Dairy Chemist',
      compositeQualityIndex: 98.6,
    },
    batchApproval: 'APPROVED_PREMIUM_COMMERCE',
    milkingSessionId: 'AM-PARLOUR-04',
    automatedMeterSerial: 'DELAVAL-MTR-8824',
    destinationSiloId: 'SILO-A2-FLASH-01',
    operatorEmployeeId: 'EMP-STF-082',
    operatorNotes: 'Robotic cluster attachment seamless. Teat condition optimal.',
  },
  {
    id: 'LOG-20260920-002',
    date: '2026-09-20',
    cattleId: 'DL-C-002',
    rfidTag: 'DL-9102-A2',
    cattleName: 'Gauri',
    assignedInvestorId: 'INV-DL-1001', // Arjun Mehta
    amYieldLiters: 7.6,
    pmYieldLiters: 6.8,
    totalDailyYieldLiters: 14.4,
    quality: {
      fatPercentage: 4.60,
      snfPercentage: 8.95,
      proteinPercentage: 3.38,
      somaticCellCountThousands: 110,
      microbialQualityGrade: 'Grade-A+',
      sampleTestedTimestamp: '2026-09-20T12:18:00Z',
      labTechnicianName: 'Sanjay More, Senior Dairy Chemist',
      compositeQualityIndex: 96.4,
    },
    batchApproval: 'APPROVED_PREMIUM_COMMERCE',
    milkingSessionId: 'AM-PARLOUR-04',
    automatedMeterSerial: 'DELAVAL-MTR-9102',
    destinationSiloId: 'SILO-A2-FLASH-01',
    operatorEmployeeId: 'EMP-STF-082',
  },
  {
    id: 'LOG-20260920-003',
    date: '2026-09-20',
    cattleId: 'DL-C-003',
    rfidTag: 'DL-7341-A2',
    cattleName: 'Kamadhenu',
    assignedInvestorId: 'INV-DL-1002', // Dr. Sunita Rao
    amYieldLiters: 8.9,
    pmYieldLiters: 7.9,
    totalDailyYieldLiters: 16.8,
    quality: {
      fatPercentage: 4.80,
      snfPercentage: 9.15,
      proteinPercentage: 3.50,
      somaticCellCountThousands: 72,
      microbialQualityGrade: 'Grade-A+',
      sampleTestedTimestamp: '2026-09-20T12:22:00Z',
      labTechnicianName: 'Sanjay More, Senior Dairy Chemist',
      compositeQualityIndex: 99.2,
    },
    batchApproval: 'APPROVED_PREMIUM_COMMERCE',
    milkingSessionId: 'AM-PARLOUR-02',
    automatedMeterSerial: 'DELAVAL-MTR-7341',
    destinationSiloId: 'SILO-A2-FLASH-01',
    operatorEmployeeId: 'EMP-STF-045',
    operatorNotes: 'Peak lactation performance. Reserved for Single-Origin Bilona Ghee processing.',
  },
  {
    id: 'LOG-20260920-004',
    date: '2026-09-20',
    cattleId: 'DL-C-004',
    rfidTag: 'DL-7342-A2',
    cattleName: 'Surabhi',
    assignedInvestorId: 'INV-DL-1002', // Dr. Sunita Rao
    amYieldLiters: 7.9,
    pmYieldLiters: 7.1,
    totalDailyYieldLiters: 15.0,
    quality: {
      fatPercentage: 4.65,
      snfPercentage: 9.02,
      proteinPercentage: 3.40,
      somaticCellCountThousands: 94,
      microbialQualityGrade: 'Grade-A+',
      sampleTestedTimestamp: '2026-09-20T12:25:00Z',
      labTechnicianName: 'Sanjay More, Senior Dairy Chemist',
      compositeQualityIndex: 97.0,
    },
    batchApproval: 'APPROVED_PREMIUM_COMMERCE',
    milkingSessionId: 'AM-PARLOUR-02',
    automatedMeterSerial: 'DELAVAL-MTR-7342',
    destinationSiloId: 'SILO-A2-FLASH-01',
    operatorEmployeeId: 'EMP-STF-045',
  },
  {
    id: 'LOG-20260920-005',
    date: '2026-09-20',
    cattleId: 'DL-C-005',
    rfidTag: 'DL-4029-MB',
    cattleName: 'Yamuna',
    assignedInvestorId: 'INV-DL-1002', // Dr. Sunita Rao
    amYieldLiters: 7.1,
    pmYieldLiters: 6.4,
    totalDailyYieldLiters: 13.5,
    quality: {
      fatPercentage: 7.25, // Rich Murrah buffalo fat
      snfPercentage: 9.35,
      proteinPercentage: 4.10,
      somaticCellCountThousands: 105,
      microbialQualityGrade: 'Grade-A+',
      sampleTestedTimestamp: '2026-09-20T12:30:00Z',
      labTechnicianName: 'Pooja Patil, QC Officer',
      compositeQualityIndex: 98.4,
    },
    batchApproval: 'APPROVED_PREMIUM_COMMERCE',
    milkingSessionId: 'AM-PARLOUR-BUFF-01',
    automatedMeterSerial: 'GEA-BUFF-4029',
    destinationSiloId: 'SILO-BUFF-COLD-02',
    operatorEmployeeId: 'EMP-STF-019',
    operatorNotes: 'Exceptional 7.25% fat content. Tagged for Artisanal Malai Paneer batch #MP-984.',
  },
  {
    id: 'LOG-20260920-006',
    date: '2026-09-20',
    cattleId: 'DL-C-006',
    rfidTag: 'DL-4030-MB',
    cattleName: 'Ganga',
    assignedInvestorId: 'INV-DL-1002', // Dr. Sunita Rao
    amYieldLiters: 6.8,
    pmYieldLiters: 6.2,
    totalDailyYieldLiters: 13.0,
    quality: {
      fatPercentage: 7.40,
      snfPercentage: 9.40,
      proteinPercentage: 4.15,
      somaticCellCountThousands: 112,
      microbialQualityGrade: 'Grade-A+',
      sampleTestedTimestamp: '2026-09-20T12:32:00Z',
      labTechnicianName: 'Pooja Patil, QC Officer',
      compositeQualityIndex: 98.0,
    },
    batchApproval: 'APPROVED_PREMIUM_COMMERCE',
    milkingSessionId: 'AM-PARLOUR-BUFF-01',
    automatedMeterSerial: 'GEA-BUFF-4030',
    destinationSiloId: 'SILO-BUFF-COLD-02',
    operatorEmployeeId: 'EMP-STF-019',
  },
  {
    id: 'LOG-20260920-020',
    date: '2026-09-20',
    cattleId: 'DL-C-020',
    rfidTag: 'DL-9844-A2',
    cattleName: 'Kaveri',
    assignedInvestorId: 'INV-DL-1001', // Arjun Mehta
    amYieldLiters: 5.6,
    pmYieldLiters: 4.8,
    totalDailyYieldLiters: 10.4,
    quality: {
      fatPercentage: 4.40,
      snfPercentage: 8.70,
      proteinPercentage: 3.20,
      somaticCellCountThousands: 280, // Elevated SCC triggering auto-alert
      microbialQualityGrade: 'Grade-B',
      sampleTestedTimestamp: '2026-09-20T12:40:00Z',
      labTechnicianName: 'Pooja Patil, QC Officer',
      compositeQualityIndex: 78.2,
    },
    batchApproval: 'PENDING_LAB_VERIFICATION', // Quarantined milk pending vet clearance
    milkingSessionId: 'INFIRMARY-ISOLATION-01',
    automatedMeterSerial: 'DELAVAL-MTR-9844',
    destinationSiloId: 'SILO-ISOLATION-09',
    operatorEmployeeId: 'EMP-STF-003',
    operatorNotes: 'Slight yield reduction noted. Milk diverted to isolation chiller. Vet notified.',
  },
];

export const DAILY_MILK_LOGS: DailyMilkLogRecord[] = RAW_DAILY_MILK_LOGS.map((l) => ({
  ...l,
  morningYield: l.amYieldLiters,
  eveningYield: l.pmYieldLiters,
  totalYield: l.totalDailyYieldLiters,
  milkedBy: l.operatorEmployeeId,
  notes: l.operatorNotes || '',
}));


export const VETERINARY_ALERTS: VeterinaryAlertFlag[] = [
  {
    id: 'ALT-20260920-01',
    timestamp: '2026-09-20T06:14:22Z',
    cattleId: 'DL-C-020',
    rfidTag: 'DL-9844-A2',
    cattleName: 'Kaveri',
    assignedInvestorId: 'INV-DL-1001',
    alertType: 'IoT_TEMPERATURE_SPIKE',
    severity: 'HIGH',
    headline: 'Slight fever detected via IoT collar sensor #DL-9844-A2',
    detailedDiagnosis:
      'Collar biometric telemetry recorded core body temperature spike to 39.2°C (baseline 38.5°C). 24h rumination time dropped by 18% (490 mins -> 405 mins). Milk diverted to isolation silo.',
    telemetrySnapshot: {
      metricName: 'Core Body Temperature',
      recordedValue: '39.2°C',
      referenceRange: '38.3°C - 38.8°C',
    },
    assignedVeterinarian: 'Dr. Rajesh Deshmukh, MVSc',
    status: 'IN_TREATMENT',
    treatmentProtocolPrescribed:
      'Herbal antipyretic drench (guduchi + neem decoction) administered. Blood smear taken; no tick-borne parasites found. Cattle relocated to Shed-09 Infirmary.',
  },
  {
    id: 'ALT-20260920-02',
    timestamp: '2026-09-20T08:30:10Z',
    cattleId: 'DL-C-002',
    rfidTag: 'DL-9102-A2',
    cattleName: 'Gauri',
    assignedInvestorId: 'INV-DL-1001',
    alertType: 'VACCINATION_DUE',
    severity: 'INFO',
    headline: 'Bi-annual Foot & Mouth Disease (FMD) booster scheduled',
    detailedDiagnosis:
      'Scheduled preventive FMD Raksha-Ovac vaccination booster due within 14 days. Cold chain verified batch #FMD-IN-2026-09 in farm medical inventory.',
    telemetrySnapshot: {
      metricName: 'Vaccine Validity Window',
      recordedValue: 'Due in 12 days',
      referenceRange: 'Every 180 days',
    },
    assignedVeterinarian: 'Dr. Rajesh Deshmukh, MVSc',
    status: 'OPEN',
  },
  {
    id: 'ALT-20260920-03',
    timestamp: '2026-09-19T14:45:00Z',
    cattleId: 'DL-C-019',
    rfidTag: 'DL-5512-SH',
    cattleName: 'Nandini',
    assignedInvestorId: 'INV-DL-1004',
    alertType: 'DRY_CYCLE_TRANSITION',
    severity: 'INFO',
    headline: 'Dry Cycle Care Plan: First Gestation Trimester 3 Transition',
    detailedDiagnosis:
      'Animal transitioned successfully to Maternity Shed-01. Zero milk extraction; daily ration enriched with mineral chelate boluses and organic calcium buffer. 1.5% baseline investor payout backstopped by Yield Reserve Health fund.',
    telemetrySnapshot: {
      metricName: 'Gestation Progress',
      recordedValue: 'Day 240 / 283',
      referenceRange: 'Full Term: ~283 days',
    },
    assignedVeterinarian: 'Dr. Rajesh Deshmukh, MVSc',
    status: 'RESOLVED',
    resolvedAt: '2026-09-19T16:00:00Z',
  },
];

export const FARM_ALERTS = VETERINARY_ALERTS;
export const VACCINATION_SCHEDULE: VaccinationScheduleItem[] = [];
export const CALF_BIRTH_RECORDS: CalfBirthRecord[] = [];

// Legacy interface aliases for backward compatibility during phased UI rewrite
export type FarmAlert = Record<string, unknown>;
export type DailyMilkLog = Record<string, unknown>;
export type VaccinationSchedule = Record<string, unknown>;

