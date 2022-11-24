import React, { useEffect, useRef, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Label from "react-bootstrap/FormLabel";
import InputGroup from "react-bootstrap/InputGroup";
import { Button } from "react-bootstrap";
import { Time } from "../../constants/time";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./newBooking.scss";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getworkspaceDetails } from "../../redux/ActionReducer/bookSlice.js";
import moment from "moment";

const FillDetails = () => {
  const { workspacedetails, bookworkspaceDetails, availableworkspace } =
    useSelector((state) => ({
      ...state.bookworkspace,
    }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [floorData, setFloorData] = useState([]);

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscapeCal, true);
    document.addEventListener("click", hideOnClickOutsideCal, true);
    dispatch(getworkspaceDetails());
    let florListArr = workspacedetails?.workspace_details?.FloorList?.filter(
      (val) => {
        return val.building_id === Number(buildingId);
      }
    );
    setFloorData(florListArr);

    if (bookworkspaceDetails?.success === true) {
      navigate(0);
    }
  }, [dispatch]);

  const setFloorRecord = (buildingId) => {
    let florListArr = workspacedetails?.workspace_details?.FloorList.filter(
      (val) => {
        return val.building_id === Number(buildingId);
      }
    );
    setFloorData(florListArr);
    setbuildingId(buildingId);
  };

  const [purpose, setPurpose] = useState(
    availableworkspace?.data?.Purpose || ""
  );
  const [buildingId, setbuildingId] = useState(
    parseInt(availableworkspace?.data?.FloorDetails?.building_id) || null
  );
  const [floorId, setFloorId] = useState(null);

  const [startTime, setStartTime] = useState(
    availableworkspace?.data?.StartTime || ""
  );
  const [endTime, setEndTime] = useState(
    availableworkspace?.data?.EndTime || ""
  );
  const [hideToTime, setHideToTime] = useState("");

  const setToTime = (sTime) => {
    setStartTime(sTime);
    var disabledTime = [];
    var isBreak = false;
    Time.map((item) => {
      if (item.label !== sTime && !isBreak) {
        disabledTime.push(item.label);
      } else {
        isBreak = true;
      }
      return null;
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
    } else if (startTime === "" || startTime === undefined) {
      toast.error("Please select Start Time");
    } else if (endTime === "" || endTime === undefined) {
      toast.error("Please select End Time");
    } else if (startTime === endTime) {
      toast.error("End time should be greater than start time");
    } else if (buildingId === null || buildingId === undefined) {
      toast.error("Please select Building");
    } else if (floorId === null || floorId === undefined) {
      toast.error("Please select Floor");
    } else if (purpose === "" || purpose === undefined) {
      toast.error("Please select Purpose");
    } else {
      navigate(
        `/new-booking/room-selection/${floorId}/${fromDate}/${toDate}/${startTime}/${endTime}/${buildingId}/${purpose}`
      );
    }
  };

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

  const [openCal, setOpenCal] = useState(false);
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
    const todayDate = moment(new Date()).startOf('day').toDate();
    const presentTime = new Date();
    let diffSeconds = moment(presentTime).diff(todayDate, 'seconds');
    return diffSeconds;
  }
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
                defaultValue={startTime}
              >
                <option value="" key="">
                  Select
                </option>
                {Time.map((item) => (
                  <option
                    value={item.label}
                    disabled={!startTime && (HandlePassedTime() > item.value)}
                    key={item.key}>
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
                defaultValue={endTime}
              >
                <option value="" key="">
                  Select
                </option>
                {Time.map((item) => (
                  <option
                    value={item.lable}
                    disabled={hideToTime.includes(item.label) || startTime === ""}
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
                defaultValue={buildingId}
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
                defaultValue={floorId}
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
                defaultValue={purpose}
              >
                <option value="">Select</option>
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
              <span id="selected-members">{selectedUser} </span>
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
