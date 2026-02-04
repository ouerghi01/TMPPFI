import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useConsultations, useLegislativeConsultations, usePetitions, useSignalements, useVotes, useYouthPolls } from '../hooks/useApi';
import { StatusBadge } from '../components/StatusBadge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ArrowRight, Users } from 'lucide-react';
import { getThemeById } from '../../api/themes';
import { YouthPollCard } from '../components/cards/YouthPollCard';

function calculateAge(birthdate: Date | string): number {
  if (!birthdate) return 0;
  if (typeof birthdate === 'string') {
    birthdate = new Date(birthdate);
  }
  const today = new Date();
  const diff = today.getTime() - birthdate.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export function ThemeDetailPage() {
  const { themeId } = useParams<{ themeId: string }>();
  const { t, language, tLocal } = useLanguage();
  const [theme, setTheme] = useState<any>(null);
  useEffect(() => {
    const fetchTheme = async () => {
      const theme = await getThemeById(themeId!);
      setTheme(theme);
    };
    fetchTheme();
  }, [themeId]);

  // Fetch data using React Query
  const { data: allConsultations, isLoading: isLoadingConsultations } = useConsultations();
  const { data: allPetitions, isLoading: isLoadingPetitions } = usePetitions();
  const { data: allVotes, isLoading: isLoadingVotes } = useVotes();
  const { data: legislativeConsultations, isLoading: isLoadingLegislativeConsultations } = useLegislativeConsultations();
  const { data: allSignalements, isLoading: isLoadingSignalements } = useSignalements();
  const { data: allYouthPolls, isLoading: isLoadingYouthPolls } = useYouthPolls({});

  const savedProfile = localStorage.getItem('userProfile');
  let userProfile: any;
  let age: number = 0;
  if (savedProfile) {
    userProfile = JSON.parse(savedProfile);
    age = calculateAge(userProfile.birthdate);
  }

  if (!theme) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p>Thème non trouvé</p>
      </div>
    );
  }

  // Filter data by themeId
  let themeConsultations = allConsultations?.filter((c) => c.themeId === themeId) || [];
  const themePetitions = allPetitions?.filter((p) => p.themeId === themeId) || [];
  const themeVotes = allVotes?.filter((v) => v.themeId === themeId) || [];
  const themeLegislativeConsultations = legislativeConsultations?.filter((c) => c.themeId === themeId) || [];
  themeConsultations = [...themeConsultations, ...themeLegislativeConsultations];
  const themeSignalements = allSignalements?.filter((s) => s.themeId === themeId) || [];
  const themeYouthPolls = allYouthPolls?.filter((p) => p.themeId === themeId) || [];
  const totalProcesses = themeConsultations.length + themeSignalements.length + themePetitions.length + themeVotes.length + themeYouthPolls.length;

  // Get localized theme name from legacy format
  const themeName = tLocal(theme.name)

  const isLoading = isLoadingConsultations || isLoadingPetitions || isLoadingVotes || isLoadingSignalements || isLoadingYouthPolls;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-gray-600">
          {language === 'fr' && 'Chargement...'}
          {language === 'de' && 'Wird geladen...'}
          {language === 'en' && 'Loading...'}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-6xl">{theme.icon}</span>
          <div>
            <h1 className="text-4xl text-gray-900">{themeName}</h1>
            <p className="text-xl text-gray-600 mt-2">
              {language === 'fr' && 'Toutes les activités participatives sur cette thématique'}
              {language === 'de' && 'Alle partizipativen Aktivitäten zu diesem Thema'}
              {language === 'en' && 'All participatory activities on this topic'}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 flex-wrap h-auto gap-2">
          <TabsTrigger value="all">
            {language === 'fr' && 'Tout voir'}
            {language === 'de' && 'Alles anzeigen'}
            {language === 'en' && 'View all'}
          </TabsTrigger>
          <TabsTrigger value="processes">
            {language === 'fr' && `Processus (${totalProcesses})`}
            {language === 'de' && `Prozesse (${totalProcesses})`}
            {language === 'en' && `Processes (${totalProcesses})`}
          </TabsTrigger>
          <TabsTrigger value="consultations">
            {language === 'fr' && `Concertations (${themeConsultations.length})`}
            {language === 'de' && `Konsultationen (${themeConsultations.length})`}
            {language === 'en' && `Consultations (${themeConsultations.length})`}
          </TabsTrigger>
          <TabsTrigger value="petitions">
            {language === 'fr' && `Pétitions (${themePetitions.length})`}
            {language === 'de' && `Petitionen (${themePetitions.length})`}
            {language === 'en' && `Petitions (${themePetitions.length})`}
          </TabsTrigger>
          <TabsTrigger value="votes">
            {language === 'fr' && `Votes (${themeVotes.length})`}
            {language === 'de' && `Abstimmungen (${themeVotes.length})`}
            {language === 'en' && `Votes (${themeVotes.length})`}
          </TabsTrigger>
          <TabsTrigger value="youth-polls">
            {language === 'fr' && `Espace Jeunesse (${themeYouthPolls.length})`}
            {language === 'de' && `Jugendbereich (${themeYouthPolls.length})`}
            {language === 'en' && `Youth Space (${themeYouthPolls.length})`}
          </TabsTrigger>
          <TabsTrigger value="signalements">
            {language === 'fr' && `Signalements (${themeSignalements.length})`}
            {language === 'de' && `Meldungen (${themeSignalements.length})`}
            {language === 'en' && `Reports (${themeSignalements.length})`}
          </TabsTrigger>

        </TabsList>

        {/* All */}
        <TabsContent value="all" className="space-y-8">
          {themeConsultations.length > 0 && (
            <div>
              <h2 className="text-2xl mb-4">
                {language === 'fr' && 'Concertations'}
                {language === 'de' && 'Konsultationen'}
                {language === 'en' && 'Consultations'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {themeConsultations.map((consultation) => (
                  <Link key={consultation.id} to={`/consultations/${consultation.id}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <StatusBadge status={consultation.status} />
                        </div>
                        <CardTitle>{tLocal(consultation.title)}</CardTitle>
                        <CardDescription>{tLocal(consultation.description)}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-gray-600">
                          {new Date(consultation.endDate).toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'de' ? 'de-DE' : 'en-US')}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {themePetitions.length > 0 && (
            <div>
              <h2 className="text-2xl mb-4">
                {language === 'fr' && 'Pétitions'}
                {language === 'de' && 'Petitionen'}
                {language === 'en' && 'Petitions'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {themePetitions.map((petition) => {
                  const percentage = (petition.currentSignatures / petition.targetSignatures) * 100;
                  return (
                    <Link key={petition.id} to={`/petitions/${petition.slug}`}>
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between mb-2">
                            <StatusBadge status={petition.status} />
                          </div>
                          <CardTitle>{tLocal(petition.title)}</CardTitle>
                          <CardDescription>{tLocal(petition.description)}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-2">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-600">
                                {petition.currentSignatures} / {petition.targetSignatures} {language === 'fr' ? 'signatures' : language === 'de' ? 'Unterschriften' : 'signatures'}
                              </span>
                              <span>{percentage.toFixed(0)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="h-2 rounded-full transition-all"
                                style={{
                                  width: `${Math.min(percentage, 100)}%`,
                                  backgroundColor: theme.color,
                                }}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {themeVotes.length > 0 && (
            <div>
              <h2 className="text-2xl mb-4">
                {language === 'fr' && 'Votes & Référendums'}
                {language === 'de' && 'Abstimmungen & Referenden'}
                {language === 'en' && 'Votes & Referendums'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {themeVotes.map((vote) => (
                  <Link key={vote.id} to={`/votes/${vote.slug}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <StatusBadge status={vote.status} />
                        </div>
                        <CardTitle>{tLocal(vote.title)}</CardTitle>
                        <CardDescription>{tLocal(vote.question)}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-gray-600">
                          {new Date(vote.startDate).toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'de' ? 'de-DE' : 'en-US')} -{' '}
                          {new Date(vote.endDate).toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'de' ? 'de-DE' : 'en-US')}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {themeYouthPolls.length > 0 && (
            <div>
              <h2 className="text-2xl mb-4">
                {language === 'fr' && 'Espace Jeunesse'}
                {language === 'de' && 'Jugendbereich'}
                {language === 'en' && 'Youth Space'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {themeYouthPolls.map((poll) => (
                  <YouthPollCard key={poll.id} poll={poll} age={age} />
                ))}
              </div>
            </div>
          )}

          {themeSignalements.length > 0 && (
            <div>
              <h2 className="text-2xl mb-4">
                {language === 'fr' && 'Signalements'}
                {language === 'de' && 'Meldungen'}
                {language === 'en' && 'Reports'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {themeSignalements.map((signalement) => (
                  <Link key={signalement.id} to={`/signalements/${signalement.id}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <StatusBadge status={signalement.status} />
                        </div>
                        <CardTitle>{tLocal(signalement.title)}</CardTitle>
                        <CardDescription>{tLocal(signalement.description)}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-gray-600">
                          {new Date(signalement.createdAt).toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'de' ? 'de-DE' : 'en-US')}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {themeConsultations.length === 0 && themePetitions.length === 0 && themeVotes.length === 0 && themeSignalements.length === 0 && themeYouthPolls.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {language === 'fr' && 'Aucune activité pour ce thème pour le moment'}
                {language === 'de' && 'Derzeit keine Aktivitäten zu diesem Thema'}
                {language === 'en' && 'No activities for this theme at the moment'}
              </p>
            </div>
          )}
        </TabsContent>

        {/* Processes Tab */}
        <TabsContent value="processes">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {themeConsultations.map((consultation) => (
              <Link key={consultation.id} to={`/consultations/${consultation.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <StatusBadge status={consultation.status} />
                    </div>
                    <CardTitle>{tLocal(consultation.title)}</CardTitle>
                    <CardDescription>{tLocal(consultation.description)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {consultation.stats.totalContributions} {language === 'fr' ? 'contributions' : language === 'de' ? 'Beiträge' : 'contributions'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        {/* Consultations tab */}
        <TabsContent value="consultations">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {themeConsultations.map((consultation) => (
              <Link key={consultation.id} to={`/consultations/${consultation.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <StatusBadge status={consultation.status} />
                    <CardTitle>{tLocal(consultation.title)}</CardTitle>
                    <CardDescription>{tLocal(consultation.description)}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="petitions">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {themePetitions.map((petition) => {
              const percentage = (petition.currentSignatures / petition.targetSignatures) * 100;
              return (
                <Link key={petition.id} to={`/petitions/${petition.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <StatusBadge status={petition.status} />
                      <CardTitle>{tLocal(petition.title)}</CardTitle>
                      <CardDescription>{tLocal(petition.description)}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${Math.min(percentage, 100)}%`,
                            backgroundColor: theme.color,
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="votes">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {themeVotes.map((vote) => (
              <Link key={vote.id} to={`/votes/${vote.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <StatusBadge status={vote.status} />
                    <CardTitle>{tLocal(vote.title)}</CardTitle>
                    <CardDescription>{tLocal(vote.question)}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="youth-polls">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {themeYouthPolls.map((poll) => (
              <YouthPollCard key={poll.id} poll={poll} age={age} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="signalements">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {themeSignalements.map((signalement) => (
              <Link key={signalement.id} to={`/signalements/${signalement.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <StatusBadge status={signalement.status} />
                    <CardTitle>{tLocal(signalement.title)}</CardTitle>
                    <CardDescription>{tLocal(signalement.description)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600">
                      {new Date(signalement.createdAt).toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'de' ? 'de-DE' : 'en-US')}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
