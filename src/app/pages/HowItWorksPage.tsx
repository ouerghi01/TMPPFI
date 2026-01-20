import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PageLayout } from '../components/layout/PageLayout';
import { motion } from 'motion/react';
import { 
  UserPlus, 
  Search, 
  MessageSquare, 
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Users,
  Vote,
  FileText,
  Bell,
  BarChart3,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function HowItWorksPage() {
  const { t, language } = useLanguage();

  const steps = [
    {
      number: 1,
      icon: UserPlus,
      title: t('howItWorks.step1Title'),
      description: t('howItWorks.step1Desc'),
      gradient: 'from-blue-500 to-indigo-600',
      features: {
        fr: ['Inscription gratuite', 'Validation d\'identité sécurisée', 'Profil personnalisable', 'Notifications sur mesure'],
        de: ['Kostenlose Registrierung', 'Sichere Identitätsvalidierung', 'Anpassbares Profil', 'Maßgeschneiderte Benachrichtigungen'],
        en: ['Free registration', 'Secure identity validation', 'Customizable profile', 'Tailored notifications']
      }
    },
    {
      number: 2,
      icon: Search,
      title: t('howItWorks.step2Title'),
      description: t('howItWorks.step2Desc'),
      gradient: 'from-purple-500 to-pink-600',
      features: {
        fr: ['Consultation des processus actifs', 'Filtrage par thème', 'Calendrier des événements', 'Recherche avancée'],
        de: ['Einsicht aktiver Prozesse', 'Filterung nach Thema', 'Veranstaltungskalender', 'Erweiterte Suche'],
        en: ['View active processes', 'Filter by theme', 'Event calendar', 'Advanced search']
      }
    },
    {
      number: 3,
      icon: MessageSquare,
      title: t('howItWorks.step3Title'),
      description: t('howItWorks.step3Desc'),
      gradient: 'from-emerald-500 to-teal-600',
      features: {
        fr: ['Proposer des idées', 'Signer des pétitions', 'Voter sur les propositions', 'Participer aux débats'],
        de: ['Ideen vorschlagen', 'Petitionen unterschreiben', 'Über Vorschläge abstimmen', 'An Debatten teilnehmen'],
        en: ['Propose ideas', 'Sign petitions', 'Vote on proposals', 'Participate in debates']
      }
    },
    {
      number: 4,
      icon: TrendingUp,
      title: t('howItWorks.step4Title'),
      description: t('howItWorks.step4Desc'),
      gradient: 'from-amber-500 to-orange-600',
      features: {
        fr: ['Suivi en temps réel', 'Notifications personnalisées', 'Résultats transparents', 'Impact mesurable'],
        de: ['Echtzeit-Tracking', 'Personalisierte Benachrichtigungen', 'Transparente Ergebnisse', 'Messbarer Einfluss'],
        en: ['Real-time tracking', 'Personalized notifications', 'Transparent results', 'Measurable impact']
      }
    }
  ];

  const modules = [
    {
      icon: FileText,
      title: { fr: 'Concertations', de: 'Konsultationen', en: 'Consultations' },
      description: {
        fr: 'Participez aux débats publics et proposez vos idées pour améliorer votre territoire',
        de: 'Nehmen Sie an öffentlichen Debatten teil und schlagen Sie Ideen zur Verbesserung Ihrer Region vor',
        en: 'Participate in public debates and propose your ideas to improve your territory'
      },
      link: '/consultations',
      color: 'blue'
    },
    {
      icon: Users,
      title: { fr: 'Assemblées', de: 'Versammlungen', en: 'Assemblies' },
      description: {
        fr: 'Rejoignez des groupes de travail thématiques et collaborez avec d\'autres citoyens',
        de: 'Treten Sie thematischen Arbeitsgruppen bei und arbeiten Sie mit anderen Bürgern zusammen',
        en: 'Join thematic working groups and collaborate with other citizens'
      },
      link: '/assemblies',
      color: 'purple'
    },
    {
      icon: FileText,
      title: { fr: 'Pétitions', de: 'Petitionen', en: 'Petitions' },
      description: {
        fr: 'Créez ou signez des pétitions pour faire entendre votre voix sur les sujets importants',
        de: 'Erstellen oder unterzeichnen Sie Petitionen, um Ihre Stimme zu wichtigen Themen zu erheben',
        en: 'Create or sign petitions to make your voice heard on important issues'
      },
      link: '/petitions',
      color: 'emerald'
    },
    {
      icon: Vote,
      title: { fr: 'Votes & Référendums', de: 'Abstimmungen & Referenden', en: 'Votes & Referendums' },
      description: {
        fr: 'Votez sur les décisions importantes qui façonnent l\'avenir de votre collectivité',
        de: 'Stimmen Sie über wichtige Entscheidungen ab, die die Zukunft Ihrer Gemeinde gestalten',
        en: 'Vote on important decisions that shape the future of your community'
      },
      link: '/votes',
      color: 'amber'
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: { fr: 'Sécurité & confidentialité', de: 'Sicherheit & Datenschutz', en: 'Security & privacy' },
      description: {
        fr: 'Vos données sont protégées et votre identité reste confidentielle selon vos préférences',
        de: 'Ihre Daten sind geschützt und Ihre Identität bleibt gemäß Ihren Präferenzen vertraulich',
        en: 'Your data is protected and your identity remains confidential according to your preferences'
      }
    },
    {
      icon: Bell,
      title: { fr: 'Notifications intelligentes', de: 'Intelligente Benachrichtigungen', en: 'Smart notifications' },
      description: {
        fr: 'Recevez uniquement les alertes pertinentes sur les sujets qui vous intéressent',
        de: 'Erhalten Sie nur relevante Benachrichtigungen zu Themen, die Sie interessieren',
        en: 'Receive only relevant alerts on topics that interest you'
      }
    },
    {
      icon: BarChart3,
      title: { fr: 'Transparence totale', de: 'Völlige Transparenz', en: 'Total transparency' },
      description: {
        fr: 'Suivez l\'impact de vos contributions et consultez les résultats en temps réel',
        de: 'Verfolgen Sie die Auswirkungen Ihrer Beiträge und sehen Sie die Ergebnisse in Echtzeit',
        en: 'Track the impact of your contributions and view results in real-time'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
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
              <CheckCircle2 className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {t('howItWorks.title')}
            </motion.h1>
            
            <motion.p 
              className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {t('howItWorks.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4 justify-center"
            >
              <Link to="/consultations">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  {language === 'fr' ? 'Commencer' : language === 'de' ? 'Beginnen' : 'Get Started'}
                </motion.button>
              </Link>
              <Link to="/faq">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold border-2 border-white/30 hover:bg-white/20 transition-colors"
                >
                  {language === 'fr' ? 'En savoir plus' : language === 'de' ? 'Mehr erfahren' : 'Learn More'}
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </PageLayout>
      </div>

      <PageLayout className="py-16">
        {/* Steps Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4">
              {language === 'fr' ? '4 étapes simples' : language === 'de' ? '4 einfache Schritte' : '4 simple steps'}
            </h2>
            <p className="text-xl text-gray-600">
              {language === 'fr' ? 'Votre parcours de participation démocratique' : language === 'de' ? 'Ihr Weg zur demokratischen Teilnahme' : 'Your democratic participation journey'}
            </p>
          </motion.div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <div className="relative">
                      <div className={`absolute -inset-4 bg-gradient-to-r ${step.gradient} opacity-20 blur-2xl rounded-3xl`}></div>
                      <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                        <div className="flex items-start gap-4 mb-6">
                          <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-r ${step.gradient} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                            {step.number}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          {step.features[language].map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`${index % 2 === 1 ? 'md:order-1' : ''} flex justify-center`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`w-48 h-48 rounded-full bg-gradient-to-r ${step.gradient} flex items-center justify-center shadow-2xl`}
                    >
                      <step.icon className="w-24 h-24 text-white" />
                    </motion.div>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="flex justify-center my-8">
                    <ArrowRight className="w-8 h-8 text-gray-300 rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Modules Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4">
              {language === 'fr' ? 'Modules de participation' : language === 'de' ? 'Teilnahmemodule' : 'Participation modules'}
            </h2>
            <p className="text-xl text-gray-600">
              {language === 'fr' ? 'Explorez les différents moyens de vous engager' : language === 'de' ? 'Entdecken Sie verschiedene Möglichkeiten, sich zu engagieren' : 'Explore different ways to engage'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {modules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Link to={module.link}>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all h-full">
                    <div className={`w-14 h-14 rounded-lg bg-${module.color}-100 flex items-center justify-center mb-4`}>
                      <module.icon className={`w-7 h-7 text-${module.color}-600`} />
                    </div>
                    <h3 className="text-xl mb-3">{module.title[language]}</h3>
                    <p className="text-gray-600 mb-4">{module.description[language]}</p>
                    <div className="flex items-center text-blue-600 font-semibold">
                      {language === 'fr' ? 'En savoir plus' : language === 'de' ? 'Mehr erfahren' : 'Learn more'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-12"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">
              {language === 'fr' ? 'Vos avantages' : language === 'de' ? 'Ihre Vorteile' : 'Your benefits'}
            </h2>
            <p className="text-xl text-gray-600">
              {language === 'fr' ? 'Une plateforme conçue pour vous' : language === 'de' ? 'Eine für Sie entwickelte Plattform' : 'A platform designed for you'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl mb-3">{benefit.title[language]}</h3>
                <p className="text-gray-600">{benefit.description[language]}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </PageLayout>
    </div>
  );
}
