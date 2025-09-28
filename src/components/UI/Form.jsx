import "./Form.scss";
import { useState } from "react";
import Action from "./Actions";
export function Form({ children, onSubmit, onCancel, submitButtonText }) {
  //Initialisation----------------------------
  //State----------------------------------------
  //Handlers-----------------------------------------------
  //View---------------------------------------------------------
  return (
    <div className="Form">
      <div className="FormTray"> {children}</div>
      <Action.Tray>
        <Action.Submit showText onClick={onSubmit} buttonText={submitButtonText} />
        {onCancel && <Action.Cancel showText buttonText="Cancel form" onClick={onCancel} />}
      </Action.Tray>
    </div>
  );
}

function Item({ children, label, advice, error }) {
  //Initialisation----------------------------
  //State----------------------------------------

  //Handlers-----------------------------------------------
  //View---------------------------------------------------------
  return (
    <div className="FormItem">
      <label className="FormLabel">{label}</label>
      {advice && <p className="FormAdvice">{advice}</p>}
      {children}
      {error && <p className="FormError">{error}</p>}
    </div>
  );
}

function useForm(initialRecord, { html2js }, { isValid, errorMessage }, onSubmit) {
  //Initialisation----------------------------
  //State----------------------------------------
  const [record, setRecord] = useState(initialRecord);
  const [errors, setErrors] = useState(Object.keys(isValid).reduce((accum, key) => ({ ...accum, [key]: null }, {})));

  const isValidRecord = (record) => {
    let isRecordValid = true;
    Object.keys(isValid).forEach((key) => {
      if (isValid[key](record[key])) {
        errors[key] = null;
      } else {
        errors[key] = errorMessage[key];
        isRecordValid = false;
      }
    });
    return isRecordValid;
  };

  //Handlers-----------------------------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecord({ ...record, [name]: html2js[name](value) });
  };

  const handleSubmit = () => {
    console.log(isValidRecord(record) + " is the validity");
    isValidRecord(record) && onSubmit(record);

    setErrors({ ...errors });
  };

  //View---------------------------------------------------------
  return [record, errors, handleChange, handleSubmit];
}

//Compose compund component
Form.Item = Item;
Form.useForm = useForm;

export default Form;
