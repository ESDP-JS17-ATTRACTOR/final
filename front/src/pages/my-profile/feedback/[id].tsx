import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import CardForStudentHomework from '@/components/Cards/CardForStudentHomework';
import { fetchHomeworks } from '@/features/homeworks/homeworksThunks';
import {
  addFeedback,
  checkStudentHomework,
  FeedbackMutation,
  fetchStudentHomework,
} from '@/features/studentHomeworks/studentHomeworksThunks';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useRouter } from 'next/router';
import { selectHomeworks } from '@/features/homeworks/homeworksSlice';
import { selectStudentHomework } from '@/features/studentHomeworks/studentHomeworksSlice';
import { Feedback } from '../../../../types';

const Feedback = () => {
  const dispatch = useAppDispatch();
  const homeworks = useAppSelector(selectHomeworks);
  const studentHomework = useAppSelector(selectStudentHomework);
  const studentHomeworkId = useRouter().query.id as string;
  const [showDescription, setShowDescription] = useState(false);
  const [state, setState] = useState<Feedback>({
    feedback: '',
  });

  const toggleTitle = () => {
    setShowDescription(!showDescription);
  };

  useEffect(() => {
    if (studentHomeworkId) {
      void dispatch(fetchStudentHomework(studentHomeworkId as string));
    }
    void dispatch(fetchHomeworks());
  }, [dispatch, studentHomeworkId]);

  useEffect(() => {
    if (studentHomework) {
      if (studentHomework.feedback) {
        setState((prevState) => ({
          ...prevState,
          feedback: studentHomework.feedback,
        }));
      }
    }
    void dispatch(fetchHomeworks());
  }, [dispatch, studentHomework]);

  const onCheckedClick = async (id: string) => {
    await dispatch(checkStudentHomework(id));
    void dispatch(fetchStudentHomework(studentHomeworkId as string));
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const feedbackMutation: FeedbackMutation = {
      id: studentHomeworkId,
      feedback: state.feedback,
    };
    void dispatch(addFeedback(feedbackMutation));
  };

  let info = null;

  if (studentHomework) {
    const homework = homeworks.find((homework) => homework.id === studentHomework.homework.id);
    info = (
      <CardForStudentHomework
        key={studentHomework.id}
        checked={() => onCheckedClick(studentHomework.id)}
        status={studentHomework.status}
        id={homework?.id}
        title={homework?.title}
        date={dayjs(studentHomework.date).format('DD MMMM YYYY')}
        studentName={studentHomework.studentName}
        isChecked={studentHomework.isChecked}
        onTitleClick={toggleTitle}
        showInfo={showDescription}
        studentFiles={studentHomework.studentFiles}
        feedback={studentHomework.feedback}
      />
    );
  }

  return (
    <div className="container">
      <div className="homework-block-feedback">
        <h2>Homework</h2>
        <div className="homework-headlines-block">
          <div style={{ width: '90px', overflow: 'hidden' }}>
            <p>ID</p>
          </div>
          <div style={{ width: '380px', overflow: 'hidden' }}>
            <p>Articles</p>
          </div>
          <div style={{ width: '280px', overflow: 'hidden' }}>
            <p>Added date</p>
          </div>
          <div style={{ width: '130px', overflow: 'hidden' }}>
            <p>Status</p>
          </div>
          <div style={{ width: '150px', overflow: 'hidden' }}>
            <p>Student name</p>
          </div>
          <div style={{ width: '170px', overflow: 'hidden' }}>
            <p>Is checked</p>
          </div>
        </div>
        {info}
      </div>
      <form style={{ marginTop: '10px' }} onSubmit={onFormSubmit}>
        <div className="profile-edit-form_box">
          <input
            type="text"
            id="Feedback"
            name="feedback"
            placeholder="Введите рецензию к домашнему заданию"
            required={true}
            value={state.feedback}
            onChange={inputChangeHandler}
          />
        </div>
        <button className="button feedback-btn">Feedback</button>
      </form>
    </div>
  );
};

export default Feedback;
