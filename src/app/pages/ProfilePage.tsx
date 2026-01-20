import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { User, Mail, Phone, MapPin, Bell, Globe, Heart, Edit2, Save, X, Camera, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { themes } from '../data/themes';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  bio: string;
  avatar: string;
  preferences: {
    language: 'fr' | 'de' | 'en';
    emailNotifications: boolean;
    smsNotifications: boolean;
    favoriteThemes: string[];
  };
}

interface UserParticipation {
  id: string;
  type: 'consultation' | 'petition' | 'vote' | 'assembly' | 'conference';
  title: string;
  date: string;
  status: string;
  themeId: string;
}

const mockParticipations: UserParticipation[] = [
  {
    id: '1',
    type: 'petition',
    title: 'Pour la création de pistes cyclables',
    date: '2024-12-15',
    status: 'active',
    themeId: 'mobility'
  },
  {
    id: '2',
    type: 'consultation',
    title: 'Aménagement du parc urbain',
    date: '2024-11-20',
    status: 'completed',
    themeId: 'environment'
  },
  {
    id: '3',
    type: 'vote',
    title: 'Budget participatif 2025',
    date: '2024-10-10',
    status: 'completed',
    themeId: 'governance'
  }
];

const defaultProfile: UserProfile = {
  firstName: 'Jean',
  lastName: 'Dupont',
  email: 'jean.dupont@example.com',
  phone: '+33 6 12 34 56 78',
  address: '15 rue de la République',
  city: 'Paris',
  postalCode: '75001',
  bio: 'Citoyen engagé dans les questions environnementales et de mobilité urbaine.',
  avatar: '',
  preferences: {
    language: 'fr',
    emailNotifications: true,
    smsNotifications: false,
    favoriteThemes: ['environment', 'mobility']
  }
};

