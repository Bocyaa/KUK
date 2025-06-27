import { PlusIcon } from '../Icons/PlusIcon';

function PlaceholderCardAddLink({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="flex h-16 w-20 items-center justify-center rounded-lg border-2 border-dashed shadow-sm active:bg-[#e0e0e0] dark:border-transparent dark:bg-[#212121] dark:active:bg-[#2c2c2c]"
      onClick={onClick}
    >
      <PlusIcon />
    </div>
  );
}

export default PlaceholderCardAddLink;
