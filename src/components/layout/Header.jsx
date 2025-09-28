import "./Header.scss";
import { useAuth } from "../auth/useAuth.jsx";
import Action from "../UI/Actions.jsx";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/WAS_Logo.png";

function Header() {
  // Initialisation ----------------------------------------------
  const { loggedInUser, logout } = useAuth();
  const navigate = useNavigate();
  // State -------------------------------------------------------
  // Handlers ----------------------------------------------------
  const handleLogin = () => navigate("/");
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  // View --------------------------------------------------------
  return (
    <header>
      <div className="headerText">
        <h1>Work Allocation System</h1>
      </div>
      <div className="headerActions">
        {loggedInUser && <p className="welcome">Welcome {loggedInUser.UserFirstname}</p>}
        {!loggedInUser ? (
          <Action onClick={handleLogin} showText buttonText="Login" />
        ) : (
          <Action onClick={handleLogout} showText buttonText="Logout" />
        )}
        <img src={logo} className="logo" alt="WAS Logo" />{" "}
      </div>
    </header>
  );
}

export default Header;
