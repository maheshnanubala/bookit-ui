/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Container, Row } from "react-bootstrap";
//import SpaceType from "./spaceType.js";
import FillDetails from "./FillDetails.js";
import "./conferenceRoomBooking.scss"

function conferenceRoomBooking() {
  const path = window.location.pathname;
  const conferenceRoomBookFlag = path === "/conferenceRoom-booking" ? true : false;

  return (
    <>
      <Container fluid className="p-5 new-booking-block">
        <Row>
          <p id="page-title">{`${conferenceRoomBookFlag ? "Conference" : "Modify"} Room`}</p>
        </Row>
       {/* <hr className="hr" />
        <Row className="p-2">
          <hr className="hr" />
  </Row> */}
        <Row>
          <FillDetails />
        </Row>
      </Container>
    </>
  );
}

export default conferenceRoomBooking;
