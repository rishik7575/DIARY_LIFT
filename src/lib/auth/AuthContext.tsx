'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
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

// Mock credentials — requested accounts (pass: 123) and legacy aliases
const MOCK_ACCOUNTS: Record<string, { password: string; user: AuthUser }> = {
  'admin@gmail.com': {
    password: '123',
    user: {
      id: 'u-admin-01',
      name: 'Admin Director',
      email: 'admin@gmail.com',
      role: 'admin',
      avatar: 'AD',
    },
  },
  'staff@gmail.com': {
    password: '123',
    user: {
      id: 'u-staff-01',
      name: 'Farm Shift Lead',
      email: 'staff@gmail.com',
      role: 'staff',
      avatar: 'FS',
    },
  },
  'investor@gmail.com': {
    password: '123',
    user: {
      id: 'u-investor-01',
      name: 'Portfolio Investor',
      email: 'investor@gmail.com',
      role: 'investor',
      avatar: 'PI',
      investorId: 'inv001',
    },
  },
  'rishik@gmail.com': {
    password: '123',
    user: {
      id: 'u-consumer-01',
      name: 'Rishik',
      email: 'rishik@gmail.com',
      role: 'consumer',
      avatar: 'RK',
    },
  },
  // Legacy aliases for backward compatibility
  'consumer@dairylift.com': {
    password: '123',
    user: {
      id: 'u010',
      name: 'Aarav Shah',
      email: 'consumer@dairylift.com',
      role: 'consumer',
      avatar: 'AS',
    },
  },
  'investor@dairylift.com': {
    password: '123',
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
    password: '123',
    user: {
      id: 'u006',
      name: 'Raju Kumar',
      email: 'staff@dairylift.com',
      role: 'staff',
      avatar: 'RK',
    },
  },
  'admin@dairylift.com': {
    password: '123',
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
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('dairylift_user') || sessionStorage.getItem('dairylift_user');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          localStorage.removeItem('dairylift_user');
          sessionStorage.removeItem('dairylift_user');
        }
      }
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    // Simulate brief network delay
    await new Promise((r) => setTimeout(r, 600));

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
    if (typeof window !== 'undefined') {
      localStorage.setItem('dairylift_user', JSON.stringify(account.user));
      sessionStorage.setItem('dairylift_user', JSON.stringify(account.user));
    }
    setIsLoading(false);
    router.push(ROLE_REDIRECT[account.user.role]);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dairylift_user');
      sessionStorage.removeItem('dairylift_user');
    }
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
    if (typeof window !== 'undefined') {
      localStorage.setItem('dairylift_user', JSON.stringify(upgraded));
      sessionStorage.setItem('dairylift_user', JSON.stringify(upgraded));
    }
  };

  const switchRole = (role: UserRole) => {
    const mockEntry = Object.values(MOCK_ACCOUNTS).find((acc) => acc.user.role === role);
    const targetUser = mockEntry ? mockEntry.user : user ? { ...user, role } : null;
    if (targetUser) {
      setUser(targetUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('dairylift_user', JSON.stringify(targetUser));
        sessionStorage.setItem('dairylift_user', JSON.stringify(targetUser));
      }
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
