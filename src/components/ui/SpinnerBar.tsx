import { BarLoader } from 'react-spinners';
import { useEffect, useState } from 'react';

interface SpinnerBarProps {
  color?: string;
  width?: number;
  height?: number;
  justify?: string;
}

const SpinnerBar: React.FC<SpinnerBarProps> = ({
  color,
  width = 50,
  height = 2,
  justify = 'center',
}) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial mode
    const match = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(match.matches);

    // Listen for changes
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    match.addEventListener('change', handler);

    return () => match.removeEventListener('change', handler);
  }, []);

  let loaderColor = color;
  if (!loaderColor) {
    loaderColor = isDark ? '#e3e3e3' : '#000000';
  }

  return (
    <div className={`flex w-full justify-${justify}`}>
      <BarLoader width={width} height={height} color={loaderColor} />
    </div>
  );
};

export default SpinnerBar;
