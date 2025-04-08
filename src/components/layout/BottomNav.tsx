import { Home, PlusCircle, Search, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
// import { useState } from 'react';

function BottomNav() {
  // const [active, setActive] = useState('home');

  const navItems = [
    { key: 'dashboard', icon: <Home />, label: 'Home' },
    { key: 'recipes', icon: <Search />, label: 'Search' },
    { key: 'addRecipe', icon: <PlusCircle />, label: 'Add' },
    { key: 'account', icon: <User />, label: 'Profile' },
  ];

  return (
    <nav className='fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-700 shadow-md flex justify-around items-center pt-3 pb-2'>
      {navItems.map((item) => (
        <NavLink to={`/${item.key}`} key={item.key}>
          <div className='flex flex-col items-center gap-2'>
            <span className='w-6 h-6'>{item.icon}</span>
            <span className='text-xs'>{item.label}</span>
          </div>
        </NavLink>

        // <button
        //   key={item.key}
        //   onClick={() => setActive(item.key)}
        //   className={`flex flex-col items-center gap-2 ${
        //     active === item.key ? 'text-gray-900' : 'text-gray-400'
        //   }`}
        // >
        //   <span className='w-6 h-6'>{item.icon}</span>
        //   <span className='text-xs'>{item.label}</span>
        // </button>
      ))}
    </nav>
  );
}

export default BottomNav;
