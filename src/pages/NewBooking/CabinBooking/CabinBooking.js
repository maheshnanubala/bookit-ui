import React, { useState, useEffect } from "react";
import { Col, Row, Form, Accordion } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Label from "react-bootstrap/FormLabel";
import InputGroup from "react-bootstrap/InputGroup";
import moment from "moment";
import { nextSaturday, nextSunday } from 'date-fns'
import "react-multiple-select-dropdown-lite/dist/index.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../newBooking.scss";
import "./cabinBooking.scss";
import DemoData from "../demo.json";
import { getworkspaceDetails } from "../../../redux/ActionReducer/bookSlice.js";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import SelectedCabinDetailsModal from "./SelectedCabinsDetailsModal";
import { getCabinDetails } from "../../../redux/ActionReducer/cabinSlice.js";


const CabinBooking = () => {
    const { workspacedetails } = useSelector((state) => ({ ...state.bookworkspace }));
    const { cabinsDetails } = useSelector((state) => ({ ...state.cabinsData }));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [buildingId, setbuildingId] = useState();
    const [floorId, setFloorId] = useState();
    const [floorData, setFloorData] = useState([]);
    const [bookingDates, setBookingDates] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);
    const [selectedCabins, setSelectedCabins] = useState([]);
    const [showSeeDetails, setSeeDetails] = useState(false);


    useEffect(() => {
        dispatch(getworkspaceDetails());
    }, []);

    useEffect(() => {
        let florListArr = workspacedetails?.workspace_details?.FloorList?.filter((val) => { return val.building_id === Number(buildingId) });
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

    const handelDateSubmit = (dates) => {
        let formattedDates = dates?.map((date) => moment(new Date(date)).format('YYYY/MM/DD')) || []
        setSelectedDates(formattedDates);
        setBookingDates(dates);
    }
    const handleValidations = () => {
        let valid = true;
        if (bookingDates.length === 0 || buildingId === '' || buildingId === null || buildingId == undefined) {
            valid = false;
            toast.error("Please select required fields");
        }
        return valid;
    }
    const findCabinsHandler = () => {
        if (handleValidations()) {
            console.log(selectedDates, buildingId, floorId)
            dispatch(getCabinDetails({ dates: selectedDates, buildingId, floorId }))
        }
    }

    const checkMaxSelectionOfDay = (date) => {
        let selectedCabinsOftheDay = (selectedCabins.length > 0 && selectedCabins.filter((cabin) => cabin.date === date)) || [];
        return selectedCabinsOftheDay.length;
    }
    const handleCheckBox = (cabinData, type, date, e, floorName) => {
        console.log(cabinData, type);
        let clonnedSelectedCabins = (selectedCabins.length > 0 && [...selectedCabins]) || [];
        if (e.target.checked && checkMaxSelectionOfDay(date) < 2) {
            let selectedObj = { date: date, session: type, floor_name: floorName, ...cabinData }
            clonnedSelectedCabins.push(selectedObj);
            setSelectedCabins(clonnedSelectedCabins)
        } else if (e.target.checked === false && checkMaxSelectionOfDay(date) <= 2) {
            let objIndex = selectedCabins.findIndex((cabin) => (cabin.date === date && cabin.session === type && cabin.id === cabinData.id))
            clonnedSelectedCabins.splice(objIndex, 1);
            setSelectedCabins(clonnedSelectedCabins);
        } else {
            e.preventDefault();
        }
    }
    const setMaxDate = () => {
        let comingSunday = new Date(nextSunday(new Date()));
        let maxDate = nextSaturday(comingSunday)
        return maxDate;
    }
    const handleSeeDetails = (bln) => {
        setSeeDetails(bln)
    }

    return (
        <>
            <Form>
                <Row lg={12} xs={12}>
                    <Col md={2}>
                        <Label>Date <span className="mandate-item">*</span></Label>
                    </Col>
                    <Col md={9}>
                        <Form.Group className="mb-12">
                            <InputGroup>
                                <DatePicker
                                    multiple
                                    value={bookingDates}
                                    onChange={dates => { handelDateSubmit(dates) }}
                                    minDate={new Date()}
                                    maxDate={new Date(setMaxDate())}
                                    plugins={[
                                        <DatePanel />
                                    ]}
                                    sort
                                    portal
                                    format="DD/MM/YYYY"
                                    containerClassName="multiDatePicker"
                                />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Row lg={6} className="mt-4">
                    <Col>
                        <Label>
                            Facility <span className="mandate-item">*</span>
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
                            Floor
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

                <Row className="mt-5">
                    <Col md={{ span: 5, offset: 5 }}>
                        <Button onClick={() => { findCabinsHandler() }} className="find-button">
                            <i className="bi bi-search"></i>&nbsp;Find Cabins
                        </Button>
                    </Col>
                </Row>
            </Form>
            {cabinsDetails && <>
                <Form>
                    <br />
                    <Row>
                        {cabinsDetails?.booking_dates.length > 0 && cabinsDetails?.booking_dates.map((date) => (
                            <Accordion defaultActiveKey={date}>
                                <Accordion.Item eventKey={date}>
                                    <Accordion.Header><b>{`${date} - ${cabinsDetails?.building_name}`}</b></Accordion.Header>
                                    {cabinsDetails?.floors.map((floorData) => (
                                        <Accordion.Body>
                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{floorData.name}</div>
                                            <br />
                                            <Row style={{ marginBottom: "5px" }}>
                                                <Col></Col>
                                                <Col>First Half</Col>
                                                <Col>Second Half</Col>
                                                {/* <Col>Full Day</Col> */}
                                            </Row>
                                            {
                                                floorData.cabins.map((cabin) => (
                                                    <Row key={cabin.id} style={{ marginBottom: "5px" }}>
                                                        <Col>{cabin.name}</Col>
                                                        {["First Half", "Second Half"].map((sessionType) => (<Col>
                                                            <Form.Check
                                                                inline
                                                                name={sessionType}
                                                                type={"checkbox"}
                                                                id={sessionType}
                                                                aria-label={sessionType}
                                                                onClick={(e) => { handleCheckBox(cabin, sessionType, date, e, floorData.name) }}
                                                            />
                                                        </Col>))
                                                        }
                                                    </Row>
                                                ))
                                            }
                                        </Accordion.Body>
                                    ))}
                                </Accordion.Item>
                            </Accordion>
                        ))}
                    </Row>
                </Form>
                <Form>
                    <Row md={12} className="cabin-footer-container">
                        <Col>
                            <div>{`Selected Cabins (${selectedCabins.length})`}</div>
                            <span className="see-details-text" onClick={() => { handleSeeDetails(true) }}><u>See Deatils</u></span>
                        </Col>
                        <Col>
                            <Button onClick={() => null} className="find-button">
                                Cancel
                            </Button>
                            <Button onClick={() => null} className="find-button">
                                Book
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </>
            }
            {showSeeDetails && <SelectedCabinDetailsModal
                show={showSeeDetails}
                handleSeeDetails={handleSeeDetails}
                selectedCabins={selectedCabins}
                facility={cabinsDetails?.building_name}
            />
            }
        </>
    )
}
export default CabinBooking;