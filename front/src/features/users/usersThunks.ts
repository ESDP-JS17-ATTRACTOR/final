import {createAsyncThunk} from "@reduxjs/toolkit";
import {RegisterMutation, User, ValidationError} from "../../../types";
import axiosApi from "../../../axiosApi";
import {isAxiosError} from "axios";

export const register = createAsyncThunk<User, RegisterMutation, { rejectValue: ValidationError }>(
  'users/register',
  async (registerMutation, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post<User>('users/register', registerMutation);
      return response.data;
    }  catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  },
)

