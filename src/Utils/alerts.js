import Swal from "sweetalert2";
import "./swal.css";

export const successAlertMessage = (message) => {
  return Swal.fire({
    customClass: {
      container: "container-swal",
    },
    title: "¡Confirmado!",
    text: message,
    icon: "success",
    showConfirmButton: false,
    timer: 2000,
  });
};

export const warningAlertMessage = (message) => {
  return Swal.fire({
    customClass: {
      container: "container-swal",
    },
    title: "¡Atención!",
    text: message,
    icon: "warning",
    showConfirmButton: true,
    confirmButtonText: "Aceptar",
    allowOutsideClick: false,
  });
};

export const errorAlertMessage = (message) => {
  return Swal.fire({
    customClass: {
      container: "container-swal",
    },
    title: "¡Error!",
    text: message,
    icon: "error",
    showConfirmButton: false,
    timer: 2000,
  });
};

export const loadingAlertMessage = async (
  titleLoading,
  deleteService = null,
  setEntityAfterDelete = null,
  entityID = null,
  user
) => {
  Swal.fire({
    customClass: {
      container: "container-swal",
    },
    title: titleLoading,
    didOpen: () => {
      Swal.showLoading();
    },
  });
  if (setEntityAfterDelete) deleteService(entityID, user, setEntityAfterDelete);
};
