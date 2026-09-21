/**
 * Dairy-Lift Enterprise Mock Dataset: Investor Profiles & Financial Ledgers
 * Sustainable Model: 1.5% Base Yield (18% APY) + Dynamic Performance Bonus (up to 0.5%)
 */

import { InvestorProfile, YieldReserveHealth } from '../types/investor';

export const PLATFORM_YIELD_RESERVE_HEALTH: YieldReserveHealth = {
  reserveRatio: 1.45,                     // 145% coverage against projected 12-month dry transitions
  reserveBalanceINR: 84500000,            // ₹8.45 Crores dedicated escrow buffer
  stressCoverageMonths: 6.4,              // 6.4 months of baseline 1.5% payouts fully backstopped
  stabilityIndex: 'OPTIMAL',
  drySeasonBufferAllocatedINR: 28000000,  // ₹2.80 Crores for dry cattle nutrition & vet care
  lastAuditDate: '2026-09-01',
  auditedBy: 'National Agritech Risk Assurance & Escrow Advisory',
};

export const INVESTOR_PROFILES: InvestorProfile[] = [
  {
    id: 'INV-DL-1001',
    fullName: 'Arjun Mehta',
    email: 'investor@dairylift.com',
    phone: '+91 98201 44819',
    panNumber: 'AAAPM8821K',
    kycStatus: 'VERIFIED',
    tier: 'Growth Partner',
    joinDate: '2024-03-01',
    avatarInitials: 'AM',
    bankDetails: {
      accountHolderName: 'Arjun Mehta',
      bankName: 'HDFC Bank Ltd.',
      accountNumberMasked: 'XXXX-XXXX-8821',
      ifscCode: 'HDFC0000128',
      accountType: 'SAVINGS',
    },
    portfolio: {
      totalInvestedINR: 250000,
      activeCattleCount: 2,
      allocatedCattleIds: ['DL-C-001', 'DL-C-002'],
      baselineMonthlyYieldRate: 0.015,     // 1.5% monthly base
      currentPerformanceBonusRate: 0.0038, // +0.38% dynamic milk bonus
      blendedMonthlyYieldRate: 0.0188,     // 1.88% effective monthly
      annualizedRunRateAPY: 0.2256,        // 22.56% APY
      totalDividendsPaidToDateINR: 70500,  // Historical cumulative disbursements
      unrealizedAppreciationINR: 20000,    // Asset appraisal gain (₹2,70,000 total cattle valuation)
      currentPortfolioValuationINR: 270000,
      yieldReserveHealth: PLATFORM_YIELD_RESERVE_HEALTH,
      dividendLedger: [
        {
          payoutId: 'DIV-2026-09-1001',
          periodMonth: '2026-09',
          disbursementDate: '2026-09-01',
          totalCapitalBaseINR: 250000,
          baselineYieldRate: 0.015,
          baselinePayoutAmountINR: 3750,
          performanceBonusRate: 0.0038,
          performanceBonusAmountINR: 950,
          totalDisbursedAmountINR: 4700,
          effectiveMonthlyYieldRate: 0.0188,
          annualizedEquivalentAPY: 0.2256,
          transactionReference: 'HDFC-NEFT-DL99482101',
          payoutStatus: 'DISBURSED',
          cattleYieldBreakdown: [
            {
              cattleId: 'DL-C-001',
              rfidTag: 'DL-8824-A2',
              cattleName: 'Radha',
              litersProducedMonthly: 456,
              bonusPercentageGranted: 0.0042,
              bonusAmountINR: 546,
            },
            {
              cattleId: 'DL-C-002',
              rfidTag: 'DL-9102-A2',
              cattleName: 'Gauri',
              litersProducedMonthly: 423,
              bonusPercentageGranted: 0.0034,
              bonusAmountINR: 404,
            },
          ],
        },
        {
          payoutId: 'DIV-2026-08-1001',
          periodMonth: '2026-08',
          disbursementDate: '2026-08-01',
          totalCapitalBaseINR: 250000,
          baselineYieldRate: 0.015,
          baselinePayoutAmountINR: 3750,
          performanceBonusRate: 0.0040,
          performanceBonusAmountINR: 1000,
          totalDisbursedAmountINR: 4750,
          effectiveMonthlyYieldRate: 0.0190,
          annualizedEquivalentAPY: 0.2280,
          transactionReference: 'HDFC-NEFT-DL99182310',
          payoutStatus: 'DISBURSED',
          cattleYieldBreakdown: [
            {
              cattleId: 'DL-C-001',
              rfidTag: 'DL-8824-A2',
              cattleName: 'Radha',
              litersProducedMonthly: 462,
              bonusPercentageGranted: 0.0044,
              bonusAmountINR: 572,
            },
            {
              cattleId: 'DL-C-002',
              rfidTag: 'DL-9102-A2',
              cattleName: 'Gauri',
              litersProducedMonthly: 430,
              bonusPercentageGranted: 0.0036,
              bonusAmountINR: 428,
            },
          ],
        },
        {
          payoutId: 'DIV-2026-07-1001',
          periodMonth: '2026-07',
          disbursementDate: '2026-07-01',
          totalCapitalBaseINR: 250000,
          baselineYieldRate: 0.015,
          baselinePayoutAmountINR: 3750,
          performanceBonusRate: 0.0036,
          performanceBonusAmountINR: 900,
          totalDisbursedAmountINR: 4650,
          effectiveMonthlyYieldRate: 0.0186,
          annualizedEquivalentAPY: 0.2232,
          transactionReference: 'HDFC-NEFT-DL98842109',
          payoutStatus: 'DISBURSED',
          cattleYieldBreakdown: [
            {
              cattleId: 'DL-C-001',
              rfidTag: 'DL-8824-A2',
              cattleName: 'Radha',
              litersProducedMonthly: 445,
              bonusPercentageGranted: 0.0040,
              bonusAmountINR: 520,
            },
            {
              cattleId: 'DL-C-002',
              rfidTag: 'DL-9102-A2',
              cattleName: 'Gauri',
              litersProducedMonthly: 418,
              bonusPercentageGranted: 0.0032,
              bonusAmountINR: 380,
            },
          ],
        },
      ],
    },
  },
  {
    id: 'INV-DL-1002',
    fullName: 'Dr. Sunita Rao',
    email: 'sunita.rao@blr-cardio.org',
    phone: '+91 98450 11928',
    panNumber: 'ABCPR4419E',
    kycStatus: 'VERIFIED',
    tier: 'Institutional Co-Owner',
    joinDate: '2024-05-15',
    avatarInitials: 'SR',
    bankDetails: {
      accountHolderName: 'Dr. Sunita Rao',
      bankName: 'ICICI Bank Ltd.',
      accountNumberMasked: 'XXXX-XXXX-4419',
      ifscCode: 'ICIC0000047',
      accountType: 'SAVINGS',
    },
    portfolio: {
      totalInvestedINR: 500000,
      activeCattleCount: 4,
      allocatedCattleIds: ['DL-C-003', 'DL-C-004', 'DL-C-005', 'DL-C-006'],
      baselineMonthlyYieldRate: 0.015,     // 1.5% base
      currentPerformanceBonusRate: 0.0044, // +0.44% dynamic bonus
      blendedMonthlyYieldRate: 0.0194,     // 1.94% effective
      annualizedRunRateAPY: 0.2328,        // 23.28% APY
      totalDividendsPaidToDateINR: 155200,
      unrealizedAppreciationINR: 44000,    // Total cattle valuation ₹5,44,000
      currentPortfolioValuationINR: 544000,
      yieldReserveHealth: PLATFORM_YIELD_RESERVE_HEALTH,
      dividendLedger: [
        {
          payoutId: 'DIV-2026-09-1002',
          periodMonth: '2026-09',
          disbursementDate: '2026-09-01',
          totalCapitalBaseINR: 500000,
          baselineYieldRate: 0.015,
          baselinePayoutAmountINR: 7500,
          performanceBonusRate: 0.0044,
          performanceBonusAmountINR: 2200,
          totalDisbursedAmountINR: 9700,
          effectiveMonthlyYieldRate: 0.0194,
          annualizedEquivalentAPY: 0.2328,
          transactionReference: 'ICICI-NEFT-DL99482102',
          payoutStatus: 'DISBURSED',
          cattleYieldBreakdown: [
            {
              cattleId: 'DL-C-003',
              rfidTag: 'DL-7341-A2',
              cattleName: 'Kamadhenu',
              litersProducedMonthly: 495,
              bonusPercentageGranted: 0.0048,
              bonusAmountINR: 648,
            },
            {
              cattleId: 'DL-C-004',
              rfidTag: 'DL-7342-A2',
              cattleName: 'Surabhi',
              litersProducedMonthly: 444,
              bonusPercentageGranted: 0.0040,
              bonusAmountINR: 500,
            },
            {
              cattleId: 'DL-C-005',
              rfidTag: 'DL-4029-MB',
              cattleName: 'Yamuna',
              litersProducedMonthly: 396,
              bonusPercentageGranted: 0.0044,
              bonusAmountINR: 528,
            },
            {
              cattleId: 'DL-C-006',
              rfidTag: 'DL-4030-MB',
              cattleName: 'Ganga',
              litersProducedMonthly: 384,
              bonusPercentageGranted: 0.0044,
              bonusAmountINR: 528,
            },
          ],
        },
      ],
    },
  },
  {
    id: 'INV-DL-1004',
    fullName: 'Priya Sharma',
    email: 'priya.sharma@innovate.co.in',
    phone: '+91 97110 33890',
    panNumber: 'BZXPS1920L',
    kycStatus: 'VERIFIED',
    tier: 'Starter Allocation',
    joinDate: '2024-08-01',
    avatarInitials: 'PS',
    bankDetails: {
      accountHolderName: 'Priya Sharma',
      bankName: 'Axis Bank Ltd.',
      accountNumberMasked: 'XXXX-XXXX-9102',
      ifscCode: 'UTIB0000010',
      accountType: 'SAVINGS',
    },
    portfolio: {
      totalInvestedINR: 100000,
      activeCattleCount: 1,
      allocatedCattleIds: ['DL-C-019'],
      baselineMonthlyYieldRate: 0.015,     // 1.5% fixed base
      currentPerformanceBonusRate: 0.0000, // 0% dynamic bonus (Cow is currently in Dry / Transition cycle)
      blendedMonthlyYieldRate: 0.0150,     // 1.50% illustrative baseline modeled from Yield Reserve buffer
      annualizedRunRateAPY: 0.1800,        // 18.00% APY
      totalDividendsPaidToDateINR: 3000,
      unrealizedAppreciationINR: 5000,
      currentPortfolioValuationINR: 105000,
      yieldReserveHealth: PLATFORM_YIELD_RESERVE_HEALTH,
      dividendLedger: [
        {
          payoutId: 'DIV-2026-09-1004',
          periodMonth: '2026-09',
          disbursementDate: '2026-09-01',
          totalCapitalBaseINR: 100000,
          baselineYieldRate: 0.015,
          baselinePayoutAmountINR: 1500, // Protected payout during dry cycle
          performanceBonusRate: 0.0000,
          performanceBonusAmountINR: 0,
          totalDisbursedAmountINR: 1500,
          effectiveMonthlyYieldRate: 0.0150,
          annualizedEquivalentAPY: 0.1800,
          transactionReference: 'AXIS-NEFT-DL99482104',
          payoutStatus: 'DISBURSED',
          cattleYieldBreakdown: [
            {
              cattleId: 'DL-C-019',
              rfidTag: 'DL-5512-SH',
              cattleName: 'Nandini',
              litersProducedMonthly: 0, // In dry/gestation period; 100% funded by Platform Yield Reserve Buffer
              bonusPercentageGranted: 0.0,
              bonusAmountINR: 0,
            },
          ],
        },
      ],
    },
  },
];

