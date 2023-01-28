import React from "react";
import { Form, useParams } from "react-router-dom";
import Container from "../../../ComponentSupplier/DivisionContainers/Container";
import InputDateLabeled from "../../../ComponentSupplier/InputDateLabeled";
import Buttons from "../../../ComponentSupplier/Buttons";
import { useObject } from "../../../Hooks/useObject";
import { useGetObject } from "../../../Hooks/useGetObject";
import {
  getEmptyPeriodForm,
  handleSubmit,
} from "./EnterpriseSelectionPeriodContext";
import locationOf from "../../../locationOf";

const PORT = require("../../../config");

const EnterpriseSelectionPeriod = () => {
  const params = useParams();
  const enterprise = useGetObject(`${PORT()}/empresas/${params.empresaid}`);
  const periodForm = useObject(getEmptyPeriodForm());
  return (
    <Form
      action={locationOf(`/cuenta-corriente`)}
      className="container-fluid"
      onSubmit={(event) => {
        handleSubmit(event, periodForm);
      }}
    >
      <input type="hidden" name="enterprise" value={params.empresaid} />
      <Container className="row justify-content-center p-5">
        <img
          style={{ width: "15rem", height: "10rem" }}
          src={enterprise.content.imagenURL}
          alt={enterprise.content.nombre}
        ></img>
      </Container>
      <Container className=" row">
        <Container className="col-md-4 offset-1">
          <InputDateLabeled
            label="Fecha desde"
            name="date-from"
            value={periodForm.content.dateFrom}
            onChange={({ target }) => {
              periodForm.changePropertyTo("dateFrom", target.value);
            }}
            error={periodForm.content.errors.dateFrom}
          />
        </Container>
        <Container className="col-md-4 offset-1">
          <InputDateLabeled
            label="Fecha hasta"
            name="date-to"
            value={periodForm.content.dateTo}
            onChange={({ target }) => {
              periodForm.changePropertyTo("dateTo", target.value);
            }}
            error={periodForm.content.errors.dateTo}
          />
        </Container>
      </Container>
      <Container className="col-md-10">
        <Buttons
          labelCancel="Cancelar"
          labelOk="Consultar"
          actionCancel={() => {
            window.history.back();
          }}
          actionOk={() => {}}
        />
      </Container>
    </Form>
  );
};

export default EnterpriseSelectionPeriod;
