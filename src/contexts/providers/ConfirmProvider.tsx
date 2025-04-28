import { useState, ReactNode, useRef, useEffect } from 'react';
import { ConfirmContext } from '@app/contexts/ConfirmContext';
import { useLocation } from 'react-router-dom';
import ConfirmContextType from '@app/types/ConfirmContextType';

function ConfirmProvider({ children }: { children: ReactNode }) {
  //
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [labelLeft, setLabelLeft] = useState('Left');
  const [labelRight, setLabelRight] = useState('Right');
  const [onLeftClick, setOnLeftClick] = useState<(() => void) | null>(null);
  const [onRightClick, setOnRightClick] = useState<(() => void) | null>(null);

  // const [onConfirm, setOnConfirm] = useState(null);
  // const [handleBackClick, setHandleBackClick] = useState(null);

  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    // Reset properties when the pathname changed
    if (prevPathRef.current !== location.pathname) {
      setIsDirty(false);
    }
    prevPathRef.current = location.pathname;
  }, [location.pathname]);

  // Values to pass through
  const value: ConfirmContextType = {
    isDirty,
    setIsDirty,
    isLoading,
    setIsLoading,
    labelLeft,
    setLabelLeft,
    labelRight,
    setLabelRight,
    onLeftClick,
    setOnLeftClick,
    onRightClick,
    setOnRightClick,
  };

  // Return ContextProvider with value and accept children
  return (
    <ConfirmContext.Provider value={value}>{children}</ConfirmContext.Provider>
  );
}

export { ConfirmProvider };
