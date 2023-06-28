import { createSlice } from '@reduxjs/toolkit';
import { assignPurchase, fetchUserPurchases } from '@/features/purchases/puchasesThunks';
import { UsersPurchase, ValidationError } from '../../../types';
import { RootState } from '@/app/store';

interface PurchasesState {
  usersPurchases: UsersPurchase[];
  usersPurchasesLoading: boolean;
  usersPurchasesError: boolean;
  assignPurchaseError: ValidationError | null;
  assigningPurchase: boolean;
}

const initialState: PurchasesState = {
  usersPurchases: [],
  usersPurchasesLoading: false,
  usersPurchasesError: false,
  assignPurchaseError: null,
  assigningPurchase: false,
};

export const purchasesSlice = createSlice({
  name: 'purchases',
  initialState,
  reducers: {
    unsetPurchaseError: (state) => {
      state.assignPurchaseError = null;
    },
  },
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
      })

      .addCase(assignPurchase.pending, (state) => {
        state.assigningPurchase = true;
      })
      .addCase(assignPurchase.fulfilled, (state) => {
        state.assigningPurchase = false;
        state.assignPurchaseError = null;
      })
      .addCase(assignPurchase.rejected, (state, { payload: error }) => {
        state.assigningPurchase = false;
        state.assignPurchaseError = error || null;
      });
  },
});

export const purchasesReducer = purchasesSlice.reducer;

export const { unsetPurchaseError } = purchasesSlice.actions;

export const selectUsersPurchases = (state: RootState) => state.purchases.usersPurchases;
export const selectAssignPurchaseError = (state: RootState) => state.purchases.assignPurchaseError;
export const selectAssigningPurchase = (state: RootState) => state.purchases.assigningPurchase;
