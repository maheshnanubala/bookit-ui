import React, { useState } from "react";
import "./Signup.scss";
import { validateForm } from "../../services/Validation";
import { useNavigate } from "react-router-dom";
import indiumLogo from "../../assest/images/footerlogo.png";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { signup } from "../../redux/ActionReducer/authSlice";

const Signup = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({ error: "No value" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = ({ target: { name, value } }) => {
    let updateValues = { ...values, [name]: value };
    setValues(updateValues);
    setErrors('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validateForm(values));
    if (!Object.values(validateForm(values)).some((v) => v)) {
      dispatch(signup({ formValues: values, navigate, toast }));
    }
  };

  return (
    <Container fluid className="sign-up-container">
      <section className="sign-up-page">
        <header>
          <h1 className="text-center form-signup-header  mb-5"> Bookit</h1>
        </header>

        <Row className="justify-content-center sign-up-row ">
          <Col xs={12} className="form-main-page px-4 py-5 px-sm-4 py-sm-5">
            <div className="internal-div">
              <Form className="form-signup-container" onSubmit={handleSubmit}>
                <h3 className="signup-text text-center">Sign-up</h3>
                <label className="label-signup-text mt-3">Name</label>
                <input
                  type="text"
                  className="form-control input-signup-input"
                  name="name"
                  onChange={handleChange}
                />
                {errors.name && (
                  <span className="mt-1 mb-2 text-danger">{errors.name}</span>
                )}
                <br />
                <label className="label-signup-text">Email</label>
                <input
                  type="text"
                  className="form-control input-signup-input"
                  name="email"
                  onChange={handleChange}
                />
                {errors.email && (
                  <span className="mt-1 mb-2 text-danger">{errors.email}</span>
                )}
                <br />
                <label className="label-signup-text">Password</label>
                <input
                  type="password"
                  className="form-control input-signup-input"
                  name="password"
                  onChange={handleChange}
                />
                {errors.password && (
                  <span className=" mt-1 mb-2 text-danger">
                    {errors.password}
                  </span>
                )}
                <br />
                <section className="d-grid gap-2 button-item">
                  <Button type="submit" className="btn btn-color sign-up-btn">
                    Sign-up
                  </Button>
                  <Button onClick={() => navigate('/')} className="btn btn-color sign-in-btn">
                    Back to Sign-in
                  </Button>
                </section>
                <section>
                  <p className="text-center m-3 p-signup-area">
                    By Signing up you agree to our Terms & condition
                  </p>
                </section>
              </Form>
            </div>
          </Col>
        </Row>

        <footer className="text-center footer-signup">
          <img className="footer-image" src={indiumLogo} alt="logo" />
          <p className="footer-text">Copyright @ 2020 Indium Software</p>
        </footer>
      </section>
    </Container>
  );
};

Signup.propTypes = {};

Signup.defaultProps = {};

export default Signup;
