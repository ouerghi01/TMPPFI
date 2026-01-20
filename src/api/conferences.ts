import apiClient from "../client";

export const getConferencesApi = async () => {
  try {
    const response = await apiClient.get<any[]>('/public/conferences');
    return response.data;
  } catch (error) {
    console.error('Error fetching conferences:', error);
    throw error;
  }

}