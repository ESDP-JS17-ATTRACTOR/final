import React, { PropsWithChildren } from "react";
import AppToolbar from "@/components/UI/Header/AppToolbar";
import { useRouter } from "next/router";
import Admin from "@/pages/admin";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const isAdmin = router.pathname.includes("/admin");

  return (
    <>
      {isAdmin ?
        (<Admin>{children}</Admin>) :
        (<>
          <AppToolbar />
          {children}
        </>)}
    </>
  );
};

export default Layout;