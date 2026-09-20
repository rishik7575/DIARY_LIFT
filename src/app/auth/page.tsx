'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth, UserRole } from '@/lib/auth/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Milk,
  TrendingUp,
  ShoppingCart,
  ClipboardList,
  ShieldCheck,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Building2,
  Info,
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
    key: 'consumer',
    label: 'Consumer',
    sublabel: 'Quick-commerce dairy storefront',
    icon: ShoppingCart,
    demoEmail: 'consumer@dairylift.com',
    demoPass: 'consumer123',
    targetPath: '/consumer',
    tag: '12-Min Delivery',
  },
  {
    key: 'investor',
    label: 'Investor',
    sublabel: 'Livestock asset & dividend dashboard',
    icon: TrendingUp,
    demoEmail: 'investor@dairylift.com',
    demoPass: 'investor123',
    targetPath: '/investor',
    tag: '1.5% Base Yield',
    yieldHighlight: '1.5% Base + Dynamic Milk Bonus',
  },
  {
    key: 'staff',
    label: 'Farm Staff',
    sublabel: 'Daily milk logs & veterinary operations',
    icon: ClipboardList,
    demoEmail: 'staff@dairylift.com',
    demoPass: 'staff123',
    targetPath: '/staff',
    tag: 'IoT Telemetry',
  },
  {
    key: 'admin',
    label: 'Master Admin',
    sublabel: 'Enterprise supply chain & financial ERP',
    icon: ShieldCheck,
    demoEmail: 'admin@dairylift.com',
    demoPass: 'admin123',
    targetPath: '/admin',
    tag: 'Executive Command',
  },
];

export default function AuthGatewayPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [selectedRole, setSelectedRole] = useState<UserRole>('investor');
  const [email, setEmail] = useState('investor@dairylift.com');
  const [password, setPassword] = useState('investor123');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const activeRoleOption = ROLE_OPTIONS.find((r) => r.key === selectedRole) || ROLE_OPTIONS[1];

  const handleSelectRole = (role: RoleOption) => {
    setSelectedRole(role.key);
    setEmail(role.demoEmail);
    setPassword(role.demoPass);
    setErrorMsg(null);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const res = await login(email, password);
    if (res.success) {
      router.push(activeRoleOption.targetPath);
    } else {
      setErrorMsg(res.error || 'Invalid credentials. Please select a demo role to autofill.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 flex flex-col justify-between antialiased">
      
      {/* Top Brand Navigation */}
      <header className="px-6 py-5 max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#166534] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <Milk className="w-5 h-5" />
          </div>
          <span className="font-display text-2xl font-black tracking-tight text-slate-900">
            DAIRY<span className="text-[#D97706]">-LIFT</span>
          </span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing Page</span>
        </Link>
      </header>

      {/* Main Form Centerpiece */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl flex flex-col gap-6">
          
          {/* Header Banner */}
          <div className="text-center space-y-2">
            <Badge variant="gold" className="text-xs px-3 py-1 font-bold">
              INSTITUTIONAL ACCESS GATEWAY
            </Badge>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Select Your Portal Identity
            </h1>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              Switch roles to evaluate the customer quick-store, investor portfolio, veterinary husbandry ERP, or admin command center.
            </p>
          </div>

          {/* Role Switcher Grid */}
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
                    'p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all',
                    isSelected
                      ? 'bg-white border-[#166534] shadow-md ring-2 ring-[#166534]/15'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center',
                        isSelected ? 'bg-[#166534] text-white' : 'bg-slate-100 text-slate-600'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-[#166534]" />
                    )}
                  </div>

                  <div>
                    <div className="font-bold text-sm text-slate-900 leading-tight">
                      {r.label}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                      {r.tag}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Authentication Form Card (Shadcn UI) */}
          <Card className="shadow-lg border-slate-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold">
                    Sign in to {activeRoleOption.label} Suite
                  </CardTitle>
                  <CardDescription className="text-xs mt-1">
                    {activeRoleOption.sublabel}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-xs uppercase font-bold">
                  {selectedRole}
                </Badge>
              </div>
            </CardHeader>

            <form onSubmit={handleLoginSubmit}>
              <CardContent className="space-y-4">
                
                {/* Yield Callout for Investor Role */}
                {selectedRole === 'investor' && (
                  <div className="p-3.5 rounded-lg bg-amber-50/80 border border-amber-200 text-xs flex items-start gap-2.5">
                    <TrendingUp className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <div className="text-amber-900 leading-relaxed">
                      <strong className="font-bold">Sustainable Institutional Yield:</strong> Fixed 1.5% monthly base yield (18% APY) + dynamic performance bonus up to 0.5% paid on the 1st of every month.
                    </div>
                  </div>
                )}

                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                    {errorMsg}
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <span className="text-[11px] text-slate-500 font-mono">
                      (autofilled demo)
                    </span>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Instant Credential Badge */}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                  <span>Demo Account Loaded:</span>
                  <span className="font-mono font-bold text-slate-800">{email}</span>
                </div>

              </CardContent>

              <CardFooter className="flex flex-col gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 text-base font-bold bg-[#166534] hover:bg-[#14532D]"
                >
                  {loading ? (
                    'Authenticating...'
                  ) : (
                    <>
                      <span>Enter {activeRoleOption.label} Portal</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-between w-full text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    256-bit Encrypted Session
                  </span>
                  <span>FSSAI & NABARD Compliant</span>
                </div>
              </CardFooter>
            </form>
          </Card>

        </div>
      </main>

      {/* Corporate Sub-Footer */}
      <footer className="py-4 text-center text-xs text-slate-400 border-t border-slate-200/80">
        © 2026 Dairy-Lift Technologies Private Limited • Institutional Agri-Asset Infrastructure
      </footer>

    </div>
  );
}
