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

const CabinFillDetails = () => {
  const [buildingId, setbuildingId] = useState();
  const [floorId, setshiftTiming] = useState();

  const today = new Date();
  // const tomorrow = new Date()
  // tomorrow.setDate(tomorrow.getDate() + 1)
  const [values, setValues] = useState([today]);
  const minDate = new Date();
  // const [selectedDate, setSelectedDate] = useState(new Date());

  const findcabinbooking = async () => {
    if (!buildingId) {
      toast.error("Please select Building");
    } else if (!floorId) {
      toast.error("Please select Floor");
    }
  };

  return (
    <div className="calendarWrap">
      <Form>
        <Row lg={6}>
          <Col>
            <Label>Date</Label>
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
                    format="DD/MM/YYYY"
                    value={values}
                    onChange={setValues}
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
                value={buildingId}
                // defaultValue={buildingId}
              >
                <option value="">Select</option>
                <option value="">Ganesh Chambers</option>
                <option value="">Workafella</option>
                <option value="">Olympia Tech Park</option>
                <option value="">Kay ARR Royal Stone Tech Park</option>
                <option value="">Workafella Collaborative Spaces</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row lg={6} className="mt-4">
          <Col>
            <Label>
              Floors <span className="mandate-item">*</span>
            </Label>
          </Col>
          <Col>
            <Form.Group className="mb-3 inputBox">
              <Form.Select
                className="building-selectionbox"
                size="sm"
                value={floorId}
                // defaultValue={buildingId}
              >
                <option value="">Select</option>
                <option value="">First Floor</option>
                <option value="">Second Floor</option>
                <option value="">Third Floor</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={{ span: 5, offset: 5 }}>
            <Button onClick={findcabinbooking} className="find-button">
              <i className="bi bi-search"></i>&nbsp;Find Cabin Booking
            </Button>
          </Col>
        </Row>
      </Form>
      <br></br>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Date - Building</Accordion.Header>
          <Accordion.Body>Cabin1 : Available</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Date - Building</Accordion.Header>
          <Accordion.Body>Cabin2 : Available</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
export default CabinFillDetails;
