import { Minus, Plus } from 'lucide-react';
import FrontPrimaryCard from '../ui/FrontPrimaryCard';
import Button from '../ui/Button';
import CurrencyInput from 'react-currency-input-field';
import { useEffect, useRef, useState } from 'react';

type Props = {
  value: number; // Value in cents
  min?: number;
  max?: number;
  incVal?: number;
  decVal?: number;
  onChange: (v: number) => void;
  className?: string;
};

export default function PriceStepper({
  value,
  min = 0,
  max = Infinity,
  incVal = 1,
  decVal = 1,
  onChange,
}: Props) {
  //
  const [inputValue, setInputValue] = useState<string>(() => String(value));
  const inputRef = useRef<HTMLInputElement>(null);

  // Only update inputValue when value prop changes (not while typing)
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

  const handleFocus = () => {
    setTimeout(() => {
      inputRef.current?.select();
    }, 0);
  };

  const handleValueChange = (valueAsString: string | undefined) => {
    setInputValue(valueAsString ?? '');
  };

  const handleBlur = () => {
    const valueNum = parseStringToValue(inputValue);
    const clamped = Math.max(min, Math.min(max, valueNum));
    setInputValue(String(clamped).replace('.', ',')); // simple string conversion, no formatting
    onChange(clamped);
  };

  const dec = () => {
    const newValue = Math.max(min, value - decVal);
    onChange(newValue);
  };

  const inc = () => {
    const newValue = Math.min(max, value + incVal);
    onChange(newValue);
  };

  return (
    <FrontPrimaryCard>
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
        placeholder="0,00"
        className="w-8 py-1 text-center focus:outline-none dark:bg-[#1a1a1a]"
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
