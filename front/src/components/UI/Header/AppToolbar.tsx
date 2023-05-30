import React from 'react';
import MobileNavigation from '@/components/UI/Header/MobileNavigation';
import Link from 'next/link';
import LanguageSwitcher from '@/components/UI/Header/LanguageSwitcher';
import Search from '@/components/UI/Header/Search';
import Image from 'next/image';
import { useAppSelector } from '@/app/hooks';
import UsersMenu from '@/components/UI/Header/UsersMenu';
import AnonymousMenu from '@/components/UI/Header/AnonymousMenu';
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
