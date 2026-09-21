import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold',
    'border transition-all cursor-pointer',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand',
    'disabled:pointer-events-none disabled:opacity-40',
    'active:scale-[0.97]',
  ].join(' '),
  {
    variants: {
      variant: {
        // Primary action — brand green
        default:
          'bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700 hover:border-emerald-700 shadow-sm',
        primary:
          'bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700 hover:border-emerald-700 shadow-sm',
        forest:
          'bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700 hover:border-emerald-700 shadow-sm',
        // Secondary / outlined
        secondary:
          'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300 shadow-xs',
        outline:
          'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300 shadow-xs',
        // Ghost
        ghost:
          'bg-transparent border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900',
        // Gold / accent
        accent:
          'bg-amber-600 border-amber-600 text-white hover:bg-amber-700 shadow-sm',
        gold:
          'bg-amber-600 border-amber-600 text-white hover:bg-amber-700 shadow-sm',
        // Destructive
        destructive:
          'bg-red-600 border-red-600 text-white hover:bg-red-700 shadow-sm',
        danger:
          'bg-red-600 border-red-600 text-white hover:bg-red-700 shadow-sm',
        // Subtle link-like
        link:
          'text-emerald-600 underline-offset-4 hover:underline p-0 h-auto border-transparent bg-transparent shadow-none font-medium',
        // Dark / navy
        navy:
          'bg-slate-900 border-slate-900 text-white hover:bg-slate-800 shadow-sm',
      },
      size: {
        xs:      'h-7 px-3 text-2xs rounded-md',
        sm:      'h-8 px-3.5 text-xs rounded-md',
        default: 'h-9 px-4 text-sm rounded-md',
        md:      'h-10 px-5 text-sm rounded-lg',
        lg:      'h-11 px-6 text-md rounded-lg',
        xl:      'h-13 px-8 text-base rounded-xl',
        icon:    'h-9 w-9 p-0 rounded-md',
        'icon-sm': 'h-8 w-8 p-0 rounded-md',
        'icon-lg': 'h-11 w-11 p-0 rounded-lg',
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
