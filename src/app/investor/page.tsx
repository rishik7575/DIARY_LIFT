'use client';

import React, { useState, useEffect } from 'react';
import PortalGuard from '@/components/layout/PortalGuard';
import PortalLayout from '@/components/layout/PortalLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import {
  investmentService,
  cattleService,
  InvestmentPlanConfig,
} from '@/lib/services';
import {
  InvestorProfile,
} from '@/lib/types/investor';
import { CattleAsset } from '@/lib/types/cattle';
import { useAuth } from '@/lib/auth/AuthContext';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  TrendingUp,
  DollarSign,
  Milk,
  ShieldCheck,
  Calendar,
  ArrowUpRight,
  Activity,
  CheckCircle2,
  FileText,
  Download,
  Info,
  Sliders,
} from 'lucide-react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from 'recharts';

export default function InvestorDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('portfolio');
  const [profile, setProfile] = useState<InvestorProfile | null>(null);
  const [assignedCattle, setAssignedCattle] = useState<CattleAsset[]>([]);
  const [plans, setPlans] = useState<InvestmentPlanConfig[]>([]);
  const [loading, setLoading] = useState(true);

  // Calculator State
  const [calcAmount, setCalcAmount] = useState(250000);
  const [selectedPlanForApp, setSelectedPlanForApp] = useState<InvestmentPlanConfig | null>(null);
  const [appModalOpen, setAppModalOpen] = useState(false);
  const [appFeedback, setAppFeedback] = useState<string | null>(null);
  const [appForm, setAppForm] = useState({
    name: user?.name || 'Arjun Mehta',
    email: user?.email || 'investor@dairylift.com',
    phone: '+91 98201 44819',
    panNumber: 'AAAPM8821K',
    amount: 250000,
    agreed: false,
  });

  useEffect(() => {
    async function loadInvestorData() {
      try {
        const [portfolioData, allCattle, allPlans] = await Promise.all([
          investmentService.getPortfolio(user?.investorId || user?.email || 'INV-DL-1001'),
          cattleService.getAll(),
          investmentService.getPlans(),
        ]);

        if (portfolioData) {
          setProfile(portfolioData);
          const userCattle = allCattle.filter((c) =>
            portfolioData.portfolio.allocatedCattleIds.includes(c.id)
          );
          setAssignedCattle(userCattle);
        }
        setPlans(allPlans);
      } catch (err) {
        console.error('Failed to load investor data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadInvestorData();
  }, [user]);

  // Handle application submission
  const handleAppSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlanForApp) return;

    try {
      const res = await investmentService.submitApplication({
        planId: selectedPlanForApp.id,
        applicantName: appForm.name,
        email: appForm.email,
        phone: appForm.phone,
        panNumber: appForm.panNumber,
        allocatedAmountINR: appForm.amount,
        acceptedRiskDisclosure: appForm.agreed,
      });

      setAppFeedback(res.message);
      setTimeout(() => {
        setAppFeedback(null);
        setAppModalOpen(false);
      }, 4000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error submitting application';
      alert(msg);
    }
  };

  if (loading || !profile) {
    return (
      <PortalGuard allowedRoles={['investor', 'consumer', 'admin']}>
        <PortalLayout allowedRoles={['investor', 'consumer', 'admin']}>
          <div className="py-20 text-center text-slate-500">Loading verified investor portfolio...</div>
        </PortalLayout>
      </PortalGuard>
    );
  }

  const p = profile.portfolio;
  const scenario = investmentService.calculateIllustrativeScenario(calcAmount);

  // Prepare ledger for chart
  const yieldHistoryChartData = p.dividendLedger
    .slice()
    .reverse()
    .map((d) => ({
      period: d.periodMonth,
      basePayout: d.baselinePayoutAmountINR,
      bonusPayout: d.performanceBonusAmountINR,
      totalPayout: d.totalDisbursedAmountINR,
    }));

  return (
    <PortalGuard allowedRoles={['investor', 'consumer', 'admin']}>
      <PortalLayout allowedRoles={['investor', 'consumer', 'admin']}>
        
        {/* Executive Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-sans">
                Investor Financial Suite
              </h1>
              <Badge variant="success">
                KYC Verified · {profile.tier}
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Institutional Livestock Co-Ownership with 1.5% Fixed Monthly Base + Dynamic Milk Performance Bonus.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Escrow Coverage: <strong>145%</strong></span>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setActiveTab('discovery')}
              className="text-xs font-semibold"
            >
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              Explore Allocation Plans
            </Button>
          </div>
        </div>

        {/* Financial KPI Strip */}
        <div className="dl-kpi-grid-4 mt-6">
          {/* 1. Total Capital Invested */}
          <div className="dl-kpi-card">
            <div className="flex items-center justify-between gap-2">
              <span className="dl-kpi-label">Capital Invested</span>
              <div
                className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center shrink-0"
                style={{ background: 'var(--color-surface-muted)', border: '1px solid var(--color-border)' }}
              >
                <DollarSign className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
              </div>
            </div>
            <span className="dl-kpi-value">{formatCurrency(p.totalInvestedINR)}</span>
            <span className="dl-kpi-context">{p.activeCattleCount} Managed Cattle</span>
          </div>

          {/* 2. Portfolio Valuation */}
          <div className="dl-kpi-card">
            <div className="flex items-center justify-between gap-2">
              <span className="dl-kpi-label">Portfolio Valuation</span>
              <div
                className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center shrink-0"
                style={{ background: 'var(--color-brand-light)' }}
              >
                <TrendingUp className="w-4 h-4" style={{ color: 'var(--color-brand)' }} />
              </div>
            </div>
            <span className="dl-kpi-value">{formatCurrency(p.currentPortfolioValuationINR)}</span>
            <span className="dl-kpi-trend-up"><ArrowUpRight className="w-3 h-3" />+{formatCurrency(p.unrealizedAppreciationINR)} Biological Gain</span>
          </div>

          {/* 3. Monthly Yield */}
          <div className="dl-kpi-card">
            <div className="flex items-center justify-between gap-2">
              <span className="dl-kpi-label">Monthly Yield</span>
              <div
                className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center shrink-0"
                style={{ background: 'var(--color-accent-light)' }}
              >
                <Milk className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
              </div>
            </div>
            <span className="dl-kpi-value">{(p.blendedMonthlyYieldRate * 100).toFixed(2)}%<span className="text-sm font-normal ml-1" style={{ color: 'var(--color-text-muted)' }}>/mo</span></span>
            <span className="dl-kpi-context">1.5% Base + {(p.currentPerformanceBonusRate * 100).toFixed(2)}% Bonus</span>
          </div>

          {/* 4. Cumulative Disbursements */}
          <div className="dl-kpi-card">
            <div className="flex items-center justify-between gap-2">
              <span className="dl-kpi-label">Disbursed to Date</span>
              <div
                className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center shrink-0"
                style={{ background: 'var(--color-info-bg)' }}
              >
                <Calendar className="w-4 h-4" style={{ color: 'var(--color-info)' }} />
              </div>
            </div>
            <span className="dl-kpi-value">{formatCurrency(p.totalDividendsPaidToDateINR)}</span>
            <span className="dl-kpi-context">Paid to {profile.bankDetails.bankName}</span>
          </div>
        </div>

        {/* Tabbed Navigation */}
        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="flex items-center gap-1.5 p-1 max-w-full overflow-x-auto scrollbar-none">
              <TabsTrigger value="portfolio" className="shrink-0 whitespace-nowrap">
                <TrendingUp className="w-3.5 h-3.5 mr-1.5" />
                Yield &amp; Reserves
              </TabsTrigger>
              <TabsTrigger value="cattle" className="shrink-0 whitespace-nowrap">
                <Milk className="w-3.5 h-3.5 mr-1.5" />
                My Cattle ({assignedCattle.length})
              </TabsTrigger>
              <TabsTrigger value="ledger" className="shrink-0 whitespace-nowrap">
                <FileText className="w-3.5 h-3.5 mr-1.5" />
                Dividend Ledger
              </TabsTrigger>
              <TabsTrigger value="discovery" className="shrink-0 whitespace-nowrap">
                <Sliders className="w-3.5 h-3.5 mr-1.5" />
                Plan Discovery &amp; Calculator
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: YIELD PERFORMANCE & RESERVES */}
            <TabsContent value="portfolio" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Visual Chart */}
                <Card className="border-slate-200 bg-white shadow-sm lg:col-span-2">
                  <CardHeader className="border-b border-slate-100 pb-4">
                    <CardTitle className="text-lg font-bold text-slate-900">
                      Disbursement History: Base Yield vs Dynamic Milk Bonus
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500">
                      Fixed 1.5% monthly base backstopped by Yield Reserve, plus variable performance bonus.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-72 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={yieldHistoryChartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                          <XAxis dataKey="period" stroke="#64748B" fontSize={12} tickLine={false} />
                          <YAxis stroke="#64748B" fontSize={12} tickLine={false} tickFormatter={(v) => `₹${v}`} />
                          <Tooltip
                            formatter={(value: unknown, name: unknown) => [
                              `₹${Number(value || 0).toLocaleString('en-IN')}`,
                              String(name) === 'basePayout' ? '1.5% Base Payout' : 'Milk Performance Bonus',
                            ]}
                            contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '8px' }}
                          />
                          <Legend
                            formatter={(value) => (value === 'basePayout' ? '1.5% Base Yield' : 'Dynamic Milk Bonus')}
                          />
                          <Bar dataKey="basePayout" stackId="a" fill="#166534" radius={[0, 0, 0, 0]} />
                          <Bar dataKey="bonusPayout" stackId="a" fill="#D97706" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Yield Reserve Health Card */}
                <Card className="border-slate-200 bg-white shadow-sm lg:col-span-1">
                  <CardHeader className="border-b border-slate-100 pb-4">
                    <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-forest-700" />
                      Yield Reserve Health Fund
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500">
                      Independent institutional risk mitigation architecture.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="bg-forest-50 p-4 rounded-xl border border-forest-100">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                          Reserve Coverage Ratio
                        </span>
                        <Badge className="bg-emerald-700 text-white font-mono shadow-xs">145% Optimal</Badge>
                      </div>
                      <div className="text-2xl font-bold text-forest-900 font-mono mt-2">₹8,45,00,000</div>
                      <p className="text-xs text-forest-700 mt-1">
                        Dedicated escrow liquidity backstopping 6.4 months of baseline payouts across dry cycles.
                      </p>
                    </div>

                    <div className="space-y-2.5 text-xs text-slate-600">
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span>Stress Coverage Tenure:</span>
                        <span className="font-semibold text-slate-900">6.4 Months Estimated Coverage</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span>Dry Season Nutrition Buffer:</span>
                        <span className="font-semibold text-slate-900">₹2.80 Crores</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span>Mortality Coverage:</span>
                        <span className="font-semibold text-slate-900">National Livestock Policy (Model)</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Assurance Review:</span>
                        <span className="font-semibold text-slate-900 text-right">Internal Agritech Review (Simulated)</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-500 flex items-start gap-2 border border-slate-200">
                      <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span>
                        The reserve automatically smoothens investor cashflow during cattle gestation and biological dry-off windows.
                      </span>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </TabsContent>

            {/* TAB 2: MY ALLOCATED CATTLE */}
            <TabsContent value="cattle" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {assignedCattle.map((c) => (
                  <Card key={c.id} className="border-slate-200 bg-white shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-forest-800 to-forest-900 text-white p-5 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold font-serif">{c.name}</h3>
                          <Badge className="bg-white/20 text-white hover:bg-white/30 font-mono text-xs">
                            {c.rfidTag}
                          </Badge>
                        </div>
                        <p className="text-xs text-white/80 mt-1">
                          {c.breed.replace(/_/g, ' ')} • DOB: {formatDate(c.dateOfBirth)} • Lactation #{c.lactation?.lactationNumber || 1}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-3xl">
                        🐄
                      </div>
                    </div>

                    <CardContent className="p-5 space-y-4">
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                          <span className="text-slate-500">Biological Status</span>
                          <p className="font-bold text-slate-900 mt-0.5 capitalize">{c.biologicalStatus}</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                          <span className="text-slate-500">Daily Milk Average</span>
                          <p className="font-bold text-forest-700 mt-0.5">{c.telemetry?.dailyAverageYieldLiters || 14.5} L/day</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                          <span className="text-slate-500">Assigned Facility</span>
                          <p className="font-bold text-slate-900 mt-0.5">
                            {c.farmAllocation?.facilityId || 'FAC-01'} ({c.farmAllocation?.shedNumber || 'Shed 1'})
                          </p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                          <span className="text-slate-500">Current Valuation</span>
                          <p className="font-bold text-slate-900 mt-0.5">{formatCurrency(c.currentValuationINR || c.costBasisINR)}</p>
                        </div>
                      </div>

                      {/* IoT Telemetry Strip */}
                      <div className="border-t border-slate-100 pt-3">
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                            <Activity className="w-3.5 h-3.5 text-forest-700" />
                            Live Collar IoT Telemetry
                          </span>
                          <span className="text-slate-400 font-mono text-[11px]">Sync: 4 mins ago</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs text-center font-mono">
                          <div className="p-2 bg-slate-50 rounded border border-slate-200">
                            <span className="text-[10px] text-slate-500 block">TEMP</span>
                            <span className="font-bold text-slate-800">{c.telemetry?.coreTemperatureCelsius || 38.6}°C</span>
                          </div>
                          <div className="p-2 bg-slate-50 rounded border border-slate-200">
                            <span className="text-[10px] text-slate-500 block">RUMINATION</span>
                            <span className="font-bold text-slate-800">{c.telemetry?.ruminationMinutesPerDay || 495} m/d</span>
                          </div>
                          <div className="p-2 bg-slate-50 rounded border border-slate-200">
                            <span className="text-[10px] text-slate-500 block">ACTIVITY</span>
                            <span className="font-bold text-slate-800">{c.telemetry?.activityIndex || 82}% Grazing</span>
                          </div>
                        </div>
                      </div>

                      {/* Insurance Tag */}
                      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                        <span>Policy: {c.insurance?.policyNumber || 'NIA-DL-88291'}</span>
                        <Badge variant="outline" className="border-forest-600/30 text-forest-700 bg-forest-50 text-[10px]">
                          100% Mortality Insured
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* TAB 3: DIVIDEND LEDGER & AUDIT */}
            <TabsContent value="ledger" className="space-y-6">
              <Card className="border-slate-200 bg-white shadow-sm">
                <CardHeader className="border-b border-slate-100 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg font-bold text-slate-900">
                      Audited Monthly Dividend Ledger
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500">
                      Disbursements executed via Direct NEFT with 1.5% fixed base and verified milk production bonus.
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="border-slate-300 text-slate-700">
                    <Download className="w-4 h-4 mr-2" />
                    Download Financial Statement
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-slate-50 border-b border-slate-200">
                        <TableRow>
                          <TableHead className="font-semibold text-slate-700">Period Month</TableHead>
                          <TableHead className="font-semibold text-slate-700">Capital Base</TableHead>
                          <TableHead className="font-semibold text-slate-700">Fixed Base (1.5%)</TableHead>
                          <TableHead className="font-semibold text-slate-700">Milk Bonus</TableHead>
                          <TableHead className="font-semibold text-slate-700">Total Payout</TableHead>
                          <TableHead className="font-semibold text-slate-700">Effective APY</TableHead>
                          <TableHead className="font-semibold text-slate-700">NEFT Reference</TableHead>
                          <TableHead className="font-semibold text-slate-700">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {p.dividendLedger.map((d) => (
                          <TableRow key={d.payoutId} className="hover:bg-slate-50/80">
                            <TableCell className="font-semibold text-slate-900">{d.periodMonth}</TableCell>
                            <TableCell className="font-mono text-sm">{formatCurrency(d.totalCapitalBaseINR)}</TableCell>
                            <TableCell className="font-mono text-sm text-forest-700 font-semibold">
                              {formatCurrency(d.baselinePayoutAmountINR)}
                            </TableCell>
                            <TableCell className="font-mono text-sm text-amber-700 font-semibold">
                              +{formatCurrency(d.performanceBonusAmountINR)} ({(d.performanceBonusRate * 100).toFixed(2)}%)
                            </TableCell>
                            <TableCell className="font-mono text-sm font-bold text-slate-900">
                              {formatCurrency(d.totalDisbursedAmountINR)}
                            </TableCell>
                            <TableCell className="font-mono text-xs">
                              {(d.annualizedEquivalentAPY * 100).toFixed(2)}% APY
                            </TableCell>
                            <TableCell className="font-mono text-xs text-slate-500">{d.transactionReference}</TableCell>
                            <TableCell>
                              <Badge className="bg-forest-100 text-forest-800 border-forest-200 text-xs">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                {d.payoutStatus}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 4: DISCOVERY & ILLUSTRATIVE CALCULATOR */}
            <TabsContent value="discovery" className="space-y-6">
              
              {/* Illustrative Yield Scenario Calculator */}
              <Card className="border-slate-200 bg-white shadow-sm">
                <CardHeader className="border-b border-slate-100 pb-4">
                  <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-forest-700" />
                    Illustrative Co-Ownership Scenario Calculator
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Model institutional cashflow based on our 1.5% fixed base + dynamic milk yield bonus model.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    
                    {/* Controls */}
                    <div className="lg:col-span-1 space-y-4">
                      <div>
                        <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-2">
                          <span>Target Capital Allocation</span>
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

                      <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-200 space-y-1.5">
                        <p className="font-semibold text-slate-900">Enterprise Yield Framework &amp; Audited Metrics:</p>
                        <p>• <strong>1.5% Base:</strong> Monthly dividend credited on the 1st of each month to investor account.</p>
                        <p>• <strong>Up to 0.5% Bonus:</strong> Pro-rata dynamic bonus calculated directly from certified parlour meters.</p>
                        <p>• <strong>Capital Coverage:</strong> Comprehensive livestock mortality insurance backstopped by the 145% reserve.</p>
                      </div>
                    </div>

                    {/* Projections Matrix */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 bg-forest-50 border border-forest-100 rounded-xl">
                        <span className="text-xs text-forest-800 font-semibold uppercase tracking-wider block">
                          Monthly Fixed Base (1.5%)
                        </span>
                        <div className="text-2xl font-bold text-forest-900 font-mono mt-2">
                          {formatCurrency(scenario.monthlyBaseINR)}
                        </div>
                        <span className="text-xs text-forest-700 block mt-1">₹{scenario.monthlyBaseINR * 12}/year</span>
                      </div>

                      <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                        <span className="text-xs text-amber-800 font-semibold uppercase tracking-wider block">
                          Est. Milk Bonus (~0.38%)
                        </span>
                        <div className="text-2xl font-bold text-amber-900 font-mono mt-2">
                          +{formatCurrency(scenario.estimatedMonthlyBonusINR)}
                        </div>
                        <span className="text-xs text-amber-700 block mt-1">Parlour Production Linked</span>
                      </div>

                      <div className="p-4 bg-slate-900 text-white rounded-xl">
                        <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                          Total Est. Monthly Cashflow
                        </span>
                        <div className="text-2xl font-bold text-emerald-400 font-mono mt-2">
                          {formatCurrency(scenario.totalEstimatedMonthlyINR)}
                        </div>
                        <span className="text-xs text-slate-300 block mt-1">~22.56% Illustrative Run-Rate</span>
                      </div>
                    </div>

                  </div>

                  {/* Legal disclaimer */}
                  <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 italic">
                    {scenario.disclaimer} Agricultural asset returns vary with biological health, weather, feed costs, and milk quality. Projections are sample illustrations only and returns are not guaranteed. DairyLift targets baseline cashflow stability via the 145% Yield Reserve Escrow Buffer.
                  </div>
                </CardContent>
              </Card>

              {/* Available Plans Catalog */}
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
                          <span>Minimum Ticket:</span>
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
                        variant="primary"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm"
                        onClick={() => {
                          setSelectedPlanForApp(plan);
                          setAppForm((prev) => ({ ...prev, amount: plan.minimumContributionINR }));
                          setAppModalOpen(true);
                        }}
                      >
                        Apply for Allocation
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

            </TabsContent>
          </Tabs>
        </div>

        {/* Investment Application Dialog */}
        <Dialog open={appModalOpen} onOpenChange={setAppModalOpen}>
          <DialogContent className="max-w-md bg-white p-6 border-slate-200">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-forest-700" />
                Capital Allocation Application
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                {selectedPlanForApp?.name} • Subject to statutory Agritech KYC and legal eligibility verification.
              </DialogDescription>
            </DialogHeader>

            {appFeedback ? (
              <div className="p-4 bg-forest-50 border border-forest-200 rounded-lg text-forest-800 text-sm font-medium flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-forest-700 shrink-0" />
                <span>{appFeedback}</span>
              </div>
            ) : (
              <form onSubmit={handleAppSubmit} className="space-y-4 mt-2">
                <div>
                  <Label className="text-xs font-semibold text-slate-700">Applicant Full Name</Label>
                  <Input
                    type="text"
                    value={appForm.name}
                    onChange={(e) => setAppForm({ ...appForm, name: e.target.value })}
                    className="mt-1"
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
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-slate-700">Allocation Amount (₹)</Label>
                    <Input
                      type="number"
                      value={appForm.amount}
                      onChange={(e) => setAppForm({ ...appForm, amount: Number(e.target.value) })}
                      className="mt-1"
                      min={selectedPlanForApp?.minimumContributionINR || 100000}
                      required
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600 space-y-2">
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      checked={appForm.agreed}
                      onChange={(e) => setAppForm({ ...appForm, agreed: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-forest-600 focus:ring-forest-500"
                      required
                    />
                    <label htmlFor="agreeTerms" className="leading-snug cursor-pointer">
                      I understand that returns consist of a 1.5% fixed monthly base + dynamic milk bonus based on verifiable parlour yields. Projections are sample illustrations and capital is protected via the 145% Yield Reserve and mortality insurance.
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setAppModalOpen(false)}
                    className="border-slate-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={!appForm.agreed}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm"
                  >
                    Submit Allocation Draft
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
