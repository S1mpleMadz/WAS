import { useParams, useNavigate } from "react-router-dom";
import Actions from "../../UI/Actions.jsx";
import { useModal, Modal } from "../../UI/Modal.jsx";
import { Alert, Error } from "../../UI/Notificaitons.jsx";
import useLoad from "../../../api/useLoad.jsx";
import API from "../../../api/API.jsx";
import DeleteConfirmation from "../../UI/DeleteConfirmation.jsx";
import UserForm from "../user/UserForm.jsx";
import "./UserInfoCard.scss";
import Table from "../../UI/Table.jsx";
import API_URL from "../../../api/apiURL.jsx";

export default function SpecificUserInformation() {
  // Initialisation ----------------------------------------------
  const { userId } = useParams();
  const navigate = useNavigate();

  const teachingEndpoint = `/teaching/users/${userId}`;
  const teachingDutyEndpoint = `/myduties/users/${userId}`;

  // State -------------------------------------------------------
  const [user, isUserLoading, loadingMessage, loadRecord] = useLoad(`/Users/${userId}`);
  const [showForm, formTitle, openForm, closeForm] = useModal(false);
  const [showDeleteModal, , openDeleteModal, closeDeleteModal] = useModal(false);
  const [showAlert, alertMessage, openAlert, closeAlert] = useModal(false);
  const [showError, errorMessage, openError, closeError] = useModal(false);

  const [teaching, isTeachingLoading, teachingLoadingMessage, loadTeaching] = useLoad(teachingEndpoint);
  const [teachingDuty, isTeachingDutyLoading, teachingDutyLoadingMessge, loadTeachingDuty] =
    useLoad(teachingDutyEndpoint);

  const teachingColumns = [
    { header: "Module Name", key: "TeachingModuleName" },
    {
      header: "Lecturing Hours",
      key: "TeachingLecturing",
      className: "center",
      render: (row) => `${row.TeachingLeading}%`,
    },
    {
      header: "Workshop Hours",
      key: "TeachingWorkshops",
      className: "center",
      render: (row) => `${row.TeachingLecturing}%`,
    },
    {
      header: "Assessment Hours",
      key: "TeachingAssessing",
      className: "center",
      render: (row) => `${row.TeachingAssessing}%`,
    },
    {
      header: "Moderation Hours",
      key: "TeachingModeration",
      className: "center",
      render: (row) => `${row.TeachingModeration}%`,
    },
  ];

  const teachingDutyColumns = [{ header: "Duty Name", key: "MydutyDutyName" }];

  // Handlers ----------------------------------------------------
  const handleModify = async (updatedUser) => {
    const result = await API.put(`/Users/${updatedUser.UserID}`, updatedUser);
    if (result.isSuccess) {
      closeForm();
      openAlert("User successfully updated");
      window.location.reload();
      await loadUser();
    } else {
      openError(result.message);
    }
  };

  const handleDelete = async () => {
    const response = await API.delete(`/users/${userId}`);
    closeDeleteModal();
    if (response.isSuccess) {
      navigate("/staff");
    } else {
      openError(response.message);
    }
  };
  // View --------------------------------------------------------

  if (isUserLoading) {
    return (
      <div className="userInfo">
        <p>{loadingMessage}</p>
      </div>
    );
  }

  if (!user || user.length === 0) {
    return (
      <div className="userInfo">
        <p>User not found.</p>
      </div>
    );
  }

  const userData = user[0];
  const editUserText = "Edit User";
  const deleteUserText = "Delete User";

  console.log(userData);
  console.log(teaching[0]);

  return (
    <>
      <Modal show={showForm} title={formTitle}>
        <UserForm initialUser={userData} onCancel={closeForm} onSubmit={handleModify} />
      </Modal>

      <Alert show={showAlert} message={alertMessage} onDismiss={closeAlert} />
      <Error show={showError} message={errorMessage} onDismiss={closeError} />

      <DeleteConfirmation
        show={showDeleteModal}
        itemType="user"
        itemName={`${userData.UserFirstname} ${userData.UserLastname}`}
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
      />

      <div className="userInfo">
        <img src={userData.UserImageURL} />
        <div className="userInfoDetails">
          <p>
            <strong>Title:</strong>
            {userData.UserTitle}
          </p>
          <p>
            <strong>First Name:</strong>
            {userData.UserFirstname}
          </p>
          <p>
            <strong>Last Name:</strong>
            {userData.UserLastname}
          </p>
          <p>
            <strong>Email:</strong>
            {userData.UserEmail}
          </p>
          <p>
            <strong>Type:</strong>
            {userData.UserUsertypeName}
          </p>
          <p>
            <strong>Position:</strong>
            {userData.UserPositionName}
          </p>
        </div>
      </div>
      <Actions.Tray>
        <Actions.Modify showText buttonText={editUserText} onClick={() => openForm(editUserText)} />
        <Actions.Delete showText buttonText={deleteUserText} onClick={openDeleteModal} />
      </Actions.Tray>

      <div className="teachingInfo">
        <h3 className="table-title">Modules this Staff member teaches:</h3>

        {isTeachingLoading ? (
          <p>Loading teaching data: {teachingLoadingMessage}</p>
        ) : (
          <Table columns={teachingColumns} data={teaching} emptyMessage="No teaching staff assigned to this module." />
        )}
      </div>

      <div className="teachingInfo">
        <h3 className="table-title">Duties that have been assigned to this Staff member</h3>

        {isTeachingLoading ? (
          <p>Loading teaching data: {teachingLoadingMessage}</p>
        ) : (
          <Table
            columns={teachingDutyColumns}
            data={teachingDuty}
            emptyMessage="No Duties have been assigned to this user."
          />
        )}
      </div>
    </>
  );
}
