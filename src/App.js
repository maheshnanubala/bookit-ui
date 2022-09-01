import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./pages/Home/Home.lazy";
import About from "./pages/About/About.lazy";
import Signin from "./pages/Signin/Signin.lazy";
import Signup from "./pages/Signup/Signup.lazy";
import Forgotpassword from "./pages/Forgotpassword/Forgotpassword.lazy";
import Resetpassword from "./pages/Resetpassword/Resetpassword.lazy";
import { useDispatch, useSelector } from "react-redux";
import MyProfile from "./pages/MyProfile/MyProfile.lazy";
import MyBookings from "./pages/MyBookings/MyBookings.lazy";
import { PrivateRoutes } from "./Authentication/PrivateRoutes";
import { setUser } from "./redux/ActionReducer/authSlice";
import { RoomSelection } from "./pages/BookSpace/RoomSelection/RoomSelection";
import NewBooking from "./pages/NewBooking/newBooking.js";
import { NotFound } from "./pages/NotFound/NotFound.js";
import { GenericNotFound } from "./pages/NotFound/GenericNotFound";
import { PrivateRouteConfig } from "./routes/PrivateRouteConfig";
import { PublicRouteConfig } from "./routes/PublicRouteConfig";

function App() {
  const { user: userAuthenticated } = useSelector((state) => ({
    ...state.auth.user,
  }));
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(setUser(userAuthenticated));
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        {user !== null ? (
          <Route element={<PrivateRoutes />}>
            {PrivateRouteConfig.map(({ name, path, exact, element }) => (
              <Route key={name} exact={exact} path={path} element={element} />
            ))}
          </Route>
        ) : (
          <Route>
            {PublicRouteConfig.map(({ name, path, element }) => (
              <Route key={name} path={path} element={element} />
            ))}
          </Route>
        )}
      </Routes>
    </div>
  );
}
export default App;
