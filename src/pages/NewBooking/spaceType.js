import Form from 'react-bootstrap/Form';
import './newBooking.scss'
import { Row, Col} from 'react-bootstrap'
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function SpaceType() {
  const showTooltip = (props) => {
    return <Tooltip {...props} className='tooltip-text'>Work Space under construction</Tooltip>
  }
  return (
    <Form>
      {['radio'].map((type) => (
        <div key={`ConferenceRoom-${type}`} className="mb-3">
            <Row>
            <Col className='spacetype-radio'>
                <Form.Check 
                inline
                type={type}
                id={`ConferenceRoom`}
                label={`Conference Room`}
                defaultChecked
                />
            </Col>
            <OverlayTrigger placement="left" overlay={showTooltip}>
              <Col className='spacetype-radio'> <Form.Check
                inline
                disabled
                type={type}
                label={`Work Space`}
                id={`Work Space`}/>
              </Col>
            </OverlayTrigger>
            </Row>        
        </div>
      ))}
    </Form>
  );
}

export default SpaceType;