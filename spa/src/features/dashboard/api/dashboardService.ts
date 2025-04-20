import { apiClient } from "../../shared/api/apiClient"
import { claimArraySchema, newClaimsCountSchema } from "../utils/zod";
import { endpoints } from "./endpoints"

export const fetchClaims = async () => {
    try {
        const response = await apiClient.get(endpoints.FETCH_ALL_CLAIMS);
        const parsed = claimArraySchema.safeParse(response.data);
        
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