import "./AsideBar.scss";
import { NavLink } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const AsideBar = () => {
  return (
    <Container fluid className="sidebar">
      <Row>
        <Col id="sidenav_title">BOOKIT</Col>
      </Row>
      <Row>
        <Col>
          <NavLink className="navlink" to="/home">
            <i className="bi-house-fill sidebaricon" />
            Home
          </NavLink>
          <NavLink className="navlink" to="/bookings">
            <i className=" bi bi-calendar-check-fill sidebaricon " />
            My Bookings
          </NavLink>
          {/* <NavLink className="navlink" to="/new-booking">
            <i className="bi bi-calendar4-week  sidebaricon" /> New Booking
          </NavLink> */}
        </Col>
      </Row>
    </Container>
  );
};
AsideBar.propTypes = {};
AsideBar.defaultProps = {};
export default AsideBar;
