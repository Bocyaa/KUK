import { Minus, Plus } from 'lucide-react';
import FrontPrimaryCard from '../ui/controllers/FrontPrimaryCard';
import Button from '../ui/controllers/Button';

type Props = {
  value: number;
  min?: number;
  max?: number;
  incVal?: number;
  decVal?: number;
  onChange: (v: number) => void;
  className?: string;
};

export default function QuantityStepper({
  value,
  min = 0,
  max = Infinity,
  incVal = 1,
  decVal = 1,
  onChange,
  // className,
}: Props) {
  const dec = () => onChange(Math.max(min, value - decVal));
  const inc = () => onChange(Math.min(max, value + incVal));

  return (
    <FrontPrimaryCard>
      <Button onClick={dec}>
        <Minus className="h-4 w-4" />
      </Button>
      <input
        type="tel"
        value={value}
        onFocus={(e) => e.currentTarget.select()}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (!Number.isNaN(n)) onChange(n);
        }}
        className="w-8 text-center focus:outline-none"
      />
      <Button onClick={inc}>
        <Plus className="h-4 w-4" />
      </Button>
    </FrontPrimaryCard>
  );
}
