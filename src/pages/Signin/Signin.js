import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { signin } from "../../redux/ActionReducer/authSlice";
import "./Signin.scss";

const Signin = () => {
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = (formValues, e) => {
    e.preventDefault();
    if (formValues.email && formValues.password) {
      dispatch(signin({ formValues, navigate, toast }));
    }
  };

  return (
    <div className="Signin">
      <h3 className="signInBookIt text-center">BOOKIT</h3>
      <form className="signInForm" onSubmit={handleSubmit(onSubmit)}>
        <h5 className="signInText">SIGN IN</h5>
        <div className="mb-3">
          <label className="emailLabel">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            {...register("email")}
          />
        </div>
        <div className="mb-3">
          <label className="passwordLable">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            {...register("password")}
          />
        </div>
        <p className="forgotPassword">
          <a href="#">Forgot password</a>
        </p>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary signInButton">
            Sign-in
          </button>
        </div>
        <p className="signUpLink">
          <a href="#">Sign-up</a>
        </p>
      </form>
    </div>
  );
};

Signin.propTypes = {};

Signin.defaultProps = {};

export default Signin;
