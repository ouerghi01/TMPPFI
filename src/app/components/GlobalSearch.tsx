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
  Calendar,
  Presentation,
  Layers,
  Clock,
  TrendingUp,
  X
} from 'lucide-react';
import { consultations, petitions, votes, conferences, participatoryProcesses } from '../data/mockData';
import { themes } from '../data/themes';

interface SearchResult {
  id: string;
  type: 'consultation' | 'petition' | 'vote' | 'conference' | 'assembly' | 'theme';
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
    consultations.forEach(c => {
      if ((c.title?.toLowerCase().includes(searchQuery)) || 
          (c.description?.toLowerCase().includes(searchQuery))) {
        allResults.push({
          id: c.id,
          type: 'consultation',
          title: c.title,
          description: c.description,
          url: `/consultations/${c.id}`,
          icon: <FileText className="w-4 h-4" />,
          metadata: {
            date: c.endDate,
            status: c.status,
            participants: c.supports
          }
        });
      }
    });

    // Search petitions
    petitions.forEach(p => {
      if ((p.title?.toLowerCase().includes(searchQuery)) || 
          (p.description?.toLowerCase().includes(searchQuery))) {
        allResults.push({
          id: p.id,
          type: 'petition',
          title: p.title,
          description: p.description,
          url: `/petitions/${p.id}`,
          icon: <MessageSquare className="w-4 h-4" />,
          metadata: {
            status: p.status,
            participants: p.signatures
          }
        });
      }
    });

    // Search votes
    votes.forEach(v => {
      if ((v.title?.toLowerCase().includes(searchQuery)) || 
          (v.description?.toLowerCase().includes(searchQuery))) {
        allResults.push({
          id: v.id,
          type: 'vote',
          title: v.title,
          description: v.description,
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
    conferences.forEach(c => {
      if ((c.title?.toLowerCase().includes(searchQuery)) || 
          (c.description?.toLowerCase().includes(searchQuery))) {
        allResults.push({
          id: c.id,
          type: 'conference',
          title: c.title,
          description: c.description,
          url: `/conferences`,
          icon: <Presentation className="w-4 h-4" />,
          metadata: {
            date: c.date
          }
        });
      }
    });

    // Search participatory processes (assemblies)
    participatoryProcesses.forEach(p => {
      if ((p.title?.toLowerCase().includes(searchQuery)) || 
          (p.description?.toLowerCase().includes(searchQuery))) {
        allResults.push({
          id: p.id,
          type: 'assembly',
          title: p.title,
          description: p.description,
          url: `/assemblies`,
          icon: <Users className="w-4 h-4" />,
          metadata: {
            date: p.endDate,
            status: p.status
          }
        });
      }
    });

    // Search themes
    themes.forEach(t => {
      const themeName = language === 'fr' ? t.name.fr : language === 'de' ? t.name.de : t.name.en;
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

    setResults(allResults.slice(0, 10)); // Limit to 10 results
  }, [query, language]);

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
    const labels: Record<string, string> = {
      consultation: language === 'fr' ? 'Consultation' : language === 'de' ? 'Konsultation' : 'Consultation',
      petition: language === 'fr' ? 'Pétition' : language === 'de' ? 'Petition' : 'Petition',
      vote: language === 'fr' ? 'Vote' : language === 'de' ? 'Abstimmung' : 'Vote',
      conference: language === 'fr' ? 'Conférence' : language === 'de' ? 'Konferenz' : 'Conference',
      assembly: language === 'fr' ? 'Assemblée' : language === 'de' ? 'Versammlung' : 'Assembly',
      theme: language === 'fr' ? 'Thème' : language === 'de' ? 'Thema' : 'Theme'
    };
    return labels[type] || type;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; color: string }> = {
      active: { label: 'Actif', color: 'bg-green-100 text-green-700' },
      closed: { label: 'Terminé', color: 'bg-gray-100 text-gray-700' },
      upcoming: { label: 'À venir', color: 'bg-blue-100 text-blue-700' },
      open: { label: 'Ouvert', color: 'bg-green-100 text-green-700' },
      draft: { label: 'Brouillon', color: 'bg-gray-100 text-gray-700' }
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
                              {new Date(result.metadata.date).toLocaleDateString('fr-FR')}
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