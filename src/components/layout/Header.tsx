import { useFormConfirm } from '@app/contexts/hooks/useFormConfirm';
import { getPageMeta } from '@app/utility/getPageMeta';
import { useLocation, useNavigate } from 'react-router-dom';
import ChevronBack from '../ui/ChevronBack';
import ConfirmButton from '../ui/ConfirmButton';

const ROOT_PATHS = ['/dashboard', '/search', '/settings', '/create-recipe'];

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, back } = getPageMeta(location.pathname);
  const showBack = !!back || !ROOT_PATHS.includes(location.pathname);

  const { isDirty, setIsDirty, onConfirm, label, isLoading } = useFormConfirm();

  function handleBackClick() {
    if (back) {
      navigate(back);
    } else {
      navigate(-1);
    }
    setIsDirty(false);
  }

  return (
    <header className="fixed left-0 right-0 border-b border-gray-300 bg-white px-5 py-3 dark:border-[#1c1c1c] dark:bg-black dark:text-gray-200">
      <div className="relative left-0 right-0 flex items-center justify-center">
        <span className="h-6 font-semibold">{title}</span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-between pl-1 pr-5">
        {showBack ? (
          <button onClick={() => handleBackClick()} aria-label="Back">
            <ChevronBack />
          </button>
        ) : (
          <span>&nbsp;</span>
        )}

        {onConfirm && (
          <ConfirmButton
            label={label}
            isDirty={isDirty}
            onConfirm={onConfirm}
            isLoading={isLoading}
          />
        )}
      </div>
    </header>
  );
}

export default Header;
