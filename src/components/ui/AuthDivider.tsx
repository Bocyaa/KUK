import AuthButton from './AuthButton';

interface AuthDividerProps {
  providers?: ('google' | 'apple')[];
  onClickHandlers?: {
    google?: () => void;
    apple?: () => void;
  };
}

function AuthDivider({
  providers = ['google', 'apple'],
  onClickHandlers = {},
}: AuthDividerProps) {
  return (
    <>
      <div className='relative w-full text-center my-6'>
        <span className='relative z-10 bg-white px-3 text-sm text-gray-800 font-medium'>
          Or continue with
        </span>
        <div className='absolute inset-0 flex items-center' aria-hidden='true'>
          <div className='w-full border-t border-gray-300'></div>
        </div>
      </div>

      <div className='flex justify-center gap-3'>
        {providers.includes('google') && (
          <AuthButton provider='google' onClick={onClickHandlers.google} />
        )}
        {providers.includes('apple') && (
          <AuthButton provider='apple' onClick={onClickHandlers.apple} />
        )}
      </div>
    </>
  );
}

export default AuthDivider;
