import React from "react";
import Container from "../../../ComponentSupplier/DivisionContainers/Container";
import InputNumberLabeled from "../../../ComponentSupplier/InputNumberLabeled";
import WarningSettingMessage from "./WarningSettingMessage";
import ButtonLabeled from "../../../ComponentSupplier/ButtonLabeled";
import { useObject } from "../../../Hooks/useObject";
import { getEmptyCuit, handleSubmit } from "./cuitContext";
import { useAuth0 } from "@auth0/auth0-react";

const CuitForm = ({ user }) => {
  const { getAccessTokenSilently } = useAuth0();

  const cuitForm = useObject(getEmptyCuit());

  return (
    <Container className="col-md-8 offset-md-2">
      <br />
      <WarningSettingMessage />
      <br />
      <Container className="container-fluid">
        <form
          className="mt-5"
          onSubmit={async (event) =>
            handleSubmit(
              event,
              user.sub,
              await getAccessTokenSilently(),
              cuitForm
            )
          }
        >
          <InputNumberLabeled
            label="CUIT"
            name="cuit"
            placeholder="Ingrese su número de CUIT"
            allowDecimals={false}
            allowNegativeValue={false}
            disableGroupSeparators={true}
            value={cuitForm.content.cuit}
            onValueChange={(value) => cuitForm.changePropertyTo("cuit", value)}
            error={cuitForm.content.errors.cuit}
          />
          <Container className="d-flex justify-content-end">
            <ButtonLabeled className="btn btn-success" label="Enviar cambios" />
          </Container>
        </form>
      </Container>
    </Container>
  );
};

export default CuitForm;
