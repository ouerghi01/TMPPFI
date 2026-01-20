import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import {
  Building2,
  Settings,
  User,
  Layers,
  Shield,
  Check,
  ChevronLeft,
  ChevronRight,
  Upload,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Switch } from '../../components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Card } from '../../components/ui/card';
import { Separator } from '../../components/ui/separator';

interface OrganizationWizardProps {
  onComplete: () => void;
}

interface WizardData {
  // Step 1: General Info
  name: string;
  slug: string;
  description: string;
  logo: string;
  
  // Step 2: Settings
  language: string;
  timezone: string;
  primaryColor: string;
  secondaryColor: string;
  
  // Step 3: Admin User
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  adminRole: string;
  
  // Step 4: Modules
  modulesVotes: boolean;
  modulesDebates: boolean;
  modulesInitiatives: boolean;
  modulesAssemblies: boolean;
  modulesConferences: boolean;
  
  // Step 5: Security
  mfaRequired: boolean;
  passwordMinLength: number;
  ipRestrictions: boolean;
  sessionTimeout: number;
}

export function OrganizationWizard({ onComplete }: OrganizationWizardProps) {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<WizardData>({
    name: '',
    slug: '',
    description: '',
    logo: '',
    language: 'fr',
    timezone: 'Europe/Brussels',
    primaryColor: '#3b82f6',
    secondaryColor: '#8b5cf6',
    adminFirstName: '',
    adminLastName: '',
    adminEmail: '',
    adminRole: 'admin',
    modulesVotes: true,
    modulesDebates: true,
    modulesInitiatives: true,
    modulesAssemblies: false,
    modulesConferences: false,
    mfaRequired: false,
    passwordMinLength: 12,
    ipRestrictions: false,
    sessionTimeout: 30
  });

  const totalSteps = 6;

  const steps = [
    {
      number: 1,
      title: language === 'fr' ? 'Informations générales' : language === 'de' ? 'Allgemeine Informationen' : 'General Info',
      icon: Building2
    },
    {
      number: 2,
      title: language === 'fr' ? 'Paramètres' : language === 'de' ? 'Einstellungen' : 'Settings',
      icon: Settings
    },
    {
      number: 3,
      title: language === 'fr' ? 'Utilisateur administrateur' : language === 'de' ? 'Administrator' : 'Admin User',
      icon: User
    },
    {
      number: 4,
      title: language === 'fr' ? 'Activation des modules' : language === 'de' ? 'Modulaktivierung' : 'Modules Activation',
      icon: Layers
    },
    {
      number: 5,
      title: language === 'fr' ? 'Sécurité' : language === 'de' ? 'Sicherheit' : 'Security',
      icon: Shield
    },
    {
      number: 6,
      title: language === 'fr' ? 'Récapitulatif' : language === 'de' ? 'Zusammenfassung' : 'Summary',
      icon: CheckCircle2
    }
  ];

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // TODO: Submit form data to backend
    console.log('Organization data:', formData);
    onComplete();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">
                {language === 'fr' ? 'Nom de l\'organisation' : language === 'de' ? 'Organisationsname' : 'Organization Name'} *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => {
                  updateFormData('name', e.target.value);
                  if (!formData.slug || formData.slug === generateSlug(formData.name)) {
                    updateFormData('slug', generateSlug(e.target.value));
                  }
                }}
                placeholder={language === 'fr' ? 'Ville de Bruxelles' : language === 'de' ? 'Stadt Brüssel' : 'City of Brussels'}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="slug">
                {language === 'fr' ? 'Identifiant URL (slug)' : language === 'de' ? 'URL-Kennung (Slug)' : 'URL Identifier (slug)'} *
              </Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => updateFormData('slug', e.target.value)}
                placeholder="bruxelles"
                className="mt-2"
              />
              <p className="text-xs text-gray-500 mt-1">
                {language === 'fr' ? 'Exemple d\'URL: ' : language === 'de' ? 'Beispiel-URL: ' : 'Example URL: '}
                <code className="bg-gray-100 px-1 rounded">https://civiagora.com/{formData.slug || 'slug'}</code>
              </p>
            </div>

            <div>
              <Label htmlFor="description">
                {language === 'fr' ? 'Description' : language === 'de' ? 'Beschreibung' : 'Description'}
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
                placeholder={language === 'fr' ? 'Description de votre organisation...' : language === 'de' ? 'Beschreibung Ihrer Organisation...' : 'Description of your organization...'}
                className="mt-2"
                rows={4}
              />
            </div>

            <div>
              <Label>
                {language === 'fr' ? 'Logo de l\'organisation' : language === 'de' ? 'Organisationslogo' : 'Organization Logo'}
              </Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  {language === 'fr' ? 'Cliquez pour télécharger ou glissez-déposez' : language === 'de' ? 'Klicken Sie zum Hochladen oder ziehen Sie per Drag & Drop' : 'Click to upload or drag and drop'}
                </p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, SVG (max. 2MB)</p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="language">
                {language === 'fr' ? 'Langue par défaut' : language === 'de' ? 'Standardsprache' : 'Default Language'} *
              </Label>
              <Select value={formData.language} onValueChange={(value) => updateFormData('language', value)}>
                <SelectTrigger className="mt-2">
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
              <Label htmlFor="timezone">
                {language === 'fr' ? 'Fuseau horaire' : language === 'de' ? 'Zeitzone' : 'Timezone'} *
              </Label>
              <Select value={formData.timezone} onValueChange={(value) => updateFormData('timezone', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Europe/Brussels">Europe/Brussels (GMT+1)</SelectItem>
                  <SelectItem value="Europe/Paris">Europe/Paris (GMT+1)</SelectItem>
                  <SelectItem value="Europe/Zurich">Europe/Zurich (GMT+1)</SelectItem>
                  <SelectItem value="Europe/Geneva">Europe/Geneva (GMT+1)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <h3 className="font-medium">
                {language === 'fr' ? 'Personnalisation visuelle' : language === 'de' ? 'Visuelle Anpassung' : 'Visual Branding'}
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primaryColor">
                    {language === 'fr' ? 'Couleur primaire' : language === 'de' ? 'Primärfarbe' : 'Primary Color'}
                  </Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => updateFormData('primaryColor', e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={formData.primaryColor}
                      onChange={(e) => updateFormData('primaryColor', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="secondaryColor">
                    {language === 'fr' ? 'Couleur secondaire' : language === 'de' ? 'Sekundärfarbe' : 'Secondary Color'}
                  </Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={formData.secondaryColor}
                      onChange={(e) => updateFormData('secondaryColor', e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={formData.secondaryColor}
                      onChange={(e) => updateFormData('secondaryColor', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              {language === 'fr' 
                ? 'Créez le compte de l\'administrateur principal de cette organisation.' 
                : language === 'de' 
                ? 'Erstellen Sie das Konto des Hauptadministrators dieser Organisation.' 
                : 'Create the main administrator account for this organization.'}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="adminFirstName">
                  {language === 'fr' ? 'Prénom' : language === 'de' ? 'Vorname' : 'First Name'} *
                </Label>
                <Input
                  id="adminFirstName"
                  value={formData.adminFirstName}
                  onChange={(e) => updateFormData('adminFirstName', e.target.value)}
                  placeholder="Jean"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="adminLastName">
                  {language === 'fr' ? 'Nom' : language === 'de' ? 'Nachname' : 'Last Name'} *
                </Label>
                <Input
                  id="adminLastName"
                  value={formData.adminLastName}
                  onChange={(e) => updateFormData('adminLastName', e.target.value)}
                  placeholder="Dupont"
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="adminEmail">
                {language === 'fr' ? 'Email' : language === 'de' ? 'E-Mail' : 'Email'} *
              </Label>
              <Input
                id="adminEmail"
                type="email"
                value={formData.adminEmail}
                onChange={(e) => updateFormData('adminEmail', e.target.value)}
                placeholder="admin@organization.com"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="adminRole">
                {language === 'fr' ? 'Rôle' : language === 'de' ? 'Rolle' : 'Role'} *
              </Label>
              <Select value={formData.adminRole} onValueChange={(value) => updateFormData('adminRole', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">
                    {language === 'fr' ? 'Administrateur' : language === 'de' ? 'Administrator' : 'Administrator'}
                  </SelectItem>
                  <SelectItem value="manager">
                    {language === 'fr' ? 'Gestionnaire' : language === 'de' ? 'Manager' : 'Manager'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-blue-800">
                {language === 'fr' 
                  ? 'Un email de bienvenue avec un lien de connexion sera envoyé à cette adresse.' 
                  : language === 'de' 
                  ? 'Eine Willkommens-E-Mail mit einem Anmeldelink wird an diese Adresse gesendet.' 
                  : 'A welcome email with a login link will be sent to this address.'}
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              {language === 'fr' 
                ? 'Activez les modules de participation souhaités pour cette organisation.' 
                : language === 'de' 
                ? 'Aktivieren Sie die gewünschten Partizipationsmodule für diese Organisation.' 
                : 'Enable the desired participation modules for this organization.'}
            </p>

            <div className="space-y-4">
              {[
                {
                  id: 'modulesVotes',
                  label: language === 'fr' ? 'Votes & Référendums' : language === 'de' ? 'Abstimmungen & Referenden' : 'Votes & Referendums',
                  description: language === 'fr' ? 'Permettre aux citoyens de voter sur des décisions importantes' : language === 'de' ? 'Bürgern ermöglichen, über wichtige Entscheidungen abzustimmen' : 'Allow citizens to vote on important decisions'
                },
                {
                  id: 'modulesDebates',
                  label: language === 'fr' ? 'Débats & Consultations' : language === 'de' ? 'Debatten & Konsultationen' : 'Debates & Consultations',
                  description: language === 'fr' ? 'Organiser des espaces de discussion publics' : language === 'de' ? 'Öffentliche Diskussionsräume organisieren' : 'Organize public discussion spaces'
                },
                {
                  id: 'modulesInitiatives',
                  label: language === 'fr' ? 'Initiatives & Pétitions' : language === 'de' ? 'Initiativen & Petitionen' : 'Initiatives & Petitions',
                  description: language === 'fr' ? 'Recueillir des signatures pour des propositions citoyennes' : language === 'de' ? 'Unterschriften für Bürgervorschläge sammeln' : 'Collect signatures for citizen proposals'
                },
                {
                  id: 'modulesAssemblies',
                  label: language === 'fr' ? 'Assemblées citoyennes' : language === 'de' ? 'Bürgerversammlungen' : 'Citizen Assemblies',
                  description: language === 'fr' ? 'Créer et gérer des assemblées délibératives' : language === 'de' ? 'Deliberative Versammlungen erstellen und verwalten' : 'Create and manage deliberative assemblies'
                },
                {
                  id: 'modulesConferences',
                  label: language === 'fr' ? 'Conférences & Événements' : language === 'de' ? 'Konferenzen & Veranstaltungen' : 'Conferences & Events',
                  description: language === 'fr' ? 'Organiser des événements participatifs en ligne et hors ligne' : language === 'de' ? 'Online- und Offline-Partizipationsveranstaltungen organisieren' : 'Organize online and offline participatory events'
                }
              ].map((module) => (
                <Card key={module.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{module.label}</h4>
                      <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                    </div>
                    <Switch
                      checked={formData[module.id as keyof WizardData] as boolean}
                      onCheckedChange={(checked) => updateFormData(module.id, checked)}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              {language === 'fr' 
                ? 'Configurez les paramètres de sécurité pour cette organisation.' 
                : language === 'de' 
                ? 'Konfigurieren Sie die Sicherheitseinstellungen für diese Organisation.' 
                : 'Configure security settings for this organization.'}
            </p>

            <Card className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {language === 'fr' ? 'Authentification multi-facteurs (MFA)' : language === 'de' ? 'Mehrstufige Authentifizierung (MFA)' : 'Multi-Factor Authentication (MFA)'}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {language === 'fr' ? 'Exiger l\'authentification à deux facteurs pour tous les utilisateurs' : language === 'de' ? 'Zwei-Faktor-Authentifizierung für alle Benutzer erforderlich' : 'Require two-factor authentication for all users'}
                  </p>
                </div>
                <Switch
                  checked={formData.mfaRequired}
                  onCheckedChange={(checked) => updateFormData('mfaRequired', checked)}
                />
              </div>
            </Card>

            <div>
              <Label htmlFor="passwordMinLength">
                {language === 'fr' ? 'Longueur minimale du mot de passe' : language === 'de' ? 'Mindestlänge des Passworts' : 'Minimum Password Length'}
              </Label>
              <Input
                id="passwordMinLength"
                type="number"
                min="8"
                max="32"
                value={formData.passwordMinLength}
                onChange={(e) => updateFormData('passwordMinLength', parseInt(e.target.value))}
                className="mt-2"
              />
              <p className="text-xs text-gray-500 mt-1">
                {language === 'fr' ? 'Recommandé: 12 caractères minimum' : language === 'de' ? 'Empfohlen: mindestens 12 Zeichen' : 'Recommended: 12 characters minimum'}
              </p>
            </div>

            <Card className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {language === 'fr' ? 'Restrictions IP' : language === 'de' ? 'IP-Beschränkungen' : 'IP Restrictions'}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {language === 'fr' ? 'Limiter l\'accès à des plages d\'adresses IP spécifiques' : language === 'de' ? 'Zugriff auf bestimmte IP-Bereiche beschränken' : 'Restrict access to specific IP address ranges'}
                  </p>
                </div>
                <Switch
                  checked={formData.ipRestrictions}
                  onCheckedChange={(checked) => updateFormData('ipRestrictions', checked)}
                />
              </div>
            </Card>

            <div>
              <Label htmlFor="sessionTimeout">
                {language === 'fr' ? 'Délai d\'expiration de session (minutes)' : language === 'de' ? 'Sitzungs-Timeout (Minuten)' : 'Session Timeout (minutes)'}
              </Label>
              <Input
                id="sessionTimeout"
                type="number"
                min="15"
                max="120"
                value={formData.sessionTimeout}
                onChange={(e) => updateFormData('sessionTimeout', parseInt(e.target.value))}
                className="mt-2"
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {language === 'fr' ? 'Récapitulatif de la configuration' : language === 'de' ? 'Konfigurationsübersicht' : 'Configuration Summary'}
              </h3>
              <p className="text-gray-600">
                {language === 'fr' 
                  ? 'Vérifiez les informations avant de créer l\'organisation' 
                  : language === 'de' 
                  ? 'Überprüfen Sie die Informationen, bevor Sie die Organisation erstellen' 
                  : 'Review the information before creating the organization'}
              </p>
            </div>

            <div className="space-y-4">
              <Card className="p-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  {language === 'fr' ? 'Informations générales' : language === 'de' ? 'Allgemeine Informationen' : 'General Information'}
                </h4>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">{language === 'fr' ? 'Nom' : language === 'de' ? 'Name' : 'Name'}:</dt>
                    <dd className="font-medium">{formData.name || '-'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Slug:</dt>
                    <dd className="font-medium">{formData.slug || '-'}</dd>
                  </div>
                </dl>
              </Card>

              <Card className="p-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {language === 'fr' ? 'Administrateur' : language === 'de' ? 'Administrator' : 'Administrator'}
                </h4>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">{language === 'fr' ? 'Nom complet' : language === 'de' ? 'Vollständiger Name' : 'Full Name'}:</dt>
                    <dd className="font-medium">{formData.adminFirstName} {formData.adminLastName}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Email:</dt>
                    <dd className="font-medium">{formData.adminEmail || '-'}</dd>
                  </div>
                </dl>
              </Card>

              <Card className="p-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  {language === 'fr' ? 'Modules activés' : language === 'de' ? 'Aktivierte Module' : 'Enabled Modules'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {formData.modulesVotes && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {language === 'fr' ? 'Votes' : language === 'de' ? 'Abstimmungen' : 'Votes'}
                    </span>
                  )}
                  {formData.modulesDebates && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {language === 'fr' ? 'Débats' : language === 'de' ? 'Debatten' : 'Debates'}
                    </span>
                  )}
                  {formData.modulesInitiatives && (
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                      {language === 'fr' ? 'Initiatives' : language === 'de' ? 'Initiativen' : 'Initiatives'}
                    </span>
                  )}
                  {formData.modulesAssemblies && (
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                      {language === 'fr' ? 'Assemblées' : language === 'de' ? 'Versammlungen' : 'Assemblies'}
                    </span>
                  )}
                  {formData.modulesConferences && (
                    <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm">
                      {language === 'fr' ? 'Conférences' : language === 'de' ? 'Konferenzen' : 'Conferences'}
                    </span>
                  )}
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  {language === 'fr' ? 'Sécurité' : language === 'de' ? 'Sicherheit' : 'Security'}
                </h4>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">MFA:</dt>
                    <dd className="font-medium">{formData.mfaRequired ? 
                      (language === 'fr' ? 'Requis' : language === 'de' ? 'Erforderlich' : 'Required') : 
                      (language === 'fr' ? 'Optionnel' : language === 'de' ? 'Optional' : 'Optional')}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">{language === 'fr' ? 'Mot de passe min' : language === 'de' ? 'Min. Passwort' : 'Min. Password'}:</dt>
                    <dd className="font-medium">{formData.passwordMinLength} {language === 'fr' ? 'caractères' : language === 'de' ? 'Zeichen' : 'characters'}</dd>
                  </div>
                </dl>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {language === 'fr' ? 'Créer une nouvelle organisation' : language === 'de' ? 'Neue Organisation erstellen' : 'Create New Organization'}
        </h2>
        <p className="text-gray-600 mt-1">
          {language === 'fr' ? 'Étape' : language === 'de' ? 'Schritt' : 'Step'} {currentStep} {language === 'fr' ? 'sur' : language === 'de' ? 'von' : 'of'} {totalSteps}
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;
          
          return (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-2 flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isCompleted
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className={`text-xs text-center hidden lg:block ${isCurrent ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`h-0.5 flex-1 ${isCompleted ? 'bg-emerald-500' : 'bg-gray-200'}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-[400px]"
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          {language === 'fr' ? 'Précédent' : language === 'de' ? 'Zurück' : 'Previous'}
        </Button>

        {currentStep < totalSteps ? (
          <Button
            onClick={handleNext}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {language === 'fr' ? 'Suivant' : language === 'de' ? 'Weiter' : 'Next'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600"
          >
            <Check className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Créer l\'organisation' : language === 'de' ? 'Organisation erstellen' : 'Create Organization'}
          </Button>
        )}
      </div>
    </div>
  );
}