import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Sparkles, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ThemeTag } from '../ThemeTag';
import { useLanguage } from '@/app/contexts/LanguageContext';
import type { YouthPollDTO } from '@/app/types';

interface YouthPollCardProps {
  poll: YouthPollDTO;
  compact?: boolean;
}

/**
 * YouthPollCard - Carte de micro-sondage jeunesse
 * 
 * Design coloré et engageant pour les jeunes:
 * - Affiche l'image du sondage
 * - Badges de statut et tranche d'âge
 * - Indicateurs de gamification
 * - CTA distinctif selon l'état (complété ou non)
 */
export function YouthPollCard({ poll, compact = false }: YouthPollCardProps) {
  const { t, language, tLocal } = useLanguage();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, Record<string, string>> = {
      active: { fr: 'Actif', de: 'Aktiv', en: 'Active' },
      closed: { fr: 'Fermé', de: 'Geschlossen', en: 'Closed' },
      draft: { fr: 'Brouillon', de: 'Entwurf', en: 'Draft' },
      archived: { fr: 'Archivé', de: 'Archiviert', en: 'Archived' },
    };
    return labels[status]?.[language] || status;
  };

  const getAgeLabel = (targetAge: string) => {
    if (targetAge === 'all') {
      return language === 'fr' ? 'Tous âges' : language === 'de' ? 'Alle Altersgruppen' : 'All ages';
    }
    return `${targetAge} ${language === 'fr' ? 'ans' : language === 'de' ? 'Jahre' : 'years'}`;
  };

  const getDurationLabel = () => {
    const duration = poll.estimatedDuration;
    if (duration < 1) {
      return language === 'fr' ? '< 1 min' : language === 'de' ? '< 1 Min' : '< 1 min';
    }
    return `${duration} ${language === 'fr' ? 'min' : language === 'de' ? 'Min' : 'min'}`;
  };

  if (compact) {
    return (
      <Link to={`/youth-space/${poll.id}`} className="block group">
        <Card className="h-full transition-all duration-300 hover:shadow-md border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              {poll.imageUrl && (
                <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                  <img 
                    src={poll.imageUrl} 
                    alt={tLocal(poll.title)}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-blue-600 transition-colors mb-1">
                  {tLocal(poll.title)}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{getDurationLabel()}</span>
                  <span>•</span>
                  <Sparkles className="w-3 h-3 text-yellow-600" />
                  <span>{poll.gamificationPoints} pts</span>
                </div>
              </div>
              {poll.hasUserResponded && (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/youth-space/${poll.id}`} className="block group">
      <Card className="h-full transition-all duration-300 hover:shadow-lg border-gray-200 overflow-hidden">
        {/* Image */}
        {poll.imageUrl && (
          <div className="relative w-full h-40 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
            <img 
              src={poll.imageUrl} 
              alt={tLocal(poll.title)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {poll.hasUserResponded && (
              <div className="absolute top-3 right-3 bg-green-600 text-white rounded-full p-1.5">
                <CheckCircle className="w-4 h-4" />
              </div>
            )}
            {poll.featured && (
              <div className="absolute top-3 left-3">
                <Badge className="bg-yellow-500 text-white border-0">
                  {language === 'fr' ? '⭐ À la une' : language === 'de' ? '⭐ Empfohlen' : '⭐ Featured'}
                </Badge>
              </div>
            )}
          </div>
        )}

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3 mb-2">
            <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors text-lg">
              {tLocal(poll.title)}
            </CardTitle>
            <Badge className={getStatusColor(poll.status)} variant="outline">
              {getStatusLabel(poll.status)}
            </Badge>
          </div>
          <CardDescription className="line-clamp-2">
            {tLocal(poll.description)}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Tags et thème */}
          <div className="flex flex-wrap gap-2">
            {poll.themeId && <ThemeTag themeId={poll.themeId} size="sm" />}
            <Badge variant="secondary" className="text-xs">
              {getAgeLabel(poll.targetAge)}
            </Badge>
          </div>

          {/* Statistiques */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{getDurationLabel()}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>
                {poll.totalResponses} {language === 'fr' ? 'réponses' : language === 'de' ? 'Antworten' : 'responses'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-yellow-600" />
              <span className="font-medium text-yellow-700">{poll.gamificationPoints} pts</span>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-2">
            <Button 
              variant={poll.hasUserResponded ? 'outline' : 'default'}
              className={poll.hasUserResponded 
                ? 'w-full'
                : 'w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
              }
            >
              {poll.hasUserResponded 
                ? (language === 'fr' ? 'Voir les résultats' : 
                   language === 'de' ? 'Ergebnisse anzeigen' : 
                   'View results')
                : (language === 'fr' ? 'Participer maintenant' : 
                   language === 'de' ? 'Jetzt teilnehmen' : 
                   'Participate now')
              }
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}