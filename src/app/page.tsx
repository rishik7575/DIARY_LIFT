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
  Sun, Zap, ArrowUpRight, Star,
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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
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
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
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
    description: 'Multi-facility operations, environmental threshold rules, investment plan versioning, and pricing control.',
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

export default function HomePage() {
  return (
    <div style={{ background: 'var(--color-bg)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)' }}>

      {/* ── DEMO ENVIRONMENT BAR ── */}
      <aside
        aria-label="Demo notice"
        style={{ background: 'var(--p-slate-900)' }}
        className="flex items-center justify-between px-4 py-1.5 gap-3 flex-wrap"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="dl-simulation-badge shrink-0">Demo</span>
          <span className="text-xs font-medium truncate" style={{ color: 'rgba(255,255,255,0.7)' }}>
            DairyLift Enterprise Ecosystem — Operational Simulation
          </span>
        </div>
        <Link
          href="/auth"
          className="text-xs font-semibold shrink-0 transition-opacity hover:opacity-80"
          style={{ color: 'rgba(255,255,255,0.85)' }}
        >
          Unified Auth Gateway →
        </Link>
      </aside>

      {/* ── NAVIGATION ── */}
      <header
        className="sticky top-0 z-40 backdrop-blur-md border-b"
        style={{
          background: 'rgba(255,255,255,0.95)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div className="dl-container flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div
              className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center text-white shadow-sm transition-colors"
              style={{ background: 'var(--color-brand)' }}
            >
              <Milk className="w-5 h-5" />
            </div>
            <div>
              <span
                className="block font-bold text-lg leading-none"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
              >
                DairyLift
              </span>
              <span
                className="block text-[10px] font-bold uppercase tracking-widest"
                style={{ color: 'var(--color-brand)' }}
              >
                Agro-Tech Ecosystem
              </span>
            </div>
          </Link>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
            <a href="#ecosystem"     className="hover:text-brand transition-colors" style={{ color: 'inherit' }}>Ecosystem</a>
            <a href="#technology"   className="hover:text-brand transition-colors" style={{ color: 'inherit' }}>Farm Telemetry</a>
            <a href="#products"     className="hover:text-brand transition-colors" style={{ color: 'inherit' }}>Fresh Dairy</a>
            <a href="#investment"   className="hover:text-brand transition-colors" style={{ color: 'inherit' }}>Co-Ownership</a>
            <a href="#sustainability" className="hover:text-brand transition-colors" style={{ color: 'inherit' }}>Sustainability</a>
          </nav>

          {/* CTAs */}
          <div className="flex items-center gap-2">
            <Link href="/consumer" className="hidden sm:block">
              <Button variant="outline" size="sm">
                <ShoppingCart className="w-3.5 h-3.5" />
                Store
              </Button>
            </Link>
            <Link href="/auth">
              <Button variant="primary" size="sm">
                Launch Portals <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section
        className="border-b"
        style={{
          background: 'linear-gradient(160deg, #F0FDF4 0%, var(--color-bg) 45%, #FFFFFF 100%)',
          borderColor: 'var(--color-border)',
          paddingBlock: 'clamp(40px, 6vw, 80px)',
        }}
      >
        <div className="dl-container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left copy */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Badge variant="forest" className="font-bold tracking-wider uppercase">
                High-Tech Dairy Ecosystem
              </Badge>
              <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
                Nashik &amp; Pune Agro-Valleys
              </span>
            </div>

            <h1
              className="font-bold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-slate-900 leading-[1.15]"
            >
              Where Precision Agritech Meets Dairy Wealth.
            </h1>

            <p
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg"
            >
              DairyLift bridges rural livestock infrastructure with urban capital and direct consumer commerce. Smart-collar IoT telemetry, automated rotary milking, and transparent livestock co-ownership.
            </p>

            {/* Direct Portal Switcher Banner */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Quick Portals
                </span>
                <span className="text-xs text-slate-500">
                  (password: <code className="px-1 py-0.5 bg-slate-100 rounded text-slate-800 font-mono font-bold">123</code>)
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
                <Button variant="primary" size="lg">
                  <TrendingUp className="w-4 h-4" />
                  Explore Co-Ownership
                </Button>
              </Link>
              <Link href="/consumer">
                <Button variant="secondary" size="lg">
                  <ShoppingCart className="w-4 h-4" />
                  Order Farm Milk
                </Button>
              </Link>
            </div>

            {/* Metrics strip */}
            <div
              className="grid grid-cols-3 gap-3 sm:gap-6 pt-5 border-t border-slate-200"
            >
              {[
                { value: '1,900+', label: 'Indigenous Cattle', color: 'text-slate-900' },
                { value: '1.5%',   label: 'Monthly Base Yield', color: 'text-emerald-600' },
                { value: '145%',   label: 'Yield Reserve Buffer', color: 'text-amber-600' },
              ].map(({ value, label, color }) => (
                <div key={label} className="flex flex-col">
                  <span
                    className={cn('text-2xl sm:text-3xl font-extrabold tracking-tight', color)}
                  >
                    {value}
                  </span>
                  <span
                    className="text-xs text-slate-500 mt-1 font-medium"
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right hero image */}
          <div className="relative">
            <div
              className="relative overflow-hidden group"
              style={{
                borderRadius: 'var(--radius-2xl)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-xl)',
              }}
            >
              <Image
                src="/images/hero_dairy_farm.jpg"
                alt="DairyLift Modern Agro-Park Facility at Sunrise — Maharashtra, India"
                width={1200}
                height={675}
                priority
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />

              {/* Floating facility tag */}
              <div
                className="absolute bottom-4 left-4 right-4 p-3 flex items-center justify-between gap-3"
                style={{
                  background: 'rgba(255,253,248,0.92)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(255,255,255,0.6)',
                }}
              >
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-brand)' }}>
                    Facility Overview
                  </span>
                  <span className="block text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    Nashik Agro-Park Unit A (120 Acres)
                  </span>
                </div>
                <Badge variant="success">
                  <span className="dl-live-dot" style={{ width: '6px', height: '6px', display: 'inline-block' }} />
                  Telemetry Online
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUR PORTALS ── */}
      <section
        id="ecosystem"
        className="border-b"
        style={{
          background: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
          paddingBlock: 'clamp(48px, 7vw, 88px)',
        }}
      >
        <div className="dl-container space-y-12">
          <RevealSection className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="forest" className="font-bold tracking-wider uppercase">
              Integrated Architecture
            </Badge>
            <h2
              className="font-bold tracking-tight"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-4xl)',
                color: 'var(--color-text-primary)',
              }}
            >
              One Unified Ecosystem.
              <br />Four Specialized Portals.
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', lineHeight: 'var(--lh-relaxed)' }}>
              Every participant in the dairy lifecycle is connected through specialized, role-tailored interfaces.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PORTALS.map((portal, i) => {
              const Icon = portal.icon;
              return (
                <RevealSection key={portal.title} delay={i * 60}>
                  <div
                    className="dl-card dl-card-hover flex flex-col h-full bg-white border border-slate-200 rounded-2xl shadow-xs"
                    style={{ padding: 'var(--sp-5)' }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: portal.accentBg, border: `1px solid ${portal.accentColor}25` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: portal.accentColor }} />
                      </div>
                      <span
                        className="text-2xl font-bold font-mono text-slate-300"
                      >
                        {portal.number}
                      </span>
                    </div>

                    <Badge variant={portal.badgeVariant} className="w-fit mb-2">
                      {portal.badge}
                    </Badge>

                    <h3
                      className="text-base font-bold text-slate-900 mb-1.5"
                    >
                      {portal.title}
                    </h3>

                    <p
                      className="text-xs leading-relaxed mb-3 text-slate-600 flex-1"
                    >
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
                      <Button variant="secondary" size="sm" className="w-full justify-between group">
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

      {/* ── SMART COLLAR TELEMETRY ── */}
      <section
        id="technology"
        className="border-b"
        style={{
          background: 'var(--color-bg)',
          borderColor: 'var(--color-border)',
          paddingBlock: 'clamp(48px, 7vw, 88px)',
        }}
      >
        <div className="dl-container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Image */}
          <RevealSection>
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: 'var(--radius-2xl)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <Image
                src="/images/smart_collar_telemetry.jpg"
                alt="Purebred Indian Gir Cow with Biometric Smart Collar — Real-time IoT Telemetry"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
              {/* Live data chip */}
              <div
                className="absolute top-4 left-4 px-3 py-2 flex flex-col gap-0.5"
                style={{
                  background: 'rgba(255,253,248,0.92)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(255,255,255,0.5)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div className="flex items-center gap-1.5">
                  <div className="dl-live-dot" style={{ width: '7px', height: '7px' }} />
                  <span className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>
                    Collar ID: TAG-GIR-0347
                  </span>
                </div>
                <span className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
                  Temp: 38.6°C · Rumination: 480 min/day
                </span>
              </div>
            </div>
          </RevealSection>

          {/* Copy */}
          <RevealSection delay={120} className="space-y-6">
            <Badge variant="forest" className="font-bold tracking-wider uppercase">
              Precision Dairy Intelligence
            </Badge>

            <h2
              className="font-bold leading-tight tracking-tight"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', color: 'var(--color-text-primary)' }}
            >
              24/7 Smart-Collar Biometrics &amp; Automated Barn Control.
            </h2>

            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', lineHeight: 'var(--lh-relaxed)' }}>
              Every cow in the DairyLift ecosystem is equipped with a weatherproof smart collar monitoring core body temperature, rumination cycles, estrus detection, and grazing activity.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Thermometer,
                  color: 'var(--color-danger)',
                  bg: 'var(--color-danger-bg)',
                  title: 'Heat Stress Prevention',
                  desc: 'Automated misting and ventilation kick in if shed temperature exceeds 30.0°C.',
                },
                {
                  icon: Activity,
                  color: 'var(--color-brand)',
                  bg: 'var(--color-brand-light)',
                  title: 'Subclinical Mastitis Alerts',
                  desc: 'In-line electrical conductivity sensors detect early inflammation before symptoms appear.',
                },
              ].map(({ icon: Icon, color, bg, title, desc }) => (
                <div
                  key={title}
                  className="p-4 space-y-2"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-xs)',
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center"
                    style={{ background: bg }}
                  >
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <h4 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{desc}</p>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── AUTOMATED MILKING ── */}
      <section
        className="border-b"
        style={{
          background: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
          paddingBlock: 'clamp(48px, 7vw, 88px)',
        }}
      >
        <div className="dl-container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Copy — left on desktop */}
          <RevealSection className="space-y-6 order-2 lg:order-1">
            <Badge variant="forest" className="font-bold tracking-wider uppercase">
              Sanitary Milking Technology
            </Badge>

            <h2
              className="font-bold leading-tight tracking-tight"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', color: 'var(--color-text-primary)' }}
            >
              Touch-Free Milking &amp; Instant Cold Chilling in 90 Seconds.
            </h2>

            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', lineHeight: 'var(--lh-relaxed)' }}>
              Milk never comes into contact with human hands or open air. Automated stainless-steel vacuum clusters record yield volume per quarter and immediately route raw milk to 3.5°C refrigerated bulk chillers.
            </p>

            <div className="space-y-2.5">
              {[
                'Zero Hormones, Oxytocin, or Antibiotics Residue in Batches',
                'Automated CIP (Clean-In-Place) Alkaline Wash After Every Session',
                'Composite Lab Scoring: Grade-A+ Direct to Cold E-Commerce',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 p-3"
                  style={{
                    background: 'var(--color-surface-muted)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: 'var(--color-brand)' }} />
                  <span className="text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>{item}</span>
                </div>
              ))}
            </div>
          </RevealSection>

          {/* Image — right on desktop */}
          <RevealSection delay={120} className="order-1 lg:order-2">
            <div
              className="overflow-hidden"
              style={{
                borderRadius: 'var(--radius-2xl)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
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

      {/* ── PRODUCT CATALOG PREVIEW ── */}
      <section
        id="products"
        className="border-b"
        style={{
          background: 'var(--color-bg)',
          borderColor: 'var(--color-border)',
          paddingBlock: 'clamp(48px, 7vw, 88px)',
        }}
      >
        <div className="dl-container space-y-10">
          <RevealSection className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <Badge variant="forest" className="font-bold tracking-wider uppercase">
                Farm to Table
              </Badge>
              <h2
                className="font-bold tracking-tight mt-3"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', color: 'var(--color-text-primary)' }}
              >
                Pure Indigenous A2 Dairy Lineup.
              </h2>
              <p className="mt-1.5" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                Delivered under 15 minutes in climate-controlled electric vehicle crates.
              </p>
            </div>
            <Link href="/consumer">
              <Button variant="primary" size="sm">
                View Full Catalog <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">

            {/* Hero product image */}
            <RevealSection className="lg:col-span-3">
              <div
                className="overflow-hidden h-full min-h-[280px]"
                style={{
                  borderRadius: 'var(--radius-2xl)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                <Image
                  src="/images/product_ghee.jpg"
                  alt="DairyLift A2 Milk, Vedic Bilona Ghee, and Artisanal Paneer"
                  width={1200}
                  height={900}
                  className="w-full h-full object-cover"
                />
              </div>
            </RevealSection>

            {/* Product list */}
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

      {/* ── CO-OWNERSHIP / INVESTMENT ── */}
      <section
        id="investment"
        className="border-b"
        style={{
          background: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
          paddingBlock: 'clamp(48px, 7vw, 88px)',
        }}
      >
        <div className="dl-container space-y-10">
          <RevealSection className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="accent" className="font-bold tracking-wider uppercase">
              Livestock Co-Ownership Model
            </Badge>
            <h2
              className="font-bold tracking-tight"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', color: 'var(--color-text-primary)' }}
            >
              Sustainable Agritech Yields Backstopped by Reserve Escrow.
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', lineHeight: 'var(--lh-relaxed)', maxWidth: '560px', margin: '0 auto' }}>
              Earn a fixed 1.5% monthly base yield (18% annualized) with dynamic parlour milk performance bonuses up to 0.5% monthly, protected by our dedicated Yield Reserve.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: TrendingUp,
                iconColor: 'var(--color-accent)',
                iconBg: 'var(--color-accent-light)',
                title: 'Fixed 1.5% Monthly Base',
                desc: 'Direct monthly dividend credited via automated NEFT on the 1st of each month, simulating physical livestock milk commerce returns.',
              },
              {
                icon: Activity,
                iconColor: 'var(--color-brand)',
                iconBg: 'var(--color-brand-light)',
                title: 'Dynamic Parlour Bonus',
                desc: 'Receive up to an additional 0.5% monthly based on verifiable digital milk production meter logs recorded in our parlours.',
              },
              {
                icon: ShieldCheck,
                iconColor: 'var(--color-info)',
                iconBg: 'var(--color-info-bg)',
                title: '145% Yield Reserve Health',
                desc: '₹8.45 Crores dedicated liquidity escrow buffer provides 6.4 months of stress coverage against biological dry-off gaps.',
              },
            ].map(({ icon: Icon, iconColor, iconBg, title, desc }, i) => (
              <RevealSection key={title} delay={i * 80}>
                <div
                  className="dl-card h-full"
                  style={{ padding: 'var(--sp-6)' }}
                >
                  <div
                    className="w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center mb-4"
                    style={{ background: iconBg }}
                  >
                    <Icon className="w-5 h-5" style={{ color: iconColor }} />
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    {desc}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>

          {/* Compliance notice */}
          <div
            className="p-4 text-sm flex items-start gap-3"
            style={{
              background: 'var(--color-warning-bg)',
              border: '1px solid #FDE68A',
              borderRadius: 'var(--radius-lg)',
              color: 'var(--color-warning)',
            }}
          >
            <span className="font-bold shrink-0">COMPLIANCE NOTICE:</span>
            <span>
              All financial run-rates and models shown are illustrative simulation scenarios for Phase 1 demonstration. Real-world returns are subject to agricultural biological cycles. DairyLift does not make claims of guaranteed financial returns.
            </span>
          </div>

          <div className="flex justify-center">
            <Link href="/consumer/invest">
              <Button variant="primary" size="lg">
                Launch Co-Ownership Scenario Calculator <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── SUSTAINABILITY ── */}
      <section
        id="sustainability"
        className="border-b"
        style={{
          background: 'var(--color-bg)',
          borderColor: 'var(--color-border)',
          paddingBlock: 'clamp(48px, 6vw, 72px)',
        }}
      >
        <div className="dl-container space-y-8">
          <RevealSection className="text-center max-w-xl mx-auto space-y-3">
            <Badge variant="forest" className="font-bold tracking-wider uppercase">
              Ecological Stewardship
            </Badge>
            <h2
              className="font-bold tracking-tight"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', color: 'var(--color-text-primary)' }}
            >
              Sustainable Closed-Loop Agriculture.
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: Sun,  value: '400 kW',      title: 'Rooftop Solar',      desc: 'Powers all milk chillers, rotary parlours, and cooling mist fans with 100% renewable solar energy.', delay: 0 },
              { icon: Leaf, value: '16 Tons/day',  title: 'Hydroponic Fodder',  desc: 'Uses 95% less water than traditional pasture farming, producing fresh nutrient-dense green sprouts daily.', delay: 60 },
              { icon: Zap,  value: 'Zero Slurry',  title: 'Biogas Digesters',   desc: 'All cattle manure is converted into clean organic methane gas and certified pathogen-free vermicompost.', delay: 120 },
            ].map(({ icon: Icon, value, title, desc, delay }) => (
              <RevealSection key={title} delay={delay}>
                <div
                  className="dl-card h-full"
                  style={{ padding: 'var(--sp-6)' }}
                >
                  <div
                    className="w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center mb-4"
                    style={{ background: 'var(--color-brand-light)' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: 'var(--color-brand)' }} />
                  </div>
                  <span
                    className="block font-bold mb-1"
                    style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--color-brand)' }}
                  >
                    {value}
                  </span>
                  <h4 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>{title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA BANNER ── */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--p-forest-900) 0%, var(--color-brand) 100%)',
          paddingBlock: 'clamp(56px, 8vw, 96px)',
        }}
      >
        <div className="dl-container text-center space-y-6 max-w-3xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <Star className="w-3 h-3" />
            Enterprise Agriculture
          </div>

          <h2
            className="font-bold tracking-tight text-white"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-5xl)', lineHeight: 'var(--lh-tight)' }}
          >
            Ready to Experience the DairyLift Ecosystem?
          </h2>

          <p style={{ fontSize: 'var(--text-lg)', color: 'rgba(255,255,255,0.72)', lineHeight: 'var(--lh-relaxed)' }}>
            Whether you want to order fresh farm milk, inspect IoT herd telemetry as farm staff, or model livestock co-ownership yields as an investor, our platform is ready.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/auth">
              <Button
                size="lg"
                style={{
                  background: 'white',
                  color: 'var(--color-brand)',
                  border: '1px solid white',
                }}
              >
                Access Platform Gateway →
              </Button>
            </Link>
            <Link href="/consumer">
              <Button
                variant="ghost"
                size="lg"
                style={{ color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}
                className="hover:bg-white/10"
              >
                Explore Dairy Store
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="border-t"
        style={{
          background: 'var(--p-forest-900)',
          borderColor: 'rgba(255,255,255,0.08)',
          paddingTop: 'var(--sp-16)',
          paddingBottom: 'var(--sp-12)',
        }}
      >
        <div className="dl-container space-y-10">

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">

            {/* Brand */}
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-[var(--radius-md)] flex items-center justify-center text-white"
                  style={{ background: 'var(--color-brand)' }}
                >
                  <Milk className="w-4 h-4" />
                </div>
                <span
                  className="text-lg font-bold text-white"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  DairyLift
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)', maxWidth: '300px' }}>
                A technology-driven institutional dairy ecosystem connecting farm operations, IoT collar telemetry, sustainable co-ownership, and cold-chain commerce.
              </p>
              <span className="block text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Operating Facilities in Nashik and Pune, Maharashtra, India.
              </span>
            </div>

            {/* Portals */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-white">Portals</h5>
              <ul className="space-y-2">
                {[['Admin Command', '/admin'], ['Farm Staff ERP', '/staff'], ['Investor Suite', '/investor'], ['Consumer Store', '/consumer']].map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-sm transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technology */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-white">Technology</h5>
              <ul className="space-y-2">
                {[['Smart Collar IoT', '#technology'], ['Milking Rotary Tech', '#technology'], ['Solar Cold Chain', '#sustainability'], ['Yield Reserve', '#investment']].map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-sm transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Governance */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-white">Governance</h5>
              <ul className="space-y-2">
                {[['Risk Disclosure', '/legal'], ['Terms of Service', '/legal'], ['Privacy Policy', '/legal'], ['Cold Delivery Policy', '/legal']].map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-sm transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
            style={{
              borderTop: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            <p>© {new Date().getFullYear()} DairyLift Agro-Parks Private Limited. All rights reserved.</p>
            <p>Demonstration Environment · Operational Simulation Data Model</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
