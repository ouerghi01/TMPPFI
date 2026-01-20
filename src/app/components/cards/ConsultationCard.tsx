import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, MessageSquare, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { StatusBadge } from '../StatusBadge';
import { ThemeTag } from '../ThemeTag';
import { useLanguage } from '@/app/contexts/LanguageContext';
import type { ConsultationDTO } from '@/app/types';

interface ConsultationCardProps {
  consultation: ConsultationDTO;
}

/**
 * Carte de consultation normalisée
 * 
 * Structure fixe :
 * - Header : Titre + Badge de statut
 * - Content : Description, Tags thème, Statistiques
 * - Footer : Dates + Bouton CTA
 * 
 * États :
 * - Hover : Shadow elevation
 * - Link : Toute la carte est cliquable
 */
export function ConsultationCard({ consultation }: ConsultationCardProps) {
  const { t, language, tLocal } = useLanguage();

  const getDateRange = () => {
    if (!consultation.startDate) return null;
    
    const start = new Date(consultation.startDate).toLocaleDateString(language);
    const end = consultation.endDate 
      ? new Date(consultation.endDate).toLocaleDateString(language)
      : '?';
    
    return `${start} - ${end}`;
  };

  return (
    <Link to={`/consultations/${consultation.id}`} className="block group">
      <Card className="h-full transition-all duration-300 hover:shadow-lg border-gray-200">
        <CardHeader>
          <div className="flex items-start justify-between gap-3 mb-2">
            <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors">
              {tLocal(consultation.title)}
            </CardTitle>
            <StatusBadge status={consultation.status} />
          </div>
          <CardDescription className="line-clamp-3">
            {tLocal(consultation.description)}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Tags thème */}
          {consultation.themeId && (
            <div className="flex flex-wrap gap-2">
              <ThemeTag themeId={consultation.themeId} size="sm" />
            </div>
          )}

          {/* Statistiques */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            {consultation.registeredParticipants !== undefined && (
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>{consultation.registeredParticipants}</span>
              </div>
            )}
            {consultation.stats?.totalComments !== undefined && (
              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4" />
                <span>{consultation.stats.totalComments}</span>
              </div>
            )}
          </div>

          {/* Dates */}
          {getDateRange() && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{getDateRange()}</span>
            </div>
          )}

          {/* CTA */}
          <div className="pt-2">
            <Button 
              variant="outline" 
              className="w-full group-hover:bg-blue-50 group-hover:border-blue-300 group-hover:text-blue-700 transition-all"
            >
              {language === 'fr' ? 'Participer' : 
               language === 'de' ? 'Teilnehmen' : 
               'Participate'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
