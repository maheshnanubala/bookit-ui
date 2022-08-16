
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../Home/Home.scss';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { TbDotsVertical } from 'react-icons/tb'
import image from '../../images/conference-icon.png'
import { ApiUtility } from '../../ApiUtility';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
// import OverlayTrigger from "react-bootstrap/OverlayTrigger";
// import Popover from 'react-bootstrap/Popover';
// import Dropdown from 'react-bootstrap/Dropdown';

const Home = () => {
  // const [show, setShow] = useState(false);
  // const handleShow = () => { setShow(true) }
  const [upCommingBooking, setUpCommingBooking] = useState([]);
  const [recentBooking, setRecentBooking] = useState([]);

  useEffect(() => {
    getMyBookingDetails();
  }, [])

  const getMyBookingDetails = async () => {
    let response = await ApiUtility.getMyBookingsRecords();
    setUpCommingBooking(response.upcoming_booking_details)
    setRecentBooking(response.past_booking_details)
  }
  const oneDay = 1000*60*60*24;
  const [participants, setParticipants] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (participants) => {
    setShow(true)
    setParticipants(participants)
  }
  return (
    <>
      <Container fluid className='home'>
        <hr className='hr' />
        <section className="custom-upcomingbooking-section pt-3 pb-3">
          <Row>
            <h4 className="headings">Upcoming Bookings</h4>
            {
              (upCommingBooking?.length > 0 ?
              upCommingBooking.map((booking) => (
                <Col md={4} onClick={() => { handleShow(booking.BookingParticipant) } }>
                  <Card className="text-initial ub-border-left">
                    <Card.Body className='card-body-item'>
                      {/* <OverlayTrigger
                        trigger="click"
                        placement="bottom"
                        overlay={
                          <Popover className={`popover-positioned-bottom`}>
                            <Popover.Body>
                              <Dropdown.Item href="#/release" >Release booked Room</Dropdown.Item>
                              <Dropdown.Item href="#/reschedule"> Reschedule Date & time</Dropdown.Item>
                              <Dropdown.Item href="#/share" > Share the Details</Dropdown.Item>
                            </Popover.Body>
                          </Popover>
                        }
                      >
                        <span className="book-label"> <TbDotsVertical className='icon-dots' onClick={handleShow} /></span>
                      </OverlayTrigger> */}
                      <span className="book-label"> <TbDotsVertical className='icon-dots'/></span>
                      <Card.Title className='card-headings'> <img alt='img' src={image} className='icon-headings' /> {new Date(booking.from_datetime).toLocaleDateString()} | {new Date(booking.to_datetime).toLocaleDateString()}</Card.Title>
                      <Card.Title className='time-header'>{new Date(booking.from_datetime).toLocaleTimeString('en-US', {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}) || ''} - {new Date(booking.to_datetime).toLocaleTimeString('en-US', {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}) || ''}</Card.Title>
                      <Card.Title className='card-headers'>{booking.purpose || ''}</Card.Title>
                      <Card.Text className='cardtext' >
                        <ul className='card-list-item'>
                          <li>{booking.city_name} - {booking.building_name}</li>
                          <li>{booking.floor_name} - {booking.BookingWorkspace?.[0]?.workspace_name}</li>
                          <li>Room Capacity {[0, 1].includes(booking.BookingWorkspace?.[0]?.workspace_capacity) ? `${booking.BookingWorkspace?.[0]?.workspace_capacity} Seat` : `${booking.BookingWorkspace?.[0]?.workspace_capacity} Seats`}</li>
                        </ul>
                      </Card.Text >
                    </Card.Body>
                  </Card>
                </Col>
              ))
              : <span className='not-found-span'>No upcoming bookings</span>)
            }
          </Row>
        </section>
        <hr className='hr' />
        <section className="custom-recentbooking-section pt-3 pb-3">
          <Row>
            <h4 className="headings"> Booking History</h4>
            {
              (recentBooking?.length > 0 ?
              recentBooking.map((booking) => (
                  <Col md={4} onClick={() => { handleShow(booking.BookingParticipant) } }>
                    <Card className={(Math.ceil((new Date().getTime() - new Date(booking.from_datetime).getTime())/(oneDay))) <= 7 ? "text-initial rb-border-left" : "text-initial rrb-border-left"}>
                      <Card.Body className='card-body-item'>
                        {/* <OverlayTrigger
                          trigger="click"
                          placement="bottom"
                          overlay={
                            <Popover className={`popover-positioned-bottom`}>
                              <Popover.Body>
                                <Dropdown.Item href="#/release" >Release booked Room</Dropdown.Item>
                                <Dropdown.Item href="#/reschedule"> Reschedule Date & time</Dropdown.Item>
                                <Dropdown.Item href="#/share" > Share the Details</Dropdown.Item>
                              </Popover.Body>
                            </Popover>
                          }
                        >
                          <span className="book-label"> <TbDotsVertical className='icon-dots' onClick={handleShow} /></span>
                        </OverlayTrigger> */}
                        <span className="book-label"> <TbDotsVertical className='icon-dots'/></span>
                        <Card.Title className='card-headings'> <img alt='img' src={image} className='icon-headings' /> {new Date(booking.from_datetime).toLocaleDateString()} | {new Date(booking.to_datetime).toLocaleDateString()}</Card.Title>
                        <Card.Title className='time-header'>{new Date(booking.from_datetime).toLocaleTimeString('en-US', {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}) || ''} - {new Date(booking.to_datetime).toLocaleTimeString('en-US', {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}) || ''}</Card.Title>
                        <Card.Title className='card-headers'>{booking.purpose || ''}</Card.Title>
                        <Card.Text className='cardtext' >
                          <ul className='card-list-item'>
                            <li>{booking.city_name} - {booking.building_name}</li>
                            <li>{booking.floor_name} - {booking.BookingWorkspace?.[0]?.workspace_name}</li>
                            <li>Room Capacity {[0, 1].includes(booking.BookingWorkspace?.[0]?.workspace_capacity) ? `${booking.BookingWorkspace?.[0]?.workspace_capacity} Seat` : `${booking.BookingWorkspace?.[0]?.workspace_capacity} Seats`}</li>
                          </ul>
                        </Card.Text >
                      </Card.Body>
                    </Card>
                  </Col>
              ))
              : <span className='not-found-span'>No recent bookings</span>)
            }
          </Row>
        </section>
        <hr className='hr' />
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        className="booking-participant-modal"
      >
        <Modal.Header closeButton className='participant-model-title'>
          <Modal.Title>Participants Details</Modal.Title>
        </Modal.Header>
        <div className="booking-participant-body" style={{height: participants.length > 5 ? '' : "300px"}}>
          <Modal.Body>
            <Table striped bordered hover className='booking-participant-table'>
              <thead  closeButton className='participant-model-header'>
                <tr>
                  <th>S.No</th>
                  <th>User Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {
                  participants?.length > 0 ?
                    participants.map((participant, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{participant.user_name}</td>
                        <td>{participant.user_email}</td>
                      </tr>
                    ))
                  : <tr><td colSpan={3} className='not-found-span text-center'>No participants found</td></tr>
                }
              </tbody>
            </Table>
          </Modal.Body>
        </div>
        <Modal.Footer className='p-0'>
          <Row className='footer-block w-100'>
            <Col className="text-center">
              <Button size="lg" variant="danger" onClick={handleClose}>
              Close
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
      </Container>
    </>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;