/**
 * Dairy-Lift Enterprise Cattle & Livestock Asset Type Definitions
 * Relational Entity: Cattle Asset (1:N with DailyMilkLogs, N:1 with InvestorProfile)
 */

export type CattleBreed =
  | 'A2_GIR_COW'
  | 'MURRAH_BUFFALO'
  | 'SAHIWAL_COW'
  | 'JAFFRABADI_BUFFALO';

export type BiologicalStatus =
  | 'Milking'
  | 'Dry'
  | 'Medical Observation'
  | 'Transition / Calving';

export type CattleHealthCondition =
  | 'Optimal'
  | 'Under Observation'
  | 'Medical Treatment'
  | 'Quarantine';

export interface LactationMetrics {
  lactationNumber: number;            // E.g., 2nd or 3rd lactation
  daysInMilk: number;                 // Days since last calving (DIM)
  currentDailyYieldLiters: number;    // Today's aggregate yield
  peakYieldLiters: number;            // Historical lactation peak
  fatPercentage: number;              // Current milk fat % (e.g., 4.65)
  snfPercentage: number;              // Solid-not-fat % (e.g., 8.95)
  proteinPercentage: number;          // A2 beta-casein protein %
}

export interface CattleTelemetry {
  dailyAverageYieldLiters: number;    // Rolling 30-day average
  liveHealthScore: number;            // 0 - 100 composite index from collar
  ruminationMinutesPerDay: number;    // Normal range: 450 - 520 mins
  coreTemperatureCelsius: number;     // Normal range: 38.3 - 38.8°C
  activityIndex: number;              // Percentage of active grazing vs resting
  lastTelemetrySync: string;          // ISO 8601 UTC timestamp
  lastVetVisitDate: string;           // YYYY-MM-DD
  nextScheduledCheckup: string;       // YYYY-MM-DD
  collarBatteryLevel: number;         // Percentage 0 - 100
  iotDeviceSerial: string;            // Smart collar hardware ID
}

export interface InsurancePolicy {
  policyNumber: string;
  underwriter: string;                // E.g., 'The New India Assurance Co. Ltd.'
  sumInsuredINR: number;              // 100% of purchase price / valuation
  coverageType: 'COMPREHENSIVE_LIVESTOCK_MORTALITY';
  validFrom: string;
  validUntil: string;
  status: 'ACTIVE' | 'PENDING_RENEWAL' | 'CLAIM_SETTLED';
}

export interface FarmAllocation {
  facilityId: string;
  facilityName: string;
  shedNumber: string;
  penId: string;
  pastureZone: string;
  leadVeterinarian: string;
}

export interface CattleAsset {
  id: string;                         // Primary Key (e.g., 'DL-C-001')
  rfidTag: string;                    // Hardware RFID Tag (e.g., 'DL-8824-A2')
  earTagNumber: string;               // INAPH National Tag (e.g., 'IN-MH-NSK-8824')
  name: string;                       // Asset nickname (e.g., 'Radha')
  breed: CattleBreed;
  dateOfBirth: string;                // YYYY-MM-DD
  assignedInvestorId: string | null;  // Foreign Key -> InvestorProfile.id
  costBasisINR: number;               // Capital allocation price (e.g., ₹1,30,000)
  currentValuationINR: number;        // Fair market value after vet appraisal
  biologicalStatus: BiologicalStatus;
  healthCondition: CattleHealthCondition;
  lactation: LactationMetrics;
  telemetry: CattleTelemetry;
  insurance: InsurancePolicy;
  farmAllocation: FarmAllocation;
  performanceTier: 'A+' | 'A' | 'B+';
  monthlyBonusContributionRate: number; // 0.000 to 0.005 (up to 0.5% dynamic bonus)
}
