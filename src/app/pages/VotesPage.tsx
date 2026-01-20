import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { PageBanner } from '../components/PageBanner';
import { PageLayout } from '../components/layout/PageLayout';
import { KPICard } from '../components/layout/KPICard';
import { FilterBar } from '../components/layout/FilterBar';
import { FilterField } from '../components/layout/FilterField';
import { ThemeTag } from '../components/ThemeTag';
import { StatusBadge } from '../components/StatusBadge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Progress } from '../components/ui/progress';
import { useVotes, useThemes } from '../hooks/useApi';
import type { VoteDTO } from '../types';
import { Calendar, Users, Filter, TrendingUp, Vote as VoteIcon, Eye } from 'lucide-react';

export function VotesPage() {
  const { t, language, tLocal } = useLanguage();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Fetch data using React Query hooks
  const { data: votes, isLoading, error } = useVotes();
  const { data: themesData } = useThemes();

  // Show loading state
  if (isLoading) {
    return (
      <div>
        <PageBanner
          title={
            language === 'fr' ? 'Votes citoyens' :
            language === 'de' ? 'Bürgerabstimmungen' :
            'Citizen Votes'
          }
          description={
            language === 'fr' ? 'Participez aux votes et référendums de votre commune' :
            language === 'de' ? 'Nehmen Sie an Abstimmungen und Referenden Ihrer Gemeinde teil' :
            'Participate in votes and referendums of your community'
          }
          gradient="from-purple-600 to-pink-600"
          icon={<VoteIcon className="w-12 h-12 text-white" />}
        />
        <PageLayout className="py-8">
          <div className="text-center py-12">
            <p className="text-gray-600">Chargement des votes...</p>
          </div>
        </PageLayout>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div>
        <PageBanner
          title={
            language === 'fr' ? 'Votes citoyens' :
            language === 'de' ? 'Bürgerabstimmungen' :
            'Citizen Votes'
          }
          description={
            language === 'fr' ? 'Participez aux votes et référendums de votre commune' :
            language === 'de' ? 'Nehmen Sie an Abstimmungen und Referenden Ihrer Gemeinde teil' :
            'Participate in votes and referendums of your community'
          }
          gradient="from-purple-600 to-pink-600"
          icon={<VoteIcon className="w-12 h-12 text-white" />}
        />
        <PageLayout className="py-8">
          <div className="text-center py-12">
            <p className="text-red-600">Erreur lors du chargement des données</p>
          </div>
        </PageLayout>
      </div>
    );
  }

  const filteredVotes = (votes || []).filter((vote) => {
    if (selectedTheme && vote.themeId !== selectedTheme) return false;
    if (selectedStatus && vote.status !== selectedStatus) return false;
    return true;
  });

  // Calculate statistics
  const openVotes = votes?.filter((v) => v.status === 'open').length || 0;
  const upcomingVotes = votes?.filter((v) => v.status === 'upcoming').length || 0;
  const totalVotes = votes?.length || 0;
  const totalParticipants = votes?.reduce((sum, v) => sum + (v.stats?.totalVoters || 0), 0) || 0;

  return (
    <div>
      <PageBanner
        title={
          language === 'fr' ? 'Votes citoyens' :
          language === 'de' ? 'Bürgerabstimmungen' :
          'Citizen Votes'
        }
        description={
          language === 'fr' ? 'Participez aux votes et référendums de votre commune' :
          language === 'de' ? 'Nehmen Sie an Abstimmungen und Referenden Ihrer Gemeinde teil' :
          'Participate in votes and referendums of your community'
        }
        gradient="from-purple-600 to-pink-600"
        icon={<VoteIcon className="w-12 h-12 text-white" />}
      />
      
      <PageLayout className="py-8">
        {/* KPI Cards - Standard 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <KPICard
            label={
              language === 'fr' ? 'Votes ouverts' :
              language === 'de' ? 'Offene Abstimmungen' :
              'Open votes'
            }
            value={openVotes}
            icon={VoteIcon}
            variant="green"
            type="primary"
          />

          <KPICard
            label={
              language === 'fr' ? 'À venir' :
              language === 'de' ? 'Kommend' :
              'Upcoming'
            }
            value={upcomingVotes}
            icon={Calendar}
            variant="blue"
            type="primary"
          />

          <KPICard
            label={
              language === 'fr' ? 'Total votes' :
              language === 'de' ? 'Gesamt Abstimmungen' :
              'Total votes'
            }
            value={totalVotes}
            icon={TrendingUp}
            variant="purple"
            type="primary"
          />

          <KPICard
            label={
              language === 'fr' ? 'Participants' :
              language === 'de' ? 'Teilnehmer' :
              'Participants'
            }
            value={totalParticipants.toLocaleString()}
            icon={Users}
            variant="orange"
            type="primary"
          />
        </div>

        {/* Filters */}
        <div className="mb-8">
          <FilterBar>
            <FilterField label={
              language === 'fr' ? `${t('common.filter')} par thème` :
              language === 'de' ? `${t('common.filter')} nach Thema` :
              `${t('common.filter')} by theme`
            }>
              <Select 
                value={selectedTheme || 'all'} 
                onValueChange={(value) => setSelectedTheme(value === 'all' ? null : value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('common.all')}</SelectItem>
                  {themesData?.map((theme) => (
                    <SelectItem key={theme.id} value={theme.id}>
                      {theme.icon} {tLocal(theme.name)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FilterField>

            <FilterField label={
              language === 'fr' ? `Statut du vote` :
              language === 'de' ? `Abstimmungsstatus` :
              `Vote status`
            }>
              <Select 
                value={selectedStatus || 'all'} 
                onValueChange={(value) => setSelectedStatus(value === 'all' ? null : value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('common.all')}</SelectItem>
                  <SelectItem value="open">
                    {language === 'fr' && 'Ouvert'}
                    {language === 'de' && 'Offen'}
                    {language === 'en' && 'Open'}
                  </SelectItem>
                  <SelectItem value="upcoming">
                    {language === 'fr' && 'À venir'}
                    {language === 'de' && 'Kommend'}
                    {language === 'en' && 'Upcoming'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </FilterField>
          </FilterBar>
        </div>

        {/* Votes List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredVotes.map((vote) => {
            const totalVotes = vote.options.reduce((sum, opt) => sum + (opt.votes || 0), 0);

            return (
              <Card key={vote.id} className="hover:shadow-lg transition-shadow flex flex-col h-full">
                <CardHeader className="flex-shrink-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <ThemeTag themeId={vote.themeId} />
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-300">
                        {vote.type === 'referendum' ? 'Référendum' : 'Consultation'}
                      </span>
                      {vote.status === 'open' && (
                        <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-300 flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {language === 'fr' && 'Mode simplifié disponible'}
                          {language === 'de' && 'Vereinfachter Modus verfügbar'}
                          {language === 'en' && 'Simplified mode available'}
                        </span>
                      )}
                    </div>
                    <StatusBadge status={vote.status} />
                  </div>
                  <CardTitle className="line-clamp-2">{tLocal(vote.title)}</CardTitle>
                  <CardDescription className="text-base mt-2 line-clamp-3">{tLocal(vote.question)}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <div className="space-y-4 flex-grow">
                    {/* Vote options with results for open/closed votes */}
                    {(vote.status === 'open' || vote.status === 'closed') && vote.options.length > 0 && vote.options[0].votes !== undefined && (
                      <div className="space-y-3">
                        <div className="text-sm text-gray-600 mb-2">
                          {vote.status === 'closed' ? 
                            (language === 'fr' ? 'Résultats finaux :' : language === 'de' ? 'Endergebnisse:' : 'Final results:') :
                            (language === 'fr' ? 'Résultats actuels :' : language === 'de' ? 'Aktuelle Ergebnisse:' : 'Current results:')
                          }
                        </div>
                        {vote.options.map((option) => {
                          const percentage = totalVotes > 0 ? ((option.votes || 0) / totalVotes) * 100 : 0;
                          return (
                            <div key={option.id}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-700">{tLocal(option.label)}</span>
                                <span className="font-medium">
                                  {option.votes?.toLocaleString()} ({percentage.toFixed(1)}%)
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full transition-all"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Upcoming vote - just show options */}
                    {vote.status === 'upcoming' && (
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600 mb-2">Options de vote :</div>
                        {vote.options.map((option) => (
                          <div key={option.id} className="p-2 bg-gray-50 rounded border border-gray-200">
                            <span className="text-sm">{tLocal(option.label)}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Metadata */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(vote.startDate).toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'de' ? 'de-DE' : 'en-US')} -{' '}
                            {new Date(vote.endDate).toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'de' ? 'de-DE' : 'en-US')}
                          </span>
                        </div>
                        {vote.stats?.totalVotes && (
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{vote.stats.totalVotes.toLocaleString()} votes</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Buttons aligned at bottom */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    {vote.status === 'open' && (
                      <Link
                        to={`/votes/${vote.slug}`}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
                      >
                        <VoteIcon className="w-4 h-4" />
                        {language === 'fr' && 'Voter maintenant'}
                        {language === 'de' && 'Jetzt abstimmen'}
                        {language === 'en' && 'Vote now'}
                      </Link>
                    )}

                    {vote.status === 'upcoming' && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          {language === 'fr' && `Ce vote ouvrira le ${new Date(vote.startDate).toLocaleDateString('fr-FR')}`}
                          {language === 'de' && `Diese Abstimmung öffnet am ${new Date(vote.startDate).toLocaleDateString('de-DE')}`}
                          {language === 'en' && `This vote will open on ${new Date(vote.startDate).toLocaleDateString('en-US')}`}
                        </p>
                      </div>
                    )}

                    {vote.status === 'closed' && (
                      <Link
                        to={`/votes/${vote.slug}`}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
                      >
                        <TrendingUp className="w-4 h-4" />
                        {language === 'fr' && 'Voir les résultats'}
                        {language === 'de' && 'Ergebnisse ansehen'}
                        {language === 'en' && 'View results'}
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredVotes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Aucun vote ne correspond à vos critères de recherche.</p>
          </div>
        )}

        {/* Info section */}
        <div className="mt-12 p-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
          <div className="max-w-2xl">
            <h2 className="text-2xl mb-4 text-gray-900">
              {language === 'fr' && 'Comment voter ?'}
              {language === 'de' && 'Wie abstimmen?'}
              {language === 'en' && 'How to vote?'}
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>• {language === 'fr' ? 'Vous devez être un citoyen vérifié pour participer aux votes' : language === 'de' ? 'Sie müssen ein verifizierter Bürger sein, um an Abstimmungen teilzunehmen' : 'You must be a verified citizen to participate in votes'}</p>
              <p>• {language === 'fr' ? 'Les référendums ont une valeur consultative ou décisionnelle selon leur nature' : language === 'de' ? 'Referenden haben je nach Art beratenden oder entscheidenden Charakter' : 'Referendums have consultative or decision-making value depending on their nature'}</p>
              <p>• {language === 'fr' ? 'Les consultations permettent de recueillir l\'avis des citoyens' : language === 'de' ? 'Konsultationen ermöglichen es, die Meinung der Bürger einzuholen' : 'Consultations allow gathering citizens\' opinions'}</p>
              <p>• {language === 'fr' ? 'Vous pouvez consulter les résultats en temps réel pendant le vote' : language === 'de' ? 'Sie können die Ergebnisse während der Abstimmung in Echtzeit einsehen' : 'You can view results in real-time during the vote'}</p>
              <div className="mt-4 pt-4 border-t border-purple-200">
                <p className="flex items-center gap-2 font-semibold text-green-700">
                  <Eye className="w-5 h-5" />
                  {language === 'fr' && 'Mode simplifié pour tous'}
                  {language === 'de' && 'Vereinfachter Modus für alle'}
                  {language === 'en' && 'Simplified mode for all'}
                </p>
                <p className="mt-2 text-sm">
                  {language === 'fr' && 'Chaque vote en cours dispose d\'un mode simplifié avec pictogrammes et couleurs, facilitant l\'accès au vote pour les personnes analphabètes ou ayant des difficultés de lecture.'}
                  {language === 'de' && 'Jede laufende Abstimmung verfügt über einen vereinfachten Modus mit Piktogrammen und Farben, um Analphabeten oder Personen mit Leseschwierigkeiten den Zugang zur Abstimmung zu erleichtern.'}
                  {language === 'en' && 'Each ongoing vote has a simplified mode with pictograms and colors, making voting accessible for illiterate people or those with reading difficulties.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
}