/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { PrivateRoutes } from "./Authentication/PrivateRoutes";
import { setUser } from "./redux/ActionReducer/authSlice";
import { PrivateRouteConfig } from "./routes/PrivateRouteConfig";
import { PublicRouteConfig } from "./routes/PublicRouteConfig";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

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
