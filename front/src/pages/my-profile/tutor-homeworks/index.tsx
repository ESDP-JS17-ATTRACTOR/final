import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchTutorsHomeworks } from '@/features/homeworks/homeworksThunks';
import { selectTutorsHomeworks } from '@/features/homeworks/homeworksSlice';

const TutorHomeworks = () => {
  const dispatch = useAppDispatch();
  const tutorHomeworks = useAppSelector(selectTutorsHomeworks);

  const tutorHomeworksContent = tutorHomeworks
    ? tutorHomeworks.map((homework) => {
        return (
          <tr key={homework.id}>
            <td>{homework.id}</td>
            <td>{homework.homework.title}</td>
            <td>25 Oct 2021</td>
            <td className="homework-status">{homework.status}</td>
            <td>{homework.studentName}</td>
            <td className="edit-status">
              <button>Edit status</button>
            </td>
          </tr>
        );
      })
    : null;

  useEffect(() => {
    dispatch(fetchTutorsHomeworks());
  }, [dispatch]);

  return (
    <div className="tutor-homeworks-block container">
      <div className="tutor-homeworks-block-header">
        <h5 className="tutor-homeworks-block-header_title">Tutor Homework</h5>
      </div>
      <div className="tutor-homeworks-block-main">
        <table className="tutor-homeworks-main_table">
          <thead className="table-header">
            <tr>
              <th>ID</th>
              <th>Articles</th>
              <th>Added Date</th>
              <th>Status</th>
              <th>Creator Name</th>
            </tr>
          </thead>
          <tbody className="table-body">{tutorHomeworksContent}</tbody>
        </table>
      </div>
      <div className="tutor-homeworks-block-footer">
        <div className="tutor-homeworks-block-footer_controls">
          <span>Add new homework</span>
          <button className="button add-new-homework-button"></button>
        </div>
      </div>
    </div>
  );
};

export default TutorHomeworks;
