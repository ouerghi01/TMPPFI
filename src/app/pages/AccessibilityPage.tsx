import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PageLayout } from '../components/layout/PageLayout';
import { motion } from 'motion/react';
import { 
  Accessibility, 
  Contrast,
  Type,
  CheckCircle,
  Mail,
  AlertCircle,
  Monitor
} from 'lucide-react';

export function AccessibilityPage() {
  const { t, language } = useLanguage();

  const content = {
    intro: {
      fr: 'CiviAgora s\'engage à garantir l\'accessibilité numérique de sa plateforme pour tous les citoyens, y compris les personnes en situation de handicap. Nous travaillons continuellement pour améliorer l\'expérience utilisateur et nous conformer aux normes d\'accessibilité internationales.',
      de: 'CiviAgora verpflichtet sich, die digitale Zugänglichkeit seiner Plattform für alle Bürger zu gewährleisten, einschließlich Menschen mit Behinderungen. Wir arbeiten kontinuierlich daran, das Benutzererlebnis zu verbessern und internationale Zugänglichkeitsstandards einzuhalten.',
      en: 'CiviAgora is committed to ensuring the digital accessibility of its platform for all citizens, including people with disabilities. We work continuously to improve the user experience and comply with international accessibility standards.'
    },
    standards: {
      title: { fr: 'Normes de conformité', de: 'Konformitätsstandards', en: 'Compliance standards' },
      items: [
        {
          standard: 'WCAG 2.1',
          level: { fr: 'Niveau AA', de: 'Stufe AA', en: 'Level AA' },
          desc: { fr: 'Directives pour l\'accessibilité du contenu Web', de: 'Richtlinien für barrierefreie Webinhalte', en: 'Web Content Accessibility Guidelines' }
        },
        {
          standard: 'EN 301 549',
          level: { fr: 'Conforme', de: 'Konform', en: 'Compliant' },
          desc: { fr: 'Norme européenne d\'accessibilité', de: 'Europäischer Zugänglichkeitsstandard', en: 'European accessibility standard' }
        },
        {
          standard: 'Section 508',
          level: { fr: 'Conforme', de: 'Konform', en: 'Compliant' },
          desc: { fr: 'Norme d\'accessibilité des États-Unis', de: 'US-Zugänglichkeitsstandard', en: 'US accessibility standard' }
        }
      ]
    },
    features: {
      title: { fr: 'Fonctionnalités d\'accessibilité', de: 'Barrierefreiheitsfunktionen', en: 'Accessibility features' },
      list: [
        {
          icon: Contrast,
          title: { fr: 'Contraste et lisibilité', de: 'Kontrast und Lesbarkeit', en: 'Contrast and readability' },
          desc: { fr: 'Ratio de contraste minimum de 4.5:1 pour le texte normal et 3:1 pour le texte large', de: 'Mindestkontrastverhältnis von 4,5:1 für normalen Text und 3:1 für großen Text', en: 'Minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text' },
          items: [
            { fr: 'Couleurs avec contraste élevé', de: 'Farben mit hohem Kontrast', en: 'High contrast colors' },
            { fr: 'Pas de dépendance à la couleur seule', de: 'Keine Abhängigkeit nur von Farbe', en: 'No reliance on color alone' },
            { fr: 'Texte redimensionnable jusqu\'à 200%', de: 'Text bis zu 200% skalierbar', en: 'Text scalable up to 200%' },
            { fr: 'Police lisible et espacement optimal', de: 'Lesbare Schrift und optimaler Abstand', en: 'Readable font and optimal spacing' }
          ]
        },
        {
          icon: Type,
          title: { fr: 'Personnalisation du texte', de: 'Textanpassung', en: 'Text customization' },
          desc: { fr: 'Possibilité d\'ajuster la taille du texte et d\'utiliser des polices personnalisées', de: 'Möglichkeit, Textgröße anzupassen und benutzerdefinierte Schriftarten zu verwenden', en: 'Ability to adjust text size and use custom fonts' },
          items: [
            { fr: 'Zoom navigateur supporté (jusqu\'à 400%)', de: 'Browser-Zoom unterstützt (bis 400%)', en: 'Browser zoom supported (up to 400%)' },
            { fr: 'Pas de limitation de hauteur fixe', de: 'Keine feste Höhenbeschränkung', en: 'No fixed height limitation' },
            { fr: 'Espacement des lignes ajustable', de: 'Anpassbarer Zeilenabstand', en: 'Adjustable line spacing' },
            { fr: 'Utilisation de polices système', de: 'Verwendung von Systemschriften', en: 'Use of system fonts' }
          ]
        }
      ]
    },
    testing: {
      title: { fr: 'Tests et validation', de: 'Tests und Validierung', en: 'Testing and validation' },
      desc: {
        fr: 'Notre plateforme est régulièrement testée avec divers outils et méthodes pour garantir son accessibilité.',
        de: 'Unsere Plattform wird regelmäßig mit verschiedenen Tools und Methoden getestet, um ihre Zugänglichkeit zu gewährleisten.',
        en: 'Our platform is regularly tested with various tools and methods to ensure its accessibility.'
      },
      tools: [
        { fr: 'Tests automatisés avec axe DevTools et WAVE', de: 'Automatisierte Tests mit axe DevTools und WAVE', en: 'Automated tests with axe DevTools and WAVE' },
        { fr: 'Tests manuels avec lecteurs d\'écran', de: 'Manuelle Tests mit Bildschirmlesern', en: 'Manual tests with screen readers' },
        { fr: 'Navigation complète au clavier', de: 'Vollständige Tastaturnavigation', en: 'Complete keyboard navigation' },
        { fr: 'Tests avec utilisateurs en situation de handicap', de: 'Tests mit Benutzern mit Behinderungen', en: 'Tests with users with disabilities' }
      ]
    },
    limitations: {
      title: { fr: 'Limitations connues', de: 'Bekannte Einschränkungen', en: 'Known limitations' },
      desc: {
        fr: 'Bien que nous nous efforcions de rendre la plateforme aussi accessible que possible, certaines limitations subsistent :',
        de: 'Obwohl wir uns bemühen, die Plattform so zugänglich wie möglich zu machen, bestehen einige Einschränkungen:',
        en: 'While we strive to make the platform as accessible as possible, some limitations remain:'
      },
      items: [
        {
          issue: { fr: 'Documents PDF externes', de: 'Externe PDF-Dokumente', en: 'External PDF documents' },
          status: { fr: 'En cours d\'amélioration', de: 'In Verbesserung', en: 'Being improved' }
        },
        {
          issue: { fr: 'Certains graphiques complexes', de: 'Einige komplexe Grafiken', en: 'Some complex charts' },
          status: { fr: 'Descriptions alternatives fournies', de: 'Alternative Beschreibungen bereitgestellt', en: 'Alternative descriptions provided' }
        }
      ]
    },
    feedback: {
      title: { fr: 'Signaler un problème d\'accessibilité', de: 'Barrierefreiheitsproblem melden', en: 'Report an accessibility issue' },
      desc: {
        fr: 'Nous prenons au sérieux tous les retours concernant l\'accessibilité. Si vous rencontrez des difficultés pour accéder à certaines fonctionnalités, veuillez nous contacter.',
        de: 'Wir nehmen alle Rückmeldungen zur Barrierefreiheit ernst. Wenn Sie Schwierigkeiten beim Zugriff auf bestimmte Funktionen haben, kontaktieren Sie uns bitte.',
        en: 'We take all feedback regarding accessibility seriously. If you experience difficulties accessing certain features, please contact us.'
      }
    }
  };

  return (
    <PageLayout
      title={t('accessibility.title')}
      subtitle={t('accessibility.subtitle')}
      icon={Accessibility}
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
                <Accessibility className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">{t('accessibility.commitment')}</h2>
                <p className="text-gray-700 leading-relaxed">{content.intro[language]}</p>
              </div>
            </div>
          </motion.div>

          {/* Standards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">{t('accessibility.standards')}</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {content.standards.items.map((item, index) => (
                <div key={index} className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.standard}</h3>
                  <p className="text-sm text-green-700 font-medium mb-2">{item.level[language]}</p>
                  <p className="text-sm text-gray-600">{item.desc[language]}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">{t('accessibility.features')}</h2>
            </div>

            <div className="space-y-6">
              {content.features.list.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="p-6 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title[language]}</h3>
                        <p className="text-gray-700 mb-3">{feature.desc[language]}</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-2 ml-14">
                      {feature.items.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{item[language]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Testing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">{content.testing.title[language]}</h2>
            </div>

            <p className="text-gray-700 mb-4">{content.testing.desc[language]}</p>

            <div className="space-y-2">
              {content.testing.tools.map((tool, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">{tool[language]}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Limitations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">{content.limitations.title[language]}</h2>
            </div>

            <p className="text-gray-700 mb-4">{content.limitations.desc[language]}</p>

            <div className="space-y-3">
              {content.limitations.items.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.issue[language]}</h3>
                    <p className="text-sm text-amber-700">{item.status[language]}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Feedback */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">{t('accessibility.feedback')}</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">{content.feedback.desc[language]}</p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    href="mailto:accessibility@civiagora.ch" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    <Mail className="w-5 h-5" />
                    accessibility@civiagora.ch
                  </a>
                  <div className="text-sm text-gray-600 flex items-center">
                    {language === 'fr' 
                      ? 'Réponse sous 48h ouvrées'
                      : language === 'de'
                      ? 'Antwort innerhalb von 48 Werktagen'
                      : 'Response within 48 business hours'}
                  </div>
                </div>
              </div>
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