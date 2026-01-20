import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, Users, Calendar, CheckSquare, FileText, Save, CheckCircle, AlertCircle, Shield } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Switch } from '../../../components/ui/switch';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { toast } from 'sonner';

export function NotificationsSettings() {
  const [saved, setSaved] = useState(false);

  // Email Notifications State
  const [notifyNewUser, setNotifyNewUser] = useState(true);
  const [notifyNewComment, setNotifyNewComment] = useState(true);
  const [notifyEventReminder, setNotifyEventReminder] = useState(true);
  const [notifyVoteReminder, setNotifyVoteReminder] = useState(true);
  const [notifyResults, setNotifyResults] = useState(true);
  const [digestFrequency, setDigestFrequency] = useState('weekly');

  // Admin Notifications State
  const [notifyModeration, setNotifyModeration] = useState(true);
  const [notifyReports, setNotifyReports] = useState(true);
  const [notifySecurity, setNotifySecurity] = useState(true);
  const [notifySystemReports, setNotifySystemReports] = useState(true);

  // In-App Notifications State
  const [browserNotifications, setBrowserNotifications] = useState(true);
  const [soundNotifications, setSoundNotifications] = useState(false);
  const [badgeNotifications, setBadgeNotifications] = useState(true);
  const [toastDuration, setToastDuration] = useState('5');

  const handleSave = () => {
    setSaved(true);
    toast.success('✓ Paramètres de notifications enregistrés avec succès');
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Notifications
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Configuration des notifications système et utilisateurs
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

      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Notifications par email
          </CardTitle>
          <CardDescription>
            Configurer les notifications automatiques envoyées aux utilisateurs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Inscription d'un nouvel utilisateur
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Email de bienvenue et confirmation
                  </p>
                </div>
              </div>
              <Switch
                checked={notifyNewUser}
                onCheckedChange={setNotifyNewUser}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Nouveau commentaire
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Notification sur une contribution suivie
                  </p>
                </div>
              </div>
              <Switch
                checked={notifyNewComment}
                onCheckedChange={setNotifyNewComment}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Rappel d'événement
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    24h avant une conférence ou assemblée
                  </p>
                </div>
              </div>
              <Switch
                checked={notifyEventReminder}
                onCheckedChange={setNotifyEventReminder}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckSquare className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Rappel de vote
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Avant la clôture d'un vote ou sondage
                  </p>
                </div>
              </div>
              <Switch
                checked={notifyVoteReminder}
                onCheckedChange={setNotifyVoteReminder}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Publication des résultats
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Notification de publication des résultats
                  </p>
                </div>
              </div>
              <Switch
                checked={notifyResults}
                onCheckedChange={setNotifyResults}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Fréquence des digests hebdomadaires
            </label>
            <Select
              value={digestFrequency}
              onValueChange={setDigestFrequency}
              className="w-full md:w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <SelectTrigger>
                <SelectValue>
                  {digestFrequency === 'disabled' ? 'Désactivé' : digestFrequency === 'weekly' ? 'Chaque lundi' : digestFrequency === 'biweekly' ? 'Tous les 15 jours' : 'Mensuel'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="disabled">Désactivé</SelectItem>
                <SelectItem value="weekly">Chaque lundi</SelectItem>
                <SelectItem value="biweekly">Tous les 15 jours</SelectItem>
                <SelectItem value="monthly">Mensuel</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Admin Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications administrateurs</CardTitle>
          <CardDescription>
            Alertes importantes pour l'équipe d'administration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Nouveau contenu à modérer
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Alerte immédiate pour les modérateurs
                </p>
              </div>
              <Switch
                checked={notifyModeration}
                onCheckedChange={setNotifyModeration}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Signalements multiples
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Contenu signalé plus de 3 fois
                </p>
              </div>
              <Switch
                checked={notifyReports}
                onCheckedChange={setNotifyReports}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Alertes de sécurité
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Tentatives de connexion suspectes
                </p>
              </div>
              <Switch
                checked={notifySecurity}
                onCheckedChange={setNotifySecurity}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Rapports système
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Statistiques hebdomadaires
                </p>
              </div>
              <Switch
                checked={notifySystemReports}
                onCheckedChange={setNotifySystemReports}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Destinataires des notifications administrateurs
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className="bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400">
                admin@civiagora.ch
              </Badge>
              <Badge className="bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400">
                moderateur@civiagora.ch
              </Badge>
            </div>
            <Input
              type="email"
              placeholder="Ajouter une adresse email..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* In-App Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications dans l'application</CardTitle>
          <CardDescription>
            Notifications en temps réel dans l'interface
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Switch
                checked={browserNotifications}
                onCheckedChange={setBrowserNotifications}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <Label htmlFor="browser-notif" className="text-sm text-gray-700 dark:text-gray-300">
                Activer les notifications navigateur (push)
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={soundNotifications}
                onCheckedChange={setSoundNotifications}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <Label htmlFor="sound-notif" className="text-sm text-gray-700 dark:text-gray-300">
                Activer les sons de notification
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={badgeNotifications}
                onCheckedChange={setBadgeNotifications}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <Label htmlFor="badge-notif" className="text-sm text-gray-700 dark:text-gray-300">
                Afficher un badge de notification non lue
              </Label>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Durée d'affichage des toasts (secondes)
            </label>
            <Input
              type="number"
              value={toastDuration}
              onChange={(e) => setToastDuration(e.target.value)}
              min="1"
              max="10"
              className="w-full md:w-1/3 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Email Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Modèles d'emails</CardTitle>
          <CardDescription>
            Personnaliser les modèles de notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button variant="outline" className="justify-start gap-2">
              <Mail className="w-4 h-4" />
              Email de bienvenue
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <Mail className="w-4 h-4" />
              Confirmation d'action
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <Mail className="w-4 h-4" />
              Rappel d'événement
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <Mail className="w-4 h-4" />
              Notification de modération
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <Mail className="w-4 h-4" />
              Digest hebdomadaire
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <Mail className="w-4 h-4" />
              Résultats publiés
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}