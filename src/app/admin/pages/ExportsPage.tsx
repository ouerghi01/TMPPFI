import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, FileJson, Calendar, Filter, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

interface Export {
  id: string;
  name: string;
  type: 'pdf' | 'csv' | 'json' | 'excel';
  category: 'users' | 'consultations' | 'votes' | 'petitions' | 'analytics';
  status: 'ready' | 'generating' | 'failed';
  date: string;
  size: string;
  downloadCount: number;
}

export function ExportsPage() {
  const [exports] = useState([
    {
      id: '1',
      name: 'Rapport mensuel - Décembre 2024',
      type: 'pdf',
      category: 'analytics',
      status: 'ready',
      date: '2025-01-05T10:30:00',
      size: '2.4 MB',
      downloadCount: 12
    },
    {
      id: '2',
      name: 'Export utilisateurs actifs',
      type: 'csv',
      category: 'users',
      status: 'ready',
      date: '2025-01-04T15:20:00',
      size: '856 KB',
      downloadCount: 8
    },
    {
      id: '3',
      name: 'Données concertations - Q4 2024',
      type: 'json',
      category: 'consultations',
      status: 'generating',
      date: '2025-01-06T09:15:00',
      size: '-',
      downloadCount: 0
    },
    {
      id: '4',
      name: 'Statistiques votes - Annuel 2024',
      type: 'excel',
      category: 'votes',
      status: 'ready',
      date: '2025-01-03T14:45:00',
      size: '3.2 MB',
      downloadCount: 24
    },
    {
      id: '5',
      name: 'Export pétitions - Erreur de génération',
      type: 'pdf',
      category: 'petitions',
      status: 'failed',
      date: '2025-01-02T11:00:00',
      size: '-',
      downloadCount: 0
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5" />;
      case 'csv':
      case 'excel':
        return <FileSpreadsheet className="w-5 h-5" />;
      case 'json':
        return <FileJson className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      pdf: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      csv: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      json: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      excel: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
    };
    return colors[type] || colors.pdf;
  };

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      users: 'Utilisateurs',
      consultations: 'Concertations',
      votes: 'Votes',
      petitions: 'Pétitions',
      analytics: 'Statistiques'
    };
    return labels[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      users: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      consultations: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      votes: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      petitions: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
      analytics: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400'
    };
    return colors[category] || colors.users;
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      ready: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      generating: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
      failed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    };
    return colors[status] || colors.ready;
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      ready: 'Prêt',
      generating: 'En cours',
      failed: 'Échec'
    };
    return labels[status] || status;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready':
        return <CheckCircle className="w-4 h-4" />;
      case 'generating':
        return <Clock className="w-4 h-4" />;
      case 'failed':
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Download className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Exports & Rapports
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Gérer et générer les exports de données
            </p>
          </div>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Nouvel export
        </Button>
      </div>

      {/* Quick Export Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Rapport mensuel
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Synthèse complète du mois
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <FileSpreadsheet className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Données utilisateurs
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Export CSV des utilisateurs
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <FileJson className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Données ouvertes
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Export JSON pour API
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                <FileSpreadsheet className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Statistiques Excel
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Tableaux de bord détaillés
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total exports
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {exports.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Download className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Prêts
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {exports.filter(e => e.status === 'ready').length}
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
                  En cours
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {exports.filter(e => e.status === 'generating').length}
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
                  Téléchargements
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {exports.reduce((sum, e) => sum + e.downloadCount, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Tous
            </Button>
            <Button variant="outline" size="sm">
              PDF
            </Button>
            <Button variant="outline" size="sm">
              CSV
            </Button>
            <Button variant="outline" size="sm">
              JSON
            </Button>
            <Button variant="outline" size="sm">
              Excel
            </Button>
            <div className="ml-auto flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Calendar className="w-4 h-4" />
                Période
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exports List */}
      <div className="space-y-4">
        {exports.map((exportItem) => (
          <Card key={exportItem.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(exportItem.type)}`}>
                  {getTypeIcon(exportItem.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {exportItem.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={getTypeColor(exportItem.type)}>
                          {exportItem.type.toUpperCase()}
                        </Badge>
                        <Badge className={getCategoryColor(exportItem.category)}>
                          {getCategoryLabel(exportItem.category)}
                        </Badge>
                        <Badge className={getStatusColor(exportItem.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(exportItem.status)}
                            {getStatusLabel(exportItem.status)}
                          </div>
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Date de création</p>
                      <p className="font-medium text-gray-900 dark:text-white mt-1">
                        {formatDate(exportItem.date)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Taille</p>
                      <p className="font-medium text-gray-900 dark:text-white mt-1">
                        {exportItem.size}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Téléchargements</p>
                      <p className="font-medium text-gray-900 dark:text-white mt-1">
                        {exportItem.downloadCount}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {exportItem.status === 'ready' && (
                    <Button size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      Télécharger
                    </Button>
                  )}
                  {exportItem.status === 'generating' && (
                    <Button size="sm" disabled className="gap-2">
                      <Clock className="w-4 h-4 animate-spin" />
                      En cours...
                    </Button>
                  )}
                  {exportItem.status === 'failed' && (
                    <Button size="sm" variant="outline" className="gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Réessayer
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Export Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Formats disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">PDF</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Rapports formatés et synthèses pour impression
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileSpreadsheet className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">CSV</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Données tabulaires pour analyse et traitement
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileJson className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">JSON</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Données structurées pour intégrations API
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileSpreadsheet className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Excel</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Tableaux de bord avec graphiques et formules
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
