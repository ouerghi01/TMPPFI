import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Badge } from '../components/ui/badge';
import {
  Shield,
  UserPlus,
  Mail,
  Phone,
  Lock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  User,
  Calendar,
  Eye,
  EyeOff,
  Info,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';

interface FormData {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  declareSincerity: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export function RegisterPage() {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailVerificationCode, setEmailVerificationCode] = useState('');
  const [phoneVerificationCode, setPhoneVerificationCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [accountStatus, setAccountStatus] = useState<'pending' | 'verified' | 'active' | 'restricted'>('pending');

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptPrivacy: false,
    declareSincerity: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const steps = [
    {
      id: 0,
      title: language === 'fr' ? 'Identité' : language === 'de' ? 'Identität' : 'Identity',
      icon: User,
      description: language === 'fr' ? 'Informations personnelles' : language === 'de' ? 'Persönliche Informationen' : 'Personal information'
    },
    {
      id: 1,
      title: language === 'fr' ? 'Contact' : language === 'de' ? 'Kontakt' : 'Contact',
      icon: Mail,
      description: language === 'fr' ? 'Email et téléphone' : language === 'de' ? 'E-Mail und Telefon' : 'Email and phone'
    },
    {
      id: 2,
      title: language === 'fr' ? 'Sécurité' : language === 'de' ? 'Sicherheit' : 'Security',
      icon: Lock,
      description: language === 'fr' ? 'Mot de passe et protection' : language === 'de' ? 'Passwort und Schutz' : 'Password and protection'
    },
    {
      id: 3,
      title: language === 'fr' ? 'Vérification' : language === 'de' ? 'Verifizierung' : 'Verification',
      icon: ShieldCheck,
      description: language === 'fr' ? 'Validation des coordonnées' : language === 'de' ? 'Validierung der Kontaktdaten' : 'Contact validation'
    },
    {
      id: 4,
      title: language === 'fr' ? 'Confirmation' : language === 'de' ? 'Bestätigung' : 'Confirmation',
      icon: CheckCircle2,
      description: language === 'fr' ? 'Finalisation du compte' : language === 'de' ? 'Kontoabschluss' : 'Account finalization'
    }
  ];

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(\+|00)[1-9][0-9]{7,14}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validatePassword = (password: string): boolean => {
    // Minimum 8 caractères, une majuscule, une minuscule, un chiffre, un caractère spécial
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateAge = (birthDate: string): boolean => {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1 >= 16;
    }
    return age >= 16;
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 0) {
      // Validation identité
      if (!formData.firstName.trim()) {
        newErrors.firstName = language === 'fr' ? 'Le prénom est requis' : language === 'de' ? 'Vorname ist erforderlich' : 'First name is required';
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = language === 'fr' ? 'Le nom est requis' : language === 'de' ? 'Nachname ist erforderlich' : 'Last name is required';
      }
      if (!formData.birthDate) {
        newErrors.birthDate = language === 'fr' ? 'La date de naissance est requise' : language === 'de' ? 'Geburtsdatum ist erforderlich' : 'Birth date is required';
      } else if (!validateAge(formData.birthDate)) {
        newErrors.birthDate = language === 'fr' ? 'Vous devez avoir au moins 16 ans' : language === 'de' ? 'Sie müssen mindestens 16 Jahre alt sein' : 'You must be at least 16 years old';
      }
    }

    if (step === 1) {
      // Validation contact
      if (!formData.email.trim()) {
        newErrors.email = language === 'fr' ? 'L\'email est requis' : language === 'de' ? 'E-Mail ist erforderlich' : 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = language === 'fr' ? 'Email invalide' : language === 'de' ? 'Ungültige E-Mail' : 'Invalid email';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = language === 'fr' ? 'Le téléphone est requis' : language === 'de' ? 'Telefon ist erforderlich' : 'Phone is required';
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = language === 'fr' ? 'Format: +41 XX XXX XX XX ou +33 X XX XX XX XX' : language === 'de' ? 'Format: +41 XX XXX XX XX oder +49 XXX XXXXXXX' : 'Format: +41 XX XXX XX XX or +33 X XX XX XX XX';
      }
    }

    if (step === 2) {
      // Validation sécurité
      if (!formData.password) {
        newErrors.password = language === 'fr' ? 'Le mot de passe est requis' : language === 'de' ? 'Passwort ist erforderlich' : 'Password is required';
      } else if (!validatePassword(formData.password)) {
        newErrors.password = language === 'fr' 
          ? 'Min. 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial'
          : language === 'de'
          ? 'Min. 8 Zeichen, 1 Großbuchstabe, 1 Kleinbuchstabe, 1 Ziffer, 1 Sonderzeichen'
          : 'Min. 8 characters, 1 uppercase, 1 lowercase, 1 digit, 1 special character';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = language === 'fr' ? 'Les mots de passe ne correspondent pas' : language === 'de' ? 'Passwörter stimmen nicht überein' : 'Passwords do not match';
      }
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = language === 'fr' ? 'Vous devez accepter les CGU' : language === 'de' ? 'Sie müssen die AGB akzeptieren' : 'You must accept the terms';
      }
      if (!formData.acceptPrivacy) {
        newErrors.acceptPrivacy = language === 'fr' ? 'Vous devez accepter la politique de confidentialité' : language === 'de' ? 'Sie müssen die Datenschutzrichtlinie akzeptieren' : 'You must accept the privacy policy';
      }
      if (!formData.declareSincerity) {
        newErrors.declareSincerity = language === 'fr' ? 'Vous devez certifier la sincérité de vos informations' : language === 'de' ? 'Sie müssen die Richtigkeit Ihrer Angaben bestätigen' : 'You must certify the sincerity of your information';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 2) {
        // Simuler l'envoi des codes de vérification
        sendVerificationCodes();
      }
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const sendVerificationCodes = () => {
    // Simulation d'envoi de codes
    toast.success(
      language === 'fr'
        ? `Codes de vérification envoyés à ${formData.email} et ${formData.phone}`
        : language === 'de'
        ? `Verifizierungscodes an ${formData.email} und ${formData.phone} gesendet`
        : `Verification codes sent to ${formData.email} and ${formData.phone}`
    );
  };

  const handleVerifyEmail = () => {
    // Simulation - en production, vérifier avec le backend
    if (emailVerificationCode === '123456') {
      setIsEmailVerified(true);
      toast.success(
        language === 'fr' ? 'Email vérifié avec succès' : language === 'de' ? 'E-Mail erfolgreich verifiziert' : 'Email verified successfully'
      );
    } else {
      toast.error(
        language === 'fr' ? 'Code incorrect' : language === 'de' ? 'Falscher Code' : 'Incorrect code'
      );
    }
  };

  const handleVerifyPhone = () => {
    // Simulation - en production, vérifier avec le backend
    if (phoneVerificationCode === '654321') {
      setIsPhoneVerified(true);
      toast.success(
        language === 'fr' ? 'Téléphone vérifié avec succès' : language === 'de' ? 'Telefon erfolgreich verifiziert' : 'Phone verified successfully'
      );
    } else {
      toast.error(
        language === 'fr' ? 'Code incorrect' : language === 'de' ? 'Falscher Code' : 'Incorrect code'
      );
    }
  };

  const handleSubmit = () => {
    if (isEmailVerified && isPhoneVerified) {
      setAccountStatus('verified');
      setCurrentStep(4);
      toast.success(
        language === 'fr' 
          ? 'Compte créé avec succès !' 
          : language === 'de' 
          ? 'Konto erfolgreich erstellt!' 
          : 'Account created successfully!'
      );
    } else {
      toast.error(
        language === 'fr'
          ? 'Veuillez vérifier votre email et téléphone'
          : language === 'de'
          ? 'Bitte verifizieren Sie Ihre E-Mail und Telefonnummer'
          : 'Please verify your email and phone'
      );
    }
  };

  const getAccountStatusBadge = () => {
    const statusConfig = {
      pending: {
        color: 'bg-amber-50 text-amber-600 border border-amber-200',
        icon: AlertCircle,
        text: language === 'fr' ? 'En attente de validation' : language === 'de' ? 'Ausstehend' : 'Pending validation'
      },
      verified: {
        color: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
        icon: CheckCircle2,
        text: language === 'fr' ? 'Vérifié' : language === 'de' ? 'Verifiziert' : 'Verified'
      },
      active: {
        color: 'bg-blue-50 text-blue-600 border border-blue-200',
        icon: CheckCircle2,
        text: language === 'fr' ? 'Actif' : language === 'de' ? 'Aktiv' : 'Active'
      },
      restricted: {
        color: 'bg-red-50 text-red-600 border border-red-200',
        icon: AlertTriangle,
        text: language === 'fr' ? 'Restreint' : language === 'de' ? 'Eingeschränkt' : 'Restricted'
      }
    };

    const config = statusConfig[accountStatus];
    const Icon = config.icon;

    return (
      <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">CiviAgora</h1>
                <p className="text-xs text-gray-600">
                  {language === 'fr' ? 'Plateforme sécurisée' : language === 'de' ? 'Sichere Plattform' : 'Secure Platform'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Progress Stepper */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === index;
              const isCompleted = currentStep > index;

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-emerald-500 text-white'
                          : isActive
                          ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <p className={`text-sm font-medium ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500 hidden md:block">{step.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 mt-[-40px] transition-all ${
                        isCompleted ? 'bg-emerald-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="max-w-3xl mx-auto shadow-2xl border-2">
            <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <UserPlus className="w-7 h-7" />
                    {language === 'fr' ? 'Création de compte sécurisé' : language === 'de' ? 'Sichere Kontoerstellung' : 'Secure Account Creation'}
                  </CardTitle>
                  <CardDescription className="text-blue-50 mt-2">
                    {language === 'fr'
                      ? 'Un citoyen = Un compte = Un droit de participation'
                      : language === 'de'
                      ? 'Ein Bürger = Ein Konto = Ein Teilnahmerecht'
                      : 'One citizen = One account = One participation right'}
                  </CardDescription>
                </div>
                {currentStep === 4 && getAccountStatusBadge()}
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <AnimatePresence mode="wait">
                {/* Step 0: Identity */}
                {currentStep === 0 && (
                  <motion.div
                    key="step-0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {language === 'fr' ? 'Informations d\'identité' : language === 'de' ? 'Identitätsinformationen' : 'Identity Information'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {language === 'fr'
                          ? 'Ces informations permettent de garantir l\'unicité de votre compte'
                          : language === 'de'
                          ? 'Diese Informationen gewährleisten die Einzigartigkeit Ihres Kontos'
                          : 'This information ensures the uniqueness of your account'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-600" />
                          {language === 'fr' ? 'Prénom *' : language === 'de' ? 'Vorname *' : 'First Name *'}
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className={errors.firstName ? 'border-red-500' : ''}
                          placeholder={language === 'fr' ? 'Jean' : language === 'de' ? 'Hans' : 'John'}
                        />
                        {errors.firstName && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.firstName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-600" />
                          {language === 'fr' ? 'Nom *' : language === 'de' ? 'Nachname *' : 'Last Name *'}
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className={errors.lastName ? 'border-red-500' : ''}
                          placeholder={language === 'fr' ? 'Dupont' : language === 'de' ? 'Müller' : 'Doe'}
                        />
                        {errors.lastName && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="birthDate" className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-600" />
                        {language === 'fr' ? 'Date de naissance *' : language === 'de' ? 'Geburtsdatum *' : 'Birth Date *'}
                      </Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                        className={errors.birthDate ? 'border-red-500' : ''}
                      />
                      {errors.birthDate && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.birthDate}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Info className="w-3 h-3" />
                        {language === 'fr'
                          ? 'Vous devez avoir au moins 16 ans pour participer'
                          : language === 'de'
                          ? 'Sie müssen mindestens 16 Jahre alt sein, um teilzunehmen'
                          : 'You must be at least 16 years old to participate'}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Step 1: Contact */}
                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {language === 'fr' ? 'Coordonnées de contact' : language === 'de' ? 'Kontaktdaten' : 'Contact Information'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {language === 'fr'
                          ? 'Email et téléphone seront vérifiés pour sécuriser votre compte'
                          : language === 'de'
                          ? 'E-Mail und Telefon werden zur Sicherung Ihres Kontos verifiziert'
                          : 'Email and phone will be verified to secure your account'}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-600" />
                        {language === 'fr' ? 'Adresse email *' : language === 'de' ? 'E-Mail-Adresse *' : 'Email Address *'}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={errors.email ? 'border-red-500' : ''}
                        placeholder="jean.dupont@example.com"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Info className="w-3 h-3" />
                        {language === 'fr'
                          ? 'Un email unique par citoyen'
                          : language === 'de'
                          ? 'Eine eindeutige E-Mail pro Bürger'
                          : 'One unique email per citizen'}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-600" />
                        {language === 'fr' ? 'Numéro de téléphone *' : language === 'de' ? 'Telefonnummer *' : 'Phone Number *'}
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={errors.phone ? 'border-red-500' : ''}
                        placeholder="+41 XX XXX XX XX"
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.phone}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Info className="w-3 h-3" />
                        {language === 'fr'
                          ? 'Format international recommandé (ex: +41 79 123 45 67)'
                          : language === 'de'
                          ? 'Internationales Format empfohlen (z.B.: +41 79 123 45 67)'
                          : 'International format recommended (e.g.: +41 79 123 45 67)'}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Security */}
                {currentStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {language === 'fr' ? 'Sécurité et engagements' : language === 'de' ? 'Sicherheit und Verpflichtungen' : 'Security and Commitments'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {language === 'fr'
                          ? 'Définissez un mot de passe fort et acceptez nos conditions'
                          : language === 'de'
                          ? 'Legen Sie ein sicheres Passwort fest und akzeptieren Sie unsere Bedingungen'
                          : 'Set a strong password and accept our terms'}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-gray-600" />
                        {language === 'fr' ? 'Mot de passe *' : language === 'de' ? 'Passwort *' : 'Password *'}
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-gray-600" />
                        {language === 'fr' ? 'Confirmer le mot de passe *' : language === 'de' ? 'Passwort bestätigen *' : 'Confirm Password *'}
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className={errors.confirmPassword ? 'border-red-500 pr-10' : 'pr-10'}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-3">
                      <div className="flex items-start gap-2">
                        <Checkbox
                          id="acceptTerms"
                          checked={formData.acceptTerms}
                          onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
                        />
                        <Label htmlFor="acceptTerms" className="text-sm cursor-pointer">
                          {language === 'fr'
                            ? 'J\'accepte les Conditions Générales d\'Utilisation *'
                            : language === 'de'
                            ? 'Ich akzeptiere die Allgemeinen Geschäftsbedingungen *'
                            : 'I accept the Terms and Conditions *'}
                        </Label>
                      </div>
                      {errors.acceptTerms && (
                        <p className="text-sm text-red-600 ml-6">{errors.acceptTerms}</p>
                      )}

                      <div className="flex items-start gap-2">
                        <Checkbox
                          id="acceptPrivacy"
                          checked={formData.acceptPrivacy}
                          onCheckedChange={(checked) => setFormData({ ...formData, acceptPrivacy: checked as boolean })}
                        />
                        <Label htmlFor="acceptPrivacy" className="text-sm cursor-pointer">
                          {language === 'fr'
                            ? 'J\'accepte la Politique de Confidentialité *'
                            : language === 'de'
                            ? 'Ich akzeptiere die Datenschutzrichtlinie *'
                            : 'I accept the Privacy Policy *'}
                        </Label>
                      </div>
                      {errors.acceptPrivacy && (
                        <p className="text-sm text-red-600 ml-6">{errors.acceptPrivacy}</p>
                      )}

                      <div className="flex items-start gap-2">
                        <Checkbox
                          id="declareSincerity"
                          checked={formData.declareSincerity}
                          onCheckedChange={(checked) => setFormData({ ...formData, declareSincerity: checked as boolean })}
                        />
                        <Label htmlFor="declareSincerity" className="text-sm cursor-pointer">
                          {language === 'fr'
                            ? 'Je certifie l\'exactitude des informations fournies *'
                            : language === 'de'
                            ? 'Ich bestätige die Richtigkeit der bereitgestellten Informationen *'
                            : 'I certify the accuracy of the information provided *'}
                        </Label>
                      </div>
                      {errors.declareSincerity && (
                        <p className="text-sm text-red-600 ml-6">{errors.declareSincerity}</p>
                      )}
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-800">
                          {language === 'fr'
                            ? 'Toute tentative de fraude ou de création de comptes multiples entraînera la suspension immédiate et définitive de votre compte, ainsi que d\'éventuelles poursuites judiciaires.'
                            : language === 'de'
                            ? 'Jeder Betrugsversuch oder die Erstellung mehrerer Konten führt zur sofortigen und endgültigen Sperrung Ihres Kontos sowie zu möglichen rechtlichen Schritten.'
                            : 'Any attempt at fraud or creating multiple accounts will result in immediate and permanent suspension of your account, as well as possible legal action.'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Verification */}
                {currentStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {language === 'fr' ? 'Vérification de vos coordonnées' : language === 'de' ? 'Verifizierung Ihrer Kontaktdaten' : 'Verification of Your Contact Details'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {language === 'fr'
                          ? 'Saisissez les codes reçus par email et SMS'
                          : language === 'de'
                          ? 'Geben Sie die per E-Mail und SMS erhaltenen Codes ein'
                          : 'Enter the codes received by email and SMS'}
                      </p>
                    </div>

                    {/* Email Verification */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Mail className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {language === 'fr' ? 'Vérification email' : language === 'de' ? 'E-Mail-Verifizierung' : 'Email Verification'}
                            </p>
                            <p className="text-sm text-gray-600">{formData.email}</p>
                          </div>
                        </div>
                        {isEmailVerified && (
                          <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            {language === 'fr' ? 'Vérifié' : language === 'de' ? 'Verifiziert' : 'Verified'}
                          </Badge>
                        )}
                      </div>
                      {!isEmailVerified && (
                        <>
                          <div className="flex gap-2">
                            <Input
                              placeholder={language === 'fr' ? 'Code à 6 chiffres' : language === 'de' ? '6-stelliger Code' : '6-digit code'}
                              value={emailVerificationCode}
                              onChange={(e) => setEmailVerificationCode(e.target.value)}
                              maxLength={6}
                            />
                            <Button onClick={handleVerifyEmail} disabled={emailVerificationCode.length !== 6}>
                              {language === 'fr' ? 'Vérifier' : language === 'de' ? 'Verifizieren' : 'Verify'}
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500">
                            {language === 'fr'
                              ? 'Code de test: 123456'
                              : language === 'de'
                              ? 'Testcode: 123456'
                              : 'Test code: 123456'}
                          </p>
                        </>
                      )}
                    </div>

                    {/* Phone Verification */}
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <Phone className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {language === 'fr' ? 'Vérification téléphone' : language === 'de' ? 'Telefonverifizierung' : 'Phone Verification'}
                            </p>
                            <p className="text-sm text-gray-600">{formData.phone}</p>
                          </div>
                        </div>
                        {isPhoneVerified && (
                          <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            {language === 'fr' ? 'Vérifié' : language === 'de' ? 'Verifiziert' : 'Verified'}
                          </Badge>
                        )}
                      </div>
                      {!isPhoneVerified && (
                        <>
                          <div className="flex gap-2">
                            <Input
                              placeholder={language === 'fr' ? 'Code à 6 chiffres' : language === 'de' ? '6-stelliger Code' : '6-digit code'}
                              value={phoneVerificationCode}
                              onChange={(e) => setPhoneVerificationCode(e.target.value)}
                              maxLength={6}
                            />
                            <Button onClick={handleVerifyPhone} disabled={phoneVerificationCode.length !== 6}>
                              {language === 'fr' ? 'Vérifier' : language === 'de' ? 'Verifizieren' : 'Verify'}
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500">
                            {language === 'fr'
                              ? 'Code de test: 654321'
                              : language === 'de'
                              ? 'Testcode: 654321'
                              : 'Test code: 654321'}
                          </p>
                        </>
                      )}
                    </div>

                    {isEmailVerified && isPhoneVerified && (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <p className="text-sm text-emerald-800 font-medium">
                            {language === 'fr'
                              ? 'Vos coordonnées ont été vérifiées avec succès'
                              : language === 'de'
                              ? 'Ihre Kontaktdaten wurden erfolgreich verifiziert'
                              : 'Your contact details have been successfully verified'}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 4: Confirmation */}
                {currentStep === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-6 py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center"
                    >
                      <CheckCircle2 className="w-16 h-16 text-white" />
                    </motion.div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {language === 'fr' ? 'Compte créé avec succès !' : language === 'de' ? 'Konto erfolgreich erstellt!' : 'Account Successfully Created!'}
                      </h3>
                      <p className="text-gray-600">
                        {language === 'fr'
                          ? `Bienvenue sur CiviAgora, ${formData.firstName} ${formData.lastName}`
                          : language === 'de'
                          ? `Willkommen bei CiviAgora, ${formData.firstName} ${formData.lastName}`
                          : `Welcome to CiviAgora, ${formData.firstName} ${formData.lastName}`}
                      </p>
                    </div>

                    <div className="max-w-md mx-auto space-y-4">
                      <div className="bg-white border-2 border-emerald-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <p className="font-medium text-gray-900">
                            {language === 'fr' ? 'Statut du compte' : language === 'de' ? 'Kontostatus' : 'Account Status'}
                          </p>
                          {getAccountStatusBadge()}
                        </div>
                        <div className="space-y-3 text-left">
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span className="text-gray-700">
                              {language === 'fr' ? 'Identité enregistrée' : language === 'de' ? 'Identität registriert' : 'Identity registered'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span className="text-gray-700">
                              {language === 'fr' ? 'Email vérifié' : language === 'de' ? 'E-Mail verifiziert' : 'Email verified'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span className="text-gray-700">
                              {language === 'fr' ? 'Téléphone vérifié' : language === 'de' ? 'Telefon verifiziert' : 'Phone verified'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div className="text-left">
                            <p className="text-sm font-medium text-blue-900 mb-1">
                              {language === 'fr' ? 'Accès aux fonctionnalités' : language === 'de' ? 'Zugang zu Funktionen' : 'Access to Features'}
                            </p>
                            <p className="text-sm text-blue-800">
                              {language === 'fr'
                                ? 'Votre compte est vérifié et autorisé à participer aux consultations, pétitions et votes citoyens.'
                                : language === 'de'
                                ? 'Ihr Konto ist verifiziert und berechtigt, an Konsultationen, Petitionen und Bürgerabstimmungen teilzunehmen.'
                                : 'Your account is verified and authorized to participate in consultations, petitions and citizen votes.'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        onClick={() => window.location.href = '/'}
                      >
                        {language === 'fr' ? 'Accéder à la plateforme' : language === 'de' ? 'Zur Plattform gehen' : 'Access the Platform'}
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              {currentStep < 4 && (
                <div className="flex items-center justify-between mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    {language === 'fr' ? 'Précédent' : language === 'de' ? 'Zurück' : 'Previous'}
                  </Button>

                  {currentStep === 3 ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={!isEmailVerified || !isPhoneVerified}
                      className="gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      {language === 'fr' ? 'Créer mon compte sécurisé' : language === 'de' ? 'Sicheres Konto erstellen' : 'Create My Secure Account'}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      {language === 'fr' ? 'Suivant' : language === 'de' ? 'Weiter' : 'Next'}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Info Footer */}
        {currentStep < 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-600">
                {language === 'fr'
                  ? 'Vos données sont chiffrées et sécurisées'
                  : language === 'de'
                  ? 'Ihre Daten sind verschlüsselt und sicher'
                  : 'Your data is encrypted and secure'}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}