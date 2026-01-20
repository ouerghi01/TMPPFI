/**
 * CiviAgora - Routes Documentation
 * 
 * Centralisation de toutes les routes de la plateforme pour une meilleure maintenabilité
 * et visibilité du routing React Router.
 */

// ============================================
// PUBLIC ROUTES - Front Office
// ============================================

export const PUBLIC_ROUTES = {
  // Homepage
  HOME: '/',
  
  // Modules principaux
  CONSULTATIONS: '/consultations',
  CONSULTATION_DETAIL: '/consultations/:id',
  
  ASSEMBLIES: '/assemblies',
  
  PETITIONS: '/petitions',
  PETITION_DETAIL: '/petitions/:petitionId',
  
  CONFERENCES: '/conferences',
  SPEAKER_DETAIL: '/speakers/:speakerId',
  
  VOTES: '/votes',
  VOTE_DETAIL: '/votes/:voteId',
  
  // Legislative Consultations
  LEGISLATIVE_CONSULTATIONS: '/legislative-consultations',
  LEGISLATIVE_CONSULTATION_DETAIL: '/legislative-consultations/:id',
  
  // Youth Space
  YOUTH_SPACE: '/youth-space',
  YOUTH_POLL_DETAIL: '/youth-space/:id',
  
  // Thèmes
  THEMES: '/themes',
  THEME_DETAIL: '/themes/:themeId',
  
  // Participation
  PROPOSE_IDEA: '/propose-idea',
  
  // Utilisateur
  PROFILE: '/profile',
  SETTINGS: '/settings',
  
  // Recherche
  SEARCH: '/search',
  
  // Ressources
  RESOURCES: '/resources',
  HOW_IT_WORKS: '/how-it-works',
  FAQ: '/faq',
  GUIDES: '/guides',
  SUPPORT: '/support',
  
  // Légal
  LEGAL_NOTICE: '/legal-notice',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  ACCESSIBILITY: '/accessibility',
  COOKIES: '/cookies',
  
  // Newsletter
  NEWSLETTER: '/newsletter',
  
  // Auth
  REGISTER: '/register',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
} as const;

// ============================================
// ADMIN ROUTES - Back Office
// ============================================

export const ADMIN_ROUTES = {
  BASE: '/admin',
  DASHBOARD: '/admin',
  USERS: '/admin/users',
  PROCESSES: '/admin/processes',
  MODERATION: '/admin/moderation',
  THEMES: '/admin/themes',
  CALENDAR: '/admin/calendar',
  ANALYTICS: '/admin/analytics',
  RESULTS: '/admin/results',
  EXPORTS: '/admin/exports',
  PARTICIPATIONS: '/admin/participations',
  SETTINGS_GENERAL: '/admin/settings/general',
  SETTINGS_NOTIFICATIONS: '/admin/settings/notifications',
  SETTINGS_DATA: '/admin/settings/data',
  SETTINGS_AUDIT: '/admin/settings/audit',
} as const;

// ============================================
// SAAS ROUTES - Back Office Multi-tenant
// ============================================

export const SAAS_ROUTES = {
  BASE: '/saas',
  DASHBOARD: '/saas',
  ORGANIZATIONS: '/saas/organizations',
  USERS: '/saas/users',
  MODULES: '/saas/modules',
  STATISTICS: '/saas/statistics',
  AUDIT: '/saas/audit',
  SETTINGS: '/saas/settings',
} as const;

// ============================================
// ROUTE HELPERS
// ============================================

/**
 * Génère une URL de détail d'intervenant
 */
export const getSpeakerDetailUrl = (id: string | number) => 
  `/speakers/${id}`;

/**
 * Génère une URL de détail de consultation législative
 */
export const getLegislativeConsultationDetailUrl = (id: string | number) => 
  `/legislative-consultations/${id}`;

// ============================================
// NAVIGATION ITEMS (for menus)
// ============================================

export const MAIN_NAVIGATION = [
  { key: 'home', path: PUBLIC_ROUTES.HOME },
  { key: 'consultations', path: PUBLIC_ROUTES.CONSULTATIONS },
  { key: 'assemblies', path: PUBLIC_ROUTES.ASSEMBLIES },
  { key: 'petitions', path: PUBLIC_ROUTES.PETITIONS },
  { key: 'conferences', path: PUBLIC_ROUTES.CONFERENCES },
  { key: 'votes', path: PUBLIC_ROUTES.VOTES },
  { key: 'themes', path: PUBLIC_ROUTES.THEMES },
] as const;