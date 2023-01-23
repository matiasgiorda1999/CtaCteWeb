import React from "react";
import CurrencyInput from "react-currency-input-field";
import ErrorLabel from "./Labels/ErrorLabel.jsx";

const InputNumber = ({ error, ...props }) => {
  return (
    <>
      <CurrencyInput className="form-control" {...props} />
      {error && <ErrorLabel>{error}</ErrorLabel>}
    </>
  );
};

export default InputNumber;
