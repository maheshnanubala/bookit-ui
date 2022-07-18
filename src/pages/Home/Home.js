import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import './Home.scss';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { ApiUtility } from '../../ApiUtility';
import CardContent from './CardContent';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';

const Home = () => {
  const userObj = JSON.parse(localStorage.user)?.user
  const [myPastBookingData, setMyPastBookingData] = useState([]);
  const [upCommingBookingData, setUpCommingBookingData] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [bookingData, setBookingData] = useState({})
  // const handleShow = () => setShow(true);
  
  useEffect(() => {
    getMyBookingDetails()
  }, [])

  const getMyBookingDetails = async () => {
    const response = await ApiUtility.getMyBookingsRecords()
    setMyPastBookingData(response?.past_booking_details)
    setUpCommingBookingData(response?.upcoming_booking_details)
  }

  const openParticipatDatail = (bookingRecord) => {
    setShow(true);
    setBookingData(bookingRecord)
  }
  return(
    <>
      <Container fluid className='home' >
        <section className=" pt-5 pb-2 ">
          <Row>
            <Col md={12}>
              <h4 id="welcomeName-row">
                Welcome back <span id="text-name">{userObj?.name}</span>
              </h4>
            </Col>
          </Row>
        </section>
        <hr className='hr'/>
        <section className="custom-upcomingbooking-section pt-3 pb-3">
          <Row>
            <h4 className="headings">UPCOMING BOOKINGS</h4>
            { upCommingBookingData.length > 0 ? upCommingBookingData.map((upcommingBooking) => (
                <Col md={4}>
                  <Card className="text-initial" onClick={ () => { openParticipatDatail(upcommingBooking) } }>
                    <Card.Body>
                      <Card.Title className='cardheadings'>{upcommingBooking?.purpose}</Card.Title>
                      <hr />
                      <Card.Text className='cardtext' >
                        <CardContent bookingDetails={upcommingBooking} />
                      </Card.Text >
                    </Card.Body>
                  </Card>
                </Col>
              )) : <span className='noBookingSPan'>No upcoming booking</span>
            }
          </Row>
        </section>
        <hr className='hr' />
        <section className="custom-recentbooking-section pt-3 pb-3">
          <Row>
            <h4 className="headings">RECENT BOOKINGS</h4>
            { myPastBookingData.length > 0 ? myPastBookingData.map((pastBooking) => (
                <Col md={4}>
                  <Card className="text-initial" onClick={ () => { openParticipatDatail(pastBooking) } }>
                    <Card.Body>
                      <Card.Title className='cardheadings'>{pastBooking?.purpose}</Card.Title>
                      <hr />
                      <Card.Text className='cardtext' >
                        <CardContent bookingDetails={pastBooking} />
                      </Card.Text >
                    </Card.Body>
                  </Card>
                </Col>
              )) : <span className='noBookingSPan'>No past booking</span>
            }
          </Row>
        </section>
        <hr className='hr' />
        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title><span className='participantModelTitle'>Meeting Details</span></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h6><b>Purpose:</b>&nbsp;&nbsp;&nbsp; <span className='participantModelPurpose'>{bookingData?.purpose}</span></h6>
              <h6><b>Participants Details</b></h6>
            </div>
              
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Participant Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                { bookingData?.BookingParticipant?.length > 0 ?
                  bookingData?.BookingParticipant.map((Participant, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{Participant.user_name}</td>
                      <td>{Participant.user_email}</td>
                    </tr>
                  ))
                  :
                  <tr>
                    <td colSpan={3}>No record found </td>
                  </tr> 
                }
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button className='btn btn-danger' onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  )
}

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
