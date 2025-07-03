import { useNavigate } from 'react-router-dom';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

interface SettingsButtonProps {
  className?: string;
  navigateTo?: string;
}

function SettingsButton({
  className = 'rounded-full border dark:bg-[#212121] dark:border-transparent bg-white p-1 text-black dark:text-white shadow-md dark:active:text-white/50 active:text-black/50 cursor-pointer',
  navigateTo = 'settings',
}: SettingsButtonProps) {
  const navigate = useNavigate();

  return (
    <button className={className} onClick={() => navigate(navigateTo)} type="button">
      <Cog6ToothIcon className="h-10 w-10" />
    </button>
  );
}

export default SettingsButton;
