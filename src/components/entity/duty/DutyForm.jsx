import PropTypes from "prop-types";
import "./DutyForm.scss";
import { useModal } from "../../UI/Modal";
import { Confirm } from "../../UI/Notificaitons";
import Form from "../../UI/Form";

const defaultDuty = {
  DutyName: "",
  DutyEffort: 0,
  DutyInstances: 0,
};

export function DutyForm({ initialDuty, onCancel, onSubmit }) {
  // Initialisation ---------------------------------------------
  const conformance = {
    html2js: {
      DutyName: (value) => (value === "" ? null : value),
      DutyEffort: (value) => (value === "" ? 0 : parseInt(value, 10)),
      DutyInstances: (value) => (value === "" ? 0 : parseInt(value, 10)),
    },
    js2html: {
      DutyName: (value) => (value === null ? "" : value),
      DutyEffort: (value) => String(value),
      DutyInstances: (value) => String(value),
    },
  };

  const validation = {
    isValid: {
      DutyName: (v) => v && v.trim().length > 0,
      DutyEffort: (v) => Number.isInteger(v) && v >= 0,
      DutyInstances: (v) => Number.isInteger(v) && v >= 0,
    },
    errorMessage: {
      DutyName: "Duty name is required",
      DutyEffort: "Duty instances must be a non-negative integer",
      DutyInstances: "Duty instances must be a non-negative integer",
    },
  };

  if (!initialDuty) initialDuty = defaultDuty;

  let confirmText = "Are you sure you want to create this duty? ";
  if (initialDuty != defaultDuty) confirmText = "Are you sure want to make this change?";

  // State -------------------------------------------------------
  const [showConfirm, confirmMessage, openConfirm, closeConfirm] = useModal(false);
  const [duty, errors, handleChange, handleSubmit] = Form.useForm(initialDuty, conformance, validation, onSubmit);
  // Handlers ----------------------------------------------------
  // View -------------------------------------------------------
  const confirmSubmit = () => openConfirm(confirmText);
  return (
    <>
      <Confirm show={showConfirm} onConfirm={handleSubmit} message={confirmMessage} onDismiss={closeConfirm} />
      <Form onSubmit={confirmSubmit} onCancel={onCancel}>
        <Form.Item label="Duty Name" error={errors.DutyName}>
          <input
            type="text"
            name="DutyName"
            value={conformance.js2html.DutyName(duty.DutyName)}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Duty Effort" error={errors.DutyEffort}>
          <input
            type="number"
            name="DutyEffort"
            min="0"
            value={conformance.js2html.DutyName(duty.DutyEffort)}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Duty Instances" error={errors.DutyInstances}>
          <input
            type="number"
            name="DutyInstances"
            min="0"
            value={conformance.js2html.DutyInstances(duty.DutyInstances)}
            onChange={handleChange}
          />
        </Form.Item>
      </Form>
    </>
  );
}

DutyForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default DutyForm;
