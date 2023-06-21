import React from 'react';
import Link from 'next/link';
import { useAppDispatch } from '@/app/hooks';
import { switchModalWindow } from '@/features/users/usersSlice';

const AnonymousMenu = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <Link href="/authorization">
        <button className="login_btn" onClick={() => dispatch(switchModalWindow())}>
          Login
        </button>
      </Link>
      <button className="sign-up_btn" onClick={() => dispatch(switchModalWindow())}>
        Sign up
      </button>
    </div>
  );
};

export default AnonymousMenu;
