import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-[#166534] text-white hover:bg-[#14532D] focus-visible:ring-[#166534] shadow-sm',
        forest:
          'bg-[#166534] text-white hover:bg-[#14532D] focus-visible:ring-[#166534] shadow-sm',
        gold:
          'bg-[#D97706] text-white hover:bg-[#B45309] focus-visible:ring-[#D97706] shadow-sm font-semibold',
        destructive:
          'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600 shadow-sm',
        outline:
          'border border-slate-300 bg-white hover:bg-slate-50 hover:text-slate-900 text-slate-800 shadow-xs',
        secondary:
          'bg-slate-100 text-slate-900 hover:bg-slate-200 shadow-xs',
        ghost:
          'hover:bg-slate-100 hover:text-slate-900 text-slate-700',
        link:
          'text-[#166534] underline-offset-4 hover:underline p-0 h-auto',
        slate:
          'bg-[#0F172A] text-white hover:bg-slate-800 focus-visible:ring-slate-900 shadow-sm',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-xl px-6 text-base font-semibold',
        icon: 'h-10 w-10',
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
