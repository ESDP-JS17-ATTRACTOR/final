import { Category } from "../../../types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "@/features/categories/categoriesThunks";
import { RootState } from "@/app/store";

interface CategoryState {
  categories: Category [];
  categoryLoading: boolean;
}

const initialState: CategoryState = {
  categories: [],
  categoryLoading: false
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.categoryLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, {payload}) => {
      state.categories = payload;
      state.categoryLoading = false;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.categoryLoading = false;
    });
  }
});

export const categoriesReducer = categoriesSlice.reducer;

export const selectCategories = (state: RootState) => state.categories.categories;