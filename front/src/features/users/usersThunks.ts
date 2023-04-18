import {createAsyncThunk} from "@reduxjs/toolkit";
import {GlobalError, LoginError, LoginMutation, RegisterMutation, User, ValidationError} from "../../../types";
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
)

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