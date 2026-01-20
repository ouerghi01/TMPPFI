import React, { useState, useEffect } from 'react';
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
import { useLanguage } from '../../../contexts/LanguageContext';

interface EditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: any | null;
  onSubmit?: (data: any) => void;
}

export function EditUserDialog({ open, onOpenChange, user, onSubmit }: EditUserDialogProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'user',
    status: 'active',
    notes: ''
  });

  useEffect(() => {
    if (user) {
      const [firstName, lastName] = user.name ? user.name.split(' ') : ['', ''];
      setFormData({
        firstName: firstName || '',
        lastName: lastName || '',
        email: user.email || '',
        role: user.role || 'user',
        status: user.status || 'active',
        notes: user.notes || ''
      });
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ id: user?.id, ...formData });
    onOpenChange(false);
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {language === 'fr' ? 'Modifier l\'utilisateur' :
             language === 'de' ? 'Benutzer bearbeiten' :
             'Edit User'}
          </DialogTitle>
          <DialogDescription>
            {language === 'fr' ? `Modification du profil de ${user.name}` :
             language === 'de' ? `Profil von ${user.name} bearbeiten` :
             `Editing profile of ${user.name}`}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* User ID (read-only) */}
            <div className="space-y-2">
              <Label htmlFor="userId" className="text-gray-600 dark:text-gray-400">
                {language === 'fr' ? 'ID Utilisateur' :
                 language === 'de' ? 'Benutzer-ID' :
                 'User ID'}
              </Label>
              <Input
                id="userId"
                value={user.id}
                disabled
                className="bg-gray-100 dark:bg-gray-800"
              />
            </div>

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

            {/* Activity Info */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {language === 'fr' ? 'Dernière connexion' :
                     language === 'de' ? 'Letzte Anmeldung' :
                     'Last login'}
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white mt-1">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('fr-FR') : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {language === 'fr' ? 'Contributions' :
                     language === 'de' ? 'Beiträge' :
                     'Contributions'}
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white mt-1">
                    {user.contributions || 0}
                  </p>
                </div>
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
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {language === 'fr' ? 'Annuler' :
               language === 'de' ? 'Abbrechen' :
               'Cancel'}
            </Button>
            <Button type="submit">
              {language === 'fr' ? 'Enregistrer les modifications' :
               language === 'de' ? 'Änderungen speichern' :
               'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
