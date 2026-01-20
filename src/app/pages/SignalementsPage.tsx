import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { PageBanner } from '../components/PageBanner';
import { PageLayout } from '../components/layout/PageLayout';
import { KPICard } from '../components/layout/KPICard';
import { SignalementCard } from '../components/cards/SignalementCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { useSignalements, useGeoSignalements, useSignalementStats } from '../hooks/useApi';
import { AlertCircle, Map, List, Plus, TrendingUp, MapPin, ThumbsUp } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

export function SignalementsPage() {
  const { t, language, tLocal } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'list' | 'map'>('list');

  // Fetch data using React Query hooks
  const { data: signalements, isLoading, error } = useSignalements({ 
    category: selectedCategory || undefined,
    status: selectedStatus || undefined 
  });
  const { data: geoSignalements } = useGeoSignalements();
  const { data: stats } = useSignalementStats();

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, { fr: string; de: string; en: string }> = {
      infrastructure: { fr: 'Infrastructure', de: 'Infrastruktur', en: 'Infrastructure' },
      cleanliness: { fr: 'Propreté', de: 'Sauberkeit', en: 'Cleanliness' },
      safety: { fr: 'Sécurité', de: 'Sicherheit', en: 'Safety' },
      environment: { fr: 'Environnement', de: 'Umwelt', en: 'Environment' },
      public_space: { fr: 'Espace public', de: 'Öffentlicher Raum', en: 'Public space' },
      transport: { fr: 'Transport', de: 'Transport', en: 'Transport' },
      noise: { fr: 'Nuisances sonores', de: 'Lärmbelästigung', en: 'Noise' },
      other: { fr: 'Autre', de: 'Andere', en: 'Other' },
    };
    return labels[category]?.[language] || category;
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, { fr: string; de: string; en: string }> = {
      submitted: { fr: 'Soumis', de: 'Eingereicht', en: 'Submitted' },
      under_review: { fr: 'En examen', de: 'In Prüfung', en: 'Under review' },
      in_progress: { fr: 'En cours', de: 'In Bearbeitung', en: 'In progress' },
      resolved: { fr: 'Résolu', de: 'Gelöst', en: 'Resolved' },
      rejected: { fr: 'Rejeté', de: 'Abgelehnt', en: 'Rejected' },
      archived: { fr: 'Archivé', de: 'Archiviert', en: 'Archived' },
    };
    return labels[status]?.[language] || status;
  };

  // Show loading state
  if (isLoading) {
    return (
      <div>
        <PageBanner
          title={
            language === 'fr' ? 'Signalements citoyens' :
            language === 'de' ? 'Bürgermeldungen' :
            'Citizen Reports'
          }
          description={
            language === 'fr' ? 'Signalez les problèmes de votre commune et suivez leur traitement' :
            language === 'de' ? 'Melden Sie Probleme in Ihrer Gemeinde und verfolgen Sie deren Bearbeitung' :
            'Report issues in your community and track their resolution'
          }
          gradient="from-red-600 to-orange-600"
          icon={<AlertCircle className="w-12 h-12 text-white" />}
        />
        <PageLayout className="py-8">
          <div className="text-center py-12">
            <p className="text-gray-600">
              {language === 'fr' ? 'Chargement des signalements...' : 
               language === 'de' ? 'Meldungen laden...' : 
               'Loading reports...'}
            </p>
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
            language === 'fr' ? 'Signalements citoyens' :
            language === 'de' ? 'Bürgermeldungen' :
            'Citizen Reports'
          }
          description={
            language === 'fr' ? 'Signalez les problèmes de votre commune et suivez leur traitement' :
            language === 'de' ? 'Melden Sie Probleme in Ihrer Gemeinde und verfolgen Sie deren Bearbeitung' :
            'Report issues in your community and track their resolution'
          }
          gradient="from-red-600 to-orange-600"
          icon={<AlertCircle className="w-12 h-12 text-white" />}
        />
        <PageLayout className="py-8">
          <div className="text-center py-12">
            <p className="text-red-600">
              {language === 'fr' ? 'Erreur lors du chargement des données' : 
               language === 'de' ? 'Fehler beim Laden der Daten' : 
               'Error loading data'}
            </p>
          </div>
        </PageLayout>
      </div>
    );
  }

  const filteredSignalements = signalements || [];

  return (
    <div>
      <PageBanner
        title={
          language === 'fr' ? 'Signalements citoyens' :
          language === 'de' ? 'Bürgermeldungen' :
          'Citizen Reports'
        }
        description={
          language === 'fr' ? 'Signalez les problèmes de votre commune et suivez leur traitement' :
          language === 'de' ? 'Melden Sie Probleme in Ihrer Gemeinde und verfolgen Sie deren Bearbeitung' :
          'Report issues in your community and track their resolution'
        }
        gradient="from-red-600 to-orange-600"
        icon={<AlertCircle className="w-12 h-12 text-white" />}
      />

      <PageLayout className="py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            label={language === 'fr' ? 'Total' : language === 'de' ? 'Gesamt' : 'Total'}
            value={stats?.total || 0}
            variant="blue"
            icon={AlertCircle}
          />
          <KPICard
            label={language === 'fr' ? 'En cours' : language === 'de' ? 'In Bearbeitung' : 'In Progress'}
            value={stats?.byStatus.in_progress || 0}
            variant="orange"
            icon={TrendingUp}
          />
          <KPICard
            label={language === 'fr' ? 'Résolus' : language === 'de' ? 'Gelöst' : 'Resolved'}
            value={stats?.byStatus.resolved || 0}
            variant="green"
            icon={TrendingUp}
          />
          <KPICard
            label={language === 'fr' ? 'Taux de résolution' : language === 'de' ? 'Lösungsrate' : 'Resolution Rate'}
            value={`${stats?.resolutionRate || 0}%`}
            variant="purple"
            icon={TrendingUp}
          />
        </div>

        {/* Filters and Create Button */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Select value={selectedCategory || 'all'} onValueChange={(v) => setSelectedCategory(v === 'all' ? null : v)}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder={language === 'fr' ? 'Catégorie' : language === 'de' ? 'Kategorie' : 'Category'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'fr' ? 'Toutes' : language === 'de' ? 'Alle' : 'All'}</SelectItem>
              <SelectItem value="infrastructure">{getCategoryLabel('infrastructure')}</SelectItem>
              <SelectItem value="cleanliness">{getCategoryLabel('cleanliness')}</SelectItem>
              <SelectItem value="safety">{getCategoryLabel('safety')}</SelectItem>
              <SelectItem value="environment">{getCategoryLabel('environment')}</SelectItem>
              <SelectItem value="public_space">{getCategoryLabel('public_space')}</SelectItem>
              <SelectItem value="transport">{getCategoryLabel('transport')}</SelectItem>
              <SelectItem value="noise">{getCategoryLabel('noise')}</SelectItem>
              <SelectItem value="other">{getCategoryLabel('other')}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedStatus || 'all'} onValueChange={(v) => setSelectedStatus(v === 'all' ? null : v)}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder={language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'fr' ? 'Tous' : language === 'de' ? 'Alle' : 'All'}</SelectItem>
              <SelectItem value="submitted">{getStatusLabel('submitted')}</SelectItem>
              <SelectItem value="under_review">{getStatusLabel('under_review')}</SelectItem>
              <SelectItem value="in_progress">{getStatusLabel('in_progress')}</SelectItem>
              <SelectItem value="resolved">{getStatusLabel('resolved')}</SelectItem>
            </SelectContent>
          </Select>

          <div className="ml-auto">
            <Link to="/signalements/create">
              <Button className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                {language === 'fr' ? 'Créer un signalement' : 
                 language === 'de' ? 'Meldung erstellen' : 
                 'Create Report'}
              </Button>
            </Link>
          </div>
        </div>

        {/* Tabs: List / Map */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'list' | 'map')} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="list">
              <List className="w-4 h-4 mr-2" />
              {language === 'fr' ? 'Liste' : language === 'de' ? 'Liste' : 'List'}
            </TabsTrigger>
            <TabsTrigger value="map">
              <Map className="w-4 h-4 mr-2" />
              {language === 'fr' ? 'Carte' : language === 'de' ? 'Karte' : 'Map'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="mt-6">
            {filteredSignalements.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  {language === 'fr' ? 'Aucun signalement trouvé' : 
                   language === 'de' ? 'Keine Meldungen gefunden' : 
                   'No reports found'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSignalements.map((signalement) => (
                  <SignalementCard key={signalement.id} signalement={signalement} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="map" className="mt-6">
            <div className="h-[600px] rounded-lg overflow-hidden border border-gray-200 bg-gradient-to-br from-blue-50 to-purple-50 relative">
              {/* Map placeholder avec grille */}
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-8 grid-rows-6 h-full">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="border border-gray-300" />
                  ))}
                </div>
              </div>

              {/* Signalements positionnés sur la carte */}
              <div className="relative h-full p-8">
                {geoSignalements && geoSignalements.length > 0 ? (
                  <>
                    {geoSignalements.slice(0, 12).map((signalement, index) => {
                      // Position pseudo-aléatoire basée sur l'index
                      const positions = [
                        { top: '15%', left: '20%' },
                        { top: '25%', left: '65%' },
                        { top: '35%', left: '35%' },
                        { top: '45%', left: '75%' },
                        { top: '55%', left: '15%' },
                        { top: '65%', left: '50%' },
                        { top: '20%', left: '85%' },
                        { top: '75%', left: '30%' },
                        { top: '30%', left: '55%' },
                        { top: '80%', left: '70%' },
                        { top: '40%', left: '10%' },
                        { top: '70%', left: '85%' },
                      ];
                      const pos = positions[index % positions.length];

                      return (
                        <Link
                          key={signalement.id}
                          to={`/signalements/${signalement.id}`}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                          style={pos}
                        >
                          <div className="relative">
                            {/* Pin marker */}
                            <div className="w-10 h-10 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                              <MapPin className="w-5 h-5 text-white" />
                            </div>
                            
                            {/* Popup on hover */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                              <div className="bg-white rounded-lg shadow-xl p-3 w-64 border border-gray-200">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <p className="font-semibold text-sm line-clamp-2">
                                    {tLocal(signalement.title)}
                                  </p>
                                  <StatusBadge status={signalement.status} />
                                </div>
                                <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                                  {tLocal(signalement.description)}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <ThumbsUp className="w-3 h-3" />
                                  <span>{signalement.upvotes}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <Map className="w-16 h-16 text-gray-400 mx-auto" />
                      <div>
                        <p className="text-lg font-medium text-gray-700">
                          {language === 'fr' ? 'Vue cartographique' :
                           language === 'de' ? 'Kartenansicht' :
                           'Map View'}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          {language === 'fr' ? 'Aucun signalement géolocalisé' :
                           language === 'de' ? 'Keine georeferenzierten Meldungen' :
                           'No geolocated reports'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Légende */}
                {geoSignalements && geoSignalements.length > 0 && (
                  <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
                    <h4 className="text-sm font-semibold mb-2">
                      {language === 'fr' ? 'Légende' :
                       language === 'de' ? 'Legende' :
                       'Legend'}
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                        <span>
                          {language === 'fr' ? 'Signalement' :
                           language === 'de' ? 'Meldung' :
                           'Report'}
                        </span>
                      </div>
                      <div className="text-gray-600">
                        {language === 'fr' ? `${geoSignalements.length} signalements affichés` :
                         language === 'de' ? `${geoSignalements.length} angezeigte Meldungen` :
                         `${geoSignalements.length} reports displayed`}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </PageLayout>
    </div>
  );
}