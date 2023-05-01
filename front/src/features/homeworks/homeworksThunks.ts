import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    Course,
    ApiCourse,
    CourseMutation,
    GlobalError,
    ValidationError,
    Homework,
    HomeworkMutation, ApiHomework
} from "../../../types";
import axiosApi from "../../../axiosApi";
import {isAxiosError} from "axios";

export const fetchHomeworks = createAsyncThunk<Homework[]>(
    'homeworks/fetchAll',
    async () => {
        const response = await axiosApi.get<Homework[]>('/homeworks');
        return response.data;
    }
);

export const addHomework = createAsyncThunk<void, ApiHomework, { rejectValue: ValidationError }>(
    'homeworks/add',
    async (homework, {rejectWithValue}) => {
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
            const response = await axiosApi.post('/homeworks', homework);
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
// export const fetchOneCourse = createAsyncThunk<CourseMutation, string>(
//     'courses/fetchOneCourse',
//     async (id) => {
//         const response = await axiosApi.get('/courses/' + id);
//         const course = response.data;
//
//         if (course === null) {
//             throw new Error('Course was not found');
//         }
//         return course;
//     }
// );
//
// interface EditParams {
//     id: string,
//     course: ApiCourse
// }
//
// export const editCourse = createAsyncThunk<void, EditParams>(
//     'courses/editCourse',
//     async (params) => {
//         await axiosApi.patch('/courses/' + params.id, params.course);
//     }
// );