import React from "react";
import ButtonLabeled from "./ButtonLabeled";
import Container from "./DivisionContainers/Container";

const Buttons = ({
  labelCancel,
  labelOk,
  actionCancel,
  actionOk,
  children,
}) => {
  return (
    <Container className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
      <ButtonLabeled
        type="button"
        className="btn btn-secondary"
        onClick={actionCancel}
        label={labelCancel}
      />
      <ButtonLabeled
        type="submit"
        className="btn btn-success"
        onClick={actionOk}
        label={labelOk}
      />
      {children}
    </Container>
  );
};
export default Buttons;
