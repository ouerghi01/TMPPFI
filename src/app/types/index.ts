/**
 * CiviAgora Platform - Complete TypeScript DTOs
 * 
 * This file contains all Data Transfer Objects (DTOs) that represent
 * API responses from the backend. These interfaces should match exactly
 * what the backend API returns.
 * 
 * Usage: Import these types in your React components and API service files.
 */

// ==================== Common Types ====================

export type Language = 'fr' | 'de' | 'en';
export type ThemeColor = 'text-blue-600' | 'text-green-600' | 'text-purple-600' | 'text-orange-600' | 'text-red-600' | 'text-teal-600' | 'text-pink-600' | 'text-yellow-600';

export interface LocalizedString {
  fr: string;
  de: string;
  en: string;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiResponse<T> {
  data: T;
  meta?: PaginationMeta;
  timestamp: string;
  success: boolean;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
}

// ==================== User & Auth DTOs ====================

export interface UserDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: 'citizen' | 'moderator' | 'admin' | 'super_admin';
  status: 'active' | 'inactive' | 'suspended';
  emailVerified: boolean;
  phoneNumber?: string;
  address?: AddressDTO;
  preferences: UserPreferencesDTO;
  stats: UserStatsDTO;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface AddressDTO {
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  region?: string;
}

export interface UserPreferencesDTO {
  language: Language;
  theme: 'light' | 'dark' | 'system';
  emailNotifications: boolean;
  pushNotifications: boolean;
  favoriteThemes: string[];
  newsDigest: 'daily' | 'weekly' | 'monthly' | 'never';
}

export interface UserStatsDTO {
  totalParticipations: number;
  petitionsSigned: number;
  votesParticipated: number;
  consultationsAttended: number;
  commentsPosted: number;
  proposalsSubmitted: number;
}

export interface AuthTokenDTO {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: 'Bearer';
}

export interface LoginRequestDTO {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequestDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  acceptTerms: boolean;
  language?: Language;
}

export interface AuthResponseDTO {
  user: UserDTO;
  tokens: AuthTokenDTO;
}

// ==================== Theme DTOs ====================

export interface ThemeDTO {
  id: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  icon: string;
  color: ThemeColor;
  colorHex: string;
  active: boolean;
  displayOrder: number;
  stats: ThemeStatsDTO;
  createdAt: string;
  updatedAt: string;
}

export interface ThemeStatsDTO {
  consultations: number;
  petitions: number;
  votes: number;
  assemblies: number;
  participants: number;
}

export interface ThemeWithProcessesDTO extends ThemeDTO {
  recentConsultations: ConsultationSummaryDTO[];
  recentPetitions: PetitionSummaryDTO[];
  recentVotes: VoteSummaryDTO[];
}

// ==================== Consultation DTOs ====================

export type ConsultationStatus = 'draft' | 'open' | 'closed' | 'archived';
export type ConsultationType = 'public_meeting' | 'online_debate' | 'citizen_proposal' | 'expert_hearing' | 'workshop';

export interface ConsultationDTO {
  totalComments: ReactNode;
  totalParticipants: number;
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  themeId: string;
  theme?: ThemeDTO;
  type: ConsultationType;
  status: ConsultationStatus;
  startDate: string;
  endDate: string;
  location?: LocationDTO;
  isOnline: boolean;
  onlineLink?: string;
  capacity?: number;
  registeredParticipants: number;
  author: UserSummaryDTO;
  organizer: OrganizerDTO;
  tags: string[];
  documents: DocumentDTO[];
  images: string[];
  stats: ConsultationStatsDTO;
  phases: ConsultationPhaseDTO[];
  questions: ConsultationQuestionDTO[];
  createdAt: string;
  updatedAt: string;
}

export interface ConsultationSummaryDTO {
  id: string;
  slug: string;
  title: LocalizedString;
  themeId: string;
  type: ConsultationType;
  status: ConsultationStatus;
  startDate: string;
  endDate: string;
  participants: number;
  commentsCount: number;
}

export interface LocationDTO {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface UserSummaryDTO {
  username: ReactNode;
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: string;
}

export interface OrganizerDTO {
  id: string;
  name: LocalizedString;
  type: 'municipal' | 'regional' | 'national' | 'association';
  logo?: string;
  website?: string;
}

export interface DocumentDTO {
  id: string;
  title: string;
  filename: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedAt: string;
  uploadedBy: UserSummaryDTO;
}

export interface ConsultationStatsDTO {
  totalParticipants: number;
  totalComments: number;
  totalVotes: number;
  totalIdeas: number;
  engagementRate: number;
}

export interface ConsultationPhaseDTO {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  startDate: string;
  endDate: string;
  status: 'completed' | 'active' | 'upcoming';
  order: number;
}

export interface ConsultationQuestionDTO {
  id: string;
  question: LocalizedString;
  type: 'open' | 'multiple_choice' | 'rating';
  required: boolean;
  options?: string[];
  order: number;
}

export interface ConsultationCommentDTO {
  id: string;
  consultationId: string;
  author: UserSummaryDTO;
  content: string;
  parentId?: string;
  replies?: ConsultationCommentDTO[];
  likes: number;
  dislikes: number;
  hasLiked?: boolean;
  hasDisliked?: boolean;
  status: 'published' | 'pending' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface CreateConsultationCommentDTO {
  consultationId: string;
  content: string;
  parentId?: string;
}

// ==================== Petition DTOs ====================

export type PetitionStatus = 'draft' | 'open' | 'threshold_reached' | 'in_review' | 'accepted' | 'rejected' | 'closed';

export interface PetitionDTO {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  content: LocalizedString;
  themeId: string;
  theme?: ThemeDTO;
  status: PetitionStatus;
  targetSignatures: number;
  currentSignatures: number;
  progressPercentage: number;
  startDate: string;
  endDate: string;
  author: UserSummaryDTO;
  recipient: RecipientDTO;
  category: 'local' | 'regional' | 'national';
  tags: string[];
  images: string[];
  documents: DocumentDTO[];
  milestones: PetitionMilestoneDTO[];
  updates: PetitionUpdateDTO[];
  hasSigned?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PetitionSummaryDTO {
  id: string;
  slug: string;
  title: LocalizedString;
  themeId: string;
  status: PetitionStatus;
  currentSignatures: number;
  targetSignatures: number;
  progressPercentage: number;
  endDate: string;
}

export interface RecipientDTO {
  id: string;
  name: LocalizedString;
  type: 'mayor' | 'council' | 'ministry' | 'parliament';
  position?: LocalizedString;
}

export interface PetitionMilestoneDTO {
  id: string;
  signatures: number;
  title: LocalizedString;
  description: LocalizedString;
  reached: boolean;
  reachedAt?: string;
}

export interface PetitionUpdateDTO {
  id: string;
  title: LocalizedString;
  content: LocalizedString;
  author: UserSummaryDTO;
  publishedAt: string;
}

export interface SignPetitionDTO {
  petitionId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  anonymous: boolean;
  comment?: string;
}

export interface PetitionSignatureDTO {
  id: string;
  petitionId: string;
  user?: UserSummaryDTO;
  isAnonymous: boolean;
  comment?: string;
  signedAt: string;
}

// ==================== Vote DTOs ====================

export type VoteStatus = 'DRAFT' | 'UPCOMING' | 'OPEN' | 'CLOSED' | 'RESULTS_PUBLISHED';
export type VoteType = 'referendum' | 'consultation' | 'poll' | 'election';
export type VotingMethod = 'single_choice' | 'multiple_choice' | 'ranked_choice' | 'approval';

export interface VoteDTO {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  question: LocalizedString;
  themeId: string;
  theme?: ThemeDTO;
  type: VoteType;
  votingMethod: VotingMethod;
  status: VoteStatus;
  startDate: string;
  endDate: string;
  resultsPublishedAt?: string;
  options: VoteOptionDTO[];
  eligibilityCriteria: EligibilityCriteriaDTO;
  isAnonymous: boolean;
  allowAbstention: boolean;
  requiresVerification: boolean;
  stats: VoteStatsDTO;
  hasVoted?: boolean;
  userVote?: UserVoteDTO;
  organizer: OrganizerDTO;
  documents: DocumentDTO[];
  createdAt: string;
  updatedAt: string;
}
export enum PollType {
  OFFICIAL_ELECTION = 'OFFICIAL_ELECTION',
  YOUTH_POLL = 'YOUTH_POLL',
}

export interface VoteSummaryDTO {
  id: string;
  slug: string;
  title: LocalizedString;
  themeId: string;
  type: VoteType;
  status: VoteStatus;
  startDate: string;
  endDate: string;
  totalVotes: number;
}

export interface VoteOptionDTO {
  votesCount: any;
  id: string;
  label: LocalizedString;
  description?: LocalizedString;
  color?: string;
  order: number;
  votes?: number;
  percentage?: number;
}

export interface EligibilityCriteriaDTO {
  minAge?: number;
  maxAge?: number;
  requiredResidency?: boolean;
  requiredCitizenship?: boolean;
  customCriteria?: string[];
}

export interface VoteStatsDTO {
  totalEligibleVoters: number;
  totalVotes: number;
  participationRate: number;
  abstentions?: number;
  invalidVotes?: number;
}

export interface UserVoteDTO {
  voteId: string;
  selectedOptions: string[];
  votedAt: string;
  verified: boolean;
}

export interface CastVoteDTO {
  voteId: string;
  optionIds: string[];
}

export interface VoteResultsDTO {
  voteId: string;
  status: VoteStatus;
  results: VoteOptionDTO[];
  stats: VoteStatsDTO;
  breakdown: {
    byAge?: Record<string, number>;
    byGender?: Record<string, number>;
    byRegion?: Record<string, number>;
  };
  publishedAt: string;
}

// ==================== Assembly DTOs ====================

export type AssemblyStatus = 'active' | 'inactive' | 'archived';
export type AssemblyType = 'citizens_council' | 'youth_assembly' | 'expert_committee' | 'working_group';
export type MemberRole = 'president' | 'vice_president' | 'secretary' | 'member' | 'observer';

export interface AssemblyDTO {
  title: any;
  id: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  themeId: string;
  theme?: ThemeDTO;
  type: AssemblyType;
  status: AssemblyStatus;
  foundedDate: string;
  totalMembers: number;
  members: AssemblyMemberDTO[];
  nextMeeting?: AssemblyMeetingDTO;
  upcomingMeetings: AssemblyMeetingDTO[];
  pastMeetings: any[];
  workingGroups: WorkingGroupDTO[];
  documents: DocumentDTO[];
  stats: AssemblyStatsDTO;
  createdAt: string;
  updatedAt: string;
}

export interface AssemblySummaryDTO {
  id: string;
  slug: string;
  name: LocalizedString;
  themeId: string;
  type: AssemblyType;
  totalMembers: number;
  nextMeetingDate?: string;
}

export interface AssemblyMemberDTO {
  id: string;
  user: UserSummaryDTO;
  role: MemberRole;
  joinedAt: string;
  bio?: LocalizedString;
  expertise?: string[];
}

export interface AssemblyMeetingDTO {
  id: string;
  assemblyId: string;
  title: LocalizedString;
  description: LocalizedString;
  date: string;
  duration: number;
  location?: LocationDTO;
  isOnline: boolean;
  onlineLink?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  agenda: AgendaItemDTO[];
  attendees?: AssemblyMemberDTO[];
  minutes?: DocumentDTO;
  documents: DocumentDTO[];
  createdAt: string;
}

export interface AgendaItemDTO {
  id: string;
  title: LocalizedString;
  description?: LocalizedString;
  duration: number;
  order: number;
  presenter?: UserSummaryDTO;
}

export interface WorkingGroupDTO {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  lead: UserSummaryDTO;
  members: UserSummaryDTO[];
  focus: LocalizedString;
  status: 'active' | 'completed' | 'on_hold';
  createdAt: string;
}

export interface AssemblyStatsDTO {
  totalMeetings: number;
  totalDecisions: number;
  averageAttendance: number;
  activeWorkingGroups: number;
}

// ==================== Conference DTOs ====================

export type ConferenceStatus = 'upcoming' | 'registration_open' | 'registration_closed' | 'in_progress' | 'completed' | 'cancelled';
export type SessionType = 'keynote' | 'panel' | 'workshop' | 'breakout' | 'networking';

export interface ConferenceDTO {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  themeId: string;
  theme?: ThemeDTO;
  status: ConferenceStatus;
  startDate: string;
  endDate: string;
  location: LocationDTO;
  isHybrid: boolean;
  onlineLink?: string;
  capacity: number;
  registeredCount: number;
  speakers: SpeakerDTO[];
  sessions: SessionDTO[];
  sponsors: SponsorDTO[];
  organizer: OrganizerDTO;
  registrationDeadline: string;
  registrationFee?: number;
  tags: string[];
  images: string[];
  documents: DocumentDTO[];
  agenda: ConferenceAgendaDTO[];
  hasRegistered?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ConferenceSummaryDTO {
  id: string;
  slug: string;
  title: LocalizedString;
  themeId: string;
  status: ConferenceStatus;
  startDate: string;
  endDate: string;
  speakersCount: number;
  registeredCount: number;
}

export interface SpeakerDTO {
  name: any;
  id: string;
  title: LocalizedString;
  organization: string;
  bio: LocalizedString;
  avatar?: string;
  expertise: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  sessions: string[];
}

export interface SessionDTO {
  id: string;
  conferenceId: string;
  title: LocalizedString;
  description: LocalizedString;
  type: SessionType;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  room?: string;
  speakers: SpeakerDTO[];
  capacity?: number;
  registeredCount?: number;
  isRecorded: boolean;
  recordingUrl?: string;
  slides?: DocumentDTO;
  tags: string[];
}

export interface SponsorDTO {
  id: string;
  name: string;
  logo: string;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
  website?: string;
  description?: LocalizedString;
}

export interface ConferenceAgendaDTO {
  date: string;
  sessions: SessionDTO[];
}

export interface ConferenceRegistrationDTO {
  conferenceId: string;
  sessions?: string[];
  attendeeInfo: {
    firstName: string;
    lastName: string;
    email: string;
    organization?: string;
    dietaryRestrictions?: string;
    accessibility?: string;
  };
}

// ==================== Notification DTOs ====================

export type NotificationType = 'consultation' | 'petition' | 'vote' | 'assembly' | 'conference' | 'comment' | 'system';
export type NotificationPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface NotificationDTO {
  id: string;
  userId: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: LocalizedString;
  message: LocalizedString;
  actionUrl?: string;
  actionLabel?: LocalizedString;
  read: boolean;
  readAt?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  expiresAt?: string;
}

export interface NotificationPreferencesDTO {
  emailNotifications: {
    consultations: boolean;
    petitions: boolean;
    votes: boolean;
    assemblies: boolean;
    conferences: boolean;
    comments: boolean;
    digest: 'daily' | 'weekly' | 'never';
  };
  pushNotifications: {
    enabled: boolean;
    consultations: boolean;
    petitions: boolean;
    votes: boolean;
    urgent: boolean;
  };
}

// ==================== Youth Engagement DTOs ====================

export type YouthPollQuestionType = 'single_choice' | 'multiple_choice' | 'rating' | 'emoji' | 'yes_no';
export type YouthPollStatus = 'draft' | 'active' | 'closed' | 'archived';
export type YouthPollTargetAge = '12-15' | '16-18' | '19-25' | 'all';

export interface YouthPollOptionDTO {
  id: string;
  text: LocalizedString;
  emoji?: string;
  voteCount: number;
  percentage?: number;
}

export interface YouthPollQuestionDTO {
  id: string;
  question: LocalizedString;
  type: YouthPollQuestionType;
  required: boolean;
  options: YouthPollOptionDTO[];
  maxSelections?: number; // for multiple_choice
  minRating?: number; // for rating
  maxRating?: number; // for rating
}

export interface YouthPollDTO {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  imageUrl?: string;
  themeId: string;
  themeName?: LocalizedString;
  organizer: OrganizerDTO;
  status: YouthPollStatus;
  targetAge: YouthPollTargetAge;
  questions: YouthPollQuestionDTO[];
  totalResponses: number;
  estimatedDuration: number; // in minutes
  createdAt: string;
  startDate: string;
  endDate: string;
  publishedAt?: string;
  tags: string[];
  featured: boolean;
  gamificationPoints: number; // points earned for completing
  hasUserResponded?: boolean;
}

export interface YouthPollResponseDTO {
  id: string;
  pollId: string;
  userId: string;
  responses: {
    questionId: string;
    selectedOptions: string[]; // option IDs
    rating?: number;
  }[];
  submittedAt: string;
}

export interface YouthSpaceStatsDTO {
  totalPolls: number;
  activePolls: number;
  totalParticipants: number;
  userPoints: number;
  completedPolls: number;
  upcomingPolls: number;
}

export interface CreateYouthPollResponseDTO {
  pollId: string;
  responses: {
    questionId: string;
    selectedOptions: string[];
    rating?: number;
  }[];
}

// ==================== Activity / History DTOs ====================

export type ActivityType = 'consultation_attended' | 'petition_signed' | 'vote_cast' | 'comment_posted' | 'proposal_submitted' | 'assembly_joined' | 'conference_registered';

export interface ActivityDTO {
  id: string;
  userId: string;
  type: ActivityType;
  title: LocalizedString;
  description?: LocalizedString;
  themeId: string;
  resourceId: string;
  resourceType: 'consultation' | 'petition' | 'vote' | 'assembly' | 'conference';
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface ParticipationHistoryDTO {
  consultations: ConsultationParticipationDTO[];
  petitions: PetitionParticipationDTO[];
  votes: VoteParticipationDTO[];
  assemblies: AssemblyParticipationDTO[];
  conferences: ConferenceParticipationDTO[];
}

export interface ConsultationParticipationDTO {
  consultation: ConsultationSummaryDTO;
  participatedAt: string;
  commentsCount: number;
  ideasSubmitted: number;
}

export interface PetitionParticipationDTO {
  petition: PetitionSummaryDTO;
  signedAt: string;
  comment?: string;
}

export interface VoteParticipationDTO {
  vote: VoteSummaryDTO;
  votedAt: string;
  verified: boolean;
}

export interface AssemblyParticipationDTO {
  assembly: AssemblySummaryDTO;
  role: MemberRole;
  joinedAt: string;
  meetingsAttended: number;
}

export interface ConferenceParticipationDTO {
  conference: ConferenceSummaryDTO;
  registeredAt: string;
  sessionsAttended: number;
}

// ==================== Statistics DTOs ====================

export interface DashboardStatsDTO {
  overview: {
    activeConsultations: number;
    openPetitions: number;
    ongoingVotes: number;
    totalParticipants: number;
  };
  trends: {
    participationGrowth: number;
    consultationsGrowth: number;
    petitionsGrowth: number;
    votesGrowth: number;
  };
  byTheme: ThemeStatsDTO[];
  recentActivity: ActivityDTO[];
  upcomingEvents: UpcomingEventDTO[];
}

export interface UpcomingEventDTO {
  id: string;
  type: 'consultation' | 'vote' | 'assembly_meeting' | 'conference';
  title: LocalizedString;
  date: string;
  themeId: string;
}

export interface AnalyticsDTO {
  period: 'week' | 'month' | 'quarter' | 'year';
  startDate: string;
  endDate: string;
  participation: {
    total: number;
    byType: Record<string, number>;
    byDay: Array<{ date: string; count: number }>;
  };
  demographics: {
    byAge: Record<string, number>;
    byGender: Record<string, number>;
    byRegion: Record<string, number>;
  };
  engagement: {
    averageTimeSpent: number;
    returnRate: number;
    completionRate: number;
  };
}

// ==================== Search DTOs ====================

export type SearchResultType = 'consultation' | 'petition' | 'vote' | 'assembly' | 'conference' | 'document';

export interface SearchRequestDTO {
  query: string;
  filters?: {
    types?: SearchResultType[];
    themeIds?: string[];
    status?: string[];
    dateFrom?: string;
    dateTo?: string;
  };
  sort?: 'relevance' | 'date' | 'popularity';
  page?: number;
  limit?: number;
}

export interface SearchResultDTO {
  id: string;
  type: SearchResultType;
  title: LocalizedString;
  description: LocalizedString;
  themeId: string;
  url: string;
  highlight?: string;
  relevanceScore: number;
  metadata?: Record<string, any>;
}

export interface SearchResponseDTO {
  results: SearchResultDTO[];
  meta: PaginationMeta & {
    totalResults: number;
    searchTime: number;
  };
  suggestions?: string[];
  filters: {
    availableThemes: ThemeDTO[];
    availableStatuses: string[];
  };
}

// ==================== Signalement DTOs ====================

export type SignalementStatus =
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'IN_PROGRESS'
  | 'RESOLVED'
  | 'REJECTED'
  | 'ARCHIVED';

export type SignalementCategory =
  | 'INFRASTRUCTURE'
  | 'CLEANLINESS'
  | 'SAFETY'
  | 'ENVIRONMENT'
  | 'PUBLIC_SPACE'
  | 'TRANSPORT'
  | 'NOISE'
  | 'OTHER';

export type SignalementPriority =
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'URGENT';


export interface SignalementDTO {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  category: SignalementCategory;
  status: SignalementStatus;
  priority: SignalementPriority;
  themeId: string;
  theme?: ThemeDTO;
  location: LocationDTO;
  images: string[];
  author: UserSummaryDTO;
  assignedTo?: UserSummaryDTO;
  upvotes: number;
  hasUpvoted?: boolean;
  history: SignalementHistoryDTO[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

export interface GeoSignalementDTO {
  id: string;
  title: LocalizedString;
  category: SignalementCategory;
  status: SignalementStatus;
  priority: SignalementPriority;
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
  };
  createdAt: string;
}

export interface SignalementHistoryDTO {
  id: string;
  signalementId: string;
  status: SignalementStatus;
  comment?: LocalizedString;
  updatedBy: UserSummaryDTO;
  createdAt: string;
}

export interface CreateSignalementDTO {
  title: LocalizedString;
  description: LocalizedString;
  category: SignalementCategory;
  themeId: string;
  location: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  images?: File[];
}

export interface SignalementSummaryDTO {
  id: string;
  title: LocalizedString;
  category: SignalementCategory;
  status: SignalementStatus;
  location: string;
  upvotes: number;
  createdAt: string;
}

export interface SignalementStatsDTO {
  total: number;
  byStatus: Record<SignalementStatus, number>;
  byCategory: Record<SignalementCategory, number>;
  averageResolutionTime: number;
  resolutionRate: number;
}

// ==================== AI Assistant DTOs ====================

export type AIMessageRole = 'user' | 'assistant' | 'system';
export type AIConversationContext = 'general' | 'consultation' | 'petition' | 'vote' | 'assembly' | 'conference' | 'signalement' | 'theme';

export interface AIMessageDTO {
  id: string;
  role: AIMessageRole;
  content: LocalizedString;
  timestamp: string;
  context?: {
    type: AIConversationContext;
    entityId?: string;
    entityName?: LocalizedString;
  };
}

export interface AIConversationDTO {
  id: string;
  userId: string;
  title: LocalizedString;
  messages: AIMessageDTO[];
  context?: {
    type: AIConversationContext;
    entityId?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AISummaryDTO {
  id: string;
  entityType: AIConversationContext;
  entityId: string;
  summary: LocalizedString;
  keyPoints: LocalizedString[];
  relevantThemes: string[];
  participationLevel?: {
    current: number;
    target: number;
    percentage: number;
  };
  createdAt: string;
}

export interface AIExplanationDTO {
  id: string;
  topic: LocalizedString;
  explanation: LocalizedString;
  examples?: LocalizedString[];
  relatedLinks?: {
    label: LocalizedString;
    url: string;
  }[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  createdAt: string;
}

export interface AISuggestionDTO {
  id: string;
  type: 'process' | 'action' | 'resource';
  title: LocalizedString;
  description: LocalizedString;
  relevanceScore: number;
  actionUrl?: string;
  actionLabel?: LocalizedString;
  metadata?: Record<string, any>;
}

export interface AIQuickAnswerDTO {
  question: LocalizedString;
  answer: LocalizedString;
  category: 'platform' | 'participation' | 'technical' | 'legal';
  tags: string[];
}

export interface AIAnalysisDTO {
  entityType: AIConversationContext;
  entityId: string;
  sentiment?: {
    positive: number;
    neutral: number;
    negative: number;
  };
  trends?: {
    label: LocalizedString;
    value: number;
    change: number;
  }[];
  recommendations: LocalizedString[];
  generatedAt: string;
}

export interface AIAskRequestDTO {
  question: string;
  context?: {
    type: AIConversationContext;
    entityId?: string;
  };
  conversationId?: string;
  language: Language;
}

export interface AIAskResponseDTO {
  conversationId: string;
  message: AIMessageDTO;
  suggestions?: AISuggestionDTO[];
  relatedContent?: {
    type: string;
    id: string;
    title: LocalizedString;
  }[];
}

// ==================== Legislative Participation DTOs ====================

export type LegislativeTextType = 'law' | 'regulation' | 'decree' | 'ordinance' | 'amendment';
export type ArticleStatus = 'draft' | 'published' | 'amended' | 'repealed';

/**
 * Legislative Consultation - Extends ConsultationDTO with legislative-specific fields
 */
export interface LegislativeConsultationDTO {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  themeId: string;
  theme?: ThemeDTO;
  textType: LegislativeTextType;
  referenceNumber?: string;
  status: ConsultationStatus;
  startDate: string;
  endDate: string;
  author: UserSummaryDTO;
  organizer: OrganizerDTO;
  articles: ArticleDTO[];
  stats: LegislativeConsultationStatsDTO;
  summary?: LegislativeSummaryDTO;
  documents: DocumentDTO[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Legislative Article - Individual article within a legislative text
 */
export interface ArticleDTO {
  id: string;
  consultationId: string;
  articleNumber: string;
  title?: LocalizedString;
  content: LocalizedString;
  order: number;
  status: ArticleStatus;
  parentArticleId?: string;
  subArticles?: ArticleDTO[];
  annotations: ArticleAnnotationDTO[];
  stats: ArticleStatsDTO;
  createdAt: string;
  updatedAt: string;
}

/**
 * Article Annotation - Comment on a specific article
 */
export interface ArticleAnnotationDTO {
  id: string;
  articleId: string;
  author: UserSummaryDTO;
  content: string;
  position?: {
    start: number;
    end: number;
    highlightedText?: string;
  };
  parentId?: string;
  replies?: ArticleAnnotationDTO[];
  votes: ArticleAnnotationVotesDTO;
  hasUpvoted?: boolean;
  hasDownvoted?: boolean;
  status: 'published' | 'pending' | 'rejected' | 'highlighted';
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Votes on article annotations
 */
export interface ArticleAnnotationVotesDTO {
  upvotes: number;
  downvotes: number;
  score: number;
}

/**
 * Statistics for a legislative consultation
 */
export interface LegislativeConsultationStatsDTO {
  totalArticles: number;
  totalAnnotations: number;
  totalParticipants: number;
  totalVotes: number;
  articlesWithAnnotations: number;
  averageAnnotationsPerArticle: number;
  engagementRate: number;
}

/**
 * Statistics for an individual article
 */
export interface ArticleStatsDTO {
  annotationsCount: number;
  participantsCount: number;
  totalVotes: number;
  sentiment?: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

/**
 * AI-generated summary of a legislative consultation
 */
export interface LegislativeSummaryDTO {
  id: string;
  consultationId: string;
  overview: LocalizedString;
  keyArticles: {
    articleId: string;
    articleNumber: string;
    summary: LocalizedString;
    controversyLevel: 'low' | 'medium' | 'high';
    topConcerns: LocalizedString[];
  }[];
  participationInsights: {
    mostDiscussedArticles: string[];
    commonThemes: LocalizedString[];
    sentimentTrend: 'positive' | 'neutral' | 'negative' | 'mixed';
  };
  recommendations: LocalizedString[];
  generatedAt: string;
}

/**
 * Summary DTO for legislative consultation lists
 */
export interface LegislativeConsultationSummaryDTO {
  id: string;
  slug: string;
  title: LocalizedString;
  textType: LegislativeTextType;
  themeId: string;
  status: ConsultationStatus;
  startDate: string;
  endDate: string;
  articlesCount: number;
  annotationsCount: number;
  participantsCount: number;
}

/**
 * Request DTO to create an article annotation
 */
export interface CreateArticleAnnotationDTO {
  articleId: string;
  content: string;
  position?: {
    start: number;
    end: number;
    highlightedText?: string;
  };
  parentId?: string;
}

/**
 * Request DTO to vote on an annotation
 */
export interface VoteOnAnnotationDTO {
  annotationId: string;
  voteType: 'upvote' | 'downvote';
}

// ==================== IVR (Interactive Voice Response) DTOs ====================

export type IVRAccessibilityChannel = 'phone' | 'sms' | 'automated_call';
export type IVRResponseStatus = 'completed' | 'partial' | 'abandoned';
export type IVRParticipationType = 'consultation' | 'vote' | 'petition' | 'poll' | 'survey';

/**
 * IVR Response - Individual response from a phone/SMS participant
 */
export interface IVRResponseDTO {
  id: string;
  channel: IVRAccessibilityChannel;
  phoneNumber: string; // anonymized for privacy
  participationType: IVRParticipationType;
  processId: string; // ID of the consultation, vote, petition, etc.
  processTitle: LocalizedString;
  responses: {
    questionId: string;
    questionText: LocalizedString;
    answer: string;
    answeredAt: string;
  }[];
  status: IVRResponseStatus;
  language: Language;
  duration: number; // in seconds
  completedAt?: string;
  createdAt: string;
  region?: string; // geographic region for stats
  demographicData?: {
    ageRange?: '18-25' | '26-35' | '36-50' | '51-65' | '65+';
    accessibilityNeeds?: boolean;
  };
}

/**
 * IVR Statistics - Aggregated stats for IVR participation
 */
export interface IVRStatsDTO {
  totalResponses: number;
  completedResponses: number;
  partialResponses: number;
  abandonedResponses: number;
  byChannel: {
    phone: number;
    sms: number;
    automated_call: number;
  };
  byLanguage: {
    fr: number;
    de: number;
    en: number;
  };
  byParticipationType: {
    consultation: number;
    vote: number;
    petition: number;
    poll: number;
    survey: number;
  };
  averageDuration: number; // in seconds
  peakHours: {
    hour: number;
    responseCount: number;
  }[];
  geographicDistribution: {
    region: string;
    count: number;
    percentage: number;
  }[];
  accessibilityImpact: {
    totalAccessibilityUsers: number;
    percentageOfTotal: number;
  };
  timeSeriesData: {
    date: string;
    responses: number;
  }[];
}

/**
 * IVR Campaign - Configuration for an IVR outreach campaign
 */
export interface IVRCampaignDTO {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  participationType: IVRParticipationType;
  processId: string;
  channels: IVRAccessibilityChannel[];
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed';
  startDate: string;
  endDate: string;
  targetAudience?: {
    regions?: string[];
    ageRanges?: string[];
    languages?: Language[];
  };
  script: {
    language: Language;
    greeting: string;
    questions: {
      id: string;
      text: string;
      type: 'yes_no' | 'numeric' | 'choice' | 'open';
      options?: string[];
    }[];
    closing: string;
  }[];
  stats: {
    totalCalls: number;
    completedCalls: number;
    responses: number;
  };
  createdAt: string;
  updatedAt: string;
}

/**
 * IVR Summary for a specific process (consultation, vote, etc.)
 */
export interface IVRProcessSummaryDTO {
  processId: string;
  processType: IVRParticipationType;
  processTitle: LocalizedString;
  totalIVRResponses: number;
  totalOnlineResponses: number;
  ivrPercentage: number;
  responsesByChannel: {
    channel: IVRAccessibilityChannel;
    count: number;
    percentage: number;
  }[];
  topRegions: {
    region: string;
    count: number;
  }[];
  insights: LocalizedString[];
}

// ==================== Moderation DTOs ====================

export type ModerationStatus = 'pending' | 'approved' | 'rejected' | 'flagged' | 'escalated';
export type ModerationPriority = 'low' | 'medium' | 'high' | 'urgent';
export type ModerationContentType = 'proposal' | 'comment' | 'petition' | 'signalement' | 'annotation' | 'poll_response' | 'user_profile';
export type ModerationAction = 'approve' | 'reject' | 'flag' | 'escalate' | 'request_changes' | 'ban_user';
export type ModerationRuleType = 'keyword' | 'spam' | 'profanity' | 'duplicate' | 'length' | 'custom';

/**
 * Moderation Item - A piece of content that needs moderation
 */
export interface ModerationItemDTO {
  id: string;
  contentType: ModerationContentType;
  contentId: string;
  processId?: string; // linked consultation, vote, etc.
  processTitle?: LocalizedString;
  author: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    reputation: number;
    warningsCount: number;
  };
  content: {
    title?: LocalizedString;
    text: LocalizedString;
    attachments?: string[];
  };
  status: ModerationStatus;
  priority: ModerationPriority;
  themeId?: string;
  theme?: ThemeDTO;
  automatedFlags?: {
    ruleId: string;
    ruleName: LocalizedString;
    confidence: number; // 0-100
    reason: LocalizedString;
  }[];
  reportsCount: number; // number of user reports
  moderationHistory: ModerationActionHistoryDTO[];
  assignedTo?: {
    id: string;
    name: string;
  };
  createdAt: string;
  submittedAt: string;
  moderatedAt?: string;
  dueDate?: string; // SLA deadline
}

/**
 * Moderation Action History - Track all moderation actions
 */
export interface ModerationActionHistoryDTO {
  id: string;
  moderatorId: string;
  moderatorName: string;
  action: ModerationAction;
  reason?: LocalizedString;
  comment?: string;
  previousStatus: ModerationStatus;
  newStatus: ModerationStatus;
  metadata?: Record<string, any>;
  performedAt: string;
}

/**
 * Moderation Statistics - Aggregated moderation metrics
 */
export interface ModerationStatsDTO {
  overview: {
    totalPending: number;
    totalApproved: number;
    totalRejected: number;
    totalFlagged: number;
    averageProcessingTime: number; // in minutes
    slaCompliance: number; // percentage
  };
  byPriority: {
    urgent: number;
    high: number;
    medium: number;
    low: number;
  };
  byContentType: {
    proposals: number;
    comments: number;
    petitions: number;
    signalements: number;
    annotations: number;
    pollResponses: number;
    userProfiles: number;
  };
  byModerator: {
    moderatorId: string;
    moderatorName: string;
    approved: number;
    rejected: number;
    avgProcessingTime: number;
  }[];
  trends: {
    date: string;
    pending: number;
    approved: number;
    rejected: number;
    flagged: number;
  }[];
  automatedDetection: {
    totalFlagged: number;
    truePositives: number;
    falsePositives: number;
    accuracy: number; // percentage
  };
}

/**
 * Moderation Rule - Automated moderation rule configuration
 */
export interface ModerationRuleDTO {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  type: ModerationRuleType;
  enabled: boolean;
  severity: ModerationPriority;
  action: 'flag' | 'auto_reject' | 'notify' | 'escalate';
  conditions: {
    keywords?: string[]; // words to match
    pattern?: string; // regex pattern
    minLength?: number;
    maxLength?: number;
    threshold?: number; // confidence threshold
  };
  appliesTo: ModerationContentType[];
  stats: {
    totalMatches: number;
    truePositives: number;
    falsePositives: number;
    lastTriggered?: string;
  };
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

/**
 * Moderation Queue Configuration - Configure moderation workflow
 */
export interface ModerationQueueConfigDTO {
  id: string;
  name: LocalizedString;
  contentTypes: ModerationContentType[];
  priorityThresholds: {
    urgent: number; // minutes before escalation
    high: number;
    medium: number;
    low: number;
  };
  assignmentRules: {
    autoAssign: boolean;
    roundRobin: boolean;
    maxItemsPerModerator: number;
  };
  escalationRules: {
    enabled: boolean;
    escalateAfter: number; // minutes
    escalateTo: string[]; // user IDs
    notifyOnEscalation: boolean;
  };
  sla: {
    targetResponseTime: number; // minutes
    targetResolutionTime: number; // minutes
    notifyOnBreach: boolean;
  };
}

/**
 * User Report - User-submitted report about content
 */
export interface UserReportDTO {
  id: string;
  reportedContentType: ModerationContentType;
  reportedContentId: string;
  reportedBy: {
    id: string;
    name: string;
  };
  reportedUser: {
    id: string;
    name: string;
  };
  reason: 'spam' | 'inappropriate' | 'offensive' | 'misinformation' | 'harassment' | 'other';
  description: string;
  status: 'new' | 'under_review' | 'resolved' | 'dismissed';
  resolution?: {
    resolvedBy: string;
    action: string;
    comment: string;
    resolvedAt: string;
  };
  createdAt: string;
}

/**
 * Moderation Filter Parameters
 */
export interface ModerationFilterDTO {
  status?: ModerationStatus[];
  priority?: ModerationPriority[];
  contentType?: ModerationContentType[];
  themeIds?: string[];
  assignedTo?: string;
  dateFrom?: string;
  dateTo?: string;
  searchQuery?: string;
  hasAutomatedFlags?: boolean;
  hasUserReports?: boolean;
  sortBy?: 'createdAt' | 'priority' | 'dueDate' | 'reportsCount';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Bulk Moderation Action Request
 */
export interface BulkModerationActionDTO {
  itemIds: string[];
  action: ModerationAction;
  reason?: LocalizedString;
  comment?: string;
  notifyAuthors?: boolean;
}

/**
 * Moderation Action Request
 */
export interface PerformModerationActionDTO {
  itemId: string;
  action: ModerationAction;
  reason?: LocalizedString;
  comment?: string;
  notifyAuthor?: boolean;
  metadata?: Record<string, any>;
}

// ==================== Export types ====================

export type {
  // Re-export all types for easier imports
  Language,
  ThemeColor,
};