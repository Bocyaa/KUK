import AuthButton from './AuthButton';

interface AuthDividerProps {
  providers?: ('google' | 'apple')[];
  onClickHandlers?: {
    google?: () => void;
    apple?: () => void;
  };
  label: string;
}

function AuthDivider({
  providers = ['google', 'apple'],
  onClickHandlers = {},
  label = '',
}: AuthDividerProps) {
  return (
    <>
      <div className="relative w-full">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300 dark:border-[#424242]"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-xs font-medium text-gray-500 dark:bg-[#212121] dark:text-[#afafaf]">
            {label}
          </span>
        </div>
      </div>

      <div className="flex justify-center gap-3 pt-2">
        {providers.includes('google') && (
          <AuthButton provider="google" onClick={onClickHandlers.google} />
        )}
        {providers.includes('apple') && (
          <AuthButton provider="apple" onClick={onClickHandlers.apple} />
        )}
      </div>
    </>
  );
}

export default AuthDivider;
