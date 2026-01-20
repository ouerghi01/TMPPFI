/**
 * Utility functions for working with LocalizedString and mock data
 */

import type { Language, LocalizedString } from '../types';

/**
 * Safely get a localized string value
 * Handles both LocalizedString objects and plain strings (for backwards compatibility)
 */
export function getLocalizedString(
  value: LocalizedString | string | undefined,
  language: Language
): string {
  if (!value) return '';
  
  // If it's already a string, return it
  if (typeof value === 'string') return value;
  
  // If it's a LocalizedString object, return the appropriate language
  return value[language] || value.fr || value.en || '';
}

/**
 * Format a number with locale-specific formatting
 */
export function formatNumber(value: number, locale: Language = 'fr'): string {
  const localeMap: Record<Language, string> = {
    fr: 'fr-FR',
    de: 'de-DE',
    en: 'en-US',
  };
  
  return value.toLocaleString(localeMap[locale]);
}

/**
 * Calculate days remaining between now and a target date
 */
export function getDaysRemaining(targetDate: string): number {
  const now = new Date();
  const target = new Date(targetDate);
  const diffTime = target.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Format a date according to language
 */
export function formatDate(
  dateString: string,
  language: Language,
  format: 'short' | 'long' = 'short'
): string {
  const date = new Date(dateString);
  
  const localeMap: Record<Language, string> = {
    fr: 'fr-FR',
    de: 'de-DE',
    en: 'en-US',
  };
  
  if (format === 'long') {
    return date.toLocaleDateString(localeMap[language], {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  
  return date.toLocaleDateString(localeMap[language], {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

/**
 * Get status badge configuration for consultations
 */
export function getConsultationStatusConfig(
  status: string,
  language: Language
): {
  label: string;
  className: string;
} {
  const configs: Record<string, { label: Record<Language, string>; className: string }> = {
    open: {
      label: { fr: 'Ouverte', de: 'Offen', en: 'Open' },
      className: 'bg-green-100 text-green-800',
    },
    closed: {
      label: { fr: 'Fermée', de: 'Geschlossen', en: 'Closed' },
      className: 'bg-gray-100 text-gray-800',
    },
    draft: {
      label: { fr: 'Brouillon', de: 'Entwurf', en: 'Draft' },
      className: 'bg-yellow-100 text-yellow-800',
    },
    upcoming: {
      label: { fr: 'À venir', de: 'Bevorstehend', en: 'Upcoming' },
      className: 'bg-blue-100 text-blue-800',
    },
  };
  
  const config = configs[status] || configs.draft;
  return {
    label: config.label[language],
    className: config.className,
  };
}

/**
 * Get status badge configuration for petitions
 */
export function getPetitionStatusConfig(
  status: string,
  language: Language
): {
  label: string;
  className: string;
} {
  const configs: Record<string, { label: Record<Language, string>; className: string }> = {
    open: {
      label: { fr: 'Ouverte', de: 'Offen', en: 'Open' },
      className: 'bg-green-100 text-green-800',
    },
    closed: {
      label: { fr: 'Fermée', de: 'Geschlossen', en: 'Closed' },
      className: 'bg-gray-100 text-gray-800',
    },
    threshold_reached: {
      label: { fr: 'Seuil atteint', de: 'Schwelle erreicht', en: 'Threshold reached' },
      className: 'bg-blue-100 text-blue-800',
    },
    in_review: {
      label: { fr: 'En révision', de: 'In Prüfung', en: 'In review' },
      className: 'bg-purple-100 text-purple-800',
    },
    accepted: {
      label: { fr: 'Acceptée', de: 'Akzeptiert', en: 'Accepted' },
      className: 'bg-emerald-100 text-emerald-800',
    },
    rejected: {
      label: { fr: 'Rejetée', de: 'Abgelehnt', en: 'Rejected' },
      className: 'bg-red-100 text-red-800',
    },
  };
  
  const config = configs[status] || configs.open;
  return {
    label: config.label[language],
    className: config.className,
  };
}

/**
 * Get status badge configuration for votes
 */
export function getVoteStatusConfig(
  status: string,
  language: Language
): {
  label: string;
  className: string;
} {
  const configs: Record<string, { label: Record<Language, string>; className: string }> = {
    open: {
      label: { fr: 'Ouvert', de: 'Offen', en: 'Open' },
      className: 'bg-green-100 text-green-800',
    },
    closed: {
      label: { fr: 'Fermé', de: 'Geschlossen', en: 'Closed' },
      className: 'bg-gray-100 text-gray-800',
    },
    upcoming: {
      label: { fr: 'À venir', de: 'Bevorstehend', en: 'Upcoming' },
      className: 'bg-blue-100 text-blue-800',
    },
    results_published: {
      label: { fr: 'Résultats publiés', de: 'Ergebnisse veröffentlicht', en: 'Results published' },
      className: 'bg-purple-100 text-purple-800',
    },
  };
  
  const config = configs[status] || configs.open;
  return {
    label: config.label[language],
    className: config.className,
  };
}
