import PropTypes from "prop-types";
import { Form } from "../../UI/Form";
import useLoad from "../../../api/useLoad";
import { useEffect } from "react";
import { calculateModuleEffort } from "../MoreModuleInfo/effortCalculations";

const defaultModule = {
  ModuleCode: null,
  ModuleName: null,
  ModuleImageURL: "https://images.freeimages.com/images/small-previews/9b8/electronic-components-2-1242738.jpg",
  ModuleLeaderID: null,
  ModuleLevel: 0,
  ModuleCredits: null,
  ModuleSize: null,
  ModuleEffort: null,
  ModuleLeaderName: "",
};
export function ModuleForm({ initialModule, onSubmit, onCancel }) {
  // Initialisation ----------------------------------------------
  const conformance = {
    html2js: {
      ModuleID: (value) => (value === "" ? null : parseInt(value)),
      ModuleCode: (value) => (value === "" ? null : value),
      ModuleName: (value) => (value === "" ? null : value),
      ModuleImageURL: (value) => (value === "" ? null : value),
      ModuleLeaderID: (value) => (value === "0" ? null : parseInt(value)),
      ModuleLevel: (value) => parseInt(value),
      ModuleCredits: (value) => (value === "" ? null : parseInt(value)),
      ModuleSize: (value) => (value === "" ? null : parseInt(value)),
      ModuleEffort: (value) => (value === "" ? null : parseInt(value)),
      ModuleLeaderName: (value) => value,
    },
    js2html: {
      ModuleID: (value) => (value === null ? "" : value),
      ModuleCode: (value) => (value === null ? "" : value),
      ModuleName: (value) => (value === null ? "" : value),
      ModuleImageURL: (value) => (value === null ? "" : value),
      ModuleLeaderID: (value) => (value === null ? "0" : String(value)),
      ModuleLevel: (value) => (value === null ? "0" : String(value)),
      ModuleCredits: (value) => (value === null ? "" : String(value)),
      ModuleSize: (value) => (value === null ? "" : String(value)),
      ModuleEffort: (value) => (value === null ? "" : String(value)),
      ModuleLeaderName: (value) => (value === null ? "" : value),
    },
  };

  const validation = {
    isValid: {
      ModuleCode: (code) => /^\D{2}\d{4}$/.test(code),
      ModuleName: (name) => name && name.length > 2,
      ModuleLevel: (level) => level > 2 && level < 8,
      ModuleLeaderID: (id) => id == null || id > 0,
      ModuleCredits: (credits) => credits > 0,
      ModuleSize: (size) => size > 0,
      ModuleEffort: (effort) => effort > 0,
      ModuleImageURL: (url) =>
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(
          url
        ),
    },
    errorMessage: {
      ModuleCode: "Module code is not in a valid format",
      ModuleName: "Module name is too short",
      ModuleLevel: "Invalid module level",
      ModuleLeaderID: "Invalid module leader selected",
      ModuleCredits: "Module credits must be greater than zero",
      ModuleSize: "Module size must be greater than zero",
      ModuleEffort: "Module effort must be greater than zero",
      ModuleImageURL: "The URL entered is not a valid URL",
    },
  };

  if (!initialModule) initialModule = defaultModule;
  // State -------------------------------------------------------
  const staffEndpoint = "/users?UserUserType=Manager";
  const [staff, isLoadingStaff, loadingStaffMessage] = useLoad(staffEndpoint);
  const [module, errors, handleChange, handleSubmit] = Form.useForm(initialModule, conformance, validation, onSubmit);

  useEffect(() => {
    const { ModuleSize, ModuleCredits } = module;
    if (ModuleSize > 0 && ModuleCredits > 0) {
      const calculatedEffort = calculateModuleEffort(module);
      // Only update if different to prevent infinite re-render loop
      if (module.ModuleEffort !== calculatedEffort) {
        handleChange({
          target: {
            name: "ModuleEffort",
            value: calculatedEffort.toString(),
          },
        });
      }
    }
  }, [module.ModuleSize, module.ModuleCredits]);
  module.ModuleEffort = "100";
  // Handlers ----------------------------------------------------
  // View --------------------------------------------------------
  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel} className="FormTray">
      <input type="hidden" name="ModuleID" value={conformance.js2html.ModuleID(module.ModuleID)} />

      <Form.Item label="Module Code" error={errors.ModuleCode}>
        <input
          type="text"
          name="ModuleCode"
          value={conformance.js2html.ModuleCode(module.ModuleCode)}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item label="Module Name" error={errors.ModuleName}>
        <input
          type="text"
          name="ModuleName"
          value={conformance.js2html.ModuleName(module.ModuleName)}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item label="Module Image URL" error={errors.ModuleImageURL}>
        <input
          type="text"
          name="ModuleImageURL"
          value={conformance.js2html.ModuleImageURL(module.ModuleImageURL)}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item label="Module Level" error={errors.ModuleLevel}>
        <select name="ModuleLevel" value={conformance.js2html.ModuleLevel(module.ModuleLevel)} onChange={handleChange}>
          <option value="0">None selected</option>
          {[3, 4, 5, 6, 7].map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </Form.Item>

      <Form.Item label="Module Credits" error={errors.ModuleCredits}>
        <select
          name="ModuleCredits"
          value={conformance.js2html.ModuleCredits(module.ModuleCredits)}
          onChange={handleChange}
        >
          <option value="">None selected</option>
          <option value="15">15</option>
          <option value="30">30</option>
        </select>
      </Form.Item>

      <Form.Item label="Module Size" error={errors.ModuleSize}>
        <input
          type="number"
          name="ModuleSize"
          value={conformance.js2html.ModuleSize(module.ModuleSize)}
          onChange={handleChange}
          min={0}
        />
      </Form.Item>

      <Form.Item label="Module Leader" error={errors.ModuleLeaderID}>
        {isLoadingStaff ? (
          <p>{loadingStaffMessage || "Loading records..."}</p>
        ) : (
          <select
            name="ModuleLeaderID"
            value={conformance.js2html.ModuleLeaderID(module.ModuleLeaderID)}
            onChange={handleChange}
          >
            <option value="0" disabled>
              None selected
            </option>
            {staff &&
              staff.map((member) => (
                <option key={member.UserID} value={member.UserID}>
                  {`${member.UserFirstname} ${member.UserLastname}`}
                </option>
              ))}
          </select>
        )}
      </Form.Item>
    </Form>
  );
}
ModuleForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
};

export default ModuleForm;
