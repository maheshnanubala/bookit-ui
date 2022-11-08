import React, { useState } from "react";
// import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  NavLink,
  Spinner,
  Button,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { signin } from "../../redux/ActionReducer/authSlice";
import "./Signin.scss";
import img from "../../assest/images/footerlogo.png";
import { signInValidationSchema } from "../../services/ValidationSchema";
import microsoftLogo from "../../assest/images/732221.png";
import VerifyOtp from "../Signup/VerifyOtp";

const Signin = () => {
  const { loading } = useSelector((state) => ({ ...state.auth }));
  const [passwordShown, setPasswordShown] = useState(false);
  const [userEmailId, setUserEmailId] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signInValidationSchema) });

  const onSubmit = (formValues, e) => {
    e.preventDefault();
    if (formValues.email && formValues.password) {
      dispatch(signin({ formValues, navigate, toast, setUserEmailId }));
    }
  };

  return (
    <Container fluid className="login-block">
      <Row className="justify-content-center align-items-center">
        <Col sm={8} md={6} lg={4} xl={4} xxl={3}>
          <Row className="justify-content-center align-items-center">
            <Col className="text-center">
              <h1 className="heading-text">BOOKIT</h1>
            </Col>
          </Row>
          <Card className="login-form-block p-4 mt-3 mb-5">
            {!userEmailId ?
              <Form onSubmit={handleSubmit(onSubmit)} className="p-3">
                <Row>
                  <p className="signin-text"> Sign-in</p>
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
                <Row className="mt-2 mb-2">
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
                      {loading ? "Signing in..." : "Sign-in"}
                      {loading && (
                        <Spinner
                          animation="border"
                          size="sm"
                          variant="light"
                          className="ms-2"
                        />
                      )}
                    </Button>
                  </Col>
                </Row>
                <Row className="mt-4 mb-3">
                  <Col>
                    <p className="signin-option-line">
                      <span>or Sign-in With</span>
                    </p>
                  </Col>
                </Row>
                <Row className="mt-0 mb-3">
                  <Col>
                    <Button
                      type="button"
                      className="signin-others w-100 shadow-none"
                    >
                      <span>
                        <img
                          src={microsoftLogo}
                          alt="microsoft"
                          title="microsoft"
                          className="img-fluid microsoft-logo"
                        />
                      </span>
                      Sign-in with Microsoft
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <NavLink className="navlinks">Forgot Password?</NavLink>
                  </Col>
                  <Col>
                    <Link className="navlinks" to="/signup">
                      Sign-Up for an account
                    </Link>
                  </Col>
                </Row>
              </Form>
            :
              <VerifyOtp email={userEmailId} setUserEmailId={setUserEmailId}/>
            }
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
