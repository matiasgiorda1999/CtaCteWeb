import React from "react";
import Label from "./Labels/Label";
import SingleInputText from "./SingleInputText";
import Container from "./DivisionContainers/Container";

const SingleInputTextLabeled = ({
  label,
  name,
  placeholder,
  minLength = 0,
  maxLength = 50,
  value,
  onChange,
  error,
  readOnly = false,
}) => {
  return (
    <Container className="form-group row mb-1">
      <Container className="col-md-3">
        <Label htmlFor={name}>{label}</Label>
      </Container>
      <Container className="col-md-9">
        <SingleInputText
          id={name}
          name={name}
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          value={value}
          onChange={onChange}
          error={error}
          readOnly={readOnly}
        />
      </Container>
    </Container>
  );
};

export default SingleInputTextLabeled;
