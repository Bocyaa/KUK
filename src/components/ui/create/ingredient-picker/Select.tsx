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
        <ListboxButton className="relative w-24 cursor-pointer rounded-lg border bg-white py-1 pl-4 pr-10 text-left focus:outline-none active:bg-gray-100">
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
          <ListboxOptions className="max-h-70 absolute mt-3 w-32 overflow-auto rounded-lg border bg-[#ffffffcd] py-1 shadow-lg focus:outline-none">
            {options.map((option) => (
              <ListboxOption
                key={option.value}
                value={option.value}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-2 ${
                    active ? 'text-[#0094f6]' : 'text-gray-900'
                  }`
                }
              >
                {({ selected }) => (
                  <div className="flex items-baseline gap-2">
                    <span className={`${selected && 'font-semibold'}`}>
                      {option.value}
                    </span>
                    <span className="text-xs text-gray-300">
                      {option.label}
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
