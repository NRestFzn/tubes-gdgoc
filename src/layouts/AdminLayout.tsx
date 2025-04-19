import {SidebarInset, SidebarProvider} from '@/components/ui/sidebar';
import {AppSidebar} from '@/components/app-sidebar';
import AdminHeader from '@/pages/admin/partials/Header';
import {ThemeProvider} from '@/components/theme-provider';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const AdminLayout: React.FC = (): React.ReactElement => {
  const location = useLocation();

  const headerTitleMap: Record<string, string> = {
    '/admin/destination': 'Manage Destinations',
    '/admin/user': 'Manage Users',
    '/admin/booking': 'Manage Bookings',
    '/admin/vacation': 'Manage Vacations',
  };

  const headerTitle = headerTitleMap[location.pathname] ?? 'Admin Dashboard';

  return (
    <ThemeProvider>
      <div>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="group">
            <AdminHeader headerTitle={headerTitle} />
            <Outlet />
          </SidebarInset>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  );
};

export default AdminLayout;
