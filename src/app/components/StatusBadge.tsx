import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface StatusBadgeProps {
  status: 'open' | 'closed' | 'upcoming' | 'active' | 'pending' | 'accepted' | 'rejected' | 'completed' | 'threshold_reached' | 'inProgress';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { t } = useLanguage();

  const statusConfig: Record<string, { label: string; className: string }> = {
    open: {
      label: t('status.open'),
      className: 'bg-green-100 text-green-800 border-green-300',
    },
    active: {
      label: t('status.open'),
      className: 'bg-green-100 text-green-800 border-green-300',
    },
    closed: {
      label: t('status.closed'),
      className: 'bg-gray-100 text-gray-800 border-gray-300',
    },
    upcoming: {
      label: t('common.upcoming'),
      className: 'bg-blue-100 text-blue-800 border-blue-300',
    },
    pending: {
      label: t('status.pending'),
      className: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    },
    accepted: {
      label: t('status.accepted'),
      className: 'bg-green-100 text-green-800 border-green-300',
    },
    rejected: {
      label: t('status.rejected'),
      className: 'bg-red-100 text-red-800 border-red-300',
    },
    completed: {
      label: t('status.completed'),
      className: 'bg-purple-100 text-purple-800 border-purple-300',
    },
    threshold_reached: {
      label: t('status.accepted'),
      className: 'bg-green-100 text-green-800 border-green-300',
    },
    inProgress: {
      label: t('status.inProgress'),
      className: 'bg-blue-100 text-blue-800 border-blue-300',
    },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm border ${config.className}`}>
      {config.label}
    </span>
  );
}
