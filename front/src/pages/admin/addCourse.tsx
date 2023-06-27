import React from 'react';
import CourseForm from '@/components/UI/Admin/CourseForm';
import { useAppDispatch } from '@/app/hooks';
import { addCourse } from '@/features/courses/coursesThunks';
import { ApiCourse } from '../../../types';
import IsAdmin from '@/components/UI/Auth/IsAdmin';

const AddCourse = () => {
  const dispatch = useAppDispatch();

  const onSubmit = async (course: ApiCourse) => {
    try {
      await dispatch(addCourse(course));
    } catch (e) {
      throw e;
    }
  };

  return (
    <>
      <CourseForm onSubmit={onSubmit} />
    </>
  );
};

export default IsAdmin(AddCourse);
