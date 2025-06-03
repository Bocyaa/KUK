type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className="flex h-full items-center justify-center px-3 py-2 transition active:bg-[#c1c1c1] dark:active:bg-[#424242]"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
