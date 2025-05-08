import { ChevronDown, ChevronUp } from 'lucide-react';

type ShowHideProp = {
  type: string;
  onClick: (isTrue: boolean) => void;
  label?: string;
};

function ShowHide({ type, onClick, label }: ShowHideProp) {
  if (type === 'hide') {
    return (
      <button
        onClick={() => onClick(false)}
        className="flex items-center gap-2 pl-1 text-[#0094f6]"
      >
        <span>{label ? label : 'Hide'}</span>
        <ChevronUp className="h-4 w-4" />
      </button>
    );
  }
  if (type === 'show') {
    return (
      <button
        onClick={() => onClick(true)}
        className="flex items-center gap-1 pl-1 text-[#0094f6]"
      >
        <span>{label ? label : 'Show'}</span>
        <ChevronDown className="h-4 w-4" />
      </button>
    );
  }
  return 'wrong type!';
}

export default ShowHide;
