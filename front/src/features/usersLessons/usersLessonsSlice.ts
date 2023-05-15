import {createSlice} from "@reduxjs/toolkit";
import { ModuleLesson, UsersLesson } from "../../../types";
import {
  createUsersLessons,
  fetchModuleLessons,
  fetchOneUsersLesson,
} from "@/features/usersLessons/usersLessonsThunks";
import {RootState} from "@/app/store";

interface UsersLessonsState {
  moduleLessons: ModuleLesson[];
  fetching: boolean;
  fetchingOne: boolean;
  creating: boolean;
  usersLesson: null | UsersLesson;
}

const initialState: UsersLessonsState = {
  moduleLessons: [],
  fetching: false,
  fetchingOne: false,
  creating: false,
  usersLesson: null,
}

const usersLessonsSlice = createSlice({
  name: 'usersLessons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchModuleLessons.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(fetchModuleLessons.fulfilled, (state, {payload: data}) => {
      state.fetching = false;
      state.moduleLessons = data;
    });
    builder.addCase(fetchModuleLessons.rejected, (state) => {
      state.fetching = false;
    });

    builder.addCase(fetchOneUsersLesson.pending, (state) => {
      state.fetchingOne = true;
    });
    builder.addCase(fetchOneUsersLesson.fulfilled, (state, {payload: usersLesson}) => {
      state.fetchingOne = false;
      state.usersLesson = usersLesson;
    });
    builder.addCase(fetchOneUsersLesson.rejected, (state) => {
      state.fetchingOne = false;
    });

    builder.addCase(createUsersLessons.pending, (state) => {
      state.creating = true;
    });
    builder.addCase(createUsersLessons.fulfilled, (state) => {
      state.creating = false;
    });
    builder.addCase(createUsersLessons.rejected, (state) => {
      state.creating = false;
    });
  },
});

export const usersLessonsReducer = usersLessonsSlice.reducer;

export const selectModuleLessons = (state: RootState) => state.usersLessons.moduleLessons;
export const selectUsersLessonsFetching = (state: RootState) => state.usersLessons.fetching;
export const selectUsersLessonFetchingOne = (state: RootState) => state.usersLessons.fetchingOne;
export const selectOneUsersLesson = (state: RootState) => state.usersLessons.usersLesson;
export const selectUsersLessonsCreating = (state: RootState) => state.usersLessons.creating;