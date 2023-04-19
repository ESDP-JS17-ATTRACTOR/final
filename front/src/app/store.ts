import {configureStore} from '@reduxjs/toolkit';
import {usersReducer} from "@/features/users/usersSlice";
import { categoriesReducer } from "@/features/categories/categoriesSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;