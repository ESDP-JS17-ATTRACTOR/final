import React from 'react';
import Link from "next/link";

const AnonymousMenu = () => {
    return (
        <div>
            <Link href="/login">
                <button className="login_btn">Login</button>
            </Link>
            <Link href="/register">
                <button className="sign-up_btn">Sign up</button>
            </Link>
        </div>
    );
};

export default AnonymousMenu;