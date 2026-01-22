import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface StatusBadgeProps {
  status: 'OPEN' | 'CLOSED' | 'UPCOMING' | 'ACTIVE' | 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED' | 'THRESHOLD_REACHED' | 'IN_PROGRESS' | 'DRAFT' | 'RESULTS_PUBLISHED' |
  'draft' | 'open' | 'closed' | 'upcoming' | 'active' | 'pending' | 'accepted' | 'rejected' | 'completed' | 'threshold_reached' | 'in_progress' | 'archived' | 'in_review' | 'inactive' | 'cancelled' | 'registration_open' | 'registration_closed';
}

export function StatusBadge({ status }: any) {
  const { t } = useLanguage();

  const statusConfig: Record<string, { label: string; className: string }> = {
    // Uppercase statuses
    OPEN: { label: t('status.open'), className: 'bg-green-100 text-green-800 border-green-300' },
    ACTIVE: { label: t('status.open'), className: 'bg-green-100 text-green-800 border-green-300' },
    CLOSED: { label: t('status.closed'), className: 'bg-gray-100 text-gray-800 border-gray-300' },
    UPCOMING: { label: t('common.upcoming'), className: 'bg-blue-100 text-blue-800 border-blue-300' },
    PENDING: { label: t('status.pending'), className: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
    ACCEPTED: { label: t('status.accepted'), className: 'bg-green-100 text-green-800 border-green-300' },
    REJECTED: { label: t('status.rejected'), className: 'bg-red-100 text-red-800 border-red-300' },
    COMPLETED: { label: t('status.completed'), className: 'bg-purple-100 text-purple-800 border-purple-300' },
    THRESHOLD_REACHED: { label: t('status.accepted'), className: 'bg-green-100 text-green-800 border-green-300' },
    IN_PROGRESS: { label: t('status.inProgress'), className: 'bg-blue-100 text-blue-800 border-blue-300' },
    DRAFT: { label: t('status.draft'), className: 'bg-gray-100 text-gray-800 border-gray-300' },
    RESULTS_PUBLISHED: { label: t('status.resultsPublished'), className: 'bg-purple-100 text-purple-800 border-purple-300' },

    // Lowercase statuses (mapped to same styles)
    draft: { label: t('status.draft'), className: 'bg-gray-100 text-gray-800 border-gray-300' },
    open: { label: t('status.open'), className: 'bg-green-100 text-green-800 border-green-300' },
    closed: { label: t('status.closed'), className: 'bg-gray-100 text-gray-800 border-gray-300' },
    upcoming: { label: t('common.upcoming'), className: 'bg-blue-100 text-blue-800 border-blue-300' },
    active: { label: t('status.open'), className: 'bg-green-100 text-green-800 border-green-300' },
    pending: { label: t('status.pending'), className: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
    accepted: { label: t('status.accepted'), className: 'bg-green-100 text-green-800 border-green-300' },
    rejected: { label: t('status.rejected'), className: 'bg-red-100 text-red-800 border-red-300' },
    completed: { label: t('status.completed'), className: 'bg-purple-100 text-purple-800 border-purple-300' },
    threshold_reached: { label: t('status.accepted'), className: 'bg-green-100 text-green-800 border-green-300' },
    in_progress: { label: t('status.inProgress'), className: 'bg-blue-100 text-blue-800 border-blue-300' },
    archived: { label: t('status.archived'), className: 'bg-gray-100 text-gray-600 border-gray-300' },
    in_review: { label: t('status.inReview'), className: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
    inactive: { label: t('status.inactive'), className: 'bg-gray-100 text-gray-600 border-gray-300' },
    cancelled: { label: t('status.cancelled'), className: 'bg-red-50 text-red-600 border-red-200' },
    registration_open: { label: t('status.registrationOpen'), className: 'bg-green-100 text-green-800 border-green-300' },
    registration_closed: { label: t('status.registrationClosed'), className: 'bg-red-100 text-red-800 border-red-300' },
  };

  const config = statusConfig[status] || statusConfig.open; // Default to open if not found (safer fallback)

  // If config is still missing (shouldn't happen with types, but for runtime safety)
  if (!config) return null;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm border ${config.className}`}>
      {config.label}
    </span>
  );
}
