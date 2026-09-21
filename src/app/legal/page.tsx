'use client';

import React, { useState } from 'react';
import PortalLayout from '@/components/layout/PortalLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Scale, Lock, RefreshCw, Truck } from 'lucide-react';

const LEGAL_SECTIONS = [
  {
    id: 'risk',
    title: '1. Investment & Co-Ownership Risk Disclosure',
    icon: AlertTriangle,
    content: (
      <div className="space-y-3 text-xs text-[#475569] leading-relaxed">
        <p>
          <strong>Enterprise Operational Framework:</strong> The DairyLift platform operates an institutional livestock co-ownership infrastructure. Financial models, annual run-rates, and monthly yield distributions (e.g., 1.5% fixed base + up to 0.5% performance bonus) are calculated directly from registered dairy herd output and certified rotary parlour meters.
        </p>
        <p>
          <strong>Livestock Biological Factors:</strong> Real-world dairy farming is subject to natural biological variance including lactation curves, gestation periods, seasonal forage availability, and climate stress. Returns are dynamically optimized through veterinary precision care and smart-collar IoT health tracking.
        </p>
        <p>
          <strong>Yield Reserve Escrow Buffer:</strong> DairyLift maintains a 145% Yield Reserve Escrow Buffer to smoothen cashflow during biological dry-off windows, safeguarding investor distributions and asset liquidity.
        </p>
      </div>
    ),
  },
  {
    id: 'terms',
    title: '2. Terms of Platform Service',
    icon: Scale,
    content: (
      <div className="space-y-3 text-xs text-[#475569] leading-relaxed">
        <p>
          By accessing the DairyLift portal suite (including Master Admin, Farm Staff ERP, Investor Suite, and Consumer Store), you agree to comply with operational guidelines, access control requirements, and biosecurity disclosures.
        </p>
        <p>
          Authorized staff and operators must maintain strict data integrity when recording milking batch liters, composite fat/SNF laboratory readings, and veterinary clinical treatment protocols.
        </p>
      </div>
    ),
  },
  {
    id: 'privacy',
    title: '3. Data Governance & Privacy Policy',
    icon: Lock,
    content: (
      <div className="space-y-3 text-xs text-[#475569] leading-relaxed">
        <p>
          DairyLift strictly safeguards user identity, financial transaction logs, and farm telemetry. Personal identifiers, PAN numbers, and bank account details stored for automated NEFT dividend distribution testing are anonymized in accordance with standard data privacy guidelines.
        </p>
      </div>
    ),
  },
  {
    id: 'shipping',
    title: '4. Cold-Chain Delivery & Shipping Policy',
    icon: Truck,
    content: (
      <div className="space-y-3 text-xs text-[#475569] leading-relaxed">
        <p>
          All fresh A2 milk and cultured dairy orders are packed in insulated cold crates maintained below 4.0°C and dispatched via dedicated electric delivery vehicles within sub-15 minute delivery zones.
        </p>
        <p>
          Orders above ₹499 qualify for complimentary zero-fee delivery. Standard morning delivery slots run from 6:00 AM to 7:30 AM daily.
        </p>
      </div>
    ),
  },
  {
    id: 'refund',
    title: '5. Quality Guarantee & Refund Policy',
    icon: RefreshCw,
    content: (
      <div className="space-y-3 text-xs text-[#475569] leading-relaxed">
        <p>
          If any dairy item arrives with a broken tamper-evident seal or fails freshness inspection, customers may report the issue through the Consumer portal within 2 hours of delivery for an immediate replacement or full refund credit.
        </p>
      </div>
    ),
  },
];

export default function LegalPage() {
  const [activeSection, setActiveSection] = useState('risk');

  return (
    <PortalLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div
          className="pb-6"
          style={{ borderBottom: '1px solid var(--color-border)' }}
        >
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1
              className="font-bold tracking-tight"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', color: 'var(--color-text-primary)' }}
            >
              Governance, Legal & Compliance
            </h1>
            <Badge variant="navy">
              Regulatory Repository
            </Badge>
          </div>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            Official operational disclosures, illustrative yield model disclaimers, terms of service, and cold-chain shipping policies.
          </p>
        </div>

        {/* Legal Policy Navigation & Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          
          {/* Section Nav */}
          <div className="lg:col-span-4 space-y-2">
            {LEGAL_SECTIONS.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;

              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`w-full text-left p-3.5 rounded-[var(--radius-md)] border transition-all text-xs font-semibold flex items-center gap-3 cursor-pointer ${
                    isActive
                      ? 'bg-white border-[var(--color-brand)] text-[var(--color-brand)] shadow-xs ring-1 ring-[var(--color-brand)]'
                      : 'bg-white border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[var(--color-brand)]' : 'text-[var(--color-text-tertiary)]'}`} />
                  <span className="truncate">{sec.title}</span>
                </button>
              );
            })}

            <div
              className="p-4 rounded-[var(--radius-md)] text-xs mt-4 space-y-1"
              style={{ background: 'var(--color-accent-light)', border: '1px solid var(--color-border)', color: 'var(--color-accent-dark)' }}
            >
              <span className="font-bold block">Regulatory Governance:</span>
              <p>
                These operational terms govern the DairyLift Enterprise Platform, IoT hardware telemetry standards, and investor capital allocations under the Smart Agro-Park Framework.
              </p>
            </div>
          </div>

          {/* Section Detail Card */}
          <div className="lg:col-span-8">
            {LEGAL_SECTIONS.filter((s) => s.id === activeSection).map((sec) => (
              <Card key={sec.id} className="dl-card p-6 space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[var(--color-border)]">
                  <sec.icon className="w-5 h-5" style={{ color: 'var(--color-brand)' }} />
                  <h2 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>{sec.title}</h2>
                </div>
                {sec.content}
              </Card>
            ))}
          </div>

        </div>

      </div>
    </PortalLayout>
  );
}
