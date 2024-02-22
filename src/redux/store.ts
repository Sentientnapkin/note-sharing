import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'

// Automatically adds the thunk middleware and the Redux DevTools extension
export const store = configureStore({
  // Automatically calls `combineReducers`
  reducer: {
    auth: authReducer,
  }
})