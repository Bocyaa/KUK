import { useFormConfirm } from '@app/contexts/hooks/useFormConfirm';
import { getPageMeta } from '@app/utility/getPageMeta';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SpinnerBar from '../ui/SpinnerBar';

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
          <button
            className="flex h-5 w-5 items-center"
            onClick={() => handleBackClick()}
            aria-label="Back"
          >
            <div className="flex items-center gap-1">
              <ChevronLeftIcon className="h-5 w-5 stroke-[3]" />
              <span>Back</span>
            </div>
          </button>
        ) : (
          <span>&nbsp;</span>
        )}

        {isLoading ? (
          <span className="bottom-0 right-0 top-0 flex items-center justify-end pr-2 text-xs font-semibold text-gray-300">
            <SpinnerBar width={30} />
          </span>
        ) : (
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
                  <span>{label}</span>
                </motion.button>
              ) : (
                <motion.span
                  key="placeholder"
                  className="font-semibold text-[#d1d5db] dark:text-[#6f6f6f64]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {onConfirm && <span>{label}</span>}
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        )}
      </div>
    </header>
  );
}

export default Header;
