import { ChevronLeftIcon } from '@heroicons/react/24/outline';

type Props = {
  label: string;
};

function ChevronLeft({ label }: Props) {
  return (
    <div className="flex items-center gap-1 text-[#0094f6] active:text-[#0094f683]">
      <ChevronLeftIcon className="h-5 w-5 stroke-[3]" />
      <span>{label}</span>
    </div>
  );
}

export default ChevronLeft;
