import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Search,
  FileText,
  MessageSquare,
  Vote,
  Users,
  Presentation,
  Layers,
  Clock,
  TrendingUp,
  AlertTriangle,
  Gamepad2,
  Scale
} from 'lucide-react';
import {
  useThemes,
  useConsultations,
  usePetitions,
  useVotes,
  useConferences,
  useAssemblies,
  useSignalements,
  useYouthPolls,
  useLegislativeConsultations
} from '../hooks/useApi';

interface SearchResult {
  id: string;
  type: 'consultation' | 'petition' | 'vote' | 'conference' | 'assembly' | 'theme' | 'signalement' | 'youth-poll' | 'legislative-consultation';
  title: string;
  description?: string;
  url: string;
  icon: React.ReactNode;
  metadata?: {
    date?: string;
    status?: string;
    theme?: string;
    participants?: number;
  };
}

interface GlobalSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Fetch data
  const { data: themes } = useThemes();
  const { data: consultations } = useConsultations();
  const { data: petitions } = usePetitions();
  const { data: votes } = useVotes();
  const { data: conferences } = useConferences();
  const { data: assemblies } = useAssemblies();
  const { data: signalements } = useSignalements();
  const { data: youthPolls } = useYouthPolls();
  const { data: legislativeConsultations } = useLegislativeConsultations();

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('civiagora_recent_searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Search function
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    const allResults: SearchResult[] = [];

    // Search consultations
    consultations?.forEach(c => {
      if ((c.title?.[language]?.toLowerCase().includes(searchQuery)) ||
        (c.description?.[language]?.toLowerCase().includes(searchQuery))) {
        allResults.push({
          id: c.id,
          type: 'consultation',
          title: c.title[language] || c.title['fr'],
          description: c.description[language] || c.description['fr'],
          url: `/consultations/${c.id}`,
          icon: <FileText className="w-4 h-4" />,
          metadata: {
            date: c.endDate,
            status: c.status,
            participants: c.stats?.totalContributions
          }
        });
      }
    });

    // Search Legislative Consultations
    legislativeConsultations?.forEach(c => {
      if ((c.title?.[language]?.toLowerCase().includes(searchQuery)) ||
        (c.description?.[language]?.toLowerCase().includes(searchQuery))) {
        allResults.push({
          id: c.id,
          type: 'legislative-consultation',
          title: c.title[language] || c.title['fr'],
          description: c.description[language] || c.description['fr'],
          url: `/legislative/${c.id}`,
          icon: <Scale className="w-4 h-4" />,
          metadata: {
            date: c.endDate,
            status: c.status,
            participants: c.stats?.totalAnnotations
          }
        });
      }
    });

    // Search petitions
    petitions?.forEach(p => {
      if ((p.title?.[language]?.toLowerCase().includes(searchQuery)) ||
        (p.description?.[language]?.toLowerCase().includes(searchQuery))) {
        allResults.push({
          id: p.id,
          type: 'petition',
          title: p.title[language] || p.title['fr'],
          description: p.description[language] || p.description['fr'],
          url: `/petitions/${p.id}`,
          icon: <MessageSquare className="w-4 h-4" />,
          metadata: {
            status: p.status,
            participants: p.currentSignatures
          }
        });
      }
    });

    // Search votes
    votes?.forEach(v => {
      if ((v.title?.[language]?.toLowerCase().includes(searchQuery)) ||
        (v.description?.[language]?.toLowerCase().includes(searchQuery))) {
        allResults.push({
          id: v.id,
          type: 'vote',
          title: v.title[language] || v.title['fr'],
          description: v.description[language] || v.description['fr'],
          url: `/votes/${v.id}`,
          icon: <Vote className="w-4 h-4" />,
          metadata: {
            date: v.endDate,
            status: v.status
          }
        });
      }
    });

    // Search conferences
    conferences?.forEach(c => {
      if ((c.title?.[language]?.toLowerCase().includes(searchQuery)) ||
        (c.description?.[language]?.toLowerCase().includes(searchQuery))) {
        allResults.push({
          id: c.id,
          type: 'conference',
          title: c.title[language] || c.title['fr'],
          description: c.description[language] || c.description['fr'],
          url: `/conferences/${c.id}`,
          icon: <Presentation className="w-4 h-4" />,
          metadata: {
            date: c.startDate,
            status: c.status
          }
        });
      }
    });

    // Search assemblies
    assemblies?.forEach(a => {
      if ((a.title?.[language]?.toLowerCase().includes(searchQuery)) ||
        (a.description?.[language]?.toLowerCase().includes(searchQuery))) {
        allResults.push({
          id: a.id,
          type: 'assembly',
          title: a.title[language] || a.title['fr'],
          description: a.description[language] || a.description['fr'],
          url: `/assemblies/${a.id}`,
          icon: <Users className="w-4 h-4" />,
          metadata: {
            status: a.status
          }
        });
      }
    });

    // Search signalements
    signalements?.forEach(s => {
      if ((s.title?.[language]?.toLowerCase().includes(searchQuery)) ||
        (s.description?.[language]?.toLowerCase().includes(searchQuery))) {
        allResults.push({
          id: s.id,
          type: 'signalement',
          title: s.title[language] || s.title['fr'],
          description: s.description[language] || s.description['fr'],
          url: `/signalements/${s.id}`,
          icon: <AlertTriangle className="w-4 h-4" />,
          metadata: {
            date: s.createdAt,
            status: s.status,
            participants: s.upvotes
          }
        });
      }
    });

    // Search Youth Polls
    youthPolls?.forEach(yp => {
      if ((yp.title?.[language]?.toLowerCase().includes(searchQuery)) ||
        (yp.description?.[language]?.toLowerCase().includes(searchQuery))) {
        allResults.push({
          id: yp.id,
          type: 'youth-poll',
          title: yp.title[language] || yp.title['fr'],
          description: yp.description[language] || yp.description['fr'],
          url: `/youth-space/${yp.id}`,
          icon: <Gamepad2 className="w-4 h-4" />,
          metadata: {
            status: yp.status,
            participants: yp.totalResponses
          }
        });
      }
    });

    // Search themes
    themes?.forEach(t => {
      const themeName = t.name[language] || t.name['fr'];
      if (themeName && themeName.toLowerCase().includes(searchQuery)) {
        allResults.push({
          id: t.id,
          type: 'theme',
          title: themeName,
          url: `/themes/${t.id}`,
          icon: <Layers className="w-4 h-4" />
        });
      }
    });

    setResults(allResults);
  }, [query, language, consultations, petitions, votes, conferences, assemblies, signalements, youthPolls, themes, legislativeConsultations]);

  const handleResultClick = (result: SearchResult) => {
    // Save to recent searches
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('civiagora_recent_searches', JSON.stringify(updated));

    navigate(result.url);
    onOpenChange(false);
    setQuery('');
  };

  const handleRecentSearchClick = (search: string) => {
    setQuery(search);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('civiagora_recent_searches');
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, Record<string, string>> = {
      consultation: { fr: 'Consultation', de: 'Konsultation', en: 'Consultation' },
      petition: { fr: 'Pétition', de: 'Petition', en: 'Petition' },
      vote: { fr: 'Vote', de: 'Abstimmung', en: 'Vote' },
      conference: { fr: 'Conférence', de: 'Konferenz', en: 'Conference' },
      assembly: { fr: 'Assemblée', de: 'Versammlung', en: 'Assembly' },
      theme: { fr: 'Thème', de: 'Thema', en: 'Theme' },
      signalement: { fr: 'Signalement', de: 'Meldung', en: 'Report' },
      'youth-poll': { fr: 'Sondage Jeunes', de: 'Jugendumfrage', en: 'Youth Poll' },
      'legislative-consultation': { fr: 'Consultation Législative', de: 'Gesetzgebungskonsultation', en: 'Legislative Consultation' },
    };
    return labels[type]?.[language] || labels[type]?.[type] || type;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; color: string }> = {
      active: { label: 'Actif', color: 'bg-green-100 text-green-700' },
      closed: { label: 'Terminé', color: 'bg-gray-100 text-gray-700' },
      upcoming: { label: 'À venir', color: 'bg-blue-100 text-blue-700' },
      open: { label: 'Ouvert', color: 'bg-green-100 text-green-700' },
      draft: { label: 'Brouillon', color: 'bg-gray-100 text-gray-700' },
      OPEN: { label: 'Ouvert', color: 'bg-green-100 text-green-700' },
      CLOSED: { label: 'Fermé', color: 'bg-gray-100 text-gray-700' },
      ARCHIVED: { label: 'Archivé', color: 'bg-gray-100 text-gray-700' },
      SUBMITTED: { label: 'Soumis', color: 'bg-blue-100 text-blue-700' },
      IN_PROGRESS: { label: 'En cours', color: 'bg-yellow-100 text-yellow-700' },
      RESOLVED: { label: 'Résolu', color: 'bg-green-100 text-green-700' },
    };
    const variant = variants[status] || { label: status, color: 'bg-gray-100 text-gray-700' };
    return <Badge className={variant.color}>{variant.label}</Badge>;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] p-0">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="sr-only">
            {language === 'fr' ? 'Recherche globale' :
              language === 'de' ? 'Globale Suche' :
                'Global Search'}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {language === 'fr' ? 'Rechercher dans les consultations, pétitions, votes, conférences et thèmes' :
              language === 'de' ? 'Suchen Sie in Konsultationen, Petitionen, Abstimmungen, Konferenzen und Themen' :
                'Search across consultations, petitions, votes, conferences and themes'}
          </DialogDescription>
        </DialogHeader>

        {/* Search Input */}
        <div className="px-6 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                language === 'fr' ? 'Rechercher dans CiviAgora...' :
                  language === 'de' ? 'In CiviAgora suchen...' :
                    'Search in CiviAgora...'
              }
              className="pl-10 pr-4 py-6 text-lg border-0 border-b border-gray-200 rounded-none focus:ring-0 focus:border-blue-500"
              autoFocus
            />
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[500px] overflow-y-auto">
          {query.trim().length >= 2 && results.length > 0 && (
            <div className="px-6 pb-4">
              <p className="text-sm text-gray-500 mb-3">
                {results.length} {language === 'fr' ? 'résultat(s)' : language === 'de' ? 'Ergebnis(se)' : 'result(s)'}
              </p>
              <div className="space-y-2">
                {results.map((result) => (
                  <button
                    key={`${result.type}-${result.id}`}
                    onClick={() => handleResultClick(result)}
                    className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-colors">
                        {result.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900 truncate">{result.title}</h4>
                          <Badge variant="outline" className="text-xs shrink-0">
                            {getTypeLabel(result.type)}
                          </Badge>
                        </div>
                        {result.description && (
                          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                            {result.description}
                          </p>
                        )}
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          {result.metadata?.status && getStatusBadge(result.metadata.status)}
                          {result.metadata?.date && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(result.metadata.date).toLocaleDateString(
                                language === 'fr' ? 'fr-FR' : language === 'de' ? 'de-DE' : 'en-US'
                              )}
                            </span>
                          )}
                          {result.metadata?.participants !== undefined && (
                            <span className="flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              {result.metadata.participants}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim().length >= 2 && results.length === 0 && (
            <div className="px-6 pb-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-3">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600">
                {language === 'fr' ? 'Aucun résultat trouvé' :
                  language === 'de' ? 'Keine Ergebnisse gefunden' :
                    'No results found'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {language === 'fr' ? 'Essayez avec d\'autres mots-clés' :
                  language === 'de' ? 'Versuchen Sie andere Suchbegriffe' :
                    'Try different keywords'}
              </p>
            </div>
          )}

          {/* Recent Searches */}
          {query.trim().length < 2 && recentSearches.length > 0 && (
            <div className="px-6 pb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-gray-700">
                  {language === 'fr' ? 'Recherches récentes' :
                    language === 'de' ? 'Letzte Suchen' :
                      'Recent searches'}
                </p>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  {language === 'fr' ? 'Effacer' :
                    language === 'de' ? 'Löschen' :
                      'Clear'}
                </button>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleRecentSearchClick(search)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50/50 transition-colors flex items-center gap-2 text-sm text-gray-700"
                  >
                    <Clock className="w-4 h-4 text-gray-400" />
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {query.trim().length < 2 && recentSearches.length === 0 && (
            <div className="px-6 pb-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-3">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600">
                {language === 'fr' ? 'Commencez à taper pour rechercher' :
                  language === 'de' ? 'Beginnen Sie mit der Eingabe, um zu suchen' :
                    'Start typing to search'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {language === 'fr' ? 'Consultations, pétitions, votes, conférences...' :
                  language === 'de' ? 'Konsultationen, Petitionen, Abstimmungen, Konferenzen...' :
                    'Consultations, petitions, votes, conferences...'}
              </p>
            </div>
          )}
        </div>

        {/* Keyboard Shortcuts Hint */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">↵</kbd>
                {language === 'fr' ? 'Sélectionner' : language === 'de' ? 'Auswählen' : 'Select'}
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">Esc</kbd>
                {language === 'fr' ? 'Fermer' : language === 'de' ? 'Schließen' : 'Close'}
              </span>
            </div>
            <span>
              {language === 'fr' ? 'Raccourci : ' : language === 'de' ? 'Tastenkombination : ' : 'Shortcut : '}
              <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">Ctrl+K</kbd>
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
