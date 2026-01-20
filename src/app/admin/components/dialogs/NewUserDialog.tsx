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
import { useLanguage } from '../../../contexts/LanguageContext';

interface NewUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
}

export function NewUserDialog({ open, onOpenChange, onSubmit }: NewUserDialogProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'user',
    status: 'active',
    sendWelcomeEmail: true,
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    onOpenChange(false);
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      role: 'user',
      status: 'active',
      sendWelcomeEmail: true,
      notes: ''
    });
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {language === 'fr' ? 'Créer un nouvel utilisateur' :
             language === 'de' ? 'Neuen Benutzer erstellen' :
             'Create New User'}
          </DialogTitle>
          <DialogDescription>
            {language === 'fr' ? 'Ajoutez un nouvel utilisateur à la plateforme CiviAgora' :
             language === 'de' ? 'Fügen Sie einen neuen Benutzer zur CiviAgora-Plattform hinzu' :
             'Add a new user to the CiviAgora platform'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  {language === 'fr' ? 'Prénom' :
                   language === 'de' ? 'Vorname' :
                   'First Name'} *
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  placeholder={language === 'fr' ? 'Ex: Marie' :
                              language === 'de' ? 'Z.B.: Marie' :
                              'e.g., Marie'}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">
                  {language === 'fr' ? 'Nom' :
                   language === 'de' ? 'Nachname' :
                   'Last Name'} *
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  placeholder={language === 'fr' ? 'Ex: Dupont' :
                              language === 'de' ? 'Z.B.: Dupont' :
                              'e.g., Dupont'}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                {language === 'fr' ? 'Email professionnel' :
                 language === 'de' ? 'Berufliche E-Mail' :
                 'Professional Email'} *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="marie.dupont@bruxelles.be"
                required
              />
            </div>

            {/* Role and Status */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">
                  {language === 'fr' ? 'Rôle' :
                   language === 'de' ? 'Rolle' :
                   'Role'} *
                </Label>
                <Select value={formData.role} onValueChange={(value) => handleChange('role', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">
                      {language === 'fr' ? 'Administrateur système' :
                       language === 'de' ? 'Systemadministrator' :
                       'System Administrator'}
                    </SelectItem>
                    <SelectItem value="manager">
                      {language === 'fr' ? 'Gestionnaire institutionnel' :
                       language === 'de' ? 'Institutioneller Verwalter' :
                       'Institutional Manager'}
                    </SelectItem>
                    <SelectItem value="moderator">
                      {language === 'fr' ? 'Modérateur de contenu' :
                       language === 'de' ? 'Content-Moderator' :
                       'Content Moderator'}
                    </SelectItem>
                    <SelectItem value="observer">
                      {language === 'fr' ? 'Observateur / Auditeur' :
                       language === 'de' ? 'Beobachter / Prüfer' :
                       'Observer / Auditor'}
                    </SelectItem>
                    <SelectItem value="user">
                      {language === 'fr' ? 'Utilisateur standard' :
                       language === 'de' ? 'Standardbenutzer' :
                       'Standard User'}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">
                  {language === 'fr' ? 'Statut' :
                   language === 'de' ? 'Status' :
                   'Status'}
                </Label>
                <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">
                      {language === 'fr' ? 'Actif' :
                       language === 'de' ? 'Aktiv' :
                       'Active'}
                    </SelectItem>
                    <SelectItem value="inactive">
                      {language === 'fr' ? 'Inactif' :
                       language === 'de' ? 'Inaktiv' :
                       'Inactive'}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">
                {language === 'fr' ? 'Notes administratives' :
                 language === 'de' ? 'Administrative Notizen' :
                 'Administrative Notes'}
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder={language === 'fr' ? 'Notes internes (non visibles par l\'utilisateur)' :
                            language === 'de' ? 'Interne Notizen (für Benutzer nicht sichtbar)' :
                            'Internal notes (not visible to user)'}
                rows={3}
              />
            </div>

            {/* Send Welcome Email */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="sendWelcomeEmail" className="text-base">
                  {language === 'fr' ? 'Envoyer un email de bienvenue' :
                   language === 'de' ? 'Willkommens-E-Mail senden' :
                   'Send welcome email'}
                </Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'fr' ? 'L\'utilisateur recevra un lien d\'activation' :
                   language === 'de' ? 'Der Benutzer erhält einen Aktivierungslink' :
                   'User will receive an activation link'}
                </p>
              </div>
              <Switch
                id="sendWelcomeEmail"
                checked={formData.sendWelcomeEmail}
                onCheckedChange={(checked) => handleChange('sendWelcomeEmail', checked)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {language === 'fr' ? 'Annuler' :
               language === 'de' ? 'Abbrechen' :
               'Cancel'}
            </Button>
            <Button type="submit">
              {language === 'fr' ? 'Créer l\'utilisateur' :
               language === 'de' ? 'Benutzer erstellen' :
               'Create User'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
