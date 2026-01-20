import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PageLayout } from '../components/layout/PageLayout';
import { motion } from 'motion/react';
import { 
  Cookie, 
  Shield, 
  Settings, 
  BarChart3, 
  CheckCircle2,
  XCircle,
  Info,
  Clock,
  Globe
} from 'lucide-react';

export function CookiesPage() {
  const { t, language } = useLanguage();
  const [cookieSettings, setCookieSettings] = useState({
    essential: true,
    functional: true,
    analytics: false
  });

  const content = {
    intro: {
      fr: 'Cette politique explique comment CiviAgora utilise les cookies et technologies similaires sur sa plateforme. En utilisant notre site, vous consentez à l\'utilisation des cookies conformément à cette politique.',
      de: 'Diese Richtlinie erklärt, wie CiviAgora Cookies und ähnliche Technologien auf seiner Plattform verwendet. Durch die Nutzung unserer Website stimmen Sie der Verwendung von Cookies gemäß dieser Richtlinie zu.',
      en: 'This policy explains how CiviAgora uses cookies and similar technologies on its platform. By using our site, you consent to the use of cookies in accordance with this policy.'
    },
    whatAre: {
      title: { fr: 'Qu\'est-ce qu\'un cookie ?', de: 'Was ist ein Cookie?', en: 'What is a cookie?' },
      desc: {
        fr: 'Un cookie est un petit fichier texte stocké sur votre appareil (ordinateur, smartphone, tablette) lorsque vous visitez un site web. Les cookies permettent au site de reconnaître votre appareil et de mémoriser vos préférences et actions.',
        de: 'Ein Cookie ist eine kleine Textdatei, die auf Ihrem Gerät (Computer, Smartphone, Tablet) gespeichert wird, wenn Sie eine Website besuchen. Cookies ermöglichen es der Website, Ihr Gerät zu erkennen und Ihre Präferenzen und Aktionen zu speichern.',
        en: 'A cookie is a small text file stored on your device (computer, smartphone, tablet) when you visit a website. Cookies allow the site to recognize your device and remember your preferences and actions.'
      }
    },
    types: {
      essential: {
        icon: Shield,
        title: { fr: 'Cookies essentiels', de: 'Essentielle Cookies', en: 'Essential cookies' },
        desc: {
          fr: 'Ces cookies sont nécessaires au fonctionnement du site et ne peuvent pas être désactivés. Ils permettent les fonctionnalités de base comme la navigation sécurisée et l\'accès aux zones protégées.',
          de: 'Diese Cookies sind für den Betrieb der Website erforderlich und können nicht deaktiviert werden. Sie ermöglichen grundlegende Funktionen wie sichere Navigation und Zugriff auf geschützte Bereiche.',
          en: 'These cookies are necessary for the site to function and cannot be disabled. They enable basic features such as secure browsing and access to protected areas.'
        },
        examples: [
          { fr: 'Session d\'authentification', de: 'Authentifizierungssitzung', en: 'Authentication session' },
          { fr: 'Sécurité CSRF', de: 'CSRF-Sicherheit', en: 'CSRF security' },
          { fr: 'Préférences de langue', de: 'Spracheinstellungen', en: 'Language preferences' },
          { fr: 'Panier et formulaires', de: 'Warenkorb und Formulare', en: 'Cart and forms' }
        ],
        duration: { fr: 'Session / 1 an', de: 'Sitzung / 1 Jahr', en: 'Session / 1 year' },
        canDisable: false
      },
      functional: {
        icon: Settings,
        title: { fr: 'Cookies fonctionnels', de: 'Funktionale Cookies', en: 'Functional cookies' },
        desc: {
          fr: 'Ces cookies permettent d\'améliorer les fonctionnalités et la personnalisation du site. Ils mémorisent vos choix (comme le mode sombre) et offrent des fonctionnalités améliorées.',
          de: 'Diese Cookies ermöglichen eine Verbesserung der Funktionen und Personalisierung der Website. Sie speichern Ihre Auswahlmöglichkeiten (wie den Dunkelmodus) und bieten erweiterte Funktionen.',
          en: 'These cookies allow for improved site functionality and personalization. They remember your choices (such as dark mode) and offer enhanced features.'
        },
        examples: [
          { fr: 'Thème (Light/Dark)', de: 'Thema (Hell/Dunkel)', en: 'Theme (Light/Dark)' },
          { fr: 'Préférences d\'affichage', de: 'Anzeigeeinstellungen', en: 'Display preferences' },
          { fr: 'Favoris sauvegardés', de: 'Gespeicherte Favoriten', en: 'Saved favorites' },
          { fr: 'Historique de navigation', de: 'Navigationsverlauf', en: 'Browsing history' }
        ],
        duration: { fr: '6 mois - 1 an', de: '6 Monate - 1 Jahr', en: '6 months - 1 year' },
        canDisable: true
      },
      analytics: {
        icon: BarChart3,
        title: { fr: 'Cookies analytiques', de: 'Analyse-Cookies', en: 'Analytics cookies' },
        desc: {
          fr: 'Ces cookies collectent des informations anonymes sur l\'utilisation du site pour nous aider à comprendre comment les visiteurs interagissent avec la plateforme et à améliorer l\'expérience utilisateur.',
          de: 'Diese Cookies sammeln anonyme Informationen über die Nutzung der Website, um uns zu helfen zu verstehen, wie Besucher mit der Plattform interagieren und das Benutzererlebnis zu verbessern.',
          en: 'These cookies collect anonymous information about site usage to help us understand how visitors interact with the platform and improve the user experience.'
        },
        examples: [
          { fr: 'Pages visitées', de: 'Besuchte Seiten', en: 'Pages visited' },
          { fr: 'Temps passé sur le site', de: 'Auf der Website verbrachte Zeit', en: 'Time spent on site' },
          { fr: 'Taux de clics', de: 'Klickraten', en: 'Click rates' },
          { fr: 'Sources de trafic', de: 'Verkehrsquellen', en: 'Traffic sources' }
        ],
        duration: { fr: '13 mois', de: '13 Monate', en: '13 months' },
        canDisable: true
      }
    },
    thirdParty: {
      title: { fr: 'Cookies tiers', de: 'Drittanbieter-Cookies', en: 'Third-party cookies' },
      desc: {
        fr: 'Nous utilisons un nombre limité de services tiers de confiance qui peuvent placer leurs propres cookies :',
        de: 'Wir verwenden eine begrenzte Anzahl vertrauenswürdiger Drittanbieterdienste, die möglicherweise ihre eigenen Cookies setzen:',
        en: 'We use a limited number of trusted third-party services that may place their own cookies:'
      },
      services: [
        {
          name: 'Matomo Analytics',
          purpose: { fr: 'Analyse anonymisée du trafic', de: 'Anonymisierte Verkehrsanalyse', en: 'Anonymized traffic analysis' },
          privacy: { fr: 'Hébergé en Belgique, données anonymisées', de: 'In Belgien gehostet, anonymisierte Daten', en: 'Hosted in Belgium, anonymized data' }
        }
      ]
    },
    management: {
      title: { fr: 'Gestion de vos préférences', de: 'Verwaltung Ihrer Präferenzen', en: 'Managing your preferences' },
      browser: {
        fr: 'Vous pouvez gérer ou supprimer les cookies selon vos préférences. La plupart des navigateurs acceptent automatiquement les cookies, mais vous pouvez modifier les paramètres de votre navigateur pour refuser les cookies.',
        de: 'Sie können Cookies nach Ihren Präferenzen verwalten oder löschen. Die meisten Browser akzeptieren Cookies automatisch, aber Sie können die Einstellungen Ihres Browsers ändern, um Cookies abzulehnen.',
        en: 'You can manage or delete cookies according to your preferences. Most browsers automatically accept cookies, but you can change your browser settings to refuse cookies.'
      },
      impact: {
        fr: 'Note : La désactivation de certains cookies peut affecter le fonctionnement de la plateforme.',
        de: 'Hinweis: Das Deaktivieren bestimmter Cookies kann die Funktionsweise der Plattform beeinträchtigen.',
        en: 'Note: Disabling certain cookies may affect the functionality of the platform.'
      }
    }
  };

  const handleCookieToggle = (type: 'essential' | 'functional' | 'analytics') => {
    if (type === 'essential') return; // Cannot disable essential cookies
    
    setCookieSettings(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const saveCookiePreferences = () => {
    // Simulate saving preferences
    alert(language === 'fr' ? 'Préférences enregistrées !' : 
          language === 'de' ? 'Einstellungen gespeichert!' : 
          'Preferences saved!');
  };

  return (
    <PageLayout
      title={t('cookies.title')}
      subtitle={t('cookies.subtitle')}
      icon={Cookie}
    >
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1280px] space-y-8">

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                <Info className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">{t('cookies.whatAre')}</h2>
                <p className="text-gray-700 leading-relaxed mb-3">{content.intro[language]}</p>
                <p className="text-gray-700 leading-relaxed">{content.whatAre.desc[language]}</p>
              </div>
            </div>
          </motion.div>

          {/* Cookie Types */}
          <div className="space-y-6">
            {/* Essential Cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">{content.types.essential.title[language]}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-500">{content.types.essential.duration[language]}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium">
                  <CheckCircle2 className="w-5 h-5" />
                  {language === 'fr' ? 'Toujours actifs' : language === 'de' ? 'Immer aktiv' : 'Always active'}
                </div>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">{content.types.essential.desc[language]}</p>

              <div className="grid md:grid-cols-2 gap-3">
                {content.types.essential.examples.map((example, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600 p-2 bg-gray-50 rounded">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                    {example[language]}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Functional Cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">{content.types.functional.title[language]}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-500">{content.types.functional.duration[language]}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleCookieToggle('functional')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    cookieSettings.functional
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {cookieSettings.functional ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      {language === 'fr' ? 'Activés' : language === 'de' ? 'Aktiviert' : 'Enabled'}
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5" />
                      {language === 'fr' ? 'Désactivés' : language === 'de' ? 'Deaktiviert' : 'Disabled'}
                    </>
                  )}
                </button>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">{content.types.functional.desc[language]}</p>

              <div className="grid md:grid-cols-2 gap-3">
                {content.types.functional.examples.map((example, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600 p-2 bg-gray-50 rounded">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    {example[language]}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Analytics Cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">{content.types.analytics.title[language]}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-500">{content.types.analytics.duration[language]}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleCookieToggle('analytics')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    cookieSettings.analytics
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {cookieSettings.analytics ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      {language === 'fr' ? 'Activés' : language === 'de' ? 'Aktiviert' : 'Enabled'}
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5" />
                      {language === 'fr' ? 'Désactivés' : language === 'de' ? 'Deaktiviert' : 'Disabled'}
                    </>
                  )}
                </button>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">{content.types.analytics.desc[language]}</p>

              <div className="grid md:grid-cols-2 gap-3">
                {content.types.analytics.examples.map((example, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600 p-2 bg-gray-50 rounded">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    {example[language]}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Third-party Cookies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">{content.thirdParty.title[language]}</h2>
            </div>

            <p className="text-gray-700 mb-4">{content.thirdParty.desc[language]}</p>

            <div className="space-y-3">
              {content.thirdParty.services.map((service, index) => (
                <div key={index} className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-sm text-gray-700 mb-1">{service.purpose[language]}</p>
                  <p className="text-xs text-gray-600 flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    {service.privacy[language]}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Cookie Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">{t('cookies.manage')}</h2>
            </div>

            <p className="text-gray-700 mb-4 leading-relaxed">{content.management.browser[language]}</p>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-900">{content.management.impact[language]}</p>
              </div>
            </div>

            <div className="flex justify-center">
              <motion.button
                onClick={saveCookiePreferences}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
              >
                {language === 'fr' ? 'Enregistrer mes préférences' : 
                 language === 'de' ? 'Einstellungen speichern' : 
                 'Save my preferences'}
              </motion.button>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center"
          >
            <p className="text-sm text-gray-500">
              {language === 'fr' ? 'Dernière mise à jour : 7 janvier 2025' : 
               language === 'de' ? 'Letzte Aktualisierung: 7. Januar 2025' : 
               'Last updated: January 7, 2025'}
            </p>
          </motion.div>

        </div>
      </div>
    </PageLayout>
  );
}