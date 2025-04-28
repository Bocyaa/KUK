import ConfirmContextType from '@app/types/ConfirmContextType';
import { createContext } from 'react';

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export { ConfirmContext };
