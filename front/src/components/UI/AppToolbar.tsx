import React from 'react';
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "@/components/UI/LanguageSwitcher";
import Search from "@/components/UI/Search";
import AnonymousMenu from "@/components/UI/AnonymousMenu";
import UsersMenu from "@/components/UI/UsersMenu";
import {useAppSelector} from "@/app/hooks";
import {selectUser} from "@/features/users/usersSlice";

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
                                <a className="main-nav_link" href="#">Catalogs</a>
                            </li>
                            <li className="main-nav_item">
                                <a className="main-nav_link" href="#">My favourites</a>
                            </li>
                            <li className="main-nav_item">
                                <a className="main-nav_link" href="#">Articles</a>
                            </li>
                            <li className="main-nav_item">
                                <a className="main-nav_link" href="#">Users</a>
                            </li>
                            <li className="main-nav_item">
                                <a className="main-nav_link" href="#">Departments</a>
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