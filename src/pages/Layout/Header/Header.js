import { useNavigate } from "react-router-dom";
import "./header.scss";
import { NavLink } from "react-router-dom";
import { setLogout } from "../../../redux/ActionReducer/authSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.clear("user");
  //   navigate(`/`);
  //   window.location.reload();
  // };
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLogout(JSON.parse(localStorage.getItem('user'))));
    navigate(`/`);
    window.location.reload();
  };
  return (
    <div className="Home">
      <nav className="navbar">
        <NavLink to='/home' >
          <img
            className="logo"
            src="https://indiumsoftware.com/wp-content/uploads/2020/01/Indium-software-Logo.png"
            alt=""
          />
        </NavLink>
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
