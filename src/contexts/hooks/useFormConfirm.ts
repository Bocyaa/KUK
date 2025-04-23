import { useContext } from 'react';
import { ConfirmContext } from '@app/contexts/ConfirmContext';

// 0. Create custom hook
function useFormConfirm() {
  // 1. Get Context
  const context = useContext(ConfirmContext);

  // 2. Check for correct usage
  if (context === undefined) throw new Error('useFormConfirm must be used within ConfirmProvider');

  // 3. Return Context
  return context;
}

// 4. Export this hook
export { useFormConfirm };
