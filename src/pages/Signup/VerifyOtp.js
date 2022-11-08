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
} from "react-bootstrap";
import { toast } from "react-toastify";
import { verifyUser } from "../../redux/ActionReducer/authSlice";
import "./Signup.scss";

const VerifyOtp = ({email, setUserEmailIdValue}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => ({ ...state.auth }));
  const [otpValue, setOtpValue] = useState('')

  const handleOtpField = (e) => {
    setOtpValue(e.target.value)
  }
  const hendleOtpSubmit = (e) => {
    e.preventDefault();
    if (otpValue) {
      const data = { email: email, otp: otpValue };
      dispatch(verifyUser({ data, navigate, toast, setUserEmailIdValue }));
    }else{
      toast.error("Please enter OTP");
    }
  }
  return(
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
  )
}

export default VerifyOtp;