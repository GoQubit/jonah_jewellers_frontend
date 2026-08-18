import axios from 'axios';
import Cookies from "js-cookie";

const axiosInstance: any = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config: any) => {
        const accessToken = Cookies.get("authToken")
        if (accessToken) {
            if (config.headers) config.headers.Authorization = `Bearer ${accessToken}`;
        }

        if (config.customBaseURL) {
            config.baseURL = config.customBaseURL
        }

        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response: any) => {
        if (response.status === 200) {
            if (response.data.status_code === 401) {
                Cookies.remove("authToken");
                window.location.assign(`/`);
            }
        }
        return response;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);


export default axiosInstance;