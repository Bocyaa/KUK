import { useFormConfirm } from '@app/contexts/hooks/useFormConfirm';
import { getPageMeta } from '@app/utility/getPageMeta';
import { useLocation, useNavigate } from 'react-router-dom';
import Left from '@app/components/ui/Left';
import Right from '@app/components/ui/Right';

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
    'absolute bottom-0 left-0 right-0 top-0 flex items-center justify-between px-1';

  return (
    <header className={styleHeader}>
      <div className="relative left-0 right-0 flex items-center justify-center">
        <span className="h-6 font-semibold">{title}</span>
      </div>

      <div className={styleHeaderDiv}>
        {showBack ? (
          <button onClick={() => handleBack()} aria-label="Back">
            <Left label={labelLeft} />
          </button>
        ) : labelLeft && isDirty ? (
          <button onClick={() => onLeftClick!()} aria-label="Back">
            <Left label={labelLeft} />
          </button>
        ) : (
          <button onClick={() => onLeftClick!()} aria-label="Back">
            <Left
              label={labelLeft}
              className="text-gray-300 dark:text-[#2d2d2d]"
            />
          </button>
        )}

        {labelRight ? (
          isDirty && labelRight ? (
            <button onClick={() => onRightClick!()} aria-label="Back">
              <Right label={labelRight} />
            </button>
          ) : (
            <Right
              label={labelRight}
              className="text-gray-300 dark:text-[#2d2d2d]"
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
