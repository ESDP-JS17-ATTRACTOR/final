import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {ReactFacebookLoginInfo} from "react-facebook-login";
import {useAppDispatch} from "@/app/hooks";
import {facebookLogin} from "@/features/users/usersThunks";
import {router} from "next/client";

const FacebookLoginButton = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFacebookResponse = async (response: ReactFacebookLoginInfo) => {
    setLoading(false);

    if (response.accessToken) {
      const { accessToken, userID } = response;
      await dispatch(facebookLogin({accessToken, userID})).unwrap();
      await router.push('/');
    } else {
      console.log("Login failed");
    }
  };

  const handleButtonClick = () => {
    setLoading(true);
  };

  return (
    <FacebookLogin
      appId="590752736360488"
      fields="name,email,picture"
      scope="public_profile,email"
      callback={handleFacebookResponse}
      render={({ onClick }) => (
        <button
          className="social_auth_btn auth_facebook"
          onClick={() => { handleButtonClick(); onClick(); }}
          disabled={loading}
        >{loading ? 'Loading...' : 'Facebook'}</button>
      )}
    />
  );
};

export default FacebookLoginButton;