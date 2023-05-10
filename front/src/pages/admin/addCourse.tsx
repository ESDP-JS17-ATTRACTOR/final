import React from 'react';
import CourseForm from '@/components/UI/Admin/CourseForm';
import { useAppDispatch } from '@/app/hooks';
import { addCourse } from '@/features/courses/coursesThunks';
import { useRouter } from 'next/router';
import { ApiCourse } from '../../../types';

const AddCourse = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (course: ApiCourse) => {
    await dispatch(addCourse(course));
    await router.push('/admin/courses');
  };

  return (
    <>
      <CourseForm onSubmit={onSubmit} />
    </>
  );
};

export default AddCourse;
