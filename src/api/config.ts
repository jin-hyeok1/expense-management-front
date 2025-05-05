import axios from "axios";
import {navigateExternally} from "../navi.ts";
const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            navigateExternally('/login')
        }
        return Promise.reject(error);
    }
);

export default api;