import apiClient from "../client";

export const getSignalementsApi = async () => {
    try {
        const response = await apiClient.get<any[]>('/public/signalements/stats');
        return response.data;
    } catch (error) {
        console.error('Error fetching petitions:', error);
        throw error;
    }

}