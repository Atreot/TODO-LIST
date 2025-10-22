// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './slices/tasksSlice';


export const store = configureStore({
  reducer: {
    tasksSlice: tasksSlice,
  },
});

// Типы для TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;