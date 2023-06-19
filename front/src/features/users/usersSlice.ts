import { createSlice } from '@reduxjs/toolkit';
import { LoginError, Tutor, User, ValidationError } from '../../../types';
import {
  fetchTutors,
  editUserProfile,
  googleLogin,
  login,
  register,
  facebookLogin,
  recoverPassword,
} from './usersThunks';
import { RootState } from '@/app/store';
import { PersistPartial } from 'redux-persist/es/persistReducer';

interface UserState {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: LoginError | null;
  recoverPasswordLoading: boolean;
  recoverPasswordError: ValidationError | null;
  modalWindowStatus: boolean;
  editLoading: boolean;
  tutors: Tutor[];
  tutorsLoading: boolean;
}

const initialState: UserState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  recoverPasswordLoading: false,
  recoverPasswordError: null,
  modalWindowStatus: false,
  editLoading: false,
  tutors: [],
  tutorsLoading: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    switchModalWindow: (state) => {
      state.modalWindowStatus = !state.modalWindowStatus;
      state.loginError = null;
    },
    unsetUser: (state) => {
      state.user = null;
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
  },
});

export const usersReducer = usersSlice.reducer;

export const { switchModalWindow, unsetUser } = usersSlice.actions;

export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
export const selectModalWindowStatus = (state: RootState) => state.users.modalWindowStatus;
export const selectEditLoading = (state: RootState) => state.users.editLoading;
export const selectTutors = (state: RootState) => state.users.tutors;
export const selectTutorsLoading = (state: RootState) => state.users.tutorsLoading;
export const selectPasswordLoading = (state: RootState) => state.users.recoverPasswordLoading;
export const selectPasswordError = (state: RootState) => state.users.recoverPasswordError;
