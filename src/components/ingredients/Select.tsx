import { Dispatch, Fragment, SetStateAction } from 'react';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

type Option = {
  label: string;
  value: string;
};

type SelectPropTypes = {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  options: Option[];
};

function Select({ value, onChange, options }: SelectPropTypes) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <ListboxButton className="relative w-24 cursor-pointer rounded-lg border bg-white py-1.5 pl-4 pr-10 text-left focus:outline-none active:bg-[#c1c1c1] dark:border-transparent dark:bg-[#1a1a1a] dark:active:bg-[#424242]">
          <span className="block truncate">{value}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-300"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ListboxOptions className="absolute flex -translate-x-7 translate-y-4 flex-col overflow-auto rounded-lg border bg-[#ffffff]/70 shadow-lg backdrop-blur-sm focus:outline-none dark:border-[#424242] dark:bg-[#1a1a1a]/80">
            {options.map((option) => (
              <ListboxOption
                key={option.value}
                value={option.value}
                className={({ active }) =>
                  `relative cursor-pointer select-none border-b px-3 py-3 last:border-b-0 dark:border-[#424242] ${
                    active
                      ? 'text-[#0094f6]'
                      : 'text-[#0d0d0d] dark:text-[#ffffff]'
                  }`
                }
              >
                {({ selected }) => (
                  <div className="flex items-baseline gap-1">
                    <span className={`${selected && 'font-semibold'}`}>
                      {option.label}
                    </span>
                    <span className="text-sm font-thin text-[#5d5d5d] dark:text-[#afafaf]">
                      ({option.value})
                    </span>
                  </div>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  );
}

export default Select;
