import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-[#14532D] text-white hover:bg-[#0B3B24] focus-visible:ring-[#14532D] shadow-sm',
        forest:
          'bg-[#14532D] text-white hover:bg-[#0B3B24] focus-visible:ring-[#14532D] shadow-sm',
        primary:
          'bg-[#14532D] text-white hover:bg-[#0B3B24] focus-visible:ring-[#14532D] shadow-sm',
        secondary:
          'bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F8FAFC] focus-visible:ring-[#475569] shadow-xs',
        outline:
          'bg-white text-[#0F172A] border border-[#CBD5E1] hover:bg-[#F1F5F9] focus-visible:ring-[#475569] shadow-xs',
        gold:
          'bg-[#C9962B] text-white hover:bg-[#A67920] focus-visible:ring-[#C9962B] shadow-sm',
        accent:
          'bg-[#C9962B] text-white hover:bg-[#A67920] focus-visible:ring-[#C9962B] shadow-sm',
        destructive:
          'bg-[#DC2626] text-white hover:bg-[#B91C1C] focus-visible:ring-[#DC2626] shadow-sm',
        danger:
          'bg-[#DC2626] text-white hover:bg-[#B91C1C] focus-visible:ring-[#DC2626] shadow-sm',
        ghost:
          'bg-transparent text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]',
        link:
          'text-[#14532D] underline-offset-4 hover:underline p-0 h-auto font-medium',
        navy:
          'bg-[#0F172A] text-white hover:bg-[#1E293B] focus-visible:ring-[#0F172A] shadow-sm',
      },
      size: {
        default: 'h-11 px-5 py-2.5 text-sm', // 44px medium
        sm: 'h-9 px-3.5 text-xs rounded-md', // 36px small
        md: 'h-11 px-5 py-2.5 text-sm rounded-lg', // 44px medium
        lg: 'h-12 px-6 text-base rounded-xl', // 48px large
        icon: 'h-11 w-11 p-0',
        'icon-sm': 'h-9 w-9 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
