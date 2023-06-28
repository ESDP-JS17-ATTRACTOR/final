import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { fetchCourseModules, fetchLessons } from '@/features/lessons/lessonsThunks';
import { Lesson, UsersModule } from '../../../types';

interface LessonState {
  lessons: Lesson[];
  lessonsLoading: boolean;
  modules: UsersModule[];
}

const initialState: LessonState = {
  lessons: [],
  lessonsLoading: false,
  modules: [],
};

export const lessonsSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLessons.pending, (state) => {
      state.lessonsLoading = true;
    });
    builder.addCase(fetchLessons.fulfilled, (state, { payload: lessons }) => {
      state.lessonsLoading = false;
      state.lessons = lessons;
    });
    builder.addCase(fetchLessons.rejected, (state) => {
      state.lessonsLoading = false;
    });

    builder.addCase(fetchCourseModules.pending, (state) => {
      state.lessonsLoading = true;
    });
    builder.addCase(fetchCourseModules.fulfilled, (state, { payload: modules }) => {
      state.lessonsLoading = false;
      state.modules = modules;
    });
    builder.addCase(fetchCourseModules.rejected, (state) => {
      state.lessonsLoading = false;
    });
  },
});

export const lessonsReducer = lessonsSlice.reducer;

export const selectLessons = (state: RootState) => state.lessons.lessons;
export const selectLessonsLoading = (state: RootState) => state.lessons.lessonsLoading;
export const selectCourseModules = (state: RootState) => state.lessons.modules;
