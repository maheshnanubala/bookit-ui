import { useState } from "react";
import { useSelector } from "react-redux";
import Signin from "../pages/Signin/Signin.lazy";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state.auth.user }));
  return user?.email ? (
    { children }
  ) : (
    <>
      <Signin />
    </>
  );
};
export default PrivateRoute;
