import { useState, useEffect, createContext, useContext } from "react";
import LoggedInUser from "../entity/home/homePage";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialisation ----------------------------------------------
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Handlers ----------------------------------------------------
  const login = (user) => {
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    setLoggedInUser(user);
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  // View --------------------------------------------------------
  return <AuthContext.Provider value={{ loggedInUser, login, logout }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
