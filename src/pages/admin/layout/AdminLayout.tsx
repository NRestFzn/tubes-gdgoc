import {SidebarInset, SidebarProvider} from '@/components/ui/sidebar';
import {AppSidebar} from '@/components/app-sidebar';
import AdminHeader from '../partials/Header';
import React from 'react';

type AdminLayoutProps = {
  headerTitle?: string;
};

const AdminLayout: React.FC<React.PropsWithChildren<AdminLayoutProps>> = ({
  children,
  headerTitle,
}): React.ReactElement => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="group">
          <AdminHeader headerTitle={headerTitle} />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default AdminLayout;
