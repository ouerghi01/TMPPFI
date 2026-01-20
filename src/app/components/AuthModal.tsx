import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { LogIn, UserPlus, Shield, ShieldCheck, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    onOpenChange(false);
    navigate('/login');
  };

  const handleRegisterClick = () => {
    onOpenChange(false);
    navigate('/register');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500 px-6 py-8 text-white">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Shield className="w-10 h-10 text-white" />
              </div>
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl text-white text-center">
                {language === 'fr' && 'Bienvenue sur CiviAgora'}
                {language === 'de' && 'Willkommen bei CiviAgora'}
                {language === 'en' && 'Welcome to CiviAgora'}
              </DialogTitle>
              <DialogDescription className="text-blue-50 text-center">
                {language === 'fr' && 'Plateforme sécurisée de démocratie participative'}
                {language === 'de' && 'Sichere Plattform für partizipative Demokratie'}
                {language === 'en' && 'Secure participatory democracy platform'}
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="px-6 py-8 space-y-6">
            {/* Login Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer"
              onClick={handleLoginClick}
            >
              <div className="border-2 border-blue-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-lg transition-all bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <LogIn className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {language === 'fr' && 'Connexion'}
                      {language === 'de' && 'Anmelden'}
                      {language === 'en' && 'Login'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {language === 'fr' && 'Vous avez déjà un compte vérifié'}
                      {language === 'de' && 'Sie haben bereits ein verifiziertes Konto'}
                      {language === 'en' && 'You already have a verified account'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

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

            {/* Register Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer"
              onClick={handleRegisterClick}
            >
              <div className="border-2 border-emerald-200 rounded-xl p-6 hover:border-emerald-400 hover:shadow-lg transition-all bg-gradient-to-br from-emerald-50 to-green-50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-600 to-green-600 flex items-center justify-center flex-shrink-0">
                    <UserPlus className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {language === 'fr' && 'Créer un compte sécurisé'}
                      {language === 'de' && 'Sicheres Konto erstellen'}
                      {language === 'en' && 'Create a Secure Account'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {language === 'fr' && 'Première fois sur CiviAgora ? Créez votre compte en quelques étapes'}
                      {language === 'de' && 'Neu bei CiviAgora? Erstellen Sie Ihr Konto in wenigen Schritten'}
                      {language === 'en' && 'New to CiviAgora? Create your account in a few steps'}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-100 rounded px-2 py-1 w-fit">
                      <ShieldCheck className="w-3 h-3" />
                      {language === 'fr' && 'Vérification email + téléphone'}
                      {language === 'de' && 'E-Mail + Telefon-Verifizierung'}
                      {language === 'en' && 'Email + phone verification'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">
                    {language === 'fr' ? 'Plateforme sécurisée' : language === 'de' ? 'Sichere Plattform' : 'Secure Platform'}
                  </p>
                  <p className="text-xs text-blue-800">
                    {language === 'fr'
                      ? '1 citoyen = 1 compte. Vos données sont chiffrées et protégées.'
                      : language === 'de'
                      ? '1 Bürger = 1 Konto. Ihre Daten sind verschlüsselt und geschützt.'
                      : '1 citizen = 1 account. Your data is encrypted and protected.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Warning Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800">
                  {language === 'fr'
                    ? 'La création de comptes multiples est strictement interdite et peut entraîner des sanctions.'
                    : language === 'de'
                    ? 'Die Erstellung mehrerer Konten ist strengstens untersagt und kann zu Sanktionen führen.'
                    : 'Creating multiple accounts is strictly prohibited and may result in sanctions.'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}