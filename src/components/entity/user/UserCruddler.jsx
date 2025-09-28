import Actions from "../../UI/Actions.jsx";
import PropTypes from "prop-types";
import { Alert, Error } from "../../UI/Notificaitons.jsx";
import { CardContainer } from "../../UI/Card.jsx";
import { useState } from "react";
import UserCard from "./UserCard.jsx";
import UserForm from "./UserForm.jsx";
import Search from "../../UI/Search.jsx";
import useLoad from "../../../api/useLoad.jsx";
import { useModal, Modal } from "../../UI/Modal.jsx";
import "../../UI/Modal.scss";
import "./UserCruddler.scss";
import API from "../../../api/API.jsx";
import "../../layout/Sidebar.scss";
import Filter from "../../UI/Filter.jsx";
import ClearFilters from "../../UI/ClearFilters.jsx";
import Pagination from "../../UI/Pagination.jsx";

export default function UserCruddler({ endpoint }) {
  // Initialisation ----------------------------------------------
  // State -------------------------------------------------------
  const [users, isUsersLoading, loadingMessage, loadUsers] = useLoad(endpoint);
  const [showForm, formTitle, openForm, closeForm] = useModal(false);
  const [showAlert, alertMessage, openAlert, closeAlert] = useModal(false);
  const [showError, errorMessage, openError, closeError] = useModal(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 12;

  // Handlers ----------------------------------------------------
  const handleSubmit = async (user) => {
    const result = await API.post(endpoint, user);
    if (result.isSuccess) {
      closeForm();
      openAlert("User successfully added");
      window.location.reload();
      await loadUsers();
    } else {
      openError(result.message);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedPositions([]);
    setSelectedTypes([]);
    setCurrentPage(1);
  };

  // Filter users based on the search query
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.UserFirstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.UserLastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.UserEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPosition = selectedPositions.length === 0 || selectedPositions.includes(user.UserPositionName);
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(user.UserUsertypeName);

    return matchesSearch && matchesPosition && matchesType;
  });

  // pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  const uniquePositions = [...new Set(users.map((u) => u.UserPositionName).filter(Boolean))].sort();
  const uniqueTypes = [...new Set(users.map((u) => u.UserUsertypeName).filter(Boolean))].sort();

  // View --------------------------------------------------------
  const addNewUserText = "Add new User";
  return (
    <>
      <Modal show={showForm} title={formTitle}>
        <UserForm onCancel={closeForm} onSubmit={handleSubmit} />
      </Modal>
      <Error show={showError} message={errorMessage} onDismiss={closeError} />
      <Alert show={showAlert} message={alertMessage} onDismiss={closeAlert} />
      <div className="panel">
        <Actions.Tray>
          {!showForm && <Actions.Add showText buttonText={addNewUserText} onClick={() => openForm(addNewUserText)} />}
        </Actions.Tray>

        <div className="sidebar">
          <aside>
            <div className="searchContainer">
              <h2>Search</h2>
              <Search
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                placeholder="Search by name or email..."
              />

              <h2>Filter</h2>
              <Filter
                title="Position"
                options={uniquePositions}
                selectedOptions={selectedPositions}
                onOptionChange={setSelectedPositions}
              />

              <Filter
                title="Type"
                options={uniqueTypes}
                selectedOptions={selectedTypes}
                onOptionChange={setSelectedTypes}
              />
            </div>

            <ClearFilters
              onClear={handleClearFilters}
              hasActiveFilters={searchQuery !== "" || selectedPositions.length > 0 || selectedTypes.length > 0}
            />
          </aside>

          <div className="content">
            {isUsersLoading ? (
              <p>{loadingMessage}</p>
            ) : filteredUsers.length === 0 ? (
              <p>{searchQuery ? "No users match your search." : "No records found..."}</p>
            ) : (
              <>
                <CardContainer>
                  {paginatedUsers.map((user) => (
                    <UserCard user={user} key={user.UserID} />
                  ))}
                </CardContainer>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

UserCruddler.propTypes = {
  endpoint: PropTypes.string.isRequired,
};
