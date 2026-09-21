'use client';

import { ReactNode, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface PortalGuardProps {
  children: ReactNode;
  allowedRoles: string[];
}

export default function PortalGuard({ children, allowedRoles }: PortalGuardProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/auth');
        return;
      }
      if (user && !allowedRoles.includes(user.role)) {
        // redirect to their appropriate portal
        const roleRedirects: Record<string, string> = {
          consumer: '/consumer',
          investor: '/investor',
          staff: '/staff',
          admin: '/admin',
        };
        router.push(roleRedirects[user.role] || '/auth');
      }
    }
  }, [isLoading, isAuthenticated, user, allowedRoles, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dairy-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-850/50 text-sm">Loading your portal...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
    // Check for consumer with investor upgrade
    if (user?.isUpgradedInvestor && allowedRoles.includes('investor')) {
      return <>{children}</>;
    }
    return null;
  }

  return <>{children}</>;
}
