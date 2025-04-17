import { endpoints } from "./endpoints";
import { apiClient } from "../../shared/api/apiClient";
import { userMeSchema } from "../../shared/utils/zod";

export const me = async () => {
    try {
        const response = await apiClient(endpoints.USER_ME);
        const parsed = userMeSchema.safeParse(response.data);

        if(!parsed.success) {
            console.log("Error while parsing the data!", parsed.error);
            throw new Error('Api data mismatch error!');
        } 

        return parsed.data;
    } catch(error) {
        throw error;
    }
}