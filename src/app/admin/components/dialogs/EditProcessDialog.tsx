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
import { Badge } from '../../../components/ui/badge';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Layers } from 'lucide-react';

interface EditProcessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  process: any | null;
  onSubmit?: (data: any) => void;
}

export function EditProcessDialog({ open, onOpenChange, process, onSubmit }: EditProcessDialogProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'draft',
    phase: 'preparation',
    startDate: '',
    endDate: '',
    themes: [] as string[],
    maxParticipants: ''
  });

  useEffect(() => {
    if (process) {
      setFormData({
        title: process.title || '',
        description: process.description || '',
        status: process.status || 'draft',
        phase: process.phase || 'preparation',
        startDate: process.startDate || '',
        endDate: process.endDate || '',
        themes: process.themes || [],
        maxParticipants: process.maxParticipants?.toString() || ''
      });
    }
  }, [process]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ id: process?.id, ...formData });
    onOpenChange(false);
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!process) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Layers className="w-5 h-5" />
            {language === 'fr' ? 'Modifier le processus' :
             language === 'de' ? 'Prozess bearbeiten' :
             'Edit Process'}
          </DialogTitle>
          <DialogDescription>
            {language === 'fr' ? `Modification du processus "${process.title}"` :
             language === 'de' ? `Bearbeiten des Prozesses "${process.title}"` :
             `Editing process "${process.title}"`}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* Process ID */}
            <div className="space-y-2">
              <Label className="text-gray-600 dark:text-gray-400">
                {language === 'fr' ? 'ID Processus' :
                 language === 'de' ? 'Prozess-ID' :
                 'Process ID'}
              </Label>
              <Input value={process.id} disabled className="bg-gray-100 dark:bg-gray-800" />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">
                {language === 'fr' ? 'Titre du processus' :
                 language === 'de' ? 'Prozesstitel' :
                 'Process Title'} *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder={language === 'fr' ? 'Ex: Plan climat communal 2030' :
                            language === 'de' ? 'Z.B.: Kommunaler Klimaplan 2030' :
                            'e.g., Municipal Climate Plan 2030'}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                {language === 'fr' ? 'Description' :
                 language === 'de' ? 'Beschreibung' :
                 'Description'}
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder={language === 'fr' ? 'Décrivez les objectifs du processus...' :
                            language === 'de' ? 'Beschreiben Sie die Ziele des Prozesses...' :
                            'Describe the objectives of the process...'}
                rows={4}
              />
            </div>

            {/* Status and Phase */}
            <div className="grid grid-cols-2 gap-4">
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
                    <SelectItem value="draft">
                      {language === 'fr' ? 'Brouillon' :
                       language === 'de' ? 'Entwurf' :
                       'Draft'}
                    </SelectItem>
                    <SelectItem value="active">
                      {language === 'fr' ? 'Actif' :
                       language === 'de' ? 'Aktiv' :
                       'Active'}
                    </SelectItem>
                    <SelectItem value="upcoming">
                      {language === 'fr' ? 'À venir' :
                       language === 'de' ? 'Bevorstehend' :
                       'Upcoming'}
                    </SelectItem>
                    <SelectItem value="closed">
                      {language === 'fr' ? 'Terminé' :
                       language === 'de' ? 'Abgeschlossen' :
                       'Closed'}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phase">
                  {language === 'fr' ? 'Phase actuelle' :
                   language === 'de' ? 'Aktuelle Phase' :
                   'Current Phase'}
                </Label>
                <Select value={formData.phase} onValueChange={(value) => handleChange('phase', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="preparation">
                      {language === 'fr' ? 'Préparation' :
                       language === 'de' ? 'Vorbereitung' :
                       'Preparation'}
                    </SelectItem>
                    <SelectItem value="consultation">
                      {language === 'fr' ? 'Consultation' :
                       language === 'de' ? 'Konsultation' :
                       'Consultation'}
                    </SelectItem>
                    <SelectItem value="proposal">
                      {language === 'fr' ? 'Propositions' :
                       language === 'de' ? 'Vorschläge' :
                       'Proposals'}
                    </SelectItem>
                    <SelectItem value="vote">
                      {language === 'fr' ? 'Vote' :
                       language === 'de' ? 'Abstimmung' :
                       'Vote'}
                    </SelectItem>
                    <SelectItem value="results">
                      {language === 'fr' ? 'Résultats' :
                       language === 'de' ? 'Ergebnisse' :
                       'Results'}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">
                  {language === 'fr' ? 'Date de début' :
                   language === 'de' ? 'Startdatum' :
                   'Start Date'}
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleChange('startDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">
                  {language === 'fr' ? 'Date de fin' :
                   language === 'de' ? 'Enddatum' :
                   'End Date'}
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleChange('endDate', e.target.value)}
                />
              </div>
            </div>

            {/* Themes */}
            <div className="space-y-2">
              <Label>
                {language === 'fr' ? 'Thèmes associés' :
                 language === 'de' ? 'Zugehörige Themen' :
                 'Associated Themes'}
              </Label>
              <div className="flex flex-wrap gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg min-h-[60px]">
                {formData.themes.length > 0 ? (
                  formData.themes.map((theme, idx) => (
                    <Badge key={idx} variant="outline" className="capitalize">
                      {theme}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {language === 'fr' ? 'Aucun thème sélectionné' :
                     language === 'de' ? 'Keine Themen ausgewählt' :
                     'No themes selected'}
                  </p>
                )}
              </div>
            </div>

            {/* Max Participants */}
            <div className="space-y-2">
              <Label htmlFor="maxParticipants">
                {language === 'fr' ? 'Nombre maximum de participants (optionnel)' :
                 language === 'de' ? 'Maximale Teilnehmerzahl (optional)' :
                 'Maximum Participants (optional)'}
              </Label>
              <Input
                id="maxParticipants"
                type="number"
                min="0"
                value={formData.maxParticipants}
                onChange={(e) => handleChange('maxParticipants', e.target.value)}
                placeholder="0 = illimité"
              />
            </div>

            {/* Stats */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <Label className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-3 block">
                {language === 'fr' ? 'Statistiques actuelles' :
                 language === 'de' ? 'Aktuelle Statistiken' :
                 'Current Statistics'}
              </Label>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {language === 'fr' ? 'Participants' :
                     language === 'de' ? 'Teilnehmer' :
                     'Participants'}
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white mt-1">
                    {process.participants || 0}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {language === 'fr' ? 'Créé le' :
                     language === 'de' ? 'Erstellt am' :
                     'Created on'}
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white mt-1">
                    {process.createdAt ? new Date(process.createdAt).toLocaleDateString('fr-FR') : 'N/A'}
                  </p>
                </div>
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
