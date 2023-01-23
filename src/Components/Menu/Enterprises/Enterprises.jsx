import React from "react";
import EnterpriseList from "./EnterpriseList.jsx";
import { useGetEntities } from "../../../Hooks/useGetEntities";
import BeRenderizedOneOrOther from "../../../ComponentSupplier/Renderizing/BeRenderizedOneOrOther.jsx";
import Label from "../../../ComponentSupplier/Labels/Label.jsx";

const PORT = require("../../../config");

const Enterprises = ({ userUniqueName }) => {
  const enterprises = useGetEntities(
    `${PORT()}/empresas?idUsuario=${userUniqueName}`
  );

  return (
    <BeRenderizedOneOrOther
      boolean={enterprises.content}
      ifTrueRender={<EnterpriseList enterprises={enterprises.content} />}
      ifFalseRender={<Label>Cargando...</Label>}
    />
  );
};

export default Enterprises;
