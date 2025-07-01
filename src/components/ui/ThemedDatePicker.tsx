import { forwardRef, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar } from 'lucide-react';

interface ThemedDatePickerProps {
  id: string;
  name?: string;
  value: string;
  onChange: (date: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  minAge?: number;
  maxAge?: number;
  addClass?: string;
}

const ThemedDatePicker = ({
  id,
  name = id,
  value,
  onChange,
  label = '',
  placeholder = 'Select date...',
  disabled = false,
  required = false,
  minAge = 13,
  maxAge = 120,
  addClass = '',
}: ThemedDatePickerProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [dateValue, setDateValue] = useState<Date | null>(() =>
    value ? new Date(value) : null,
  );

  // Theme detection
  useEffect(() => {
    const checkTheme = () => {
      const isDark =
        document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDark ? 'dark' : 'light');
    };
    checkTheme();
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', checkTheme);
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => {
      mq.removeEventListener('change', checkTheme);
      observer.disconnect();
    };
  }, []);

  // Min/max date logic
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - minAge);
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - maxAge);

  const handleDateChange = (date: Date | null) => {
    setDateValue(date);
    if (date) {
      onChange(date.toISOString().split('T')[0]);
    } else {
      onChange('');
    }
  };

  // Custom input styled like your other inputs
  const CustomInput = forwardRef<
    HTMLDivElement,
    { value?: string; onClick?: () => void }
  >(({ value, onClick }, ref) => (
    <div
      ref={ref}
      tabIndex={0}
      className={`relative flex w-full items-center rounded-xl border px-3 py-2 outline-none transition-all ${
        theme === 'dark'
          ? 'border-[#424242] bg-transparent text-[#e3e3e3] placeholder-[#b4b4b4] focus:border-[#ffffff]'
          : 'border-[#e6e6e6] bg-white text-[#0d0d0d] placeholder:text-gray-400 focus:border-[#0094f6]'
      } ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'} ${addClass} `}
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled}
    >
      <span
        className={`truncate ${!value ? (theme === 'dark' ? 'text-[#b4b4b4]' : 'text-gray-400') : ''}`}
      >
        {value || placeholder}
      </span>
      <Calendar
        size={18}
        className={`ml-auto ${theme === 'dark' ? 'text-[#b4b4b4]' : 'text-gray-400'}`}
      />
    </div>
  ));

  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label
          htmlFor={id}
          className={`font-regular mb-1 text-xs uppercase tracking-wider transition-colors ${disabled ? 'dark:text-[#afafaf]' : 'label-focus-within:text-custom'}`}
        >
          {label}
        </label>
      )}
      <DatePicker
        id={id}
        name={name}
        selected={dateValue}
        onChange={handleDateChange}
        customInput={<CustomInput />}
        required={required}
        disabled={disabled}
        maxDate={maxDate}
        minDate={minDate}
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100}
        dropdownMode="select"
        showMonthDropdown
        className="w-full"
        calendarClassName={theme === 'dark' ? 'dark-calendar' : ''}
        wrapperClassName="w-full"
        popperClassName={theme === 'dark' ? 'dark-calendar' : ''}
      />
    </div>
  );
};

export default ThemedDatePicker;
