import { toast } from 'react-toastify';

export const notify = (message, type = 'success', config) => {
  toast[type](message, {
    position: toast.POSITION.BOTTOM_LEFT,
    autoClose: 3000,
    pauseOnFocusLoss: false,
    ...config,
  });
};
