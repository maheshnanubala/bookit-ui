import React, { useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import Label from "react-bootstrap/FormLabel";
import "react-multiple-select-dropdown-lite/dist/index.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./cabinBooking.scss";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import Accordion from "react-bootstrap/Accordion";
//import { useNavigate } from "react-router-dom";
import { array } from "yup";

const CabinFillDetails = () => {
  const [show, setShow] = useState(false);
  const [building, setbuilding] = useState();
  const [floor, setfloor] = useState();

  // const today = new Date();
  // const tomorrow = new Date()
  // tomorrow.setDate(tomorrow.getDate() + 1)

  const [datevalues, setDateValues] = useState();
  const minDate = new Date();

  // const [selectedDate, setSelectedDate] = useState(new Date());

  const handlebuilding = (e) => {
    setbuilding(e.target.value);
  };

  const buildings = [
    { id: "wf", name: "workafella" },
    { id: "otp", name: "olympia tech park" },
    { id: "gc", name: "Ganesh chambers" },
    { id: "wcs", name: "workafella collabrative spaces" },
  ];
  const handlefloor = (e) => {
    setfloor(e.target.value);
  };

  const floorList = [
    { id: "first", name: "First Floor" },
    { id: "snd", name: "Second Floor" },
    { id: "trd", name: "Third Floor" },
    { id: "frt", name: "Forth Floor" },
  ];

  const accordionData = {
    title: `${datevalues}`,
    

    content: ``,
  };
  const { title, content } = accordionData;
  const { header } = accordionData;


  //const navigate = useNavigate();
  const findcabinbooking = async () => {
    if (!datevalues) {
      toast.error("Please select Date 1 ");
    } else if (!building) {
      toast.error("Please select Building");
    } else {
      setShow(true)
    }
    
  };

  return (
    <div className="calendarWrap">
      <Form>
        <Row lg={6}>
          <Col>
            <Label>
              Date 
              <span className="mandate-item" placeholderText="choose date ">
                *
              </span>
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
                    maxDate={addDays(minDate, 12)}
                    format="DD/MM/YYYY"
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
                // defaultValue={buildingId}
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
            <Label>Floor</Label>
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
                {floorList.map((item, index) => {
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
            <Button onClick={findcabinbooking} className="find-button">
            Find Cabin Booking
            
              {/*  <i className="bi bi-search"></i>&nbsp;Find Cabin Booking */}
            </Button> 
          </Col>
        </Row>
      </Form>
      {show && <p><Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>{title} - {header}</Accordion.Header>
          <Accordion.Body>Cabin1 : Available</Accordion.Body>
        </Accordion.Item>
      </Accordion></p>}
{/* 
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>{title2} </Accordion.Header>
          <Accordion.Body>Cabin1 : Available</Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header>{title3} </Accordion.Header>
          <Accordion.Body>Cabin1 : Available</Accordion.Body>
        </Accordion.Item>
              </Accordion> */}
      
    </div>
  );
};
export default CabinFillDetails;
