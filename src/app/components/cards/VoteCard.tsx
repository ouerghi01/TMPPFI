import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { StatusBadge } from '../StatusBadge';
import { ThemeTag } from '../ThemeTag';
import { useLanguage } from '@/app/contexts/LanguageContext';
import type { VoteDTO } from '@/app/types';

interface VoteCardProps {
  vote: VoteDTO;
}

/**
 * Carte de vote normalisée
 * 
 * Structure fixe :
 * - Header : Titre + Badge de statut
 * - Content : Description, Tags thème, Statistiques
 * - Footer : Dates + Bouton CTA
 * 
 * Variantes :
 * - open : Bouton "Voter maintenant"
 * - closed : Bouton "Voir les résultats"
 */
export function VoteCard({ vote }: VoteCardProps) {
  const { t, language, tLocal } = useLanguage();

  const getDateRange = () => {
    if (!vote.startDate) return null;
    
    const start = new Date(vote.startDate).toLocaleDateString(language);
    const end = vote.endDate 
      ? new Date(vote.endDate).toLocaleDateString(language)
      : '?';
    
    return `${start} - ${end}`;
  };

  const isOpen = vote.status === 'open' || vote.status === 'active';
  const isClosed = vote.status === 'closed' || vote.status === 'completed';

  return (
    <Link to={`/votes/${vote.id}`} className="block group">
      <Card className="h-full transition-all duration-300 hover:shadow-lg border-gray-200">
        <CardHeader>
          <div className="flex items-start justify-between gap-3 mb-2">
            <CardTitle className="line-clamp-2 group-hover:text-indigo-600 transition-colors">
              {tLocal(vote.title)}
            </CardTitle>
            <StatusBadge status={vote.status} />
          </div>
          <CardDescription className="line-clamp-3">
            {tLocal(vote.description)}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Type de scrutin */}
          {vote.voteType && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>
                {vote.voteType === 'single_choice' && (
                  language === 'fr' ? 'Choix unique' :
                  language === 'de' ? 'Einzelwahl' :
                  'Single choice'
                )}
                {vote.voteType === 'multiple_choice' && (
                  language === 'fr' ? 'Choix multiple' :
                  language === 'de' ? 'Mehrfachwahl' :
                  'Multiple choice'
                )}
                {vote.voteType === 'ranked' && (
                  language === 'fr' ? 'Vote classé' :
                  language === 'de' ? 'Ranglistenwahl' :
                  'Ranked vote'
                )}
              </span>
            </div>
          )}

          {/* Tags thème */}
          {vote.themeId && (
            <div className="flex flex-wrap gap-2">
              <ThemeTag themeId={vote.themeId} size="sm" />
            </div>
          )}

          {/* Statistiques */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            {vote.totalVoters !== undefined && (
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>
                  {vote.totalVoters.toLocaleString(language)}{' '}
                  {language === 'fr' ? 'votants' :
                   language === 'de' ? 'Wähler' :
                   'voters'}
                </span>
              </div>
            )}
            {vote.participationRate !== undefined && (
              <div className="flex items-center gap-1.5 text-indigo-600 font-medium">
                <span>{vote.participationRate}%</span>
                <span className="text-gray-600">
                  {language === 'fr' ? 'participation' :
                   language === 'de' ? 'Beteiligung' :
                   'turnout'}
                </span>
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
            {isOpen ? (
              <Button 
                variant="default"
                className="w-full bg-indigo-600 hover:bg-indigo-700 group-hover:shadow-md transition-all"
              >
                {language === 'fr' ? 'Voter maintenant' :
                 language === 'de' ? 'Jetzt abstimmen' :
                 'Vote now'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            ) : isClosed ? (
              <Button 
                variant="outline"
                className="w-full group-hover:bg-indigo-50 group-hover:border-indigo-300 group-hover:text-indigo-700 transition-all"
              >
                {language === 'fr' ? 'Voir les résultats' :
                 language === 'de' ? 'Ergebnisse anzeigen' :
                 'View results'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            ) : (
              <Button 
                variant="outline"
                className="w-full"
              >
                {language === 'fr' ? 'Voir les détails' :
                 language === 'de' ? 'Details anzeigen' :
                 'View details'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
