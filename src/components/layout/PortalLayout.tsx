'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth, UserRole } from '@/lib/auth/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { farmService } from '@/lib/services/farmService';
import { notificationService } from '@/lib/services/notificationService';
import NotificationCenter from '@/components/layout/NotificationCenter';
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
  Layers,
  Thermometer,
  Package,
  FileText,
  Users,
  Settings,
  HelpCircle,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavGroup {
  groupName: string;
  items: {
    label: string;
    href: string;
    icon: React.ElementType;
    badge?: string;
    roles?: UserRole[];
  }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    groupName: 'OVERVIEW',
    items: [
      { label: 'Admin Command', href: '/admin', icon: ShieldAlert, roles: ['admin'] },
      { label: 'Staff Operations', href: '/staff', icon: ClipboardList, roles: ['staff', 'admin'] },
      { label: 'Investor Suite', href: '/investor', icon: TrendingUp, roles: ['investor', 'admin'] },
      { label: 'Fresh Storefront', href: '/consumer', icon: ShoppingCart, roles: ['consumer', 'investor', 'admin'] },
    ],
  },
  {
    groupName: 'OPERATIONS',
    items: [
      { label: 'Farms & Sheds', href: '/admin#farms', icon: Layers, roles: ['admin', 'staff'] },
      { label: 'Cattle Registry', href: '/staff#herd', icon: Milk, roles: ['admin', 'staff'] },
      { label: 'Milking Parlour', href: '/staff#milking', icon: Activity, roles: ['admin', 'staff'] },
      { label: 'IoT Environment', href: '/staff#health', icon: Thermometer, badge: 'Live', roles: ['admin', 'staff'] },
    ],
  },
  {
    groupName: 'INVESTMENT',
    items: [
      { label: 'Co-Ownership Plans', href: '/admin#plans', icon: FileText, roles: ['admin'] },
      { label: 'My Portfolio', href: '/investor/portfolio', icon: TrendingUp, roles: ['investor', 'admin'] },
      { label: 'Plan Discovery', href: '/consumer/invest', icon: Milk, roles: ['consumer', 'investor', 'admin'] },
    ],
  },
  {
    groupName: 'COMMERCE',
    items: [
      { label: 'Dairy Catalog', href: '/consumer', icon: Package, roles: ['consumer', 'investor', 'admin'] },
      { label: 'Store Pricing', href: '/admin#products', icon: Settings, roles: ['admin'] },
      { label: 'Order Fulfillment', href: '/admin#orders', icon: ShoppingCart, roles: ['admin'] },
    ],
  },
  {
    groupName: 'SYSTEM',
    items: [
      { label: 'Role Governance', href: '/admin#roles', icon: Users, roles: ['admin'] },
      { label: 'Compliance & Legal', href: '/legal', icon: ShieldCheck },
    ],
  },
];

const ALL_ROLES: { role: UserRole; label: string; path: string }[] = [
  { role: 'admin', label: 'Master Admin', path: '/admin' },
  { role: 'staff', label: 'Farm Staff', path: '/staff' },
  { role: 'investor', label: 'Investor Suite', path: '/investor' },
  { role: 'consumer', label: 'Consumer Store', path: '/consumer' },
];

