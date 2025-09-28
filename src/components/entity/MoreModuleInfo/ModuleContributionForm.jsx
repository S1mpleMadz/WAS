import PropTypes from "prop-types";
import { Form } from "../../UI/Form";
import useLoad from "../../../api/useLoad";

const defaultContribution = {
  TeachingID: null,
  TeachingUserID: null,
  TeachingModuleID: null,
  TeachingLeading: 0,
  TeachingLecturing: 0,
  TeachingWorkshops: 0,
  TeachingAssessing: 0,
  TeachingModeration: false,
};

export function ModuleContributionForm({ initialContribution, moduleId, onSubmit, onCancel }) {
  // Initialisation ----------------------------------------------
  const conformance = {
    html2js: {
      TeachingID: (value) => (value === "" ? null : parseInt(value)),
      TeachingUserID: (value) => (value === "0" ? null : parseInt(value)),
      TeachingModuleID: (value) => (value === "" ? null : parseInt(value)),
      TeachingLeading: (value) => parseInt(value) || 0,
      TeachingLecturing: (value) => parseInt(value) || 0,
      TeachingWorkshops: (value) => parseInt(value) || 0,
      TeachingAssessing: (value) => parseInt(value) || 0,
      TeachingModeration: (value) => value === "true" || value === true,
    },
    js2html: {
      TeachingID: (value) => (value === null ? "" : String(value)),
      TeachingUserID: (value) => (value === null ? "0" : String(value)),
      TeachingModuleID: (value) => (value === null ? "" : String(value)),
      TeachingLeading: (value) => String(value),
      TeachingLecturing: (value) => String(value),
      TeachingWorkshops: (value) => String(value),
      TeachingAssessing: (value) => String(value),
      TeachingModeration: (value) => String(value),
    },
  };

  const validation = {
    isValid: {
      TeachingUserID: (id) => id !== null && id > 0,
      TeachingLeading: (value) => value >= 0 && value <= 100,
      TeachingLecturing: (value) => value >= 0 && value <= 100,
      TeachingWorkshops: (value) => value >= 0 && value <= 100,
      TeachingAssessing: (value) => value >= 0 && value <= 100,
      TeachingModeration: (value) => typeof value === 'boolean',
    },
    errorMessage: {
      TeachingUserID: "Please select a staff member",
      TeachingLeading: "Leading percentage must be between 0 and 100",
      TeachingLecturing: "Lecturing percentage must be between 0 and 100",
      TeachingWorkshops: "Workshops percentage must be between 0 and 100",
      TeachingAssessing: "Assessing percentage must be between 0 and 100",
      TeachingModeration: "Please select if this person handles moderation",
    },
  };

  //console.log(initialContribution);

  // Set up initial contribution with module ID
  const contributionWithModule = {
    ...defaultContribution,
    ...initialContribution,
    TeachingModuleID: moduleId,
  };

  //const moderation = conformance.js2html.TeachingModeration(contribution.TeachingModeration);

  // State -------------------------------------------------------
  const staffEndpoint = "/users?UserUserType=Manager";
  const [staff, isLoadingStaff, loadingStaffMessage] = useLoad(staffEndpoint);
  const [contribution, errors, handleChange, handleSubmit] = Form.useForm(
    contributionWithModule,
    conformance,
    validation,
    onSubmit
  );

  const confirmText = initialContribution == null ? "Add contribution" : "Modify contribution";
  // View --------------------------------------------------------
  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel} submitButtonText={confirmText}>
      <input type="hidden" name="TeachingID" value={conformance.js2html.TeachingID(contribution.TeachingID)} />
      <input
        type="hidden"
        name="TeachingModuleID"
        value={conformance.js2html.TeachingModuleID(contribution.TeachingModuleID)}
      />

      <Form.Item label="Staff Member" error={errors.TeachingUserID}>
        {isLoadingStaff ? (
          <p>{loadingStaffMessage || "Loading staff..."}</p>
        ) : (
          <select
            name="TeachingUserID"
            value={conformance.js2html.TeachingUserID(contribution.TeachingUserID)}
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

      <Form.Item label="Leading %" error={errors.TeachingLeading}>
        <input
          type="number"
          name="TeachingLeading"
          value={conformance.js2html.TeachingLeading(contribution.TeachingLeading)}
          onChange={handleChange}
          min="0"
          max="100"
        />
      </Form.Item>

      <Form.Item label="Lecturing %" error={errors.TeachingLecturing}>
        <input
          type="number"
          name="TeachingLecturing"
          value={conformance.js2html.TeachingLecturing(contribution.TeachingLecturing)}
          onChange={handleChange}
          min="0"
          max="100"
        />
      </Form.Item>

      <Form.Item label="Workshops %" error={errors.TeachingWorkshops}>
        <input
          type="number"
          name="TeachingWorkshops"
          value={conformance.js2html.TeachingWorkshops(contribution.TeachingWorkshops)}
          onChange={handleChange}
          min="0"
          max="100"
        />
      </Form.Item>

      <Form.Item label="Assessing %" error={errors.TeachingAssessing}>
        <input
          type="number"
          name="TeachingAssessing"
          value={conformance.js2html.TeachingAssessing(contribution.TeachingAssessing)}
          onChange={handleChange}
          min="0"
          max="100"
        />
      </Form.Item>

      <Form.Item label="Moderation" error={errors.TeachingModeration}>
        <select
          name="TeachingModeration"
          value={conformance.js2html.TeachingModeration(contribution.TeachingModeration)}
          onChange={handleChange}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </Form.Item>
    </Form>
  );
}

ModuleContributionForm.propTypes = {
  initialContribution: PropTypes.object,
  moduleId: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

export default ModuleContributionForm;
