import { createAsyncThunk } from "@reduxjs/toolkit";
import {Lesson} from "../../../types";
import axiosApi from "../../../axiosApi";

export const fetchLessons = createAsyncThunk<Lesson[]>(
    'lessons/fetchAll',
    async () => {
        const response = await axiosApi.get<Lesson[]>('/lessons');
        return response.data;
    }
);