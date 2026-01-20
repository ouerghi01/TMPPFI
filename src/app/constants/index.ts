/**
 * CiviAgora - Application Constants
 * 
 * Centralized constants used throughout the application.
 */

import type { Language, ConsultationStatus, PetitionStatus, VoteStatus } from '../types';

// ==================== Application ====================

export const APP_NAME = 'CiviAgora';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = {
  fr: 'Plateforme de démocratie participative',
  de: 'Plattform für partizipative Demokratie',
  en: 'Participatory democracy platform',
} as const;

// ==================== Languages ====================

export const SUPPORTED_LANGUAGES: readonly Language[] = ['fr', 'de', 'en'] as const;

export const LANGUAGE_NAMES = {
  fr: 'Français',
  de: 'Deutsch',
  en: 'English',
} as const;

export const DEFAULT_LANGUAGE: Language = 'fr';

// ==================== Statuses ====================

export const CONSULTATION_STATUSES: readonly ConsultationStatus[] = [
  'draft',
  'open',
  'closed',
  'archived',
] as const;

export const PETITION_STATUSES: readonly PetitionStatus[] = [
  'draft',
  'open',
  'threshold_reached',
  'in_review',
  'accepted',
  'rejected',
  'closed',
] as const;

export const VOTE_STATUSES: readonly VoteStatus[] = [
  'draft',
  'upcoming',
  'open',
  'closed',
  'results_published',
] as const;

export const STATUS_COLORS = {
  // Consultation statuses
  draft: 'bg-gray-100 text-gray-700',
  open: 'bg-green-100 text-green-700',
  closed: 'bg-red-100 text-red-700',
  archived: 'bg-gray-100 text-gray-600',
  
  // Petition statuses
  threshold_reached: 'bg-blue-100 text-blue-700',
  in_review: 'bg-yellow-100 text-yellow-700',
  accepted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  
  // Vote statuses
  upcoming: 'bg-purple-100 text-purple-700',
  results_published: 'bg-blue-100 text-blue-700',
} as const;

export const STATUS_LABELS = {
  fr: {
    draft: 'Brouillon',
    open: 'Ouvert',
    closed: 'Fermé',
    archived: 'Archivé',
    threshold_reached: 'Seuil atteint',
    in_review: 'En examen',
    accepted: 'Accepté',
    rejected: 'Rejeté',
    upcoming: 'À venir',
    results_published: 'Résultats publiés',
  },
  de: {
    draft: 'Entwurf',
    open: 'Geöffnet',
    closed: 'Geschlossen',
    archived: 'Archiviert',
    threshold_reached: 'Schwelle erreicht',
    in_review: 'In Prüfung',
    accepted: 'Akzeptiert',
    rejected: 'Abgelehnt',
    upcoming: 'Bevorstehend',
    results_published: 'Ergebnisse veröffentlicht',
  },
  en: {
    draft: 'Draft',
    open: 'Open',
    closed: 'Closed',
    archived: 'Archived',
    threshold_reached: 'Threshold reached',
    in_review: 'In review',
    accepted: 'Accepted',
    rejected: 'Rejected',
    upcoming: 'Upcoming',
    results_published: 'Results published',
  },
} as const;

// ==================== Pagination ====================

export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;
export const MAX_PAGE_SIZE = 100;

// ==================== Date Formats ====================

export const DATE_FORMAT = {
  short: 'dd/MM/yyyy',
  long: 'dd MMMM yyyy',
  withTime: 'dd/MM/yyyy HH:mm',
  full: 'EEEE dd MMMM yyyy HH:mm',
} as const;

// ==================== Validation ====================

export const VALIDATION_RULES = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: {
      fr: 'Email invalide',
      de: 'Ungültige E-Mail',
      en: 'Invalid email',
    },
  },
  password: {
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    message: {
      fr: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre',
      de: 'Das Passwort muss mindestens 8 Zeichen, einen Großbuchstaben, einen Kleinbuchstaben und eine Zahl enthalten',
      en: 'Password must contain at least 8 characters, one uppercase, one lowercase and one number',
    },
  },
  phoneNumber: {
    pattern: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
    message: {
      fr: 'Numéro de téléphone invalide',
      de: 'Ungültige Telefonnummer',
      en: 'Invalid phone number',
    },
  },
  postalCode: {
    pattern: /^[0-9]{4,5}$/,
    message: {
      fr: 'Code postal invalide',
      de: 'Ungültige Postleitzahl',
      en: 'Invalid postal code',
    },
  },
  comment: {
    maxLength: 2000,
  },
  petitionComment: {
    maxLength: 500,
  },
} as const;

// ==================== File Upload ====================

export const FILE_UPLOAD = {
  maxSize: 10 * 1024 * 1024, // 10 MB
  acceptedFormats: {
    documents: ['.pdf', '.doc', '.docx', '.txt', '.odt'],
    images: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
  },
  messages: {
    sizeTooLarge: {
      fr: 'Le fichier est trop volumineux (maximum 10 MB)',
      de: 'Die Datei ist zu groß (maximal 10 MB)',
      en: 'File is too large (maximum 10 MB)',
    },
    invalidFormat: {
      fr: 'Format de fichier non accepté',
      de: 'Dateiformat nicht akzeptiert',
      en: 'File format not accepted',
    },
  },
} as const;

