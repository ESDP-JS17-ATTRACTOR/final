import { Course, CourseMutation, ValidationError } from '../../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addCourse, deleteCourse, editCourse, fetchCourses, fetchOneCourse } from '@/features/courses/coursesThunks';
import { RootState } from '@/app/store';
import { HYDRATE } from 'next-redux-wrapper';

interface CourseState {
  courses: Course[];
  coursesLoading: boolean;
  courseAdding: boolean;
  courseAddError: ValidationError | null;
  courseDeleting: boolean;
  oneCourse: CourseMutation | null;
  oneCourseLoading: boolean;
  oneCourseEditing: boolean;
  courseEditError: ValidationError | null;
}

const initialState: CourseState = {
  courses: [],
  coursesLoading: false,
  courseAdding: false,
  courseAddError: null,
  courseDeleting: false,
  oneCourse: null,
  oneCourseLoading: false,
  oneCourseEditing: false,
  courseEditError: null,
};

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    unsetCourseError: (state) => {
      state.courseAddError = null;
      state.courseEditError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(HYDRATE, (state, action) => {
      return action.payload.courses;
    });
    builder.addCase(fetchCourses.pending, (state) => {
      state.coursesLoading = true;
    });
    builder.addCase(fetchCourses.fulfilled, (state, { payload: courses }) => {
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
    builder.addCase(addCourse.rejected, (state, { payload: error }) => {
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

    builder.addCase(fetchOneCourse.pending, (state) => {
      state.oneCourse = null;
      state.oneCourseLoading = true;
    });
    builder.addCase(fetchOneCourse.fulfilled, (state, { payload: course }) => {
      state.oneCourseLoading = false;
      state.oneCourse = course;
    });
    builder.addCase(fetchOneCourse.rejected, (state) => {
      state.oneCourseLoading = false;
    });

    builder.addCase(editCourse.pending, (state) => {
      state.oneCourseEditing = true;
    });
    builder.addCase(editCourse.fulfilled, (state) => {
      state.oneCourseEditing = false;
      state.courseEditError = null;
    });
    builder.addCase(editCourse.rejected, (state, { payload: error }) => {
      state.oneCourseEditing = false;
      state.courseEditError = error || null;
    });
  },
});

export const coursesReducer = coursesSlice.reducer;

export const { unsetCourseError } = coursesSlice.actions;

export const selectCourses = (state: RootState) => state.courses.courses;
export const selectCoursesLoading = (state: RootState) => state.courses.coursesLoading;
export const selectCourseAdding = (state: RootState) => state.courses.courseAdding;
export const selectCourseAddError = (state: RootState) => state.courses.courseAddError;
export const selectCourseDeleting = (state: RootState) => state.courses.courseDeleting;
export const selectOneCourse = (state: RootState) => state.courses.oneCourse;
export const selectOneCourseLoading = (state: RootState) => state.courses.oneCourseLoading;
export const selectOneCourseEditing = (state: RootState) => state.courses.oneCourseEditing;
export const selectCourseEditError = (state: RootState) => state.courses.courseEditError;
