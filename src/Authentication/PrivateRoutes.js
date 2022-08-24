import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "../pages/Layout/Layout";
import Signin from "../pages/Signin/Signin.lazy";

export const PrivateRoutes = () => {
  const { user } = useSelector((state) => ({
    ...state.auth.user,
  }));
  return user !== null ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/" />
  );
};
