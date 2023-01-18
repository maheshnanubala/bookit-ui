import React from "react";
import About from "../pages/About/About.lazy";
import Forgotpassword from "../pages/Forgotpassword/Forgotpassword.lazy";
import { GenericNotFound } from "../pages/NotFound/GenericNotFound";
import Signin from "../pages/Signin/Signin.lazy";
import SigninNew from "../pages/Signin/SigninNew";
import Signup from "../pages/Signup/Signup.lazy";
import VerifyOtp from "../pages/Signup/VerifyOtp";


export const PublicRouteConfig = [
  {
    name: "signin",
    path: "/signin",
    element: <Signin />,
  },

 
  {
    name: "signin redirect",
    path: "/",
    element: <Signin />,
  },
  {
    name: "signup",
    path: "/signup",
    element: <Signup />,
  },
  {
    name: "about",
    path: "/about",
    element: <About />,
  },
  {
    name: "forgot-password",
    path: "/forgot-password",
    element: <Forgotpassword />,
  },
  {
    name: "signin-page",
    path: "/signin-page",
    element: <SigninNew />,
  },
  {
    name: "generic not found",
    path: "*",
    element: <GenericNotFound />,
  },
];
