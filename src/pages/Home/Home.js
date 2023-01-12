/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Table } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyBookingDetails } from "../../redux/ActionReducer/bookSlice";
import { UpcomingBookingCardItem } from "./UpcomingBookingCard";
import { RecentBookingCardItem } from "./RecentBookingCardItem";
import "./Home.scss";
import BookedCabinsDetailsModal from "./BookedCabinsDetailsModal";

const Home = () => {
  const [bookedByUser, setBookedByUser] = useState("");
  const [participants, setParticipants] = useState([]);
  const [show, setShow] = useState(false);
  const [showCabinDetails, setShowCabinDetails] = useState(false);
  const [bookedCabinDetails, setBookedCabinDetails] = useState([]);


  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { workspaceBookingDetails, cabinBookingDetails } = useSelector((state) => ({ ...state.bookworkspace }));

  const userdetails = JSON.parse(localStorage.getItem("user"));
  const UserObj = JSON.parse(localStorage.getItem("user"))?.user || {};
  const oneDay = 1000 * 60 * 60 * 24;

  useEffect(() => {
    dispatch(getMyBookingDetails());
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (participants, bookedByUserName) => {
    setShow(true);
    setParticipants(participants);
    setBookedByUser(bookedByUserName);
  };
  const upcomingBookings = workspaceBookingDetails?.upcoming_booking_details;
  const upcomingCabinBookings = cabinBookingDetails?.upcoming_cabin_booking_details;
  const handleCabinDetails = (booking) => {
    setShowCabinDetails(true);
    setBookedCabinDetails(booking.cabin_booking_details)
  }
  const handleRecentBookings = () => {
    let arr = [...(workspaceBookingDetails?.past_booking_details || []), ...(cabinBookingDetails?.past_cabin_booking_details.filter((obj) => obj.cabin_booking_details.length > 0) || [])]
    arr.length > 0 && arr.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    return arr;
  }
  return (
    <Container fluid className="home">
      <section className="pt-3 pb-2">
        <Row>
          <Col xs={12} sm={6} md={6} lg={6}>
            <h4 id="welcomeName-row">
              Welcome
              <span id="text-name" className="ms-2">
                {userdetails?.user?.name} !
              </span>
            </h4>
          </Col>
          {/* <Col className="home-newbooking-btn" xs={12} sm={6} md={6} lg={6}>
            <Button
              className="booking-icon"
              onClick={() => navigate("/new-booking")}
            >
              New Booking
            </Button>
          </Col> */}
        </Row>
      </section>
      <section>
        <Row className="custom-upcomingbooking-section pt-5 pb-3">
          <h4 className="headings">Upcoming Conference Bookings</h4>
          {upcomingBookings?.filter(val => val.active).length > 0 ? (
            upcomingBookings?.filter(val => val.active).map((booking) => (
              <React.Fragment key={booking.id}>
                <UpcomingBookingCardItem
                  booking={booking}
                  handleShow={handleShow}
                  cardType={"Conference & WorkSpace"}
                />
              </React.Fragment>
            ))
          ) : (
            <span className="not-found-span">No upcoming bookings</span>
          )}
        </Row>
      </section>
      <section>
        <Row className="custom-upcomingbooking-section pt-5 pb-3">
          <h4 className="headings">Upcoming Cabin Bookings</h4>
          {upcomingCabinBookings?.filter(val => val.active).length > 0 ? (
            upcomingCabinBookings?.filter(val => val.active).map((booking) => (
              <React.Fragment key={booking.id}>
                <UpcomingBookingCardItem
                  booking={booking}
                  handleShow={handleShow}
                  cardType={"Cabin"}
                  handleCabinDetails={handleCabinDetails}
                />
              </React.Fragment>
            ))
          ) : (
            <span className="not-found-span">No upcoming cabin bookings</span>
          )}
        </Row>
      </section>
      <hr className="hr" />
      <section>
        <Row className="custom-recentbooking-section pt-3 pb-3">
          <h4 className="headings"> Booking History</h4>
          {handleRecentBookings().length > 0 ? (
            handleRecentBookings()?.slice(0, 3)
              .map((booking) => (
                <React.Fragment key={booking.id}>
                  <RecentBookingCardItem
                    booking={booking}
                    oneDay={oneDay}
                    handleShow={handleShow}
                    handleCabinDetails={handleCabinDetails}
                  />
                </React.Fragment>
              ))
          ) : (
            <span className="not-found-span">No recent bookings</span>
          )}
        </Row>
      </section>
      <hr className="hr" />
      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        size="lg"
        className="booking-participant-modal"
      >
        <Modal.Header className="participant-model-title">
          <Col md={6}>
            <Modal.Title>Participants Details</Modal.Title>
          </Col>
          <Col md={6} className="text-end">
            <button
              className="bg-transparent modal-close-btn"
              onClick={handleClose}
            >
              <i className="bi bi-x-lg" />
            </button>
          </Col>
        </Modal.Header>
        <div
          className="booking-participant-body"
          style={{
            height: participants.length > 5 ? "" : "300px",
            overflow: "auto",
          }}
        >
          <Modal.Body>
            <Row className="booked-by-row">
              <Col className="ps-0">
                <span className="booked-by-col">Booked By</span> :{" "}
                <span>
                  {bookedByUser} {UserObj.name === bookedByUser ? "(you)" : ""}
                </span>
              </Col>
            </Row>
            <Table striped bordered hover className="booking-participant-table">
              <thead className="participant-model-header">
                <tr>
                  <th>S.No</th>
                  <th>User Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {participants?.length > 0 ? (
                  participants.map((participant, index) => (
                    <tr key={participant.id}>
                      <td>{index + 1}</td>
                      <td>
                        {participant.user_name}{" "}
                        {UserObj.name === participant.user_name ? "(you)" : ""}
                      </td>
                      <td>{participant.user_email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="not-found-span text-center">
                      No participants found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Modal.Body>
        </div>
        <Modal.Footer className="p-0">
          <Row className="footer-block w-100">
            <Col className="text-center">
              <Button
                size="lg"
                variant="danger"
                className="close-btn"
                onClick={handleClose}
              >
                Close
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
      {showCabinDetails && <BookedCabinsDetailsModal
        showCabinDetails={showCabinDetails}
        bookedCabinDetails={bookedCabinDetails}
        closeHandler={() => setShowCabinDetails(false)}
        callFrom={"showDetails"}
        Title={"Cabin Booking Details"}
      />}
    </Container>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
