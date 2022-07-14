import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./ActionReducer/authSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
  },
});
