import React from "react";
import { useSelector } from "react-redux";
import Signin from "../pages/Signin/Signin.lazy";

export const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => ({
    ...state.auth.user,
  }));
  return <div> {user !== null ? children : <Signin />} </div>;
};
