import React, { useState } from 'react';
import { Settings, Globe, Mail, Shield, Save, CheckCircle, Database, Bell, Lock, Server } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { useLanguage } from '../../contexts/LanguageContext';

export function SettingsPage() {
  const { language } = useLanguage();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {language === 'fr' ? 'Paramètres Super Admin' : language === 'de' ? 'Super Admin Einstellungen' : 'Super Admin Settings'}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'fr' ? 'Configuration globale de la plateforme SaaS' : language === 'de' ? 'Globale Konfiguration der SaaS-Plattform' : 'Global SaaS platform configuration'}
            </p>
          </div>
        </div>

        <Button onClick={handleSave} className="gap-2">
          {saved ? (
            <>
              <CheckCircle className="w-4 h-4" />
              {language === 'fr' ? 'Sauvegardé' : language === 'de' ? 'Gespeichert' : 'Saved'}
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {language === 'fr' ? 'Sauvegarder' : language === 'de' ? 'Speichern' : 'Save'}
            </>
          )}
        </Button>
      </div>

      {/* Platform Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5" />
            {language === 'fr' ? 'Informations de la plateforme' : language === 'de' ? 'Plattforminformationen' : 'Platform Information'}
          </CardTitle>
          <CardDescription>
            {language === 'fr' ? 'Paramètres généraux de la plateforme CiviAgora SaaS' : language === 'de' ? 'Allgemeine Einstellungen der CiviAgora SaaS Plattform' : 'General CiviAgora SaaS platform settings'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {language === 'fr' ? 'Nom de la plateforme' : language === 'de' ? 'Plattformname' : 'Platform Name'}
              </label>
              <input
                type="text"
                defaultValue="CiviAgora SaaS"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {language === 'fr' ? 'Version de la plateforme' : language === 'de' ? 'Plattformversion' : 'Platform Version'}
              </label>
              <input
                type="text"
                defaultValue="2.5.0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {language === 'fr' ? 'URL de base' : language === 'de' ? 'Basis-URL' : 'Base URL'}
              </label>
              <input
                type="text"
                defaultValue="https://civiagora.ch"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {language === 'fr' ? 'Environnement' : language === 'de' ? 'Umgebung' : 'Environment'}
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white">
                <option>Production</option>
                <option>Staging</option>
                <option>Development</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="maintenance-mode"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="maintenance-mode" className="text-sm text-gray-700 dark:text-gray-300">
                {language === 'fr' ? 'Mode maintenance activé' : language === 'de' ? 'Wartungsmodus aktiviert' : 'Maintenance mode enabled'}
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            {language === 'fr' ? 'Paramètres linguistiques' : language === 'de' ? 'Spracheinstellungen' : 'Language Settings'}
          </CardTitle>
          <CardDescription>
            {language === 'fr' ? 'Configuration multilingue globale' : language === 'de' ? 'Globale mehrsprachige Konfiguration' : 'Global multilingual configuration'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {language === 'fr' ? 'Langues disponibles' : language === 'de' ? 'Verfügbare Sprachen' : 'Available Languages'}
            </label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="lang-fr"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="lang-fr" className="text-sm text-gray-700 dark:text-gray-300">
                  Français (FR)
                </label>
                <Badge variant="outline" className="ml-auto">
                  {language === 'fr' ? 'Défaut' : language === 'de' ? 'Standard' : 'Default'}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="lang-de"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="lang-de" className="text-sm text-gray-700 dark:text-gray-300">
                  Deutsch (DE)
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="lang-en"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="lang-en" className="text-sm text-gray-700 dark:text-gray-300">
                  English (EN)
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {language === 'fr' ? 'Langue par défaut' : language === 'de' ? 'Standardsprache' : 'Default Language'}
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white">
              <option value="fr">Français (FR)</option>
              <option value="de">Deutsch (DE)</option>
              <option value="en">English (EN)</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Email Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            {language === 'fr' ? 'Configuration email' : language === 'de' ? 'E-Mail-Konfiguration' : 'Email Configuration'}
          </CardTitle>
          <CardDescription>
            {language === 'fr' ? 'Paramètres SMTP et emails système globaux' : language === 'de' ? 'Globale SMTP- und System-E-Mail-Einstellungen' : 'Global SMTP and system email settings'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {language === 'fr' ? 'Serveur SMTP' : language === 'de' ? 'SMTP-Server' : 'SMTP Server'}
              </label>
              <input
                type="text"
                placeholder="smtp.example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {language === 'fr' ? 'Port SMTP' : language === 'de' ? 'SMTP-Port' : 'SMTP Port'}
              </label>
              <input
                type="number"
                defaultValue="587"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {language === 'fr' ? 'Nom d\'utilisateur' : language === 'de' ? 'Benutzername' : 'Username'}
              </label>
              <input
                type="text"
                placeholder="noreply@civiagora.ch"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {language === 'fr' ? 'Mot de passe' : language === 'de' ? 'Passwort' : 'Password'}
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="smtp-tls"
                defaultChecked
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="smtp-tls" className="text-sm text-gray-700 dark:text-gray-300">
                {language === 'fr' ? 'Utiliser TLS/SSL' : language === 'de' ? 'TLS/SSL verwenden' : 'Use TLS/SSL'}
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {language === 'fr' ? 'Email d\'expédition' : language === 'de' ? 'Absender-E-Mail' : 'From Email'}
            </label>
            <input
              type="email"
              defaultValue="noreply@civiagora.ch"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {language === 'fr' ? 'Nom d\'expédition' : language === 'de' ? 'Absendername' : 'From Name'}
            </label>
            <input
              type="text"
              defaultValue="CiviAgora SaaS"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            {language === 'fr' ? 'Sécurité globale' : language === 'de' ? 'Globale Sicherheit' : 'Global Security'}
          </CardTitle>
          <CardDescription>
            {language === 'fr' ? 'Paramètres de sécurité et authentification' : language === 'de' ? 'Sicherheits- und Authentifizierungseinstellungen' : 'Security and authentication settings'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {language === 'fr' ? 'Politique de mot de passe' : language === 'de' ? 'Passwortrichtlinie' : 'Password Policy'}
            </label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pwd-length"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="pwd-length" className="text-sm text-gray-700 dark:text-gray-300">
                  {language === 'fr' ? 'Minimum 8 caractères' : language === 'de' ? 'Mindestens 8 Zeichen' : 'Minimum 8 characters'}
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pwd-uppercase"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="pwd-uppercase" className="text-sm text-gray-700 dark:text-gray-300">
                  {language === 'fr' ? 'Au moins une majuscule' : language === 'de' ? 'Mindestens ein Großbuchstabe' : 'At least one uppercase letter'}
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pwd-number"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="pwd-number" className="text-sm text-gray-700 dark:text-gray-300">
                  {language === 'fr' ? 'Au moins un chiffre' : language === 'de' ? 'Mindestens eine Ziffer' : 'At least one number'}
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pwd-special"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="pwd-special" className="text-sm text-gray-700 dark:text-gray-300">
                  {language === 'fr' ? 'Au moins un caractère spécial' : language === 'de' ? 'Mindestens ein Sonderzeichen' : 'At least one special character'}
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {language === 'fr' ? 'Durée de session (minutes)' : language === 'de' ? 'Sitzungsdauer (Minuten)' : 'Session Duration (minutes)'}
            </label>
            <input
              type="number"
              defaultValue="60"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="2fa-required"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="2fa-required" className="text-sm text-gray-700 dark:text-gray-300">
                {language === 'fr' ? 'Authentification à deux facteurs obligatoire pour les admins' : language === 'de' ? 'Zwei-Faktor-Authentifizierung für Admins erforderlich' : 'Two-factor authentication required for admins'}
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Database Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            {language === 'fr' ? 'Configuration de la base de données' : language === 'de' ? 'Datenbankkonfiguration' : 'Database Configuration'}
          </CardTitle>
          <CardDescription>
            {language === 'fr' ? 'Paramètres de connexion et de sauvegarde' : language === 'de' ? 'Verbindungs- und Sicherungseinstellungen' : 'Connection and backup settings'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              {language === 'fr' ? 'Les paramètres de base de données sont gérés au niveau infrastructure pour des raisons de sécurité.' : language === 'de' ? 'Datenbankeinstellungen werden aus Sicherheitsgründen auf Infrastrukturebene verwaltet.' : 'Database settings are managed at the infrastructure level for security reasons.'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {language === 'fr' ? 'Fréquence de sauvegarde automatique' : language === 'de' ? 'Häufigkeit automatischer Sicherungen' : 'Automatic Backup Frequency'}
            </label>
            <select 
              defaultValue="every-6-hours"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option value="hourly">{language === 'fr' ? 'Toutes les heures' : language === 'de' ? 'Stündlich' : 'Every hour'}</option>
              <option value="every-6-hours">{language === 'fr' ? 'Toutes les 6 heures' : language === 'de' ? 'Alle 6 Stunden' : 'Every 6 hours'}</option>
              <option value="daily">{language === 'fr' ? 'Quotidienne' : language === 'de' ? 'Täglich' : 'Daily'}</option>
              <option value="weekly">{language === 'fr' ? 'Hebdomadaire' : language === 'de' ? 'Wöchentlich' : 'Weekly'}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {language === 'fr' ? 'Rétention des sauvegardes (jours)' : language === 'de' ? 'Aufbewahrung von Sicherungen (Tage)' : 'Backup Retention (days)'}
            </label>
            <input
              type="number"
              defaultValue="30"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            {language === 'fr' ? 'Notifications système' : language === 'de' ? 'Systembenachrichtigungen' : 'System Notifications'}
          </CardTitle>
          <CardDescription>
            {language === 'fr' ? 'Configuration des alertes et notifications globales' : language === 'de' ? 'Konfiguration globaler Warnungen und Benachrichtigungen' : 'Global alerts and notifications configuration'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="notify-new-org"
                defaultChecked
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="notify-new-org" className="text-sm text-gray-700 dark:text-gray-300">
                {language === 'fr' ? 'Nouvelle organisation créée' : language === 'de' ? 'Neue Organisation erstellt' : 'New organization created'}
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="notify-critical-error"
                defaultChecked
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="notify-critical-error" className="text-sm text-gray-700 dark:text-gray-300">
                {language === 'fr' ? 'Erreur critique système' : language === 'de' ? 'Kritischer Systemfehler' : 'Critical system error'}
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="notify-security"
                defaultChecked
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="notify-security" className="text-sm text-gray-700 dark:text-gray-300">
                {language === 'fr' ? 'Alertes de sécurité' : language === 'de' ? 'Sicherheitswarnungen' : 'Security alerts'}
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="notify-quota"
                defaultChecked
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="notify-quota" className="text-sm text-gray-700 dark:text-gray-300">
                {language === 'fr' ? 'Dépassement de quota' : language === 'de' ? 'Kontingentüberschreitung' : 'Quota exceeded'}
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {language === 'fr' ? 'Email des notifications critiques' : language === 'de' ? 'E-Mail für kritische Benachrichtigungen' : 'Critical Notifications Email'}
            </label>
            <input
              type="email"
              defaultValue="admin@civiagora.ch"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}