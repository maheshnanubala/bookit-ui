import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import "../BookSpace/BookSpace.scss";
import "./Home.scss";
import { Col, Row, Alert, Table } from "react-bootstrap";
import { Checkbox } from "antd";

const CancelCabinBookingModal = ({ show, handleClose, bookingDetails }) => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const onCancelBooking = async () => {
    dispatch({ toast, dispatch });
    handleClose();
  };
  const person = {
    name: "Rajendran V M",
    BookingId: "DT100",
    BuildingName: "Olympia Tech Park",
    Date: "20/1/2023",
    Cabin: "Cabin 1",
    Floor: "First Floor",
    Session: "Morning ",
    Date1: "20/1/2023",
    Cabin1: "Cabin 1",
    Floor1: "Second Floor",
    Session1: "Afternoon ",
   
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        className="bookspace-confirmation-section"
      >
        <Modal.Header className="border-0 pb-0">
          <Modal.Title>
            Would you like to cancel Partially, completely?
          </Modal.Title>
          <i className="bi bi-x-circle-fill close-icon" onClick={handleClose} />
        </Modal.Header>
        <Modal.Footer className="cancel-modal-footer">
          <Button className="cancel-booking-button" onClick={onCancelBooking}>
            Complete
          </Button>
          <Button className="cancel-booking-button" onClick={handleShowModal}  onHide={handleCloseModal}>
            Partial 
          </Button>

          <Modal show={showModal}
           backdrop="static"
           keyboard={false}
           size="lg"
           className="booking-participant-modal"
           onHide={handleCloseModal}>
            <Modal.Header className="participant-model-title">
            <Col md={6}>
              <Modal.Title>Location: {person.BuildingName}, Chennai </Modal.Title>
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

            <Modal.Body>
            <Row className="booked-by-row">
                <Col className="ps-0">
              <Table
                striped
                bordered
                hover
                className="booking-participant-table"
              >
                <thead className="participant-model-header">
                  <tr>
                   
                    <th>Date</th>
                    <th>Cabin Name</th>
                   <th>Session</th>
                   
                  </tr>
                </thead>
                <tbody>
                 
                  <td>Jan 20, 2023</td>
                  <td>{person.Cabin}</td>
                  <th>
                    <input type="checkbox" id="screenshots" unchecked />
                    <label>{person.Session}</label>
                  </th>
                
                </tbody>
                <tbody>
                 
                  <td>Jan 20, 2023</td>
                  <td>{person.Cabin1}</td>
                  <th>
                    <input type="checkbox" id="screenshots" unchecked />
                    <label>{person.Session1}</label>


                  </th>
                 
                </tbody>
                <tbody>
                

                  
                </tbody>
              </Table>
              </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer className="p-0">
            <Row className="footer-block w-100">
            <Col className="text-center">
            <Button
                size="lg"
                variant="danger"
                className="close-btn"
                onClick={handleCloseModal}
              >
                Close
              </Button>
              <Button
                size="lg"
                variant="danger"
                className="close-btn"
                onClick={handleCloseModal}
              >
                Confirm
              </Button>
            </Col>
            </Row>
              
              
            </Modal.Footer>
          </Modal>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default CancelCabinBookingModal;