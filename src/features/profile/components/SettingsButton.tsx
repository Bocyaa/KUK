import { useNavigate } from 'react-router-dom';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

interface SettingsButtonProps {
  className?: string;
  navigateTo?: string;
}

function SettingsButton({
  className = 'rounded-full border dark:bg-[#212121] dark:border-transparent bg-white p-1 text-[#0094f6] shadow-md active:text-[#005994]',
  navigateTo = 'settings',
}: SettingsButtonProps) {
  const navigate = useNavigate();

  return (
    <button className={className} onClick={() => navigate(navigateTo)} type="button">
      <Cog6ToothIcon className="h-6 w-6" />
    </button>
  );
}

export default SettingsButton;
