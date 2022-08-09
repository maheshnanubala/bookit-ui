import Form from 'react-bootstrap/Form';
import './newBooking.scss'
import { Row, Col} from 'react-bootstrap'

function SpaceType() {
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
                checked
                />
            </Col>
            
          <Col className='spacetype-radio'> <Form.Check
            inline
            disabled
            type={type}
            label={`Work Space`}
            id={`Work Space`}
          /></Col>
            </Row>        
        </div>
      ))}
    </Form>
  );
}

export default SpaceType;