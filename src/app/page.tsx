'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Milk, ShieldCheck, TrendingUp, Activity, Layers,
  Thermometer, Award, ChevronRight, CheckCircle2,
  ShoppingCart, ClipboardList, ShieldAlert, Leaf,
  Sun, Zap, ArrowUpRight, Star, Menu, X, Calculator,
} from 'lucide-react';

/* ── Scroll-triggered section reveal ── */
function RevealSection({ children, className = '', delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────── */

const PORTALS = [
  {
    icon: ShieldAlert,
    badge: 'Master Command',
    badgeVariant: 'forest' as const,
    title: 'Executive ERP',
    number: '01',
    description: 'Multi-facility operations, environmental threshold rules, investment plan versioning, and catalog pricing control.',
    demoEmail: 'admin@gmail.com',
    bullets: [
      'IoT climate threshold triggers (32.4°C breach)',
      'Plan lifecycle: Draft → Review → Publish',
      'Dynamic catalog retail pricing & stock controls',
    ],
    href: '/admin',
    cta: 'Open Admin Command',
    accentColor: '#059669',
    accentBg: '#ECFDF5',
  },
  {
    icon: ClipboardList,
    badge: 'Field Operations',
    badgeVariant: 'forest' as const,
    title: 'Farm Staff ERP',
    number: '02',
    description: 'Milking parlour meter logging, IoT mitigation action workflows, and veterinary health tracking.',
    demoEmail: 'staff@gmail.com',
    bullets: [
      'Shift AM/PM parlour milk entry with fat/SNF scoring',
      'Action Center: Misting & ventilation mitigation',
      'Vaccine registry & calf pedigree lineage',
    ],
    href: '/staff',
    cta: 'Open Staff ERP',
    accentColor: '#059669',
    accentBg: '#ECFDF5',
  },
  {
    icon: TrendingUp,
    badge: 'Wealth & Asset',
    badgeVariant: 'accent' as const,
    title: 'Investor Suite',
    number: '03',
    description: 'Institutional asset transparency, 1.5% fixed base yield modeling, Yield Reserve health, and live cattle RFID telemetry.',
    demoEmail: 'investor@gmail.com',
    bullets: [
      'Verifiable NEFT dividend credit history',
      '145% Yield Reserve Escrow liquidity gauge',
      'Dynamic Scenario Calculator with parlour bonuses',
    ],
    href: '/investor',
    cta: 'Open Investor Suite',
    accentColor: '#D97706',
    accentBg: '#FEF3C7',
  },
  {
    icon: ShoppingCart,
    badge: 'Quick-Commerce',
    badgeVariant: 'info' as const,
    title: 'Consumer Store',
    number: '04',
    description: 'Farm-fresh A2 milk, Vedic bilona ghee, and cultured paneer delivered in sub-15 minutes in cold-chain crates.',
    demoEmail: 'rishik@gmail.com',
    bullets: [
      'Live pricing & inventory sync with Admin ERP',
      'Slide-over cart drawer with delivery slot picker',
      'Seamless Customer → Investor Co-Ownership path',
    ],
    href: '/consumer',
    cta: 'Open Consumer Store',
    accentColor: '#3B82F6',
    accentBg: '#EFF6FF',
  },
];

const PRODUCTS_PREVIEW = [
  {
    name: 'Raw A2 Gir Cow Milk',
    image: '/images/product_a2_milk.jpg',
    note: 'Whole, non-homogenized, 4.6% fat',
    price: '₹92 / L',
    status: 'In Stock • AM Batch',
    statusColor: '#10B981',
  },
  {
    name: 'Vedic Bilona Ghee',
    image: '/images/product_ghee.jpg',
    note: 'Slow-cooked curd-churned golden elixir',
    price: '₹1,450 / 500ml',
    status: 'Hand-Crafted Earthen Pot',
    statusColor: '#D97706',
  },
  {
    name: 'Artisanal Malai Paneer',
    image: '/images/product_paneer.jpg',
    note: 'Citrus-curdled fresh cottage cheese',
    price: '₹185 / 200g',
    status: 'Vacuum Sealed',
    statusColor: '#10B981',
  },
];

const INVESTMENT_TIERS = [
  { cows: 1, capital: 85000, label: '1 Gir Cow' },
  { cows: 3, capital: 255000, label: '3 Gir Cows' },
  { cows: 5, capital: 425000, label: '5 Gir Herd' },
  { cows: 10, capital: 850000, label: '10 Unit Dairy Lot' },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCows, setSelectedCows] = useState(3);

  const activeTier = INVESTMENT_TIERS.find((t) => t.cows === selectedCows) || INVESTMENT_TIERS[1];
  const monthlyBase = Math.round(activeTier.capital * 0.015);
  const monthlyBonus = Math.round(activeTier.capital * 0.005);
  const monthlyTotal = monthlyBase + monthlyBonus;
  const annualTotal = monthlyTotal * 12;

  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen flex flex-col">

      {/* ── DEMO SIMULATION NOTICE ── */}
      <aside
        aria-label="Demo notice"
        className="bg-slate-950 text-slate-200 px-4 py-1.5 flex items-center justify-between text-xs gap-3 flex-wrap border-b border-slate-800"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="dl-simulation-badge shrink-0">Demo</span>
          <span className="font-medium truncate text-slate-300">
            DairyLift Agro-Parks — Enterprise Infrastructure &amp; Operational Simulation
          </span>
        </div>
        <Link
          href="/auth"
          className="font-semibold text-emerald-400 hover:text-emerald-300 shrink-0 transition-colors"
        >
          Access Portal Gateway (pwd: 123) →
        </Link>
      </aside>

      {/* ── NAVIGATION HEADER ── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="dl-container flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white bg-emerald-600 shadow-sm transition-transform group-hover:scale-105">
              <Milk className="w-5 h-5" />
            </div>
            <div>
              <span className="block font-bold text-lg leading-tight text-slate-900">
                DairyLift
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                Agro-Tech Ecosystem
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#ecosystem" className="hover:text-emerald-700 transition-colors">Ecosystem</a>
            <a href="#technology" className="hover:text-emerald-700 transition-colors">Farm Telemetry</a>
            <a href="#products" className="hover:text-emerald-700 transition-colors">Fresh Dairy</a>
            <a href="#investment" className="hover:text-emerald-700 transition-colors">Co-Ownership</a>
            <a href="#sustainability" className="hover:text-emerald-700 transition-colors">Sustainability</a>
          </nav>

          {/* Desktop & Mobile Actions */}
          <div className="flex items-center gap-2">
            <Link href="/consumer" className="hidden sm:block">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs font-semibold">
                <ShoppingCart className="w-3.5 h-3.5" />
                Store
              </Button>
            </Link>
            <Link href="/auth">
              <Button variant="primary" size="sm" className="gap-1.5 text-xs font-semibold">
                Launch Portals <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <a
                href="#ecosystem"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
              >
                Ecosystem
              </a>
              <a
                href="#technology"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
              >
                Farm Telemetry
              </a>
              <a
                href="#products"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
              >
                Fresh Dairy
              </a>
              <a
                href="#investment"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
              >
                Co-Ownership
              </a>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Quick Portals:</span>
              <div className="flex gap-2 font-mono">
                <Link href="/admin" className="text-emerald-600 font-bold hover:underline">Admin</Link>
                <Link href="/staff" className="text-emerald-600 font-bold hover:underline">Staff</Link>
                <Link href="/investor" className="text-emerald-600 font-bold hover:underline">Investor</Link>
                <Link href="/consumer" className="text-emerald-600 font-bold hover:underline">Store</Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO SECTION ── */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-emerald-50/40 via-white to-slate-50/50 py-10 sm:py-16">
        <div className="dl-container grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Hero Left Column */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <Badge variant="forest" className="font-bold tracking-wider uppercase text-xs">
                High-Tech Dairy Ecosystem
              </Badge>
              <span className="text-xs font-medium text-slate-500">
                Nashik &amp; Pune Agro-Valleys, Maharashtra
              </span>
            </div>

            <h1 className="font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-slate-900 leading-[1.12]">
              Where Precision Agritech Meets Dairy Wealth.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              DairyLift bridges rural livestock infrastructure with urban capital and direct consumer commerce. Smart-collar IoT telemetry, automated rotary milking, and transparent livestock co-ownership.
            </p>

            {/* Quick Demo Portals Gateway Bar */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Quick Portals
                </span>
                <span className="text-xs text-slate-400">
                  (password: <code className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-800 font-mono font-bold">123</code>)
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <Link href="/admin" className="px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-100 text-slate-800 hover:bg-emerald-600 hover:text-white transition-colors">
                  Admin
                </Link>
                <Link href="/staff" className="px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-100 text-slate-800 hover:bg-emerald-600 hover:text-white transition-colors">
                  Staff
                </Link>
                <Link href="/investor" className="px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-100 text-slate-800 hover:bg-emerald-600 hover:text-white transition-colors">
                  Investor
                </Link>
                <Link href="/consumer" className="px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-100 text-slate-800 hover:bg-emerald-600 hover:text-white transition-colors">
                  Consumer
                </Link>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link href="/consumer/invest">
                <Button variant="primary" size="lg" className="font-semibold shadow-sm gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-300" />
                  Explore Co-Ownership
                </Button>
              </Link>
              <Link href="/consumer">
                <Button variant="secondary" size="lg" className="font-semibold shadow-xs gap-2">
                  <ShoppingCart className="w-4 h-4 text-slate-700" />
                  Order Farm Milk
                </Button>
              </Link>
            </div>

            {/* Metrics Strip */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-4 border-t border-slate-200">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  1,900+
                </span>
                <span className="text-xs text-slate-500 mt-0.5 font-medium">
                  Indigenous Cattle
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 tracking-tight">
                  1.5%
                </span>
                <span className="text-xs text-slate-500 mt-0.5 font-medium">
                  Monthly Base Yield
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 tracking-tight">
                  145%
                </span>
                <span className="text-xs text-slate-500 mt-0.5 font-medium">
                  Yield Reserve Buffer
                </span>
              </div>
            </div>
          </div>

          {/* Hero Right Column — Facility Overview Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-lg bg-white group">
              <Image
                src="/images/hero_dairy_farm.jpg"
                alt="DairyLift Modern Agro-Park Facility at Sunrise — Maharashtra, India"
                width={1200}
                height={675}
                priority
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating Facility Tag */}
              <div className="absolute bottom-3 left-3 right-3 p-3 flex items-center justify-between gap-3 bg-white/95 backdrop-blur-md rounded-xl border border-white/60 shadow-sm">
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    Facility Overview
                  </span>
                  <span className="block text-xs sm:text-sm font-bold text-slate-900">
                    Nashik Agro-Park Unit A (120 Acres)
                  </span>
                </div>
                <Badge variant="success" className="gap-1.5 shrink-0">
                  <span className="dl-live-dot w-1.5 h-1.5 inline-block bg-emerald-500" />
                  Telemetry Online
                </Badge>
              </div>
            </div>

            {/* Accreditation Badges Pill */}
            <div className="mt-3 flex items-center justify-between gap-2 px-3 py-2 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                FSSAI Registered
              </span>
              <span>·</span>
              <span>NABARD Aligned</span>
              <span>·</span>
              <span className="font-medium text-slate-700">100% A2 Gir DNA</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── FOUR PORTALS ARCHITECTURE ── */}
      <section id="ecosystem" className="py-14 sm:py-20 border-b border-slate-200 bg-white">
        <div className="dl-container space-y-10">
          <RevealSection className="text-center max-w-2xl mx-auto space-y-2.5">
            <Badge variant="forest" className="font-bold tracking-wider uppercase text-xs">
              Integrated Architecture
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              One Unified Ecosystem.<br className="hidden sm:inline" /> Four Specialized Portals.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every participant in the dairy lifecycle is connected through specialized, role-tailored interfaces.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PORTALS.map((portal, i) => {
              const Icon = portal.icon;
              return (
                <RevealSection key={portal.title} delay={i * 60}>
                  <div className="dl-card dl-card-hover flex flex-col h-full bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: portal.accentBg, border: `1px solid ${portal.accentColor}25` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: portal.accentColor }} />
                      </div>
                      <span className="text-2xl font-bold font-mono text-slate-300">
                        {portal.number}
                      </span>
                    </div>

                    <Badge variant={portal.badgeVariant} className="w-fit mb-2">
                      {portal.badge}
                    </Badge>

                    <h3 className="text-base font-bold text-slate-900 mb-1.5">
                      {portal.title}
                    </h3>

                    <p className="text-xs leading-relaxed mb-3 text-slate-600 flex-1">
                      {portal.description}
                    </p>

                    {/* Demo credential chip */}
                    <div className="mb-3 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Demo:</span>
                      <span className="font-mono font-bold text-slate-800">{portal.demoEmail}</span>
                    </div>

                    <ul className="space-y-1.5 mb-4">
                      {portal.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <CheckCircle2
                            className="w-3.5 h-3.5 shrink-0 mt-0.5"
                            style={{ color: portal.accentColor }}
                          />
                          <span className="text-xs text-slate-600">{b}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href={portal.href} className="block mt-auto">
                      <Button variant="secondary" size="sm" className="w-full justify-between group text-xs font-semibold">
                        {portal.cta}
                        <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Button>
                    </Link>
                  </div>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SMART COLLAR BIOMETRICS ── */}
      <section id="technology" className="py-14 sm:py-20 border-b border-slate-200 bg-slate-50">
        <div className="dl-container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* Left Image with Live Biometrics Pill */}
          <RevealSection>
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-md bg-white">
              <Image
                src="/images/smart_collar_telemetry.jpg"
                alt="Purebred Indian Gir Cow with Biometric Smart Collar — Real-time IoT Telemetry"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
              {/* Live Telemetry Pill */}
              <div className="absolute top-3 left-3 px-3 py-2 flex flex-col gap-0.5 bg-white/95 backdrop-blur-md rounded-xl border border-white/60 shadow-sm">
                <div className="flex items-center gap-1.5">
                  <div className="dl-live-dot w-2 h-2 bg-emerald-500" />
                  <span className="text-xs font-bold text-slate-900">
                    Collar ID: TAG-GIR-0347
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">
                  Temp: 38.6°C · Rumination: 480m/d · HR: 68bpm
                </span>
              </div>
            </div>
          </RevealSection>

          {/* Right Content */}
          <RevealSection delay={100} className="flex flex-col gap-5">
            <Badge variant="forest" className="font-bold tracking-wider uppercase text-xs w-fit">
              Precision Dairy Intelligence
            </Badge>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              24/7 Smart-Collar Biometrics &amp; Automated Barn Control.
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every cow in the DairyLift ecosystem is equipped with an IP68-weatherproof smart collar monitoring core body temperature, rumination cycles, estrus detection, and grazing activity.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-50 text-red-600">
                  <Thermometer className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Heat Stress Prevention</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Automated misting and ventilation kick in if shed temperature exceeds 30.0°C.
                </p>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-50 text-emerald-600">
                  <Activity className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Subclinical Mastitis Alerts</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  In-line electrical conductivity sensors detect early inflammation before symptoms appear.
                </p>
              </div>
            </div>
          </RevealSection>

        </div>
      </section>

      {/* ── SANITARY ROTARY MILKING ── */}
      <section className="py-14 sm:py-20 border-b border-slate-200 bg-white">
        <div className="dl-container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* Copy Left on Desktop */}
          <RevealSection className="space-y-5 order-2 lg:order-1">
            <Badge variant="forest" className="font-bold tracking-wider uppercase text-xs w-fit">
              Sanitary Milking Technology
            </Badge>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Touch-Free Milking &amp; Rapid Chilling in 90 Seconds.
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Milk never comes into contact with human hands or open air. Automated stainless-steel vacuum clusters record yield volume per quarter and immediately route raw milk to 3.5°C refrigerated bulk chillers.
            </p>

            <div className="space-y-2.5">
              {[
                'Zero Hormones, Oxytocin, or Antibiotic Residues in Batches',
                'Automated CIP (Clean-In-Place) Alkaline Wash After Every Session',
                'Composite Lab Scoring: Grade-A+ Direct to Cold E-Commerce',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </RevealSection>

          {/* Image Right on Desktop */}
          <RevealSection delay={100} className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-md bg-white">
              <Image
                src="/images/milking_parlour.jpg"
                alt="Automated Rotary Milking Parlour with Digital Telemetry"
                width={1200}
                height={900}
                className="w-full h-auto object-cover"
              />
            </div>
          </RevealSection>

        </div>
      </section>

      {/* ── FRESH DAIRY PRODUCTS ── */}
      <section id="products" className="py-14 sm:py-20 border-b border-slate-200 bg-slate-50">
        <div className="dl-container space-y-8">
          <RevealSection className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <Badge variant="forest" className="font-bold tracking-wider uppercase text-xs mb-2">
                Farm to Table
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Pure Indigenous A2 Dairy Lineup.
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Delivered under 15 minutes in climate-controlled electric vehicle crates.
              </p>
            </div>
            <Link href="/consumer">
              <Button variant="primary" size="sm" className="gap-1.5 font-semibold">
                View Full Catalog <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
            {/* Hero Product Banner */}
            <RevealSection className="lg:col-span-3">
              <div className="overflow-hidden h-full min-h-[260px] rounded-2xl border border-slate-200 shadow-md bg-white">
                <Image
                  src="/images/product_ghee.jpg"
                  alt="DairyLift A2 Milk, Vedic Bilona Ghee, and Artisanal Paneer"
                  width={1200}
                  height={900}
                  className="w-full h-full object-cover"
                />
              </div>
            </RevealSection>

            {/* Product Cards with Real Photos */}
            <RevealSection delay={80} className="lg:col-span-2 flex flex-col gap-3">
              {PRODUCTS_PREVIEW.map((p) => (
                <div
                  key={p.name}
                  className="dl-card flex-1 flex gap-3.5 items-center bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-slate-100 bg-slate-50">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-slate-900 truncate">{p.name}</h4>
                      <span className="text-sm font-bold text-emerald-600 shrink-0 tabular-nums">
                        {p.price}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{p.note}</p>
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100">
                      <span className="text-[11px] font-semibold" style={{ color: p.statusColor }}>{p.status}</span>
                      <Link href="/consumer">
                        <Button variant="ghost" size="xs" className="h-6 text-xs font-bold text-emerald-600 hover:text-emerald-700">
                          Order →
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── CO-OWNERSHIP & INTERACTIVE MINI-CALCULATOR ── */}
      <section id="investment" className="py-14 sm:py-20 border-b border-slate-200 bg-white">
        <div className="dl-container space-y-10">
          <RevealSection className="text-center max-w-2xl mx-auto space-y-2.5">
            <Badge variant="accent" className="font-bold tracking-wider uppercase text-xs">
              Livestock Co-Ownership Model
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Sustainable Agritech Yields Backstopped by Reserve Escrow.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg mx-auto">
              Earn a fixed 1.5% monthly base yield (18% annualized) with dynamic parlour milk performance bonuses up to 0.5% monthly.
            </p>
          </RevealSection>

          {/* Interactive Mini-Calculator Widget */}
          <RevealSection delay={80}>
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-sm">
              <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Interactive Co-Ownership Yield Simulator
                    </h3>
                    <p className="text-xs text-slate-500">
                      Select your cattle allocation tier to preview simulated NEFT monthly distributions.
                    </p>
                  </div>
                </div>
                <Badge variant="accent" className="hidden sm:inline-flex">Simulated Model</Badge>
              </div>

              {/* Tier Selection Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                {INVESTMENT_TIERS.map((tier) => (
                  <button
                    key={tier.cows}
                    type="button"
                    onClick={() => setSelectedCows(tier.cows)}
                    className={cn(
                      'p-2.5 text-center rounded-xl border text-xs font-bold transition-all cursor-pointer',
                      selectedCows === tier.cows
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    )}
                  >
                    <div>{tier.label}</div>
                    <div className={cn('text-[11px] font-mono mt-0.5', selectedCows === tier.cows ? 'text-emerald-100' : 'text-slate-400')}>
                      ₹{(tier.capital / 1000).toFixed(0)}k
                    </div>
                  </button>
                ))}
              </div>

              {/* Real-time Calculation Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl mb-5 text-center">
                <div>
                  <span className="block text-[11px] text-slate-500 font-medium">Capital Asset</span>
                  <span className="block text-base font-extrabold text-slate-900 font-mono mt-0.5">
                    ₹{activeTier.capital.toLocaleString('en-IN')}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] text-slate-500 font-medium">1.5% Base / mo</span>
                  <span className="block text-base font-extrabold text-emerald-600 font-mono mt-0.5">
                    ₹{monthlyBase.toLocaleString('en-IN')}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] text-slate-500 font-medium">0.5% Parlour Bonus</span>
                  <span className="block text-base font-extrabold text-amber-600 font-mono mt-0.5">
                    +₹{monthlyBonus.toLocaleString('en-IN')}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] text-slate-500 font-medium">Annualized Payout</span>
                  <span className="block text-base font-extrabold text-slate-900 font-mono mt-0.5">
                    ₹{annualTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Calculator Action */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  Protected by 145% Yield Reserve Escrow Buffer
                </div>
                <Link href="/consumer/invest" className="w-full sm:w-auto">
                  <Button variant="primary" size="sm" className="w-full sm:w-auto gap-1.5 font-semibold text-xs">
                    Open Advanced Portfolio Suite <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </RevealSection>

          {/* Compliance Notice */}
          <div className="p-4 text-xs flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 max-w-3xl mx-auto">
            <span className="font-bold shrink-0">COMPLIANCE NOTICE:</span>
            <span>
              All financial run-rates and models shown are illustrative simulation scenarios for Phase 1 demonstration. Real-world returns are subject to agricultural biological cycles. DairyLift does not make claims of guaranteed financial returns.
            </span>
          </div>
        </div>
      </section>

      {/* ── SUSTAINABILITY SECTION ── */}
      <section id="sustainability" className="py-14 sm:py-20 border-b border-slate-200 bg-slate-50">
        <div className="dl-container space-y-8">
          <RevealSection className="text-center max-w-xl mx-auto space-y-2.5">
            <Badge variant="forest" className="font-bold tracking-wider uppercase text-xs">
              Ecological Stewardship
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Sustainable Closed-Loop Agriculture.
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: Sun, value: '400 kW', title: 'Rooftop Solar', desc: 'Powers all milk chillers, rotary parlours, and cooling mist fans with 100% renewable solar energy.' },
              { icon: Leaf, value: '16 Tons/day', title: 'Hydroponic Fodder', desc: 'Uses 95% less water than traditional pasture farming, producing fresh nutrient-dense green sprouts daily.' },
              { icon: Zap, value: 'Zero Slurry', title: 'Biogas Digesters', desc: 'All cattle manure is converted into clean organic methane gas and certified pathogen-free vermicompost.' },
            ].map(({ icon: Icon, value, title, desc }) => (
              <div key={title} className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-emerald-50 text-emerald-600">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="block text-2xl font-extrabold text-emerald-700 tracking-tight font-mono">
                  {value}
                </span>
                <h4 className="text-sm font-bold text-slate-900">{title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA BANNER ── */}
      <section
        className="py-16 sm:py-20 text-white"
        style={{
          background: 'linear-gradient(135deg, #022C22 0%, #064E3B 50%, #059669 100%)',
        }}
      >
        <div className="dl-container text-center space-y-6 max-w-2xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white/90 border border-white/20">
            <Star className="w-3.5 h-3.5 text-amber-300" />
            Institutional Agri-Tech Infrastructure
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Ready to Experience the DairyLift Ecosystem?
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            Order certified A2 milk, monitor IoT telemetry as farm staff, or model livestock co-ownership yields as an institutional investor.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/auth">
              <Button
                size="lg"
                className="bg-white text-emerald-800 hover:bg-emerald-50 border-white font-bold shadow-md text-sm"
              >
                Access Platform Gateway →
              </Button>
            </Link>
            <Link href="/consumer">
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent text-white border-white/40 hover:bg-white/10 font-bold text-sm"
              >
                Explore Dairy Store
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── HIGH-CONTRAST ENTERPRISE FOOTER (OBSIDIAN SLATE) ── */}
      <footer className="bg-[#0F172A] text-slate-300 border-t border-slate-800 pt-14 pb-10">
        <div className="dl-container space-y-10">

          {/* Footer Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">

            {/* Brand column */}
            <div className="col-span-2 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white bg-emerald-600">
                  <Milk className="w-4 h-4" />
                </div>
                <span className="text-lg font-bold text-white tracking-tight">
                  DairyLift
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                A technology-driven institutional dairy ecosystem connecting farm operations, IoT collar telemetry, sustainable co-ownership, and cold-chain commerce.
              </p>
              <span className="block text-[11px] text-slate-500">
                Operating Facilities in Nashik and Pune, Maharashtra, India.
              </span>
            </div>

            {/* Portals */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200">Portals</h5>
              <ul className="space-y-2 text-xs">
                <li><Link href="/admin" className="text-slate-400 hover:text-emerald-400 transition-colors">Admin Command</Link></li>
                <li><Link href="/staff" className="text-slate-400 hover:text-emerald-400 transition-colors">Farm Staff ERP</Link></li>
                <li><Link href="/investor" className="text-slate-400 hover:text-emerald-400 transition-colors">Investor Suite</Link></li>
                <li><Link href="/consumer" className="text-slate-400 hover:text-emerald-400 transition-colors">Consumer Store</Link></li>
              </ul>
            </div>

            {/* Technology */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200">Technology</h5>
              <ul className="space-y-2 text-xs">
                <li><a href="#technology" className="text-slate-400 hover:text-emerald-400 transition-colors">Smart Collar IoT</a></li>
                <li><a href="#technology" className="text-slate-400 hover:text-emerald-400 transition-colors">Milking Rotary Tech</a></li>
                <li><a href="#sustainability" className="text-slate-400 hover:text-emerald-400 transition-colors">Solar Cold Chain</a></li>
                <li><a href="#investment" className="text-slate-400 hover:text-emerald-400 transition-colors">Yield Reserve Escrow</a></li>
              </ul>
            </div>

            {/* Governance */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200">Governance</h5>
              <ul className="space-y-2 text-xs">
                <li><Link href="/legal" className="text-slate-400 hover:text-emerald-400 transition-colors">Risk Disclosure</Link></li>
                <li><Link href="/legal" className="text-slate-400 hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="/legal" className="text-slate-400 hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/legal" className="text-slate-400 hover:text-emerald-400 transition-colors">Cold Delivery Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} DairyLift Agro-Parks Private Limited. All rights reserved.</p>
            <p>Demonstration Environment · Operational Simulation Data Model</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
