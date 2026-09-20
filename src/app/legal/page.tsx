'use client';

import React, { useState } from 'react';
import PortalLayout from '@/components/layout/PortalLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, FileText, AlertTriangle, Scale, Lock, RefreshCw, Truck } from 'lucide-react';

const LEGAL_SECTIONS = [
  {
    id: 'risk',
    title: '1. Investment & Co-Ownership Risk Disclosure',
    icon: AlertTriangle,
    content: (
      <div className="space-y-3 text-xs text-[#475569] leading-relaxed">
        <p>
          <strong>Operational Simulation Notice:</strong> The DairyLift platform is currently operating in a demonstration and operational simulation environment. Financial models, annual run-rates, and monthly yield scenarios (e.g., 1.5% fixed base + up to 0.5% performance bonus) are provided solely for platform evaluation and illustrative modeling.
        </p>
        <p>
          <strong>Livestock Biological Factors:</strong> Real-world dairy farming is subject to natural biological variance including lactation curves, gestation periods, seasonal forage availability, and climate stress. Returns cannot be guaranteed, and past operational performance does not guarantee future results.
        </p>
        <p>
          <strong>Yield Reserve Escrow Buffer:</strong> While DairyLift maintains an illustrative 145% Yield Reserve Escrow Buffer to smoothen cashflow during biological dry-off windows, capital allocated to physical livestock assets remains subject to systemic agricultural conditions.
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
        <div className="border-b border-[#E2E8F0] pb-5">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#0F172A] tracking-tight">
              Governance, Legal & Compliance
            </h1>
            <Badge variant="forest" className="text-[11px]">
              Regulatory Repository
            </Badge>
          </div>
          <p className="text-xs md:text-sm text-[#64748B] mt-1">
            Official operational disclosures, illustrative yield model disclaimers, terms of service, and cold-chain shipping policies.
          </p>
        </div>

        {/* Legal Policy Navigation & Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Section Nav */}
          <div className="lg:col-span-4 space-y-2">
            {LEGAL_SECTIONS.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;

              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs font-semibold flex items-center gap-3 cursor-pointer ${
                    isActive
                      ? 'bg-white border-[#14532D] text-[#14532D] shadow-xs ring-1 ring-[#14532D]'
                      : 'bg-white border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#14532D]' : 'text-[#64748B]'}`} />
                  <span className="truncate">{sec.title}</span>
                </button>
              );
            })}

            <div className="p-4 rounded-xl bg-[#FDF9F0] border border-[#EEDDB4] text-xs text-[#92400E] mt-4 space-y-1">
              <span className="font-bold block">Document Integrity:</span>
              <p>
                These terms are operational specifications for the DairyLift demonstration platform. No real financial investment or real-money transactions are processed in Phase 1.
              </p>
            </div>
          </div>

          {/* Section Detail Card */}
          <div className="lg:col-span-8">
            {LEGAL_SECTIONS.filter((s) => s.id === activeSection).map((sec) => (
              <Card key={sec.id} className="dl-card border-[#E2E8F0] p-6 space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[#F1F5F9]">
                  <sec.icon className="w-5 h-5 text-[#14532D]" />
                  <h2 className="text-base font-bold text-[#0F172A]">{sec.title}</h2>
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
