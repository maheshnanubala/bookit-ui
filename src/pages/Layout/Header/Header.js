import { useNavigate } from "react-router-dom";
import "./header.scss";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear("user");
    navigate(`/`);
    window.location.reload();
  };
  return (
    <div className="Home">
      <nav className="navbar">
        <img
          className="logo"
          src="https://indiumsoftware.com/wp-content/uploads/2020/01/Indium-software-Logo.png"
          alt=""
        />
        <button className="logout-button" onClick={handleLogout}>
          <i class="bi bi-box-arrow-right"></i>
          <b id="icon_text">Logout</b>
        </button>
      </nav>
    </div>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
