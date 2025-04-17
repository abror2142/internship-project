import { countriesArraySchema, userInfoSchema } from "../utils/zod/FileZod";
import { apiClient } from "./apiClient";
import { endpoints } from "./endpoints";

export const fetchAllCountries = async () => {
    try {
        const response = await apiClient(endpoints.FETCH_ALL_COUNTRIES);
        const parsed = countriesArraySchema.safeParse(response.data);
        
        if(!parsed.success) {
            console.log('Error while parsing repsonse data.', parsed.error);
            throw Error('Api data mismatch error.');
        }

        return parsed.data;
    } catch(error) {
        throw error;
    }
}

export const fetchUserInfo = async () => {
    try {
        const response = await apiClient(endpoints.FETCH_USER_INFO);
        const parsed = userInfoSchema.safeParse(response.data);
        
        if(!parsed.success) {
            console.log('Error while parsing repsonse data.', parsed.error);
            throw Error('Api data mismatch error.');
        }

        return parsed.data;
    } catch(error) {
        throw error;
    }
}

export const updateUserImage = async (json: string) => {
    try {
       apiClient.put(endpoints.UPDATE_USER_IMAGE, json); 
    } catch (error) {
        throw error;
    }
}

export const updateUserInfo = async (json: string) => {
    try {
       return apiClient.put(endpoints.UPDATE_USER_INFO, json); 
    } catch (error) {
        throw error;
    }
}