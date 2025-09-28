import PropTypes from "prop-types";
import { Form } from "../../UI/Form";
import useLoad from "../../../api/useLoad";

// Defines the default structure for a new duty contribution
const defaultContribution = {
  MydutyID: null,
  MydutyUserID: null,
  MydutyDutyID: null,
  MydutyName: "",
  MydutyUserName: null,
  MydutyDutyName: null,
};

export function DutyContributionForm({ initialContribution, dutyId, onSubmit, onCancel }) {
  // Initialisation ----------------------------------------------

  const conformance = {
    html2js: {
      MydutyID: (value) => (value === "" ? null : parseInt(value)),
      MydutyUserID: (value) => (value === "0" ? null : parseInt(value)),
      MydutyDutyID: (value) => (value === "" ? null : parseInt(value)),
      MydutyName: (value) => value,
    },
    js2html: {
      MydutyID: (value) => (value === null ? "" : String(value)),
      MydutyUserID: (value) => (value === null ? "0" : String(value)),
      MydutyDutyID: (value) => (value === null ? "" : String(value)),
      MydutyName: (value) => (value === null ? "" : value),
    },
  };

  const validation = {
    isValid: {
      MydutyUserID: (id) => id !== null && id > 0,
      MydutyName: (name) => name && name.trim() !== "",
    },
    errorMessage: {
      MydutyUserID: "Please select a staff member",
      MydutyName: "Please enter a name for this duty",
    },
  };

  // Merges default values with any initial data and sets the duty ID from props
  const contributionWithDuty = {
    ...defaultContribution,
    ...initialContribution,
    MydutyDutyID: dutyId,
  };

  // State -------------------------------------------------------

  const staffEndpoint = "/users";
  const [staff, isLoadingStaff, loadingStaffMessage] = useLoad(staffEndpoint);

  const [contribution, errors, handleChange, handleSubmit] = Form.useForm(
    contributionWithDuty,
    conformance,
    validation,
    onSubmit
  );

  const confirmText = initialContribution == null ? "Add Contribution" : "Modify Contribution";

  // View --------------------------------------------------------
  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel} submitButtonText={confirmText}>
      <input type="hidden" name="MydutyID" value={conformance.js2html.MydutyID(contribution.MydutyID)} />
      <input
        type="hidden"
        name="MydutyDutyID"
        value={conformance.js2html.MydutyDutyID(contribution.MydutyDutyID)}
      />

      <Form.Item label="Staff Member" error={errors.MydutyUserID}>
        {isLoadingStaff ? (
          <p>{loadingStaffMessage || "Loading staff..."}</p>
        ) : (
          <select
            name="MydutyUserID"
            value={conformance.js2html.MydutyUserID(contribution.MydutyUserID)}
            onChange={handleChange}
          >
            <option value="0">Select a staff member</option>
            {staff &&
              staff.map((member) => (
                <option key={member.UserID} value={member.UserID}>
                  {`${member.UserFirstname} ${member.UserLastname}`}
                </option>
              ))}
          </select>
        )}
      </Form.Item>

      <Form.Item label="Name" error={errors.MydutyName}>
        <input
          type="text"
          name="MydutyName"
          value={conformance.js2html.MydutyName(contribution.MydutyName)}
          onChange={handleChange}
        />
      </Form.Item>
    </Form>
  );
}

DutyContributionForm.propTypes = {
  initialContribution: PropTypes.object,
  dutyId: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

export default DutyContributionForm;