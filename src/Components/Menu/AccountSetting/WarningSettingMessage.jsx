import React from "react";
import TitleLevel from "../../../ComponentSupplier/Titles/TitleLevel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const WarningSettingMessage = () => {
  return (
    <>
      <TitleLevel level={2} className="text-center text-warning">
        <FontAwesomeIcon icon={faExclamationTriangle} />
      </TitleLevel>
      <TitleLevel level={2} className="fw-bold text-center ">
        ¡Atención!
      </TitleLevel>
      <TitleLevel level={5} className="mt-3 fw-bold text-center">
        Es necesario que ingrese su número de CUIT para poder consultar su
        cuenta corriente
      </TitleLevel>
    </>
  );
};

export default WarningSettingMessage;
