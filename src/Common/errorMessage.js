import swal from 'sweetalert';

export default function errorMessage(title = 'Oops...', text) {

    return swal({
        icon: 'error',
        title: title,
        text: text
      })
}