import apiClient from '../client';

export interface LoginResponse {
    userId: any;
    token: string;
}

export const authApi = {
    login: async (email: string, password: string): Promise<LoginResponse> => {
        const response = await apiClient.post<LoginResponse>('/auth/login', {
            email,
            password,
        });
        return response.data;
    },
};
