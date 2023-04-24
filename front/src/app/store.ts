import {configureStore} from '@reduxjs/toolkit';
import {usersReducer} from "@/features/users/usersSlice";
import { categoriesReducer } from "@/features/categories/categoriesSlice";
import { coursesReducer } from "@/features/courses/coursesSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    categories: categoriesReducer,
    courses: coursesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;