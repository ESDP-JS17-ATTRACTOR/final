import { createAsyncThunk } from "@reduxjs/toolkit";
import {Course, CourseMutation, GlobalError, ValidationError} from "../../../types";
import axiosApi from "../../../axiosApi";
import {isAxiosError} from "axios";

export const fetchCourses = createAsyncThunk<Course[]>(
  'courses/fetchAll',
  async () => {
    const response = await axiosApi.get<Course[]>('/courses');
    return response.data;
  }
);

export const addCourse = createAsyncThunk<void, CourseMutation, { rejectValue: ValidationError }>(
    'courses/add',
    async (course, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post('/courses', course);
            return response.data;
        }  catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }
            throw e;
        }
    }
);

export const deleteCourse = createAsyncThunk<void, string>(
    'courses/delete',
    async (id) => {
        try {
            await axiosApi.delete('/courses/' + id);
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 403) {
                return alert(e.response.data.error as GlobalError);
            }
            throw (e);
        }
    }
);

