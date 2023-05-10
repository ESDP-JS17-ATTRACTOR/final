import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { fetchLessons } from '@/features/lessons/lessonsThunks';
import { Lesson } from '../../../types';

interface LessonState {
  lessons: Lesson[];
}

const initialState: LessonState = {
  lessons: [],
};

const lessonsSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLessons.pending, (state) => {
      // state.homeworksLoading = true;
    });
    builder.addCase(fetchLessons.fulfilled, (state, { payload: lessons }) => {
      // state.homeworksLoading = false;
      state.lessons = lessons;
    });
    builder.addCase(fetchLessons.rejected, (state) => {
      // state.homeworksLoading = false;
    });
  },
});

export const lessonsReducer = lessonsSlice.reducer;

export const selectLessons = (state: RootState) => state.lessons.lessons;
