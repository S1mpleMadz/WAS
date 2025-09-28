import Actions from "../../UI/Actions.jsx";
import PropTypes from "prop-types";
import { Alert, Error } from "../../UI/Notificaitons.jsx";
import { CardContainer } from "../../UI/Card.jsx";
import { useState } from "react";
import DutyCard from "./DutyCard.jsx";
import DutyForm from "./DutyForm.jsx";
import Search from "../../UI/Search.jsx";
import useLoad from "../../../api/useLoad.jsx";
import { useModal, Modal } from "../../UI/Modal.jsx";
import "../../UI/Modal.scss";
import API from "../../../api/API.jsx";
import "../../layout/Sidebar.scss";
import "./DutyCruddler.scss";
import Filter from "../../UI/Filter.jsx";
import ClearFilters from "../../UI/ClearFilters.jsx";

export default function DutiesCruddler({ endpoint }) {
  // Initialisation ----------------------------------------------
  // State -------------------------------------------------------
  const [duties, isDutiesLoading, loadingMessage, loadDuties] = useLoad(endpoint);
  const [showForm, formTitle, openForm, closeForm] = useModal(false);
  const [showAlert, alertMessage, openAlert, closeAlert] = useModal(false);
  const [showError, errorMessage, openError, closeError] = useModal(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInstances, setSelectedInstances] = useState([]);
  const [selectedEfforts, setSelectedEfforts] = useState([]);

  // Handlers ----------------------------------------------------
  const handleSubmit = async (duty) => {
    const result = await API.post(endpoint, duty);
    if (result.isSuccess) {
      closeForm();
      openAlert("Duty successfully added");
      await loadDuties();
    } else {
      openError(result.message);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedInstances([]);
    setSelectedEfforts([]);
  };

  // Filter duties based on the search query
  const uniqueInstances = [...new Set(duties.map((duty) => duty.DutyInstances))].filter(Boolean);
  const uniqueEfforts = [...new Set(duties.map((duty) => duty.DutyEffort))].filter(Boolean);

  const filteredDuties = duties.filter((duty) => {
    const matchesSearch = duty.DutyName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesInstance = selectedInstances.length === 0 || selectedInstances.includes(duty.DutyInstances);
    const matchesEffort = selectedEfforts.length === 0 || selectedEfforts.includes(duty.DutyEffort);

    return matchesSearch && matchesInstance && matchesEffort;
  });

  // View --------------------------------------------------------
  const addNewDutyText = "Add new Duty";

  return (
    <>
      <Modal show={showForm} title={formTitle}>
        <DutyForm onCancel={closeForm} onSubmit={handleSubmit} />
      </Modal>

      <Alert show={showAlert} message={alertMessage} onDismiss={closeAlert} />
      <Error show={showError} message={errorMessage} onDismiss={closeError} />
      <div className="panel">
        <Actions.Tray>
          {!showForm && <Actions.Add showText buttonText={addNewDutyText} onClick={() => openForm(addNewDutyText)} />}
        </Actions.Tray>

        <div className="sidebar">
          <aside>
            <div className="searchContainer">
              <h2>Search</h2>
              <Search searchQuery={searchQuery} onSearchChange={setSearchQuery} placeholder="Search by duty name..." />

              <h2>Filter</h2>
              <Filter
                title="Duty Instances"
                options={uniqueInstances}
                selectedOptions={selectedInstances}
                onOptionChange={setSelectedInstances}
              />

              <Filter
                title="Duty Effort"
                options={uniqueEfforts}
                selectedOptions={selectedEfforts}
                onOptionChange={setSelectedEfforts}
              />

              <ClearFilters
                onClear={handleClearFilters}
                hasActiveFilters={searchQuery !== "" || selectedInstances.length > 0 || selectedEfforts.length > 0}
              />
            </div>
          </aside>
          <div className="content">
            {isDutiesLoading ? (
              <p>{loadingMessage}</p>
            ) : filteredDuties.length === 0 ? (
              <p>{searchQuery ? "No duties match your search." : "No records found..."}</p>
            ) : (
              <CardContainer>
                {filteredDuties.map((duty) => (
                  <DutyCard duty={duty} key={duty.DutyID} />
                ))}
              </CardContainer>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

DutiesCruddler.propTypes = {
  endpoint: PropTypes.string.isRequired,
};
