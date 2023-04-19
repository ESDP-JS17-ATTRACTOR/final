import { Category } from "../../../types";
import { createSlice } from "@reduxjs/toolkit";

interface CategoryState {
  category: Category | null;
  categoryLoading: boolean;
}

const initialState: CategoryState = {
  category: null,
  categoryLoading: false
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {}
});

export const categoriesReducer = categoriesSlice.reducer;