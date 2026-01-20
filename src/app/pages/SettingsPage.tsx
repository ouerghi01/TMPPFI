import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { 
  User, 
  Mail, 
  Shield, 
  Settings as SettingsIcon, 
  Camera, 
  Lock,
  Globe,
  Clock,
  Bell,
  Moon,
  Save,
  CheckCircle2,
  ShieldCheck,
  Users,
  Database,
  Activity,
  AlertCircle,
  MessageSquare,
  Vote,
  Calendar,
  FileText,
  Trash2
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

type Section = 'profile' | 'account' | 'security' | 'preferences' | 'notifications' | 'administration';

export function SettingsPage() {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState<Section>('profile');
  const [hasChanges, setHasChanges] = useState(false);

  // Profile form state
  const [fullName, setFullName] = useState('Jean Dupont');
  const [username, setUsername] = useState('jdupont');
  const [bio, setBio] = useState('Citoyen engagé pour ma commune');
  const [phone, setPhone] = useState('+41 79 123 45 67');
  const [address, setAddress] = useState('Rue de la Commune 12, 1000 Lausanne');

  // Account form state
  const [email, setEmail] = useState('jean.dupont@example.com');
  const [accountLanguage, setAccountLanguage] = useState('fr');
  const [timezone, setTimezone] = useState('Europe/Zurich');

  // Security form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);

  // Preferences state
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [appLanguage, setAppLanguage] = useState('fr');
  const [compactView, setCompactView] = useState(false);

  // Notifications state
  const [notifyConcertations, setNotifyConcertations] = useState(true);
  const [notifyAssemblies, setNotifyAssemblies] = useState(true);
  const [notifyPetitions, setNotifyPetitions] = useState(true);
  const [notifyConferences, setNotifyConferences] = useState(true);
  const [notifyVotes, setNotifyVotes] = useState(true);
  const [notifyComments, setNotifyComments] = useState(false);
  const [notifyDigest, setNotifyDigest] = useState('weekly');

  // Administration state (for admin users)
  const [platformName, setPlatformName] = useState('CiviAgora');
  const [adminEmail, setAdminEmail] = useState('admin@civiagora.ch');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowRegistrations, setAllowRegistrations] = useState(true);
  const [moderationRequired, setModerationRequired] = useState(true);

  const handleSaveChanges = () => {
    setHasChanges(false);
    toast.success(
      language === 'fr' ? '✓ Modifications enregistrées avec succès' :
      language === 'de' ? '✓ Änderungen erfolgreich gespeichert' :
      '✓ Changes saved successfully'
    );
  };

  const handleUpdatePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error(
        language === 'fr' ? 'Veuillez remplir tous les champs' :
        language === 'de' ? 'Bitte füllen Sie alle Felder aus' :
        'Please fill in all fields'
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error(
        language === 'fr' ? 'Les mots de passe ne correspondent pas' :
        language === 'de' ? 'Passwörter stimmen nicht überein' :
        'Passwords do not match'
      );
      return;
    }
    toast.success(
      language === 'fr' ? '✓ Mot de passe mis à jour avec succès' :
      language === 'de' ? '✓ Passwort erfolgreich aktualisiert' :
      '✓ Password updated successfully'
    );
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const sections = [
    {
      id: 'profile' as Section,
      icon: User,
      label: language === 'fr' ? 'Profil' : language === 'de' ? 'Profil' : 'Profile',
      description: language === 'fr' ? 'Gérez vos informations personnelles' : language === 'de' ? 'Verwalten Sie Ihre persönlichen Daten' : 'Manage your personal information'
    },
    {
      id: 'account' as Section,
      icon: Mail,
      label: language === 'fr' ? 'Compte' : language === 'de' ? 'Konto' : 'Account',
      description: language === 'fr' ? 'Paramètres de votre compte' : language === 'de' ? 'Kontoeinstellungen' : 'Account settings'
    },
    {
      id: 'security' as Section,
      icon: Shield,
      label: language === 'fr' ? 'Sécurité' : language === 'de' ? 'Sicherheit' : 'Security',
      description: language === 'fr' ? 'Mot de passe et sécurité' : language === 'de' ? 'Passwort und Sicherheit' : 'Password and security'
    },
    {
      id: 'preferences' as Section,
      icon: SettingsIcon,
      label: language === 'fr' ? 'Préférences' : language === 'de' ? 'Einstellungen' : 'Preferences',
      description: language === 'fr' ? 'Personnalisez votre expérience' : language === 'de' ? 'Personalisieren Sie Ihre Erfahrung' : 'Customize your experience'
    },
    {
      id: 'notifications' as Section,
      icon: Bell,
      label: language === 'fr' ? 'Notifications' : language === 'de' ? 'Benachrichtigungen' : 'Notifications',
      description: language === 'fr' ? 'Configurez vos notifications' : language === 'de' ? 'Konfigurieren Sie Ihre Benachrichtigungen' : 'Configure your notifications'
    },
    {
      id: 'administration' as Section,
      icon: Database,
      label: language === 'fr' ? 'Administration' : language === 'de' ? 'Administration' : 'Administration',
      description: language === 'fr' ? 'Paramètres de la plateforme' : language === 'de' ? 'Plattform-Einstellungen' : 'Platform settings'
    }
  ];

  // Generate initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-semibold shadow-lg">
              {getInitials(fullName)}
            </div>
            <div>
              <h1 className="text-3xl text-gray-900">
                {language === 'fr' && 'Paramètres du compte'}
                {language === 'de' && 'Kontoeinstellungen'}
                {language === 'en' && 'Account Settings'}
              </h1>
              <p className="text-gray-600 mt-1">
                {language === 'fr' && 'Gérez vos préférences et vos informations'}
                {language === 'de' && 'Verwalten Sie Ihre Einstellungen und Informationen'}
                {language === 'en' && 'Manage your preferences and information'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-4">
                <nav className="space-y-1">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;
                    
                    return (
                      <motion.button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                            : 'text-gray-700 hover:bg-blue-50/50'
                        }`}
                        whileHover={{ scale: isActive ? 1 : 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{section.label}</span>
                      </motion.button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-6">
            {/* Profile Section */}
            {activeSection === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      {language === 'fr' && 'Informations du profil'}
                      {language === 'de' && 'Profilinformationen'}
                      {language === 'en' && 'Profile Information'}
                    </CardTitle>
                    <CardDescription>
                      {language === 'fr' && 'Mettez à jour votre photo et vos informations personnelles'}
                      {language === 'de' && 'Aktualisieren Sie Ihr Foto und persönliche Informationen'}
                      {language === 'en' && 'Update your photo and personal details'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Avatar Section */}
                    <div>
                      <Label className="mb-3 block">
                        {language === 'fr' && 'Photo de profil'}
                        {language === 'de' && 'Profilbild'}
                        {language === 'en' && 'Profile Picture'}
                      </Label>
                      <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-semibold shadow-lg">
                          {getInitials(fullName)}
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" className="gap-2">
                            <Camera className="w-4 h-4" />
                            {language === 'fr' && 'Changer la photo'}
                            {language === 'de' && 'Foto ändern'}
                            {language === 'en' && 'Change photo'}
                          </Button>
                          <p className="text-xs text-gray-500">
                            {language === 'fr' && 'JPG, PNG ou GIF. Max 2MB.'}
                            {language === 'de' && 'JPG, PNG oder GIF. Max 2MB.'}
                            {language === 'en' && 'JPG, PNG or GIF. Max 2MB.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Profile Form */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">
                          {language === 'fr' && 'Nom complet'}
                          {language === 'de' && 'Vollständiger Name'}
                          {language === 'en' && 'Full Name'}
                        </Label>
                        <Input
                          id="fullName"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            setHasChanges(true);
                          }}
                          placeholder="Jean Dupont"
                          className="h-11"
                        />
                        <p className="text-xs text-gray-500">
                          {language === 'fr' && 'Ce nom sera affiché publiquement'}
                          {language === 'de' && 'Dieser Name wird öffentlich angezeigt'}
                          {language === 'en' && 'This name will be displayed publicly'}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="username">
                          {language === 'fr' && 'Nom d\'utilisateur'}
                          {language === 'de' && 'Benutzername'}
                          {language === 'en' && 'Username'}
                        </Label>
                        <Input
                          id="username"
                          value={username}
                          onChange={(e) => {
                            setUsername(e.target.value);
                            setHasChanges(true);
                          }}
                          placeholder="jdupont"
                          className="h-11"
                        />
                        <p className="text-xs text-gray-500">
                          {language === 'fr' && 'URL: civiagora.ch/'}
                          {language === 'de' && 'URL: civiagora.ch/'}
                          {language === 'en' && 'URL: civiagora.ch/'}
                          <span className="text-blue-600">{username}</span>
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">
                          {language === 'fr' && 'Bio'}
                          {language === 'de' && 'Biografie'}
                          {language === 'en' && 'Bio'}
                        </Label>
                        <Textarea
                          id="bio"
                          value={bio}
                          onChange={(e) => {
                            setBio(e.target.value);
                            setHasChanges(true);
                          }}
                          placeholder={
                            language === 'fr' ? 'Parlez-nous de vous...' :
                            language === 'de' ? 'Erzählen Sie uns über sich...' :
                            'Tell us about yourself...'
                          }
                          rows={4}
                        />
                        <p className="text-xs text-gray-500">
                          {bio.length} / 500 caractères
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          {language === 'fr' && 'Téléphone'}
                          {language === 'de' && 'Telefon'}
                          {language === 'en' && 'Phone'}
                        </Label>
                        <Input
                          id="phone"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            setHasChanges(true);
                          }}
                          placeholder="+41 79 123 45 67"
                          className="h-11"
                        />
                        <p className="text-xs text-gray-500">
                          {language === 'fr' && 'Numéro de téléphone pour les communications'}
                          {language === 'de' && 'Telefonnummer für Kommunikation'}
                          {language === 'en' && 'Phone number for communication'}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">
                          {language === 'fr' && 'Adresse'}
                          {language === 'de' && 'Adresse'}
                          {language === 'en' && 'Address'}
                        </Label>
                        <Input
                          id="address"
                          value={address}
                          onChange={(e) => {
                            setAddress(e.target.value);
                            setHasChanges(true);
                          }}
                          placeholder="Rue de la Commune 12, 1000 Lausanne"
                          className="h-11"
                        />
                        <p className="text-xs text-gray-500">
                          {language === 'fr' && 'Adresse pour les communications'}
                          {language === 'de' && 'Adresse für Kommunikation'}
                          {language === 'en' && 'Address for communication'}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                      <Button variant="outline" disabled={!hasChanges}>
                        {language === 'fr' && 'Annuler'}
                        {language === 'de' && 'Abbrechen'}
                        {language === 'en' && 'Cancel'}
                      </Button>
                      <Button
                        onClick={handleSaveChanges}
                        disabled={!hasChanges}
                        className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Save className="w-4 h-4" />
                        {language === 'fr' && 'Enregistrer les modifications'}
                        {language === 'de' && 'Änderungen speichern'}
                        {language === 'en' && 'Save changes'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Account Section */}
            {activeSection === 'account' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-blue-600" />
                      {language === 'fr' && 'Paramètres du compte'}
                      {language === 'de' && 'Kontoeinstellungen'}
                      {language === 'en' && 'Account Settings'}
                    </CardTitle>
                    <CardDescription>
                      {language === 'fr' && 'Gérez votre email, langue et fuseau horaire'}
                      {language === 'de' && 'Verwalten Sie E-Mail, Sprache und Zeitzone'}
                      {language === 'en' && 'Manage your email, language and timezone'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          {language === 'fr' && 'Adresse email'}
                          {language === 'de' && 'E-Mail-Adresse'}
                          {language === 'en' && 'Email Address'}
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          readOnly
                          className="h-11 bg-gray-50 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-500">
                          {language === 'fr' && 'Votre adresse email est vérifiée '}
                          {language === 'de' && 'Ihre E-Mail-Adresse ist verifiziert '}
                          {language === 'en' && 'Your email address is verified '}
                          <CheckCircle2 className="w-3 h-3 inline text-green-600" />
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="accountLanguage" className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-gray-500" />
                          {language === 'fr' && 'Langue de l\'interface'}
                          {language === 'de' && 'Schnittstellensprache'}
                          {language === 'en' && 'Interface Language'}
                        </Label>
                        <Select value={accountLanguage} onValueChange={setAccountLanguage}>
                          <SelectTrigger className="h-11">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fr">Français (FR)</SelectItem>
                            <SelectItem value="de">Deutsch (DE)</SelectItem>
                            <SelectItem value="en">English (EN)</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-gray-500">
                          {language === 'fr' && 'Choisissez votre langue préférée'}
                          {language === 'de' && 'Wählen Sie Ihre bevorzugte Sprache'}
                          {language === 'en' && 'Choose your preferred language'}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timezone" className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          {language === 'fr' && 'Fuseau horaire'}
                          {language === 'de' && 'Zeitzone'}
                          {language === 'en' && 'Timezone'}
                        </Label>
                        <Select value={timezone} onValueChange={setTimezone}>
                          <SelectTrigger className="h-11">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Europe/Zurich">Europe/Zurich (GMT+1)</SelectItem>
                            <SelectItem value="Europe/Paris">Europe/Paris (GMT+1)</SelectItem>
                            <SelectItem value="Europe/Berlin">Europe/Berlin (GMT+1)</SelectItem>
                            <SelectItem value="Europe/London">Europe/London (GMT+0)</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-gray-500">
                          {language === 'fr' && 'Utilisé pour l\'affichage des dates et heures'}
                          {language === 'de' && 'Wird für die Anzeige von Datum und Uhrzeit verwendet'}
                          {language === 'en' && 'Used for displaying dates and times'}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                      <Button variant="outline">
                        {language === 'fr' && 'Annuler'}
                        {language === 'de' && 'Abbrechen'}
                        {language === 'en' && 'Cancel'}
                      </Button>
                      <Button
                        onClick={handleSaveChanges}
                        className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <Save className="w-4 h-4" />
                        {language === 'fr' && 'Enregistrer les modifications'}
                        {language === 'de' && 'Änderungen speichern'}
                        {language === 'en' && 'Save changes'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Security Section */}
            {activeSection === 'security' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      {language === 'fr' && 'Sécurité'}
                      {language === 'de' && 'Sicherheit'}
                      {language === 'en' && 'Security'}
                    </CardTitle>
                    <CardDescription>
                      {language === 'fr' && 'Gérez votre mot de passe et la sécurité de votre compte'}
                      {language === 'de' && 'Verwalten Sie Ihr Passwort und die Kontosicherheit'}
                      {language === 'en' && 'Manage your password and account security'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex gap-3">
                        <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-900">
                            {language === 'fr' && 'Conseil de sécurité'}
                            {language === 'de' && 'Sicherheitstipp'}
                            {language === 'en' && 'Security Tip'}
                          </p>
                          <p className="text-sm text-blue-700 mt-1">
                            {language === 'fr' && 'Utilisez un mot de passe fort avec au moins 8 caractères, incluant des lettres, chiffres et symboles.'}
                            {language === 'de' && 'Verwenden Sie ein sicheres Passwort mit mindestens 8 Zeichen, einschließlich Buchstaben, Zahlen und Symbolen.'}
                            {language === 'en' && 'Use a strong password with at least 8 characters, including letters, numbers and symbols.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword" className="flex items-center gap-2">
                          <Lock className="w-4 h-4 text-gray-500" />
                          {language === 'fr' && 'Mot de passe actuel'}
                          {language === 'de' && 'Aktuelles Passwort'}
                          {language === 'en' && 'Current Password'}
                        </Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="••••••••"
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className="flex items-center gap-2">
                          <Lock className="w-4 h-4 text-gray-500" />
                          {language === 'fr' && 'Nouveau mot de passe'}
                          {language === 'de' && 'Neues Passwort'}
                          {language === 'en' && 'New Password'}
                        </Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••"
                          className="h-11"
                        />
                        <p className="text-xs text-gray-500">
                          {language === 'fr' && 'Minimum 8 caractères'}
                          {language === 'de' && 'Mindestens 8 Zeichen'}
                          {language === 'en' && 'Minimum 8 characters'}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                          <Lock className="w-4 h-4 text-gray-500" />
                          {language === 'fr' && 'Confirmer le nouveau mot de passe'}
                          {language === 'de' && 'Neues Passwort bestätigen'}
                          {language === 'en' && 'Confirm New Password'}
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="twoFactorEnabled" className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-gray-500" />
                          {language === 'fr' && 'Authentification à deux facteurs'}
                          {language === 'de' && 'Zweistufige Authentifizierung'}
                          {language === 'en' && 'Two-Factor Authentication'}
                        </Label>
                        <Switch
                          id="twoFactorEnabled"
                          checked={twoFactorEnabled}
                          onCheckedChange={setTwoFactorEnabled}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="loginAlerts" className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-gray-500" />
                          {language === 'fr' && 'Alertes de connexion'}
                          {language === 'de' && 'Anmeldebenachrichtigungen'}
                          {language === 'en' && 'Login Alerts'}
                        </Label>
                        <Switch
                          id="loginAlerts"
                          checked={loginAlerts}
                          onCheckedChange={setLoginAlerts}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setCurrentPassword('');
                          setNewPassword('');
                          setConfirmPassword('');
                        }}
                      >
                        {language === 'fr' && 'Annuler'}
                        {language === 'de' && 'Abbrechen'}
                        {language === 'en' && 'Cancel'}
                      </Button>
                      <Button
                        onClick={handleUpdatePassword}
                        className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <Lock className="w-4 h-4" />
                        {language === 'fr' && 'Mettre à jour le mot de passe'}
                        {language === 'de' && 'Passwort aktualisieren'}
                        {language === 'en' && 'Update password'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Preferences Section */}
            {activeSection === 'preferences' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <SettingsIcon className="w-5 h-5 text-blue-600" />
                      {language === 'fr' && 'Préférences'}
                      {language === 'de' && 'Einstellungen'}
                      {language === 'en' && 'Preferences'}
                    </CardTitle>
                    <CardDescription>
                      {language === 'fr' && 'Personnalisez votre expérience sur CiviAgora'}
                      {language === 'de' && 'Personalisieren Sie Ihre CiviAgora-Erfahrung'}
                      {language === 'en' && 'Customize your CiviAgora experience'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Dark Mode Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Moon className="w-5 h-5 text-gray-700" />
                        </div>
                        <div>
                          <Label htmlFor="darkMode" className="text-base font-medium cursor-pointer">
                            {language === 'fr' && 'Mode sombre'}
                            {language === 'de' && 'Dunkler Modus'}
                            {language === 'en' && 'Dark Mode'}
                          </Label>
                          <p className="text-sm text-gray-500">
                            {language === 'fr' && 'Basculer vers un thème sombre'}
                            {language === 'de' && 'Zu einem dunklen Thema wechseln'}
                            {language === 'en' && 'Switch to a dark theme'}
                          </p>
                        </div>
                      </div>
                      <Switch
                        id="darkMode"
                        checked={darkMode}
                        onCheckedChange={setDarkMode}
                      />
                    </div>

                    {/* Email Notifications Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Bell className="w-5 h-5 text-blue-700" />
                        </div>
                        <div>
                          <Label htmlFor="emailNotifications" className="text-base font-medium cursor-pointer">
                            {language === 'fr' && 'Notifications par email'}
                            {language === 'de' && 'E-Mail-Benachrichtigungen'}
                            {language === 'en' && 'Email Notifications'}
                          </Label>
                          <p className="text-sm text-gray-500">
                            {language === 'fr' && 'Recevoir des notifications sur votre activité'}
                            {language === 'de' && 'Benachrichtigungen über Ihre Aktivitäten erhalten'}
                            {language === 'en' && 'Receive notifications about your activity'}
                          </p>
                        </div>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>

                    {/* App Language */}
                    <div className="p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                          <Globe className="w-5 h-5 text-purple-700" />
                        </div>
                        <div>
                          <Label htmlFor="appLanguage" className="text-base font-medium">
                            {language === 'fr' && 'Langue de l\'application'}
                            {language === 'de' && 'Anwendungssprache'}
                            {language === 'en' && 'App Language'}
                          </Label>
                          <p className="text-sm text-gray-500">
                            {language === 'fr' && 'Choisissez votre langue préférée'}
                            {language === 'de' && 'Wählen Sie Ihre bevorzugte Sprache'}
                            {language === 'en' && 'Choose your preferred language'}
                          </p>
                        </div>
                      </div>
                      <Select value={appLanguage} onValueChange={setAppLanguage}>
                        <SelectTrigger className="h-11">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fr">🇫🇷 Français</SelectItem>
                          <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
                          <SelectItem value="en">🇬🇧 English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Compact View Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Activity className="w-5 h-5 text-gray-700" />
                        </div>
                        <div>
                          <Label htmlFor="compactView" className="text-base font-medium cursor-pointer">
                            {language === 'fr' && 'Vue compacte'}
                            {language === 'de' && 'Kompakte Ansicht'}
                            {language === 'en' && 'Compact View'}
                          </Label>
                          <p className="text-sm text-gray-500">
                            {language === 'fr' && 'Afficher une vue compacte'}
                            {language === 'de' && 'Kompakte Ansicht anzeigen'}
                            {language === 'en' && 'Display a compact view'}
                          </p>
                        </div>
                      </div>
                      <Switch
                        id="compactView"
                        checked={compactView}
                        onCheckedChange={setCompactView}
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                      <Button variant="outline">
                        {language === 'fr' && 'Réinitialiser'}
                        {language === 'de' && 'Zurücksetzen'}
                        {language === 'en' && 'Reset'}
                      </Button>
                      <Button
                        onClick={handleSaveChanges}
                        className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <Save className="w-4 h-4" />
                        {language === 'fr' && 'Enregistrer les préférences'}
                        {language === 'de' && 'Einstellungen speichern'}
                        {language === 'en' && 'Save preferences'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Notifications Section */}
            {activeSection === 'notifications' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5 text-blue-600" />
                      {language === 'fr' && 'Notifications'}
                      {language === 'de' && 'Benachrichtigungen'}
                      {language === 'en' && 'Notifications'}
                    </CardTitle>
                    <CardDescription>
                      {language === 'fr' && 'Configurez vos notifications'}
                      {language === 'de' && 'Konfigurieren Sie Ihre Benachrichtigungen'}
                      {language === 'en' && 'Configure your notifications'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Concertations Notifications Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-gray-700" />
                        </div>
                        <div>
                          <Label htmlFor="notifyConcertations" className="text-base font-medium cursor-pointer">
                            {language === 'fr' && 'Notifications de concertations'}
                            {language === 'de' && 'Benachrichtigungen zu Konzultationen'}
                            {language === 'en' && 'Concertation Notifications'}
                          </Label>
                          <p className="text-sm text-gray-500">
                            {language === 'fr' && 'Recevoir des notifications pour les concertations'}
                            {language === 'de' && 'Benachrichtigungen für Konzultationen erhalten'}
                            {language === 'en' && 'Receive notifications for concertations'}
                          </p>
                        </div>
                      </div>
                      <Switch
                        id="notifyConcertations"
                        checked={notifyConcertations}
                        onCheckedChange={setNotifyConcertations}
                      />
                    </div>

                    {/* Assemblies Notifications Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Users className="w-5 h-5 text-gray-700" />
                        </div>
                        <div>
                          <Label htmlFor="notifyAssemblies" className="text-base font-medium cursor-pointer">
                            {language === 'fr' && 'Notifications de réunions'}
                            {language === 'de' && 'Benachrichtigungen zu Versammlungen'}
                            {language === 'en' && 'Assembly Notifications'}
                          </Label>
                          <p className="text-sm text-gray-500">
                            {language === 'fr' && 'Recevoir des notifications pour les réunions'}
                            {language === 'de' && 'Benachrichtigungen für Versammlungen erhalten'}
                            {language === 'en' && 'Receive notifications for assemblies'}
                          </p>
                        </div>
                      </div>
                      <Switch
                        id="notifyAssemblies"
                        checked={notifyAssemblies}
                        onCheckedChange={setNotifyAssemblies}
                      />
                    </div>

                    {/* Petitions Notifications Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Vote className="w-5 h-5 text-gray-700" />
                        </div>
                        <div>
                          <Label htmlFor="notifyPetitions" className="text-base font-medium cursor-pointer">
                            {language === 'fr' && 'Notifications de pétitions'}
                            {language === 'de' && 'Benachrichtigungen zu Petitionen'}
                            {language === 'en' && 'Petition Notifications'}
                          </Label>
                          <p className="text-sm text-gray-500">
                            {language === 'fr' && 'Recevoir des notifications pour les pétitions'}
                            {language === 'de' && 'Benachrichtigungen für Petitionen erhalten'}
                            {language === 'en' && 'Receive notifications for petitions'}
                          </p>
                        </div>
                      </div>
                      <Switch
                        id="notifyPetitions"
                        checked={notifyPetitions}
                        onCheckedChange={setNotifyPetitions}
                      />
                    </div>

                    {/* Conferences Notifications Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-gray-700" />
                        </div>
                        <div>
                          <Label htmlFor="notifyConferences" className="text-base font-medium cursor-pointer">
                            {language === 'fr' && 'Notifications de conférences'}
                            {language === 'de' && 'Benachrichtigungen zu Konferenzen'}
                            {language === 'en' && 'Conference Notifications'}
                          </Label>
                          <p className="text-sm text-gray-500">
                            {language === 'fr' && 'Recevoir des notifications pour les conférences'}
                            {language === 'de' && 'Benachrichtigungen für Konferenzen erhalten'}
                            {language === 'en' && 'Receive notifications for conferences'}
                          </p>
                        </div>
                      </div>
                      <Switch
                        id="notifyConferences"
                        checked={notifyConferences}
                        onCheckedChange={setNotifyConferences}
                      />
                    </div>

                    {/* Votes Notifications Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Vote className="w-5 h-5 text-gray-700" />
                        </div>
                        <div>
                          <Label htmlFor="notifyVotes" className="text-base font-medium cursor-pointer">
                            {language === 'fr' && 'Notifications de votes'}
                            {language === 'de' && 'Benachrichtigungen zu Abstimmungen'}
                            {language === 'en' && 'Vote Notifications'}
                          </Label>
                          <p className="text-sm text-gray-500">
                            {language === 'fr' && 'Recevoir des notifications pour les votes'}
                            {language === 'de' && 'Benachrichtigungen für Abstimmungen erhalten'}
                            {language === 'en' && 'Receive notifications for votes'}
                          </p>
                        </div>
                      </div>
                      <Switch
                        id="notifyVotes"
                        checked={notifyVotes}
                        onCheckedChange={setNotifyVotes}
                      />
                    </div>

                    {/* Comments Notifications Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-gray-700" />
                        </div>
                        <div>
                          <Label htmlFor="notifyComments" className="text-base font-medium cursor-pointer">
                            {language === 'fr' && 'Notifications de commentaires'}
                            {language === 'de' && 'Benachrichtigungen zu Kommentaren'}
                            {language === 'en' && 'Comment Notifications'}
                          </Label>
                          <p className="text-sm text-gray-500">
                            {language === 'fr' && 'Recevoir des notifications pour les commentaires'}
                            {language === 'de' && 'Benachrichtigungen für Kommentare erhalten'}
                            {language === 'en' && 'Receive notifications for comments'}
                          </p>
                        </div>
                      </div>
                      <Switch
                        id="notifyComments"
                        checked={notifyComments}
                        onCheckedChange={setNotifyComments}
                      />
                    </div>

                    {/* Digest Notifications */}
                    <div className="p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-gray-700" />
                        </div>
                        <div>
                          <Label htmlFor="notifyDigest" className="text-base font-medium">
                            {language === 'fr' && 'Résumé des notifications'}
                            {language === 'de' && 'Benachrichtigungsübersicht'}
                            {language === 'en' && 'Notification Digest'}
                          </Label>
                          <p className="text-sm text-gray-500">
                            {language === 'fr' && 'Recevoir un résumé des notifications'}
                            {language === 'de' && 'Benachrichtigungsübersicht erhalten'}
                            {language === 'en' && 'Receive a notification digest'}
                          </p>
                        </div>
                      </div>
                      <Select value={notifyDigest} onValueChange={setNotifyDigest}>
                        <SelectTrigger className="h-11">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily"> quotidienne</SelectItem>
                          <SelectItem value="weekly"> hebdomadaire</SelectItem>
                          <SelectItem value="monthly"> mensuelle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                      <Button variant="outline">
                        {language === 'fr' && 'Réinitialiser'}
                        {language === 'de' && 'Zurücksetzen'}
                        {language === 'en' && 'Reset'}
                      </Button>
                      <Button
                        onClick={handleSaveChanges}
                        className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <Save className="w-4 h-4" />
                        {language === 'fr' && 'Enregistrer les préférences'}
                        {language === 'de' && 'Einstellungen speichern'}
                        {language === 'en' && 'Save preferences'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Administration Section */}
            {activeSection === 'administration' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5 text-blue-600" />
                      {language === 'fr' && 'Administration'}
                      {language === 'de' && 'Administration'}
                      {language === 'en' && 'Administration'}
                    </CardTitle>
                    <CardDescription>
                      {language === 'fr' && 'Paramètres de la plateforme'}
                      {language === 'de' && 'Plattform-Einstellungen'}
                      {language === 'en' && 'Platform settings'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Platform Name */}
                    <div className="space-y-2">
                      <Label htmlFor="platformName">
                        {language === 'fr' && 'Nom de la plateforme'}
                        {language === 'de' && 'Plattformname'}
                        {language === 'en' && 'Platform Name'}
                      </Label>
                      <Input
                        id="platformName"
                        value={platformName}
                        onChange={(e) => setPlatformName(e.target.value)}
                        placeholder="CiviAgora"
                        className="h-11"
                      />
                      <p className="text-xs text-gray-500">
                        {language === 'fr' && 'Nom affiché pour la plateforme'}
                        {language === 'de' && 'Angezeigter Name der Plattform'}
                        {language === 'en' && 'Displayed name for the platform'}
                      </p>
                    </div>

                    {/* Admin Email */}
                    <div className="space-y-2">
                      <Label htmlFor="adminEmail">
                        {language === 'fr' && 'Email de l\'administrateur'}
                        {language === 'de' && 'Admin-E-Mail'}
                        {language === 'en' && 'Admin Email'}
                      </Label>
                      <Input
                        id="adminEmail"
                        type="email"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        placeholder="admin@civiagora.ch"
                        className="h-11"
                      />
                      <p className="text-xs text-gray-500">
                        {language === 'fr' && 'Email pour les notifications d\'administration'}
                        {language === 'de' && 'E-Mail für administrative Benachrichtigungen'}
                        {language === 'en' && 'Email for administrative notifications'}
                      </p>
                    </div>

                    {/* Maintenance Mode Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Trash2 className="w-5 h-5 text-gray-700" />
                        </div>
                        <div>
                          <Label htmlFor="maintenanceMode" className="text-base font-medium cursor-pointer">
                            {language === 'fr' && 'Mode maintenance'}
                            {language === 'de' && 'Wartungsmodus'}
                            {language === 'en' && 'Maintenance Mode'}
                          </Label>
                          <p className="text-sm text-gray-500">
                            {language === 'fr' && 'Activer le mode maintenance'}
                            {language === 'de' && 'Wartungsmodus aktivieren'}
                            {language === 'en' && 'Enable maintenance mode'}
                          </p>
                        </div>
                      </div>
                      <Switch
                        id="maintenanceMode"
                        checked={maintenanceMode}
                        onCheckedChange={setMaintenanceMode}
                      />
                    </div>

                    {/* Allow Registrations Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Users className="w-5 h-5 text-gray-700" />
                        </div>
                        <div>
                          <Label htmlFor="allowRegistrations" className="text-base font-medium cursor-pointer">
                            {language === 'fr' && 'Autoriser les inscriptions'}
                            {language === 'de' && 'Registrierungen zulassen'}
                            {language === 'en' && 'Allow Registrations'}
                          </Label>
                          <p className="text-sm text-gray-500">
                            {language === 'fr' && 'Autoriser les nouveaux utilisateurs à s\'inscrire'}
                            {language === 'de' && 'Neuen Benutzern das Registrieren zulassen'}
                            {language === 'en' && 'Allow new users to register'}
                          </p>
                        </div>
                      </div>
                      <Switch
                        id="allowRegistrations"
                        checked={allowRegistrations}
                        onCheckedChange={setAllowRegistrations}
                      />
                    </div>

                    {/* Moderation Required Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          <ShieldCheck className="w-5 h-5 text-gray-700" />
                        </div>
                        <div>
                          <Label htmlFor="moderationRequired" className="text-base font-medium cursor-pointer">
                            {language === 'fr' && 'Modération requise'}
                            {language === 'de' && 'Moderation erforderlich'}
                            {language === 'en' && 'Moderation Required'}
                          </Label>
                          <p className="text-sm text-gray-500">
                            {language === 'fr' && 'Toutes les publications nécessitent une modération'}
                            {language === 'de' && 'Alle Veröffentlichungen erfordern eine Moderation'}
                            {language === 'en' && 'All publications require moderation'}
                          </p>
                        </div>
                      </div>
                      <Switch
                        id="moderationRequired"
                        checked={moderationRequired}
                        onCheckedChange={setModerationRequired}
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                      <Button variant="outline">
                        {language === 'fr' && 'Réinitialiser'}
                        {language === 'de' && 'Zurücksetzen'}
                        {language === 'en' && 'Reset'}
                      </Button>
                      <Button
                        onClick={handleSaveChanges}
                        className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <Save className="w-4 h-4" />
                        {language === 'fr' && 'Enregistrer les préférences'}
                        {language === 'de' && 'Einstellungen speichern'}
                        {language === 'en' && 'Save preferences'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}