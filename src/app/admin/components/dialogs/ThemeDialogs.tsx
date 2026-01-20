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
import { Shield, Trash2, AlertTriangle } from 'lucide-react';

// New Theme Dialog
interface NewThemeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
}

export function NewThemeDialog({ open, onOpenChange, onSubmit }: NewThemeDialogProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    nameFR: '',
    nameDE: '',
    nameEN: '',
    descriptionFR: '',
    descriptionDE: '',
    descriptionEN: '',
    color: 'blue',
    icon: '📋',
    status: 'active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    onOpenChange(false);
    // Reset form
    setFormData({
      nameFR: '',
      nameDE: '',
      nameEN: '',
      descriptionFR: '',
      descriptionDE: '',
      descriptionEN: '',
      color: 'blue',
      icon: '📋',
      status: 'active'
    });
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const colorOptions = [
    { value: 'green', label: 'Vert', class: 'bg-green-100 text-green-800' },
    { value: 'blue', label: 'Bleu', class: 'bg-blue-100 text-blue-800' },
    { value: 'purple', label: 'Violet', class: 'bg-purple-100 text-purple-800' },
    { value: 'yellow', label: 'Jaune', class: 'bg-yellow-100 text-yellow-800' },
    { value: 'red', label: 'Rouge', class: 'bg-red-100 text-red-800' },
    { value: 'pink', label: 'Rose', class: 'bg-pink-100 text-pink-800' },
    { value: 'indigo', label: 'Indigo', class: 'bg-indigo-100 text-indigo-800' },
    { value: 'amber', label: 'Ambre', class: 'bg-amber-100 text-amber-800' }
  ];

  const iconOptions = [
    '🌱', '🏢', '🚇', '📚', '🏥', '🎭', '🏛️', '💼', '⚡', '🌍', '🎨', '🔬', '🏃', '👥', '💡', '🌳'
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            {language === 'fr' ? 'Créer un nouveau thème' :
             language === 'de' ? 'Neues Thema erstellen' :
             'Create New Theme'}
          </DialogTitle>
          <DialogDescription>
            {language === 'fr' ? 'Ajoutez une nouvelle thématique transversale à la plateforme' :
             language === 'de' ? 'Fügen Sie ein neues übergreifendes Thema zur Plattform hinzu' :
             'Add a new cross-cutting theme to the platform'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* Names in three languages */}
            <div className="space-y-4">
              <Label className="text-base font-medium">
                {language === 'fr' ? 'Nom du thème (multilingue)' :
                 language === 'de' ? 'Name des Themas (mehrsprachig)' :
                 'Theme Name (multilingual)'}
              </Label>
              
              <div className="space-y-2">
                <Label htmlFor="nameFR">
                  🇫🇷 Français *
                </Label>
                <Input
                  id="nameFR"
                  value={formData.nameFR}
                  onChange={(e) => handleChange('nameFR', e.target.value)}
                  placeholder="Ex: Environnement & climat"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nameDE">
                  🇩🇪 Deutsch *
                </Label>
                <Input
                  id="nameDE"
                  value={formData.nameDE}
                  onChange={(e) => handleChange('nameDE', e.target.value)}
                  placeholder="z.B.: Umwelt & Klima"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nameEN">
                  🇬🇧 English *
                </Label>
                <Input
                  id="nameEN"
                  value={formData.nameEN}
                  onChange={(e) => handleChange('nameEN', e.target.value)}
                  placeholder="e.g., Environment & climate"
                  required
                />
              </div>
            </div>

            {/* Descriptions */}
            <div className="space-y-4">
              <Label className="text-base font-medium">
                {language === 'fr' ? 'Description (optionnel)' :
                 language === 'de' ? 'Beschreibung (optional)' :
                 'Description (optional)'}
              </Label>
              
              <div className="space-y-2">
                <Label htmlFor="descriptionFR" className="text-sm">
                  🇫🇷 Français
                </Label>
                <Textarea
                  id="descriptionFR"
                  value={formData.descriptionFR}
                  onChange={(e) => handleChange('descriptionFR', e.target.value)}
                  placeholder="Description en français..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descriptionDE" className="text-sm">
                  🇩🇪 Deutsch
                </Label>
                <Textarea
                  id="descriptionDE"
                  value={formData.descriptionDE}
                  onChange={(e) => handleChange('descriptionDE', e.target.value)}
                  placeholder="Beschreibung auf Deutsch..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descriptionEN" className="text-sm">
                  🇬🇧 English
                </Label>
                <Textarea
                  id="descriptionEN"
                  value={formData.descriptionEN}
                  onChange={(e) => handleChange('descriptionEN', e.target.value)}
                  placeholder="Description in English..."
                  rows={2}
                />
              </div>
            </div>

            {/* Visual Settings */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="color">
                  {language === 'fr' ? 'Couleur' :
                   language === 'de' ? 'Farbe' :
                   'Color'}
                </Label>
                <Select value={formData.color} onValueChange={(value) => handleChange('color', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map(color => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded ${color.class}`}></div>
                          {color.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">
                  {language === 'fr' ? 'Icône' :
                   language === 'de' ? 'Symbol' :
                   'Icon'}
                </Label>
                <Select value={formData.icon} onValueChange={(value) => handleChange('icon', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map(icon => (
                      <SelectItem key={icon} value={icon}>
                        <span className="text-xl">{icon}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Preview */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Label className="text-sm mb-2 block">
                {language === 'fr' ? 'Aperçu' :
                 language === 'de' ? 'Vorschau' :
                 'Preview'}
              </Label>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{formData.icon}</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {formData.nameFR || 'Nom du thème'}
                  </p>
                  <Badge className={colorOptions.find(c => c.value === formData.color)?.class}>
                    {formData.color}
                  </Badge>
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
              {language === 'fr' ? 'Créer le thème' :
               language === 'de' ? 'Thema erstellen' :
               'Create Theme'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Edit Theme Dialog
interface EditThemeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  theme: any | null;
  onSubmit?: (data: any) => void;
}

export function EditThemeDialog({ open, onOpenChange, theme, onSubmit }: EditThemeDialogProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    nameFR: '',
    nameDE: '',
    nameEN: '',
    descriptionFR: '',
    descriptionDE: '',
    descriptionEN: '',
    color: 'blue',
    icon: '📋',
    status: 'active'
  });

  useEffect(() => {
    if (theme) {
      setFormData({
        nameFR: theme.name || '',
        nameDE: theme.nameDE || '',
        nameEN: theme.nameEN || '',
        descriptionFR: theme.descriptionFR || '',
        descriptionDE: theme.descriptionDE || '',
        descriptionEN: theme.descriptionEN || '',
        color: theme.color || 'blue',
        icon: theme.icon || '📋',
        status: theme.status || 'active'
      });
    }
  }, [theme]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ id: theme?.id, ...formData });
    onOpenChange(false);
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!theme) return null;

  const colorOptions = [
    { value: 'green', label: 'Vert', class: 'bg-green-100 text-green-800' },
    { value: 'blue', label: 'Bleu', class: 'bg-blue-100 text-blue-800' },
    { value: 'purple', label: 'Violet', class: 'bg-purple-100 text-purple-800' },
    { value: 'yellow', label: 'Jaune', class: 'bg-yellow-100 text-yellow-800' },
    { value: 'red', label: 'Rouge', class: 'bg-red-100 text-red-800' },
    { value: 'pink', label: 'Rose', class: 'bg-pink-100 text-pink-800' },
    { value: 'indigo', label: 'Indigo', class: 'bg-indigo-100 text-indigo-800' },
    { value: 'amber', label: 'Ambre', class: 'bg-amber-100 text-amber-800' }
  ];

  const iconOptions = [
    '🌱', '🏢', '🚇', '📚', '🏥', '🎭', '🏛️', '💼', '⚡', '🌍', '🎨', '🔬', '🏃', '👥', '💡', '🌳'
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            {language === 'fr' ? 'Modifier le thème' :
             language === 'de' ? 'Thema bearbeiten' :
             'Edit Theme'}
          </DialogTitle>
          <DialogDescription>
            {language === 'fr' ? `Modification du thème "${theme.name}"` :
             language === 'de' ? `Bearbeiten des Themas "${theme.name}"` :
             `Editing theme "${theme.name}"`}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* Theme ID and Stats */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-700 dark:text-blue-300">ID</p>
                  <p className="font-medium text-blue-900 dark:text-blue-100 mt-1">{theme.id}</p>
                </div>
                <div>
                  <p className="text-blue-700 dark:text-blue-300">
                    {language === 'fr' ? 'Processus associés' :
                     language === 'de' ? 'Zugehörige Prozesse' :
                     'Associated Processes'}
                  </p>
                  <p className="font-medium text-blue-900 dark:text-blue-100 mt-1">
                    {theme.processCount || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Same form fields as NewThemeDialog */}
            <div className="space-y-4">
              <Label className="text-base font-medium">
                {language === 'fr' ? 'Nom du thème (multilingue)' :
                 language === 'de' ? 'Name des Themas (mehrsprachig)' :
                 'Theme Name (multilingual)'}
              </Label>
              
              <div className="space-y-2">
                <Label htmlFor="nameFR">🇫🇷 Français *</Label>
                <Input
                  id="nameFR"
                  value={formData.nameFR}
                  onChange={(e) => handleChange('nameFR', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nameDE">🇩🇪 Deutsch *</Label>
                <Input
                  id="nameDE"
                  value={formData.nameDE}
                  onChange={(e) => handleChange('nameDE', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nameEN">🇬🇧 English *</Label>
                <Input
                  id="nameEN"
                  value={formData.nameEN}
                  onChange={(e) => handleChange('nameEN', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Visual Settings */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="color">
                  {language === 'fr' ? 'Couleur' :
                   language === 'de' ? 'Farbe' :
                   'Color'}
                </Label>
                <Select value={formData.color} onValueChange={(value) => handleChange('color', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map(color => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded ${color.class}`}></div>
                          {color.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">
                  {language === 'fr' ? 'Icône' :
                   language === 'de' ? 'Symbol' :
                   'Icon'}
                </Label>
                <Select value={formData.icon} onValueChange={(value) => handleChange('icon', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map(icon => (
                      <SelectItem key={icon} value={icon}>
                        <span className="text-xl">{icon}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Status */}
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

// Delete Theme Dialog
interface DeleteThemeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  theme: any | null;
  onConfirm?: () => void;
}

export function DeleteThemeDialog({ open, onOpenChange, theme, onConfirm }: DeleteThemeDialogProps) {
  const { language } = useLanguage();

  const handleConfirm = () => {
    onConfirm?.();
    onOpenChange(false);
  };

  if (!theme) return null;

  const hasProcesses = theme.processCount > 0;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[500px]">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <AlertDialogTitle>
              {language === 'fr' ? 'Supprimer le thème' :
               language === 'de' ? 'Thema löschen' :
               'Delete Theme'}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="space-y-4 pt-4">
            {hasProcesses ? (
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                <p className="text-sm text-amber-900 dark:text-amber-200 font-medium">
                  {language === 'fr' ? '⚠️ Attention' :
                   language === 'de' ? '⚠️ Achtung' :
                   '⚠️ Warning'}
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-2">
                  {language === 'fr' ? 
                    `Ce thème est associé à ${theme.processCount} processus actifs. La suppression retirera le thème de tous ces processus.` :
                   language === 'de' ?
                    `Dieses Thema ist mit ${theme.processCount} aktiven Prozessen verbunden. Das Löschen entfernt das Thema aus all diesen Prozessen.` :
                    `This theme is associated with ${theme.processCount} active processes. Deletion will remove the theme from all these processes.`}
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {language === 'fr' ? 
                  'Êtes-vous sûr de vouloir supprimer ce thème ?' :
                 language === 'de' ?
                  'Sind Sie sicher, dass Sie dieses Thema löschen möchten?' :
                  'Are you sure you want to delete this theme?'}
              </p>
            )}

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{theme.icon}</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{theme.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {theme.nameDE} • {theme.nameEN}
                  </p>
                </div>
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
