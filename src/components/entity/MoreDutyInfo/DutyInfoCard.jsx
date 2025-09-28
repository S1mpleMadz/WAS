import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Actions from "../../UI/Actions.jsx";
import { useModal } from "../../UI/Modal.jsx";
import Modal from "../../UI/Modal.jsx";
import { Alert, Error } from "../../UI/Notificaitons.jsx";
import useLoad from "../../../api/useLoad.jsx";
import API from "../../../api/API.jsx";
import DeleteConfirmation from "../../UI/DeleteConfirmation.jsx";
import Table from "../../UI/Table.jsx";
import "./DutyInfoCard.scss";
import DutyForm from "../duty/DutyForm.jsx";
import DutyContributionForm from "./DutyContributionForm.jsx";

export default function SpecificDutyInformation() {
  // Initialisation ----------------------------------------------
  const { dutyID } = useParams();
  const navigate = useNavigate();

  // State -------------------------------------------------------
  const [Duty, isUserLoading, loadingMessage, loadRecord] = useLoad(`/duties/${dutyID}`);
  const [linkDutyData, isDutyLoading, dutyLoadingMessage, loadDutyData] = useLoad(`/myduties/duties/${dutyID}`);
  const [showError, errorMessage, openError, closeError] = useModal(false);
  const [showForm, formTitle, openForm, closeForm] = useModal(false);
  const [showAlert, alertMessage, openAlert, closeAlert] = useModal(false);
  const [showContributionForm, contributionFormTitle, openContributionForm, closeContributionForm] = useModal(false);
  const [showDeleteModal, , openDeleteModal, closeDeleteModal] = useModal(false);
  const [selectedContribution, setSelectedContribution] = useState(null);

  // Handlers ----------------------------------------------------
  const handleModify = async (updatedDuty) => {
    const putEndpoint = `/duties/${updatedDuty.DutyID}`;
    const result = await API.put(putEndpoint, updatedDuty);
    if (result.isSuccess) {
      closeForm();
      openAlert("Duty successfully updated");
      await loadRecord();
    } else {
      openError(result.message);
    }
  };

  const handleOpenEditForm = () => {
    openForm(editDutyText);
  };

  const handleDelete = async () => {
    const response = await API.delete(`/duties/${dutyID}`);
    closeDeleteModal();
    if (response.isSuccess) {
      navigate("/duties");
    } else {
      openError(response.message);
    }
  };

  const handleAddContribution = async (contributionData) => {
    const result = await API.post("/myduties", contributionData);
    if (result.isSuccess) {
      closeContributionForm();
      openAlert("Staff duty successfully added");
      await loadDutyData();
    } else {
      openError(result.message);
    }
  };

  const handleModifyContribution = async (updatedContribution) => {
    const putEndpoint = `/myduties/${updatedContribution.MydutyID}`;
    const result = await API.put(putEndpoint, updatedContribution);
    if (result.isSuccess) {
      closeContributionForm();
      openAlert("Staff duty successfully updated");
      await loadDutyData();
    } else {
      openError(result.message);
    }
  };

  const handleSelect = (index) => {
    setSelectedContribution(linkDutyData[index]);
  };

  const handleUnselect = () => {
    setSelectedContribution(null);
  };

  const handleOpenAddForm = () => {
    setSelectedContribution(null);
    openContributionForm(addLinkDutyText);
  };
  const OpenSelectedUser = () => {
    if (selectedContribution == null) {
      openError("No Record Selected");
    } else {
      openContributionForm(editLinkDutyText);
    }
  };

  // View --------------------------------------------------------

  if (!Duty || Duty.length === 0) {
    return (
      <div className="userInfo">
        <p>Duty not found.</p>
      </div>
    );
  }

  const dutyData = Duty[0];
  const editDutyText = "Edit Duty";
  const deleteDutyText = "Delete Duty";

  const addLinkDutyText = "Add Staff Duty";
  const editLinkDutyText = "Edit Staff Duty";
  const deleteLinkDutyText = "Delete Staff Duty";

  // data for the Duty staff table
  const dutyColumns = [
    { header: "Staff Member", key: "MydutyUserName" },
    { header: "Duty Name", key: "MydutyName" },
  ];
  return (
    <>
      <Error show={showError} message={errorMessage} onDismiss={closeError} />
      <Alert show={showAlert} message={alertMessage} onDismiss={closeAlert} />

      <Modal show={showForm} title={formTitle}>
        <DutyForm initialDuty={dutyData} onCancel={closeForm} onSubmit={handleModify} />
      </Modal>

      <Modal show={showContributionForm} title={contributionFormTitle}>
        <DutyContributionForm
          dutyId={parseInt(dutyID)}
          initialContribution={selectedContribution}
          onSubmit={selectedContribution ? handleModifyContribution : handleAddContribution}
          onCancel={closeContributionForm}
        />
      </Modal>

      <DeleteConfirmation
        show={showDeleteModal}
        itemType="duty"
        itemName={dutyData.DutyName}
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
      />

      <div className="userInfo">
        <div className="userInfoDetails">
          <p>
            <strong>Name:</strong> {dutyData.DutyName}
          </p>
          <p>
            <strong>Duty Effort:</strong> {dutyData.DutyEffort}
          </p>
          <p>
            <strong>Duty Instances:</strong> {dutyData.DutyInstances}
          </p>
        </div>
      </div>

      <Actions.Tray>
        <Actions.Modify showText buttonText={editDutyText} onClick={handleOpenEditForm} />
        <Actions.Delete showText buttonText={deleteDutyText} onClick={openDeleteModal} />
      </Actions.Tray>

      <div className="teachingInfo">
        <h3 className="table-title">Staff contributing to this Duty:</h3>

        {isDutyLoading ? (
          <p>Loading Duty data: {dutyLoadingMessage}</p>
        ) : (
          <Table
            columns={dutyColumns}
            data={linkDutyData}
            OnRowClick={handleSelect}
            emptyMessage="No staff assigned to this Duty."
            OnUnSelect={handleUnselect}
          />
        )}
      </div>

      <Actions.Tray>
        <Actions.Add showText buttonText={addLinkDutyText} onClick={handleOpenAddForm} />
        <Actions.Modify showText buttonText={editLinkDutyText} onClick={OpenSelectedUser} />
        <Actions.Delete showText buttonText={deleteLinkDutyText} onClick={null} />
      </Actions.Tray>
    </>
  );
}
