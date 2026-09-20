'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import {
  Milk,
  TrendingUp,
  ShoppingCart,
  ClipboardList,
  ShieldCheck,
  ArrowRight,
  Shield,
  Activity,
  Award,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  DollarSign,
  Percent,
  Thermometer,
  Sliders,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-900 flex flex-col justify-between antialiased selection:bg-amber-100 selection:text-amber-900">
      
      {/* ═══════════════════════════════════════════════════════════════════
          ENTERPRISE COMPLIANCE & PROTOTYPE DISCLAIMER
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="bg-[#0F172A] text-slate-300 text-xs py-2 px-6 border-b border-slate-800 text-center flex items-center justify-center gap-2">
        <span className="bg-amber-500 text-slate-900 text-[10px] font-bold uppercase px-2 py-0.5 rounded tracking-wider">
          Simulation Demo
        </span>
        <span>
          DairyLift is an enterprise agritech architecture prototype. All financial yields, sensor feeds, and audit figures are simulated for interactive demonstration.
        </span>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          EDITORIAL TOPBAR
      ═══════════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-stone-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#166534] to-[#14532D] flex items-center justify-center text-white shadow-md border border-emerald-500/30 group-hover:scale-105 transition-transform">
              <Milk className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-black tracking-tight text-slate-900 leading-none">
                DAIRY<span className="text-[#D97706]">-LIFT</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#166534] mt-1">
                Ecosystem & ERP Platform
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <Link href="/consumer" className="hover:text-[#166534] transition-colors">
              Consumer Store
            </Link>
            <Link href="/investor" className="hover:text-[#166534] transition-colors">
              Investor Suite
            </Link>
            <Link href="/staff" className="hover:text-[#166534] transition-colors">
              Farm Staff ERP
            </Link>
            <Link href="/admin" className="hover:text-[#166534] transition-colors">
              Admin Command
            </Link>
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-3">
            <Link href="/auth">
              <Button variant="outline" size="sm" className="border-stone-300 text-slate-800 hover:bg-stone-100">
                Demo Accounts
              </Button>
            </Link>
            <Link href="/auth">
              <Button variant="forest" size="sm" className="bg-[#166534] hover:bg-[#14532D] text-white">
                Launch Portals <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION: Warm Cream & Forest Green Editorial Focus
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FDFBF7] via-[#F7F4EC] to-[#FDFBF7] py-20 md:py-28 px-6 border-b border-stone-200">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 bg-[#166534]/10 border border-[#166534]/20 rounded-full px-4 py-1.5 text-xs font-semibold text-[#166534]">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            <span>High-Density Enterprise Dairy Operations & Co-Ownership ERP</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif text-slate-900 tracking-tight max-w-4xl leading-[1.15]">
            Bridging Urban Capital with Precision Agritech & Dairy Operations.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            DairyLift combines high-precision parlour IoT telemetry, veterinary health monitoring, sub-15 minute cold-chain commerce, and sustainable livestock asset co-ownership.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/auth">
              <Button
                variant="forest"
                size="lg"
                className="bg-[#166534] hover:bg-[#14532D] text-white font-semibold shadow-md px-8 h-12 text-sm"
              >
                Explore the 4 Portals <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            <Link href="/consumer">
              <Button
                variant="outline"
                size="lg"
                className="border-stone-300 bg-white hover:bg-stone-50 text-slate-800 font-semibold px-8 h-12 text-sm"
              >
                Browse Fresh Farm Catalog
              </Button>
            </Link>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mt-12 text-left">
            <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Baseline Model</span>
              <div className="text-2xl font-bold text-[#166534] font-serif mt-1">1.5% / Month</div>
              <p className="text-xs text-slate-500 mt-0.5">Fixed Monthly Run-Rate (Demo)</p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Dynamic Bonus</span>
              <div className="text-2xl font-bold text-[#D97706] font-serif mt-1">Up to +0.5%</div>
              <p className="text-xs text-slate-500 mt-0.5">Verifiable Parlour Milk Yield</p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Yield Reserve Buffer</span>
              <div className="text-2xl font-bold text-slate-900 font-serif mt-1">145% Optimal</div>
              <p className="text-xs text-slate-500 mt-0.5">Dry-Cycle Cashflow Escrow</p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Active IoT Fleet</span>
              <div className="text-2xl font-bold text-slate-900 font-serif mt-1">1,280 Units</div>
              <p className="text-xs text-slate-500 mt-0.5">Nashik & Pune Pastures</p>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          THE FOUR ARCHITECTURAL PORTALS (Brand + Trust)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center space-y-2 mb-12">
          <Badge variant="outline" className="border-stone-300 text-slate-700 bg-white font-semibold">
            Unified System Architecture
          </Badge>
          <h2 className="text-3xl font-bold font-serif text-slate-900 tracking-tight">
            Four Dedicated Portals. One Cohesive Ecosystem.
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Each role interacts with a specialized, highly functional interface designed for its operational purpose.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Portal 1: Master Admin Command */}
          <Card className="border-stone-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between">
            <CardHeader className="border-b border-stone-100 p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <Badge className="bg-slate-100 text-slate-800 border-slate-300">Executive & Governance</Badge>
              </div>
              <CardTitle className="text-xl font-bold font-serif text-slate-900">
                1. Master Command Center (/admin)
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Executive farm oversight, IoT sensor alarms, investment plan draft/approval lifecycle, and store pricing.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-3 text-xs text-slate-600">
              <p>• <strong>Environmental IoT Alarms:</strong> Monitors shed temperature spikes (e.g. 32.4°C &gt; 30.0°C) with emergency cooling controls.</p>
              <p>• <strong>Plan Lifecycle Editor:</strong> Draft, review, and approve investment allocation tiers with immutable audit history.</p>
              <p>• <strong>Store Pricing & Inventory:</strong> Direct control over milk and ghee retail prices and stock availability.</p>
            </CardContent>
            <div className="p-6 pt-0">
              <Link href="/admin">
                <Button variant="outline" className="w-full border-slate-300 text-slate-800 hover:bg-slate-50">
                  Open Admin Command <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </Card>

          {/* Portal 2: Farm Staff ERP */}
          <Card className="border-stone-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between">
            <CardHeader className="border-b border-stone-100 p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-[#166534] text-white flex items-center justify-center">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <Badge className="bg-emerald-50 text-[#166534] border-emerald-200">Field Operations</Badge>
              </div>
              <CardTitle className="text-xl font-bold font-serif text-slate-900">
                2. Farm Operations ERP (/staff)
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                High-density mobile-ready console for parlour milkers, veterinarians, and shed managers.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-3 text-xs text-slate-600">
              <p>• <strong>Parlour Milking Logger:</strong> AM/PM volume validation with duplicate-entry prevention and Fat/SNF quality scoring.</p>
              <p>• <strong>Operational Action Center:</strong> In-app notification for sensor spikes with staff mitigation action logging.</p>
              <p>• <strong>Clinical Exam Modal:</strong> Log vet diagnoses, prescribe protocols, and schedule follow-ups.</p>
            </CardContent>
            <div className="p-6 pt-0">
              <Link href="/staff">
                <Button variant="outline" className="w-full border-slate-300 text-slate-800 hover:bg-slate-50">
                  Open Farm Staff ERP <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </Card>

          {/* Portal 3: Investor Financial Suite */}
          <Card className="border-stone-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between">
            <CardHeader className="border-b border-stone-100 p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-[#D97706] text-white flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <Badge className="bg-amber-50 text-amber-800 border-amber-200">Financial Transparency</Badge>
              </div>
              <CardTitle className="text-xl font-bold font-serif text-slate-900">
                3. Investor Financial Suite (/investor)
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Institutional livestock asset co-ownership with audited dividend ledger and IoT telemetry.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-3 text-xs text-slate-600">
              <p>• <strong>Disbursement History:</strong> Stacked bar curves showing verified 1.5% fixed base + dynamic milk bonus.</p>
              <p>• <strong>Smart-Collar Telemetry:</strong> Live rumen motility, core body temperature, and daily milk yields.</p>
              <p>• <strong>Yield Reserve Audit:</strong> 145% buffer coverage ensuring 6.4 months of stress resilience during dry periods.</p>
            </CardContent>
            <div className="p-6 pt-0">
              <Link href="/investor">
                <Button variant="outline" className="w-full border-slate-300 text-slate-800 hover:bg-slate-50">
                  Open Investor Suite <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </Card>

          {/* Portal 4: Consumer Storefront */}
          <Card className="border-stone-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between">
            <CardHeader className="border-b border-stone-100 p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <Badge className="bg-blue-50 text-blue-800 border-blue-200">Quick-Commerce</Badge>
              </div>
              <CardTitle className="text-xl font-bold font-serif text-slate-900">
                4. Consumer Fresh Store (/consumer)
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Farm-to-doorstep dairy commerce with live price updates and cold-chain slot delivery.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-3 text-xs text-slate-600">
              <p>• <strong>A2 Dairy Catalog:</strong> Full cream milk, Vedic bilona ghee, cultured paneer, and artisan butter.</p>
              <p>• <strong>Slide-Over Cart Drawer:</strong> Automated delivery fee computation (&gt;₹499 free) and slot picker.</p>
              <p>• <strong>Co-Ownership Discovery:</strong> Direct educational pathway to co-owning the cows that produce the dairy.</p>
            </CardContent>
            <div className="p-6 pt-0">
              <Link href="/consumer">
                <Button variant="outline" className="w-full border-slate-300 text-slate-800 hover:bg-slate-50">
                  Open Consumer Store <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </Card>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          ENTERPRISE FOOTER
      ═══════════════════════════════════════════════════════════════════ */}
      <footer className="bg-[#0F172A] text-white border-t border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#166534] flex items-center justify-center text-white font-bold">
              DL
            </div>
            <span>DairyLift Agribusiness & Dairy ERP Systems.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/auth" className="hover:text-white">Authentication Gateway</Link>
            <Link href="/admin" className="hover:text-white">Admin Command</Link>
            <Link href="/staff" className="hover:text-white">Farm Staff ERP</Link>
            <Link href="/investor" className="hover:text-white">Investor Suite</Link>
            <Link href="/consumer" className="hover:text-white">Consumer Store</Link>
          </div>

          <div className="text-slate-500 font-mono text-[11px]">
            DEMO BUILD · PHASE 1 FRONTEND ARCHITECTURE
          </div>
        </div>
      </footer>

    </div>
  );
}
