import React, {useEffect, useState} from 'react';
import CardForHomework from "@/components/Cards/CardForHomework";
import {editUserProfile} from "@/features/users/usersThunks";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {useRouter} from "next/router";
import {selectUser} from "@/features/users/usersSlice";
import {ApiHomework, ApiStudentHomework, ProfileMutation} from "../../types";
import FormForHomework from "@/components/UI/MyProfile/FormForHomework";
import {addHomework, fetchHomeworks} from "@/features/homeworks/homeworksThunks";
import FormForStudentHomework from "@/components/UI/MyProfile/FormForStudentHomework";
import {
    addStudentHomework,
    checkStudentHomework,
    fetchStudentHomeworks
} from "@/features/studentHomeworks/studentHomeworksThunks";
import {selectHomeworks} from "@/features/homeworks/homeworksSlice";
import {selectStudentHomeworks} from "@/features/studentHomeworks/studentHomeworksSlice";
import CardForStudentHomework from "@/components/Cards/CardForStudentHomework";
import {Modal} from "@mui/material";

const MyProfile = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const user = useAppSelector(selectUser);
    const homeworks = useAppSelector(selectHomeworks);
    const studentHomeworks = useAppSelector(selectStudentHomeworks);
    const [showForm, setShowForm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const initialState = user ? {email: user.email, firstName: user.firstName, country: user.country} : {email: "", firstName: "", country: ""}
    const [state, setState] = useState<ProfileMutation>(initialState);

    useEffect(() => {
        void dispatch(fetchHomeworks());
        void dispatch(fetchStudentHomeworks());
    }, [dispatch]);

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

    const onAddHomework = () => {
        setShowModal(true);
    }

    const onSubmit = async (homework: ApiHomework) => {
        await dispatch(addHomework(homework));
        setShowModal(false);
    };

    const onSubmitStudent = async (studentHomework: ApiStudentHomework) => {
        await dispatch(addStudentHomework(studentHomework));
        setShowModal(false);
    };

    const onCheckedClick = async (id: string) => {
        await dispatch(checkStudentHomework(id));
        await dispatch(fetchStudentHomeworks());
    }

    const closeModal = () => {
        setShowModal(false);
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
                    { showForm && <form onSubmit={submitFormHandler}>
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
                    <p style={{width: "300px"}}>Articles</p>
                    <p style={{width: "200px"}}>Added date</p>
                    <p>Status</p>
                    <p>Tutor name</p>
                    <p>Is checked</p>
                </div>
                {user?.role === "student" && homeworks.map(homework => {
                    const studentHomework = studentHomeworks.find(studentHomework => studentHomework.homework.id === homework.id);
                     return <CardForHomework key={homework.id} isChecked={studentHomework ? studentHomework.isChecked : 'Not Checked'} status={studentHomework ? studentHomework.status : 'In Process'} id={homework.id} description={homework.description} date={homework.date} tutorName={homework.tutorName} />
                })}
                {user?.role === "tutor" && studentHomeworks.map(studentHomework => {
                    const homework = homeworks.find(homework => homework.id === studentHomework.homework.id);

                    return <CardForStudentHomework key={studentHomework.id} checked={() => onCheckedClick(studentHomework.id)} status={studentHomework.status} id={homework?.id} description={homework?.description} date={homework?.date} studentName={studentHomework.studentName} isChecked={studentHomework.isChecked}/>
                })}
            </div>
            <button onClick={onAddHomework} className="button profile-btn-add">Add Homework</button>
            {user?.role === "tutor" && <Modal
                open={showModal}
                onClose={closeModal}
            >
                <FormForHomework onSubmit={onSubmit}/>
            </Modal>}
            {user?.role === "student" && <Modal
                open={showModal}
                onClose={closeModal}
            >
                <FormForStudentHomework onSubmit={onSubmitStudent}/>
            </Modal>}
        </div>
    );
};

export default MyProfile;