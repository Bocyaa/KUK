interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

function Checkbox({ id, ...props }: CheckboxProps) {
  return (
    <div className="flex items-center">
      <input id={id} type="checkbox" className="peer sr-only" {...props} />
      <label
        htmlFor={id}
        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-white bg-transparent peer-checked:border-[#ffffff] peer-checked:bg-[#0094f6] peer-focus:ring-2 peer-focus:ring-[#0094f6] peer-focus:ring-opacity-50 peer-checked:[&>svg]:opacity-100"
      >
        <svg
          className="h-4 w-4 text-white opacity-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      <style jsx>{`
        input:checked + label svg {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

export default Checkbox;
