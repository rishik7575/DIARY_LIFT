'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth, UserRole } from '@/lib/auth/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { farmService } from '@/lib/services';
import { EnvironmentalSensorAlert } from '@/lib/types/farm';
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
  ShieldCheck,
  Bell,
  AlertTriangle,
  Activity,
  CheckCircle2,
  ExternalLink,
  Layers,
  Thermometer,
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
      { label: 'Cattle Co-Ownership', href: '/consumer/invest', icon: TrendingUp, badge: '1.5% Yield' },
    ],
  },
  investor: {
    portalTitle: 'Investor Financial Suite',
    items: [
      { label: 'Portfolio Overview', href: '/investor', icon: TrendingUp },
      { label: 'Allocated Cattle Units', href: '/investor/portfolio', icon: Milk },
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
      { label: 'Executive Analytics & Sensor Ops', href: '/admin', icon: ShieldAlert },
    ],
  },
};

const ALL_PORTALS = [
  { role: 'admin' as UserRole, label: 'Master Admin', path: '/admin' },
  { role: 'staff' as UserRole, label: 'Farm Staff', path: '/staff' },
  { role: 'investor' as UserRole, label: 'Investor Suite', path: '/investor' },
  { role: 'consumer' as UserRole, label: 'Consumer Store', path: '/consumer' },
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
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [activeAlerts, setActiveAlerts] = useState<EnvironmentalSensorAlert[]>([]);

  const currentRole: UserRole = user?.role || 'investor';
  const navConfig = ROLE_NAV_CONFIG[currentRole] || ROLE_NAV_CONFIG.investor;

  useEffect(() => {
    async function loadAlerts() {
      try {
        const alerts = await farmService.getOperationalAlerts();
        setActiveAlerts(alerts.filter((a) => a.status !== 'RESOLVED'));
      } catch (e) {
        console.error('Failed to load operational alerts for topbar:', e);
      }
    }
    loadAlerts();
  }, [pathname]);

  const handleLogout = () => {
    logout();
    router.push('/auth');
  };

  const handleRoleSwitch = (newRole: UserRole) => {
    switchRole(newRole);
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col antialiased text-slate-900">
      
      {/* ═══════════════════════════════════════════════════════════════════
          PERSISTENT COMPLIANCE & SIMULATION DISCLAIMER BAR
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-950 px-4 py-1.5 text-center text-xs font-semibold flex items-center justify-center gap-2">
        <span className="bg-amber-500 text-slate-900 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider">
          Demo Prototype
        </span>
        <span>
          OPERATIONAL SIMULATION DATA — All cattle yields, sensor readings, and returns represent sample modeling. Zero actual financial guarantees.
        </span>
      </div>

      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        
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

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white relative"
              aria-label="View notifications"
            >
              <Bell className="w-4.5 h-4.5" />
              {activeAlerts.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {activeAlerts.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* ═══════════════════════════════════════════════════════════════════
            LEFT SIDEBAR: Deep Slate (#0F172A)
            Desktop: Fixed width 64 (16rem), zero overlap. Mobile: Drawer
        ═══════════════════════════════════════════════════════════════════ */}
        <aside
          className={cn(
            'bg-[#0F172A] text-white border-r border-slate-800 flex flex-col justify-between shrink-0 transition-transform duration-200 z-30',
            'md:w-64 lg:w-72 md:sticky md:top-0 md:h-[calc(100vh-32px)]',
            mobileOpen ? 'fixed inset-0 top-[85px] flex' : 'hidden md:flex'
          )}
        >
          {/* Top Segment */}
          <div className="p-5 flex flex-col gap-5 overflow-y-auto">
            
            {/* Brand Heading */}
            <Link href="/" className="hidden md:flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#166534] to-[#14532D] flex items-center justify-center text-white shadow-md border border-emerald-500/30 shrink-0">
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
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Current Portal
              </div>
              <div className="text-sm font-bold text-white mt-0.5 flex items-center justify-between">
                <span className="truncate pr-1">{navConfig.portalTitle}</span>
                <Badge variant="gold" className="text-[10px] py-0 px-2 uppercase shrink-0">
                  {currentRole}
                </Badge>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-1.5">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">
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

            {/* Rapid Portal Switcher */}
            <div className="pt-3 border-t border-slate-800/90 flex flex-col gap-1.5">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">
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
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs mt-auto">
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
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-200 shrink-0">
                {user?.name?.[0] || 'U'}
              </div>
              <div className="overflow-hidden min-w-0">
                <span className="text-xs font-bold text-white block truncate">
                  {user?.name || 'Demo User'}
                </span>
                <span className="text-[10px] text-slate-400 capitalize block truncate">
                  {user?.role} Access
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </aside>

        {/* ═══════════════════════════════════════════════════════════════════
            MAIN WORKSPACE CANVAS: Clean light canvas (#FAFAFA)
            Zero layout overlap, uniform max-w-7xl centered viewport
        ═══════════════════════════════════════════════════════════════════ */}
        <main className="flex-1 min-w-0 bg-[#FAFAFA] flex flex-col">
          
          {/* Top Header Bar with Breadcrumb & Operational Alert Notification Center */}
          <div className="bg-white border-b border-slate-200/80 px-6 lg:px-8 py-3 flex items-center justify-between gap-4 sticky top-0 z-20">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Link href="/" className="hover:text-slate-900 transition-colors">
                Dairy-Lift
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-800 font-semibold capitalize">{currentRole}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 font-bold">{navConfig.portalTitle}</span>
            </div>

            <div className="flex items-center gap-3 relative">
              {/* Operational Alert Notification Bell */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 relative flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Bell className="w-4 h-4 text-slate-600" />
                  <span className="hidden sm:inline">Alerts</span>
                  {activeAlerts.length > 0 && (
                    <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                      {activeAlerts.length}
                    </span>
                  )}
                </button>

                {/* Notifications Popover Drawer */}
                {notificationsOpen && (
                  <div className="absolute right-0 top-11 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-4 space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-amber-600" />
                        <span className="font-bold text-xs text-slate-900">Farm IoT Sensor Notifications</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">
                        {activeAlerts.length} Active
                      </span>
                    </div>

                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {activeAlerts.length === 0 ? (
                        <div className="text-center py-4 text-xs text-slate-500 flex items-center justify-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-forest-700" />
                          <span>All facility sensors operating within threshold limits.</span>
                        </div>
                      ) : (
                        activeAlerts.map((alert) => (
                          <div
                            key={alert.id}
                            className="p-2.5 rounded-lg bg-red-50/70 border border-red-200 text-xs space-y-1"
                          >
                            <div className="flex justify-between items-start">
                              <span className="font-bold text-red-900">{alert.shedName}</span>
                              <Badge className="bg-red-600 text-white text-[9px] py-0 px-1 font-bold">
                                {alert.severity}
                              </Badge>
                            </div>
                            <p className="text-slate-700 text-[11px]">
                              {alert.metricLabel}: <strong className="text-red-700 font-mono">{alert.currentValue}{alert.unit}</strong> (Threshold: {alert.thresholdValue}{alert.unit})
                            </p>
                            <div className="flex justify-between items-center pt-1 border-t border-red-100/60">
                              <span className="text-[10px] text-slate-500 font-mono">Rule: {alert.sensorType}</span>
                              <Link
                                href="/staff"
                                onClick={() => setNotificationsOpen(false)}
                                className="text-[11px] font-bold text-forest-700 hover:text-forest-900"
                              >
                                Take Action in Staff ERP →
                              </Link>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                      <Link
                        href="/staff"
                        onClick={() => setNotificationsOpen(false)}
                        className="text-xs text-slate-600 hover:text-slate-900 font-medium"
                      >
                        Staff Action Center
                      </Link>
                      <button
                        onClick={() => setNotificationsOpen(false)}
                        className="text-xs text-slate-400 hover:text-slate-700"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <Badge variant="outline" className="text-xs font-semibold border-slate-200 text-slate-700 bg-white">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-forest-700" />
                Live Telemetry Synchronized
              </Badge>
            </div>
          </div>

          {/* Content Viewport */}
          <div className="p-6 md:p-8 lg:p-10 flex-1 max-w-7xl mx-auto w-full">
            {children}
          </div>

        </main>

      </div>

    </div>
  );
}
