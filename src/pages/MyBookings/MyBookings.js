import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMyBookingDetails } from "../../redux/ActionReducer/bookSlice";
import "./MyBookings.scss";
import { UpcomingBookingCardItem } from "../Home/UpcomingBookingCard";
import { RecentBookingCardItem } from "../Home/RecentBookingCardItem";

const MyBookings = () => {
  const UserObj = JSON.parse(localStorage.getItem("user"))?.user || {};
  const oneDay = 1000 * 60 * 60 * 24;
  const [participants, setParticipants] = useState([]);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [bookedByUser, setBookedByUser] = useState("");
  const handleClose = () => setShow(false);

  const { workspaceBookingDetails } = useSelector((state) => ({
    ...state.bookworkspace,
  }));

  useEffect(() => {
    dispatch(getMyBookingDetails());
  }, [dispatch]);

  const handleShow = (participants, bookedByUserName) => {
    setShow(true);
    setParticipants(participants);
    setBookedByUser(bookedByUserName);
  };

  const upcomingBookings = workspaceBookingDetails?.upcoming_booking_details;

  return (
    <Container fluid className="home">
      <section className="custom-upcomingbooking-section pt-3 pb-3">
        <Row>
          <h4 className="headings">Upcoming Bookings</h4>
          {upcomingBookings?.length > 0 ? (
            upcomingBookings
              .slice()
              .sort((a, b) => (a.from_datetime > b.from_datetime ? 1 : -1))
              .map((booking) => (
                <React.Fragment key={booking.id}>
                  <UpcomingBookingCardItem
                    booking={booking}
                    handleShow={handleShow}
                    uniqueKey={booking.id}
                  />
                </React.Fragment>
              ))
          ) : (
            <span className="not-found-span">No upcoming bookings</span>
          )}
        </Row>
      </section>
      <hr className="hr" />
      <section className="custom-recentbooking-section pt-3 pb-3">
        <Row>
          <h4 className="headings"> Booking History</h4>
          {workspaceBookingDetails?.past_booking_details?.length > 0 ? (
            workspaceBookingDetails?.past_booking_details.map((booking) => (
              <React.Fragment key={booking.id}>
                <RecentBookingCardItem
                  booking={booking}
                  oneDay={oneDay}
                  handleShow={handleShow}
                  uniqueKey={booking.id}
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
          style={{ height: participants.length > 5 ? "" : "300px" }}
        >
          <Modal.Body>
            <Row className="booked-by-row">
              <Col>
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
                    <tr key={participants.id}>
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
    </Container>
  );
};

MyBookings.propTypes = {};

MyBookings.defaultProps = {};

export default MyBookings;
