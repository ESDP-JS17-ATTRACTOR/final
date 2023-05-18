import { Homework, ValidationError } from '../../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import {
  addHomework,
  editHomework,
  fetchHomeworks,
  fetchHomeworksByTutor,
  fetchOneHomework,
} from '@/features/homeworks/homeworksThunks';
import { HYDRATE } from 'next-redux-wrapper';

interface HomeworkState {
  homeworks: Homework[];
  homeworksByTutor: Homework[];
  homeworksLoading: boolean;
  homeworkAdding: boolean;
  homeworkAddError: ValidationError | null;
  homeworkDeleting: boolean;
  homework: Homework | null;
  homeworkLoading: boolean;
  homeworkEditing: boolean;
}

const initialState: HomeworkState = {
  homeworks: [],
  homeworksByTutor: [],
  homeworksLoading: false,
  homeworkAdding: false,
  homeworkAddError: null,
  homeworkDeleting: false,
  homework: null,
  homeworkLoading: false,
  homeworkEditing: false,
};

export const homeworksSlice = createSlice({
  name: 'homeworks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(HYDRATE, (state, action) => {
    //   // @ts-expect-error
    //   return action.payload.homeworks;
    // });
    builder.addCase(fetchHomeworks.pending, (state) => {
      state.homeworksLoading = true;
    });
    builder.addCase(fetchHomeworks.fulfilled, (state, { payload: homeworks }) => {
      state.homeworksLoading = false;
      state.homeworks = homeworks;
    });
    builder.addCase(fetchHomeworks.rejected, (state) => {
      state.homeworksLoading = false;
    });

    builder.addCase(fetchOneHomework.pending, (state) => {
      state.homeworkLoading = true;
    });
    builder.addCase(fetchOneHomework.fulfilled, (state, { payload: homework }) => {
      state.homeworkLoading = false;
      state.homework = homework;
    });
    builder.addCase(fetchOneHomework.rejected, (state) => {
      state.homeworkLoading = false;
    });

    builder.addCase(fetchHomeworksByTutor.pending, (state) => {
      state.homeworksLoading = true;
    });
    builder.addCase(fetchHomeworksByTutor.fulfilled, (state, { payload: homeworks }) => {
      state.homeworksLoading = false;
      state.homeworksByTutor = homeworks;
    });
    builder.addCase(fetchHomeworksByTutor.rejected, (state) => {
      state.homeworksLoading = false;
    });

    builder.addCase(addHomework.pending, (state) => {
      state.homeworkAdding = true;
    });
    builder.addCase(addHomework.fulfilled, (state) => {
      state.homeworkAdding = false;
      state.homeworkAddError = null;
    });
    builder.addCase(addHomework.rejected, (state, { payload: error }) => {
      state.homeworkAdding = false;
      state.homeworkAddError = error || null;
    });
  },
});

export const homeworksReducer = homeworksSlice.reducer;

export const selectHomeworks = (state: RootState) => state.homeworks.homeworks;
export const selectHomeworksByTutor = (state: RootState) => state.homeworks.homeworksByTutor;
export const selectHomeworksLoading = (state: RootState) => state.homeworks.homeworksLoading;
export const selectHomeworkAdding = (state: RootState) => state.homeworks.homeworkAdding;
export const selectHomeworkError = (state: RootState) => state.homeworks.homeworkAddError;
export const selectHomeworkDeleting = (state: RootState) => state.homeworks.homeworkDeleting;
export const selectHomework = (state: RootState) => state.homeworks.homework;
export const selectHomeworkLoading = (state: RootState) => state.homeworks.homeworkLoading;
export const selectHomeworkEditing = (state: RootState) => state.homeworks.homeworkEditing;