export const INVESTORS: Record<string, unknown>[] = INVESTOR_PROFILES.map((p) => ({
  ...p,
  name: p.fullName,
  totalInvested: p.portfolio.totalInvestedINR,
  currentValuation: p.portfolio.currentPortfolioValuationINR,
  totalEarned: p.portfolio.totalDividendsPaidToDateINR,
  cattleIds: p.portfolio.allocatedCattleIds,
  monthlyYields: p.portfolio.dividendLedger.map((d) => ({
    month: d.periodMonth,
    projected: d.baselinePayoutAmountINR + d.performanceBonusAmountINR,
    actual: d.totalDisbursedAmountINR,
    paid: d.payoutStatus === 'DISBURSED',
  })),
  nextPayoutDate: '2026-10-01',
  nextPayoutAmount: Math.round(p.portfolio.totalInvestedINR * p.portfolio.blendedMonthlyYieldRate),
}));

// Legacy interface aliases for backward compatibility during phased UI rewrite
export type Investor = Record<string, unknown>;
export type MonthlyYield = Record<string, unknown>;

export const INVESTMENT_PACKAGES = [
  {
    id: 'starter',
    name: 'Starter Allocation',
    price: 100000,
    monthlyYield: 1500,
    monthlyYieldPercent: 1.5,
    tenure: '12 Months',
    risk: 'Low',
    cattleCount: 1,
    cattleAllocated: '1x Registered Heifer / Gestation Transition',
    features: [
      '1.5% fixed monthly base yield (18% APY)',
      'Protected by Yield Reserve Health buffer during dry cycles',
      '100% Livestock mortality insurance',
      'Full capital returned at tenure end',
    ],
  },
  {
    id: 'growth',
    name: 'Milking Gir Cow Unit',
    price: 250000,
    monthlyYield: 4700,
    monthlyYieldPercent: 1.88,
    tenure: '24 Months',
    risk: 'Low-Medium',
    cattleCount: 2,
    cattleAllocated: '2x Purebred Lactating Gir Cows',
    features: [
      '1.5% fixed monthly base yield + up to 0.5% performance bonus',
      'Live IoT collar telemetry & RFID health dashboard',
      'Direct monthly NEFT dividend credit on the 1st',
      'Operational Livestock Mortality Coverage Model',
    ],
  },
  {
    id: 'institutional',
    name: 'Commercial Dairy Herd',
    price: 500000,
    monthlyYield: 9700,
    monthlyYieldPercent: 1.94,
    tenure: '36 Months',
    risk: 'Medium',
    cattleCount: 4,
    cattleAllocated: '2x A2 Gir Cows + 2x Murrah Buffaloes',
    features: [
      '1.5% fixed monthly base yield + performance milk bonus',
      'High-fat Murrah buffalo milk revenue participation',
      'Dedicated institutional relationship manager',
      'Quarterly physical farm inspection & audit pass',
    ],
  },
];


