import React, { useState } from "react";
// import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Spinner,
  Button,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { signup } from "../../redux/ActionReducer/authSlice";
import "./Signup.scss";
import img from "../../assest/images/footerlogo.png";
import { signUpValidationSchema } from "../../services/ValidationSchema";

const Signin = () => {
  const { loading } = useSelector((state) => ({ ...state.auth }));
  const [passwordShown, setPasswordShown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpValidationSchema) });

  const onSubmit = (formValues, e) => {
    e.preventDefault();
    if (formValues.email && formValues.password && formValues.name) {
      dispatch(signup({ formValues, navigate, toast }));
    }
  };

  return (
    <Container fluid className="login-block ">
      <Row className="justify-content-center align-items-center">
        <Col sm={8} md={6} lg={4} xl={4} xxl={3}>
          <Row className="justify-content-center align-items-center">
            <Col className="text-center">
              <h1 className="heading-text">BOOKIT</h1>
            </Col>
          </Row>
          <Card className="login-form-block p-4 mt-3 mb-5">
            <Form onSubmit={handleSubmit(onSubmit)} className="p-3">
              <Row>
                <p className="signin-text">Sign-up</p>
              </Row>
              <Row className="mt-0 mb-1">
                <Form.Group className="mb-2">
                  <Form.Label className="input-label required ms-2">
                    Name
                  </Form.Label>
                  <Form.Control
                    className="input-box"
                    type="text"
                    {...register("name")}
                  />
                </Form.Group>
                {errors.name && (
                  <div className="text-danger ms-2 mb-2">
                    {errors.name?.message}
                  </div>
                )}
              </Row>
              <Row className="mt-0 mb-1">
                <Form.Group className="mb-2">
                  <Form.Label className="input-label required ms-2">
                    Email
                  </Form.Label>
                  <Form.Control
                    className="input-box"
                    type="email"
                    {...register("email")}
                  />
                </Form.Group>
                {errors.email && (
                  <div className="text-danger ms-2">
                    {errors.email?.message}
                  </div>
                )}
              </Row>
              <Row className="mt-2 mb-1">
                <Form.Group className="mb-2 password-field inner-addon right-addon">
                  <Form.Label className="input-label required ms-2">
                    Password
                  </Form.Label>
                  <span onClick={() => setPasswordShown(!passwordShown)}>
                    {passwordShown ? (
                      <i className="bi bi-eye-fill" />
                    ) : (
                      <i className="bi bi-eye-slash-fill" />
                    )}
                  </span>
                  <Form.Control
                    className="input-box"
                    type={passwordShown ? "text" : "password"}
                    {...register("password")}
                  />
                </Form.Group>
                {errors.password && (
                  <div className="text-danger mb-4 ms-2">
                    {errors.password?.message}
                  </div>
                )}
              </Row>
              <Row className="mt-0 mb-4">
                <Col>
                  <Button
                    type="submit"
                    className="submit-btn w-100 shadow-none"
                  >
                    {loading ? "Signing up..." : "Sign-up"}
                    {loading && (
                      <Spinner
                        animation="border"
                        size="sm"
                        variant="light"
                        className="ms-2"
                      />
                    )}
                  </Button>
                  <Button
                    type="submit"
                    className="sigin-back-btn w-100 shadow-none mt-3"
                    onClick={() => navigate("/")}
                  >
                    <i className="bi bi-caret-left-fill me-2" />
                    Back to Sign-in
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className="text-center p-signup-area">
                    By Signing up you agree to our Terms & condition
                  </p>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
      <Row className="footer-block mb-3">
        <Col className="text-center">
          <img className="footer-logo" src={img} alt="fg" />
          <p className="justify-content-center align-items-center font-face-gm footer-text">
            Copyright @ 2020 Indium Software
          </p>
        </Col>
      </Row>
    </Container>
  );
};

Signin.propTypes = {};

Signin.defaultProps = {};

export default Signin;
