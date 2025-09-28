import Actions from "../../UI/Actions.jsx";
import { useModal } from "../../UI/Modal.jsx";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../../UI/Modal.jsx";
import useLoad from "../../../api/useLoad";
import ModuleForm from "../module/ModuleForm.jsx";
import ModuleContributionForm from "./ModuleContributionForm.jsx";
import API from "../../../api/API.jsx";
import { calculateModuleEffort } from "./effortCalculations.jsx";
import { Alert, Error } from "../../UI/Notificaitons.jsx";
import DeleteConfirmation from "../../UI/DeleteConfirmation.jsx";
import Table from "../../UI/Table.jsx";

import "./ModuleInfoCard.scss";
import { useState, useEffect } from "react";

export default function SpecificModuleInformation() {
  // Initialisation ----------------------------------------------
  const { moduleId } = useParams();
  const navigate = useNavigate();

  // State -------------------------------------------------------
  const [module, isUserLoading, loadingMessage, loadRecord] = useLoad(`/Modules/${moduleId}`);
  const [teachingData, isTeachingLoading, teachingLoadingMessage, loadTeachingData] = useLoad(
    `/teaching/modules/${moduleId}`
  );
  const [showForm, formTitle, openForm, closeForm] = useModal(false);
  const [showContributionForm, contributionFormTitle, openContributionForm, closeContributionForm] = useModal(false);
  const [showDeleteModal, , openDeleteModal, closeDeleteModal] = useModal(false);
  const [showAlert, alertMessage, openAlert, closeAlert] = useModal(false);
  const [showError, errorMessage, openError, closeError] = useModal(false);
  const [totalModuleHours, setTotalModuleHours] = useState(0);
  const [isCalculatingHours, setIsCalculatingHours] = useState(false);

  useEffect(() => {
    if (module && module.length > 0) {
      const calculateHours = async () => {
        setIsCalculatingHours(true);
        const hours = await calculateModuleEffort(module[0]);
        setTotalModuleHours(hours);
        setIsCalculatingHours(false);
      };
      calculateHours();
    }
  }, [module]);

  // Handlers ----------------------------------------------------
  const handleModify = async (updatedModule) => {
    const putEndpoint = `/modules/${updatedModule.ModuleID}`;
    const result = await API.put(putEndpoint, updatedModule);
    if (result.isSuccess) {
      closeForm();
      openAlert("Module successfully updated");
      window.location.reload();
      await loadRecord();
    } else {
      openError(result.message);
    }
  };

  const handleDelete = async () => {
    const response = await API.delete(`/modules/${moduleId}`);
    closeDeleteModal();
    if (response.isSuccess) {
      navigate("/modules");
    } else {
      openError(response.message);
    }
  };

  const handleAddContribution = async (contributionData) => {
    const result = await API.post("/teaching", contributionData);
    if (result.isSuccess) {
      closeContributionForm();
      openAlert("Contribution successfully added");
      await loadTeachingData();
    } else {
      openError(result.message);
    }
  };

  const handleModifyContribution = async (updatedContribution) => {
    const putEndpoint = `/teaching/${updatedContribution.TeachingID}`;
    const result = await API.put(putEndpoint, updatedContribution);
    if (result.isSuccess) {
      closeForm();
      openAlert("Contribution  successfully updated");
      window.location.reload();
      await loadRecord();
    } else {
      openError(result.message);
    }
  };
  const [selectedContribution, setSelectedModule] = useState();

  const OpenSelectedModule = () => {
    if (selectedContribution == null) {
      openError("No Record Selected");
    } else {
      openContributionForm(editContributionText);
    }
  };

  const Select = (x) => {
    console.log("We Clicked a row id " + teachingData[x].TeachingID);
    setSelectedModule(teachingData[x]);
    console.log(selectedContribution);
  };
  const UnSelect = () => {
    setSelectedModule(null);
    console.log("We are unselecting from the module info card");
  };

  // View --------------------------------------------------------

  if (isUserLoading) {
    return (
      <div className="moduleInfo">
        <p>{loadingMessage}</p>
      </div>
    );
  }

  if (!module || module.length === 0) {
    return (
      <div className="moduleInfo">
        <p>Module not found.</p>
      </div>
    );
  }

  const ModuleData = module[0];
  const editUserText = "Edit Module";
  const deleteModuleText = "Delete Module";
  const editContributionText = "Add Contribution";

  // data for the teaching staff table
  const teachingColumns = [
    { header: "Staff Member", key: "TeachingUserName" },
    { header: "Leading", key: "TeachingLeading", className: "center", render: (row) => `${row.TeachingLeading}%` },
    {
      header: "Lecturing",
      key: "TeachingLecturing",
      className: "center",
      render: (row) => `${row.TeachingLecturing}%`,
    },
    {
      header: "Workshops",
      key: "TeachingWorkshops",
      className: "center",
      render: (row) => `${row.TeachingWorkshops}%`,
    },
    {
      header: "Assessing",
      key: "TeachingAssessing",
      className: "center",
      render: (row) => `${row.TeachingAssessing}%`,
    },
    {
      header: "Moderation",
      key: "TeachingModeration",
      className: "center",
      render: (row) => `${row.TeachingModeration == 0 ? "No" : "Yes"}`,
    },
  ];

  return (
    <>
      <Modal show={showForm} title={formTitle}>
        <ModuleForm initialModule={ModuleData} onCancel={closeForm} onSubmit={handleModify} />
      </Modal>

      <Modal show={showContributionForm} title={contributionFormTitle}>
        <ModuleContributionForm
          moduleId={parseInt(moduleId)}
          onCancel={closeContributionForm}
          onSubmit={selectedContribution == null ? handleAddContribution : handleModifyContribution}
          initialContribution={selectedContribution}
        />
      </Modal>

      <Alert show={showAlert} message={alertMessage} onDismiss={closeAlert} />
      <Error show={showError} message={errorMessage} onDismiss={closeError} />

      <DeleteConfirmation
        show={showDeleteModal}
        itemType="module"
        itemName={`${ModuleData.ModuleCode} - ${ModuleData.ModuleName}`}
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
      />

      <div className="moduleInfo">
        <img src={ModuleData.ModuleImageURL} />
        <div className="userInfoDetails">
          <p>
            <strong>Module Code:</strong>
            {ModuleData.ModuleCode}
          </p>

          <p>
            <strong>Module Name:</strong>
            {ModuleData.ModuleName}
          </p>

          <p>
            <strong>Module Total Hours:</strong>
            {isCalculatingHours ? "Calculating..." : `${totalModuleHours} hours`}
          </p>

          <p>
            <strong>Module Leader:</strong>
            {ModuleData.ModuleLeaderName}
          </p>

          <p>
            <strong>Module Credits:</strong>
            {ModuleData.ModuleCredits}
          </p>

          <p>
            <strong>Module Level:</strong>
            {ModuleData.ModuleLevel}
          </p>
        </div>
      </div>

      <Actions.Tray>
        <Actions.Modify showText buttonText={editUserText} onClick={() => openForm(editUserText)} />
        <Actions.Delete showText buttonText={deleteModuleText} onClick={openDeleteModal} />
      </Actions.Tray>

      <div className="teachingInfo">
        <h3 className="table-title">Staff contributing to this Module:</h3>

        {isTeachingLoading ? (
          <p>Loading teaching data: {teachingLoadingMessage}</p>
        ) : (
          <Table
            columns={teachingColumns}
            data={teachingData}
            emptyMessage="No teaching staff assigned to this module."
            OnRowClick={Select}
            OnUnSelect={UnSelect}
          />
        )}
      </div>
      <Actions.Tray>
        <Actions.Add
          showText
          buttonText={editContributionText}
          onClick={() => openContributionForm(editContributionText)}
        />
        <Actions.Modify showText buttonText={"Edit the Contribution"} onClick={() => OpenSelectedModule()} />
        <Actions.Delete showText buttonText={"Delete the Contribution"} onClick={null} />
      </Actions.Tray>
    </>
  );
}
