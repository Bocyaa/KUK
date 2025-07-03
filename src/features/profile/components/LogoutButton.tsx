import { useNavigate } from 'react-router-dom';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';

import { supabase } from '@app/shared/lib/supabaseClient';
import { useQueryClient } from '@tanstack/react-query';

interface LogoutButtonProps {
  className?: string;
  redirectTo?: string;
}

function LogoutButton({
  className = 'rounded-full border bg-white dark:bg-[#212121] dark:border-transparent p-1 text-red-500 shadow-md active:text-red-800',
  redirectTo = '/login',
}: LogoutButtonProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleLogOut() {
    try {
      // Clear all cached data
      queryClient.clear();

      // Sign out from Supabase
      await supabase.auth.signOut();

      // Navigate to login page
      navigate(redirectTo);
    } catch (error) {
      console.error('Error during logout:', error);

      // Still navigate even if there's an error
      navigate(redirectTo);
    }
  }

  return (
    <button className={className} onClick={handleLogOut} type="button">
      <ArrowRightStartOnRectangleIcon className="h-6 w-6" />
    </button>
  );
}

export default LogoutButton;
