import { PollType } from "../app/types";
import apiClient from "../client";

/**
 * Consumes GET /api/v1/public/polls
 */
export const getPollsApi = async (
  pollType: PollType

): Promise<any[]> => {
  try {
    const response = await apiClient.get<any[]>('/public/polls', {
      params: {
        pollType,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching polls:', error);
    throw error;
  }
};