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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import {
  cattleService,
  farmService,
  investmentService,
  orderService,
  reportService,
  FarmFacility,
  InvestmentPlanConfig,
} from '@/lib/services';
import { CattleAsset, BiologicalStatus } from '@/lib/types/cattle';
import { OrderFulfillment } from '@/lib/types/order';
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
  const [financialTrends, setFinancialTrends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter state for Cattle Registry
  const [cattleSearch, setCattleSearch] = useState('');
  const [breedFilter, setBreedFilter] = useState('all');
  const [selectedCattle, setSelectedCattle] = useState<CattleAsset | null>(null);

  useEffect(() => {
    async function loadAdminData() {
      try {
        const [c, f, p, o, r] = await Promise.all([
          cattleService.getAll(),
          farmService.getFacilities(),
          investmentService.getPlans(),
          orderService.getAllOrders(),
          reportService.getExecutiveFinancialTrends(),
        ]);
        setCattleList(c);
        setFacilities(f);
        setPlans(p);
        setOrders(o);
        setFinancialTrends(r);
      } catch (err) {
        console.error('Failed to load admin data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAdminData();
  }, []);

  const handleUpdateCattleStatus = async (id: string, newStatus: BiologicalStatus) => {
    const updated = await cattleService.updateStatus(id, newStatus);
    setCattleList((prev) => prev.map((c) => (c.id === id ? updated : c)));
    if (selectedCattle?.id === id) {
      setSelectedCattle(updated);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: OrderFulfillment['status']) => {
    const updated = await orderService.updateOrderStatus(orderId, status);
    setOrders((prev) => prev.map((o) => (o.orderId === orderId ? updated : o)));
  };

  const filteredCattle = cattleList.filter((c) => {
    const matchBreed = breedFilter === 'all' || c.breed === breedFilter;
    const matchSearch =
      !cattleSearch ||
      c.name.toLowerCase().includes(cattleSearch.toLowerCase()) ||
      c.rfidTag.toLowerCase().includes(cattleSearch.toLowerCase()) ||
      c.earTagNumber.toLowerCase().includes(cattleSearch.toLowerCase());
    return matchBreed && matchSearch;
  });

  return (
    <PortalGuard allowedRoles={['admin']}>
      <PortalLayout allowedRoles={['admin']}>
        <div className="flex flex-col gap-8 max-w-7xl mx-auto">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <Badge variant="slate" className="text-xs uppercase px-3 py-1 font-bold">
                  Enterprise ERP Command
                </Badge>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Audit Period: FY 2026-27 Active
                </span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-black text-slate-900 mt-2 tracking-tight">
                Executive Operations Console
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Aggregated supply chain telemetry, herd registry, asset allocation, and fulfillment oversight.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-xs text-slate-500 font-medium">Yield Reserve Ratio</div>
                <div className="text-lg font-bold text-emerald-700">145.0% (₹8.45 Cr Buffer)</div>
              </div>
            </div>
          </div>

          {/* Master Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 sm:grid-cols-5 w-full max-w-3xl">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="cattle">Herd Registry</TabsTrigger>
              <TabsTrigger value="farms">Facilities ({facilities.length})</TabsTrigger>
              <TabsTrigger value="orders">Orders ({orders.length})</TabsTrigger>
              <TabsTrigger value="investments">Asset Plans</TabsTrigger>
            </TabsList>

            {/* ═════════════════════════════════════════════════════════════
                TAB 1: EXECUTIVE OVERVIEW
            ═════════════════════════════════════════════════════════════ */}
            <TabsContent value="overview" className="space-y-8">
              
              {/* Metric Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { label: 'Total Cattle Under Care', val: '1,280', sub: 'Across 2 Facilities', icon: Milk, color: 'text-[#166534]' },
                  { label: 'Today Milk Volume', val: '15,840 L', sub: 'Avg Fat 4.85% • SNF 9.12%', icon: TrendingUp, color: 'text-blue-700' },
                  { label: 'Active Co-Owners (HNIs)', val: '2,450', sub: 'Capital Allocated: ₹42.8 Cr', icon: Users, color: 'text-[#D97706]' },
                  { label: 'Monthly Platform Offtake', val: '₹68.5 L', sub: '+14.2% vs last month', icon: DollarSign, color: 'text-emerald-700' },
                ].map((stat, idx) => (
                  <Card key={idx}>
                    <CardHeader className="p-5 pb-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</span>
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <div className="font-display text-3xl font-black text-slate-900 mt-2">{stat.val}</div>
                    </CardHeader>
                    <CardContent className="p-5 pt-0">
                      <span className="text-xs text-slate-500">{stat.sub}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Financial & Production Trends (Recharts) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Revenue vs Disbursements Area Chart */}
                <Card className="lg:col-span-8">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Commercial Cashflow & Dividend Disbursements</CardTitle>
                        <CardDescription>
                          Monthly revenue generated from milk commerce vs. illustrative monthly investor yields (1.5% Base + Bonus).
                        </CardDescription>
                      </div>
                      <Badge variant="gold">INR Lakhs</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={financialTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#166534" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="#166534" stopOpacity={0.0} />
                            </linearGradient>
                            <linearGradient id="colorDiv" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#D97706" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="#D97706" stopOpacity={0.0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                          <XAxis dataKey="month" stroke="#64748B" fontSize={12} tickLine={false} />
                          <YAxis stroke="#64748B" fontSize={12} tickLine={false} />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#CBD5E1', borderRadius: '8px', fontSize: '12px' }}
                            formatter={(val: any) => [`₹${val} Lakhs`, '']}
                          />
                          <Area type="monotone" dataKey="revenueLakhs" name="Total Revenue" stroke="#166534" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
                          <Area type="monotone" dataKey="dividendDisbursedLakhs" name="Investor Dividends" stroke="#D97706" strokeWidth={2.5} fillOpacity={1} fill="url(#colorDiv)" />
                          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Operations & Yield Reserve Health */}
                <Card className="lg:col-span-4 flex flex-col justify-between">
                  <CardHeader>
                    <CardTitle>Yield Reserve Health Audit</CardTitle>
                    <CardDescription>Liquid capital escrowed for dry cycles.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
                        <span>Statutory Reserve Ratio</span>
                        <span className="text-emerald-700 font-bold">145.0% (Optimal)</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-[#166534] h-full w-[85%] rounded-full" />
                      </div>
                      <div className="text-[11px] text-slate-500 mt-2">
                        ₹8.45 Cr escrowed with Deloitte Touche Tohmatsu compliance certification.
                      </div>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                        <span className="text-slate-500">Uninterrupted Payout Buffer</span>
                        <span className="font-bold text-slate-900">6.4 Months</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                        <span className="text-slate-500">Dry Season Care Fund</span>
                        <span className="font-bold text-slate-900">₹2.80 Crores</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                        <span className="text-slate-500">Mortality Claims Settled</span>
                        <span className="font-bold text-emerald-700">100% via New India Assurance</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </TabsContent>

            {/* ═════════════════════════════════════════════════════════════
                TAB 2: HERD REGISTRY & CATTLE MANAGEMENT
            ═════════════════════════════════════════════════════════════ */}
            <TabsContent value="cattle" className="space-y-6">
              
              {/* Filter Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder="Search by RFID, Ear Tag, or Name..."
                    value={cattleSearch}
                    onChange={(e) => setCattleSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">Filter Breed:</span>
                  <select
                    value={breedFilter}
                    onChange={(e) => setBreedFilter(e.target.value)}
                    className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-800"
                  >
                    <option value="all">All Breeds</option>
                    <option value="A2_GIR_COW">A2 Gir Cow</option>
                    <option value="MURRAH_BUFFALO">Murrah Buffalo</option>
                    <option value="SAHIWAL_COW">Sahiwal Cow</option>
                  </select>
                </div>
              </div>

              {/* Cattle Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset Name & Tag</TableHead>
                    <TableHead>Breed</TableHead>
                    <TableHead>Biological Phase</TableHead>
                    <TableHead>Daily Yield</TableHead>
                    <TableHead>Health Score</TableHead>
                    <TableHead>Assigned Investor</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCattle.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell>
                        <div className="font-bold text-slate-900">{c.name}</div>
                        <div className="text-xs text-slate-500 font-mono">{c.rfidTag}</div>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs font-semibold text-slate-700">
                          {c.breed.replace(/_/g, ' ')}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            c.biologicalStatus === 'Milking'
                              ? 'default'
                              : c.biologicalStatus === 'Medical Observation'
                              ? 'destructive'
                              : 'secondary'
                          }
                          className="text-[11px]"
                        >
                          {c.biologicalStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-slate-900">
                        {c.telemetry.dailyAverageYieldLiters > 0 ? `${c.telemetry.dailyAverageYieldLiters} L/day` : '0 L (Dry)'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs">{c.telemetry.liveHealthScore}/100</span>
                          <span
                            className={`w-2 h-2 rounded-full ${
                              c.telemetry.liveHealthScore >= 90
                                ? 'bg-emerald-500'
                                : c.telemetry.liveHealthScore >= 75
                                ? 'bg-amber-500'
                                : 'bg-red-500'
                            }`}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs font-mono text-slate-600">
                          {c.assignedInvestorId || 'Unallocated (Platform)'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedCattle(c)}
                          className="text-xs font-bold"
                        >
                          <Eye className="w-3.5 h-3.5 mr-1" />
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* ═════════════════════════════════════════════════════════════
                TAB 3: FARM FACILITIES
            ═════════════════════════════════════════════════════════════ */}
            <TabsContent value="farms" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {facilities.map((f) => (
                  <Card key={f.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="slate" className="text-xs">{f.id}</Badge>
                        <span className="text-xs font-bold text-emerald-700">FSSAI: {f.fssaiLicenseNumber}</span>
                      </div>
                      <CardTitle className="text-xl mt-2">{f.name}</CardTitle>
                      <CardDescription>{f.location}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-xs">
                      <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
                        <div>
                          <div className="text-slate-500 font-medium">Capacity</div>
                          <div className="text-base font-bold text-slate-900">{f.totalCattleCapacity}</div>
                        </div>
                        <div>
                          <div className="text-slate-500 font-medium">Housed</div>
                          <div className="text-base font-bold text-[#166534]">{f.currentCattleHoused}</div>
                        </div>
                        <div>
                          <div className="text-slate-500 font-medium">Solar Power</div>
                          <div className="text-base font-bold text-amber-700">{f.solarCapacityKw} kW</div>
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-2">
                        <div className="font-bold text-slate-700">Shed Allocations:</div>
                        {f.sheds.map((s) => (
                          <div key={s.shedId} className="flex items-center justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-600">{s.name} ({s.purpose})</span>
                            <span className="font-semibold text-slate-800">{s.occupied} / {s.capacity}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 text-slate-500">
                        <strong>Lead Vet:</strong> {f.leadVeterinarianName} • <strong>Manager:</strong> {f.leadManagerName}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* ═════════════════════════════════════════════════════════════
                TAB 4: E-COMMERCE ORDERS
            ═════════════════════════════════════════════════════════════ */}
            <TabsContent value="orders" className="space-y-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID & Time</TableHead>
                    <TableHead>Customer Address</TableHead>
                    <TableHead>Items & Value</TableHead>
                    <TableHead>Fulfillment Status</TableHead>
                    <TableHead className="text-right">Update Lifecycle</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((o) => (
                    <TableRow key={o.orderId}>
                      <TableCell>
                        <div className="font-bold text-slate-900">{o.orderId}</div>
                        <div className="text-xs text-slate-500">{formatDate(o.placedAt)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-xs text-slate-800">{o.deliveryAddress.fullName}</div>
                        <div className="text-xs text-slate-500">{o.deliveryAddress.societyBuilding}, {o.deliveryAddress.city}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs font-semibold text-slate-800">
                          {o.items.map((i) => `${i.productName} (${i.quantity}x)`).join(', ')}
                        </div>
                        <div className="font-bold text-slate-900">{formatCurrency(o.grandTotalINR)}</div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={o.status === 'DELIVERED' ? 'success' : o.status === 'CANCELLED' ? 'destructive' : 'gold'}
                        >
                          {o.status.replace(/_/g, ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-1.5">
                        {o.status !== 'DELIVERED' && (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleUpdateOrderStatus(o.orderId, 'DELIVERED')}
                            className="text-xs bg-[#166534] hover:bg-[#14532D]"
                          >
                            Mark Delivered
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* ═════════════════════════════════════════════════════════════
                TAB 5: ASSET PLANS
            ═════════════════════════════════════════════════════════════ */}
            <TabsContent value="investments" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((p) => (
                  <Card key={p.id}>
                    <CardHeader>
                      <Badge variant="gold" className="text-[10px] w-fit mb-1">{p.illustrativeAnnualRunRateAPY}</Badge>
                      <CardTitle className="text-xl">{p.name}</CardTitle>
                      <CardDescription>{p.targetCattleAllocation}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 text-xs">
                      <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                        <span className="text-slate-500">Min. Capital Contribution</span>
                        <span className="font-bold text-slate-900">{formatCurrency(p.minimumContributionINR)}</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                        <span className="text-slate-500">Contract Tenure</span>
                        <span className="font-bold text-slate-900">{p.tenureMonths} Months</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                        <span className="text-slate-500">Baseline Monthly Yield</span>
                        <span className="font-bold text-[#166534]">1.5% fixed base</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                        <span className="text-slate-500">Performance Bonus Cap</span>
                        <span className="font-bold text-[#D97706]">Up to 0.5% dynamic</span>
                      </div>
                      <p className="text-[11px] text-slate-500 pt-2 leading-relaxed italic">
                        &ldquo;{p.riskDisclosureText}&rdquo;
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Cattle Detail Modal */}
          {selectedCattle && (
            <Dialog open={!!selectedCattle} onOpenChange={() => setSelectedCattle(null)}>
              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <div className="flex items-center gap-2">
                    <DialogTitle className="text-2xl font-bold">{selectedCattle.name}</DialogTitle>
                    <Badge variant="gold">{selectedCattle.rfidTag}</Badge>
                  </div>
                  <DialogDescription>
                    Breed: {selectedCattle.breed.replace(/_/g, ' ')} • Ear Tag: {selectedCattle.earTagNumber}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 text-xs py-2">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <div>
                      <div className="text-slate-500">Daily Yield</div>
                      <div className="text-base font-bold text-slate-900">{selectedCattle.telemetry.dailyAverageYieldLiters} L</div>
                    </div>
                    <div>
                      <div className="text-slate-500">Health Index</div>
                      <div className="text-base font-bold text-emerald-700">{selectedCattle.telemetry.liveHealthScore}/100</div>
                    </div>
                    <div>
                      <div className="text-slate-500">Body Temp</div>
                      <div className="text-base font-bold text-slate-900">{selectedCattle.telemetry.coreTemperatureCelsius}°C</div>
                    </div>
                    <div>
                      <div className="text-slate-500">Rumination</div>
                      <div className="text-base font-bold text-slate-900">{selectedCattle.telemetry.ruminationMinutesPerDay} m/d</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="font-bold text-slate-700">Update Biological Lifecycle Status:</div>
                    <div className="flex flex-wrap gap-2">
                      {(['Milking', 'Dry', 'Medical Observation'] as BiologicalStatus[]).map((status) => (
                        <Button
                          key={status}
                          variant={selectedCattle.biologicalStatus === status ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleUpdateCattleStatus(selectedCattle.id, status)}
                          className="text-xs"
                        >
                          {status}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-slate-600">
                    <div><strong>Insurance Policy:</strong> {selectedCattle.insurance.policyNumber} ({selectedCattle.insurance.underwriter})</div>
                    <div><strong>Facility Location:</strong> {selectedCattle.farmAllocation.facilityName} ({selectedCattle.farmAllocation.shedNumber})</div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}

        </div>
      </PortalLayout>
    </PortalGuard>
  );
}
