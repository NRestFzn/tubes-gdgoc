import PublicFooter from "@/components/PublicFooter";
import Navbar from "@/components/PublicNavbar";
import React from "react";
import { Outlet } from "react-router";

const PublicLayout: React.FC = (): React.ReactElement => {
  return (
    <>
      <Navbar />
      <Outlet />
      <PublicFooter />
    </>
  );
};

export default PublicLayout;
