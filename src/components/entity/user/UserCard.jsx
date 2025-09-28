import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Card } from "../../UI/Card";
import "./UserCard.scss";

export default function UserCard({ user }) {
  const navigate = useNavigate();

  const goToUserInfoPage = () => {
    navigate(`/UserInformation/${user.UserID}`);
  };

  return (
    <div className="userCard" onClick={goToUserInfoPage}>
      <Card>
        <div className="user-details">
          <span className="user-name">{`${user.UserFirstname} ${user.UserLastname}`}</span>
          <span className="info">{user.UserUsertypeName}</span>
          <span className="info">{user.UserPositionName}</span>
        </div>
      </Card>
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    UserID: PropTypes.number.isRequired,
    UserEmail: PropTypes.string.isRequired,
    UserFirstname: PropTypes.string.isRequired,
    UserLastname: PropTypes.string.isRequired,
    UserImageURL: PropTypes.string,
  }),
};
