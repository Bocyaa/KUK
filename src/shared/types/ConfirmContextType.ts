type ConfirmContextType = {
  isDirty: boolean;
  setIsDirty: (dirty: boolean) => void;

  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

  labelLeft: string;
  setLabelLeft: (labelLeft: string) => void;

  labelRight: string;
  setLabelRight: (labelRigth: string) => void;

  onLeftClick: (() => void) | null;
  setOnLeftClick: (fn: (() => void) | null) => void;

  onRightClick: (() => void) | null;
  setOnRightClick: (fn: (() => void) | null) => void;
};

export default ConfirmContextType;