export function ProfilePage() {
  const { t, language, setLanguage, tLocal } = useLanguage();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [avatarUrl, setAvatarUrl] = useState<string>('');

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<UserProfile>({
    defaultValues: profile
  });

  // Load profile from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfile(parsed);
      reset(parsed);
      setAvatarUrl(parsed.avatar || '');
    }
  }, [reset]);

  const onSubmit = (data: UserProfile) => {
    const updatedProfile = { ...data, avatar: avatarUrl };
    setProfile(updatedProfile);
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    setIsEditing(false);
    
    if (language === 'fr') {
      toast.success('Profil mis à jour avec succès');
    } else if (language === 'de') {
      toast.success('Profil erfolgreich aktualisiert');
    } else {
      toast.success('Profile updated successfully');
    }
  };

  const handleCancel = () => {
    reset(profile);
    setAvatarUrl(profile.avatar);
    setIsEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleFavoriteTheme = (themeId: string) => {
    const currentFavorites = watch('preferences.favoriteThemes') || [];
    const newFavorites = currentFavorites.includes(themeId)
      ? currentFavorites.filter(id => id !== themeId)
      : [...currentFavorites, themeId];
    setValue('preferences.favoriteThemes', newFavorites);
  };

  const getInitials = () => {
    return `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase();
  };

  const getParticipationTypeLabel = (type: string) => {
    const types: Record<string, { fr: string; de: string; en: string }> = {
      petition: { fr: 'Pétition', de: 'Petition', en: 'Petition' },
      consultation: { fr: 'Concertation', de: 'Konsultation', en: 'Consultation' },
      vote: { fr: 'Vote', de: 'Abstimmung', en: 'Vote' },
      assembly: { fr: 'Assemblée', de: 'Versammlung', en: 'Assembly' },
      conference: { fr: 'Conférence', de: 'Konferenz', en: 'Conference' }
    };
    return types[type]?.[language] || type;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">{t('nav.profile')}</h1>
          <p className="text-gray-600">
            {language === 'fr' && 'Gérez vos informations personnelles et vos préférences'}
            {language === 'de' && 'Verwalten Sie Ihre persönlichen Informationen und Einstellungen'}
            {language === 'en' && 'Manage your personal information and preferences'}
          </p>
        </div>

        {/* Profile Card */}
        <Card className="mb-6 p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={avatarUrl} alt={`${profile.firstName} ${profile.lastName}`} />
                  <AvatarFallback className="text-xl">{getInitials()}</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors">
                    <Camera className="w-4 h-4 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <div>
                <h2 className="text-gray-900 mb-1">{profile.firstName} {profile.lastName}</h2>
                <p className="text-gray-600 mb-2">{profile.email}</p>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {language === 'fr' && 'Citoyen actif'}
                    {language === 'de' && 'Aktiver Bürger'}
                    {language === 'en' && 'Active citizen'}
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {mockParticipations.length} {language === 'fr' && 'participations'}
                    {language === 'de' && 'Teilnahmen'}
                    {language === 'en' && 'participations'}
                  </Badge>
                </div>
              </div>
            </div>
            <div>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} variant="outline" className="gap-2">
                  <Edit2 className="w-4 h-4" />
                  {language === 'fr' && 'Modifier'}
                  {language === 'de' && 'Bearbeiten'}
                  {language === 'en' && 'Edit'}
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleSubmit(onSubmit)} className="gap-2">
                    <Save className="w-4 h-4" />
                    {language === 'fr' && 'Enregistrer'}
                    {language === 'de' && 'Speichern'}
                    {language === 'en' && 'Save'}
                  </Button>
                  <Button onClick={handleCancel} variant="outline" className="gap-2">
                    <X className="w-4 h-4" />
                    {language === 'fr' && 'Annuler'}
                    {language === 'de' && 'Abbrechen'}
                    {language === 'en' && 'Cancel'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="info" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">
              <User className="w-4 h-4 mr-2" />
              {language === 'fr' && 'Informations'}
              {language === 'de' && 'Informationen'}
              {language === 'en' && 'Information'}
            </TabsTrigger>
            <TabsTrigger value="preferences">
              <Bell className="w-4 h-4 mr-2" />
              {language === 'fr' && 'Préférences'}
              {language === 'de' && 'Einstellungen'}
              {language === 'en' && 'Preferences'}
            </TabsTrigger>
            <TabsTrigger value="history">
              <Calendar className="w-4 h-4 mr-2" />
              {language === 'fr' && 'Historique'}
              {language === 'de' && 'Verlauf'}
              {language === 'en' && 'History'}
            </TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="info">
            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">
                {language === 'fr' && 'Informations personnelles'}
                {language === 'de' && 'Persönliche Informationen'}
                {language === 'en' && 'Personal information'}
              </h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">
                      {language === 'fr' && 'Prénom'}
                      {language === 'de' && 'Vorname'}
                      {language === 'en' && 'First name'}
                      <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="firstName"
                        {...register('firstName', { required: true })}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {language === 'fr' && 'Ce champ est requis'}
                        {language === 'de' && 'Dieses Feld ist erforderlich'}
                        {language === 'en' && 'This field is required'}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">
                      {language === 'fr' && 'Nom'}
                      {language === 'de' && 'Nachname'}
                      {language === 'en' && 'Last name'}
                      <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="lastName"
                        {...register('lastName', { required: true })}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {language === 'fr' && 'Ce champ est requis'}
                        {language === 'de' && 'Dieses Feld ist erforderlich'}
                        {language === 'en' && 'This field is required'}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">
                      {language === 'fr' && 'Email'}
                      {language === 'de' && 'E-Mail'}
                      {language === 'en' && 'Email'}
                      <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {language === 'fr' && 'Email invalide'}
                        {language === 'de' && 'Ungültige E-Mail'}
                        {language === 'en' && 'Invalid email'}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">
                      {language === 'fr' && 'Téléphone'}
                      {language === 'de' && 'Telefon'}
                      {language === 'en' && 'Phone'}
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="phone"
                        {...register('phone')}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">
                    {language === 'fr' && 'Adresse'}
                    {language === 'de' && 'Adresse'}
                    {language === 'en' && 'Address'}
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="address"
                      {...register('address')}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">
                      {language === 'fr' && 'Ville'}
                      {language === 'de' && 'Stadt'}
                      {language === 'en' && 'City'}
                    </Label>
                    <Input
                      id="city"
                      {...register('city')}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">
                      {language === 'fr' && 'Code postal'}
                      {language === 'de' && 'Postleitzahl'}
                      {language === 'en' && 'Postal code'}
                    </Label>
                    <Input
                      id="postalCode"
                      {...register('postalCode')}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">
                    {language === 'fr' && 'Biographie'}
                    {language === 'de' && 'Biografie'}
                    {language === 'en' && 'Biography'}
                  </Label>
                  <Textarea
                    id="bio"
                    {...register('bio')}
                    disabled={!isEditing}
                    rows={4}
                    placeholder={
                      language === 'fr' ? 'Parlez-nous de vous et de vos centres d\'intérêt...' :
                      language === 'de' ? 'Erzählen Sie uns von sich und Ihren Interessen...' :
                      'Tell us about yourself and your interests...'
                    }
                  />
                </div>
              </form>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">
                {language === 'fr' && 'Préférences'}
                {language === 'de' && 'Einstellungen'}
                {language === 'en' && 'Preferences'}
              </h3>
              
              <div className="space-y-6">
                {/* Language Preference */}
                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4" />
                    {language === 'fr' && 'Langue préférée'}
                    {language === 'de' && 'Bevorzugte Sprache'}
                    {language === 'en' && 'Preferred language'}
                  </Label>
                  <Select 
                    value={watch('preferences.language')} 
                    onValueChange={(value) => {
                      setValue('preferences.language', value as 'fr' | 'de' | 'en');
                      setLanguage(value as 'fr' | 'de' | 'en');
                    }}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Notifications */}
                <div>
                  <h4 className="text-gray-900 mb-4 flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    {language === 'fr' && 'Notifications'}
                    {language === 'de' && 'Benachrichtigungen'}
                    {language === 'en' && 'Notifications'}
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>
                          {language === 'fr' && 'Notifications par email'}
                          {language === 'de' && 'E-Mail-Benachrichtigungen'}
                          {language === 'en' && 'Email notifications'}
                        </Label>
                        <p className="text-sm text-gray-500">
                          {language === 'fr' && 'Recevoir des mises à jour par email'}
                          {language === 'de' && 'Updates per E-Mail erhalten'}
                          {language === 'en' && 'Receive updates by email'}
                        </p>
                      </div>
                      <Switch
                        checked={watch('preferences.emailNotifications')}
                        onCheckedChange={(checked) => setValue('preferences.emailNotifications', checked)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>
                          {language === 'fr' && 'Notifications par SMS'}
                          {language === 'de' && 'SMS-Benachrichtigungen'}
                          {language === 'en' && 'SMS notifications'}
                        </Label>
                        <p className="text-sm text-gray-500">
                          {language === 'fr' && 'Recevoir des alertes importantes par SMS'}
                          {language === 'de' && 'Wichtige Benachrichtigungen per SMS erhalten'}
                          {language === 'en' && 'Receive important alerts by SMS'}
                        </p>
                      </div>
                      <Switch
                        checked={watch('preferences.smsNotifications')}
                        onCheckedChange={(checked) => setValue('preferences.smsNotifications', checked)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Favorite Themes */}
                <div>
                  <h4 className="text-gray-900 mb-4 flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    {language === 'fr' && 'Thèmes favoris'}
                    {language === 'de' && 'Lieblingsthemen'}
                    {language === 'en' && 'Favorite themes'}
                  </h4>
                  <p className="text-sm text-gray-500 mb-4">
                    {language === 'fr' && 'Sélectionnez les thèmes qui vous intéressent'}
                    {language === 'de' && 'Wählen Sie die Themen aus, die Sie interessieren'}
                    {language === 'en' && 'Select the themes that interest you'}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {themes.map((theme) => {
                      const isFavorite = (watch('preferences.favoriteThemes') || []).includes(theme.id);
                      return (
                        <button
                          key={theme.id}
                          type="button"
                          onClick={() => isEditing && toggleFavoriteTheme(theme.id)}
                          disabled={!isEditing}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            isFavorite
                              ? 'border-current shadow-sm'
                              : 'border-gray-200 hover:border-gray-300'
                          } ${!isEditing ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}`}
                          style={isFavorite ? { 
                            backgroundColor: `${theme.color}15`,
                            borderColor: theme.color
                          } : {}}
                        >
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: isFavorite ? `${theme.color}25` : '#f3f4f6' }}
                            >
                              <span className="text-xl">{theme.icon}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`font-medium text-sm ${isFavorite ? 'text-gray-900' : 'text-gray-600'}`}>
                                {language === 'fr' ? theme.name : language === 'de' ? (theme.nameDE || theme.name) : (theme.nameEN || theme.name)}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {language === 'fr' && theme.descriptionFR}
                                {language === 'de' && theme.descriptionDE}
                                {language === 'en' && theme.descriptionEN}
                              </p>
                            </div>
                            {isFavorite && (
                              <Heart 
                                className="w-5 h-5 flex-shrink-0 fill-current" 
                                style={{ color: theme.color }}
                              />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">
                {language === 'fr' && 'Historique de participation'}
                {language === 'de' && 'Teilnahmeverlauf'}
                {language === 'en' && 'Participation history'}
              </h3>
              <div className="space-y-4">
                {mockParticipations.map((participation) => {
                  const theme = themes.find(t => t.id === participation.themeId);
                  return (
                    <div
                      key={participation.id}
                      className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      {theme && (
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${theme.color}20` }}
                        >
                          <span className="text-xl">{theme.icon}</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h4 className="text-gray-900">{participation.title}</h4>
                            <p className="text-sm text-gray-500">
                              {getParticipationTypeLabel(participation.type)} • {new Date(participation.date).toLocaleDateString(language)}
                            </p>
                          </div>
                          <Badge variant={participation.status === 'active' ? 'default' : 'secondary'}>
                            {participation.status === 'active'
                              ? language === 'fr' ? 'En cours' : language === 'de' ? 'Aktiv' : 'Active'
                              : language === 'fr' ? 'Terminé' : language === 'de' ? 'Abgeschlossen' : 'Completed'
                            }
                          </Badge>
                        </div>
                        {theme && (
                          <Badge 
                            variant="outline" 
                            style={{ 
                              color: theme.color, 
                              borderColor: theme.color, 
                              backgroundColor: `${theme.color}10` 
                            }}
                          >
                            {language === 'fr' ? theme.name : language === 'de' ? (theme.nameDE || theme.name) : (theme.nameEN || theme.name)}
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}