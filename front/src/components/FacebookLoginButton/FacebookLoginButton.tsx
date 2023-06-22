import React from 'react';
import FacebookLogin, { SuccessResponse } from '@greatsumini/react-facebook-login';
import { FACEBOOK_APP_ID } from '../../../constants';
import { useAppDispatch } from '@/app/hooks';
import { facebookLogin } from '@/features/users/usersThunks';
import { switchRegistrationModalWindow, switchLoginModalWindow } from '@/features/users/usersSlice';

const FacebookLoginButton = () => {
  const dispatch = useAppDispatch();

  return (
    <FacebookLogin
      appId={FACEBOOK_APP_ID}
      onSuccess={async (response: SuccessResponse) => {
        await dispatch(facebookLogin({ accessToken: response.accessToken, userID: response.userID }));
        await dispatch(switchRegistrationModalWindow());
        await dispatch(switchLoginModalWindow());
      }}
      onFail={(error) => {
        console.log('Login Failed!', error);
      }}
      className="social_auth_btn auth_facebook"
    />
  );
};

export default FacebookLoginButton;
