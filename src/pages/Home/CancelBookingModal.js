import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Modal, Button, Col, Row } from "react-bootstrap";
import { cancelBooking } from "../../redux/ActionReducer/bookSlice";
import moment from "moment";
import '../BookSpace/BookSpace.scss';
import './Home.scss';

const CancelBookingModal = ({ show, handleClose, bookingDetails }) => {
    const dispatch = useDispatch();

    const bookingId = bookingDetails.id;
    const fromDate = moment(bookingDetails.from_datetime).format('DD MMM');
    const toDate = moment(bookingDetails.from_datetime).format('DD MMM');
    const fromTime = new Date(bookingDetails.from_datetime).toLocaleTimeString("en-US", { timeZone: "UTC", hour12: true, hour: "2-digit", minute: "2-digit" })
    const toTime = new Date(bookingDetails.to_datetime).toLocaleTimeString("en-US", { timeZone: "UTC", hour12: true, hour: "2-digit", minute: "2-digit" })

    const onCancelBooking = async () => {
        dispatch(cancelBooking({ bookingId, toast, dispatch }))
        handleClose();
    }

    console.log(bookingDetails);
    

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
                    <Modal.Title>Do you really want to cancel this booking !!!!!</Modal.Title>
                    <i className="bi bi-x-circle-fill close-icon" onClick={handleClose} />
                </Modal.Header>
                <Modal.Body className="justify-content-center">
                    <Row className="confirm-heading-content mb-2">
                        <Col md={12}>
                            <Row>
                                <Col md={6} className="confirm-heading-date">
                                    <span>
                                        {fromDate} - {toDate}
                                    </span>
                                </Col>
                                <Col md={6} className="ps-3">
                                    <span>
                                        {fromTime}  - {toTime}
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="confirm-content mb-2">
                        <Col>
                            {bookingDetails.city_name} -{" "}
                            {bookingDetails.building_name}
                        </Col>
                    </Row>
                    <Row className="confirm-content mb-2">
                        <Col>{bookingDetails.floor_name} - {bookingDetails.BookingWorkspace[0].workspace_name}</Col>
                        <Col>
                            {bookingDetails.purpose} -{" "}
                            {bookingDetails.user_name}
                        </Col>
                    </Row>
                    <Row className="confirm-content mb-2">
                        <Col>
                            Room Capacity{" "}
                            {bookingDetails.BookingWorkspace[0].workspace_capacity}{" "}
                            Seats
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer className="cancel-modal-footer">
                    <Button className="cancel-booking-button" onClick={onCancelBooking} >Cancel Booking</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CancelBookingModal;