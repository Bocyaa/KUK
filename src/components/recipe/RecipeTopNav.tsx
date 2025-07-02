import { useLocation, useNavigate } from 'react-router-dom';
import { getPreviousPageFromUrl } from '@app/shared/utility/getPreviousPageFromUrl';
import { restoreThemeColor } from '@app/shared/utility/updateThemeColor';
import ChevronLeft from '@app/shared/components/icons/ChevronLeft';

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

  const backButtonLabel =
    String(previousPage.path)
      .split('/')
      .pop() // Get the last part of the path
      ?.split('-') // Split by hyphen
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(' ') || 'Back'; // Join words with a space or default to 'Back'

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between pb-2 pl-3 pr-4 pt-2"
      style={dynamicStyle}
    >
      <button type="button" onClick={handleNavigation}>
        <div className="flex items-center justify-center rounded-full bg-white/20 p-1">
          <ChevronLeft />
          <span className="pr-2 font-semibold text-white">{backButtonLabel}</span>
        </div>
      </button>

      <button type="button">
        <div className="flex items-center justify-center rounded-full bg-white/20 p-1">
          <EllipsisHorizontal />
        </div>
      </button>
    </div>
  );
}

export default RecipeTopNav;

function EllipsisHorizontal() {
  return (
    <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  );
}
