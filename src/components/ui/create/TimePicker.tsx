import { Ingredient } from '@app/types/IngredientType';
import { Minus, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import BackSecondaryCard from '../controllers/BackSecondaryCard';
import FrontPrimaryCard from '../controllers/FrontPrimaryCard';
import Button from '../controllers/Button';

type TimePickerProps = {
  form: {
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
    <BackSecondaryCard>
      <span className="pl-1 text-gray-500">Time</span>

      <div className="flex gap-1">
        <FrontPrimaryCard className="gap-3">
          <div className="flex items-center">
            <Button onClick={decHours}>
              <Minus className="h-4 w-4" />
            </Button>

            <div className="relative flex">
              <input
                type="tel"
                value={time.hours.toString().padStart(2, '0')}
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
                className="absolute -right-7 bottom-[0.4rem] text-xs text-gray-400"
                style={{ width: '1.5rem' }}
              >
                h
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <Button onClick={incHours}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </FrontPrimaryCard>

        <FrontPrimaryCard className="gap-3">
          <div className="flex items-center">
            <Button onClick={decMinutes}>
              <Minus className="h-4 w-4" />
            </Button>

            <div className="relative flex">
              <input
                type="tel"
                value={time.minutes.toString().padStart(2, '0')}
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
                className="absolute -right-7 bottom-[0.4rem] text-xs text-gray-400"
                style={{ width: '1.5rem' }}
              >
                m
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <Button onClick={incMinutes}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </FrontPrimaryCard>
      </div>
    </BackSecondaryCard>
  );
}

export default TimePicker;
