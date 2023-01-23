import React from "react";
import Label from "./Labels/Label";
import InputNumber from "./InputNumber";
import Container from "./DivisionContainers/Container";

const InputNumberLabeled = ({ label, name, ...props }) => {
  return (
    <Container className="form-group row mb-1">
      <Container className="col-md-3">
        <Label htmlFor={name}>{label}</Label>
      </Container>
      <Container className="col-md-9">
        <InputNumber id={name} name={name} {...props} />
      </Container>
    </Container>
  );
};

export default InputNumberLabeled;
