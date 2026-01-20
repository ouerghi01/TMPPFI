import apiClient from "../client";

export const getConsultations = async () => {
  try {
    const response = await apiClient.get<any[]>('/public/consultations');
    return response.data;
  } catch (error) {
    console.error('Error fetching consultations:', error);
    throw error;
  }

}
export const getConsultationById = async (id: string) => {
  try {
    const response = await apiClient.get<any>(`/public/consultations/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching consultation with id ${id}:`, error);
    throw error;
  }
}
export const getLegislativeConsultationsApi = async () => {
  try {
    const response = await apiClient.get<any[]>(`/public/consultations/type/Legislative`);
    return response.data;
  } catch (error) {
    console.error('Error fetching legislative consultations:', error);
    throw error;
  }
} 