import { FolderIcon, TrashIcon } from '@heroicons/react/24/outline';
import { SendIcon } from 'lucide-react';

interface BottomActionPanelProps {
  actions: {
    action: string;
    onClick: () => void;
  }[];
  selectedRecipes: string[];
}

const Icons = {
  move: FolderIcon,
  send: SendIcon,
  delete: TrashIcon,
};

function BottomActionPanel({ actions, selectedRecipes }: BottomActionPanelProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex h-24 w-full items-center justify-evenly border-t bg-white pb-6 dark:border-[#39333c] dark:bg-black">
      {actions.map((actionItem, index) => {
        const IconComponent = Icons[actionItem.action as keyof typeof Icons];
        return (
          <button
            key={index}
            onClick={actionItem.onClick}
            className="flex flex-col items-center justify-center"
          >
            {IconComponent && (
              <IconComponent
                className={`h-7 w-7 ${
                  selectedRecipes.length > 0
                    ? actionItem.action === 'delete'
                      ? 'text-red-500 active:text-red-700 md:hover:text-red-700'
                      : 'text-[#0094f6] active:text-[#005994] dark:text-[#0094f6] md:hover:text-[#005994]'
                    : 'text-[#afafaf]'
                }`}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default BottomActionPanel;

{
  /* <TrashIcon className="h-7 w-7 text-[#afafaf] dark:text-[#5d5d5d]" /> */
}
