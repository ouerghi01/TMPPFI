import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion } from 'motion/react';
import { Activity, Bell, Search, Filter, Download, Edit, Trash2, Plus, Eye, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Switch } from '../../components/ui/switch';
import { toast } from 'sonner';

interface AuditLog {
  id: string;
  user: string;
  action: string;
  entity: string;
  organization: string;
  date: string;
  type: 'create' | 'update' | 'publish' | 'moderate' | 'delete';
}

interface NotificationTemplate {
  id: string;
  type: 'email' | 'sms' | 'push';
  name: string;
  subject?: string;
  content: string;
  status: 'active' | 'inactive';
  variables: string[];
}

export function AuditPage() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [createTemplateDialogOpen, setCreateTemplateDialogOpen] = useState(false);
  const [editTemplateDialogOpen, setEditTemplateDialogOpen] = useState(false);
  const [deleteTemplateDialogOpen, setDeleteTemplateDialogOpen] = useState(false);
  const [testTemplateDialogOpen, setTestTemplateDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(null);
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('7days');

  const [newTemplate, setNewTemplate] = useState({
    type: 'email' as 'email' | 'sms' | 'push',
    name: '',
    subject: '',
    content: '',
    variables: [] as string[]
  });

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: '1',
      user: 'Jean Dupont',
      action: language === 'fr' ? 'Processus créé' : language === 'de' ? 'Prozess erstellt' : 'Process created',
      entity: 'Process #123',
      organization: 'Ville de Bruxelles',
      date: '2025-01-08 14:32',
      type: 'create'
    },
    {
      id: '2',
      user: 'Marie Martin',
      action: language === 'fr' ? 'Utilisateur modifié' : language === 'de' ? 'Benutzer bearbeitet' : 'User edited',
      entity: 'User #456',
      organization: 'Commune d\'Ixelles',
      date: '2025-01-08 13:15',
      type: 'update'
    },
    {
      id: '3',
      user: 'Pierre Dubois',
      action: language === 'fr' ? 'Vote publié' : language === 'de' ? 'Abstimmung veröffentlicht' : 'Vote published',
      entity: 'Vote #789',
      organization: 'Région Wallonne',
      date: '2025-01-08 11:47',
      type: 'publish'
    },
    {
      id: '4',
      user: 'Sophie Laurent',
      action: language === 'fr' ? 'Contenu modéré' : language === 'de' ? 'Inhalt moderiert' : 'Content moderated',
      entity: 'Comment #321',
      organization: 'Canton de Genève',
      date: '2025-01-08 10:22',
      type: 'moderate'
    },
    {
      id: '5',
      user: 'Admin System',
      action: language === 'fr' ? 'Organisation supprimée' : language === 'de' ? 'Organisation gelöscht' : 'Organization deleted',
      entity: 'Org #555',
      organization: 'System',
      date: '2025-01-07 18:45',
      type: 'delete'
    }
  ]);

  const [notifications, setNotifications] = useState<NotificationTemplate[]>([
    {
      id: '1',
      type: 'email',
      name: language === 'fr' ? 'Bienvenue' : language === 'de' ? 'Willkommen' : 'Welcome',
      subject: language === 'fr' ? 'Bienvenue sur CiviAgora' : language === 'de' ? 'Willkommen bei CiviAgora' : 'Welcome to CiviAgora',
      content: language === 'fr' 
        ? 'Bonjour {user_name},\n\nBienvenue sur la plateforme CiviAgora de {organization_name}.\n\nCordialement,\nL\'équipe CiviAgora'
        : language === 'de'
        ? 'Hallo {user_name},\n\nWillkommen auf der CiviAgora-Plattform von {organization_name}.\n\nMit freundlichen Grüßen,\nDas CiviAgora-Team'
        : 'Hello {user_name},\n\nWelcome to the CiviAgora platform of {organization_name}.\n\nBest regards,\nThe CiviAgora Team',
      status: 'active',
      variables: ['user_name', 'organization_name']
    },
    {
      id: '2',
      type: 'email',
      name: language === 'fr' ? 'Nouveau vote' : language === 'de' ? 'Neue Abstimmung' : 'New vote',
      subject: language === 'fr' ? 'Nouveau vote disponible' : language === 'de' ? 'Neue Abstimmung verfügbar' : 'New vote available',
      content: language === 'fr'
        ? 'Bonjour {user_name},\n\nUn nouveau vote "{vote_title}" est maintenant ouvert.\nDate limite: {deadline}\n\nParticipez maintenant!'
        : language === 'de'
        ? 'Hallo {user_name},\n\nEine neue Abstimmung "{vote_title}" ist jetzt geöffnet.\nFrist: {deadline}\n\nJetzt teilnehmen!'
        : 'Hello {user_name},\n\nA new vote "{vote_title}" is now open.\nDeadline: {deadline}\n\nParticipate now!',
      status: 'active',
      variables: ['user_name', 'vote_title', 'deadline']
    },
    {
      id: '3',
      type: 'sms',
      name: language === 'fr' ? 'Rappel échéance' : language === 'de' ? 'Fälligkeitserinnerung' : 'Deadline reminder',
      content: language === 'fr'
        ? 'Rappel: le vote "{vote_title}" se termine dans {hours_left} heures. Participez sur civiagora.com'
        : language === 'de'
        ? 'Erinnerung: Die Abstimmung "{vote_title}" endet in {hours_left} Stunden. Auf civiagora.com teilnehmen'
        : 'Reminder: vote "{vote_title}" ends in {hours_left} hours. Participate at civiagora.com',
      status: 'inactive',
      variables: ['vote_title', 'hours_left']
    },
    {
      id: '4',
      type: 'push',
      name: language === 'fr' ? 'Nouveau débat' : language === 'de' ? 'Neue Debatte' : 'New debate',
      content: language === 'fr'
        ? 'Nouveau débat: {debate_title}. Rejoignez la conversation!'
        : language === 'de'
        ? 'Neue Debatte: {debate_title}. Nehmen Sie am Gespräch teil!'
        : 'New debate: {debate_title}. Join the conversation!',
      status: 'active',
      variables: ['debate_title']
    }
  ]);

  const availableVariables = [
    'user_name',
    'organization_name',
    'vote_title',
    'debate_title',
    'petition_title',
    'deadline',
    'hours_left',
    'process_name'
  ];

  const getActionBadge = (type: string) => {
    const colors = {
      create: 'bg-emerald-100 text-emerald-700',
      update: 'bg-blue-100 text-blue-700',
      publish: 'bg-purple-100 text-purple-700',
      moderate: 'bg-amber-100 text-amber-700',
      delete: 'bg-red-100 text-red-700'
    };
    return colors[type as keyof typeof colors] || colors.update;
  };

  const handleCreateTemplate = () => {
    const template: NotificationTemplate = {
      id: String(notifications.length + 1),
      type: newTemplate.type,
      name: newTemplate.name,
      subject: newTemplate.type === 'email' ? newTemplate.subject : undefined,
      content: newTemplate.content,
      status: 'active',
      variables: newTemplate.variables
    };

    setNotifications([...notifications, template]);
    setNewTemplate({ type: 'email', name: '', subject: '', content: '', variables: [] });
    setCreateTemplateDialogOpen(false);

    toast.success(
      language === 'fr' 
        ? 'Template créé avec succès' 
        : language === 'de' 
        ? 'Vorlage erfolgreich erstellt' 
        : 'Template created successfully'
    );
  };

  const handleEditTemplate = (template: NotificationTemplate) => {
    setSelectedTemplate(template);
    setEditTemplateDialogOpen(true);
  };

  const handleUpdateTemplate = () => {
    if (!selectedTemplate) return;
    
    setNotifications(prev => prev.map(n => 
      n.id === selectedTemplate.id ? selectedTemplate : n
    ));

    toast.success(
      language === 'fr' 
        ? 'Template modifié avec succès' 
        : language === 'de' 
        ? 'Vorlage erfolgreich bearbeitet' 
        : 'Template updated successfully'
    );
    setEditTemplateDialogOpen(false);
  };

  const handleDeleteTemplate = (template: NotificationTemplate) => {
    setSelectedTemplate(template);
    setDeleteTemplateDialogOpen(true);
  };

  const confirmDeleteTemplate = () => {
    if (!selectedTemplate) return;
    
    setNotifications(prev => prev.filter(n => n.id !== selectedTemplate.id));

    toast.success(
      language === 'fr' 
        ? 'Template supprimé avec succès' 
        : language === 'de' 
        ? 'Vorlage erfolgreich gelöscht' 
        : 'Template deleted successfully'
    );
    setDeleteTemplateDialogOpen(false);
  };

  const handleTestTemplate = (template: NotificationTemplate) => {
    setSelectedTemplate(template);
    setTestTemplateDialogOpen(true);
  };

  const handleSendTest = () => {
    toast.success(
      language === 'fr' 
        ? 'Email de test envoyé' 
        : language === 'de' 
        ? 'Test-E-Mail gesendet' 
        : 'Test email sent'
    );
    setTestTemplateDialogOpen(false);
  };

  const handleToggleTemplateStatus = (template: NotificationTemplate) => {
    const newStatus = template.status === 'active' ? 'inactive' : 'active';
    setNotifications(prev => prev.map(n => 
      n.id === template.id ? { ...n, status: newStatus } : n
    ));

    toast.success(
      language === 'fr' 
        ? `Template ${newStatus === 'active' ? 'activé' : 'désactivé'} avec succès` 
        : language === 'de' 
        ? `Vorlage erfolgreich ${newStatus === 'active' ? 'aktiviert' : 'deaktiviert'}` 
        : `Template ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`
    );
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

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.entity.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = actionFilter === 'all' || log.type === actionFilter;
    return matchesSearch && matchesAction;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500 bg-clip-text text-transparent">
          {language === 'fr' ? 'Audit & Notifications' : language === 'de' ? 'Audit & Benachrichtigungen' : 'Audit & Notifications'}
        </h1>
        <p className="text-gray-600 mt-2">
          {language === 'fr' ? 'Logs d\'audit et gestion des notifications' : language === 'de' ? 'Audit-Logs und Benachrichtigungsverwaltung' : 'Audit logs and notification management'}
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            title: language === 'fr' ? 'Logs aujourd\'hui' : language === 'de' ? 'Logs heute' : 'Logs today',
            value: '248',
            color: 'blue'
          },
          {
            title: language === 'fr' ? 'Templates actifs' : language === 'de' ? 'Aktive Vorlagen' : 'Active templates',
            value: notifications.filter(n => n.status === 'active').length,
            color: 'emerald'
          },
          {
            title: language === 'fr' ? 'Emails envoyés' : language === 'de' ? 'Gesendete E-Mails' : 'Emails sent',
            value: '1,234',
            color: 'purple'
          },
          {
            title: language === 'fr' ? 'Taux ouverture' : language === 'de' ? 'Öffnungsrate' : 'Open rate',
            value: '68%',
            color: 'amber'
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold bg-gradient-to-r from-${stat.color}-600 to-${stat.color}-500 bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="audit" className="space-y-6">
        <TabsList>
          <TabsTrigger value="audit">
            <Activity className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Logs d\'audit' : language === 'de' ? 'Audit-Logs' : 'Audit Logs'}
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Notifications' : language === 'de' ? 'Benachrichtigungen' : 'Notifications'}
          </TabsTrigger>
        </TabsList>

        {/* Audit Logs Tab */}
        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 flex items-center gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder={language === 'fr' ? 'Rechercher dans les logs...' : language === 'de' ? 'In Logs suchen...' : 'Search logs...'}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        {language === 'fr' ? 'Filtres' : language === 'de' ? 'Filter' : 'Filters'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent aria-describedby={undefined}>
                      <DialogHeader>
                        <DialogTitle>
                          {language === 'fr' ? 'Filtrer les logs' : language === 'de' ? 'Logs filtern' : 'Filter Logs'}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>{language === 'fr' ? 'Type d\'action' : language === 'de' ? 'Aktionstyp' : 'Action Type'}</Label>
                          <Select value={actionFilter} onValueChange={setActionFilter}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">{language === 'fr' ? 'Toutes' : language === 'de' ? 'Alle' : 'All'}</SelectItem>
                              <SelectItem value="create">{language === 'fr' ? 'Créations' : language === 'de' ? 'Erstellungen' : 'Creations'}</SelectItem>
                              <SelectItem value="update">{language === 'fr' ? 'Modifications' : language === 'de' ? 'Änderungen' : 'Updates'}</SelectItem>
                              <SelectItem value="publish">{language === 'fr' ? 'Publications' : language === 'de' ? 'Veröffentlichungen' : 'Publications'}</SelectItem>
                              <SelectItem value="moderate">{language === 'fr' ? 'Modérations' : language === 'de' ? 'Moderationen' : 'Moderations'}</SelectItem>
                              <SelectItem value="delete">{language === 'fr' ? 'Suppressions' : language === 'de' ? 'Löschungen' : 'Deletions'}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>{language === 'fr' ? 'Période' : language === 'de' ? 'Zeitraum' : 'Period'}</Label>
                          <Select value={dateFilter} onValueChange={setDateFilter}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="today">{language === 'fr' ? 'Aujourd\'hui' : language === 'de' ? 'Heute' : 'Today'}</SelectItem>
                              <SelectItem value="7days">{language === 'fr' ? '7 derniers jours' : language === 'de' ? 'Letzte 7 Tage' : 'Last 7 days'}</SelectItem>
                              <SelectItem value="30days">{language === 'fr' ? '30 derniers jours' : language === 'de' ? 'Letzte 30 Tage' : 'Last 30 days'}</SelectItem>
                              <SelectItem value="all">{language === 'fr' ? 'Tout' : language === 'de' ? 'Alles' : 'All time'}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => {
                          setActionFilter('all');
                          setDateFilter('7days');
                          setFilterDialogOpen(false);
                        }}>
                          {language === 'fr' ? 'Réinitialiser' : language === 'de' ? 'Zurücksetzen' : 'Reset'}
                        </Button>
                        <Button onClick={() => setFilterDialogOpen(false)}>
                          {language === 'fr' ? 'Appliquer' : language === 'de' ? 'Anwenden' : 'Apply'}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="w-4 h-4 mr-2" />
                  {language === 'fr' ? 'Exporter' : language === 'de' ? 'Exportieren' : 'Export'}
                </Button>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === 'fr' ? 'Historique des actions' : language === 'de' ? 'Aktionsverlauf' : 'Action History'}</CardTitle>
              <CardDescription>
                {filteredLogs.length} {language === 'fr' ? 'entrées trouvées' : language === 'de' ? 'Einträge gefunden' : 'entries found'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{language === 'fr' ? 'Utilisateur' : language === 'de' ? 'Benutzer' : 'User'}</TableHead>
                    <TableHead>{language === 'fr' ? 'Action' : language === 'de' ? 'Aktion' : 'Action'}</TableHead>
                    <TableHead>{language === 'fr' ? 'Entité' : language === 'de' ? 'Entität' : 'Entity'}</TableHead>
                    <TableHead>{language === 'fr' ? 'Organisation' : language === 'de' ? 'Organisation' : 'Organization'}</TableHead>
                    <TableHead>{language === 'fr' ? 'Date' : language === 'de' ? 'Datum' : 'Date'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log, index) => (
                    <motion.tr
                      key={log.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <TableCell className="font-medium">{log.user}</TableCell>
                      <TableCell>
                        <Badge className={getActionBadge(log.type)}>{log.action}</Badge>
                      </TableCell>
                      <TableCell><code className="text-sm bg-gray-100 px-2 py-1 rounded">{log.entity}</code></TableCell>
                      <TableCell>{log.organization}</TableCell>
                      <TableCell className="text-sm text-gray-600">{log.date}</TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {language === 'fr' ? 'Gérez les templates de notifications' : language === 'de' ? 'Verwalten Sie Benachrichtigungsvorlagen' : 'Manage notification templates'}
            </p>
            <Dialog open={createTemplateDialogOpen} onOpenChange={setCreateTemplateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  {language === 'fr' ? 'Nouveau template' : language === 'de' ? 'Neue Vorlage' : 'New Template'}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {language === 'fr' ? 'Créer un template' : language === 'de' ? 'Vorlage erstellen' : 'Create Template'}
                  </DialogTitle>
                  <DialogDescription>
                    {language === 'fr' ? 'Créez un nouveau template de notification' : language === 'de' ? 'Erstellen Sie eine neue Benachrichtigungsvorlage' : 'Create a new notification template'}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-template-name">
                        {language === 'fr' ? 'Nom' : language === 'de' ? 'Name' : 'Name'}
                      </Label>
                      <Input
                        id="new-template-name"
                        value={newTemplate.name}
                        onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                        placeholder={language === 'fr' ? 'Ex: Rappel de participation' : language === 'de' ? 'Z.B.: Teilnahmeerinnerung' : 'e.g. Participation reminder'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-template-type">
                        {language === 'fr' ? 'Type' : language === 'de' ? 'Typ' : 'Type'}
                      </Label>
                      <Select value={newTemplate.type} onValueChange={(value: 'email' | 'sms' | 'push') => setNewTemplate({ ...newTemplate, type: value })}>
                        <SelectTrigger id="new-template-type">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="sms">SMS</SelectItem>
                          <SelectItem value="push">Push</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {newTemplate.type === 'email' && (
                    <div className="space-y-2">
                      <Label htmlFor="new-template-subject">
                        {language === 'fr' ? 'Sujet' : language === 'de' ? 'Betreff' : 'Subject'}
                      </Label>
                      <Input
                        id="new-template-subject"
                        value={newTemplate.subject}
                        onChange={(e) => setNewTemplate({ ...newTemplate, subject: e.target.value })}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="new-template-content">
                      {language === 'fr' ? 'Contenu' : language === 'de' ? 'Inhalt' : 'Content'}
                    </Label>
                    <Textarea
                      id="new-template-content"
                      value={newTemplate.content}
                      onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                      rows={6}
                      placeholder={language === 'fr' ? 'Utilisez {variable} pour les variables dynamiques' : language === 'de' ? 'Verwenden Sie {variable} für dynamische Variablen' : 'Use {variable} for dynamic variables'}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>
                      {language === 'fr' ? 'Variables disponibles' : language === 'de' ? 'Verfügbare Variablen' : 'Available variables'}
                    </Label>
                    <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg">
                      {availableVariables.map(variable => (
                        <Badge key={variable} variant="outline" className="cursor-pointer hover:bg-gray-200" onClick={() => {
                          setNewTemplate(prev => ({
                            ...prev,
                            content: prev.content + `{${variable}}`
                          }));
                        }}>
                          {'{' + variable + '}'}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setCreateTemplateDialogOpen(false)}>
                    {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
                  </Button>
                  <Button onClick={handleCreateTemplate} disabled={!newTemplate.name || !newTemplate.content}>
                    {language === 'fr' ? 'Créer' : language === 'de' ? 'Erstellen' : 'Create'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notifications.map((notif, index) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="group hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {notif.type === 'email' && <Bell className="w-4 h-4 text-blue-600" />}
                          {notif.type === 'sms' && <Send className="w-4 h-4 text-purple-600" />}
                          {notif.type === 'push' && <Activity className="w-4 h-4 text-emerald-600" />}
                          {notif.name}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">Type: {notif.type.toUpperCase()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={notif.status === 'active'}
                          onCheckedChange={() => handleToggleTemplateStatus(notif)}
                        />
                        <Badge className={notif.status === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-gray-50 text-gray-600 border border-gray-200'}>
                          {notif.status === 'active' 
                            ? (language === 'fr' ? 'Actif' : language === 'de' ? 'Aktiv' : 'Active')
                            : (language === 'fr' ? 'Inactif' : language === 'de' ? 'Inaktiv' : 'Inactive')
                          }
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">{notif.content}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {notif.variables.map(variable => (
                        <Badge key={variable} variant="outline" className="text-xs">
                          {'{' + variable + '}'}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleEditTemplate(notif)}
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        {language === 'fr' ? 'Modifier' : language === 'de' ? 'Bearbeiten' : 'Edit'}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleTestTemplate(notif)}
                      >
                        <Send className="w-3 h-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteTemplate(notif)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Template Dialog */}
      <Dialog open={editTemplateDialogOpen} onOpenChange={setEditTemplateDialogOpen}>
        <DialogContent className="max-w-2xl" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>
              {language === 'fr' ? 'Modifier le template' : language === 'de' ? 'Vorlage bearbeiten' : 'Edit Template'}
            </DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-template-name">
                  {language === 'fr' ? 'Nom' : language === 'de' ? 'Name' : 'Name'}
                </Label>
                <Input
                  id="edit-template-name"
                  value={selectedTemplate.name}
                  onChange={(e) => setSelectedTemplate({ ...selectedTemplate, name: e.target.value })}
                />
              </div>

              {selectedTemplate.type === 'email' && selectedTemplate.subject !== undefined && (
                <div className="space-y-2">
                  <Label htmlFor="edit-template-subject">
                    {language === 'fr' ? 'Sujet' : language === 'de' ? 'Betreff' : 'Subject'}
                  </Label>
                  <Input
                    id="edit-template-subject"
                    value={selectedTemplate.subject}
                    onChange={(e) => setSelectedTemplate({ ...selectedTemplate, subject: e.target.value })}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="edit-template-content">
                  {language === 'fr' ? 'Contenu' : language === 'de' ? 'Inhalt' : 'Content'}
                </Label>
                <Textarea
                  id="edit-template-content"
                  value={selectedTemplate.content}
                  onChange={(e) => setSelectedTemplate({ ...selectedTemplate, content: e.target.value })}
                  rows={6}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditTemplateDialogOpen(false)}>
              {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
            </Button>
            <Button onClick={handleUpdateTemplate}>
              {language === 'fr' ? 'Enregistrer' : language === 'de' ? 'Speichern' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Test Template Dialog */}
      <Dialog open={testTemplateDialogOpen} onOpenChange={setTestTemplateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {language === 'fr' ? 'Envoyer un test' : language === 'de' ? 'Test senden' : 'Send Test'}
            </DialogTitle>
            <DialogDescription>
              {language === 'fr' ? 'Envoyez un email de test' : language === 'de' ? 'Senden Sie eine Test-E-Mail' : 'Send a test email'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="test-email">
                {language === 'fr' ? 'Email de destination' : language === 'de' ? 'Ziel-E-Mail' : 'Destination email'}
              </Label>
              <Input
                id="test-email"
                type="email"
                placeholder="test@example.com"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTestTemplateDialogOpen(false)}>
              {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
            </Button>
            <Button onClick={handleSendTest}>
              <Send className="w-4 h-4 mr-2" />
              {language === 'fr' ? 'Envoyer' : language === 'de' ? 'Senden' : 'Send'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Template Confirmation */}
      <AlertDialog open={deleteTemplateDialogOpen} onOpenChange={setDeleteTemplateDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {language === 'fr' ? 'Confirmer la suppression' : language === 'de' ? 'Löschen bestätigen' : 'Confirm Deletion'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === 'fr' 
                ? `Êtes-vous sûr de vouloir supprimer le template "${selectedTemplate?.name}" ? Cette action est irréversible.`
                : language === 'de'
                ? `Sind Sie sicher, dass Sie die Vorlage "${selectedTemplate?.name}" löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.`
                : `Are you sure you want to delete the template "${selectedTemplate?.name}"? This action cannot be undone.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {language === 'fr' ? 'Annuler' : language === 'de' ? 'Abbrechen' : 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteTemplate} className="bg-red-600 hover:bg-red-700">
              {language === 'fr' ? 'Supprimer' : language === 'de' ? 'Löschen' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}