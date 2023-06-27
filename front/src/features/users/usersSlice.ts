import { createSlice } from '@reduxjs/toolkit';
import { LoginError, Student, Tutor, User, ValidationError, ValidationErrors } from '../../../types';
import {
  fetchTutors,
  editUserProfile,
  googleLogin,
  login,
  register,
  facebookLogin,
  recoverPassword,
  fetchStudents,
  registerNewStudent,
} from './usersThunks';
import { RootState } from '@/app/store';
import { PersistPartial } from 'redux-persist/es/persistReducer';

export interface UserState {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: LoginError | null;
  recoverPasswordLoading: boolean;
  recoverPasswordError: ValidationError | null;
  registrationModalWindowStatus: boolean;
  loginModalWindowStatus: boolean;
  editLoading: boolean;
  tutors: Tutor[];
  tutorsLoading: boolean;
  students: Student[];
  studentsLoading: boolean;
  registerNewStudentLoading: boolean;
  registerNewStudentError: ValidationErrors | null;
}

const initialState: UserState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  recoverPasswordLoading: false,
  recoverPasswordError: null,
  registrationModalWindowStatus: false,
  loginModalWindowStatus: false,
  editLoading: false,
  tutors: [],
  tutorsLoading: false,
  students: [],
  studentsLoading: false,
  registerNewStudentLoading: false,
  registerNewStudentError: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    switchRegistrationModalWindow: (state) => {
      state.registrationModalWindowStatus = !state.registrationModalWindowStatus;
      state.registerError = null;
    },
    switchLoginModalWindow: (state) => {
      state.loginModalWindowStatus = !state.loginModalWindowStatus;
      state.loginError = null;
    },
    unsetUser: (state) => {
      state.user = null;
    },
    unsetErrors: (state) => {
      state.registerError = null;
      state.loginError = null;
      state.recoverPasswordError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(register.fulfilled, (state, { payload: user }) => {
      state.registerLoading = false;
      state.user = user;
    });
    builder.addCase(register.rejected, (state, { payload: error }) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });

    builder.addCase(registerNewStudent.pending, (state) => {
      state.registerNewStudentLoading = true;
      state.registerNewStudentError = null;
    });
    builder.addCase(registerNewStudent.fulfilled, (state) => {
      state.registerNewStudentLoading = false;
      state.registerNewStudentError = null;
    });
    builder.addCase(registerNewStudent.rejected, (state, { payload: error }) => {
      state.registerNewStudentLoading = false;
      state.registerNewStudentError = error || null;
    });

    builder
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload: user }) => {
        state.loginLoading = false;
        state.user = user;
      })
      .addCase(login.rejected, (state, { payload: error }) => {
        state.loginLoading = false;
        state.loginError = error || null;
      });

    builder
      .addCase(googleLogin.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(googleLogin.fulfilled, (state, { payload: user }) => {
        state.loginLoading = false;
        state.user = user;
      })
      .addCase(googleLogin.rejected, (state, { payload: error }) => {
        state.loginLoading = false;
        state.loginError = error || null;
      });

    builder
      .addCase(facebookLogin.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(facebookLogin.fulfilled, (state, { payload: user }) => {
        state.loginLoading = false;
        state.user = user;
      })
      .addCase(facebookLogin.rejected, (state, { payload: error }) => {
        state.loginLoading = false;
        state.loginError = error || null;
      });

    builder
      .addCase(recoverPassword.pending, (state) => {
        state.recoverPasswordLoading = true;
        state.recoverPasswordError = null;
      })
      .addCase(recoverPassword.fulfilled, (state) => {
        state.recoverPasswordLoading = false;
        state.recoverPasswordError = null;
      })
      .addCase(recoverPassword.rejected, (state, { payload: error }) => {
        state.recoverPasswordLoading = false;
        state.recoverPasswordError = error || null;
      });

    builder
      .addCase(editUserProfile.pending, (state) => {
        state.editLoading = true;
      })
      .addCase(editUserProfile.fulfilled, (state, { payload: user }) => {
        state.editLoading = false;
        state.user = user;
      })
      .addCase(editUserProfile.rejected, (state) => {
        state.editLoading = false;
      });

    builder.addCase(fetchTutors.pending, (state) => {
      state.tutorsLoading = true;
    });
    builder.addCase(fetchTutors.fulfilled, (state, { payload: tutors }) => {
      state.tutorsLoading = false;
      state.tutors = tutors;
    });
    builder.addCase(fetchTutors.rejected, (state) => {
      state.tutorsLoading = false;
    });

    builder.addCase(fetchStudents.pending, (state) => {
      state.studentsLoading = true;
    });
    builder.addCase(fetchStudents.fulfilled, (state, { payload: students }) => {
      state.studentsLoading = false;
      state.students = students;
    });
    builder.addCase(fetchStudents.rejected, (state) => {
      state.studentsLoading = false;
    });
  },
});

export const usersReducer = usersSlice.reducer;

export const { switchRegistrationModalWindow, switchLoginModalWindow, unsetUser, unsetErrors } = usersSlice.actions;

export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
export const selectRegisterModalWindowStatus = (state: RootState) => state.users.registrationModalWindowStatus;
export const selectLoginModalWindowStatus = (state: RootState) => state.users.loginModalWindowStatus;
export const selectEditLoading = (state: RootState) => state.users.editLoading;
export const selectTutors = (state: RootState) => state.users.tutors;
export const selectTutorsLoading = (state: RootState) => state.users.tutorsLoading;
export const selectPasswordLoading = (state: RootState) => state.users.recoverPasswordLoading;
export const selectPasswordError = (state: RootState) => state.users.recoverPasswordError;
export const selectStudents = (state: RootState) => state.users.students;
export const selectStudentsLoading = (state: RootState) => state.users.studentsLoading;
export const selectRegisterStudentLoading = (state: RootState) => state.users.registerNewStudentLoading;
export const selectRegisterStudentError = (state: RootState) => state.users.registerNewStudentError;
