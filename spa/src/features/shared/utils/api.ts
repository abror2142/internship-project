const BASE_URL = 'http://localhost:8000';
import { api } from "./axios";

const URLs = (id: number | null = null) => ({
    REGISTER: BASE_URL + '/api/register',
    LOGIN: BASE_URL + '/api/login',
    LOGOUT: BASE_URL + '/api/logout',
    ME: BASE_URL + '/api/me',
    USER: BASE_URL + '/api/user',
    USER_TAGS: BASE_URL + '/api/my-tags',

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
    TAG_DETAIL: BASE_URL + `/api/tags/${id}`,
    TAGS_MERGE: BASE_URL + '/api/tags/merge',
    TYPES: BASE_URL + '/api/types',
    EXTENTIONS: BASE_URL + '/api/extensions',
    LOGS: BASE_URL + '/api/logs',

    FILES: BASE_URL + '/api/files',
    FILE_DETAIL: BASE_URL + `/api/files/${id}`,
    FILES_RECENT: BASE_URL + '/api/files/recent',
    FILES_DOWNLOAD: BASE_URL + `/api/files/${id}/download`
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

export const tagsMerge = (json: string) => {
    return api.post(URLs().TAGS_MERGE, json);
}

export const getTypes = () => {
    return api.get(URLs().TYPES);
}

export const createExtension = (json: string) => {
    return api.post(URLs().EXTENTIONS, json);
}

export const createFile = (json: FormData, config) => {
    return api.post(URLs().FILES, json, config);
}

export const getFiles = (params: string) => {
    return api.get(URLs().FILES + params);
}

export const updateFile = (id: number, json: string) => {
    return api.put(URLs(id).FILE_DETAIL, json);
}

export const deleteFile = (id: number) => {
    return api.delete(URLs(id).FILE_DETAIL);
}

export const downloadFile = (id: number) => {
    return api.get(URLs(id).FILES_DOWNLOAD);
}

export const getRecentFiles = () => {
    return api.get(URLs().FILES_RECENT);
}

export const getUserTags = () => {
    return api.get(URLs().USER_TAGS);
}

export const deleteTag = (id: number) => {
    return api.delete(URLs(id).TAG_DETAIL);
}

export const getLogs = (params: string) => {
    return api.get(URLs().LOGS + params);
}