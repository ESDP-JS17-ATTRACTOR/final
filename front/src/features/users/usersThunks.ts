import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  LoginError,
  LoginMutation,
  ProfileMutation,
  RegisterMutation,
  Student,
  Tutor,
  User,
  UserData,
  ValidationError,
} from '../../../types';
import axiosApi from '../../../axiosApi';
import { isAxiosError } from 'axios';
import { unsetUser } from '@/features/users/usersSlice';
import { RootState } from '@/app/store';

export const register = createAsyncThunk<User, RegisterMutation, { rejectValue: ValidationError }>(
  'users/register',
  async (registerMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<User>('users/register', registerMutation);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      } else if (isAxiosError(e) && e.response && e.response.status === 409) {
        return rejectWithValue({ email: e.response.data.message });
      }
      throw e;
    }
  },
);

export const googleLogin = createAsyncThunk<User, string, { rejectValue: LoginError }>(
  'users/googleLogin',
  async (credential, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post('/users/google-authentication', { credential });
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as LoginError);
      }
      throw e;
    }
  },
);

export const facebookLogin = createAsyncThunk<
  User,
  { accessToken: string; userID: string },
  { rejectValue: LoginError }
>('users/facebookLogin', async (accessToken, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post('/users/facebook-authentication', accessToken);
    return response.data.user;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as LoginError);
    }
    throw e;
  }
});

export const login = createAsyncThunk<User, LoginMutation, { rejectValue: LoginError }>(
  'users/login',
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<User>('users/login', loginInfo);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 401) {
        return rejectWithValue(e.response.data as LoginError);
      }
      throw e;
    }
  },
);

export const logout = createAsyncThunk<void, void, { state: RootState }>('users/logout', async (_, { dispatch }) => {
  await axiosApi.delete('users/sessions');
  dispatch(unsetUser());
});

export const recoverPassword = createAsyncThunk<void, string, { rejectValue: ValidationError }>(
  'users/recoverPassword',
  async (email, { rejectWithValue }) => {
    try {
      await axiosApi.post('users/recoverPassword', { email });
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  },
);

export const sendUserData = createAsyncThunk<void, UserData, { rejectValue: ValidationError }>(
  'users/userData',
  async (data, { rejectWithValue }) => {
    try {
      await axiosApi.post('users/userData', data);
      console.log(data);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  },
);

export const editUserProfile = createAsyncThunk<User, ProfileMutation, { rejectValue: ValidationError }>(
  'users/edit',
  async (profileMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.patch<User>('users/edit-profile', profileMutation);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  },
);

export const fetchTutors = createAsyncThunk<Tutor[]>('users/fetchTutors', async () => {
  const response = await axiosApi.get<Tutor[]>('/users/tutors');
  return response.data;
});

export const fetchStudents = createAsyncThunk<Student[]>('users/fetchStudents', async () => {
  const response = await axiosApi.get<Student[]>('/users/students');
  return response.data;
});
