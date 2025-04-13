import axios from "axios";

const BASE_URL = 'http://127.0.0.1:8000/api';

export const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: 'application/json'
    }
});

apiClient.interceptors.request.use((config) => {
    // Set token for Authenticating requests
    const token = localStorage.getItem('token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    // Set content-type for methods other than GET
    if(config.method != 'get') {
        config.headers["Content-Type"] = 'application/json';
    }

    return config;
}, (error) => Promise.reject(error));

