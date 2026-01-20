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
import { AlertTriangle, Trash2, Users } from 'lucide-react';

interface DeleteProcessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  process: any | null;
  onConfirm?: (options: { archiveData: boolean; notifyParticipants: boolean }) => void;
}

export function DeleteProcessDialog({ open, onOpenChange, process, onConfirm }: DeleteProcessDialogProps) {
  const { language } = useLanguage();
  const [confirmText, setConfirmText] = useState('');
  const [archiveData, setArchiveData] = useState(true);
  const [notifyParticipants, setNotifyParticipants] = useState(false);

  const handleConfirm = () => {
    if (confirmText.toLowerCase() === 'supprimer') {
      onConfirm?.({ archiveData, notifyParticipants });
      onOpenChange(false);
      // Reset state
      setConfirmText('');
      setArchiveData(true);
      setNotifyParticipants(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    // Reset state
    setConfirmText('');
    setArchiveData(true);
    setNotifyParticipants(false);
  };

  if (!process) return null;

  const isConfirmEnabled = confirmText.toLowerCase() === 'supprimer';

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[600px]">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <AlertDialogTitle>
                {language === 'fr' ? 'Supprimer le processus participatif' :
                 language === 'de' ? 'Partizipativen Prozess löschen' :
                 'Delete Participatory Process'}
              </AlertDialogTitle>
            </div>
          </div>
          <AlertDialogDescription className="space-y-4 pt-4">
            {/* Warning Message */}
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-900 dark:text-red-200 font-medium">
                {language === 'fr' ? '⚠️ Attention : Action irréversible' :
                 language === 'de' ? '⚠️ Achtung: Unwiderrufliche Aktion' :
                 '⚠️ Warning: Irreversible Action'}
              </p>
              <p className="text-sm text-red-700 dark:text-red-300 mt-2">
                {language === 'fr' ? 
                  'Vous êtes sur le point de supprimer définitivement ce processus participatif. Cette action supprimera toutes les données associées, y compris les contributions des citoyens.' :
                 language === 'de' ?
                  'Sie sind dabei, diesen partizipativen Prozess dauerhaft zu löschen. Diese Aktion löscht alle zugehörigen Daten, einschließlich der Bürgerbeiträge.' :
                  'You are about to permanently delete this participatory process. This action will remove all associated data, including citizen contributions.'}
              </p>
            </div>

            {/* Process Info */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-3">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {language === 'fr' ? 'Titre du processus' :
                   language === 'de' ? 'Prozesstitel' :
                   'Process Title'}
                </p>
                <p className="text-base font-semibold text-gray-900 dark:text-white mt-1">
                  {process.title}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">ID</p>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{process.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {language === 'fr' ? 'Statut' :
                     language === 'de' ? 'Status' :
                     'Status'}
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white mt-1 capitalize">{process.status}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {language === 'fr' ? 'Phase' :
                     language === 'de' ? 'Phase' :
                     'Phase'}
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white mt-1 capitalize">{process.phase}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {language === 'fr' ? 'Participants' :
                     language === 'de' ? 'Teilnehmer' :
                     'Participants'}
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white mt-1 flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {process.participants || 0}
                  </p>
                </div>
              </div>

              {process.themes && process.themes.length > 0 && (
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {language === 'fr' ? 'Thèmes' :
                     language === 'de' ? 'Themen' :
                     'Themes'}
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">
                    {process.themes.join(', ')}
                  </p>
                </div>
              )}
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
                  id="archiveData"
                  checked={archiveData}
                  onCheckedChange={(checked) => setArchiveData(checked as boolean)}
                />
                <div className="space-y-1 leading-none">
                  <label
                    htmlFor="archiveData"
                    className="text-sm font-medium cursor-pointer text-gray-900 dark:text-white"
                  >
                    {language === 'fr' ? 'Archiver les données avant suppression' :
                     language === 'de' ? 'Daten vor dem Löschen archivieren' :
                     'Archive data before deletion'}
                  </label>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {language === 'fr' ? 
                      'Créer une sauvegarde des contributions et données pour conformité réglementaire' :
                     language === 'de' ?
                      'Erstellen Sie eine Sicherung der Beiträge und Daten zur Einhaltung von Vorschriften' :
                      'Create a backup of contributions and data for regulatory compliance'}
                  </p>
                </div>
              </div>

              {process.participants > 0 && (
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Checkbox
                    id="notifyParticipants"
                    checked={notifyParticipants}
                    onCheckedChange={(checked) => setNotifyParticipants(checked as boolean)}
                  />
                  <div className="space-y-1 leading-none">
                    <label
                      htmlFor="notifyParticipants"
                      className="text-sm font-medium cursor-pointer text-gray-900 dark:text-white"
                    >
                      {language === 'fr' ? 'Notifier les participants' :
                       language === 'de' ? 'Teilnehmer benachrichtigen' :
                       'Notify participants'}
                    </label>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {language === 'fr' ? 
                        `Envoyer un email aux ${process.participants} participants pour les informer` :
                       language === 'de' ?
                        `Eine E-Mail an ${process.participants} Teilnehmer senden, um sie zu informieren` :
                        `Send an email to ${process.participants} participants to inform them`}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Confirmation Input */}
            <div className="space-y-2">
              <Label htmlFor="confirmText" className="text-sm font-medium text-gray-900 dark:text-white">
                {language === 'fr' ? 
                  'Pour confirmer, tapez "SUPPRIMER" en majuscules' :
                 language === 'de' ?
                  'Zur Bestätigung geben Sie "SUPPRIMER" in Großbuchstaben ein' :
                  'To confirm, type "SUPPRIMER" in uppercase'}
              </Label>
              <Input
                id="confirmText"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="SUPPRIMER"
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
