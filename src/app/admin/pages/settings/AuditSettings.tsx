import React, { useState } from 'react';
import { Activity, Download, Filter, Search, User, FileText, Shield, AlertTriangle, Save, CheckCircle } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Switch } from '../../../components/ui/switch';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { toast } from 'sonner';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  module: string;
  level: 'info' | 'warning' | 'error' | 'critical';
  details: string;
  ip: string;
}

export function AuditSettings() {
  const [logs] = useState<AuditLog[]>([
    {
      id: '1',
      timestamp: '2025-01-06T10:45:23',
      user: 'admin@civiagora.ch',
      action: 'Modification des paramètres',
      module: 'Paramètres',
      level: 'info',
      details: 'Modification de la configuration SMTP',
      ip: '192.168.1.10'
    },
    {
      id: '2',
      timestamp: '2025-01-06T10:30:15',
      user: 'moderateur@civiagora.ch',
      action: 'Modération de contenu',
      module: 'Modération',
      level: 'warning',
      details: 'Suppression d\'un commentaire signalé',
      ip: '192.168.1.45'
    },
    {
      id: '3',
      timestamp: '2025-01-06T09:15:42',
      user: 'system',
      action: 'Échec de connexion',
      module: 'Sécurité',
      level: 'error',
      details: 'Tentative de connexion échouée (5 essais)',
      ip: '203.0.113.42'
    },
    {
      id: '4',
      timestamp: '2025-01-06T08:22:11',
      user: 'admin@civiagora.ch',
      action: 'Création d\'utilisateur',
      module: 'Utilisateurs',
      level: 'info',
      details: 'Création du compte gestionnaire jean.dupont@geneve.ch',
      ip: '192.168.1.10'
    },
    {
      id: '5',
      timestamp: '2025-01-05T18:30:00',
      user: 'system',
      action: 'Sauvegarde automatique',
      module: 'Système',
      level: 'info',
      details: 'Sauvegarde complète de la base de données',
      ip: 'localhost'
    }
  ]);

  const getLevelColor = (level: string) => {
    const colors: { [key: string]: string } = {
      info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
      error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      critical: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
    };
    return colors[level] || colors.info;
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      case 'error':
      case 'critical':
        return <Shield className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Logs & Audit
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Traçabilité et journaux d'activité
            </p>
          </div>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Exporter les logs
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total logs (24h)
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  1,247
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Avertissements
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  23
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Erreurs
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  7
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Utilisateurs actifs
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  142
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher dans les logs..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Tous
            </Button>
            <Button variant="outline" size="sm">
              Info
            </Button>
            <Button variant="outline" size="sm">
              Warning
            </Button>
            <Button variant="outline" size="sm">
              Erreur
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration de l'audit</CardTitle>
          <CardDescription>
            Paramètres de journalisation et de traçabilité
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Niveau de journalisation
              </label>
              <select 
                defaultValue="info"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="debug">Debug (Tout)</option>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="error">Erreur uniquement</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Durée de rétention (jours)
              </label>
              <input
                type="number"
                defaultValue="90"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Actions à journaliser
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="log-auth"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="log-auth" className="text-sm text-gray-700 dark:text-gray-300">
                  Authentification et connexions
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="log-users"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="log-users" className="text-sm text-gray-700 dark:text-gray-300">
                  Gestion des utilisateurs
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="log-content"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="log-content" className="text-sm text-gray-700 dark:text-gray-300">
                  Création/modification de contenu
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="log-moderation"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="log-moderation" className="text-sm text-gray-700 dark:text-gray-300">
                  Actions de modération
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="log-settings"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="log-settings" className="text-sm text-gray-700 dark:text-gray-300">
                  Modification des paramètres
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="log-exports"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="log-exports" className="text-sm text-gray-700 dark:text-gray-300">
                  Exports et téléchargements
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="log-api"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="log-api" className="text-sm text-gray-700 dark:text-gray-300">
                  Appels API externes
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="log-errors"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="log-errors" className="text-sm text-gray-700 dark:text-gray-300">
                  Erreurs système
                </label>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="anonymize-ips"
                defaultChecked
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="anonymize-ips" className="text-sm text-gray-700 dark:text-gray-300">
                Anonymiser les adresses IP (RGPD)
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Activité récente</CardTitle>
          <CardDescription>
            Derniers événements enregistrés
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {logs.map((log) => (
              <div
                key={log.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getLevelColor(log.level)}`}>
                      {getLevelIcon(log.level)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {log.action}
                        </p>
                        <Badge className={getLevelColor(log.level)}>
                          {log.level.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {log.details}
                      </p>
                      <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {log.user}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {log.module}
                        </span>
                        <span>IP: {log.ip}</span>
                        <span>{formatTimestamp(log.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
            <Button variant="outline" size="sm">
              Voir tous les logs
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Export Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Exports et rapports</CardTitle>
          <CardDescription>
            Configuration des exports de logs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="auto-export"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="auto-export" className="text-sm text-gray-700 dark:text-gray-300">
              Export automatique mensuel des logs
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Format d'export par défaut
            </label>
            <select className="w-full md:w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
              <option value="pdf">PDF</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}