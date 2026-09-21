'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth, UserRole } from '@/lib/auth/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Milk, TrendingUp, ShoppingCart, ClipboardList,
  ShieldCheck, ArrowRight, ArrowLeft, CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoleOption {
  key: UserRole;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  demoEmail: string;
  demoPass: string;
  targetPath: string;
  tag: string;
  yieldHighlight?: string;
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    key: 'admin',
    label: 'Master Admin',
    sublabel: 'Enterprise supply chain & ERP command',
    icon: ShieldCheck,
    demoEmail: 'admin@gmail.com',
    demoPass: '123',
    targetPath: '/admin',
    tag: 'Executive Command',
  },
  {
    key: 'staff',
    label: 'Farm Staff',
    sublabel: 'Daily milk logs & veterinary operations',
    icon: ClipboardList,
    demoEmail: 'staff@gmail.com',
    demoPass: '123',
    targetPath: '/staff',
    tag: 'IoT Telemetry',
  },
  {
    key: 'investor',
    label: 'Investor',
    sublabel: 'Livestock asset & dividend portfolio',
    icon: TrendingUp,
    demoEmail: 'investor@gmail.com',
    demoPass: '123',
    targetPath: '/investor',
    tag: '1.5% Base Yield',
    yieldHighlight: 'Fixed 1.5% monthly base yield (18% APY) + dynamic performance bonus up to 0.5% paid on the 1st of every month.',
  },
  {
    key: 'consumer',
    label: 'Consumer',
    sublabel: 'Quick-commerce farm fresh store',
    icon: ShoppingCart,
    demoEmail: 'rishik@gmail.com',
    demoPass: '123',
    targetPath: '/consumer',
    tag: '12-Min Delivery',
  },
];

export default function AuthGatewayPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [email,    setEmail]    = useState('admin@gmail.com');
  const [password, setPassword] = useState('123');
  const [loading,  setLoading]  = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const activeRole = ROLE_OPTIONS.find((r) => r.key === selectedRole) || ROLE_OPTIONS[1];

  const handleSelectRole = (role: RoleOption) => {
    setSelectedRole(role.key);
    setEmail(role.demoEmail);
    setPassword(role.demoPass);
    setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const res = await login(email, password);
    if (res.success) {
      router.push(activeRole.targetPath);
    } else {
      setErrorMsg(res.error || 'Invalid credentials. Select a role above to autofill demo credentials.');
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        fontFamily: 'var(--font-sans)',
        background: 'linear-gradient(160deg, var(--p-forest-25) 0%, var(--color-bg) 60%, var(--p-warm-white) 100%)',
        color: 'var(--color-text-primary)',
      }}
    >
      {/* ── Header ── */}
      <header className="px-6 pt-6 pb-4 flex items-center justify-between max-w-6xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center text-white transition-opacity group-hover:opacity-80 shadow-sm"
            style={{ background: 'var(--color-brand)' }}
          >
            <Milk className="w-5 h-5" />
          </div>
          <div>
            <span
              className="block text-lg font-bold leading-none"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
            >
              DairyLift
            </span>
            <span
              className="block text-[10px] font-bold uppercase tracking-widest"
              style={{ color: 'var(--color-brand)' }}
            >
              Enterprise
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs font-semibold transition-colors hover:opacity-70"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Home
        </Link>
      </header>

      {/* ── Main ── */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md flex flex-col gap-6">

          {/* Title block */}
          <div className="text-center flex flex-col items-center gap-2">
            <Badge variant="accent" className="font-bold tracking-wider uppercase mb-1">
              Institutional Access Gateway
            </Badge>
            <h1 className="font-bold tracking-tight text-2xl sm:text-3xl text-slate-900 leading-tight">
              Select Your Portal Identity
            </h1>
            <p className="text-sm leading-relaxed text-slate-600 max-w-sm">
              Evaluate the consumer store, investor portfolio, farm ERP, or admin command center.
            </p>
          </div>

          {/* Role selector grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {ROLE_OPTIONS.map((r) => {
              const Icon = r.icon;
              const isSelected = selectedRole === r.key;
              return (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => handleSelectRole(r)}
                  className={cn(
                    'p-3 text-left flex flex-col gap-2 cursor-pointer transition-all',
                    'border rounded-xl bg-white',
                    isSelected
                      ? 'border-emerald-600 ring-2 ring-emerald-600/20 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 shadow-xs'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={cn(
                        'w-7 h-7 rounded-lg flex items-center justify-center transition-colors',
                        isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    )}
                  </div>
                  <div>
                    <div
                      className={cn(
                        'text-xs font-bold leading-tight',
                        isSelected ? 'text-emerald-700' : 'text-slate-900'
                      )}
                    >
                      {r.label}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {r.tag}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Auth form */}
          <div className="overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-md">
            {/* Form header */}
            <div className="px-6 py-4 flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/50">
              <div className="min-w-0">
                <h2 className="text-sm font-bold text-slate-900">
                  Sign in to {activeRole.label} Suite
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {activeRole.sublabel}
                </p>
              </div>
              <Badge variant="muted" className="shrink-0 uppercase font-mono text-[10px]">{selectedRole}</Badge>
            </div>

            {/* Form body */}
            <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
              {/* Investor highlight */}
              {activeRole.yieldHighlight && (
                <div className="p-3 flex items-start gap-2.5 text-xs leading-relaxed bg-amber-50 border border-amber-200 rounded-xl text-amber-900">
                  <TrendingUp className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                  <span>
                    <strong>Sustainable Institutional Yield:</strong> {activeRole.yieldHighlight}
                  </span>
                </div>
              )}

              {/* Error */}
              {errorMsg && (
                <div className="p-3 text-xs font-medium bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {errorMsg}
                </div>
              )}

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="auth-email"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-600"
                >
                  Email Address
                </label>
                <Input
                  id="auth-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="h-10 text-sm"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="auth-password"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-600"
                  >
                    Password
                  </label>
                  <span className="text-[11px] font-mono text-slate-400">
                    (default: 123)
                  </span>
                </div>
                <Input
                  id="auth-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10 text-sm font-mono"
                />
              </div>

              {/* Autofilled credential chip */}
              <div className="px-3 py-2 flex items-center justify-between text-xs bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500">Demo Account Loaded:</span>
                <span className="font-mono font-bold text-slate-900">{email}</span>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                className="w-full mt-1 font-semibold"
              >
                {loading ? 'Authenticating…' : (
                  <span className="flex items-center justify-center gap-2">
                    Enter {activeRole.label} Portal
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>

            {/* Form footer */}
            <div className="px-6 py-3 flex items-center justify-between border-t border-slate-100 bg-slate-50/60">
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                256-bit Encrypted Session
              </span>
              <span className="text-xs text-slate-500">
                FSSAI &amp; NABARD Compliant
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer
        className="py-4 text-center text-xs border-t"
        style={{
          borderColor: 'var(--color-border)',
          color: 'var(--color-text-muted)',
        }}
      >
        © 2026 DairyLift Agro-Parks Private Limited · Institutional Agri-Asset Infrastructure
      </footer>
    </div>
  );
}
