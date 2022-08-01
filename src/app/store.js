import { configureStore } from "@reduxjs/toolkit";
import userSlics from "../features/userSlics";
export const store = configureStore({
  reducer: {
    user: userSlics,
  },
});
