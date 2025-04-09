import SignIn from './pages/SignIn.tsx';
import User from './pages/admin/User';
import Booking from './pages/admin/Booking';
import Vacation from './pages/admin/Vacation';
import Destination from './pages/admin/Destination/index';
import {ThemeProvider} from '@/components/theme-provider';
import {createBrowserRouter, RouterProvider} from 'react-router';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

const routes = createBrowserRouter([
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/admin/destination',
    element: <Destination />,
  },
  {
    path: '/admin/user',
    element: <User />,
  },
  {
    path: '/admin/vacation',
    element: <Vacation />,
  },
  {
    path: '/admin/booking',
    element: <Booking />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={routes} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
