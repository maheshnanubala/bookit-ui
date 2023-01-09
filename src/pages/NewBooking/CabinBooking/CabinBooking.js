import React, { useState, useEffect } from "react";
import { Col, Row, Form, Accordion } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Label from "react-bootstrap/FormLabel";
import InputGroup from "react-bootstrap/InputGroup";
import moment from "moment";
import { eachDayOfInterval, isSunday, nextSaturday, nextSunday, previousSunday, set } from 'date-fns'
import "react-multiple-select-dropdown-lite/dist/index.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../newBooking.scss";
import "./cabinBooking.scss";
import { getworkspaceDetails } from "../../../redux/ActionReducer/bookSlice.js";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import SelectedCabinDetailsModal from "./SelectedCabinsDetailsModal";
import { getCabinDetails, bookSelectedCabins } from "../../../redux/ActionReducer/cabinSlice.js";
import ConfirmBookingModal from "./ConfirmBookingModal";


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
    const [activeWeeksDate, setActiveWeeksDate] = useState({});
    const [showCabins, setShowCabins] = useState(false);
    const [showBookModal, setBookModal] = useState(false);
    const userObj = JSON.parse(window.localStorage.getItem("user"));
    useEffect(() => {
        dispatch(getworkspaceDetails());
        getActiveWeeks();
    }, []);

    useEffect(() => {
        let florListArr = workspacedetails?.workspace_details?.FloorList?.filter((val) => { return val.building_id === Number(buildingId) });
        setFloorData(florListArr);
    }, [workspacedetails]);

    const getActiveWeeks = () => {
        let firstWeek = eachDayOfInterval({
            start: isSunday(new Date()) ? new Date() : new Date(previousSunday(new Date())),
            end: new Date(nextSaturday(new Date()))
        }).map((date) => {
            return moment(new Date(date)).format("YYYY-MM-DD");
        });
        let secondWeek = eachDayOfInterval({
            start: new Date(nextSunday(new Date())),
            end: new Date(nextSaturday(new Date(nextSunday(new Date()))))
        }).map((date) => {
            return moment(new Date(date)).format("YYYY-MM-DD");
        });
        let weeksObj = {
            currentWeek: firstWeek,
            nextWeek: secondWeek
        }
        setActiveWeeksDate(weeksObj);
    }
    const setFloorRecord = (buildingId) => {
        let florListArr = workspacedetails?.workspace_details?.FloorList.filter(
            (val) => {
                return val.building_id === Number(buildingId);
            }
        );
        setFloorData(florListArr);
        setbuildingId(buildingId);
        setShowCabins(false);
        setSelectedCabins([]);
    };

    const handelDateSubmit = (dates) => {
        let formattedDates = dates?.map((date) => moment(new Date(date)).format('YYYY-MM-DD')) || []
        setSelectedDates(formattedDates);
        setBookingDates(dates);
        setShowCabins(false);
        selectedCabins?.length > 0 && updateSelectedCabins(formattedDates);
    }

    const updateSelectedCabins = (dates) => {
        let cabins = [];
        dates.forEach((date) => {
            cabins = [...cabins, ...selectedCabins.filter((cabin) => cabin.date === date)];
        });
        setSelectedCabins(cabins);
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
            setShowCabins(true);
            console.log(selectedDates, buildingId, floorId)
            dispatch(getCabinDetails({ dates: selectedDates, buildingId, floorId }))
        }
    }

    const checkMaxSelectionOfDay = (date) => {
        let selectedCabinsOftheDay = (selectedCabins.length > 0 && selectedCabins.filter((cabin) => cabin.date === date)) || [];
        return selectedCabinsOftheDay.length;
    }
    const checkWeekLimit = (date) => {
        let totalCabins = []
        if (activeWeeksDate.currentWeek.includes(date)) {
            activeWeeksDate.currentWeek.forEach((d) => {
                let selectedCabinsOnthisDay = selectedCabins.filter((cabin) => cabin.date === d);
                totalCabins = [...totalCabins, ...selectedCabinsOnthisDay];
            })
        } else if (activeWeeksDate.nextWeek.includes(date)) {
            activeWeeksDate.nextWeek.forEach((d) => {
                let selectedCabinsOnthisDay = selectedCabins.filter((cabin) => cabin.date === d);
                totalCabins = [...totalCabins, ...selectedCabinsOnthisDay];
            })
        }

        if (totalCabins.length >= 6) {
            toast.error("Exceeds Weekly Booking Limit");
        };
        return totalCabins.length < 6;
    }
    const handleCheckBox = (cabinData, type, date, e, floor) => {
        console.log(cabinData, type);
        let clonnedSelectedCabins = (selectedCabins.length > 0 && [...selectedCabins]) || [];
        if (e.target.checked && checkMaxSelectionOfDay(date) < 2 && checkWeekLimit(date)) {
            let selectedObj = { date: date, session: type, floor: floor, checked: true, ...cabinData }
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
    const setCheckedOpt = (cabin, session, date) => {
        let checkSts = selectedCabins.filter((cabinObj) => (cabinObj.date === date && cabinObj.session === session && cabinObj.id === cabin.id));
        return checkSts.length > 0 ? checkSts[0].checked : false
    }
    const handleCancelSelectedCab = ({ date, session, id }) => {
        let clonnedCabins = [...selectedCabins];
        let cabinIndex = selectedCabins.findIndex((cabin) => (cabin.date === date && cabin.id === id && cabin.session === session));
        clonnedCabins.splice(cabinIndex, 1);
        setSelectedCabins(clonnedCabins);
    }

    const handleBookCabin = () => {

        let currentWeekSelected = activeWeeksDate?.currentWeek?.filter(e => selectedDates.indexOf(e) !== -1);
        let nextWeekSelected = activeWeeksDate?.nextWeek?.filter(e => selectedDates.indexOf(e) !== -1);
        let cabinBookingDetails = [];
        selectedCabins.forEach((cabin) => {
            let obj = {
                workspace_id: cabin.id,
                booking_date: cabin.date,
                city_id: cabinsDetails?.city_id,
                building_id: cabinsDetails?.building_id,
                floor_id: cabin.floor.id,
                booking_slot_type: cabin.session,
                booking_slot_time: 4,
                booked_by: userObj.user.id,
                comments: '',
                active: true
            }
            cabinBookingDetails.push(obj);
        })
        let payload = {
            booking_dates: selectedDates,
            purpose: '',
            active: true,
            is_partian_cancellation_happened: false,
            booked_by: userObj.user.id,
            current_week_dates: activeWeeksDate?.currentWeek,
            next_week_dates: activeWeeksDate?.nextWeek,
            current_week_booking_dates: currentWeekSelected,
            next_week_booking_dates: nextWeekSelected,
            cabin_booking_details: cabinBookingDetails,
        }
        dispatch(bookSelectedCabins({ data: payload, navigate, toast }))
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
            {(cabinsDetails && showCabins) && <>
                <Form>
                    <br />
                    <Row>
                        {cabinsDetails?.booking_dates.length > 0 && cabinsDetails?.booking_dates.map((date, index) => (
                            <Accordion defaultActiveKey={0}>
                                <Accordion.Item eventKey={index}>
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
                                                                //defaultChecked={setCheckedOpt(cabin, sessionType, date)}
                                                                onClick={(e) => { handleCheckBox(cabin, sessionType, date, e, { id: floorData.id, name: floorData.name }) }}
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
                            {selectedCabins.length > 0 && <span className="see-details-text" onClick={() => { handleSeeDetails(true) }}><u>See Deatils</u></span>}
                        </Col>
                        <Col>
                            <Button onClick={() => (window.location.reload())}
                                className="find-button" disabled={selectedCabins?.length === 0} >
                                Cancel
                            </Button>
                            <Button onClick={() => setBookModal(true)}
                                className="find-button" disabled={selectedCabins?.length === 0} >
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
                handleCancelCabin={handleCancelSelectedCab}
            />
            }
            {showBookModal && <ConfirmBookingModal
                show={showBookModal}
                facility={cabinsDetails?.building_name}
                City={cabinsDetails?.city_name}
                selectedCabins={selectedCabins}
                bookingDates={bookingDates}
                handleBookCabin={handleBookCabin}
                handleClose={() => setBookModal(false)}
            />
            }
        </>
    )
}
export default CabinBooking;