'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth, UserRole } from '@/lib/auth/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Milk,
  TrendingUp,
  ShoppingCart,
  ClipboardList,
  ShieldAlert,
  LogOut,
  Menu,
  X,
  ChevronRight,
  User,
  ShieldCheck,
  Activity,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const ROLE_NAV_CONFIG: Record<UserRole, { portalTitle: string; items: NavItem[] }> = {
  consumer: {
    portalTitle: 'Consumer Quick-Store',
    items: [
      { label: 'Farm Catalog', href: '/consumer', icon: ShoppingCart },
      { label: '✨ Invest in Cattle', href: '/consumer/invest', icon: TrendingUp, badge: '1.5% Yield' },
    ],
  },
  investor: {
    portalTitle: 'Investor Financial Suite',
    items: [
      { label: 'Portfolio Overview', href: '/investor', icon: TrendingUp },
      { label: 'My Cattle Assets', href: '/investor/portfolio', icon: Milk },
    ],
  },
  staff: {
    portalTitle: 'Farm Operations ERP',
    items: [
      { label: 'Operations Command', href: '/staff', icon: ClipboardList },
    ],
  },
  admin: {
    portalTitle: 'Master Command Center',
    items: [
      { label: 'Executive Analytics', href: '/admin', icon: ShieldAlert },
    ],
  },
};

const ALL_PORTALS = [
  { role: 'consumer' as UserRole, label: 'Consumer Store', path: '/consumer' },
  { role: 'investor' as UserRole, label: 'Investor Suite', path: '/investor' },
  { role: 'staff' as UserRole, label: 'Farm Staff', path: '/staff' },
  { role: 'admin' as UserRole, label: 'Master Admin', path: '/admin' },
];

export default function PortalLayout({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}) {
  const { user, logout, switchRole } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentRole: UserRole = user?.role || 'investor';
  const navConfig = ROLE_NAV_CONFIG[currentRole] || ROLE_NAV_CONFIG.investor;

  const handleLogout = () => {
    logout();
    router.push('/auth');
  };

  const handleRoleSwitch = (newRole: UserRole) => {
    switchRole(newRole);
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col md:flex-row antialiased text-slate-900">
      
      {/* ═══════════════════════════════════════════════════════════════════
          MOBILE TOPBAR (Visible only on < md screens)
      ═══════════════════════════════════════════════════════════════════ */}
      <header className="md:hidden bg-[#0F172A] text-white px-4 py-3 flex items-center justify-between border-b border-slate-800 z-40">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#166534] flex items-center justify-center text-white">
            <Milk className="w-4.5 h-4.5" />
          </div>
          <span className="font-display text-lg font-bold">
            DAIRY<span className="text-[#D97706]">-LIFT</span>
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
          LEFT SIDEBAR: Deep Slate (#0F172A)
          Desktop: Fixed width 64/72, flex-col. Mobile: Collapsible Drawer
      ═══════════════════════════════════════════════════════════════════ */}
      <aside
        className={cn(
          'bg-[#0F172A] text-white border-r border-slate-800 flex flex-col justify-between shrink-0 transition-transform duration-200 z-30',
          'md:w-64 lg:w-72 md:min-h-screen md:sticky md:top-0 md:h-screen',
          // Mobile responsive states
          mobileOpen ? 'fixed inset-0 top-[57px] flex' : 'hidden md:flex'
        )}
      >
        {/* Top Segment */}
        <div className="p-5 flex flex-col gap-6 overflow-y-auto">
          
          {/* Brand Heading */}
          <Link href="/" className="hidden md:flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#166534] to-[#14532D] flex items-center justify-center text-white shadow-md border border-emerald-500/30">
              <Milk className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display text-xl font-black tracking-tight text-white block leading-none">
                DAIRY<span className="text-[#D97706]">-LIFT</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 mt-1 block">
                Enterprise Dairy ERP
              </span>
            </div>
          </Link>

          {/* Current Portal Active Badge */}
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Active Environment
            </div>
            <div className="text-sm font-bold text-white mt-0.5 flex items-center justify-between">
              <span>{navConfig.portalTitle}</span>
              <Badge variant="gold" className="text-[10px] py-0 px-2 uppercase">
                {currentRole}
              </Badge>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
              Portal Navigation
            </div>
            {navConfig.items.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150',
                    isActive
                      ? 'bg-[#166534] text-white shadow-sm font-bold'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn('w-4 h-4', isActive ? 'text-white' : 'text-slate-400')} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="gold" className="text-[10px] py-0 px-1.5 font-bold">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Rapid Portal Switcher (For Pair-Programming & Demo Verification) */}
          <div className="pt-4 border-t border-slate-800/90 flex flex-col gap-1.5">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
              Switch Role Gateway
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {ALL_PORTALS.map((p) => (
                <button
                  key={p.role}
                  type="button"
                  onClick={() => handleRoleSwitch(p.role)}
                  className={cn(
                    'px-2.5 py-2 rounded-lg text-xs font-semibold text-left transition-colors border',
                    currentRole === p.role
                      ? 'bg-slate-800 text-[#D97706] border-amber-500/40 font-bold'
                      : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Yield Reserve Health Preview Callout */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
            <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">
              <span>Reserve Health</span>
              <span className="text-emerald-400 font-black">145% Stable</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#166534] h-full w-[85%] rounded-full" />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              6.4 mo dry-cycle stress buffer active
            </span>
          </div>

        </div>

        {/* Bottom User Profile Section */}
        <div className="p-4 border-t border-slate-800 bg-[#0B1120] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-200">
              {user?.name?.[0] || 'U'}
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-bold text-white block truncate">
                {user?.name || 'Verified User'}
              </span>
              <span className="text-[10px] text-slate-400 capitalize block truncate">
                {user?.role} Portal
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            title="Sign Out"
            className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </aside>

      {/* ═══════════════════════════════════════════════════════════════════
          MAIN WORKSPACE CANVAS: Crisp Pure White / Off-White (#FAFAFA)
          Zero overlap, strict Flexbox/Grid flow with generous padding
      ═══════════════════════════════════════════════════════════════════ */}
      <main className="flex-1 min-w-0 bg-[#FAFAFA] flex flex-col">
        
        {/* Workspace Breadcrumb & Header Utility Bar */}
        <div className="bg-white border-b border-slate-200/80 px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Dairy-Lift ERP
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-semibold capitalize">{currentRole}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold">{navConfig.portalTitle}</span>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="success" className="text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-700" />
              Institutional Audit Active
            </Badge>
          </div>
        </div>

        {/* Content Viewport */}
        <div className="p-6 md:p-8 lg:p-10 flex-1">
          {children}
        </div>

      </main>

    </div>
  );
}
