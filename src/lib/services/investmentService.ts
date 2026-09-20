/**
 * DairyLift Investment & Asset Allocation Service
 * Manages institutional plans, illustrative yield models (1.5% base + bonus), and plan governance lifecycle.
 * Workflow: Draft -> Review -> Published -> Archived
 * NOTE: All return values are illustrative mock calculations. Returns are not guaranteed.
 */

import {
  InvestorProfile,
  DividendLedgerEntry,
  YieldReserveHealth,
  InvestmentPlanConfig,
  PlanLifecycleStatus,
  PlanAuditLogEntry,
} from '../types/investor';
import { INVESTOR_PROFILES, PLATFORM_YIELD_RESERVE_HEALTH } from '../mockData/investors';

export { type InvestmentPlanConfig, type PlanLifecycleStatus, type PlanAuditLogEntry };

let investorsStore: InvestorProfile[] = [...INVESTOR_PROFILES];

export const INITIAL_INVESTMENT_PLANS: InvestmentPlanConfig[] = [
  {
    id: 'plan-starter-heifer',
    name: 'Starter Heifer Allocation',
    minimumContributionINR: 100000,
    tenureMonths: 12,
    baselineMonthlyYieldRate: 0.015,
    performanceBonusCeiling: 0.005,
    targetCattleAllocation: '1x Registered Heifer / Gestation Transition',
    riskCategory: 'Conservative',
    illustrativeAnnualRunRateAPY: '18.0% Base (Illustrative Demo)',
    riskDisclosureText:
      'Livestock performance is subject to natural biological cycles. Projections are sample illustrations; capital is supported by the 145% Yield Reserve buffer.',
    lifecycleStatus: 'PUBLISHED',
    version: 'v2.1',
    effectiveDate: '2026-08-01',
    affectsExistingInvestors: false,
    auditHistory: [
      {
        timestamp: '2026-07-28T09:00:00Z',
        action: 'CREATED_DRAFT',
        author: 'Kavita Iyer (Head of Agritech Finance)',
        diffSummary: 'Initial plan parameters drafted with 1.5% fixed base.',
        previousStatus: undefined,
        newStatus: 'DRAFT',
      },
      {
        timestamp: '2026-07-30T14:30:00Z',
        action: 'SUBMITTED_FOR_REVIEW',
        author: 'Kavita Iyer',
        diffSummary: 'Terms validated against mortality insurance policies.',
        previousStatus: 'DRAFT',
        newStatus: 'IN_REVIEW',
      },
      {
        timestamp: '2026-08-01T10:00:00Z',
        action: 'APPROVED_AND_PUBLISHED',
        author: 'Siddharth Nair (Managing Director)',
        diffSummary: 'Executive sign-off. Published to co-ownership discovery.',
        previousStatus: 'IN_REVIEW',
        newStatus: 'PUBLISHED',
      },
    ],
  },
  {
    id: 'plan-milking-gir',
    name: 'Milking Gir Cow Unit',
    minimumContributionINR: 250000,
    tenureMonths: 24,
    baselineMonthlyYieldRate: 0.015,
    performanceBonusCeiling: 0.005,
    targetCattleAllocation: '2x Purebred A2 Gir Cows (Lactating)',
    riskCategory: 'Low-Medium',
    illustrativeAnnualRunRateAPY: '18.0% - 24.0% (Illustrative Demo)',
    riskDisclosureText:
      'Milk performance bonuses fluctuate monthly based on certified parlour meter logs. Principal capital is covered by mortality insurance policies.',
    lifecycleStatus: 'PUBLISHED',
    version: 'v3.0',
    effectiveDate: '2026-09-01',
    affectsExistingInvestors: false,
    auditHistory: [
      {
        timestamp: '2026-08-25T11:00:00Z',
        action: 'SUBMITTED_FOR_REVIEW',
        author: 'Kavita Iyer',
        diffSummary: 'Updated parlour bonus criteria based on Q2 yield audit.',
        previousStatus: 'DRAFT',
        newStatus: 'IN_REVIEW',
      },
      {
        timestamp: '2026-09-01T08:00:00Z',
        action: 'APPROVED_AND_PUBLISHED',
        author: 'Siddharth Nair',
        diffSummary: 'Approved and published for Q3 allocations.',
        previousStatus: 'IN_REVIEW',
        newStatus: 'PUBLISHED',
      },
    ],
  },
  {
    id: 'plan-commercial-herd',
    name: 'Commercial Dairy Herd',
    minimumContributionINR: 500000,
    tenureMonths: 36,
    baselineMonthlyYieldRate: 0.015,
    performanceBonusCeiling: 0.005,
    targetCattleAllocation: '2x A2 Gir Cows + 2x Murrah Buffaloes',
    riskCategory: 'Medium',
    illustrativeAnnualRunRateAPY: '18.0% - 24.0% (Illustrative Demo)',
    riskDisclosureText:
      'High-fat Murrah milk participation generates enhanced seasonal performance bonuses during winter peak lactation.',
    lifecycleStatus: 'PUBLISHED',
    version: 'v2.4',
    effectiveDate: '2026-07-15',
    affectsExistingInvestors: false,
    auditHistory: [
      {
        timestamp: '2026-07-15T12:00:00Z',
        action: 'APPROVED_AND_PUBLISHED',
        author: 'Siddharth Nair',
        diffSummary: 'Commercial herd parameters approved.',
        previousStatus: 'IN_REVIEW',
        newStatus: 'PUBLISHED',
      },
    ],
  },
  {
    id: 'plan-draft-solar-paddock',
    name: 'Solar Agri-Pasture Expansion Unit',
    minimumContributionINR: 1000000,
    tenureMonths: 48,
    baselineMonthlyYieldRate: 0.015,
    performanceBonusCeiling: 0.006,
    targetCattleAllocation: '4x A2 Gir Milkers + Solar Paddock Co-Benefit',
    riskCategory: 'Medium',
    illustrativeAnnualRunRateAPY: '18.0% - 25.2% (Illustrative Demo)',
    riskDisclosureText:
      'Includes agrivoltaic dual-use pasture infrastructure. Draft under internal review by agronomists.',
    lifecycleStatus: 'IN_REVIEW',
    version: 'v0.9-rc1',
    effectiveDate: '2026-11-01',
    affectsExistingInvestors: false,
    auditHistory: [
      {
        timestamp: '2026-09-18T16:00:00Z',
        action: 'CREATED_DRAFT',
        author: 'Vikram Joshi (VP Operations)',
        diffSummary: 'Drafted dual-use solar grazing model.',
        previousStatus: undefined,
        newStatus: 'DRAFT',
      },
      {
        timestamp: '2026-09-19T10:00:00Z',
        action: 'SUBMITTED_FOR_REVIEW',
        author: 'Vikram Joshi',
        diffSummary: 'Submitted for executive committee review.',
        previousStatus: 'DRAFT',
        newStatus: 'IN_REVIEW',
      },
    ],
  },
];

