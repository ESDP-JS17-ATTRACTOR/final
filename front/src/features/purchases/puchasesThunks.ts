import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi';
import { ApiPurchase, UsersPurchase, ValidationError } from '../../../types';
import { isAxiosError } from 'axios';

export const fetchUserPurchases = createAsyncThunk<UsersPurchase[], void>('purchases/fetchUserPurchases', async () => {
  const response = await axiosApi.get<UsersPurchase[]>('/purchases/my-courses');
  return response.data;
});

export const assignPurchase = createAsyncThunk<void, ApiPurchase, { rejectValue: ValidationError }>(
  'purchases/assign',
  async (purchase, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post('/purchases/assign', purchase);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && (e.response.status === 404 || e.response.status === 400)) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  },
);
