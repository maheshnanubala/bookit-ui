import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "../pages/Layout/Layout";
import { AppLogout } from "../routes/AppLogout";

export const PrivateRoutes = () => {
  const { user } = useSelector((state) => ({
    ...state.auth.user,
  }));
  return user !== null ? (
    <AppLogout>
      <Layout>
        <Outlet />
      </Layout>
    </AppLogout>
  ) : (
    <Navigate to="/" />
  );
};
