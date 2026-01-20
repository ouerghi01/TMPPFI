import apiClient from "../client";

const getSpeakerById = async (id: string) => {
  try {
    const response = await apiClient.get(`/public/speakers/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching speaker:', error);
    throw error;
  }
};
export default getSpeakerById