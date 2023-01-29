import React from "react";
import Container from "./DivisionContainers/Container";
import Label from "./Labels/Label";
import ErrorLabel from "./Labels/ErrorLabel";

const InputImageLabeled = ({ label, name, onChange, disabled, error }) => {
  return (
    <Container className="form-group row mb-1">
      <Container className="col-md-3">
        <Label htmlFor={name}>{label}</Label>
      </Container>
      <Container className="col-md-9">
        <input
          type="file"
          className={!error ? "form-control" : "form-control is-invalid"}
          name={name}
          id={name}
          onChange={onChange}
          accept=".png, .jpg, .jpeg"
          multiple={false}
          disabled={disabled}
        />
        {error && <ErrorLabel>{error}</ErrorLabel>}
      </Container>
    </Container>
  );
};

export default InputImageLabeled;
