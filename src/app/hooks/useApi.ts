/**
 * CiviAgora - Custom React Hooks for API Data Fetching
 * 
 * These hooks provide a clean interface to fetch data from the API
 * using React Query for caching, loading states, and error handling.
 * 
 * Usage:
 * ```tsx
 * const { data: consultations, isLoading } = useConsultations({ status: 'open' });
 * ```
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../services/api';
import type {
  UserDTO,
  ThemeDTO,
  ConsultationDTO,
  PetitionDTO,
  VoteDTO,
  AssemblyDTO,
  ConferenceDTO,
  SpeakerDTO,
  NotificationDTO,
  ActivityDTO,
  DashboardStatsDTO,
  ParticipationHistoryDTO,
  LoginRequestDTO,
  RegisterRequestDTO,
  LegislativeConsultationDTO,
  LegislativeConsultationSummaryDTO,
  ArticleDTO,
  ArticleAnnotationDTO,
  LegislativeSummaryDTO,
  CreateArticleAnnotationDTO,
  VoteOnAnnotationDTO,
  YouthPollDTO,
  YouthSpaceStatsDTO,
  CreateYouthPollResponseDTO,
} from '../types';

// ==================== Query Keys ====================

export const queryKeys = {
  // User
  currentUser: ['user', 'me'] as const,
  userHistory: ['user', 'history'] as const,
  userNotifications: (unreadOnly?: boolean) => ['user', 'notifications', { unreadOnly }] as const,
  userActivities: ['user', 'activities'] as const,

  // Themes
  themes: ['themes'] as const,
  theme: (id: string) => ['themes', id] as const,

  // Consultations
  consultations: (filters?: Record<string, any>) => ['consultations', filters] as const,
  consultation: (id: string) => ['consultations', id] as const,

  // Petitions
  petitions: (filters?: Record<string, any>) => ['petitions', filters] as const,
  petition: (id: string) => ['petitions', id] as const,

  // Votes
  votes: (filters?: Record<string, any>) => ['votes', filters] as const,
  vote: (id: string) => ['votes', id] as const,

  // Assemblies
  assemblies: (filters?: Record<string, any>) => ['assemblies', filters] as const,
  assembly: (id: string) => ['assemblies', id] as const,

  // Conferences
  conferences: (filters?: Record<string, any>) => ['conferences', filters] as const,
  conference: (id: string) => ['conferences', id] as const,
  speaker: (id: string) => ['speakers', id] as const,

  // Dashboard
  dashboardStats: ['dashboard', 'stats'] as const,

  // Signalements
  signalements: (filters?: Record<string, any>) => ['signalements', filters] as const,
  signalement: (id: string) => ['signalements', id] as const,
  geoSignalements: ['signalements', 'geo'] as const,
  signalementStats: ['signalements', 'stats'] as const,

  // Legislative Consultations
  legislativeConsultations: (filters?: Record<string, any>) => ['legislative-consultations', filters] as const,
  legislativeConsultation: (id: string) => ['legislative-consultations', id] as const,
  legislativeConsultationSummaries: (filters?: Record<string, any>) => ['legislative-consultations', 'summaries', filters] as const,
  articles: (consultationId: string) => ['legislative-consultations', consultationId, 'articles'] as const,
  article: (articleId: string) => ['articles', articleId] as const,
  articleAnnotations: (articleId: string) => ['articles', articleId, 'annotations'] as const,
  legislativeSummary: (consultationId: string) => ['legislative-consultations', consultationId, 'summary'] as const,

  // Youth Polls
  youthPolls: (filters?: Record<string, any>) => ['youth-polls', filters] as const,
  youthPoll: (id: string) => ['youth-polls', id] as const,
  youthSpaceStats: ['youth-polls', 'stats'] as const,
};

// ==================== User Hooks ====================

export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: async () => {
      const response = await apiService.user.getCurrentUser();
      return response.data;
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<UserDTO>) => {
      const response = await apiService.user.updateProfile(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.currentUser });
    },
  });
}

export function useParticipationHistory() {
  return useQuery({
    queryKey: queryKeys.userHistory,
    queryFn: async () => {
      const response = await apiService.user.getParticipationHistory();
      return response.data;
    },
  });
}

export function useNotifications(unreadOnly?: boolean) {
  return useQuery({
    queryKey: queryKeys.userNotifications(unreadOnly),
    queryFn: async () => {
      const response = await apiService.user.getNotifications({ unreadOnly });
      return response.data;
    },
  });
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      const response = await apiService.user.markNotificationAsRead(notificationId);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'notifications'] });
    },
  });
}

export function useActivities() {
  return useQuery({
    queryKey: queryKeys.userActivities,
    queryFn: async () => {
      const response = await apiService.user.getActivities();
      return response.data;
    },
  });
}

// ==================== Auth Hooks ====================

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginRequestDTO) => {
      const response = await apiService.auth.login(credentials);
      return response.data;
    },
    onSuccess: (data) => {
      // Store tokens in localStorage
      localStorage.setItem('accessToken', data.tokens.accessToken);
      localStorage.setItem('refreshToken', data.tokens.refreshToken);
      
      // Update current user cache
      queryClient.setQueryData(queryKeys.currentUser, data.user);
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: RegisterRequestDTO) => {
      const response = await apiService.auth.register(userData);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.tokens.accessToken);
      localStorage.setItem('refreshToken', data.tokens.refreshToken);
      queryClient.setQueryData(queryKeys.currentUser, data.user);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiService.auth.logout();
    },
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      queryClient.clear();
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await apiService.auth.forgotPassword(email);
      return response.data;
    },
  });
}

// ==================== Theme Hooks ====================

export function useThemes() {
  return useQuery({
    queryKey: queryKeys.themes,
    queryFn: async () => {
      const response = await apiService.theme.getThemes();
      return response.data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour (themes rarely change)
  });
}

export function useTheme(id: string) {
  return useQuery({
    queryKey: queryKeys.theme(id),
    queryFn: async () => {
      const response = await apiService.theme.getThemeById(id);
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

// ==================== Consultation Hooks ====================

export function useConsultations(filters?: { status?: string; themeId?: string }) {
  return useQuery({
    queryKey: queryKeys.consultations(filters),
    queryFn: async () => {
      const response = await apiService.consultation.getConsultations(filters);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useConsultation(idOrSlug: string) {
  return useQuery({
    queryKey: queryKeys.consultation(idOrSlug),
    queryFn: async () => {
      const response = await apiService.consultation.getConsultation(idOrSlug);
      return response.data;
    },
    enabled: !!idOrSlug,
  });
}

export function useRegisterForConsultation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (consultationId: string) => {
      const response = await apiService.consultation.registerForConsultation(consultationId);
      return response.data;
    },
    onSuccess: (_, consultationId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.consultation(consultationId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.userHistory });
    },
  });
}

// ==================== Petition Hooks ====================

export function usePetitions(filters?: { status?: string; themeId?: string }) {
  return useQuery({
    queryKey: queryKeys.petitions(filters),
    queryFn: async () => {
      const response = await apiService.petition.getPetitions(filters);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function usePetition(idOrSlug: string) {
  return useQuery({
    queryKey: queryKeys.petition(idOrSlug),
    queryFn: async () => {
      const response = await apiService.petition.getPetition(idOrSlug);
      return response.data;
    },
    enabled: !!idOrSlug,
  });
}

export function useSignPetition() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      petitionId, 
      data 
    }: { 
      petitionId: string; 
      data: { anonymous?: boolean; comment?: string } 
    }) => {
      const response = await apiService.petition.signPetition(petitionId, data);
      return response.data;
    },
    onSuccess: (_, { petitionId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.petition(petitionId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.petitions() });
      queryClient.invalidateQueries({ queryKey: queryKeys.userHistory });
    },
  });
}

// ==================== Vote Hooks ====================

export function useVotes(filters?: { status?: string; themeId?: string }) {
  return useQuery({
    queryKey: queryKeys.votes(filters),
    queryFn: async () => {
      const response = await apiService.vote.getVotes(filters);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useVote(idOrSlug: string) {
  return useQuery({
    queryKey: queryKeys.vote(idOrSlug),
    queryFn: async () => {
      const response = await apiService.vote.getVote(idOrSlug);
      return response.data;
    },
    enabled: !!idOrSlug,
  });
}

export function useCastVote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      voteId, 
      optionIds 
    }: { 
      voteId: string; 
      optionIds: string[] 
    }) => {
      const response = await apiService.vote.castVote(voteId, optionIds);
      return response.data;
    },
    onSuccess: (_, { voteId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.vote(voteId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.votes() });
      queryClient.invalidateQueries({ queryKey: queryKeys.userHistory });
    },
  });
}

// ==================== Assembly Hooks ====================

export function useAssemblies(filters?: { themeId?: string; status?: string }) {
  return useQuery({
    queryKey: queryKeys.assemblies(filters),
    queryFn: async () => {
      const response = await apiService.assembly.getAssemblies(filters);
      return response.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useAssembly(idOrSlug: string) {
  return useQuery({
    queryKey: queryKeys.assembly(idOrSlug),
    queryFn: async () => {
      const response = await apiService.assembly.getAssembly(idOrSlug);
      return response.data;
    },
    enabled: !!idOrSlug,
  });
}

// ==================== Conference Hooks ====================

export function useConferences(filters?: { status?: string; themeId?: string }) {
  return useQuery({
    queryKey: queryKeys.conferences(filters),
    queryFn: async () => {
      const response = await apiService.conference.getConferences(filters);
      return response.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useConference(idOrSlug: string) {
  return useQuery({
    queryKey: queryKeys.conference(idOrSlug),
    queryFn: async () => {
      const response = await apiService.conference.getConference(idOrSlug);
      return response.data;
    },
    enabled: !!idOrSlug,
  });
}

export function useSpeaker(id: string) {
  return useQuery({
    queryKey: queryKeys.speaker(id),
    queryFn: async () => {
      const response = await apiService.conference.getSpeaker(id);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useRegisterForConference() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      conferenceId,
      data,
    }: {
      conferenceId: string;
      data: {
        sessions?: string[];
        attendeeInfo: {
          firstName: string;
          lastName: string;
          email: string;
          organization?: string;
        };
      };
    }) => {
      const response = await apiService.conference.registerForConference(conferenceId, data);
      return response.data;
    },
    onSuccess: (_, { conferenceId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.conference(conferenceId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.userHistory });
    },
  });
}

// ==================== Dashboard Hooks ====================

export function useDashboardStats() {
  return useQuery({
    queryKey: queryKeys.dashboardStats,
    queryFn: async () => {
      const response = await apiService.dashboard.getDashboardStats();
      return response.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchInterval: 1000 * 60 * 10, // Refetch every 10 minutes
  });
}

// ==================== Signalement Hooks ====================

export function useSignalements(filters?: { status?: string; category?: string; themeId?: string }) {
  return useQuery({
    queryKey: queryKeys.signalements(filters),
    queryFn: async () => {
      const response = await apiService.signalement.getSignalements(filters);
      return response.data;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

export function useSignalement(id: string) {
  return useQuery({
    queryKey: queryKeys.signalement(id),
    queryFn: async () => {
      const response = await apiService.signalement.getSignalement(id);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useGeoSignalements() {
  return useQuery({
    queryKey: queryKeys.geoSignalements,
    queryFn: async () => {
      const response = await apiService.signalement.getGeoSignalements();
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useSignalementStats() {
  return useQuery({
    queryKey: queryKeys.signalementStats,
    queryFn: async () => {
      const response = await apiService.signalement.getSignalementStats();
      return response.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useCreateSignalement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: import('../types').CreateSignalementDTO) => {
      const response = await apiService.signalement.createSignalement(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.signalements() });
      queryClient.invalidateQueries({ queryKey: queryKeys.geoSignalements });
      queryClient.invalidateQueries({ queryKey: queryKeys.signalementStats });
    },
  });
}

export function useUpvoteSignalement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiService.signalement.upvoteSignalement(id);
      return response.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.signalement(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.signalements() });
    },
  });
}

export function useRemoveUpvote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiService.signalement.removeUpvote(id);
      return response.data;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.signalement(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.signalements() });
    },
  });
}

// ==================== Legislative Consultation Hooks ====================

export function useLegislativeConsultations(filters?: {
  status?: string;
  themeId?: string;
  textType?: string;
}) {
  return useQuery({
    queryKey: queryKeys.legislativeConsultations(filters),
    queryFn: async () => {
      const response = await apiService.legislativeConsultation.getLegislativeConsultations(filters);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useLegislativeConsultation(id: string) {
  return useQuery({
    queryKey: queryKeys.legislativeConsultation(id),
    queryFn: async () => {
      const response = await apiService.legislativeConsultation.getLegislativeConsultation(id);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useLegislativeConsultationSummaries(filters?: {
  status?: string;
  themeId?: string;
  limit?: number;
}) {
  return useQuery({
    queryKey: queryKeys.legislativeConsultationSummaries(filters),
    queryFn: async () => {
      const response = await apiService.legislativeConsultation.getLegislativeConsultationSummaries(filters);
      return response.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useArticles(consultationId: string) {
  return useQuery({
    queryKey: queryKeys.articles(consultationId),
    queryFn: async () => {
      const response = await apiService.legislativeConsultation.getArticles(consultationId);
      return response.data;
    },
    enabled: !!consultationId,
  });
}

export function useArticle(articleId: string) {
  return useQuery({
    queryKey: queryKeys.article(articleId),
    queryFn: async () => {
      const response = await apiService.legislativeConsultation.getArticle(articleId);
      return response.data;
    },
    enabled: !!articleId,
  });
}

export function useArticleAnnotations(articleId: string) {
  return useQuery({
    queryKey: queryKeys.articleAnnotations(articleId),
    queryFn: async () => {
      const response = await apiService.legislativeConsultation.getArticleAnnotations(articleId);
      return response.data;
    },
    enabled: !!articleId,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

export function useCreateAnnotation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateArticleAnnotationDTO) => {
      const response = await apiService.legislativeConsultation.createAnnotation(data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.articleAnnotations(variables.articleId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.article(variables.articleId) });
    },
  });
}

export function useVoteOnAnnotation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: VoteOnAnnotationDTO) => {
      const response = await apiService.legislativeConsultation.voteOnAnnotation(data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.articleAnnotations(data.articleId) });
    },
  });
}

export function useLegislativeSummary(consultationId: string) {
  return useQuery({
    queryKey: queryKeys.legislativeSummary(consultationId),
    queryFn: async () => {
      const response = await apiService.legislativeConsultation.getLegislativeSummary(consultationId);
      return response.data;
    },
    enabled: !!consultationId,
    staleTime: 1000 * 60 * 30, // 30 minutes (AI summaries change less frequently)
  });
}

// ==================== AI Assistant Hooks ====================

export function useAskAI() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: import('../types').AIAskRequestDTO) => {
      const response = await apiService.ai.ask(request);
      return response.data;
    },
  });
}

export function useAISuggestions() {
  return useQuery({
    queryKey: ['ai', 'suggestions'] as const,
    queryFn: async () => {
      const response = await apiService.ai.getSuggestions();
      return response.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useAIQuickAnswers() {
  return useQuery({
    queryKey: ['ai', 'quick-answers'] as const,
    queryFn: async () => {
      const response = await apiService.ai.getQuickAnswers();
      return response.data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useAIConversations() {
  return useQuery({
    queryKey: ['ai', 'conversations'] as const,
    queryFn: async () => {
      const response = await apiService.ai.getConversations();
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// ==================== Youth Poll Hooks ====================

export function useYouthPolls(filters?: {
  status?: string;
  themeId?: string;
  targetAge?: string;
  featured?: boolean;
}) {
  return useQuery({
    queryKey: queryKeys.youthPolls(filters),
    queryFn: async () => {
      const response = await apiService.youthPoll.getYouthPolls(filters);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useYouthPoll(id: string) {
  return useQuery({
    queryKey: queryKeys.youthPoll(id),
    queryFn: async () => {
      const response = await apiService.youthPoll.getYouthPollById(id);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useYouthSpaceStats() {
  return useQuery({
    queryKey: queryKeys.youthSpaceStats,
    queryFn: async () => {
      const response = await apiService.youthPoll.getYouthSpaceStats();
      return response.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useRespondToYouthPoll() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateYouthPollResponseDTO) => {
      const response = await apiService.youthPoll.submitYouthPollResponse(data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.youthPoll(variables.pollId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.youthPolls() });
      queryClient.invalidateQueries({ queryKey: queryKeys.youthSpaceStats });
      queryClient.invalidateQueries({ queryKey: queryKeys.userHistory });
    },
  });
}