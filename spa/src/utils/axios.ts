import axios, { AxiosInstance } from 'axios';

export default axios.create({
    headers: {
        Accept: 'application/json'
    }
})

export function axiosAuth (authToken: string) {
    return axios.create({
        headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: 'application/json'
        }
    })
}

export const api: AxiosInstance = axios.create({
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

let isRefreshing = false;

const 

