import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  // Base — all badges share these fundamentals
  'inline-flex items-center gap-1 rounded-full font-semibold tracking-wide border whitespace-nowrap leading-none',
  {
    variants: {
      variant: {
        // Brand / Forest
        default:
          'bg-emerald-50 text-emerald-800 border-emerald-200 text-[11px] px-2.5 py-1',
        forest:
          'bg-emerald-50 text-emerald-800 border-emerald-200 text-[11px] px-2.5 py-1',
        // Gold / Accent
        gold:
          'bg-amber-50 text-amber-800 border-amber-200 text-[11px] px-2.5 py-1',
        accent:
          'bg-amber-50 text-amber-800 border-amber-200 text-[11px] px-2.5 py-1',
        // Status
        success:
          'bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px] px-2.5 py-1',
        warning:
          'bg-amber-50 text-amber-800 border-amber-200 text-[11px] px-2.5 py-1',
        destructive:
          'bg-red-50 text-red-700 border-red-200 text-[11px] px-2.5 py-1',
        danger:
          'bg-red-50 text-red-700 border-red-200 text-[11px] px-2.5 py-1',
        info:
          'bg-blue-50 text-blue-700 border-blue-200 text-[11px] px-2.5 py-1',
        // Muted / neutral
        secondary:
          'bg-slate-100 text-slate-700 border-slate-200 text-[11px] px-2.5 py-1',
        muted:
          'bg-slate-100 text-slate-700 border-slate-200 text-[11px] px-2.5 py-1',
        outline:
          'bg-white text-slate-800 border-slate-200 text-[11px] px-2.5 py-1',
        // Solid fills
        solid:
          'bg-emerald-600 text-white border-emerald-600 text-[11px] px-2.5 py-1',
        navy:
          'bg-slate-900 text-white border-slate-900 text-[11px] px-2.5 py-1',
        // Simulation disclaimer
        simulation:
          'bg-amber-100 text-amber-900 border-amber-300 text-[10px] px-2 py-0.5 uppercase tracking-wider font-bold',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
