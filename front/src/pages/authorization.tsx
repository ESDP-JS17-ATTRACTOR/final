import React, { useState } from 'react';
import { Modal } from '@mui/material';
import Home from '@/pages/index';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  selectLoginError,
  selectModalWindowStatus,
  selectPasswordError,
  switchModalWindow,
} from '@/features/users/usersSlice';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { LoginMutation } from '../../types';
import { googleLogin, login, recoverPassword } from '@/features/users/usersThunks';
import { en } from '../../public/locales/en/auth';
import { ru } from '../../public/locales/ru/auth';
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLoginButton from '@/components/FacebookLoginButton/FacebookLoginButton';

const Authorization = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const t = router.locale === 'en' ? en : ru;
  const modalWindowStatus = useAppSelector(selectModalWindowStatus);
  const [modalRecoverWindowStatus, setModalRecoverWindowStatus] = useState(false);
  const loginError = useAppSelector(selectLoginError);
  const passwordError = useAppSelector(selectPasswordError);
  const [state, setState] = useState<LoginMutation>({
    email: '',
    password: '',
  });
  const [email, setEmail] = useState('');

  const openRecoverPasswordModal = () => {
    setModalRecoverWindowStatus(true);
  };

  const closeRecoverPasswordModal = () => {
    setModalRecoverWindowStatus(false);
    setEmail('');
  };

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

  const submitRecoverPasswordFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(recoverPassword(email)).unwrap();
      closeRecoverPasswordModal();
    } catch (e) {
      throw e;
    }
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
              <Link onClick={openRecoverPasswordModal} href="#">
                {t.forgotPassword}
              </Link>
              <Link href="/register">{t.createAcc}</Link>
            </div>
            <button type="submit" className="button auth_login_btn">
              {t.login}
            </button>
          </form>
          <div className="authorization-footer">
            <h5>{t.signInNow}</h5>
            <div className="authorization-footer_buttons">
              <FacebookLoginButton />
              <button className="social_auth_btn auth_linkedin">Linkedin</button>
              <button className="social_auth_btn auth_google" onClick={() => googleLoginHandler()}>
                Google+
              </button>
            </div>
          </div>
          <Modal open={modalRecoverWindowStatus} onClose={closeRecoverPasswordModal}>
            <div className="recover-password">
              <div className="recover-password-header">
                <h4 className="recover-password-header_title">Recover Password</h4>
              </div>
              <form className="recover-password-form" onSubmit={submitRecoverPasswordFormHandler}>
                <div className="recover-password-form_box">
                  <label htmlFor="authEmail">{passwordError ? <b>{passwordError.message}</b> : t.email}</label>
                  <input
                    type="email"
                    id="recoverPasswordEmail"
                    name="recoverPasswordEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                  />
                </div>
                <button type="submit" className="button recover-password_btn">
                  Reset your password
                </button>
              </form>
            </div>
          </Modal>
        </div>
      </Modal>
    </Home>
  );
};

export default Authorization;
