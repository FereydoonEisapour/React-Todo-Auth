import Swal from 'sweetalert2';

function AlertMessage(props) {
   
   
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    Toast.fire({
        icon: props.alertType,
        title: props.alertMessage
    })
    return (
        < >
        </>
    );
}
export default AlertMessage;
