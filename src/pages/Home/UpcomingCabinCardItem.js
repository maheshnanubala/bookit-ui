import React, { useState } from "react";
import { Col, Card } from "react-bootstrap";
import { Dropdown } from "antd";
import { TbDotsVertical } from "react-icons/tb";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Row, Table } from "react-bootstrap";
import CancelCabinBookingModal from "./CancelCabinBookingModal";

export const UpcomingCabinCardItem = () => {
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const onCancelBooking = () => {
    setShowModal(true);
  };
  const items = [
    {
      key: "1",
      label: <h5>Modify</h5>
    },
    {
      key: "2",
      label: <h5 onClick={onCancelBooking}>Cancel</h5>
    }
  ];
  const person = {
    name: "Balaji K",
    BookingId: "1",
    BuildingName: "Olympia Tech Park",
    Date: "30/1/2023",
    Cabin: "Cabin 1",
    Floor: "First Floor",
    Session: "Morning",
    Date1: "30/1/2023",
    Cabin1: "Cabin 1",
    Floor1: "First Floor",
    Session1: "AfterNoon",
    
  };
  return (
    <div>
      <Col md={6} lg={4}>
        {showModal && (
          <CancelCabinBookingModal
            show={showModal}
            handleClose={() => setShowModal(false)}
          />
        )}
        <Card className="text-initial ub-border-left">
          <Card.Body className="card-body-item">
            <Dropdown
              menu={{ items }}
              trigger={["click"]}
              placement="topRight"
              arrow={{ pointAtCenter: true }}
              className="custom-dropdown"
            >
              <TbDotsVertical className="icon-dots" />
            </Dropdown>
          </Card.Body>
          <Card.Body show={show} onClick={handleShow}>
            <div>
              <Card.Title className="card-headings">
                <span>
                  <b>BookingID : {person.BookingId}</b>
                  <br></br>
                </span>
              </Card.Title>
              <Card.Title className="time-header"></Card.Title>
              <Card.Title className="card-headers"></Card.Title>
              <span>{person.BuildingName}</span>
              <Card.Text className="cardtext">
                <ul className="card-list-item"></ul>
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <div>
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
              <Modal.Title> Details</Modal.Title>
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
                <Col className="ps-0">
                  <span className="booked-by-col">Booked By </span> :{" "}
                  {person.name}
                  <br></br>
                  <span className="booked-by-col">Booking ID </span> :{" "}
                  {person.BookingId}
                  <br></br>
                  <span className="booked-by-col">Building Name</span> :{" "}
                  {person.BuildingName}
                  <br></br>
                </Col>
              </Row>
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
                    <th>Floor</th>
                    <th>Session</th>
                  </tr>
                </thead>
                <tbody>
                  <td>{person.Date}</td>
                  <td>{person.Cabin}</td>
                  <td>{person.Floor}</td>
                  <td>{person.Session}</td>
                </tbody>
                <tbody>
                  <td>{person.Date1}</td>
                  <td>{person.Cabin1}</td>
                  <td>{person.Floor1}</td>
                  <td>{person.Session1}</td>
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
    </div>
  );
};
