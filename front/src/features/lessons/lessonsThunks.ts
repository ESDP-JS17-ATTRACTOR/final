import { createAsyncThunk } from '@reduxjs/toolkit';
import { Lesson, LessonMutation, UsersModule, ValidationError } from '../../../types';
import axiosApi from '../../../axiosApi';
import { isAxiosError } from 'axios';

export const createLesson = createAsyncThunk<void, LessonMutation, { rejectValue: ValidationError }>(
  'lessons/createLesson',
  async (lesson, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('course', String(lesson.course));
      formData.append('module', String(lesson.module));
      formData.append('number', String(lesson.number));
      formData.append('title', lesson.title);
      formData.append('description', lesson.description);
      formData.append('isStopLesson', String(lesson.isStopLesson));
      formData.append('video', lesson.video);

      await axiosApi.post('/lessons', formData);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }

      throw e;
    }
  },
);

export const fetchLessons = createAsyncThunk<Lesson[]>('lessons/fetchAll', async () => {
  const response = await axiosApi.get<Lesson[]>('/lessons');
  return response.data;
});

export const fetchCourseLessons = createAsyncThunk<Lesson[], number>('lessons/fetchAll', async (id) => {
  const response = await axiosApi.get<Lesson[]>(`/lessons/byCourse/${id}`);
  return response.data;
});

export const fetchCourseModules = createAsyncThunk<UsersModule[], number>('lessons/courseModules', async (id) => {
  const response = await axiosApi.get(`/course-modules?courseId=${id}`);
  return response.data;
});
