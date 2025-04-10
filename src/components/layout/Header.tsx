import {
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
} from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

function Header() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/login');
  }

  return (
    <header className='fixed right-0 left-0 flex items-center justify-between p-5 border-b bg-white dark:bg-gray-900 dark:text-white z-50'>
      <Bars3Icon className='w-7 h-7' />
      <h1 className='text-xl font-bold'>KÜK</h1>
      <ArrowRightStartOnRectangleIcon
        onClick={handleLogout}
        className='w-7 h-7 cursor-pointer hover:text-red-500 transition'
      />
    </header>
  );
}

export default Header;
