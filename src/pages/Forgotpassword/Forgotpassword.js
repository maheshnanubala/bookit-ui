import React, { useState } from "react";
import "./Forgotpassword.scss";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { validateFormForForgotPassword } from "../../services/Validation";

const Forgotpassword = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({ error: "No value" });
  const paraText = `Enter your email address, and we'll send you a link to reset your password.`;

  const handleChange = ({ target: { name, value } }) => {
    let updateValues = { ...values, [name]: value };
    setValues(updateValues);
    setErrors(validateFormForForgotPassword(updateValues));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="Form container-fluid">
      <section className="row form-row justify-content-center ">
        <section className="col-12 col-sm-12 col-md-5 form-main-page">
          <div className="mt-3">
            <h1 className="text-center form-header mt-5"> Bookit</h1>
            <p className="text-center p-area mt-2 ">{paraText}</p>
            <form className="form-container" onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control input-form"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
              {errors.email && (
                <span className="text-danger">{errors.email}</span>
              )}
              <section className="d-grid gap-2">
                <Button
                  type="submit"
                  className="btn forgot-button mt-3"
                  disabled={Object.values(errors).some((v) => v)}
                >
                  Send Link
                </Button>
              </section>

              <section className="row">
                <div className="col-5 line"></div>
                <div className="col-2 text-center"> OR </div>
                <div className="col-5 line"></div>
              </section>
              <Link to="/signin" className="link-area">
                <p className="mt-3 back-login-p">Back to Login </p>
              </Link>
            </form>
          </div>
        </section>
      </section>
    </div>
  );
};

Forgotpassword.propTypes = {};

Forgotpassword.defaultProps = {};

export default Forgotpassword;
