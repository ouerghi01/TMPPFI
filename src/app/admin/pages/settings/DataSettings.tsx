import React, { useState } from 'react';
import { Database, Download, Upload, Trash2, Archive, Shield, AlertTriangle, CheckCircle, Clock, Save, HardDrive, RefreshCw } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Switch } from '../../../components/ui/switch';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { toast } from 'sonner';

interface Backup {
  id: string;
  name: string;
  date: string;
  size: string;
  type: 'automatic' | 'manual';
  status: 'completed' | 'in-progress' | 'failed';
}

export function DataSettings() {
  const [saved, setSaved] = useState(false);

  // Backup Settings State
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState('daily');
  const [backupRetention, setBackupRetention] = useState('30');
  const [backupLocation, setBackupLocation] = useState('cloud');

  // Data Management State
  const [autoArchive, setAutoArchive] = useState(true);
  const [archiveAfter, setArchiveAfter] = useState('365');
  const [autoDelete, setAutoDelete] = useState(false);
  const [deleteAfter, setDeleteAfter] = useState('730');

  // Privacy & GDPR State
  const [gdprCompliance, setGdprCompliance] = useState(true);
  const [anonymizeData, setAnonymizeData] = useState(true);
  const [dataExportEnabled, setDataExportEnabled] = useState(true);
  const [dataDeletionRequests, setDataDeletionRequests] = useState(true);

  const [backups] = useState<Backup[]>([
    {
      id: '1',
      name: 'Sauvegarde automatique',
      date: '2025-01-06T02:00:00',
      size: '2.8 GB',
      type: 'automatic',
      status: 'completed'
    },
    {
      id: '2',
      name: 'Sauvegarde manuelle - Avant migration',
      date: '2025-01-05T14:30:00',
      size: '2.7 GB',
      type: 'manual',
      status: 'completed'
    },
    {
      id: '3',
      name: 'Sauvegarde automatique',
      date: '2025-01-05T02:00:00',
      size: '2.6 GB',
      type: 'automatic',
      status: 'completed'
    }
  ]);

  const handleSave = () => {
    setSaved(true);
    toast.success('✓ Paramètres de données enregistrés avec succès');
    setTimeout(() => setSaved(false), 3000);
  };

  const handleManualBackup = () => {
    toast.success('🔄 Sauvegarde manuelle démarrée...');
  };

  const handleRestore = (backupId: string) => {
    toast.info(`Restauration de la sauvegarde ${backupId}...`);
  };

  const handleDownload = (backupId: string) => {
    toast.success(`Téléchargement de la sauvegarde ${backupId}...`);
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      failed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    };
    return colors[status] || colors.completed;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'failed':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      completed: 'Terminé',
      'in-progress': 'En cours',
      failed: 'Échec'
    };
    return labels[status] || status;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('fr-FR', {
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
            <Database className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Gestion des données
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Sauvegardes, archivage et conformité RGPD
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleManualBackup} variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Sauvegarder maintenant
          </Button>
          <Button onClick={handleSave} className="gap-2">
            {saved ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Enregistré
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Enregistrer
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Backup Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Archive className="w-5 h-5" />
            Configuration des sauvegardes
          </CardTitle>
          <CardDescription>
            Paramètres de sauvegarde automatique et rétention
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div>
              <Label className="text-base font-medium">Sauvegardes automatiques</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Créer des sauvegardes automatiques à intervalles réguliers
              </p>
            </div>
            <Switch
              checked={autoBackup}
              onCheckedChange={setAutoBackup}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fréquence de sauvegarde
              </Label>
              <Select
                value={backupFrequency}
                onValueChange={setBackupFrequency}
                disabled={!autoBackup}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Toutes les heures</SelectItem>
                  <SelectItem value="daily">Quotidienne</SelectItem>
                  <SelectItem value="weekly">Hebdomadaire</SelectItem>
                  <SelectItem value="monthly">Mensuelle</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rétention (jours)
              </Label>
              <Input
                type="number"
                value={backupRetention}
                onChange={(e) => setBackupRetention(e.target.value)}
                disabled={!autoBackup}
                min="1"
                max="365"
              />
            </div>
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Emplacement de stockage
            </Label>
            <Select
              value={backupLocation}
              onValueChange={setBackupLocation}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cloud">Cloud (recommandé)</SelectItem>
                <SelectItem value="local">Serveur local</SelectItem>
                <SelectItem value="both">Cloud + Local</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="w-5 h-5" />
            Gestion des données
          </CardTitle>
          <CardDescription>
            Archivage et suppression automatique des anciennes données
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div>
              <Label className="text-base font-medium">Archivage automatique</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Archiver les anciennes données pour optimiser les performances
              </p>
            </div>
            <Switch
              checked={autoArchive}
              onCheckedChange={setAutoArchive}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Archiver après (jours)
              </Label>
              <Input
                type="number"
                value={archiveAfter}
                onChange={(e) => setArchiveAfter(e.target.value)}
                disabled={!autoArchive}
                min="30"
                max="365"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-3 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div>
              <Label className="text-base font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                Suppression automatique
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Supprimer définitivement les données archivées (irréversible)
              </p>
            </div>
            <Switch
              checked={autoDelete}
              onCheckedChange={setAutoDelete}
            />
          </div>

          {autoDelete && (
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Supprimer après (jours)
              </Label>
              <Input
                type="number"
                value={deleteAfter}
                onChange={(e) => setDeleteAfter(e.target.value)}
                min="365"
                max="3650"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Privacy & GDPR */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Confidentialité et RGPD
          </CardTitle>
          <CardDescription>
            Conformité RGPD et gestion de la confidentialité
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div>
              <Label className="text-base font-medium">Mode conformité RGPD</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Activer les fonctionnalités de conformité RGPD
              </p>
            </div>
            <Switch
              checked={gdprCompliance}
              onCheckedChange={setGdprCompliance}
            />
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div>
              <Label className="text-base font-medium">Anonymisation des données</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Anonymiser les données personnelles archivées
              </p>
            </div>
            <Switch
              checked={anonymizeData}
              onCheckedChange={setAnonymizeData}
            />
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div>
              <Label className="text-base font-medium">Export des données personnelles</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Permettre aux utilisateurs d'exporter leurs données
              </p>
            </div>
            <Switch
              checked={dataExportEnabled}
              onCheckedChange={setDataExportEnabled}
            />
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div>
              <Label className="text-base font-medium">Demandes de suppression</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Permettre les demandes de suppression de données (droit à l'oubli)
              </p>
            </div>
            <Switch
              checked={dataDeletionRequests}
              onCheckedChange={setDataDeletionRequests}
            />
          </div>
        </CardContent>
      </Card>

      {/* Backup History */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des sauvegardes</CardTitle>
          <CardDescription>
            Liste des dernières sauvegardes effectuées
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {backups.map((backup) => (
              <div
                key={backup.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Archive className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {backup.name}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {backup.type === 'automatic' ? 'Auto' : 'Manuel'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(backup.date)} • {backup.size}
                    </p>
                  </div>
                  <Badge className={getStatusColor(backup.status)}>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(backup.status)}
                      {getStatusLabel(backup.status)}
                    </span>
                  </Badge>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(backup.id)}
                    className="gap-1"
                  >
                    <Download className="w-4 h-4" />
                    Télécharger
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRestore(backup.id)}
                    className="gap-1"
                  >
                    <Upload className="w-4 h-4" />
                    Restaurer
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
