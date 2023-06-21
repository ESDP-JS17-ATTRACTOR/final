import React, { useState } from 'react';
import { Modal } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  selectRegisterError,
  selectRegisterLoading,
  selectRegisterModalWindowStatus,
  switchLoginModalWindow,
  switchRegistrationModalWindow,
  unsetErrors,
} from '@/features/users/usersSlice';
import Link from 'next/link';
import FacebookLoginButton from '@/components/FacebookLoginButton/FacebookLoginButton';
import { ru } from '../../../../public/locales/ru/auth';
import { en } from '../../../../public/locales/en/auth';
import { googleLogin, register } from '@/features/users/usersThunks';
import { RegisterMutation } from '../../../../types';
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/router';

const initialState: RegisterMutation = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
};

const Registration = () => {
  const router = useRouter();
  const t = router.locale === 'ru' ? ru : en;
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(selectRegisterModalWindowStatus);
  const loading = useAppSelector(selectRegisterLoading);
  const error = useAppSelector(selectRegisterError);
  const [state, setState] = useState<RegisterMutation>(initialState);
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const closeRegistrationModalWindow = async () => {
    await dispatch(switchRegistrationModalWindow());
    await setState(initialState);
    await setConfirmedPassword('');
    await dispatch(unsetErrors());
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const confirmPasswordInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmedPassword(event.target.value);
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await dispatch(register(state)).unwrap();
      await setState(initialState);
      await setConfirmedPassword('');
      await closeRegistrationModalWindow();
      await dispatch(unsetErrors());
    } catch (e) {
      throw e;
    }
  };

  const googleLoginHandler = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      await dispatch(googleLogin(tokenResponse.access_token)).unwrap();
      await closeRegistrationModalWindow();
    },
  });

  const openLoginWindow = () => {
    dispatch(switchRegistrationModalWindow());
    dispatch(switchLoginModalWindow());
  };

  return (
    <Modal open={isModalOpen} onClose={closeRegistrationModalWindow}>
      <div className="registration">
        <div className="registration-header">
          <h4 className="registration-header_title">{t.registration}</h4>
        </div>
        <form className="registration-form" onSubmit={submitFormHandler}>
          <div className="registration-form_box">
            <label htmlFor="registerEmail">{error?.email ? <b>{error.email}</b> : t.email}</label>
            <input
              pattern={'^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(.\\w{2,3})+$'}
              title="Please Enter a Valid Email Address (example@example.com)"
              type="email"
              id="registerEmail"
              name="email"
              placeholder={t.enterEmail}
              required={true}
              value={state.email}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="registration-form_box">
            <label htmlFor="registerFirstName">{error?.firstName ? <b>{error?.firstName}</b> : t.firstName}</label>
            <input
              pattern={'^[a-zA-Z-]+$'}
              title="Only letters and hyphens allowed"
              type="text"
              id="registerFirstName"
              name="firstName"
              placeholder={t.enterFirstName}
              required={true}
              value={state.firstName}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="registration-form_box">
            <label htmlFor="registerLastName">{error?.lastName ? <b>{error?.lastName}</b> : t.lastName}</label>
            <input
              pattern={'^[a-zA-Z-]+$'}
              title="Only letters and hyphens allowed"
              type="text"
              id="registerLastName"
              name="lastName"
              placeholder={t.enterLastName}
              required={true}
              value={state.lastName}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="registration-form_box">
            <label htmlFor="registerPassword">{error?.password ? <b>{error?.password}</b> : t.password}</label>
            <input
              pattern={'^.{8,}$'}
              title="The password should be at least 8 characters long"
              type="password"
              id="registerPassword"
              name="password"
              placeholder={t.enterPassword}
              required={true}
              value={state.password}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="registration-form_box">
            <label htmlFor="confirmingPassword">{error?.passDouble ? <b>{error?.passDouble}</b> : t.passConfirm}</label>
            <input
              pattern={state.password !== confirmedPassword ? '' : undefined}
              title="Passwords do not match"
              type="password"
              id="confirmingPassword"
              name="confirmedPassword"
              placeholder={t.passConfirm}
              required={true}
              value={confirmedPassword}
              onChange={confirmPasswordInputChangeHandler}
            />
          </div>
          <div className="remember_box">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <div className="registration-form_box_links">
            <Link href="#" onClick={openLoginWindow}>
              Already registered?
            </Link>
          </div>
          <button
            type="submit"
            className={loading ? 'button register_signup_btn disabled' : 'button register_signup_btn'}
            disabled={loading}
          >
            {loading ? <span className="loader"></span> : 'Sign Up'}
          </button>
        </form>
        <div className="registration-footer">
          <h5>Sign up with</h5>
          <div className="registration-footer_buttons">
            <FacebookLoginButton />
            <button className="social_auth_btn auth_linkedin">Linkedin</button>
            <button className="social_auth_btn auth_google" onClick={() => googleLoginHandler()}></button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Registration;
