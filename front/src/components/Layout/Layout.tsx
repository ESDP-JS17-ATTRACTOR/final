import React, {PropsWithChildren} from 'react';
import AppToolbar from "@/components/UI/AppToolbar";

const Layout: React.FC<PropsWithChildren> = ({children}) => {
    return (
        <>
            <AppToolbar/>
            {children}
        </>
    );
};

export default Layout;