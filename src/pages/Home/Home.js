
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Home.scss';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Routes, Route, useNavigate } from 'react-router-dom';
import { TbDotsVertical } from 'react-icons/tb'
import image from '../../images/conference-icon.png'
let name = "NAME!"


const Home = () => {
  const navigate = useNavigate();
  const navigateToNewBookings = () => {
    navigate('/new-bookings');
  };
  const [show, setShow] = useState(false);
  const handleShow = () => { setShow(true) }

  return (
    <>
      <Container fluid className='home' >
        <section className=" pt-5 pb-2 ">
          <Row>
            <Col md={6}>
              <h4 id="welcomeName-row">
                Welcome back <span id="text-name">{name}</span>
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
            <Col md={4}>
              <Card className="text-initial ub-border-left">

                <Card.Body>
                  <TbDotsVertical className='icon-dots' />
                  <Card.Title className='card-headings'> <img src={image} className='icon-headings' /> 29 July 2022| 12.00 to 3.00 </Card.Title>
                  <Card.Title className='card-headers'>Team Meeting</Card.Title>
                  <Card.Text className='cardtext' >
                    chennai - Ganesh Chambar
                    Floor 1 - AAR Room 21
                    Room Capacity 8 seats
                  </Card.Text >
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-initial ub-border-left">
                <Card.Body>
                  <TbDotsVertical className='icon-dots' />
                  <Card.Title className='card-headings'> <img src={image} className='icon-headings' />  29 July 2022| 12.00 to 3.00 </Card.Title>
                  <Card.Title className='card-headers'>Team Meeting</Card.Title>
                  <Card.Text className='cardtext' >
                    chennai - Ganesh Chambar
                    Floor 1 - AAR Room 21
                    Room Capacity 8 seats
                  </Card.Text >
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
        <hr className='hr' />
        <section className="custom-recentbooking-section pt-3 pb-3">
          <Row>
            <h4 className="headings"> Booking History</h4>
            <Col md={4}>
              <Card className="text-initial rb-border-left" onClick={handleShow}>
                <Card.Body>
                  <TbDotsVertical className='icon-dots' />
                  <Card.Title className='card-headings'>   <img src={image} className='icon-headings' /> 29 July 2022| 2.00 to 5.00 </Card.Title>
                  <Card.Title className='card-headers'>Team Meeting</Card.Title>
                  <Card.Text className='cardtext' >
                    chennai - Ganesh Chambar
                    Floor 1 - AAR Room 21
                    Room Capacity 8 seats
                  </Card.Text >
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-initial rb-border-left" onClick={handleShow}>
                <Card.Body>
                  <TbDotsVertical className='icon-dots' />
                  <Card.Title className='card-headings'>  <img src={image} className='icon-headings' />  29 July 2022| 2.00 to 5.00 </Card.Title>
                  <Card.Title className='card-headers'>Team Meeting</Card.Title>
                  <Card.Text className='cardtext' >
                    chennai - Ganesh Chambar
                    Floor 1 - AAR Room 21
                    Room Capacity 8 seats
                  </Card.Text >
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-initial rb-border-left"
                onClick={handleShow}>
                <Card.Body>
                  <TbDotsVertical className='icon-dots' />
                  <Card.Title className='card-headings'> <img src={image} className='icon-headings' /> 29 July 2022| 2.00 to 5.00 </Card.Title>
                  <Card.Title className='card-headers'>Team Meeting</Card.Title>
                  <Card.Text className='cardtext' >
                    chennai - Ganesh Chambar
                    Floor 1 - AAR Room 21
                    Room Capacity 8 seats
                  </Card.Text >
                </Card.Body>
              </Card>
            </Col>
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