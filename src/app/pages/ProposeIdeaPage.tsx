import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { themes } from '../data/themes';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowLeft, Send, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';

export function ProposeIdeaPage() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    themeId: '',
    location: '',
    impact: '',
    resources: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.themeId) {
      toast.error(
        language === 'fr' ? 'Veuillez remplir tous les champs obligatoires' :
        language === 'de' ? 'Bitte füllen Sie alle Pflichtfelder aus' :
        'Please fill in all required fields'
      );
      return;
    }

    // Simuler l'envoi de l'idée
    toast.success(
      language === 'fr' ? 'Votre idée a été soumise avec succès !' :
      language === 'de' ? 'Ihre Idee wurde erfolgreich eingereicht!' :
      'Your idea has been submitted successfully!'
    );

    // Réinitialiser le formulaire
    setFormData({
      title: '',
      description: '',
      themeId: '',
      location: '',
      impact: '',
      resources: ''
    });

    // Rediriger vers la page des consultations après 2 secondes
    setTimeout(() => {
      navigate('/consultations');
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const selectedTheme = themes.find(theme => theme.id === formData.themeId);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {language === 'fr' && 'Retour'}
        {language === 'de' && 'Zurück'}
        {language === 'en' && 'Back'}
      </Button>

      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
          <Lightbulb className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl mb-4 text-gray-900">
          {language === 'fr' && 'Proposer une idée'}
          {language === 'de' && 'Eine Idee vorschlagen'}
          {language === 'en' && 'Propose an idea'}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {language === 'fr' && 'Partagez vos idées pour améliorer votre collectivité et contribuer au débat citoyen'}
          {language === 'de' && 'Teilen Sie Ihre Ideen zur Verbesserung Ihrer Gemeinde und tragen Sie zur Bürgerdebatte bei'}
          {language === 'en' && 'Share your ideas to improve your community and contribute to civic debate'}
        </p>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'fr' && 'Détails de votre proposition'}
            {language === 'de' && 'Details Ihres Vorschlags'}
            {language === 'en' && 'Proposal details'}
          </CardTitle>
          <CardDescription>
            {language === 'fr' && 'Les champs marqués d\'un * sont obligatoires'}
            {language === 'de' && 'Mit * gekennzeichnete Felder sind Pflichtfelder'}
            {language === 'en' && 'Fields marked with * are required'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Titre */}
            <div className="space-y-2">
              <Label htmlFor="title">
                {language === 'fr' && 'Titre de votre idée *'}
                {language === 'de' && 'Titel Ihrer Idee *'}
                {language === 'en' && 'Title of your idea *'}
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder={
                  language === 'fr' ? 'Ex: Créer un jardin communautaire au centre-ville' :
                  language === 'de' ? 'Bsp: Gemeinschaftsgarten im Stadtzentrum anlegen' :
                  'Ex: Create a community garden in the city center'
                }
                required
              />
            </div>

            {/* Thématique */}
            <div className="space-y-2">
              <Label htmlFor="theme">
                {language === 'fr' && 'Thématique *'}
                {language === 'de' && 'Thema *'}
                {language === 'en' && 'Theme *'}
              </Label>
              <Select
                value={formData.themeId}
                onValueChange={(value) => handleInputChange('themeId', value)}
              >
                <SelectTrigger id="theme">
                  <SelectValue 
                    placeholder={
                      language === 'fr' ? 'Sélectionnez une thématique' :
                      language === 'de' ? 'Wählen Sie ein Thema' :
                      'Select a theme'
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {themes.map((theme) => (
                    <SelectItem key={theme.id} value={theme.id}>
                      <div className="flex items-center gap-2">
                        <span>{theme.icon}</span>
                        <span>{language === 'fr' ? theme.name : language === 'de' ? (theme.nameDE || theme.name) : (theme.nameEN || theme.name)}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedTheme && (
                <div 
                  className="p-3 rounded-lg flex items-center gap-2 text-sm"
                  style={{ backgroundColor: `${selectedTheme.color}20`, color: selectedTheme.color }}
                >
                  <span>{selectedTheme.icon}</span>
                  <span>{language === 'fr' ? selectedTheme.name : language === 'de' ? (selectedTheme.nameDE || selectedTheme.name) : (selectedTheme.nameEN || selectedTheme.name)}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                {language === 'fr' && 'Description détaillée *'}
                {language === 'de' && 'Detaillierte Beschreibung *'}
                {language === 'en' && 'Detailed description *'}
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder={
                  language === 'fr' ? 'Décrivez votre idée en détail, ses objectifs et ses bénéfices pour la collectivité...' :
                  language === 'de' ? 'Beschreiben Sie Ihre Idee im Detail, ihre Ziele und Vorteile für die Gemeinschaft...' :
                  'Describe your idea in detail, its objectives and benefits for the community...'
                }
                rows={6}
                required
              />
              <p className="text-xs text-gray-500">
                {language === 'fr' && `${formData.description.length} caractères`}
                {language === 'de' && `${formData.description.length} Zeichen`}
                {language === 'en' && `${formData.description.length} characters`}
              </p>
            </div>

            {/* Localisation */}
            <div className="space-y-2">
              <Label htmlFor="location">
                {language === 'fr' && 'Localisation (optionnel)'}
                {language === 'de' && 'Standort (optional)'}
                {language === 'en' && 'Location (optional)'}
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder={
                  language === 'fr' ? 'Ex: Place de la Mairie, Quartier Nord' :
                  language === 'de' ? 'Bsp: Rathausplatz, Nordviertel' :
                  'Ex: Town Hall Square, North District'
                }
              />
            </div>

            {/* Impact attendu */}
            <div className="space-y-2">
              <Label htmlFor="impact">
                {language === 'fr' && 'Impact attendu (optionnel)'}
                {language === 'de' && 'Erwartete Auswirkungen (optional)'}
                {language === 'en' && 'Expected impact (optional)'}
              </Label>
              <Textarea
                id="impact"
                value={formData.impact}
                onChange={(e) => handleInputChange('impact', e.target.value)}
                placeholder={
                  language === 'fr' ? 'Quel serait l\'impact de cette idée sur la collectivité ?' :
                  language === 'de' ? 'Welche Auswirkungen hätte diese Idee auf die Gemeinschaft?' :
                  'What would be the impact of this idea on the community?'
                }
                rows={3}
              />
            </div>

            {/* Ressources nécessaires */}
            <div className="space-y-2">
              <Label htmlFor="resources">
                {language === 'fr' && 'Ressources nécessaires (optionnel)'}
                {language === 'de' && 'Erforderliche Ressourcen (optional)'}
                {language === 'en' && 'Required resources (optional)'}
              </Label>
              <Textarea
                id="resources"
                value={formData.resources}
                onChange={(e) => handleInputChange('resources', e.target.value)}
                placeholder={
                  language === 'fr' ? 'Budget estimé, équipement, personnel, partenaires...' :
                  language === 'de' ? 'Geschätztes Budget, Ausrüstung, Personal, Partner...' :
                  'Estimated budget, equipment, staff, partners...'
                }
                rows={3}
              />
            </div>

            {/* Informations légales */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                {language === 'fr' && '💡 Votre proposition sera examinée par nos équipes et pourra être soumise au vote citoyen si elle remplit les critères d\'éligibilité.'}
                {language === 'de' && '💡 Ihr Vorschlag wird von unseren Teams geprüft und kann zur Bürgerabstimmung gestellt werden, wenn er die Zulassungskriterien erfüllt.'}
                {language === 'en' && '💡 Your proposal will be reviewed by our teams and may be submitted to citizen vote if it meets the eligibility criteria.'}
              </p>
            </div>

            {/* Boutons d'action */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="flex-1"
              >
                {language === 'fr' && 'Annuler'}
                {language === 'de' && 'Abbrechen'}
                {language === 'en' && 'Cancel'}
              </Button>
              <Button
                type="submit"
                className="flex-1 gap-2"
              >
                <Send className="w-4 h-4" />
                {language === 'fr' && 'Soumettre mon idée'}
                {language === 'de' && 'Meine Idee einreichen'}
                {language === 'en' && 'Submit my idea'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Conseils */}
      <Card className="mt-6 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-lg">
            {language === 'fr' && '💡 Conseils pour une bonne proposition'}
            {language === 'de' && '💡 Tipps für einen guten Vorschlag'}
            {language === 'en' && '💡 Tips for a good proposal'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-0.5">✓</span>
              <span>
                {language === 'fr' && 'Soyez clair et précis dans votre description'}
                {language === 'de' && 'Seien Sie klar und präzise in Ihrer Beschreibung'}
                {language === 'en' && 'Be clear and precise in your description'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-0.5">✓</span>
              <span>
                {language === 'fr' && 'Expliquez les bénéfices concrets pour la collectivité'}
                {language === 'de' && 'Erklären Sie die konkreten Vorteile für die Gemeinschaft'}
                {language === 'en' && 'Explain the concrete benefits for the community'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-0.5">✓</span>
              <span>
                {language === 'fr' && 'Proposez des solutions réalistes et réalisables'}
                {language === 'de' && 'Schlagen Sie realistische und durchführbare Lösungen vor'}
                {language === 'en' && 'Propose realistic and achievable solutions'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-0.5">✓</span>
              <span>
                {language === 'fr' && 'N\'hésitez pas à mentionner des exemples similaires réussis'}
                {language === 'de' && 'Erwähnen Sie gerne erfolgreiche ähnliche Beispiele'}
                {language === 'en' && 'Feel free to mention similar successful examples'}
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}