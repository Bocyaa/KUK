import { getPageMeta } from "@app/utility/getPageMeta";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";

const ROOT_PATHS = ["/dashboard", "/search", "/settings", "/create-recipe"];

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, back } = getPageMeta(location.pathname);

  const showBack = !!back || !ROOT_PATHS.includes(location.pathname);

  return (
    <header className="fixed left-0 right-0 z-50 flex items-center justify-between gap-5 border-b border-gray-300 bg-white px-5 py-3 dark:border-[#212121] dark:bg-black dark:text-gray-200">
      {showBack ? (
        <button
          className="flex h-5 w-5 items-center"
          onClick={() => (back ? navigate(back) : navigate(-1))}
          aria-label="Back"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
      ) : (
        <span className="h-5 w-5">&nbsp;</span>
      )}

      <h1 className="h-6 font-semibold">{title}</h1>
      <span className="h-5 w-5">&nbsp;</span>
    </header>
  );
}

export default Header;
