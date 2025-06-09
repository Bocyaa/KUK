import { useLocation, useNavigate } from 'react-router-dom';
import { getPreviousPageFromUrl } from '@app/utility/getPreviousPageFromUrl';
import { restoreThemeColor } from '@app/utility/updateThemeColor';

interface RecipeHeaderProps {
  dominantColor: string;
}

function RecipeTopNav({ dominantColor }: RecipeHeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const previousPage =
    location.state?.from || getPreviousPageFromUrl(location.pathname);

  const dynamicStyle = dominantColor
    ? {
        background: `linear-gradient(to bottom, ${dominantColor}, ${dominantColor}70)`,
        backdropFilter: 'blur(12px)',
      }
    : undefined;

  const handleNavigation = () => {
    restoreThemeColor();

    if (previousPage?.path) {
      navigate(previousPage.path);
    } else {
      navigate(-1);
    }
  };

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-3 pb-2 pt-2"
      style={dynamicStyle}
    >
      <button type="button" onClick={handleNavigation}>
        <div className="flex items-center justify-center rounded-full bg-white/20 p-1">
          <ChevronLeft />
        </div>
      </button>

      <span className="text-lg font-semibold capitalize text-[#e3e3e3]">
        {previousPage?.name}
      </span>

      <button type="button">
        <div className="flex items-center justify-center rounded-full bg-white/20 p-1">
          <EllipsisHorizontal />
        </div>
      </button>
    </div>
  );
}

export default RecipeTopNav;

function ChevronLeft() {
  return (
    <svg
      className="h-5 w-5 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
}

function EllipsisHorizontal() {
  return (
    <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  );
}
