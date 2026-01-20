/**
 * CiviAgora Platform - API Service Layer
 * 
 * This file contains all API service functions that would normally
 * make HTTP requests to a backend. Currently using mock data,
 * but structured to be easily replaced with real API calls.
 * 
 * Usage in components:
 * ```tsx
 * import { apiService } from '@/services/api';
 * 
 * const consultations = await apiService.getConsultations({ status: 'open' });
 * ```
 */

import {
  type ApiResponse,
  type UserDTO,
  type ThemeDTO,
  type ConsultationDTO,
  type PetitionDTO,
  type VoteDTO,
  type AssemblyDTO,
  type ConferenceDTO,
  type SpeakerDTO,
  type NotificationDTO,
  type ActivityDTO,
  type DashboardStatsDTO,
  type ParticipationHistoryDTO,
  type SearchRequestDTO,
  type SearchResponseDTO,
  type LoginRequestDTO,
  type RegisterRequestDTO,
  type AuthResponseDTO,
  type LegislativeConsultationDTO,
  type LegislativeConsultationSummaryDTO,
  type ArticleDTO,
  type ArticleAnnotationDTO,
  type LegislativeSummaryDTO,
  type CreateArticleAnnotationDTO,
  type VoteOnAnnotationDTO,
  type YouthPollDTO,
  type YouthSpaceStatsDTO,
  type CreateYouthPollResponseDTO,
  type YouthPollResponseDTO,
  type IVRResponseDTO,
  type IVRStatsDTO,
  type IVRCampaignDTO,
  type IVRProcessSummaryDTO,
  type ModerationItemDTO,
  type ModerationStatsDTO,
  type ModerationRuleDTO,
  type UserReportDTO,
  type ModerationFilterDTO,
  type PerformModerationActionDTO,
  type BulkModerationActionDTO,
  PollType,
} from '../types';

import {
  mockCurrentUser,
  mockThemes,
  mockConsultations,
  mockPetitions,
  mockVotes,
  mockAssemblies,
  mockConferences,
  mockSignalements,
  mockGeoSignalements,
  mockSignalementStats,
  mockNotifications,
  mockLegislativeConsultations,
  mockLegislativeConsultationSummaries,
  mockArticles,
  mockArticleAnnotations,
  mockLegislativeSummaries,
  mockYouthPolls,
  mockYouthSpaceStats,
  mockIVRResponses,
  mockIVRStats,
  mockIVRCampaigns,
  mockIVRProcessSummaries,
  mockModerationItems,
  mockModerationStats,
  mockModerationRules,
  mockUserReports,
  mockSpeakers,
  mockDashboardStats,
  mockParticipationHistory,
  mockApiData,
} from '../data/api-mock';
import { getThemesApi } from '../../api/themes';
import { getPetitions } from '../../api/petetion';
import { getAssembly } from '../../api/assembly';
import { getConferencesApi } from '../../api/conferences';
import { getConsultations, getLegislativeConsultationsApi } from '../../api/consultations';
import { getPollsApi } from '../../api/votes';
import { getSignalementsApi } from '../../api/signalements';

// Simulated API delay (remove in production)
const simulateDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// ==================== Auth API ====================

