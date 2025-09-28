import PropTypes from "prop-types";
import "./UserForm.scss";
import useLoad from "../../../api/useLoad";
import { useModal } from "../../UI/Modal";
import Form from "../../UI/Form";
import { Confirm } from "../../UI/Notificaitons";

const defaultUser = {
  UserTitle: "",
  UserFirstname: "",
  UserLastname: "",
  UserEmail: "",
  UserImageURL:
    "https://www.kingston.ac.uk/sites/default/files/styles/1_1_media_sm/public/migrated-images/kingston-university-3e2ab5c0aa6-draishihab.jpg?h=0eda5579&itok=D1_psqrI",
  UserUsertypeID: 0,
  UserPositionID: 0,
};

export function UserForm({ initialUser, onCancel, onSubmit }) {
  // Initialisation ----------------------------------------------

  // Conformance object to handle data conversion between HTML form and JavaScript object.
  const conformance = {
    html2js: {
      UserTitle: (value) => (value === "" ? null : value),
      UserFirstname: (value) => (value === "" ? null : value),
      UserLastname: (value) => (value === "" ? null : value),
      UserEmail: (value) => (value === "" ? null : value),
      UserImageURL: (value) => (value === "" ? null : value),
      UserUsertypeID: (value) => (value === "0" ? null : parseInt(value)),
      UserPositionID: (value) => (value === "0" ? null : parseInt(value)),
    },
    js2html: {
      UserTitle: (value) => (value === null ? "" : value),
      UserFirstname: (value) => (value === null ? "" : value),
      UserLastname: (value) => (value === null ? "" : value),
      UserEmail: (value) => (value === null ? "" : value),
      UserImageURL: (value) => (value === null ? "" : value),
      UserUsertypeID: (value) => (value === null ? "0" : String(value)),
      UserPositionID: (value) => (value === null ? "0" : String(value)),
    },
  };
  const validation = {
    isValid: {
      UserFirstname: (value) => value && value.trim().length > 0,
      UserLastname: (value) => value && value.trim().length > 0,
      UserEmail: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), // basic email regex
      UserImageURL: (value) =>
        value === "" ||
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(
          value
        ),
      UserUsertypeID: (value) => value === null || (typeof value === "number" && value > 0),
      UserPositionID: (value) => value === null || (typeof value === "number" && value > 0),
    },
    errorMessage: {
      UserFirstname: "First name is required",
      UserLastname: "Last name is required",
      UserEmail: "Please enter a valid email address",
      UserImageURL: "Please enter a valid URL or leave blank",
      UserUsertypeID: "Please select a valid user type",
      UserPositionID: "Please select a valid position",
    },
  };

  if (!initialUser) initialUser = defaultUser;

  let confirmText = "Are you sure you want to create this user? ";
  if (initialUser != defaultUser) confirmText = "Are you sure want to make this change?";
  // State -------------------------------------------------------
  const [userTypes, , loadingUserTypesMessage] = useLoad(`/usertypes`);
  const [positions, , loadingPositionsMessage] = useLoad(`/positions`);
  const [showConfirm, confirm, openConfirm, closeConfirm] = useModal(false);
  // Handlers ----------------------------------------------------
  const [user, errors, handleChange, handleSubmit] = Form.useForm(initialUser, conformance, validation, onSubmit);
  // View --------------------------------------------------------
  const confirmSubmit = () => openConfirm(confirmText);
  const titles = ["Mr", "Mrs", "Miss", "Ms", "Dr", "Prof"];
  return (
    <>
      <Confirm show={showConfirm} onConfirm={handleSubmit} message={confirm} onDismiss={closeConfirm} />
      <Form onSubmit={confirmSubmit} onCancel={onCancel}>
        <Form.Item label="Title" error={errors.UserTitle}>
          <select name="UserTitle" value={conformance.js2html.UserTitle(user.UserTitle)} onChange={handleChange}>
            <option value="">None selected</option>
            {titles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </Form.Item>

        <Form.Item label="First Name" error={errors.UserFirstname}>
          <input
            type="text"
            name="UserFirstname"
            value={conformance.js2html.UserFirstname(user.UserFirstname)}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="Last Name" error={errors.UserLastname}>
          <input
            type="text"
            name="UserLastname"
            value={conformance.js2html.UserLastname(user.UserLastname)}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="Email" error={errors.UserEmail}>
          <input
            type="email"
            name="UserEmail"
            value={conformance.js2html.UserEmail(user.UserEmail)}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="User Type">
          {!userTypes ? (
            <p>{loadingUserTypesMessage}</p>
          ) : (
            <select
              name="UserUsertypeID"
              value={conformance.js2html.UserUsertypeID(user.UserUsertypeID)}
              onChange={handleChange}
            >
              <option value="0" disabled>
                None selected
              </option>
              {userTypes.map((type) => (
                <option key={type.UsertypeID} value={type.UsertypeID}>
                  {type.UsertypeName}
                </option>
              ))}
            </select>
          )}
        </Form.Item>

        <Form.Item label="Position">
          {!positions ? (
            <p>{loadingPositionsMessage}</p>
          ) : (
            <select
              name="UserPositionID"
              value={conformance.js2html.UserPositionID(user.UserPositionID)}
              onChange={handleChange}
            >
              <option value="0" disabled>
                None selected
              </option>
              {positions.map((pos) => (
                <option key={pos.PositionID} value={pos.PositionID}>
                  {pos.PositionName}
                </option>
              ))}
            </select>
          )}
        </Form.Item>

        <Form.Item label="Image URL" error={errors.UserImageURL}>
          <input
            type="text"
            name="UserImageURL"
            value={conformance.js2html.UserImageURL(user.UserImageURL)}
            onChange={handleChange}
          />
        </Form.Item>
      </Form>
    </>
  );
}

UserForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default UserForm;
