import React, {useState} from 'react';
import {Modal} from "@mui/material";
import {RegisterMutation} from "../../types";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {register} from "@/features/users/usersThunks";
import {useRouter} from "next/router";
import Link from "next/link";
import {selectModalWindowStatus, switchModalWindow} from "@/features/users/usersSlice";
import Home from "@/pages/index";

const Register = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
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
    }

    return (
        <Home>
            <Modal
                open={modalWindowStatus}
                onClose={closeRegistrationModalWindow}
            >
                <div className="registration">
                    <div className="registration-header">
                        <h4 className="registration-header_title">Registration</h4>
                    </div>
                    <form
                        className="registration-form"
                        onSubmit={submitFormHandler}
                    >
                        <div className="registration-form_box">
                            <label htmlFor="registerEmail">
                                E-mail
                            </label>
                            <input
                                type="email"
                                id="registerEmail"
                                name="email"
                                placeholder="Enter your e-mail"
                                required={true}
                                value={state.email}
                                onChange={inputChangeHandler}
                            />
                        </div>
                        <div className="registration-form_box">
                            <label htmlFor="registerFirstName">
                                First name
                            </label>
                            <input
                                type="text"
                                id="registerFirstName"
                                name="firstName"
                                placeholder="Enter your first name"
                                required={true}
                                value={state.firstName}
                                onChange={inputChangeHandler}
                            />
                        </div>
                        <div className="registration-form_box">
                            <label htmlFor="registerLastName">
                                Last name
                            </label>
                            <input
                                type="text"
                                id="registerLastName"
                                name="lastName"
                                placeholder="Enter your last name"
                                required={true}
                                value={state.lastName}
                                onChange={inputChangeHandler}
                            />
                        </div>
                        <div className="registration-form_box">
                            <label htmlFor="registerPassword">
                                Password
                            </label>
                            <input
                                type="password"
                                id="registerPassword"
                                name="password"
                                placeholder="Enter your password"
                                required={true}
                                value={state.password}
                                onChange={inputChangeHandler}
                            />
                        </div>
                        <div className="registration-form_box">
                            <label htmlFor="confirmingPassword">
                                {validationError ? <b>{validationError}</b> : "Confirm your password"}
                            </label>
                            <input
                                type="password"
                                id="confirmingPassword"
                                name="confirmedPassword"
                                placeholder="Confirm your password"
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
                            <label htmlFor="rememberMe">Remember me</label>
                        </div>
                        <div className="registration-form_box_links">
                            <Link href="/authorization">Already have an account? Log in</Link>
                        </div>
                        <button
                            type="submit"
                            className="button register_signup_btn"
                        >
                            Sign Up
                        </button>
                    </form>
                    <div className="registration-footer">
                        <h5>Sign up with</h5>
                        <div className="registration-footer_buttons">
                            <button className="social_auth_btn auth_facebook">Facebook</button>
                            <button className="social_auth_btn auth_linkedin">Linkedin</button>
                            <button className="social_auth_btn auth_google">Google+</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </Home>
    );
};

export default Register;