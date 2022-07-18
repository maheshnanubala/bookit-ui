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
import { ApiUtility } from "../../ApiUtility";

const BookSpaceForm = () => {
  const [show, setShow] = useState(false);

  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => ({
    ...state.auth.user,
  }));

  const [floorId, setFloorId] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [availableWorkSpace, setAvailableWorkSpace] = useState(0);

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
    building_id: 0,
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
  const handleSave = async () => {
    setShow(false);
    await ApiUtility.bookWorkSpace(bookSpace, navigate, toast)
    // dispatch(bookworkspace({ bookSpace, navigate, toast }));
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
  const onSubmit = (formValue) => {
    if (availableWorkSpace === 0){
      toast.error('Workspace is not available for the selected date');
    } else if (formValue.workspaces_booked === '' || parseInt(formValue.workspaces_booked) === 0){
      toast.error('Workspace required should not be empty or 0');
    } else if (parseInt(formValue.workspaces_booked) > availableWorkSpace){
      toast.error('Workspace required should not be more than workspace available');
    } else if (formValue.user_ids === undefined || formValue.user_ids?.length === 0){
      toast.error('Users should be selected');
    }else if (formValue.user_ids === undefined || formValue.user_ids?.length === 0){
      toast.error('Users should be selected');
    } else{
      setBookspace({
        city_id: parseInt(formValue.city_id) || 0,
        location_id: parseInt(formValue.location_id) || 0,
        building_id: parseInt(formValue.building_id) || 0,
        floor_id: parseInt(formValue.floor_id) || 0,
        from_date: formValue.from_date || "",
        to_date: formValue.from_date || "",
        workspaces_booked: parseInt(formValue.workspaces_booked) || 0,
        purpose: formValue.purpose || "",
        user_id: user?.id,
        user_ids: formValue.user_ids || [],
      });
      setShow(true);
    }
  };

  const [workspaceDetails, setWorkspaceDetails] = useState([]);

  useEffect(() => {
    getWorkspaceDeatils();
  }, []);

  const [locationListDetails, setLocationListDetails] = useState()
  const [floorListDetails, setFloorListDetails] = useState()

  const getWorkspaceDeatils = async () => {
    const response = await ApiUtility.getWorkSpaceDetails();
    setWorkspaceDetails(response);
    setLocationListDetails((workspaceDetails?.workspace_details?.LocationList || []))
    setFloorListDetails((workspaceDetails?.workspace_details?.FloorList || []))
  };

  const loadLocation = (locationId) => {
    let locations = workspaceDetails?.workspace_details?.LocationList;
    let locationsArr = locations.filter(obj =>  obj.id === locationId );
    setLocationListDetails(locationsArr)
  }
  const [bookingDataClass, setBookingDataClass] = useState(false)
  const checkSpaceAvailability = async () => {
    if (floorId === undefined || floorId === '' || floorId === 'Select Floor'){
      toast.error('Please select Floor')
    } else if (fromDate === undefined || fromDate === '') {
      toast.error('Plese select booking date')
    // } else if (toDate === undefined || toDate === '') {
    //   alert('Plese select To date')
    } else{
      let response = await ApiUtility.getSpaceAvailability(parseInt(floorId), fromDate, fromDate);
      setAvailableWorkSpace(response)
      if(response === 0) {
        toast.error('Workspace is not available for the selected date')
      }else{
        setBookingDataClass(true)
      }
    }
  }

  return (
    <Container className="vh-100">
      <Row>
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  {/* onChange={(e) => { loadLocation(e.target.value) }} */}
                  <Form.Select size="sm" {...register("city_id")} >
                    <option value=''>Select City</option>
                    {workspaceDetails?.workspace_details?.CityList?.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>
                  <span className="text-danger">
                    {errors.city_id && errors.city_id?.message}
                  </span>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Select size="sm" {...register("location_id")}>
                    <option value=''>Select Location</option>
                    {
                      workspaceDetails?.workspace_details?.LocationList?.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      ))
                    }
                  </Form.Select>
                  <span className="text-danger">
                    {errors.location_id && errors.location_id?.message}
                  </span>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Building</Form.Label>
                  <Form.Select size="sm" {...register("building_id")} >
                    <option value=''>Select Building</option>
                    {workspaceDetails?.workspace_details?.BuildingList?.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>
                  <span className="text-danger">
                    {errors.building_id && errors.building_id?.message}
                  </span>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Floor</Form.Label>
                  <Form.Select size="sm" {...register("floor_id")} onChange={e => setFloorId(e.target.value)} >
                    <option value=''>Select Floor</option>
                    {workspaceDetails?.workspace_details?.FloorList?.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>
                  {/* <span className="text-danger">
                    {errors.floor_id && errors.floor_id?.message}
                  </span> */}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Booking Date</Form.Label>
                  <Form.Control
                    size="sm"
                    type="date"
                    {...register("from_date")}
                    onChange={e => setFromDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
              {/* <Col>
                <Form.Group className="mb-3" controlId="toDate">
                  <Form.Label>Date (To)</Form.Label>
                  <Form.Control
                    size="sm"
                    type="date"
                    {...register("to_date")}
                    onChange={e => setToDate(e.target.value)}
                  />
                </Form.Group>
              </Col> */}
              <Col>
                <Button
                  variant="primary"
                  size="sm"
                  style={{ marginTop: '30px' }}
                  onClick={checkSpaceAvailability}
                >Check workspace availability</Button>
              </Col>
              <Col></Col>
            </Row>
            <div className={bookingDataClass ? 'booking-data-form d-block' : 'booking-data-form d-none'}>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Workspace Available</Form.Label>
                    <Form.Control
                      size="sm"
                      type="number"
                      disabled
                      value={availableWorkSpace}
                      {...register("workspace_available")}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Workspace Required</Form.Label>
                    <Form.Control
                      size="sm"
                      type="number"
                      {...register("workspaces_booked")}
                    />
                    {/* <span className="text-danger">
                      {errors.workspaces_booked && errors.workspaces_booked?.message}
                    </span> */}
                  </Form.Group>
                </Col>
                <Col></Col>
              </Row>
              <Row>
                <Col lg={8}>
                  <Form.Group className="mb-3">
                    <Form.Label>Purpose</Form.Label>
                    <Form.Select size="sm" {...register("purpose")}>
                      <option value=''>Select</option>
                      {workspaceDetails?.workspace_details?.Purpose?.map((item) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      )) || []}
                    </Form.Select>
                    <span className="text-danger">
                      {errors.purpose && errors.purpose?.message}
                    </span>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg={8}>
                  <Form.Group className="mb-3">
                    <Form.Label>Booking for</Form.Label>
                    <MultiSelect
                      options={workspaceDetails?.workspace_details?.UserList?.map((item) => {
                        return { label: item.name, value: item.id };
                      }) || []}
                      value={selected}
                      onChange={handleSelectChange}
                      hasSelectAll={false}
                      labelledBy="test"
                    />
                    {/* <span className="text-danger">
                      {errors.user_ids && errors.user_ids?.message}
                    </span> */}
                  </Form.Group>
                </Col>
              </Row>
              <div className="text-center">
                <Button
                  className="mb-5"
                  style={{ float: "center" }}
                  variant="primary"
                  type="submit"
                  size="lg"
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
              </div>
            </div>
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
