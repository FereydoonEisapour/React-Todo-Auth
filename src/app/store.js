import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlics';
import alertSlics from '../features/alertSlics';
export const store = configureStore({
    reducer: {
        user: userReducer,
        alert: alertSlics
    }
})