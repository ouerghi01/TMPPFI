import apiClient from "../client";

export const getSignalementStatsApi = async () => {
    try {
        const response = await apiClient.get<any[]>('/public/signalements/stats');
        return response.data;
    } catch (error) {
        console.error('Error fetching petitions:', error);
        throw error;
    }

}
export const getSignalementsApi = async () => {
    try {
        const response = await apiClient.get<any[]>('/public/signalements');
        return response.data;
    } catch (error) {
        console.error('Error fetching petitions:', error);
        throw error;
    }

}
export const getSignalementsGeoApi = async () => {
    try {
        const response = await apiClient.get<any[]>('/public/signalements/geo');
        return response.data;
    } catch (error) {
        console.error('Error fetching petitions:', error);
        throw error;
    }

}