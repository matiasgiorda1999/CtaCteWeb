import React from "react";
import useQuery from "../../../Hooks/useQuery";
import { useAuth0 } from "@auth0/auth0-react";
import { useGetEntities } from "../../../Hooks/useGetEntities";
import { useGetObject } from "../../../Hooks/useGetObject";
import { PDFViewer } from "@react-pdf/renderer";
import CheckingAccountReport from "./CheckingAccountReport";
import ButtonLabeled from "../../../ComponentSupplier/ButtonLabeled";
import BeRenderizedOneOrOther from "../../../ComponentSupplier/Renderizing/BeRenderizedOneOrOther";
import Container from "../../../ComponentSupplier/DivisionContainers/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";

const PORT = require("../../../config");

const urlToCall = (queryParams, userCuit) => {
  let url = `${PORT()}/cuentas-corrientes/movimientos?`;
  for (var [name, value] of queryParams.entries()) {
    url += `${name}=${value}&`;
  }
  url += `cuit=20-25941807-1`;
  return url;
};

const CheckingAccount = () => {
  const queryParams = useQuery();
  const { user } = useAuth0();
  const checkingAccountMovements = useGetEntities(
    urlToCall(queryParams, user.cuit)
  );
  const clientData = useGetObject(
    `${PORT()}/usario/datos?enterprise=${queryParams.get("enterprise")}&cuit=${
      user.cuit
    }`
  );
  const enterprise = useGetObject(
    `${PORT()}/empresas/${queryParams.get("enterprise")}`
  );
  return (
    <>
      <Container className="col-md-1">
        <ButtonLabeled
          label="Atrás"
          className=" btn btn-secondary"
          onClick={() => {
            window.history.back();
          }}
        >
          <FontAwesomeIcon icon={faBackspace} />
        </ButtonLabeled>
      </Container>
      <BeRenderizedOneOrOther
        boolean={
          checkingAccountMovements.content &&
          enterprise.content &&
          clientData.content
        }
        ifTrueRender={
          <>
            <PDFViewer style={{ width: "100%", height: "90vh" }}>
              <CheckingAccountReport
                enterprise={enterprise.content}
                movements={checkingAccountMovements.content}
                dateIssued={new Date()}
                dateFrom={new Date(queryParams.get("date-from") + "T00:00:00")}
                dateTo={new Date(queryParams.get("date-to") + "T00:00:00")}
                clientData={clientData.content}
              />
            </PDFViewer>
          </>
        }
        ifFalseRender={<label>Cargando...</label>}
      />
    </>
  );
};

export default CheckingAccount;
