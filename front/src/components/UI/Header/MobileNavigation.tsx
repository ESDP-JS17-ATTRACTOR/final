import React, { useState } from "react";
import Link from "next/link";
import { Avatar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useRouter } from "next/router";
import { logout } from "@/features/users/usersThunks";
import { selectUser } from "@/features/users/usersSlice";

const MobileNavigation = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const [searchStatus, setSearchStatus] = useState(false);
  const openMobileSideMenu = () => {
    document.getElementById("mobileSideMenuBackdrop")!.style.width = "100%";
    document.getElementById("mobileSideMenu")!.style.width = "300px";
  };

  const closeMobileSideMenu = () => {
    document.getElementById("mobileSideMenuBackdrop")!.style.width = "0";
    document.getElementById("mobileSideMenu")!.style.width = "0";
  };

  const openSearchForm = () => {
    setSearchStatus(true);
  };

  const submitSearchForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchStatus(false);
  }

  const closeSearchForm = () => {
    setSearchStatus(false);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    await router.push('/');
  };

  return (
    <div className="navigation_mobile">
      <div className="navigation_mobile_controllers">
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
                  <input
                    className="search_form_input"
                    type="text"
                    placeholder="Search"
                  />
                </form>
              </div>
            ) : (
              <button
                className="mobile_btn search_btn"
                onClick={openSearchForm}
              >
                Search
              </button>
            )}


            <Link href="/my_favourites">
              <button className="mobile_btn favourites_btn">
                <span>1</span>
              </button>
            </Link>
            <Link href="/my_purchases">
              <button className="mobile_btn purchases_btn">
                <span>1</span>
              </button>
            </Link>
            <button
              className="mobile_btn side_menu_btn"
              onClick={openMobileSideMenu}
            >
              Navigation Menu
            </button>
          </div>
        ) : (
          <div className="anonymous_menu">
            <Link href="/authorization">
              <button className="button login_btn">Login</button>
            </Link>
            <Link href="/register">
              <button className="button sign-up_btn">Sign Up</button>
            </Link>
          </div>
        )}

      </div>
      <div
        id="mobileSideMenuBackdrop"
        className="mobile_side_menu_backdrop"
        onClick={closeMobileSideMenu}
      >
        <div
          id="mobileSideMenu"
          className="mobile_side_menu"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mobile_side_menu_header">
            <span>Hello, User</span>
            <Avatar sx={{width: "37px", height: "37px"}}/>
          </div>

          <div className="mobile_side_menu_body">
            <nav>
              <ul>
                <Link href="/myProfile/myProfile"><li>My profile</li></Link>
                <Link href="/my-documents"><li>My documents</li></Link>
                <Link href="/catalogs"><li>Catalogs</li></Link>
                <Link href=""><li>My favourites</li></Link>
                <Link href=""><li>Articles</li></Link>
                <Link href=""><li>Users</li></Link>
                <Link href=""><li>Departments</li></Link>
              </ul>
            </nav>
          </div>

          <div className="mobile_side_menu_footer">
            <button
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;