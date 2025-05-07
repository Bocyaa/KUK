import { Ingredient } from '@app/types/recipe';
import { Minus, Plus } from 'lucide-react';
import { forwardRef, useState, useEffect } from 'react';

type TimePickerProps = {
  form: {
    title: string;
    description: string;
    ingredients: Ingredient[];
    portion: number;
    time: number;
    calory: number;
  };
  updateForm: (fields: Partial<TimePickerProps['form']>) => void;
};

function TimePicker({ form, updateForm }: TimePickerProps) {
  // Initialize from form data
  const [time, setTime] = useState(() => {
    const totalMinutes = form.time || 0;
    return {
      hours: Math.floor(totalMinutes / 60),
      minutes: totalMinutes % 60,
    };
  });

  // Sync with parent form state
  useEffect(() => {
    const totalMinutes = form.time || 0;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours !== time.hours || minutes !== time.minutes) {
      setTime({ hours, minutes });
    }
  }, [form.time, time.hours, time.minutes]);

  // Update both local state and parent form
  const updateTime = (newTime: { hours: number; minutes: number }) => {
    setTime(newTime);
    const totalMinutes = newTime.hours * 60 + newTime.minutes;
    updateForm({ time: totalMinutes });
  };

  const incHours = () => {
    const newHours = (time.hours + 1) % 24;
    updateTime({ ...time, hours: newHours });
  };

  const decHours = () => {
    const newHours = (time.hours - 1 + 24) % 24;
    updateTime({ ...time, hours: newHours });
  };

  const incMinutes = () => {
    const newMinutes = (time.minutes + 5) % 60;
    updateTime({ ...time, minutes: newMinutes });
  };

  const decMinutes = () => {
    const newMinutes = (time.minutes - 5 + 60) % 60;
    updateTime({ ...time, minutes: newMinutes });
  };

  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border bg-gray-100 px-1 py-1 dark:border-[#6f6f6f21] dark:bg-[#29292b]">
      <span className="pl-1 text-gray-500">Time</span>

      <div className="flex gap-1">
        <div className="relative flex w-[7.3rem] items-center justify-between gap-1 rounded-lg border bg-white">
          <div className="flex">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-none"
              onClick={decHours}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <div className="flex">
              <input
                type="tel"
                value={time.hours.toString()}
                onFocus={(e) => e.currentTarget.select()}
                onChange={(e) => {
                  const n = Number(e.target.value);
                  if (!Number.isNaN(n) && n >= 0 && n < 24) {
                    updateTime({ ...time, hours: n });
                  }
                }}
                className="w-5 py-1 text-right focus:outline-none"
              />
              <div
                className="absolute bottom-[0.4rem] right-9 text-xs text-gray-400"
                style={{ width: '1.5rem' }}
              >
                {time.hours < 1 ? 'hour' : 'hours'}
              </div>
            </div>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-none"
            onClick={incHours}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>

        <div className="relative flex w-[7.3rem] items-center justify-between gap-1 rounded-lg border bg-white">
          <div className="flex">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-none"
              onClick={decMinutes}
            >
              <Minus className="h-3 w-3" />
            </Button>

            <div className="flex">
              <input
                type="tel"
                value={time.minutes.toString()}
                onFocus={(e) => e.currentTarget.select()}
                onChange={(e) => {
                  const n = Number(e.target.value);
                  if (!Number.isNaN(n) && n >= 0 && n < 60) {
                    updateTime({ ...time, minutes: n });
                  }
                }}
                className="w-5 py-1 text-right focus:outline-none"
              />
              <div
                className="absolute bottom-[0.4rem] right-9 text-xs text-gray-400"
                style={{ width: '1.5rem' }}
              >
                {time.minutes < 1 ? 'min' : 'mins'}
              </div>
            </div>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-none"
            onClick={incMinutes}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TimePicker;

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
