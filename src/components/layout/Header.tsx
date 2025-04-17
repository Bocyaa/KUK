import {
  // ArrowRightStartOnRectangleIcon,
  Bars3Icon,
} from '@heroicons/react/24/solid';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '../../lib/supabaseClient';
// import Logo from '../ui/Logo';
// import { useEffect, useRef } from 'react';

function Header() {
  // const navigate = useNavigate();

  // async function handleLogout() {
  //   await supabase.auth.signOut();
  //   navigate('/login');
  // }

  return (
    <header className='fixed right-0 left-0 flex items-center justify-between p-5 border-b bg-white dark:bg-gray-900 dark:text-white z-50'>
      <h1 className='text-xl font-bold'>KÜK</h1>
      <Bars3Icon className='w-7 h-7' />
    </header>
  );
}

export default Header;
