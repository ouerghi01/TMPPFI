import React, { useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useLegislativeConsultationSummaries, useThemes } from '@/app/hooks/useApi';
import { PageLayout } from '@/app/components/layout/PageLayout';
import { FilterBar } from '@/app/components/layout/FilterBar';
import { FilterField } from '@/app/components/layout/FilterField';
import { ContentGrid } from '@/app/components/layout/ContentGrid';
import { LegislativeConsultationCard } from '@/app/components/cards/LegislativeConsultationCard';
import { EmptyState } from '@/app/components/EmptyState';
import { LoadingSpinner } from '@/app/components/LoadingSpinner';
import { ErrorMessage } from '@/app/components/ErrorMessage';
import { FileText, Filter } from 'lucide-react';

export function LegislativeConsultationsPage() {
  const { language, t } = useLanguage();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [themeFilter, setThemeFilter] = useState<string>('all');
  const [textTypeFilter, setTextTypeFilter] = useState<string>('all');

  // Build filters
  const filters: Record<string, any> = {};
  if (statusFilter !== 'all') filters.status = statusFilter;
  if (themeFilter !== 'all') filters.themeId = themeFilter;
  if (textTypeFilter !== 'all') filters.textType = textTypeFilter;

  // Fetch data
  const { data: consultations, isLoading, error } = useLegislativeConsultationSummaries(filters);
  const { data: themes } = useThemes();

  // Page header
  const pageTitle = {
    fr: 'Consultations Législatives',
    de: 'Gesetzgebungsberatungen',
    en: 'Legislative Consultations',
  }[language];

  const pageDescription = {
    fr: 'Participez à l\'élaboration des textes législatifs en annotant les articles et en votant sur les commentaires de la communauté.',
    de: 'Beteiligen Sie sich an der Ausarbeitung von Gesetzestexten, indem Sie Artikel annotieren und über Community-Kommentare abstimmen.',
    en: 'Participate in the development of legislative texts by annotating articles and voting on community comments.',
  }[language];

  // Status options
  const statusOptions = [
    { value: 'all', label: t('common.all') },
    { value: 'open', label: language === 'fr' ? 'Ouvertes' : language === 'de' ? 'Offen' : 'Open' },
    { value: 'upcoming', label: t('common.upcoming') },
    { value: 'closed', label: t('common.closed') },
  ];

  // Text type options
  const textTypeOptions = [
    { value: 'all', label: t('common.all') },
    { value: 'law', label: language === 'fr' ? 'Projet de loi' : language === 'de' ? 'Gesetzentwurf' : 'Bill' },
    { value: 'regulation', label: language === 'fr' ? 'Règlement' : language === 'de' ? 'Verordnung' : 'Regulation' },
    { value: 'decree', label: language === 'fr' ? 'Décret' : language === 'de' ? 'Dekret' : 'Decree' },
    { value: 'ordinance', label: language === 'fr' ? 'Ordonnance' : language === 'de' ? 'Verordnung' : 'Ordinance' },
    { value: 'amendment', label: language === 'fr' ? 'Amendement' : language === 'de' ? 'Änderungsantrag' : 'Amendment' },
  ];

  // Theme options
  const themeOptions = [
    { value: 'all', label: t('common.all') },
    ...(themes || []).map(theme => ({
      value: theme.id,
      label: theme.name[language],
    })),
  ];

  return (
    <PageLayout
      title={pageTitle}
      description={pageDescription}
      icon={<FileText className="w-8 h-8 text-indigo-600" />}
    >
      {/* Filters */}
      <FilterBar>
        <FilterField
          label={t('common.filter')}
          value={statusFilter}
          onChange={setStatusFilter}
          options={statusOptions}
          icon={<Filter className="w-4 h-4" />}
        />
        <FilterField
          label={language === 'fr' ? 'Type de texte' : language === 'de' ? 'Texttyp' : 'Text type'}
          value={textTypeFilter}
          onChange={setTextTypeFilter}
          options={textTypeOptions}
        />
        <FilterField
          label={language === 'fr' ? 'Thème' : language === 'de' ? 'Thema' : 'Theme'}
          value={themeFilter}
          onChange={setThemeFilter}
          options={themeOptions}
        />
      </FilterBar>

      {/* Content */}
      {isLoading && <LoadingSpinner />}
      
      {error && (
        <ErrorMessage 
          message={
            language === 'fr' 
              ? 'Erreur lors du chargement des consultations législatives' 
              : language === 'de'
              ? 'Fehler beim Laden der Gesetzgebungsberatungen'
              : 'Error loading legislative consultations'
          } 
        />
      )}

      {!isLoading && !error && consultations && consultations.length === 0 && (
        <EmptyState
          icon={<FileText className="w-12 h-12 text-gray-400" />}
          title={
            language === 'fr'
              ? 'Aucune consultation législative'
              : language === 'de'
              ? 'Keine Gesetzgebungsberatungen'
              : 'No legislative consultations'
          }
          description={
            language === 'fr'
              ? 'Il n\'y a pas de consultations législatives correspondant à vos critères.'
              : language === 'de'
              ? 'Es gibt keine Gesetzgebungsberatungen, die Ihren Kriterien entsprechen.'
              : 'There are no legislative consultations matching your criteria.'
          }
        />
      )}

      {!isLoading && !error && consultations && consultations.length > 0 && (
        <ContentGrid>
          {consultations.map(consultation => (
            <LegislativeConsultationCard
              key={consultation.id}
              consultation={consultation}
            />
          ))}
        </ContentGrid>
      )}
    </PageLayout>
  );
}
