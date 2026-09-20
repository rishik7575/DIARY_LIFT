/**
 * DairyLift Investment & Asset Allocation Service
 * Manages institutional plans, illustrative yield models (1.5% base + bonus), and application drafts.
 * NOTE: All return values are illustrative mock calculations. Returns are not guaranteed.
 */

import { InvestorProfile, DividendLedgerEntry, YieldReserveHealth } from '../types/investor';
import { INVESTOR_PROFILES, PLATFORM_YIELD_RESERVE_HEALTH, INVESTMENT_PACKAGES } from '../mockData/investors';

let investorsStore: InvestorProfile[] = [...INVESTOR_PROFILES];

export interface InvestmentPlanConfig {
  id: string;
  name: string;
  minimumContributionINR: number;
  tenureMonths: number;
  baselineMonthlyYieldRate: number;     // 0.015 = 1.5% monthly base
  performanceBonusCeiling: number;      // 0.005 = 0.5% max dynamic bonus
  targetCattleAllocation: string;
  insuranceUnderwriter: string;
  riskCategory: 'Low-Medium' | 'Medium' | 'Conservative';
  illustrativeAnnualRunRateAPY: string; // '18.0% - 24.0% APY (Illustrative)'
  riskDisclosureText: string;
  isAcceptingApplications: boolean;
}

export const INVESTMENT_PLANS: InvestmentPlanConfig[] = [
  {
    id: 'plan-starter-heifer',
    name: 'Starter Heifer Allocation',
    minimumContributionINR: 100000,
    tenureMonths: 12,
    baselineMonthlyYieldRate: 0.015,
    performanceBonusCeiling: 0.005,
    targetCattleAllocation: '1x Registered Heifer / Gestation Transition',
    insuranceUnderwriter: 'The New India Assurance Co. Ltd.',
    riskCategory: 'Conservative',
    illustrativeAnnualRunRateAPY: '18.0% Base (Illustrative)',
    riskDisclosureText:
      'Livestock performance is subject to natural agricultural cycles, gestation periods, and veterinary factors. Baseline cashflow is supported by the DairyLift Yield Reserve Health Fund.',
    isAcceptingApplications: true,
  },
  {
    id: 'plan-milking-gir',
    name: 'Milking Gir Cow Unit',
    minimumContributionINR: 250000,
    tenureMonths: 24,
    baselineMonthlyYieldRate: 0.015,
    performanceBonusCeiling: 0.005,
    targetCattleAllocation: '2x Purebred A2 Gir Cows (Lactating)',
    insuranceUnderwriter: 'The New India Assurance Co. Ltd.',
    riskCategory: 'Low-Medium',
    illustrativeAnnualRunRateAPY: '18.0% - 24.0% (Illustrative)',
    riskDisclosureText:
      'Milk production bonuses fluctuate monthly based on verifiable parlour meter logs. Principal capital is fully covered by mortality insurance.',
    isAcceptingApplications: true,
  },
  {
    id: 'plan-commercial-herd',
    name: 'Commercial Dairy Herd',
    minimumContributionINR: 500000,
    tenureMonths: 36,
    baselineMonthlyYieldRate: 0.015,
    performanceBonusCeiling: 0.005,
    targetCattleAllocation: '2x A2 Gir Cows + 2x Murrah Buffaloes',
    insuranceUnderwriter: 'The New India Assurance Co. Ltd.',
    riskCategory: 'Medium',
    illustrativeAnnualRunRateAPY: '18.0% - 24.0% (Illustrative)',
    riskDisclosureText:
      'High-fat Murrah milk participation generates enhanced performance bonuses during peak winter lactation months.',
    isAcceptingApplications: true,
  },
];

export interface InvestmentApplicationDraft {
  planId: string;
  applicantName: string;
  email: string;
  phone: string;
  panNumber: string;
  allocatedAmountINR: number;
  acceptedRiskDisclosure: boolean;
}

export const investmentService = {
  /**
   * List available investment opportunity plans
   */
  async getPlans(): Promise<InvestmentPlanConfig[]> {
    await new Promise((res) => setTimeout(res, 40));
    return [...INVESTMENT_PLANS];
  },

  /**
   * Get single plan by ID
   */
  async getPlanById(id: string): Promise<InvestmentPlanConfig | null> {
    await new Promise((res) => setTimeout(res, 30));
    return INVESTMENT_PLANS.find((p) => p.id === id) || null;
  },

  /**
   * Get investor profile and historical portfolio
   */
  async getPortfolio(investorId: string): Promise<InvestorProfile | null> {
    await new Promise((res) => setTimeout(res, 50));
    return investorsStore.find((inv) => inv.id === investorId) || investorsStore[0] || null;
  },

  /**
   * Get platform-wide Yield Reserve Health metric
   */
  async getYieldReserveHealth(): Promise<YieldReserveHealth> {
    await new Promise((res) => setTimeout(res, 30));
    return { ...PLATFORM_YIELD_RESERVE_HEALTH };
  },

  /**
   * Submit application draft (subject to legal compliance and eligibility verification)
   */
  async submitApplication(draft: InvestmentApplicationDraft): Promise<{ success: boolean; applicationId: string; message: string }> {
    await new Promise((res) => setTimeout(res, 100));

    if (!draft.acceptedRiskDisclosure) {
      throw new Error('You must review and accept the statutory agricultural risk disclosure.');
    }
    if (draft.allocatedAmountINR <= 0) {
      throw new Error('Please specify a valid capital allocation amount.');
    }

    const appId = `APP-DL-${Date.now().toString().slice(-6)}`;
    return {
      success: true,
      applicationId: appId,
      message: 'Application draft received. Our compliance officer will review your KYC documents within 24 hours.',
    };
  },

  /**
   * Calculate illustrative scenario (NOT a guarantee)
   */
  calculateIllustrativeScenario(amountINR: number) {
    const monthlyBase = Math.round(amountINR * 0.015);
    const estimatedBonusAvg = Math.round(amountINR * 0.0038); // ~0.38% average bonus
    const totalEstimatedMonthly = monthlyBase + estimatedBonusAvg;
    const totalEstimatedAnnual = totalEstimatedMonthly * 12;

    return {
      amountINR,
      monthlyBaseINR: monthlyBase,
      estimatedMonthlyBonusINR: estimatedBonusAvg,
      totalEstimatedMonthlyINR: totalEstimatedMonthly,
      totalEstimatedAnnualINR: totalEstimatedAnnual,
      isIllustrative: true,
      disclaimer:
        'ILLUSTRATIVE SCENARIO ONLY. Returns are dependent on live biological milk production and are not guaranteed.',
    };
  },
};
