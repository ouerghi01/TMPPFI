import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Textarea } from '../../../components/ui/textarea';
import { Switch } from '../../../components/ui/switch';
import { Badge } from '../../../components/ui/badge';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Mail, Send, FileText } from 'lucide-react';

interface EmailUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: any | null;
  onSubmit?: (data: any) => void;
}

const EMAIL_TEMPLATES = [
  {
    id: 'custom',
    name: 'Message personnalisé',
    subject: '',
    body: ''
  },
  {
    id: 'welcome',
    name: 'Bienvenue sur CiviAgora',
    subject: 'Bienvenue sur la plateforme CiviAgora',
    body: `Bonjour {name},

Nous sommes ravis de vous accueillir sur CiviAgora, la plateforme de démocratie participative de la Région de Bruxelles-Capitale.

Votre compte a été créé avec succès. Vous pouvez dès maintenant vous connecter et participer aux différents processus démocratiques en cours.

Pour toute question, n'hésitez pas à nous contacter.

Cordialement,
L'équipe CiviAgora`
  },
  {
    id: 'password_reset',
    name: 'Réinitialisation du mot de passe',
    subject: 'Réinitialisation de votre mot de passe',
    body: `Bonjour {name},

Vous avez demandé la réinitialisation de votre mot de passe sur CiviAgora.

Cliquez sur le lien ci-dessous pour créer un nouveau mot de passe :
{reset_link}

Ce lien expirera dans 24 heures.

Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email.

Cordialement,
L'équipe CiviAgora`
  },
  {
    id: 'account_update',
    name: 'Mise à jour de compte',
    subject: 'Votre compte a été mis à jour',
    body: `Bonjour {name},

Votre compte CiviAgora a été mis à jour par un administrateur.

Si vous avez des questions concernant ces modifications, veuillez contacter l'équipe administrative.

Cordialement,
L'équipe CiviAgora`
  },
  {
    id: 'role_change',
    name: 'Changement de rôle',
    subject: 'Votre rôle a été modifié',
    body: `Bonjour {name},

Votre rôle sur la plateforme CiviAgora a été modifié.

Nouveau rôle : {role}

Cela peut affecter vos permissions et votre accès à certaines fonctionnalités.

Pour toute question, n'hésitez pas à nous contacter.

Cordialement,
L'équipe CiviAgora`
  }
];

export function EmailUserDialog({ open, onOpenChange, user, onSubmit }: EmailUserDialogProps) {
  const { language } = useLanguage();
  const [selectedTemplate, setSelectedTemplate] = useState('custom');
  const [formData, setFormData] = useState({
    subject: '',
    body: '',
    sendCopy: false
  });

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = EMAIL_TEMPLATES.find(t => t.id === templateId);
    if (template) {
      // Replace placeholders
      const subject = template.subject.replace('{name}', user?.name || '');
      const body = template.body
        .replace('{name}', user?.name || '')
        .replace('{email}', user?.email || '')
        .replace('{role}', user?.role || '')
        .replace('{reset_link}', '[Lien de réinitialisation généré automatiquement]');
      
      setFormData(prev => ({
        ...prev,
        subject,
        body
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({
      userId: user?.id,
      to: user?.email,
      ...formData
    });
    onOpenChange(false);
    // Reset form
    setSelectedTemplate('custom');
    setFormData({
      subject: '',
      body: '',
      sendCopy: false
    });
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            {language === 'fr' ? 'Envoyer un email' :
             language === 'de' ? 'E-Mail senden' :
             'Send Email'}
          </DialogTitle>
          <DialogDescription>
            {language === 'fr' ? `Envoyer un message à ${user.name}` :
             language === 'de' ? `Nachricht an ${user.name} senden` :
             `Send a message to ${user.name}`}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* Recipient Info */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <Label className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'fr' ? 'Destinataire' :
                     language === 'de' ? 'Empfänger' :
                     'Recipient'}
                  </Label>
                  <p className="font-medium text-gray-900 dark:text-white mt-1">{user.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1 mt-1">
                    <Mail className="w-3 h-3" />
                    {user.email}
                  </p>
                </div>
                <Badge className="bg-blue-50 text-blue-600 border border-blue-200">
                  {user.role}
                </Badge>
              </div>
            </div>

            {/* Template Selection */}
            <div className="space-y-2">
              <Label htmlFor="template" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                {language === 'fr' ? 'Modèle de message' :
                 language === 'de' ? 'Nachrichtenvorlage' :
                 'Message Template'}
              </Label>
              <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EMAIL_TEMPLATES.map(template => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject">
                {language === 'fr' ? 'Objet' :
                 language === 'de' ? 'Betreff' :
                 'Subject'} *
              </Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                placeholder={language === 'fr' ? 'Objet du message' :
                            language === 'de' ? 'Betreff der Nachricht' :
                            'Message subject'}
                required
              />
            </div>

            {/* Body */}
            <div className="space-y-2">
              <Label htmlFor="body">
                {language === 'fr' ? 'Message' :
                 language === 'de' ? 'Nachricht' :
                 'Message'} *
              </Label>
              <Textarea
                id="body"
                value={formData.body}
                onChange={(e) => handleChange('body', e.target.value)}
                placeholder={language === 'fr' ? 'Contenu du message...' :
                            language === 'de' ? 'Nachrichteninhalt...' :
                            'Message content...'}
                rows={12}
                required
                className="font-mono text-sm"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {language === 'fr' ? 'Utilisez {name}, {email}, {role} comme variables' :
                 language === 'de' ? 'Verwenden Sie {name}, {email}, {role} als Variablen' :
                 'Use {name}, {email}, {role} as variables'}
              </p>
            </div>

            {/* Send Copy */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="sendCopy" className="text-base cursor-pointer">
                  {language === 'fr' ? 'M\'envoyer une copie' :
                   language === 'de' ? 'Kopie an mich senden' :
                   'Send me a copy'}
                </Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'fr' ? 'Recevoir une copie de cet email' :
                   language === 'de' ? 'Eine Kopie dieser E-Mail erhalten' :
                   'Receive a copy of this email'}
                </p>
              </div>
              <Switch
                id="sendCopy"
                checked={formData.sendCopy}
                onCheckedChange={(checked) => handleChange('sendCopy', checked)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {language === 'fr' ? 'Annuler' :
               language === 'de' ? 'Abbrechen' :
               'Cancel'}
            </Button>
            <Button type="submit" className="gap-2">
              <Send className="w-4 h-4" />
              {language === 'fr' ? 'Envoyer l\'email' :
               language === 'de' ? 'E-Mail senden' :
               'Send Email'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}