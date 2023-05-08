import { createAsyncThunk } from "@reduxjs/toolkit";
import {ValidationError, StudentHomework, ApiStudentHomework} from "../../../types";
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
            const formData = new FormData();

            formData.append('homework', studentHomework.homework);

            if (studentHomework.studentFiles) {
                const studentFiles = Array.from(studentHomework.studentFiles);
                studentFiles.forEach((file, index) => {
                    formData.append(`studentFiles`, file);
                });
            }

            const response = await axiosApi.post<ApiStudentHomework>('/student-homeworks', formData);
        }  catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }
            throw e;
        }
    }
);

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