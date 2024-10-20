import 'izitoast/dist/css/iziToast.min.css';
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

const icons = {
  ok: new URL('../../img/ok.svg', import.meta.url).href,
  error: new URL('../../img/error.svg', import.meta.url).href,
};

export function showErrorToast(message) {
  iziToast.error({
    title: '',
    backgroundColor: '#ef4040',
    iconUrl: icons['error'],
    timeout: 3000,
    messageColor: '#fff',
    titleColor: '#fff',
    maxWidth: '438px',
    messageSize: '16px',
    titleSize: '16px',
    position: 'topRight',
    message: message,
    close: false,
  });
}

export function showOkToast(message) {
  iziToast.success({
    title: '',
    backgroundColor: '#59a10d',
    iconUrl: icons['ok'],
    messageColor: '#fff',
    titleColor: '#fff',
    messageSize: '16px',
    titleSize: '16px',
    position: 'topRight',
    message: message,
  });
}
