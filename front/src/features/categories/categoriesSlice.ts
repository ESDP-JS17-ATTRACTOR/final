import { Category, GlobalError } from "../../../types";
import { createSlice } from "@reduxjs/toolkit";
import { addCategory, fetchCategories } from "@/features/categories/categoriesThunks";
import { RootState } from "@/app/store";

interface CategoryState {
  categories: Category [];
  categoryLoading: boolean;
  categoryAdding: boolean;
  addError: GlobalError | null;
}

const initialState: CategoryState = {
  categories: [],
  categoryLoading: false,
  categoryAdding: false,
  addError: null
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.categoryLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, {payload: categories}) => {
      state.categories = categories;
      state.categoryLoading = false;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.categoryLoading = false;
    });

    builder.addCase(addCategory.pending, (state) => {
      state.categoryAdding = true;
    });
    builder.addCase(addCategory.fulfilled, (state) => {
      state.addError = null;
      state.categoryAdding = false;
    });
    builder.addCase(addCategory.rejected, (state, {payload: error}) => {
      state.categoryAdding = false;
      state.addError = error || null;
    });

  }
});

export const categoriesReducer = categoriesSlice.reducer;

export const selectCategories = (state: RootState) => state.categories.categories;
export const selectCategoriesLoading = (state: RootState) => state.categories.categoryLoading;
export const selectCategoryAdding = (state: RootState) => state.categories.categoryAdding;
export const selectCategoryAddError = (state: RootState) => state.categories.addError;
