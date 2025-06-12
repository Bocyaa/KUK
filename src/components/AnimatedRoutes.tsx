import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import AppLayout from './layout/AppLayout.tsx';
import Dashboard from '../pages/dashboard/Dashboard.tsx';
import Recipe from '../pages/Recipe.tsx';
import Profile from '../pages/profile/Profile.tsx';
import CreateRecipeFlow from '../pages/recipes/CreateRecipeFlow.tsx';
import PageNotFound from '../pages/PageNotFound.tsx';
import Search from '../pages/search/Search.tsx';
import Register from '../pages/auth/Register.tsx';
import Login from '../pages/auth/Login.tsx';
import CompleteProfile from '../pages/auth/CompleteProfile.tsx';
import AuthCallbackRedirect from '../pages/auth/AuthCallbackRedirect.tsx';
import ForgotPassword from '../pages/auth/ForgotPassword.tsx';
import ResetPassword from '../pages/auth/ResetPassword.tsx';
import ConfirmEmail from '../pages/auth/ConfirmEmail.tsx';
import Recipes from '../pages/recipes/Recipes.tsx';
import Explore from '../pages/explore/Explore.tsx';
import RecipesLayout from './layout/RecipesLayout.tsx';
import MyRecipesList from '../pages/recipes/MyRecipesList.tsx';

import '@app/styles/page-transitions.css';
import ExploreLayout from './layout/ExploreLayout.tsx';
import Collection from '@app/pages/recipes/Collection.tsx';

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div className="page-container">
      <Routes location={location}>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="explore" element={<ExploreLayout />}>
            <Route index element={<Explore />} />
            <Route path=":recipeId" element={<Recipe />} />
          </Route>
          <Route path="recipes" element={<RecipesLayout />}>
            <Route index element={<Recipes />} />
            <Route path="my-recipes-list" element={<MyRecipesList />} />
            <Route path="create-recipe" element={<CreateRecipeFlow />} />
            <Route path=":recipeId" element={<Recipe />} />
            <Route path="collection/:collectionId" element={<Collection />} />
          </Route>
          <Route path="search" element={<Search />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="auth/callback" element={<AuthCallbackRedirect />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="complete-profile" element={<CompleteProfile />} />
        <Route path="confirm-email" element={<ConfirmEmail />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
