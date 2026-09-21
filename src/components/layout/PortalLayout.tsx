'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth, UserRole } from '@/lib/auth/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  Activity,
  Layers,
  Thermometer,
  Package,
  FileText,
  Users,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* ──────────────────────────────────────────────────────────── */
/*  NAV CONFIGURATION                                          */
/* ──────────────────────────────────────────────────────────── */

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  badgeVariant?: 'success' | 'warning' | 'info' | 'accent';
  roles?: UserRole[];
  exact?: boolean;
}

interface NavGroup {
  groupName: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    groupName: 'Overview',
    items: [
      { label: 'Admin Command', href: '/admin',    icon: ShieldAlert, roles: ['admin'],                        exact: true },
      { label: 'Farm Operations',href: '/staff',   icon: ClipboardList, roles: ['staff', 'admin'],             exact: true },
      { label: 'Investor Suite', href: '/investor',icon: TrendingUp,    roles: ['investor', 'admin'],          exact: true },
      { label: 'Fresh Store',    href: '/consumer',icon: ShoppingCart,  roles: ['consumer', 'investor', 'admin'], exact: true },
    ],
  },
  {
    groupName: 'Operations',
    items: [
      { label: 'Farms & Sheds',  href: '/admin#farms',    icon: Layers,       roles: ['admin', 'staff'] },
      { label: 'Cattle Registry',href: '/staff#herd',     icon: Milk,         roles: ['admin', 'staff'] },
      { label: 'Milking Parlour',href: '/staff#milking',  icon: Activity,     roles: ['admin', 'staff'] },
      { label: 'IoT Environment',href: '/staff#health',   icon: Thermometer,  roles: ['admin', 'staff'], badge: 'Live', badgeVariant: 'success' },
    ],
  },
  {
    groupName: 'Investment',
    items: [
      { label: 'Co-Ownership Plans', href: '/admin#plans',          icon: FileText, roles: ['admin'] },
      { label: 'My Portfolio',       href: '/investor/portfolio',   icon: TrendingUp, roles: ['investor', 'admin'] },
      { label: 'Plan Discovery',     href: '/consumer/invest',      icon: Milk, roles: ['consumer', 'investor', 'admin'] },
    ],
  },
  {
    groupName: 'Commerce',
    items: [
      { label: 'Dairy Catalog',    href: '/consumer',          icon: Package,   roles: ['consumer', 'investor', 'admin'] },
      { label: 'Store Pricing',    href: '/admin#products',    icon: Settings,  roles: ['admin'] },
      { label: 'Order Fulfilment', href: '/admin#orders',      icon: ShoppingCart, roles: ['admin'] },
    ],
  },
  {
    groupName: 'System',
    items: [
      { label: 'Role Governance',  href: '/admin#roles', icon: Users,       roles: ['admin'] },
      { label: 'Compliance',       href: '/legal',        icon: ShieldCheck },
    ],
  },
];

const PORTAL_SWITCHER: { role: UserRole; label: string; path: string }[] = [
  { role: 'admin',    label: 'Admin',    path: '/admin' },
  { role: 'staff',    label: 'Staff',    path: '/staff' },
  { role: 'investor', label: 'Investor', path: '/investor' },
  { role: 'consumer', label: 'Store',    path: '/consumer' },
];

/* ──────────────────────────────────────────────────────────── */
/*  HELPERS                                                    */
/* ──────────────────────────────────────────────────────────── */

function isItemActive(pathname: string, item: NavItem): boolean {
  const base = item.href.split('#')[0];
  if (item.exact) return pathname === base;
  return pathname.startsWith(base);
}

function getBreadcrumbs(pathname: string): string[] {
  if (pathname.startsWith('/admin'))           return ['DairyLift ERP', 'Admin Command'];
  if (pathname.startsWith('/staff'))           return ['DairyLift ERP', 'Farm Operations'];
  if (pathname.startsWith('/investor/portfolio')) return ['DairyLift', 'Investor Suite', 'Portfolio'];
  if (pathname.startsWith('/investor'))        return ['DairyLift', 'Investor Suite'];
  if (pathname.startsWith('/consumer/invest')) return ['DairyLift', 'Store', 'Co-Ownership'];
  if (pathname.startsWith('/consumer'))        return ['DairyLift', 'Fresh Store'];
  if (pathname.startsWith('/legal'))           return ['DairyLift', 'Compliance'];
  return ['DairyLift'];
}

