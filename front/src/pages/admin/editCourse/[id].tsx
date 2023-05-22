import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { editCourse, fetchCourses, fetchOneCourse } from '@/features/courses/coursesThunks';
import { selectOneCourse } from '@/features/courses/coursesSlice';
import CourseForm from '@/components/UI/Admin/CourseForm';
import { ApiCourse } from '../../../../types';
import { useRouter } from 'next/router';

interface Props {
  id: string;
}

const EditCourse: React.FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const course = useAppSelector(selectOneCourse);

  useEffect(() => {
    dispatch(fetchOneCourse(id));
  }, [dispatch, id]);

  const onSubmit = async (course: ApiCourse) => {
    await dispatch(editCourse({ id, course }));
    await dispatch(fetchCourses());
    await router.push('/admin/courses');
  };

  return <>{course && <CourseForm onSubmit={onSubmit} exist={course} isEdit />}</>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;

  return {
    props: {
      id: id,
    },
  };
};

export default EditCourse;
