import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ThumbsUp, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { StatusBadge } from '../StatusBadge';
import { ThemeTag } from '../ThemeTag';
import { useLanguage } from '@/app/contexts/LanguageContext';
import type { SignalementDTO } from '@/app/types';

interface SignalementCardProps {
  signalement: SignalementDTO;
}

/**
 * Carte de signalement normalisée
 * 
 * Structure fixe :
 * - Header : Titre + Badge de statut
 * - Content : Description, Tags thème, Localisation, Statistiques
 * - Footer : Date + Bouton CTA
 * 
 * États :
 * - Hover : Shadow elevation
 * - Link : Toute la carte est cliquable
 */
export function SignalementCard({ signalement }: SignalementCardProps) {
  const { t, language, tLocal } = useLanguage();
  const [isSupported, setIsSupported] = React.useState(false);
  const [localUpvotes, setLocalUpvotes] = React.useState(signalement.upvotes);

  const handleSupport = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isSupported) {
      setIsSupported(true);
      setLocalUpvotes(prev => prev + 1);
    } else {
      setIsSupported(false);
      setLocalUpvotes(prev => prev - 1);
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

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: 'text-gray-500',
      medium: 'text-yellow-600',
      high: 'text-orange-600',
      urgent: 'text-red-600',
    };
    return colors[priority] || 'text-gray-500';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <Link to={`/signalements/${signalement.id}`} className="block group">
      <Card className="h-full transition-all duration-300 hover:shadow-lg border-gray-200">
        <CardHeader>
          <div className="flex items-start justify-between gap-3 mb-2">
            <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors">
              {tLocal(signalement.title)}
            </CardTitle>
            <StatusBadge status={signalement.status} />
          </div>
          <CardDescription className="line-clamp-2">
            {tLocal(signalement.description)}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Tags catégorie et thème */}
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700">
              {getCategoryLabel(signalement.category)}
            </span>
            {signalement.themeId && (
              <ThemeTag themeId={signalement.themeId} size="sm" />
            )}
          </div>

          {/* Localisation */}
          {signalement.location && (
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">
                {signalement.location.address}, {signalement.location.city}
              </span>
            </div>
          )}

          {/* Statistiques et bouton Soutenir */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-gray-600">
                <ThumbsUp className="w-4 h-4" />
                <span>{localUpvotes}</span>
              </div>
              <div className={`flex items-center gap-1.5 ${getPriorityColor(signalement.priority)}`}>
                <Clock className="w-4 h-4" />
                <span className="capitalize">{signalement.priority}</span>
              </div>
            </div>
            <Button
              size="sm"
              variant={isSupported ? "default" : "outline"}
              onClick={handleSupport}
              className={isSupported ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              <ThumbsUp className={`w-4 h-4 ${isSupported ? "fill-current" : ""}`} />
              <span className="ml-1">
                {language === 'fr' ? 'Soutenir' :
                 language === 'de' ? 'Unterstützen' :
                 'Support'}
              </span>
            </Button>
          </div>

          {/* Date */}
          <div className="text-sm text-gray-500">
            {language === 'fr' ? 'Signalé le' : 
             language === 'de' ? 'Gemeldet am' : 
             'Reported on'} {formatDate(signalement.createdAt)}
          </div>

          {/* CTA */}
          <div className="pt-2">
            <Button 
              variant="outline" 
              className="w-full group-hover:bg-blue-50 group-hover:border-blue-300 group-hover:text-blue-700 transition-all"
            >
              {language === 'fr' ? 'Voir le détail' : 
               language === 'de' ? 'Details ansehen' : 
               'View details'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}