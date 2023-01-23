import React, { useState } from "react";
import { Modal, Col, Row, Button, Table, Form } from "react-bootstrap";
import "./Home.scss";
import moment from "moment";
const BookedCabinsDetailsModal = ({ showCabinDetails, bookedCabinDetails,
    closeHandler, callFrom, Title, handleCheckBox, handleConfirm }) => {
    return (<>
        <Modal
            show={showCabinDetails}
            backdrop="static"
            keyboard={false}
            size="lg"
            className="booking-participant-modal"
        >
            <Modal.Header className="participant-model-title">
                <Col md={6}>
                    <Modal.Title>{Title}</Modal.Title>
                </Col>
                <Col md={6} className="text-end">
                    <button
                        className="bg-transparent modal-close-btn"
                        onClick={closeHandler}
                    >
                        <i className="bi bi-x-lg" />
                    </button>
                </Col>
            </Modal.Header>
            <div
                className="booking-participant-body"
                style={{
                    height: bookedCabinDetails.length > 5 ? "" : "300px",
                    overflow: "auto",
                }}
            >
                <Modal.Body>
                    <Row className="booked-by-row">
                        <Col className="ps-0">
                            <span className="booked-by-col">Facility</span> : {` ${bookedCabinDetails && bookedCabinDetails[0]?.building_name}`}
                            <span>

                            </span>
                        </Col>
                    </Row>
                    <Table striped bordered hover className="booking-participant-table">
                        <thead className="participant-model-header">
                            <tr>
                                <th>Date</th>
                                <th>Cabin Name</th>
                                <th>Floor</th>
                                <th>Session</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookedCabinDetails?.map((cabin) => (<tr key={`${cabin.booking_date}_${cabin.cabin_name}_${cabin.booking_slot_type}`}>
                                <td>{(moment(new Date(cabin.booking_date)).format("DD/MM/YYYY"))}</td>
                                <td>{cabin.cabin_name}</td>
                                <td>{cabin.floor_name}</td>
                                <td>
                                    {callFrom === 'cancel' && < span >
                                        <Form.Check
                                            inline
                                            name={cabin.id}
                                            type={"checkbox"}
                                            id={cabin.id}
                                            aria-label={cabin.id}
                                            //defaultChecked={setCheckedOpt(cabin, sessionType, date)}
                                            onClick={(e) => { handleCheckBox(cabin, e) }}
                                        />
                                    </span>}
                                    <span>{cabin.booking_slot_type}</span>
                                </td>
                            </tr>))}
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
                            onClick={closeHandler}
                            style={{ marginRight: "10px" }}
                        >
                            Close
                        </Button>
                        {callFrom === "cancel" && <Button
                            size="lg"
                            variant="danger"
                            className="close-btn"
                            onClick={handleConfirm}
                        >
                            Confirm
                        </Button>}
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    </>)
}
export default BookedCabinsDetailsModal;