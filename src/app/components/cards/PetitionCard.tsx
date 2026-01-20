import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Clock, CheckCircle, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ThemeTag } from '../ThemeTag';
import { useLanguage } from '@/app/contexts/LanguageContext';
import type { PetitionDTO, LocalizedString } from '@/app/types';

interface PetitionCardProps {
  petition: PetitionDTO;
  onSign?: (e: React.MouseEvent, petitionId: string, title: LocalizedString) => void;
  onUnsign?: (e: React.MouseEvent, petitionId: string, title: LocalizedString) => void;
  isSigned?: boolean;
}

/**
 * Carte de pétition normalisée
 * 
 * Structure fixe :
 * - Header : Titre + Auteur
 * - Content : Progression, Stats, Tags thème
 * - Footer : Bouton Sign/Unsign
 * 
 * Variantes :
 * - Signée : Bouton "Retirer ma signature"
 * - Non signée : Bouton "Signer"
 * - Seuil atteint : Badge success
 */
export function PetitionCard({ 
  petition, 
  onSign, 
  onUnsign, 
  isSigned = false 
}: PetitionCardProps) {
  const { t, language, tLocal } = useLanguage();

  const progress = petition.threshold > 0
    ? Math.min((petition.currentSignatures / petition.threshold) * 100, 100)
    : 0;

  const isThresholdReached = petition.status === 'threshold_reached';
  const daysLeft = petition.deadline 
    ? Math.max(0, Math.ceil((new Date(petition.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
    : null;

  return (
    <Link to={`/petitions/${petition.id}`} className="block group">
      <Card className="h-full transition-all duration-300 hover:shadow-lg border-gray-200">
        <CardHeader>
          <div className="flex items-start justify-between gap-3 mb-2">
            <CardTitle className="line-clamp-2 group-hover:text-green-600 transition-colors">
              {tLocal(petition.title)}
            </CardTitle>
            {isThresholdReached && (
              <Badge variant="default" className="bg-green-600 shrink-0">
                <CheckCircle className="w-3 h-3 mr-1" />
                {language === 'fr' ? 'Objectif atteint' :
                 language === 'de' ? 'Ziel erreicht' :
                 'Goal reached'}
              </Badge>
            )}
          </div>
          
          {/* Auteur */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Edit className="w-4 h-4" />
            <span>
              {language === 'fr' ? 'Par' : language === 'de' ? 'Von' : 'By'}{' '}
              {petition.author}
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Barre de progression */}
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium text-gray-900">
                {petition.currentSignatures.toLocaleString(language)} / {petition.threshold.toLocaleString(language)}
              </span>
              <span className="text-gray-600">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  isThresholdReached ? 'bg-green-600' : 'bg-green-500'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {daysLeft !== null && (
              <div className="flex items-center gap-1.5 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>
                  {daysLeft > 0
                    ? `${daysLeft} ${language === 'fr' ? 'jours' : language === 'de' ? 'Tage' : 'days'}`
                    : language === 'fr' ? 'Terminé' : language === 'de' ? 'Beendet' : 'Ended'}
                </span>
              </div>
            )}
            {petition.stats?.avgSignaturesPerDay && (
              <div className="flex items-center gap-1.5 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>
                  {Math.round(petition.stats.avgSignaturesPerDay)}/
                  {language === 'fr' ? 'jour' : language === 'de' ? 'Tag' : 'day'}
                </span>
              </div>
            )}
          </div>

          {/* Tags thème */}
          {petition.themeId && (
            <div className="flex flex-wrap gap-2">
              <ThemeTag themeId={petition.themeId} size="sm" />
            </div>
          )}

          {/* Bouton Sign/Unsign */}
          <div className="pt-2">
            {isSigned ? (
              <Button
                variant="outline"
                className="w-full"
                onClick={(e) => onUnsign?.(e, petition.id, petition.title)}
              >
                {language === 'fr' ? 'Retirer ma signature' :
                 language === 'de' ? 'Unterschrift zurückziehen' :
                 'Withdraw signature'}
              </Button>
            ) : (
              <Button
                variant="default"
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={(e) => onSign?.(e, petition.id, petition.title)}
              >
                {language === 'fr' ? 'Signer la pétition' :
                 language === 'de' ? 'Petition unterschreiben' :
                 'Sign petition'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}