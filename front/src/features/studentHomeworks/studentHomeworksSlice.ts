import { StudentHomework, ValidationError } from '../../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import {
  addStudentHomework,
  fetchStudentHomework,
  fetchStudentHomeworks,
} from '@/features/studentHomeworks/studentHomeworksThunks';

interface StudentHomeworkState {
  studentHomeworks: StudentHomework[];
  studentHomeworksLoading: boolean;
  studentHomeworkAdding: boolean;
  studentHomeworkAddError: ValidationError | null;
  studentHomeworkDeleting: boolean;
  studentHomework: StudentHomework | null;
  studentHomeworkLoading: boolean;
  studentHomeworkEditing: boolean;
}

const initialState: StudentHomeworkState = {
  studentHomeworks: [],
  studentHomeworksLoading: false,
  studentHomeworkAdding: false,
  studentHomeworkAddError: null,
  studentHomeworkDeleting: false,
  studentHomework: null,
  studentHomeworkLoading: false,
  studentHomeworkEditing: false,
};

export const studentHomeworksSlice = createSlice({
  name: 'studentHomeworks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStudentHomeworks.pending, (state) => {
      state.studentHomeworksLoading = true;
    });
    builder.addCase(fetchStudentHomeworks.fulfilled, (state, { payload: homeworks }) => {
      state.studentHomeworksLoading = false;
      state.studentHomeworks = homeworks;
    });
    builder.addCase(fetchStudentHomeworks.rejected, (state) => {
      state.studentHomeworksLoading = false;
    });

    builder.addCase(fetchStudentHomework.pending, (state) => {
      state.studentHomeworkLoading = true;
    });
    builder.addCase(fetchStudentHomework.fulfilled, (state, { payload: homework }) => {
      state.studentHomeworkLoading = false;
      state.studentHomework = homework;
    });
    builder.addCase(fetchStudentHomework.rejected, (state) => {
      state.studentHomeworkLoading = false;
    });

    builder.addCase(addStudentHomework.pending, (state) => {
      state.studentHomeworkAdding = true;
    });
    builder.addCase(addStudentHomework.fulfilled, (state) => {
      state.studentHomeworkAdding = false;
      state.studentHomeworkAddError = null;
    });
    builder.addCase(addStudentHomework.rejected, (state, { payload: error }) => {
      state.studentHomeworkAdding = false;
      state.studentHomeworkAddError = error || null;
    });
  },
});

export const studentHomeworksReducer = studentHomeworksSlice.reducer;

export const selectStudentHomeworks = (state: RootState) => state.studentHomeworks.studentHomeworks;
export const selectStudentHomeworksLoading = (state: RootState) => state.studentHomeworks.studentHomeworksLoading;
export const selectStudentHomeworkAdding = (state: RootState) => state.studentHomeworks.studentHomeworkAdding;
export const selectStudentHomeworkError = (state: RootState) => state.studentHomeworks.studentHomeworkAddError;
export const selectStudentHomeworkDeleting = (state: RootState) => state.studentHomeworks.studentHomeworkDeleting;
export const selectStudentHomework = (state: RootState) => state.studentHomeworks.studentHomework;
export const selectStudentHomeworkLoading = (state: RootState) => state.studentHomeworks.studentHomeworkLoading;
export const selectStudentHomeworkEditing = (state: RootState) => state.studentHomeworks.studentHomeworkEditing;
