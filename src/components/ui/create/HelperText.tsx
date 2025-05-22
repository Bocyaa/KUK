type HelperTextProps = {
  text: string;
  className?: string;
  marginBottom?: string;
};

function HelperText({
  text,
  className = '',
  marginBottom = 'mb-1',
}: HelperTextProps) {
  return (
    <span
      className={`${marginBottom} block -translate-y-1 px-1 text-xs font-medium text-[#7d7d7d] dark:text-[#7e7e7e] ${className}`}
    >
      {text}
    </span>
  );
}

export default HelperText;
