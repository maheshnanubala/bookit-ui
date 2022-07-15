import React, { useState } from "react";
// import PropTypes from 'prop-types';
import "./Layout.scss";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import Header from "./Header/Header";
import AsideBar from "./AsideBar/AsideBar";
import Signin from "../Signin/Signin.lazy";
import Signup from "../Signup/Signup.lazy";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state.auth.user }));

  return (
    <>
      {user && (
        <Container fluid className="layout">
          <Row className="positon-sticky">
            <Col md={12} className="pe-0 ps-0">
              <Header />
            </Col>
          </Row>
          <Row>
            <Col md={2} className="pe-0 ps-0">
              <AsideBar />
            </Col>
            <Col md={10}>{children}</Col>
          </Row>
        </Container>
      )}
    </>
  );
};

Layout.propTypes = {};

Layout.defaultProps = {};

export default Layout;
