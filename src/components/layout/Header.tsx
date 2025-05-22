import { useFormConfirm } from '@app/contexts/hooks/useFormConfirm';
import { getPageMeta } from '@app/utility/getPageMeta';
import { useLocation, useNavigate } from 'react-router-dom';
import Left from '@app/components/ui/Left';
import Right from '@app/components/ui/Right';

const ROOT_PATHS = ['/dashboard', '/search', '/settings', '/create-recipe'];

const ALTERNATIVE_HEADER = ['Create Recipe', 'Recipes'];

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

  return (
    <>
      {!ALTERNATIVE_HEADER.includes(title) && (
        <header className="fixed left-0 right-0 z-50 border-b border-[#e6e6e6] bg-[#ffffff]/70 px-5 py-3 backdrop-blur-sm dark:border-[#1a1a1a] dark:bg-[#000000]/70 dark:text-[#ffffff]">
          {/*  */}
          <div className="relative left-0 right-0 flex items-center justify-center">
            <span className="text-lg font-semibold">{title}</span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-between px-2">
            {showBack ? (
              <button onClick={() => handleBack()} aria-label="Back">
                <Left label={labelLeft} />
              </button>
            ) : labelLeft && isDirty ? (
              <button onClick={() => onLeftClick!()} aria-label="Back">
                <Left label={labelLeft} />
              </button>
            ) : (
              // <button onClick={() => onLeftClick!()} aria-label="Back">
              //   <Left
              //     label={labelLeft}
              //     className="text-gray-300 dark:text-[#2d2d2d]"
              //   />
              // </button>
              <span>&nbsp;</span>
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
      )}
    </>
  );
}

export default Header;
