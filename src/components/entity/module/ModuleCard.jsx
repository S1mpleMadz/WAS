import { useNavigate } from "react-router-dom";
import { Card } from "../../UI/Card.jsx";
import PropTypes from "prop-types";
import "./ModuleCard.scss";

export default function ModuleCard({ module }) {
  const navigate = useNavigate();

  const goToUserInfoPage = () => {
    navigate(`/ModuleInformation/${module.ModuleID}`);
  };

  /*console.log(module.ModuleID); */
  return (
    <div className="moduleCard" onClick={goToUserInfoPage}>
      <Card>
        <div className="module-details">
          {/*<span className="module-code">{module.ModuleCode}</span>*/}
          <span className="module-name">{module.ModuleName}</span>
          {/* <img src={module.ModuleImageURL} /> */}
          <span className="info">Level: {module.ModuleLevel}</span>
          <span className="info">Credits: {module.ModuleCredits}</span>
        </div>
      </Card>
    </div>
  );
}

ModuleCard.propTypes = {
  module: PropTypes.shape({
    ModuleID: PropTypes.string.isRequired,
    ModuleCode: PropTypes.string.isRequired,
    ModuleName: PropTypes.string.isRequired,
    ModuleImageURL: PropTypes.string.isRequired,
  }),
};
