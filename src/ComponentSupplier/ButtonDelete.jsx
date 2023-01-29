import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { defaultQuestion } from "../Utils/defaultQuestion";
import ButtonLabeled from "./ButtonLabeled";

const ButtonDelete = ({ label, icon, onConfirm, ...props }) => {
  const handleDelete = async () => {
    const deletionConfirmed = (
      await defaultQuestion(
        "¿Seguro que desea eliminar el elemento seleccionado?",
        "El elemento ya no estará disponible."
      )
    ).isConfirmed;
    if (deletionConfirmed) await onConfirm();
  };

  return (
    <ButtonLabeled {...props} label={label} onClick={handleDelete}>
      <FontAwesomeIcon icon={icon} />
    </ButtonLabeled>
  );
};

export default ButtonDelete;
