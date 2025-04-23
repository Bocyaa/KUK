import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './contexts/providers/AuthProvider.tsx';
import { ConfirmProvider } from './contexts/providers/ConfirmProvider.tsx';

import AppLayout from './components/layout/AppLayout.tsx';

import Dashboard from './pages/Dashboard.tsx';
import Recipe from './pages/Recipe.tsx';
import Profile from './pages/Profile.tsx';
import AddRecipe from './pages/AddRecipe.tsx';
import PageNotFound from './pages/PageNotFound.tsx';
import Search from './pages/Search.tsx';
import SettingsList from './pages/SettingsList.tsx';
import Register from '@app/pages/auth/Register.tsx';
import Login from '@app/pages/auth/Login.tsx';
import CompleteProfile from '@app/pages/auth/CompleteProfile.tsx';
import AuthCallbackRedirect from '@app/pages/auth/AuthCallbackRedirect.tsx';
import ForgotPassword from '@app/pages/auth/ForgotPassword.tsx';
import ResetPassword from '@app/pages/auth/ResetPassword.tsx';
import ConfirmEmail from '@app/pages/auth/ConfirmEmail.tsx';

import SettingsLayout from './components/ui/settings/SettingsLayout.tsx';
import PersonalInfo from './components/ui/settings/profile/PersonalInfo.tsx';
import ProfileMain from './components/ui/settings/profile/ProfileMain.tsx';
import ContactDemographics from './components/ui/settings/profile/ContactDemographics.tsx';
import UpdatePassword from './components/ui/settings/profile/UpdatePassword.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // data is considered as not fresh (in 0 milliseconds)
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ConfirmProvider>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Navigate replace to="dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="search" element={<Search />} />
                <Route path="recipe" element={<Recipe />} />
                <Route path="settings" element={<SettingsLayout />}>
                  <Route index element={<SettingsList />} />
                  <Route path="profile" element={<Profile />}>
                    <Route index element={<ProfileMain />} />
                    <Route path="personalInfo" element={<PersonalInfo />} />
                    <Route path="passwordUpdate" element={<UpdatePassword />} />
                    <Route path="contactDemographics" element={<ContactDemographics />} />
                  </Route>
                </Route>
                <Route path="create-recipe" element={<AddRecipe />} />
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
          </ConfirmProvider>
        </AuthProvider>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 6000,
          },
          error: {
            duration: 6000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'white',
            color: 'black',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
