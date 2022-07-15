import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";
import "./BookSpace.scss";
import BookSpaceModal from "./BookSpaceModal";

const options = [
  { label: "User 1", value: "1" },
  { label: "User 2", value: "3" },
  { label: "User 3", value: "2" },
];

const BookSpaceForm = () => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [bookSpace, setBookspace] = useState({
    city_id: "",
    location_id: "",
    building_id: "",
    floor_id: "",
    from_date: "",
    to_date: "",
    workspace_available: "",
    workspace_required: "",
    purpose: "",
    booking_for: [],
  });

  const handleClose = () => {
    setShow(false);
  };
  const handleSave = () => {
    setShow(false);
    navigate("/book-space-confirmation");
  };
  const handleSelectChange = (data) => {
    setSelected(data);
    setValue(
      "booking_for",
      data.map((item) => {
        return { selectedItem: item.value };
      })
    );
  };
  const onSubmit = (formValue, e) => {
    console.log(formValue);
    setBookspace({
      city_id: formValue.city_id || "",
      location_id: formValue.location_id || "",
      building_id: formValue.city_id || "",
      floor_id: formValue.floor_id || "",
      from_date: formValue.from_date || "",
      to_date: formValue.to_date || "",
      workspace_available: formValue.workspace_available || "",
      workspace_required: formValue.workspace_required || "",
      purpose: formValue.purpose || "",
    });
    setShow(true);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Select size="sm" {...register("city_id")}>
                    <option></option>
                    <option value="1">Chennai</option>
                    <option value="2">Bangalore</option>
                    <option value="3">Others</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Select size="sm" {...register("location_id")}>
                    <option></option>
                    <option value="1">Ganesh Chambers</option>
                    <option value="2">Workafella</option>
                    <option value="3">Others</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Floor</Form.Label>
                  <Form.Select size="sm" {...register("floor_id")}>
                    <option></option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Date (From)</Form.Label>
                  <Form.Control
                    size="sm"
                    type="date"
                    {...register("from_date")}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="toDate">
                  <Form.Label>Date (To)</Form.Label>
                  <Form.Control
                    size="sm"
                    type="date"
                    {...register("to_date")}
                  />
                </Form.Group>
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Workspace Available</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    disabled
                    {...register("workspace_available")}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Workspace Required</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    {...register("workspace_required")}
                  />
                </Form.Group>
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Purpose</Form.Label>
                  <Form.Select size="sm" {...register("purpose")}>
                    <option></option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Booking for</Form.Label>
                  <MultiSelect
                    options={options}
                    value={selected}
                    onChange={handleSelectChange}
                    hasSelectAll={false}
                    labelledBy="test"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button
              className="mb-3"
              style={{ float: "right" }}
              variant="primary"
              type="submit"
            >
              Book
            </Button>
          </Form>
        </Col>
      </Row>
      <BookSpaceModal
        show={show}
        handleClose={handleClose}
        handleSave={handleSave}
        formData={bookSpace && bookSpace}
      />
    </Container>
  );
};

BookSpaceForm.propTypes = {};

BookSpaceForm.defaultProps = {};

export default BookSpaceForm;
