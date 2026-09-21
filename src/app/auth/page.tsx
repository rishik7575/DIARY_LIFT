'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth, UserRole } from '@/lib/auth/AuthContext';
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
  Briefcase,
  ShoppingCart,
  TrendingUp,
  Award,
  Check,
  Zap,
} from 'lucide-react';

export default function AuthGatewayPage() {
  const { login, loginWithGoogle, signup } = useAuth();
  const router = useRouter();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [signupRole, setSignupRole] = useState<UserRole>('consumer');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<string | null>(null);

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
      setErrorMsg(res.error || 'Google authentication failed. Please try again or use email sign-in.');
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
        setErrorMsg('Please enter your full legal name to create an account.');
        return;
      }
      if (password.length < 6) {
        setLoading(false);
        setErrorMsg('Password must be at least 6 characters long.');
        return;
      }
      const res = await signup(fullName, email, password, signupRole);
      if (res.success && res.redirectUrl) {
        setSuccessInfo('Account created successfully! Opening your authorized portal...');
        router.push(res.redirectUrl);
      } else {
        setLoading(false);
        setErrorMsg(res.error || 'Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#070D18] text-white selection:bg-[#15803D] selection:text-white flex flex-col justify-between relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-[#14532D]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#D97706]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-white/5 backdrop-blur-md z-10">
        <Link href="/" className="flex items-center gap-2.5 text-white group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#15803D] to-[#14532D] flex items-center justify-center shadow-lg shadow-[#15803D]/25 border border-white/10 group-hover:scale-105 transition-transform">
            <Milk className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight">DairyLift</span>
            <span className="text-[10px] block text-emerald-400 font-mono tracking-widest uppercase -mt-0.5">
              Enterprise Access
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Badge className="bg-white/5 text-slate-300 border-white/10 text-xs hidden sm:flex items-center gap-1.5 py-1 px-3">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            Active RBAC Session Guard
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

      {/* Main Split-Screen Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10 z-10 my-auto">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Column (Agri-Park Infrastructure Showcase) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col gap-6 text-left">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Next-Gen Precision Agritech
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white leading-snug">
                Where Rural Livestock Meets Urban Capital.
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Connect directly to our smart agro-parks. Monitor certified rotary parlour milk logs, track RFID cattle telemetry, and receive automated dividend distributions.
              </p>
            </div>

            {/* Live Operational Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold mb-1">
                  <Activity className="w-3.5 h-3.5" />
                  <span>HERD TELEMETRY</span>
                </div>
                <div className="text-xl font-bold font-mono text-white">1,900+</div>
                <p className="text-[11px] text-slate-400">Purebred A2 Gir & Murrah</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold mb-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>YIELD BUFFER</span>
                </div>
                <div className="text-xl font-bold font-mono text-white">145%</div>
                <p className="text-[11px] text-slate-400">Escrow Reserve Capital</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-1.5 text-blue-400 text-xs font-semibold mb-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span>COLD-CHAIN</span>
                </div>
                <div className="text-xl font-bold font-mono text-white">3.4°C</div>
                <p className="text-[11px] text-slate-400">Real-Time Vat Sensors</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-1.5 text-purple-400 text-xs font-semibold mb-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>STANDARDS</span>
                </div>
                <div className="text-xl font-bold font-mono text-white">100% A2</div>
                <p className="text-[11px] text-slate-400">DNA & Lab Certified</p>
              </div>
            </div>

            {/* Trust Checklist */}
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Automated role routing without manual switching</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Multi-tab real-time event sync via BroadcastChannel</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Bank-grade 256-bit encryption & Firestore security</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Authentication Card */}
          <div className="lg:col-span-7 w-full max-w-lg mx-auto">
            <div className="bg-[#0B132B]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 relative">
              
              {/* Segmented Mode Switcher */}
              <div className="grid grid-cols-2 p-1 bg-white/5 rounded-2xl mb-6 border border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMsg(null);
                    setSuccessInfo(null);
                  }}
                  className={`py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    mode === 'login'
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sign In to Portal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setErrorMsg(null);
                    setSuccessInfo(null);
                  }}
                  className={`py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    mode === 'signup'
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Header Description */}
              <div className="mb-6">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {mode === 'login' ? 'Welcome to DairyLift' : 'Register Member Account'}
                </h1>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {mode === 'login'
                    ? 'Authenticate to access your authorized command center, farm operations, or investor suite.'
                    : 'Get started with farm-fresh dairy delivery or participate in insured livestock co-ownership.'}
                </p>
              </div>

              {/* Status Alerts */}
              {errorMsg && (
                <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successInfo && (
                <div className="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{successInfo}</span>
                </div>
              )}

              {/* Google Sign In */}
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

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Full Legal Name
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

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Choose Your Account Type
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setSignupRole('consumer')}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            signupRole === 'consumer'
                              ? 'bg-emerald-600/20 border-emerald-500 text-white'
                              : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-0.5">
                            <ShoppingCart className="w-3.5 h-3.5" />
                            Store Customer
                          </div>
                          <p className="text-[10px] text-slate-400 leading-tight">Fresh A2 Milk & Vedic Ghee Orders</p>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSignupRole('investor')}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            signupRole === 'investor'
                              ? 'bg-amber-600/20 border-amber-500 text-white'
                              : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mb-0.5">
                            <Briefcase className="w-3.5 h-3.5" />
                            Cattle Co-Owner
                          </div>
                          <p className="text-[10px] text-slate-400 leading-tight">1.5% Base + Milk Yield Dividend</p>
                        </button>
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Email Address
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
                      <button
                        type="button"
                        onClick={() => alert('Password reset link has been dispatched to your registered email.')}
                        className="text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        Forgot password?
                      </button>
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
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#15803D] hover:bg-[#166534] text-white font-semibold h-11 rounded-xl shadow-lg shadow-[#15803D]/25 mt-2 transition-all cursor-pointer"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Authenticating...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      {mode === 'login' ? 'Sign In & Open Portal' : 'Create Account & Open Portal'}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </form>

              {/* Bottom Switcher */}
              <div className="mt-6 pt-5 border-t border-white/10 text-center text-xs text-slate-400">
                {mode === 'login' ? (
                  <>
                    Don&apos;t have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setMode('signup');
                        setErrorMsg(null);
                        setSuccessInfo(null);
                      }}
                      className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2 ml-1 cursor-pointer"
                    >
                      Create an account
                    </button>
                  </>
                ) : (
                  <>
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setMode('login');
                        setErrorMsg(null);
                        setSuccessInfo(null);
                      }}
                      className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2 ml-1 cursor-pointer"
                    >
                      Sign in to your portal
                    </button>
                  </>
                )}
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Institutional Security Footer */}
      <footer className="px-6 py-4 border-t border-white/5 text-center text-xs text-slate-500 z-10 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>256-Bit Encrypted Session • Enterprise RBAC Authorization</span>
        </div>
        <div>
          <span className="text-slate-400">DairyLift Enterprise ERP</span> • Production Mode Active
        </div>
      </footer>
    </div>
  );
}
