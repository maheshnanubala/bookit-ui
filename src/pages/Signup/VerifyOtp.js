import React, { useState } from "react";
// import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  Spinner,
  Button,
  Card,
  Container
} from "react-bootstrap";
import { toast } from "react-toastify";
import { verifyUser } from "../../redux/ActionReducer/authSlice";
import "./Signup.scss";
import img from "../../assest/images/footerlogo.png";

const VerifyOtp = ({ email, setUserEmailIdValue }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, user } = useSelector((state) => ({ ...state.auth }));
  const [otpValue, setOtpValue] = useState('')
  const path = window.location.pathname;
  const handleOtpField = (e) => {
    setOtpValue(e.target.value)
  }
  const hendleOtpSubmit = (e) => {
    e.preventDefault();
    if (otpValue) {
      const userMailId = user?.email || user?.user?.email;
      const data = { email: userMailId, otp: otpValue, password: "Indium@123" };
      dispatch(verifyUser({ data, navigate, toast, setUserEmailIdValue, path }));
    } else {
      toast.error("Please enter OTP");
    }
  }
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
            <Form className="p-3">
              <Row>
                <p className="signin-text">Enter One-Time Password</p>
              </Row>
              <Row className="mt-0 mb-1">
                <Form.Group className="mb-2">
                  <Form.Label className="input-label required ms-2">
                    Enter the code you received via Email
                  </Form.Label>
                  <Form.Control
                    className="input-box"
                    type="text"
                    onChange={handleOtpField}
                  />
                </Form.Group>
              </Row>
              <Row className="mt-0 mb-4">
                <Col>
                  <Button
                    type="submit"
                    className="submit-btn w-100 shadow-none"
                    onClick={hendleOtpSubmit}
                  >
                    {loading ? "Authenticating..." : "Authenticate"}
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
  )
}

export default VerifyOtp;