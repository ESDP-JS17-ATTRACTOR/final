import { createAsyncThunk } from "@reduxjs/toolkit";
import { Category, CategoryMutation, GlobalError} from "../../../types";
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
      const response = await axiosApi.post('/categories', category);
      return response.data;
    }  catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  }
);

export const deleteCategory = createAsyncThunk<void, string>(
    'categories/delete',
    async (id) => {
        try {
            await axiosApi.delete('/categories/' + id);
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 403) {
                return alert(e.response.data.error as GlobalError);
            }
            throw (e);
        }
    }
);

export const fetchOneCategory = createAsyncThunk<CategoryMutation, string>(
    'categories/fetchOneCategory',
    async (id) => {
        const response = await axiosApi.get('/categories/' + id);
        const category = response.data;

        if (category === null) {
            throw new Error('Category was not found');
        }
        return category;
    }
);

interface EditParams {
    id: string,
    category: CategoryMutation
}

export const editCategory = createAsyncThunk<void, EditParams>(
    'categories/editCategory',
    async (params) => {
        await axiosApi.patch('/categories/' + params.id, params.category);
    }
);

