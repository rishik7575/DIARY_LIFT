'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { SparklesCore } from '@/components/ui/aceternity/sparkles';
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
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 flex flex-col justify-between antialiased selection:bg-amber-100 selection:text-amber-900">
      
      {/* ═══════════════════════════════════════════════════════════════════
          ENTERPRISE TOPBAR
          Deep Slate (#0F172A) with clean typography and high contrast
      ═══════════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 bg-[#0F172A] text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#166534] to-[#14532D] flex items-center justify-center text-white shadow-md border border-emerald-500/30 group-hover:scale-105 transition-transform">
              <Milk className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-black tracking-tight text-white leading-none">
                DAIRY<span className="text-[#D97706]">-LIFT</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 mt-1">
                Institutional Dairy ERP
              </span>
            </div>
          </Link>

          {/* Nav Quick Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-300">
            <Link href="/consumer" className="hover:text-white transition-colors">
              Consumer Store
            </Link>
            <Link href="/investor" className="hover:text-white transition-colors">
              Investor Suite
            </Link>
            <Link href="/staff" className="hover:text-white transition-colors">
              Farm Staff ERP
            </Link>
            <Link href="/admin" className="hover:text-white transition-colors">
              Admin Command
            </Link>
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-3">
            <Link href="/auth">
              <Button variant="gold" size="sm" className="hidden sm:inline-flex gap-1.5">
                <span>Access Portal</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
            <Link href="/auth">
              <Button variant="default" size="sm" className="bg-[#166534] hover:bg-[#14532D]">
                Sign In
              </Button>
            </Link>
          </div>

        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION WITH ACETERNITY SPARKLES
          Zero overlap: strict flex-col flow with generous padding
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0F172A] text-white py-24 md:py-32 px-6 border-b border-slate-800">
        
        {/* Aceternity UI Sparkles Core Background */}
        <div className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <SparklesCore
            id="hero-sparkles"
            background="transparent"
            minSize={0.8}
            maxSize={2.4}
            particleDensity={60}
            particleColor="#FCD34D"
          />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          
          {/* Institutional Model Pill */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge
              variant="gold"
              className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-8 bg-amber-400/20 text-amber-300 border-amber-400/40"
            >
              <Award className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
              Institutional Model: 1.5% Base Yield (18% APY) + Dynamic Milk Bonus
            </Badge>
          </motion.div>

          {/* Massive Editorial Header (Playfair Display) */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-[1.05] mb-8"
          >
            Fresh Dairy.{' '}
            <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
              Institutional Wealth.
            </span>
          </motion.h1>

          {/* High-Contrast Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-300 text-lg sm:text-xl md:text-2xl font-normal leading-relaxed max-w-3xl mx-auto mb-10"
          >
            A high-specification agritech ERP bridging urban capital with Indian dairy farming. Own insured, biometrically tagged cattle assets with{' '}
            <strong className="text-white font-bold">contractual 1.5% monthly base cashflow</strong>{' '}
            and dynamic performance bonuses paid directly from verified milk production.
          </motion.p>

          {/* Primary Action Button Routing to Auth Gateway */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Link href="/auth" className="w-full sm:w-auto">
              <Button
                variant="default"
                size="lg"
                className="w-full sm:w-auto h-14 px-8 text-base font-bold bg-[#166534] hover:bg-[#14532D] shadow-lg shadow-emerald-900/40 text-white rounded-xl"
              >
                <span>Launch Enterprise Gateway</span>
                <ArrowRight className="w-5 h-5 ml-2.5" />
              </Button>
            </Link>

            <Link href="/consumer" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto h-14 px-8 text-base font-bold border-slate-700 bg-slate-800/80 text-white hover:bg-slate-700 rounded-xl"
              >
                <ShoppingCart className="w-4.5 h-4.5 mr-2 text-emerald-400" />
                <span>Shop Fresh Dairy (12m)</span>
              </Button>
            </Link>
          </motion.div>

          {/* Yield Stability Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 w-full max-w-4xl text-left">
            {[
              { label: 'Fixed Base Yield', val: '1.5% / mo', sub: '18% Annualized APY', icon: Percent },
              { label: 'Performance Bonus', val: 'Up to 0.5%', sub: 'Tied to Milk Offtake', icon: TrendingUp },
              { label: 'Yield Reserve Ratio', val: '145.0%', sub: '6.4 mo dry buffer', icon: ShieldCheck },
              { label: 'Asset Insurance', val: '100% Covered', sub: 'New India Assurance', icon: Shield },
            ].map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white/[0.06] border border-white/10 backdrop-blur-md"
              >
                <item.icon className="w-4 h-4 text-amber-400 mb-2" />
                <div className="font-display text-2xl font-bold text-white">{item.val}</div>
                <div className="text-xs font-semibold text-slate-300 mt-0.5">{item.label}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{item.sub}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          4-PORTAL GATEWAY OVERVIEW
          Crisp White Canvas (#FFFFFF & #FAFAFA), Clean Shadcn UI Cards
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 max-w-7xl mx-auto w-full">
        
        <div className="max-w-3xl mb-14">
          <Badge variant="default" className="bg-[#166534] text-xs uppercase px-3 py-1 font-bold mb-3">
            Integrated Enterprise Architecture
          </Badge>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Four Interconnected Portals. One Relational Ledger.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            Every transaction, milk log, and dividend payout connects in real time through our institutional livestock schema.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Portal 1 */}
          <Card className="hover:shadow-md transition-shadow flex flex-col justify-between">
            <CardHeader>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#166534] mb-3">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">Consumer Store</CardTitle>
              <CardDescription>
                Hyper-local 12-min quick commerce for single-origin A2 Gir milk, bilona ghee, and artisan dairy.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/consumer">
                <Button variant="outline" className="w-full justify-between text-xs font-bold">
                  <span>Open Storefront</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Portal 2 */}
          <Card className="hover:shadow-md transition-shadow flex flex-col justify-between border-amber-200 ring-1 ring-amber-500/10">
            <CardHeader>
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#D97706] mb-3">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Investor Suite</CardTitle>
                <Badge variant="gold" className="text-[10px]">1.5% Base</Badge>
              </div>
              <CardDescription>
                Track live cattle assets, IoT telemetry, monthly dividend ledger, and yield reserve health.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/investor">
                <Button variant="default" className="w-full justify-between text-xs font-bold bg-[#166534] hover:bg-[#14532D]">
                  <span>Investor Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Portal 3 */}
          <Card className="hover:shadow-md transition-shadow flex flex-col justify-between">
            <CardHeader>
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 mb-3">
                <ClipboardList className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">Farm Staff ERP</CardTitle>
              <CardDescription>
                Operational dairy management: AM/PM milk logging, Fat & SNF testing, and IoT collar veterinary alerts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/staff">
                <Button variant="outline" className="w-full justify-between text-xs font-bold">
                  <span>Staff Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Portal 4 */}
          <Card className="hover:shadow-md transition-shadow flex flex-col justify-between">
            <CardHeader>
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">Master Admin</CardTitle>
              <CardDescription>
                Executive command center for platform revenue analytics, herd health index, and dividend disbursements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin">
                <Button variant="outline" className="w-full justify-between text-xs font-bold">
                  <span>Admin Command</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>

        </div>

      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CORPORATE FOOTER
          Deep Slate (#090D16) with compliance details
      ═══════════════════════════════════════════════════════════════════ */}
      <footer className="bg-[#090D16] text-slate-400 py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
          
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#166534] flex items-center justify-center text-white">
              <Milk className="w-4 h-4" />
            </div>
            <span className="font-display text-lg font-bold text-white">
              DAIRY<span className="text-[#D97706]">-LIFT</span>
            </span>
            <span className="text-slate-500 ml-2">Technologies Pvt. Ltd.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
            <span>FSSAI Lic: #10024021000842</span>
            <span>CIN: U01100MH2024PTC394821</span>
            <span>New India Assurance Covered</span>
            <Link href="/auth" className="text-amber-400 hover:underline">
              Gateway Login
            </Link>
          </div>

          <div className="text-slate-500">
            © 2026 Dairy-Lift. Institutional Agri-Asset Architecture.
          </div>

        </div>
      </footer>

    </div>
  );
}
