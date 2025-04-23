import { useFormConfirm } from '@app/contexts/hooks/useFormConfirm';
import { getPageMeta } from '@app/utility/getPageMeta';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

const ROOT_PATHS = ['/dashboard', '/search', '/settings', '/create-recipe'];

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, back } = getPageMeta(location.pathname);
  const showBack = !!back || !ROOT_PATHS.includes(location.pathname);

  const { isDirty, setIsDirty, onConfirm } = useFormConfirm();

  function handleBackClick() {
    if (back) {
      navigate(back);
    } else {
      navigate(-1);
    }
    setIsDirty(false);
  }

  return (
    <header className="fixed left-0 right-0 border-b border-gray-300 bg-white px-5 py-3 dark:border-[#212121] dark:bg-black dark:text-gray-200">
      <div className="relative left-0 right-0 flex items-center justify-center">
        <span className="h-6 font-semibold">{title}</span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-between px-5">
        {showBack ? (
          <button
            className="flex h-5 w-5 items-center"
            onClick={() => handleBackClick()}
            aria-label="Back"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
        ) : (
          <span>&nbsp;</span>
        )}
        {/*  */}
        <span>
          <AnimatePresence mode="wait" initial={false}>
            {isDirty && onConfirm ? (
              <motion.button
                key="confirm"
                className="font-semibold text-[#0094f6]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                onClick={() => onConfirm()}
              >
                {/* <CheckIcon className="h-5 w-5 stroke-[2]" /> */}
                <span>Done</span>
              </motion.button>
            ) : (
              <motion.span
                key="placeholder"
                className=""
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <span>&nbsp;</span>
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </div>
    </header>
  );
}

export default Header;
