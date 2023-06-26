import React from 'react';
import MobileNavigation from '@/components/UI/Header/MobileNavigation';
import { useAppSelector } from '@/app/hooks';
import DesktopNavigation from '@/components/UI/Header/DesktopNavigation';
import { selectUser } from '@/features/users/usersSlice';

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <header className="header">
      <div className="header-container container">
        <MobileNavigation />
        <DesktopNavigation />
      </div>
    </header>
  );
};

export default AppToolbar;
