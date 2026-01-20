import React, { useState } from 'react';
import { Settings, Globe, Mail, Shield, Save, CheckCircle, Image, Palette, Trash2, Upload } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Switch } from '../../../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { toast } from 'sonner';

export function GeneralSettings() {
  const [saved, setSaved] = useState(false);
  
  // Platform Information State
  const [platformName, setPlatformName] = useState('CiviAgora');
  const [institutionName, setInstitutionName] = useState('Ville de Bruxelles');
  const [description, setDescription] = useState('Plateforme de démocratie participative pour impliquer les citoyens dans les décisions publiques.');
  const [platformUrl, setPlatformUrl] = useState('https://civiagora.brussels.be');
  const [contactEmail, setContactEmail] = useState('contact@civiagora.brussels.be');
  
  // Language Settings State
  const [defaultLanguage, setDefaultLanguage] = useState('fr');
  const [timezone, setTimezone] = useState('Europe/Brussels');
  
  // Email Settings State
  const [smtpServer, setSmtpServer] = useState('smtp.brussels.be');
  const [smtpPort, setSmtpPort] = useState('587');
  const [senderEmail, setSenderEmail] = useState('noreply@civiagora.brussels.be');
  const [senderName, setSenderName] = useState('CiviAgora - Ville de Bruxelles');
  const [smtpAuth, setSmtpAuth] = useState(true);
  
  // Security Settings State
  const [sessionDuration, setSessionDuration] = useState('60');
  const [maxLoginAttempts, setMaxLoginAttempts] = useState('5');
  const [require2FA, setRequire2FA] = useState(false);
  const [requireStrongPassword, setRequireStrongPassword] = useState(true);
  const [enableCaptcha, setEnableCaptcha] = useState(true);
  const [autoLogout, setAutoLogout] = useState(true);
  
  // Module Activation State
  const [moduleConcertations, setModuleConcertations] = useState(true);
  const [moduleAssemblies, setModuleAssemblies] = useState(true);
  const [modulePetitions, setModulePetitions] = useState(true);
  const [moduleConferences, setModuleConferences] = useState(true);
  const [moduleVotes, setModuleVotes] = useState(true);

  const handleSave = () => {
    setSaved(true);
    toast.success('✓ Paramètres généraux enregistrés avec succès');
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Paramètres généraux
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Configuration globale de la plateforme
            </p>
          </div>
        </div>
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

      {/* Platform Information */}
      <Card>
        <CardHeader>
          <CardTitle>Informations de la plateforme</CardTitle>
          <CardDescription>
            Configuration générale de l'instance CiviAgora
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nom de la plateforme
              </Label>
              <Input
                type="text"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nom de l'institution
              </Label>
              <Input
                type="text"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </Label>
            <Textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                URL de la plateforme
              </Label>
              <Input
                type="url"
                value={platformUrl}
                onChange={(e) => setPlatformUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email de contact
              </Label>
              <Input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Paramètres linguistiques
          </CardTitle>
          <CardDescription>
            Configuration multilingue de la plateforme
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Langues actives
            </Label>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400">
                Français (FR) - Par défaut
              </Badge>
              <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400">
                Deutsch (DE)
              </Badge>
              <Badge className="bg-indigo-50 text-indigo-600 border border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400">
                English (EN)
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Langue par défaut
              </Label>
              <Select
                value={defaultLanguage}
                onValueChange={(value) => setDefaultLanguage(value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fuseau horaire
              </Label>
              <Select
                value={timezone}
                onValueChange={(value) => setTimezone(value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Europe/Brussels">Europe/Brussels (UTC+1)</SelectItem>
                  <SelectItem value="Europe/Paris">Europe/Paris (UTC+1)</SelectItem>
                  <SelectItem value="Europe/Berlin">Europe/Berlin (UTC+1)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Configuration email
          </CardTitle>
          <CardDescription>
            Paramètres SMTP et emails système
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Serveur SMTP
              </Label>
              <Input
                type="text"
                value={smtpServer}
                onChange={(e) => setSmtpServer(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Port SMTP
              </Label>
              <Input
                type="text"
                value={smtpPort}
                onChange={(e) => setSmtpPort(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email expéditeur
              </Label>
              <Input
                type="email"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nom de l'expéditeur
              </Label>
              <Input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={smtpAuth}
              onCheckedChange={(checked) => setSmtpAuth(checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <Label className="text-sm text-gray-700 dark:text-gray-300">
              Utiliser l'authentification SMTP
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Sécurité
          </CardTitle>
          <CardDescription>
            Paramètres de sécurité et authentification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Durée de session (minutes)
              </Label>
              <Input
                type="number"
                value={sessionDuration}
                onChange={(e) => setSessionDuration(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tentatives de connexion max
              </Label>
              <Input
                type="number"
                value={maxLoginAttempts}
                onChange={(e) => setMaxLoginAttempts(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Switch
                checked={require2FA}
                onCheckedChange={(checked) => setRequire2FA(checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <Label className="text-sm text-gray-700 dark:text-gray-300">
                Exiger l'authentification à deux facteurs pour les administrateurs
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={requireStrongPassword}
                onCheckedChange={(checked) => setRequireStrongPassword(checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <Label className="text-sm text-gray-700 dark:text-gray-300">
                Exiger des mots de passe forts
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={enableCaptcha}
                onCheckedChange={(checked) => setEnableCaptcha(checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <Label className="text-sm text-gray-700 dark:text-gray-300">
                Activer le CAPTCHA sur les formulaires publics
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={autoLogout}
                onCheckedChange={(checked) => setAutoLogout(checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <Label className="text-sm text-gray-700 dark:text-gray-300">
                Déconnexion automatique après inactivité
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Module Activation */}
      <Card>
        <CardHeader>
          <CardTitle>Activation des modules</CardTitle>
          <CardDescription>
            Activer ou désactiver les modules de participation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Concertations</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Consultations publiques</p>
              </div>
              <Switch
                checked={moduleConcertations}
                onCheckedChange={(checked) => setModuleConcertations(checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Assemblées</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Assemblées citoyennes</p>
              </div>
              <Switch
                checked={moduleAssemblies}
                onCheckedChange={(checked) => setModuleAssemblies(checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Pétitions</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pétitions citoyennes</p>
              </div>
              <Switch
                checked={modulePetitions}
                onCheckedChange={(checked) => setModulePetitions(checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Conférences</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Événements et débats</p>
              </div>
              <Switch
                checked={moduleConferences}
                onCheckedChange={(checked) => setModuleConferences(checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Votes</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Sondages et votes</p>
              </div>
              <Switch
                checked={moduleVotes}
                onCheckedChange={(checked) => setModuleVotes(checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}