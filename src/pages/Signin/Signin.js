import React from "react";
// import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { signin } from "../../redux/ActionReducer/authSlice";
import "./Signin.scss";
import img from "../../assest/images/footerlogo.png";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  NavLink,
  Spinner,
} from "react-bootstrap";

const Signin = () => {
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = (formValues, e) => {
    e.preventDefault();
    if (formValues.email === null || formValues.email === undefined || formValues.email === ''){
      toast.error('Please enter email')
    } else if(formValues.password === null || formValues.password === undefined || formValues.password === ''){
      toast.error('Please enter password')
    }else if (formValues.email && formValues.password) {
      dispatch(signin({ formValues, navigate, toast }));
    }
  };

  return (
    <>
      <>
        <Container fluid className="bg">
          <Row className="justify-content-center align-items-center">
            <Col md="auto" sm="auto" lg="auto" xs="auto">
              <Container>
                <Row
                  id="heading-text"
                  className="justify-content-center align-items-center mt-5"
                >
                  BOOKIT
                </Row>
              </Container>
              <Card className="form-cotainer p-4 mt-5 ">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <p id="signin-text"> Sign-in</p>
                  </Row>
                  <Row className="form-group mt-4 mb-4 mx-2">
                    <label className="input-lable"> Email</label>
                    <input
                      className="form-control input-box"
                      type="email"
                      {...register("email")}
                    />
                  </Row>
                  <Row className="form-group mt-4 mb-4 mx-2">
                    <label className="input-lable">Password</label>
                    <input
                      type="password"
                      className=" form-control input-box"
                      {...register("password")}
                    />
                  </Row>
                  <Row className="form-group mt-4 mb-4 mx-2">
                    <button type="submit" className="input-box" id="submit-btn">
                      Sign-in
                      {loading ? (
                        <Spinner
                          animation="border"
                          size="sm"
                          variant="light"
                          className="ms-2"
                        />
                      ) : (
                        ""
                      )}
                    </button>
                  </Row>
                  <Row className="form-group mt-4 mb-4 mx-2">
                    <p id="signin-option-line">
                      <span>or Sign-in With</span>
                    </p>
                  </Row>
                  <Row className="form-group mt-4 mb-4 mx-2">
                    <button
                      type="button"
                      className="input-box"
                      id="signin-others"
                    >
                      <img id="microsoft-logo" />
                      Sign-in with Microsoft
                    </button>
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
              </Card>
            </Col>
          </Row>
        </Container>
      </>
      <footer className="container-fluid footer ">
        <img className="footer-logo" src={img} alt="fg" />
        <p className="justify-content-center align-items-center font-face-gm footer-text">
          Copyright @ 2020 Indium Software
        </p>
      </footer>
    </>
  );
};

Signin.propTypes = {};

Signin.defaultProps = {};

export default Signin;
