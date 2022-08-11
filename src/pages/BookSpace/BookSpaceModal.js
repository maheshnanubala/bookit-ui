import React from "react";
import PropTypes from "prop-types";
import { Modal, Button, Col, Row } from "react-bootstrap";
import { roomdata } from "../../constants/mockdata";
import "./BookSpace.scss";

const BookSpaceModal = ({
  show,
  handleClose,
  formData,
  handleSave,
  individualRoomDetail,
}) => {
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
          <Modal.Title>Booking Confirmation</Modal.Title>
          <i className="bi bi-x-circle-fill close-icon" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body className="justify-content-center">
          <Row className="confirm-heading-content mb-2">
            <Col md={12}>
              <Row>
                <Col md={6} className="confirm-heading-date">
                  <span>
                    {formData.from_date} - {formData.to_date}
                  </span>
                </Col>
                <Col md={6} className="ps-3">
                  <span>
                    {formData.start_time} - {formData.end_time}
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="confirm-content mb-2">
            <Col>
              {roomdata.data.CityName} -{" "}
              {roomdata.data.FloorDetails.building_name}
            </Col>
          </Row>
          <Row className="confirm-content mb-2">
            {/* <Col>Floor {formData.name} - AAR Room 20</Col> */}
            <Col>
              {roomdata.data.FloorDetails.name} -{" "}
              {individualRoomDetail && individualRoomDetail[0]?.name}
            </Col>
          </Row>
          <Row className="confirm-content mb-2">
            <Col>
              Room Capacity{" "}
              {individualRoomDetail && individualRoomDetail[0]?.capacity} Seats
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button className="confirm-booking-btn w-100" onClick={handleSave}>
            Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

BookSpaceModal.propTypes = {};

BookSpaceModal.defaultProps = {};

export default BookSpaceModal;
