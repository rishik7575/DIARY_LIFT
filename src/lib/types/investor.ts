/**
 * Dairy-Lift Enterprise Investor & Financial Ledger Type Definitions
 * Sustainable Model: Fixed 1.5% monthly base yield (18% APY) + dynamic Performance Bonus (up to 0.5%)
 */

export interface CattleYieldContribution {
  cattleId: string;                   // Foreign Key -> CattleAsset.id
  rfidTag: string;                    // Hardware RFID tag
  cattleName: string;
  litersProducedMonthly: number;      // Actual milk yield recorded for the month
  bonusPercentageGranted: number;     // E.g., 0.0038 = 0.38%
  bonusAmountINR: number;             // Monetary bonus generated
}

export interface DividendLedgerEntry {
  payoutId: string;                   // Primary Key (e.g., 'DIV-2026-09-INV1001')
  periodMonth: string;                // YYYY-MM (e.g., '2026-09')
  disbursementDate: string;           // YYYY-MM-DD
  totalCapitalBaseINR: number;        // Principal under management
  baselineYieldRate: number;          // Fixed 0.015 (1.5% monthly)
  baselinePayoutAmountINR: number;    // E.g., ₹3,750 on ₹2,50,000
  performanceBonusRate: number;       // Dynamic rate (0.000 to 0.005)
  performanceBonusAmountINR: number;  // Dynamic bonus amount (e.g., ₹950)
  totalDisbursedAmountINR: number;    // Baseline + Performance bonus
  effectiveMonthlyYieldRate: number;  // Combined yield rate (e.g., 1.88%)
  annualizedEquivalentAPY: number;    // Effective APY (e.g., 22.56%)
  transactionReference: string;       // Bank UTR / NEFT reference
  payoutStatus: 'DISBURSED' | 'PROCESSING' | 'ESCROW_ALLOCATED';
  cattleYieldBreakdown: CattleYieldContribution[];
}

export interface YieldReserveHealth {
  reserveRatio: number;               // E.g., 1.45 = 145% of statutory requirement
  reserveBalanceINR: number;          // Liquid platform cash buffer (e.g., ₹8,45,00,000)
  stressCoverageMonths: number;       // Months of uninterrupted 1.5% payouts supported during dry cycles
  stabilityIndex: 'OPTIMAL' | 'STABLE' | 'WATCHLIST';
  drySeasonBufferAllocatedINR: number;// Capital earmarked specifically for dry cattle maintenance
  lastAuditDate: string;              // YYYY-MM-DD
  auditedBy: string;                  // Independent CA firm
}

export interface InvestorPortfolio {
  totalInvestedINR: number;           // Total active principal (e.g., ₹2,50,000)
  activeCattleCount: number;          // Number of live cattle assets assigned
  allocatedCattleIds: string[];       // Foreign Keys -> CattleAsset.id[]
  baselineMonthlyYieldRate: number;   // Invariant: 0.015 (1.5% per month)
  currentPerformanceBonusRate: number;// Dynamic bonus (e.g., 0.0038 = 0.38%)
  blendedMonthlyYieldRate: number;    // Baseline + Bonus (e.g., 0.0188 = 1.88%)
  annualizedRunRateAPY: number;       // Blended rate * 12 (e.g., 22.56%)
  totalDividendsPaidToDateINR: number;// Historical cumulative cash received
  unrealizedAppreciationINR: number;  // Livestock asset value growth
  currentPortfolioValuationINR: number;
  dividendLedger: DividendLedgerEntry[];
  yieldReserveHealth: YieldReserveHealth;
}

export interface BankAccountDetails {
  accountHolderName: string;
  bankName: string;
  accountNumberMasked: string;
  ifscCode: string;
  accountType: 'SAVINGS' | 'CURRENT';
}

export interface InvestorProfile {
  id: string;                         // Primary Key (e.g., 'INV-DL-1001')
  fullName: string;
  email: string;
  phone: string;
  panNumber: string;                  // Indian PAN format
  kycStatus: 'VERIFIED' | 'PENDING' | 'ACTION_REQUIRED';
  tier: 'Starter Allocation' | 'Growth Partner' | 'Institutional Co-Owner';
  joinDate: string;                   // YYYY-MM-DD
  avatarInitials: string;
  bankDetails: BankAccountDetails;
  portfolio: InvestorPortfolio;
}

export type PlanLifecycleStatus = 'DRAFT' | 'IN_REVIEW' | 'PUBLISHED' | 'ARCHIVED';

export interface PlanAuditLogEntry {
  timestamp: string;
  action: string;
  author: string;
  diffSummary: string;
  previousStatus?: PlanLifecycleStatus;
  newStatus?: PlanLifecycleStatus;
}

export interface InvestmentPlanConfig {
  id: string;
  name: string;
  minimumContributionINR: number;
  tenureMonths: number;
  baselineMonthlyYieldRate: number;     // 0.015 = 1.5% monthly base
  performanceBonusCeiling: number;      // 0.005 = 0.5% max dynamic bonus
  targetCattleAllocation: string;
  riskCategory: 'Low-Medium' | 'Medium' | 'Conservative';
  illustrativeAnnualRunRateAPY: string; // '18.0% - 24.0% APY (Illustrative Demo)'
  riskDisclosureText: string;
  lifecycleStatus: PlanLifecycleStatus;
  version: string;
  effectiveDate: string;
  affectsExistingInvestors: boolean;   // false prevents retroactively altering existing agreements
  auditHistory: PlanAuditLogEntry[];
}

