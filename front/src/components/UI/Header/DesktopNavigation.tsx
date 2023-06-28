import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from '@/components/UI/Header/LanguageSwitcher';
import Search from '@/components/UI/Header/Search';
import UsersMenu from '@/components/UI/Header/UsersMenu';
import AnonymousMenu from '@/components/UI/Header/AnonymousMenu';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/users/usersSlice';
import { useRouter } from 'next/router';
import { ru } from '../../../../public/locales/ru/mainBlock';
import { en } from '../../../../public/locales/en/mainBlock';

const DesktopNavigation = () => {
  const user = useAppSelector(selectUser);
  const router = useRouter();
  const t = router.locale === 'ru' ? ru : en;
  return (
    <div className="desktop_navigation">
      <Link href="/" className="logo">
        <Image className="logo-image" src="/logo.png" alt="Logo" width={43} height={43} priority />
      </Link>
      <nav className="main-nav" style={{ display: user ? 'flex' : 'none' }}>
        <ul className="main-nav_list">
          <li className="main-nav_item">
            <Link className="main-nav_link" href="/catalogs">
              {t.catalogs}
            </Link>
          </li>
          <li className="main-nav_item">
            <Link className="main-nav_link" href="/favourites">
              {t.favor}
            </Link>
          </li>
          <li className="main-nav_item">
            <Link className="main-nav_link" href="/articles">
              {t.articles}
            </Link>
          </li>
          <li className="main-nav_item">
            <Link className="main-nav_link" href="/users">
              {t.users}
            </Link>
          </li>
          <li className="main-nav_item">
            <Link className="main-nav_link" href="/departments#">
              {t.depart}
            </Link>
          </li>
        </ul>
      </nav>
      <LanguageSwitcher />
      <Search />
      {user ? <UsersMenu /> : <AnonymousMenu />}
    </div>
  );
};

export default DesktopNavigation;
