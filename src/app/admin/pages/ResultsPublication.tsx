import React, { useState } from 'react';
import { FileCheck, Plus, Eye, Download, Share2, CheckCircle, Clock, AlertCircle, Edit2, Trash2, Send } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { NewResultDialog, EditResultDialog, PublishResultDialog, DeleteResultDialog } from '../components/dialogs/ResultDialogs';

interface Result {
  id: string;
  title: string;
  type: 'consultation' | 'vote' | 'petition' | 'assembly';
  status: 'draft' | 'published' | 'scheduled';
  date: string;
  scheduledDate?: string;
  participants: number;
  views: number;
  downloads: number;
}

export function ResultsPublication() {
  const [results] = useState([
    {
      id: '1',
      title: 'Résultats - Concertation Mobilité Urbaine',
      type: 'consultation',
      status: 'published',
      date: '2025-01-05',
      participants: 487,
      views: 1240,
      downloads: 89
    },
    {
      id: '2',
      title: 'Résultats - Vote Budget Participatif 2025',
      type: 'vote',
      status: 'published',
      date: '2025-01-03',
      participants: 1523,
      views: 3450,
      downloads: 234
    },
    {
      id: '3',
      title: 'Résultats - Pétition Transport Public',
      type: 'petition',
      status: 'scheduled',
      date: '2025-01-02',
      scheduledDate: '2025-01-15',
      participants: 2847,
      views: 0,
      downloads: 0
    },
    {
      id: '4',
      title: 'Résultats - Assemblée Citoyenne Climat',
      type: 'assembly',
      status: 'draft',
      date: '2024-12-28',
      participants: 145,
      views: 0,
      downloads: 0
    },
    {
      id: '5',
      title: 'Résultats - Concertation Espaces Verts',
      type: 'consultation',
      status: 'published',
      date: '2024-12-20',
      participants: 623,
      views: 2180,
      downloads: 156
    }
  ]);

  // Dialog states
  const [newResultOpen, setNewResultOpen] = useState(false);
  const [editResultOpen, setEditResultOpen] = useState(false);
  const [publishResultOpen, setPublishResultOpen] = useState(false);
  const [deleteResultOpen, setDeleteResultOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState<any>(null);

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      consultation: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      vote: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      petition: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      assembly: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
    };
    return colors[type] || colors.consultation;
  };

  const getTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      consultation: 'Concertation',
      vote: 'Vote',
      petition: 'Pétition',
      assembly: 'Assemblée'
    };
    return labels[type] || type;
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      draft: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
      published: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      scheduled: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
    };
    return colors[status] || colors.draft;
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      draft: 'Brouillon',
      published: 'Publié',
      scheduled: 'Programmé'
    };
    return labels[status] || status;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="w-4 h-4" />;
      case 'scheduled':
        return <Clock className="w-4 h-4" />;
      case 'draft':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleEditResult = (result: any) => {
    setSelectedResult(result);
    setEditResultOpen(true);
  };

  const handlePublishResult = (result: any) => {
    setSelectedResult(result);
    setPublishResultOpen(true);
  };

  const handleDeleteResult = (result: any) => {
    setSelectedResult(result);
    setDeleteResultOpen(true);
  };

  const handleNewResultSubmit = (data: any) => {
    console.log('New result:', data);
    // TODO: Implement result creation
  };

  const handleEditSubmit = (data: any) => {
    console.log('Edit result:', data);
    // TODO: Implement result update
  };

  const handlePublishConfirm = (options: any) => {
    console.log('Publish result with options:', options);
    // TODO: Implement result publication
  };

  const handleDeleteConfirm = () => {
    console.log('Delete result:', selectedResult);
    // TODO: Implement result deletion
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <FileCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Publication des résultats
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Gérer et publier les résultats des processus participatifs
            </p>
          </div>
        </div>
        <Button className="gap-2" onClick={() => setNewResultOpen(true)}>
          <Plus className="w-4 h-4" />
          Nouveau résultat
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total résultats
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {results.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <FileCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Publiés
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {results.filter(r => r.status === 'published').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Programmés
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {results.filter(r => r.status === 'scheduled').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Brouillons
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {results.filter(r => r.status === 'draft').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm">
              Tous
            </Button>
            <Button variant="outline" size="sm">
              Publiés
            </Button>
            <Button variant="outline" size="sm">
              Programmés
            </Button>
            <Button variant="outline" size="sm">
              Brouillons
            </Button>
            <div className="ml-auto flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Exporter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results List */}
      <div className="space-y-4">
        {results.map((result) => (
          <Card key={result.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {result.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={getTypeColor(result.type)}>
                          {getTypeLabel(result.type)}
                        </Badge>
                        <Badge className={getStatusColor(result.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(result.status)}
                            {getStatusLabel(result.status)}
                          </div>
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Date du processus</p>
                      <p className="font-medium text-gray-900 dark:text-white mt-1">
                        {formatDate(result.date)}
                      </p>
                    </div>
                    {result.scheduledDate && (
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Publication prévue</p>
                        <p className="font-medium text-gray-900 dark:text-white mt-1">
                          {formatDate(result.scheduledDate)}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Participants</p>
                      <p className="font-medium text-gray-900 dark:text-white mt-1">
                        {result.participants.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Vues</p>
                      <p className="font-medium text-gray-900 dark:text-white mt-1">
                        {result.views.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Téléchargements</p>
                      <p className="font-medium text-gray-900 dark:text-white mt-1">
                        {result.downloads.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {result.status === 'draft' && (
                    <Button size="sm" className="gap-2" onClick={() => handlePublishResult(result)}>
                      <Send className="w-4 h-4" />
                      Publier
                    </Button>
                  )}
                  {result.status === 'published' && (
                    <>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Eye className="w-4 h-4" />
                        Voir
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Share2 className="w-4 h-4" />
                        Partager
                      </Button>
                    </>
                  )}
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    PDF
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEditResult(result)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteResult(result)}>
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Publication Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Directives de publication</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p>
                <strong>Transparence :</strong> Tous les résultats doivent être publiés dans un délai de 30 jours après la clôture du processus
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p>
                <strong>Accessibilité :</strong> Les résultats doivent être présentés de manière claire et compréhensible pour tous les citoyens
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p>
                <strong>Format :</strong> Fournir les résultats dans plusieurs formats (web, PDF, données ouvertes)
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p>
                <strong>Suivi :</strong> Inclure les prochaines étapes et comment les résultats seront utilisés
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <NewResultDialog
        open={newResultOpen}
        onOpenChange={setNewResultOpen}
        onSubmit={handleNewResultSubmit}
      />
      
      <EditResultDialog
        open={editResultOpen}
        onOpenChange={setEditResultOpen}
        result={selectedResult}
        onSubmit={handleEditSubmit}
      />
      
      <PublishResultDialog
        open={publishResultOpen}
        onOpenChange={setPublishResultOpen}
        result={selectedResult}
        onConfirm={handlePublishConfirm}
      />
      
      <DeleteResultDialog
        open={deleteResultOpen}
        onOpenChange={setDeleteResultOpen}
        result={selectedResult}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}