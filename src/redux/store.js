import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import AuthReducer from "./ActionReducer/authSlice";
import BookworkSpaceReducer from "./ActionReducer/bookSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    bookworkspace: BookworkSpaceReducer,
  },
  middleware:[thunk,logger]
});
