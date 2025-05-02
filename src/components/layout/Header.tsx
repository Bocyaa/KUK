import { useFormConfirm } from '@app/contexts/hooks/useFormConfirm';
import { getPageMeta } from '@app/utility/getPageMeta';
import { useLocation, useNavigate } from 'react-router-dom';
import ChevronLeft from '../ui/ChevronLeft';
import ChevronRight from '../ui/ChevronRight';

const ROOT_PATHS = ['/dashboard', '/search', '/settings', '/create-recipe'];

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const { title, back } = getPageMeta(location.pathname);
  const showBack = !!back || !ROOT_PATHS.includes(location.pathname);

  const {
    isDirty,
    setIsDirty,
    // isLoading,
    // setIsLoading,
    labelLeft,
    // setLabelLeft,
    labelRight,
    // setLabelRight,
    onLeftClick,
    // setOnLeftClick,
    onRightClick,
    // setOnRightClick,
  } = useFormConfirm();

  function handleBack() {
    if (back) {
      navigate(back);
    } else {
      navigate(-1);
    }
    setIsDirty(false);
  }

  const styleHeader =
    'fixed left-0 right-0 border-b border-gray-300 bg-white px-5 py-3 dark:border-[#1c1c1c] dark:bg-black dark:text-gray-200 z-50';

  const styleHeaderDiv =
    'absolute bottom-0 left-0 right-0 top-0 flex items-center justify-between pl-1 pr-5';

  return (
    <header className={styleHeader}>
      <div className="relative left-0 right-0 flex items-center justify-center">
        <span className="h-6 font-semibold">{title}</span>
      </div>

      <div className={styleHeaderDiv}>
        {showBack ? (
          <button onClick={() => handleBack()} aria-label="Back">
            <ChevronLeft label={labelLeft} />
          </button>
        ) : labelLeft && onLeftClick ? (
          <button onClick={() => onLeftClick()} aria-label="Back">
            <ChevronLeft label={labelLeft} />
          </button>
        ) : (
          <span>&nbsp;</span>
        )}

        {labelRight ? (
          isDirty && onRightClick ? (
            <button onClick={() => onRightClick()} aria-label="Back">
              <ChevronRight label={labelRight} />
            </button>
          ) : (
            <ChevronRight
              label={labelRight}
              classNames="text-gray-300 dark:text-[#2d2d2d]"
            />
          )
        ) : (
          <span>&nbsp;</span>
        )}
      </div>
    </header>
  );
}

export default Header;
