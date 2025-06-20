import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './contexts/providers/AuthProvider.tsx';
import AnimatedRoutes from './components/AnimatedRoutes.tsx';
import { ColorInitializer } from './components/ColorInitializer.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24, // 24 hours - recipes stay fresh for a day
      gcTime: 1000 * 60 * 60 * 24, // 24 hours - keep in cache
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
      refetchOnMount: false, // Don't refetch when component mounts
      refetchOnReconnect: false, // Refetch when reconnecting
      retry: 3, // Limit retries to prevent infinite loading
      retryDelay: (i) => Math.min(1000 * 2 ** i, 30_000),
      networkMode: 'online', // Only run when online
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ColorInitializer />
          <AnimatedRoutes />
        </AuthProvider>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
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
