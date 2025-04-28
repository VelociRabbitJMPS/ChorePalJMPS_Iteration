import { configureStore } from '@reduxjs/toolkit';
import choreReducer from './choreSlice';

export const store = configureStore({
  reducer: {
    chores: choreReducer,
  },
});
