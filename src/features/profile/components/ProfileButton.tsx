import { useNavigate } from 'react-router-dom';
import Avatar from '@app/components/settings/Avatar';

interface ProfileButtonProps {
  className?: string;
  navigateTo?: string;
  src: string;
}

function ProfileButton({
  className,
  navigateTo = 'user-profile',
  src,
}: ProfileButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      className={`cursor-pointer rounded-full border bg-white p-1 text-black shadow-md active:text-black/50 dark:border-transparent dark:bg-[#212121] dark:text-white dark:active:text-white/50 ${className}`}
      onClick={() => navigate(navigateTo)}
      type="button"
    >
      <Avatar src={src} size={2.5} />
    </button>
  );
}

export default ProfileButton;
