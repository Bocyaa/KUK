import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

import { AuthProvider } from './contexts/providers/AuthProvider.tsx';
import { ConfirmProvider } from './contexts/providers/ConfirmProvider.tsx';
import AnimatedRoutes from './components/AnimatedRoutes.tsx';
import { useGetRecipes } from './hooks/useGetRecipes.tsx';
import { colorExtractionService } from './services/colorExtractionService.ts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24, // 24 hours - recipes stay fresh for a day
      gcTime: 1000 * 60 * 60 * 24, // 24 hours - keep in cache
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
      refetchOnMount: false, // Don't refetch when component mounts
    },
  },
});

// Create a separate component for the color initialization
function ColorInitializer() {
  const { data: recipes } = useGetRecipes();

  useEffect(() => {
    if (recipes && recipes.length > 0) {
      colorExtractionService.initializeColors(recipes);
    }
  }, [recipes]);

  return null; // This component doesn't render anything
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ConfirmProvider>
            <ColorInitializer />
            <AnimatedRoutes />
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
