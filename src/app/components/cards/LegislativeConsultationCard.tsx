import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { StatusBadge } from '@/app/components/StatusBadge';
import { ThemeTag } from '@/app/components/ThemeTag';
import { Calendar, FileText, MessageSquare, Users } from 'lucide-react';
import type { LegislativeConsultationSummaryDTO } from '@/app/types';

interface LegislativeConsultationCardProps {
  consultation: LegislativeConsultationSummaryDTO;
}

/**
 * LegislativeConsultationCard Component
 * 
 * Card affichant une consultation législative dans les listes.
 * Design cohérent avec le système de design CiviAgora.
 */
export function LegislativeConsultationCard({ consultation }: LegislativeConsultationCardProps) {
  const { language, tLocal } = useLanguage();

  const getDateRange = () => {
    if (!consultation.startDate) return null;
    
    const start = new Date(consultation.startDate).toLocaleDateString(language);
    const end = new Date(consultation.endDate).toLocaleDateString(language);
    
    return `${start} - ${end}`;
  };

  const getTextTypeLabel = () => {
    const labels = {
      law: { fr: 'Projet de loi', de: 'Gesetzentwurf', en: 'Bill' },
      regulation: { fr: 'Règlement', de: 'Verordnung', en: 'Regulation' },
      decree: { fr: 'Décret', de: 'Dekret', en: 'Decree' },
      ordinance: { fr: 'Ordonnance', de: 'Verordnung', en: 'Ordinance' },
      amendment: { fr: 'Amendement', de: 'Änderungsantrag', en: 'Amendment' },
    };
    return labels[consultation.textType][language];
  };

  return (
    <Link to={`/legislative-consultations/${consultation.id}`} className="block group">
      <Card className="h-full transition-all duration-300 hover:shadow-lg border-gray-200">
        <CardHeader>
          <div className="flex items-start justify-between gap-3 mb-2">
            <CardTitle className="line-clamp-2 group-hover:text-indigo-600 transition-colors">
              {tLocal(consultation.title)}
            </CardTitle>
            <StatusBadge status={consultation.status} />
          </div>
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
              <FileText className="w-3 h-3 mr-1" />
              {getTextTypeLabel()}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Tag thème */}
          {consultation.themeId && (
            <div className="flex flex-wrap gap-2">
              <ThemeTag themeId={consultation.themeId} />
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <FileText className="w-4 h-4 text-gray-400" />
              <span className="font-medium">{consultation.articlesCount}</span>
              <span className="hidden sm:inline">
                {language === 'fr' ? 'art.' : language === 'de' ? 'Art.' : 'art.'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <MessageSquare className="w-4 h-4 text-gray-400" />
              <span className="font-medium">{consultation.annotationsCount}</span>
              <span className="hidden sm:inline">
                {language === 'fr' ? 'annot.' : language === 'de' ? 'Annot.' : 'annot.'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="font-medium">{consultation.participantsCount}</span>
            </div>
          </div>

          {/* Dates */}
          {getDateRange() && (
            <div className="flex items-center gap-2 text-sm text-gray-500 pt-2">
              <Calendar className="w-4 h-4" />
              <span>{getDateRange()}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
