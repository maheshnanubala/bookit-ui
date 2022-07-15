import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import { CustomFieldInput } from "./CustomFieldInput";
import "./BookSpace.scss";

const BookSpaceModal = ({ show, handleClose, formData, handleSave }) => {
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
            inputs={formData?.workspace_required}
          />
          <CustomFieldInput
            label={"Location"}
            inputs={"Ganesh Chambers - Chennai"}
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
