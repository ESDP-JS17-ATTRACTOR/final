import React from 'react';
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "@/components/UI/header/LanguageSwitcher";
import Search from "@/components/UI/header/Search";
import AnonymousMenu from "@/components/UI/header/AnonymousMenu";
import UsersMenu from "@/components/UI/header/UsersMenu";
import {selectUser} from "@/features/users/usersSlice";
import {useAppSelector} from "@/app/hooks";

const AppToolbar = () => {
    const user = useAppSelector(selectUser);

    return (
      <>
          <header className="header">
              <div className="container">
                  <Link href="/" className="logo">
                      <Image
                        className="logo-image"
                        src="/logo.png"
                        alt="Logo"
                        width={43}
                        height={43}
                        priority
                      />
                  </Link>
                  <nav className="main-nav">
                      <ul className="main-nav_list">
                          <li className="main-nav_item">
                              <a className="main-nav_link" href="front/src/components/UI/header#">Catalogs</a>
                          </li>
                          <li className="main-nav_item">
                              <a className="main-nav_link" href="front/src/components/UI/header#">My favourites</a>
                          </li>
                          <li className="main-nav_item">
                              <a className="main-nav_link" href="front/src/components/UI/header#">Articles</a>
                          </li>
                          <li className="main-nav_item">
                              <a className="main-nav_link" href="front/src/components/UI/header#">Users</a>
                          </li>
                          <li className="main-nav_item">
                              <a className="main-nav_link" href="front/src/components/UI/header#">Departments</a>
                          </li>
                      </ul>
                  </nav>
                  <LanguageSwitcher/>
                  <Search/>
                  {user ? <UsersMenu/> : <AnonymousMenu/>}
              </div>
          </header>
      </>
    );
};

export default AppToolbar;