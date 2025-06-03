import { Outlet } from 'react-router-dom';

// bg-[#ffffff] dark:bg-[#000000] dark:text-[#ffffff]

function RecipesLayout() {
  return (
    <div className="">
      <Outlet />
    </div>
  );
}

export default RecipesLayout;
