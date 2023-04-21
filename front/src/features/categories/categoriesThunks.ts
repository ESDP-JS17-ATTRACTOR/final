import { createAsyncThunk } from "@reduxjs/toolkit";
import { Category } from "../../../types";
import axiosApi from "../../../axiosApi";

export const fetchCategories = createAsyncThunk<Category[]>(
  'categories/fetchAll',
  async () => {
    const response = await axiosApi.get<Category []>('/categories');
    return response.data;
  }
);