// ==================== API Configuration ====================

export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/v1',
  timeout: 30000, // 30 seconds
  useMock: import.meta.env.VITE_USE_MOCK_API === 'true',
} as const;

// ==================== Auth Configuration ====================

export const AUTH_CONFIG = {
  tokenKey: 'accessToken',
  refreshTokenKey: 'refreshToken',
  userKey: 'currentUser',
  tokenExpiry: 3600, // 1 hour
  refreshTokenExpiry: 604800, // 7 days
} as const;

// ==================== Theme Configuration ====================

export const THEME_IDS = {
  environment: 'env',
  urban: 'urb',
  economy: 'eco',
  education: 'edu',
  social: 'soc',
  culture: 'cul',
  security: 'sec',
  digital: 'num',
} as const;

// ==================== Routes ====================

export const ROUTES = {
  // Front-office
  home: '/',
  themes: '/themes',
  themeDetail: (themeId: string) => `/themes/${themeId}`,
  
  consultations: '/consultations',
  consultationDetail: (id: string) => `/consultations/${id}`,
  
  petitions: '/petitions',
  petitionDetail: (id: string) => `/petitions/${id}`,
  
  votes: '/votes',
  voteDetail: (id: string) => `/votes/${id}`,
  
  assemblies: '/assemblies',
  assemblyDetail: (id: string) => `/assemblies/${id}`,
  
  conferences: '/conferences',
  conferenceDetail: (id: string) => `/conferences/${id}`,
  speakerDetail: (id: string) => `/speakers/${id}`,
  
  proposeIdea: '/propose-idea',
  profile: '/profile',
  settings: '/settings',
  search: '/search',
  
  // Auth
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  
  // Info pages
  howItWorks: '/how-it-works',
  faq: '/faq',
  guides: '/guides',
  support: '/support',
  resources: '/resources',
  
  // Legal
  legalNotice: '/legal-notice',
  privacy: '/privacy',
  terms: '/terms',
  accessibility: '/accessibility',
  cookies: '/cookies',
  
  // Back-office Admin
  admin: '/admin',
  adminUsers: '/admin/users',
  adminProcesses: '/admin/processes',
  adminModeration: '/admin/moderation',
  adminThemes: '/admin/themes',
  adminCalendar: '/admin/calendar',
  adminAnalytics: '/admin/analytics',
  adminResults: '/admin/results',
  adminExports: '/admin/exports',
  adminParticipations: '/admin/participations',
  adminSettings: '/admin/settings',
  
  // SaaS
  saas: '/saas',
  saasOrganizations: '/saas/organizations',
  saasUsers: '/saas/users',
  saasModules: '/saas/modules',
  saasStatistics: '/saas/statistics',
  saasAudit: '/saas/audit',
  saasSettings: '/saas/settings',
} as const;

// ==================== Local Storage Keys ====================

export const STORAGE_KEYS = {
  accessToken: 'civiagora_access_token',
  refreshToken: 'civiagora_refresh_token',
  user: 'civiagora_user',
  language: 'civiagora_language',
  theme: 'civiagora_theme',
  preferences: 'civiagora_preferences',
  recentSearches: 'civiagora_recent_searches',
} as const;

// ==================== Social Media ====================

export const SOCIAL_MEDIA = {
  facebook: 'https://facebook.com/civiagora',
  twitter: 'https://twitter.com/civiagora',
  linkedin: 'https://linkedin.com/company/civiagora',
  instagram: 'https://instagram.com/civiagora',
  youtube: 'https://youtube.com/@civiagora',
} as const;

// ==================== Contact ====================

export const CONTACT_INFO = {
  email: 'contact@civiagora.fr',
  phone: '+33 1 23 45 67 89',
  address: '1 Place de la République, 75001 Paris, France',
  supportEmail: 'support@civiagora.fr',
  pressEmail: 'presse@civiagora.fr',
} as const;

// ==================== Feature Flags ====================

export const FEATURE_FLAGS = {
  enableAssemblies: true,
  enableConferences: true,
  enablePetitions: true,
  enableVotes: true,
  enableChat: false, // Not implemented yet
  enableNotifications: true,
  enableAnalytics: true,
  enableExports: true,
  enableSaaS: true,
} as const;

// ==================== Keyboard Shortcuts ====================

export const KEYBOARD_SHORTCUTS = {
  search: 'ctrl+k',
  help: '?',
  home: 'g h',
  profile: 'g p',
  notifications: 'g n',
} as const;

// ==================== Animation Durations ====================

export const ANIMATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

// ==================== Breakpoints (matching Tailwind) ====================

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// ==================== Z-Index ====================

export const Z_INDEX = {
  dropdown: 1000,
  modal: 1100,
  popover: 1200,
  tooltip: 1300,
  notification: 1400,
} as const;
