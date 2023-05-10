import React, { useEffect, useState } from 'react';
import CardForHomework from '@/components/Cards/CardForHomework';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useRouter } from 'next/router';
import { selectUser } from '@/features/users/usersSlice';
import { ApiHomework, ApiStudentHomework, ValidationError } from '../../../types';
import FormForHomework from '@/components/UI/MyProfile/FormForHomework';
import { addHomework, fetchHomeworks } from '@/features/homeworks/homeworksThunks';
import FormForStudentHomework from '@/components/UI/MyProfile/FormForStudentHomework';
import {
  addStudentHomework,
  checkStudentHomework,
  fetchStudentHomeworks,
} from '@/features/studentHomeworks/studentHomeworksThunks';
import { selectHomeworks } from '@/features/homeworks/homeworksSlice';
import { selectStudentHomeworks } from '@/features/studentHomeworks/studentHomeworksSlice';
import CardForStudentHomework from '@/components/Cards/CardForStudentHomework';
import { Modal } from '@mui/material';
import dayjs from 'dayjs';
import FormForEditProfile from '@/components/UI/MyProfile/FormForEditProfile';

const MyProfile = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const homeworks = useAppSelector(selectHomeworks);
  const studentHomeworks = useAppSelector(selectStudentHomeworks);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [validationError, setValidationError] = useState<ValidationError | null>(null);

  useEffect(() => {
    void dispatch(fetchHomeworks());
    void dispatch(fetchStudentHomeworks());
  }, [dispatch]);

  const onEditClick = () => {
    setShowForm(true);
  };

  const onSubmit = async (homework: ApiHomework) => {
    await dispatch(addHomework(homework));
    setShowModal(false);
  };

  const onSubmitStudent = async (studentHomework: ApiStudentHomework) => {
    try {
      await dispatch(addStudentHomework(studentHomework)).unwrap();
      await dispatch(fetchStudentHomeworks());
      setValidationError(null);
      setShowModal(false);
    } catch (error) {
      setValidationError(error as ValidationError);
    }
  };

  const onCheckedClick = async (id: string) => {
    await dispatch(checkStudentHomework(id));
    await dispatch(fetchStudentHomeworks());
  };

  return (
    <div className="container">
      <div className="profile-block">
        <h1>My Profile</h1>
        <div className="profile-main-info-block">
          <div>
            <img
              className="profile-avatar"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU0VGHL3JrJAD7mgw9FP77qpKv0IuIv_p2hg&usqp=CAU"
              alt=""
            />
          </div>
          {!showForm && (
            <div className="profile-info-block">
              <div>
                <   h5>Email:</h5>
                <span> {user?.email}</span>
              </div>
              <div>
                <h5>Full name:</h5>
                <span> {user?.firstName}</span>
              </div>
              <div>
                <h5>Country:</h5>
                <span> {user?.country}</span>
              </div>
              <button className="button profile-btn-edit" onClick={onEditClick}>
                Edit
              </button>
            </div>
          )}
          {showForm && <FormForEditProfile onCloseForm={() => setShowForm(false)} />}
        </div>
      </div>
      {user?.role === 'tutor' && (
        <button onClick={() => router.push('/my-profile/allHomeworks')} className="button profile-btn-add">
          All Homeworks
        </button>
      )}
      <div className="homework-block">
        <h2>Homework</h2>
        <div className="homework-headlines-block">
          <p>ID</p>
          <p style={{ marginLeft: '200px' }}>Articles</p>
          <p style={{ marginLeft: '280px' }}>Added date</p>
          <p style={{ marginLeft: '150px' }}>Status</p>
          {user?.role === 'tutor' ? (
            <p style={{ marginLeft: '85px' }}>Student name</p>
          ) : (
            <p style={{ marginLeft: '85px' }}>Tutor name</p>
          )}
          <p style={{ marginLeft: '70px' }}>Is checked</p>
        </div>
        {user?.role === 'student' &&
          homeworks.map((homework) => {
            const studentHomework = studentHomeworks.find(
              (studentHomework) =>
                studentHomework.homework.id === homework.id && studentHomework.studentEmail === user.email,
            );
            return (
              <CardForHomework
                key={homework.id}
                isChecked={studentHomework ? studentHomework.isChecked : 'Not Checked'}
                status={studentHomework ? studentHomework.status : 'In Process'}
                id={homework.id}
                title={homework.title}
                date={dayjs(homework.date).format('DD MMMM YYYY')}
                tutorName={homework.tutorName}
                description={homework.description}
                pdf={homework.pdf}
              />
            );
          })}
        {user?.role === 'tutor' &&
          studentHomeworks.map((studentHomework) => {
            const homework = homeworks.find((homework) => homework.id === studentHomework.homework.id);

            return (
              <CardForStudentHomework
                key={studentHomework.id}
                checked={() => onCheckedClick(studentHomework.id)}
                status={studentHomework.status}
                id={homework?.id}
                title={homework?.title}
                date={dayjs(studentHomework.date).format('DD MMMM YYYY')}
                studentName={studentHomework.studentName}
                isChecked={studentHomework.isChecked}
              />
            );
          })}
      </div>
      <button onClick={() => setShowModal(true)} className="button profile-btn-add">
        Add Homework
      </button>
      {user?.role === 'tutor' && (
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <FormForHomework onSubmit={onSubmit} />
        </Modal>
      )}
      {user?.role === 'student' && (
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <FormForStudentHomework
            onSubmit={onSubmitStudent}
            closeModal={() => setShowModal(false)}
            error={validationError?.message}
          />
        </Modal>
      )}
    </div>
  );
};

export default MyProfile;
