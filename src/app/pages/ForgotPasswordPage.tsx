import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import {
  Shield,
  Mail,
  ArrowLeft,
  Check,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

export function ForgotPasswordPage() {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError(language === 'fr' ? 'L\'email est requis' : language === 'de' ? 'E-Mail ist erforderlich' : 'Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError(language === 'fr' ? 'Email invalide' : language === 'de' ? 'Ungültige E-Mail' : 'Invalid email');
      return;
    }

    setIsLoading(true);

    // Simuler l'envoi d'un email de réinitialisation
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast.success(
        language === 'fr' ? 'Email envoyé avec succès' :
        language === 'de' ? 'E-Mail erfolgreich gesendet' :
        'Email sent successfully'
      );
    }, 1500);
  };

  const getTitle = () => {
    if (language === 'fr') return 'Réinitialiser le mot de passe';
    if (language === 'de') return 'Passwort zurücksetzen';
    return 'Reset password';
  };

  const getDescription = () => {
    if (language === 'fr') return 'Entrez votre email pour recevoir un lien de réinitialisation';
    if (language === 'de') return 'Geben Sie Ihre E-Mail-Adresse ein, um einen Zurücksetzungslink zu erhalten';
    return 'Enter your email to receive a reset link';
  };

  const getSuccessMessage = () => {
    if (language === 'fr') return 'Un email de réinitialisation a été envoyé';
    if (language === 'de') return 'Eine E-Mail zum Zurücksetzen wurde gesendet';
    return 'A reset email has been sent';
  };

  const getSuccessDescription = () => {
    if (language === 'fr') return `Nous avons envoyé un lien de réinitialisation à ${email}. Vérifiez votre boîte de réception et suivez les instructions. Le lien est valable 24 heures.`;
    if (language === 'de') return `Wir haben einen Zurücksetzungslink an ${email} gesendet. Überprüfen Sie Ihren Posteingang und folgen Sie den Anweisungen. Der Link ist 24 Stunden gültig.`;
    return `We sent a reset link to ${email}. Check your inbox and follow the instructions. The link is valid for 24 hours.`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CiviAgora</h1>
          <p className="text-gray-600">
            {language === 'fr' && 'Plateforme de démocratie participative'}
            {language === 'de' && 'Plattform für partizipative Demokratie'}
            {language === 'en' && 'Participatory democracy platform'}
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">{getTitle()}</CardTitle>
            <CardDescription>{getDescription()}</CardDescription>
          </CardHeader>
          <CardContent>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">
                    {language === 'fr' && 'Adresse email'}
                    {language === 'de' && 'E-Mail-Adresse'}
                    {language === 'en' && 'Email address'}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={
                        language === 'fr' ? 'nom@exemple.com' :
                        language === 'de' ? 'name@beispiel.com' :
                        'name@example.com'
                      }
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      className={`pl-10 ${error ? 'border-red-500' : ''}`}
                      disabled={isLoading}
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </p>
                  )}
                </div>

                {/* Info Alert */}
                <Alert className="bg-blue-50 border-blue-200">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-sm text-blue-800">
                    {language === 'fr' && 'Vous recevrez un email avec un lien valable 24 heures pour réinitialiser votre mot de passe.'}
                    {language === 'de' && 'Sie erhalten eine E-Mail mit einem 24 Stunden gültigen Link zum Zurücksetzen Ihres Passworts.'}
                    {language === 'en' && 'You will receive an email with a 24-hour valid link to reset your password.'}
                  </AlertDescription>
                </Alert>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      {language === 'fr' && 'Envoi en cours...'}
                      {language === 'de' && 'Wird gesendet...'}
                      {language === 'en' && 'Sending...'}
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      {language === 'fr' && 'Envoyer le lien'}
                      {language === 'de' && 'Link senden'}
                      {language === 'en' && 'Send reset link'}
                    </>
                  )}
                </Button>

                {/* Back to Login */}
                <div className="text-center">
                  <Link 
                    to="/login" 
                    className="text-sm text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {language === 'fr' && 'Retour à la connexion'}
                    {language === 'de' && 'Zurück zur Anmeldung'}
                    {language === 'en' && 'Back to login'}
                  </Link>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                {/* Success Message */}
                <Alert className="bg-green-50 border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-green-900 mb-1">
                        {getSuccessMessage()}
                      </h3>
                      <AlertDescription className="text-sm text-green-800">
                        {getSuccessDescription()}
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>

                {/* Additional Instructions */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-700 font-medium">
                    {language === 'fr' && 'Vous ne trouvez pas l\'email ?'}
                    {language === 'de' && 'Sie finden die E-Mail nicht?'}
                    {language === 'en' && 'Can\'t find the email?'}
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>
                      {language === 'fr' && 'Vérifiez votre dossier spam'}
                      {language === 'de' && 'Überprüfen Sie Ihren Spam-Ordner'}
                      {language === 'en' && 'Check your spam folder'}
                    </li>
                    <li>
                      {language === 'fr' && 'Assurez-vous que l\'adresse email est correcte'}
                      {language === 'de' && 'Stellen Sie sicher, dass die E-Mail-Adresse korrekt ist'}
                      {language === 'en' && 'Make sure the email address is correct'}
                    </li>
                    <li>
                      {language === 'fr' && 'Attendez quelques minutes avant de réessayer'}
                      {language === 'de' && 'Warten Sie einige Minuten, bevor Sie es erneut versuchen'}
                      {language === 'en' && 'Wait a few minutes before trying again'}
                    </li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button 
                    onClick={() => {
                      setIsSubmitted(false);
                      setEmail('');
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    {language === 'fr' && 'Renvoyer l\'email'}
                    {language === 'de' && 'E-Mail erneut senden'}
                    {language === 'en' && 'Resend email'}
                  </Button>
                  
                  <Link to="/login" className="block">
                    <Button variant="ghost" className="w-full">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      {language === 'fr' && 'Retour à la connexion'}
                      {language === 'de' && 'Zurück zur Anmeldung'}
                      {language === 'en' && 'Back to login'}
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Help Link */}
        <div className="text-center mt-6">
          <Link to="/support" className="text-sm text-gray-600 hover:text-gray-800">
            {language === 'fr' && 'Besoin d\'aide ? Contactez le support'}
            {language === 'de' && 'Brauchen Sie Hilfe? Kontaktieren Sie den Support'}
            {language === 'en' && 'Need help? Contact support'}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
