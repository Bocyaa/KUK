import { createContext } from 'react';

// 1. Define Types
type ConfirmContextType = {
  isDirty: boolean;
  setIsDirty: (dirty: boolean) => void;
  onConfirm: (() => void) | null;
  setOnConfirm: (fn: (() => void) | null) => void;
  label: string;
  setLabel: (label: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

// 2. Declare Context
const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export { ConfirmContext };
export type { ConfirmContextType };
