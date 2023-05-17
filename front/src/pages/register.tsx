import React, {useState} from 'react';
import {Modal} from "@mui/material";
import {RegisterMutation} from "../../types";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {googleLogin, register} from "@/features/users/usersThunks";
import {useRouter} from "next/router";
import Link from "next/link";
import {selectModalWindowStatus, switchModalWindow} from "@/features/users/usersSlice";
import Home from "@/pages/index";
import {en} from '../../public/locales/en/auth';
import {ru} from '../../public/locales/ru/auth';
import {useGoogleLogin} from "@react-oauth/google";
import FacebookLoginButton from "@/components/FacebookLoginButton/FacebookLoginButton";

const Register = () => {
    const router = useRouter();
    const t = router.locale === 'ru' ? ru : en;
    const dispatch = useAppDispatch();
    const modalWindowStatus = useAppSelector(selectModalWindowStatus);
    const [state, setState] = useState<RegisterMutation>({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
    });
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [validationError, setValidationError] = useState<string | null>(null);

    const closeRegistrationModalWindow = async () => {
        await dispatch(switchModalWindow());
        await router.push('/');
    };

    const confirmPasswordInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmedPassword(event.target.value);
    };

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setState((prevState => ({...prevState, [name]: value})));
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        if (state.password !== confirmedPassword) {
            setValidationError("Passwords do not match");
            return;
        }

        try {
            await dispatch(register(state)).unwrap();
            await router.push('/');
        } catch (e) {
            throw new Error();
        }
    };

    const googleLoginHandler = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            await dispatch(googleLogin(tokenResponse.access_token)).unwrap()
            await router.push('/');
        }
    });

    return (
        <Home>
            <Modal
                open={modalWindowStatus}
                onClose={closeRegistrationModalWindow}
            >
                <div className="registration">
                    <div className="registration-header">
                        <h4 className="registration-header_title">{t.registration}</h4>
                    </div>
                    <form
                        className="registration-form"
                        onSubmit={submitFormHandler}
                    >
                        <div className="registration-form_box">
                            <label htmlFor="registerEmail">
                                {t.email}
                            </label>
                            <input
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
                            <label htmlFor="registerFirstName">
                                {t.firstName}
                            </label>
                            <input
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
                            <label htmlFor="registerLastName">
                                {t.lastName}
                            </label>
                            <input
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
                            <label htmlFor="registerPassword">
                                {t.password}
                            </label>
                            <input
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
                            <label htmlFor="confirmingPassword">
                                {validationError ? <b>{validationError}</b> : t.passConfirm}
                            </label>
                            <input
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
                            <input
                                type="checkbox"
                                id="rememberMe"
                            />
                            <label htmlFor="rememberMe">{t.rememberMe}</label>
                        </div>
                        <div className="registration-form_box_links">
                            <Link href="/authorization">{t.alreadyLogin}</Link>
                        </div>
                        <button
                            type="submit"
                            className="button register_signup_btn"
                        >
                            {t.signUp}
                        </button>
                    </form>
                    <div className="registration-footer">
                        <h5>{t.signUpWith}</h5>
                        <div className="registration-footer_buttons">
                            <FacebookLoginButton/>
                            <button className="social_auth_btn auth_linkedin">Linkedin</button>
                            <button
                                className="social_auth_btn auth_google"
                                onClick={() => googleLoginHandler()}
                            >
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </Home>
    );
};

export default Register;