import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { usePetition, useTheme } from '../hooks/useApi';
import { ThemeTag } from '../components/ThemeTag';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Separator } from '../components/ui/separator';
import { 
  ArrowLeft, 
  FileText, 
  Calendar, 
  User, 
  Users, 
  MapPin, 
  Target, 
  Clock, 
  Share2,
  CheckCircle2,
  TrendingUp,
  Mail,
  Facebook,
  Twitter,
  Linkedin
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export function PetitionDetailPage() {
  const { petitionId } = useParams<{ petitionId: string }>();
  const navigate = useNavigate();
  const { language, tLocal } = useLanguage();
  
  // Fetch petition using React Query
  const { data: petition, isLoading, error } = usePetition(petitionId || '');
  
  // Fetch theme data
  const { data: theme } = useTheme(petition?.themeId || '');
  
  const [signatureData, setSignatureData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    postalCode: '',
    acceptTerms: false,
    publicSignature: true
  });

  const [showShareMenu, setShowShareMenu] = useState(false);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">
            {language === 'fr' && 'Chargement...'}
            {language === 'de' && 'Wird geladen...'}
            {language === 'en' && 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  // Show error or not found state
  if (error || !petition) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
            <FileText className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="text-2xl font-semibold mb-4 text-gray-900">
            {language === 'fr' && 'Pétition non trouvée'}
            {language === 'de' && 'Petition nicht gefunden'}
            {language === 'en' && 'Petition not found'}
          </h1>
          <Button onClick={() => navigate('/petitions')} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            {language === 'fr' && 'Retour aux pétitions'}
            {language === 'de' && 'Zurück zu den Petitionen'}
            {language === 'en' && 'Back to petitions'}
          </Button>
        </div>
      </div>
    );
  }

  const percentage = (petition.currentSignatures / petition.targetSignatures) * 100;
  const daysRemaining = Math.ceil((new Date(petition.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const handleInputChange = (field: string, value: string | boolean) => {
    setSignatureData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signatureData.firstName || !signatureData.lastName || !signatureData.email || !signatureData.acceptTerms) {
      toast.error(
        language === 'fr' ? 'Veuillez remplir tous les champs obligatoires et accepter les conditions' :
        language === 'de' ? 'Bitte füllen Sie alle Pflichtfelder aus und akzeptieren Sie die Bedingungen' :
        'Please fill in all required fields and accept the terms'
      );
      return;
    }

    toast.success(
      language === 'fr' ? '✅ Signature enregistrée ! Vérifiez votre email pour confirmer.' :
      language === 'de' ? '✅ Unterschrift registriert! Überprüfen Sie Ihre E-Mail zur Bestätigung.' :
      '✅ Signature recorded! Check your email to confirm.'
    );

    // Reset form
    setSignatureData({
      firstName: '',
      lastName: '',
      email: '',
      postalCode: '',
      acceptTerms: false,
      publicSignature: true
    });
  };

  const handleShare = (platform?: string) => {
    const url = window.location.href;
    const text = tLocal(petition.title);

    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'email') {
      window.location.href = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`;
    } else {
      if (navigator.share) {
        navigator.share({
          title: tLocal(petition.title),
          text: tLocal(petition.description),
          url: url
        });
      } else {
        navigator.clipboard.writeText(url);
        toast.success(
          language === 'fr' ? 'Lien copié dans le presse-papiers' :
          language === 'de' ? 'Link in die Zwischenablage kopiert' :
          'Link copied to clipboard'
        );
      }
    }
    setShowShareMenu(false);
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'open':
        return {
          label: language === 'fr' ? 'Ouvert' : language === 'de' ? 'Offen' : 'Open',
          className: 'bg-green-100 text-green-800'
        };
      case 'closed':
        return {
          label: language === 'fr' ? 'Fermé' : language === 'de' ? 'Geschlossen' : 'Closed',
          className: 'bg-gray-100 text-gray-800'
        };
      case 'under_review':
        return {
          label: language === 'fr' ? 'Seuil atteint' : language === 'de' ? 'Schwelle erreicht' : 'Threshold reached',
          className: 'bg-blue-100 text-blue-800'
        };
      default:
        return { label: status, className: '' };
    }
  };

  const statusInfo = getStatusInfo(petition.status);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/petitions')}
            className="mb-6 text-white hover:bg-white/10 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === 'fr' && 'Retour aux pétitions'}
            {language === 'de' && 'Zurück zu den Petitionen'}
            {language === 'en' && 'Back to petitions'}
          </Button>

          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <ThemeTag themeId={petition.themeId} />
                <Badge className={statusInfo.className}>
                  {statusInfo.label}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold mb-4">{tLocal(petition.title)}</h1>
              <p className="text-xl text-green-50">{tLocal(petition.description)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        {language === 'fr' && 'Progression'}
                        {language === 'de' && 'Fortschritt'}
                        {language === 'en' && 'Progress'}
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-gray-900">{petition.currentSignatures.toLocaleString()}</span>
                        <span className="text-xl text-gray-600">/ {petition.targetSignatures.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-blue-600">{percentage.toFixed(0)}%</div>
                      <p className="text-sm text-gray-600">
                        {language === 'fr' && 'de l\'objectif'}
                        {language === 'de' && 'des Ziels'}
                        {language === 'en' && 'of goal'}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-4">
                    <motion.div
                      className={`absolute top-0 left-0 h-full rounded-full ${
                        percentage >= 100 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                          : 'bg-gradient-to-r from-blue-500 to-blue-600'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(percentage, 100)}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>
                        {language === 'fr' && `${petition.currentSignatures.toLocaleString()} signataires`}
                        {language === 'de' && `${petition.currentSignatures.toLocaleString()} Unterzeichner`}
                        {language === 'en' && `${petition.currentSignatures.toLocaleString()} signatories`}
                      </span>
                    </div>
                    {petition.status === 'open' && daysRemaining > 0 && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>
                          {language === 'fr' && `${daysRemaining} jours restants`}
                          {language === 'de' && `${daysRemaining} Tage verbleibend`}
                          {language === 'en' && `${daysRemaining} days remaining`}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Success Message */}
                  {petition.status === 'under_review' && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-green-900 mb-1">
                            {language === 'fr' && 'Objectif atteint !'}
                            {language === 'de' && 'Ziel erreicht!'}
                            {language === 'en' && 'Goal reached!'}
                          </p>
                          <p className="text-sm text-green-800">
                            {language === 'fr' && 'Cette pétition sera examinée par les autorités compétentes.'}
                            {language === 'de' && 'Diese Petition wird von den zuständigen Behörden geprüft.'}
                            {language === 'en' && 'This petition will be reviewed by the competent authorities.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    {language === 'fr' && 'Description détaillée'}
                    {language === 'de' && 'Detaillierte Beschreibung'}
                    {language === 'en' && 'Detailed description'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {tLocal(petition.description)}
                      {'\n\n'}
                      {language === 'fr' && 'Cette pétition vise à améliorer notre commune en prenant en compte les besoins et les aspirations des citoyens. Votre soutien est essentiel pour faire entendre notre voix auprès des autorités locales et obtenir des changements concrets.'}
                      {language === 'de' && 'Diese Petition zielt darauf ab, unsere Gemeinde zu verbessern, indem sie die Bedürfnisse und Wünsche der Bürger berücksichtigt. Ihre Unterstützung ist entscheidend, um unsere Stimme bei den lokalen Behörden Gehör zu verschaffen und konkrete Änderungen zu erreichen.'}
                      {language === 'en' && 'This petition aims to improve our community by taking into account the needs and aspirations of citizens. Your support is essential to make our voice heard with local authorities and achieve concrete changes.'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Key Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>
                    {language === 'fr' && 'Informations clés'}
                    {language === 'de' && 'Wichtige Informationen'}
                    {language === 'en' && 'Key information'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                      <User className="w-5 h-5 text-gray-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          {language === 'fr' && 'Créateur'}
                          {language === 'de' && 'Ersteller'}
                          {language === 'en' && 'Creator'}
                        </p>
                        <p className="font-medium text-gray-900">
                          {petition.author.firstName} {petition.author.lastName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                      <Calendar className="w-5 h-5 text-gray-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          {language === 'fr' && 'Date de création'}
                          {language === 'de' && 'Erstellungsdatum'}
                          {language === 'en' && 'Creation date'}
                        </p>
                        <p className="font-medium text-gray-900">
                          {new Date(petition.createdAt).toLocaleDateString(
                            language === 'fr' ? 'fr-FR' :
                            language === 'de' ? 'de-DE' :
                            'en-US',
                            { year: 'numeric', month: 'long', day: 'numeric' }
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                      <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          {language === 'fr' && 'Localisation'}
                          {language === 'de' && 'Standort'}
                          {language === 'en' && 'Location'}
                        </p>
                        <p className="font-medium text-gray-900">
                          {language === 'fr' && 'Commune locale'}
                          {language === 'de' && 'Lokale Gemeinde'}
                          {language === 'en' && 'Local municipality'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                      <Target className="w-5 h-5 text-gray-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          {language === 'fr' && 'Objectif de signatures'}
                          {language === 'de' && 'Unterschriftenziel'}
                          {language === 'en' && 'Signature goal'}
                        </p>
                        <p className="font-medium text-gray-900">{petition.targetSignatures.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Sign Form */}
              {petition.status === 'open' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                      <CardTitle className="text-center">
                        {language === 'fr' && 'Signer la pétition'}
                        {language === 'de' && 'Petition unterzeichnen'}
                        {language === 'en' && 'Sign the petition'}
                      </CardTitle>
                      <CardDescription className="text-center text-blue-50">
                        {language === 'fr' && 'Votre voix compte'}
                        {language === 'de' && 'Ihre Stimme zählt'}
                        {language === 'en' && 'Your voice matters'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <form onSubmit={handleSign} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">
                            {language === 'fr' && 'Prénom *'}
                            {language === 'de' && 'Vorname *'}
                            {language === 'en' && 'First name *'}
                          </Label>
                          <Input
                            id="firstName"
                            value={signatureData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            placeholder="Jean"
                            className="h-11"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lastName">
                            {language === 'fr' && 'Nom *'}
                            {language === 'de' && 'Nachname *'}
                            {language === 'en' && 'Last name *'}
                          </Label>
                          <Input
                            id="lastName"
                            value={signatureData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            placeholder="Dupont"
                            className="h-11"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">
                            {language === 'fr' && 'Email *'}
                            {language === 'de' && 'E-Mail *'}
                            {language === 'en' && 'Email *'}
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={signatureData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="jean.dupont@example.com"
                            className="h-11"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="postalCode">
                            {language === 'fr' && 'Code postal (optionnel)'}
                            {language === 'de' && 'Postleitzahl (optional)'}
                            {language === 'en' && 'Postal code (optional)'}
                          </Label>
                          <Input
                            id="postalCode"
                            value={signatureData.postalCode}
                            onChange={(e) => handleInputChange('postalCode', e.target.value)}
                            placeholder="1000"
                            className="h-11"
                          />
                        </div>

                        <Separator />

                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="publicSignature"
                            checked={signatureData.publicSignature}
                            onCheckedChange={(checked) => handleInputChange('publicSignature', !!checked)}
                          />
                          <Label
                            htmlFor="publicSignature"
                            className="text-sm font-normal cursor-pointer leading-tight"
                          >
                            {language === 'fr' && 'Afficher mon nom publiquement'}
                            {language === 'de' && 'Meinen Namen öffentlich anzeigen'}
                            {language === 'en' && 'Display my name publicly'}
                          </Label>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="acceptTerms"
                            checked={signatureData.acceptTerms}
                            onCheckedChange={(checked) => handleInputChange('acceptTerms', !!checked)}
                            required
                          />
                          <Label
                            htmlFor="acceptTerms"
                            className="text-sm font-normal cursor-pointer leading-tight"
                          >
                            {language === 'fr' && 'J\'accepte les conditions d\'utilisation *'}
                            {language === 'de' && 'Ich akzeptiere die Nutzungsbedingungen *'}
                            {language === 'en' && 'I accept the terms of use *'}
                          </Label>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-xs text-blue-800">
                            {language === 'fr' && '📧 Vous recevrez un email de confirmation'}
                            {language === 'de' && '📧 Sie erhalten eine Bestätigungs-E-Mail'}
                            {language === 'en' && '📧 You will receive a confirmation email'}
                          </p>
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full h-11 gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          {language === 'fr' && 'Signer maintenant'}
                          {language === 'de' && 'Jetzt unterschreiben'}
                          {language === 'en' && 'Sign now'}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Share Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Share2 className="w-5 h-5 text-blue-600" />
                      {language === 'fr' && 'Partager'}
                      {language === 'de' && 'Teilen'}
                      {language === 'en' && 'Share'}
                    </CardTitle>
                    <CardDescription>
                      {language === 'fr' && 'Faites connaître cette pétition'}
                      {language === 'de' && 'Machen Sie diese Petition bekannt'}
                      {language === 'en' && 'Spread the word'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        onClick={() => handleShare('facebook')}
                        className="gap-2"
                      >
                        <Facebook className="w-4 h-4" />
                        Facebook
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleShare('twitter')}
                        className="gap-2"
                      >
                        <Twitter className="w-4 h-4" />
                        Twitter
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleShare('linkedin')}
                        className="gap-2"
                      >
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleShare('email')}
                        className="gap-2"
                      >
                        <Mail className="w-4 h-4" />
                        Email
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => handleShare()}
                      className="w-full mt-3 gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      {language === 'fr' && 'Copier le lien'}
                      {language === 'de' && 'Link kopieren'}
                      {language === 'en' && 'Copy link'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      {language === 'fr' && 'Statistiques'}
                      {language === 'de' && 'Statistiken'}
                      {language === 'en' && 'Statistics'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          {language === 'fr' && 'Signatures collectées'}
                          {language === 'de' && 'Gesammelte Unterschriften'}
                          {language === 'en' && 'Signatures collected'}
                        </p>
                        <p className="text-3xl font-bold text-gray-900">{petition.currentSignatures.toLocaleString()}</p>
                      </div>
                      <Separator />
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          {language === 'fr' && 'Objectif'}
                          {language === 'de' && 'Ziel'}
                          {language === 'en' && 'Goal'}
                        </p>
                        <p className="text-2xl font-bold text-gray-900">{petition.targetSignatures.toLocaleString()}</p>
                      </div>
                      <Separator />
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          {language === 'fr' && 'Progression'}
                          {language === 'de' && 'Fortschritt'}
                          {language === 'en' && 'Progress'}
                        </p>
                        <p className="text-2xl font-bold text-blue-600">{percentage.toFixed(1)}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}