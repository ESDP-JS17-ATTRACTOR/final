import { Course, CourseMutation, ValidationError } from '../../../types';
import { createSlice } from '@reduxjs/toolkit';
import { addCourse, deleteCourse, editCourse, fetchCourses, fetchOneCourse } from '@/features/courses/coursesThunks';
import { RootState } from '@/app/store';

interface CourseState {
  courses: Course[];
  coursesLoading: boolean;
  courseAdding: boolean;
  courseAddError: ValidationError | null;
  courseDeleting: boolean;
  oneCourse: CourseMutation | null;
  oneCourseLoading: boolean;
  oneCourseEditing: boolean;
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
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
    });
    builder.addCase(editCourse.rejected, (state) => {
      state.oneCourseEditing = false;
    });
  },
});

export const coursesReducer = coursesSlice.reducer;

export const selectCourses = (state: RootState) => state.courses.courses;
export const selectCoursesLoading = (state: RootState) => state.courses.coursesLoading;
export const selectCourseAdding = (state: RootState) => state.courses.courseAdding;
export const selectCourseError = (state: RootState) => state.courses.courseAddError;
export const selectCourseDeleting = (state: RootState) => state.courses.courseDeleting;
export const selectOneCourse = (state: RootState) => state.courses.oneCourse;
export const selectOneCourseLoading = (state: RootState) => state.courses.oneCourseLoading;
export const selectOneCourseEditing = (state: RootState) => state.courses.oneCourseEditing;
