import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { PageBanner } from '../components/PageBanner';
import { PageLayout } from '../components/layout/PageLayout';
import { KPICard } from '../components/layout/KPICard';
import { useThemes, useConsultations, usePetitions, useVotes } from '../hooks/useApi';
import type { ThemeDTO } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowRight, Layers, TrendingUp, FileText, Heart, BarChart3 } from 'lucide-react';

export function ThemesPage() {
  const { t, language, tLocal } = useLanguage();

  // Fetch data using React Query hooks
  const { data: themes, isLoading: isLoadingThemes } = useThemes();
  const { data: consultations } = useConsultations();
  const { data: petitions } = usePetitions();
  const { data: votes } = useVotes();

  const getThemeStats = (themeId: string) => {
    return {
      consultations: consultations?.filter((c) => c.themeId === themeId).length || 0,
      petitions: petitions?.filter((p) => p.themeId === themeId).length || 0,
      votes: votes?.filter((v) => v.themeId === themeId).length || 0,
    };
  };

  // Show loading state
  if (isLoadingThemes) {
    return (
      <div>
        <PageBanner
          title={
            language === 'fr' ? 'Thèmes de participation' :
            language === 'de' ? 'Beteiligungsthemen' :
            'Participation Themes'
          }
          description={
            language === 'fr' ? 'Explorez les différentes thématiques de participation citoyenne' :
            language === 'de' ? 'Erkunden Sie die verschiedenen Themen der Bürgerbeteiligung' :
            'Explore the different themes of citizen participation'
          }
          gradient="from-indigo-600 to-purple-600"
          icon={<Layers className="w-12 h-12 text-white" />}
        />
        <PageLayout className="py-8">
          <div className="text-center py-12">
            <p className="text-gray-600">Chargement des thèmes...</p>
          </div>
        </PageLayout>
      </div>
    );
  }

  // Calculate overall statistics
  const activeThemes = themes?.filter(theme => {
    const stats = getThemeStats(theme.id);
    return (stats.consultations + stats.petitions + stats.votes) > 0;
  }).length || 0;

  // Find trending topic (theme with most activities)
  const themeActivities = (themes || []).map(theme => {
    const stats = getThemeStats(theme.id);
    return {
      theme,
      total: stats.consultations + stats.petitions + stats.votes
    };
  });
  const trendingTheme = themeActivities.reduce((max, current) => 
    current.total > max.total ? current : max, themeActivities[0] || { theme: { id: '', name: { fr: 'N/A', de: 'N/A', en: 'N/A' }, icon: '', color: '' } as ThemeDTO, total: 0 }
  );

  // Total contributions
  const totalContributions = consultations?.reduce((sum, c) => sum + (c.stats?.totalComments || 0), 0) || 0;

  // Proposals by category (consultations of type 'citizen_proposal')
  const proposalsByCategory = consultations?.filter(c => c.type === 'citizen_proposal').length || 0;

  return (
    <div>
      <PageBanner
        title={
          language === 'fr' ? 'Thèmes citoyens' :
          language === 'de' ? 'Bürgerthemen' :
          'Citizen Themes'
        }
        description={
          language === 'fr' ? 'Explorez toutes les activités participatives organisées par thématique' :
          language === 'de' ? 'Erkunden Sie alle partizipativen Aktivitäten nach Themen organisiert' :
          'Explore all participatory activities organized by theme'
        }
        gradient="from-indigo-600 to-purple-600"
        icon={<Layers className="w-12 h-12 text-white" />}
      />
      
      <PageLayout className="py-8">
        {/* KPI Cards - Standard 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <KPICard
            label={
              language === 'fr' ? 'Thèmes actifs' :
              language === 'de' ? 'Aktive Themen' :
              'Active Themes'
            }
            value={activeThemes}
            icon={Layers}
            variant="indigo"
            type="primary"
          />

          <KPICard
            label={
              language === 'fr' ? 'Tendance' :
              language === 'de' ? 'Trend' :
              'Trending'
            }
            value={tLocal(trendingTheme.theme.name)}
            icon={TrendingUp}
            variant="emerald"
            type="insight"
            subtitle={
              <span className="flex items-center gap-1 animate-fade-in">
                <span>{trendingTheme.theme.icon}</span>
                <span>{trendingTheme.total} {language === 'fr' ? 'activités' : language === 'de' ? 'Aktivitäten' : 'activities'}</span>
              </span>
            }
          />

          <KPICard
            label={
              language === 'fr' ? 'Contributions' :
              language === 'de' ? 'Beiträge' :
              'Total Contributions'
            }
            value={totalContributions.toLocaleString()}
            icon={Heart}
            variant="orange"
            type="primary"
          />

          <KPICard
            label={
              language === 'fr' ? 'Propositions' :
              language === 'de' ? 'Vorschläge' :
              'Proposals'
            }
            value={proposalsByCategory}
            icon={BarChart3}
            variant="cyan"
            type="primary"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme) => {
            const stats = getThemeStats(theme.id);
            const totalActivities =
              stats.consultations + stats.petitions + stats.votes;

            return (
              <Link key={theme.id} to={`/themes/${theme.id}`}>
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader
                    style={{
                      borderTopWidth: '4px',
                      borderTopColor: theme.color,
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl">{theme.icon}</span>
                      <div className="flex-1">
                        <CardTitle>{tLocal(theme.name)}</CardTitle>
                        <CardDescription>
                          {totalActivities}{' '}
                          {language === 'fr' && 'activités en cours'}
                          {language === 'de' && 'laufende Aktivitäten'}
                          {language === 'en' && 'ongoing activities'}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {stats.consultations > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {language === 'fr' && 'Concertations'}
                            {language === 'de' && 'Konsultationen'}
                            {language === 'en' && 'Consultations'}
                          </span>
                          <span className="font-medium">{stats.consultations}</span>
                        </div>
                      )}
                      {stats.petitions > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {language === 'fr' && 'Pétitions'}
                            {language === 'de' && 'Petitionen'}
                            {language === 'en' && 'Petitions'}
                          </span>
                          <span className="font-medium">{stats.petitions}</span>
                        </div>
                      )}
                      {stats.votes > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {language === 'fr' && 'Votes'}
                            {language === 'de' && 'Abstimmungen'}
                            {language === 'en' && 'Votes'}
                          </span>
                          <span className="font-medium">{stats.votes}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                      {language === 'fr' && 'Voir le thème'}
                      {language === 'de' && 'Thema ansehen'}
                      {language === 'en' && 'View theme'}
                      {' '}<ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </PageLayout>
    </div>
  );
}