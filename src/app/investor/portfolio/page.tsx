'use client';

import React, { useState, useEffect } from 'react';
import PortalGuard from '@/components/layout/PortalGuard';
import PortalLayout from '@/components/layout/PortalLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { investmentService, cattleService } from '@/lib/services';
import { InvestorProfile } from '@/lib/types/investor';
import { CattleAsset } from '@/lib/types/cattle';
import { useAuth } from '@/lib/auth/AuthContext';
import { formatCurrency } from '@/lib/utils';
import {
  Milk,
  Activity,
  ShieldCheck,
  TrendingUp,
  Thermometer,
  Layers,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';

export default function PortfolioPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<InvestorProfile | null>(null);
  const [assignedCattle, setAssignedCattle] = useState<CattleAsset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [portfolioData, allCattle] = await Promise.all([
          investmentService.getPortfolio(user?.investorId || user?.email || 'INV-DL-1001'),
          cattleService.getAll(),
        ]);
        if (portfolioData) {
          setProfile(portfolioData);
          const userCattle = allCattle.filter((c) =>
            portfolioData.portfolio.allocatedCattleIds.includes(c.id)
          );
          setAssignedCattle(userCattle);
        }
      } catch (err) {
        console.error('Failed to load cattle portfolio:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user]);

  if (loading || !profile) {
    return (
      <PortalGuard allowedRoles={['investor', 'consumer', 'admin']}>
        <PortalLayout allowedRoles={['investor', 'consumer', 'admin']}>
          <div className="py-20 text-center text-slate-500">Loading assigned cattle assets...</div>
        </PortalLayout>
      </PortalGuard>
    );
  }

  const totalYield = assignedCattle.reduce((s, c) => s + (c.telemetry?.dailyAverageYieldLiters || 14.5), 0);

  return (
    <PortalGuard allowedRoles={['investor', 'consumer', 'admin']}>
      <PortalLayout allowedRoles={['investor', 'consumer', 'admin']}>
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <Link href="/investor" className="text-slate-500 hover:text-slate-900 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-1" />
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold font-serif text-slate-900 tracking-tight">
                My Allocated Cattle Units
              </h1>
              <Badge className="bg-forest-100 text-forest-800 border-forest-200">
                {assignedCattle.length} Units Active
              </Badge>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              Live biometric monitoring, IoT collar telemetry, and lactation yield attribution for {profile.fullName}.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/investor">
              <Button variant="outline" size="sm" className="border-slate-300">
                Back to Financial Suite
              </Button>
            </Link>
          </div>
        </div>

        {/* Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Allocated Assets</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-slate-900">{assignedCattle.length} Units</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">A2 Gir Indigenous & Murrah</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-700">
                <Milk className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Combined Daily Yield</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-slate-900">{totalYield.toFixed(1)} L/day</span>
                </div>
                <p className="text-xs text-forest-700 font-medium mt-1">Generates Dynamic Milk Bonus</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700">
                <TrendingUp className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Mortality Protection</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-slate-900">100% Policy</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">The New India Assurance</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cattle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {assignedCattle.map((c) => (
            <Card key={c.id} className="border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold font-serif">{c.name}</h3>
                    <Badge className="bg-forest-600 text-white font-mono text-xs">{c.rfidTag}</Badge>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    {c.breed.replace(/_/g, ' ')} • {c.farmAllocation?.facilityId || 'FAC-01'} ({c.farmAllocation?.shedNumber || 'Shed 1'}) • Lactation #{c.lactation?.lactationNumber || 1}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-3xl">
                  🐄
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-slate-500">Biological Status</span>
                    <p className="font-bold text-slate-900 mt-0.5 capitalize">{c.biologicalStatus}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-slate-500">Daily Average Yield</span>
                    <p className="font-bold text-forest-700 mt-0.5">{c.telemetry?.dailyAverageYieldLiters || 14.5} Liters/day</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-slate-500">Acquisition Cost</span>
                    <p className="font-bold text-slate-900 mt-0.5">{formatCurrency(c.costBasisINR)}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-slate-500">Mortality Policy</span>
                    <p className="font-bold text-slate-900 mt-0.5 font-mono">{c.insurance?.policyNumber || 'NIA-DL-98421'}</p>
                  </div>
                </div>

                {/* IoT Biometrics */}
                <div className="border-t border-slate-100 pt-3">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-forest-700" />
                      Live Smart-Collar Telemetry
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">Real-time MQTT Stream</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs text-center font-mono">
                    <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                      <span className="text-[10px] text-slate-500 block">BODY TEMP</span>
                      <span className="font-bold text-slate-800">{c.telemetry?.coreTemperatureCelsius || 38.6}°C</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                      <span className="text-[10px] text-slate-500 block">RUMINATION</span>
                      <span className="font-bold text-slate-800">{c.telemetry?.ruminationMinutesPerDay || 490} min/d</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                      <span className="text-[10px] text-slate-500 block">DAILY ACTIVITY</span>
                      <span className="font-bold text-slate-800">{c.telemetry?.activityIndex || 78}% Grazing</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </PortalLayout>
    </PortalGuard>
  );
}
