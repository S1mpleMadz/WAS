import PropTypes from "prop-types";
import { Form } from "../../UI/Form";

const defaultParams = {
  ParameterID: 1,
  LeadingMinimum: 50,
  LeadingMultiplier: 0.3,
  LecturingMultiplier: 2,
  WorkshopMultiplier: 1.5,
  WorkshopSize: 100,
  MarkingTimePerStudent: 1,
  WeeksPer15Credits: 22,
  WeeksPer30Credits: 44,
  LectureHoursPerWeek: 2,
  WorkshopHoursPerWeek: 2,
};

export default function ParametersForm({ initialParams, onSubmit, onCancel }) {
  // --- conformance from HTML <-> JS values (matches your pattern) ---
  const conformance = {
    html2js: {
      ParameterID: (v) => (v === "" ? null : parseInt(v)), // integer
      LeadingMinimum: (v) => (v === "" ? null : Number(v)),
      LeadingMultiplier: (v) => (v === "" ? null : Number(v)),
      LecturingMultiplier: (v) => (v === "" ? null : Number(v)),
      WorkshopMultiplier: (v) => (v === "" ? null : Number(v)),
      WorkshopSize: (v) => (v === "" ? null : parseInt(v)), // integer
      MarkingTimePerStudent: (v) => (v === "" ? null : Number(v)),
      WeeksPer15Credits: (v) => (v === "" ? null : Number(v)),
      WeeksPer30Credits: (v) => (v === "" ? null : Number(v)),
      LectureHoursPerWeek: (v) => (v === "" ? null : Number(v)),
      WorkshopHoursPerWeek: (v) => (v === "" ? null : Number(v)),
    },
    js2html: {
      ParameterID: (v) => String(v ?? ""),
      LeadingMinimum: (v) => String(v ?? ""),
      LeadingMultiplier: (v) => String(v ?? ""),
      LecturingMultiplier: (v) => String(v ?? ""),
      WorkshopMultiplier: (v) => String(v ?? ""),
      WorkshopSize: (v) => String(v ?? ""),
      MarkingTimePerStudent: (v) => String(v ?? ""),
      WeeksPer15Credits: (v) => String(v ?? ""),
      WeeksPer30Credits: (v) => String(v ?? ""),
      LectureHoursPerWeek: (v) => String(v ?? ""),
      WorkshopHoursPerWeek: (v) => String(v ?? ""),
    },
  };

  // --- validation (basic, keep consistent with your style) ---
  const number = (x) => x !== null && !isNaN(Number(x));
  const int = (x) => Number.isInteger(Number(x));

  const validation = {
    isValid: {
      ParameterID: (v) => v !== null && int(v),
      LeadingMinimum: number,
      LeadingMultiplier: number,
      LecturingMultiplier: number,
      WorkshopMultiplier: number,
      WorkshopSize: (v) => v !== null && int(v),
      MarkingTimePerStudent: number,
      WeeksPer15Credits: number,
      WeeksPer30Credits: number,
      LectureHoursPerWeek: number,
      WorkshopHoursPerWeek: number,
    },
    errorMessage: {
      ParameterID: "ParameterID is required",
      LeadingMinimum: "Enter a number",
      LeadingMultiplier: "Enter a number",
      LecturingMultiplier: "Enter a number",
      WorkshopMultiplier: "Enter a number",
      WorkshopSize: "Enter an integer",
      MarkingTimePerStudent: "Enter a number",
      WeeksPer15Credits: "Enter a number",
      WeeksPer30Credits: "Enter a number",
      LectureHoursPerWeek: "Enter a number",
      WorkshopHoursPerWeek: "Enter a number",
    },
  };

  if (!initialParams) initialParams = [defaultParams];

  const [params, errors, handleChange, handleSubmit] = Form.useForm(initialParams[0], conformance, validation, onSubmit);

  return (
    <Form onSubmit={() => handleSubmit(params)} onCancel={onCancel} submitButtonText="Save parameters">
      <Form.Item label="Parameter ID" errorMessage={errors.ParameterID}>
        <input
          hidden
          type="number"
          name="ParameterID"
          defaultValue={conformance.js2html.ParameterID(params.ParameterID)}
          onChange={handleChange}
          min={0}
        />
      </Form.Item>

      {/* Leading */}
      <Form.Item label="Leading Minimum" errorMessage={errors.LeadingMinimum}>
        <input
          type="number"
          name="LeadingMinimum"
          defaultValue={conformance.js2html.LeadingMinimum(params.LeadingMinimum)}
          onChange={handleChange}
          min={0}
        />
      </Form.Item>
      <Form.Item label="Leading Multiplier" errorMessage={errors.LeadingMultiplier}>
        <input
          type="number"
          name="LeadingMultiplier"
          defaultValue={conformance.js2html.LeadingMultiplier(params.LeadingMultiplier)}
          onChange={handleChange}
          min={0}
        />
      </Form.Item>

      {/* Lecturing */}
      <Form.Item label="Lecturing Multiplier" errorMessage={errors.LecturingMultiplier}>
        <input
          type="number"
          name="LecturingMultiplier"
          defaultValue={conformance.js2html.LecturingMultiplier(params.LecturingMultiplier)}
          onChange={handleChange}
          min={0}
        />
      </Form.Item>

      {/* Workshops */}
      <Form.Item label="Workshop Multiplier" errorMessage={errors.WorkshopMultiplier}>
        <input
          type="number"
          name="WorkshopMultiplier"
          defaultValue={conformance.js2html.WorkshopMultiplier(params.WorkshopMultiplier)}
          onChange={handleChange}
          min={0}
        />
      </Form.Item>
      <Form.Item label="Workshop Size" errorMessage={errors.WorkshopSize}>
        <input
          type="number"
          name="WorkshopSize"
          defaultValue={conformance.js2html.WorkshopSize(params.WorkshopSize)}
          onChange={handleChange}
          min={0}
        />
      </Form.Item>

      {/* Marking */}
      <Form.Item label="Marking Time Per Student" errorMessage={errors.MarkingTimePerStudent}>
        <input
          type="number"
          name="MarkingTimePerStudent"
          defaultValue={conformance.js2html.MarkingTimePerStudent(params.MarkingTimePerStudent)}
          onChange={handleChange}
          min={0}
        />
      </Form.Item>

      {/* Weeks */}
      <Form.Item label="Weeks Per 15 Credits" errorMessage={errors.WeeksPer15Credits}>
        <input
          type="number"
          name="WeeksPer15Credits"
          defaultValue={conformance.js2html.WeeksPer15Credits(params.WeeksPer15Credits)}
          onChange={handleChange}
          min={0}
        />
      </Form.Item>
      <Form.Item label="Weeks Per 30 Credits" errorMessage={errors.WeeksPer30Credits}>
        <input
          type="number"
          name="WeeksPer30Credits"
          defaultValue={conformance.js2html.WeeksPer30Credits(params.WeeksPer30Credits)}
          onChange={handleChange}
          min={0}
        />
      </Form.Item>

      {/* Weekly Hours */}
      <Form.Item label="Lecture Hours Per Week" errorMessage={errors.LectureHoursPerWeek}>
        <input
          type="number"
          name="LectureHoursPerWeek"
          defaultValue={conformance.js2html.LectureHoursPerWeek(params.LectureHoursPerWeek)}
          onChange={handleChange}
          min={0}
        />
      </Form.Item>
      <Form.Item label="Workshop Hours Per Week" errorMessage={errors.WorkshopHoursPerWeek}>
        <input
          type="number"
          name="WorkshopHoursPerWeek"
          defaultValue={conformance.js2html.WorkshopHoursPerWeek(params.WorkshopHoursPerWeek)}
          onChange={handleChange}
          min={0}
        />
      </Form.Item>
    </Form>
  );
}

ParametersForm.propTypes = {
  initialParams: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
