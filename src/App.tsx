import { Navigate } from "react-router-dom";
import SignIn from "@/pages/auth/SignIn.tsx";
import SignUp from "@/pages/auth/SignUp.tsx";
import User from "@/pages/admin/User";
import Booking from "@/pages/admin/Booking";
import Vacation from "@/pages/admin/Vacation";
import Destination from "@/pages/admin/Destination/index";
import AdminLayout from "@/pages/admin/layout/AdminLayout.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // dari react-router-dom!
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "@/ProtectedRoute";
import NotFound from "@/pages/NotFound.tsx";
import HomePage from "@/pages/home/index.tsx";
import PublicLayout from "@/layouts/PublicLayout.tsx";

const queryClient = new QueryClient();

const routes = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="destination" replace /> },
      { path: "destination", element: <Destination /> },
      { path: "user", element: <User /> },
      { path: "booking", element: <Booking /> },
      { path: "vacation", element: <Vacation /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
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
