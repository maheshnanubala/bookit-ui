import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Modal, Button, Col, Row } from "react-bootstrap";
import { cancelBooking } from "../../redux/ActionReducer/bookSlice";
import moment from "moment";
import '../BookSpace/BookSpace.scss';
import './Home.scss';
import BookedCabinsDetailsModal from "./BookedCabinsDetailsModal";

const CancelBookingModal = ({ show, handleClose, bookingDetails, cardType }) => {
    const dispatch = useDispatch();
    const [partialCancelCabins, setPartialCabins] = useState([]);
    const [showPartialModal, setPartialModal] = useState(false);

    const bookingId = bookingDetails.id;
    const fromDate = moment(bookingDetails.from_datetime).format('DD MMM');
    const toDate = moment(bookingDetails.from_datetime).format('DD MMM');
    const fromTime = new Date(bookingDetails.from_datetime).toLocaleTimeString("en-US", { timeZone: "UTC", hour12: true, hour: "2-digit", minute: "2-digit" })
    const toTime = new Date(bookingDetails.to_datetime).toLocaleTimeString("en-US", { timeZone: "UTC", hour12: true, hour: "2-digit", minute: "2-digit" })

    const onCancelBooking = async (payload) => {
        dispatch(cancelBooking({ bookingId, payload, toast, dispatch }))
        handleClose();
    }
    const handleCabinCancel = (btnName) => {
        let cabinIds = (btnName === "complete") ? bookingDetails.cabin_booking_details.map((obj) => obj.id) : partialCancelCabins.map((obj) => obj.id);
        let payload = {
            cabin_booking_id: bookingDetails.id,
            cancellation_booking_ids: [...new Set(cabinIds)],
            is_full_cancel: (btnName === "complete") ? true : false,
            cancelled_by: bookingDetails.booked_by
        }
        onCancelBooking(payload)
    }
    const handleCheckBox = (cabinObj, e) => {
        let clonnedPartialCabins = [...partialCancelCabins];
        if (e.target.checked) {
            clonnedPartialCabins.push(cabinObj);
            setPartialCabins(clonnedPartialCabins)
        } else if (e.target.checked === false) {
            let index = clonnedPartialCabins.findIndex((obj) => obj.id === cabinObj.id)
            clonnedPartialCabins.splice(index, 1);
            setPartialCabins(clonnedPartialCabins)
        }
    }
    const handleConfirm = () => {
        partialCancelCabins.length > 0 && handleCabinCancel('partial')
        setPartialModal(false)
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
                    <Modal.Title>Do you really want to cancel this booking !!!!!</Modal.Title>
                    <i className="bi bi-x-circle-fill close-icon" onClick={handleClose} />
                </Modal.Header>
                {cardType !== "Cabin" && < Modal.Body className="justify-content-center">
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
                </Modal.Body>}
                {cardType === "Cabin" && < Modal.Body className="justify-content-center">
                    <Row className="onfirm-heading-content mb-2">
                        <span>Booked On : {new Date(bookingDetails.created_at).toDateString()}</span>{" "}
                    </Row>
                    <Row className="onfirm-heading-content mb-2">
                        <span>{`${bookingDetails.cabin_booking_details[0].building_name} - ${bookingDetails.cabin_booking_details[0].city_name}`}</span>
                    </Row>
                </Modal.Body>}
                <Modal.Footer className="cancel-modal-footer">
                    {cardType !== "Cabin" && <Button className="cancel-booking-button" onClick={onCancelBooking} >Cancel Booking</Button>}
                    {cardType === "Cabin" && <Button className="cancel-booking-button" onClick={() => { handleCabinCancel('complete') }} >Complete Cancel</Button>}
                    {cardType === "Cabin" && <Button className="cancel-booking-button" onClick={() => { setPartialModal(true) }} >Partial Cancel</Button>}

                </Modal.Footer>
            </Modal>
            <BookedCabinsDetailsModal
                showCabinDetails={showPartialModal}
                bookedCabinDetails={bookingDetails.cabin_booking_details}
                closeHandler={() => setPartialModal(false)}
                callFrom={"cancel"}
                Title={"Partial Cancel Cabin Details"}
                handleCheckBox={handleCheckBox}
                handleConfirm={handleConfirm}
            />
        </>
    );
};

export default CancelBookingModal;