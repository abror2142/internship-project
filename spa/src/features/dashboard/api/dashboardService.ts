import { apiClient } from "../../shared/api/apiClient"
import { claimPaginatedSchema, logsPaginatedSchema, newClaimsCountSchema, userWithRolesSchema } from "../utils/zod";
import { endpoints } from "./endpoints"

export const fetchClaims = async () => {
    try {
        const response = await apiClient.get(endpoints.FETCH_ALL_CLAIMS);
        const parsed = claimPaginatedSchema.safeParse(response.data);
        
        if(!parsed.success) {
            console.log('Error while parsing data!', parsed.error);
            throw new Error('Api data mismatch!');
        }

        return parsed.data;
    } catch(error) {
        throw error;
    }
}

export const fetchNewClaimsCount = async () => {
    try {
        const response = await apiClient.get(endpoints.FETCH_NEW_CLAIMS_COUNT);
        const parsed = newClaimsCountSchema.safeParse(response.data);
        
        if(!parsed.success) {
            console.log('Error while parsing data!', parsed.error);
            throw new Error('Api data mismatch!');
        }

        return parsed.data;
    } catch(error) {
        throw error;
    }
}

export const fetchUser = async (id: number) => {
    try {
        const response = await apiClient.get(endpoints.FETCH_USER(id));
        const parsed = userWithRolesSchema.safeParse(response.data);

        if(!parsed.success) {
            console.log('Error while parsing data!', parsed.error);
            throw new Error('Api data mismatch!');
        }

        return parsed.data;
    } catch(error) {
        throw error;
    }
}

export const fetchLogs = async () => {
    try {
        const response = await apiClient.get(endpoints.FETCH_LOGS);
        const parsed = logsPaginatedSchema.safeParse(response.data);

        if(!parsed.success) {
            console.log('Error while parsing data!', parsed.error);
            throw new Error('Api data mismatch!');
        }

        return parsed.data;
    } catch(error) {
        throw error;
    }
}

export const updateSettings = async (json: string) => {
    try {
        const response = await apiClient.put(endpoints.SETTING, json);
        return response.data;
    } catch(error) {
        throw error;
    }
}

export const updateExtensions = async (json: string) => {
    try {
        const response = await apiClient.put(endpoints.EXTENSIONS, json);
        return response.data;
    } catch(error) {
        throw error;
    }
}