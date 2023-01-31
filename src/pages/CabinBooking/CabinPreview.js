// import React, { useState } from "react";
// import { Modal, Table } from "react-bootstrap";
// import { Button } from "react-bootstrap";
// import { Row, Col } from "react-bootstrap";
// import CloseButton from "react-bootstrap/CloseButton";
// //import CabinFillDetails from "./CabinFillDetails";
// import "./cabinBooking.scss"

// export const CabinPreview = (props) => {
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const [show, setShow] = useState(false);

//   const inputs= [
//     {
//       Date: `${props.cDate}`,
//       Floor: `${props.cFloor}`,
//       Session: `${props.cSession}`,
//     },
//   ];

//   const [books, setBooks] = useState(inputs);

//   const handleDelete = (index) => {
//     let list = [...books];
//     list.splice(index, 1);
//     setBooks(list);
//   };

//   return (
//     <div>
//        <Button variant="link"  className="button1" onClick={handleShow}>
//         See details
//       </Button> 
//       <Modal
//         show={show}
//         backdrop="static"
//         keyboard={false}
//         size="lg"
//         className="booking-participant-modal"
//       >
//         <Modal.Header className="participant-model-title">
//           <Col md={6}>
//             <Modal.Title>Cabin Booking Preview</Modal.Title>
//           </Col>

//           <Col md={6} className="text-end">
//             <button
//               className="bg-transparent modal-close-btn"
//               onClick={handleClose}
//             >
//               <i className="bi bi-x-lg" />
//             </button>
//           </Col>
//         </Modal.Header>
//         <div className="booking-participant-body">
//           <Modal.Body>
//             <Row className="booked-by-row">
//               <Col>
//                 <span>Building: {props.cBuilding}</span>
//               </Col>
//             </Row>
//             <Table striped bordered hover className="booking-participant-table">
//               <thead className="participant-model-header">
//                 <tr>
//                   <th>Cabin Name</th>
//                   <th>Date</th>
//                   <th>Floor</th>
//                   <th>Session</th>
//                   <th>Cancel</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {books.map((item, index) => {
//                   return (
//                     <tr key={index}>
//                       <td>Cabin 1</td>
//                       <td>{item.Date}</td>
//                       <td>{item.Floor}</td>
//                       <td>{item.Session}</td>
//                       <td>
//                         <CloseButton onClick={handleDelete} />
//                       </td>
//                     </tr>
//                   )
//                 })}
//               </tbody>
//             </Table>
//           </Modal.Body>
//         </div>
//         <Modal.Footer className="p-0">
//           <Row className="footer-block w-100">
//             <Col className="text-center">
//               <Button
//                 size="lg"
//                 variant="danger"
//                 className="close-btn"
//                 onClick={handleClose}
//               >
//                 Close
//               </Button>
//             </Col>
//           </Row>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };
import { React, useState,useForm } from "react";
import CloseButton from "react-bootstrap/CloseButton";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Col, Row, Table } from "react-bootstrap";

export const CabinPreview = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const Booking = [
    {
      Date: `${props.cDate}`,
      Floor: `${props.cFloor}`,
      //Session: `${props.cSession}`
    }
  ];
  const [input, setinput] = useState(Booking);
  const handleDelete = (index) => {
    const list = [...input];
    list.splice(index, 1);
    setinput(list);
  };


  const handleShow = () => setShow(true);


  return (

    <div className="footer">
  
    <hr className="hr" />

<Button className="button1 find-button"  onClick={handleShow}>
preview
</Button>
          
      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        size="lg"
        className="booking-participant-modal"
      >
        <Modal.Header className="participant-model-title">
          <Col md={6}>
            <Modal.Title>Cabin Booking Preview</Modal.Title>
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
        <div className="booking-participant-body">
          <Modal.Body>
            <Row className="booked-by-row">
              <span>Building: {props.cBuilding}</span>
            </Row>
            <Table striped bordered hover className="booking-participant-table">
              <thead className="participant-model-header">
                <tr>
                  <th>Cabin Name</th>
                  <th>Date</th>
                  <th>Floor</th>
                  <th>Session</th>
                  <th>Cancel</th>
                </tr>
              </thead>
              <tbody>
                {input.map((item, index) => {

                  return (
                    <tr key={index}>
                      <td>Cabin 1</td>
                      <td>{item.Date}</td>
                      <td>{item.Floor}</td>
                      <td>{props.cSession} </td>
                      <td>
                        <CloseButton   onClick={handleDelete}  />
                      </td>
                    </tr>
                  );
                })}
                
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
    </div>
  );
};
