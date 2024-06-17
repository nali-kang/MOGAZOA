import Swal from 'sweetalert2';

const clip = () => {
  navigator.clipboard.writeText(window.location.href);
  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast: HTMLDivElement) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: 'success',
    title: 'URL이 복사되었습니다.',
  });
};
export default clip;
