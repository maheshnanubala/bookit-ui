/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Label from "react-bootstrap/FormLabel";
import "react-multiple-select-dropdown-lite/dist/index.css";
import "./cabinBooking.scss";
import { addDays } from "date-fns";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import Accordion from "react-bootstrap/Accordion";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CabinPreview } from "./CabinPreview";

const CabinFillDetails = () => {
  const [building, setbuilding] = useState();
  const [floor, setfloor] = useState();

   //const handleShow = () => setShow(true);
   const [checked, setChecked] = useState(false);


  //const [enable, setEnable] = useState(true);

  const handlebuilding = (e) => {
    setbuilding(e.target.value);
  };
  const handlefloor = (e) => {
    setfloor(e.target.value);
  };
 

  const {
    register,
    handleSubmit,
    watch,
    //formState: { errors },
  } = useForm();

  //handle submit
  // const onSubmit = (e) => { console.log(e.target); setTimeout(() => { swal("hi").then((value) => { swal(`Details\n\nfloor:${floor}\ndate: ${datevalues}\n(cabin1:${day1})\n(cabin2:${day2})\n(cabin3:${day3})`); });setfloor(); setDateValues(); setDay1();setDay2();setDay3()} ,3000);};
  const onSubmit = (data) => swal(JSON.stringify(data));

  const cabin1 = watch("cabin1");
  console.log("cabin1", cabin1);

  const cabin2 = watch("cabin2");
  console.log("cabin2", cabin2);
  const cabin3 = watch("cabin3");
  console.log("cabin3", cabin3);
  //  const cabin4=watch('cabin4')
  //  console.log('cabin4',cabin4);

  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const findCabinBooking = async () => {
    if (!datevalues) {
      toast.error("Please select Date!!  ");
    } else if (!building) {
      toast.error("Please select Building!!");
    } else if (!floor) {
      toast.error("Please select Floor!!");
    } else {
      setShow(true);
    }
  };
  const bookcabin = async () => {
    if (days.isChecked) {
      toast.error("Please select Cabin!!");
    } else {
      navigate(`/home`);
      toast.success("Cabin Booked Successfully");
    }
  };

  // const today = new Date();

  // const tomorrow = new Date();
  // tomorrow.setDate(tomorrow.getDate() + 1);

  const [datevalues, setDateValues] = useState();

  const minDate = new Date();

  const buildings = [
    { id: "Workafella", name: "workafella" },
    { id: "Olymphia Tech Park", name: "olympia tech park" },
    { id: "Ganesh Chambers", name: "Ganesh chambers" },
    { id: "Workafella Collabrative Spaces", name: "workafella collabrative spaces" },
  ];
  const floors = [
    { id: "first floor", name: "first floor" },
    { id: "second floor", name: "second floor" },
    { id: "third floor", name: "third floor" },
    { id: "ground", name: "ground floor" },
  ];

  const accordionData = {
    title: `${datevalues}`,
    content: ``,
  };

  const { title, content } = accordionData;

  const days = [
    { id: "morning", name: "morning" },
    { id: "afternoon", name: "afternoon" },
  ];

     const [day1, setDay1] = useState();
  // const [day2, setDay2] = useState();
  // const [day3, setDay3] = useState();

  const cBuilding=`${building}` ;
  const cDate = `${datevalues}`;
  const cFloor=`${floor}`;
  const cSession=`${cabin1}`;
       

  // const [day4, setDay4] = useState();

  //  const[users,setUsers]=useState([])

  //   useEffect(() => {
  //     setUsers(days);
  //   }, []);

  const handleChange = (e) => {
    setDay1(e.target.value);
   };
  // const handleDay = (e) => {
  //   setDay2(e.target.value);
  // };
  // const handleCabin = (e) => {
  //   setDay3(e.target.value);
  // };
  // const handleCabins=(e)=>{
  //   setDay4(e.target.value)
  // }

  // const handleChange =(e)=>{
  //   const { name, checked } = e.target;
  //   if (name === "allSelect") {
  //     let tempUser = users.map((user) => {
  //       return { ...user, isChecked: checked };
  //     });
  //     setUsers(tempUser);
  //   } else {
  //     let tempUser = users.map((user) =>
  //       user.name === name ? { ...user, isChecked: checked } : user
  //     );
  //     setUsers(tempUser);
  //   }

  // };

  // const formSubmit = (e) => { console.log(e.target); e.preventDefault(); setTimeout(() => { swal("Successfully Registered").then((value) => { swal(`Details\n\nfloor:${floor}\ndate: ${datevalues}\n(cabin1:${day1})\n(cabin2:${day2})\n(cabin3:${day3})`); });setfloor(); setDateValues(); setDay1();setDay2();setDay3()} ,3000);};

  // const Accept=(e)=>{
  //   setTimeout(()=>{
  //   },3000)
  // }


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
                    format="MMM-DD-YYYY"
                    minDate={minDate}
                    maxDate={addDays(minDate, 12)}
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
                // defaultValue={building}
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
                size="sm"
                value={floor}
                onChange={handlefloor}
                // defaultValue={floor}
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
            <Button onClick={findCabinBooking} className="find-button">
              <i className="bi bi-search"></i>&nbsp;Find Cabin {" "}
            </Button>
          </Col>
        </Row>
      </Form>
      <br></br>

      {show && (
        <p>
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
                      <span className="box booking-available"></span>
                      <input type="checkbox" checked={false} />&nbsp;
                      <span>  Available</span>
                    </Col>
                    <Col
                      className="d-flex justify-content-center"
                      md={2}
                      style={{ alignItems: "baseline" }}
                    >
                      <div className="box booking-selected-seats"></div>
                      <input type="checkbox" checked={true} />&nbsp;

                      <span>Selected</span>
                    </Col>
                    <Col
                      className="d-flex justify-content-end"
                      md={2}
                      style={{ alignItems: "baseline" }}
                    >
                      <div className="box booking-booked-seats"></div>
                      <input type="checkbox" disabled={true} />&nbsp;

                      <span>Booked</span>
                    </Col>
                    
                  </Row>
                </Row>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* <form onSubmit={formSubmit}> */}
                  <Row className="text-center">
                    <label>floor1</label>
                  </Row>

                  <div>
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th></th>
                          <td className="text-center  py-2 px-2  uppercase font bold text-xl">
                            Morning
                          </td>
                          <td className="text-center py-2 px-2 uppercase font bold text-xl">
                            Afternoon
                          </td>
                          {/* <td className="text-center py-2 px-2 uppercase font-bold text-xl">
                            fullday
                          </td> */}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-left py-4  uppercase font bold text-2xl">
                            cabin1
                          </td>

                          <td className=" text-center ">
                            <input
                              type="checkbox"
                              value="morning"
                            //  className="w-8 h-8"
                              //className="form-check-input"

                              onClick={handleChange}
                              {...register("cabin1", {})}
                             // disabled={cabin1}
                              //  onChange={(e) => setChecked(e.target.checked)}
                              //checked={checked}
                            />
                          </td>
                          <td className=" text-center ">
                            <input
                              type="checkbox"
                              value="afternoon"
                              //className="w-8 h-8"
                             // className="form-check-input"

                              onClick={handleChange}
                              {...register("cabin1", {})}
                              //disabled={cabin1}
                              //onChange={(e) => setChecked(e.target.checked)}

                              //checked={checked}
                            />
                          </td>
                          <td className=" text-center ">
                            {/* <input
                              type="checkbox"
                              value="fullday"
                              className="w-8 h-8"
                             onClick={handleChange}
                               {...register("cabin1", {})}
                              //onChange={(e) => setChecked(e.target.checked)}
                              // checked={checked}
                            /> */}
                          </td>

                          {/* {users.map((user, index) => (
                      <th className="text-center py-2 px-2 uppercase font-bold text-xl">
                        <div key={index}>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name={user.name}

                            checked={user?.isChecked || false}
                            onChange={handleChange}
                            // {...register("cabin1", {
                            //   required: {
                            //      // value:true,
                            //       message:'cabin is required'
                            //   } 
                            //  }
                            //   )}

                          />
                        </div>
                      </th>
                    ))} */}
                          <td className="text-center">
                            {/* <input
                        type="checkbox"
                        className="form-check-input"
                        name="allSelect"
                        checked={
                          !users.some((user) => user?.isChecked !== true)
                        }
                        onChange={handleChange}
                        // {...register("cabin1", {
                        //   required: {
                        //       value:true,
                        //       message:'cabin is required'
                        //   } 
                        //  }
                        //   )}
                      /> */}
                          </td>
                        </tr>

                        <tr>
                          <td className="text-left py-4 uppercase font bold text-2xl">
                            cabin2
                          </td>
                          <td className=" text-center ">
                            <input
                              type="checkbox"
                              value="morning"
                             // className="w-8 h-8"
                             // onClick={handleDay}
                              {...register("cabin2", {})}
                              //checked={cabin2}
                              disabled={true}
                            />
                          </td>
                          <td className=" text-center ">
                            <input
                              type="checkbox"
                              value="afternoon"
                             // className="w-8 h-8"
                             // onClick={handleDay}
                              {...register("cabin2", {})}
                              //checked={cabin2}
                             disabled={true}
                            />
                          </td>
                          <td className=" text-center ">
                            {/* <input
                              type="checkbox"
                              value="fullday"
                             // onClick={handleDay}
                              className="w-8 h-8"
                              {...register("cabin2", {})}
                              //checked={cabin2}
                              disabled={true}
                            /> */}
                          </td>
                          {/* {days.map((user, index) => (
                      <th className="text-center py-2 px-2 uppercase font-bold text-xl">
                        <div key={index}>
                          <input
                            type="checkbox"
                            className="form-check-input"
                           name={user.name}
                            key={index} value={user.id}

                           // value="day"
                            // name={user.name}
                            // checked={user?.isChecked || false}
                            onClick={handleDay}
                            {...register("cabin2", {
                            })}
                            disabled={cabin2}

                          />
                        </div>
                      </th>
                    ))}  */}
                          {/* <td className="text-center">
                                       <input
                        type="checkbox"
                        value="fullday"
                        className="form-check-input"
                        onClick={handleDay}
                        {...register("cabin2", {
                        })}
 
                      />
                       
                    </td>  */}
                        </tr>

                        <tr>
                          {/* <td className="text-left py-4 uppercase font bold text-2xl">
                            cabin3
                          </td> */}
                          {/* <td className=" text-center ">
                            <input
                              type="checkbox"
                              value="morning"
                             // className="w-8 h-8"
                             // onClick={handleCabin}
                              //  checked={cabin3}
                              {...register("cabin3", {})}
                            />
                          </td> */}
                          {/* <td className=" text-center ">
                            <input
                              type="checkbox"
                              value="afternoon"
                             // className="w-8 h-8"
                              //onClick={handleCabin}
                              //  checked={cabin3}
                              {...register("cabin3", {})}
                            />
                        </td>*/}
                          {/* <td className=" text-center ">
                            {/* <input
                              type="checkbox"
                              value="fullday"
                              //onClick={handleCabin}
                              className="w-8 h-8"
                              //checked={cabin3}
                              {...register("cabin3", {})}
                            /> 
                          </td>  */}

                          {/* {days.map((user, index) => (
                      <th className="text-center py-2 px-2 uppercase font-bold text-xl">
                        <div key={index}>
                          <input
                            type="checkbox"
                             className="form-check-input"
                            
                            name={user.name}
                            // checked={user?.isChecked || false}
                            key={index} value={user.id}
                            onClick={handleCabin}
                            {...register("cabin3", {
                            })}
                            disabled={cabin3}

                            
                      
                          />
                        </div>
                      </th>
                    ))}   */}

                          {/* <td className="text-center">
                    <input
                        type="checkbox"
                        value="fullday"
                        className="form-check-input"
                        onClick={handleCabin}
                        {...register("cabin3", {
                        })}
 
                      />

                      </td>  */}
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* <Row className="text-center">
                    <label>Floor2</label>
                  </Row> */}
                   <div>
                    <table className="min-w-full">
                      <thead>
                        {/* <tr>
                          <th></th>
                          <th className="text-center py-2 px-2 uppercase font-bold text-xl">
                            morning
                          </th>
                          <th className="text-center py-2 px-2 uppercase font-bold text-xl">
                            afternoon
                          </th>
                          <th className="text-center py-2 px-2 uppercase font-bold text-xl">
                            fullday
                          </th>
                        </tr> */}
                      </thead>
                      <tbody>
                        {/* <tr>
                          <td className="text-left py-4  uppercase font bold text-2xl">
                            cabin1
                          </td>

                          <td className="text-center">
                            <input
                              type="checkbox"
                              value="morning"
                              className="w-8 h-8"
                              // onClick={handleCabins}
                              // {...register("cabin4", {
                              // })}
                              // disabled={cabin4}
                            />
                          </td>
                          <td className="text-center">
                            <input
                              type="checkbox"
                              value="afternoon"
                              className="w-8 h-8"
                              // onClick={handleCabins}
                              // {...register("cabin4", {
                              // })}
                              // disabled={cabin4}
                            />
                          </td>
                          <td className="text-center">
                            <input
                              type="checkbox"
                              value="fullday"
                              className="w-8 h-8"
                              // onClick={handleCabins}
                              // {...register("cabin4", {
                              // })}
                              // disabled={cabin4}
                            />
                          </td>
                        </tr> */}
                        {/* <tr>
                    <td className="text-left py-4 uppercase font bold text-2xl">
                      cabin2
                    </td>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        value="morning"
                        className="w-8 h-8"
                        onClick={handleDay}
                        {...register("cabin2", {
                        })}
                        disabled={cabin2}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        value="afternoon"
                        className="w-8 h-8"
                        onClick={handleDay}
                        {...register("cabin2", {
                        })}
                        disabled={cabin2}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        value="fullday"
                        className="w-8 h-8"
                        onClick={handleDay}
                        {...register("cabin2", {
                        })}
                        disabled={cabin2}
                      />
                    </td>
                  </tr> */}

                        {/* <tr>
                    <td className="text-left py-4 uppercase font bold text-2xl">
                      cabin3
                    </td>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        value="morning"
                        className="w-8 h-8"
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        value="afternoon"
                        className="w-8 h-8"
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        value="fullday"
                        className="w-8 h-8"
                      />
                    </td>
                  </tr> */}
                      </tbody>
                    </table> 
                   </div>  
                  <br></br>
                  {/* <Row className="text-center">
                    <label>Floor3</label>
                  </Row> */}
                  <br></br>

                  <div className="footer">
                    <p></p>
                    {/* <hr className="hr" /> */}



                    {/* <Button variant="link" 
                  type="submit" 
                  value="Submit">
                      See details
                    </Button> */}
                    < CabinPreview cBuilding={cBuilding}  cDate={cDate} cFloor={cFloor} cSession={cSession}  />
                  
                    <Button
                      variant="secondary"
                      href="/home"
                      className="button2 "
                    >
                      Cancel
                    </Button>
                   

                    <Button
                      className="button3 find-button"
                      onClick={bookcabin}
                    >
                      Book Cabin
                    </Button>
                  </div>
                </form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </p>
      )}
    </div>
  );
};

export default CabinFillDetails;


