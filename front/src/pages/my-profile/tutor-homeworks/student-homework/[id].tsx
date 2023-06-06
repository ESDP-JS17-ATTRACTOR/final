import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useRouter } from 'next/router';
import { fetchTutorHomeworkById } from '@/features/homeworks/homeworksThunks';
import { selectStudentHomework } from '@/features/homeworks/homeworksSlice';

const StudentHomework = () => {
  const dispatch = useAppDispatch();
  const studentHomework = useAppSelector(selectStudentHomework);
  const homeworkId = useRouter().query.id;

  useEffect(() => {
    if (homeworkId) {
      dispatch(fetchTutorHomeworkById(homeworkId as string));
    }
  }, [dispatch, homeworkId]);

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
          <tbody className="table-body">
            <tr>
              <td>{studentHomework?.id}</td>
              <td>{studentHomework?.homework?.title}</td>
              <td>25 Oct 2021</td>
              <td className="homework-status">{studentHomework?.status}</td>
              <td>{studentHomework?.studentName}</td>
              <td className="edit-status">
                <button>Edit status</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="tutor-homeworks-block-footer">
        <div>
          <p>{studentHomework?.homework?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentHomework;
