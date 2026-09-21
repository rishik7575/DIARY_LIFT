import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base
          'flex h-9 w-full rounded-[var(--radius-md)]',
          'border border-[var(--color-border-strong)]',
          'bg-[var(--color-surface)]',
          'px-3 py-2',
          'text-sm text-[var(--color-text-primary)]',
          'placeholder:text-[var(--color-text-placeholder)]',
          // Interaction
          'transition-[border-color,box-shadow] duration-[var(--duration-fast)]',
          'outline-none',
          'hover:border-[var(--p-ink-400)]',
          'focus:border-[var(--color-brand)] focus:shadow-[0_0_0_3px_rgba(23,96,58,0.12)]',
          // States
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--color-surface-muted)]',
          // Error state
          error && 'border-[var(--color-danger)] focus:shadow-[0_0_0_3px_rgba(185,28,28,0.12)]',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
