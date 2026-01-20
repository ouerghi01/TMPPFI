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
import { Label } from '../../../components/ui/label';
import { Switch } from '../../../components/ui/switch';
import { Badge } from '../../../components/ui/badge';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Shield, AlertCircle } from 'lucide-react';

interface PermissionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: any | null;
  onSubmit?: (data: any) => void;
}

interface Permission {
  key: string;
  label: string;
  description: string;
  defaultByRole: {
    admin: boolean;
    manager: boolean;
    moderator: boolean;
    observer: boolean;
    user: boolean;
  };
}

const PERMISSIONS: Permission[] = [
  {
    key: 'manage_users',
    label: 'Gérer les utilisateurs',
    description: 'Créer, modifier et supprimer des utilisateurs',
    defaultByRole: { admin: true, manager: true, moderator: false, observer: false, user: false }
  },
  {
    key: 'create_processes',
    label: 'Créer des processus',
    description: 'Initier de nouveaux processus participatifs',
    defaultByRole: { admin: true, manager: true, moderator: false, observer: false, user: false }
  },
  {
    key: 'moderate_content',
    label: 'Modérer les contenus',
    description: 'Approuver, modifier ou rejeter les contributions',
    defaultByRole: { admin: true, manager: true, moderator: true, observer: false, user: false }
  },
  {
    key: 'view_statistics',
    label: 'Voir les statistiques',
    description: 'Accéder aux tableaux de bord et rapports',
    defaultByRole: { admin: true, manager: true, moderator: true, observer: true, user: false }
  },
  {
    key: 'export_data',
    label: 'Exporter les données',
    description: 'Télécharger les données en CSV, PDF, etc.',
    defaultByRole: { admin: true, manager: true, moderator: false, observer: true, user: false }
  },
  {
    key: 'manage_themes',
    label: 'Gérer les thèmes',
    description: 'Créer et modifier les thématiques',
    defaultByRole: { admin: true, manager: true, moderator: false, observer: false, user: false }
  },
  {
    key: 'publish_results',
    label: 'Publier les résultats',
    description: 'Publier les résultats des processus',
    defaultByRole: { admin: true, manager: true, moderator: false, observer: false, user: false }
  },
  {
    key: 'system_config',
    label: 'Configuration système',
    description: 'Accéder aux paramètres globaux de la plateforme',
    defaultByRole: { admin: true, manager: false, moderator: false, observer: false, user: false }
  },
  {
    key: 'manage_calendar',
    label: 'Gérer le calendrier',
    description: 'Créer et modifier les événements',
    defaultByRole: { admin: true, manager: true, moderator: false, observer: false, user: false }
  },
  {
    key: 'send_notifications',
    label: 'Envoyer des notifications',
    description: 'Envoyer des emails et notifications aux citoyens',
    defaultByRole: { admin: true, manager: true, moderator: false, observer: false, user: false }
  }
];

export function PermissionsDialog({ open, onOpenChange, user, onSubmit }: PermissionsDialogProps) {
  const { language } = useLanguage();
  const [permissions, setPermissions] = useState<Record<string, boolean>>({});
  const [isCustomized, setIsCustomized] = useState(false);

  useEffect(() => {
    if (user) {
      // Initialize with default permissions for role
      const defaultPermissions: Record<string, boolean> = {};
      PERMISSIONS.forEach(perm => {
        defaultPermissions[perm.key] = perm.defaultByRole[user.role as keyof typeof perm.defaultByRole] || false;
      });
      setPermissions(defaultPermissions);
      setIsCustomized(false);
    }
  }, [user]);

  const handlePermissionChange = (key: string, value: boolean) => {
    setPermissions(prev => ({ ...prev, [key]: value }));
    setIsCustomized(true);
  };

  const handleResetToDefaults = () => {
    if (!user) return;
    const defaultPermissions: Record<string, boolean> = {};
    PERMISSIONS.forEach(perm => {
      defaultPermissions[perm.key] = perm.defaultByRole[user.role as keyof typeof perm.defaultByRole] || false;
    });
    setPermissions(defaultPermissions);
    setIsCustomized(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ userId: user?.id, permissions, isCustomized });
    onOpenChange(false);
  };

  if (!user) return null;

  const getRoleBadge = (role: string) => {
    const variants: Record<string, { label: string; color: string }> = {
      admin: { label: 'Administrateur', color: 'bg-red-100 text-red-700 border-red-200' },
      manager: { label: 'Gestionnaire', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      moderator: { label: 'Modérateur', color: 'bg-purple-100 text-purple-700 border-purple-200' },
      observer: { label: 'Observateur', color: 'bg-gray-100 text-gray-700 border-gray-200' },
      user: { label: 'Utilisateur', color: 'bg-green-100 text-green-700 border-green-200' }
    };
    const variant = variants[role] || variants.user;
    return <Badge className={`${variant.color} border`}>{variant.label}</Badge>;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            {language === 'fr' ? 'Gérer les permissions' :
             language === 'de' ? 'Berechtigungen verwalten' :
             'Manage Permissions'}
          </DialogTitle>
          <DialogDescription>
            {language === 'fr' ? `Configuration des permissions pour ${user.name}` :
             language === 'de' ? `Berechtigungskonfiguration für ${user.name}` :
             `Configure permissions for ${user.name}`}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            {/* User Info */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                </div>
                {getRoleBadge(user.role)}
              </div>
            </div>

            {/* Customization Alert */}
            {isCustomized && (
              <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
                    {language === 'fr' ? 'Permissions personnalisées' :
                     language === 'de' ? 'Benutzerdefinierte Berechtigungen' :
                     'Custom Permissions'}
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                    {language === 'fr' ? 'Les permissions diffèrent des valeurs par défaut du rôle' :
                     language === 'de' ? 'Die Berechtigungen unterscheiden sich von den Standardwerten der Rolle' :
                     'Permissions differ from role defaults'}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleResetToDefaults}
                    className="mt-2"
                  >
                    {language === 'fr' ? 'Réinitialiser aux valeurs par défaut' :
                     language === 'de' ? 'Auf Standardwerte zurücksetzen' :
                     'Reset to defaults'}
                  </Button>
                </div>
              </div>
            )}

            {/* Permissions List */}
            <div className="space-y-4">
              <Label className="text-base">
                {language === 'fr' ? 'Permissions accordées' :
                 language === 'de' ? 'Gewährte Berechtigungen' :
                 'Granted Permissions'}
              </Label>
              
              <div className="space-y-3">
                {PERMISSIONS.map((permission) => {
                  const isDefault = permission.defaultByRole[user.role as keyof typeof permission.defaultByRole];
                  const isEnabled = permissions[permission.key] || false;
                  
                  return (
                    <div
                      key={permission.key}
                      className={`flex items-start justify-between p-4 border rounded-lg ${
                        isEnabled
                          ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
                          : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={permission.key} className="cursor-pointer">
                            {permission.label}
                          </Label>
                          {isDefault && !isCustomized && (
                            <Badge variant="outline" className="text-xs">
                              {language === 'fr' ? 'Par défaut' :
                               language === 'de' ? 'Standard' :
                               'Default'}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {permission.description}
                        </p>
                      </div>
                      <Switch
                        id={permission.key}
                        checked={isEnabled}
                        onCheckedChange={(value) => handlePermissionChange(permission.key, value)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {language === 'fr' ? 'Annuler' :
               language === 'de' ? 'Abbrechen' :
               'Cancel'}
            </Button>
            <Button type="submit">
              {language === 'fr' ? 'Enregistrer les permissions' :
               language === 'de' ? 'Berechtigungen speichern' :
               'Save Permissions'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
