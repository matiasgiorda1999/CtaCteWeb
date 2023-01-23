import React from "react";
import Label from "./Labels/Label";
import InputDate from "./InputDate";
import Container from "./DivisionContainers/Container";

const InputDateLabeled = ({
  label,
  name,
  value,
  onChange,
  error,
  onlyYear = false,
  onlyMonth = false,
}) => {
  return (
    <Container className="form-group row mb-1">
      <Container className="col-md-4">
        <Label htmlFor={name}>{label}</Label>
      </Container>
      <Container className="col-md-8">
        <InputDate
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          error={error}
          onlyYear={onlyYear}
          onlyMonth={onlyMonth}
        />
      </Container>
    </Container>
  );
};

export default InputDateLabeled;
