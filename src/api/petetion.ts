import apiClient from "../client";

export const getPetitions = async () => {
  try {
    const response = await apiClient.get<any[]>('/public/initiatives');
    return response.data;
  } catch (error) {
    console.error('Error fetching petitions:', error);
    throw error;
  }

}

export const getPetitionById = async (id: string) => {
  try {
    const response = await apiClient.get<any>(`/public/initiatives/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching petition:', error);
    throw error;
  }
}