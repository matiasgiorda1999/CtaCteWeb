export const getEmptyPeriodForm = () => {
  return {
    dateFrom: "",
    dateTo: "",
    errors: {},
  };
};

export const handleSubmit = async (event, periodForm) => {
  const { errors, ...periodValues } = periodForm.content;
  const resultValidation = validatePeriodValues(periodValues);
  periodForm.changePropertyTo("errors", resultValidation);
  if (Object.keys(resultValidation).length) {
    event.preventDefault();
  }
};

const validatePeriodValues = ({ dateFrom, dateTo }) => {
  const errors = {};
  if (!dateFrom) {
    errors.dateFrom = "Ingrese una fecha desde válida";
  }
  if (!dateTo) {
    errors.dateTo = "Ingrese una fecha hasta válida";
  }
  if (new Date(dateFrom).getTime() > new Date(dateTo).getTime()) {
    errors.dateFrom = "Periodo inválido, no puede ser mayor a la fecha hasta";
    errors.dateTo = "Periodo inválido, no puede ser menor a la fecha desde";
  }
  return errors;
};
