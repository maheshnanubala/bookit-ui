import React from "react";
import { Col, Card } from "react-bootstrap";
// import { TbDotsVertical } from "react-icons/tb";
import image from "../../assest/images/Group 1562.svg";

export const RecentBookingCardItem = ({ booking, handleShow, oneDay, handleCabinDetails }) => {
  return (
    <Col md={6} lg={4}>
      {booking.from_datetime &&
        <Card
          className={
            Math.ceil(
              (new Date().getTime() - new Date(booking.from_datetime).getTime()) /
              oneDay
            ) <= 7
              ? "text-initial rb-border-left"
              : "text-initial rrb-border-left"
          }
          onClick={() => {
            handleShow(booking.BookingParticipant, booking.user_name);
          }}
        >
          <Card.Body className="card-body-item">
            {/* <span className="book-label">
            <TbDotsVertical className="icon-dots" />
          </span> */}
            <Card.Title className="card-headings">
              <img
                alt="conference-room"
                src={image}
                className="icon-headings me-3"
              />
              {new Date(booking.from_datetime).toLocaleDateString()} |{" "}
              {new Date(booking.to_datetime).toLocaleDateString()}
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
          </Card.Body>
        </Card>}
      {
        ((!booking?.from_datetime) && booking?.cabin_booking_details?.length > 0) && <Card
          className={
            Math.ceil(
              (new Date().getTime() - new Date(booking.created_at).getTime()) /
              oneDay
            ) <= 7
              ? "text-initial rb-border-left"
              : "text-initial rrb-border-left"
          }
          onClick={() => {
            handleCabinDetails(booking);
          }}>
          <Card.Body className="card-body-item">
            <Card.Title className="card-headings">
              <img
                alt="conference-room"
                src={image}
                className="icon-headings me-3"
              />
              <span>Booked On : {new Date(booking.created_at).toDateString()}</span>{" "}
              {/* | <span>{new Date(booking.to_datetime).toDateString()}</span> */}
            </Card.Title>
            <Card.Title className="card-headers">
              {`${booking?.cabin_booking_details[0]?.building_name || ''} - ${booking?.cabin_booking_details[0]?.city_name || ''}`}
            </Card.Title>
          </Card.Body>
        </Card>
      }
    </Col>
  );
};
