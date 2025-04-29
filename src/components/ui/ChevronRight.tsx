import { ChevronRightIcon } from '@heroicons/react/24/outline';

type Props = {
  label: string;
  classNames?: string;
};

function ChevronRight({ label, classNames }: Props) {
  return (
    <div className="flex items-center gap-1 text-[#0094f6] active:text-[#043566] dark:text-[#0a84ff]">
      <span className={`${classNames}`}>{label}</span>
      <ChevronRightIcon className={`h-5 w-5 stroke-[3] ${classNames}`} />
    </div>
  );
}

export default ChevronRight;
