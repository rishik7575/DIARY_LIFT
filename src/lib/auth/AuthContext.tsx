'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export type UserRole = 'consumer' | 'investor' | 'staff' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  isUpgradedInvestor?: boolean; // consumer who also has investor access
  investorId?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  upgradeToInvestor: (investorId: string) => void;
  switchRole: (role: UserRole) => void;
  isAuthenticated: boolean;
}

// Mock credentials — hardcoded demo accounts
const MOCK_ACCOUNTS: Record<string, { password: string; user: AuthUser }> = {
  'consumer@dairylift.com': {
    password: 'consumer123',
    user: {
      id: 'u010',
      name: 'Aarav Shah',
      email: 'consumer@dairylift.com',
      role: 'consumer',
      avatar: 'AS',
    },
  },
  'investor@dairylift.com': {
    password: 'investor123',
    user: {
      id: 'u001',
      name: 'Arjun Mehta',
      email: 'investor@dairylift.com',
      role: 'investor',
      avatar: 'AM',
      investorId: 'inv001',
    },
  },
  'staff@dairylift.com': {
    password: 'staff123',
    user: {
      id: 'u006',
      name: 'Raju Kumar',
      email: 'staff@dairylift.com',
      role: 'staff',
      avatar: 'RK',
    },
  },
  'admin@dairylift.com': {
    password: 'admin123',
    user: {
      id: 'u011',
      name: 'Admin User',
      email: 'admin@dairylift.com',
      role: 'admin',
      avatar: 'AU',
    },
  },
};

const ROLE_REDIRECT: Record<UserRole, string> = {
  consumer: '/consumer',
  investor: '/investor',
  staff: '/staff',
  admin: '/admin',
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Load user from sessionStorage for persistence across navigation
    const stored = sessionStorage.getItem('dairylift_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        sessionStorage.removeItem('dairylift_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));

    const account = MOCK_ACCOUNTS[email.toLowerCase()];
    if (!account) {
      setIsLoading(false);
      return { success: false, error: 'No account found with this email.' };
    }
    if (account.password !== password) {
      setIsLoading(false);
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    setUser(account.user);
    sessionStorage.setItem('dairylift_user', JSON.stringify(account.user));
    setIsLoading(false);
    router.push(ROLE_REDIRECT[account.user.role]);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('dairylift_user');
    router.push('/auth');
  };

  const upgradeToInvestor = (investorId: string) => {
    if (!user) return;
    const upgraded: AuthUser = {
      ...user,
      isUpgradedInvestor: true,
      investorId,
    };
    setUser(upgraded);
    sessionStorage.setItem('dairylift_user', JSON.stringify(upgraded));
  };

  const switchRole = (role: UserRole) => {
    const mockEntry = Object.values(MOCK_ACCOUNTS).find((acc) => acc.user.role === role);
    const targetUser = mockEntry ? mockEntry.user : user ? { ...user, role } : null;
    if (targetUser) {
      setUser(targetUser);
      sessionStorage.setItem('dairylift_user', JSON.stringify(targetUser));
      router.push(ROLE_REDIRECT[role]);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        upgradeToInvestor,
        switchRole,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
