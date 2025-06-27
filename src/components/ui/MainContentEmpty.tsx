import { BookmarkIcon } from '../Icons/BookmarkIcon';

interface MainContentEmptyProps {
  icon: string;
  message: string;
}

const Icons = {
  bookmark: BookmarkIcon,
};

function MainContentEmpty({ message, icon }: MainContentEmptyProps) {
  const IconComponent = Icons[icon as keyof typeof Icons];

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <span className="h-8 w-8 text-[#5d5d5d] dark:text-[#afafaf]">
        <IconComponent className="h-8 w-8 text-[#5d5d5d] dark:text-[#afafaf]" />
      </span>
      <span className="mt-3 text-center text-[#5d5d5d] dark:text-[#afafaf]">
        {message}
      </span>
    </div>
  );
}

export default MainContentEmpty;
