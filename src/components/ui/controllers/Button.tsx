type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className="inline-flex h-full w-10 items-center justify-center rounded-none bg-transparent p-0 font-medium transition focus:outline-none focus:ring active:bg-gray-100"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