export default function PortalLayout({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}) {
  const { user, switchRole, logout } = useAuth();
  const currentRole: UserRole = user?.role || 'consumer';
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    async function loadAlerts() {
      try {
        const count = await notificationService.getUnreadCount();
        setUnreadCount(count);
      } catch (e) {
        console.error('Failed to load alerts count', e);
      }
    }
    loadAlerts();
    const interval = setInterval(loadAlerts, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleRoleSelect = (role: UserRole, targetPath: string) => {
    switchRole(role);
    router.push(targetPath);
    setMobileMenuOpen(false);
  };

  const getBreadcrumbs = () => {
    if (pathname.startsWith('/admin')) return ['DairyLift ERP', 'Master Command', 'Operations Overview'];
    if (pathname.startsWith('/staff')) return ['DairyLift ERP', 'Farm Operations', 'Shift Parlour'];
    if (pathname.startsWith('/investor')) return ['DairyLift Wealth', 'Investor Suite', 'Asset Performance'];
    if (pathname.startsWith('/consumer/invest')) return ['DairyLift Commerce', 'Livestock Co-Ownership', 'Plan Explorer'];
    if (pathname.startsWith('/consumer')) return ['DairyLift Commerce', 'Quick Store', 'A2 Fresh Dairy'];
    if (pathname.startsWith('/legal')) return ['DairyLift Platform', 'Governance', 'Regulatory Disclosures'];
    return ['DairyLift Platform', 'Portal'];
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="min-h-screen bg-[#FCFCF9] flex flex-col antialiased text-[#0F172A]">
      
      {/* Simulation Watermark Notification Bar */}
      <aside aria-label="Simulation Environment Warning" className="bg-[#0F172A] text-white text-xs py-2 px-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <span className="dl-simulation-badge">Demo Environment</span>
          <span className="text-slate-300 font-medium">
            Operational Simulation Data — Illustrative Dairy Herd Telemetry & Returns
          </span>
        </div>

        {/* Rapid Portal Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-slate-400 text-[11px] mr-1 hidden sm:inline">Active Portal:</span>
          {ALL_ROLES.map(({ role, label, path }) => (
            <button
              key={role}
              onClick={() => handleRoleSelect(role, path)}
              className={cn(
                'px-2.5 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap',
                currentRole === role
                  ? 'bg-[#14532D] text-white shadow-xs'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Framework Container */}
      <div className="flex-1 flex flex-row min-h-0 w-full">
        
        {/* DESKTOP SIDEBAR: Strict ~250px Width */}
        <aside className="hidden lg:flex w-[250px] shrink-0 flex-col bg-white border-r border-[#E2E8F0] select-none justify-between h-[calc(100vh-41px)] sticky top-0">
          
          <div className="flex flex-col flex-1 overflow-y-auto">
            {/* Brand Logo & Unit Identity */}
            <div className="p-5 border-b border-[#E2E8F0] bg-white">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-[#14532D] flex items-center justify-center text-white shadow-sm group-hover:bg-[#0B3B24] transition-colors">
                  <Milk className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-serif font-bold text-lg text-[#0F172A] tracking-tight block">
                    DairyLift
                  </span>
                  <span className="text-[10px] uppercase font-bold text-[#14532D] tracking-wider block">
                    Enterprise Ecosystem
                  </span>
                </div>
              </Link>

              <div className="mt-3 p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs">
                <span className="text-[10px] text-[#64748B] font-semibold uppercase block">Operating Unit</span>
                <span className="font-bold text-[#0F172A] truncate block">Nashik High-Tech Park A</span>
              </div>
            </div>

            {/* Navigation Groups */}
            <nav className="p-3 space-y-5 flex-1">
              {NAV_GROUPS.map((group) => {
                const visibleItems = group.items.filter(
                  (item) => !item.roles || item.roles.includes(currentRole)
                );
                if (visibleItems.length === 0) return null;

                return (
                  <div key={group.groupName} className="space-y-1">
                    <span className="px-3 text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-1.5">
                      {group.groupName}
                    </span>
                    {visibleItems.map((item) => {
                      const isActive = pathname === item.href.split('#')[0];
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          className={cn(
                            'flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors',
                            isActive
                              ? 'bg-[#F0FDF4] text-[#14532D] border border-[#BBF7D0]/60'
                              : 'text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                          )}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-[#14532D]' : 'text-[#64748B]')} />
                            <span>{item.label}</span>
                          </div>
                          {item.badge && (
                            <Badge variant="gold" className="text-[9px] py-0 px-1.5 h-4">
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer / User Identity */}
          <div className="p-4 border-t border-[#E2E8F0] bg-[#F8FAFC] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-[#14532D] text-white font-bold flex items-center justify-center text-xs shrink-0">
                  {user?.name ? user.name[0] : 'U'}
                </div>
                <div className="truncate">
                  <span className="text-xs font-bold text-[#0F172A] block truncate">{user?.name || 'Operator'}</span>
                  <span className="text-[10px] text-[#64748B] capitalize block">{currentRole} Session</span>
                </div>
              </div>

              <button
                onClick={logout}
                title="Logout"
                className="text-[#64748B] hover:text-[#DC2626] p-1.5 rounded transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* WORKSPACE VIEWPORT (Desktop + Mobile) */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* HEADER BAR: Breadcrumbs, Action Toolbar, Notifications */}
          <header className="h-16 px-6 md:px-8 border-b border-[#E2E8F0] bg-white flex items-center justify-between gap-4 sticky top-0 z-30 shadow-2xs">
            
            {/* Left: Mobile Toggle & Breadcrumbs */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-[#475569] hover:bg-[#F8FAFC] rounded-lg cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="hidden sm:flex items-center gap-2 text-xs text-[#64748B]">
                {breadcrumbs.map((crumb, idx) => (
                  <React.Fragment key={crumb}>
                    {idx > 0 && <span className="text-[#CBD5E1]">/</span>}
                    <span className={cn(idx === breadcrumbs.length - 1 ? 'font-bold text-[#0F172A]' : 'hover:text-[#0F172A]')}>
                      {crumb}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Right: Notification Center Bell & User Quick Actions */}
            <div className="flex items-center gap-3">
              
              {/* Notification Center Trigger */}
              <button
                onClick={() => setNotifOpen(true)}
                className="relative p-2 text-[#475569] hover:bg-[#F8FAFC] rounded-lg transition-colors cursor-pointer border border-[#E2E8F0]"
                title="Open Enterprise Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#DC2626] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-4 text-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              <Link href="/auth">
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden md:inline-flex border-[#CBD5E1] text-[#0F172A] hover:bg-[#F8FAFC]"
                >
                  <Users className="w-3.5 h-3.5 mr-1.5" />
                  Role Gateway
                </Button>
              </Link>
            </div>
          </header>

          {/* MAIN APPLICATION WORKSPACE CONTENT */}
          <main className="flex-1 p-6 md:p-8 lg:p-10 max-w-7xl w-full mx-auto space-y-6">
            {children}
          </main>
        </div>
      </div>

      {/* MOBILE DRAWER SHEET */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-72 max-w-[80vw] bg-white h-full shadow-2xl flex flex-col justify-between p-5 z-10 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#14532D] text-white flex items-center justify-center">
                    <Milk className="w-4 h-4" />
                  </div>
                  <span className="font-serif font-bold text-lg text-[#0F172A]">DairyLift</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-[#64748B]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-4">
                {NAV_GROUPS.map((group) => {
                  const visibleItems = group.items.filter(
                    (item) => !item.roles || item.roles.includes(currentRole)
                  );
                  if (visibleItems.length === 0) return null;

                  return (
                    <div key={group.groupName} className="space-y-1">
                      <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-1">
                        {group.groupName}
                      </span>
                      {visibleItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between p-2 rounded text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC]"
                        >
                          <div className="flex items-center gap-2">
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </div>
                          {item.badge && (
                            <Badge variant="gold" className="text-[9px] py-0 px-1.5 h-4">
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2E8F0] space-y-2">
              <Button variant="danger" size="sm" onClick={logout} className="w-full justify-center">
                <LogOut className="w-3.5 h-3.5 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Shared Notification Center Modal Drawer */}
      <NotificationCenter
        open={notifOpen}
        onOpenChange={setNotifOpen}
        onUpdateBadge={async () => {
          const count = await notificationService.getUnreadCount();
          setUnreadCount(count);
        }}
      />
    </div>
  );
}
