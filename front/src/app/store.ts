import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { homeworkSlice } from '@/features/homeworks/homeworksSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { usersReducer, usersSlice } from '@/features/users/usersSlice';
import { categoriesReducer, categoriesSlice } from '@/features/categories/categoriesSlice';
import { coursesReducer, coursesSlice } from '@/features/courses/coursesSlice';
import { homeworksReducer, homeworksSlice } from '@/features/homeworks/homeworksSlice';
import { lessonsReducer, lessonsSlice } from '@/features/lessons/lessonsSlice';
import { studentHomeworksReducer, studentHomeworksSlice } from '@/features/studentHomeworks/studentHomeworksSlice';
import { usersLessonsReducer, usersLessonsSlice } from '@/features/usersLessons/usersLessonsSlice';
import { purchasesReducer, purchasesSlice } from '@/features/purchases/purchasesSlice';
import { createWrapper } from 'next-redux-wrapper';

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

// const makeStore = () =>
//   configureStore({
//     reducer: {
//       [homeworksSlice.name]: homeworksSlice.reducer,
//       [usersSlice.name]: usersSlice.reducer,
//       [categoriesSlice.name]: categoriesSlice.reducer,
//       [coursesSlice.name]: coursesSlice.reducer,
//       [lessonsSlice.name]: lessonsSlice.reducer,
//       [studentHomeworksSlice.name]: studentHomeworksSlice.reducer,
//       [usersLessonsSlice.name]: usersLessonsSlice.reducer,
//       [purchasesSlice.name]: purchasesSlice.reducer,
//     },
//     devTools: true,
//   });
//
// export type RootStore = ReturnType<typeof makeStore>;
// export type RootState = ReturnType<RootStore['getState']>;
// export type AppDispatch = RootStore['dispatch'];
//
// export const wrapper = createWrapper<RootStore>(makeStore);
