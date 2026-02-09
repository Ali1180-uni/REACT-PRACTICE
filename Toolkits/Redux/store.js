import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './Counter/CounterSlice.js'

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})

export default store