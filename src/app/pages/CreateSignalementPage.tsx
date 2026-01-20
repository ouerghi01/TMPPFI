import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { PageBanner } from '../components/PageBanner';
import { PageLayout } from '../components/layout/PageLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useCreateSignalement } from '../hooks/useApi';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { toast } from 'sonner';
import { AlertCircle, MapPin, Upload, X, Loader2 } from 'lucide-react';
import type { CreateSignalementDTO, SignalementCategory } from '../types';

export function CreateSignalementPage() {
  const { t, language, tLocal } = useLanguage();
  const navigate = useNavigate();
  const createMutation = useCreateSignalement();

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<SignalementCategory | ''>('');
  const [themeId, setThemeId] = useState('');
  const [locationName, setLocationName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [images, setImages] = useState<File[]>([]);

  // Fetch themes for dropdown
  const { data: themes } = useQuery({
    queryKey: ['themes'],
    queryFn: async () => {
      const response = await apiService.themes.getThemes({});
      return response.data;
    },
  });

  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, { fr: string; de: string; en: string }> = {
      infrastructure: { fr: 'Infrastructure', de: 'Infrastruktur', en: 'Infrastructure' },
      cleanliness: { fr: 'Propreté', de: 'Sauberkeit', en: 'Cleanliness' },
      safety: { fr: 'Sécurité', de: 'Sicherheit', en: 'Safety' },
      environment: { fr: 'Environnement', de: 'Umwelt', en: 'Environment' },
      public_space: { fr: 'Espace public', de: 'Öffentlicher Raum', en: 'Public space' },
      transport: { fr: 'Transport', de: 'Transport', en: 'Transport' },
      noise: { fr: 'Nuisances sonores', de: 'Lärmbelästigung', en: 'Noise' },
      other: { fr: 'Autre', de: 'Andere', en: 'Other' },
    };
    return labels[cat]?.[language] || cat;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages(prev => [...prev, ...newFiles]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!title || !description) {
      toast.error(
        language === 'fr' ? 'Le titre et la description sont obligatoires' :
        language === 'de' ? 'Titel und Beschreibung sind erforderlich' :
        'Title and description are required'
      );
      return;
    }

    if (!category) {
      toast.error(
        language === 'fr' ? 'Veuillez sélectionner une catégorie' :
        language === 'de' ? 'Bitte wählen Sie eine Kategorie' :
        'Please select a category'
      );
      return;
    }

    if (!themeId) {
      toast.error(
        language === 'fr' ? 'Veuillez sélectionner un thème' :
        language === 'de' ? 'Bitte wählen Sie ein Thema' :
        'Please select a theme'
      );
      return;
    }

    if (!address || !city || !postalCode || !lat || !lng) {
      toast.error(
        language === 'fr' ? 'Veuillez remplir tous les champs de localisation' :
        language === 'de' ? 'Bitte füllen Sie alle Standortfelder aus' :
        'Please fill in all location fields'
      );
      return;
    }

    const data: CreateSignalementDTO = {
      title: {
        fr: title,
        de: title,
        en: title,
      },
      description: {
        fr: description,
        de: description,
        en: description,
      },
      category: category as SignalementCategory,
      themeId,
      location: {
        name: locationName || address,
        address,
        city,
        postalCode,
        coordinates: {
          lat: parseFloat(lat),
          lng: parseFloat(lng),
        },
      },
      images: images.length > 0 ? images : undefined,
    };

    try {
      await createMutation.mutateAsync(data);
      toast.success(
        language === 'fr' ? 'Signalement créé avec succès !' :
        language === 'de' ? 'Meldung erfolgreich erstellt!' :
        'Report created successfully!'
      );
      navigate('/signalements');
    } catch (error) {
      toast.error(
        language === 'fr' ? 'Erreur lors de la création du signalement' :
        language === 'de' ? 'Fehler beim Erstellen der Meldung' :
        'Error creating report'
      );
    }
  };

  return (
    <div>
      <PageBanner
        title={
          language === 'fr' ? 'Créer un signalement' :
          language === 'de' ? 'Meldung erstellen' :
          'Create Report'
        }
        description={
          language === 'fr' ? 'Signalez un problème dans votre commune pour contribuer à son amélioration' :
          language === 'de' ? 'Melden Sie ein Problem in Ihrer Gemeinde, um zu ihrer Verbesserung beizutragen' :
          'Report an issue in your community to help improve it'
        }
        gradient="from-red-600 to-orange-600"
        icon={<AlertCircle className="w-12 h-12 text-white" />}
      />

      <PageLayout className="py-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'fr' ? 'Informations du signalement' :
                 language === 'de' ? 'Meldungsinformationen' :
                 'Report Information'}
              </CardTitle>
              <CardDescription>
                {language === 'fr' ? 'Décrivez le problème que vous souhaitez signaler' :
                 language === 'de' ? 'Beschreiben Sie das Problem, das Sie melden möchten' :
                 'Describe the issue you want to report'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">
                  {language === 'fr' ? 'Titre' :
                   language === 'de' ? 'Titel' :
                   'Title'} *
                </h3>
                <div className="space-y-2">
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={language === 'fr' ? 'ex: Nid-de-poule dangereux' : language === 'de' ? 'z.B. Gefährliches Schlagloch' : 'e.g. Dangerous pothole'}
                    required
                  />
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">
                  {language === 'fr' ? 'Description' :
                   language === 'de' ? 'Beschreibung' :
                   'Description'} *
                </h3>
                <div className="space-y-2">
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={language === 'fr' ? 'Décrivez le problème en détail...' : language === 'de' ? 'Beschreiben Sie das Problem im Detail...' : 'Describe the issue in detail...'}
                    rows={4}
                    required
                  />
                </div>
              </div>

              {/* Category and Theme */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>
                    {language === 'fr' ? 'Catégorie' :
                     language === 'de' ? 'Kategorie' :
                     'Category'} *
                  </Label>
                  <Select value={category} onValueChange={(v) => setCategory(v as SignalementCategory)}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'fr' ? 'Sélectionner une catégorie' : language === 'de' ? 'Kategorie auswählen' : 'Select a category'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="infrastructure">{getCategoryLabel('infrastructure')}</SelectItem>
                      <SelectItem value="cleanliness">{getCategoryLabel('cleanliness')}</SelectItem>
                      <SelectItem value="safety">{getCategoryLabel('safety')}</SelectItem>
                      <SelectItem value="environment">{getCategoryLabel('environment')}</SelectItem>
                      <SelectItem value="public_space">{getCategoryLabel('public_space')}</SelectItem>
                      <SelectItem value="transport">{getCategoryLabel('transport')}</SelectItem>
                      <SelectItem value="noise">{getCategoryLabel('noise')}</SelectItem>
                      <SelectItem value="other">{getCategoryLabel('other')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>
                    {language === 'fr' ? 'Thème' :
                     language === 'de' ? 'Thema' :
                     'Theme'} *
                  </Label>
                  <Select value={themeId} onValueChange={setThemeId}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'fr' ? 'Sélectionner un thème' : language === 'de' ? 'Thema auswählen' : 'Select a theme'} />
                    </SelectTrigger>
                    <SelectContent>
                      {themes?.map((theme) => (
                        <SelectItem key={theme.id} value={theme.id}>
                          {tLocal(theme.name)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Location Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {language === 'fr' ? 'Localisation' :
                   language === 'de' ? 'Standort' :
                   'Location'} *
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="location-name">
                    {language === 'fr' ? 'Nom du lieu' :
                     language === 'de' ? 'Ortsname' :
                     'Location Name'}
                  </Label>
                  <Input
                    id="location-name"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    placeholder={language === 'fr' ? 'ex: Avenue de la Liberté' : language === 'de' ? 'z.B. Avenue de la Liberté' : 'e.g. Avenue de la Liberté'}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">
                    {language === 'fr' ? 'Adresse' :
                     language === 'de' ? 'Adresse' :
                     'Address'} *
                  </Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 rue de la Paix"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">
                      {language === 'fr' ? 'Ville' :
                       language === 'de' ? 'Stadt' :
                       'City'} *
                    </Label>
                    <Input
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Lyon"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postal-code">
                      {language === 'fr' ? 'Code postal' :
                       language === 'de' ? 'Postleitzahl' :
                       'Postal Code'} *
                    </Label>
                    <Input
                      id="postal-code"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="69001"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lat">
                      {language === 'fr' ? 'Latitude' :
                       language === 'de' ? 'Breitengrad' :
                       'Latitude'} *
                    </Label>
                    <Input
                      id="lat"
                      type="number"
                      step="any"
                      value={lat}
                      onChange={(e) => setLat(e.target.value)}
                      placeholder="45.764043"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lng">
                      {language === 'fr' ? 'Longitude' :
                       language === 'de' ? 'Längengrad' :
                       'Longitude'} *
                    </Label>
                    <Input
                      id="lng"
                      type="number"
                      step="any"
                      value={lng}
                      onChange={(e) => setLng(e.target.value)}
                      placeholder="4.835659"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Images Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  {language === 'fr' ? 'Photos' :
                   language === 'de' ? 'Fotos' :
                   'Photos'}
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="images">
                    {language === 'fr' ? 'Ajouter des photos (optionnel)' :
                     language === 'de' ? 'Fotos hinzufügen (optional)' :
                     'Add photos (optional)'}
                  </Label>
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                </div>
                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((file, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/signalements')}
                  className="flex-1"
                >
                  {language === 'fr' ? 'Annuler' :
                   language === 'de' ? 'Abbrechen' :
                   'Cancel'}
                </Button>
                <Button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="flex-1"
                >
                  {createMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {language === 'fr' ? 'Création...' :
                       language === 'de' ? 'Erstellen...' :
                       'Creating...'}
                    </>
                  ) : (
                    <>
                      {language === 'fr' ? 'Créer le signalement' :
                       language === 'de' ? 'Meldung erstellen' :
                       'Create Report'}
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </PageLayout>
    </div>
  );
}