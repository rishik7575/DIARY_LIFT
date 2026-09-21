'use client';

import React, { useState, useEffect } from 'react';
import PortalGuard from '@/components/layout/PortalGuard';
import PortalLayout from '@/components/layout/PortalLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { investmentService, InvestmentPlanConfig } from '@/lib/services';
import { useAuth } from '@/lib/auth/AuthContext';
import { formatCurrency } from '@/lib/utils';
import {
  TrendingUp,
  ShieldCheck,
  Milk,
  CheckCircle2,
  Sliders,
  Award,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  UserCheck,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const FAQS = [
  {
    q: 'How does the 1.5% fixed monthly base yield operate?',
    a: 'Each investor co-owns physical registered livestock assets. The 1.5% monthly base yield (18% annualized) is simulated from dairy operations and supported against biological dry-off gaps by our 145% Yield Reserve Buffer model.',
  },
  {
    q: 'How is the milk performance bonus calculated?',
    a: 'In addition to the 1.5% base, your allocated cattle’s verifiable AM/PM parlour milk production is tracked via IoT meters. When production exceeds baseline standards, you receive an automated dynamic bonus of up to 0.5% monthly (reaching up to 24% effective APY).',
  },
  {
    q: 'What protections exist against livestock illness or mortality?',
    a: 'Livestock assets are backed by operational mortality insurance policies. In addition, routine veterinary exams, 24/7 smart-collar biometrics, and quarantined medical paddocks ensure clinical herd health.',
  },
  {
    q: 'Can I visit the farm and see my allocated cattle?',
    a: 'Yes. All registered co-owners receive quarterly farm visit rights to inspect the state-of-the-art parlour facilities, automated feed stations, and meet the resident veterinary team.',
  },
];

export default function ConsumerInvestPage() {
  const { user, upgradeToInvestor, switchRole } = useAuth();
  const router = useRouter();

  // Dynamic published plans
  const [plans, setPlans] = useState<InvestmentPlanConfig[]>([]);

  useEffect(() => {
    async function loadPublishedPlans() {
      const published = await investmentService.getPlans();
      setPlans(published);
    }
    loadPublishedPlans();
  }, []);

  // Calculator State
  const [calcAmount, setCalcAmount] = useState(250000);
  const scenario = investmentService.calculateIllustrativeScenario(calcAmount);

  // Application Modal State
  const [selectedPlan, setSelectedPlan] = useState<InvestmentPlanConfig | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [appForm, setAppForm] = useState({
    name: user?.name || 'Aarav Shah',
    email: user?.email || 'consumer@dairylift.com',
    phone: '+91 98201 99481',
    panNumber: 'AAAPS4481M',
    amount: 250000,
    agreed: false,
  });

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleOpenApply = (plan: InvestmentPlanConfig) => {
    setSelectedPlan(plan);
    setAppForm((prev) => ({ ...prev, amount: plan.minimumContributionINR }));
    setModalOpen(true);
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    try {
      const res = await investmentService.submitApplication({
        planId: selectedPlan.id,
        applicantName: appForm.name,
        email: appForm.email,
        phone: appForm.phone,
        panNumber: appForm.panNumber,
        allocatedAmountINR: appForm.amount,
        acceptedRiskDisclosure: appForm.agreed,
      });

      // Also upgrade current user to investor role for demo continuity
      upgradeToInvestor('INV-DL-1001');

      setSubmittedMessage(res.message);
      setTimeout(() => {
        setSubmittedMessage(null);
        setModalOpen(false);
        router.push('/investor');
      }, 3500);
    } catch (err: any) {
      alert(err.message || 'Error submitting application');
    }
  };

  const handleDirectDemoUpgrade = () => {
    upgradeToInvestor('INV-DL-1001');
    switchRole('investor');
    router.push('/investor');
  };

  return (
    <PortalGuard allowedRoles={['consumer', 'investor', 'admin']}>
      <PortalLayout allowedRoles={['consumer', 'investor', 'admin']}>
        
        {/* Header */}
        <div
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6"
          style={{ borderBottom: '1px solid var(--color-border)' }}
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1
                className="font-bold tracking-tight"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', color: 'var(--color-text-primary)' }}
              >
                Cattle Co-Ownership & Wealth Suite
              </h1>
              <Badge variant="gold">
                1.5% Base + Dynamic Bonus
              </Badge>
            </div>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
              Participate in high-yield, insured indigenous livestock agriculture with verifiable parlour milk returns.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleDirectDemoUpgrade}
            >
              <UserCheck className="w-3.5 h-3.5 mr-1.5" style={{ color: 'var(--color-brand)' }} />
              Demo: Instant Investor Mode
            </Button>
          </div>
        </div>

        {/* Hero Value Props Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6 space-y-2">
              <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-700 text-xl font-bold">
                1.5%
              </div>
              <h3 className="font-bold text-base text-slate-900">Fixed Monthly Base Yield</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct monthly cash distributions on the 1st of every month (18.0% APY annualized run rate).
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6 space-y-2">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 text-xl font-bold">
                +0.5%
              </div>
              <h3 className="font-bold text-base text-slate-900">Dynamic Parlour Bonus</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Earn up to an additional 0.5% monthly when your allocated cow exceeds daily parlour milk benchmarks.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6 space-y-2">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 text-xl font-bold">
                145%
              </div>
              <h3 className="font-bold text-base text-slate-900">Yield Reserve Health Fund</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                ₹8.45 Cr audited escrow liquidity buffer smoothening dry cycles and natural agricultural seasonality.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Dynamic Scenario Calculator */}
        <div className="mt-8">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-forest-700" />
                Co-Ownership Scenario Modeling Calculator
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Adjust allocation amount to view projected cash distributions based on our sustainable agricultural model.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                
                {/* Slider */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-2">
                      <span>Capital Contribution</span>
                      <span className="font-mono text-forest-700 font-bold text-sm">
                        {formatCurrency(calcAmount)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="100000"
                      max="2500000"
                      step="50000"
                      value={calcAmount}
                      onChange={(e) => setCalcAmount(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-forest-700"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                      <span>₹1,00,000</span>
                      <span>₹10,00,000</span>
                      <span>₹25,00,000</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-200 space-y-1">
                    <p className="font-semibold text-slate-900">Capital Model Disclosures (Simulation):</p>
                    <p>• Illustrative Livestock Mortality Risk Protection Model</p>
                    <p>• 145% Yield Reserve Escrow Liquidity Buffer Simulation</p>
                    <p>• Internal Operational Agritech Farm Audits</p>
                  </div>
                </div>

                {/* Outputs */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-forest-50 border border-forest-100 rounded-xl">
                    <span className="text-xs text-forest-800 font-semibold uppercase tracking-wider block">
                      Fixed Base (1.5% / mo)
                    </span>
                    <div className="text-2xl font-bold text-forest-900 font-mono mt-2">
                      {formatCurrency(scenario.monthlyBaseINR)}
                    </div>
                    <span className="text-xs text-forest-700 block mt-1">₹{scenario.monthlyBaseINR * 12} / year</span>
                  </div>

                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                    <span className="text-xs text-amber-800 font-semibold uppercase tracking-wider block">
                      Milk Bonus (~0.38% / mo)
                    </span>
                    <div className="text-2xl font-bold text-amber-900 font-mono mt-2">
                      +{formatCurrency(scenario.estimatedMonthlyBonusINR)}
                    </div>
                    <span className="text-xs text-amber-700 block mt-1">Parlour Linked</span>
                  </div>

                  <div className="p-4 bg-slate-900 text-white rounded-xl">
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                      Total Projected Monthly
                    </span>
                    <div className="text-2xl font-bold text-emerald-400 font-mono mt-2">
                      {formatCurrency(scenario.totalEstimatedMonthlyINR)}
                    </div>
                    <span className="text-xs text-slate-300 block mt-1">~22.56% Illustrative Run-Rate</span>
                  </div>
                </div>

              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 italic">
                {scenario.disclaimer} All projections represent sample illustrations. Cattle milk yield fluctuates based on natural lactation cycles. Baseline returns are supported by the DairyLift Yield Reserve.
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Allocation Packages */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-serif text-slate-900">
              Institutional Co-Ownership Plans
            </h2>
            <Badge variant="outline" className="border-forest-600 text-forest-700 bg-forest-50">
              Published Allocations
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.id} className="border-slate-200 bg-white shadow-sm flex flex-col justify-between">
                <div>
                  <CardHeader className="border-b border-slate-100 pb-4">
                    <Badge variant="outline" className="w-fit mb-2 border-forest-600 text-forest-700 bg-forest-50">
                      {plan.riskCategory} Risk
                    </Badge>
                    <CardTitle className="text-lg font-bold text-slate-900">{plan.name}</CardTitle>
                    <CardDescription className="text-xs text-slate-500">{plan.targetCattleAllocation}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-5 space-y-3 text-xs text-slate-600">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span>Minimum Allocation:</span>
                      <span className="font-bold text-slate-900">{formatCurrency(plan.minimumContributionINR)}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span>Lock-in Tenure:</span>
                      <span className="font-bold text-slate-900">{plan.tenureMonths} Months</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span>Base Monthly Yield:</span>
                      <span className="font-bold text-forest-700">1.5% / month</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span>Performance Bonus:</span>
                      <span className="font-bold text-amber-700">Up to 0.5% dynamic</span>
                    </div>
                    <p className="text-[11px] text-slate-500 pt-1">{plan.riskDisclosureText}</p>
                  </CardContent>
                </div>

                <div className="p-5 pt-0">
                  <Button
                    variant="forest"
                    className="w-full bg-forest-700 hover:bg-forest-800 text-white"
                    onClick={() => handleOpenApply(plan)}
                  >
                    Apply for Co-Ownership
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 space-y-4">
          <h2 className="text-xl font-bold font-serif text-slate-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-sm font-semibold text-slate-900 hover:bg-slate-50"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Application Modal */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-w-md bg-white p-6 border-slate-200">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-forest-700" />
                Co-Ownership Application Draft
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                {selectedPlan?.name} • Institutional Agricultural Asset Allocation.
              </DialogDescription>
            </DialogHeader>

            {submittedMessage ? (
              <div className="p-4 bg-forest-50 border border-forest-200 rounded-lg text-forest-800 text-sm font-medium flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-forest-700 shrink-0" />
                <span>{submittedMessage} Redirecting to your Investor Suite...</span>
              </div>
            ) : (
              <form onSubmit={handleApplicationSubmit} className="space-y-4 mt-2">
                <div>
                  <Label className="text-xs font-semibold text-slate-700">Applicant Full Name</Label>
                  <Input
                    type="text"
                    value={appForm.name}
                    onChange={(e) => setAppForm({ ...appForm, name: e.target.value })}
                    className="mt-1 text-xs"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs font-semibold text-slate-700">PAN Number</Label>
                    <Input
                      type="text"
                      value={appForm.panNumber}
                      onChange={(e) => setAppForm({ ...appForm, panNumber: e.target.value })}
                      className="mt-1 text-xs"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-slate-700">Capital Amount (₹)</Label>
                    <Input
                      type="number"
                      value={appForm.amount}
                      onChange={(e) => setAppForm({ ...appForm, amount: Number(e.target.value) })}
                      className="mt-1 text-xs"
                      min={selectedPlan?.minimumContributionINR || 100000}
                      required
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600 space-y-2">
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="investAgree"
                      checked={appForm.agreed}
                      onChange={(e) => setAppForm({ ...appForm, agreed: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-forest-600 focus:ring-forest-500"
                      required
                    />
                    <label htmlFor="investAgree" className="leading-snug cursor-pointer">
                      I understand that co-ownership yield consists of a 1.5% fixed monthly base + dynamic milk performance bonus. Returns are sample illustrations and capital is protected via our 145% Yield Reserve and livestock mortality insurance.
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setModalOpen(false)}
                    className="border-slate-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="forest"
                    size="sm"
                    disabled={!appForm.agreed}
                    className="bg-forest-700 hover:bg-forest-800 text-white"
                  >
                    Submit Draft & View Dashboard
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>

      </PortalLayout>
    </PortalGuard>
  );
}
