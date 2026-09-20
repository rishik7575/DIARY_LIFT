'use client';

import React, { useState, useEffect } from 'react';
import PortalGuard from '@/components/layout/PortalGuard';
import PortalLayout from '@/components/layout/PortalLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cattleService } from '@/lib/services';
import { CattleAsset } from '@/lib/types/cattle';
import { formatCurrency, formatDate } from '@/lib/utils';
import { use } from 'react';
import {
  ArrowLeft,
  Calendar,
  ShieldCheck,
  Milk,
  Activity,
  Thermometer,
  Layers,
  Heart,
} from 'lucide-react';
import Link from 'next/link';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function CattleProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [cattle, setCattle] = useState<CattleAsset | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCattle() {
      try {
        const found = await cattleService.getById(id);
        setCattle(found);
      } catch (err) {
        console.error('Failed to load cattle detail:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCattle();
  }, [id]);

  if (loading) {
    return (
      <PortalGuard allowedRoles={['investor', 'consumer', 'admin']}>
        <PortalLayout allowedRoles={['investor', 'consumer', 'admin']}>
          <div className="py-20 text-center text-slate-500">Loading cattle biometrics...</div>
        </PortalLayout>
      </PortalGuard>
    );
  }

  if (!cattle) {
    return (
      <PortalGuard allowedRoles={['investor', 'consumer', 'admin']}>
        <PortalLayout allowedRoles={['investor', 'consumer', 'admin']}>
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🐄</div>
            <h2 className="text-2xl font-bold font-serif text-slate-900 mb-2">Cattle Asset Not Found</h2>
            <Link href="/investor/portfolio">
              <Button variant="outline" className="border-slate-300">
                Back to Portfolio
              </Button>
            </Link>
          </div>
        </PortalLayout>
      </PortalGuard>
    );
  }

  // Simulated 14-day lactation curve
  const chartData = Array.from({ length: 14 }, (_, i) => {
    const base = cattle.telemetry?.dailyAverageYieldLiters || 14.5;
    const variance = ((i % 3) - 1) * 0.8;
    return {
      day: `Day ${i + 1}`,
      yield: Math.max(8, parseFloat((base + variance).toFixed(1))),
    };
  });

  return (
    <PortalGuard allowedRoles={['investor', 'consumer', 'admin']}>
      <PortalLayout allowedRoles={['investor', 'consumer', 'admin']}>
        
        {/* Back Link */}
        <Link
          href="/investor"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-medium mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Investor Suite
        </Link>

        {/* Hero Card */}
        <Card className="border-slate-200 bg-white shadow-sm overflow-hidden mb-6">
          <div className="bg-slate-900 text-white p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/10 flex items-center justify-center text-4xl md:text-5xl">
                🐄
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl md:text-3xl font-bold font-serif">{cattle.name}</h1>
                  <Badge className="bg-forest-600 text-white font-mono text-xs">{cattle.rfidTag}</Badge>
                </div>
                <p className="text-xs md:text-sm text-slate-300 mt-1">
                  {cattle.breed.replace(/_/g, ' ')} • DOB: {formatDate(cattle.dateOfBirth)} • Lactation #{cattle.lactation?.lactationNumber || 1}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-forest-100 text-forest-800 border-forest-200 capitalize text-xs">
                    ● {cattle.biologicalStatus}
                  </Badge>
                  <span className="text-xs text-slate-400">
                    Location: {cattle.farmAllocation?.facilityId || 'FAC-01'} ({cattle.farmAllocation?.shedNumber || 'Shed 1'})
                  </span>
                </div>
              </div>
            </div>

            <div className="text-left md:text-right border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
              <span className="text-xs text-slate-400 block uppercase tracking-wider">Asset Valuation</span>
              <div className="text-2xl font-bold font-mono text-white mt-1">
                {formatCurrency(cattle.currentValuationINR || cattle.costBasisINR)}
              </div>
              <Badge variant="outline" className="border-forest-500/40 text-forest-400 bg-forest-950/40 text-[11px] mt-1.5">
                100% Mortality Insured
              </Badge>
            </div>
          </div>
        </Card>

        {/* Biometric & Lactation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Lactation Curve Chart */}
          <Card className="border-slate-200 bg-white shadow-sm lg:col-span-2">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Milk className="w-5 h-5 text-forest-700" />
                14-Day Parlour Milk Yield Trend
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Verified automated meter telemetry linked to performance bonus allocation.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
                    <YAxis stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={(v) => `${v}L`} />
                    <Tooltip
                      formatter={(val) => [`${val} Liters`, 'Daily Parlour Yield']}
                      contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '8px' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="yield"
                      stroke="#166534"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#166534' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* IoT Telemetry Card */}
          <Card className="border-slate-200 bg-white shadow-sm lg:col-span-1">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-forest-700" />
                Live Smart-Collar Telemetry
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Continuous MQTT biometric sensor broadcast.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500">Body Temperature</span>
                  <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
                    {cattle.telemetry?.coreTemperatureCelsius || 38.6}°C
                  </div>
                </div>
                <Badge className="bg-forest-100 text-forest-800 border-forest-200">Optimal (38.5-39.2)</Badge>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500">Daily Rumination</span>
                  <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
                    {cattle.telemetry?.ruminationMinutesPerDay || 490} min
                  </div>
                </div>
                <Badge className="bg-forest-100 text-forest-800 border-forest-200">Active Digestion</Badge>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500">Daily Mobility / Steps</span>
                  <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
                    {cattle.telemetry?.activityIndex || 78}% Grazing
                  </div>
                </div>
                <Badge className="bg-forest-100 text-forest-800 border-forest-200">Healthy Paddock</Badge>
              </div>

              <div className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100">
                <div className="flex justify-between">
                  <span>Collar Battery:</span>
                  <span className="font-mono font-semibold text-slate-900">{cattle.telemetry?.collarBatteryLevel || 94}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Insurance Policy:</span>
                  <span className="font-mono text-slate-700">{cattle.insurance?.policyNumber || 'NIA-DL-88291'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

      </PortalLayout>
    </PortalGuard>
  );
}
