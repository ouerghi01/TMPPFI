import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../../components/ui/alert-dialog';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Checkbox } from '../../../components/ui/checkbox';
import { useLanguage } from '../../../contexts/LanguageContext';
import { AlertTriangle, Trash2 } from 'lucide-react';

interface DeleteUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: any | null;
  onConfirm?: (options: { deleteContributions: boolean; notifyUser: boolean }) => void;
}

export function DeleteUserDialog({ open, onOpenChange, user, onConfirm }: DeleteUserDialogProps) {
  const { language } = useLanguage();
  const [confirmText, setConfirmText] = useState('');
  const [deleteContributions, setDeleteContributions] = useState(false);
  const [notifyUser, setNotifyUser] = useState(true);

  const handleConfirm = () => {
    if (confirmText === user?.name) {
      onConfirm?.({ deleteContributions, notifyUser });
      onOpenChange(false);
      // Reset state
      setConfirmText('');
      setDeleteContributions(false);
      setNotifyUser(true);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    // Reset state
    setConfirmText('');
    setDeleteContributions(false);
    setNotifyUser(true);
  };

  if (!user) return null;

  const isConfirmEnabled = confirmText === user.name;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[550px]">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <AlertDialogTitle>
                {language === 'fr' ? 'Supprimer l\'utilisateur' :
                 language === 'de' ? 'Benutzer löschen' :
                 'Delete User'}
              </AlertDialogTitle>
            </div>
          </div>
          <AlertDialogDescription className="space-y-4 pt-4">
            {/* Warning Message */}
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-900 dark:text-red-200 font-medium">
                {language === 'fr' ? '⚠️ Cette action est irréversible' :
                 language === 'de' ? '⚠️ Diese Aktion ist unwiderruflich' :
                 '⚠️ This action is irreversible'}
              </p>
              <p className="text-sm text-red-700 dark:text-red-300 mt-2">
                {language === 'fr' ? 
                  'Vous êtes sur le point de supprimer définitivement le compte utilisateur suivant :' :
                 language === 'de' ?
                  'Sie sind dabei, das folgende Benutzerkonto dauerhaft zu löschen:' :
                  'You are about to permanently delete the following user account:'}
              </p>
            </div>

            {/* User Info */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">
                    {language === 'fr' ? 'Nom complet' :
                     language === 'de' ? 'Vollständiger Name' :
                     'Full Name'}
                  </p>
                  <p className="text-base font-semibold text-gray-900 dark:text-white mt-1">
                    {user.name}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {language === 'fr' ? 'Email' :
                     language === 'de' ? 'E-Mail' :
                     'Email'}
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{user.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {language === 'fr' ? 'Rôle' :
                     language === 'de' ? 'Rolle' :
                     'Role'}
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white mt-1 capitalize">{user.role}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {language === 'fr' ? 'Contributions' :
                     language === 'de' ? 'Beiträge' :
                     'Contributions'}
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{user.contributions || 0}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">ID</p>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{user.id}</p>
                </div>
              </div>
            </div>

            {/* Deletion Options */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-900 dark:text-white">
                {language === 'fr' ? 'Options de suppression' :
                 language === 'de' ? 'Löschoptionen' :
                 'Deletion Options'}
              </Label>
              
              <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Checkbox
                  id="deleteContributions"
                  checked={deleteContributions}
                  onCheckedChange={(checked) => setDeleteContributions(checked as boolean)}
                />
                <div className="space-y-1 leading-none">
                  <label
                    htmlFor="deleteContributions"
                    className="text-sm font-medium cursor-pointer text-gray-900 dark:text-white"
                  >
                    {language === 'fr' ? 'Supprimer aussi les contributions' :
                     language === 'de' ? 'Beiträge ebenfalls löschen' :
                     'Also delete contributions'}
                  </label>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {language === 'fr' ? 
                      'Supprime tous les commentaires, propositions et votes de cet utilisateur' :
                     language === 'de' ?
                      'Löscht alle Kommentare, Vorschläge und Abstimmungen dieses Benutzers' :
                      'Deletes all comments, proposals, and votes from this user'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Checkbox
                  id="notifyUser"
                  checked={notifyUser}
                  onCheckedChange={(checked) => setNotifyUser(checked as boolean)}
                />
                <div className="space-y-1 leading-none">
                  <label
                    htmlFor="notifyUser"
                    className="text-sm font-medium cursor-pointer text-gray-900 dark:text-white"
                  >
                    {language === 'fr' ? 'Notifier l\'utilisateur' :
                     language === 'de' ? 'Benutzer benachrichtigen' :
                     'Notify user'}
                  </label>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {language === 'fr' ? 
                      'Envoie un email de confirmation de suppression à l\'utilisateur' :
                     language === 'de' ?
                      'Sendet eine Bestätigungs-E-Mail an den Benutzer' :
                      'Send a deletion confirmation email to the user'}
                  </p>
                </div>
              </div>
            </div>

            {/* Confirmation Input */}
            <div className="space-y-2">
              <Label htmlFor="confirmText" className="text-sm font-medium text-gray-900 dark:text-white">
                {language === 'fr' ? 
                  `Pour confirmer, tapez "${user.name}"` :
                 language === 'de' ?
                  `Zur Bestätigung geben Sie "${user.name}" ein` :
                  `To confirm, type "${user.name}"`}
              </Label>
              <Input
                id="confirmText"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder={user.name}
                className="font-mono"
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            {language === 'fr' ? 'Annuler' :
             language === 'de' ? 'Abbrechen' :
             'Cancel'}
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={!isConfirmEnabled}
            className="gap-2"
          >
            <Trash2 className="w-4 h-4" />
            {language === 'fr' ? 'Supprimer définitivement' :
             language === 'de' ? 'Dauerhaft löschen' :
             'Delete Permanently'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
