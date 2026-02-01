import apiClient from '../client';



export const authApi = {
    login: async (email: string, password: string): Promise<any> => {
        const response = await apiClient.post<any>('/auth/login', {
            email,
            password,
        });
        return response.data;
    },
};
