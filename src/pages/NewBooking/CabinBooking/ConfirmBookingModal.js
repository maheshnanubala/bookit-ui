import React from "react";
// import PropTypes from "prop-types";
import { Modal, Button, Col, Row } from "react-bootstrap";
import "../../BookSpace/BookSpace.scss";
//import format from 'date-fns/format'
import moment from "moment";

const ConfirmBookingModal = ({
    show,
    facility,
    City,
    selectedCabins,
    bookingDates,
    handleBookCabin,
    handleClose
}) => {

    const handleUniqueDates = () => {
        let uniqArr = [];
        selectedCabins.forEach((cabin) => {
            if (uniqArr.length > 0 && uniqArr.findIndex((date) => date === cabin.date) == -1) {
                uniqArr.push(cabin.date);
            } else if (uniqArr.length === 0) {
                uniqArr.push(cabin.date);
            }
        });
        //return uniqArr;
        let contentArr = uniqArr.length > 0 ? uniqArr.map((date) => (<>
            <span>{`${moment(new Date(date)).format("DD/MM/YYYY")} (${selectedCabins.filter((obj) => obj.date === date).length} sessions)`}</span>
            <br />
        </>
        )) : [];
        return contentArr;
    }

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
                                <Col md={12} className="confirm-heading-date">
                                    <span>
                                        {`${facility} - ${City}`}
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="confirm-content mb-2">
                        <Col>
                            {selectedCabins.length > 0 && handleUniqueDates()}
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer className="border-0 pt-0">
                    <Button className="confirm-booking-btn w-100" onClick={() => { handleBookCabin(); handleClose() }}>
                        Confirm Booking
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ConfirmBookingModal;
