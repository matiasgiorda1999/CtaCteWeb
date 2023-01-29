import Swal from "sweetalert2";
import "./swal.css";

export function defaultQuestion(title, text) {
  return Swal.fire({
    customClass: {
      container: "container-swal",
    },
    title,
    text,
    icon: "question",
    confirmButtonText: "Sí",
    showCancelButton: true,
    showConfirmButton: true,
    reverseButtons: true,
    cancelButtonText: "Cancelar",
  });
}
