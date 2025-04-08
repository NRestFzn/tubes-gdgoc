import * as React from 'react';
import {NotebookPen, MapPinHouse, TicketsPlane, UsersRound} from 'lucide-react';

import {NavMain} from '@/components/nav-main';
import {NavUser} from '@/components/nav-user';
import {LogoHeader} from '@/components/logo-header';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

// This is sample data.
const data = {
  user: {
    name: 'Admin',
    email: 'admin@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Destinations',
      url: '/admin/destination',
      icon: MapPinHouse,
      isActive: true,
    },
    {
      title: 'Vacations',
      url: '/admin/vacation',
      icon: TicketsPlane,
    },
    {
      title: 'Users',
      url: '/admin/user',
      icon: UsersRound,
    },
    {
      title: 'Bookings',
      url: '/admin/booking',
      icon: NotebookPen,
    },
  ],
};

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <LogoHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
