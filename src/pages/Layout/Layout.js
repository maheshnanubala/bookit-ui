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
      {user && (
        <Container fluid className="layout">
          <Row className="positon-sticky">
            <Col md={12} className="pe-0 ps-0 header do-fixed">
              <Header />
            </Col>
          </Row>
          <Row>
            <Col  xs={4} md={2} className="mt-5 Asidebar do-fixed">
              <AsideBar />      
            </Col>
            <Col  xs={10} md={10} className='mt-5 cust-children'>{children}</Col>
          </Row>
        </Container>
      )}
    </>
  );
};

Layout.propTypes = {};

Layout.defaultProps = {};

export default Layout;
