import React from "react";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "@/components/UI/Header/LanguageSwitcher";
import Search from "@/components/UI/Header/Search";
import UsersMenu from "@/components/UI/Header/UsersMenu";
import AnonymousMenu from "@/components/UI/Header/AnonymousMenu";
import { useAppSelector } from "@/app/hooks";
import { selectUser } from "@/features/users/usersSlice";

const DesktopNavigation = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className="desktop_navigation">
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
      <nav className="main-nav" style={{display: user ? "flex" : "none"}}>
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
  );
};

export default DesktopNavigation;