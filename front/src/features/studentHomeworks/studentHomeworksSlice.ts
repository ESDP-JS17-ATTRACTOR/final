import {StudentHomework, ValidationError} from "../../../types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import {addHomework, fetchHomeworks} from "@/features/homeworks/homeworksThunks";
import {addStudentHomework, fetchStudentHomeworks} from "@/features/studentHomeworks/studentHomeworksThunks";

interface StudentHomeworkState {
    studentHomeworks: StudentHomework[];
    studentHomeworksLoading: boolean;
    studentHomeworkAdding: boolean;
    studentHomeworkAddError: ValidationError | null;
    studentHomeworkDeleting: boolean;
    studentHomework: StudentHomework | null;
    studentHomeworkLoading: boolean;
    studentHomeworkEditing: boolean
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

const studentHomeworksSlice = createSlice({
    name: 'studentHomeworks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchStudentHomeworks.pending, (state) => {
            state.studentHomeworksLoading = true;
        });
        builder.addCase(fetchStudentHomeworks.fulfilled, (state, {payload: homeworks}) => {
            state.studentHomeworksLoading = false;
            state.studentHomeworks = homeworks;
        });
        builder.addCase(fetchStudentHomeworks.rejected, (state) => {
            state.studentHomeworkLoading = false;
        });

        builder.addCase(addStudentHomework.pending, (state) => {
            state.studentHomeworkAdding = true;
        });
        builder.addCase(addStudentHomework.fulfilled, (state) => {
            state.studentHomeworkAdding = false;
            state.studentHomeworkAddError = null;
        });
        builder.addCase(addStudentHomework.rejected, (state, {payload: error}) => {
            state.studentHomeworkAdding = false;
            state.studentHomeworkAddError = error || null;
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

export const studentHomeworksReducer = studentHomeworksSlice.reducer;

export const selectStudentHomeworks = (state: RootState) => state.studentHomeworks.studentHomeworks;
export const selectStudentHomeworksLoading = (state: RootState) => state.studentHomeworks.studentHomeworksLoading;
export const selectStudentHomeworkAdding = (state: RootState) => state.studentHomeworks.studentHomeworkAdding;
export const selectStudentHomeworkError = (state: RootState) => state.studentHomeworks.studentHomeworkAddError;
export const selectStudentHomeworkDeleting = (state: RootState) => state.studentHomeworks.studentHomeworkDeleting;
export const selectStudentHomework = (state: RootState) => state.studentHomeworks.studentHomework;
export const selectStudentHomeworkLoading = (state: RootState) => state.studentHomeworks.studentHomeworkLoading;
export const selectStudentHomeworkEditing = (state: RootState) => state.studentHomeworks.studentHomeworkEditing;