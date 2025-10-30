// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './slices/tasksSlice';
import { notificationsMiddleware } from './middleware/notificationsMiddleware';


export const store = configureStore({
  reducer: {
    tasksSlice: tasksSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      notificationsMiddleware
    ),
});

// Типы для TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;