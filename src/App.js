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
import BookSpaceModal from "./pages/BookSpace/BookSpaceModal";
import { useDispatch, useSelector } from "react-redux";
import MyProfile from "./pages/MyProfile/MyProfile.lazy";
import MyBookings from "./pages/MyBookings/MyBookings.lazy";
import { BookSpaceConfirmation } from "./pages/BookSpace/BookSpaceConfirmation";
import BookSpaceForm from "./pages/BookSpace/BookSpaceForm";
import BookSpace from "./pages/BookSpace/BookSpace.lazy";
import Layout from "./pages/Layout/Layout";
import PrivateRoute from "./Authentication/PrivateRoutes";
import { setUser } from "./redux/ActionReducer/authSlice";

function App() {
  const [isAuth, setAuth] = useState(false);
  const { user: userAuthenticated } = useSelector((state) => ({
    ...state.auth.user,
  }));
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(setUser(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      {/* Public Routes */}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/reset-password" element={<Resetpassword />} />
      </Routes>


      {/* Private Routes */}

      <Layout>
        <Routes>
          <Route path="/home" element={<Home />} />

          <Route path="/me" element={<MyProfile />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/book-space" element={<BookSpace />} />
          <Route path="/new-book-space" element={<BookSpaceForm />} />
          <Route
            path="/book-space-confirmation"
            element={<BookSpaceConfirmation />}
          />
        </Routes>
      </Layout>

    </div>
  );
}

export default App;
