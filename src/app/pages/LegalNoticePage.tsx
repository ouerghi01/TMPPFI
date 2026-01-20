import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PageLayout } from '../components/layout/PageLayout';
import { motion } from 'motion/react';
import { 
  Building2, 
  Server, 
  Mail, 
  Phone, 
  MapPin, 
  FileText,
  Copyright,
  Shield
} from 'lucide-react';

export function LegalNoticePage() {
  const { t, language } = useLanguage();

  const content = {
    publisher: {
      fr: {
        name: 'CiviAgora SA',
        registration: 'BE 0123.456.789',
        address: 'Rue de la Démocratie 42',
        postalCode: '1000',
        city: 'Bruxelles',
        country: 'Belgique',
        email: 'contact@civiagora.be',
        phone: '+32 2 000 00 00'
      },
      de: {
        name: 'CiviAgora AG',
        registration: 'BE 0123.456.789',
        address: 'Demokratiestrasse 42',
        postalCode: '1000',
        city: 'Brüssel',
        country: 'Belgien',
        email: 'contact@civiagora.be',
        phone: '+32 2 000 00 00'
      },
      en: {
        name: 'CiviAgora Ltd',
        registration: 'BE 0123.456.789',
        address: 'Democracy Street 42',
        postalCode: '1000',
        city: 'Brussels',
        country: 'Belgium',
        email: 'contact@civiagora.be',
        phone: '+32 2 000 00 00'
      }
    },
    hosting: {
      fr: {
        provider: 'Belgian Data Cloud SA',
        address: 'Avenue des Technologies 15',
        city: '2000 Anvers, Belgique',
        website: 'www.belgiandatacloud.be'
      },
      de: {
        provider: 'Belgian Data Cloud AG',
        address: 'Technologieallee 15',
        city: '2000 Antwerpen, Belgien',
        website: 'www.belgiandatacloud.be'
      },
      en: {
        provider: 'Belgian Data Cloud Ltd',
        address: 'Technology Avenue 15',
        city: '2000 Antwerp, Belgium',
        website: 'www.belgiandatacloud.be'
      }
    },
    directorship: {
      fr: {
        title: 'Directrice de la publication',
        name: 'Marie Dubois',
        role: 'Directrice Générale'
      },
      de: {
        title: 'Redaktionsleitung',
        name: 'Marie Dubois',
        role: 'Geschäftsführerin'
      },
      en: {
        title: 'Editorial Director',
        name: 'Marie Dubois',
        role: 'Managing Director'
      }
    },
    intellectual: {
      fr: {
        text: 'L\'ensemble du contenu de ce site (textes, images, vidéos, logos, éléments graphiques) est la propriété exclusive de CiviAgora SA ou de ses partenaires. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable.',
        license: 'Le code source de la plateforme est publié sous licence Open Source (MIT License) et disponible sur notre dépôt public.'
      },
      de: {
        text: 'Der gesamte Inhalt dieser Website (Texte, Bilder, Videos, Logos, Grafikelemente) ist ausschließliches Eigentum von CiviAgora AG oder ihrer Partner. Jegliche Vervielfältigung, Darstellung, Änderung, Veröffentlichung, Anpassung aller oder eines Teils der Website-Elemente, unabhängig vom verwendeten Mittel oder Verfahren, ist ohne vorherige schriftliche Genehmigung untersagt.',
        license: 'Der Quellcode der Plattform wird unter Open-Source-Lizenz (MIT License) veröffentlicht und ist in unserem öffentlichen Repository verfügbar.'
      },
      en: {
        text: 'All content on this site (text, images, videos, logos, graphic elements) is the exclusive property of CiviAgora Ltd or its partners. Any reproduction, representation, modification, publication, adaptation of all or part of the site elements, whatever the means or process used, is prohibited, except with prior written authorization.',
        license: 'The platform source code is published under Open Source license (MIT License) and available on our public repository.'
      }
    },
    credits: {
      fr: [
        { library: 'React', description: 'Framework JavaScript pour interfaces utilisateur', license: 'MIT' },
        { library: 'Tailwind CSS', description: 'Framework CSS utilitaire', license: 'MIT' },
        { library: 'Motion', description: 'Bibliothèque d\'animations', license: 'MIT' },
        { library: 'Lucide Icons', description: 'Bibliothèque d\'icônes', license: 'ISC' }
      ],
      de: [
        { library: 'React', description: 'JavaScript-Framework für Benutzeroberflächen', license: 'MIT' },
        { library: 'Tailwind CSS', description: 'Utility-First CSS Framework', license: 'MIT' },
        { library: 'Motion', description: 'Animationsbibliothek', license: 'MIT' },
        { library: 'Lucide Icons', description: 'Icon-Bibliothek', license: 'ISC' }
      ],
      en: [
        { library: 'React', description: 'JavaScript framework for user interfaces', license: 'MIT' },
        { library: 'Tailwind CSS', description: 'Utility-first CSS framework', license: 'MIT' },
        { library: 'Motion', description: 'Animation library', license: 'MIT' },
        { library: 'Lucide Icons', description: 'Icon library', license: 'ISC' }
      ]
    }
  };

  const publisherData = content.publisher[language];
  const hostingData = content.hosting[language];
  const directorshipData = content.directorship[language];
  const intellectualData = content.intellectual[language];
  const creditsData = content.credits[language];

  return (
    <PageLayout
      title={t('legal.title')}
      subtitle={t('legal.subtitle')}
      icon={FileText}
    >
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1280px] space-y-8">

          {/* Publisher Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">{t('legal.publisher')}</h2>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{publisherData.name}</h3>
                <p className="text-gray-600">{language === 'fr' ? 'Numéro d\'entreprise' : language === 'de' ? 'Firmennummer' : 'Company number'}: {publisherData.registration}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 pt-4">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">{language === 'fr' ? 'Adresse' : language === 'de' ? 'Adresse' : 'Address'}</p>
                    <p className="text-gray-600">{publisherData.address}</p>
                    <p className="text-gray-600">{publisherData.postalCode} {publisherData.city}</p>
                    <p className="text-gray-600">{publisherData.country}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Mail className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <a href={`mailto:${publisherData.email}`} className="text-blue-600 hover:underline">
                        {publisherData.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Phone className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">{language === 'fr' ? 'Téléphone' : language === 'de' ? 'Telefon' : 'Phone'}</p>
                      <a href={`tel:${publisherData.phone}`} className="text-blue-600 hover:underline">
                        {publisherData.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hosting Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <Server className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">{t('legal.hosting')}</h2>
            </div>

            <div className="space-y-2">
              <p className="text-lg font-semibold text-gray-900">{hostingData.provider}</p>
              <p className="text-gray-600">{hostingData.address}</p>
              <p className="text-gray-600">{hostingData.city}</p>
              <a href={`https://${hostingData.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-block">
                {hostingData.website}
              </a>
            </div>
          </motion.div>

          {/* Editorial Direction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">{t('legal.directorship')}</h2>
            </div>

            <div className="space-y-2">
              <p className="text-lg font-semibold text-gray-900">{directorshipData.name}</p>
              <p className="text-gray-600">{directorshipData.role}</p>
            </div>
          </motion.div>

          {/* Intellectual Property */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Copyright className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">{t('legal.intellectual')}</h2>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>{intellectualData.text}</p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-blue-900 mb-1">Open Source</p>
                    <p className="text-blue-800">{intellectualData.license}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Licenses and Credits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">{t('legal.licenses')}</h2>
            </div>

            <div className="space-y-3">
              {creditsData.map((credit, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{credit.library}</h3>
                    <p className="text-sm text-gray-600">{credit.description}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    {credit.license}
                  </span>
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