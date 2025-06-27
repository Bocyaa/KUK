import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/outline';
import { Fragment, ReactNode } from 'react';

type Action = {
  label: string;
  icon: ReactNode;
  onClick: () => void;
};

type ActionOptionsProps = {
  actions: Action[];
};

function ActionOptions({ actions }: ActionOptionsProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="relative flex items-center justify-center bg-transparent p-1.5 text-left focus:outline-none dark:border-transparent dark:bg-transparent">
          <EllipsisHorizontalCircleIcon className="h-7 w-7 text-[#0094f6] dark:active:text-[#005994]" />
        </MenuButton>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-lg bg-[#ffffff] shadow-[0_12px_32px_rgba(0,0,0,0.1),_0_-6px_16px_rgba(0,0,0,0.04),_-6px_0_16px_rgba(0,0,0,0.04)] focus:outline-none dark:border-[#424242] dark:bg-[#1a1a1a]">
          <div>
            {actions.map((action) => (
              <MenuItem key={action.label}>
                {() => {
                  const isDangerBtn = action.label === 'Delete Collection';

                  return (
                    <button
                      onClick={() => {
                        action.onClick();
                      }}
                      className={`group flex w-full items-center justify-between gap-3 border-b px-5 py-3 last:border-none ${isDangerBtn ? 'text-[#dc2626]' : 'text-[#0d0d0d] dark:text-[#ffffff]'} first:rounded-t-lg last:rounded-b-lg hover:bg-[#e0e0e0] dark:border-[#424242] dark:hover:bg-[#2c2c2c]`}
                    >
                      <span>{action.label}</span>
                      <span>{action.icon}</span>
                    </button>
                  );
                }}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}

export default ActionOptions;
