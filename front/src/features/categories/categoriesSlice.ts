import { Category, CategoryMutation, GlobalError } from '../../../types';
import { createSlice } from '@reduxjs/toolkit';
import {
  addCategory,
  deleteCategory,
  editCategory,
  fetchCategories,
  fetchOneCategory,
} from '@/features/categories/categoriesThunks';
import { RootState } from '@/app/store';

interface CategoryState {
  categories: Category[];
  categoryLoading: boolean;
  categoryAdding: boolean;
  addError: GlobalError | null;
  categoryDeleting: boolean;
  oneCategoryLoading: boolean;
  oneCategory: CategoryMutation | null;
  categoryEditing: boolean;
}

const initialState: CategoryState = {
  categories: [],
  categoryLoading: false,
  categoryAdding: false,
  addError: null,
  categoryDeleting: false,
  oneCategoryLoading: false,
  oneCategory: null,
  categoryEditing: false,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.categoryLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, { payload: categories }) => {
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
    builder.addCase(addCategory.rejected, (state, { payload: error }) => {
      state.categoryAdding = false;
      state.addError = error || null;
    });

    builder.addCase(deleteCategory.pending, (state) => {
      state.categoryDeleting = true;
    });
    builder.addCase(deleteCategory.fulfilled, (state) => {
      state.categoryDeleting = false;
    });
    builder.addCase(deleteCategory.rejected, (state) => {
      state.categoryDeleting = false;
    });

    builder.addCase(fetchOneCategory.pending, (state) => {
      state.oneCategoryLoading = true;
    });
    builder.addCase(fetchOneCategory.fulfilled, (state, { payload: category }) => {
      state.oneCategoryLoading = false;
      state.oneCategory = category;
    });
    builder.addCase(fetchOneCategory.rejected, (state) => {
      state.oneCategoryLoading = false;
    });

    builder.addCase(editCategory.pending, (state) => {
      state.categoryEditing = true;
    });
    builder.addCase(editCategory.fulfilled, (state) => {
      state.categoryEditing = false;
    });
    builder.addCase(editCategory.rejected, (state) => {
      state.categoryEditing = false;
    });
  },
});

export const categoriesReducer = categoriesSlice.reducer;

export const selectCategories = (state: RootState) => state.categories.categories;
export const selectCategoriesLoading = (state: RootState) => state.categories.categoryLoading;
export const selectCategoryAdding = (state: RootState) => state.categories.categoryAdding;
export const selectCategoryAddError = (state: RootState) => state.categories.addError;
export const selectCategoryDeleting = (state: RootState) => state.categories.categoryDeleting;
export const selectOneCategory = (state: RootState) => state.categories.oneCategory;
export const selectCategoryEditing = (state: RootState) => state.categories.categoryEditing;
