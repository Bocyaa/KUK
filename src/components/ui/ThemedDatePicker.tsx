import { forwardRef, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar } from 'lucide-react';

interface ThemedDatePickerProps {
  id: string;
  name?: string;
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  minAge?: number;
  maxAge?: number;
}

const ThemedDatePicker = ({
  id,
  name = id,
  value,
  onChange,
  placeholder = 'Select date...',
  disabled = false,
  required = false,
  minAge = 13,
  maxAge = 120,
}: ThemedDatePickerProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [dateValue, setDateValue] = useState<Date | null>(() => {
    return value ? new Date(value) : null;
  });

  // Theme detection effect
  useEffect(() => {
    const isDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    setTheme(isDarkMode ? 'dark' : 'light');

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);

    // Also check for manual theme toggles
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      observer.disconnect();
    };
  }, []);

  // Calculate min and max dates based on age requirements
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - minAge);

  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - maxAge);

  const handleDateChange = (date: Date | null) => {
    setDateValue(date);
    if (date) {
      const formattedDate = date.toISOString().split('T')[0];
      onChange(formattedDate);
    } else {
      onChange('');
    }
  };

  // Custom input for the datepicker
  const CustomInput = forwardRef<
    HTMLDivElement,
    { value?: string; onClick?: () => void }
  >(({ value, onClick }, ref) => (
    <div
      ref={ref}
      className={`flex w-full cursor-pointer items-center border ${
        theme === 'dark'
          ? 'border-[#424242] bg-transparent text-white'
          : 'border-gray-300 bg-white text-gray-900'
      } relative px-3 py-[0.375rem] outline-none`}
      onClick={onClick}
    >
      <span
        className={
          !value ? (theme === 'dark' ? 'text-[#b4b4b4]' : 'text-gray-400') : ''
        }
      >
        {value || placeholder}
      </span>
      <Calendar
        size={18}
        className={`ml-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
      />
    </div>
  ));

  return (
    <div className={theme === 'dark' ? 'dark-theme-datepicker' : ''}>
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
        className={`w-full ${theme === 'dark' ? 'dark-calendar' : ''}`}
        calendarClassName={theme === 'dark' ? 'dark-calendar' : ''}
        wrapperClassName="w-full"
      />
    </div>
  );
};

export default ThemedDatePicker;
