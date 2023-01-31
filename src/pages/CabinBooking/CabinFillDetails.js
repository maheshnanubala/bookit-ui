import React, { useState, useEffect } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { addDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CabinPreview } from "./CabinPreview";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import Label from "react-bootstrap/FormLabel";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import Accordion from "react-bootstrap/Accordion";
import "react-multiple-select-dropdown-lite/dist/index.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./cabinBooking.scss";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const CabinFillDetails = () => {
  const [show, setShow] = useState(false);
  const [building, setbuilding] = useState();
  const [floor, setfloor] = useState();
  const { register, watch } = useForm();
  const cabin1 = watch("cabin1");
  console.log("cabin1", cabin1);
  const handlebuilding = (e) => {
    setbuilding(e.target.value);
  };
  const handlefloor = (e) => {
    setfloor(e.target.value);
  };
  const [datevalues, setDateValues] = useState();
  const minDate = new Date();
  const navigate = useNavigate();
  const findcabinroom = async () => {
    if (!datevalues) {
      toast.error("Please select Date");
    } else if (!building) {
      toast.error("Please select Building");
    } else {
      setShow(true);
    }
  };
  const bookcabin = async () => {
    if (days.isChecked) {
      toast.error("Please select Cabin");
    } else {
      navigate(`/home`);
      toast.success("Your booking has been confirmed");
    }
  };
  const accordionData = {
    title: `${datevalues}`,
    content: ``
  };
  const { title, content } = accordionData;
  const [days] = useState([{ name: "afternoon" }, { name: "morning" }]);

  const [users, setUsers] = useState();
  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = users.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers(tempUser);
    } else {
      let tempUser = users.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
    }
  };

  const buildings = [
    { id: "Ganesh Chambers", name: "Ganesh Chambers" },
    { id: "Workafella", name: "Workafella" },
    { id: "Olympia Tech Park", name: "Olympia Tech Park" },
    {
      id: "Bagmane Tech Park",
      name: "Bagmane Tech Park"
    },
    {
      id: "Workafella Collaborative Spaces",
      name: "Workafella Collaborative Spaces"
    }
  ];
  const floors = [
    { id: "First Floor", name: "First Floor" },
    { id: "Second Floor", name: "Second Floor" },
    { id: "Third Floor", name: "Third Floor" },
    { id: "Ground Floor", name: "Ground Floor" }
  ];
  const cBuilding = `${building}`;
  const cDate = `${datevalues}`;
  const cFloor = `${floor}`;
  const cSession = `${cabin1}`;
  useEffect(() => {
    setUsers(days);
  }, []);

  return (
    <div className="calendarWrap">
      <Form>
        <Row lg={6}>
          <Col>
            <Label>
              Date <span className="mandate-item">*</span>
            </Label>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <div className="calander-div">
                {
                  <DatePicker
                    multiple
                    plugins={[weekends(), <DatePanel />]}
                    minDate={minDate}
                    maxDate={addDays(minDate, 14)}
                    format="MMM-DD-YYYY"
                    value={datevalues}
                    onChange={setDateValues}
                    inputClass="custom-input"
                  />
                }
              </div>
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
                className="building-selectionbox"
                size="sm"
                value={building}
                onChange={handlebuilding}
              >
                <option value="">Select</option>
                {buildings.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row lg={6} className="mt-4">
          <Col>
            <Label>
              Floor <span className="mandate-item"></span>
            </Label>
          </Col>
          <Col>
            <Form.Group className="mb-3 inputBox">
              <Form.Select
                className="floor-selectionbox"
                size="sm"
                value={floor}
                onChange={handlefloor}
              >
                <option value="">Select</option>
                {floors.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={{ span: 5, offset: 5 }}>
            <Button onClick={findcabinroom} className="find-button">
              <i className="bi bi-search"></i>&nbsp;Find Cabins
            </Button>
          </Col>
        </Row>
      </Form>
      <br></br>
      {show && (
        <p>
          {" "}
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>{title}</Accordion.Header>
              <Accordion.Body>
                {content}
                <Row className="room-seat-block mt-3">
                  <Row className="seat-toolbar-block mb-3">
                    <Col
                      className="d-flex"
                      md={2}
                      style={{ alignItems: "baseline" }}
                    >
                      <input type="checkbox" checked={false} />
                      &nbsp;
                      <label>Available</label>
                    </Col>
                    <Col
                      className="d-flex justify-content-center"
                      md={2}
                      style={{ alignItems: "baseline" }}
                    >
                      <div className="box booking-selected-seats"></div>
                      <input type="checkbox" checked />
                      &nbsp;
                      <label> Selected</label>
                    </Col>
                    <Col
                      className="d-flex justify-content-end"
                      md={2}
                      style={{ alignItems: "baseline" }}
                    >
                      <div className="box booking-booked-seats"></div>
                      <input type="checkbox" disabled={true} />
                      &nbsp;
                      <label>Booked</label>
                    </Col>
                  </Row>
                </Row>
                <React.Fragment>
                  <section>
                    <Row className="text-center">
                      <label>First Floor</label>
                    </Row>
                    <form>
                      <div>
                        <table className="min-w-full ">
                          <thead>
                            <tr>
                              <th></th>
                              <td className=" text-center py-4 px-4, font-serif">
                                Morning
                              </td>
                              <td className=" text-center py-4 px-4 uppercase font-bold text-xl">
                                AfterNoon
                              </td>
                              {/* <th className=" text-center py-4 px-4 uppercase font-bold text-xl">
                                Full Day
      </th> */}
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-gray-100">
                              <td className="text-left py-4 px-4 uppercase font-bold text-2xl">
                                Cabin 1
                              </td>
                              <td className=" text-center ">
                                <input
                                  type="checkbox"
                                  value="Morning"
                                  onClick={handleChange}
                                  {...register("cabin1", {})}
                                />
                              </td>
                              <td className=" text-center ">
                                <input
                                  type="checkbox"
                                  value="Afternoon"
                                  onClick={handleChange}
                                  {...register("cabin1", {})}
                                />
                              </td>
                              {/* <td className=" text-center ">
                                <input
                                  type="checkbox"
                                  value="Fullday"
                                  onClick={handleChange}
                                  {...register("cabin1", {})}
                                />
    </td> */}
                            </tr>
                            <tr className="bg-gray-100">
                              <td className="text-left py-4 px-4 uppercase font-bold text-2xl">
                                Cabin 2
                              </td>
                              <th className="text-center py-2 px-2 uppercase font-bold text-xl">
                                <input type="checkbox" disabled={true} />
                              </th>
                              <td className="text-center">
                                <input type="checkbox" disabled={true} />
                              </td>
                              {/* <td className="text-center">
                                <input
                                  type="checkbox"
                                  disabled={true}
                                 /> 
                              </td>*/}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </form>
                  </section>
                </React.Fragment>
                <CabinPreview
                  cBuilding={cBuilding}
                  cDate={cDate}
                  cFloor={cFloor}
                  cSession={cSession}
                />
                {/*  <Button variant="outline-danger" href="/home" className="button2 ">
                    Cancel
                            </Button> */}
                <Button className="button3 , find-button" onClick={bookcabin}>
                  Book
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </p>
      )}
    </div>
  );
};
export default CabinFillDetails;
