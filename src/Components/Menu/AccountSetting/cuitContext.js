import axios from "axios";
import { toCUITformat } from "../../../Utils/Pipes";
import validateCuitForm from "./cuitFormValidation";

const PORT = require("../../../config");

export const resetForm = (form) => {
  form.reset();
};

export const getEmptyCuit = () => {
  return {
    cuit: "",
    errors: {},
  };
};

const giveMeCuit = (cuitValues) => {
  return {
    cuit: toCUITformat(cuitValues.cuit),
  };
};

export const handleSubmit = async (
  event,
  userUniqueName,
  accessToken,
  cuitForm
) => {
  event.preventDefault();
  const { errors, ...cuitValues } = cuitForm.content;
  const resultValidation = validateCuitForm(cuitValues);
  cuitForm.changePropertyTo("errors", resultValidation);
  const cuit = giveMeCuit(cuitValues);
  if (!Object.keys(resultValidation).length) {
    axios
      .post(`${PORT()}/usuario-metadata/${userUniqueName}`, cuit, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(() => window.location.reload());
  }
};
