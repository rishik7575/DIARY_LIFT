'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Milk,
  ShieldCheck,
  Lock,
  Mail,
  User,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  Activity,
  Layers,
} from 'lucide-react';

interface QuickAccount {
  email: string;
  name: string;
  expectedPortal: string;
  roleDescription: string;
  icon: string;
}

const QUICK_DEMO_ACCOUNTS: QuickAccount[] = [
  {
    email: 'admin@dairylift.in',
    name: 'Vikramaditya Singhania',
    expectedPortal: 'Master Admin (/admin)',
    roleDescription: 'Executive supply chain & financial ERP',
    icon: '🛡️',
  },
  {
    email: 'rajesh.deshmukh@dairylift.in',
    name: 'Dr. Rajesh Deshmukh',
    expectedPortal: 'Farm Staff (/staff)',
    roleDescription: 'AM/PM milking parlour logs & veterinary telemetry',
    icon: '📋',
  },
  {
    email: 'arjun.mehta@mumbaicapital.com',
    name: 'Arjun Mehta',
    expectedPortal: 'Investor Suite (/investor)',
    roleDescription: '1.5% base yield ledger & live cattle telemetry',
    icon: '📈',
  },
  {
    email: 'ananya.sharma@gmail.com',
    name: 'Ananya Sharma',
    expectedPortal: 'Consumer Store (/consumer)',
    roleDescription: 'Sub-15 min cold-chain A2 dairy quick-commerce',
    icon: '🛒',
  },
];

