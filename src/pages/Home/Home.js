
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Home.scss';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Routes, Route, useNavigate } from 'react-router-dom';
import { TbDotsVertical } from 'react-icons/tb'
import image from '../../images/conference-icon.png'
import { ApiUtility } from '../../ApiUtility';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from 'react-bootstrap/Popover';
import Dropdown from 'react-bootstrap/Dropdown';

const userdetails = JSON.parse(localStorage.getItem('user'));


const Home = () => {
  const navigate = useNavigate();
  const navigateToNewBookings = () => {
    navigate('/new-bookings');
  };
  const [show, setShow] = useState(false);
  const handleShow = () => { setShow(true) }
  const [upCommingBooking, setUpCommingBooking] = useState([]);
  const [recentBooking, setRecentBooking] = useState([]);
  const [rootClose, setRootClose] = useState(false)

  useEffect(() => {
    getMyBookingDetails();
  }, [])

  const getMyBookingDetails = async () => {
    let response = await ApiUtility.getMyBookingsRecords();
    setUpCommingBooking(response.upcoming_booking_details)
    setRecentBooking(response.past_booking_details.slice(0, 3))
  }
  const oneDay = 1000*60*60*24;

  return (
    <>
      <Container fluid className='home'>
        <section className=" pt-5 pb-2 ">
          <Row>
            <Col md={6}>
              <h4 id="welcomeName-row">
                Welcome back <span id="text-name">{userdetails?.user?.name} !</span>
              </h4>
            </Col>
            <Col className='justify-content-end' md={6}>
              <Button className='booking-icon' onClick={navigateToNewBookings}>New Booking</Button>
            </Col>
          </Row>
        </section>
        <hr className='hr' />
        <section className="custom-upcomingbooking-section pt-3 pb-3">
          <Row>
            <h4 className="headings">Upcoming Bookings</h4>
            {
              (upCommingBooking?.length > 0 ? 
              upCommingBooking.map((booking) => (
                <Col md={4}>
                  <Card className="text-initial ub-border-left">
                    <Card.Body className='card-body-item'>
                      <OverlayTrigger
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
                      </OverlayTrigger>
                      <Card.Title className='card-headings'> <img alt='img' src={image} className='icon-headings' /><span>{new Date(booking.from_datetime).toLocaleDateString()}</span> <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span> | <span>{new Date(booking.to_datetime).toLocaleDateString()}</span></Card.Title>
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
              : <span className='not-founs-span'>Upcoming booking record not found</span>)
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
                  <Col md={4}>
                    <Card className={(Math.ceil((new Date().getTime() - new Date(booking.from_datetime).getTime())/(oneDay))) <= 7 ? "text-initial rb-border-left" : "text-initial rrb-border-left"}>
                      <Card.Body className='card-body-item'>
                        <OverlayTrigger
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
                        </OverlayTrigger>
                        <Card.Title className='card-headings'> <img alt='img' src={image} className='icon-headings' /> {new Date(booking.from_datetime).toLocaleDateString()}| {new Date(booking.to_datetime).toLocaleDateString()}</Card.Title>
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
              : <span className='not-founs-span'>Booking history not found</span>)
            }
          </Row>
        </section>
        <hr className='hr' />
      </Container>
    </>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;