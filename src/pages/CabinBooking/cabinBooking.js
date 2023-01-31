/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Container, Row } from "react-bootstrap";
import CabinFillDetails from "./CabinFillDetails.js";
import "./cabinBooking.scss";

function cabinBooking() {
  const path = window.location.pathname
  const cabinBookFlag = path === '/cabin-booking' ? true : false
  
  return (
    <>
      <Container fluid className="p-5 cabin-booking-block">
        <Row>
          <p id="page-title">{`${cabinBookFlag ? 'Cabin' : 'Modify'} Booking`}</p>
        </Row>
        <hr className="hr" />

        <Row>
          <CabinFillDetails/>
        </Row>
      </Container>
    </>
  );
}

export default cabinBooking;