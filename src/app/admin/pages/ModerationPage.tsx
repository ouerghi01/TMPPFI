import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Textarea } from '../../components/ui/textarea';
import { Input } from '../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog';
import {
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  User,
  Calendar,
  Eye,
  Search,
  Filter,
  FileText,
  Shield,
  Flag,
  TrendingUp,
  Users,
  AlertTriangle,
  CheckSquare
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Checkbox } from '../../components/ui/checkbox';
import { toast } from 'sonner';

// Import hooks
import {
  useModerationItems,
  useModerationStats,
  usePerformModerationAction,
  useBulkModerationAction,
  useModerationDashboard
} from '../../hooks/useModerationApi';

import type { ModerationItemDTO, ModerationFilterDTO, ModerationStatus, ModerationPriority, ModerationContentType } from '../../types';

export function ModerationPage() {
  const { language, tLocal } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<ModerationItemDTO | null>(null);
  const [moderationComment, setModerationComment] = useState('');
  const [activeTab, setActiveTab] = useState<ModerationStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [showBulkActionDialog, setShowBulkActionDialog] = useState(false);
  const [bulkAction, setBulkAction] = useState<'approve' | 'reject' | 'flag'>('approve');

  // Build filters
  const filters: ModerationFilterDTO = {
    status: activeTab === 'all' ? undefined : [activeTab],
    priority: priorityFilter === 'all' ? undefined : [priorityFilter as ModerationPriority],
    contentType: typeFilter === 'all' ? undefined : [typeFilter as ModerationContentType],
    searchQuery: searchQuery || undefined,
    sortBy: 'priority',
    sortOrder: 'desc'
  };

  // Queries
  const { data: items = [], isLoading: itemsLoading } = useModerationItems(filters);
  const { data: stats, isLoading: statsLoading } = useModerationStats();
  const { data: dashboard } = useModerationDashboard();

  // Mutations
  const performAction = usePerformModerationAction();
  const performBulkAction = useBulkModerationAction();

  const getPriorityBadge = (priority: ModerationPriority) => {
    const variants: Record<string, { label: string; color: string }> = {
      urgent: { 
        label: language === 'fr' ? 'Urgent' : language === 'de' ? 'Dringend' : 'Urgent', 
        color: 'bg-red-100 text-red-700 border-red-300' 
      },
      high: { 
        label: language === 'fr' ? 'Élevé' : language === 'de' ? 'Hoch' : 'High', 
        color: 'bg-orange-100 text-orange-700 border-orange-300' 
      },
      medium: { 
        label: language === 'fr' ? 'Moyen' : language === 'de' ? 'Mittel' : 'Medium', 
        color: 'bg-yellow-100 text-yellow-700 border-yellow-300' 
      },
      low: { 
        label: language === 'fr' ? 'Faible' : language === 'de' ? 'Niedrig' : 'Low', 
        color: 'bg-gray-100 text-gray-700 border-gray-300' 
      }
    };

    const variant = variants[priority] || variants.low;
    return (
      <Badge className={`${variant.color} border`}>
        {variant.label}
      </Badge>
    );
  };

  const getStatusBadge = (status: ModerationStatus) => {
    const variants: Record<string, { label: string; color: string; icon: any }> = {
      pending: { 
        label: language === 'fr' ? 'En attente' : language === 'de' ? 'Ausstehend' : 'Pending', 
        color: 'bg-orange-100 text-orange-700 border-orange-300', 
        icon: Clock 
      },
      approved: { 
        label: language === 'fr' ? 'Approuvé' : language === 'de' ? 'Genehmigt' : 'Approved', 
        color: 'bg-green-100 text-green-700 border-green-300', 
        icon: CheckCircle 
      },
      rejected: { 
        label: language === 'fr' ? 'Rejeté' : language === 'de' ? 'Abgelehnt' : 'Rejected', 
        color: 'bg-red-100 text-red-700 border-red-300', 
        icon: XCircle 
      },
      flagged: { 
        label: language === 'fr' ? 'Signalé' : language === 'de' ? 'Gemeldet' : 'Flagged', 
        color: 'bg-amber-100 text-amber-700 border-amber-300', 
        icon: Flag 
      },
      escalated: { 
        label: language === 'fr' ? 'Escaladé' : language === 'de' ? 'Eskaliert' : 'Escalated', 
        color: 'bg-purple-100 text-purple-700 border-purple-300', 
        icon: TrendingUp 
      }
    };

    const variant = variants[status] || variants.pending;
    const Icon = variant.icon;
    
    return (
      <Badge className={`${variant.color} border flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {variant.label}
      </Badge>
    );
  };

  const getTypeBadge = (type: ModerationContentType) => {
    const types: Record<string, { label: string; color: string }> = {
      proposal: { 
        label: language === 'fr' ? 'Proposition' : language === 'de' ? 'Vorschlag' : 'Proposal', 
        color: 'bg-blue-100 text-blue-700 border-blue-300' 
      },
      comment: { 
        label: language === 'fr' ? 'Commentaire' : language === 'de' ? 'Kommentar' : 'Comment', 
        color: 'bg-purple-100 text-purple-700 border-purple-300' 
      },
      petition: { 
        label: language === 'fr' ? 'Pétition' : language === 'de' ? 'Petition' : 'Petition', 
        color: 'bg-cyan-100 text-cyan-700 border-cyan-300' 
      },
      signalement: { 
        label: language === 'fr' ? 'Signalement' : language === 'de' ? 'Meldung' : 'Report', 
        color: 'bg-red-100 text-red-700 border-red-300' 
      },
      annotation: { 
        label: language === 'fr' ? 'Annotation' : language === 'de' ? 'Anmerkung' : 'Annotation', 
        color: 'bg-green-100 text-green-700 border-green-300' 
      },
      poll_response: { 
        label: language === 'fr' ? 'Réponse sondage' : language === 'de' ? 'Umfrageantwort' : 'Poll response', 
        color: 'bg-pink-100 text-pink-700 border-pink-300' 
      },
      user_profile: { 
        label: language === 'fr' ? 'Profil utilisateur' : language === 'de' ? 'Benutzerprofil' : 'User profile', 
        color: 'bg-indigo-100 text-indigo-700 border-indigo-300' 
      }
    };

    const variant = types[type] || types.comment;
    return (
      <Badge className={`${variant.color} border`}>
        {variant.label}
      </Badge>
    );
  };

  const handleApprove = async () => {
    if (!selectedItem) return;

    try {
      await performAction.mutateAsync({
        itemId: selectedItem.id,
        action: 'approve',
        comment: moderationComment || undefined,
        notifyAuthor: true
      });

      toast.success(
        language === 'fr' ? 'Contenu approuvé avec succès' :
        language === 'de' ? 'Inhalt erfolgreich genehmigt' :
        'Content approved successfully'
      );
      
      setModerationComment('');
      setSelectedItem(null);
    } catch (error) {
      toast.error(
        language === 'fr' ? 'Erreur lors de l\'approbation' :
        language === 'de' ? 'Fehler bei der Genehmigung' :
        'Error approving content'
      );
    }
  };

  const handleReject = async () => {
    if (!selectedItem || !moderationComment.trim()) return;

    try {
      await performAction.mutateAsync({
        itemId: selectedItem.id,
        action: 'reject',
        reason: {
          fr: moderationComment,
          de: moderationComment,
          en: moderationComment
        },
        comment: moderationComment,
        notifyAuthor: true
      });

      toast.success(
        language === 'fr' ? 'Contenu rejeté' :
        language === 'de' ? 'Inhalt abgelehnt' :
        'Content rejected'
      );
      
      setModerationComment('');
      setSelectedItem(null);
    } catch (error) {
      toast.error(
        language === 'fr' ? 'Erreur lors du rejet' :
        language === 'de' ? 'Fehler bei der Ablehnung' :
        'Error rejecting content'
      );
    }
  };

  const handleBulkAction = async () => {
    if (selectedItems.size === 0) return;

    try {
      await performBulkAction.mutateAsync({
        itemIds: Array.from(selectedItems),
        action: bulkAction,
        comment: moderationComment || undefined,
        notifyAuthors: true
      });

      toast.success(
        language === 'fr' ? `${selectedItems.size} contenus traités avec succès` :
        language === 'de' ? `${selectedItems.size} Inhalte erfolgreich verarbeitet` :
        `${selectedItems.size} items processed successfully`
      );

      setSelectedItems(new Set());
      setShowBulkActionDialog(false);
      setModerationComment('');
    } catch (error) {
      toast.error(
        language === 'fr' ? 'Erreur lors du traitement en masse' :
        language === 'de' ? 'Fehler bei der Massenverarbeitung' :
        'Error processing bulk action'
      );
    }
  };

  const toggleItemSelection = (itemId: string) => {
    const newSet = new Set(selectedItems);
    if (newSet.has(itemId)) {
      newSet.delete(itemId);
    } else {
      newSet.add(itemId);
    }
    setSelectedItems(newSet);
  };

  const toggleAllItems = () => {
    if (selectedItems.size === items.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(items.map(item => item.id)));
    }
  };

  const pendingCount = stats?.overview.totalPending || 0;
  const approvedCount = stats?.overview.totalApproved || 0;
  const rejectedCount = stats?.overview.totalRejected || 0;
  const flaggedCount = stats?.overview.totalFlagged || 0;
  const urgentCount = stats?.byPriority.urgent || 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            {language === 'fr' ? 'Modération des contenus' :
             language === 'de' ? 'Inhaltsmoderation' :
             'Content Moderation'}
          </h1>
          <p className="text-gray-600">
            {language === 'fr' ? 'Examinez et modérez les contributions des citoyens' :
             language === 'de' ? 'Überprüfen und moderieren Sie Bürgerbeiträge' :
             'Review and moderate citizen contributions'}
          </p>
        </div>
        <div className="flex gap-2">
          {selectedItems.size > 0 && (
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setShowBulkActionDialog(true)}
            >
              <CheckSquare className="w-4 h-4" />
              {language === 'fr' ? `Traiter ${selectedItems.size} sélection(s)` :
               language === 'de' ? `${selectedItems.size} Auswahl(en) verarbeiten` :
               `Process ${selectedItems.size} selection(s)`}
            </Button>
          )}
          <Button variant="outline" className="gap-2">
            <Shield className="w-4 h-4" />
            {language === 'fr' ? 'Guide de modération' :
             language === 'de' ? 'Moderationsleitfaden' :
             'Moderation guide'}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'fr' ? 'En attente' : language === 'de' ? 'Ausstehend' : 'Pending'}
                </p>
                <p className="text-2xl font-semibold text-gray-900">{pendingCount}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'fr' ? 'Approuvés' : language === 'de' ? 'Genehmigt' : 'Approved'}
                </p>
                <p className="text-2xl font-semibold text-gray-900">{approvedCount}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'fr' ? 'Rejetés' : language === 'de' ? 'Abgelehnt' : 'Rejected'}
                </p>
                <p className="text-2xl font-semibold text-gray-900">{rejectedCount}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'fr' ? 'Signalés' : language === 'de' ? 'Gemeldet' : 'Flagged'}
                </p>
                <p className="text-2xl font-semibold text-gray-900">{flaggedCount}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-lg">
                <Flag className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'fr' ? 'Urgent' : language === 'de' ? 'Dringend' : 'Urgent'}
                </p>
                <p className="text-2xl font-semibold text-gray-900">{urgentCount}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ModerationStatus | 'all')} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 max-w-2xl">
          <TabsTrigger value="all">
            {language === 'fr' ? 'Tous' : language === 'de' ? 'Alle' : 'All'}
            <span className="ml-1 text-xs">({items.length})</span>
          </TabsTrigger>
          <TabsTrigger value="pending">
            <Clock className="w-3 h-3 mr-1" />
            {pendingCount}
          </TabsTrigger>
          <TabsTrigger value="flagged">
            <Flag className="w-3 h-3 mr-1" />
            {flaggedCount}
          </TabsTrigger>
          <TabsTrigger value="approved">
            <CheckCircle className="w-3 h-3 mr-1" />
            {approvedCount}
          </TabsTrigger>
          <TabsTrigger value="rejected">
            <XCircle className="w-3 h-3 mr-1" />
            {rejectedCount}
          </TabsTrigger>
        </TabsList>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="w-5 h-5" />
              {language === 'fr' ? 'Filtres et recherche' : language === 'de' ? 'Filter und Suche' : 'Filters and search'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative md:col-span-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder={language === 'fr' ? 'Rechercher...' : language === 'de' ? 'Suchen...' : 'Search...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'fr' ? 'Priorité' : language === 'de' ? 'Priorität' : 'Priority'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === 'fr' ? 'Toutes priorités' : language === 'de' ? 'Alle Prioritäten' : 'All priorities'}</SelectItem>
                  <SelectItem value="urgent">{language === 'fr' ? 'Urgent' : language === 'de' ? 'Dringend' : 'Urgent'}</SelectItem>
                  <SelectItem value="high">{language === 'fr' ? 'Élevé' : language === 'de' ? 'Hoch' : 'High'}</SelectItem>
                  <SelectItem value="medium">{language === 'fr' ? 'Moyen' : language === 'de' ? 'Mittel' : 'Medium'}</SelectItem>
                  <SelectItem value="low">{language === 'fr' ? 'Faible' : language === 'de' ? 'Niedrig' : 'Low'}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'fr' ? 'Type' : language === 'de' ? 'Typ' : 'Type'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === 'fr' ? 'Tous types' : language === 'de' ? 'Alle Typen' : 'All types'}</SelectItem>
                  <SelectItem value="proposal">{language === 'fr' ? 'Proposition' : language === 'de' ? 'Vorschlag' : 'Proposal'}</SelectItem>
                  <SelectItem value="comment">{language === 'fr' ? 'Commentaire' : language === 'de' ? 'Kommentar' : 'Comment'}</SelectItem>
                  <SelectItem value="petition">{language === 'fr' ? 'Pétition' : language === 'de' ? 'Petition' : 'Petition'}</SelectItem>
                  <SelectItem value="signalement">{language === 'fr' ? 'Signalement' : language === 'de' ? 'Meldung' : 'Report'}</SelectItem>
                  <SelectItem value="annotation">{language === 'fr' ? 'Annotation' : language === 'de' ? 'Anmerkung' : 'Annotation'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <TabsContent value={activeTab} className="space-y-6">
          {/* Contributions Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>
                  {language === 'fr' ? 'Contributions' : language === 'de' ? 'Beiträge' : 'Contributions'} ({items.length})
                </span>
                {items.length > 0 && (
                  <Checkbox
                    checked={selectedItems.size === items.length}
                    onCheckedChange={toggleAllItems}
                  />
                )}
              </CardTitle>
              <CardDescription>
                {activeTab === 'pending' && (language === 'fr' ? 'Contributions en attente de modération' : language === 'de' ? 'Beiträge, die auf Moderation warten' : 'Contributions pending moderation')}
                {activeTab === 'approved' && (language === 'fr' ? 'Contributions approuvées' : language === 'de' ? 'Genehmigte Beiträge' : 'Approved contributions')}
                {activeTab === 'rejected' && (language === 'fr' ? 'Contributions rejetées' : language === 'de' ? 'Abgelehnte Beiträge' : 'Rejected contributions')}
                {activeTab === 'flagged' && (language === 'fr' ? 'Contributions signalées' : language === 'de' ? 'Gemeldete Beiträge' : 'Flagged contributions')}
                {activeTab === 'all' && (language === 'fr' ? 'Toutes les contributions' : language === 'de' ? 'Alle Beiträge' : 'All contributions')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {itemsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              ) : (
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox
                            checked={selectedItems.size === items.length && items.length > 0}
                            onCheckedChange={toggleAllItems}
                          />
                        </TableHead>
                        <TableHead>{language === 'fr' ? 'Auteur' : language === 'de' ? 'Autor' : 'Author'}</TableHead>
                        <TableHead>{language === 'fr' ? 'Contenu' : language === 'de' ? 'Inhalt' : 'Content'}</TableHead>
                        <TableHead>{language === 'fr' ? 'Type' : language === 'de' ? 'Typ' : 'Type'}</TableHead>
                        <TableHead>{language === 'fr' ? 'Priorité' : language === 'de' ? 'Priorität' : 'Priority'}</TableHead>
                        <TableHead>{language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'}</TableHead>
                        <TableHead>{language === 'fr' ? 'Date' : language === 'de' ? 'Datum' : 'Date'}</TableHead>
                        <TableHead className="text-right">{language === 'fr' ? 'Actions' : language === 'de' ? 'Aktionen' : 'Actions'}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                            {language === 'fr' ? 'Aucune contribution à afficher' :
                             language === 'de' ? 'Keine Beiträge anzuzeigen' :
                             'No contributions to display'}
                          </TableCell>
                        </TableRow>
                      ) : (
                        items.map((item) => (
                          <TableRow 
                            key={item.id}
                            className={selectedItem?.id === item.id ? 'bg-blue-50' : ''}
                          >
                            <TableCell>
                              <Checkbox
                                checked={selectedItems.has(item.id)}
                                onCheckedChange={() => toggleItemSelection(item.id)}
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {item.author.avatar ? (
                                  <img 
                                    src={item.author.avatar} 
                                    alt={item.author.name} 
                                    className="w-8 h-8 rounded-full"
                                  />
                                ) : (
                                  <User className="w-4 h-4 text-gray-400" />
                                )}
                                <div>
                                  <p className="font-medium text-gray-900 text-sm">
                                    {item.author.name}
                                  </p>
                                  {item.author.warningsCount > 0 && (
                                    <p className="text-xs text-red-600 flex items-center gap-1">
                                      <AlertTriangle className="w-3 h-3" />
                                      {item.author.warningsCount} {language === 'fr' ? 'avert.' : language === 'de' ? 'Warn.' : 'warn.'}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="max-w-md">
                              {item.content.title && (
                                <p className="font-medium text-gray-900 text-sm mb-1">
                                  {tLocal(item.content.title)}
                                </p>
                              )}
                              <p className="text-sm text-gray-600 line-clamp-2">
                                {tLocal(item.content.text)}
                              </p>
                              {item.automatedFlags && item.automatedFlags.length > 0 && (
                                <div className="flex gap-1 mt-1">
                                  {item.automatedFlags.map((flag, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs bg-yellow-50 text-yellow-700">
                                      <AlertCircle className="w-3 h-3 mr-1" />
                                      {tLocal(flag.ruleName)}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              {item.reportsCount > 0 && (
                                <Badge variant="outline" className="text-xs bg-red-50 text-red-700 mt-1">
                                  <Users className="w-3 h-3 mr-1" />
                                  {item.reportsCount} {language === 'fr' ? 'signalement(s)' : language === 'de' ? 'Meldung(en)' : 'report(s)'}
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {getTypeBadge(item.contentType)}
                            </TableCell>
                            <TableCell>
                              {getPriorityBadge(item.priority)}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(item.status)}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Calendar className="w-3 h-3" />
                                {new Date(item.createdAt).toLocaleDateString(language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'en-US')}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedItem(item)}
                                className="gap-2"
                              >
                                <Eye className="w-4 h-4" />
                                {language === 'fr' ? 'Examiner' : language === 'de' ? 'Prüfen' : 'Review'}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Detail & Moderation Panel */}
          {selectedItem && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  {language === 'fr' ? 'Aperçu et modération' : language === 'de' ? 'Vorschau und Moderation' : 'Preview and moderation'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Contribution Details */}
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between pb-4 border-b">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {selectedItem.author.avatar ? (
                          <img 
                            src={selectedItem.author.avatar} 
                            alt={selectedItem.author.name} 
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <User className="w-5 h-5 text-gray-400" />
                        )}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {selectedItem.author.name}
                          </h3>
                          <p className="text-sm text-gray-600">{selectedItem.author.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(selectedItem.createdAt).toLocaleString(language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'en-US', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      {getStatusBadge(selectedItem.status)}
                      {getPriorityBadge(selectedItem.priority)}
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{language === 'fr' ? 'Type:' : language === 'de' ? 'Typ:' : 'Type:'}</span>
                      {getTypeBadge(selectedItem.contentType)}
                    </div>
                    {selectedItem.processTitle && (
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{language === 'fr' ? 'Processus:' : language === 'de' ? 'Prozess:' : 'Process:'}</span>
                        <Badge variant="outline" className="bg-gray-50">
                          {tLocal(selectedItem.processTitle)}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  {selectedItem.content.title && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{tLocal(selectedItem.content.title)}</h4>
                    </div>
                  )}
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                      {tLocal(selectedItem.content.text)}
                    </p>
                  </div>

                  {/* Automated Flags */}
                  {selectedItem.automatedFlags && selectedItem.automatedFlags.length > 0 && (
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="font-medium text-yellow-900 mb-2">
                            {language === 'fr' ? 'Détection automatique' :
                             language === 'de' ? 'Automatische Erkennung' :
                             'Automated detection'}
                          </p>
                          {selectedItem.automatedFlags.map((flag, idx) => (
                            <div key={idx} className="mb-2 last:mb-0">
                              <p className="text-sm font-medium text-yellow-800">
                                {tLocal(flag.ruleName)} ({flag.confidence}%)
                              </p>
                              <p className="text-xs text-yellow-700">{tLocal(flag.reason)}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* User Reports */}
                  {selectedItem.reportsCount > 0 && (
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-start gap-2">
                        <Users className="w-5 h-5 text-red-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-red-900">
                            {selectedItem.reportsCount} {language === 'fr' ? 'signalement(s) utilisateur' :
                                                          language === 'de' ? 'Benutzermeldung(en)' :
                                                          'user report(s)'}
                          </p>
                          <p className="text-sm text-red-700 mt-1">
                            {language === 'fr' ? 'Ce contenu a été signalé par des utilisateurs' :
                             language === 'de' ? 'Dieser Inhalt wurde von Benutzern gemeldet' :
                             'This content has been reported by users'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Moderation History */}
                  {selectedItem.moderationHistory && selectedItem.moderationHistory.length > 0 && (
                    <div className={`p-4 rounded-lg border ${
                      selectedItem.status === 'approved' 
                        ? 'bg-green-50 border-green-200'
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <div className="flex items-start gap-2">
                        {selectedItem.status === 'approved' ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                        )}
                        <div>
                          <p className="font-medium text-gray-900 mb-2">
                            {language === 'fr' ? 'Historique de modération' :
                             language === 'de' ? 'Moderationsverlauf' :
                             'Moderation history'}
                          </p>
                          {selectedItem.moderationHistory.map((history, idx) => (
                            <div key={idx} className="text-sm mb-2 last:mb-0">
                              <p className="font-medium">
                                {history.moderatorName} - {new Date(history.performedAt).toLocaleString(language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'en-US')}
                              </p>
                              {history.reason && (
                                <p className="text-gray-700">{tLocal(history.reason)}</p>
                              )}
                              {history.comment && (
                                <p className="text-gray-600 italic">{history.comment}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Moderation Actions */}
                {selectedItem.status === 'pending' && (
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'fr' ? 'Commentaire de modération' :
                         language === 'de' ? 'Moderationskommentar' :
                         'Moderation comment'}
                      </label>
                      <Textarea
                        value={moderationComment}
                        onChange={(e) => setModerationComment(e.target.value)}
                        placeholder={language === 'fr' ? 'Ajoutez un commentaire expliquant votre décision (optionnel pour approbation, requis pour rejet)...' :
                                     language === 'de' ? 'Fügen Sie einen Kommentar hinzu, der Ihre Entscheidung erklärt (optional für Genehmigung, erforderlich für Ablehnung)...' :
                                     'Add a comment explaining your decision (optional for approval, required for rejection)...'}
                        rows={4}
                        className="resize-none"
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={handleApprove}
                        disabled={performAction.isPending}
                        className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4" />
                        {language === 'fr' ? 'Approuver' : language === 'de' ? 'Genehmigen' : 'Approve'}
                      </Button>
                      <Button
                        onClick={handleReject}
                        variant="destructive"
                        disabled={!moderationComment.trim() || performAction.isPending}
                        className="flex-1 gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        {language === 'fr' ? 'Rejeter' : language === 'de' ? 'Ablehnen' : 'Reject'}
                      </Button>
                    </div>

                    {!moderationComment.trim() && (
                      <p className="text-xs text-amber-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {language === 'fr' ? 'Un commentaire est requis pour rejeter une contribution' :
                         language === 'de' ? 'Ein Kommentar ist erforderlich, um einen Beitrag abzulehnen' :
                         'A comment is required to reject a contribution'}
                      </p>
                    )}
                  </div>
                )}

                {/* Already Moderated */}
                {selectedItem.status !== 'pending' && selectedItem.status !== 'flagged' && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className={`p-4 rounded-lg flex items-center gap-3 ${
                      selectedItem.status === 'approved'
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-red-50 border border-red-200'
                    }`}>
                      {selectedItem.status === 'approved' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">
                          {language === 'fr' ? `Contribution ${selectedItem.status === 'approved' ? 'approuvée' : 'rejetée'}` :
                           language === 'de' ? `Beitrag ${selectedItem.status === 'approved' ? 'genehmigt' : 'abgelehnt'}` :
                           `Contribution ${selectedItem.status === 'approved' ? 'approved' : 'rejected'}`}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {language === 'fr' ? 'Cette contribution a déjà été traitée' :
                           language === 'de' ? 'Dieser Beitrag wurde bereits bearbeitet' :
                           'This contribution has already been processed'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Bulk Action Dialog */}
      <AlertDialog open={showBulkActionDialog} onOpenChange={setShowBulkActionDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {language === 'fr' ? 'Action en masse' : language === 'de' ? 'Massenaktion' : 'Bulk action'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === 'fr' ? `Vous êtes sur le point de traiter ${selectedItems.size} contribution(s)` :
               language === 'de' ? `Sie sind dabei, ${selectedItems.size} Beitrag/Beiträge zu verarbeiten` :
               `You are about to process ${selectedItems.size} contribution(s)`}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'fr' ? 'Action' : language === 'de' ? 'Aktion' : 'Action'}
              </label>
              <Select value={bulkAction} onValueChange={(v) => setBulkAction(v as 'approve' | 'reject' | 'flag')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="approve">
                    {language === 'fr' ? 'Approuver' : language === 'de' ? 'Genehmigen' : 'Approve'}
                  </SelectItem>
                  <SelectItem value="reject">
                    {language === 'fr' ? 'Rejeter' : language === 'de' ? 'Ablehnen' : 'Reject'}
                  </SelectItem>
                  <SelectItem value="flag">
                    {language === 'fr' ? 'Signaler' : language === 'de' ? 'Melden' : 'Flag'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'fr' ? 'Commentaire (optionnel)' : language === 'de' ? 'Kommentar (optional)' : 'Comment (optional)'}
              </label>
              <Textarea
                value={moderationComment}
                onChange={(e) => setModerationComment(e.target.value)}
                placeholder={language === 'fr' ? 'Ajoutez un commentaire...' :
                             language === 'de' ? 'Fügen Sie einen Kommentar hinzu...' :
                             'Add a comment...'}
                rows={3}
              />
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setModerationComment('');
              setShowBulkActionDialog(false);
            }}>
              {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleBulkAction}
              disabled={performBulkAction.isPending}
            >
              {language === 'fr' ? 'Confirmer' : language === 'de' ? 'Bestätigen' : 'Confirm'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
