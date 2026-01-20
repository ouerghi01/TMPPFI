import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Video, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { StatusBadge } from '../StatusBadge';
import { ThemeTag } from '../ThemeTag';
import { useLanguage } from '@/app/contexts/LanguageContext';
import type { ConferenceDTO } from '@/app/types';

interface ConferenceCardProps {
  conference: ConferenceDTO;
}

/**
 * Carte de conférence normalisée
 * 
 * Structure fixe :
 * - Header : Titre + Badge de statut
 * - Content : Description, Date/Lieu, Tags thème, Stats
 * - Footer : Badge type + Bouton CTA
 * 
 * Variantes :
 * - online : Badge "En ligne" + icône Video
 * - in-person : Badge "Présentiel" + icône MapPin
 * - hybrid : Badge "Hybride" + icônes Video + MapPin
 */
export function ConferenceCard({ conference }: ConferenceCardProps) {
  const { t, language, tLocal } = useLanguage();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeLabel = () => {
    switch (conference.type) {
      case 'online':
        return language === 'fr' ? 'En ligne' :
               language === 'de' ? 'Online' :
               'Online';
      case 'in-person':
        return language === 'fr' ? 'Présentiel' :
               language === 'de' ? 'Vor Ort' :
               'In-person';
      case 'hybrid':
        return language === 'fr' ? 'Hybride' :
               language === 'de' ? 'Hybrid' :
               'Hybrid';
      default:
        return '';
    }
  };

  const getTypeIcon = () => {
    switch (conference.type) {
      case 'online':
        return <Video className="w-3 h-3" />;
      case 'in-person':
        return <MapPin className="w-3 h-3" />;
      case 'hybrid':
        return <Video className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getTypeColor = () => {
    switch (conference.type) {
      case 'online':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'in-person':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'hybrid':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const isUpcoming = conference.status === 'upcoming';
  const isActive = conference.status === 'active' || conference.status === 'open';

  return (
    <Link to={`/conferences/${conference.id}`} className="block group">
      <Card className="h-full transition-all duration-300 hover:shadow-lg border-gray-200">
        <CardHeader>
          <div className="flex items-start justify-between gap-3 mb-2">
            <CardTitle className="line-clamp-2 group-hover:text-orange-600 transition-colors">
              {tLocal(conference.title)}
            </CardTitle>
            <StatusBadge status={conference.status} />
          </div>
          <CardDescription className="line-clamp-3">
            {tLocal(conference.description)}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Date et heure */}
          {conference.date && (
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
              <div className="flex items-start gap-2 text-sm text-orange-900">
                <Calendar className="w-4 h-4 mt-0.5 shrink-0" />
                <span className="font-medium">{formatDate(conference.date)}</span>
              </div>
            </div>
          )}

          {/* Type et lieu */}
          <div className="flex flex-wrap items-center gap-2">
            {conference.type && (
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm border ${getTypeColor()}`}>
                {getTypeIcon()}
                {getTypeLabel()}
              </span>
            )}
            {conference.location && (conference.type === 'in-person' || conference.type === 'hybrid') && (
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="line-clamp-1">{conference.location}</span>
              </div>
            )}
          </div>

          {/* Tags thème */}
          {conference.themeId && (
            <div className="flex flex-wrap gap-2">
              <ThemeTag themeId={conference.themeId} size="sm" />
            </div>
          )}

          {/* Statistiques */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            {conference.registeredParticipants !== undefined && (
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>
                  {conference.registeredParticipants}
                  {conference.maxParticipants && ` / ${conference.maxParticipants}`}
                  {' '}
                  {language === 'fr' ? 'inscrits' :
                   language === 'de' ? 'angemeldet' :
                   'registered'}
                </span>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="pt-2">
            {isUpcoming || isActive ? (
              <Button 
                variant="default"
                className="w-full bg-orange-600 hover:bg-orange-700 group-hover:shadow-md transition-all"
              >
                {language === 'fr' ? 'S\'inscrire' :
                 language === 'de' ? 'Anmelden' :
                 'Register'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            ) : (
              <Button 
                variant="outline"
                className="w-full group-hover:bg-orange-50 group-hover:border-orange-300 group-hover:text-orange-700 transition-all"
              >
                {language === 'fr' ? 'Voir les détails' :
                 language === 'de' ? 'Details anzeigen' :
                 'View details'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
