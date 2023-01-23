const validateCuitForm = (cuitValues) => {
  const errors = {};
  if (
    !cuitValues.cuit ||
    cuitValues.cuit.length < 11 ||
    cuitValues.cuit.length > 15
  ) {
    errors.cuit = "Ingrese un número de cuit válido";
  }
  return errors;
};

export default validateCuitForm;
