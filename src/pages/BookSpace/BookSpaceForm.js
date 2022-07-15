import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";
import { toast } from "react-toastify";
import BookSpaceModal from "./BookSpaceModal";
import { data } from "../../constants/mockdata";
import { useDispatch, useSelector } from "react-redux";
import {
  bookworkspace,
  availableworkspace,
} from "../../redux/ActionReducer/bookSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookWorkSpaceSchema } from "../../services/ValidationSchema";
import "./BookSpace.scss";

const BookSpaceForm = () => {
  const [show, setShow] = useState(false);

  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => ({
    ...state.auth.user,
  }));

  // const availableBookSpaceValue = {
  //   floor_id: 1,
  //   from_date: "15-07-2022",
  //   to_date: "15-07-2022",
  // };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(bookWorkSpaceSchema) });
  const [bookSpace, setBookspace] = useState({
    city_id: 0,
    location_id: 0,
    building_id: 1,
    floor_id: 0,
    from_date: "",
    to_date: "",
    workspaces_booked: 0,
    purpose: "",
    user_id: user?.id,
    user_ids: [],
  });

  const handleClose = () => {
    setShow(false);
  };
  const handleSave = () => {
    setShow(false);
    dispatch(bookworkspace({ bookSpace, navigate, toast }));
  };
  const handleSelectChange = (data) => {
    setSelected(data);
    setValue(
      "user_ids",
      data &&
        data.map((item) => {
          return parseInt(item.value);
        })
    );
  };
  const onSubmit = (formValue, e) => {
    setBookspace({
      city_id: parseInt(formValue.city_id) || 0,
      location_id: parseInt(formValue.location_id) || 0,
      building_id: 1,
      floor_id: parseInt(formValue.floor_id) || 0,
      from_date: formValue.from_date || "",
      to_date: formValue.to_date || "",
      workspaces_booked: parseInt(formValue.workspaces_booked) || 0,
      purpose: formValue.purpose || "",
      user_id: user?.id,
      user_ids: formValue.user_ids || [],
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
                    <option>Select City</option>
                    {data.workspace_details.CityList.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Select size="sm" {...register("location_id")}>
                    <option>Select Location</option>
                    {data.workspace_details.LocationList.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Floor</Form.Label>
                  <Form.Select size="sm" {...register("floor_id")}>
                    <option>Select Floor</option>
                    {data.workspace_details.FloorList.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    ))}
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
                    defaultValue={"100"}
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
                    {...register("workspaces_booked")}
                  />
                </Form.Group>
                <span className="text-danger">
                  {errors.workspaces_booked &&
                    errors.workspaces_booked?.message}
                </span>
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Purpose</Form.Label>
                  <Form.Select size="sm" {...register("purpose")}>
                    <option>Select</option>
                    {data.workspace_details.Purpose.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Booking for</Form.Label>
                  <MultiSelect
                    options={data.workspace_details.UserList.map((item) => {
                      return { label: item.name, value: item.id };
                    })}
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
              {loading ? (
                <Spinner
                  animation="border"
                  size="sm"
                  variant="light"
                  className="ms-2"
                />
              ) : (
                ""
              )}
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
