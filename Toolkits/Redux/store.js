import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './Counter/CounterSlice.js'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})