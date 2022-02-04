import swal from 'sweetalert';

export default function successMessage(title = 'Oops...', text) {

    return swal({
        icon: 'success',
        title: title,
        text: text
      })
}