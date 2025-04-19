import PublicFooter from "@/components/PublicFooter";
import Navbar from "@/components/PublicNavbar";

import { useEffect } from "react";

type PublicLayoutProps = {
  children: React.ReactNode;
};

const PublicLayout: React.FC<PublicLayoutProps> = ({children}): React.ReactElement => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      {children}
      <PublicFooter />
    </>
  );
};

export default PublicLayout;
