import axios, { AxiosError, AxiosInstance } from 'axios';


// api Axios Instance to handle token error by attempting to refresh
export const api: AxiosInstance = axios.create({
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

const getToken = () => {
    return localStorage.getItem('token');
}

const fetchRefreshToken = async () => {
    return api.post('http://localhost:8000/api/refresh', {}, {headers: {Accept: 'application/json'}, withCredentials: true});
}

api.interceptors.request.use((config) => {
    const token = getToken();
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config;
        if(originalRequest && error.response?.status === 401 && !originalRequest?._retry) {
            originalRequest._retry = true;
            try {
                const resp = await fetchRefreshToken();
                const { token } = resp.data;
                localStorage.setItem('token', token)
                originalRequest.headers.Authorization = `Bearer ${token}`;
                const promise = api(originalRequest)
                console.log(promise);
                return promise;
            } catch(e) {
                console.log('Error during token refresh:', e);
            }
        }
        return Promise.reject(error);
    }
)

