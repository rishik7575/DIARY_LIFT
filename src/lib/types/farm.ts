/**
 * Dairy-Lift Enterprise Farm Operations & Staff ERP Type Definitions
 * Relational Entity: Daily Milk Logs and IoT Veterinary Alerts
 */

export type BatchApprovalStatus =
  | 'APPROVED_PREMIUM_COMMERCE'   // Routed to 12-min Q-Commerce at ₹95/L
  | 'APPROVED_BULK_DAIRY'        // Standard commercial processing
  | 'PENDING_LAB_VERIFICATION'   // Under somatic cell / antibiotic testing
  | 'RETAINED_FOR_CALF_FEEDING'  // Colostrum or transition milk
  | 'REJECTED_CONTAMINATED';     // Flushed from line

export interface QualityAnalysisScore {
  fatPercentage: number;          // Target: 4.2% - 5.2% (Gir), 6.5% - 7.8% (Murrah)
  snfPercentage: number;          // Solid-Not-Fat, Target: > 8.5%
  proteinPercentage: number;      // A2 Beta-Casein, Target: > 3.2%
  somaticCellCountThousands: number; // Health marker: < 150k is Grade A+
  microbialQualityGrade: 'Grade-A+' | 'Grade-A' | 'Grade-B' | 'Sub-Standard';
  sampleTestedTimestamp: string;  // ISO 8601 UTC
  labTechnicianName: string;
  compositeQualityIndex: number;  // 0 - 100 benchmark
}

export interface DailyMilkLogRecord {
  id: string;                     // Primary Key (e.g., 'LOG-20260920-001')
  date: string;                   // YYYY-MM-DD
  cattleId: string;               // Foreign Key -> CattleAsset.id
  rfidTag: string;                // Hardware RFID tag
  cattleName: string;
  assignedInvestorId: string | null; // Foreign Key -> InvestorProfile.id
  amYieldLiters: number;          // Morning session (e.g., 7.8 L)
  pmYieldLiters: number;          // Evening session (e.g., 6.7 L)
  totalDailyYieldLiters: number;  // Combined daily volume (e.g., 14.5 L)
  quality: QualityAnalysisScore;
  batchApproval: BatchApprovalStatus;
  milkingSessionId: string;       // E.g., 'AM-PARLOUR-02'
  automatedMeterSerial: string;   // E.g., 'DELAVAL-MTR-4091'
  destinationSiloId: string;      // E.g., 'SILO-A2-FLASH-01'
  operatorEmployeeId: string;     // Staff member who verified line
  operatorNotes?: string;
  // Backward compatibility fields for legacy staff UI prior to full component rewrite
  morningYield?: number;
  eveningYield?: number;
  totalYield?: number;
  milkedBy?: string;
  notes?: string;
}


export type VetAlertSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO';

export type VetAlertType =
  | 'IoT_TEMPERATURE_SPIKE'
  | 'RUMINATION_DEFICIT'
  | 'MASTITIS_EARLY_WARNING'
  | 'VACCINATION_DUE'
  | 'DRY_CYCLE_TRANSITION'
  | 'CALVING_PREDICTION';

export interface VeterinaryAlertFlag {
  id: string;                     // Primary Key (e.g., 'ALT-20260920-01')
  timestamp: string;              // ISO 8601 UTC
  cattleId: string;               // Foreign Key -> CattleAsset.id
  rfidTag: string;                // Hardware RFID tag
  cattleName: string;
  assignedInvestorId: string | null; // Foreign Key -> InvestorProfile.id
  alertType: VetAlertType;
  severity: VetAlertSeverity;
  headline: string;               // Concise alert summary
  detailedDiagnosis: string;      // Veterinary description
  telemetrySnapshot: {
    metricName: string;
    recordedValue: string | number;
    referenceRange: string;
  };
  assignedVeterinarian: string;   // Registered BVSc / MVSc vet
  status: 'OPEN' | 'IN_TREATMENT' | 'RESOLVED';
  treatmentProtocolPrescribed?: string;
  resolvedAt?: string;
}

export interface FarmFacilityMetrics {
  facilityId: string;
  name: string;
  location: string;
  totalCattleCount: number;
  milkingCount: number;
  dryCount: number;
  quarantineCount: number;
  todayTotalMilkProducedLiters: number;
  averageFat: number;
  averageSnf: number;
  activeVetAlerts: number;
  coldChainTemperatureCelsius: number; // Must stay < 4.0°C
}

export interface VaccinationScheduleItem {
  id: string;
  cattleId: string;
  disease: string;
  vaccineName: string;
  scheduledDate: string;
  status: 'pending' | 'completed' | 'overdue';
  veterinarianName: string;
  batchNumber: string;
}

export interface CalfBirthRecord {
  id: string;
  calfId: string;
  motherCattleId: string;
  motherName: string;
  dateOfBirth: string;
  gender: 'female' | 'male';
  birthWeightKg: number;
  breed: string;
  name?: string;
}