export const authApi = {
  /**
   * Login user
   * POST /api/auth/login
   */
  async login(data: LoginRequestDTO): Promise<ApiResponse<AuthResponseDTO>> {
    await simulateDelay();

    // Mock authentication - in production, this would validate credentials
    return {
      data: {
        user: mockCurrentUser,
        tokens: {
          accessToken: 'mock_access_token_' + Date.now(),
          refreshToken: 'mock_refresh_token_' + Date.now(),
          expiresIn: 3600,
          tokenType: 'Bearer',
        },
      },
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Register new user
   * POST /api/auth/register
   */
  async register(data: RegisterRequestDTO): Promise<ApiResponse<AuthResponseDTO>> {
    await simulateDelay();

    const newUser: UserDTO = {
      id: 'usr_' + Date.now(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: 'citizen',
      status: 'active',
      emailVerified: false,
      preferences: {
        language: data.language || 'fr',
        theme: 'system',
        emailNotifications: true,
        pushNotifications: false,
        favoriteThemes: [],
        newsDigest: 'weekly',
      },
      stats: {
        totalParticipations: 0,
        petitionsSigned: 0,
        votesParticipated: 0,
        consultationsAttended: 0,
        commentsPosted: 0,
        proposalsSubmitted: 0,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return {
      data: {
        user: newUser,
        tokens: {
          accessToken: 'mock_access_token_' + Date.now(),
          refreshToken: 'mock_refresh_token_' + Date.now(),
          expiresIn: 3600,
          tokenType: 'Bearer',
        },
      },
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Request password reset
   * POST /api/auth/forgot-password
   */
  async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
    await simulateDelay();

    return {
      data: {
        message: 'Password reset email sent',
      },
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Logout user
   * POST /api/auth/logout
   */
  async logout(): Promise<ApiResponse<{ message: string }>> {
    await simulateDelay();

    return {
      data: {
        message: 'Logged out successfully',
      },
      timestamp: new Date().toISOString(),
      success: true,
    };
  },
};

// ==================== User API ====================

export const userApi = {
  /**
   * Get current user profile
   * GET /api/users/me
   */
  async getCurrentUser(): Promise<ApiResponse<UserDTO>> {
    await simulateDelay();

    return {
      data: mockCurrentUser,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Update user profile
   * PATCH /api/users/me
   */
  async updateProfile(data: Partial<UserDTO>): Promise<ApiResponse<UserDTO>> {
    await simulateDelay();

    return {
      data: {
        ...mockCurrentUser,
        ...data,
        updatedAt: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get user participation history
   * GET /api/users/me/history
   */
  async getParticipationHistory(): Promise<ApiResponse<ParticipationHistoryDTO>> {
    await simulateDelay();

    return {
      data: mockParticipationHistory,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get user notifications
   * GET /api/users/me/notifications
   */
  async getNotifications(params?: { unreadOnly?: boolean }): Promise<ApiResponse<NotificationDTO[]>> {
    await simulateDelay();

    let notifications = mockNotifications;
    if (params?.unreadOnly) {
      notifications = notifications.filter(n => !n.read);
    }

    return {
      data: notifications,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Mark notification as read
   * PATCH /api/users/me/notifications/:id/read
   */
  async markNotificationAsRead(notificationId: string): Promise<ApiResponse<NotificationDTO>> {
    await simulateDelay();

    const notification = mockNotifications.find(n => n.id === notificationId);
    if (!notification) {
      throw new Error('Notification not found');
    }

    return {
      data: {
        ...notification,
        read: true,
        readAt: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get user activities
   * GET /api/users/me/activities
   */
  async getActivities(): Promise<ApiResponse<ActivityDTO[]>> {
    await simulateDelay();

    return {
      data: mockApiData.activities,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },
};

// ==================== Theme API ====================

export const themeApi = {
  /**
   * Get all themes
   * GET /api/themes
   */
  async getThemes(): Promise<ApiResponse<ThemeDTO[]>> {
    await simulateDelay();

    return {
      data: await getThemesApi(),
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get theme by ID
   * GET /api/themes/:id
   */
  async getThemeById(id: string): Promise<ApiResponse<ThemeDTO>> {
    await simulateDelay();

    const theme = mockThemes.find(t => t.id === id);
    if (!theme) {
      throw new Error('Theme not found');
    }

    return {
      data: theme,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },
};

// ==================== Consultation API ====================

export const consultationApi = {
  /**
   * Get all consultations
   * GET /api/consultations
   */
  async getConsultations(params?: {
    status?: string;
    themeId?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<any[]>> {
    await simulateDelay();

    let consultations = await getConsultations();

    if (params?.status) {
      consultations = consultations.filter(c => c.status === params.status);
    }
    if (params?.themeId) {
      consultations = consultations.filter(c => c.themeId === params.themeId);
    }

    return {
      data: consultations,
      meta: {
        currentPage: params?.page || 1,
        totalPages: 1,
        totalItems: consultations.length,
        itemsPerPage: params?.limit || 20,
        hasNextPage: false,
        hasPreviousPage: false,
      },
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get consultation by ID or slug
   * GET /api/consultations/:idOrSlug
   */
  async getConsultation(idOrSlug: string): Promise<ApiResponse<ConsultationDTO>> {
    await simulateDelay();

    const consultation = mockConsultations.find(
      c => c.id === idOrSlug || c.slug === idOrSlug
    );

    if (!consultation) {
      throw new Error('Consultation not found');
    }

    return {
      data: consultation,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Register for consultation
   * POST /api/consultations/:id/register
   */
  async registerForConsultation(consultationId: string): Promise<ApiResponse<{ message: string }>> {
    await simulateDelay();

    return {
      data: {
        message: 'Successfully registered for consultation',
      },
      timestamp: new Date().toISOString(),
      success: true,
    };
  },
};

// ==================== Petition API ====================

export const petitionApi = {
  /**
   * Get all petitions
   * GET /api/petitions
   */
  async getPetitions(params?: {
    status?: string;
    themeId?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<PetitionDTO[]>> {
    await simulateDelay();

    let petitions = await getPetitions();

    if (params?.status) {
      petitions = petitions.filter(p => p.status === params.status);
    }
    if (params?.themeId) {
      petitions = petitions.filter(p => p.themeId === params.themeId);
    }

    return {
      data: petitions,
      meta: {
        currentPage: params?.page || 1,
        totalPages: 1,
        totalItems: petitions.length,
        itemsPerPage: params?.limit || 20,
        hasNextPage: false,
        hasPreviousPage: false,
      },
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get petition by ID or slug
   * GET /api/petitions/:idOrSlug
   */
  async getPetition(idOrSlug: string): Promise<ApiResponse<PetitionDTO>> {
    await simulateDelay();

    const petition = mockPetitions.find(
      p => p.id === idOrSlug || p.slug === idOrSlug
    );

    if (!petition) {
      throw new Error('Petition not found');
    }

    return {
      data: petition,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Sign petition
   * POST /api/petitions/:id/sign
   */
  async signPetition(petitionId: string, data: {
    anonymous?: boolean;
    comment?: string;
  }): Promise<ApiResponse<{ message: string; signatureCount: number }>> {
    await simulateDelay();

    return {
      data: {
        message: 'Petition signed successfully',
        signatureCount: 3848,
      },
      timestamp: new Date().toISOString(),
      success: true,
    };
  },
};

// ==================== Vote API ====================

export const voteApi = {
  /**
   * Get all votes (4 votes available)
   * GET /api/votes
   */
  async getVotes(params?: {
    status?: string;
    themeId?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<VoteDTO[]>> {
    await simulateDelay();

    let votes = await getPollsApi(PollType.OFFICIAL_ELECTION); // Force fresh copy

    if (params?.status) {
      votes = votes.filter(v => v.status === params.status);
    }
    if (params?.themeId) {
      votes = votes.filter(v => v.themeId === params.themeId);
    }

    return {
      data: votes,
      meta: {
        currentPage: params?.page || 1,
        totalPages: 1,
        totalItems: votes.length,
        itemsPerPage: params?.limit || 20,
        hasNextPage: false,
        hasPreviousPage: false,
      },
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get vote by ID or slug
   * GET /api/votes/:idOrSlug
   */
  async getVote(idOrSlug: string): Promise<ApiResponse<VoteDTO>> {
    await simulateDelay();

    const vote = mockVotes.find(
      v => v.id === idOrSlug || v.slug === idOrSlug
    );

    if (!vote) {
      throw new Error('Vote not found');
    }

    return {
      data: vote,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Cast vote
   * POST /api/votes/:id/cast
   */
  async castVote(voteId: string, optionIds: string[]): Promise<ApiResponse<{ message: string }>> {
    await simulateDelay();

    return {
      data: {
        message: 'Vote cast successfully',
      },
      timestamp: new Date().toISOString(),
      success: true,
    };
  },
};

// ==================== Legislative Consultation API ====================

export const legislativeConsultationApi = {
  /**
   * Get all legislative consultations
   * GET /api/legislative-consultations
   */
  async getLegislativeConsultations(params?: {
    status?: string;
    themeId?: string;
    textType?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<LegislativeConsultationDTO[]>> {
    await simulateDelay();

    let consultations = await getLegislativeConsultationsApi();

    if (params?.status) {
      consultations = consultations.filter(c => c.status === params.status);
    }

    if (params?.themeId) {
      consultations = consultations.filter(c => c.themeId === params.themeId);
    }

    if (params?.textType) {
      consultations = consultations.filter(c => c.textType === params.textType);
    }

    return {
      data: consultations,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get a single legislative consultation by ID or slug
   * GET /api/legislative-consultations/:id
   */
  async getLegislativeConsultation(idOrSlug: string): Promise<ApiResponse<LegislativeConsultationDTO>> {
    await simulateDelay();

    const consultation = mockLegislativeConsultations.find(
      c => c.id === idOrSlug || c.slug === idOrSlug
    );

    if (!consultation) {
      throw new Error(`Legislative consultation with id/slug "${idOrSlug}" not found`);
    }

    return {
      data: consultation,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get legislative consultation summaries
   * GET /api/legislative-consultations/summaries
   */
  async getLegislativeConsultationSummaries(params?: {
    status?: string;
    themeId?: string;
    limit?: number;
  }): Promise<ApiResponse<LegislativeConsultationSummaryDTO[]>> {
    await simulateDelay();

    let summaries = [...mockLegislativeConsultationSummaries];

    if (params?.status) {
      summaries = summaries.filter(s => s.status === params.status);
    }

    if (params?.themeId) {
      summaries = summaries.filter(s => s.themeId === params.themeId);
    }

    if (params?.limit) {
      summaries = summaries.slice(0, params.limit);
    }

    return {
      data: summaries,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get articles for a legislative consultation
   * GET /api/legislative-consultations/:id/articles
   */
  async getArticles(consultationId: string): Promise<ApiResponse<ArticleDTO[]>> {
    await simulateDelay();

    const articles = mockArticles.filter(a => a.consultationId === consultationId);

    return {
      data: articles,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get a single article by ID
   * GET /api/articles/:id
   */
  async getArticle(articleId: string): Promise<ApiResponse<ArticleDTO>> {
    await simulateDelay();

    const article = mockArticles.find(a => a.id === articleId);

    if (!article) {
      throw new Error(`Article with id "${articleId}" not found`);
    }

    return {
      data: article,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get annotations for an article
   * GET /api/articles/:id/annotations
   */
  async getArticleAnnotations(articleId: string): Promise<ApiResponse<ArticleAnnotationDTO[]>> {
    await simulateDelay();

    const annotations = mockArticleAnnotations.filter(a => a.articleId === articleId);

    return {
      data: annotations,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Create a new annotation on an article
   * POST /api/articles/:id/annotations
   */
  async createAnnotation(data: CreateArticleAnnotationDTO): Promise<ApiResponse<ArticleAnnotationDTO>> {
    await simulateDelay();

    const newAnnotation: ArticleAnnotationDTO = {
      id: `ann_${Date.now()}`,
      articleId: data.articleId,
      author: mockCurrentUser,
      content: data.content,
      position: data.position,
      parentId: data.parentId,
      votes: {
        upvotes: 0,
        downvotes: 0,
        score: 0,
      },
      hasUpvoted: false,
      hasDownvoted: false,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockArticleAnnotations.push(newAnnotation);

    return {
      data: newAnnotation,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Vote on an annotation
   * POST /api/annotations/:id/vote
   */
  async voteOnAnnotation(data: VoteOnAnnotationDTO): Promise<ApiResponse<ArticleAnnotationDTO>> {
    await simulateDelay();

    const annotation = mockArticleAnnotations.find(a => a.id === data.annotationId);

    if (!annotation) {
      throw new Error(`Annotation with id "${data.annotationId}" not found`);
    }

    // Toggle vote
    if (data.voteType === 'upvote') {
      if (annotation.hasUpvoted) {
        annotation.votes.upvotes--;
        annotation.hasUpvoted = false;
      } else {
        if (annotation.hasDownvoted) {
          annotation.votes.downvotes--;
          annotation.hasDownvoted = false;
        }
        annotation.votes.upvotes++;
        annotation.hasUpvoted = true;
      }
    } else {
      if (annotation.hasDownvoted) {
        annotation.votes.downvotes--;
        annotation.hasDownvoted = false;
      } else {
        if (annotation.hasUpvoted) {
          annotation.votes.upvotes--;
          annotation.hasUpvoted = false;
        }
        annotation.votes.downvotes++;
        annotation.hasDownvoted = true;
      }
    }

    annotation.votes.score = annotation.votes.upvotes - annotation.votes.downvotes;

    return {
      data: annotation,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get legislative summary for a consultation
   * GET /api/legislative-consultations/:id/summary
   */
  async getLegislativeSummary(consultationId: string): Promise<ApiResponse<LegislativeSummaryDTO>> {
    await simulateDelay();

    const summary = mockLegislativeSummaries.find(s => s.consultationId === consultationId);

    if (!summary) {
      throw new Error(`Legislative summary for consultation "${consultationId}" not found`);
    }

    return {
      data: summary,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },
};

// ==================== Youth Polls API ====================

export const youthPollsApi = {
  /**
   * Get all youth polls
   * GET /api/youth-polls
   */
  async getYouthPolls(params?: {
    status?: string;
    themeId?: string;
    targetAge?: string;
    featured?: boolean;
  }): Promise<ApiResponse<YouthPollDTO[]>> {
    await simulateDelay();

    let polls = await getPollsApi(PollType.YOUTH_POLL);

    if (params?.status) {
      polls = polls.filter(p => p.status === params.status);
    }

    if (params?.themeId) {
      polls = polls.filter(p => p.themeId === params.themeId);
    }

    if (params?.targetAge) {
      polls = polls.filter(p => p.targetAge === params.targetAge || p.targetAge === 'all');
    }



    return {
      data: polls,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get a single youth poll by ID
   * GET /api/youth-polls/:id
   */
  async getYouthPollById(id: string): Promise<ApiResponse<YouthPollDTO>> {
    await simulateDelay();

    const poll = mockYouthPolls.find(p => p.id === id);

    if (!poll) {
      throw new Error(`Youth poll with id "${id}" not found`);
    }

    return {
      data: poll,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get youth space statistics
   * GET /api/youth-polls/stats
   */
  async getYouthSpaceStats(): Promise<ApiResponse<YouthSpaceStatsDTO>> {
    await simulateDelay();

    return {
      data: mockYouthSpaceStats,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Submit a response to a youth poll
   * POST /api/youth-polls/:id/responses
   */
  async submitYouthPollResponse(data: CreateYouthPollResponseDTO): Promise<ApiResponse<YouthPollResponseDTO>> {
    await simulateDelay();

    const poll = mockYouthPolls.find(p => p.id === data.pollId);

    if (!poll) {
      throw new Error(`Youth poll with id "${data.pollId}" not found`);
    }

    // Mark poll as responded
    poll.hasUserResponded = true;
    poll.totalResponses++;

    // Update vote counts
    data.responses.forEach(response => {
      const question = poll.questions.find(q => q.id === response.questionId);
      if (question) {
        response.selectedOptions.forEach(optionId => {
          const option = question.options.find(o => o.id === optionId);
          if (option) {
            option.voteCount++;
          }
        });
      }
    });

    const pollResponse: YouthPollResponseDTO = {
      id: `pr_${Date.now()}`,
      pollId: data.pollId,
      userId: 'usr_001', // Would come from auth context in production
      responses: data.responses,
      submittedAt: new Date().toISOString(),
    };

    return {
      data: pollResponse,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },
};

// ==================== Assembly API ====================

export const assemblyApi = {
  /**
   * Get all assemblies (4 assemblies available)
   * GET /api/assemblies
   */
  async getAssemblies(params?: {
    themeId?: string;
    status?: string;
  }): Promise<ApiResponse<AssemblyDTO[]>> {
    await simulateDelay();

    let assemblies = await getAssembly(); // Force fresh copy

    if (params?.themeId) {
      assemblies = assemblies.filter(a => a.themeId === params.themeId);
    }
    if (params?.status) {
      assemblies = assemblies.filter(a => a.status === params.status);
    }

    return {
      data: assemblies,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get assembly by ID or slug
   * GET /api/assemblies/:idOrSlug
   */
  async getAssembly(idOrSlug: string): Promise<ApiResponse<AssemblyDTO>> {
    await simulateDelay();

    const assembly = mockAssemblies.find(
      a => a.id === idOrSlug || a.slug === idOrSlug
    );

    if (!assembly) {
      throw new Error('Assembly not found');
    }

    return {
      data: assembly,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },
};

// ==================== Conference API ====================

export const conferenceApi = {
  /**
   * Get all conferences (4 conferences available)
   * GET /api/conferences
   */
  async getConferences(params?: {
    status?: string;
    themeId?: string;
  }): Promise<ApiResponse<any[]>> {
    await simulateDelay();

    let conferences = await getConferencesApi(); // Force fresh copy

    if (params?.status) {
      conferences = conferences.filter(c => c.status === params.status);
    }
    if (params?.themeId) {
      conferences = conferences.filter(c => c.themeId === params.themeId);
    }

    return {
      data: conferences,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get conference by ID or slug
   * GET /api/conferences/:idOrSlug
   */
  async getConference(idOrSlug: string): Promise<ApiResponse<ConferenceDTO>> {
    await simulateDelay();

    const conference = mockConferences.find(
      c => c.id === idOrSlug || c.slug === idOrSlug
    );

    if (!conference) {
      throw new Error('Conference not found');
    }

    return {
      data: conference,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get speaker by ID
   * GET /api/speakers/:id
   */
  async getSpeaker(id: string): Promise<ApiResponse<SpeakerDTO>> {
    await simulateDelay();

    const speaker = mockSpeakers.find(s => s.id === id);

    if (!speaker) {
      throw new Error('Speaker not found');
    }

    return {
      data: speaker,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Register for conference
   * POST /api/conferences/:id/register
   */
  async registerForConference(
    conferenceId: string,
    data: {
      sessions?: string[];
      attendeeInfo: {
        firstName: string;
        lastName: string;
        email: string;
        organization?: string;
      };
    }
  ): Promise<ApiResponse<{ message: string; registrationId: string }>> {
    await simulateDelay();

    return {
      data: {
        message: 'Successfully registered for conference',
        registrationId: 'reg_' + Date.now(),
      },
      timestamp: new Date().toISOString(),
      success: true,
    };
  },
};

// ==================== Dashboard API ====================

export const dashboardApi = {
  /**
   * Get dashboard statistics
   * GET /api/dashboard/stats
   */
  async getDashboardStats(): Promise<ApiResponse<DashboardStatsDTO>> {
    await simulateDelay();

    return {
      data: mockDashboardStats,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },
};

// ==================== Search API ====================

export const searchApi = {
  /**
   * Search across all content
   * POST /api/search
   */
  async search(params: SearchRequestDTO): Promise<ApiResponse<SearchResponseDTO>> {
    await simulateDelay();

    // Mock search implementation
    const results: SearchResponseDTO = {
      results: [],
      meta: {
        currentPage: params.page || 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: params.limit || 20,
        hasNextPage: false,
        hasPreviousPage: false,
        totalResults: 0,
        searchTime: 0.15,
      },
      suggestions: [],
      filters: {
        availableThemes: mockThemes,
        availableStatuses: ['open', 'closed', 'upcoming'],
      },
    };

    return {
      data: results,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },
};

// ==================== Signalement API ====================

export const signalementApi = {
  /**
   * Get all signalements with optional filters
   * GET /api/signalements
   */
  async getSignalements(params?: {
    status?: string;
    category?: string;
    themeId?: string;
  }): Promise<ApiResponse<import('../types').SignalementDTO[]>> {
    await simulateDelay();

    let signalements = [...mockSignalements];

    if (params?.status) {
      signalements = signalements.filter(s => s.status === params.status);
    }
    if (params?.category) {
      signalements = signalements.filter(s => s.category === params.category);
    }
    if (params?.themeId) {
      signalements = signalements.filter(s => s.themeId === params.themeId);
    }

    return {
      data: signalements,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get signalement by ID
   * GET /api/signalements/:id
   */
  async getSignalement(id: string): Promise<ApiResponse<import('../types').SignalementDTO>> {
    await simulateDelay();

    const signalement = mockSignalements.find(s => s.id === id);

    if (!signalement) {
      throw new Error('Signalement not found');
    }

    return {
      data: signalement,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get signalements for map view (geo data only)
   * GET /api/signalements/geo
   */
  async getGeoSignalements(): Promise<ApiResponse<import('../types').GeoSignalementDTO[]>> {
    await simulateDelay();

    return {
      data: mockGeoSignalements,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get signalement statistics
   * GET /api/signalements/stats
   */
  async getSignalementStats(): Promise<ApiResponse<import('../types').SignalementStatsDTO>> {
    await simulateDelay();

    return {
      data: await getSignalementsApi(),
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Create new signalement
   * POST /api/signalements
   */
  async createSignalement(
    data: import('../types').CreateSignalementDTO
  ): Promise<ApiResponse<{ message: string; id: string }>> {
    await simulateDelay(800);

    return {
      data: {
        message: 'Signalement créé avec succès',
        id: 'sig_' + Date.now(),
      },
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Upvote a signalement
   * POST /api/signalements/:id/upvote
   */
  async upvoteSignalement(id: string): Promise<ApiResponse<{ message: string; upvotes: number }>> {
    await simulateDelay(300);

    const signalement = mockSignalements.find(s => s.id === id);

    return {
      data: {
        message: 'Vote enregistré',
        upvotes: (signalement?.upvotes || 0) + 1,
      },
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Remove upvote from a signalement
   * DELETE /api/signalements/:id/upvote
   */
  async removeUpvote(id: string): Promise<ApiResponse<{ message: string; upvotes: number }>> {
    await simulateDelay(300);

    const signalement = mockSignalements.find(s => s.id === id);

    return {
      data: {
        message: 'Vote retiré',
        upvotes: Math.max((signalement?.upvotes || 0) - 1, 0),
      },
      timestamp: new Date().toISOString(),
      success: true,
    };
  },
};

// ==================== AI Assistant API ====================

export const aiApi = {
  /**
   * Ask a question to the AI assistant
   * POST /api/ai/ask
   */
  async ask(request: import('../types').AIAskRequestDTO): Promise<ApiResponse<import('../types').AIAskResponseDTO>> {
    await simulateDelay(800);

    // Mock AI response - generate contextual answer
    const conversationId = request.conversationId || 'conv_' + Date.now();
    const messageId = 'msg_' + Date.now();

    // Find relevant quick answer based on question
    const quickAnswer = mockApiData.aiQuickAnswers.find(qa =>
      qa.question[request.language].toLowerCase().includes(request.question.toLowerCase()) ||
      request.question.toLowerCase().includes(qa.question[request.language].toLowerCase())
    );

    const responseContent = quickAnswer ? quickAnswer.answer : {
      fr: `Je comprends votre question "${request.question}". Voici quelques informations qui pourraient vous aider. Pour des questions spécifiques, n'hésitez pas à consulter nos guides ou à contacter le support.`,
      de: `Ich verstehe Ihre Frage "${request.question}". Hier sind einige Informationen, die Ihnen helfen könnten. Für spezifische Fragen können Sie gerne unsere Leitfäden konsultieren oder den Support kontaktieren.`,
      en: `I understand your question "${request.question}". Here is some information that might help you. For specific questions, feel free to consult our guides or contact support.`
    };

    const message: import('../types').AIMessageDTO = {
      id: messageId,
      role: 'assistant',
      content: responseContent,
      timestamp: new Date().toISOString(),
      context: request.context
    };

    return {
      data: {
        conversationId,
        message,
        suggestions: mockApiData.aiSuggestions.slice(0, 2),
        relatedContent: []
      },
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get AI summary for an entity
   * GET /api/ai/summary/:entityType/:entityId
   */
  async getSummary(entityType: string, entityId: string): Promise<ApiResponse<import('../types').AISummaryDTO>> {
    await simulateDelay();

    return {
      data: mockApiData.aiSummary,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get AI explanation for a topic
   * GET /api/ai/explain/:topic
   */
  async getExplanation(topic: string): Promise<ApiResponse<import('../types').AIExplanationDTO>> {
    await simulateDelay();

    return {
      data: mockApiData.aiExplanation,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get personalized suggestions
   * GET /api/ai/suggestions
   */
  async getSuggestions(): Promise<ApiResponse<import('../types').AISuggestionDTO[]>> {
    await simulateDelay();

    return {
      data: mockApiData.aiSuggestions,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get conversation history
   * GET /api/ai/conversations
   */
  async getConversations(): Promise<ApiResponse<import('../types').AIConversationDTO[]>> {
    await simulateDelay();

    return {
      data: mockApiData.aiConversations,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get quick answers
   * GET /api/ai/quick-answers
   */
  async getQuickAnswers(): Promise<ApiResponse<import('../types').AIQuickAnswerDTO[]>> {
    await simulateDelay();

    return {
      data: mockApiData.aiQuickAnswers,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },
};

// ==================== IVR API ====================

export const ivrApi = {
  /**
   * Get IVR statistics
   * GET /api/ivr/stats
   */
  async getStats(): Promise<ApiResponse<IVRStatsDTO>> {
    await simulateDelay();

    return {
      data: mockIVRStats,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get all IVR responses
   * GET /api/ivr/responses
   */
  async getResponses(params?: {
    channel?: string;
    participationType?: string;
    status?: string;
    region?: string;
  }): Promise<ApiResponse<IVRResponseDTO[]>> {
    await simulateDelay();

    let filtered = [...mockIVRResponses];

    if (params?.channel) {
      filtered = filtered.filter(r => r.channel === params.channel);
    }
    if (params?.participationType) {
      filtered = filtered.filter(r => r.participationType === params.participationType);
    }
    if (params?.status) {
      filtered = filtered.filter(r => r.status === params.status);
    }
    if (params?.region) {
      filtered = filtered.filter(r => r.region === params.region);
    }

    return {
      data: filtered,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get IVR response by ID
   * GET /api/ivr/responses/:id
   */
  async getResponseById(id: string): Promise<ApiResponse<IVRResponseDTO>> {
    await simulateDelay();

    const response = mockIVRResponses.find(r => r.id === id);

    if (!response) {
      throw new Error('IVR response not found');
    }

    return {
      data: response,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get all IVR campaigns
   * GET /api/ivr/campaigns
   */
  async getCampaigns(params?: {
    status?: string;
    participationType?: string;
  }): Promise<ApiResponse<IVRCampaignDTO[]>> {
    await simulateDelay();

    let filtered = [...mockIVRCampaigns];

    if (params?.status) {
      filtered = filtered.filter(c => c.status === params.status);
    }
    if (params?.participationType) {
      filtered = filtered.filter(c => c.participationType === params.participationType);
    }

    return {
      data: filtered,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get IVR campaign by ID
   * GET /api/ivr/campaigns/:id
   */
  async getCampaignById(id: string): Promise<ApiResponse<IVRCampaignDTO>> {
    await simulateDelay();

    const campaign = mockIVRCampaigns.find(c => c.id === id);

    if (!campaign) {
      throw new Error('IVR campaign not found');
    }

    return {
      data: campaign,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get IVR summary for a specific process
   * GET /api/ivr/process-summary/:processId
   */
  async getProcessSummary(processId: string): Promise<ApiResponse<IVRProcessSummaryDTO>> {
    await simulateDelay();

    const summary = mockIVRProcessSummaries.find(s => s.processId === processId);

    if (!summary) {
      throw new Error('IVR process summary not found');
    }

    return {
      data: summary,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get all IVR process summaries
   * GET /api/ivr/process-summaries
   */
  async getAllProcessSummaries(): Promise<ApiResponse<IVRProcessSummaryDTO[]>> {
    await simulateDelay();

    return {
      data: mockIVRProcessSummaries,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },
};

// ==================== Moderation API ====================

export const moderationApi = {
  /**
   * Get moderation statistics
   * GET /api/moderation/stats
   */
  async getStats(): Promise<ApiResponse<ModerationStatsDTO>> {
    await simulateDelay();

    return {
      data: mockModerationStats,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get moderation queue items with filters
   * GET /api/moderation/items
   */
  async getItems(filters?: ModerationFilterDTO): Promise<ApiResponse<ModerationItemDTO[]>> {
    await simulateDelay();

    let filtered = [...mockModerationItems];

    if (filters?.status && filters.status.length > 0) {
      filtered = filtered.filter(item => filters.status!.includes(item.status));
    }

    if (filters?.priority && filters.priority.length > 0) {
      filtered = filtered.filter(item => filters.priority!.includes(item.priority));
    }

    if (filters?.contentType && filters.contentType.length > 0) {
      filtered = filtered.filter(item => filters.contentType!.includes(item.contentType));
    }

    if (filters?.themeIds && filters.themeIds.length > 0) {
      filtered = filtered.filter(item => item.themeId && filters.themeIds!.includes(item.themeId));
    }

    if (filters?.assignedTo) {
      filtered = filtered.filter(item => item.assignedTo?.id === filters.assignedTo);
    }

    if (filters?.hasAutomatedFlags !== undefined) {
      if (filters.hasAutomatedFlags) {
        filtered = filtered.filter(item => item.automatedFlags && item.automatedFlags.length > 0);
      } else {
        filtered = filtered.filter(item => !item.automatedFlags || item.automatedFlags.length === 0);
      }
    }

    if (filters?.hasUserReports !== undefined) {
      if (filters.hasUserReports) {
        filtered = filtered.filter(item => item.reportsCount > 0);
      } else {
        filtered = filtered.filter(item => item.reportsCount === 0);
      }
    }

    if (filters?.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.author.name.toLowerCase().includes(query) ||
        item.content.text.fr.toLowerCase().includes(query) ||
        (item.content.title && item.content.title.fr.toLowerCase().includes(query))
      );
    }

    // Sorting
    const sortBy = filters?.sortBy || 'createdAt';
    const sortOrder = filters?.sortOrder || 'desc';

    filtered.sort((a, b) => {
      let compareA: any, compareB: any;

      switch (sortBy) {
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          compareA = priorityOrder[a.priority];
          compareB = priorityOrder[b.priority];
          break;
        case 'dueDate':
          compareA = a.dueDate ? new Date(a.dueDate).getTime() : 0;
          compareB = b.dueDate ? new Date(b.dueDate).getTime() : 0;
          break;
        case 'reportsCount':
          compareA = a.reportsCount;
          compareB = b.reportsCount;
          break;
        case 'createdAt':
        default:
          compareA = new Date(a.createdAt).getTime();
          compareB = new Date(b.createdAt).getTime();
          break;
      }

      if (sortOrder === 'asc') {
        return compareA - compareB;
      } else {
        return compareB - compareA;
      }
    });

    return {
      data: filtered,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get moderation item by ID
   * GET /api/moderation/items/:id
   */
  async getItemById(id: string): Promise<ApiResponse<ModerationItemDTO>> {
    await simulateDelay();

    const item = mockModerationItems.find(i => i.id === id);

    if (!item) {
      throw new Error('Moderation item not found');
    }

    return {
      data: item,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Perform moderation action on an item
   * POST /api/moderation/items/:id/action
   */
  async performAction(data: PerformModerationActionDTO): Promise<ApiResponse<ModerationItemDTO>> {
    await simulateDelay();

    const item = mockModerationItems.find(i => i.id === data.itemId);

    if (!item) {
      throw new Error('Moderation item not found');
    }

    // In a real application, this would update the database
    console.log('Performing moderation action:', data);

    return {
      data: item,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Perform bulk moderation action
   * POST /api/moderation/bulk-action
   */
  async performBulkAction(data: BulkModerationActionDTO): Promise<ApiResponse<{ processedCount: number }>> {
    await simulateDelay(1000); // Longer delay for bulk operations

    // In a real application, this would update multiple items in the database
    console.log('Performing bulk moderation action:', data);

    return {
      data: {
        processedCount: data.itemIds.length
      },
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get moderation rules
   * GET /api/moderation/rules
   */
  async getRules(): Promise<ApiResponse<ModerationRuleDTO[]>> {
    await simulateDelay();

    return {
      data: mockModerationRules,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get moderation rule by ID
   * GET /api/moderation/rules/:id
   */
  async getRuleById(id: string): Promise<ApiResponse<ModerationRuleDTO>> {
    await simulateDelay();

    const rule = mockModerationRules.find(r => r.id === id);

    if (!rule) {
      throw new Error('Moderation rule not found');
    }

    return {
      data: rule,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Create or update moderation rule
   * POST /api/moderation/rules
   */
  async saveRule(rule: Partial<ModerationRuleDTO>): Promise<ApiResponse<ModerationRuleDTO>> {
    await simulateDelay();

    // In a real application, this would save to the database
    console.log('Saving moderation rule:', rule);

    const savedRule: ModerationRuleDTO = {
      id: rule.id || `rule_${Date.now()}`,
      name: rule.name!,
      description: rule.description!,
      type: rule.type!,
      enabled: rule.enabled ?? true,
      severity: rule.severity!,
      action: rule.action!,
      conditions: rule.conditions!,
      appliesTo: rule.appliesTo!,
      stats: rule.stats || {
        totalMatches: 0,
        truePositives: 0,
        falsePositives: 0
      },
      createdAt: rule.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: rule.createdBy || 'current_user'
    };

    return {
      data: savedRule,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Delete moderation rule
   * DELETE /api/moderation/rules/:id
   */
  async deleteRule(id: string): Promise<ApiResponse<{ success: boolean }>> {
    await simulateDelay();

    // In a real application, this would delete from the database
    console.log('Deleting moderation rule:', id);

    return {
      data: { success: true },
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get user reports
   * GET /api/moderation/reports
   */
  async getReports(filters?: { status?: string[] }): Promise<ApiResponse<UserReportDTO[]>> {
    await simulateDelay();

    let filtered = [...mockUserReports];

    if (filters?.status && filters.status.length > 0) {
      filtered = filtered.filter(report => filters.status!.includes(report.status));
    }

    return {
      data: filtered,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get user report by ID
   * GET /api/moderation/reports/:id
   */
  async getReportById(id: string): Promise<ApiResponse<UserReportDTO>> {
    await simulateDelay();

    const report = mockUserReports.find(r => r.id === id);

    if (!report) {
      throw new Error('User report not found');
    }

    return {
      data: report,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Resolve user report
   * POST /api/moderation/reports/:id/resolve
   */
  async resolveReport(id: string, resolution: {
    action: string;
    comment: string;
  }): Promise<ApiResponse<UserReportDTO>> {
    await simulateDelay();

    const report = mockUserReports.find(r => r.id === id);

    if (!report) {
      throw new Error('User report not found');
    }

    // In a real application, this would update the database
    console.log('Resolving report:', id, resolution);

    return {
      data: report,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },

  /**
   * Get moderation dashboard summary
   * GET /api/moderation/dashboard
   */
  async getDashboard(): Promise<ApiResponse<{
    stats: ModerationStatsDTO;
    recentItems: ModerationItemDTO[];
    urgentItems: ModerationItemDTO[];
    recentReports: UserReportDTO[];
  }>> {
    await simulateDelay();

    const urgentItems = mockModerationItems.filter(item =>
      item.status === 'pending' && (item.priority === 'urgent' || item.priority === 'high')
    ).slice(0, 5);

    const recentItems = [...mockModerationItems]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10);

    const recentReports = [...mockUserReports]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);

    return {
      data: {
        stats: mockModerationStats,
        recentItems,
        urgentItems,
        recentReports
      },
      timestamp: new Date().toISOString(),
      success: true,
    };
  },
};

// ==================== Unified API Service ====================

export const apiService = {
  auth: authApi,
  user: userApi,
  theme: themeApi,
  consultation: consultationApi,
  petition: petitionApi,
  vote: voteApi,
  legislativeConsultation: legislativeConsultationApi,
  youthPoll: youthPollsApi,
  assembly: assemblyApi,
  conference: conferenceApi,
  dashboard: dashboardApi,
  search: searchApi,
  signalement: signalementApi,
  ai: aiApi,
  ivr: ivrApi,
  moderation: moderationApi,
};

export default apiService;