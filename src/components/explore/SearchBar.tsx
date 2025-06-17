import { Search } from 'lucide-react';
import { useRef } from 'react';

interface SearchBarTypes {
  isFocused: boolean;
  setIsFocused: (isFocused: boolean) => void;
}

function SearchBar({ isFocused, setIsFocused }: SearchBarTypes) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative flex w-full items-center overflow-hidden">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search"
        className={`rounded-xl border border-[#e6e6e6] bg-[#f9f9f9] py-1 pl-7 pr-2 outline-none transition-all ease-in-out dark:border-transparent dark:bg-[#212121] ${
          isFocused ? 'w-[calc(100%-65px)]' : 'w-full'
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2">
        <Search className="h-4 w-4 stroke-[2] text-[#afafaf]" />
      </span>

      <button
        type="button"
        className={`absolute right-0 transition-all duration-200 ease-in-out ${
          isFocused ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
        onMouseDown={(e) => {
          e.preventDefault();
          inputRef.current?.blur();
        }}
      >
        Cancel
      </button>
    </div>
  );
}

export default SearchBar;
