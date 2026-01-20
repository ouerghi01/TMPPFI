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
import { Badge } from '../../../components/ui/badge';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Calendar, Trash2, AlertTriangle } from 'lucide-react';

// New Event Dialog
interface NewEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
}

export function NewEventDialog({ open, onOpenChange, onSubmit }: NewEventDialogProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    title: '',
    type: 'consultation',
    date: '',
    time: '',
    location: '',
    description: '',
    maxParticipants: '',
    status: 'upcoming',
    isOnline: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    onOpenChange(false);
    // Reset form
    setFormData({
      title: '',
      type: 'consultation',
      date: '',
      time: '',
      location: '',
      description: '',
      maxParticipants: '',
      status: 'upcoming',
      isOnline: false
    });
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {language === 'fr' ? 'Créer un nouvel événement' :
             language === 'de' ? 'Neues Ereignis erstellen' :
             'Create New Event'}
          </DialogTitle>
          <DialogDescription>
            {language === 'fr' ? 'Planifiez un événement dans le calendrier participatif' :
             language === 'de' ? 'Planen Sie ein Ereignis im partizipativen Kalender' :
             'Schedule an event in the participatory calendar'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">
                {language === 'fr' ? 'Titre de l\'événement' :
                 language === 'de' ? 'Titel der Veranstaltung' :
                 'Event Title'} *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder={language === 'fr' ? 'Ex: Concertation mobilité urbaine' :
                            language === 'de' ? 'Z.B.: Konsultation urbane Mobilität' :
                            'e.g., Urban mobility consultation'}
                required
              />
            </div>

            {/* Type */}
            <div className="space-y-2">
              <Label htmlFor="type">
                {language === 'fr' ? 'Type d\'événement' :
                 language === 'de' ? 'Art der Veranstaltung' :
                 'Event Type'} *
              </Label>
              <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">
                    {language === 'fr' ? 'Concertation' :
                     language === 'de' ? 'Konsultation' :
                     'Consultation'}
                  </SelectItem>
                  <SelectItem value="assembly">
                    {language === 'fr' ? 'Assemblée citoyenne' :
                     language === 'de' ? 'Bürgerversammlung' :
                     'Citizens Assembly'}
                  </SelectItem>
                  <SelectItem value="conference">
                    {language === 'fr' ? 'Conférence' :
                     language === 'de' ? 'Konferenz' :
                     'Conference'}
                  </SelectItem>
                  <SelectItem value="vote">
                    {language === 'fr' ? 'Vote / Référendum' :
                     language === 'de' ? 'Abstimmung / Referendum' :
                     'Vote / Referendum'}
                  </SelectItem>
                  <SelectItem value="deadline">
                    {language === 'fr' ? 'Échéance' :
                     language === 'de' ? 'Frist' :
                     'Deadline'}
                  </SelectItem>
                  <SelectItem value="workshop">
                    {language === 'fr' ? 'Atelier participatif' :
                     language === 'de' ? 'Partizipativer Workshop' :
                     'Participatory Workshop'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">
                  {language === 'fr' ? 'Date' :
                   language === 'de' ? 'Datum' :
                   'Date'} *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">
                  {language === 'fr' ? 'Heure' :
                   language === 'de' ? 'Uhrzeit' :
                   'Time'}
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleChange('time', e.target.value)}
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">
                {language === 'fr' ? 'Lieu / Adresse' :
                 language === 'de' ? 'Ort / Adresse' :
                 'Location / Address'}
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder={language === 'fr' ? 'Ex: Salle du Conseil, Rue de...' :
                            language === 'de' ? 'Z.B.: Ratssaal, Straße...' :
                            'e.g., Council Room, Street...'}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {language === 'fr' ? 'Laissez vide si l\'événement est en ligne uniquement' :
                 language === 'de' ? 'Leer lassen, wenn die Veranstaltung nur online ist' :
                 'Leave blank if event is online only'}
              </p>
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
                placeholder={language === 'fr' ? 'Décrivez l\'événement et son objectif...' :
                            language === 'de' ? 'Beschreiben Sie die Veranstaltung und ihren Zweck...' :
                            'Describe the event and its purpose...'}
                rows={4}
              />
            </div>

            {/* Max Participants */}
            <div className="space-y-2">
              <Label htmlFor="maxParticipants">
                {language === 'fr' ? 'Nombre maximum de participants' :
                 language === 'de' ? 'Maximale Teilnehmerzahl' :
                 'Maximum Participants'}
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
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {language === 'fr' ? 'Annuler' :
               language === 'de' ? 'Abbrechen' :
               'Cancel'}
            </Button>
            <Button type="submit">
              {language === 'fr' ? 'Créer l\'événement' :
               language === 'de' ? 'Ereignis erstellen' :
               'Create Event'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Edit Event Dialog
interface EditEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: any | null;
  onSubmit?: (data: any) => void;
}

export function EditEventDialog({ open, onOpenChange, event, onSubmit }: EditEventDialogProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    title: '',
    type: 'consultation',
    date: '',
    time: '',
    location: '',
    description: '',
    maxParticipants: '',
    status: 'upcoming'
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        type: event.type || 'consultation',
        date: event.date || '',
        time: event.time || '',
        location: event.location || '',
        description: event.description || '',
        maxParticipants: event.maxParticipants?.toString() || '',
        status: event.status || 'upcoming'
      });
    }
  }, [event]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ id: event?.id, ...formData });
    onOpenChange(false);
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {language === 'fr' ? 'Modifier l\'événement' :
             language === 'de' ? 'Ereignis bearbeiten' :
             'Edit Event'}
          </DialogTitle>
          <DialogDescription>
            {language === 'fr' ? `Modification de "${event.title}"` :
             language === 'de' ? `Bearbeiten von "${event.title}"` :
             `Editing "${event.title}"`}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* Event ID and Stats */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-700 dark:text-blue-300">ID</p>
                  <p className="font-medium text-blue-900 dark:text-blue-100 mt-1">{event.id}</p>
                </div>
                <div>
                  <p className="text-blue-700 dark:text-blue-300">
                    {language === 'fr' ? 'Participants inscrits' :
                     language === 'de' ? 'Angemeldete Teilnehmer' :
                     'Registered Participants'}
                  </p>
                  <p className="font-medium text-blue-900 dark:text-blue-100 mt-1">
                    {event.participants || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Same form fields as NewEventDialog */}
            <div className="space-y-2">
              <Label htmlFor="title">
                {language === 'fr' ? 'Titre de l\'événement' :
                 language === 'de' ? 'Titel der Veranstaltung' :
                 'Event Title'} *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">
                {language === 'fr' ? 'Type d\'événement' :
                 language === 'de' ? 'Art der Veranstaltung' :
                 'Event Type'} *
              </Label>
              <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Concertation</SelectItem>
                  <SelectItem value="assembly">Assemblée citoyenne</SelectItem>
                  <SelectItem value="conference">Conférence</SelectItem>
                  <SelectItem value="vote">Vote / Référendum</SelectItem>
                  <SelectItem value="deadline">Échéance</SelectItem>
                  <SelectItem value="workshop">Atelier participatif</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Heure</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleChange('time', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Lieu</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">
                    {language === 'fr' ? 'À venir' :
                     language === 'de' ? 'Bevorstehend' :
                     'Upcoming'}
                  </SelectItem>
                  <SelectItem value="ongoing">
                    {language === 'fr' ? 'En cours' :
                     language === 'de' ? 'Laufend' :
                     'Ongoing'}
                  </SelectItem>
                  <SelectItem value="completed">
                    {language === 'fr' ? 'Terminé' :
                     language === 'de' ? 'Abgeschlossen' :
                     'Completed'}
                  </SelectItem>
                  <SelectItem value="cancelled">
                    {language === 'fr' ? 'Annulé' :
                     language === 'de' ? 'Abgesagt' :
                     'Cancelled'}
                  </SelectItem>
                </SelectContent>
              </Select>
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

// Delete Event Dialog
interface DeleteEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: any | null;
  onConfirm?: () => void;
}

