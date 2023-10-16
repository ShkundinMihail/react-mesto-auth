import { configureStore } from "@reduxjs/toolkit";
import cardSlice from "./cardSlice";
import checkTokenSlice from "./checkTokenSlice";
import userSlice from "./userSlice";
import popupSlice from "./popupSlice";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    card: cardSlice,
    checkToken: checkTokenSlice,
    user: userSlice,
    popup: popupSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
