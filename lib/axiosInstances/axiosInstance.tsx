import axios from 'axios';
import Cookies from "js-cookie";

// A request that hangs forever (e.g. a cold/asleep backend) is worse than
// one that fails fast: callers that don't await-catch it (see the fix in
// lib/api/**, which now always return a safe fallback instead of throwing)
// would otherwise leave the UI stuck loading indefinitely. 15s gives a slow
// cold-start a real chance while still failing predictably.
const REQUEST_TIMEOUT_MS = 15000;

const axiosInstance: any = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    timeout: REQUEST_TIMEOUT_MS,
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
        // Optional chaining throughout: a malformed/empty response body
        // should never crash the caller just because this interceptor ran.
        if (response?.status === 200) {
            if (response?.data?.status_code === 401) {
                Cookies.remove("authToken");
                window.location.assign(`/`);
            }
        }
        return response;
    },
    (error: any) => {
        // Network failure, timeout, or no response at all (backend asleep/
        // unreachable) - log it once here so it's visible in the console
        // without every single call site needing its own logging, then
        // reject as before so existing try/catch callers still work.
        if (!error?.response) {
            console.error(
                "[axios] network error (no response) - is the backend reachable?",
                error?.message || error
            );
        }
        return Promise.reject(error);
    }
);


export default axiosInstance;
