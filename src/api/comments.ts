import apiClient from "../client";


export const getCommentsByConsultation = async (
    moduleId: string
): Promise<any[]> => {
    try {
        const response = await apiClient.get<Comment[]>('/public/comments', {
            params: {
                moduleType: 'CONSULTATION',
                moduleId,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};

export const getCommentReplies = async (
    commentId: string
): Promise<any[]> => {
    try {
        const response = await apiClient.get<any[]>(`/comments/${commentId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching replies:', error);
        throw error;
    }
};
