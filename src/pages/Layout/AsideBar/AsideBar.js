import './AsideBar.scss';
import { NavLink } from 'react-router-dom';
import { Container,Row,Col } from 'react-bootstrap';

const AsideBar  = () => {
    return(
       <Container fluid className='sidebar'>  
        <Row>
         <Col  id='sidenav_title'>BOOKIT</Col>
        </Row>
        <Row>
          <Col>
            <NavLink className='navlink' to='/home' ><i class="bi-house-fill sidebaricon"></i>Home</NavLink>   
            <NavLink className='navlink' to='/bookings' ><i class=" bi bi-calendar-check-fill sidebaricon "></i>My Bookings</NavLink>
            <NavLink  className='navlink' to='/new-booking' ><i class="bi bi-calendar4-week  sidebaricon"></i> New Booking</NavLink>
         </Col>     
        </Row>
       </Container>);
   
    
}
AsideBar.propTypes = {};

AsideBar.defaultProps = {};

export default AsideBar;
