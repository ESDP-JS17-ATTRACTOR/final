import {createAsyncThunk} from "@reduxjs/toolkit";
import {LoginError, LoginMutation, ProfileMutation, RegisterMutation, User, ValidationError} from "../../../types";
import axiosApi from "../../../axiosApi";
import {isAxiosError} from "axios";
import {unsetUser} from "@/features/users/usersSlice";
import {RootState} from "@/app/store";

export const register = createAsyncThunk<User, RegisterMutation, { rejectValue: ValidationError }>(
    'users/register',
    async (registerMutation, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<User>('users/register', registerMutation);
            return response.data;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }
            throw e;
        }
    },
);

export const googleLogin = createAsyncThunk<User, string, {rejectValue: LoginError}>(
    'users/googleLogin',
    async (credential, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post('/users/google-authentication', {credential});
            return response.data;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as LoginError);
            }
            throw e;
        }
    }
);

export const login = createAsyncThunk<User, LoginMutation, { rejectValue: LoginError }>(
    'users/login',
    async (loginInfo, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<User>('users/login', loginInfo);
            return response.data;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 401) {
                return rejectWithValue(e.response.data as LoginError);
            }
            throw e;
        }
    }
);

export const logout = createAsyncThunk<void, void, {state: RootState}>(
    'users/logout',
    async (_, {dispatch, getState}) => {
        const user = getState().users.user;
        await axiosApi.delete('users/sessions', {headers: {"Authorization": user?.token}});
        dispatch(unsetUser());
    }
);

export const editUserProfile = createAsyncThunk<void, ProfileMutation, { rejectValue: ValidationError }>(
    'users/edit',
    async (profileMutation, {rejectWithValue}) => {
        try {
            await axiosApi.patch('users/edit-profile', profileMutation);
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }
            throw e;
        }
    },
);
