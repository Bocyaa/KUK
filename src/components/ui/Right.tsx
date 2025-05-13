import { ChevronRightIcon } from '@heroicons/react/24/outline';

type Props = {
  label: string;
  className?: string;
};

function ChevronRight({ label, className }: Props) {
  if (label === 'Done') {
    return (
      <div className="flex items-center gap-1 text-[#0094f6] active:text-[#043566] dark:text-[#0a84ff]">
        <span className={`mr-5 ${className}`}>{label}</span>
      </div>
    );
  } else {
    return (
      <div className="flex items-center gap-1 text-[#0094f6] active:text-[#043566] dark:text-[#0a84ff]">
        <span className={`${className}`}>{label}</span>
        <ChevronRightIcon className={`h-5 w-5 stroke-[3] ${className}`} />
      </div>
    );
  }
}

export default ChevronRight;
