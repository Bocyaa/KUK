import { Outlet } from 'react-router-dom';

function RecipesLayout() {
  return (
    <div className="bg-[#ffffff] dark:bg-[#000000] dark:text-[#ffffff]">
      <Outlet />
    </div>
  );
}

export default RecipesLayout;
