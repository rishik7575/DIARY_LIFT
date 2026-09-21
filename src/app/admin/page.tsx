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
  cattleService,
  farmService,
  investmentService,
  orderService,
  reportService,
  productService,
  FarmFacility,
  InvestmentPlanConfig,
} from '@/lib/services';
import { CattleAsset, BiologicalStatus } from '@/lib/types/cattle';
import { EnvironmentalSensorAlert, FarmFacilityThresholdConfig } from '@/lib/types/farm';
import { OrderFulfillment, OrderStatus } from '@/lib/types/order';
import { Product } from '@/lib/mockData/products';
import { formatCurrency, formatNumber, formatDate } from '@/lib/utils';
import {
  Milk,
  TrendingUp,
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  Users,
  DollarSign,
  Building2,
  Package,
  Layers,
  Clock,
  ArrowUpRight,
  Filter,
  Check,
  Eye,
  Thermometer,
  Sliders,
  FileText,
  History,
  Tag,
  PlusCircle,
  RefreshCw,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [cattleList, setCattleList] = useState<CattleAsset[]>([]);
  const [facilities, setFacilities] = useState<FarmFacility[]>([]);
  const [plans, setPlans] = useState<InvestmentPlanConfig[]>([]);
  const [orders, setOrders] = useState<OrderFulfillment[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [sensorAlerts, setSensorAlerts] = useState<EnvironmentalSensorAlert[]>([]);
  const [thresholdConfig, setThresholdConfig] = useState<FarmFacilityThresholdConfig | null>(null);
  const [financialTrends, setFinancialTrends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Feedback notifications
  const [feedback, setFeedback] = useState<string | null>(null);

  // Cattle registry search & filter state
  const [cattleSearch, setCattleSearch] = useState('');
  const [breedFilter, setBreedFilter] = useState('all');
  const [selectedCattle, setSelectedCattle] = useState<CattleAsset | null>(null);

  // Plan governance modals
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [selectedPlanForAudit, setSelectedPlanForAudit] = useState<InvestmentPlanConfig | null>(null);
  const [newPlanModalOpen, setNewPlanModalOpen] = useState(false);
  const [newPlanForm, setNewPlanForm] = useState({
    name: '',
    minimumContributionINR: 200000,
    tenureMonths: 24,
    baselineMonthlyYieldRate: 0.015,
    performanceBonusCeiling: 0.005,
    targetCattleAllocation: '2x A2 Gir Cows',
    riskCategory: 'Low-Medium' as const,
    illustrativeAnnualRunRateAPY: '18.0% - 24.0% (Illustrative Demo)',
    riskDisclosureText: 'Livestock performance is subject to natural biological cycles. Capital protected by Yield Reserve.',
    version: 'v1.0',
    effectiveDate: '2026-10-01',
    affectsExistingInvestors: false,
  });

  // Threshold config modal
  const [thresholdModalOpen, setThresholdModalOpen] = useState(false);

  // Product price editing inline state
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);

  const loadAllData = async () => {
    try {
      const [c, f, p, o, r, prods, alerts, thresh] = await Promise.all([
        cattleService.getAll(),
        farmService.getFacilities(),
        investmentService.getPlans({ includeUnpublished: true }),
        orderService.getAllOrders(),
        reportService.getExecutiveFinancialTrends(),
        productService.getProducts(),
        farmService.getOperationalAlerts(),
        farmService.getFacilityThresholds('FAC-NSK-01'),
      ]);
      setCattleList(c);
      setFacilities(f);
      setPlans(p);
      setOrders(o);
      setFinancialTrends(r);
      setProducts(prods);
      setSensorAlerts(alerts);
      setThresholdConfig(thresh);
    } catch (err) {
      console.error('Failed to load admin executive data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const notify = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 4000);
  };

  // 1. Cattle Status Change
  const handleUpdateCattleStatus = async (id: string, newStatus: BiologicalStatus) => {
    const updated = await cattleService.updateStatus(id, newStatus);
    setCattleList((prev) => prev.map((c) => (c.id === id ? updated : c)));
    if (selectedCattle?.id === id) setSelectedCattle(updated);
    notify(`Updated ${updated.name} status to ${newStatus}`);
  };

  // 2. Sensor Threshold Update
  const handleSaveThresholds = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!thresholdConfig) return;
    const updated = await farmService.updateFacilityThresholds('FAC-NSK-01', thresholdConfig);
    setThresholdConfig(updated);
    setThresholdModalOpen(false);
    notify('Facility environmental thresholds updated and synchronized.');
  };

  // 3. Simulate Sensor Spike (Testing the alert dependency)
  const handleSimulateSpike = async () => {
    const alert = await farmService.simulateSensorReading('FAC-NSK-01', 'SHED-02', 'TEMPERATURE', 33.1);
    if (alert) {
      setSensorAlerts(await farmService.getOperationalAlerts());
      notify(`ALERT TRIGGERED: Sensor SNSR-NSK-TEM recorded 33.1°C (>30.0°C). Notified farm staff.`);
    }
  };

  // 4. Plan Lifecycle Actions
  const handleSubmitPlanForReview = async (planId: string) => {
    const updated = await investmentService.submitForReview(planId, 'Siddharth Nair (Master Admin)');
    setPlans((prev) => prev.map((p) => (p.id === planId ? updated : p)));
    notify(`Plan ${updated.name} submitted for executive committee review.`);
  };

  const handleApprovePlan = async (planId: string) => {
    const updated = await investmentService.approveAndPublishPlan(
      planId,
      'Siddharth Nair (Master Admin)',
      'Executive compliance approval granted. Published for co-ownership discovery.'
    );
    setPlans((prev) => prev.map((p) => (p.id === planId ? updated : p)));
    notify(`Plan ${updated.name} is now PUBLISHED and live for investors.`);
  };

  const handleArchivePlan = async (planId: string) => {
    const updated = await investmentService.archivePlan(planId, 'Siddharth Nair (Master Admin)');
    setPlans((prev) => prev.map((p) => (p.id === planId ? updated : p)));
    notify(`Plan ${updated.name} archived.`);
  };

  const handleCreatePlanDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    const created = await investmentService.createPlanDraft(newPlanForm, 'Siddharth Nair (Master Admin)');
    setPlans([created, ...plans]);
    setNewPlanModalOpen(false);
    notify(`Draft created for ${created.name}. Status: DRAFT.`);
  };

  // 5. Store Pricing Updates
  const handleSaveProductPrice = async (productId: string) => {
    if (tempPrice <= 0) return;
    const updated = await productService.updatePricing(productId, tempPrice);
    setProducts((prev) => prev.map((p) => (p.id === productId ? updated : p)));
    setEditingPriceId(null);
    notify(`Updated price for ${updated.name} to ₹${updated.price}. Immediate effect in store.`);
  };

  const handleToggleProductStock = async (productId: string, currentStock: boolean) => {
    const updated = await productService.toggleStock(productId, !currentStock);
    setProducts((prev) => prev.map((p) => (p.id === productId ? updated : p)));
    notify(`${updated.name} is now ${updated.inStock ? 'IN STOCK' : 'OUT OF STOCK'}.`);
  };

  // 6. Order Status Update
  const handleUpdateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    const updated = await orderService.updateOrderStatus(orderId, newStatus);
    setOrders((prev) => prev.map((o) => (o.orderId === orderId ? updated : o)));
    notify(`Order ${orderId} transitioned to ${newStatus}.`);
  };

  const filteredCattle = cattleList.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(cattleSearch.toLowerCase()) ||
      c.rfidTag.toLowerCase().includes(cattleSearch.toLowerCase()) ||
      c.earTagNumber.toLowerCase().includes(cattleSearch.toLowerCase());
    const matchesBreed = breedFilter === 'all' || c.breed === breedFilter;
    return matchesSearch && matchesBreed;
  });

  const activeSensorAlerts = sensorAlerts.filter((a) => a.status !== 'RESOLVED');

  return (
    <PortalGuard allowedRoles={['admin']}>
      <PortalLayout allowedRoles={['admin']}>
        
        {/* Page Executive Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-sans">
                Executive Command Center
              </h1>
              <Badge variant="navy">
                Master Governance
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Cross-portal oversight, environmental IoT sensor alarms, investment plan governance, and store pricing.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSimulateSpike}
              className="text-xs font-semibold"
            >
              <Thermometer className="w-3.5 h-3.5 mr-1 text-amber-600" />
              Simulate Spike (33.1°C)
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setActiveTab('plans');
                setNewPlanModalOpen(true);
              }}
              className="text-xs font-semibold"
            >
              <PlusCircle className="w-3.5 h-3.5 mr-1" />
              Draft Investment Plan
            </Button>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className="mt-4 p-4 rounded-lg bg-forest-50 border border-forest-200 text-forest-900 text-sm font-medium flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-forest-700 shrink-0" />
              <span>{feedback}</span>
            </div>
            <button onClick={() => setFeedback(null)} className="text-xs font-bold text-forest-700">Dismiss</button>
          </div>
        )}

        {/* Operational Sensor Alert Banner (If active sensor alarms exist) */}
        {activeSensorAlerts.length > 0 && (
          <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-red-600 text-white flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-red-900">
                    High Environmental Temperature Detected
                  </span>
                  <Badge className="bg-red-600 text-white text-[10px] font-bold">CRITICAL ALARM</Badge>
                </div>
                <p className="text-xs text-red-800 mt-0.5">
                  {activeSensorAlerts[0].shedName} sensor reading is{' '}
                  <strong className="font-mono text-sm">{activeSensorAlerts[0].currentValue}{activeSensorAlerts[0].unit}</strong>{' '}
                  (Configured Max: {activeSensorAlerts[0].thresholdValue}{activeSensorAlerts[0].unit}). In-app alert dispatched to farm staff.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setThresholdModalOpen(true)}
                className="border-red-300 text-red-800 bg-white hover:bg-red-50 text-xs"
              >
                Configure Thresholds
              </Button>
              <Button
                variant="forest"
                size="sm"
                onClick={() => setActiveTab('sensors')}
                className="bg-red-700 hover:bg-red-800 text-white text-xs"
              >
                Inspect Sensor Stream
              </Button>
            </div>
          </div>
        )}

        {/* Master Tabbed Command Interface */}
        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList
              className="flex flex-wrap gap-1 p-1 rounded-[var(--radius-md)]"
              style={{ background: 'var(--color-surface-muted)', border: '1px solid var(--color-border)' }}
            >
              <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-brand data-[state=active]:shadow-xs text-xs font-semibold">
                <TrendingUp className="w-3.5 h-3.5 mr-1.5" />
                Executive Analytics
              </TabsTrigger>
              <TabsTrigger value="sensors" className="data-[state=active]:bg-white data-[state=active]:text-brand data-[state=active]:shadow-xs text-xs font-semibold relative">
                <Thermometer className="w-3.5 h-3.5 mr-1.5" />
                Environmental Ops
                {activeSensorAlerts.length > 0 && (
                  <span
                    className="ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
                    style={{ background: 'var(--color-danger)' }}
                  >
                    {activeSensorAlerts.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="plans" className="data-[state=active]:bg-white data-[state=active]:text-brand data-[state=active]:shadow-xs text-xs font-semibold">
                <Sliders className="w-3.5 h-3.5 mr-1.5" />
                Plan Governance ({plans.length})
              </TabsTrigger>
              <TabsTrigger value="pricing" className="data-[state=active]:bg-white data-[state=active]:text-brand data-[state=active]:shadow-xs text-xs font-semibold">
                <Tag className="w-3.5 h-3.5 mr-1.5" />
                Store Pricing
              </TabsTrigger>
              <TabsTrigger value="cattle" className="data-[state=active]:bg-white data-[state=active]:text-brand data-[state=active]:shadow-xs text-xs font-semibold">
                <Milk className="w-3.5 h-3.5 mr-1.5" />
                Cattle Registry
              </TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:bg-white data-[state=active]:text-brand data-[state=active]:shadow-xs text-xs font-semibold">
                <Package className="w-3.5 h-3.5 mr-1.5" />
                Orders ({orders.length})
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: EXECUTIVE ANALYTICS */}
            <TabsContent value="overview" className="space-y-6">
              
              {/* ROW 1: 4 KPI CARDS — dl-kpi-card ensures min-width:0 to prevent overflow */}
              <div className="dl-kpi-grid-4">
                {/* 1. Total Farms */}
                <div className="dl-kpi-card">
                  <div className="flex items-center justify-between gap-2">
                    <span className="dl-kpi-label">Total Farms</span>
                    <div
                      className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center shrink-0"
                      style={{ background: 'var(--color-brand-light)' }}
                    >
                      <Building2 className="w-4.5 h-4.5" style={{ color: 'var(--color-brand)' }} />
                    </div>
                  </div>
                  <span className="dl-kpi-value">{facilities.length || 3} Parks</span>
                  <span className="dl-kpi-trend-up"><ArrowUpRight className="w-3 h-3" />100% Online</span>
                </div>

                {/* 2. Active Cattle */}
                <div className="dl-kpi-card">
                  <div className="flex items-center justify-between gap-2">
                    <span className="dl-kpi-label">Active Cattle</span>
                    <div
                      className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center shrink-0"
                      style={{ background: 'var(--color-brand-light)' }}
                    >
                      <Milk className="w-4 h-4" style={{ color: 'var(--color-brand)' }} />
                    </div>
                  </div>
                  <span className="dl-kpi-value">1,280</span>
                  <span className="dl-kpi-context">94% Barn Occupancy · RFID Mapped</span>
                </div>

                {/* 3. Today's Milk */}
                <div className="dl-kpi-card">
                  <div className="flex items-center justify-between gap-2">
                    <span className="dl-kpi-label">Today&apos;s Milk</span>
                    <div
                      className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center shrink-0"
                      style={{ background: 'var(--color-accent-light)' }}
                    >
                      <TrendingUp className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                    </div>
                  </div>
                  <span className="dl-kpi-value">15,840 L</span>
                  <span className="dl-kpi-context">91% Grade-A+ · 4.85% Avg Fat</span>
                </div>

                {/* 4. Open Alerts */}
                <div className="dl-kpi-card">
                  <div className="flex items-center justify-between gap-2">
                    <span className="dl-kpi-label">Open Alerts</span>
                    <div
                      className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center shrink-0"
                      style={{ background: 'var(--color-danger-bg)' }}
                    >
                      <AlertTriangle className="w-4 h-4" style={{ color: 'var(--color-danger)' }} />
                    </div>
                  </div>
                  <span className="dl-kpi-value">{activeSensorAlerts.length + 2}</span>
                  <span className="dl-kpi-trend-down">1 Critical · 2 Vet Queue</span>
                </div>
              </div>

              {/* ROW 2: MILK PRODUCTION TREND & FARM HEALTH OVERVIEW */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Milk Production Trend (AreaChart) */}
                <Card className="border-slate-200 bg-white shadow-sm lg:col-span-2">
                  <CardHeader className="border-b border-slate-100 pb-4 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <Milk className="w-4 h-4 text-forest-700" />
                        Milk Production & Quality Trend (Last 7 Days)
                      </CardTitle>
                      <CardDescription className="text-xs text-slate-500 mt-0.5">
                        Daily certified milk output in Liters against operational baseline target (15,000 L/day).
                      </CardDescription>
                    </div>
                    <Badge className="bg-forest-50 text-forest-800 border-forest-200 font-mono text-xs">
                      Baseline: 15,000 L
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-72 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={[
                            { day: 'Mon', actual: 15420, target: 15000, gradeA: 14100 },
                            { day: 'Tue', actual: 15610, target: 15000, gradeA: 14350 },
                            { day: 'Wed', actual: 15540, target: 15000, gradeA: 14200 },
                            { day: 'Thu', actual: 15720, target: 15000, gradeA: 14450 },
                            { day: 'Fri', actual: 15690, target: 15000, gradeA: 14380 },
                            { day: 'Sat', actual: 15810, target: 15000, gradeA: 14520 },
                            { day: 'Sun (Today)', actual: 15840, target: 15000, gradeA: 14610 },
                          ]}
                          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorMilkActual" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#14532D" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="#14532D" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorGradeA" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#C9962B" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="#C9962B" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                          <XAxis dataKey="day" stroke="#64748B" fontSize={12} tickLine={false} />
                          <YAxis stroke="#64748B" fontSize={12} tickLine={false} domain={[13000, 17000]} tickFormatter={(v) => `${v / 1000}k L`} />
                          <Tooltip
                            formatter={(v: any) => [`${Number(v).toLocaleString('en-IN')} L`, 'Volume']}
                            contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                          />
                          <Legend />
                          <Area type="monotone" dataKey="actual" name="Total Daily Milk (L)" stroke="#14532D" strokeWidth={2} fillOpacity={1} fill="url(#colorMilkActual)" />
                          <Area type="monotone" dataKey="gradeA" name="Grade-A+ Certified (L)" stroke="#C9962B" strokeWidth={2} fillOpacity={1} fill="url(#colorGradeA)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Farm Health Overview (BarChart/Facility capacity) */}
                <Card className="border-slate-200 bg-white shadow-sm lg:col-span-1">
                  <CardHeader className="border-b border-slate-100 pb-4">
                    <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-forest-700" />
                      Facility Health & Capacity
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500 mt-0.5">
                      Cattle occupancy and renewable microgrid load across agro-parks.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-44 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: 'Nashik A', housed: 1280, capacity: 1500 },
                            { name: 'Pune B', housed: 940, capacity: 1200 },
                            { name: 'Anand C', housed: 680, capacity: 800 },
                          ]}
                          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                          <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
                          <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                          <Tooltip
                            formatter={(v: any) => [`${v} Units`, 'Cattle Count']}
                            contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                          />
                          <Bar dataKey="housed" name="Housed Units" fill="#14532D" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="capacity" name="Max Capacity" fill="#CBD5E1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
                      {facilities.map((fac) => (
                        <div key={fac.id} className="flex justify-between items-center py-1">
                          <span className="font-semibold text-slate-800">{fac.name.split(' Unit')[0]}</span>
                          <span className="font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                            {fac.solarCapacityKw}kW Solar • {fac.hydroponicFodderDailyTons}T Fodder
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* ROW 3: INVESTMENT SUMMARY & E-COMMERCE REVENUE METRICS */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Investment & Yield Reserve Escrow Summary */}
                <Card className="border-slate-200 bg-white shadow-sm">
                  <CardHeader className="border-b border-slate-100 pb-4 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-forest-700" />
                        Investment & Yield Reserve Escrow Health
                      </CardTitle>
                      <CardDescription className="text-xs text-slate-500 mt-0.5">
                        Capital under co-ownership, escrow coverage ratio, and investor dividend distributions.
                      </CardDescription>
                    </div>
                    <Badge className="bg-forest-100 text-forest-800 border-forest-200 text-xs font-bold">
                      145% Covered
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <p className="text-[11px] font-semibold text-slate-500 uppercase">Capital Co-Owned</p>
                        <p className="text-xl font-bold text-slate-900 mt-0.5">₹42.80 Cr</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">2,450 Verified HNI Investors</p>
                      </div>
                      <div className="p-3 bg-forest-50/60 rounded-xl border border-forest-200/60">
                        <p className="text-[11px] font-semibold text-forest-700 uppercase">Reserve Escrow</p>
                        <p className="text-xl font-bold text-forest-800 mt-0.5">₹8.45 Cr</p>
                        <p className="text-[11px] text-forest-700 mt-0.5">Liquid Bank Deposit</p>
                      </div>
                      <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 col-span-2 sm:col-span-1">
                        <p className="text-[11px] font-semibold text-amber-800 uppercase">Monthly Run-Rate</p>
                        <p className="text-xl font-bold text-amber-900 mt-0.5">1.5% Base</p>
                        <p className="text-[11px] text-amber-700 mt-0.5">+ Up to 0.5% Milk Bonus</p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900">Statutory Yield Reserve Status:</span>
                        <p className="text-slate-500 text-[11px]">
                          Maintains 145% coverage of required monthly disbursements (₹8,45,00,000 balance vs ₹5,83,00,000 requirement).
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveTab('plans')}
                        className="text-xs text-forest-700 border-forest-300 hover:bg-forest-50 shrink-0 ml-4"
                      >
                        Inspect Plans
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* E-Commerce Revenue & Cold-Chain Logistics */}
                <Card className="border-slate-200 bg-white shadow-sm">
                  <CardHeader className="border-b border-slate-100 pb-4 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <Package className="w-5 h-5 text-forest-700" />
                        Dairy Commerce & Cold-Chain Fulfillment
                      </CardTitle>
                      <CardDescription className="text-xs text-slate-500 mt-0.5">
                        Gross merchandise value, rapid doorstep fulfillment, and subscriber retention.
                      </CardDescription>
                    </div>
                    <Badge className="bg-amber-100 text-amber-900 border-amber-200 text-xs font-bold">
                      ₹68.4L / Mo
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <p className="text-[11px] font-semibold text-slate-500 uppercase">Monthly GMV</p>
                        <p className="text-xl font-bold text-slate-900 mt-0.5">₹68.40 L</p>
                        <p className="text-[11px] text-forest-700 font-medium mt-0.5">+18.4% MoM</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <p className="text-[11px] font-semibold text-slate-500 uppercase">Subscribers</p>
                        <p className="text-xl font-bold text-slate-900 mt-0.5">1,480 Families</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Daily A2 Fresh Milk</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
                        <p className="text-[11px] font-semibold text-slate-500 uppercase">Fulfillment SLA</p>
                        <p className="text-xl font-bold text-forest-700 mt-0.5">99.4%</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Sub-15m Delivery</p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900">Cold Chain Compliance:</span>
                        <p className="text-slate-500 text-[11px]">
                          100% of dispatched milk batches maintained sub-4°C from milking parlour rotary to doorstep drop.
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveTab('orders')}
                        className="text-xs text-forest-700 border-forest-300 hover:bg-forest-50 shrink-0 ml-4"
                      >
                        View Orders
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* ROW 4: ENVIRONMENTAL ALERTS, OPERATIONAL ISSUES & AUDIT LOG ACTIVITY */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Environmental Alerts Card */}
                <Card className="border-slate-200 bg-white shadow-sm">
                  <CardHeader className="border-b border-slate-100 pb-3 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-red-600" />
                      Environmental Sensor Alarms
                    </CardTitle>
                    <Badge className="bg-red-100 text-red-800 border-red-200 text-[10px] font-bold">
                      {activeSensorAlerts.length} Active
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3 text-xs">
                    {activeSensorAlerts.map((alert) => (
                      <div key={alert.id} className="p-3 rounded-lg bg-red-50/70 border border-red-200 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-red-900">{alert.shedName}</span>
                          <span className="font-mono text-red-700 font-bold">{alert.currentValue}{alert.unit}</span>
                        </div>
                        <p className="text-slate-600 text-[11px]">
                          Threshold: {alert.thresholdValue}{alert.unit} • Status: {alert.status}
                        </p>
                        <p className="text-[10px] text-red-800 font-medium pt-0.5">
                          Staff Action: {alert.mitigationActionTaken || 'Mitigation pending by field shift operator'}
                        </p>
                      </div>
                    ))}
                    {activeSensorAlerts.length === 0 && (
                      <p className="text-slate-500 py-4 text-center">All facility sensors within normal thresholds.</p>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveTab('sensors')}
                      className="w-full text-xs text-forest-700 hover:bg-forest-50 mt-1"
                    >
                      View All Sensors & Thresholds →
                    </Button>
                  </CardContent>
                </Card>

                {/* Operational Issues Card */}
                <Card className="border-slate-200 bg-white shadow-sm">
                  <CardHeader className="border-b border-slate-100 pb-3 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      Operational Vet Queue
                    </CardTitle>
                    <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-[10px] font-bold">
                      2 Follow-ups
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3 text-xs">
                    <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-amber-950">Cow DL-C-005 (Nandini)</span>
                        <Badge className="bg-amber-500 text-white text-[9px] px-1 py-0">Quarantine</Badge>
                      </div>
                      <p className="text-slate-600 text-[11px]">
                        Mild mastitis symptom. Isolated in infirmary with herbal protocol. SCC target: &lt;150k.
                      </p>
                      <p className="text-[10px] text-slate-500 pt-0.5">Follow-up: Today, 4:00 PM (Dr. Kulkarni)</p>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-900">Herd Batch B-04</span>
                        <Badge variant="outline" className="text-[9px] px-1 py-0">Vaccination</Badge>
                      </div>
                      <p className="text-slate-600 text-[11px]">
                        Bi-annual Foot & Mouth booster schedule confirmed for 180 cattle units.
                      </p>
                      <p className="text-[10px] text-slate-500 pt-0.5">Date: Thursday morning session</p>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveTab('cattle')}
                      className="w-full text-xs text-forest-700 hover:bg-forest-50 mt-1"
                    >
                      View Herd Registry & Vets →
                    </Button>
                  </CardContent>
                </Card>

                {/* Audit Log Activity Card */}
                <Card className="border-slate-200 bg-white shadow-sm">
                  <CardHeader className="border-b border-slate-100 pb-3 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <History className="w-4 h-4 text-forest-700" />
                      Governance & Audit Log
                    </CardTitle>
                    <Badge variant="outline" className="text-[10px] font-mono">
                      Live Trace
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-4 space-y-2.5 text-xs">
                    <div className="flex gap-2.5 items-start">
                      <div className="w-2 h-2 rounded-full bg-forest-600 mt-1.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-900">Plan Draft V2 Created</p>
                        <p className="text-[11px] text-slate-500">Siddharth Nair drafted "A2 Gir Elite Co-Ownership V2"</p>
                        <span className="text-[10px] text-slate-400 font-mono">10:45 AM • Master Admin</span>
                      </div>
                    </div>

                    <div className="flex gap-2.5 items-start">
                      <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-900">Product Price Revision</p>
                        <p className="text-[11px] text-slate-500">Bilona Ghee 500ml updated to ₹1,450</p>
                        <span className="text-[10px] text-slate-400 font-mono">09:30 AM • Commerce Ops</span>
                      </div>
                    </div>

                    <div className="flex gap-2.5 items-start">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-900">Environmental Threshold Alarm</p>
                        <p className="text-[11px] text-slate-500">Shed-02 temp exceeded 30.0°C (reading 32.4°C)</p>
                        <span className="text-[10px] text-slate-400 font-mono">08:15 AM • IoT Sensor Engine</span>
                      </div>
                    </div>

                    <div className="flex gap-2.5 items-start">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-900">AM Parlour Milk Certified</p>
                        <p className="text-[11px] text-slate-500">Batch APPROVED_PREMIUM_COMMERCE (15,840L)</p>
                        <span className="text-[10px] text-slate-400 font-mono">06:00 AM • Quality Lab</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

            </TabsContent>

            {/* TAB 2: ENVIRONMENTAL SENSOR OPS */}
            <TabsContent value="sensors" className="space-y-6">
              
              {/* Threshold Overview & Control Strip */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Thermometer className="w-5 h-5 text-forest-700" />
                    Farm Environmental Sensor Rule Engine
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Configured thresholds automatically trigger high-priority alerts to farm staff and executive dashboards.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setThresholdModalOpen(true)}
                    className="border-slate-300 text-slate-800"
                  >
                    <Sliders className="w-4 h-4 mr-1.5" />
                    Configure Alert Thresholds
                  </Button>
                </div>
              </div>

              {/* Active Sensor Alarms Table */}
              <Card className="border-slate-200 bg-white shadow-sm">
                <CardHeader className="border-b border-slate-100 pb-4">
                  <CardTitle className="text-base font-bold text-slate-900">
                    Live Operational Sensor Alarms
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Dependency: Farm Configuration → Sensor Reading → Alert Rule → Staff Action → Resolution.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-slate-50 border-b border-slate-200">
                      <TableRow>
                        <TableHead className="font-semibold text-slate-700">Facility & Shed</TableHead>
                        <TableHead className="font-semibold text-slate-700">Metric</TableHead>
                        <TableHead className="font-semibold text-slate-700">Recorded Reading</TableHead>
                        <TableHead className="font-semibold text-slate-700">Threshold</TableHead>
                        <TableHead className="font-semibold text-slate-700">Severity</TableHead>
                        <TableHead className="font-semibold text-slate-700">Status</TableHead>
                        <TableHead className="font-semibold text-slate-700">Mitigation Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sensorAlerts.map((alert) => (
                        <TableRow key={alert.id}>
                          <TableCell>
                            <div className="font-bold text-slate-900">{alert.shedName}</div>
                            <div className="text-xs text-slate-500">{alert.facilityName}</div>
                          </TableCell>
                          <TableCell className="text-xs text-slate-700 font-medium">{alert.metricLabel}</TableCell>
                          <TableCell className="font-mono text-sm font-bold text-red-700">
                            {alert.currentValue} {alert.unit}
                          </TableCell>
                          <TableCell className="font-mono text-xs text-slate-500">
                            {alert.thresholdValue} {alert.unit}
                          </TableCell>
                          <TableCell>
                            <Badge className={alert.severity === 'CRITICAL' ? 'bg-red-600 text-white' : 'bg-amber-500 text-white'}>
                              {alert.severity}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={alert.status === 'RESOLVED' ? 'border-forest-600 text-forest-700 bg-forest-50' : 'border-red-400 text-red-700 bg-red-50'}>
                              {alert.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs text-slate-600 max-w-xs">
                            {alert.mitigationActionTaken ? (
                              <span className="text-forest-800 font-medium">✓ {alert.mitigationActionTaken}</span>
                            ) : (
                              <span className="text-amber-800 italic">Action pending by farm staff</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

            </TabsContent>

            {/* TAB 3: PLAN GOVERNANCE & LIFECYCLE */}
            <TabsContent value="plans" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-forest-700" />
                    Investment Plan Lifecycle & Audit Engine
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Strict governance: Draft → Review → Published. Existing agreements are protected against retroactive changes.
                  </p>
                </div>

                <Button
                  variant="forest"
                  size="sm"
                  onClick={() => setNewPlanModalOpen(true)}
                  className="bg-forest-700 hover:bg-forest-800 text-white"
                >
                  <PlusCircle className="w-4 h-4 mr-1.5" />
                  Create New Plan Draft
                </Button>
              </div>

              {/* Plans Table */}
              <Card className="border-slate-200 bg-white shadow-sm">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-slate-50 border-b border-slate-200">
                      <TableRow>
                        <TableHead className="font-semibold text-slate-700">Plan Name & Version</TableHead>
                        <TableHead className="font-semibold text-slate-700">Min Ticket</TableHead>
                        <TableHead className="font-semibold text-slate-700">Base Yield</TableHead>
                        <TableHead className="font-semibold text-slate-700">Milk Bonus</TableHead>
                        <TableHead className="font-semibold text-slate-700">Lifecycle Status</TableHead>
                        <TableHead className="font-semibold text-slate-700">Effective Date</TableHead>
                        <TableHead className="font-semibold text-slate-700">Governance Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {plans.map((p) => (
                        <TableRow key={p.id}>
                          <TableCell>
                            <div className="font-bold text-slate-900">{p.name}</div>
                            <div className="text-xs text-slate-500 font-mono">{p.version} • {p.targetCattleAllocation}</div>
                          </TableCell>
                          <TableCell className="font-mono text-sm">{formatCurrency(p.minimumContributionINR)}</TableCell>
                          <TableCell className="font-mono text-sm text-forest-700 font-semibold">
                            {(p.baselineMonthlyYieldRate * 100).toFixed(1)}% /mo
                          </TableCell>
                          <TableCell className="font-mono text-xs text-amber-700">
                            Up to +{(p.performanceBonusCeiling * 100).toFixed(1)}%
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                p.lifecycleStatus === 'PUBLISHED'
                                  ? 'bg-forest-100 text-forest-800 border-forest-200'
                                  : p.lifecycleStatus === 'IN_REVIEW'
                                  ? 'bg-amber-100 text-amber-800 border-amber-200'
                                  : 'bg-slate-100 text-slate-800 border-slate-200'
                              }
                            >
                              {p.lifecycleStatus}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs text-slate-600 font-mono">{p.effectiveDate}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              {p.lifecycleStatus === 'DRAFT' && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleSubmitPlanForReview(p.id)}
                                  className="h-7 text-xs border-amber-300 text-amber-800 hover:bg-amber-50"
                                >
                                  Submit Review
                                </Button>
                              )}
                              {p.lifecycleStatus === 'IN_REVIEW' && (
                                <Button
                                  variant="forest"
                                  size="sm"
                                  onClick={() => handleApprovePlan(p.id)}
                                  className="h-7 text-xs bg-forest-700 hover:bg-forest-800 text-white"
                                >
                                  Approve & Publish
                                </Button>
                              )}
                              {p.lifecycleStatus === 'PUBLISHED' && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleArchivePlan(p.id)}
                                  className="h-7 text-xs border-slate-300 text-slate-600 hover:bg-slate-100"
                                >
                                  Archive
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedPlanForAudit(p);
                                  setAuditModalOpen(true);
                                }}
                                className="h-7 text-xs text-slate-600"
                              >
                                <History className="w-3.5 h-3.5 mr-1" />
                                Audit Log ({p.auditHistory?.length || 0})
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 4: STORE PRICING & INVENTORY */}
            <TabsContent value="pricing" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-forest-700" />
                    Direct E-Commerce Pricing & Inventory Controls
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Modifying retail prices or stock switches updates the Consumer Catalog immediately.
                  </p>
                </div>
                <Badge variant="outline" className="border-forest-600 text-forest-700 bg-forest-50">
                  Real-time Store Sync
                </Badge>
              </div>

              <Card className="border-slate-200 bg-white shadow-sm">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-slate-50 border-b border-slate-200">
                      <TableRow>
                        <TableHead className="font-semibold text-slate-700">Product Name</TableHead>
                        <TableHead className="font-semibold text-slate-700">Category</TableHead>
                        <TableHead className="font-semibold text-slate-700">Unit Size</TableHead>
                        <TableHead className="font-semibold text-slate-700">Retail Price</TableHead>
                        <TableHead className="font-semibold text-slate-700">Stock Availability</TableHead>
                        <TableHead className="font-semibold text-slate-700">Price Control</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((prod) => (
                        <TableRow key={prod.id}>
                          <TableCell>
                            <div className="font-bold text-slate-900">{prod.name}</div>
                            <div className="text-xs text-slate-500">{prod.deliveryTime} delivery</div>
                          </TableCell>
                          <TableCell className="text-xs text-slate-600 uppercase font-semibold">{prod.category}</TableCell>
                          <TableCell className="text-xs text-slate-600">{prod.unit}</TableCell>
                          <TableCell className="font-mono text-sm font-bold text-forest-700">
                            {editingPriceId === prod.id ? (
                              <div className="flex items-center gap-1.5">
                                <span>₹</span>
                                <Input
                                  type="number"
                                  value={tempPrice}
                                  onChange={(e) => setTempPrice(Number(e.target.value))}
                                  className="h-8 w-20 text-xs font-mono"
                                />
                              </div>
                            ) : (
                              formatCurrency(prod.price)
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleToggleProductStock(prod.id, prod.inStock)}
                              className={`h-7 text-xs ${
                                prod.inStock
                                  ? 'border-forest-600 text-forest-700 bg-forest-50'
                                  : 'border-red-300 text-red-700 bg-red-50'
                              }`}
                            >
                              {prod.inStock ? '✓ In Stock' : '✕ Out of Stock'}
                            </Button>
                          </TableCell>
                          <TableCell>
                            {editingPriceId === prod.id ? (
                              <div className="flex items-center gap-1.5">
                                <Button
                                  variant="forest"
                                  size="sm"
                                  onClick={() => handleSaveProductPrice(prod.id)}
                                  className="h-7 text-xs bg-forest-700 text-white"
                                >
                                  Save
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setEditingPriceId(null)}
                                  className="h-7 text-xs text-slate-500"
                                >
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setEditingPriceId(prod.id);
                                  setTempPrice(prod.price);
                                }}
                                className="h-7 text-xs border-slate-300 text-slate-700"
                              >
                                Edit Price
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 5: CATTLE HERD REGISTRY */}
            <TabsContent value="cattle" className="space-y-6">
              <Card className="border-slate-200 bg-white shadow-sm">
                <CardHeader className="border-b border-slate-100 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg font-bold text-slate-900">
                      Cattle Asset Registry & Telemetry
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500">
                      Inspect biological status, assigned investor co-owners, and veterinary records.
                    </CardDescription>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <Input
                        type="text"
                        placeholder="Search name, RFID..."
                        value={cattleSearch}
                        onChange={(e) => setCattleSearch(e.target.value)}
                        className="pl-9 h-10 w-48 md:w-64 border-slate-300"
                      />
                    </div>
                    <select
                      value={breedFilter}
                      onChange={(e) => setBreedFilter(e.target.value)}
                      className="h-10 px-3 border border-slate-300 rounded-md text-sm bg-white"
                    >
                      <option value="all">All Breeds</option>
                      <option value="A2_GIR_COW">A2 Gir Cow</option>
                      <option value="MURRAH_BUFFALO">Murrah Buffalo</option>
                      <option value="SAHIWAL_COW">Sahiwal Cow</option>
                    </select>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-slate-50 border-b border-slate-200">
                      <TableRow>
                        <TableHead className="font-semibold text-slate-700">Cattle Identification</TableHead>
                        <TableHead className="font-semibold text-slate-700">Breed</TableHead>
                        <TableHead className="font-semibold text-slate-700">Facility / Shed</TableHead>
                        <TableHead className="font-semibold text-slate-700">Status</TableHead>
                        <TableHead className="font-semibold text-slate-700">Daily Yield Avg</TableHead>
                        <TableHead className="font-semibold text-slate-700">Valuation</TableHead>
                        <TableHead className="font-semibold text-slate-700">Lifecycle State</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCattle.map((c) => (
                        <TableRow key={c.id}>
                          <TableCell>
                            <div className="font-bold text-slate-900">{c.name}</div>
                            <div className="text-xs text-slate-500 font-mono">{c.rfidTag}</div>
                          </TableCell>
                          <TableCell className="text-sm text-slate-700">{c.breed.replace(/_/g, ' ')}</TableCell>
                          <TableCell className="text-sm text-slate-700">
                            {c.farmAllocation?.facilityId || 'FAC-01'} ({c.farmAllocation?.shedNumber || 'Shed 1'})
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-forest-600 bg-forest-50 text-forest-700">
                              {c.biologicalStatus}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-sm font-semibold text-slate-900">
                            {c.telemetry?.dailyAverageYieldLiters || 14.5} L/day
                          </TableCell>
                          <TableCell className="font-mono text-sm">
                            {formatCurrency(c.currentValuationINR || c.costBasisINR)}
                          </TableCell>
                          <TableCell>
                            <select
                              value={c.biologicalStatus}
                              onChange={(e) => handleUpdateCattleStatus(c.id, e.target.value as BiologicalStatus)}
                              className="text-xs h-8 px-2 border border-slate-300 rounded bg-white font-medium text-slate-800"
                            >
                              <option value="Milking">Milking</option>
                              <option value="Dry">Dry</option>
                              <option value="Medical Observation">Medical Observation</option>
                              <option value="Transition / Calving">Transition / Calving</option>
                            </select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 6: E-COMMERCE ORDERS */}
            <TabsContent value="orders" className="space-y-6">
              <Card className="border-slate-200 bg-white shadow-sm">
                <CardHeader className="border-b border-slate-100 pb-4 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold text-slate-900">
                      Cold-Chain Order Fulfillment
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500">
                      Automated order lifecycle from bottling line to delivery partner.
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="border-slate-300 text-slate-700">
                    {orders.length} Total Orders
                  </Badge>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-slate-50 border-b border-slate-200">
                      <TableRow>
                        <TableHead className="font-semibold text-slate-700">Order ID & Date</TableHead>
                        <TableHead className="font-semibold text-slate-700">Customer</TableHead>
                        <TableHead className="font-semibold text-slate-700">Items</TableHead>
                        <TableHead className="font-semibold text-slate-700">Total (₹)</TableHead>
                        <TableHead className="font-semibold text-slate-700">Slot</TableHead>
                        <TableHead className="font-semibold text-slate-700">Status</TableHead>
                        <TableHead className="font-semibold text-slate-700">Transition Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((o) => (
                        <TableRow key={o.orderId}>
                          <TableCell>
                            <div className="font-bold text-slate-900">{o.orderId}</div>
                            <div className="text-xs text-slate-500 font-mono">{formatDate(o.placedAt)}</div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium text-slate-900">{o.deliveryAddress.fullName}</div>
                            <div className="text-xs text-slate-500">{o.deliveryAddress.city}</div>
                          </TableCell>
                          <TableCell className="text-xs text-slate-600">
                            {o.items.map((i) => `${i.productName} (x${i.quantity})`).join(', ')}
                          </TableCell>
                          <TableCell className="font-mono font-bold text-slate-900">
                            {formatCurrency(o.grandTotalINR)}
                          </TableCell>
                          <TableCell className="text-xs text-slate-600">{o.deliverySlotLabel}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                o.status === 'DELIVERED'
                                  ? 'bg-forest-100 text-forest-800'
                                  : o.status === 'OUT_FOR_COLD_DELIVERY'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-blue-100 text-blue-800'
                              }
                            >
                              {o.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <select
                              value={o.status}
                              onChange={(e) => handleUpdateOrderStatus(o.orderId, e.target.value as OrderStatus)}
                              className="text-xs h-8 px-2 border border-slate-300 rounded bg-white text-slate-800"
                            >
                              <option value="RECEIVED_BOTTLING_LINE">BOTTLING</option>
                              <option value="QUALITY_CLEARED">QUALITY CLEARED</option>
                              <option value="OUT_FOR_DELIVERY">DISPATCHED</option>
                              <option value="DELIVERED">DELIVERED</option>
                            </select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </div>

        {/* Modal: Plan Audit Trail */}
        <Dialog open={auditModalOpen} onOpenChange={setAuditModalOpen}>
          <DialogContent className="max-w-lg bg-white p-6 border-slate-200">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <History className="w-5 h-5 text-forest-700" />
                Plan Versioning & Audit History
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                {selectedPlanForAudit?.name} ({selectedPlanForAudit?.version}) • Immutable governance log.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 mt-3 max-h-80 overflow-y-auto">
              {selectedPlanForAudit?.auditHistory?.map((entry, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1 font-mono">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">{entry.action}</span>
                    <span className="text-[10px] text-slate-400">{formatDate(entry.timestamp)}</span>
                  </div>
                  <p className="text-slate-600 font-sans text-xs">{entry.diffSummary}</p>
                  <p className="text-[10px] text-slate-500">Author: {entry.author}</p>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal: Create Plan Draft */}
        <Dialog open={newPlanModalOpen} onOpenChange={setNewPlanModalOpen}>
          <DialogContent className="max-w-md bg-white p-6 border-slate-200">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-forest-700" />
                Draft New Co-Ownership Plan
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Saves in DRAFT status. Requires review and executive approval before publication.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreatePlanDraft} className="space-y-4 mt-2">
              <div>
                <Label className="text-xs font-semibold text-slate-700">Plan Title</Label>
                <Input
                  type="text"
                  value={newPlanForm.name}
                  onChange={(e) => setNewPlanForm({ ...newPlanForm, name: e.target.value })}
                  placeholder="e.g. Indigenous Sahiwal Cow Cluster"
                  required
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-semibold text-slate-700">Min Capital (₹)</Label>
                  <Input
                    type="number"
                    value={newPlanForm.minimumContributionINR}
                    onChange={(e) => setNewPlanForm({ ...newPlanForm, minimumContributionINR: Number(e.target.value) })}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-slate-700">Tenure (Months)</Label>
                  <Input
                    type="number"
                    value={newPlanForm.tenureMonths}
                    onChange={(e) => setNewPlanForm({ ...newPlanForm, tenureMonths: Number(e.target.value) })}
                    className="mt-1"
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-semibold text-slate-700">Cattle Allocation Description</Label>
                <Input
                  type="text"
                  value={newPlanForm.targetCattleAllocation}
                  onChange={(e) => setNewPlanForm({ ...newPlanForm, targetCattleAllocation: e.target.value })}
                  className="mt-1"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <Button type="button" variant="outline" size="sm" onClick={() => setNewPlanModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="forest" size="sm" className="bg-forest-700 text-white">
                  Save Plan Draft
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Modal: Configure Environmental Thresholds */}
        <Dialog open={thresholdModalOpen} onOpenChange={setThresholdModalOpen}>
          <DialogContent className="max-w-md bg-white p-6 border-slate-200">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-forest-700" />
                Facility Threshold Configuration
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Nashik High-Tech Agro-Park Unit A • Automated Alarm Triggers.
              </DialogDescription>
            </DialogHeader>

            {thresholdConfig && (
              <form onSubmit={handleSaveThresholds} className="space-y-4 mt-2 text-xs">
                <div>
                  <Label className="text-xs font-semibold text-slate-700">Max Ambient Temperature Threshold (°C)</Label>
                  <Input
                    type="number"
                    step="0.5"
                    value={thresholdConfig.maxTemperatureCelsius}
                    onChange={(e) => setThresholdConfig({ ...thresholdConfig, maxTemperatureCelsius: Number(e.target.value) })}
                    className="mt-1"
                    required
                  />
                  <span className="text-[10px] text-slate-400">Current setting: 30.0°C. Exceeding triggers staff alert.</span>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-slate-700">Max Relative Humidity (%)</Label>
                  <Input
                    type="number"
                    value={thresholdConfig.maxHumidityPercent}
                    onChange={(e) => setThresholdConfig({ ...thresholdConfig, maxHumidityPercent: Number(e.target.value) })}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label className="text-xs font-semibold text-slate-700">Milk Chiller Tank Max Setpoint (°C)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={thresholdConfig.chillerMaxTempCelsius}
                    onChange={(e) => setThresholdConfig({ ...thresholdConfig, chillerMaxTempCelsius: Number(e.target.value) })}
                    className="mt-1"
                    required
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="mistingActive"
                    checked={thresholdConfig.emergencyMistingActive}
                    onChange={(e) => setThresholdConfig({ ...thresholdConfig, emergencyMistingActive: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-300 text-forest-600 focus:ring-forest-500"
                  />
                  <label htmlFor="mistingActive" className="text-slate-800 font-semibold cursor-pointer">
                    Enable Automated High-Pressure Misting Response
                  </label>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                  <Button type="button" variant="outline" size="sm" onClick={() => setThresholdModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="forest" size="sm" className="bg-forest-700 text-white">
                    Apply Threshold Rule
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
