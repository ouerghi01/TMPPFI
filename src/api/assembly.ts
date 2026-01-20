import apiClient from "../client";

export const getAssembly = async () => {
  try {
    const response = await apiClient.get<any[]>('/public/assemblies');
    return response.data;
  } catch (error) {
    console.error('Error fetching assemblies:', error);
    throw error;
  }

}