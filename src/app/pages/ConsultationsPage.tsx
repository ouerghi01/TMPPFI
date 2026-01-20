import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { PageBanner } from '../components/PageBanner';
import { PageLayout } from '../components/layout/PageLayout';
import { KPICard } from '../components/layout/KPICard';
import { FilterBar } from '../components/layout/FilterBar';
import { FilterField } from '../components/layout/FilterField';
import { ContentGrid } from '../components/layout/ContentGrid';
import { ThemeTag } from '../components/ThemeTag';
import { StatusBadge } from '../components/StatusBadge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useConsultations, useThemes } from '../hooks/useApi';
import type { ConsultationDTO } from '../types';
import { Calendar, Users, MessageSquare, ArrowRight, Filter, MapPin, Heart, TrendingUp, FileText } from 'lucide-react';

export function ConsultationsPage() {
  const { t, language, tLocal } = useLanguage();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Fetch data using React Query hooks
  const { data: consultations, isLoading, error } = useConsultations();
  const { data: themesData } = useThemes();

  // Show loading state
  if (isLoading) {
    return (
      <div>
        <PageBanner
          title={
            language === 'fr' ? 'Consultations publiques' :
            language === 'de' ? 'Öffentliche Konsultationen' :
            'Public Consultations'
          }
          description={
            language === 'fr' ? 'Donnez votre avis sur les projets et politiques de votre commune' :
            language === 'de' ? 'Geben Sie Ihre Meinung zu Projekten und Richtlinien Ihrer Gemeinde ab' :
            'Give your opinion on your community\'s projects and policies'
          }
          gradient="from-cyan-600 to-blue-600"
          icon={<MessageSquare className="w-12 h-12 text-white" />}
        />
        <PageLayout className="py-8">
          <div className="text-center py-12">
            <p className="text-gray-600">Chargement des consultations...</p>
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
            language === 'fr' ? 'Consultations publiques' :
            language === 'de' ? 'Öffentliche Konsultationen' :
            'Public Consultations'
          }
          description={
            language === 'fr' ? 'Donnez votre avis sur les projets et politiques de votre commune' :
            language === 'de' ? 'Geben Sie Ihre Meinung zu Projekten und Richtlinien Ihrer Gemeinde ab' :
            'Give your opinion on your community\'s projects and policies'
          }
          gradient="from-cyan-600 to-blue-600"
          icon={<MessageSquare className="w-12 h-12 text-white" />}
        />
        <PageLayout className="py-8">
          <div className="text-center py-12">
            <p className="text-red-600">Erreur lors du chargement des données</p>
          </div>
        </PageLayout>
      </div>
    );
  }

  const filteredConsultations = (consultations || []).filter((consultation) => {
    if (selectedTheme && consultation.themeId !== selectedTheme) return false;
    if (selectedStatus && consultation.status !== selectedStatus) return false;
    return true;
  });

  // Calculate statistics
  const totalConsultations = consultations?.length || 0;
  const openConsultations = consultations?.filter(c => c.status === 'open').length || 0;
  const totalParticipants = consultations?.reduce((sum, c) => sum + (c.registeredParticipants || 0), 0) || 0;
  const totalComments = consultations?.reduce((sum, c) => sum + (c.stats?.totalComments || 0), 0) || 0;
  const engagementRate = totalConsultations > 0 
    ? Math.round((totalParticipants / totalConsultations) * 100) / 100
    : 0;

  return (
    <div>
      <PageBanner
        title={
          language === 'fr' ? 'Consultations publiques' :
          language === 'de' ? 'Öffentliche Konsultationen' :
          'Public Consultations'
        }
        description={
          language === 'fr' ? 'Donnez votre avis sur les projets et politiques de votre commune' :
          language === 'de' ? 'Geben Sie Ihre Meinung zu Projekten und Richtlinien Ihrer Gemeinde ab' :
          'Give your opinion on your community\'s projects and policies'
        }
        gradient="from-cyan-600 to-blue-600"
        icon={<MessageSquare className="w-12 h-12 text-white" />}
      />
      
      <PageLayout className="py-8">
        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <KPICard
            label={
              language === 'fr' ? 'Total' :
              language === 'de' ? 'Gesamt' :
              'Total'
            }
            value={totalConsultations}
            icon={FileText}
            variant="blue"
          />

          <KPICard
            label={
              language === 'fr' ? 'Ouvertes' :
              language === 'de' ? 'Offen' :
              'Open'
            }
            value={openConsultations}
            icon={TrendingUp}
            variant="green"
          />

          <KPICard
            label={
              language === 'fr' ? 'Participants' :
              language === 'de' ? 'Teilnehmer' :
              'Participants'
            }
            value={totalParticipants.toLocaleString()}
            icon={Users}
            variant="purple"
          />

          <KPICard
            label={
              language === 'fr' ? 'Contributions' :
              language === 'de' ? 'Beiträge' :
              'Contributions'
            }
            value={totalComments.toLocaleString()}
            icon={Heart}
            variant="orange"
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
              <Select value={selectedTheme || 'all'} onValueChange={setSelectedTheme}>
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
              language === 'fr' ? `${t('common.filter')} par statut` :
              language === 'de' ? `${t('common.filter')} nach Status` :
              `${t('common.filter')} by status`
            }>
              <Select value={selectedStatus || 'all'} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('common.all')}</SelectItem>
                  <SelectItem value="open">Ouvertes</SelectItem>
                  <SelectItem value="closed">Fermées</SelectItem>
                </SelectContent>
              </Select>
            </FilterField>
          </FilterBar>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full mb-8">
          <TabsList>
            <TabsTrigger value="all">Toutes ({filteredConsultations.length})</TabsTrigger>
            <TabsTrigger value="debate">Débats ({filteredConsultations.filter(c => c.type === 'online_debate').length})</TabsTrigger>
            <TabsTrigger value="proposal">Propositions ({filteredConsultations.filter(c => c.type === 'citizen_proposal').length})</TabsTrigger>
            <TabsTrigger value="meeting">Rencontres ({filteredConsultations.filter(c => c.type === 'public_meeting').length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <ConsultationsList consultations={filteredConsultations} />
          </TabsContent>

          <TabsContent value="debate">
            <ConsultationsList consultations={filteredConsultations.filter(c => c.type === 'online_debate')} />
          </TabsContent>

          <TabsContent value="proposal">
            <ConsultationsList consultations={filteredConsultations.filter(c => c.type === 'citizen_proposal')} />
          </TabsContent>

          <TabsContent value="meeting">
            <ConsultationsList consultations={filteredConsultations.filter(c => c.type === 'public_meeting')} />
          </TabsContent>
        </Tabs>

        {filteredConsultations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Aucune concertation ne correspond à vos critères.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl text-gray-900">
                {language === 'fr' && 'Participez aux concertations'}
                {language === 'de' && 'Nehmen Sie an Beratungen teil'}
                {language === 'en' && 'Participate in consultations'}
              </h2>
            </div>
            <div className="space-y-3 text-gray-700 mb-6">
              <p>• <strong>Débats :</strong> Échangez sur les sujets qui vous tiennent à cœur</p>
              <p>• <strong>Propositions :</strong> Soumettez vos idées et soutenez celles des autres</p>
              <p>• <strong>Rencontres :</strong> Rencontrez les élus et acteurs locaux en personne</p>
            </div>
            <Link to="/propose-idea">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <MessageSquare className="w-5 h-5" />
                {language === 'fr' && 'Proposer une idée'}
                {language === 'de' && 'Eine Idee vorschlagen'}
                {language === 'en' && 'Propose an idea'}
              </Button>
            </Link>
          </div>
        </div>
      </PageLayout>
    </div>
  );
}

// Component to display consultations list
function ConsultationsList({ consultations }: { consultations: ConsultationDTO[] }) {
  const { t, language, tLocal } = useLanguage();
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'online_debate':
        return <MessageSquare className="w-5 h-5" />;
      case 'citizen_proposal':
        return <MessageSquare className="w-5 h-5" />;
      case 'public_meeting':
        return <MessageSquare className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'online_debate':
        return 'Débat';
      case 'citizen_proposal':
        return 'Proposition';
      case 'public_meeting':
        return 'Rencontre';
      default:
        return type;
    }
  };

  return (
    <ContentGrid>
      {consultations.map((consultation) => (
        <Card key={consultation.id} className="hover:shadow-lg transition-shadow flex flex-col h-full">
          <CardHeader className="flex-shrink-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <ThemeTag themeId={consultation.themeId} />
                <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-300">
                  {getTypeIcon(consultation.type)}
                  {getTypeName(consultation.type)}
                </span>
              </div>
              <StatusBadge status={consultation.status} />
            </div>
            <CardTitle className="line-clamp-2">{tLocal(consultation.title)}</CardTitle>
            <CardDescription className="text-base mt-2 line-clamp-3">
              {tLocal(consultation.description)}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col flex-grow">
            <div className="space-y-4 flex-grow">
              {/* Details */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(consultation.startDate).toLocaleDateString('fr-FR')}</span>
                </div>
                {consultation.location && (
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{tLocal(consultation.location.name)}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Users className="w-4 h-4" />
                  <span>{consultation.registeredParticipants} participants</span>
                </div>
              </div>

              {/* Comments for proposals */}
              {consultation.type === 'citizen_proposal' && consultation.stats?.totalComments !== undefined && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-800">
                    <Heart className="w-4 h-4" />
                    <span className="font-medium">{consultation.stats.totalComments} contributions</span>
                  </div>
                </div>
              )}
            </div>

            {/* Button aligned at bottom */}
            {consultation.status === 'open' && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link to={`/consultations/${consultation.slug}`}>
                  <Button className="w-full gap-2">
                    {t('common.participate')}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </ContentGrid>
  );
}