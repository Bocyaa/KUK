import { useNavigate } from 'react-router-dom';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';

import { supabase } from '@app/shared/lib/supabaseClient';
import { useInvalidateUserPofile } from '@app/shared/hooks/useGetUserProfile';

interface LogoutButtonProps {
  className?: string;
  redirectTo?: string;
}

function LogoutButton({
  className = 'rounded-full border bg-white dark:bg-[#212121] dark:border-transparent p-1 text-red-500 shadow-md active:text-red-800',
  redirectTo = '/login',
}: LogoutButtonProps) {
  const navigate = useNavigate();
  const invalidateUserProfile = useInvalidateUserPofile();

  async function handleLogOut() {
    await supabase.auth.signOut();
    invalidateUserProfile();
    navigate(redirectTo);
  }

  return (
    <button className={className} onClick={handleLogOut} type="button">
      <ArrowRightStartOnRectangleIcon className="h-6 w-6" />
    </button>
  );
}

export default LogoutButton;
