

import { Cliente } from '../interfaces/Cliente';
import axiosInstance from './axios';

interface LoginResponse {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    jti: string;
}

export const loginRequest = async (username: string, password: string) => {
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);

    return axiosInstance.post<LoginResponse>('/oauth/token', params, {
        auth: {
            username: 'patitoApp', // Reemplaza con tu client ID
            password: 'p4t1t0!', // Reemplaza con tu client secret
        },
        withCredentials: false,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });
};

export const registerRequest = async (cliente: Cliente) => axiosInstance.post(`/api/auth/registrarse`, cliente);
