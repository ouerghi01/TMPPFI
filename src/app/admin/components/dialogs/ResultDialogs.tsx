import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
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
import { FileCheck, Trash2, AlertTriangle, Send, Upload } from 'lucide-react';

// New Result Dialog
interface NewResultDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
}

export function NewResultDialog({ open, onOpenChange, onSubmit }: NewResultDialogProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    title: '',
    processId: '',
    type: 'consultation',
    summary: '',
    detailedReport: '',
    keyFindings: '',
    nextSteps: '',
    attachments: [],
    scheduledPublishDate: '',
    publishImmediately: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    onOpenChange(false);
    // Reset form
    setFormData({
      title: '',
      processId: '',
      type: 'consultation',
      summary: '',
      detailedReport: '',
      keyFindings: '',
      nextSteps: '',
      attachments: [],
      scheduledPublishDate: '',
      publishImmediately: false
    });
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileCheck className="w-5 h-5" />
            {language === 'fr' ? 'Créer un nouveau résultat' :
             language === 'de' ? 'Neues Ergebnis erstellen' :
             'Create New Result'}
          </DialogTitle>
          <DialogDescription>
            {language === 'fr' ? 'Préparez les résultats d\'un processus participatif' :
             language === 'de' ? 'Bereiten Sie die Ergebnisse eines partizipativen Prozesses vor' :
             'Prepare results from a participatory process'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">
                {language === 'fr' ? 'Titre du résultat' :
                 language === 'de' ? 'Titel des Ergebnisses' :
                 'Result Title'} *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder={language === 'fr' ? 'Ex: Résultats - Concertation mobilité urbaine' :
                            language === 'de' ? 'Z.B.: Ergebnisse - Konsultation urbane Mobilität' :
                            'e.g., Results - Urban mobility consultation'}
                required
              />
            </div>

            {/* Process and Type */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="processId">
                  {language === 'fr' ? 'Processus associé' :
                   language === 'de' ? 'Zugehöriger Prozess' :
                   'Associated Process'} *
                </Label>
                <Select value={formData.processId} onValueChange={(value) => handleChange('processId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'fr' ? 'Sélectionner...' : 'Auswählen...'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Plan climat communal 2030</SelectItem>
                    <SelectItem value="2">Aménagement centre-ville</SelectItem>
                    <SelectItem value="3">Budget participatif 2027</SelectItem>
                    <SelectItem value="4">Mobilité douce</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">
                  {language === 'fr' ? 'Type' :
                   language === 'de' ? 'Typ' :
                   'Type'}
                </Label>
                <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultation">Concertation</SelectItem>
                    <SelectItem value="vote">Vote</SelectItem>
                    <SelectItem value="petition">Pétition</SelectItem>
                    <SelectItem value="assembly">Assemblée</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <Label htmlFor="summary">
                {language === 'fr' ? 'Résumé exécutif' :
                 language === 'de' ? 'Zusammenfassung' :
                 'Executive Summary'} *
              </Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => handleChange('summary', e.target.value)}
                placeholder={language === 'fr' ? 'Résumé en 2-3 paragraphes des principaux résultats...' :
                            language === 'de' ? 'Zusammenfassung in 2-3 Absätzen der wichtigsten Ergebnisse...' :
                            'Summary in 2-3 paragraphs of the main findings...'}
                rows={4}
                required
              />
            </div>

            {/* Key Findings */}
            <div className="space-y-2">
              <Label htmlFor="keyFindings">
                {language === 'fr' ? 'Principaux résultats' :
                 language === 'de' ? 'Wichtigste Ergebnisse' :
                 'Key Findings'}
              </Label>
              <Textarea
                id="keyFindings"
                value={formData.keyFindings}
                onChange={(e) => handleChange('keyFindings', e.target.value)}
                placeholder={language === 'fr' ? 'Liste des principales conclusions (une par ligne)' :
                            language === 'de' ? 'Liste der wichtigsten Schlussfolgerungen (eine pro Zeile)' :
                            'List of main conclusions (one per line)'}
                rows={6}
              />
            </div>

            {/* Next Steps */}
            <div className="space-y-2">
              <Label htmlFor="nextSteps">
                {language === 'fr' ? 'Prochaines étapes' :
                 language === 'de' ? 'Nächste Schritte' :
                 'Next Steps'}
              </Label>
              <Textarea
                id="nextSteps"
                value={formData.nextSteps}
                onChange={(e) => handleChange('nextSteps', e.target.value)}
                placeholder={language === 'fr' ? 'Comment les résultats seront utilisés, prochaines actions...' :
                            language === 'de' ? 'Wie die Ergebnisse verwendet werden, nächste Aktionen...' :
                            'How results will be used, next actions...'}
                rows={4}
              />
            </div>

            {/* File Upload Placeholder */}
            <div className="space-y-2">
              <Label>
                {language === 'fr' ? 'Documents annexes' :
                 language === 'de' ? 'Anhänge' :
                 'Attachments'}
              </Label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'fr' ? 'Cliquez pour télécharger ou glissez-déposez' :
                   language === 'de' ? 'Klicken zum Hochladen oder Drag & Drop' :
                   'Click to upload or drag and drop'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  PDF, XLSX, DOC (max. 10MB)
                </p>
              </div>
            </div>

            {/* Publication Options */}
            <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <Label className="text-base font-medium">
                {language === 'fr' ? 'Options de publication' :
                 language === 'de' ? 'Veröffentlichungsoptionen' :
                 'Publication Options'}
              </Label>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="publishImmediately" className="text-base cursor-pointer">
                    {language === 'fr' ? 'Publier immédiatement' :
                     language === 'de' ? 'Sofort veröffentlichen' :
                     'Publish Immediately'}
                  </Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'fr' ? 'Les résultats seront visibles publiquement' :
                     language === 'de' ? 'Die Ergebnisse werden öffentlich sichtbar sein' :
                     'Results will be publicly visible'}
                  </p>
                </div>
                <Switch
                  id="publishImmediately"
                  checked={formData.publishImmediately}
                  onCheckedChange={(checked) => handleChange('publishImmediately', checked)}
                />
              </div>

              {!formData.publishImmediately && (
                <div className="space-y-2">
                  <Label htmlFor="scheduledPublishDate">
                    {language === 'fr' ? 'Date de publication programmée' :
                     language === 'de' ? 'Geplantes Veröffentlichungsdatum' :
                     'Scheduled Publication Date'}
                  </Label>
                  <Input
                    id="scheduledPublishDate"
                    type="datetime-local"
                    value={formData.scheduledPublishDate}
                    onChange={(e) => handleChange('scheduledPublishDate', e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {language === 'fr' ? 'Annuler' :
               language === 'de' ? 'Abbrechen' :
               'Cancel'}
            </Button>
            <Button type="submit">
              {formData.publishImmediately ? (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  {language === 'fr' ? 'Créer et publier' :
                   language === 'de' ? 'Erstellen und veröffentlichen' :
                   'Create and Publish'}
                </>
              ) : (
                language === 'fr' ? 'Enregistrer comme brouillon' :
                language === 'de' ? 'Als Entwurf speichern' :
                'Save as Draft'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Edit Result Dialog (similar structure to New)
interface EditResultDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: any | null;
  onSubmit?: (data: any) => void;
}

export function EditResultDialog({ open, onOpenChange, result, onSubmit }: EditResultDialogProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    keyFindings: '',
    nextSteps: '',
    scheduledPublishDate: ''
  });

  useEffect(() => {
    if (result) {
      setFormData({
        title: result.title || '',
        summary: result.summary || '',
        keyFindings: result.keyFindings || '',
        nextSteps: result.nextSteps || '',
        scheduledPublishDate: result.scheduledDate || ''
      });
    }
  }, [result]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ id: result?.id, ...formData });
    onOpenChange(false);
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!result) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileCheck className="w-5 h-5" />
            {language === 'fr' ? 'Modifier le résultat' :
             language === 'de' ? 'Ergebnis bearbeiten' :
             'Edit Result'}
          </DialogTitle>
          <DialogDescription>
            {language === 'fr' ? `Modification de "${result.title}"` :
             language === 'de' ? `Bearbeiten von "${result.title}"` :
             `Editing "${result.title}"`}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* Status Info */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-blue-700 dark:text-blue-300">Statut</p>
                  <Badge className="mt-1 capitalize">{result.status}</Badge>
                </div>
                <div>
                  <p className="text-blue-700 dark:text-blue-300">Vues</p>
                  <p className="font-medium text-blue-900 dark:text-blue-100 mt-1">
                    {result.views || 0}
                  </p>
                </div>
                <div>
                  <p className="text-blue-700 dark:text-blue-300">Téléchargements</p>
                  <p className="font-medium text-blue-900 dark:text-blue-100 mt-1">
                    {result.downloads || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Form fields */}
            <div className="space-y-2">
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Résumé exécutif *</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => handleChange('summary', e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="keyFindings">Principaux résultats</Label>
              <Textarea
                id="keyFindings"
                value={formData.keyFindings}
                onChange={(e) => handleChange('keyFindings', e.target.value)}
                rows={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nextSteps">Prochaines étapes</Label>
              <Textarea
                id="nextSteps"
                value={formData.nextSteps}
                onChange={(e) => handleChange('nextSteps', e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">
              Enregistrer les modifications
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Publish Result Dialog
interface PublishResultDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: any | null;
  onConfirm?: (options: { notifyParticipants: boolean; sendPressRelease: boolean }) => void;
}

export function PublishResultDialog({ open, onOpenChange, result, onConfirm }: PublishResultDialogProps) {
  const { language } = useLanguage();
  const [notifyParticipants, setNotifyParticipants] = useState(true);
  const [sendPressRelease, setSendPressRelease] = useState(false);

  const handleConfirm = () => {
    onConfirm?.({ notifyParticipants, sendPressRelease });
    onOpenChange(false);
    setNotifyParticipants(true);
    setSendPressRelease(false);
  };

  if (!result) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            {language === 'fr' ? 'Publier les résultats' :
             language === 'de' ? 'Ergebnisse veröffentlichen' :
             'Publish Results'}
          </DialogTitle>
          <DialogDescription>
            {language === 'fr' ? 'Les résultats seront visibles publiquement sur la plateforme' :
             language === 'de' ? 'Die Ergebnisse werden auf der Plattform öffentlich sichtbar sein' :
             'Results will be publicly visible on the platform'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Result Info */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="font-medium text-gray-900 dark:text-white">{result.title}</p>
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
              <Badge variant="outline" className="capitalize">{result.type}</Badge>
              <span>•</span>
              <span>{result.participants} participants</span>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <input
                type="checkbox"
                id="notifyParticipants"
                checked={notifyParticipants}
                onChange={(e) => setNotifyParticipants(e.target.checked)}
                className="mt-1"
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
                    `Envoyer un email aux ${result.participants} participants` :
                   language === 'de' ?
                    `E-Mail an ${result.participants} Teilnehmer senden` :
                    `Send email to ${result.participants} participants`}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <input
                type="checkbox"
                id="sendPressRelease"
                checked={sendPressRelease}
                onChange={(e) => setSendPressRelease(e.target.checked)}
                className="mt-1"
              />
              <div className="space-y-1 leading-none">
                <label
                  htmlFor="sendPressRelease"
                  className="text-sm font-medium cursor-pointer text-gray-900 dark:text-white"
                >
                  {language === 'fr' ? 'Envoyer un communiqué de presse' :
                   language === 'de' ? 'Pressemitteilung senden' :
                   'Send press release'}
                </label>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {language === 'fr' ? 
                    'Informer les médias de la publication des résultats' :
                   language === 'de' ?
                    'Medien über die Veröffentlichung informieren' :
                    'Inform media about results publication'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {language === 'fr' ? 'Annuler' :
             language === 'de' ? 'Abbrechen' :
             'Cancel'}
          </Button>
          <Button onClick={handleConfirm} className="gap-2">
            <Send className="w-4 h-4" />
            {language === 'fr' ? 'Publier maintenant' :
             language === 'de' ? 'Jetzt veröffentlichen' :
             'Publish Now'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Delete Result Dialog
interface DeleteResultDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: any | null;
  onConfirm?: () => void;
}

export function DeleteResultDialog({ open, onOpenChange, result, onConfirm }: DeleteResultDialogProps) {
  const { language } = useLanguage();

  const handleConfirm = () => {
    onConfirm?.();
    onOpenChange(false);
  };

  if (!result) return null;

  const isPublished = result.status === 'published';

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[500px]">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <AlertDialogTitle>
              {language === 'fr' ? 'Supprimer le résultat' :
               language === 'de' ? 'Ergebnis löschen' :
               'Delete Result'}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="space-y-4 pt-4">
            {isPublished && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-900 dark:text-red-200 font-medium">
                  {language === 'fr' ? '⚠️ Attention' :
                   language === 'de' ? '⚠️ Achtung' :
                   '⚠️ Warning'}
                </p>
                <p className="text-sm text-red-700 dark:text-red-300 mt-2">
                  {language === 'fr' ? 
                    'Ce résultat est actuellement publié et visible par les citoyens. La suppression le retirera de la plateforme.' :
                   language === 'de' ?
                    'Dieses Ergebnis ist derzeit veröffentlicht und für Bürger sichtbar. Das Löschen entfernt es von der Plattform.' :
                    'This result is currently published and visible to citizens. Deletion will remove it from the platform.'}
                </p>
              </div>
            )}

            <p className="text-sm text-gray-700 dark:text-gray-300">
              {language === 'fr' ? 
                'Êtes-vous sûr de vouloir supprimer ce résultat ?' :
               language === 'de' ?
                'Sind Sie sicher, dass Sie dieses Ergebnis löschen möchten?' :
                'Are you sure you want to delete this result?'}
            </p>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-2">
              <p className="font-medium text-gray-900 dark:text-white">{result.title}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="capitalize">{result.type}</Badge>
                <Badge variant="outline" className="capitalize">{result.status}</Badge>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {language === 'fr' ? 'Annuler' :
             language === 'de' ? 'Abbrechen' :
             'Cancel'}
          </Button>
          <Button variant="destructive" onClick={handleConfirm} className="gap-2">
            <Trash2 className="w-4 h-4" />
            {language === 'fr' ? 'Supprimer' :
             language === 'de' ? 'Löschen' :
             'Delete'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
