import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Card } from "react-bootstrap";
import { TbDotsVertical } from "react-icons/tb";
import { Dropdown } from 'antd';
import CancelBookingModal from "./CancelBookingModal";
import image from "../../assest/images/Group 1562.svg";

export const UpcomingBookingCardItem = ({ booking, handleShow }) => {
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate();

  const onModifyBooking = () => {
    navigate('/modify-booking', { state: { modifyFlag: true, bookingDetails: booking } })
  }

  const onCancelBooking = () => {
    setShowModal(true);
  }

  const items = [
    {
      key: '1',
      label: (<h5 onClick={onModifyBooking}>Modify</h5>)
    },
    {
      key: '2',
      label: (<h5 onClick={onCancelBooking}>Cancel</h5>)
    },
  ]

  return (
    <Col md={6} lg={4}>
      {showModal && <CancelBookingModal show={showModal} handleClose={() => setShowModal(false)} bookingDetails={booking} />}
      <Card
        className="text-initial ub-border-left">
        <Card.Body className="card-body-item">
          <Dropdown menu={{ items }}
            trigger={['click']}
            placement="topRight"
            arrow={{ pointAtCenter: true }}
            className="custom-dropdown">
            <TbDotsVertical className="icon-dots" />
          </Dropdown>
          <div onClick={() => { handleShow(booking.BookingParticipant, booking.user_name) }}>
            <Card.Title className="card-headings">
              <img
                alt="conference-room"
                src={image}
                className="icon-headings me-3"
              />
              <span>{new Date(booking.from_datetime).toDateString()}</span>{" "}
              {/* | <span>{new Date(booking.to_datetime).toDateString()}</span> */}
            </Card.Title>
            <Card.Title className="time-header">
              {new Date(booking.from_datetime).toLocaleTimeString("en-US", {
                timeZone: "UTC",
                hour12: true,
                hour: "numeric",
                minute: "numeric",
              }) || ""}{" "}
              -{" "}
              {new Date(booking.to_datetime).toLocaleTimeString("en-US", {
                timeZone: "UTC",
                hour12: true,
                hour: "numeric",
                minute: "numeric",
              }) || ""}
            </Card.Title>
            <Card.Title className="card-headers">
              {booking.purpose || ""}
            </Card.Title>
            <Card.Text className="cardtext">
              <ul className="card-list-item">
                <li>
                  {booking.city_name} - {booking.building_name}
                </li>
                <li>
                  {booking.floor_name} -{" "}
                  {booking.BookingWorkspace?.[0]?.workspace_name}
                </li>
                <li>
                  Room Capacity{" "}
                  {[0, 1].includes(
                    booking.BookingWorkspace?.[0]?.workspace_capacity
                  )
                    ? `${booking.BookingWorkspace?.[0]?.workspace_capacity} Seat`
                    : `${booking.BookingWorkspace?.[0]?.workspace_capacity} Seats`}
                </li>
              </ul>
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};