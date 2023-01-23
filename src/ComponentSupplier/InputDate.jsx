import React from "react";
import ErrorLabel from "./Labels/ErrorLabel";
import Container from "./DivisionContainers/Container";

const InputDate = ({
  name,
  value,
  onChange,
  error,
  onlyYear = false,
  onlyMonth = false,
}) => {
  return (
    <Container>
      <input
        type={onlyYear ? "year" : onlyMonth ? "month" : "date"}
        className={!error ? "form-control" : "form-control is-invalid"}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <ErrorLabel>{error}</ErrorLabel>}
    </Container>
  );
};

export default InputDate;
