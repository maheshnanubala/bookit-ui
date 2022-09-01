import React, { useState } from "react";
// import PropTypes from 'prop-types';
import "./Layout.scss";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import Header from "./Header/Header";
import AsideBar from "./AsideBar/AsideBar";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state.auth.user }));

  return (
    <>
      <Container fluid className="layout">
        <Row className="positon-sticky">
          <Col md={12} className="pe-0 ps-0 header do-fixed">
            <Header />
          </Col>
        </Row>
        <Row>
          <Col
            className="mt-5 Asidebar d-none d-lg-block"
            lg={2}
            id="sticky-sidebar"
          >
            <AsideBar />
          </Col>
          <Col className="mt-5 col offset-lg-2" md={12} lg={10} id="main">
            {children}
          </Col>
        </Row>
      </Container>
    </>
  );
};

Layout.propTypes = {};

Layout.defaultProps = {};

export default Layout;
