import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { StatusBadge } from '../StatusBadge';
import { ThemeTag } from '../ThemeTag';
import { useLanguage } from '@/app/contexts/LanguageContext';
import type { AssemblyDTO } from '@/app/types';

interface AssemblyCardProps {
  assembly: AssemblyDTO;
}

/**
 * Carte d'assemblée normalisée
 * 
 * Structure fixe :
 * - Header : Titre + Badge de statut
 * - Content : Description, Prochaine réunion, Tags thème, Stats
 * - Footer : Bouton CTA
 * 
 * Variantes :
 * - active : Affiche la prochaine réunion
 * - Pas de prochaine réunion : Message par défaut
 */
export function AssemblyCard({ assembly }: AssemblyCardProps) {
  const { t, language, tLocal } = useLanguage();

  const nextMeeting = assembly.upcomingMeetings?.[0];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString(language, {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Link to={`/assemblies/${assembly.id}`} className="block group">
      <Card className="h-full transition-all duration-300 hover:shadow-lg border-gray-200">
        <CardHeader>
          <div className="flex items-start justify-between gap-3 mb-2">
            <CardTitle className="line-clamp-2 group-hover:text-purple-600 transition-colors">
              {tLocal(assembly.title)}
            </CardTitle>
            <StatusBadge status={assembly.status} />
          </div>
          <CardDescription className="line-clamp-3">
            {tLocal(assembly.description)}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Prochaine réunion */}
          {nextMeeting ? (
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <p className="text-sm font-medium text-purple-900 mb-2">
                {language === 'fr' ? 'Prochaine réunion' :
                 language === 'de' ? 'Nächstes Treffen' :
                 'Next meeting'}
              </p>
              <div className="space-y-1 text-sm text-purple-700">
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{formatDate(nextMeeting.date)}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{formatTime(nextMeeting.date)}</span>
                </div>
                {nextMeeting.location && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                    <span className="line-clamp-2">{nextMeeting.location}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-sm text-gray-600 text-center">
                {language === 'fr' ? 'Aucune réunion programmée' :
                 language === 'de' ? 'Keine Sitzung geplant' :
                 'No scheduled meeting'}
              </p>
            </div>
          )}

          {/* Tags thème */}
          {assembly.themeId && (
            <div className="flex flex-wrap gap-2">
              <ThemeTag themeId={assembly.themeId} size="sm" />
            </div>
          )}

          {/* Statistiques */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            {assembly.memberCount !== undefined && (
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>
                  {assembly.memberCount}{' '}
                  {language === 'fr' ? 'membres' :
                   language === 'de' ? 'Mitglieder' :
                   'members'}
                </span>
              </div>
            )}
            {assembly.stats?.totalMeetings !== undefined && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>
                  {assembly.stats.totalMeetings}{' '}
                  {language === 'fr' ? 'réunions' :
                   language === 'de' ? 'Sitzungen' :
                   'meetings'}
                </span>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="pt-2">
            {assembly.status === 'open' || assembly.status === 'active' ? (
              <Button 
                variant="default"
                className="w-full bg-purple-600 hover:bg-purple-700 group-hover:shadow-md transition-all"
              >
                {language === 'fr' ? 'S\'inscrire' :
                 language === 'de' ? 'Anmelden' :
                 'Register'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            ) : (
              <Button 
                variant="outline"
                className="w-full group-hover:bg-purple-50 group-hover:border-purple-300 group-hover:text-purple-700 transition-all"
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
