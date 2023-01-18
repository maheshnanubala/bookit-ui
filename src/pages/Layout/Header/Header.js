import { useNavigate } from "react-router-dom";

import indiumLogo from "../../../assest/images/logo.png";

import Dropdown from "react-bootstrap/Dropdown";

// import ButtonGroup from 'react-bootstrap/ButtonGroup';

// import Button from 'react-bootstrap/Button';

import Button from "react-bootstrap/Button";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import Tooltip from "react-bootstrap/Tooltip";

import "./header.scss";

import { DropdownButton } from "react-bootstrap";

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

        <div className="header-newbooking-btn col-md-7">
          <Dropdown >
            <Dropdown.Toggle  className="find-button"  id="dropdown-basic">New Booking</Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/new-booking">Conference Room</Dropdown.Item>

              <Dropdown.Item href="/cabin-booking">Cabin Room</Dropdown.Item>

              <Dropdown.Item href="#/action-2" disabled={true}>
                workspace
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* <button

            className="booking-icon"

            onClick={() => navigate("/new-booking")}

          > */}

          {/* </button> */}
        </div>

        {/* <div className="header-cabinbooking-btn col-md-2" >

          <button

            className="booking-icon"

            onClick={() => navigate("/cabin-booking")}

          >

            Cabin Booking

          </button>

        </div> */}

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
