import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    Course,
    ApiCourse,
    CourseMutation,
    GlobalError,
    ValidationError,
    Homework,
    HomeworkMutation, ApiHomework, StudentHomework, ApiStudentHomework
} from "../../../types";
import axiosApi from "../../../axiosApi";
import {isAxiosError} from "axios";

export const fetchStudentHomeworks = createAsyncThunk<StudentHomework[]>(
    'studentHomeworks/fetchAll',
    async () => {
        const response = await axiosApi.get<StudentHomework[]>('/student-homeworks');
        return response.data;
    }
);

export const addStudentHomework = createAsyncThunk<void, ApiStudentHomework, { rejectValue: ValidationError }>(
    'studentHomeworks/add',
    async (studentHomework, {rejectWithValue}) => {
        try {
            // const formData = new FormData();
            //
            // const keys = Object.keys(homework) as (keyof ApiHomework)[];
            // keys.forEach((key) => {
            //     const value = homework[key];
            //
            //     if (value !== null) {
            //         formData.append(key, value);
            //     }
            // });

            // const response = await axiosApi.post<ApiHomework>('/homeworks', formData);
            // // return response.data;
            const response = await axiosApi.post('/student-homeworks', studentHomework);
            return response.data;
        }  catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }
            throw e;
        }
    }
);

// export const deleteCourse = createAsyncThunk<void, string>(
//     'courses/delete',
//     async (id) => {
//         try {
//             await axiosApi.delete('/courses/' + id);
//         } catch (e) {
//             if (isAxiosError(e) && e.response && e.response.status === 403) {
//                 return alert(e.response.data.error as GlobalError);
//             }
//             throw (e);
//         }
//     }
// );
//
export const fetchStudentHomework = createAsyncThunk<StudentHomework, string>(
    'studentHomeworks/fetchOne',
    async (id) => {
        const response = await axiosApi.get<StudentHomework>('/student-homeworks/' + id);
        const studentHomework = response.data;

        if (studentHomework === null) {
            throw new Error('This student homework was not found');
        }
        return studentHomework;
    }
);

export const checkStudentHomework = createAsyncThunk<void, string>(
    'studentHomeworks/check',
    async (id) => {
        await axiosApi.patch('/student-homeworks/' + id + '/toggleCheck');
    }
);

export const deleteStudentHomework = createAsyncThunk<void, string>(
    'studentHomeworks/delete',
    async (id) => {
        await axiosApi.delete('/student-homeworks/' + id);
    }
);