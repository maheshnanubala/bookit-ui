import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Table, Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { toast } from "react-toastify";
import image from "../../../assest/images/conference-ion.png";
import { bookWorkSpaceSchema } from "../../../services/ValidationSchema";
import BookSpaceModal from "../BookSpaceModal";
import "./RoomSelection.scss";
import { bookworkspace } from "../../../redux/ActionReducer/bookSlice";

export const RoomSelection = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({
    ...state.auth.user,
  }));

  const availableworkspace = JSON.parse(
    localStorage.getItem("availableworkspace")
  );

  const [roomInfo, setRoomInfo] = useState([]);
  const [bookSpace, setBookspace] = useState({
    city_id: 0,
    building_id: 0,
    floor_id: 0,
    from_date: "",
    to_date: "",
    start_time: "",
    end_time: "",
    purpose: "",
    selected_workspaces: [
      {
        date: "",
        seats: [],
      },
    ],
    user_id: user?.id,
    user_ids: [],
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(bookWorkSpaceSchema) });

  const individualRoomDetail =
    availableworkspace?.data?.FloorDetails?.workspaces.filter((array) =>
      roomInfo.some((filter) => filter.id === array.id)
    );

  setValue("selected_workspaces", [
    {
      date:
        moment(
          availableworkspace?.data?.BookedWorkSpaces.slice(0, 1)?.date
        ).format("YYYY-MM-DD") || "",
      seats:
        (roomInfo &&
          roomInfo.map((item) => {
            return item.id;
          })) ||
        [],
    },
  ]);
  const handleClose = () => {
    setShow(false);
  };
  const handleSave = () => {
    setShow(false);
    console.log(bookSpace, "inside room");
    dispatch(bookworkspace({ bookSpace, navigate, toast }));
  };

  const onSubmit = (formValue) => {
    setBookspace({
      city_id: availableworkspace?.data?.CityId || 0,
      building_id: availableworkspace?.data?.FloorDetails?.building_id || 0,
      floor_id: availableworkspace?.data?.FloorDetails?.id || 0,
      from_date: availableworkspace?.data?.FromDate || "",
      to_date: availableworkspace?.data?.ToDate || "",
      start_time: availableworkspace?.data?.StartTime || "",
      end_time: availableworkspace?.data?.EndTime || "",
      purpose: availableworkspace?.data?.Purpose || "",
      user_id: user?.id,
      user_ids: availableworkspace?.user_ids.split(",").map(Number) || [],
      selected_workspaces: formValue.selected_workspaces || [],
    });
    setShow(true);
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="room-selection-block">
            <h5 className="room-selection-title mt-5 mb-4">
              Booking Information
            </h5>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row className="mb-3">
                <Col md={4}>
                  <span className="book-label">Date</span>
                  <span className="book-input-item">
                    <span className="me-2">
                      {availableworkspace?.data?.FromDate}
                    </span>{" "}
                    -
                    <span className="ms-2">
                      {availableworkspace?.data?.ToDate}
                    </span>
                  </span>
                </Col>
                <Col md={4}>
                  <span className="book-label">Time</span>
                  <span className="book-input-item">
                    <span className="me-2">
                      {availableworkspace?.data?.StartTime}
                    </span>{" "}
                    -
                    <span className="ms-2">
                      {availableworkspace?.data?.EndTime}
                    </span>
                  </span>
                </Col>
                <Col md={4}>
                  <span className="book-label">Building</span>

                  <span className="book-input-item">
                    <span className="me-0">
                      {availableworkspace?.data?.FloorDetails?.building_name}
                    </span>
                    ,
                    <span className="ms-1">
                      {availableworkspace?.data?.CityName}
                    </span>
                  </span>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={4}>
                  <span className="book-label">Floor</span>
                  <span className="book-input-item">
                    {availableworkspace?.data?.FloorDetails?.name}
                  </span>
                </Col>
                <Col md={4}>
                  <span className="book-label">Purpose</span>
                  <span className="book-input-item">
                    {availableworkspace?.data?.Purpose}
                  </span>
                </Col>
                <Col md={4}></Col>
              </Row>
              <hr className="mt-0 mb-0" />
              <Row className="room-seat-block mt-3">
                <Col lg={6}>
                  <h5 className="mb-3">Select Conference Room</h5>
                  <Row className="seat-toolbar-block mb-3">
                    <Col className="d-flex">
                      <span className="box booking-available"></span>
                      <span>Available Room</span>
                    </Col>
                    <Col className="d-flex justify-content-center">
                      <div className="box booking-selected-seats"></div>
                      <span>Selected Room</span>
                    </Col>
                    <Col className="d-flex justify-content-end">
                      <div className="box booking-booked-seats"></div>
                      <span>Booked Room</span>
                    </Col>
                  </Row>
                  <Form.Group>
                    <Row className="seats">
                      {availableworkspace?.data?.FloorDetails?.workspaces
                        .filter((item) => item.type === "conference")
                        .map((item) => (
                          <Col xs={3} className="seat" key={item.id}>
                            <input
                              type="radio"
                              id={item.id}
                              value={item.id}
                              disabled={availableworkspace?.data?.BookedWorkSpaces.find(
                                (x) => x
                              )?.seats.includes(item.id)}
                              {...register("selected_workspaces.seats")}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setRoomInfo([
                                    {
                                      id: item.id,
                                    },
                                  ]);
                                } else {
                                  setRoomInfo(
                                    roomInfo.filter(
                                      (room) => room.id !== item.id
                                    )
                                  );
                                }
                              }}
                            />
                            <label htmlFor={item.id}>
                              <div className="mb-1">{item.name}</div>
                              <span>
                                <img
                                  src={image}
                                  alt="conference room"
                                  className="img-fluid"
                                  style={{ height: "35px" }}
                                />
                              </span>
                              <div className="mt-1 seat-label-contents">
                                Capacity - {item.capacity}
                              </div>
                            </label>
                          </Col>
                        ))}
                    </Row>
                  </Form.Group>
                  <span className="text-danger">
                    {roomInfo.length > 0
                      ? ""
                      : errors.selected_workspaces &&
                        errors.selected_workspaces.find((x) => x)?.seats
                          .message}
                  </span>
                  <Row className="mt-3 mb-3 text-lg-end ">
                    <Col>
                      <Button
                        type="submit"
                        className="book-conference-room-btn shadow-none"
                      >
                        Book Conference Room
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
            <hr className="mt-0 mb-0" />
            <Row className="mt-3">
              <Col lg={12}>
                <Table
                  className="booking-property-block"
                  borderless
                  hover
                  responsive
                >
                  <thead>
                    <tr>
                      <th>Room.No</th>
                      <th>Seat Capacity</th>
                      <th>Projection Screen</th>
                      <th>Digital Projectors</th>
                      <th>Video Conferencing System</th>
                      <th>Audio Equipment</th>
                      <th>White Board with Pens</th>
                    </tr>
                  </thead>
                  {individualRoomDetail.length > 0 ? (
                    <tbody>
                      {individualRoomDetail &&
                        individualRoomDetail.map((item) => (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.capacity}</td>
                            <td>
                              {item.amenities.slice(0, 1).is_present === true
                                ? "Yes"
                                : "No"}
                            </td>
                            <td>
                              {item.amenities.slice(0, 2).is_present === true
                                ? "Yes"
                                : "No"}
                            </td>
                            <td>
                              {item.amenities.slice(0, 3).is_present === true
                                ? "Yes"
                                : "No"}
                            </td>
                            <td>
                              {item.amenities.slice(0, 4).is_present === true
                                ? "Yes"
                                : "No"}
                            </td>
                            <td>
                              {item.amenities.slice(0, 5).is_present === true
                                ? "Yes"
                                : "No"}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td colSpan={7} className="text-center pt-3 pb-3">
                          No Conference Rooms Selected
                        </td>
                      </tr>
                    </tbody>
                  )}
                </Table>
              </Col>
            </Row>

            <BookSpaceModal
              show={show}
              handleClose={handleClose}
              handleSave={handleSave}
              formData={bookSpace && bookSpace}
              individualRoomDetail={individualRoomDetail}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};
