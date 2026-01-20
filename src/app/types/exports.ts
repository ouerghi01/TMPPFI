/**
 * CiviAgora - Centralized Type Exports
 * 
 * This file re-exports all types for convenient imports.
 * Instead of importing from multiple files, import everything from here.
 * 
 * Usage:
 * ```typescript
 * import { ConsultationDTO, PetitionDTO, apiService, useConsultations } from '@/types/exports';
 * ```
 */

// ==================== Re-export all DTOs ====================
export type {
  // Common Types
  Language,
  ThemeColor,
  LocalizedString,
  PaginationMeta,
  ApiResponse,
  ApiError,

  // User & Auth
  UserDTO,
  AddressDTO,
  UserPreferencesDTO,
  UserStatsDTO,
  AuthTokenDTO,
  LoginRequestDTO,
  RegisterRequestDTO,
  AuthResponseDTO,

  // Themes
  ThemeDTO,
  ThemeStatsDTO,
  ThemeWithProcessesDTO,

  // Consultations
  ConsultationStatus,
  ConsultationType,
  ConsultationDTO,
  ConsultationSummaryDTO,
  LocationDTO,
  UserSummaryDTO,
  OrganizerDTO,
  DocumentDTO,
  ConsultationStatsDTO,
  ConsultationPhaseDTO,
  ConsultationQuestionDTO,
  ConsultationCommentDTO,
  CreateConsultationCommentDTO,

  // Petitions
  PetitionStatus,
  PetitionDTO,
  PetitionSummaryDTO,
  RecipientDTO,
  PetitionMilestoneDTO,
  PetitionUpdateDTO,
  SignPetitionDTO,
  PetitionSignatureDTO,

  // Votes
  VoteStatus,
  VoteType,
  VotingMethod,
  VoteDTO,
  VoteSummaryDTO,
  VoteOptionDTO,
  EligibilityCriteriaDTO,
  VoteStatsDTO,
  UserVoteDTO,
  CastVoteDTO,
  VoteResultsDTO,

  // Assemblies
  AssemblyStatus,
  AssemblyType,
  MemberRole,
  AssemblyDTO,
  AssemblySummaryDTO,
  AssemblyMemberDTO,
  AssemblyMeetingDTO,
  AgendaItemDTO,
  WorkingGroupDTO,
  AssemblyStatsDTO,

  // Conferences
  ConferenceStatus,
  SessionType,
  ConferenceDTO,
  ConferenceSummaryDTO,
  SpeakerDTO,
  SessionDTO,
  SponsorDTO,
  ConferenceAgendaDTO,
  ConferenceRegistrationDTO,

  // Notifications
  NotificationType,
  NotificationPriority,
  NotificationDTO,
  NotificationPreferencesDTO,

  // Activities
  ActivityType,
  ActivityDTO,
  ParticipationHistoryDTO,
  ConsultationParticipationDTO,
  PetitionParticipationDTO,
  VoteParticipationDTO,
  AssemblyParticipationDTO,
  ConferenceParticipationDTO,

  // Statistics
  DashboardStatsDTO,
  UpcomingEventDTO,
  AnalyticsDTO,

  // Search
  SearchResultType,
  SearchRequestDTO,
  SearchResultDTO,
  SearchResponseDTO,
} from './index';

// ==================== Re-export API Service ====================
export { apiService, default as api } from '../services/api';

// Individual API modules
export {
  authApi,
  userApi,
  themeApi,
  consultationApi,
  petitionApi,
  voteApi,
  assemblyApi,
  conferenceApi,
  dashboardApi,
  searchApi,
} from '../services/api';

// ==================== Re-export React Hooks ====================
export {
  // Query Keys
  queryKeys,

  // User Hooks
  useCurrentUser,
  useUpdateProfile,
  useParticipationHistory,
  useNotifications,
  useMarkNotificationAsRead,
  useActivities,

  // Auth Hooks
  useLogin,
  useRegister,
  useLogout,
  useForgotPassword,

  // Theme Hooks
  useThemes,
  useTheme,

  // Consultation Hooks
  useConsultations,
  useConsultation,
  useRegisterForConsultation,

  // Petition Hooks
  usePetitions,
  usePetition,
  useSignPetition,

  // Vote Hooks
  useVotes,
  useVote,
  useCastVote,

  // Assembly Hooks
  useAssemblies,
  useAssembly,

  // Conference Hooks
  useConferences,
  useConference,
  useSpeaker,
  useRegisterForConference,

  // Dashboard Hooks
  useDashboardStats,
} from '../hooks/useApi';

// ==================== Re-export Mock Data ====================
export {
  mockApiData,
  mockCurrentUser,
  mockUsers,
  mockThemes,
  mockConsultations,
  mockConsultationSummaries,
  mockPetitions,
  mockPetitionSummaries,
  mockVotes,
  mockVoteSummaries,
  mockAssemblies,
  mockAssemblySummaries,
  mockConferences,
  mockConferenceSummaries,
  mockSpeakers,
  mockNotifications,
  mockActivities,
  mockDashboardStats,
  mockParticipationHistory,
} from '../data/api-mock';

// ==================== Re-export Themes ====================
export {
  themes,
  themesDTO,
  getThemeById,
  getThemeDTOById,
  getThemeBySlug,
  getActiveThemes,
  getThemesSorted,
} from '../data/themes';

export type { Theme } from '../data/themes';