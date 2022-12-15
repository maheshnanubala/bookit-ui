/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Time } from "../../constants/time";
import { DateRange } from "react-date-range";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getworkspaceDetails } from "../../redux/ActionReducer/bookSlice.js";
import Label from "react-bootstrap/FormLabel";
import InputGroup from "react-bootstrap/InputGroup";
import moment from "moment";
import format from "date-fns/format";
import "react-multiple-select-dropdown-lite/dist/index.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./newBooking.scss";

const FillDetails = () => {
  const { workspacedetails, availableworkspace, modifyBookingData } =
    useSelector((state) => ({ ...state.bookworkspace }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [purpose, setPurpose] = useState();
  const [buildingId, setbuildingId] = useState();
  const [floorId, setFloorId] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [hideToTime, setHideToTime] = useState("");
  const [floorData, setFloorData] = useState([]);
  const [openCal, setOpenCal] = useState(false);
  const [calRange, setCalRange] = useState([
    {
      startDate:
        new Date(availableworkspace?.data?.FromDate || new Date()) ||
        new Date(),
      endDate:
        new Date(availableworkspace?.data?.ToDate || new Date()) || new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    const modifyDefaultStartTime =
      modifyBookingData &&
      new Date(modifyBookingData.from_datetime).toLocaleTimeString("en-US", {
        timeZone: "UTC",
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
      });
    const modifyDefaultSEndTime =
      modifyBookingData &&
      new Date(modifyBookingData.to_datetime).toLocaleTimeString("en-US", {
        timeZone: "UTC",
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
      });
    setPurpose(
      availableworkspace?.data?.Purpose || modifyBookingData?.purpose || ""
    );
    setbuildingId(
      parseInt(
        availableworkspace?.data?.FloorDetails?.building_id ||
          modifyBookingData?.building_id ||
          ""
      )
    );
    setFloorId(
      parseInt(
        availableworkspace?.data?.FloorDetails?.id ||
          modifyBookingData?.floor_id ||
          ""
      )
    );
    setStartTime(
      availableworkspace?.data?.StartTime || modifyDefaultStartTime || ""
    );
    setEndTime(
      availableworkspace?.data?.EndTime || modifyDefaultSEndTime || ""
    );
  }, [modifyBookingData, availableworkspace]);

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscapeCal, true);
    document.addEventListener("click", hideOnClickOutsideCal, true);
    dispatch(getworkspaceDetails());
  }, []);

  // To setup floor data
  useEffect(() => {
    let florListArr = workspacedetails?.workspace_details?.FloorList?.filter(
      (val) => {
        return val.building_id === Number(buildingId);
      }
    );
    setFloorData(florListArr);
  }, [workspacedetails]);

  const setFloorRecord = (buildingId) => {
    let florListArr = workspacedetails?.workspace_details?.FloorList.filter(
      (val) => {
        return val.building_id === Number(buildingId);
      }
    );
    setFloorData(florListArr);
    setbuildingId(buildingId);
  };

  const setToTime = (sTime) => {
    setStartTime(sTime);
    setEndTime("");
    var disabledTime = [];
    let timeObj = Time[Time.findIndex((time) => time.label === sTime) + 1];
    Time.forEach((item) => {
      if (Number(item.value) < Number(timeObj?.value) || sTime === "11:30 PM") {
        disabledTime.push(item.label);
      }
    });
    setHideToTime(disabledTime);
  };

  const findConference = async () => {
    let fDate = new Date(calRange[0].startDate);
    let tDate = new Date(calRange[0].endDate);
    const fromDate = format(fDate, "yyyy-MM-dd");
    const toDate = format(tDate, "yyyy-MM-dd");
    if (fromDate !== toDate) {
      toast.error("Currently single date booking only available");
    } else if (!startTime) {
      toast.error("Please select Start Time");
    } else if (!endTime) {
      toast.error("Please select End Time");
    } else if (startTime === endTime) {
      toast.error("End time should be greater than start time");
    } else if (!buildingId) {
      toast.error("Please select Building");
    } else if (!floorId) {
      toast.error("Please select Floor");
    } else if (!purpose) {
      toast.error("Please select Purpose");
    } else {
      if (modifyBookingData) {
        navigate(
          `/modify-booking/room-selection/${floorId}/${fromDate}/${toDate}/${startTime}/${endTime}/${buildingId}/${purpose}`
        );
      } else {
        navigate(
          `/new-booking/room-selection/${floorId}/${fromDate}/${toDate}/${startTime}/${endTime}/${buildingId}/${purpose}`
        );
      }
    }
  };

  const refOneCal = useRef(null);
  const hideOnEscapeCal = (e) => {
    if (e.key === "Escape") {
      setOpenCal(false);
    }
  };
  const hideOnClickOutsideCal = (e) => {
    if (refOneCal.current && !refOneCal.current.contains(e.target)) {
      setOpenCal(false);
    }
  };

  const HandlePassedTime = () => {
    const todayDate = moment(new Date()).startOf("day").toDate();
    const presentTime = new Date();
    let diffSeconds = moment(presentTime).diff(todayDate, "seconds");
    return diffSeconds;
  };

  console.log("modifyBookingData", modifyBookingData);

  const checkEndPastTime = () => {
    let presentTimeInSec = HandlePassedTime();
    let currentSecObj = Time.find(
      (timeObj) => timeObj.value > presentTimeInSec
    );
    let currentEndSec =
      Time[Time.findIndex((time) => time.label === currentSecObj.label) + 1];
    return currentEndSec?.value && Number(currentEndSec.value);
  };
  console.log("starttime", startTime);
  console.log("endTime", endTime);
  console.log("floorId", floorId);
  console.log("floorData", floorData);
  console.log("buildingId", buildingId);
  console.log("workspacedetails", workspacedetails);
  // console.log('newBookFlag', newBookFlag);

  return (
    <>
      <Form>
        <Row lg={6}>
          <Col>
            <Label>Date</Label>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <InputGroup>
                <input
                  value={`${format(
                    calRange[0]?.startDate,
                    "dd MMM"
                  )} to ${format(calRange[0]?.endDate, "dd MMM")}`}
                  className="inputBox"
                  disabled
                />
                <i
                  className="bi-calendar-check calander-icon "
                  onClick={() => setOpenCal((open) => !open)}
                ></i>
              </InputGroup>
              <div className="calander-div" ref={refOneCal}>
                {openCal && (
                  <DateRange
                    onChange={(item) => setCalRange([item.selection])}
                    editableDateInputs={true}
                    ranges={calRange}
                    months={1}
                    minDate={new Date()}
                    direction="horizontal"
                    className="calendarElement"
                  />
                )}
              </div>
            </Form.Group>
          </Col>
          <Col>
            <Label className="start-time-label">
              Start Time <span className="mandate-item">*</span>
            </Label>
          </Col>
          <Col>
            <Form.Group className="mb-3 inputBox">
              <Form.Select
                onChange={(e) => setToTime(e.target.value)}
                className="building-selectionbox"
                size="sm"
                value={startTime}
                // defaultValue={startTime}
              >
                <option value="" key="">
                  Select
                </option>
                {Time.map((item) => (
                  <option
                    value={item.label}
                    disabled={HandlePassedTime() > item.value}
                    key={item.key}
                  >
                    {item.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Label className="end-time-label">
              End Time <span className="mandate-item">*</span>
            </Label>
          </Col>
          <Col>
            <Form.Group className="mb-3 inputBox">
              <Form.Select
                onChange={(e) => setEndTime(e.target.value)}
                className="building-selectionbox"
                size="sm"
                value={endTime}
                // defaultValue={endTime}
              >
                <option value="" key="">
                  Select
                </option>
                {Time.map((item) => (
                  <option
                    value={item.lable}
                    disabled={
                      hideToTime.includes(item.label) ||
                      startTime === "" ||
                      checkEndPastTime() > item.value
                    }
                    key={item.key}
                  >
                    {item.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row lg={6} className="mt-4">
          <Col>
            <Label>
              Building <span className="mandate-item">*</span>
            </Label>
          </Col>
          <Col>
            <Form.Group className="mb-3 inputBox">
              <Form.Select
                onChange={(e) => {
                  setFloorRecord(e.target.value);
                }}
                className="building-selectionbox"
                size="sm"
                value={buildingId}
                // defaultValue={buildingId}
              >
                <option value="">Select</option>
                {workspacedetails?.workspace_details?.BuildingList?.map(
                  (item) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  )
                )}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Label className="floor-label">
              Floor <span className="mandate-item">*</span>
            </Label>
          </Col>
          <Col>
            <Form.Group className="mb-3 inputBox">
              <Form.Select
                size="sm"
                onChange={(e) => setFloorId(e.target.value)}
                value={floorId}
                // defaultValue={floorId}
              >
                <option value="">Select</option>
                {floorData?.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col lg="2">
            {" "}
            <Label>
              Purpose <span className="mandate-item">*</span>
            </Label>
          </Col>
          <Col>
            <Form.Group className="mb-3 select-purpose-input">
              <Form.Select
                className="purpose-select"
                onChange={(e) => setPurpose(e.target.value)}
                value={purpose}
                // defaultValue={purpose}
              >
                <option>Select</option>
                {workspacedetails?.workspace_details?.Purpose?.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        {/* <Row className="mt-4">
          <p className="preview-values">
            <span
              className="addmem-cust"
              style={{ display: display_add_val, cursor: "pointer" }}
            >
              <span onClick={modalOpen}>
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
                onClick={modalOpen}
              >
                <i className="bi bi-plus-circle">
                  &nbsp;&nbsp;&nbsp;<u>Edit Participants</u>{" "}
                </i>
              </span>
              <small>
                &nbsp;&nbsp;&nbsp;Selected Participants:&nbsp;&nbsp;&nbsp;
              </small>
              <span id="selected-members">{selectedUser}</span>
            </span>
          </p>
          <Modal
            id="modal-card"
            show={show}
            onHide={modalClose}
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
              <Button onClick={modalClose} id="modal-save-btn" type="submit">
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
        </Row> */}
        <Row className="mt-5">
          <Col md={{ span: 5, offset: 5 }}>
            <Button onClick={findConference} className="find-button">
              <i className="bi bi-search"></i>&nbsp;Find Conference Room
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default FillDetails;
