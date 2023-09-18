import { configureStore } from "@reduxjs/toolkit";
import cardSlice from "./cardSlice";
import checkTokenSlice from "./checkTokenSlice";
import userSlice from "./userSlice";
import popupSlice from "./popupSlice";
import authSlice from "./authSlice";

export default configureStore({
  reducer: {
    card: cardSlice,
    checkToken: checkTokenSlice,
    user: userSlice,
    popup: popupSlice,
    auth: authSlice,
  },
});
