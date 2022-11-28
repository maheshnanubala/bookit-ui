/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import SpaceType from "./spaceType.js";
import FillDetails from "./FillDetails.js";
import "./newBooking.scss";

function newBooking() {
  const modifyBookingData = useSelector((state) => ({...state.bookworkspace.modifyBookingData}));
  const location = useLocation();
  const newBookFlag = location?.state?.newBookFlag;

  return (
    <>
      <Container fluid className="p-5 new-booking-block">
        <Row>
          <p id="page-title">{`${modifyBookingData?.id ? 'Modify' : 'New'} Booking`}</p>
        </Row>
        <hr className="hr" />
        <Row className="p-2">
          <SpaceType />
          <hr className="hr" />
        </Row>
        <Row>
          <FillDetails newBookFlag={newBookFlag} />
        </Row>
      </Container>
    </>
  );
}

export default newBooking;