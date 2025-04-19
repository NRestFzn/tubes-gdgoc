import PublicFooter from "@/components/PublicFooter";
import Navbar from "@/components/PublicNavbar";
import React from "react";

type PublicLayoutProps = {
  children: React.ReactNode;
};

const PublicLayout: React.FC<PublicLayoutProps> = ({children}): React.ReactElement => {
  return (
    <>
      <Navbar />
      {children}
      <PublicFooter />
    </>
  );
};

export default PublicLayout;
