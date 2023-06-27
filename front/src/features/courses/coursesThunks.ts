import { createAsyncThunk } from '@reduxjs/toolkit';
import { Course, ApiCourse, CourseMutation, GlobalError, ValidationError } from '../../../types';
import axiosApi from '../../../axiosApi';
import { isAxiosError } from 'axios';

export const fetchCourses = createAsyncThunk<Course[]>('courses/fetchAll', async () => {
  const response = await axiosApi.get<Course[]>('/courses');
  return response.data;
});

export const addCourse = createAsyncThunk<void, ApiCourse, { rejectValue: ValidationError }>(
  'courses/add',
  async (course, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post('/courses', course);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  },
);

export const deleteCourse = createAsyncThunk<void, string>('courses/delete', async (id) => {
  try {
    await axiosApi.delete('/courses/' + id);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 403) {
      return alert(e.response.data.error as GlobalError);
    }
    throw e;
  }
});

export const fetchOneCourse = createAsyncThunk<CourseMutation, string>('courses/fetchOneCourse', async (id) => {
  const response = await axiosApi.get('/courses/' + id);
  const course = response.data;

  if (course === null) {
    throw new Error('Course was not found');
  }
  return course;
});

interface EditParams {
  id: string;
  course: ApiCourse;
}

export const editCourse = createAsyncThunk<void, EditParams, { rejectValue: ValidationError }>(
  'courses/editCourse',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axiosApi.patch('/courses/' + params.id, params.course);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  },
);
