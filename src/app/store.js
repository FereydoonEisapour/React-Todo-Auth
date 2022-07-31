import { configureStore } from '@reduxjs/toolkit';
import userSlics from '../features/userSlics';
import themeSlice from '../features/themeSlics'
export const store = configureStore({
    reducer: {
        user: userSlics,
      //  theme: themeSlice,
    }
})