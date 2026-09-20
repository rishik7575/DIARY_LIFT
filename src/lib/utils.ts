import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function getTimeAgo(dateString: string): string {
  const now = new Date();
  const then = new Date(dateString);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export const STATUS_COLORS = {
  healthy: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  under_observation: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
  sick: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
  recovering: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
};

export const SEVERITY_COLORS = {
  low: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', icon: '🟢' },
  medium: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', icon: '🟡' },
  high: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', icon: '🟠' },
  critical: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', icon: '🔴' },
};
