import React from 'react'
import { Container, Row } from 'react-bootstrap'
import './newBooking.scss'
import SpaceType from './spaceType.js';
import FillDetails from './FillDetails.js'

function newBooking() {
  return (
    <>
   <Container fluid className='p-5' >
    <Row><p id='page-title'>New Booking</p></Row>
      <hr className='hr'/>
    <Row className='p-2'>
    <SpaceType/>
    <hr className='hr'/>
    </Row>
    <Row>
      <FillDetails/>
    </Row>
   </Container>
   </>
  )
}

export default newBooking
