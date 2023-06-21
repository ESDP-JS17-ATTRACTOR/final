import React from 'react';
import { useAppDispatch } from '@/app/hooks';
import { switchLoginModalWindow, switchRegistrationModalWindow } from '@/features/users/usersSlice';

const AnonymousMenu = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <button className="login_btn" onClick={() => dispatch(switchLoginModalWindow())}>
        Login
      </button>
      <button className="sign-up_btn" onClick={() => dispatch(switchRegistrationModalWindow())}>
        Sign up
      </button>
    </div>
  );
};

export default AnonymousMenu;
