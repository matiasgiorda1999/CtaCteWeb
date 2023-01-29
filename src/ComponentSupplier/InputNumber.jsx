import React from "react";
import CurrencyInput from "react-currency-input-field";
import ErrorLabel from "./Labels/ErrorLabel.jsx";

const InputNumber = ({ error, ...props }) => {
  return (
    <>
      <CurrencyInput
        className={!error ? "form-control" : "form-control is-invalid"}
        {...props}
      />
      {error && <ErrorLabel>{error}</ErrorLabel>}
    </>
  );
};

export default InputNumber;
