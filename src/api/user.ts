import apiClient from "../client";

// create user 
export const createUser = async (user: any): Promise<any> => {
    try {
        const response = await apiClient.post<any>('/auth/register', user);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};
