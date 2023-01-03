import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import appInfoReducer from "./slices/appInfoSlice"
import userReducer from "./slices/userSlice"
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        appInfo:appInfoReducer,
        user:userReducer
      },
})