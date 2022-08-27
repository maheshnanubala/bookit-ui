import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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
      {/* Public Routes */}
      <ToastContainer />
      <Routes>
        {user !== null ? (
          <Route element={<PrivateRoutes />}>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/me" element={<MyProfile />} />
            <Route exact path="/bookings" element={<MyBookings />} />
            <Route exact path="/new-booking" element={<NewBooking />} />
            <Route
              exact
              path="/new-booking/room-selection"
              element={<RoomSelection />}
            />
            <Route path="/" element={<Home />} />
            <Route exact path="*" element={<NotFound />} />
          </Route>
        ) : (
          <Route>
            <Route path="/signin" element={<Signin />} />
            <Route path="/" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/forgot-password" element={<Forgotpassword />} />
            <Route path="/reset-password" element={<Resetpassword />} />
            <Route path="*" element={<GenericNotFound />} />
          </Route>
        )}
      </Routes>
    </div>
  );
}
export default App;
