import "chart.js/auto";
import PieChart from "../../UI/PieChart";
import useLoad from "../../../api/useLoad";
import "./homePage.scss";

function LoggedInUser({ user }) {
  const [duties, isDutiesLoading, dutiesLoadingMessage] = useLoad(user ? `/myduties/users/${user.UserID}` : null);
  const [teaching, isTeachingLoading, teachingLoadingMessage] = useLoad(user ? `/teaching/users/${user.UserID}` : null);

  const [allDuties, isAllDutiesLoading] = useLoad("/duties");
  const totalLeading = teaching.reduce((sum, t) => sum + t.TeachingLeading, 0);
  const totalLecturing = teaching.reduce((sum, t) => sum + t.TeachingLecturing, 0);
  const totalWorkshops = teaching.reduce((sum, t) => sum + t.TeachingWorkshops, 0);
  const totalAssessing = teaching.reduce((sum, t) => sum + t.TeachingAssessing, 0);
  const totalModeration = teaching.reduce((sum, t) => sum + t.TeachingModeration, 0);
  const totalHours = totalLeading + totalLecturing + totalWorkshops + totalAssessing + totalModeration;

  if (!user) return <p>Loading user...</p>;
  console.log("User data:", user);

  const getDutyDetails = (mydutyDutyID) => {
    if (!allDuties) return null;
    return allDuties.find((duty) => duty.DutyID === mydutyDutyID);
  };

  return (
    <div className="profile-page">
      <h2 className="welcome">Welcome, {user.UserFirstname}!</h2>
      <div className="profile-container">
        {/* Sidebar with User Details */}
        <div className="user-details">
          <img src={user.UserImageURL} />
          <h3>My details</h3>
          <div className="details">
            <p>
              <strong>First Name:</strong> {user.UserFirstname}
            </p>
            <p>
              <strong>Last Name:</strong> {user.UserLastname}
            </p>
            <p>
              <strong>Email:</strong> {user.UserEmail}
            </p>

            <p>
              <strong>User Type:</strong> {user.UserUsertypeName}
            </p>
            <p>
              <strong>User Position:</strong> {user.UserPositionName}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-data">
          {/* Pie Chart */}
          <div className="chart-container">
            <PieChart userId={user.UserID} />
          </div>

          {/* Workload Summary */}
          {/* Workload Summary */}
          <div className="summary-box">
            <h4>Workload summary:</h4>
            {isTeachingLoading ? (
              <p>{teachingLoadingMessage}</p>
            ) : teaching && teaching.length > 0 ? (
              <>
                <p className="total-hours">
                  <strong>TOTAL EFFORT:</strong> {totalHours}
                </p>
                <p>
                  <strong>Effort Leading:</strong> {totalLeading}
                </p>
                <p>
                  <strong>Effort Lecturing:</strong> {totalLecturing}
                </p>
                <p>
                  <strong>Effort for Workshops:</strong> {totalWorkshops}
                </p>
                <p>
                  <strong>Effort Assessing:</strong> {totalAssessing}
                </p>
                <p>
                  <strong>Modules Moderating:</strong> {totalModeration}
                </p>
              </>
            ) : (
              <p>No teaching assigned.</p>
            )}
          </div>
        </div>
      </div>

      {/* Duties Section */}
      <div className="tasks-section">
        <h3>My Duties</h3>
        {isDutiesLoading || isAllDutiesLoading ? (
          <p>{dutiesLoadingMessage}</p>
        ) : duties && duties.length > 0 ? (
          <>
            {duties.map((duty) => {
              const dutyDetails = getDutyDetails(duty.MydutyDutyID);
              return (
                <div key={duty.MydutyID} className="task-item">
                  <h4>{duty.MydutyDutyName}</h4>
                  <div className="duty-details">
                    {dutyDetails && (
                      <>
                        <span>
                          <strong>Effort:</strong> {dutyDetails.DutyEffort} hours
                        </span>
                        <span>
                          <strong>Instances:</strong> {dutyDetails.DutyInstances}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
            <div className="duties-total">
              <h4>TOTAL:</h4>
              <div className="total-details">
                <span>
                  <strong>Total Effort:</strong>{" "}
                  {duties.reduce((total, duty) => {
                    const dutyDetails = getDutyDetails(duty.MydutyDutyID);
                    return total + (dutyDetails ? dutyDetails.DutyEffort : 0);
                  }, 0)}{" "}
                  hours
                </span>
                <span>
                  <strong>Total Instances:</strong>{" "}
                  {duties.reduce((total, duty) => {
                    const dutyDetails = getDutyDetails(duty.MydutyDutyID);
                    return total + (dutyDetails ? dutyDetails.DutyInstances : 0);
                  }, 0)}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="task-item">No duties assigned</div>
        )}
      </div>
    </div>
  );
}

export default LoggedInUser;
