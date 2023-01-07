/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Container, Row } from "react-bootstrap";
import SpaceType from "./spaceType.js";
import FillDetails from "./FillDetails.js";
import "./newBooking.scss";
import CabinBooking from "./CabinBooking/CabinBooking.js";

function newBooking() {
  const path = window.location.pathname
  const newBookFlag = ((path === '/conference-booking') || (path === '/cabin-booking')) ? true : false
  const bookingType = path === '/cabin-booking' ? 'Cabin' : 'Conference';
  return (
    <>
      <Container fluid className="p-5 new-booking-block">
        <Row>
          <p id="page-title">{`${newBookFlag ? 'New' : 'Modify'} ${bookingType} Booking`}</p>
        </Row>
        <hr className="hr" />
        {bookingType !== "Cabin" ? <Row className="p-2">
          <SpaceType />
          <hr className="hr" />
        </Row> : null}
        <Row>
          {bookingType === "Cabin" ? <CabinBooking /> : <FillDetails />}
        </Row>
      </Container>
    </>
  );
}

export default newBooking;