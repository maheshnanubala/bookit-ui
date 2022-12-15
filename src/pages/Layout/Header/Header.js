import { useNavigate } from "react-router-dom";
import indiumLogo from "../../../assest/images/logo.png";
import "./header.scss";

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
          <button
            className="booking-icon"
            onClick={() => navigate("/new-booking")}
          >
            New Booking
          </button>
        </div>
        <div className="header-cabinbooking-btn col-md-2">
          <button
            className="booking-icon"
            onClick={() => navigate("/cabin-booking")}
          >
            Cabin Booking
          </button>
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
