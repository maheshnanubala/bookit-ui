import PropTypes from 'prop-types';
import './MyBookings.scss';
import React, { useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { TbDotsVertical } from 'react-icons/tb'
import image from '../../images/conference-icon.png'
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from 'react-bootstrap/Popover';
import Dropdown from 'react-bootstrap/Dropdown';

const MyBookings = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => { setShow(true) }

  return (
    <>
      <Container fluid className='home' >
        <hr className='hr' />
        <section className="custom-upcomingbooking-section pt-3 pb-3">
          <Row>
            <h4 className="headings">Upcoming Bookings</h4>
            <Col md={4}>
              <Card className="text-initial ub-border-left">
                <Card.Body>
                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={
                      <Popover id={`popover-positioned-bottom`}>
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
                  <Card.Title className='card-headings'> <img src={image} className='icon-headings' /> 29 July 2022| 12.00 to 3.00 </Card.Title>
                  <Card.Title className='card-headers'>Team Meeting</Card.Title>
                  <Card.Text className='cardtext' >
                    chennai - Ganesh Chambar Floor-2-AAR Room 20  Room Capacity 8 seats
                  </Card.Text >
                </Card.Body>
              </Card>

            </Col>
            <Col md={4}>
              <Card className="text-initial ub-border-left">
                <Card.Body>
                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={
                      <Popover id={`popover-positioned-bottom`}>
                        <Popover.Body>
                          <Dropdown.Item href="#/release">Release booked Room</Dropdown.Item>
                          <Dropdown.Item href="#/reschedule"> Reschedule Date & time</Dropdown.Item>
                          <Dropdown.Item href="#/share" > Share the Details</Dropdown.Item>
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <span className="book-label"> <TbDotsVertical className='icon-dots' onClick={handleShow} /></span>
                  </OverlayTrigger>
                  <Card.Title className='card-headings'> <img src={image} className='icon-headings' />  29 July 2022| 12.00 to 3.00 </Card.Title>
                  <Card.Title className='card-headers'>Team Meeting</Card.Title>
                  <Card.Text className='cardtext' >
                    chennai - Ganesh Chambar Floor-2-AAR Room 21 Room Capacity 6 seats
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
              <Card className="text-initial rb-border-left">
                <Card.Body>
                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={
                      <Popover id={`popover-positioned-bottom`}>
                        <Popover.Body className='p-0'>
                          <Dropdown.Item href="#/delete"> Delete the Record </Dropdown.Item>
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <span className="book-label"> <TbDotsVertical className='icon-dots' onClick={handleShow} /></span>
                  </OverlayTrigger>
                  <Card.Title className='card-headings'>   <img src={image} className='icon-headings' /> 29 July 2022| 2.00 to 5.00 </Card.Title>
                  <Card.Title className='card-headers'>Team Meeting</Card.Title>
                  <Card.Text className='cardtext' >
                    chennai - Ganesh Chambar Floor-2-AAR Room 20  Room Capacity 6 seats
                  </Card.Text >
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-initial rb-border-left">
                <Card.Body>
                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={
                      <Popover id={`popover-positioned-bottom`}>
                        <Popover.Body className='p-0'>
                          <Dropdown.Item href="#/delete"> Delete the Record </Dropdown.Item>
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <span className="book-label"> <TbDotsVertical className='icon-dots' onClick={handleShow} /></span>
                  </OverlayTrigger>
                  <Card.Title className='card-headings'>  <img src={image} className='icon-headings' />  29 July 2022| 2.00 to 5.00 </Card.Title>
                  <Card.Title className='card-headers'>Team Meeting</Card.Title>
                  <Card.Text className='cardtext' >
                    chennai - Ganesh Chambar Floor-2-AAR Room 20  Room Capacity 8 seats
                  </Card.Text >
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-initial rb-border-left">
                <Card.Body>
                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={
                      <Popover id={`popover-positioned-bottom`}>
                        <Popover.Body className='p-0'>
                          <Dropdown.Item href="#/delete"> Delete the Record </Dropdown.Item>
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <span className="book-label"> <TbDotsVertical className='icon-dots' onClick={handleShow} /></span>
                  </OverlayTrigger>
                  <Card.Title className='card-headings'> <img src={image} className='icon-headings' /> 29 July 2022| 2.00 to 5.00 </Card.Title>
                  <Card.Title className='card-headers'>Team Meeting</Card.Title>
                  <Card.Text className='cardtext' >
                    poornima chennai - Ganesh Chambar Floor-2-AAR Room 20  Room Capacity 6 seats
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
export default MyBookings
MyBookings.propTypes = {};
