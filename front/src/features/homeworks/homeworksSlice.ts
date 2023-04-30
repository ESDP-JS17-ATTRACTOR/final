import {Course, CourseMutation, Homework, ValidationError} from "../../../types";
import { createSlice } from "@reduxjs/toolkit";
import {addCourse, deleteCourse, editCourse, fetchCourses, fetchOneCourse} from "@/features/courses/coursesThunks";
import { RootState } from "@/app/store";
import {addHomework, fetchHomeworks} from "@/features/homeworks/homeworksThunks";

interface HomeworkState {
    homeworks: Homework[];
    homeworksLoading: boolean;
    homeworkAdding: boolean;
    homeworkAddError: ValidationError | null;
    homeworkDeleting: boolean;
    homework: Homework | null;
    homeworkLoading: boolean;
    homeworkEditing: boolean
}


const initialState: HomeworkState = {
    homeworks: [],
    homeworksLoading: false,
    homeworkAdding: false,
    homeworkAddError: null,
    homeworkDeleting: false,
    homework: null,
    homeworkLoading: false,
    homeworkEditing: false,
};

const homeworksSlice = createSlice({
    name: 'homeworks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchHomeworks.pending, (state) => {
            state.homeworksLoading = true;
        });
        builder.addCase(fetchHomeworks.fulfilled, (state, {payload: homeworks}) => {
            state.homeworksLoading = false;
            state.homeworks = homeworks;
        });
        builder.addCase(fetchHomeworks.rejected, (state) => {
            state.homeworksLoading = false;
        });

        builder.addCase(addHomework.pending, (state) => {
            state.homeworkAdding = true;
        });
        builder.addCase(addHomework.fulfilled, (state) => {
            state.homeworkAdding = false;
            state.homeworkAddError = null;
        });
        builder.addCase(addHomework.rejected, (state, {payload: error}) => {
            state.homeworkAdding = false;
            state.homeworkAddError = error || null;
        });

        // builder.addCase(deleteCourse.pending, (state) => {
        //     state.courseDeleting = true;
        // });
        // builder.addCase(deleteCourse.fulfilled, (state) => {
        //     state.courseDeleting = false;
        // });
        // builder.addCase(deleteCourse.rejected, (state) => {
        //     state.courseDeleting = false;
        // });
        //
        // builder.addCase(fetchOneCourse.pending, (state) => {
        //     state.oneCourse = null;
        //     state.oneCourseLoading = true;
        // });
        // builder.addCase(fetchOneCourse.fulfilled, (state, {payload: course}) => {
        //     state.oneCourseLoading = false;
        //     state.oneCourse = course;
        // });
        // builder.addCase(fetchOneCourse.rejected, (state) => {
        //     state.oneCourseLoading = false;
        // });
        //
        // builder.addCase(editCourse.pending, (state) => {
        //     state.oneCourseEditing = true;
        // });
        // builder.addCase(editCourse.fulfilled, (state) => {
        //     state.oneCourseEditing = false;
        // });builder.addCase(editCourse.rejected, (state) => {
        //     state.oneCourseEditing = false;
        // });

    }
});

export const homeworksReducer = homeworksSlice.reducer;

export const selectHomeworks = (state: RootState) => state.homeworks.homeworks;
export const selectHomeworksLoading = (state: RootState) => state.homeworks.homeworksLoading;
export const selectHomeworkAdding = (state: RootState) => state.homeworks.homeworkAdding;
export const selectHomeworkError = (state: RootState) => state.homeworks.homeworkAddError;
export const selectHomeworkDeleting = (state: RootState) => state.homeworks.homeworkDeleting;
export const selectHomework = (state: RootState) => state.homeworks.homework;
export const selectHomeworkLoading = (state: RootState) => state.homeworks.homeworkLoading;
export const selectHomeworkEditing = (state: RootState) => state.homeworks.homeworkEditing;