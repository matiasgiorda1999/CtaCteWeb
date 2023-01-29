import React from "react";
import Label from "./Labels/Label";
import SingleSelection from "./SingleSelection";
import Container from "./DivisionContainers/Container";

const SingleSelectionLabeled = ({
  label,
  name,
  placeholder,
  idProperty,
  valueProperty,
  value,
  options,
  disabled,
  onChange,
  error,
}) => {
  return (
    <Container className="form-group row mb-1">
      <Container className="col-md-3">
        <Label htmlFor={name}>{label}</Label>
      </Container>
      <Container className="col-md-9">
        <SingleSelection
          name={name}
          value={value}
          idProperty={idProperty}
          placeholder={placeholder}
          valueProperty={valueProperty}
          options={options}
          disabled={disabled}
          onChange={onChange}
          error={error}
        />
      </Container>
    </Container>
  );
};

export default SingleSelectionLabeled;
