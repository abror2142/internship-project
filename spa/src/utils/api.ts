const BASE_URL = 'http://localhost:8000';
import { api } from "./axios";

const URLs = (id: number | null = null) => ({
    REGISTER: BASE_URL + '/api/register',
    LOGIN: BASE_URL + '/api/login',
    LOGOUT: BASE_URL + '/api/logout',
    ME: BASE_URL + '/api/me',
    USER: BASE_URL + '/api/user',

    USERS: BASE_URL + '/api/users',
    USERS_UNBLOCK: BASE_URL + '/api/users/unblock',
    USERS_BLOCK: BASE_URL + '/api/users/block',
    USERS_DELETE: BASE_URL + '/api/users/delete-list',
    USERS_MAKE_ADMIN: BASE_URL + '/api/users/make-admin',
    USERS_REMOVE_ADMIN: BASE_URL + '/api/users/remove-admin',
    USERS_UPDATE_STORAGE: BASE_URL + '/api/users/storage',
    USERS_STORAGE_INFO: BASE_URL + '/api/user/storage-info',

    SETTINGS: BASE_URL + '/api/settings',
    TAGS: BASE_URL + '/api/tags',

    FILES: BASE_URL + '/api/files',
    FILES_RECENT: BASE_URL + '/api/files/recent',
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

export const getStorageInfo = () => {
    return api.get(URLs().USERS_STORAGE_INFO);
}

export const getUsersList = (page: number | null = null) => {
    if(page !== null){
        const url = new URL(URLs().USERS);
        url.searchParams.set("page", page.toString());
        return api.get(url.toString());
    }
    return api.get(URLs().USERS);
}

export const blockUsers = (json: string) => {
    return api.post(URLs().USERS_BLOCK, json);
}

export const unblockUsers = (json: string) => {
    return api.post(URLs().USERS_UNBLOCK, json);
}

export const deleteUsers = (json: string) => {
    return api.post(URLs().USERS_DELETE, json);
}

export const makeAdmin = (json: string) => {
    return api.post(URLs().USERS_MAKE_ADMIN, json);
}

export const removeAdmin = (json: string) => {
    return api.post(URLs().USERS_REMOVE_ADMIN, json);
}

export const updateStorage = (json: string) => {
    return api.post(URLs().USERS_UPDATE_STORAGE, json);
}

export const updateSettings = (json: string) => {
    return api.post(URLs().SETTINGS, json);
}

export const getSettings = () => {
    return api.get(URLs().SETTINGS);
}

export const getTags = () => {
    return api.get(URLs().TAGS);
}

export const createFile = (json: string) => {
    return api.post(URLs().FILES, json);
}

export const getFiles = () => {
    return api.get(URLs().FILES);
}

export const getRecentFiles = () => {
    return api.get(URLs().FILES_RECENT);
}