import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Card } from "../../UI/Card";
import "./DutyCard.scss";

export default function DutyCard({ duty }) {
  const navigate = useNavigate();

  const goToDutyInfoPage = () => {
    navigate(`/DutyInformation/${duty.DutyID}`);
  };

  console.log(duty);
  return (
    <div className="dutyCard" onClick={goToDutyInfoPage}>
      <Card>
        {/*  display of duty details */}
        <div className="duty-details">
          <span className="duty-name">{duty.DutyName}</span>
          <span className="info">Effort: {duty.DutyEffort}</span>
          <span className="info">Instances: {duty.DutyInstances}</span>
        </div>
      </Card>
    </div>
  );
}

DutyCard.propTypes = {
  duty: PropTypes.shape({
    DutyID: PropTypes.number.isRequired,
    DutyName: PropTypes.string.isRequired,
    DutyEffort: PropTypes.number.isRequired,
    DutyInstances: PropTypes.number.isRequired,
  }),
};
