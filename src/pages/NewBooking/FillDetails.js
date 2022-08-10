import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Label from 'react-bootstrap/FormLabel'
import InputGroup from 'react-bootstrap/InputGroup'
import {Button, Modal} from 'react-bootstrap';
import DateRangeComp from './DateRange.js';
import {Time} from '../../constants/time';
// import {data} from '../../constants/mockdata';
import {NavLink} from 'react-bootstrap';
import {useEffect, useRef,  useState } from 'react';
import MultiSelect from  'react-multiple-select-dropdown-lite'
import  'react-multiple-select-dropdown-lite/dist/index.css'
import { ApiUtility } from '../../ApiUtility.js';

function FillDetails() {
  const [value, setvalue] = useState('');
  const [display_add_val, setDisplay_add_val] = useState('');
  const [display_edit_val, setDisplay_edit_val] = useState('none');
  const [start_time, setStart_time] = useState('06:00 AM');
  const [end_time, setEnd_time] = useState('11:00 PM');
  const [data, setData] = useState([])
  
  const assignStartTime = (e) => {
    setStart_time(e.target.value);
    console.log("mt test data", e.target.key);
  }
  const assignEndTime = (e) => {
    setEnd_time(e.target.value);
  }

  const [open, setOpen] = useState(false)
  const refOne = useRef(null)
  const [floorData, setFloorData] = useState([])
  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true)
    document.addEventListener("click", hideOnClickOutside, true)
    getWorkSpaceDetails();
    async function getWorkSpaceDetails() {
      let response = await ApiUtility.getWorkSpaceDetails();
      setData(response?.workspace_details)
      setFloorData(response?.workspace_details?.FloorList)
    }
  }, [])

  
   const hideOnEscape = (e) => {
    if( e.key === "Escape" ) {
      setOpen(false)
    }
  }
  const hideOnClickOutside = (e) => {
    if( refOne.current && !refOne.current.contains(e.target) ) {
      setOpen(false)
    }
  }
  const  handleOnchange  =  val  => {
    setvalue(val);
    setDisplay_add_val("none");
    setDisplay_edit_val("inline")
  }
  const[show,popup]=useState(false);
  const modalOpen = () => popup(true);
  const modalClose = () => popup(false);
  const setFloorRecord = (buildingId) => {
    let florListArr = data?.FloorList.filter(val => {
      return val.building_id === Number(buildingId);
    })
    setFloorData(florListArr)
    setbuildingId(buildingId)
  }
  const [buildingId, setbuildingId] = useState(null)
  const [floorId, setFloorId] = useState(null)
  const [purpose, setPurpose] = useState('')
  const [fromDate, setFromDate] = useState('2022-08-10')
  const [toDate, setToDate] = useState('2022-08-10')
  // const [userIds, setUserIds] = useState([])

  const findConference = async () => {
    let response = await ApiUtility.checkAvailableWorkSpace(floorId, fromDate, toDate, start_time, end_time, buildingId, value, purpose)
  }
  return (
    <>    
    <Form>      
      <Row lg={6}>        
        <Col>
          <Label >Date</Label>
        </Col>
        <Col >
          <Form.Group className="mb-3">
            <DateRangeComp></DateRangeComp>  
          </Form.Group>
        </Col>        
        <Col></Col>        
        <Col>
          <Label>Time</Label>
        </Col>
        <Col >
          <Form.Group className="mb-3">
            <InputGroup >
            
              <input 
                value={`${start_time} to ${end_time}` }
                className="inputBox"
                disabled
                id='time-input'
              /> 
              <i className="bi bi-clock time-icon"   onClick={ () => setOpen(open => !open) } ></i>
              
            </InputGroup>
            <div ref={refOne}>
          {open && 
          <>
        <Form.Group className="mb-3 inputBox">
              <Form.Select onChange={assignStartTime}  className='building-selectionbox' size="sm">
              {Time.map((item) => (
                        <option value={item.lable} key={item.key}>
                          {item.label}
                        </option>
                ))}
              </Form.Select>
          </Form.Group> 
            <Form.Group className="mb-3 inputBox">
                <Form.Select onChange={assignEndTime}  className='building-selectionbox' size="sm">
                  {Time.map((item) => (
                            <option value={item.lable} key={item.key}>
                              {item.label}
                            </option>
                    ))}
                </Form.Select>
            </Form.Group> 
            </>
          }
        </div>
          </Form.Group>        
        </Col>
      </Row>
      <Row lg={6} className='mt-4'>
        <Col>
          <Label >Building</Label>
        </Col>
        <Col >
         <Form.Group className="mb-3 inputBox">
            <Form.Select onChange={(e) => { setFloorRecord(e.target.value) }} className='building-selectionbox' size="sm">
              <option value=''>
                Select
              </option>
              {data?.BuildingList?.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>  
        </Col>
        <Col></Col>
        <Col>
          <Label>Floor</Label>
        </Col>
        <Col >
        <Form.Group onChange={(e) => setFloorId(e.target.value) } className="mb-3 inputBox">
          <Form.Select size="sm">
            <option value=''>
              Select
            </option>
            {floorData?.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>  
        </Col>
      </Row>
      <Row className='mt-4' >
        <Col lg="2"> <Label>Purpose</Label></Col>
        <Col>                
        <Form.Group className='mb-3 select-purpose-input'>
            <Form.Select onChange={(e) => setPurpose(e.target.value) }>
              <option value=''>
                Select
              </option>
              {data?.Purpose?.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className='mt-4' >        
        <p className="preview-values">
          <NavLink  style={ {display:display_add_val} } onClick={modalOpen}className='addmem-cust'>
            <p>
              <i class="bi bi-plus-circle">&nbsp;&nbsp;&nbsp;</i>
                <u>Add Members</u>
          </p>
          </NavLink>
          <NavLink  style={ {display:display_edit_val }}  onClick={modalOpen}className='addmem-cust'>
            <p>
              <i class="bi bi-plus-circle">&nbsp;&nbsp;&nbsp;<u>Edit Members</u> </i>
              <small>&nbsp;&nbsp;&nbsp;Selected Members:&nbsp;&nbsp;&nbsp;</small>
            <span id='selected-members'>{value}  </span> 
            </p>
          </NavLink>        
        </p>
       <Modal id='modal-card' show={show} onHide={modalClose} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Body id='modal-card'>
            <Form.Group className="mb-3 ">
              <MultiSelect
                onChange={handleOnchange}
                options={data?.UserList?.map((item) => (
                  { label: item.name, value: item.id }
                )) || []}
                id='modal-card'
                />                
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button  onClick={modalClose}id='modal-save-btn' type="submit">Add</Button>
          </Modal.Footer>
       </Modal>
      </Row>
      <Row className='mt-5'>
        <Col  md={{ span: 5, offset: 5 }}>
         <Button type='submit' onClick={findConference} className='find-button'><i class="bi bi-search"></i>&nbsp;Find Conference Room</Button>
        </Col>        
      </Row>
    </Form>
   
    </>
  );
}

export default FillDetails;