import { createAsyncThunk } from "@reduxjs/toolkit";
import { Category, CategoryMutation, GlobalError } from "../../../types";
import axiosApi from "../../../axiosApi";
import { isAxiosError } from "axios";

export const fetchCategories = createAsyncThunk<Category[]>(
  'categories/fetchAll',
  async () => {
    const response = await axiosApi.get<Category []>('/categories');
    return response.data;
  }
);

export const addCategory = createAsyncThunk<void, CategoryMutation, { rejectValue: GlobalError }>(
  'categories/add',
  async (category, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post('/categories/add', category);
      return response.data;
    }  catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  }
);