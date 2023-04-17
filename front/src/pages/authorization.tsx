import React, {useState} from 'react';
import {Modal} from "@mui/material";
import Home from "@/pages/index";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {selectModalWindowStatus, switchModalWindow} from "@/features/users/usersSlice";
import {useRouter} from "next/router";
import Link from "next/link";
import {LoginMutation} from "../../types";
import {login} from "@/features/users/usersThunks";

const Authorization = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const modalWindowStatus = useAppSelector(selectModalWindowStatus);
    const [state, setState] = useState<LoginMutation>({
        email: "",
        password: "",
    });

    const closeAuthorizationModalWindow = async () => {
        await dispatch(switchModalWindow());
        await router.push('/');
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setState((prevState => ({...prevState, [name]: value})));
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await dispatch(login(state)).unwrap();
            await router.push('/');
        } catch (e) {
            throw new Error();
        }
    };

    return (
        <Home>
            <Modal
                open={modalWindowStatus}
                onClose={closeAuthorizationModalWindow}
            >
                <div className="authorization">
                    <div className="authorization-header">
                        <h4 className="authorization-header_title">Authorization</h4>
                    </div>
                    <form
                        className="authorization-form"
                        onSubmit={submitFormHandler}
                    >
                        <div className="authorization-form_box">
                            <label htmlFor="authEmail">E-mail</label>
                            <input
                                type="email"
                                id="authEmail"
                                name="email"
                                placeholder="Enter your e-mail"
                                required={true}
                                value={state.email}
                                onChange={inputChangeHandler}
                            />
                        </div>
                        <div className="authorization-form_box">
                            <label htmlFor="authPassword">Password</label>
                            <input
                                type="password"
                                id="authPassword"
                                name="password"
                                placeholder="Enter your password"
                                required={true}
                                value={state.password}
                                onChange={inputChangeHandler}
                            />
                        </div>
                        <div className="remember_box">
                            <input
                                type="checkbox"
                                id="rememberMe"
                            />
                            <label htmlFor="rememberMe">Remember me</label>
                        </div>
                        <div className="authorization-form_box_links">
                            <Link href="#">Forgot password</Link>
                            <Link href="/register">Create an account</Link>
                        </div>
                        <button
                            type="submit"
                            className="button auth_login_btn"
                        >
                            Login
                        </button>
                    </form>
                    <div className="authorization-footer">
                        <h5>Sign in now</h5>
                        <div className="authorization-footer_buttons">
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

export default Authorization;