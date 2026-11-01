import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './common.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode;
}

export function Button({ loading = false, children, className = '', disabled, ...rest }: ButtonProps) {
  return (
    <button
      className={`btn ${className}`.trim()}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <span className="btn__spinner" aria-hidden="true" /> : null}
      {children}
    </button>
  );
}
