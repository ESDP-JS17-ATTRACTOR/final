import { createSlice } from '@reduxjs/toolkit';
import { fetchUserPurchases } from '@/features/purchases/puchasesThunks';
import { UsersPurchase } from '../../../types';
import { RootState } from '@/app/store';

interface PurchasesState {
  usersPurchases: UsersPurchase[];
  usersPurchasesLoading: boolean;
  usersPurchasesError: boolean;
}

const initialState: PurchasesState = {
  usersPurchases: [],
  usersPurchasesLoading: false,
  usersPurchasesError: false,
};

export const purchasesSlice = createSlice({
  name: 'purchases',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPurchases.pending, (state) => {
        state.usersPurchasesLoading = true;
      })
      .addCase(fetchUserPurchases.fulfilled, (state, { payload: data }) => {
        state.usersPurchases = data;
        state.usersPurchasesLoading = false;
      })
      .addCase(fetchUserPurchases.rejected, (state) => {
        state.usersPurchasesError = true;
        state.usersPurchasesLoading = false;
      });
  },
});

export const purchasesReducer = purchasesSlice.reducer;

export const selectUsersPurchases = (state: RootState) => state.purchases.usersPurchases;