export default function AuthGatewayPage() {
  const { login, loginWithGoogle, signup } = useAuth();
  const router = useRouter();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('admin@dairylift.in');
  const [password, setPassword] = useState('123');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<string | null>(null);

  const handleQuickFill = (acc: QuickAccount) => {
    setEmail(acc.email);
    setPassword('123');
    setErrorMsg(null);
    setSuccessInfo(`Selected ${acc.name} — role resolves dynamically from database.`);
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setErrorMsg(null);
    setSuccessInfo(null);
    const res = await loginWithGoogle();
    if (res.success && res.redirectUrl) {
      setSuccessInfo(`Authenticated via Google as ${res.role?.toUpperCase()}! Redirecting to ${res.redirectUrl}...`);
      router.push(res.redirectUrl);
    } else {
      setGoogleLoading(false);
      setErrorMsg(res.error || 'Google authentication failed.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessInfo(null);

    if (mode === 'login') {
      const res = await login(email, password);
      if (res.success && res.redirectUrl) {
        setSuccessInfo(`Authenticated as ${res.role?.toUpperCase()}! Redirecting to ${res.redirectUrl}...`);
        router.push(res.redirectUrl);
      } else {
        setLoading(false);
        setErrorMsg(res.error || 'Authentication failed. Please verify your credentials.');
      }
    } else {
      if (!fullName.trim()) {
        setLoading(false);
        setErrorMsg('Please enter your full name to create an account.');
        return;
      }
      const res = await signup(fullName, email, password, 'consumer');
      if (res.success && res.redirectUrl) {
        setSuccessInfo('Account created successfully in Firestore! Redirecting to portal...');
        router.push(res.redirectUrl);
      } else {
        setLoading(false);
        setErrorMsg(res.error || 'Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#070D18] flex flex-col justify-between text-white selection:bg-[#15803D] selection:text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#14532D]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#D97706]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Navigation */}
      <header className="px-6 py-5 flex items-center justify-between border-b border-white/5 backdrop-blur-md z-10">
        <Link href="/" className="flex items-center gap-2.5 text-white group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#15803D] to-[#14532D] flex items-center justify-center shadow-lg shadow-[#15803D]/25 border border-white/10 group-hover:scale-105 transition-transform">
            <Milk className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight">DairyLift</span>
            <span className="text-[10px] block text-emerald-400 font-mono tracking-widest uppercase -mt-0.5">
              Enterprise ERP
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Badge className="bg-white/5 text-slate-300 border-white/10 text-xs hidden sm:flex items-center gap-1.5 py-1 px-3">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            RBAC Telemetry Active
          </Badge>
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors py-1.5 px-3 rounded-lg hover:bg-white/5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Public Site
          </Link>
        </div>
      </header>

      {/* Main Authentication Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 z-10 my-4">
        <div className="w-full max-w-lg">
          {/* Card Frame */}
          <div className="bg-[#0B132B]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-7 sm:p-9 shadow-2xl shadow-black/80 relative">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Universal Enterprise Single Sign-On
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {mode === 'login' ? 'Sign In to DairyLift' : 'Register Enterprise Access'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
                {mode === 'login'
                  ? 'Sign in via Google or enter your registered corporate email to auto-resolve your authorized portal.'
                  : 'Create your DairyLift member account. You will be provisioned access to consumer quick-commerce and can apply for investor allocation.'}
              </p>
            </div>

            {/* Status alerts */}
            {errorMsg && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successInfo && (
              <div className="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{successInfo}</span>
              </div>
            )}

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading || loading}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-semibold h-11 px-4 rounded-xl border border-white/20 shadow-md transition-all active:scale-[0.99] mb-5 disabled:opacity-60 cursor-pointer"
            >
              {googleLoading ? (
                <span className="flex items-center gap-2 text-xs">
                  <span className="w-4 h-4 border-2 border-slate-400 border-t-slate-800 rounded-full animate-spin" />
                  Connecting with Google...
                </span>
              ) : (
                <>
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span className="text-sm">Continue with Google</span>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center mb-5">
              <div className="border-t border-white/10 w-full" />
              <span className="bg-[#0B132B] px-3 text-[11px] font-medium text-slate-400 uppercase tracking-wider shrink-0">
                or continue with email
              </span>
              <div className="border-t border-white/10 w-full" />
            </div>

            {successInfo && (
              <div className="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{successInfo}</span>
              </div>
            )}

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Full Legal / Corporate Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <Input
                      type="text"
                      placeholder="e.g. Ramesh Kulkarni"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="bg-white/5 border-white/10 pl-10 text-white placeholder:text-slate-500 rounded-xl h-11 focus-visible:ring-[#15803D]"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Corporate / Registered Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <Input
                    type="email"
                    placeholder="name@company.com or name@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/5 border-white/10 pl-10 text-white placeholder:text-slate-500 rounded-xl h-11 focus-visible:ring-[#15803D]"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-slate-300">Password</label>
                  {mode === 'login' && (
                    <span className="text-[11px] text-slate-400 font-mono">
                      (Demo pass: <code className="text-emerald-400">123</code>)
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/5 border-white/10 pl-10 pr-10 text-white placeholder:text-slate-500 rounded-xl h-11 focus-visible:ring-[#15803D]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#15803D] hover:bg-[#166534] text-white font-semibold h-11 rounded-xl shadow-lg shadow-[#15803D]/25 mt-2 transition-all"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Querying RBAC Profile...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    {mode === 'login' ? 'Authenticate & Open Portal' : 'Create Member Account'}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>

            {/* Mode Switcher */}
            <div className="mt-6 pt-5 border-t border-white/10 text-center text-xs text-slate-400">
              {mode === 'login' ? (
                <>
                  New to DairyLift?{' '}
                  <button
                    onClick={() => {
                      setMode('signup');
                      setErrorMsg(null);
                      setSuccessInfo(null);
                    }}
                    className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2 ml-1"
                  >
                    Create an account
                  </button>
                </>
              ) : (
                <>
                  Already registered?{' '}
                  <button
                    onClick={() => {
                      setMode('login');
                      setErrorMsg(null);
                      setSuccessInfo(null);
                    }}
                    className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2 ml-1"
                  >
                    Sign in to your portal
                  </button>
                </>
              )}
            </div>

            {/* Quick Demo Credentials Autofill Tray */}
            <div className="mt-6 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-emerald-400" />
                  Quick-Fill Verified Test Accounts
                </span>
                <span className="text-[10px] text-slate-500 font-mono">DB Auto-Routed</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {QUICK_DEMO_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.email}
                    type="button"
                    onClick={() => handleQuickFill(acc)}
                    className="text-left p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/5 hover:border-emerald-500/30 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                        <span>{acc.icon}</span>
                        <span className="truncate">{acc.name}</span>
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono group-hover:translate-x-0.5 transition-transform">
                        Fill →
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono truncate mt-0.5">
                      {acc.email}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate mt-0.5">
                      Routes to: <span className="text-slate-300 font-medium">{acc.expectedPortal}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Institutional Footer */}
      <footer className="px-6 py-4 border-t border-white/5 text-center text-xs text-slate-500 z-10 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>256-Bit Encrypted Session • Role-Based Firestore Access Rules Enforced</span>
        </div>
        <div>
          <span className="text-slate-400">DairyLift Enterprise ERP v2.0</span> • All rights reserved
        </div>
      </footer>
    </div>
  );
}
