import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./ActionReducer/authSlice";
import BookworkSpaceReducer from "./ActionReducer/bookSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    bookworkspace: BookworkSpaceReducer,
  },
});
