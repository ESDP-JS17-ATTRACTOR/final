import {createSlice} from "@reduxjs/toolkit";
import {UsersLesson} from "../../../types";
import {createUsersLessons, fetchOneUsersLesson, fetchUsersLessons} from "@/features/usersLessons/usersLessonsThunks";
import {RootState} from "@/app/store";

interface UsersLessonsState {
  items: UsersLesson[];
  fetching: boolean;
  fetchingOne: boolean;
  creating: boolean;
  item: null | UsersLesson;
}

const initialState: UsersLessonsState = {
  items: [],
  fetching: false,
  fetchingOne: false,
  creating: false,
  item: null,
}

const usersLessonsSlice = createSlice({
  name: 'usersLessons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsersLessons.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(fetchUsersLessons.fulfilled, (state, {payload: usersLessons}) => {
      state.fetching = false;
      state.items = usersLessons;
    });
    builder.addCase(fetchUsersLessons.rejected, (state) => {
      state.fetching = false;
    });

    builder.addCase(fetchOneUsersLesson.pending, (state) => {
      state.fetchingOne = true;
    });
    builder.addCase(fetchOneUsersLesson.fulfilled, (state, {payload: usersLesson}) => {
      state.fetchingOne = false;
      state.item = usersLesson;
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

export const selectUsersLessons = (state: RootState) => state.usersLessons.items;
export const selectUsersLessonsFetching = (state: RootState) => state.usersLessons.fetching;
export const selectUsersLessonFetchingOne = (state: RootState) => state.usersLessons.fetchingOne;
export const selectOneUsersLesson = (state: RootState) => state.usersLessons.item;
export const selectUsersLessonsCreating = (state: RootState) => state.usersLessons.creating;