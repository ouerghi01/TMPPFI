import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion } from 'motion/react';
import { 
  Layers, 
  Vote, 
  MessageSquare, 
  FileText, 
  Users as UsersIcon, 
  Calendar,
  Eye,
  Settings,
  ToggleLeft,
  ToggleRight,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  CheckCircle2,
  XCircle,
  BarChart3,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Switch } from '../../components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { toast } from 'sonner';

interface Module {
  id: string;
  name: string;
  type: 'votes' | 'debates' | 'petitions' | 'assemblies' | 'conferences';
  icon: any;
  count: number;
  activeProcesses: number;
  totalParticipants: number;
  status: 'enabled' | 'disabled';
  description: string;
  organizations: string[];
}

export function ModulesPage() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [modules, setModules] = useState<Module[]>([
    { 
      id: '1',
      name: language === 'fr' ? 'Votes' : language === 'de' ? 'Abstimmungen' : 'Votes', 
      type: 'votes',
      count: 156, 
      activeProcesses: 24,
      totalParticipants: 8450,
      status: 'enabled',
      icon: Vote,
      description: language === 'fr' 
        ? 'Module de votes électroniques sécurisés avec différents modes de scrutin'
        : language === 'de'
        ? 'Modul für sichere elektronische Abstimmungen mit verschiedenen Wahlmodi'
        : 'Secure electronic voting module with various ballot types',
      organizations: ['Ville de Bruxelles', 'Région Wallonne', 'Canton de Genève']
    },
    { 
      id: '2',
      name: language === 'fr' ? 'Débats' : language === 'de' ? 'Debatten' : 'Debates', 
      type: 'debates',
      count: 243, 
      activeProcesses: 56,
      totalParticipants: 12340,
      status: 'enabled',
      icon: MessageSquare,
      description: language === 'fr' 
        ? 'Espaces de discussion structurés avec modération et synthèse'
        : language === 'de'
        ? 'Strukturierte Diskussionsräume mit Moderation und Zusammenfassung'
        : 'Structured discussion spaces with moderation and synthesis',
      organizations: ['Ville de Bruxelles', 'Commune d\'Ixelles', 'Région Wallonne']
    },
    { 
      id: '3',
      name: language === 'fr' ? 'Pétitions' : language === 'de' ? 'Petitionen' : 'Petitions', 
      type: 'petitions',
      count: 89, 
      activeProcesses: 18,
      totalParticipants: 15620,
      status: 'enabled',
      icon: FileText,
      description: language === 'fr' 
        ? 'Création et suivi de pétitions citoyennes avec vérification de signatures'
        : language === 'de'
        ? 'Erstellung und Verfolgung von Bürgerpetitionen mit Signaturprüfung'
        : 'Citizen petition creation and tracking with signature verification',
      organizations: ['Région Wallonne', 'Canton de Genève']
    },
    { 
      id: '4',
      name: language === 'fr' ? 'Assemblées' : language === 'de' ? 'Versammlungen' : 'Assemblies', 
      type: 'assemblies',
      count: 45, 
      activeProcesses: 12,
      totalParticipants: 3200,
      status: 'enabled',
      icon: UsersIcon,
      description: language === 'fr' 
        ? 'Assemblées citoyennes délibératives avec tirage au sort'
        : language === 'de'
        ? 'Deliberative Bürgerversammlungen mit Losverfahren'
        : 'Deliberative citizen assemblies with random selection',
      organizations: ['Ville de Bruxelles', 'Région Wallonne']
    },
    { 
      id: '5',
      name: language === 'fr' ? 'Conférences' : language === 'de' ? 'Konferenzen' : 'Conferences', 
      type: 'conferences',
      count: 32, 
      activeProcesses: 8,
      totalParticipants: 5670,
      status: 'disabled',
      icon: Calendar,
      description: language === 'fr' 
        ? 'Organisation d\'événements publics avec inscription et suivi'
        : language === 'de'
        ? 'Organisation öffentlicher Veranstaltungen mit Anmeldung und Nachverfolgung'
        : 'Public event organization with registration and tracking',
      organizations: ['Canton de Genève']
    }
  ]);

  const handleToggleStatus = (module: Module) => {
    const newStatus = module.status === 'enabled' ? 'disabled' : 'enabled';
    
    setModules(prev => prev.map(m => 
      m.id === module.id ? { ...m, status: newStatus } : m
    ));

    toast.success(
      language === 'fr' 
        ? `Module ${newStatus === 'enabled' ? 'activé' : 'désactivé'} avec succès` 
        : language === 'de' 
        ? `Modul erfolgreich ${newStatus === 'enabled' ? 'aktiviert' : 'deaktiviert'}` 
        : `Module ${newStatus === 'enabled' ? 'enabled' : 'disabled'} successfully`
    );
  };

  const handleViewModule = (module: Module) => {
    setSelectedModule(module);
    setViewDialogOpen(true);
  };

  const handleConfigureModule = (module: Module) => {
    setSelectedModule(module);
    setConfigDialogOpen(true);
  };

  const handleSaveConfig = () => {
    toast.success(
      language === 'fr' 
        ? 'Configuration sauvegardée avec succès' 
        : language === 'de' 
        ? 'Konfiguration erfolgreich gespeichert' 
        : 'Configuration saved successfully'
    );
    setConfigDialogOpen(false);
  };

  const handleExport = () => {
    toast.success(
      language === 'fr' 
        ? 'Export en cours...' 
        : language === 'de' 
        ? 'Export läuft...' 
        : 'Exporting...'
    );
  };

  const filteredModules = modules.filter(module => {
    const matchesSearch = module.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || module.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalActiveProcesses = modules.reduce((acc, m) => acc + m.activeProcesses, 0);
  const totalParticipants = modules.reduce((acc, m) => acc + m.totalParticipants, 0);
  const enabledModules = modules.filter(m => m.status === 'enabled').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500 bg-clip-text text-transparent">
              {language === 'fr' ? 'Modules Participatifs' : language === 'de' ? 'Partizipative Module' : 'Participatory Modules'}
            </h1>
            <p className="text-gray-600 mt-2">
              {language === 'fr' ? 'Gestion et configuration des modules de participation' : language === 'de' ? 'Verwaltung und Konfiguration der Partizipationsmodule' : 'Management and configuration of participation modules'}
            </p>
          </div>
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Exporter' : language === 'de' ? 'Exportieren' : 'Export'}
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            title: language === 'fr' ? 'Total modules' : language === 'de' ? 'Gesamtmodule' : 'Total Modules',
            value: modules.length,
            icon: Layers,
            color: 'blue'
          },
          {
            title: language === 'fr' ? 'Modules actifs' : language === 'de' ? 'Aktive Module' : 'Active Modules',
            value: enabledModules,
            icon: CheckCircle2,
            color: 'emerald'
          },
          {
            title: language === 'fr' ? 'Processus en cours' : language === 'de' ? 'Laufende Prozesse' : 'Active Processes',
            value: totalActiveProcesses,
            icon: TrendingUp,
            color: 'purple'
          },
          {
            title: language === 'fr' ? 'Participants totaux' : language === 'de' ? 'Gesamtteilnehmer' : 'Total Participants',
            value: totalParticipants.toLocaleString(),
            icon: UsersIcon,
            color: 'amber'
          }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </CardTitle>
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold bg-gradient-to-r from-${stat.color}-600 to-${stat.color}-500 bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder={language === 'fr' ? 'Rechercher un module...' : language === 'de' ? 'Modul suchen...' : 'Search module...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === 'fr' ? 'Tous les statuts' : language === 'de' ? 'Alle Status' : 'All statuses'}</SelectItem>
                  <SelectItem value="enabled">{language === 'fr' ? 'Activés' : language === 'de' ? 'Aktiviert' : 'Enabled'}</SelectItem>
                  <SelectItem value="disabled">{language === 'fr' ? 'Désactivés' : language === 'de' ? 'Deaktiviert' : 'Disabled'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Modules Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredModules.map((module, index) => {
          const Icon = module.icon;
          return (
            <motion.div 
              key={module.id} 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{module.name}</CardTitle>
                        <p className="text-sm text-gray-600">{module.count} {language === 'fr' ? 'total' : language === 'de' ? 'gesamt' : 'total'}</p>
                      </div>
                    </div>
                    <Badge 
                      className={module.status === 'enabled' 
                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100/50' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200/50'}
                    >
                      {module.status === 'enabled' 
                        ? (language === 'fr' ? 'Actif' : language === 'de' ? 'Aktiv' : 'Active')
                        : (language === 'fr' ? 'Inactif' : language === 'de' ? 'Inaktiv' : 'Inactive')
                      }
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 line-clamp-2">{module.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                    <div>
                      <p className="text-xs text-gray-500">{language === 'fr' ? 'Processus actifs' : language === 'de' ? 'Aktive Prozesse' : 'Active Processes'}</p>
                      <p className="text-lg font-bold text-gray-900">{module.activeProcesses}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{language === 'fr' ? 'Participants' : language === 'de' ? 'Teilnehmer' : 'Participants'}</p>
                      <p className="text-lg font-bold text-gray-900">{module.totalParticipants.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleViewModule(module)}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      {language === 'fr' ? 'Détails' : language === 'de' ? 'Details' : 'Details'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleConfigureModule(module)}
                    >
                      <Settings className="w-3 h-3 mr-1" />
                      {language === 'fr' ? 'Config' : language === 'de' ? 'Konfig' : 'Config'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleToggleStatus(module)}
                    >
                      {module.status === 'enabled' ? (
                        <ToggleRight className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <ToggleLeft className="w-4 h-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Module Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedModule && (
                <>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <selectedModule.icon className="w-6 h-6 text-white" />
                  </div>
                  {selectedModule.name}
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {language === 'fr' ? 'Détails et statistiques du module' : language === 'de' ? 'Modul-Details und Statistiken' : 'Module details and statistics'}
            </DialogDescription>
          </DialogHeader>
          {selectedModule && (
            <div className="space-y-6 py-4">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">
                  {language === 'fr' ? 'Description' : language === 'de' ? 'Beschreibung' : 'Description'}
                </p>
                <p className="text-sm text-gray-900">{selectedModule.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-2xl font-bold text-gray-900">{selectedModule.count}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {language === 'fr' ? 'Total créés' : language === 'de' ? 'Gesamt erstellt' : 'Total created'}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-2xl font-bold text-gray-900">{selectedModule.activeProcesses}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {language === 'fr' ? 'En cours' : language === 'de' ? 'Aktiv' : 'Active'}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-2xl font-bold text-gray-900">{selectedModule.totalParticipants.toLocaleString()}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {language === 'fr' ? 'Participants' : language === 'de' ? 'Teilnehmer' : 'Participants'}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">
                  {language === 'fr' ? 'Organisations utilisant ce module' : language === 'de' ? 'Organisationen, die dieses Modul verwenden' : 'Organizations using this module'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedModule.organizations.map(org => (
                    <Badge key={org} variant="outline">{org}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">
                    {language === 'fr' ? 'Statut du module' : language === 'de' ? 'Modulstatus' : 'Module Status'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedModule.status === 'enabled'
                      ? (language === 'fr' ? 'Le module est actuellement actif' : language === 'de' ? 'Das Modul ist derzeit aktiv' : 'Module is currently active')
                      : (language === 'fr' ? 'Le module est actuellement désactivé' : language === 'de' ? 'Das Modul ist derzeit deaktiviert' : 'Module is currently disabled')
                    }
                  </p>
                </div>
                <Switch
                  checked={selectedModule.status === 'enabled'}
                  onCheckedChange={() => handleToggleStatus(selectedModule)}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              {language === 'fr' ? 'Fermer' : language === 'de' ? 'Schließen' : 'Close'}
            </Button>
            <Button onClick={() => {
              setViewDialogOpen(false);
              if (selectedModule) handleConfigureModule(selectedModule);
            }}>
              <Settings className="w-4 h-4 mr-2" />
              {language === 'fr' ? 'Configurer' : language === 'de' ? 'Konfigurieren' : 'Configure'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Module Configuration Dialog */}
      <Dialog open={configDialogOpen} onOpenChange={setConfigDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {language === 'fr' ? 'Configuration du module' : language === 'de' ? 'Modulkonfiguration' : 'Module Configuration'}
            </DialogTitle>
            <DialogDescription>
              {selectedModule && `${language === 'fr' ? 'Paramétrer' : language === 'de' ? 'Konfigurieren' : 'Configure'} ${selectedModule.name}`}
            </DialogDescription>
          </DialogHeader>
          {selectedModule && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="config-status">
                  {language === 'fr' ? 'Statut' : language === 'de' ? 'Status' : 'Status'}
                </Label>
                <Select value={selectedModule.status} onValueChange={(value: 'enabled' | 'disabled') => 
                  setSelectedModule({ ...selectedModule, status: value })
                }>
                  <SelectTrigger id="config-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="enabled">{language === 'fr' ? 'Activé' : language === 'de' ? 'Aktiviert' : 'Enabled'}</SelectItem>
                    <SelectItem value="disabled">{language === 'fr' ? 'Désactivé' : language === 'de' ? 'Deaktiviert' : 'Disabled'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="config-desc">
                  {language === 'fr' ? 'Description' : language === 'de' ? 'Beschreibung' : 'Description'}
                </Label>
                <Input
                  id="config-desc"
                  value={selectedModule.description}
                  onChange={(e) => setSelectedModule({ ...selectedModule, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>
                  {language === 'fr' ? 'Paramètres avancés' : language === 'de' ? 'Erweiterte Einstellungen' : 'Advanced Settings'}
                </Label>
                <div className="space-y-3 border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{language === 'fr' ? 'Modération automatique' : language === 'de' ? 'Automatische Moderation' : 'Auto-moderation'}</p>
                      <p className="text-xs text-gray-600">{language === 'fr' ? 'Activer la modération automatique des contenus' : language === 'de' ? 'Automatische Inhaltsmoderation aktivieren' : 'Enable automatic content moderation'}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{language === 'fr' ? 'Notifications' : language === 'de' ? 'Benachrichtigungen' : 'Notifications'}</p>
                      <p className="text-xs text-gray-600">{language === 'fr' ? 'Envoyer des notifications aux participants' : language === 'de' ? 'Benachrichtigungen an Teilnehmer senden' : 'Send notifications to participants'}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{language === 'fr' ? 'Statistiques publiques' : language === 'de' ? 'Öffentliche Statistiken' : 'Public statistics'}</p>
                      <p className="text-xs text-gray-600">{language === 'fr' ? 'Afficher les statistiques publiquement' : language === 'de' ? 'Statistiken öffentlich anzeigen' : 'Display statistics publicly'}</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfigDialogOpen(false)}>
              {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
            </Button>
            <Button onClick={handleSaveConfig}>
              {language === 'fr' ? 'Enregistrer' : language === 'de' ? 'Speichern' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}