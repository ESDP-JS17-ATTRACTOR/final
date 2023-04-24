import {Course, ValidationError} from "../../../types";
import { createSlice } from "@reduxjs/toolkit";
import {addCourse, deleteCourse, fetchCourses} from "@/features/courses/coursesThunks";
import { RootState } from "@/app/store";

interface CourseState {
  courses: Course[];
  coursesLoading: boolean;
  courseAdding: boolean;
  courseAddError: ValidationError | null;
  courseDeleting: boolean;
}


const initialState: CourseState = {
  courses: [],
  coursesLoading: false,
  courseAdding: false,
  courseAddError: null,
  courseDeleting: false,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.pending, (state) => {
      state.coursesLoading = true;
    });
    builder.addCase(fetchCourses.fulfilled, (state, {payload: courses}) => {
      state.coursesLoading = false;
      state.courses = courses;
    });
    builder.addCase(fetchCourses.rejected, (state) => {
      state.coursesLoading = false;
    });

    builder.addCase(addCourse.pending, (state) => {
      state.courseAdding = true;
    });
    builder.addCase(addCourse.fulfilled, (state) => {
      state.courseAdding = false;
      state.courseAddError = null;
    });
    builder.addCase(addCourse.rejected, (state, {payload: error}) => {
      state.courseAdding = false;
      state.courseAddError = error || null;
    });

    builder.addCase(deleteCourse.pending, (state) => {
      state.courseDeleting = true;
    });
    builder.addCase(deleteCourse.fulfilled, (state) => {
      state.courseDeleting = false;
    });
    builder.addCase(deleteCourse.rejected, (state) => {
      state.courseDeleting = false;
    });
  }
});

export const coursesReducer = coursesSlice.reducer;

export const selectCourses = (state: RootState) => state.courses.courses;
export const selectCoursesLoading = (state: RootState) => state.courses.coursesLoading;
export const selectCourseAdding = (state: RootState) => state.courses.courseAdding;
export const selectCourseError = (state: RootState) => state.courses.courseAddError;
export const selectCourseDeleting = (state: RootState) => state.courses.courseDeleting;
