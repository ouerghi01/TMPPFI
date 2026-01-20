import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PageLayout } from '../components/layout/PageLayout';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  HelpCircle, 
  FileText, 
  HeadphonesIcon,
  ArrowRight,
  Lightbulb,
  GraduationCap,
  MessageSquare,
  Video,
  Download,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function ResourcesPage() {
  const { t, language } = useLanguage();

  const mainResources = [
    {
      icon: Lightbulb,
      title: t('footer.howItWorks'),
      description: {
        fr: 'Découvrez comment CiviAgora fonctionne et comment vous pouvez participer activement à la démocratie locale en 4 étapes simples',
        de: 'Erfahren Sie, wie CiviAgora funktioniert und wie Sie in 4 einfachen Schritten aktiv an der lokalen Demokratie teilnehmen können',
        en: 'Discover how CiviAgora works and how you can actively participate in local democracy in 4 simple steps'
      },
      link: '/how-it-works',
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-600',
      items: { fr: '4 étapes', de: '4 Schritte', en: '4 steps' }
    },
    {
      icon: HelpCircle,
      title: t('footer.faq'),
      description: {
        fr: 'Trouvez rapidement des réponses à vos questions dans notre base de connaissances complète organisée par catégories',
        de: 'Finden Sie schnell Antworten auf Ihre Fragen in unserer umfassenden, nach Kategorien organisierten Wissensdatenbank',
        en: 'Quickly find answers to your questions in our comprehensive knowledge base organized by categories'
      },
      link: '/faq',
      color: 'purple',
      gradient: 'from-purple-500 to-pink-600',
      items: { fr: '40+ questions', de: '40+ Fragen', en: '40+ questions' }
    },
    {
      icon: BookOpen,
      title: t('footer.guides'),
      description: {
        fr: 'Apprenez à utiliser chaque module de la plateforme avec nos guides pratiques détaillés et tutoriels vidéo',
        de: 'Lernen Sie mit unseren detaillierten praktischen Leitfäden und Video-Tutorials, wie Sie jedes Modul der Plattform nutzen',
        en: 'Learn how to use each platform module with our detailed practical guides and video tutorials'
      },
      link: '/guides',
      color: 'emerald',
      gradient: 'from-emerald-500 to-teal-600',
      items: { fr: '6 guides complets', de: '6 vollständige Leitfäden', en: '6 complete guides' }
    },
    {
      icon: HeadphonesIcon,
      title: t('footer.support'),
      description: {
        fr: 'Besoin d\'aide personnalisée ? Contactez notre équipe de support par email, téléphone ou chat en direct',
        de: 'Benötigen Sie persönliche Hilfe? Kontaktieren Sie unser Support-Team per E-Mail, Telefon oder Live-Chat',
        en: 'Need personalized help? Contact our support team by email, phone or live chat'
      },
      link: '/support',
      color: 'amber',
      gradient: 'from-amber-500 to-orange-600',
      items: { fr: 'Support 24/7', de: 'Support 24/7', en: '24/7 Support' }
    }
  ];

  const additionalResources = [
    {
      icon: Video,
      title: { fr: 'Tutoriels vidéo', de: 'Video-Tutorials', en: 'Video Tutorials' },
      description: {
        fr: 'Apprenez visuellement avec nos tutoriels vidéo étape par étape',
        de: 'Lernen Sie visuell mit unseren Schritt-für-Schritt-Video-Tutorials',
        en: 'Learn visually with our step-by-step video tutorials'
      },
      count: { fr: '24 vidéos', de: '24 Videos', en: '24 videos' },
      link: '#videos'
    },
    {
      icon: Download,
      title: { fr: 'Documents PDF', de: 'PDF-Dokumente', en: 'PDF Documents' },
      description: {
        fr: 'Téléchargez nos guides au format PDF pour consultation hors ligne',
        de: 'Laden Sie unsere Leitfäden als PDF herunter für Offline-Nutzung',
        en: 'Download our guides in PDF format for offline consultation'
      },
      count: { fr: '12 documents', de: '12 Dokumente', en: '12 documents' },
      link: '#pdfs'
    },
    {
      icon: GraduationCap,
      title: { fr: 'Webinaires', de: 'Webinare', en: 'Webinars' },
      description: {
        fr: 'Participez à nos sessions de formation en ligne gratuites',
        de: 'Nehmen Sie an unseren kostenlosen Online-Schulungen teil',
        en: 'Participate in our free online training sessions'
      },
      count: { fr: 'Sessions mensuelles', de: 'Monatliche Sitzungen', en: 'Monthly sessions' },
      link: '#webinars'
    },
    {
      icon: MessageSquare,
      title: { fr: 'Forum communautaire', de: 'Community-Forum', en: 'Community Forum' },
      description: {
        fr: 'Échangez avec d\'autres utilisateurs et partagez vos expériences',
        de: 'Tauschen Sie sich mit anderen Nutzern aus und teilen Sie Ihre Erfahrungen',
        en: 'Exchange with other users and share your experiences'
      },
      count: { fr: '2000+ membres', de: '2000+ Mitglieder', en: '2000+ members' },
      link: '#forum'
    }
  ];

  const quickLinks = [
    {
      title: { fr: 'Premiers pas', de: 'Erste Schritte', en: 'Getting started' },
      links: [
        { label: { fr: 'Créer un compte', de: 'Konto erstellen', en: 'Create account' }, href: '#' },
        { label: { fr: 'Personnaliser mon profil', de: 'Mein Profil anpassen', en: 'Customize my profile' }, href: '#' },
        { label: { fr: 'Explorer la plateforme', de: 'Plattform erkunden', en: 'Explore platform' }, href: '#' }
      ]
    },
    {
      title: { fr: 'Participation', de: 'Teilnahme', en: 'Participation' },
      links: [
        { label: { fr: 'Participer à une consultation', de: 'An Konsultation teilnehmen', en: 'Join consultation' }, href: '/consultations' },
        { label: { fr: 'Créer une pétition', de: 'Petition erstellen', en: 'Create petition' }, href: '/petitions' },
        { label: { fr: 'Voter', de: 'Abstimmen', en: 'Vote' }, href: '/votes' }
      ]
    },
    {
      title: { fr: 'Assistance', de: 'Unterstützung', en: 'Assistance' },
      links: [
        { label: { fr: 'Contacter le support', de: 'Support kontaktieren', en: 'Contact support' }, href: '/support' },
        { label: { fr: 'Signaler un problème', de: 'Problem melden', en: 'Report issue' }, href: '/support' },
        { label: { fr: 'Suggérer une amélioration', de: 'Verbesserung vorschlagen', en: 'Suggest improvement' }, href: '/support' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <PageLayout>
          <motion.div 
            className="relative py-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6"
            >
              <FileText className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {t('resources.title')}
            </motion.h1>
            
            <motion.p 
              className="text-xl text-blue-100 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {t('resources.subtitle')}
            </motion.p>
          </motion.div>
        </PageLayout>
      </div>

      <PageLayout className="py-16">
        {/* Main Resources */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4">{t('resources.overview')}</h2>
            <p className="text-xl text-gray-600">
              {language === 'fr' ? 'Accédez à toutes nos ressources en un clic' : 
               language === 'de' ? 'Greifen Sie mit einem Klick auf alle unsere Ressourcen zu' : 
               'Access all our resources with one click'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {mainResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Link to={resource.link}>
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-full hover:shadow-xl transition-all">
                    {/* Header with Gradient */}
                    <div className={`relative h-32 bg-gradient-to-r ${resource.gradient} p-6 flex items-center justify-between`}>
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="relative flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <resource.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl text-white mb-1">{resource.title}</h3>
                          <span className="text-sm text-white/90">{resource.items[language]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">{resource.description[language]}</p>
                      <div className="flex items-center text-blue-600 font-semibold">
                        {language === 'fr' ? 'Accéder' : language === 'de' ? 'Zugreifen' : 'Access'}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4">
              {language === 'fr' ? 'Ressources complémentaires' : 
               language === 'de' ? 'Zusätzliche Ressourcen' : 
               'Additional Resources'}
            </h2>
            <p className="text-xl text-gray-600">
              {language === 'fr' ? 'D\'autres moyens d\'apprendre et de progresser' :
               language === 'de' ? 'Weitere Möglichkeiten zum Lernen und Fortschritt' :
               'More ways to learn and progress'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalResources.map((resource, index) => (
              <motion.a
                key={index}
                href={resource.link}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <resource.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl mb-2">{resource.title[language]}</h3>
                <p className="text-gray-600 text-sm mb-3">{resource.description[language]}</p>
                <span className="text-sm font-semibold text-blue-600 flex items-center gap-1">
                  {resource.count[language]}
                  <ExternalLink className="w-4 h-4" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-12"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">
              {language === 'fr' ? 'Liens rapides' : language === 'de' ? 'Schnellzugriff' : 'Quick Links'}
            </h2>
            <p className="text-xl text-gray-600">
              {language === 'fr' ? 'Accès directs aux actions les plus courantes' :
               language === 'de' ? 'Direktzugriff auf die häufigsten Aktionen' :
               'Direct access to the most common actions'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {quickLinks.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl mb-4">{section.title[language]}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        to={link.href}
                        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors group"
                      >
                        <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                        {link.label[language]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl mb-4">
            {language === 'fr' ? 'Vous ne trouvez pas ce que vous cherchez ?' :
             language === 'de' ? 'Finden Sie nicht, was Sie suchen?' :
             'Can\'t find what you\'re looking for?'}
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            {language === 'fr' ? 'Notre équipe est disponible pour vous aider' :
             language === 'de' ? 'Unser Team steht Ihnen zur Verfügung' :
             'Our team is available to help you'}
          </p>
          <Link to="/support">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-lg"
            >
              {language === 'fr' ? 'Contacter le support' : language === 'de' ? 'Support kontaktieren' : 'Contact support'}
            </motion.button>
          </Link>
        </motion.div>
      </PageLayout>
    </div>
  );
}
