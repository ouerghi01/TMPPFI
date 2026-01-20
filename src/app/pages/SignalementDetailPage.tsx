import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { PageBanner } from '../components/PageBanner';
import { PageLayout } from '../components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { useSignalement } from '../hooks/useApi';
import { 
  AlertCircle, 
  MapPin, 
  Calendar, 
  User, 
  ThumbsUp, 
  Tag, 
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';
import type { SignalementStatus, SignalementPriority } from '../types';

export function SignalementDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { language, tLocal } = useLanguage();
  const navigate = useNavigate();
  const { data: signalement, isLoading, error } = useSignalement(id || '');
  const [isSupported, setIsSupported] = React.useState(false);
  const [localUpvotes, setLocalUpvotes] = React.useState(0);

  // Update local upvotes when signalement data loads
  React.useEffect(() => {
    if (signalement) {
      setLocalUpvotes(signalement.upvotes);
      setIsSupported(signalement.hasUpvoted || false);
    }
  }, [signalement]);

  const handleSupport = () => {
    if (!isSupported) {
      setIsSupported(true);
      setLocalUpvotes(prev => prev + 1);
    }
  };

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

  const getStatusLabel = (status: SignalementStatus) => {
    const labels: Record<SignalementStatus, { fr: string; de: string; en: string }> = {
      submitted: { fr: 'Soumis', de: 'Eingereicht', en: 'Submitted' },
      under_review: { fr: 'En examen', de: 'In Prüfung', en: 'Under review' },
      in_progress: { fr: 'En cours', de: 'In Bearbeitung', en: 'In progress' },
      resolved: { fr: 'Résolu', de: 'Gelöst', en: 'Resolved' },
      rejected: { fr: 'Rejeté', de: 'Abgelehnt', en: 'Rejected' },
      archived: { fr: 'Archivé', de: 'Archiviert', en: 'Archived' },
    };
    return labels[status]?.[language] || status;
  };

  const getPriorityLabel = (priority: SignalementPriority) => {
    const labels: Record<SignalementPriority, { fr: string; de: string; en: string }> = {
      low: { fr: 'Basse', de: 'Niedrig', en: 'Low' },
      medium: { fr: 'Moyenne', de: 'Mittel', en: 'Medium' },
      high: { fr: 'Haute', de: 'Hoch', en: 'High' },
      urgent: { fr: 'Urgente', de: 'Dringend', en: 'Urgent' },
    };
    return labels[priority]?.[language] || priority;
  };

  const getStatusColor = (status: SignalementStatus) => {
    const colors: Record<SignalementStatus, string> = {
      submitted: 'bg-blue-100 text-blue-800',
      under_review: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-orange-100 text-orange-800',
      resolved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      archived: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: SignalementPriority) => {
    const colors: Record<SignalementPriority, string> = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800',
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: SignalementStatus) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'in_progress':
        return <Clock className="w-4 h-4" />;
      case 'under_review':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'de' ? 'de-DE' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div>
        <PageBanner
          title={
            language === 'fr' ? 'Signalement' :
            language === 'de' ? 'Meldung' :
            'Report'
          }
          description=""
          gradient="from-red-600 to-orange-600"
          icon={<AlertCircle className="w-12 h-12 text-white" />}
        />
        <PageLayout className="py-8">
          <div className="text-center py-12">
            <p className="text-gray-600">
              {language === 'fr' ? 'Chargement...' : 
               language === 'de' ? 'Laden...' : 
               'Loading...'}
            </p>
          </div>
        </PageLayout>
      </div>
    );
  }

  if (error || !signalement) {
    return (
      <div>
        <PageBanner
          title={
            language === 'fr' ? 'Signalement' :
            language === 'de' ? 'Meldung' :
            'Report'
          }
          description=""
          gradient="from-red-600 to-orange-600"
          icon={<AlertCircle className="w-12 h-12 text-white" />}
        />
        <PageLayout className="py-8">
          <div className="text-center py-12">
            <p className="text-red-600">
              {language === 'fr' ? 'Signalement non trouvé' : 
               language === 'de' ? 'Meldung nicht gefunden' : 
               'Report not found'}
            </p>
            <Link to="/signalements">
              <Button variant="outline" className="mt-4">
                {language === 'fr' ? 'Retour à la liste' :
                 language === 'de' ? 'Zurück zur Liste' :
                 'Back to list'}
              </Button>
            </Link>
          </div>
        </PageLayout>
      </div>
    );
  }

  return (
    <div>
      <PageBanner
        title={tLocal(signalement.title)}
        description={tLocal(signalement.description).substring(0, 150) + '...'}
        gradient="from-red-600 to-orange-600"
        icon={<AlertCircle className="w-12 h-12 text-white" />}
      />

      <PageLayout className="py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/signalements')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {language === 'fr' ? 'Retour à la liste' :
           language === 'de' ? 'Zurück zur Liste' :
           'Back to list'}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status and Priority */}
            <Card>
              <CardHeader>
                <div className="flex flex-wrap gap-2">
                  <Badge className={getStatusColor(signalement.status)}>
                    {getStatusIcon(signalement.status)}
                    <span className="ml-1">{getStatusLabel(signalement.status)}</span>
                  </Badge>
                  <Badge className={getPriorityColor(signalement.priority)}>
                    {getPriorityLabel(signalement.priority)}
                  </Badge>
                  <Badge variant="outline">
                    <Tag className="w-3 h-3 mr-1" />
                    {getCategoryLabel(signalement.category)}
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'fr' ? 'Description' :
                   language === 'de' ? 'Beschreibung' :
                   'Description'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">{tLocal(signalement.description)}</p>
              </CardContent>
            </Card>

            {/* Images */}
            {signalement.images && signalement.images.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'fr' ? 'Photos' :
                     language === 'de' ? 'Fotos' :
                     'Photos'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {signalement.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${tLocal(signalement.title)} - Photo ${index + 1}`}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Location Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {language === 'fr' ? 'Localisation' :
                   language === 'de' ? 'Standort' :
                   'Location'}
                </CardTitle>
                <CardDescription>
                  {signalement.location.address}, {signalement.location.city}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 relative border border-gray-200">
                  {/* Map background with grid */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="grid grid-cols-8 grid-rows-6 h-full">
                      {Array.from({ length: 48 }).map((_, i) => (
                        <div key={i} className="border border-gray-300" />
                      ))}
                    </div>
                  </div>

                  {/* Map content */}
                  <div className="relative h-full flex items-center justify-center">
                    {/* Marker at center */}
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-red-500 rounded-full border-4 border-white shadow-2xl flex items-center justify-center animate-pulse">
                        <MapPin className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Info popup */}
                      <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-xl p-4 min-w-[280px] border border-gray-200">
                        <div className="space-y-2">
                          <p className="font-semibold text-sm">{tLocal(signalement.title)}</p>
                          <div className="flex items-start gap-2 text-xs text-gray-600">
                            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <div>
                              <p>{signalement.location.address}</p>
                              <p>{signalement.location.postalCode} {signalement.location.city}</p>
                            </div>
                          </div>
                          <div className="pt-2 border-t border-gray-100 text-xs text-gray-500">
                            <p>Lat: {signalement.location.coordinates.lat.toFixed(6)}</p>
                            <p>Lng: {signalement.location.coordinates.lng.toFixed(6)}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Compass */}
                    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
                      <div className="text-center">
                        <div className="text-xs font-bold text-gray-700">N</div>
                        <div className="w-8 h-8 border-2 border-gray-300 rounded-full relative mt-1">
                          <div className="absolute top-0 left-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500 -translate-x-1/2 -translate-y-1" />
                        </div>
                      </div>
                    </div>

                    {/* Scale */}
                    <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg px-3 py-2 border border-gray-200">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="flex items-center">
                          <div className="w-12 h-1 bg-gray-800" />
                          <div className="w-12 h-1 bg-white border border-gray-800" />
                        </div>
                        <span className="text-gray-600">100m</span>
                      </div>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className={getPriorityColor(signalement.priority)}>
                        {getPriorityLabel(signalement.priority)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* History */}
            {signalement.history && signalement.history.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'fr' ? 'Historique' :
                     language === 'de' ? 'Verlauf' :
                     'History'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {signalement.history.map((entry, index) => (
                      <div key={entry.id}>
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {getStatusIcon(entry.status)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium">{getStatusLabel(entry.status)}</span>
                              <span className="text-sm text-gray-500">{formatDate(entry.createdAt)}</span>
                            </div>
                            {entry.comment && (
                              <p className="text-sm text-gray-600">{tLocal(entry.comment)}</p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">
                              {language === 'fr' ? 'Par' : language === 'de' ? 'Von' : 'By'} {entry.updatedBy.name}
                            </p>
                          </div>
                        </div>
                        {index < signalement.history.length - 1 && <Separator className="mt-4" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Metadata */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'fr' ? 'Informations' :
                   language === 'de' ? 'Informationen' :
                   'Information'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">
                      {language === 'fr' ? 'Créé le' :
                       language === 'de' ? 'Erstellt am' :
                       'Created on'}
                    </p>
                    <p className="text-sm text-gray-600">{formatDate(signalement.createdAt)}</p>
                  </div>
                </div>

                {signalement.updatedAt && signalement.updatedAt !== signalement.createdAt && (
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">
                        {language === 'fr' ? 'Mis à jour le' :
                         language === 'de' ? 'Aktualisiert am' :
                         'Updated on'}
                      </p>
                      <p className="text-sm text-gray-600">{formatDate(signalement.updatedAt)}</p>
                    </div>
                  </div>
                )}

                {signalement.resolvedAt && (
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">
                        {language === 'fr' ? 'Résolu le' :
                         language === 'de' ? 'Gelöst am' :
                         'Resolved on'}
                      </p>
                      <p className="text-sm text-gray-600">{formatDate(signalement.resolvedAt)}</p>
                    </div>
                  </div>
                )}

                <Separator />

                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">
                      {language === 'fr' ? 'Auteur' :
                       language === 'de' ? 'Autor' :
                       'Author'}
                    </p>
                    <p className="text-sm text-gray-600">{signalement.author.name}</p>
                  </div>
                </div>

                {signalement.assignedTo && (
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">
                        {language === 'fr' ? 'Assigné à' :
                         language === 'de' ? 'Zugewiesen an' :
                         'Assigned to'}
                      </p>
                      <p className="text-sm text-gray-600">{signalement.assignedTo.name}</p>
                    </div>
                  </div>
                )}

                <Separator />

                <div className="flex items-start gap-3">
                  <ThumbsUp className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">
                      {language === 'fr' ? 'Soutiens' :
                       language === 'de' ? 'Unterstützungen' :
                       'Upvotes'}
                    </p>
                    <p className="text-sm text-gray-600">{localUpvotes}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Theme */}
            {signalement.theme && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'fr' ? 'Thème' :
                     language === 'de' ? 'Thema' :
                     'Theme'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Link to={`/themes/${signalement.themeId}`}>
                    <Button variant="outline" className="w-full justify-start">
                      <Tag className="w-4 h-4 mr-2" />
                      {tLocal(signalement.theme.name)}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'fr' ? 'Actions' :
                   language === 'de' ? 'Aktionen' :
                   'Actions'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full" disabled={isSupported} onClick={handleSupport}>
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  {isSupported
                    ? (language === 'fr' ? 'Déjà soutenu' : language === 'de' ? 'Bereits unterstützt' : 'Already upvoted')
                    : (language === 'fr' ? 'Soutenir' : language === 'de' ? 'Unterstützen' : 'Upvote')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageLayout>
    </div>
  );
}