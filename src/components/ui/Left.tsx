import { ChevronLeftIcon } from '@heroicons/react/24/outline';

type Props = {
  label: string;
  className?: string;
};

function Left({ label, className }: Props) {
  if (label === 'Reset') {
    return (
      <div className="flex items-center gap-1 text-red-600 active:text-[#043566] dark:text-red-600">
        <span className={`ml-5 ${className}`}>{label}</span>
      </div>
    );
  } else {
    return (
      <div
        className={`flex items-center gap-1 text-[#0094f6] active:text-[#043566] dark:text-[#0a84ff]`}
      >
        <ChevronLeftIcon className={`h-5 w-5 stroke-[3] ${className}`} />
        <span className={`${className}`}>{label}</span>
      </div>
    );
  }
}

export default Left;
