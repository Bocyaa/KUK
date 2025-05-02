import { Minus, Plus } from 'lucide-react';
import { forwardRef } from 'react';

type Props = {
  value: number;
  min?: number;
  max?: number;
  onChange: (v: number) => void;
  className?: string;
};

export default function QuantityStepper({
  value,
  min = 1,
  max = Infinity,
  onChange,
  className,
}: Props) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div
      className={`flex items-center overflow-hidden rounded-lg border bg-white ${className ?? ''}`}
    >
      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 rounded-none"
        onClick={dec}
      >
        <Minus className="h-3 w-3" />
      </Button>
      <input
        type="tel"
        value={value}
        onFocus={(e) => e.currentTarget.select()}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (!Number.isNaN(n)) onChange(n);
        }}
        className="w-12 text-center focus:outline-none"
      />
      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 rounded-none"
        onClick={inc}
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost';
  size?: 'default' | 'icon';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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
