import React from "react";
import { CircularProgress, Container } from "@material-ui/core";
import Label from "./Labels/Label";

const SpinnerLabeled = ({ label }) => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center mt-5">
      <CircularProgress color="primary" />
      <Label>{label}...</Label>
    </Container>
  );
};

export default SpinnerLabeled;
