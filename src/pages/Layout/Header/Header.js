import { useNavigate } from "react-router-dom";
import indiumLogo from "../../../assest/images/logo.png";
import "./header.scss";
import Dropdown from "react-bootstrap/Dropdown";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate(`/`);
    localStorage.clear("user");
    window.location.reload();
  };
  return (
    <div className="Home">
      <nav className="navbar">
        <img
          className="logo"
          src={indiumLogo}
          onClick={() => navigate("/")}
          alt=""
        />
        <div className="header-conferenceRoombooking-btn col-md-7">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className="find-button">
              New Booking
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/cabin-booking">Cabin Booking</Dropdown.Item>
              <Dropdown.Item href="/conferenceRoom-booking">
                Conference Room
              </Dropdown.Item>
              <Dropdown.Item disabled={true} href="">
                Work space
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right" />
          <b id="icon_text">Logout</b>
        </button>
      </nav>
    </div>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
