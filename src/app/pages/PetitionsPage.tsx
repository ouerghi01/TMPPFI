import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { PageBanner } from '../components/PageBanner';
import { PageLayout } from '../components/layout/PageLayout';
import { KPICard } from '../components/layout/KPICard';
import { FilterBar } from '../components/layout/FilterBar';
import { FilterField } from '../components/layout/FilterField';
import { ThemeTag } from '../components/ThemeTag';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { usePetitions, useThemes } from '../hooks/useApi';
import type { PetitionDTO, LocalizedString } from '../types';
import { FileText, Users, TrendingUp, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { Edit } from 'lucide-react';

export function PetitionsPage() {
  const { t, language, tLocal } = useLanguage();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [signedPetitions, setSignedPetitions] = useState<string[]>([]); // Track signed petitions by ID

  // Fetch data using React Query hooks
  const { data: petitions, isLoading, error } = usePetitions();
  const { data: themesData } = useThemes();

  const handleSignPetition = (e: React.MouseEvent, petitionId: string, petitionTitle: LocalizedString) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation();
    
    setSignedPetitions(prev => [...prev, petitionId]);
    
    toast.success(
      language === 'fr' ? `Signature ajoutée à "${tLocal(petitionTitle)}"` :
      language === 'de' ? `Unterschrift zu "${tLocal(petitionTitle)}" hinzugefügt` :
      `Signature added to "${tLocal(petitionTitle)}"`
    );
  };

  const handleUnsignPetition = (e: React.MouseEvent, petitionId: string, petitionTitle: LocalizedString) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation();
    
    setSignedPetitions(prev => prev.filter(id => id !== petitionId));
    
    toast.success(
      language === 'fr' ? `Signature retirée de "${tLocal(petitionTitle)}"` :
      language === 'de' ? `Unterschrift von "${tLocal(petitionTitle)}" entfernt` :
      `Signature removed from "${tLocal(petitionTitle)}"`
    );
  };

  // Show loading state
  if (isLoading) {
    return (
      <div>
        <PageBanner
          title={
            language === 'fr' ? 'Pétitions citoyennes' :
            language === 'de' ? 'Bürgerpetitionen' :
            'Citizen Petitions'
          }
          description={
            language === 'fr' ? 'Signez ou lancez une pétition pour faire entendre votre voix' :
            language === 'de' ? 'Unterschreiben oder starten Sie eine Petition, um Ihre Stimme zu erheben' :
            'Sign or start a petition to make your voice heard'
          }
          gradient="from-green-600 to-emerald-600"
          icon={<FileText className="w-12 h-12 text-white" />}
        />
        <PageLayout className="py-8">
          <div className="text-center py-12">
            <p className="text-gray-600">Chargement des pétitions...</p>
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
            language === 'fr' ? 'Pétitions citoyennes' :
            language === 'de' ? 'Bürgerpetitionen' :
            'Citizen Petitions'
          }
          description={
            language === 'fr' ? 'Signez ou lancez une pétition pour faire entendre votre voix' :
            language === 'de' ? 'Unterschreiben oder starten Sie eine Petition, um Ihre Stimme zu erheben' :
            'Sign or start a petition to make your voice heard'
          }
          gradient="from-green-600 to-emerald-600"
          icon={<FileText className="w-12 h-12 text-white" />}
        />
        <PageLayout className="py-8">
          <div className="text-center py-12">
            <p className="text-red-600">Erreur lors du chargement des données</p>
          </div>
        </PageLayout>
      </div>
    );
  }

  const filteredPetitions = (petitions || []).filter((petition) => {
    if (selectedTheme && selectedTheme !== 'all' && petition.themeId !== selectedTheme) return false;
    if (selectedStatus && selectedStatus !== 'all' && petition.status !== selectedStatus) return false;
    return true;
  });

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open':
        return {
          label: language === 'fr' ? 'Ouvert' : language === 'de' ? 'Offen' : 'Open',
          variant: 'default' as const,
          className: 'bg-green-100 text-green-800 hover:bg-green-100'
        };
      case 'closed':
        return {
          label: language === 'fr' ? 'Fermé' : language === 'de' ? 'Geschlossen' : 'Closed',
          variant: 'secondary' as const,
          className: 'bg-gray-100 text-gray-800 hover:bg-gray-200/50'
        };
      case 'under_review':
        return {
          label: language === 'fr' ? 'Seuil atteint' : language === 'de' ? 'Schwelle erreicht' : 'Threshold reached',
          variant: 'default' as const,
          className: 'bg-blue-100 text-blue-800 hover:bg-blue-100'
        };
      default:
        return {
          label: status,
          variant: 'default' as const,
          className: ''
        };
    }
  };

  // Calculate statistics
  const activePetitions = petitions?.filter((p) => p.status === 'open').length || 0;
  const thresholdReached = petitions?.filter((p) => p.status === 'under_review').length || 0;
  const totalPetitions = petitions?.length || 0;
  const totalSignatures = petitions?.reduce((sum, p) => sum + (p.currentSignatures || 0), 0) || 0;

  return (
    <div>
      <PageBanner
        title={
          language === 'fr' ? 'Pétitions citoyennes' :
          language === 'de' ? 'Bürgerpetitionen' :
          'Citizen Petitions'
        }
        description={
          language === 'fr' ? 'Signez ou lancez une pétition pour faire entendre votre voix' :
          language === 'de' ? 'Unterschreiben oder starten Sie eine Petition, um Ihre Stimme zu erheben' :
          'Sign or start a petition to make your voice heard'
        }
        gradient="from-green-600 to-emerald-600"
        icon={<FileText className="w-12 h-12 text-white" />}
      />

      <PageLayout className="py-8">
        {/* KPI Cards - Standard 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <KPICard
            label={
              language === 'fr' ? 'Pétitions actives' :
              language === 'de' ? 'Aktive Petitionen' :
              'Active petitions'
            }
            value={activePetitions}
            icon={FileText}
            variant="green"
            type="primary"
          />

          <KPICard
            label={
              language === 'fr' ? 'Seuil atteint' :
              language === 'de' ? 'Schwelle erreicht' :
              'Threshold reached'
            }
            value={thresholdReached}
            icon={TrendingUp}
            variant="blue"
            type="primary"
          />

          <KPICard
            label={
              language === 'fr' ? 'Total pétitions' :
              language === 'de' ? 'Petitionen insgesamt' :
              'Total petitions'
            }
            value={totalPetitions}
            icon={FileText}
            variant="purple"
            type="primary"
          />

          <KPICard
            label={
              language === 'fr' ? 'Signatures totales' :
              language === 'de' ? 'Unterschriften insgesamt' :
              'Total signatures'
            }
            value={totalSignatures.toLocaleString()}
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
                  <SelectItem value="open">
                    {language === 'fr' && 'Ouvertes'}
                    {language === 'de' && 'Offen'}
                    {language === 'en' && 'Open'}
                  </SelectItem>
                  <SelectItem value="closed">
                    {language === 'fr' && 'Fermées'}
                    {language === 'de' && 'Geschlossen'}
                    {language === 'en' && 'Closed'}
                  </SelectItem>
                  <SelectItem value="under_review">
                    {language === 'fr' && 'Seuil atteint'}
                    {language === 'de' && 'Schwelle erreicht'}
                    {language === 'en' && 'Threshold reached'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </FilterField>
          </FilterBar>
        </div>

        {/* Petitions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredPetitions.map((petition, index) => {
            const percentage = (petition.currentSignatures / petition.targetSignatures) * 100;
            const daysLeft = Math.ceil(
              (new Date(petition.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
            );
            const statusInfo = getStatusLabel(petition.status);
            const isSigned = signedPetitions.includes(petition.id);
            const canUnsign = isSigned && petition.status === 'open'; // Can only unsign if petition is open

            return (
              <motion.div
                key={petition.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 group border-0 shadow-md">
                  <CardHeader className="flex-shrink-0">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <ThemeTag themeId={petition.themeId} />
                        {isSigned && (
                          <Badge className="bg-blue-600 hover:bg-blue-700">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            {language === 'fr' && 'Signé'}
                            {language === 'de' && 'Unterschrieben'}
                            {language === 'en' && 'Signed'}
                          </Badge>
                        )}
                      </div>
                      <Badge className={statusInfo.className}>
                        {statusInfo.label}
                      </Badge>
                    </div>
                    <CardTitle className="line-clamp-2 text-xl group-hover:text-blue-600 transition-colors">
                      {tLocal(petition.title)}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-base">
                      {tLocal(petition.description)}
                    </CardDescription>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                      <Users className="w-4 h-4" />
                      <span>
                        {language === 'fr' && 'Par '}
                        {language === 'de' && 'Von '}
                        {language === 'en' && 'By '}
                        <span className="font-medium text-gray-900">{petition.author.firstName} {petition.author.lastName}</span>
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-grow flex flex-col">
                    {/* Progress Section */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="font-semibold text-gray-900">{petition.currentSignatures.toLocaleString()}</span>
                          <span className="text-gray-600">/ {petition.targetSignatures.toLocaleString()}</span>
                        </div>
                        <span className="font-semibold text-gray-900">{percentage.toFixed(0)}%</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="relative w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className={`absolute top-0 left-0 h-full rounded-full ${
                            percentage >= 100 
                              ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                              : 'bg-gradient-to-r from-blue-500 to-blue-600'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(percentage, 100)}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>

                      {/* Time remaining */}
                      {petition.status === 'open' && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          {daysLeft > 0 ? (
                            <>
                              <span className="font-medium text-gray-900">{daysLeft}</span>{' '}
                              {language === 'fr' && 'jours restants'}
                              {language === 'de' && 'Tage verbleibend'}
                              {language === 'en' && 'days remaining'}
                            </>
                          ) : (
                            <span className="text-red-600 font-medium">
                              {language === 'fr' && 'Expire bientôt'}
                              {language === 'de' && 'Läuft bald ab'}
                              {language === 'en' && 'Expiring soon'}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Success Badge */}
                      {petition.status === 'under_review' && (
                        <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <p className="text-sm text-green-800 font-medium">
                            {language === 'fr' && 'Objectif atteint ! En cours d\'examen'}
                            {language === 'de' && 'Ziel erreicht! In Prüfung'}
                            {language === 'en' && 'Goal reached! Under review'}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-auto pt-4 border-t space-y-2">
                      {/* Sign/Unsign button - only show if petition is open or if already signed */}
                      {(petition.status === 'open' || isSigned) && (
                        <>
                          {!isSigned ? (
                            <Button 
                              onClick={(e) => handleSignPetition(e, petition.id, petition.title)}
                              className="w-full gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                            >
                              <Edit className="w-4 h-4" />
                              {language === 'fr' && 'Signer la pétition'}
                              {language === 'de' && 'Petition unterschreiben'}
                              {language === 'en' && 'Sign the petition'}
                            </Button>
                          ) : canUnsign ? (
                            <>
                              <Button 
                                onClick={(e) => handleUnsignPetition(e, petition.id, petition.title)}
                                variant="destructive"
                                className="w-full gap-2"
                              >
                                <Edit className="w-4 h-4" />
                                {language === 'fr' && 'Retirer ma signature'}
                                {language === 'de' && 'Unterschrift zurückziehen'}
                                {language === 'en' && 'Remove signature'}
                              </Button>
                              <p className="text-xs text-gray-600 text-center">
                                {language === 'fr' && 'Vous pouvez retirer votre signature tant que la pétition est ouverte'}
                                {language === 'de' && 'Sie können Ihre Unterschrift zurückziehen, solange die Petition offen ist'}
                                {language === 'en' && 'You can remove your signature while the petition is open'}
                              </p>
                            </>
                          ) : (
                            <>
                              <Button 
                                variant="secondary"
                                className="w-full gap-2"
                                disabled
                              >
                                <CheckCircle2 className="w-4 h-4" />
                                {language === 'fr' && 'Déjà signé'}
                                {language === 'de' && 'Bereits unterschrieben'}
                                {language === 'en' && 'Already signed'}
                              </Button>
                              <p className="text-xs text-gray-500 text-center italic">
                                {language === 'fr' && 'La pétition est fermée'}
                                {language === 'de' && 'Die Petition ist geschlossen'}
                                {language === 'en' && 'The petition is closed'}
                              </p>
                            </>
                          )}
                        </>
                      )}
                      
                      {/* View details button */}
                      <Link to={`/petitions/${petition.slug}`} className="block">
                        <Button 
                          variant={petition.status === 'open' || isSigned ? 'outline' : 'default'}
                          className={petition.status === 'open' || isSigned ? 
                            'w-full gap-2' : 
                            'w-full gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 group-hover:shadow-lg transition-all'
                          }
                        >
                          {language === 'fr' && 'Voir les détails'}
                          {language === 'de' && 'Details ansehen'}
                          {language === 'en' && 'View details'}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredPetitions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <FileText className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {language === 'fr' && 'Aucune pétition trouvée'}
              {language === 'de' && 'Keine Petition gefunden'}
              {language === 'en' && 'No petition found'}
            </h3>
            <p className="text-gray-600">
              {language === 'fr' && 'Aucune pétition ne correspond à vos critères de recherche.'}
              {language === 'de' && 'Keine Petition entspricht Ihren Suchkriterien.'}
              {language === 'en' && 'No petition matches your search criteria.'}
            </p>
          </motion.div>
        )}
      </PageLayout>
    </div>
  );
}