'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/auth/AuthContext';
import { useCartStore } from '@/lib/store/cartStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Milk, ShoppingCart, TrendingUp, LogOut, Bell, User,
  BarChart3, Clipboard, ChevronDown, Star
} from 'lucide-react';
import { useState } from 'react';

const PORTAL_CONFIGS = {
  consumer: {
    label: 'Consumer Store',
    color: 'forest',
    bg: 'bg-white',
    textPrimary: 'text-slate-850',
    textSecondary: 'text-slate-850/60',
    border: 'border-slate-100',
    accent: 'text-forest-600',
    accentBg: 'bg-forest-50',
    accentHover: 'hover:bg-forest-50',
    links: [
      { href: '/consumer', label: 'Shop' },
      { href: '/consumer/invest', label: '✨ Invest in Cattle' },
    ],
  },
  investor: {
    label: 'Investor Portal',
    color: 'gold',
    bg: 'bg-white',
    textPrimary: 'text-slate-850',
    textSecondary: 'text-slate-850/60',
    border: 'border-slate-100',
    accent: 'text-gold-400',
    accentBg: 'bg-amber-50',
    accentHover: 'hover:bg-amber-50',
    links: [
      { href: '/investor', label: 'Dashboard' },
      { href: '/investor/portfolio', label: 'My Portfolio' },
    ],
  },
  staff: {
    label: 'Farm Staff Portal',
    color: 'blue',
    bg: 'bg-slate-850',
    textPrimary: 'text-white',
    textSecondary: 'text-white/60',
    border: 'border-white/10',
    accent: 'text-blue-400',
    accentBg: 'bg-blue-500/10',
    accentHover: 'hover:bg-white/10',
    links: [
      { href: '/staff', label: 'Dashboard' },
    ],
  },
  admin: {
    label: 'Admin Command Center',
    color: 'slate',
    bg: 'bg-slate-950',
    textPrimary: 'text-white',
    textSecondary: 'text-white/60',
    border: 'border-white/10',
    accent: 'text-emerald-400',
    accentBg: 'bg-emerald-500/10',
    accentHover: 'hover:bg-white/10',
    links: [
      { href: '/admin', label: 'Dashboard' },
    ],
  },
};

export default function PortalNavbar() {
  const { user, logout } = useAuth();
  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.openCart);
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);

  if (!user) return null;

  // If upgraded consumer, show consumer config but with investor link
  const role = user.role === 'consumer' && user.isUpgradedInvestor ? 'consumer' : user.role;
  const config = PORTAL_CONFIGS[role as keyof typeof PORTAL_CONFIGS] || PORTAL_CONFIGS.consumer;

  const PORTAL_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
    consumer: ShoppingCart,
    investor: TrendingUp,
    staff: Clipboard,
    admin: BarChart3,
  };
  const PortalIcon = PORTAL_ICON_MAP[user.role] || ShoppingCart;

  return (
    <header className={`sticky top-0 z-50 ${config.bg} border-b ${config.border} shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Portal Label */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-forest-500 to-forest-300 flex items-center justify-center shadow-forest">
                <Milk className="w-4.5 h-4.5 text-white" style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="hidden sm:block">
                <span className={`font-display text-lg font-bold text-forest-600`}>Dairy</span>
                <span className={`font-display text-lg font-bold text-gold-400`}>-Lift</span>
              </div>
            </Link>
            <div className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${config.accentBg}`}>
              <PortalIcon className={`w-3.5 h-3.5 ${config.accent}`} />
              <span className={`text-xs font-semibold ${config.accent}`}>{config.label}</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {config.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? `${config.accentBg} ${config.accent}`
                    : `${config.textSecondary} ${config.accentHover} hover:${config.textPrimary}`
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Investor toggle for upgraded consumers */}
            {user.isUpgradedInvestor && (
              <Link
                href="/investor"
                className="ml-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-gold-300 to-gold-200 text-slate-850 flex items-center gap-1.5"
              >
                <Star className="w-3.5 h-3.5" />
                Investor Dashboard
              </Link>
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Cart (consumer only) */}
            {(user.role === 'consumer') && (
              <motion.button
                onClick={openCart}
                whileTap={{ scale: 0.95 }}
                className={`relative p-2.5 rounded-xl ${config.accentHover} transition-colors`}
              >
                <ShoppingCart className={`w-5 h-5 ${config.textSecondary}`} />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-forest-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                    >
                      {totalItems > 9 ? '9+' : totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            )}

            {/* Notifications */}
            <button className={`p-2.5 rounded-xl ${config.accentHover} transition-colors relative`}>
              <Bell className={`w-5 h-5 ${config.textSecondary}`} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl ${config.accentHover} transition-colors`}
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-forest-500 to-forest-300 flex items-center justify-center text-white text-sm font-bold`}>
                  {user.avatar}
                </div>
                <span className={`hidden md:block text-sm font-medium ${config.textPrimary}`}>
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown className={`hidden md:block w-4 h-4 ${config.textSecondary}`} />
              </button>

              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    onBlur={() => setShowDropdown(false)}
                    className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-card-hover border border-slate-100 overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-slate-100">
                      <p className="font-semibold text-slate-850 text-sm">{user.name}</p>
                      <p className="text-slate-850/50 text-xs mt-0.5">{user.email}</p>
                      <span className={`inline-flex mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'admin' ? 'bg-slate-100 text-slate-700' :
                        user.role === 'investor' ? 'bg-amber-50 text-amber-700' :
                        user.role === 'staff' ? 'bg-blue-50 text-blue-700' :
                        'bg-forest-50 text-forest-700'
                      }`}>
                        {user.isUpgradedInvestor ? '⭐ Investor Member' : user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => { setShowDropdown(false); logout(); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 text-red-600 text-sm font-medium transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
