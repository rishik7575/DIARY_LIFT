'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Milk,
  ShieldCheck,
  TrendingUp,
  Activity,
  Layers,
  Thermometer,
  Zap,
  Award,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
  Users,
  Compass,
  FileText,
  Clock,
  ExternalLink,
  ShieldAlert,
  ShoppingCart,
  ClipboardList,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FCFCF9] text-[#0F172A] flex flex-col antialiased selection:bg-[#FDF9F0] selection:text-[#A67920]">
      
      {/* 1. TOP GLOBAL SIMULATION BAR */}
      <aside aria-label="Demo notice" className="bg-[#0F172A] text-white py-2 px-4 border-b border-slate-800 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="dl-simulation-badge">Demo Environment</span>
          <span className="text-slate-300 font-medium text-xs">
            DairyLift Enterprise Ecosystem — Operational Simulation & Illustrative Dairy Modeling
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/auth" className="text-slate-300 hover:text-white text-xs font-semibold underline underline-offset-4">
            Unified Auth Gateway &rarr;
          </Link>
        </div>
      </aside>

      {/* 2. NAVIGATION HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] transition-shadow">
        <div className="dl-container h-18 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#14532D] flex items-center justify-center text-white shadow-sm group-hover:bg-[#0B3B24] transition-colors">
              <Milk className="w-6 h-6" />
            </div>
            <div>
              <span className="font-serif font-bold text-xl text-[#0F172A] tracking-tight block">
                DairyLift
              </span>
              <span className="text-[10px] uppercase font-bold text-[#14532D] tracking-wider block">
                Agro-Tech Ecosystem
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-[#475569]">
            <a href="#ecosystem" className="hover:text-[#14532D] transition-colors">Ecosystem</a>
            <a href="#technology" className="hover:text-[#14532D] transition-colors">Farm Telemetry</a>
            <a href="#products" className="hover:text-[#14532D] transition-colors">Fresh Dairy</a>
            <a href="#investment" className="hover:text-[#14532D] transition-colors">Co-Ownership</a>
            <a href="#sustainability" className="hover:text-[#14532D] transition-colors">Sustainability</a>
          </nav>

          {/* Quick Portal Action Buttons */}
          <div className="flex items-center gap-3">
            <Link href="/consumer">
              <Button variant="outline" size="sm" className="hidden sm:inline-flex border-[#CBD5E1] text-[#0F172A] hover:bg-[#F8FAFC]">
                <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                Store
              </Button>
            </Link>
            <Link href="/auth">
              <Button variant="forest" size="sm" className="bg-[#14532D] hover:bg-[#0B3B24] text-white">
                Launch Portals <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION (Balanced 2-Column Desktop Grid) */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 border-b border-[#E2E8F0] overflow-hidden bg-gradient-to-b from-[#F7F4EA]/40 via-[#FCFCF9] to-[#FCFCF9]">
        <div className="dl-container grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <Badge variant="forest" className="font-bold tracking-wider uppercase text-[11px] py-1 px-3">
                High-Tech Dairy Ecosystem
              </Badge>
              <span className="text-xs text-[#64748B] font-medium">Nashik & Pune Agro-Valleys</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#0F172A] tracking-tight leading-[1.15]">
              Where Precision Agritech Meets Institutional Dairy Wealth.
            </h1>

            <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-xl">
              DairyLift bridges rural livestock infrastructure with urban capital and direct consumer commerce. Experience smart-collar IoT telemetry, automated rotary milking, and transparent livestock co-ownership.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/consumer/invest">
                <Button variant="forest" size="lg" className="bg-[#14532D] hover:bg-[#0B3B24] text-white shadow-md">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Explore Co-Ownership
                </Button>
              </Link>
              <Link href="/consumer">
                <Button variant="outline" size="lg" className="border-[#CBD5E1] text-[#0F172A] hover:bg-[#F8FAFC]">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Order Farm Milk
                </Button>
              </Link>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E2E8F0]">
              <div>
                <span className="text-2xl lg:text-3xl font-bold font-serif text-[#0F172A] block">1,900+</span>
                <span className="text-xs text-[#64748B] font-medium">Indigenous Cattle</span>
              </div>
              <div>
                <span className="text-2xl lg:text-3xl font-bold font-serif text-[#14532D] block">1.5%</span>
                <span className="text-xs text-[#64748B] font-medium">Base Monthly Yield (Sim.)</span>
              </div>
              <div>
                <span className="text-2xl lg:text-3xl font-bold font-serif text-[#C9962B] block">145%</span>
                <span className="text-xs text-[#64748B] font-medium">Yield Reserve Buffer</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[20px] overflow-hidden border border-[#E2E8F0] shadow-xl bg-slate-900 group">
              <Image
                src="/images/hero_dairy_farm.jpg"
                alt="DairyLift Modern Agro-Park Facility at Sunrise"
                width={1200}
                height={675}
                priority
                className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Floating Facility Tag */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/50 text-[#0F172A] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#14532D] tracking-wider block">Facility Overview</span>
                  <span className="text-sm font-bold text-[#0F172A] block">Nashik Agro-Park Unit A (120 Acres)</span>
                </div>
                <Badge variant="forest" className="shrink-0">
                  <Activity className="w-3 h-3 mr-1" />
                  Telemetry Online
                </Badge>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. FOUR PORTALS ECOSYSTEM SECTION */}
      <section id="ecosystem" className="py-16 md:py-24 border-b border-[#E2E8F0] bg-white">
        <div className="dl-container space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="forest" className="text-[11px] uppercase font-bold">
              Integrated Architecture
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A] tracking-tight">
              One Unified Ecosystem. Four Specialized Portals.
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
              Every participant in the dairy lifecycle is connected through specialized, role-tailored interfaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Portal 1: Master Admin */}
            <Card className="dl-card dl-card-hover border-[#E2E8F0] flex flex-col justify-between">
              <div>
                <CardHeader className="p-6 pb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center text-[#14532D] mb-4">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <Badge variant="forest" className="w-fit mb-2 text-[10px]">Master Command</Badge>
                  <CardTitle className="text-lg font-bold text-[#0F172A]">1. Executive ERP</CardTitle>
                  <CardDescription className="text-xs text-[#64748B]">
                    Multi-facility operations, environmental threshold rules, investment plan versioning, and pricing control.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-2 text-xs text-[#475569]">
                  <p>• IoT climate threshold triggers (32.4°C breach)</p>
                  <p>• Plan lifecycle: Draft &rarr; Review &rarr; Publish</p>
                  <p>• Dynamic catalog retail pricing & stock controls</p>
                </CardContent>
              </div>
              <div className="p-6 pt-0">
                <Link href="/admin">
                  <Button variant="outline" size="sm" className="w-full border-[#CBD5E1] text-[#0F172A] hover:bg-[#F8FAFC] font-semibold">
                    Open Admin Command <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Portal 2: Farm Staff */}
            <Card className="dl-card dl-card-hover border-[#E2E8F0] flex flex-col justify-between">
              <div>
                <CardHeader className="p-6 pb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center text-[#14532D] mb-4">
                    <ClipboardList className="w-6 h-6" />
                  </div>
                  <Badge variant="forest" className="w-fit mb-2 text-[10px]">Field Operations</Badge>
                  <CardTitle className="text-lg font-bold text-[#0F172A]">2. Farm Staff ERP</CardTitle>
                  <CardDescription className="text-xs text-[#64748B]">
                    Milking parlour meter logging, IoT temperature mitigation action workflows, and clinical veterinary health.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-2 text-xs text-[#475569]">
                  <p>• Shift AM/PM parlour milk entry with fat/SNF scoring</p>
                  <p>• Action Center: Misting & ventilation mitigation</p>
                  <p>• Vaccine registry & calf pedigree lineage</p>
                </CardContent>
              </div>
              <div className="p-6 pt-0">
                <Link href="/staff">
                  <Button variant="outline" size="sm" className="w-full border-[#CBD5E1] text-[#0F172A] hover:bg-[#F8FAFC] font-semibold">
                    Open Staff ERP <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Portal 3: Investor Suite */}
            <Card className="dl-card dl-card-hover border-[#E2E8F0] flex flex-col justify-between">
              <div>
                <CardHeader className="p-6 pb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FDF9F0] border border-[#EEDDB4] flex items-center justify-center text-[#C9962B] mb-4">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <Badge variant="gold" className="w-fit mb-2 text-[10px]">Wealth & Asset</Badge>
                  <CardTitle className="text-lg font-bold text-[#0F172A]">3. Investor Suite</CardTitle>
                  <CardDescription className="text-xs text-[#64748B]">
                    Institutional asset transparency, 1.5% fixed base yield modeling, Yield Reserve health, and live cattle RFID telemetry.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-2 text-xs text-[#475569]">
                  <p>• Verifiable NEFT dividend credit history</p>
                  <p>• 145% Yield Reserve Escrow liquidity gauge</p>
                  <p>• Dynamic Scenario Calculator with parlour bonuses</p>
                </CardContent>
              </div>
              <div className="p-6 pt-0">
                <Link href="/investor">
                  <Button variant="outline" size="sm" className="w-full border-[#CBD5E1] text-[#0F172A] hover:bg-[#F8FAFC] font-semibold">
                    Open Investor Suite <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Portal 4: Consumer Store */}
            <Card className="dl-card dl-card-hover border-[#E2E8F0] flex flex-col justify-between">
              <div>
                <CardHeader className="p-6 pb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#2563EB] mb-4">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  <Badge variant="info" className="w-fit mb-2 text-[10px]">Quick-Commerce</Badge>
                  <CardTitle className="text-lg font-bold text-[#0F172A]">4. Consumer Store</CardTitle>
                  <CardDescription className="text-xs text-[#64748B]">
                    Farm-fresh A2 milk, Vedic bilona ghee, cultured paneer delivered in sub-15 minutes in cold-chain crates.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-2 text-xs text-[#475569]">
                  <p>• Live pricing & inventory sync with Admin ERP</p>
                  <p>• Slide-over cart drawer with delivery slot picker</p>
                  <p>• Seamless Customer &rarr; Investor Co-Ownership path</p>
                </CardContent>
              </div>
              <div className="p-6 pt-0">
                <Link href="/consumer">
                  <Button variant="outline" size="sm" className="w-full border-[#CBD5E1] text-[#0F172A] hover:bg-[#F8FAFC] font-semibold">
                    Open Consumer Store <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </Card>

          </div>
        </div>
      </section>

      {/* 5. FARM TECHNOLOGY & IOT TELEMETRY SECTION */}
      <section id="technology" className="py-16 md:py-24 border-b border-[#E2E8F0] bg-[#FCFCF9]">
        <div className="dl-container grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[20px] overflow-hidden border border-[#E2E8F0] shadow-lg">
              <Image
                src="/images/smart_collar_telemetry.jpg"
                alt="Purebred Indian Gir Cow with Biometric Smart Collar"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
              <div className="absolute top-4 left-4 p-3 rounded-lg bg-white/90 backdrop-blur-md border border-white/60 text-xs shadow-sm">
                <div className="flex items-center gap-1.5 font-bold text-[#0F172A]">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
                  Collar ID: TAG-GIR-0182
                </div>
                <div className="text-[11px] text-[#64748B] mt-0.5">
                  Body Temp: 38.6°C • Rumination: 480 min/day
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <Badge variant="forest" className="text-[11px] uppercase font-bold">
              Precision Dairy Intelligence
            </Badge>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A] tracking-tight">
              24/7 Smart-Collar Biometrics & Automated Barn Control.
            </h2>

            <p className="text-base text-[#475569] leading-relaxed">
              Every cow in the DairyLift ecosystem is equipped with a weatherproof smart collar monitoring core body temperature, rumination cycles, estrus detection, and grazing activity.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs space-y-1.5">
                <Thermometer className="w-5 h-5 text-[#DC2626]" />
                <h4 className="text-sm font-bold text-[#0F172A]">Heat Stress Prevention</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Automated misting and ventilation kick in if shed temperature exceeds 30.0°C.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs space-y-1.5">
                <Activity className="w-5 h-5 text-[#14532D]" />
                <h4 className="text-sm font-bold text-[#0F172A]">Subclinical Mastitis Alerts</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  In-line electrical conductivity sensors detect early inflammation before symptoms appear.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. AUTOMATED MILKING PARLOUR & CHILLING */}
      <section className="py-16 md:py-24 border-b border-[#E2E8F0] bg-white">
        <div className="dl-container grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <Badge variant="forest" className="text-[11px] uppercase font-bold">
              Sanitary Milking Technology
            </Badge>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A] tracking-tight">
              Touch-Free Milking & Instant Cold Chilling in 90 Seconds.
            </h2>

            <p className="text-base text-[#475569] leading-relaxed">
              Milk never comes into contact with human hands or open air. Automated stainless-steel vacuum clusters record yield volume per quarter and immediately route raw milk to 3.5°C refrigerated bulk chillers.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                <CheckCircle2 className="w-5 h-5 text-[#14532D] shrink-0" />
                <span className="text-xs text-[#0F172A] font-semibold">
                  Zero Hormones, Oxytocin, or Antibiotics Residue in Batches
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                <CheckCircle2 className="w-5 h-5 text-[#14532D] shrink-0" />
                <span className="text-xs text-[#0F172A] font-semibold">
                  Automated CIP (Clean-In-Place) Alkaline Wash After Every Session
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                <CheckCircle2 className="w-5 h-5 text-[#14532D] shrink-0" />
                <span className="text-xs text-[#0F172A] font-semibold">
                  Composite Lab Scoring: Grade-A+ Direct to Cold E-Commerce
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="rounded-[20px] overflow-hidden border border-[#E2E8F0] shadow-lg">
              <Image
                src="/images/rotary_milking_parlour.jpg"
                alt="Automated Milking Parlour with Digital Telemetry Displays"
                width={1200}
                height={675}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 7. FRESH DAIRY PRODUCT CATALOG PREVIEW */}
      <section id="products" className="py-16 md:py-24 border-b border-[#E2E8F0] bg-[#FCFCF9]">
        <div className="dl-container space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <Badge variant="forest" className="text-[11px] uppercase font-bold">
                Farm to Table
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A] tracking-tight mt-2">
                Pure Indigenous A2 Dairy Lineup.
              </h2>
              <p className="text-sm text-[#64748B] mt-1">
                Delivered under 15 minutes in climate-controlled electric vehicle crates.
              </p>
            </div>

            <Link href="/consumer">
              <Button variant="forest" size="sm" className="bg-[#14532D] hover:bg-[#0B3B24] text-white">
                View Full Catalog & Pricing <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            
            <div className="md:col-span-2 rounded-[20px] overflow-hidden border border-[#E2E8F0] shadow-lg">
              <Image
                src="/images/dairy_products_collection.jpg"
                alt="DairyLift A2 Milk, Vedic Bilona Ghee, and Cultured Paneer"
                width={1200}
                height={900}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="space-y-4">
              <Card className="dl-card border-[#E2E8F0] p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A]">Raw A2 Gir Cow Milk</h4>
                    <p className="text-xs text-[#64748B] mt-0.5">Whole, non-homogenized, 4.6% fat</p>
                  </div>
                  <span className="font-mono font-bold text-[#14532D] text-base">₹92 / L</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-[#F1F5F9]">
                  <span className="text-[#22C55E] font-semibold">In Stock • AM Batch</span>
                  <Link href="/consumer">
                    <Button variant="ghost" size="sm" className="h-7 text-xs font-bold text-[#14532D]">
                      Add &rarr;
                    </Button>
                  </Link>
                </div>
              </Card>

              <Card className="dl-card border-[#E2E8F0] p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A]">Vedic Bilona Ghee</h4>
                    <p className="text-xs text-[#64748B] mt-0.5">Slow-cooked curd-churned golden elixir</p>
                  </div>
                  <span className="font-mono font-bold text-[#14532D] text-base">₹1,450 / 500ml</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-[#F1F5F9]">
                  <span className="text-[#C9962B] font-semibold">Hand-Crafted Earthen Pot</span>
                  <Link href="/consumer">
                    <Button variant="ghost" size="sm" className="h-7 text-xs font-bold text-[#14532D]">
                      Add &rarr;
                    </Button>
                  </Link>
                </div>
              </Card>

              <Card className="dl-card border-[#E2E8F0] p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A]">Artisanal Malai Paneer</h4>
                    <p className="text-xs text-[#64748B] mt-0.5">Citrus-curdled fresh cottage cheese</p>
                  </div>
                  <span className="font-mono font-bold text-[#14532D] text-base">₹185 / 200g</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-[#F1F5F9]">
                  <span className="text-[#22C55E] font-semibold">Vacuum Sealed</span>
                  <Link href="/consumer">
                    <Button variant="ghost" size="sm" className="h-7 text-xs font-bold text-[#14532D]">
                      Add &rarr;
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>

          </div>

        </div>
      </section>

      {/* 8. CO-OWNERSHIP & FINANCIAL TRANSPARENCY SECTION */}
      <section id="investment" className="py-16 md:py-24 border-b border-[#E2E8F0] bg-white">
        <div className="dl-container space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="gold" className="text-[11px] uppercase font-bold">
              Livestock Co-Ownership Model
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F172A] tracking-tight">
              Sustainable Agritech Yields Backstopped by Reserve Escrow.
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
              Earn a fixed 1.5% monthly base yield (18% annualized) with dynamic parlour milk performance bonuses up to 0.5% monthly, protected by our dedicated Yield Reserve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <Card className="dl-card border-[#E2E8F0] p-6 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#FDF9F0] border border-[#EEDDB4] flex items-center justify-center text-[#C9962B]">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">Fixed 1.5% Monthly Base</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Direct monthly dividend credited via automated NEFT on the 1st of each month, simulating physical livestock milk commerce returns.
              </p>
            </Card>

            <Card className="dl-card border-[#E2E8F0] p-6 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center text-[#14532D]">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">Dynamic Parlour Bonus</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Receive up to an additional 0.5% monthly based on verifiable digital milk production meter logs recorded in our parlours.
              </p>
            </Card>

            <Card className="dl-card border-[#E2E8F0] p-6 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#2563EB]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">145% Yield Reserve Health</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                ₹8.45 Crores dedicated liquidity escrow buffer provides 6.4 months of stress coverage against biological dry-off gaps.
              </p>
            </Card>

          </div>

          <div className="p-4 rounded-xl bg-[#FDF9F0] border border-[#EEDDB4] text-xs text-[#92400E] flex items-start gap-3">
            <span className="font-bold shrink-0">COMPLIANCE NOTICE:</span>
            <span>
              All financial run-rates and models shown are illustrative simulation scenarios for Phase 1 demonstration. Real-world returns are subject to agricultural biological cycles. DairyLift does not make claims of guaranteed financial returns.
            </span>
          </div>

          <div className="flex justify-center">
            <Link href="/consumer/invest">
              <Button variant="forest" size="lg" className="bg-[#14532D] hover:bg-[#0B3B24] text-white">
                Launch Co-Ownership Scenario Calculator <ChevronRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>

        </div>
      </section>

      {/* 9. SUSTAINABILITY & ZERO-CARBON INITIATIVES */}
      <section id="sustainability" className="py-16 md:py-24 border-b border-[#E2E8F0] bg-[#FCFCF9]">
        <div className="dl-container space-y-8">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <Badge variant="forest" className="text-[11px] uppercase font-bold">
              Ecological Stewardship
            </Badge>
            <h2 className="text-3xl font-serif font-bold text-[#0F172A] tracking-tight">
              Sustainable Closed-Loop Agriculture.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-2">
              <span className="text-2xl font-bold font-serif text-[#14532D]">400 kW</span>
              <h4 className="text-sm font-bold text-[#0F172A]">Rooftop Solar Generation</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Powers all milk chillers, automated rotary parlours, and cooling mist fans with 100% renewable solar energy.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-2">
              <span className="text-2xl font-bold font-serif text-[#14532D]">16 Tons/day</span>
              <h4 className="text-sm font-bold text-[#0F172A]">Hydroponic Maize & Barley</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Uses 95% less water than traditional pasture farming, producing fresh nutrient-dense green sprouts daily.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-2">
              <span className="text-2xl font-bold font-serif text-[#14532D]">Zero Slurry</span>
              <h4 className="text-sm font-bold text-[#0F172A]">Anaerobic Biogas Digesters</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                All cattle manure is converted into clean organic methane gas and certified pathogen-free vermicompost.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 10. FINAL CALL TO ACTION BANNER */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-[#0F172A] via-[#0B3B24] to-[#0F172A] text-white">
        <div className="dl-container text-center space-y-6 max-w-3xl mx-auto">
          <Badge className="bg-[#C9962B]/20 text-[#FCD34D] border-[#C9962B]/30 text-xs py-1 px-3">
            Enterprise Agriculture
          </Badge>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight">
            Ready to Experience the DairyLift Ecosystem?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Whether you want to order fresh farm milk, inspect IoT herd telemetry as farm staff, or model livestock co-ownership yields as an investor, our platform is ready.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/auth">
              <Button variant="forest" size="lg" className="bg-[#14532D] hover:bg-[#0B3B24] text-white shadow-lg">
                Access Platform Gateway &rarr;
              </Button>
            </Link>
            <Link href="/consumer">
              <Button variant="outline" size="lg" className="border-slate-700 bg-white/10 text-white hover:bg-white/20">
                Explore Dairy Store
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 11. ENTERPRISE FOOTER */}
      <footer className="bg-[#0F172A] text-white border-t border-slate-800 pt-16 pb-12 text-xs">
        <div className="dl-container space-y-12">
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            
            <div className="col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#14532D] flex items-center justify-center text-white">
                  <Milk className="w-4 h-4" />
                </div>
                <span className="font-serif font-bold text-lg text-white">DairyLift</span>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-sm">
                A technology-driven institutional dairy ecosystem connecting farm operations, IoT collar telemetry, sustainable co-ownership, and cold-chain commerce.
              </p>
              <span className="text-[11px] text-slate-500 block">
                Operating Facilities in Nashik and Pune, Maharashtra, India.
              </span>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-white uppercase text-[11px] tracking-wider">Portals</h5>
              <ul className="space-y-1.5 text-slate-400">
                <li><Link href="/admin" className="hover:text-white">Admin Command</Link></li>
                <li><Link href="/staff" className="hover:text-white">Farm Staff ERP</Link></li>
                <li><Link href="/investor" className="hover:text-white">Investor Suite</Link></li>
                <li><Link href="/consumer" className="hover:text-white">Consumer Store</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-white uppercase text-[11px] tracking-wider">Technology</h5>
              <ul className="space-y-1.5 text-slate-400">
                <li><a href="#technology" className="hover:text-white">Smart Collar IoT</a></li>
                <li><a href="#technology" className="hover:text-white">Milking Rotary Tech</a></li>
                <li><a href="#sustainability" className="hover:text-white">Solar Cold Chain</a></li>
                <li><a href="#investment" className="hover:text-white">Yield Reserve</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-white uppercase text-[11px] tracking-wider">Governance</h5>
              <ul className="space-y-1.5 text-slate-400">
                <li><Link href="/legal" className="hover:text-white">Risk Disclosure</Link></li>
                <li><Link href="/legal" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/legal" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/legal" className="hover:text-white">Cold Delivery Policy</Link></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
            <p>&copy; {new Date().getFullYear()} DairyLift Agro-Parks Private Limited. All rights reserved.</p>
            <p>Demonstration Environment • Operational Simulation Data Model</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
