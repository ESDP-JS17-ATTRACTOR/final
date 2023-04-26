import React, {useState} from 'react';
import CardForHomework from "@/components/UI/CardForHomework";
import {editUserProfile} from "@/features/users/usersThunks";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {useRouter} from "next/router";
import {selectUser} from "@/features/users/usersSlice";
import {ProfileMutation} from "../../types";

const MyProfile = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const user = useAppSelector(selectUser);
    const [showForm, setShowForm] = useState(false);
    const initialState = user ? {email: user.email, firstName: user.firstName, country: user.country} : {email: "", firstName: "", country: ""}
    const [state, setState] = useState<ProfileMutation>(initialState);

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setState((prevState => ({...prevState, [name]: value})));
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        await dispatch(editUserProfile(state));
        setShowForm(false);
        await router.push('/myProfile');
    };

    const onEditClick = () => {
        setShowForm(true);
    }

    return (
        <div className="container">
            <div className="profile-block">
                <h1>My Profile</h1>
                <div className="profile-main-info-block">
                    <div><img className="profile-avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU0VGHL3JrJAD7mgw9FP77qpKv0IuIv_p2hg&usqp=CAU" alt=""/></div>
                    { !showForm &&<div className="profile-info-block">
                        <div>
                            <h5>Email:</h5><span> {user?.email}</span>
                        </div>
                        <div>
                            <h5>Full name:</h5><span> {user?.firstName}</span>
                        </div>
                        <div>
                            <h5>Country:</h5><span> {user?.country}</span>
                        </div>
                        <button className="button profile-btn-edit" onClick={onEditClick}>Edit</button>
                    </div>}
                    { showForm && <form id="form-id" onSubmit={submitFormHandler}>
                        <div className="profile-edit-form_box">
                            <label>Email</label>
                            <input
                                type="email"
                                id="Email"
                                name="email"
                                placeholder="Введите почтовый адрес"
                                required={true}
                                value={state.email}
                                onChange={inputChangeHandler}
                            />
                        </div>
                        <div className="profile-edit-form_box">
                            <label>First name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="Введите имя"
                                required={true}
                                value={state.firstName}
                                onChange={inputChangeHandler}
                            />
                        </div>
                        <div className="profile-edit-form_box">
                            <label>Country</label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                placeholder="Введите страну проживания"
                                required={true}
                                value={state.country}
                                onChange={inputChangeHandler}
                            />
                        </div>
                        <button className="button profile-btn-save">Save</button>
                    </form>}
                </div>
            </div>
            <div className="homework-block">
                <h2>Homework</h2>
                <div className="homework-headlines-block">
                    <p>ID</p>
                    <p style={{marginLeft: "250px"}}>Articles</p>
                    <p style={{marginLeft: "250px"}}>Added date</p>
                    <p style={{marginLeft: "90px"}}>Status</p>
                    <p style={{marginLeft: "90px"}}>Tutor name</p>
                </div>
                <CardForHomework/>
                <CardForHomework/>
            </div>
        </div>
    );
};

export default MyProfile;