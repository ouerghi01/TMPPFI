import React, { useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { PageBanner } from '@/app/components/PageBanner';
import { PageLayout } from '@/app/components/layout/PageLayout';
import { KPICard } from '@/app/components/layout/KPICard';
import { FilterBar } from '@/app/components/layout/FilterBar';
import { ContentGrid } from '@/app/components/layout/ContentGrid';
import { YouthPollCard } from '@/app/components/cards/YouthPollCard';
import { EmptyState } from '@/app/components/EmptyState';
import { LoadingSpinner } from '@/app/components/LoadingSpinner';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { useYouthPolls, useYouthSpaceStats, useThemes } from '@/app/hooks/useApi';
import { Star, Users, TrendingUp, Clock, Heart } from 'lucide-react';
import type { YouthPollTargetAge } from '@/app/types';

/**
 * YouthSpacePage - Page dédiée aux espaces jeunesse
 * 
 * Fonctionnalités:
 * - Affichage des micro-sondages
 * - Filtres par âge et statut
 * - Statistiques de gamification
 * - Design engageant pour les jeunes
 */
export default function YouthSpacePage() {
  const { t, language, tLocal } = useLanguage();
  const [filters, setFilters] = useState({
    status: '',
    themeId: '',
    targetAge: '',
  });
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'featured'>('all');

  const { data: themes } = useThemes();
  const { data: stats, isLoading: isLoadingStats } = useYouthSpaceStats();
  
  // Build filters based on active tab
  const pollFilters = {
    ...filters,
    ...(activeTab === 'active' && { status: 'active' }),
    ...(activeTab === 'featured' && { featured: true }),
  };

  const { data: polls, isLoading: isLoadingPolls } = useYouthPolls(pollFilters);

  const kpiStats = [
    {
      label: language === 'fr' ? 'Sondages actifs' : language === 'de' ? 'Aktive Umfragen' : 'Active polls',
      value: stats?.activePolls?.toString() || '0',
      icon: Heart,
      variant: 'blue' as const,
    },
    {
      label: language === 'fr' ? 'Participants' : language === 'de' ? 'Teilnehmer' : 'Participants',
      value: stats?.totalParticipants?.toLocaleString() || '0',
      icon: Users,
      variant: 'green' as const,
    },
    {
      label: language === 'fr' ? 'Vos points' : language === 'de' ? 'Ihre Punkte' : 'Your points',
      value: stats?.userPoints?.toString() || '0',
      icon: Star,
      variant: 'orange' as const,
    },
    {
      label: language === 'fr' ? 'Complétés' : language === 'de' ? 'Abgeschlossen' : 'Completed',
      value: stats?.completedPolls?.toString() || '0',
      icon: TrendingUp,
      variant: 'purple' as const,
    },
  ];

  const ageGroupOptions = [
    { value: '', label: language === 'fr' ? 'Tous les âges' : language === 'de' ? 'Alle Altersgruppen' : 'All ages' },
    { value: '12-15', label: '12-15 ans' },
    { value: '16-18', label: '16-18 ans' },
    { value: '19-25', label: '19-25 ans' },
    { value: 'all', label: language === 'fr' ? 'Tous' : language === 'de' ? 'Alle' : 'All' },
  ];

  const themeOptions = themes ? [
    { value: '', label: language === 'fr' ? 'Tous les thèmes' : language === 'de' ? 'Alle Themen' : 'All themes' },
    ...themes.map((theme) => ({
      value: theme.id,
      label: tLocal(theme.name),
    })),
  ] : [];

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <PageBanner
        title={
          language === 'fr'
            ? '🌟 Espace Jeunesse'
            : language === 'de'
              ? '🌟 Jugendraum'
              : '🌟 Youth Space'
        }
        description={
          language === 'fr'
            ? 'Partage ton avis sur les sujets qui te concernent ! Gagne des points et fais entendre ta voix.'
            : language === 'de'
              ? 'Teile deine Meinung zu Themen, die dich betreffen! Sammle Punkte und lass deine Stimme hören.'
              : 'Share your opinion on topics that matter to you! Earn points and make your voice heard.'
        }
        gradient="from-purple-600 via-pink-600 to-orange-500"
        icon={<Star className="w-12 h-12 text-white" />}
      />

      <PageLayout className="py-8 space-y-8">
        {/* KPI Cards */}
        {!isLoadingStats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiStats.map((stat, index) => (
              <KPICard 
                key={index}
                label={stat.label}
                value={stat.value}
                icon={stat.icon}
                variant={stat.variant}
              />
            ))}
          </div>
        )}

        {/* Tabs et Filtres */}
        <div className="space-y-4">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">
                  {language === 'fr' ? 'Tous' : language === 'de' ? 'Alle' : 'All'}
                </TabsTrigger>
                <TabsTrigger value="active">
                  {language === 'fr' ? 'Actifs' : language === 'de' ? 'Aktiv' : 'Active'}
                </TabsTrigger>
                <TabsTrigger value="featured">
                  {language === 'fr' ? '⭐ À la une' : language === 'de' ? '⭐ Empfohlen' : '⭐ Featured'}
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Filtres */}
            <div className="mt-4">
              <FilterBar
                filters={[
                  {
                    type: 'select',
                    label: language === 'fr' ? 'Tranche d\'âge' : language === 'de' ? 'Altersgruppe' : 'Age group',
                    value: filters.targetAge,
                    onChange: (value) => handleFilterChange('targetAge', value),
                    options: ageGroupOptions,
                  },
                  {
                    type: 'select',
                    label: language === 'fr' ? 'Thème' : language === 'de' ? 'Thema' : 'Theme',
                    value: filters.themeId,
                    onChange: (value) => handleFilterChange('themeId', value),
                    options: themeOptions,
                  },
                ]}
                onReset={() => setFilters({ status: '', themeId: '', targetAge: '' })}
              />
            </div>
          </Tabs>
        </div>

        {/* Grille de sondages */}
        {isLoadingPolls ? (
          <LoadingSpinner />
        ) : !polls || polls.length === 0 ? (
          <EmptyState
            icon={<Heart className="w-16 h-16" />}
            title={
              language === 'fr'
                ? 'Aucun sondage trouvé'
                : language === 'de'
                  ? 'Keine Umfragen gefunden'
                  : 'No polls found'
            }
            description={
              language === 'fr'
                ? 'Reviens bientôt pour de nouveaux sondages !'
                : language === 'de'
                  ? 'Komm bald wieder für neue Umfragen!'
                  : 'Come back soon for new polls!'
            }
          />
        ) : (
          <ContentGrid>
            {polls.map((poll) => (
              <YouthPollCard key={poll.id} poll={poll} />
            ))}
          </ContentGrid>
        )}

        {/* Gamification Info */}
        {stats && stats.upcomingPolls > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">
                  {language === 'fr'
                    ? '🎉 De nouveaux sondages arrivent bientôt !'
                    : language === 'de'
                      ? '🎉 Neue Umfragen kommen bald!'
                      : '🎉 New polls coming soon!'}
                </h3>
                <p className="text-gray-600 mb-3">
                  {language === 'fr'
                    ? `${stats.upcomingPolls} nouveaux sondages seront disponibles prochainement. Continue de participer pour gagner plus de points !`
                    : language === 'de'
                      ? `${stats.upcomingPolls} neue Umfragen werden in Kürze verfügbar sein. Nimm weiter teil, um mehr Punkte zu verdienen!`
                      : `${stats.upcomingPolls} new polls will be available soon. Keep participating to earn more points!`}
                </p>
              </div>
            </div>
          </div>
        )}
      </PageLayout>
    </div>
  );
}