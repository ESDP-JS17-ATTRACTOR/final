import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistReducer, persistStore } from 'redux-persist';
import { categoriesSlice } from '@/features/categories/categoriesSlice';
import { coursesSlice } from '@/features/courses/coursesSlice';
import { homeworksSlice } from '@/features/homeworks/homeworksSlice';
import { lessonsSlice } from '@/features/lessons/lessonsSlice';
import { studentHomeworksSlice } from '@/features/studentHomeworks/studentHomeworksSlice';
import { usersLessonsSlice } from '@/features/usersLessons/usersLessonsSlice';
import { purchasesSlice } from '@/features/purchases/purchasesSlice';
import { createWrapper } from 'next-redux-wrapper';
import { usersSlice } from '@/features/users/usersSlice';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const makeStore = () => {
  const isServer = typeof window === 'undefined';

  let rootReducer = combineReducers({
    [homeworksSlice.name]: homeworksSlice.reducer,
    [usersSlice.name]: persistReducer(persistConfig, usersSlice.reducer),
    [categoriesSlice.name]: categoriesSlice.reducer,
    [coursesSlice.name]: coursesSlice.reducer,
    [lessonsSlice.name]: lessonsSlice.reducer,
    [studentHomeworksSlice.name]: studentHomeworksSlice.reducer,
    [usersLessonsSlice.name]: usersLessonsSlice.reducer,
    [purchasesSlice.name]: purchasesSlice.reducer,
  });

  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  if (!isServer) {
    // @ts-expect-error
    store.__persistor = persistStore(store);
  }

  return store;
};

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = RootStore['dispatch'];

export const wrapper = createWrapper<RootStore>(makeStore);
