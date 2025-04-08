import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard.tsx';
import Recipes from './pages/Recipes.tsx';
import Recipe from './pages/Recipe.tsx';
import Account from './pages/Account.tsx';
import Settings from './pages/Settings.tsx';
import PageNotFound from './pages/PageNotFound.tsx';
import Register from './pages/Register.tsx';
import Login from './pages/Login.tsx';
import AppLayout from './components/layout/AppLayout.tsx';
import AddRecipe from './pages/AddRecipe.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to='dashboard' />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='recipes' element={<Recipes />} />
          <Route path='recipe' element={<Recipe />} />
          <Route path='account' element={<Account />} />
          <Route path='settings' element={<Settings />} />
          <Route path='addRecipe' element={<AddRecipe />} />
        </Route>
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
