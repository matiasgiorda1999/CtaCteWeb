import React from "react";
import Container from "../ComponentSupplier/DivisionContainers/Container";
import TitleLevel from "../ComponentSupplier/Titles/TitleLevel";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import bbvLogo from "../Images/BbvLogo.jpg";
const InitialPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Container className="d-flex vh-100">
      <Container className="col-md-4 offset-md-4 vh-100">
        <Container className="d-flex flex-column mt-5">
          <img
            src={bbvLogo}
            alt="Logo Caja Notarial"
            className="rounded col-md-6 offset-md-3 mb-5 mt-5"
          />
          <TitleLevel level={2} className="fw-bold text-center ">
            ¡Bienvenido!
          </TitleLevel>
          <TitleLevel level={5} className="mt-3 fw-bold text-center">
            Página web de consulta de movimientos en la Cuenta Corriente
          </TitleLevel>
          <form className="mt-5">
            <Container className="d-grid gap-2 d-md-flex justify-content-md-center">
              <button
                type="button"
                className=" btn btn-primary"
                onClick={loginWithRedirect}
              >
                <FontAwesomeIcon icon={faSignInAlt} /> Ingresar
              </button>
            </Container>
          </form>
        </Container>
      </Container>
    </Container>
  );
};

export default InitialPage;
