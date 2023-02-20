import axios from "axios";
import { toCUITformat } from "../../../Utils/Pipes";
import { errorAlertMessage, successAlertMessage } from "../../../Utils/alerts";
const PORT = require("../../../config");

export const getEmptyEnterpriseForm = () => {
  return {
    cuit: "",
    name: "",
    image: "",
    street: "",
    streetNumber: "",
    location: "",
    province: "",
    country: "",
    responsable: "",
    income: "",
    errors: {},
  };
};

const resetForm = (form) => {
  form.reset();
};

const giveMeEnterprise = ({
  cuit,
  name,
  image,
  street,
  streetNumber,
  location,
  province,
  country,
  responsable,
  income,
}) => {
  const formData = new FormData();
  formData.append("CUIT", toCUITformat(cuit));
  formData.append("nombre", name);
  formData.append("imagenURL", image.data);
  formData.append("calle", street);
  formData.append("numeroCalle", parseInt(streetNumber));
  formData.append("Localidad", location);
  formData.append("AfipProvinciaId", parseInt(province));
  formData.append("AfipPaisId", parseInt(country));
  formData.append("AfipResponsableId", parseInt(responsable));
  formData.append("AfipIngBrutosId", parseInt(income));
  return formData;
};

export const handleSubmit = async (
  event,
  accessToken,
  enterpriseForm,
  enterpriseId
) => {
  event.preventDefault();
  const { errors, ...enterpriseValues } = enterpriseForm.content;
  const resultValidation = validateEnterpriseForm(enterpriseValues);
  enterpriseForm.changePropertyTo("errors", resultValidation);
  const enterprise = giveMeEnterprise(enterpriseValues);
  if (!Object.keys(resultValidation).length) {
    if (enterpriseId) {
      putEnterprise(enterpriseId, enterprise, accessToken)
        .then((response) => {
          responseOk(response, event, enterpriseForm);
          window.location.href = "/empresas";
        })
        .catch((error) => {
          errorAlertMessage(error.description);
        });
    } else {
      postEnterprise(enterprise, accessToken)
        .then((response) => {
          responseOk(response, event, enterpriseForm);
        })
        .catch((error) => {
          errorAlertMessage(error.description);
        });
    }
  }
};

const postEnterprise = (enterprise, accessToken) => {
  return axios.post(`${PORT()}/empresas`, enterprise, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

const putEnterprise = (enterpriseId, enterprise, accessToken) => {
  return axios.put(`${PORT()}/empresas/${enterpriseId}`, enterprise, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const deleteEnterprise = (enterpriseId, accessToken) => {
  axios
    .delete(`${PORT()}/empresas/${enterpriseId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((response) => {
      successAlertMessage(response.data.description);
      window.location.href = "/empresas";
    })
    .catch((error) => {
      errorAlertMessage(error.description);
    });
};

const responseOk = (response, event, enterpriseForm) => {
  successAlertMessage(response.data.description);
  resetForm(event.target);
  enterpriseForm.changeContentTo(getEmptyEnterpriseForm());
};

const validateEnterpriseForm = ({
  cuit,
  name,
  image,
  street,
  streetNumber,
  location,
  province,
  country,
  responsable,
  income,
}) => {
  const errors = {};
  if (!cuit) {
    errors.cuit = "Es necesario ingresar un cuit";
  } else if (cuit.length !== 11) {
    errors.cuit = "Ingresar un número de cuit válido";
  }
  if (!name) {
    errors.name = "Es necesario ingresar un nombre";
  }
  if (!image) {
    errors.image = "Es necesario ingresar una imagen";
  }
  if (!street) {
    errors.street = "Es necesario ingresar un nombre de calle";
  }
  if (!streetNumber) {
    errors.streetNumber = "Es necesario ingresar un número de calle";
  }
  if (!location) {
    errors.location = "Es necesario ingresar una localidad";
  }
  if (!province) {
    errors.province = "Es necesario seleccionar una provincia";
  }
  if (!country) {
    errors.country = "Es necesario seleccionar un país";
  }
  if (!responsable) {
    errors.responsable = "Es necesario seleccionar un responsable";
  }
  if (!income) {
    errors.income = "Es necesario seleccionar una condicion de ing brutos";
  }
  return errors;
};

export const enterpriseIdentifiedBy = async (enterpriseid, accessToken) => {
  const { data } = await axios.get(`${PORT()}/empresas/${enterpriseid}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return {
    cuit: data.CUIT.replaceAll("-", ""),
    name: data.nombre,
    image: { link: data.imagenURL },
    street: data.calle,
    streetNumber: data.numeroCalle,
    location: data.Localidad,
    province: data.AFIPProvinciaId,
    country: data.AFIPPaisId,
    responsable: data.AFIPResponsableId,
    income: data.AFIPIngBrutosId,
    errors: {},
  };
};

export const handleGetUsers = (accessToken, nameFilter, setUsers) => {
  if (nameFilter.length > 4) {
    getUsers(setUsers, nameFilter, accessToken);
  }
};

const getUsers = (actionOk, nameFilter, accessToken) => {
  fetchGetUsers(nameFilter, accessToken).then(({ data }) => {
    actionOk(data);
  });
};

const fetchGetUsers = async (nameFilter, accessToken) => {
  return await axios.get(`${PORT()}/usuarios?nameFilter=${nameFilter}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const assignUsersToEnterprise = (
  event,
  accessToken,
  enterprisesXusers,
  enterpriseId
) => {
  event.preventDefault();
  axios
    .post(
      `${PORT()}/asignar-usuarios/empresas/${enterpriseId}`,
      {
        users: enterprisesXusers.content,
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    .then((response) => {
      successAlertMessage(response.data.description);
      event.target.reset();
      enterprisesXusers.changeContentTo([]);
    })
    .catch((error) => {
      errorAlertMessage(error.description);
    });
};
