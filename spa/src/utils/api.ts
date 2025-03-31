const BASE_URL = 'http://localhost:8000';
import axios, {axiosAuth, api} from "./axios";

const URLs = (id: number | null = null) => ({
    REGISTER: BASE_URL + '/api/register',
    LOGIN: BASE_URL + '/api/login',
    LOGOUT: BASE_URL + '/api/logout',
    ME: BASE_URL + '/api/me',
    USER: BASE_URL + '/api/user',
})

const CONTENT_TYPE_CONFIG = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}

export const registerApi = (json: string) => {
    return api.post(URLs().REGISTER, json, CONTENT_TYPE_CONFIG);
}

export const loginApi = (json: string) => {
    return api.post(URLs().LOGIN, json, CONTENT_TYPE_CONFIG);
}

export const logoutApi = () => {
    return api.post(URLs().LOGOUT, {}, CONTENT_TYPE_CONFIG);
}

export const meApi = () => {
    return api.get(URLs().ME);
}

export const userApi = () => {
    return api.get(URLs().USER);
}