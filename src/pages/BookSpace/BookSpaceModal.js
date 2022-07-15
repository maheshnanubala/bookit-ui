import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import { CustomFieldInput } from "./CustomFieldInput";
import "./BookSpace.scss";

const BookSpaceModal = ({ show, handleClose, formData, handleSave }) => {
  const location = (val) => {
    switch (val) {
      case 1:
        return "Ganesh Chambers";
      case 2:
        return "Olymbiya Tech Park";
      case 3:
        return "Electronics City";
      case 4:
        return "Madiwala";
      case 5:
        return "Koramangala";
      case 6:
        return "Tambaram";
      case 7:
        return "Trichy";
      default:
        return "Others";
    }
  };

  const city = (val) => {
    switch (val) {
      case 1:
        return "Chennai";
      case 2:
        return "Bangalore";
      case 3:
        return "Hyderabad";
      case 4:
        return "Kerala";
      case 5:
        return "Mumbai";
      default:
        return "Others";
    }
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
            <b>CONFIRMATION</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="justify-content-center">
          <CustomFieldInput
            label={"No . of workspaces booked"}
            inputs={formData?.workspaces_booked}
          />
          <CustomFieldInput
            label={"Location"}
            inputs={
              <>
                <span className="ms-2">{location(formData?.location_id)}</span>{" "}
                - <span className="me-2">{city(formData?.city_id)}</span>
              </>
            }
          />
          <CustomFieldInput
            label={"Booked Dates"}
            inputs={
              <>
                <span className="me-2">{formData?.from_date}</span> -
                <span className="ms-2">{formData?.to_date}</span>
              </>
            }
          />
        </Modal.Body>
        <Modal.Footer className="justify-content-center border-0">
          <Button
            className="bookspace-cancel-btn bookspace-btn bg-transparent border-secondary me-4"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            className="bookspace-confirm-btn bookspace-btn"
            onClick={handleSave}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

BookSpaceModal.propTypes = {};

BookSpaceModal.defaultProps = {};

export default BookSpaceModal;
