import { useState, ReactNode, useRef, useEffect } from 'react';
import { ConfirmContext, ConfirmContextType } from '@app/contexts/ConfirmContext';
import { useLocation } from 'react-router-dom';

// 1. Declare Provider function
// 2. Accept children prop
function ConfirmProvider({ children }: { children: ReactNode }) {
  // 3. Declare global properties
  const [isDirty, setIsDirty] = useState(false);
  const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);
  const [label, setLabel] = useState('Done');
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  // 4. Declare useEffects here
  useEffect(() => {
    // Reset properties when the pathname changed
    if (prevPathRef.current !== location.pathname) {
      setIsDirty(false);
      setOnConfirm(null);
    }
    prevPathRef.current = location.pathname;
  }, [location.pathname]);

  // 4. Declare values to pass through
  const value: ConfirmContextType = {
    isDirty,
    setIsDirty,
    onConfirm,
    setOnConfirm,
    label,
    setLabel,
    isLoading,
    setIsLoading,
  };

  // 5. Return ContextProvider with value and accept children
  return <ConfirmContext.Provider value={value}>{children}</ConfirmContext.Provider>;
}

// 6. Export Provider
export { ConfirmProvider };
