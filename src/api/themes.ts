import apiClient from "../client";

/**
 * Consumes GET /api/v1/themes
 */
export const getThemesApi = async (): Promise<any[]> => {
  try {
    const response = await apiClient.get<any[]>('/public/themes');
    return response.data;
  } catch (error) {
    console.error('Error fetching themes:', error);
    throw error;
  }
};
export const getThemeById = async (id: string): Promise<any> => {
  try {
    const response = await apiClient.get<any>(`/public/themes/${id}`);
    return response.data;
  }
  catch (error) {
    console.error(`Error fetching theme with id ${id}:`, error);
    throw error;
  }
};