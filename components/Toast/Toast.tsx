// import React from 'react'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultOption = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
}

const Toast = {
    success: (message: string, options?: any) => {
        toast.success(message, {
            ...defaultOption,
            ...options
        });
    },

    error: (message: string, options?: any) => {
        toast.error(message, {
            ...defaultOption,
            ...options
        });
    },
};

export default Toast;