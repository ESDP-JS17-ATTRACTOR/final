import React, { useState } from 'react';
import Link from 'next/link';
import { Avatar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useRouter } from 'next/router';
import { logout } from '@/features/users/usersThunks';
import { selectUser, switchLoginModalWindow, switchRegistrationModalWindow } from '@/features/users/usersSlice';
import Image from 'next/image';
import { apiURL } from '../../../../constants';
import { ru } from '../../../../public/locales/ru/mainBlock';
import { en } from '../../../../public/locales/en/mainBlock';

const MobileNavigation = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const [searchStatus, setSearchStatus] = useState(false);
  const avatar = user && user.avatar ? apiURL + '/' + user.avatar : null;
  const t = router.locale === 'ru' ? ru : en;

  const openMobileSideMenu = () => {
    document.getElementById('mobileSideMenuBackdrop')!.style.width = '100%';
    document.getElementById('mobileSideMenu')!.style.width = '300px';
  };

  const closeMobileSideMenu = () => {
    document.getElementById('mobileSideMenuBackdrop')!.style.width = '0';
    document.getElementById('mobileSideMenu')!.style.width = '0';
  };

  const openSearchForm = () => {
    setSearchStatus(true);
  };

  const submitSearchForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchStatus(false);
  };

  const closeSearchForm = () => {
    setSearchStatus(false);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    await router.push('/');
    closeMobileSideMenu();
  };

  const userContent = [
    <Link key="my-profile" href="/my-profile" onClick={closeMobileSideMenu}>
      <li>{t.profile}</li>
    </Link>,
    <Link key="my-courses" href="/my-courses" onClick={closeMobileSideMenu}>
      <li>{t.courses}</li>
    </Link>,
    <Link key="catalogs" href="/catalogs">
      <li>{t.catalogs}</li>
    </Link>,
    <Link key="#" href="/articles">
      <li>{t.articles}</li>
    </Link>,
    <Link key="#" href="/users">
      <li>{t.users}</li>
    </Link>,
    <Link key="departments" href="/departments">
      <li>{t.depart}</li>
    </Link>,
  ];
  const adminContent = [
    <Link key="admin-menu" href="/admin">
      <li>{t.admin}</li>
    </Link>,
  ];

  const checkUsersRole = () => {
    if (user) {
      if (user.role === 'student' || user.role === 'tutor') {
        return userContent;
      }
      if (user.role === 'moderator' || user.role === 'admin') {
        return adminContent;
      }
    }
  };

  return (
    <div className="navigation_mobile">
      <div className="navigation_mobile_controllers">
        <Link href="/" className="logo">
          <Image className="logo-image" src="/logo.png" alt="Logo" width={43} height={43} priority />
        </Link>
        <div className="language_switcher">
          <select name="" id="">
            <option value="en">EN</option>
            <option value="ru">RU</option>
          </select>
        </div>

        {user ? (
          <div className="mobile_users_menu">
            {searchStatus ? (
              <div id="searchForm" className="search_form">
                <form onSubmit={submitSearchForm}>
                  <input className="search_form_input" type="text" placeholder="Search" />
                </form>
              </div>
            ) : (
              <button className="mobile_btn search_btn" onClick={openSearchForm}>
                Search
              </button>
            )}

            <Link href="#">
              <button className="mobile_btn favourites_btn">
                <span>1</span>
              </button>
            </Link>
            <Link href="#">
              <button className="mobile_btn purchases_btn">
                <span>1</span>
              </button>
            </Link>
            <button className="mobile_btn side_menu_btn" onClick={openMobileSideMenu}>
              Navigation Menu
            </button>
          </div>
        ) : (
          <div className="anonymous_menu">
            <button className="button login_btn" onClick={() => dispatch(switchLoginModalWindow())}>
              Login
            </button>
            <button className="button sign-up_btn" onClick={() => dispatch(switchRegistrationModalWindow())}>
              Sign Up
            </button>
          </div>
        )}
      </div>
      <div id="mobileSideMenuBackdrop" className="mobile_side_menu_backdrop" onClick={closeMobileSideMenu}>
        <div id="mobileSideMenu" className="mobile_side_menu" onClick={(event) => event.stopPropagation()}>
          <div className="mobile_side_menu_header">
            <span>Hello, {user?.firstName}</span>
            <Avatar sx={{ width: '37px', height: '37px' }} src={avatar!} />
          </div>
          <div className="mobile_side_menu_body">
            <nav>
              <ul>{checkUsersRole()}</ul>
            </nav>
          </div>
          <div className="mobile_side_menu_footer">
            <button onClick={handleLogout}>{t.logout}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
