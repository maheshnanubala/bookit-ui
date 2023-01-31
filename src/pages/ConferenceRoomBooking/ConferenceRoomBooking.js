/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Container, Row } from "react-bootstrap";
//import SpaceType from "./spaceType.js";
import FillDetails from "./FillDetails.js";
import "./ConferenceRoomBooking.scss";

function conferenceRoomBooking() {
  const path = window.location.pathname
  const newBookFlag = path === '/conferenceRoom-booking' ? true : false
  
  return (
    <>
      <Container fluid className="p-5 new-booking-block">
        <Row>
          <p id="page-title">{`${newBookFlag ? 'Conference' : 'Modify'} Room`}</p>
        </Row>
        {/* <hr className="hr" />
        <Row className="p-2">
          {/* <SpaceType /> */}
          <hr className="hr" />
         {/* </Row>  */} 
        <Row>
          <FillDetails/>
        </Row>
      </Container>
    </>
  );
}

export default conferenceRoomBooking;