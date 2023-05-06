import { createAsyncThunk } from "@reduxjs/toolkit";
import {ValidationError, Homework, ApiHomework} from "../../../types";
import axiosApi from "../../../axiosApi";
import {isAxiosError} from "axios";

export const fetchHomeworks = createAsyncThunk<Homework[]>(
    'homeworks/fetchAll',
    async () => {
        const response = await axiosApi.get<Homework[]>('/homeworks');
        return response.data;
    }
);

export const fetchHomeworksByTutor = createAsyncThunk<Homework[]>(
    'homeworks/fetchAllByTutor',
    async () => {
        const response = await axiosApi.get<Homework[]>('/homeworks/byTutor');
        return response.data;
    }
);

export const addHomework = createAsyncThunk<void, ApiHomework, { rejectValue: ValidationError }>(
    'homeworks/add',
    async (homework, {rejectWithValue}) => {
        try {
            const formData = new FormData();

            const keys = Object.keys(homework) as (keyof ApiHomework)[];
            keys.forEach((key) => {
                const value = homework[key];

                if (value !== null) {
                    formData.append(key, value);
                }
            });

            const response = await axiosApi.post<ApiHomework>('/homeworks', formData);
        }  catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }
            throw e;
        }
    }
);