import Header from "./Header.jsx";
import Navbar from "./NavBar.jsx";
import Footer from "./Footer.jsx";
import "./Layout.scss";
import PropTypes from "prop-types";

function Layout(props) {
  // Initialisation ----------------------------------------------
  // State -------------------------------------------------------
  // Handlers ----------------------------------------------------
  // View --------------------------------------------------------
  return (
    <div className="layout">
      <Header />

      <Navbar />

      <main>{props.children}</main>

      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element,
};

export default Layout;
