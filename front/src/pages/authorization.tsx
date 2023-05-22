import React, { useState } from 'react';
import { Modal } from '@mui/material';
import Home from '@/pages/index';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectLoginError, selectModalWindowStatus, switchModalWindow } from '@/features/users/usersSlice';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { LoginMutation } from '../../types';
import { googleLogin, login } from '@/features/users/usersThunks';
import { en } from '../../public/locales/en/auth';
import { ru } from '../../public/locales/ru/auth';
import { useGoogleLogin } from '@react-oauth/google';

const Authorization = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const t = router.locale === 'en' ? en : ru;
  const modalWindowStatus = useAppSelector(selectModalWindowStatus);
  const loginError = useAppSelector(selectLoginError);
  const [state, setState] = useState<LoginMutation>({
    email: '',
    password: '',
  });

  const closeAuthorizationModalWindow = async () => {
    await dispatch(switchModalWindow());
    await router.push('/');
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(login(state)).unwrap();
    await router.push('/');
  };

  const googleLoginHandler = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      await dispatch(googleLogin(tokenResponse.access_token)).unwrap();
      await router.push('/');
    },
  });

  return (
    <Home>
      <Modal open={modalWindowStatus} onClose={closeAuthorizationModalWindow}>
        <div className="authorization">
          <div className="authorization-header">
            <h4 className="authorization-header_title">{t.authorization}</h4>
          </div>
          <form className="authorization-form" onSubmit={submitFormHandler}>
            <div className="authorization-form_box">
              <label htmlFor="authEmail">{loginError ? <b>{loginError.message}</b> : t.email}</label>
              <input
                type="email"
                id="authEmail"
                name="email"
                placeholder={t.enterEmail}
                required={true}
                value={state.email}
                onChange={inputChangeHandler}
              />
            </div>
            <div className="authorization-form_box">
              <label htmlFor="authPassword">{loginError ? <b>{loginError.message}</b> : t.password}</label>
              <input
                type="password"
                id="authPassword"
                name="password"
                placeholder={t.enterPassword}
                required={true}
                value={state.password}
                onChange={inputChangeHandler}
              />
            </div>
            <div className="remember_box">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">{t.rememberMe}</label>
            </div>
            <div className="authorization-form_box_links">
              <Link href="#">{t.forgotPassword}</Link>
              <Link href="/register">{t.createAcc}</Link>
            </div>
            <button type="submit" className="button auth_login_btn">
              {t.login}
            </button>
          </form>
          <div className="authorization-footer">
            <h5>{t.signInNow}</h5>
            <div className="authorization-footer_buttons">
              <button className="social_auth_btn auth_facebook">Facebook</button>
              <button className="social_auth_btn auth_linkedin">Linkedin</button>
              <button className="social_auth_btn auth_google" onClick={() => googleLoginHandler()}>
                Google+
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </Home>
  );
};

export default Authorization;
