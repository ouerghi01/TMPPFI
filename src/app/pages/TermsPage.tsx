import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PageLayout } from '../components/layout/PageLayout';
import { motion } from 'motion/react';
import { 
  FileText, 
  UserCheck, 
  Shield, 
  AlertTriangle, 
  Scale,
  CheckCircle2,
  XCircle,
  Info
} from 'lucide-react';

export function TermsPage() {
  const { t, language } = useLanguage();

  const sections = {
    intro: {
      fr: 'Les présentes Conditions Générales d\'Utilisation (CGU) régissent l\'accès et l\'utilisation de la plateforme CiviAgora. En accédant à cette plateforme, vous acceptez de vous conformer à ces conditions.',
      de: 'Diese Allgemeinen Nutzungsbedingungen (AGB) regeln den Zugang und die Nutzung der CiviAgora-Plattform. Durch den Zugriff auf diese Plattform erklären Sie sich damit einverstanden, diese Bedingungen einzuhalten.',
      en: 'These Terms of Service govern access to and use of the CiviAgora platform. By accessing this platform, you agree to comply with these terms.'
    },
    acceptance: {
      title: { fr: 'Acceptation des conditions', de: 'Akzeptanz der Bedingungen', en: 'Acceptance of terms' },
      content: {
        fr: 'En créant un compte ou en utilisant les services de CiviAgora, vous déclarez avoir lu, compris et accepté les présentes CGU ainsi que notre Politique de Confidentialité. Si vous n\'acceptez pas ces conditions, vous ne devez pas utiliser cette plateforme.',
        de: 'Durch das Erstellen eines Kontos oder die Nutzung der Dienste von CiviAgora erklären Sie, dass Sie diese AGB sowie unsere Datenschutzerklärung gelesen, verstanden und akzeptiert haben. Wenn Sie diese Bedingungen nicht akzeptieren, dürfen Sie diese Plattform nicht nutzen.',
        en: 'By creating an account or using CiviAgora services, you declare that you have read, understood and accepted these Terms of Service as well as our Privacy Policy. If you do not accept these terms, you must not use this platform.'
      }
    },
    userAccount: {
      title: { fr: 'Compte utilisateur', de: 'Benutzerkonto', en: 'User account' },
      requirements: [
        {
          title: { fr: 'Conditions d\'inscription', de: 'Registrierungsvoraussetzungen', en: 'Registration requirements' },
          desc: { fr: 'Vous devez être âgé d\'au moins 16 ans et résider dans une collectivité participante', de: 'Sie müssen mindestens 16 Jahre alt sein und in einer teilnehmenden Gemeinde wohnen', en: 'You must be at least 16 years old and reside in a participating community' }
        },
        {
          title: { fr: 'Informations exactes', de: 'Korrekte Angaben', en: 'Accurate information' },
          desc: { fr: 'Vous devez fournir des informations véridiques et les maintenir à jour', de: 'Sie müssen wahrheitsgemäße Informationen angeben und diese aktuell halten', en: 'You must provide truthful information and keep it up to date' }
        },
        {
          title: { fr: 'Sécurité du compte', de: 'Kontosicherheit', en: 'Account security' },
          desc: { fr: 'Vous êtes responsable de la confidentialité de vos identifiants', de: 'Sie sind für die Vertraulichkeit Ihrer Anmeldedaten verantwortlich', en: 'You are responsible for the confidentiality of your credentials' }
        },
        {
          title: { fr: 'Un compte par personne', de: 'Ein Konto pro Person', en: 'One account per person' },
          desc: { fr: 'Chaque utilisateur ne peut créer qu\'un seul compte', de: 'Jeder Benutzer darf nur ein Konto erstellen', en: 'Each user can only create one account' }
        }
      ]
    },
    serviceDescription: {
      title: { fr: 'Description des services', de: 'Dienstleistungsbeschreibung', en: 'Service description' },
      services: [
        { fr: 'Participation aux consultations publiques', de: 'Teilnahme an öffentlichen Konsultationen', en: 'Participation in public consultations' },
        { fr: 'Vote sur des référendums et décisions locales', de: 'Abstimmung über Referenden und lokale Entscheidungen', en: 'Voting on referendums and local decisions' },
        { fr: 'Signature et création de pétitions citoyennes', de: 'Unterzeichnung und Erstellung von Bürgerpetitionen', en: 'Signing and creating citizen petitions' },
        { fr: 'Participation aux assemblées citoyennes', de: 'Teilnahme an Bürgerversammlungen', en: 'Participation in citizen assemblies' },
        { fr: 'Suivi des conférences et événements démocratiques', de: 'Verfolgung von Konferenzen und demokratischen Veranstaltungen', en: 'Tracking conferences and democratic events' },
        { fr: 'Accès aux informations et résultats des processus participatifs', de: 'Zugang zu Informationen und Ergebnissen partizipativer Prozesse', en: 'Access to information and results of participatory processes' }
      ]
    },
    userObligations: {
      title: { fr: 'Obligations de l\'utilisateur', de: 'Pflichten des Nutzers', en: 'User obligations' },
      obligations: [
        { fr: 'Respecter les lois et règlements en vigueur', de: 'Geltende Gesetze und Vorschriften einhalten', en: 'Comply with applicable laws and regulations' },
        { fr: 'Maintenir un comportement respectueux et civil', de: 'Respektvolles und ziviles Verhalten wahren', en: 'Maintain respectful and civil behavior' },
        { fr: 'Ne pas publier de contenu diffamatoire, offensant ou illégal', de: 'Keine verleumderischen, beleidigenden oder illegalen Inhalte veröffentlichen', en: 'Not publish defamatory, offensive or illegal content' },
        { fr: 'Ne pas usurper l\'identité d\'autrui', de: 'Sich nicht für eine andere Person ausgeben', en: 'Not impersonate others' },
        { fr: 'Protéger la confidentialité de vos identifiants', de: 'Die Vertraulichkeit Ihrer Anmeldedaten schützen', en: 'Protect the confidentiality of your credentials' },
        { fr: 'Signaler tout contenu ou comportement inapproprié', de: 'Unangemessene Inhalte oder Verhaltensweisen melden', en: 'Report any inappropriate content or behavior' }
      ]
    },
    prohibitedUse: {
      title: { fr: 'Usages interdits', de: 'Verbotene Nutzung', en: 'Prohibited use' },
      prohibitions: [
        {
          title: { fr: 'Fraude électorale', de: 'Wahlbetrug', en: 'Electoral fraud' },
          desc: { fr: 'Toute tentative de manipulation des votes ou signatures', de: 'Jeder Versuch, Abstimmungen oder Unterschriften zu manipulieren', en: 'Any attempt to manipulate votes or signatures' }
        },
        {
          title: { fr: 'Spam et publicité', de: 'Spam und Werbung', en: 'Spam and advertising' },
          desc: { fr: 'Envoi massif de messages non sollicités ou publicité commerciale', de: 'Massenversand unerwünschter Nachrichten oder kommerzielle Werbung', en: 'Mass sending of unsolicited messages or commercial advertising' }
        },
        {
          title: { fr: 'Attaques informatiques', de: 'Cyberangriffe', en: 'Cyber attacks' },
          desc: { fr: 'Tentatives de piratage, injection de code malveillant, DDoS', de: 'Hacking-Versuche, Einschleusen von Schadcode, DDoS', en: 'Hacking attempts, malicious code injection, DDoS' }
        },
        {
          title: { fr: 'Contenu illégal', de: 'Illegale Inhalte', en: 'Illegal content' },
          desc: { fr: 'Publication de contenu violant les droits d\'auteur ou la loi', de: 'Veröffentlichung von Inhalten, die Urheberrechte oder Gesetze verletzen', en: 'Publishing content that violates copyright or law' }
        }
      ]
    },
    liability: {
      title: { fr: 'Responsabilité', de: 'Haftung', en: 'Liability' },
      platform: {
        fr: 'CiviAgora s\'efforce de maintenir un service de qualité mais ne garantit pas l\'absence d\'interruptions ou d\'erreurs. La plateforme se réserve le droit de suspendre temporairement l\'accès pour maintenance ou mise à jour.',
        de: 'CiviAgora ist bestrebt, einen qualitativ hochwertigen Service aufrechtzuerhalten, garantiert jedoch nicht die Abwesenheit von Unterbrechungen oder Fehlern. Die Plattform behält sich das Recht vor, den Zugang vorübergehend für Wartung oder Updates zu sperren.',
        en: 'CiviAgora strives to maintain a quality service but does not guarantee the absence of interruptions or errors. The platform reserves the right to temporarily suspend access for maintenance or updates.'
      },
      user: {
        fr: 'L\'utilisateur est seul responsable de ses contributions et de l\'usage qu\'il fait de la plateforme. CiviAgora ne saurait être tenue responsable des contenus publiés par les utilisateurs.',
        de: 'Der Benutzer ist allein verantwortlich für seine Beiträge und die Nutzung der Plattform. CiviAgora kann nicht für von Benutzern veröffentlichte Inhalte haftbar gemacht werden.',
        en: 'The user is solely responsible for their contributions and use of the platform. CiviAgora cannot be held responsible for content published by users.'
      }
    },
    modification: {
      title: { fr: 'Modification des conditions', de: 'Änderung der Bedingungen', en: 'Modification of terms' },
      content: {
        fr: 'CiviAgora se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés des modifications majeures par email et devront accepter les nouvelles conditions pour continuer à utiliser la plateforme.',
        de: 'CiviAgora behält sich das Recht vor, diese AGB jederzeit zu ändern. Benutzer werden per E-Mail über wesentliche Änderungen informiert und müssen die neuen Bedingungen akzeptieren, um die Plattform weiterhin nutzen zu können.',
        en: 'CiviAgora reserves the right to modify these Terms of Service at any time. Users will be informed of major changes by email and must accept the new terms to continue using the platform.'
      }
    },
    termination: {
      title: { fr: 'Résiliation', de: 'Kündigung', en: 'Termination' },
      content: {
        fr: 'Vous pouvez supprimer votre compte à tout moment depuis vos paramètres. CiviAgora se réserve le droit de suspendre ou supprimer tout compte en cas de violation des présentes CGU, après notification préalable sauf en cas d\'urgence.',
        de: 'Sie können Ihr Konto jederzeit über Ihre Einstellungen löschen. CiviAgora behält sich das Recht vor, jedes Konto bei Verstoß gegen diese AGB nach vorheriger Benachrichtigung zu sperren oder zu löschen, außer in Notfällen.',
        en: 'You can delete your account at any time from your settings. CiviAgora reserves the right to suspend or delete any account in case of violation of these Terms of Service, after prior notification except in emergencies.'
      }
    }
  };

  return (
    <PageLayout
      title={t('terms.title')}
      subtitle={t('terms.subtitle')}
      icon={FileText}
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
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {language === 'fr' ? 'Conditions Générales d\'Utilisation' : 
                   language === 'de' ? 'Allgemeine Nutzungsbedingungen' : 
                   'Terms of Service'}
                </h2>
                <p className="text-gray-700 leading-relaxed">{sections.intro[language]}</p>
              </div>
            </div>
          </motion.div>

          {/* Acceptance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">{t('terms.acceptance')}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">{sections.acceptance.content[language]}</p>
          </motion.div>

          {/* User Account */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">{t('terms.userAccount')}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {sections.userAccount.requirements.map((req, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    {req.title[language]}
                  </h3>
                  <p className="text-sm text-gray-600">{req.desc[language]}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Service Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">{t('terms.serviceDescription')}</h2>
            </div>

            <div className="space-y-2">
              {sections.serviceDescription.services.map((service, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">{service[language]}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* User Obligations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">{t('terms.userObligations')}</h2>
            </div>

            <div className="space-y-2">
              {sections.userObligations.obligations.map((obligation, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{obligation[language]}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Prohibited Use */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">{t('terms.prohibitedUse')}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {sections.prohibitedUse.prohibitions.map((prohibition, index) => (
                <div key={index} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h3 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    {prohibition.title[language]}
                  </h3>
                  <p className="text-sm text-red-700">{prohibition.desc[language]}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Liability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">{t('terms.liability')}</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  {language === 'fr' ? 'Responsabilité de la plateforme' : 
                   language === 'de' ? 'Haftung der Plattform' : 
                   'Platform liability'}
                </h3>
                <p className="text-gray-700 leading-relaxed">{sections.liability.platform[language]}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  {language === 'fr' ? 'Responsabilité de l\'utilisateur' : 
                   language === 'de' ? 'Haftung des Nutzers' : 
                   'User liability'}
                </h3>
                <p className="text-gray-700 leading-relaxed">{sections.liability.user[language]}</p>
              </div>
            </div>
          </motion.div>

          {/* Modification & Termination */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('terms.modification')}</h2>
              <p className="text-gray-700 leading-relaxed text-sm">{sections.modification.content[language]}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{sections.termination.title[language]}</h2>
              <p className="text-gray-700 leading-relaxed text-sm">{sections.termination.content[language]}</p>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200"
          >
            <p className="text-sm text-gray-600 mb-2">
              {language === 'fr' ? 'Pour toute question concernant ces conditions, contactez-nous :' : 
               language === 'de' ? 'Bei Fragen zu diesen Bedingungen kontaktieren Sie uns:' : 
               'For any questions regarding these terms, contact us:'}
            </p>
            <a href="mailto:legal@civiagora.ch" className="text-blue-600 hover:underline font-medium">
              legal@civiagora.ch
            </a>
            <p className="text-xs text-gray-500 mt-4">
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
