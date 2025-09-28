import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/useAuth.jsx";
import "./NavBar.scss";

function Navbar() {
  const { loggedInUser } = useAuth();

  return (
    <nav>
      {loggedInUser && (
        <>
          <div className="navItem">
            <NavLink to="/home">Home</NavLink>
          </div>
          <div className="navItem">
            <NavLink to="/modules">Modules</NavLink>
          </div>

          <div className="navItem">
            <NavLink to="/staff">Staff</NavLink>
          </div>

          <div className="navItem">
            <NavLink to="/duties">Duty</NavLink>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
