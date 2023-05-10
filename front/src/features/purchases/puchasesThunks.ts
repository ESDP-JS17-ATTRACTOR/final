import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../../axiosApi";
import { UsersPurchase } from "../../../types";

export const fetchUserPurchases = createAsyncThunk<UsersPurchase[], void>(
  'purchases/fetchUserPurchases',
  async () => {
    const response = await axiosApi.get<UsersPurchase[]>('/purchases/my-courses');
    return response.data;
  }
);