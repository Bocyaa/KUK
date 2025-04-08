import { Menu, UserCircle } from 'lucide-react';

function Header() {
  return (
    <header className='flex items-center justify-between p-4 border-b bg-white dark:bg-gray-900 dark:text-white'>
      <Menu className='w-10 h-10' />
      <h1 className='text-xl font-bold'>KÜK</h1>
      <UserCircle className='w-10 h-10' />
    </header>
  );
}

export default Header;