let plansStore: InvestmentPlanConfig[] = [...INITIAL_INVESTMENT_PLANS];

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
   * List investment plans
   * Default: Returns only PUBLISHED plans for public/investor discovery.
   * Admin can pass { includeUnpublished: true }
   */
  async getPlans(options?: { includeUnpublished?: boolean }): Promise<InvestmentPlanConfig[]> {
    await new Promise((res) => setTimeout(res, 30));
    if (options?.includeUnpublished) {
      return [...plansStore];
    }
    return plansStore.filter((p) => p.lifecycleStatus === 'PUBLISHED');
  },

  /**
   * Get single plan by ID
   */
  async getPlanById(id: string): Promise<InvestmentPlanConfig | null> {
    await new Promise((res) => setTimeout(res, 20));
    return plansStore.find((p) => p.id === id) || null;
  },

  /**
   * Admin Plan Lifecycle: Create Draft
   */
  async createPlanDraft(
    input: Omit<InvestmentPlanConfig, 'id' | 'lifecycleStatus' | 'auditHistory'>,
    authorName: string
  ): Promise<InvestmentPlanConfig> {
    await new Promise((res) => setTimeout(res, 60));
    const newId = `plan-${input.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now().toString().slice(-4)}`;
    const now = new Date().toISOString();

    const created: InvestmentPlanConfig = {
      ...input,
      id: newId,
      lifecycleStatus: 'DRAFT',
      auditHistory: [
        {
          timestamp: now,
          action: 'CREATED_DRAFT',
          author: authorName,
          diffSummary: `Plan draft created with min contribution ₹${input.minimumContributionINR.toLocaleString('en-IN')}`,
          previousStatus: undefined,
          newStatus: 'DRAFT',
        },
      ],
    };

    plansStore = [created, ...plansStore];
    return created;
  },

  /**
   * Admin Plan Lifecycle: Submit Draft for Review
   */
  async submitForReview(planId: string, authorName: string, notes?: string): Promise<InvestmentPlanConfig> {
    await new Promise((res) => setTimeout(res, 50));
    const idx = plansStore.findIndex((p) => p.id === planId);
    if (idx === -1) throw new Error(`Plan ${planId} not found`);

    const now = new Date().toISOString();
    const updated: InvestmentPlanConfig = {
      ...plansStore[idx],
      lifecycleStatus: 'IN_REVIEW',
      auditHistory: [
        ...plansStore[idx].auditHistory,
        {
          timestamp: now,
          action: 'SUBMITTED_FOR_REVIEW',
          author: authorName,
          diffSummary: notes || 'Submitted for internal compliance and yield audit review.',
          previousStatus: plansStore[idx].lifecycleStatus,
          newStatus: 'IN_REVIEW',
        },
      ],
    };

    plansStore[idx] = updated;
    return updated;
  },

  /**
   * Admin Plan Lifecycle: Approve & Publish Plan
   * Once published, investors and consumers can view this opportunity.
   */
  async approveAndPublishPlan(
    planId: string,
    approverName: string,
    auditNotes?: string
  ): Promise<InvestmentPlanConfig> {
    await new Promise((res) => setTimeout(res, 60));
    const idx = plansStore.findIndex((p) => p.id === planId);
    if (idx === -1) throw new Error(`Plan ${planId} not found`);

    const now = new Date().toISOString();
    const updated: InvestmentPlanConfig = {
      ...plansStore[idx],
      lifecycleStatus: 'PUBLISHED',
      auditHistory: [
        ...plansStore[idx].auditHistory,
        {
          timestamp: now,
          action: 'APPROVED_AND_PUBLISHED',
          author: approverName,
          diffSummary:
            auditNotes ||
            `Approved by executive review. Terms locked under ${plansStore[idx].version}. Existing agreements grandfathered.`,
          previousStatus: plansStore[idx].lifecycleStatus,
          newStatus: 'PUBLISHED',
        },
      ],
    };

    plansStore[idx] = updated;
    return updated;
  },

  /**
   * Admin Plan Lifecycle: Archive Plan
   */
  async archivePlan(planId: string, adminName: string): Promise<InvestmentPlanConfig> {
    await new Promise((res) => setTimeout(res, 50));
    const idx = plansStore.findIndex((p) => p.id === planId);
    if (idx === -1) throw new Error(`Plan ${planId} not found`);

    const now = new Date().toISOString();
    const updated: InvestmentPlanConfig = {
      ...plansStore[idx],
      lifecycleStatus: 'ARCHIVED',
      auditHistory: [
        ...plansStore[idx].auditHistory,
        {
          timestamp: now,
          action: 'ARCHIVED',
          author: adminName,
          diffSummary: 'Plan closed to new allocations. Existing investor commitments remain protected.',
          previousStatus: plansStore[idx].lifecycleStatus,
          newStatus: 'ARCHIVED',
        },
      ],
    };

    plansStore[idx] = updated;
    return updated;
  },

  /**
   * Get investor profile and historical portfolio
   */
  async getPortfolio(investorId: string): Promise<InvestorProfile | null> {
    await new Promise((res) => setTimeout(res, 40));
    return (
      investorsStore.find((inv) => inv.id === investorId || inv.email === investorId) ||
      investorsStore[0] ||
      null
    );
  },

  /**
   * Get platform-wide Yield Reserve Health metric
   */
  async getYieldReserveHealth(): Promise<YieldReserveHealth> {
    await new Promise((res) => setTimeout(res, 20));
    return { ...PLATFORM_YIELD_RESERVE_HEALTH };
  },

  /**
   * Submit application draft (subject to compliance & KYC review)
   */
  async submitApplication(
    draft: InvestmentApplicationDraft
  ): Promise<{ success: boolean; applicationId: string; message: string }> {
    await new Promise((res) => setTimeout(res, 80));

    if (!draft.acceptedRiskDisclosure) {
      throw new Error('You must acknowledge the livestock co-ownership risk disclosure.');
    }
    if (draft.allocatedAmountINR <= 0) {
      throw new Error('Please specify a valid allocation amount.');
    }

    const appId = `APP-DL-${Date.now().toString().slice(-6)}`;
    return {
      success: true,
      applicationId: appId,
      message:
        'Co-Ownership allocation draft submitted. Application queued for internal KYC verification.',
    };
  },

  /**
   * Calculate illustrative scenario (Clearly labeled as DEMO MODELING)
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
        'DEMO OPERATIONAL SIMULATION ONLY. Projections are sample illustrations based on 1.5% fixed base + dynamic parlour milk yields. Returns are not guaranteed. Backstopped by the 145% Yield Reserve buffer.',
    };
  },
};
