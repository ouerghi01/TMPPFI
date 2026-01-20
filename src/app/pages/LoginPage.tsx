import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Badge } from '../components/ui/badge';
import {
  Shield,
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  UserPlus,
  ShieldCheck,
  Info
} from 'lucide-react';
import { toast } from 'sonner';

export function LoginPage() {
  const { language } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = language === 'fr' ? 'L\'email est requis' : language === 'de' ? 'E-Mail ist erforderlich' : 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = language === 'fr' ? 'Email invalide' : language === 'de' ? 'Ungültige E-Mail' : 'Invalid email';
    }

    if (!password) {
      newErrors.password = language === 'fr' ? 'Le mot de passe est requis' : language === 'de' ? 'Passwort ist erforderlich' : 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Extract name from email (simulated - in real app, would come from server)
      const emailName = email.split('@')[0];
      const firstName = emailName.charAt(0).toUpperCase() + emailName.slice(1);
      const lastName = 'Utilisateur'; // Would come from server in real app
      
      // Login with auth context
      login(email, firstName, lastName);
      
      // Show success message
      toast.success(
        language === 'fr' 
          ? 'Connexion réussie !' 
          : language === 'de' 
          ? 'Anmeldung erfolgreich!' 
          : 'Login successful!'
      );
      
      // Redirect to dashboard
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 mb-4">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500 bg-clip-text text-transparent mb-2">
            CiviAgora
          </h1>
          <p className="text-gray-600">
            {language === 'fr' 
              ? 'Plateforme de démocratie participative' 
              : language === 'de' 
              ? 'Plattform für partizipative Demokratie' 
              : 'Participatory Democracy Platform'}
          </p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-2xl border-2">
            <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500 text-white">
              <CardTitle className="text-2xl flex items-center gap-2">
                <LogIn className="w-6 h-6" />
                {language === 'fr' ? 'Connexion sécurisée' : language === 'de' ? 'Sichere Anmeldung' : 'Secure Login'}
              </CardTitle>
              <CardDescription className="text-blue-50">
                {language === 'fr'
                  ? 'Accédez à votre espace citoyen'
                  : language === 'de'
                  ? 'Zugang zu Ihrem Bürgerbereich'
                  : 'Access your citizen space'}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-600" />
                    {language === 'fr' ? 'Adresse email' : language === 'de' ? 'E-Mail-Adresse' : 'Email Address'}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={errors.email ? 'border-red-500' : ''}
                    placeholder="jean.dupont@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-gray-600" />
                    {language === 'fr' ? 'Mot de passe' : language === 'de' ? 'Passwort' : 'Password'}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="rememberMe"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="rememberMe" className="text-sm cursor-pointer">
                      {language === 'fr' ? 'Se souvenir de moi' : language === 'de' ? 'Angemeldet bleiben' : 'Remember me'}
                    </Label>
                  </div>
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                    {language === 'fr' ? 'Mot de passe oublié ?' : language === 'de' ? 'Passwort vergessen?' : 'Forgot password?'}
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  size="lg"
                >
                  <ShieldCheck className="w-5 h-5 mr-2" />
                  {language === 'fr' ? 'Se connecter' : language === 'de' ? 'Anmelden' : 'Sign In'}
                </Button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      {language === 'fr' ? 'ou' : language === 'de' ? 'oder' : 'or'}
                    </span>
                  </div>
                </div>

                {/* Register Link */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-3">
                    {language === 'fr' 
                      ? 'Vous n\'avez pas encore de compte ?' 
                      : language === 'de' 
                      ? 'Sie haben noch kein Konto?' 
                      : 'Don\'t have an account yet?'}
                  </p>
                  <Link to="/register">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      {language === 'fr' ? 'Créer un compte sécurisé' : language === 'de' ? 'Sicheres Konto erstellen' : 'Create a Secure Account'}
                    </Button>
                  </Link>
                </div>
              </form>

              {/* Security Info */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 mb-1">
                      {language === 'fr' ? 'Connexion sécurisée' : language === 'de' ? 'Sichere Verbindung' : 'Secure Connection'}
                    </p>
                    <p className="text-xs text-blue-800">
                      {language === 'fr'
                        ? 'Vos données sont chiffrées et protégées. Un citoyen = Un compte.'
                        : language === 'de'
                        ? 'Ihre Daten sind verschlüsselt und geschützt. Ein Bürger = Ein Konto.'
                        : 'Your data is encrypted and protected. One citizen = One account.'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <Link to="/terms" className="hover:text-blue-600">
              {language === 'fr' ? 'CGU' : language === 'de' ? 'AGB' : 'Terms'}
            </Link>
            <span>•</span>
            <Link to="/privacy" className="hover:text-blue-600">
              {language === 'fr' ? 'Confidentialité' : language === 'de' ? 'Datenschutz' : 'Privacy'}
            </Link>
            <span>•</span>
            <Link to="/support" className="hover:text-blue-600">
              {language === 'fr' ? 'Support' : language === 'de' ? 'Unterstützung' : 'Support'}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}