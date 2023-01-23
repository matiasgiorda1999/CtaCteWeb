import React from "react";
import Container from "../../../ComponentSupplier/DivisionContainers/Container";
import EnterpriseButton from "./EnterpriseButton";

const EnterpriseList = ({ enterprises }) => {
  return (
    <Container className="container-fluid row">
      {enterprises.map(({ idempresa, nombre, imagenURL }) => {
        return (
          <EnterpriseButton
            key={idempresa}
            idempresa={idempresa}
            name={nombre}
            imageUrl={imagenURL}
          />
        );
      })}
    </Container>
  );
};

export default EnterpriseList;
