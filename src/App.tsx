import SignIn from './pages/auth/SignIn.tsx';
import SignUp from './pages/auth/SignUp.tsx';
import User from './pages/admin/User';
import Booking from './pages/admin/Booking';
import Vacation from './pages/admin/Vacation';
import Destination from './pages/admin/Destination/index';
import AdminLayout from './pages/admin/layout/AdminLayout.tsx';
import {createBrowserRouter, RouterProvider} from 'react-router';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

const routes = createBrowserRouter([
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/sign-up',
    element: <SignUp />
  },
  {
    path: '/admin',
    element: <AdminLayout/>,
    children: [
      { path: 'destination', element: <Destination /> },
      { path: 'user', element: <User /> },
      { path: 'booking', element: <Booking /> },
      { path: 'vacation', element: <Vacation /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  );
}

export default App;
