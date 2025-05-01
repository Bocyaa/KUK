import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost';
  size?: 'default' | 'icon';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'default', size = 'default', className = '', ...props },
    ref,
  ) => {
    const base =
      'inline-flex items-center justify-center font-medium focus:outline-none focus:ring transition';
    const variants: Record<string, string> = {
      default: 'bg-gray-900 text-white active:bg-gray-600',
      ghost: 'bg-transparent active:bg-gray-100',
    };
    const sizes: Record<string, string> = {
      default: 'h-8 w-24 px-4 text-sm',
      icon: 'h-8 w-8 p-0',
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';
