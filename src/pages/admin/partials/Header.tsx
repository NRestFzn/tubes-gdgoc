import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

export type HeaderProps = {
  headerTitle?: string;
};

const AdminHeader: React.FC<HeaderProps> = ({
  headerTitle,
}): React.ReactElement => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 ease-linear shadow-lg">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2"
        />
        <div className="text-3xl font-bold transition-all duration-200 ">
          {headerTitle || 'Admin Dashboard'}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
