import React, { PropsWithChildren } from "react";
import AppToolbar from "@/components/UI/AppToolbar";
import { useRouter } from "next/router";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  return (
    <>
      {router.pathname !== '/admin' && <AppToolbar />}
      {children}
    </>
  );
};

export default Layout;