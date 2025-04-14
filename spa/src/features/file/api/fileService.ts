import { apiClient } from "../../shared/api/apiClient";
import { endpoints } from "./endpoints";
import { fileSchema, fileArraySchema, tagsArraySchema, settingsArraySchema, extensionsArraySchema } from "../../shared/utils/zod/FileZod";

export const fetchAllFiles = async () => {
    try {
        const response = await apiClient.get(endpoints.FETCH_ALL_FILES);
        const parsed = fileArraySchema.safeParse(response.data);

        if(!parsed.success){
            console.error("Validation Error with zod!", parsed.error);
            throw new Error('Api data mismatch!');
        }

        return parsed.data;
    } catch(error) {
        throw error;
    }
}

export const createFile = async (json: string) => {
    try {
        const response = await apiClient.post(endpoints.CREATE_FILE, json);
        return response.data;
    } catch(error) {
        throw error;
    }
}

export const fetchFile = async (id: number) => {
    try {
        const response = await apiClient.get(endpoints.FETCH_FILE(id));
        console.log(response.data)
        const parsed = fileSchema.safeParse(response.data);
        
        if(!parsed.success){
            console.error("Validation Error with zod!", parsed.error);
            throw new Error('Api data mismatch!');
        }
        return parsed.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const updateFile = async (id: number, json:string) => {
    try {
        const response = await apiClient.put(endpoints.UPDATE_FILE(id), json);
        return response.data;
    } catch(error) {
        throw error;
    }
}

export const deleteFile = async (id: number) => {
    try {
        const response = await apiClient.put(endpoints.DELETE_FILE(id));
        return response.data;
    } catch(error) {
        throw error;
    }
}

export const fetchAllTags = async () => {
    try {
        const response = await apiClient.get(endpoints.FETCH_ALL_TAGS);
        const parsed = tagsArraySchema.safeParse(response.data);

        if(!parsed.success) {
            console.error("Validation Error with zod!", parsed.error);
            throw new Error('Api data mismatch!');
        }

        return parsed.data;
    } catch(error) {
        throw error;
    }
}

export const downloadFile = async (url: string, filename: string) => {
    try {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';

        xhr.onload = () => {
            const blob = xhr.response;

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;

            a.download = filename;

            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        };

        xhr.open('GET', url);
        xhr.send();
    } catch(error) {
        throw error;
    }
}

export const fetchDownloadUrl = async (id: number) => {
    try {
        const response = await apiClient(endpoints.FETCH_DOWNLOAD_URL(id));
        return response.data;
    } catch(error) {
        throw error;
    }
}

export const fetchSettings = async () => {
    try {
        const response = await apiClient(endpoints.FETCH_SETTINGS);
        const parsed = settingsArraySchema.safeParse(response.data);

        if(!parsed.success) {
            console.error("Validation Error with zod!", parsed.error);
            throw new Error('Api data mismatch!');
        }

        return parsed.data;
    } catch(error) {
        throw error;
    }
}

export const fetchExtensions = async () => {
    try {
        const response = await apiClient(endpoints.FETCH_EXTENSIONS);
        const parsed = extensionsArraySchema.safeParse(response.data);

        if(!parsed.success) {
            console.error("Validation Error with zod!", parsed.error);
            throw new Error('Api data mismatch!');
        }

        return parsed.data;
    } catch(error) {
        throw error;
    }
}
