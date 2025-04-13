import { useEffect } from "react";
import { apiClient } from "../api/apiClient";
import { useLocation } from "react-router-dom";

export const useQueryParamsInterceptor = () => {
    const { search } = useLocation();
    
    useEffect(() => {
        const interceptor = apiClient.interceptors.request.use((config) => {
            const params = new URLSearchParams(search);
            const paramsObject: Record<string, string> = {};
            params.forEach((value, key) => {
                paramsObject[key] = value;
            })

            config.params = {
                ...config.params,
                ...paramsObject
            }

            return config;
        }, (error) => Promise.reject(error));

        return () => {
            apiClient.interceptors.request.eject(interceptor);
        };
    }, [search]);
}