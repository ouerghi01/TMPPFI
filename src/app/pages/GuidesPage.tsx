import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PageLayout } from '../components/layout/PageLayout';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  FileText, 
  Users, 
  Vote,
  Video,
  Download,
  Clock,
  TrendingUp,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Play,
  BookMarked
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function GuidesPage() {
  const { t, language } = useLanguage();

  const guides = [
    {
      id: 'getting-started',
      icon: BookOpen,
      title: {
        fr: 'Guide de démarrage rapide',
        de: 'Schnellstartanleitung',
        en: 'Quick Start Guide'
      },
      description: {
        fr: 'Apprenez les bases de CiviAgora et commencez à participer en moins de 10 minutes',
        de: 'Lernen Sie die Grundlagen von CiviAgora und beginnen Sie in weniger als 10 Minuten teilzunehmen',
        en: 'Learn the basics of CiviAgora and start participating in less than 10 minutes'
      },
      duration: { fr: '10 min', de: '10 Min.', en: '10 min' },
      difficulty: { fr: 'Débutant', de: 'Anfänger', en: 'Beginner' },
      topics: [
        { fr: 'Créer votre compte', de: 'Ihr Konto erstellen', en: 'Create your account' },
        { fr: 'Personnaliser votre profil', de: 'Ihr Profil anpassen', en: 'Customize your profile' },
        { fr: 'Explorer les processus', de: 'Prozesse erkunden', en: 'Explore processes' },
        { fr: 'Faire votre première contribution', de: 'Ihren ersten Beitrag leisten', en: 'Make your first contribution' }
      ],
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'consultations',
      icon: MessageSquare,
      title: {
        fr: 'Participer aux concertations',
        de: 'An Konsultationen teilnehmen',
        en: 'Participate in Consultations'
      },
      description: {
        fr: 'Découvrez comment contribuer efficacement aux consultations publiques et faire entendre votre voix',
        de: 'Entdecken Sie, wie Sie effektiv zu öffentlichen Konsultationen beitragen und Ihre Stimme erheben können',
        en: 'Discover how to effectively contribute to public consultations and make your voice heard'
      },
      duration: { fr: '15 min', de: '15 Min.', en: '15 min' },
      difficulty: { fr: 'Intermédiaire', de: 'Mittelstufe', en: 'Intermediate' },
      topics: [
        { fr: 'Comprendre les types de consultations', de: 'Konsultationstypen verstehen', en: 'Understand consultation types' },
        { fr: 'Rédiger une contribution qualitative', de: 'Einen qualitativen Beitrag verfassen', en: 'Write a quality contribution' },
        { fr: 'Commenter et débattre', de: 'Kommentieren und diskutieren', en: 'Comment and debate' },
        { fr: 'Suivre l\'évolution', de: 'Den Fortschritt verfolgen', en: 'Track progress' }
      ],
      color: 'purple',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      id: 'assemblies',
      icon: Users,
      title: {
        fr: 'Rejoindre une assemblée citoyenne',
        de: 'Einer Bürgerversammlung beitreten',
        en: 'Join a Citizen Assembly'
      },
      description: {
        fr: 'Guide complet pour participer aux assemblées citoyennes et groupes de travail thématiques',
        de: 'Vollständiger Leitfaden zur Teilnahme an Bürgerversammlungen und thematischen Arbeitsgruppen',
        en: 'Complete guide to participating in citizen assemblies and thematic working groups'
      },
      duration: { fr: '12 min', de: '12 Min.', en: '12 min' },
      difficulty: { fr: 'Intermédiaire', de: 'Mittelstufe', en: 'Intermediate' },
      topics: [
        { fr: 'Trouver une assemblée', de: 'Eine Versammlung finden', en: 'Find an assembly' },
        { fr: 'Candidater et être sélectionné', de: 'Sich bewerben und ausgewählt werden', en: 'Apply and get selected' },
        { fr: 'Collaborer efficacement', de: 'Effektiv zusammenarbeiten', en: 'Collaborate effectively' },
        { fr: 'Proposer des recommandations', de: 'Empfehlungen vorschlagen', en: 'Propose recommendations' }
      ],
      color: 'emerald',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'petitions',
      icon: FileText,
      title: {
        fr: 'Créer et promouvoir une pétition',
        de: 'Eine Petition erstellen und fördern',
        en: 'Create and Promote a Petition'
      },
      description: {
        fr: 'Apprenez à lancer une pétition impactante et mobiliser des signataires autour de votre cause',
        de: 'Lernen Sie, eine wirkungsvolle Petition zu starten und Unterzeichner für Ihr Anliegen zu mobilisieren',
        en: 'Learn to launch an impactful petition and mobilize signatories around your cause'
      },
      duration: { fr: '20 min', de: '20 Min.', en: '20 min' },
      difficulty: { fr: 'Avancé', de: 'Fortgeschritten', en: 'Advanced' },
      topics: [
        { fr: 'Choisir une problématique pertinente', de: 'Ein relevantes Thema wählen', en: 'Choose a relevant issue' },
        { fr: 'Rédiger une pétition convaincante', de: 'Eine überzeugende Petition schreiben', en: 'Write a compelling petition' },
        { fr: 'Stratégies de mobilisation', de: 'Mobilisierungsstrategien', en: 'Mobilization strategies' },
        { fr: 'Atteindre vos objectifs', de: 'Ihre Ziele erreichen', en: 'Reach your goals' }
      ],
      color: 'amber',
      gradient: 'from-amber-500 to-orange-600'
    },
    {
      id: 'voting',
      icon: Vote,
      title: {
        fr: 'Voter en toute sécurité',
        de: 'Sicher abstimmen',
        en: 'Vote Securely'
      },
      description: {
        fr: 'Comprendre le processus de vote électronique et participer aux référendums en toute confiance',
        de: 'Den elektronischen Abstimmungsprozess verstehen und sicher an Referenden teilnehmen',
        en: 'Understand the electronic voting process and participate in referendums with confidence'
      },
      duration: { fr: '10 min', de: '10 Min.', en: '10 min' },
      difficulty: { fr: 'Débutant', de: 'Anfänger', en: 'Beginner' },
      topics: [
        { fr: 'Sécurité du vote électronique', de: 'Sicherheit der elektronischen Abstimmung', en: 'E-voting security' },
        { fr: 'Analyser les options', de: 'Optionen analysieren', en: 'Analyze options' },
        { fr: 'Voter et confirmer', de: 'Abstimmen und bestätigen', en: 'Vote and confirm' },
        { fr: 'Consulter les résultats', de: 'Ergebnisse einsehen', en: 'View results' }
      ],
      color: 'rose',
      gradient: 'from-rose-500 to-pink-600'
    },
    {
      id: 'impact',
      icon: TrendingUp,
      title: {
        fr: 'Maximiser votre impact',
        de: 'Ihre Wirkung maximieren',
        en: 'Maximize Your Impact'
      },
      description: {
        fr: 'Stratégies avancées pour devenir un citoyen engagé et influencer les décisions locales',
        de: 'Fortgeschrittene Strategien, um ein engagierter Bürger zu werden und lokale Entscheidungen zu beeinflussen',
        en: 'Advanced strategies to become an engaged citizen and influence local decisions'
      },
      duration: { fr: '25 min', de: '25 Min.', en: '25 min' },
      difficulty: { fr: 'Avancé', de: 'Fortgeschritten', en: 'Advanced' },
      topics: [
        { fr: 'Construire votre crédibilité', de: 'Ihre Glaubwürdigkeit aufbauen', en: 'Build your credibility' },
        { fr: 'Réseauter avec d\'autres citoyens', de: 'Mit anderen Bürgern vernetzen', en: 'Network with other citizens' },
        { fr: 'Mobiliser autour de vos idées', de: 'Um Ihre Ideen mobilisieren', en: 'Mobilize around your ideas' },
        { fr: 'Mesurer votre impact', de: 'Ihre Wirkung messen', en: 'Measure your impact' }
      ],
      color: 'indigo',
      gradient: 'from-indigo-500 to-purple-600'
    }
  ];

  const resources = [
    {
      icon: Video,
      title: { fr: 'Tutoriels vidéo', de: 'Video-Tutorials', en: 'Video Tutorials' },
      description: { fr: 'Bibliothèque de vidéos explicatives', de: 'Bibliothek mit Erklärvideos', en: 'Library of explanatory videos' },
      count: { fr: '24 vidéos', de: '24 Videos', en: '24 videos' },
      color: 'red'
    },
    {
      icon: Download,
      title: { fr: 'Documents PDF', de: 'PDF-Dokumente', en: 'PDF Documents' },
      description: { fr: 'Guides téléchargeables et imprimables', de: 'Herunterladbare und druckbare Leitfäden', en: 'Downloadable and printable guides' },
      count: { fr: '12 PDF', de: '12 PDFs', en: '12 PDFs' },
      color: 'blue'
    },
    {
      icon: BookMarked,
      title: { fr: 'Base de connaissances', de: 'Wissensdatenbank', en: 'Knowledge Base' },
      description: { fr: 'Articles détaillés sur tous les aspects', de: 'Detaillierte Artikel zu allen Aspekten', en: 'Detailed articles on all aspects' },
      count: { fr: '150+ articles', de: '150+ Artikel', en: '150+ articles' },
      color: 'emerald'
    }
  ];

  const getDifficultyColor = (difficulty: { fr: string; de: string; en: string }) => {
    const level = difficulty[language];
    if (level === 'Débutant' || level === 'Anfänger' || level === 'Beginner') return 'bg-green-100 text-green-700';
    if (level === 'Intermédiaire' || level === 'Mittelstufe' || level === 'Intermediate') return 'bg-blue-100 text-blue-700';
    return 'bg-purple-100 text-purple-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white">
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
              <BookOpen className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {t('guides.title')}
            </motion.h1>
            
            <motion.p 
              className="text-xl text-emerald-100 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {t('guides.subtitle')}
            </motion.p>
          </motion.div>
        </PageLayout>
      </div>

      <PageLayout className="py-16">
        {/* Guides Grid */}
        <div className="mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            {guides.map((guide, index) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-full hover:shadow-xl transition-all">
                  {/* Header with Gradient */}
                  <div className={`relative h-32 bg-gradient-to-r ${guide.gradient} p-6 flex items-center justify-between`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <guide.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl text-white mb-1">{guide.title[language]}</h3>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="flex items-center gap-1 text-white/90">
                            <Clock className="w-4 h-4" />
                            {guide.duration[language]}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(guide.difficulty)}`}>
                            {guide.difficulty[language]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-600 mb-6">{guide.description[language]}</p>
                    
                    <div className="space-y-3 mb-6">
                      <p className="text-sm font-semibold text-gray-700">
                        {language === 'fr' ? 'Ce que vous allez apprendre :' : language === 'de' ? 'Was Sie lernen werden:' : 'What you will learn:'}
                      </p>
                      {guide.topics.map((topic, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{topic[language]}</span>
                        </div>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r ${guide.gradient} hover:shadow-lg transition-all flex items-center justify-center gap-2`}
                    >
                      <Play className="w-5 h-5" />
                      {language === 'fr' ? 'Commencer le guide' : language === 'de' ? 'Leitfaden starten' : 'Start guide'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">
              {language === 'fr' ? 'Ressources complémentaires' : language === 'de' ? 'Zusätzliche Ressourcen' : 'Additional Resources'}
            </h2>
            <p className="text-xl text-gray-600">
              {language === 'fr' ? 'Explorez d\'autres formats d\'apprentissage' : language === 'de' ? 'Erkunden Sie andere Lernformate' : 'Explore other learning formats'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 text-center cursor-pointer"
              >
                <div className={`w-16 h-16 rounded-full bg-${resource.color}-100 flex items-center justify-center mx-auto mb-4`}>
                  <resource.icon className={`w-8 h-8 text-${resource.color}-600`} />
                </div>
                <h3 className="text-xl mb-2">{resource.title[language]}</h3>
                <p className="text-gray-600 mb-3">{resource.description[language]}</p>
                <span className="text-sm font-semibold text-gray-500">{resource.count[language]}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-3xl p-12 text-center"
        >
          <h3 className="text-3xl mb-4">
            {language === 'fr' ? 'Prêt à commencer ?' : language === 'de' ? 'Bereit anzufangen?' : 'Ready to start?'}
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            {language === 'fr' ? 'Mettez en pratique ce que vous avez appris' : language === 'de' ? 'Setzen Sie das Gelernte in die Praxis um' : 'Put what you\'ve learned into practice'}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/consultations">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
              >
                {language === 'fr' ? 'Explorer les processus' : language === 'de' ? 'Prozesse erkunden' : 'Explore processes'}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link to="/faq">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-emerald-600 rounded-lg font-semibold border-2 border-emerald-200 hover:border-emerald-300 transition-all"
              >
                {language === 'fr' ? 'Consulter la FAQ' : language === 'de' ? 'FAQ ansehen' : 'View FAQ'}
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </PageLayout>
    </div>
  );
}
