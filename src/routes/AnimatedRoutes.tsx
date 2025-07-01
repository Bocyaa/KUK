import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Recipe from '../features/recipes/pages/Recipe.tsx';
import Profile from '../features/profile/pages/Profile.tsx';
import CreateRecipeFlow from '../features/recipes/pages/CreateRecipeFlow.tsx';
import PageNotFound from '../shared/pages/PageNotFound.tsx';
import Register from '../features/auth/pages/Register.tsx';
import Login from '../features/auth/pages/Login.tsx';
import CompleteProfile from '../features/auth/pages/CompleteProfile.tsx';
import AuthCallbackRedirect from '../features/auth/pages/AuthCallbackRedirect.tsx';
import ForgotPassword from '../features/auth/pages/ForgotPassword.tsx';
import ResetPassword from '../features/auth/pages/ResetPassword.tsx';
import ConfirmEmail from '../features/auth/pages/ConfirmEmail.tsx';
import Recipes from '../features/recipes/pages/Recipes.tsx';
import Explore from '../features/explore/pages/Explore.tsx';
import RecipesList from '../features/recipes/pages/RecipesList.tsx';

import '@app/shared/styles/page-transitions.css';
import Collection from '@app/features/collections/pages/Collection.tsx';
import CollectionsList from '@app/features/collections/pages/CollectionsList.tsx';
import CreateCollection from '@app/features/collections/pages/CreateCollection.tsx';
import AppLayout from '@app/components/layout/AppLayout.tsx';
import RecipesLayout from '@app/components/layout/RecipesLayout.tsx';
import ExploreLayout from '@app/components/layout/ExploreLayout.tsx';

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div className="page-container">
      <Routes location={location}>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to={'recipes'} />} />
          <Route path="recipes" element={<RecipesLayout />}>
            <Route index element={<Recipes />} />
            <Route path=":recipeId" element={<Recipe />} />
            <Route path="recipes-list" element={<RecipesList />} />
            <Route path="recipes-list/:recipeId" element={<Recipe />} />
            <Route path="collections-list" element={<CollectionsList />} />
            <Route path="create-collection" element={<CreateCollection />} />
            <Route path="collection/:collectionId" element={<Collection />} />
            <Route path="collection/:collectionId/:recipeId" element={<Recipe />} />
          </Route>
          <Route path="explore" element={<ExploreLayout />}>
            <Route index element={<Explore />} />
            <Route path=":recipeId" element={<Recipe />} />
          </Route>
          <Route path="create-recipe" element={<CreateRecipeFlow />} />
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
