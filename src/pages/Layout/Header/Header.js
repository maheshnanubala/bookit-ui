import { useNavigate } from "react-router-dom";
import "./header.scss";
import indiumLogo from "../../../assest/images/logo.png";

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
          <button
            className="booking-icon"
            onClick={() => navigate("/new-booking")}
          >
            New Booking
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
