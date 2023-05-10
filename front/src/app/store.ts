import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { usersReducer } from '@/features/users/usersSlice';
import { categoriesReducer } from '@/features/categories/categoriesSlice';
import { coursesReducer } from '@/features/courses/coursesSlice';
import { homeworksReducer } from '@/features/homeworks/homeworksSlice';
import { lessonsReducer } from '@/features/lessons/lessonsSlice';
import { studentHomeworksReducer } from '@/features/studentHomeworks/studentHomeworksSlice';
import { usersLessonsReducer } from '@/features/usersLessons/usersLessonsSlice';
import { purchasesReducer } from '@/features/purchases/purchasesSlice';

const rootReducer = combineReducers({
  users: usersReducer,
  categories: categoriesReducer,
  courses: coursesReducer,
  lessons: lessonsReducer,
  homeworks: homeworksReducer,
  studentHomeworks: studentHomeworksReducer,
  usersLessons: usersLessonsReducer,
  purchases: purchasesReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['users'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
