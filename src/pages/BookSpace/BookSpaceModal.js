import React from "react";
// import PropTypes from "prop-types";
import { Modal, Button, Col, Row } from "react-bootstrap";
import "./BookSpace.scss";
//import format from 'date-fns/format'

const BookSpaceModal = ({
  show,
  handleClose,
  formData,
  handleSave,
  individualRoomDetail,
}) => {
  // const fDateString = formData?.from_date !== '' ? format(new Date(formData?.from_date), "MMM dd yyy") : ''
  // const tDateString = formData?.to_date !== '' ? format(new Date(formData?.to_date), "MMM dd yyy") : ''
  const fDateString = formData?.from_date !== '' ? new Date(formData?.from_date).toDateString() : ''
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
                    {/* {fDateString} - {tDateString} */}
                    {fDateString}
                  </span>
                </Col>
                <Col md={6} className="ps-3">
                  <span>
                    {formData?.start_time}  - {formData?.end_time}
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="confirm-content mb-2">
            <Col>
              {formData?.data?.CityName} -{" "}
              {formData?.data?.FloorDetails?.building_name}
            </Col>
          </Row>
          <Row className="confirm-content mb-2">
            {/* <Col>Floor {formData?.name} - AAR Room 20</Col> */}
            <Col>
              {formData?.data?.FloorDetails?.name} -{" "}
              {individualRoomDetail &&
                individualRoomDetail.find((x) => x)?.name}
            </Col>
          </Row>
          <Row className="confirm-content mb-2">
            <Col>
              Room Capacity{" "}
              {individualRoomDetail &&
                individualRoomDetail.find((x) => x)?.capacity}{" "}
              Seats
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
