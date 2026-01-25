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
export const getUserCount = async (): Promise<any> => {
    try {
        const response = await apiClient.get<any>('/auth/users/count');
        return response.data;
    } catch (error) {
        console.error('Error getting user count:', error);
        throw error;
    }
};