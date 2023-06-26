import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectHomeworksByTutor } from '@/features/homeworks/homeworksSlice';
import CardForAllHomeworks from '@/components/Cards/CardForAllHomeworks';
import { fetchHomeworksByTutor } from '@/features/homeworks/homeworksThunks';
import IsAuth from '@/components/UI/Auth/IsAuth';

const AllHomeworks = () => {
  const dispatch = useAppDispatch();
  const homeworksByTutor = useAppSelector(selectHomeworksByTutor);

  useEffect(() => {
    void dispatch(fetchHomeworksByTutor());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="allHomeworks-block">
        <h1>All Homeworks</h1>
      </div>
      <div className="homework-headlines-block">
        <p>ID</p>
        <p style={{ marginLeft: '75px' }}>Lesson</p>
        <p style={{ marginLeft: '190px' }}>Articles</p>
        <p style={{ marginLeft: '195px' }}>Added date</p>
        <p style={{ marginLeft: '160px' }}>Pdf</p>
      </div>
      {homeworksByTutor.map((homeworkByTutor) => {
        return (
          <CardForAllHomeworks
            key={homeworkByTutor.id}
            lesson={homeworkByTutor.lesson.title}
            title={homeworkByTutor.title}
            id={homeworkByTutor.id}
            description={homeworkByTutor.description}
            date={dayjs(homeworkByTutor.date).format('DD MMMM YYYY')}
            tutorName={homeworkByTutor.tutorName}
            pdf={homeworkByTutor.pdf}
          />
        );
      })}
    </div>
  );
};

export default IsAuth(AllHomeworks);
