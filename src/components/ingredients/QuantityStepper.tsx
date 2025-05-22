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
        <Minus className="h-5 w-5 stroke-1" />
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
        className={`w-10 bg-white py-1 text-center focus:outline-none dark:bg-[#1a1a1a] ${className && className}`}
        allowNegativeValue={false}
        disableAbbreviations
        inputMode="decimal"
      />
      <Button onClick={inc}>
        <Plus className="h-5 w-5 stroke-1" />
      </Button>
    </FrontPrimaryCard>
  );
}
