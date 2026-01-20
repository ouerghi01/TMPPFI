import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
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
  Filter,
  X,
  ArrowRight
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

export function SearchResultsPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('relevance');

  // Perform search
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
          icon: <FileText className="w-5 h-5" />,
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
          icon: <MessageSquare className="w-5 h-5" />,
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
          icon: <Vote className="w-5 h-5" />,
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
          icon: <Presentation className="w-5 h-5" />,
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
          icon: <Users className="w-5 h-5" />,
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
          icon: <Layers className="w-5 h-5" />
        });
      }
    });

    setResults(allResults);
  }, [query, language]);

  // Apply filters
  const filteredResults = results.filter(result => {
    if (typeFilter !== 'all' && result.type !== typeFilter) return false;
    if (statusFilter !== 'all' && result.metadata?.status !== statusFilter) return false;
    return true;
  });

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  const handleClearFilters = () => {
    setTypeFilter('all');
    setStatusFilter('all');
    setSortBy('relevance');
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
      active: { label: 'Actif', color: 'bg-green-100 text-green-700 border-green-200' },
      closed: { label: 'Terminé', color: 'bg-gray-100 text-gray-700 border-gray-200' },
      upcoming: { label: 'À venir', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      open: { label: 'Ouvert', color: 'bg-green-100 text-green-700 border-green-200' },
      draft: { label: 'Brouillon', color: 'bg-gray-100 text-gray-700 border-gray-200' }
    };
    const variant = variants[status] || { label: status, color: 'bg-gray-100 text-gray-700 border-gray-200' };
    return <Badge className={`${variant.color} border`}>{variant.label}</Badge>;
  };

  // Group results by type
  const resultsByType = filteredResults.reduce((acc, result) => {
    if (!acc[result.type]) {
      acc[result.type] = [];
    }
    acc[result.type].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            {language === 'fr' ? 'Résultats de recherche' :
             language === 'de' ? 'Suchergebnisse' :
             'Search Results'}
          </h1>
          <p className="text-gray-600">
            {filteredResults.length} {language === 'fr' ? 'résultat(s) trouvé(s)' :
                                       language === 'de' ? 'Ergebnis(se) gefunden' :
                                       'result(s) found'}
            {query && ` ${language === 'fr' ? 'pour' : language === 'de' ? 'für' : 'for'} "${query}"`}
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={
                    language === 'fr' ? 'Rechercher...' :
                    language === 'de' ? 'Suchen...' :
                    'Search...'
                  }
                  className="pl-10 pr-4 h-12 text-lg"
                />
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-base">
                  <span className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    {language === 'fr' ? 'Filtres' :
                     language === 'de' ? 'Filter' :
                     'Filters'}
                  </span>
                  {(typeFilter !== 'all' || statusFilter !== 'all') && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearFilters}
                      className="text-xs"
                    >
                      {language === 'fr' ? 'Réinitialiser' :
                       language === 'de' ? 'Zurücksetzen' :
                       'Reset'}
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    {language === 'fr' ? 'Type de contenu' :
                     language === 'de' ? 'Inhaltstyp' :
                     'Content Type'}
                  </label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        {language === 'fr' ? 'Tous' : language === 'de' ? 'Alle' : 'All'}
                      </SelectItem>
                      <SelectItem value="consultation">Consultations</SelectItem>
                      <SelectItem value="petition">Pétitions</SelectItem>
                      <SelectItem value="vote">Votes</SelectItem>
                      <SelectItem value="conference">Conférences</SelectItem>
                      <SelectItem value="assembly">Assemblées</SelectItem>
                      <SelectItem value="theme">Thèmes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    {language === 'fr' ? 'Statut' :
                     language === 'de' ? 'Status' :
                     'Status'}
                  </label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        {language === 'fr' ? 'Tous' : language === 'de' ? 'Alle' : 'All'}
                      </SelectItem>
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="open">Ouvert</SelectItem>
                      <SelectItem value="closed">Terminé</SelectItem>
                      <SelectItem value="upcoming">À venir</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    {language === 'fr' ? 'Trier par' :
                     language === 'de' ? 'Sortieren nach' :
                     'Sort by'}
                  </label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Pertinence</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="popularity">Popularité</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Type breakdown */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    {language === 'fr' ? 'Par catégorie' :
                     language === 'de' ? 'Nach Kategorie' :
                     'By Category'}
                  </p>
                  <div className="space-y-2">
                    {Object.entries(resultsByType).map(([type, items]) => (
                      <div key={type} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{getTypeLabel(type)}</span>
                        <Badge variant="outline">{items.length}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-4">
            {filteredResults.length === 0 && query.trim().length >= 2 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {language === 'fr' ? 'Aucun résultat trouvé' :
                     language === 'de' ? 'Keine Ergebnisse gefunden' :
                     'No results found'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'fr' ? 'Essayez de modifier vos critères de recherche ou vos filtres' :
                     language === 'de' ? 'Versuchen Sie, Ihre Suchkriterien oder Filter zu ändern' :
                     'Try adjusting your search criteria or filters'}
                  </p>
                </CardContent>
              </Card>
            )}

            {filteredResults.map((result) => (
              <Card
                key={`${result.type}-${result.id}`}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(result.url)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-blue-100 text-blue-600 shrink-0">
                      {result.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {result.title}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">
                              {getTypeLabel(result.type)}
                            </Badge>
                            {result.metadata?.status && getStatusBadge(result.metadata.status)}
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 shrink-0 ml-2" />
                      </div>
                      
                      {result.description && (
                        <p className="text-gray-600 mb-3 line-clamp-2">
                          {result.description}
                        </p>
                      )}

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        {result.metadata?.date && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(result.metadata.date).toLocaleDateString('fr-FR')}
                          </span>
                        )}
                        {result.metadata?.participants !== undefined && (
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            {result.metadata.participants} participants
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}