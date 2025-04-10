import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard.tsx';
import Recipes from './pages/Recipes.tsx';
import Recipe from './pages/Recipe.tsx';
import Settings from './pages/Settings.tsx';
import PageNotFound from './pages/PageNotFound.tsx';
import Register from './pages/Register.tsx';
import Login from './pages/Login.tsx';
import AppLayout from './components/layout/AppLayout.tsx';
import AddRecipe from './pages/AddRecipe.tsx';
import Profile from './pages/Profile.tsx';
import { AuthProvider } from './contexts/AuthProvider.tsx';
import CompleteProfile from './pages/CompleteProfile.tsx';
import AuthCallbackRedirect from './features/auth/authCallbackRedirect.tsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to='dashboard' />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='recipes' element={<Recipes />} />
            <Route path='recipe' element={<Recipe />} />
            <Route path='profile' element={<Profile />} />
            <Route path='settings' element={<Settings />} />
            <Route path='addRecipe' element={<AddRecipe />} />
          </Route>
          <Route path='complete-profile' element={<CompleteProfile />} />
          <Route path='auth/callback' element={<AuthCallbackRedirect />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
