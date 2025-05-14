import { Minus, Plus } from 'lucide-react';
import FrontPrimaryCard from '../ui/controllers/FrontPrimaryCard';
import Button from '../ui/controllers/Button';
import { useEffect, useRef, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';

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
  className,
}: Props) {
  //
  const [inputValue, setInputValue] = useState<string>(() => String(value));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  function parseStringToValue(str: string): number {
    // Accepts input as is, with comma as decimal separator
    const cleaned = str.replace(/[^\d,]/g, '').replace(',', '.');
    const num = parseFloat(cleaned);
    if (isNaN(num)) return 0;
    return num;
  }

  const handleValueChange = (valueAsString: string | undefined) => {
    setInputValue(valueAsString ?? '');
  };

  const handleBlur = () => {
    const valueNum = parseStringToValue(inputValue);
    const clamped = Math.max(min, Math.min(max, valueNum));
    setInputValue(String(clamped).replace('.', ',')); // simple string conversion, no formatting
    onChange(clamped);
  };

  const dec = () => onChange(Math.max(min, value - decVal));
  const inc = () => onChange(Math.min(max, value + incVal));

  const handleFocus = () => {
    setTimeout(() => {
      inputRef.current?.select();
    }, 0);
  };

  return (
    <FrontPrimaryCard height="full">
      <Button onClick={dec}>
        <Minus className="h-4 w-4" />
      </Button>
      <CurrencyInput
        ref={inputRef}
        value={inputValue}
        onValueChange={handleValueChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        decimalsLimit={2}
        decimalSeparator=","
        groupSeparator="."
        placeholder="0"
        className={`w-10 py-1 text-center focus:outline-none ${className && className}`}
        allowNegativeValue={false}
        disableAbbreviations
        inputMode="decimal"
      />
      <Button onClick={inc}>
        <Plus className="h-4 w-4" />
      </Button>
    </FrontPrimaryCard>
  );
}

/** Simple Version
 
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
        type="number"
        value={value === 0 ? '' : value}
        onFocus={(e) => e.currentTarget.select()}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (!Number.isNaN(n)) onChange(n);
          else onChange(0);
        }}
        onBlur={(e) => {
          if (e.target.value === '') onChange(0);
        }}
        placeholder="0"
        className="w-8 text-center focus:outline-none"
      />
      <Button onClick={inc}>
        <Plus className="h-4 w-4" />
      </Button>
    </FrontPrimaryCard>
  );
}

 */
