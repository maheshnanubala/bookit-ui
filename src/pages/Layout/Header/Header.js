import { useNavigate } from "react-router-dom";
import indiumLogo from "../../../assest/images/logo.png";
import "./header.scss";
import { Dropdown } from "react-bootstrap";

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
          onClick={() => navigate('/')}
          alt=""
        />
        <div className="header-newbooking-btn col-md-7" >
          <Dropdown className="dropdown-button">
            <Dropdown.Toggle>
              New Booking
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/cabin-booking">Cabin Room</Dropdown.Item>
              <Dropdown.Item href="/conference-booking">Conference Room</Dropdown.Item>
              <Dropdown.Item href="/workspace-booking" disabled>Workspace</Dropdown.Item>
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
