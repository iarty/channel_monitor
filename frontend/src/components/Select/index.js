import React from "react";
import { Form, FormControl } from "react-bootstrap";
import classes from "./Style.module.scss";

const Select = ({
  label,
  value,
  onChange,
  inputName,
  errorMessage,
  options,
  disabled,
  optionValue = "id",
  customClass,
  defValue,
  control,
}) => {
  console.log(value);
  return (
    <Form.Group>
      <Form.Label className="mb-0" htmlFor={label}>
        {label}
      </Form.Label>

      <Form.Control
        as="select"
        name={inputName}
        id={label}
        defaultValue={defValue}
        className={[
          [classes.customSelect, customClass && customClass].join(" "),
          disabled ? classes.disabled : null,
        ]}
        value={value}
        onChange={onChange}
        isInvalid={errorMessage}
        disabled={disabled}
        ref={control}
      >
        <option hidden />
        {options.map((item) => (
          <option value={item[optionValue]} key={item.name}>
            {item.name}
          </option>
        ))}
      </Form.Control>
      {errorMessage ? (
        <FormControl.Feedback type="invalid">
          {errorMessage}
        </FormControl.Feedback>
      ) : null}
    </Form.Group>
  );
};

export default Select;
