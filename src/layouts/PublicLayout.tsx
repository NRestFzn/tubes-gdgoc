import PublicFooter from '@/components/PublicFooter';
import Navbar from '@/components/PublicNavbar';

import {useEffect} from 'react';
import {Outlet} from 'react-router';

const PublicLayout: React.FC = (): React.ReactElement => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <PublicFooter />
    </>
  );
};

export default PublicLayout;