/* ──────────────────────────────────────────────────────────── */
/*  SIDEBAR NAV ITEM                                           */
/* ──────────────────────────────────────────────────────────── */

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const active = isItemActive(pathname, item);
  const Icon   = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        'group flex items-center justify-between px-3 py-2 rounded-[var(--radius-md)] text-sm font-medium',
        'transition-colors duration-[var(--duration-fast)]',
        'relative',
        active
          ? 'bg-[var(--color-brand-light)] text-[var(--color-brand)] font-semibold'
          : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)]'
      )}
    >
      {/* Active indicator bar */}
      {active && (
        <span
          aria-hidden
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[var(--color-brand)] rounded-r-full"
        />
      )}

      <span className="flex items-center gap-2.5 min-w-0">
        <Icon
          className={cn(
            'w-4 h-4 shrink-0',
            active ? 'text-[var(--color-brand)]' : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)]'
          )}
        />
        <span className="truncate">{item.label}</span>
      </span>

      {item.badge && (
        <Badge
          variant={item.badgeVariant ?? 'success'}
          className="ml-1 text-[10px] px-1.5 py-0 h-4 shrink-0"
        >
          {item.badge}
        </Badge>
      )}
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────── */
/*  MAIN PORTAL LAYOUT                                         */
/* ──────────────────────────────────────────────────────────── */

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}) {
  const { user, switchRole, logout } = useAuth();
  const currentRole: UserRole = user?.role || 'consumer';
  const pathname  = usePathname();
  const router    = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifOpen,   setNotifOpen]   = useState(false);

  // Close mobile drawer on route change without setState in effect
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (mobileOpen) {
      setMobileOpen(false);
    }
  }

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const count = await notificationService.getUnreadCount();
        if (mounted) setUnreadCount(count);
      } catch { /* silent */ }
    };
    load();
    const interval = setInterval(load, 15_000);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  const handlePortalSwitch = (role: UserRole, path: string) => {
    switchRole(role);
    router.push(path);
  };

  const breadcrumbs = getBreadcrumbs(pathname);
  const userInitial = user?.name ? user.name[0].toUpperCase() : 'U';

  /* Filtered nav */
  const visibleGroups = NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((item) => !item.roles || item.roles.includes(currentRole)),
  })).filter((g) => g.items.length > 0);

  /* ── Sidebar content renderer (shared between desktop and mobile drawer) ── */
  const renderSidebarContent = (onClose?: () => void) => (
    <>
      {/* Brand */}
      <div
        className="flex items-center gap-3 px-5 py-4 border-b border-[var(--color-border)]"
        style={{ minHeight: '64px' }}
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          onClick={onClose}
        >
          <div
            className="w-8 h-8 rounded-[var(--radius-md)] flex items-center justify-center text-white shrink-0"
            style={{ background: 'var(--color-brand)' }}
          >
            <Milk className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span
              className="block font-bold text-base tracking-tight leading-none"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
            >
              DairyLift
            </span>
            <span
              className="block text-[10px] font-bold tracking-widest uppercase mt-0.5"
              style={{ color: 'var(--color-brand)' }}
            >
              Enterprise
            </span>
          </div>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] rounded"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Operating Unit chip */}
      <div className="px-4 pt-3 pb-1">
        <div
          className="px-3 py-2 rounded-[var(--radius-md)] text-xs"
          style={{
            background: 'var(--color-surface-muted)',
            border: '1px solid var(--color-border)',
          }}
        >
          <span
            className="block text-[10px] font-bold uppercase tracking-wider"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Operating Unit
          </span>
          <span
            className="block font-semibold truncate mt-0.5"
            style={{ color: 'var(--color-text-primary)', fontSize: '12px' }}
          >
            Nashik High-Tech Park A
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
        {visibleGroups.map((group) => (
          <div key={group.groupName}>
            <span
              className="block px-3 mb-1 text-[10px] font-bold uppercase tracking-[0.08em]"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {group.groupName}
            </span>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavLink key={item.label} item={item} pathname={pathname} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer: user identity */}
      <div
        className="px-4 py-4 border-t border-[var(--color-border)]"
        style={{ background: 'var(--color-surface-muted)' }}
      >
        <div className="flex items-center gap-2.5">
          {/* Avatar */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{ background: 'var(--color-brand)' }}
          >
            {userInitial}
          </div>
          <div className="flex-1 min-w-0">
            <span
              className="block text-sm font-semibold truncate"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {user?.name || 'Operator'}
            </span>
            <span
              className="block text-[11px] capitalize"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {currentRole} Session
            </span>
          </div>
          <button
            onClick={logout}
            title="Sign out"
            className="p-1.5 rounded-[var(--radius-sm)] transition-colors cursor-pointer"
            style={{ color: 'var(--color-text-muted)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-danger)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="dl-shell" style={{ background: 'var(--color-bg)' }}>

      {/* ── LIVE PRODUCTION REAL-TIME TELEMETRY TOPBAR ── */}
      <div
        className="dl-topbar shrink-0"
        role="banner"
        aria-label="Enterprise real-time status"
      >
        {/* Left: badge + message */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE ERP
          </span>
          <span
            className="text-[11px] font-medium truncate text-slate-300"
          >
            DairyLift Agro-Parks — Real-Time IoT Herd &amp; Cold-Chain Sync Active
          </span>
        </div>

        {/* Right: portal quick-switch */}
        <div className="flex items-center gap-1 shrink-0">
          <span
            className="hidden sm:block text-[10px] font-semibold uppercase tracking-wider mr-1 text-slate-400"
          >
            Enterprise Portal:
          </span>
          {PORTAL_SWITCHER.map(({ role, label, path }) => (
            <button
              key={role}
              onClick={() => handlePortalSwitch(role, path)}
              className={cn(
                'px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer',
                currentRole === role
                  ? 'text-white'
                  : 'text-white/50 hover:text-white/80'
              )}
              style={currentRole === role ? { background: 'var(--color-brand)' } : {}}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── BODY (sidebar + main) ── */}
      <div className="dl-shell-body">

        {/* ── DESKTOP SIDEBAR ── */}
        <aside
          className="dl-sidebar hidden lg:flex flex-col"
          aria-label="Main navigation"
        >
          {renderSidebarContent()}
        </aside>

        {/* ── MAIN AREA ── */}
        <div className="dl-main min-w-0">

          {/* ── STICKY HEADER ── */}
          <header className="dl-header shrink-0">

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 -ml-1 rounded-[var(--radius-md)] transition-colors cursor-pointer"
              style={{ color: 'var(--color-text-secondary)' }}
              aria-label="Open navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumbs */}
            <div className="hidden sm:flex items-center gap-1.5 min-w-0 flex-1">
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb}>
                  {idx > 0 && (
                    <ChevronRight
                      className="w-3 h-3 shrink-0"
                      style={{ color: 'var(--color-border-strong)' }}
                    />
                  )}
                  <span
                    className={cn(
                      'text-xs truncate',
                      idx === breadcrumbs.length - 1
                        ? 'font-semibold text-[var(--color-text-primary)]'
                        : 'text-[var(--color-text-muted)]'
                    )}
                  >
                    {crumb}
                  </span>
                </React.Fragment>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Notifications */}
              <button
                onClick={() => setNotifOpen(true)}
                aria-label="Open notifications"
                className="relative p-2 rounded-[var(--radius-md)] transition-colors cursor-pointer border border-[var(--color-border)]"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold text-white"
                    style={{ background: 'var(--color-danger)' }}
                  >
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Role gateway */}
              <Link href="/auth" className="hidden md:block">
                <Button variant="outline" size="sm">
                  <Users className="w-3.5 h-3.5" />
                  <span>Switch Role</span>
                </Button>
              </Link>
            </div>
          </header>

          {/* ── PAGE CONTENT ── */}
          <main className="dl-page flex-1">
            {children}
          </main>
        </div>
      </div>

      {/* ── MOBILE DRAWER ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[var(--z-modal)] lg:hidden flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <aside
            className="relative z-10 flex flex-col w-72 max-w-[85vw] h-full overflow-y-auto"
            style={{
              background: 'var(--color-surface)',
              animation: 'dl-slide-in-right var(--duration-normal) var(--ease-out)',
            }}
          >
            {renderSidebarContent(() => setMobileOpen(false))}
          </aside>
        </div>
      )}

      {/* ── NOTIFICATION CENTER ── */}
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
