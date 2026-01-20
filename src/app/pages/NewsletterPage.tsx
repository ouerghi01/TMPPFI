import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PageLayout } from '../components/layout/PageLayout';
import { motion } from 'motion/react';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  Calendar, 
  FileText,
  Users,
  Bell,
  Shield,
  Settings,
  Star,
  TrendingUp
} from 'lucide-react';

export function NewsletterPage() {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [frequency, setFrequency] = useState('weekly');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const content = {
    intro: {
      fr: 'Restez informé des dernières actualités de la démocratie participative locale. Recevez directement dans votre boîte mail les consultations, votes, pétitions et événements qui vous concernent.',
      de: 'Bleiben Sie über die neuesten Nachrichten zur lokalen partizipativen Demokratie informiert. Erhalten Sie Konsultationen, Abstimmungen, Petitionen und Veranstaltungen, die Sie betreffen, direkt in Ihr Postfach.',
      en: 'Stay informed about the latest news on local participatory democracy. Receive consultations, votes, petitions and events that concern you directly in your inbox.'
    },
    benefits: [
      {
        icon: Bell,
        title: { fr: 'Notifications prioritaires', de: 'Prioritätsbenachrichtigungen', en: 'Priority notifications' },
        desc: { fr: 'Soyez informé en avant-première des nouvelles consultations et votes', de: 'Seien Sie die Ersten, die von neuen Konsultationen und Abstimmungen erfahren', en: 'Be the first to know about new consultations and votes' }
      },
      {
        icon: Calendar,
        title: { fr: 'Agenda personnalisé', de: 'Personalisierter Kalender', en: 'Personalized calendar' },
        desc: { fr: 'Recevez un récapitulatif des événements et échéances importantes', de: 'Erhalten Sie eine Zusammenfassung wichtiger Ereignisse und Fristen', en: 'Receive a summary of important events and deadlines' }
      },
      {
        icon: TrendingUp,
        title: { fr: 'Résultats et impact', de: 'Ergebnisse und Auswirkungen', en: 'Results and impact' },
        desc: { fr: 'Découvrez l\'impact de vos participations et les décisions prises', de: 'Entdecken Sie die Auswirkungen Ihrer Teilnahme und getroffenen Entscheidungen', en: 'Discover the impact of your participation and decisions made' }
      },
      {
        icon: FileText,
        title: { fr: 'Analyses approfondies', de: 'Tiefgehende Analysen', en: 'In-depth analyses' },
        desc: { fr: 'Accédez à des analyses et synthèses exclusives des processus participatifs', de: 'Erhalten Sie Zugang zu exklusiven Analysen und Zusammenfassungen partizipativer Prozesse', en: 'Access exclusive analyses and summaries of participatory processes' }
      }
    ],
    topics: [
      {
        id: 'consultations',
        icon: Users,
        label: { fr: 'Concertations', de: 'Konsultationen', en: 'Consultations' },
        desc: { fr: 'Nouvelles consultations publiques', de: 'Neue öffentliche Konsultationen', en: 'New public consultations' }
      },
      {
        id: 'votes',
        icon: CheckCircle2,
        label: { fr: 'Votes & Référendum', de: 'Abstimmungen & Referendum', en: 'Votes & Referendum' },
        desc: { fr: 'Échéances et résultats de votes', de: 'Abstimmungsfristen und -ergebnisse', en: 'Voting deadlines and results' }
      },
      {
        id: 'petitions',
        icon: FileText,
        label: { fr: 'Pétitions', de: 'Petitionen', en: 'Petitions' },
        desc: { fr: 'Nouvelles pétitions citoyennes', de: 'Neue Bürgerpetitionen', en: 'New citizen petitions' }
      },
      {
        id: 'assemblies',
        icon: Users,
        label: { fr: 'Assemblées', de: 'Versammlungen', en: 'Assemblies' },
        desc: { fr: 'Prochaines assemblées citoyennes', de: 'Kommende Bürgerversammlungen', en: 'Upcoming citizen assemblies' }
      },
      {
        id: 'conferences',
        icon: Calendar,
        label: { fr: 'Conférences', de: 'Konferenzen', en: 'Conferences' },
        desc: { fr: 'Événements et conférences à venir', de: 'Kommende Veranstaltungen und Konferenzen', en: 'Upcoming events and conferences' }
      },
      {
        id: 'results',
        icon: TrendingUp,
        label: { fr: 'Résultats', de: 'Ergebnisse', en: 'Results' },
        desc: { fr: 'Publication des résultats et rapports', de: 'Veröffentlichung von Ergebnissen und Berichten', en: 'Publication of results and reports' }
      }
    ],
    frequencies: [
      {
        id: 'daily',
        label: { fr: 'Quotidienne', de: 'Täglich', en: 'Daily' },
        desc: { fr: 'Chaque jour ouvré', de: 'Jeden Werktag', en: 'Every weekday' }
      },
      {
        id: 'weekly',
        label: { fr: 'Hebdomadaire', de: 'Wöchentlich', en: 'Weekly' },
        desc: { fr: 'Chaque lundi matin', de: 'Jeden Montagmorgen', en: 'Every Monday morning' }
      },
      {
        id: 'monthly',
        label: { fr: 'Mensuelle', de: 'Monatlich', en: 'Monthly' },
        desc: { fr: 'Le 1er de chaque mois', de: 'Am 1. jedes Monats', en: '1st of each month' }
      }
    ],
    content: {
      title: { fr: 'Contenu de la newsletter', de: 'Newsletter-Inhalt', en: 'Newsletter content' },
      sections: [
        { fr: '📊 Statistiques de participation', de: '📊 Teilnahmestatistiken', en: '📊 Participation statistics' },
        { fr: '🗳️ Processus en cours et à venir', de: '🗳️ Laufende und kommende Prozesse', en: '🗳️ Ongoing and upcoming processes' },
        { fr: '📢 Annonces importantes', de: '📢 Wichtige Ankündigungen', en: '📢 Important announcements' },
        { fr: '💡 Focus thématique mensuel', de: '💡 Monatlicher thematischer Fokus', en: '💡 Monthly thematic focus' },
        { fr: '🎯 Rappels d\'échéances', de: '🎯 Fristenerinnerungen', en: '🎯 Deadline reminders' },
        { fr: '✨ Nouveautés de la plateforme', de: '✨ Plattform-Neuigkeiten', en: '✨ Platform updates' }
      ]
    },
    privacy: {
      fr: 'Vos données sont traitées conformément à notre Politique de Confidentialité. Vous pouvez vous désabonner à tout moment en cliquant sur le lien présent dans chaque email.',
      de: 'Ihre Daten werden gemäß unserer Datenschutzerklärung verarbeitet. Sie können sich jederzeit abmelden, indem Sie auf den Link in jeder E-Mail klicken.',
      en: 'Your data is processed in accordance with our Privacy Policy. You can unsubscribe at any time by clicking the link in each email.'
    }
  };

  const toggleTopic = (topicId: string) => {
    setSelectedTopics(prev =>
      prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && selectedTopics.length > 0) {
      setIsSubscribed(true);
    }
  };

  return (
    <PageLayout
      title={t('newsletter.title')}
      subtitle={t('newsletter.subtitle')}
      icon={Mail}
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
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {language === 'fr' ? 'Abonnez-vous à notre newsletter' : 
                   language === 'de' ? 'Abonnieren Sie unseren Newsletter' : 
                   'Subscribe to our newsletter'}
                </h2>
                <p className="text-gray-700 leading-relaxed">{content.intro[language]}</p>
              </div>
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">{t('newsletter.benefits')}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {content.benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900">{benefit.title[language]}</h3>
                    </div>
                    <p className="text-sm text-gray-600 ml-13">{benefit.desc[language]}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Subscription Form */}
          {!isSubscribed ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {t('newsletter.subscribe')}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'fr' ? 'Adresse email' : language === 'de' ? 'E-Mail-Adresse' : 'Email address'}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('footer.emailPlaceholder')}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Topics Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {language === 'fr' ? 'Sujets d\'intérêt' : language === 'de' ? 'Interessengebiete' : 'Topics of interest'}
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {content.topics.map((topic) => {
                      const Icon = topic.icon;
                      const isSelected = selectedTopics.includes(topic.id);
                      return (
                        <button
                          key={topic.id}
                          type="button"
                          onClick={() => toggleTopic(topic.id)}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            isSelected
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
                            <span className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                              {topic.label[language]}
                            </span>
                            {isSelected && <CheckCircle2 className="w-5 h-5 text-blue-600 ml-auto" />}
                          </div>
                          <p className="text-sm text-gray-600">{topic.desc[language]}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Frequency Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {t('newsletter.frequency')}
                  </label>
                  <div className="grid md:grid-cols-3 gap-3">
                    {content.frequencies.map((freq) => (
                      <button
                        key={freq.id}
                        type="button"
                        onClick={() => setFrequency(freq.id)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          frequency === freq.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className={`w-4 h-4 ${frequency === freq.id ? 'text-blue-600' : 'text-gray-400'}`} />
                          <span className={`font-medium ${frequency === freq.id ? 'text-blue-900' : 'text-gray-900'}`}>
                            {freq.label[language]}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">{freq.desc[language]}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Privacy Notice */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <Shield className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{content.privacy[language]}</p>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!email || selectedTopics.length === 0}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {language === 'fr' ? 'S\'abonner à la newsletter' : 
                   language === 'de' ? 'Newsletter abonnieren' : 
                   'Subscribe to newsletter'}
                </motion.button>
              </form>
            </motion.div>
          ) : (
            /* Success Message */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-8"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">{t('newsletter.success')}</h2>
                <p className="text-gray-700 mb-6">
                  {language === 'fr' 
                    ? 'Merci de vous être abonné à notre newsletter ! Vous recevrez prochainement un email de confirmation.'
                    : language === 'de'
                    ? 'Vielen Dank für Ihr Newsletter-Abonnement! Sie erhalten in Kürze eine Bestätigungs-E-Mail.'
                    : 'Thank you for subscribing to our newsletter! You will soon receive a confirmation email.'}
                </p>
                <button
                  onClick={() => setIsSubscribed(false)}
                  className="text-blue-600 hover:underline font-medium"
                >
                  {language === 'fr' ? 'Modifier mes préférences' : 
                   language === 'de' ? 'Einstellungen ändern' : 
                   'Modify my preferences'}
                </button>
              </div>
            </motion.div>
          )}

          {/* Newsletter Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">{t('newsletter.content')}</h2>
            </div>

            <div className="space-y-2">
              {content.content.sections.map((section, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  <span className="text-gray-700">{section[language]}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Unsubscribe Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200"
          >
            <Settings className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              {language === 'fr' 
                ? 'Vous pouvez modifier vos préférences ou vous désabonner à tout moment'
                : language === 'de'
                ? 'Sie können Ihre Einstellungen jederzeit ändern oder sich abmelden'
                : 'You can change your preferences or unsubscribe at any time'}
            </p>
            <a href="mailto:newsletter@civiagora.ch" className="text-blue-600 hover:underline text-sm font-medium">
              newsletter@civiagora.ch
            </a>
          </motion.div>

        </div>
      </div>
    </PageLayout>
  );
}