export function DeleteEventDialog({ open, onOpenChange, event, onConfirm }: DeleteEventDialogProps) {
  const { language } = useLanguage();

  const handleConfirm = () => {
    onConfirm?.();
    onOpenChange(false);
  };

  if (!event) return null;

  const hasParticipants = event.participants && event.participants > 0;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[500px]">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <AlertDialogTitle>
              {language === 'fr' ? 'Supprimer l\'événement' :
               language === 'de' ? 'Ereignis löschen' :
               'Delete Event'}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="space-y-4 pt-4">
            {hasParticipants && (
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                <p className="text-sm text-amber-900 dark:text-amber-200 font-medium">
                  {language === 'fr' ? '⚠️ Attention' :
                   language === 'de' ? '⚠️ Achtung' :
                   '⚠️ Warning'}
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-2">
                  {language === 'fr' ? 
                    `${event.participants} participants sont inscrits à cet événement. Ils seront automatiquement notifiés de l'annulation.` :
                   language === 'de' ?
                    `${event.participants} Teilnehmer sind für diese Veranstaltung registriert. Sie werden automatisch über die Absage benachrichtigt.` :
                    `${event.participants} participants are registered for this event. They will be automatically notified of the cancellation.`}
                </p>
              </div>
            )}

            <p className="text-sm text-gray-700 dark:text-gray-300">
              {language === 'fr' ? 
                'Êtes-vous sûr de vouloir supprimer cet événement du calendrier ?' :
               language === 'de' ?
                'Sind Sie sicher, dass Sie dieses Ereignis aus dem Kalender löschen möchten?' :
                'Are you sure you want to delete this event from the calendar?'}
            </p>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-2">
              <p className="font-medium text-gray-900 dark:text-white">{event.title}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">
                  {new Date(event.date).toLocaleDateString('fr-FR')}
                </Badge>
                {event.time && (
                  <Badge variant="outline">{event.time}</Badge>
                )}
                <Badge variant="outline" className="capitalize">{event.type}</Badge>
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
