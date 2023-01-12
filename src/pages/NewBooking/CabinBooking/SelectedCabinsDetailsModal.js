import React, { useState } from "react";
import { Modal, Col, Row, Button, Table } from "react-bootstrap";
import "../../Home/Home.scss"
const SelectedCabinDetailsModal = ({ show, handleSeeDetails, selectedCabins, facility, handleCancelCabin, handleBookbtn }) => {
    return (<>
        <Modal
            show={show}
            backdrop="static"
            keyboard={false}
            size="lg"
            className="booking-participant-modal"
        >
            <Modal.Header className="participant-model-title">
                <Col md={6}>
                    <Modal.Title>Selected Cabin Details</Modal.Title>
                </Col>
                <Col md={6} className="text-end">
                    <button
                        className="bg-transparent modal-close-btn"
                        onClick={() => { handleSeeDetails(false) }}
                    >
                        <i className="bi bi-x-lg" />
                    </button>
                </Col>
            </Modal.Header>
            <div
                className="booking-participant-body"
                style={{
                    height: selectedCabins.length > 5 ? "" : "300px",
                    overflow: "auto",
                }}
            >
                <Modal.Body>
                    <Row className="booked-by-row">
                        <Col className="ps-0">
                            <span className="booked-by-col">Facility</span> : {` ${facility}`}
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
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedCabins.map((cabin) => (<tr key={`${cabin.date}_${cabin.name}_${cabin.session}`}>
                                <td>{cabin.date}</td>
                                <td>{cabin.name}</td>
                                <td>{cabin.floor.name}</td>
                                <td>{cabin.session}</td>
                                <td><button
                                    className="bg-transparent modal-close-btn"
                                    onClick={() => { handleCancelCabin(cabin) }}
                                >
                                    <i className="bi bi-x-lg" style={{ color: "black" }} />
                                </button></td>
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
                            onClick={() => { handleSeeDetails(false) }}
                            style={{ marginRight: "10px" }}
                        >
                            Close
                        </Button>
                        {selectedCabins.length > 0 && <Button
                            size="lg"
                            variant="danger"
                            className="close-btn"
                            onClick={() => { handleBookbtn() }}
                        >
                            Book
                        </Button>}
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    </>)
}
export default SelectedCabinDetailsModal;