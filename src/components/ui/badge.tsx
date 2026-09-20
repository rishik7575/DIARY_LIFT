import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-[#14532D] text-white shadow-xs',
        forest:
          'bg-[#F0FDF4] text-[#14532D] border border-[#BBF7D0]',
        gold:
          'bg-[#FDF9F0] text-[#A67920] border border-[#EEDDB4]',
        secondary:
          'bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0]',
        destructive:
          'bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]',
        danger:
          'bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]',
        warning:
          'bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]',
        info:
          'bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]',
        success:
          'bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]',
        outline:
          'text-[#0F172A] border border-[#CBD5E1] bg-white',
        navy:
          'bg-[#0F172A] text-white shadow-xs',
        simulation:
          'bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D] font-bold tracking-wider text-[10px] uppercase',
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
