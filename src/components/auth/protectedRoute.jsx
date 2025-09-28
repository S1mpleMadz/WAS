import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth.jsx";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const { loggedInUser } = useAuth();

  if (!loggedInUser) {
    return <Navigate to="/" replace />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
