/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
// import validator from 'validator'
import { useNavigate, useParams } from "react-router-dom";
import { Form, Row, Col, Button, Container, Card, Spinner, Breadcrumb, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { bookWorkSpaceSchema } from "../../../services/ValidationSchema";
import { bookworkspace, availableWorkspace, updateCurrentBookingData, modifyBookWorkSpace } from "../../../redux/ActionReducer/bookSlice";
import moment from "moment";
import BookSpaceModal from "../BookSpaceModal";
import Label from "react-bootstrap/FormLabel";
// import { MultiSelect } from "react-multi-select-component";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import "./RoomSelection.scss";


export const RoomSelection = () => {
  const { loading, workspacedetails, availableworkspace, currentBookingData, modifyBookingData } = useSelector((state) => ({ ...state.bookworkspace }));
  const { floorId, fromDate, toDate, startTime, endTime, buildingId, purpose, } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const modifyFlag = modifyBookingData ? true : false;
  const bookingId = modifyBookingData?.id;
  const user = JSON.parse(localStorage.getItem("user"));
  const UserObj = JSON.parse(localStorage.getItem("user"))?.user || {};

  let availableUserIds = (currentBookingData?.userDetails?.participantsIds?.length > 0 && currentBookingData?.userDetails?.participantsIds?.participantsIds) || (availableworkspace?.user_ids !== '' && availableworkspace?.user_ids?.split(",").length > 0 && availableworkspace?.user_ids?.split(",").map((uId) => {
    return Number(uId)
  })) || [];
  let testUserIds = (currentBookingData?.userDetails?.participantsIds?.length > 0 && currentBookingData?.userDetails?.participantsIds) || (availableworkspace?.user_ids !== '' && availableworkspace?.user_ids?.split(",").length > 0 && availableworkspace?.user_ids?.split(",").map((uId) => {
    return Number(uId)
  })) || [];
  var workspaceUserLists = workspacedetails?.workspace_details?.UserList;
  const usersList = workspaceUserLists?.filter((array) => availableUserIds?.includes(array.id));
  const modifyBookingUserIds = modifyBookingData?.BookingParticipant.map((data) => { return data.id })

  const [show, setShow] = useState(false);
  const [commonMail, setCommonMail] = useState(currentBookingData?.commonMail || modifyBookingData?.common_emails || '');
  const [comments, setComments] = useState(currentBookingData?.comments || modifyBookingData?.comments || '');
  const [userList, setUserList] = useState((testUserIds.length > 0 && testUserIds) || modifyBookingUserIds|| [UserObj.id]);
  const [display_add_val, setDisplay_add_val] = useState("");
  const [display_edit_val, setDisplay_edit_val] = useState("none");
  const [selectedUser, setSelectedUser] = useState(
    ((usersList?.length > 0 && usersList?.map((x) => x.name).join(",")) || modifyBookingData?.BookingParticipant.map((x) => x.user_name).join(",")) || [UserObj.name]);
  const [defaultUser, setDefaultUser] = useState((usersList?.length > 0 && usersList?.map((x) => { return { label: x.name, value: x.id } })) || [{ label: UserObj.name, value: UserObj.id }]);
  const [showUserModal, setUserModal] = useState(false);

  useEffect(() => {
    if (floorId !== "" && fromDate !== "" && toDate !== "" && startTime !== "" && endTime !== "" && buildingId !== "" && purpose !== "") {
      dispatch(
        availableWorkspace({ floorId, fromDate, toDate, startTime, endTime, buildingId, userList, purpose })
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
    availableworkspace?.data?.FloorDetails?.workspaces?.filter((array) =>
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
    const roomBookingDetails = { ...bookSpace, comments: comments, common_emails: commonMail, active: true }
    console.log('roomBookingDetails', roomBookingDetails);
    setShow(false);
    if (modifyFlag) {
      dispatch(modifyBookWorkSpace({ bookSpace: roomBookingDetails, navigate, toast, bookingId }));
    }
    else {
      dispatch(bookworkspace({ bookSpace: roomBookingDetails, navigate, toast }));
    }
  };

  const handleInput = (e, field) => {
    if (field === "email") {
      setCommonMail(e.target.value);
    } else {
      setComments(e.target.value);
    }
  }
  const handleUserListModal = (blnVal) => {
    setUserModal(blnVal);
  }
  const validateOnsubmit = (formValue) => {
    if (commonMail !== '' && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(commonMail))) {
      toast.error("Please enter valid email address");
    } else {
      onSubmit(formValue);
    }
  }
  const checkAmetiesAvailable = (roomData) => {
    let bln = false;
    let amenitiesList = [];
    roomData.forEach((obj) => (
      obj.amenities.forEach((value) => (
        value.is_present === true && amenitiesList.push(value.name)
      ))
    ));
    return amenitiesList.length > 0 ? !bln : bln;
  }
  const handleOnchange = (val) => {
    let userIds = val.split(",").map((uId) => {
      return Number(uId);
    });
    setUserList(userIds);
    setDisplay_add_val("none");
    setDisplay_edit_val("inline");
    let newArr = [];
    let userObjArr = [];
    let userRecords = workspacedetails?.workspace_details?.UserList;
    userIds.map((userId) => {
      userRecords?.find((u) => {
        if (u.id === Number(userId)) {
          newArr.push(u.name);
          userObjArr.push({ label: u.name, value: u.id });
        }
        return null;
      });
      return userId;
    });
    setSelectedUser(newArr.join(","));
    setDefaultUser(userObjArr);
  };
  const handleUserModalClose = () => {
    setSelectedUser([UserObj.name]);
    setDefaultUser([{ label: UserObj.name, value: UserObj.id }]);
    setUserList([UserObj.id]);
    setDisplay_add_val("none");
    setDisplay_edit_val("inline");
    setUserModal(false);
  };

  const handleAddParticiapants = () => {
    const userDetails = {
      participants: defaultUser,
      participantsIds: userList
    };
    const payload = {
      userDetails: userDetails,
      comments: comments,
      commonMail: commonMail
    }
    dispatch(updateCurrentBookingData(payload))
    setUserModal(false);
  }
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
      user_ids: userList || [],
      selected_workspaces: formValue.selected_workspaces || [],
      data: availableworkspace?.data || [],
    });
    setShow(true);
  };

  const ConferenceRooms =
    availableworkspace?.data?.FloorDetails?.workspaces.filter(
      (item) => item.type === "conference"
    );
  //   const [emailError, setEmailError] = useState('')
  // const validateEmail = (e) => {
  //   var email = e.target.value
  
  //   if (validator.isEmail(email)) {
  //     setEmailError('Valid Email ID')
  //   } else {
  //     setEmailError('Invalid Email ID')
  //   }  
  // }
  // const [errorMessage, setErrorMessage] = useState('')
 
  // const validate = (value) => {
 
  //   if (validator.isStrongPassword(value, {
  //     minLength: 8, minLowercase: 1,
  //     minUppercase: 1, minNumbers: 1, minSymbols: 1
  //   })) {
  //     setErrorMessage('Valid Password')
  //   } else {
  //     setErrorMessage('Invaid Password')
  //   }
  // }
  

  const redirectToModify = () => {
    if (modifyFlag)
      navigate(`/modify-booking`)
    else
      navigate(`/new-booking`)

    const payload = {
      userDetails: { participants: selectedUser, participantsIds: userList },
      comments: comments,
      commonMail: commonMail
    }
    dispatch(updateCurrentBookingData(payload))
  }

  console.log('testUserIds',testUserIds);
  console.log('usersList',usersList);
  console.log('defaultUser',defaultUser);

  return (
    <Container fluid>
      <Row className="mt-5">
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item
              className="newbooking-breadcrumb-item"
              onClick={redirectToModify}
            >
              {modifyFlag ? 'Modify Booking' : 'New Booking'}
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
            <Form onSubmit={handleSubmit(validateOnsubmit)}>
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
                              disabled={availableworkspace?.data?.BookedWorkSpaces.filter(
                                (x) => x.seats.includes(item.id)
                              )?.length > 0}
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
                  <br />
                  <Row>
                    <Col className="col-md-3 text-field-label">
                      <Label>
                        Comments
                      </Label>
                    </Col>
                    <Col className="col-md-9">
                      <Form.Group>
                        <Form.Control className="text-field-input" as="textarea" value={comments} onChange={(e) => { handleInput(e, 'comment') }} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col className="col-md-3 text-field-label">
                      <Label>
                        Common Mail Id
                      </Label>
                    </Col>
                    <Col className="col-md-9">
                      <Form.Group>
                        <Form.Control style={{ width: "150%" }} type="email" placeholder="Enter email" value={commonMail} onChange={(e) => { handleInput(e, 'email') }} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <p className="preview-values">
                      <span
                        className="addmem-cust"
                        style={{ display: display_add_val, cursor: "pointer" }}
                      >
                        <span onClick={() => { handleUserListModal(true) }}>
                          <i className="bi bi-plus-circle">&nbsp;&nbsp;&nbsp;</i>
                          <u>Add Participants</u>
                        </span>
                      </span>
                      <span
                        className="addmem-cust"
                        style={{
                          display: selectedUser?.length > 0 ? "inline" : display_edit_val,
                        }}
                      >
                        <span
                          style={{ cursor: "pointer", display: display_edit_val }}
                          onClick={() => { handleUserListModal(true) }}
                        >
                          <i className="bi bi-plus-circle">
                            &nbsp;&nbsp;&nbsp;<u>Edit Participants</u>{" "}
                          </i>
                        </span>
                        <small>
                          &nbsp;&nbsp;&nbsp;Selected Participants:&nbsp;&nbsp;&nbsp;
                        </small>
                        <span id="selected-members">{selectedUser} </span>
                      </span>
                    </p>
                    <Modal
                      id="modal-card"
                      show={showUserModal}
                      onHide={() => { handleUserListModal(false) }}
                      size="md"
                      backdrop="static"
                      keyboard={false}
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                    >
                      <Modal.Body id="modal-card">
                        <Form.Group className="mb-3 ">
                          <MultiSelect
                            showArrow
                            onChange={handleOnchange}
                            defaultValue={defaultUser}
                            options={
                              workspacedetails?.workspace_details?.UserList?.map(
                                (item) => ({
                                  label: item.name,
                                  value: item.id,
                                })
                              ) || []
                            }
                            id="modal-card"
                          />
                        </Form.Group>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button onClick={() => { handleAddParticiapants() }} id="modal-save-btn" type="submit">
                          Add
                        </Button>
                        <Button
                          onClick={handleUserModalClose}
                          className="modal-close-user-btn"
                          type="submit"
                        >
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Row>
                  <Row className="mt-4 mb-3 text-lg-end">
                    <Col className="text-end">
                    
                      <Button
                        type="submit"
                        className="book-conference-room-btn shadow-none"
                        onClick={redirectToModify}>
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
                <Col lg={6} className="amenities-section">
                  {individualRoomDetail?.length > 0 && checkAmetiesAvailable(individualRoomDetail) && (
                    <div>
                      <h6>Amenities</h6>
                      {individualRoomDetail.map((obj) => (
                        <div style={{ textAlign: "center" }}>
                          {obj.amenities.map((value) => (
                            value.is_present === true && <div>{value.name}</div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </Col>
              </Row>
            </Form>
            {/* <hr className="mt-0 mb-0" /> */}
            {/* <Row className="mt-3">
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
            </Row> */}
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