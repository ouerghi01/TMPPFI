import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PageLayout } from '../components/layout/PageLayout';
import { motion } from 'motion/react';
import { 
  Shield, 
  Database, 
  Lock, 
  Eye, 
  UserCheck, 
  Server,
  Mail,
  Clock,
  CheckCircle2
} from 'lucide-react';

export function PrivacyPage() {
  const { t, language } = useLanguage();

  const sections = {
    intro: {
      fr: 'CiviAgora s\'engage à protéger votre vie privée et vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos informations conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi belge relative à la protection de la vie privée.',
      de: 'CiviAgora verpflichtet sich, Ihre Privatsphäre und Ihre personenbezogenen Daten zu schützen. Diese Datenschutzerklärung erklärt, wie wir Ihre Informationen gemäß der Datenschutz-Grundverordnung (DSGVO) und dem belgischen Datenschutzgesetz sammeln, verwenden, speichern und schützen.',
      en: 'CiviAgora is committed to protecting your privacy and personal data. This privacy policy explains how we collect, use, store and protect your information in accordance with the General Data Protection Regulation (GDPR) and Belgian privacy law.'
    },
    dataCollected: {
      title: {
        fr: 'Données que nous collectons',
        de: 'Von uns gesammelte Daten',
        en: 'Data we collect'
      },
      items: [
        {
          category: { fr: 'Données d\'identification', de: 'Identifikationsdaten', en: 'Identification data' },
          examples: { fr: 'Nom, prénom, adresse email, numéro de téléphone', de: 'Name, Vorname, E-Mail-Adresse, Telefonnummer', en: 'Name, first name, email address, phone number' }
        },
        {
          category: { fr: 'Données de connexion', de: 'Verbindungsdaten', en: 'Connection data' },
          examples: { fr: 'Adresse IP, logs de connexion, cookies', de: 'IP-Adresse, Verbindungsprotokolle, Cookies', en: 'IP address, connection logs, cookies' }
        },
        {
          category: { fr: 'Données de participation', de: 'Teilnahmedaten', en: 'Participation data' },
          examples: { fr: 'Votes, commentaires, signatures de pétitions', de: 'Abstimmungen, Kommentare, Petitionsunterschriften', en: 'Votes, comments, petition signatures' }
        },
        {
          category: { fr: 'Données techniques', de: 'Technische Daten', en: 'Technical data' },
          examples: { fr: 'Type de navigateur, système d\'exploitation, résolution d\'écran', de: 'Browsertyp, Betriebssystem, Bildschirmauflösung', en: 'Browser type, operating system, screen resolution' }
        }
      ]
    },
    dataUsage: {
      title: {
        fr: 'Comment nous utilisons vos données',
        de: 'Wie wir Ihre Daten verwenden',
        en: 'How we use your data'
      },
      purposes: [
        {
          icon: UserCheck,
          title: { fr: 'Gestion de compte', de: 'Kontoverwaltung', en: 'Account management' },
          desc: { fr: 'Création et gestion de votre compte utilisateur', de: 'Erstellung und Verwaltung Ihres Benutzerkontos', en: 'Creation and management of your user account' }
        },
        {
          icon: CheckCircle2,
          title: { fr: 'Processus participatifs', de: 'Partizipative Prozesse', en: 'Participatory processes' },
          desc: { fr: 'Permettre votre participation aux consultations, votes et pétitions', de: 'Ihre Teilnahme an Konsultationen, Abstimmungen und Petitionen ermöglichen', en: 'Enable your participation in consultations, votes and petitions' }
        },
        {
          icon: Mail,
          title: { fr: 'Communications', de: 'Kommunikation', en: 'Communications' },
          desc: { fr: 'Envoi de notifications et d\'informations relatives à vos participations', de: 'Versand von Benachrichtigungen und Informationen zu Ihren Teilnahmen', en: 'Sending notifications and information related to your participations' }
        },
        {
          icon: Shield,
          title: { fr: 'Sécurité', de: 'Sicherheit', en: 'Security' },
          desc: { fr: 'Protection contre la fraude et garantie de l\'intégrité des votes', de: 'Schutz vor Betrug und Gewährleistung der Integrität von Abstimmungen', en: 'Protection against fraud and ensuring voting integrity' }
        }
      ]
    },
    dataStorage: {
      title: {
        fr: 'Stockage et conservation',
        de: 'Speicherung und Aufbewahrung',
        en: 'Storage and retention'
      },
      details: {
        location: {
          fr: 'Vos données sont stockées sur des serveurs sécurisés situés en Belgique, conformément aux normes de sécurité les plus strictes.',
          de: 'Ihre Daten werden auf sicheren Servern in Belgien gespeichert, die den strengsten Sicherheitsstandards entsprechen.',
          en: 'Your data is stored on secure servers located in Belgium, in accordance with the strictest security standards.'
        },
        duration: {
          fr: 'Nous conservons vos données personnelles uniquement pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées, ou conformément aux obligations légales (généralement 5 ans pour les données de participation aux processus démocratiques).',
          de: 'Wir bewahren Ihre personenbezogenen Daten nur so lange auf, wie es für die Zwecke erforderlich ist, für die sie erhoben wurden, oder gemäß den gesetzlichen Verpflichtungen (in der Regel 5 Jahre für Daten zur Teilnahme an demokratischen Prozessen).',
          en: 'We retain your personal data only for as long as necessary for the purposes for which it was collected, or in accordance with legal obligations (generally 5 years for data on participation in democratic processes).'
        }
      }
    },
    rights: {
      title: {
        fr: 'Vos droits',
        de: 'Ihre Rechte',
        en: 'Your rights'
      },
      list: [
        {
          right: { fr: 'Droit d\'accès', de: 'Auskunftsrecht', en: 'Right of access' },
          desc: { fr: 'Obtenir une copie de vos données personnelles', de: 'Eine Kopie Ihrer personenbezogenen Daten erhalten', en: 'Obtain a copy of your personal data' }
        },
        {
          right: { fr: 'Droit de rectification', de: 'Berichtigungsrecht', en: 'Right to rectification' },
          desc: { fr: 'Corriger vos données inexactes ou incomplètes', de: 'Ihre ungenauen oder unvollständigen Daten korrigieren', en: 'Correct your inaccurate or incomplete data' }
        },
        {
          right: { fr: 'Droit à l\'effacement', de: 'Recht auf Löschung', en: 'Right to erasure' },
          desc: { fr: 'Demander la suppression de vos données (sous réserve des obligations légales)', de: 'Die Löschung Ihrer Daten verlangen (vorbehaltlich gesetzlicher Verpflichtungen)', en: 'Request deletion of your data (subject to legal obligations)' }
        },
        {
          right: { fr: 'Droit à la portabilité', de: 'Recht auf Datenübertragbarkeit', en: 'Right to data portability' },
          desc: { fr: 'Recevoir vos données dans un format structuré', de: 'Ihre Daten in einem strukturierten Format erhalten', en: 'Receive your data in a structured format' }
        },
        {
          right: { fr: 'Droit d\'opposition', de: 'Widerspruchsrecht', en: 'Right to object' },
          desc: { fr: 'Vous opposer au traitement de vos données', de: 'Der Verarbeitung Ihrer Daten widersprechen', en: 'Object to the processing of your data' }
        },
        {
          right: { fr: 'Droit de limitation', de: 'Recht auf Einschränkung', en: 'Right to restriction' },
          desc: { fr: 'Demander la limitation du traitement', de: 'Die Einschränkung der Verarbeitung verlangen', en: 'Request restriction of processing' }
        }
      ]
    },
    security: {
      title: {
        fr: 'Mesures de sécurité',
        de: 'Sicherheitsmaßnahmen',
        en: 'Security measures'
      },
      measures: [
        { fr: 'Chiffrement SSL/TLS pour toutes les communications', de: 'SSL/TLS-Verschlüsselung für alle Kommunikationen', en: 'SSL/TLS encryption for all communications' },
        { fr: 'Authentification à deux facteurs disponible', de: 'Zwei-Faktor-Authentifizierung verfügbar', en: 'Two-factor authentication available' },
        { fr: 'Sauvegardes quotidiennes automatisées', de: 'Automatisierte tägliche Backups', en: 'Automated daily backups' },
        { fr: 'Contrôles d\'accès stricts aux données', de: 'Strenge Zugangskontrollen zu Daten', en: 'Strict access controls to data' },
        { fr: 'Audits de sécurité réguliers', de: 'Regelmäßige Sicherheitsaudits', en: 'Regular security audits' },
        { fr: 'Conformité ISO 27001', de: 'ISO 27001-Konformität', en: 'ISO 27001 compliance' }
      ]
    }
  };

  return (
    <PageLayout
      title={t('privacy.title')}
      subtitle={t('privacy.subtitle')}
      icon={Shield}
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
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">{t('privacy.intro')}</h2>
                <p className="text-gray-700 leading-relaxed">{sections.intro[language]}</p>
              </div>
            </div>
          </motion.div>

          {/* Data Collected */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">{t('privacy.dataCollected')}</h2>
            </div>

            <div className="space-y-4">
              {sections.dataCollected.items.map((item, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.category[language]}</h3>
                  <p className="text-sm text-gray-600">{item.examples[language]}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Data Usage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">{t('privacy.dataUsage')}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {sections.dataUsage.purposes.map((purpose, index) => {
                const Icon = purpose.icon;
                return (
                  <div key={index} className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                    <div className="flex items-start gap-3 mb-3">
                      <Icon className="w-5 h-5 text-blue-600 mt-1" />
                      <h3 className="font-semibold text-gray-900">{purpose.title[language]}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{purpose.desc[language]}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Data Storage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Server className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">{t('privacy.dataStorage')}</h2>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Server className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {language === 'fr' ? 'Localisation des données' : language === 'de' ? 'Speicherort der Daten' : 'Data location'}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{sections.dataStorage.details.location[language]}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {language === 'fr' ? 'Durée de conservation' : language === 'de' ? 'Aufbewahrungsdauer' : 'Retention period'}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{sections.dataStorage.details.duration[language]}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Your Rights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">{t('privacy.rights')}</h2>
            </div>

            <div className="space-y-3">
              {sections.rights.list.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50/50 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.right[language]}</h3>
                    <p className="text-sm text-gray-600">{item.desc[language]}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                {language === 'fr' 
                  ? 'Pour exercer vos droits, contactez notre Délégué à la Protection des Données (DPO) : dpo@civiagora.ch'
                  : language === 'de'
                  ? 'Um Ihre Rechte auszuüben, kontaktieren Sie unseren Datenschutzbeauftragten (DSB): dpo@civiagora.ch'
                  : 'To exercise your rights, contact our Data Protection Officer (DPO): dpo@civiagora.ch'}
              </p>
            </div>
          </motion.div>

          {/* Security Measures */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">{t('privacy.security')}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {sections.security.measures.map((measure, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{measure[language]}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                {language === 'fr' ? 'Dernière mise à jour : 7 janvier 2025' : 
                 language === 'de' ? 'Letzte Aktualisierung: 7. Januar 2025' : 
                 'Last updated: January 7, 2025'}
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </PageLayout>
  );
}