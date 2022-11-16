import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  Table,
  Button,
  Container,
  Card,
  Spinner,
  Breadcrumb,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { toast } from "react-toastify";
import { bookWorkSpaceSchema } from "../../../services/ValidationSchema";
import BookSpaceModal from "../BookSpaceModal";
import "./RoomSelection.scss";
import {
  bookworkspace,
  availableWorkspace,
} from "../../../redux/ActionReducer/bookSlice";
//import format from "date-fns/format";

export const RoomSelection = () => {
  const {
    floorId,
    fromDate,
    toDate,
    startTime,
    endTime,
    buildingId,
    value,
    purpose,
  } = useParams();

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { loading, availableworkspace } = useSelector((state) => ({
    ...state.bookworkspace,
  }));

  useEffect(() => {
    if (
      floorId !== "" &&
      fromDate !== "" &&
      toDate !== "" &&
      startTime !== "" &&
      endTime !== "" &&
      buildingId !== "" &&
      value !== "" &&
      purpose !== ""
    ) {
      dispatch(
        availableWorkspace({
          floorId,
          fromDate,
          toDate,
          startTime,
          endTime,
          buildingId,
          value,
          purpose,
          navigate,
        })
      );
    }
  }, []);

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
    user_id: user?.user?.id,
    user_ids: [],
    data: [],
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
        moment(availableworkspace?.data?.FromDate).format("YYYY-MM-DD") || "",
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
    dispatch(bookworkspace({ bookSpace, navigate, toast }));
  };

  const onSubmit = (formValue) => {
    let fd = new Date(availableworkspace?.data?.FromDate);
    let td = new Date(availableworkspace?.data?.ToDate);
    let fDate = new Date(fd.getTime() - fd.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
    let tDate = new Date(td.getTime() - td.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
    setBookspace({
      city_id: availableworkspace?.data?.CityId || 0,
      building_id: availableworkspace?.data?.FloorDetails?.building_id || 0,
      floor_id: availableworkspace?.data?.FloorDetails?.id || 0,
      from_date: fDate || "",
      to_date: tDate || "",
      start_time: availableworkspace?.data?.StartTime || "",
      end_time: availableworkspace?.data?.EndTime || "",
      purpose: availableworkspace?.data?.Purpose || "",
      user_id: user?.user?.id,
      user_ids: availableworkspace?.user_ids.split(",").map(Number) || [],
      selected_workspaces: formValue.selected_workspaces || [],
      data: availableworkspace?.data || [],
    });
    setShow(true);
  };

  const ConferenceRooms =
    availableworkspace?.data?.FloorDetails?.workspaces.filter(
      (item) => item.type === "conference"
    );

  return (
    <Container fluid>
      <Row className="mt-5">
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item
              className="newbooking-breadcrumb-item"
              onClick={() => navigate(`/new-booking`)}
            >
              New Booking
            </Breadcrumb.Item>
            <Breadcrumb.Item className="conference-breadcrumb-item">
              Conference Room Selection{" "}
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="room-selection-block">
            <h5 className="room-selection-title mt-3 mb-4">
              Booking Information
            </h5>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row className="mb-3">
                <Col md={4}>
                  <span className="book-label">Date</span>
                  <span className="book-input-item">
                    <span className="me-2">
                      {new Date(
                        availableworkspace?.data?.FromDate
                      ).toDateString()}
                    </span>{" "}
                    {/* -
                    <span className="ms-2">
                      {new Date(
                        availableworkspace?.data?.ToDate
                      ).toDateString()}
                    </span> */}
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
                  <Row className="seat-toolbar-block mb-3">
                    <Col className="d-flex" md={5}>
                      <h5 className="mb-3">Select Conference Room</h5>
                      {/* <h6><i> - Info</i></h6> */}
                    </Col>
                    (<Col className="d-flex" md={2} style={{ alignItems: "baseline" }}>
                      <span className="box booking-available"></span>
                      <span>Available</span>
                    </Col>
                    <Col className="d-flex justify-content-center" md={2} style={{ alignItems: "baseline" }}>
                      <div className="box booking-selected-seats"></div>
                      <span>Selected</span>
                    </Col>
                    <Col className="d-flex justify-content-end" md={2} style={{ alignItems: "baseline" }}>
                      <div className="box booking-booked-seats"></div>
                      <span>Booked</span>
                    </Col>)
                  </Row>
                  <Form.Group>
                    <Row className="seats">
                      {ConferenceRooms?.length > 0 ? (
                        ConferenceRooms.map((item) => (
                          <Col xs={4} className="seat" key={item.id}>
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
                              <div className="workspace-conferenceroom-icon" />
                              <div className="mt-1 seat-label-contents">
                                Capacity - {item.capacity}
                              </div>
                            </label>
                          </Col>
                        ))
                      ) : (
                        <Card className="conf-not-available">
                          <span className="conf-not-available-text">
                            Conference room not avalilable for -{" "}
                            <b>
                              {availableworkspace?.data?.FloorDetails?.name}
                            </b>
                          </span>
                        </Card>
                      )}
                    </Row>
                  </Form.Group>
                  <span className="text-danger">
                    {roomInfo.length > 0
                      ? ""
                      : errors.selected_workspaces &&
                      errors.selected_workspaces.find((x) => x)?.seats
                        .message}
                  </span>
                  <Row className="mt-4 mb-3 text-lg-end">
                    <Col className="text-end">
                      <Button
                        type="submit"
                        className="book-conference-room-btn shadow-none"
                        onClick={() => navigate(`/new-booking`)}
                      >
                        <i className="bi bi-pencil-square me-2" />
                        Modify
                      </Button>
                    </Col>
                    <Col className="text-start">
                      <Button
                        type="submit"
                        className="book-conference-room-btn shadow-none"
                        disabled={roomInfo.length > 0 ? false : true}
                      >
                        {loading ? "Booking..." : "Book Conference Room"}
                        {loading && (
                          <Spinner
                            animation="border"
                            size="sm"
                            variant="light"
                            className="ms-2"
                          />
                        )}
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
                  {individualRoomDetail?.length > 0 ? (
                    <tbody>
                      {individualRoomDetail &&
                        individualRoomDetail.map((item) => (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.capacity}</td>
                            <td>
                              {item.amenities
                                ?.slice(0, 1)
                                .map((item, index) => {
                                  return (
                                    <div key={index}>
                                      {item.is_present === true ? "Yes" : "No"}
                                    </div>
                                  );
                                })}
                            </td>
                            <td>
                              {item.amenities
                                ?.slice(1, 2)
                                .map((item, index) => {
                                  return (
                                    <div key={index}>
                                      {item.is_present === true ? "Yes" : "No"}
                                    </div>
                                  );
                                })}
                            </td>
                            <td>
                              {item.amenities
                                ?.slice(2, 3)
                                .map((item, index) => {
                                  return (
                                    <div key={index}>
                                      {item.is_present === true ? "Yes" : "No"}
                                    </div>
                                  );
                                })}
                            </td>
                            <td>
                              {item.amenities
                                ?.slice(3, 4)
                                .map((item, index) => {
                                  return (
                                    <div key={index}>
                                      {item.is_present === true ? "Yes" : "No"}
                                    </div>
                                  );
                                })}
                            </td>
                            <td>
                              {item.amenities
                                ?.slice(4, 5)
                                .map((item, index) => {
                                  return (
                                    <div key={index}>
                                      {item.is_present === true ? "Yes" : "No"}
                                    </div>
                                  );
                                })}
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
