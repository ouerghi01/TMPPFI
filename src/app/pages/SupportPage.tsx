import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PageLayout } from '../components/layout/PageLayout';
import { motion } from 'motion/react';
import { 
  HeadphonesIcon, 
  Mail, 
  Phone,
  MessageCircle,
  Clock,
  CheckCircle,
  Send,
  Ticket,
  Calendar,
  MapPin,
  ExternalLink,
  Facebook,
  Twitter,
  Linkedin,
  Youtube
} from 'lucide-react';
import { toast } from 'sonner';

export function SupportPage() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });

  const contactMethods = [
    {
      icon: Mail,
      title: t('support.email'),
      description: {
        fr: 'Contactez-nous par email pour des questions détaillées',
        de: 'Kontaktieren Sie uns per E-Mail für detaillierte Fragen',
        en: 'Contact us by email for detailed questions'
      },
      value: 'support@civiagora.ch',
      action: 'mailto:support@civiagora.ch',
      color: 'blue',
      responseTime: { fr: 'Réponse sous 24h', de: 'Antwort innerhalb von 24h', en: 'Response within 24h' }
    },
    {
      icon: Phone,
      title: t('support.phone'),
      description: {
        fr: 'Appelez-nous pour une assistance immédiate',
        de: 'Rufen Sie uns an für sofortige Unterstützung',
        en: 'Call us for immediate assistance'
      },
      value: '+41 22 123 45 67',
      action: 'tel:+41221234567',
      color: 'emerald',
      responseTime: { fr: 'Lun-Ven 9h-18h', de: 'Mo-Fr 9-18 Uhr', en: 'Mon-Fri 9am-6pm' }
    },
    {
      icon: MessageCircle,
      title: t('support.chat'),
      description: {
        fr: 'Discutez en direct avec notre équipe',
        de: 'Chatten Sie live mit unserem Team',
        en: 'Chat live with our team'
      },
      value: { fr: 'Chat disponible', de: 'Chat verfügbar', en: 'Chat available' },
      action: '#chat',
      color: 'purple',
      responseTime: { fr: 'Réponse immédiate', de: 'Sofortige Antwort', en: 'Immediate response' }
    },
    {
      icon: Ticket,
      title: t('support.ticketSystem'),
      description: {
        fr: 'Ouvrez un ticket pour un suivi personnalisé',
        de: 'Öffnen Sie ein Ticket für eine persönliche Nachverfolgung',
        en: 'Open a ticket for personalized tracking'
      },
      value: { fr: 'Créer un ticket', de: 'Ticket erstellen', en: 'Create ticket' },
      action: '#ticket',
      color: 'amber',
      responseTime: { fr: 'Réponse sous 48h', de: 'Antwort innerhalb von 48h', en: 'Response within 48h' }
    }
  ];

  const categories = [
    { 
      value: 'technical', 
      label: { fr: 'Problème technique', de: 'Technisches Problem', en: 'Technical issue' } 
    },
    { 
      value: 'account', 
      label: { fr: 'Compte utilisateur', de: 'Benutzerkonto', en: 'User account' } 
    },
    { 
      value: 'participation', 
      label: { fr: 'Participation', de: 'Teilnahme', en: 'Participation' } 
    },
    { 
      value: 'security', 
      label: { fr: 'Sécurité & confidentialité', de: 'Sicherheit & Datenschutz', en: 'Security & privacy' } 
    },
    { 
      value: 'suggestion', 
      label: { fr: 'Suggestion d\'amélioration', de: 'Verbesserungsvorschlag', en: 'Improvement suggestion' } 
    },
    { 
      value: 'other', 
      label: { fr: 'Autre', de: 'Sonstiges', en: 'Other' } 
    }
  ];

  const officeHours = [
    { 
      days: { fr: 'Lundi - Vendredi', de: 'Montag - Freitag', en: 'Monday - Friday' },
      hours: '9:00 - 18:00'
    },
    { 
      days: { fr: 'Samedi', de: 'Samstag', en: 'Saturday' },
      hours: '10:00 - 14:00'
    },
    { 
      days: { fr: 'Dimanche', de: 'Sonntag', en: 'Sunday' },
      hours: { fr: 'Fermé', de: 'Geschlossen', en: 'Closed' }
    }
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#', color: 'hover:text-blue-600' },
    { icon: Twitter, label: 'Twitter', href: '#', color: 'hover:text-sky-500' },
    { icon: Linkedin, label: 'LinkedIn', href: '#', color: 'hover:text-blue-700' },
    { icon: Youtube, label: 'YouTube', href: '#', color: 'hover:text-red-600' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.category || !formData.message) {
      toast.error(
        language === 'fr' ? 'Veuillez remplir tous les champs' :
        language === 'de' ? 'Bitte füllen Sie alle Felder aus' :
        'Please fill in all fields'
      );
      return;
    }

    // Simulate form submission
    toast.success(
      language === 'fr' ? 'Votre message a été envoyé avec succès !' :
      language === 'de' ? 'Ihre Nachricht wurde erfolgreich gesendet!' :
      'Your message has been sent successfully!'
    );

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      category: '',
      message: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-700 text-white">
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
              <HeadphonesIcon className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {t('support.title')}
            </motion.h1>
            
            <motion.p 
              className="text-xl text-purple-100 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {t('support.subtitle')}
            </motion.p>
          </motion.div>
        </PageLayout>
      </div>

      <PageLayout className="py-16">
        {/* Contact Methods */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4">{t('support.contactUs')}</h2>
            <p className="text-xl text-gray-600">
              {language === 'fr' ? 'Choisissez le moyen qui vous convient le mieux' : 
               language === 'de' ? 'Wählen Sie die für Sie passende Methode' : 
               'Choose the method that suits you best'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.action}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className={`w-14 h-14 rounded-lg bg-${method.color}-100 flex items-center justify-center mb-4`}>
                  <method.icon className={`w-7 h-7 text-${method.color}-600`} />
                </div>
                <h3 className="text-xl mb-2">{method.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{method.description[language]}</p>
                <p className="font-semibold text-gray-900 mb-2">
                  {typeof method.value === 'string' ? method.value : method.value[language]}
                </p>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  {method.responseTime[language]}
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Contact Form & Info */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-2xl mb-6">
                {language === 'fr' ? 'Envoyez-nous un message' :
                 language === 'de' ? 'Senden Sie uns eine Nachricht' :
                 'Send us a message'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'fr' ? 'Nom complet' : language === 'de' ? 'Vollständiger Name' : 'Full name'}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder={language === 'fr' ? 'Jean Dupont' : language === 'de' ? 'Max Mustermann' : 'John Doe'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'fr' ? 'Email' : language === 'de' ? 'E-Mail' : 'Email'}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="votre.email@exemple.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'fr' ? 'Catégorie' : language === 'de' ? 'Kategorie' : 'Category'}
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="">
                      {language === 'fr' ? 'Sélectionnez une catégorie' : 
                       language === 'de' ? 'Wählen Sie eine Kategorie' : 
                       'Select a category'}
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label[language]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'fr' ? 'Sujet' : language === 'de' ? 'Betreff' : 'Subject'}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder={language === 'fr' ? 'Résumé de votre demande' : language === 'de' ? 'Zusammenfassung Ihrer Anfrage' : 'Summary of your request'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'fr' ? 'Message' : language === 'de' ? 'Nachricht' : 'Message'}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                    placeholder={language === 'fr' ? 'Décrivez votre question ou problème en détail...' : language === 'de' ? 'Beschreiben Sie Ihre Frage oder Ihr Problem im Detail...' : 'Describe your question or problem in detail...'}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {language === 'fr' ? 'Envoyer le message' : language === 'de' ? 'Nachricht senden' : 'Send message'}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Sidebar Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Office Hours */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">
                  {language === 'fr' ? 'Horaires d\'ouverture' : language === 'de' ? 'Öffnungszeiten' : 'Office hours'}
                </h3>
              </div>
              <div className="space-y-3">
                {officeHours.map((schedule, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <span className="text-gray-700">{schedule.days[language]}</span>
                    <span className="font-semibold text-gray-900">
                      {typeof schedule.hours === 'string' ? schedule.hours : schedule.hours[language]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold">
                  {language === 'fr' ? 'Notre adresse' : language === 'de' ? 'Unsere Adresse' : 'Our address'}
                </h3>
              </div>
              <div className="space-y-2 text-gray-700">
                <p>CiviAgora SA</p>
                <p>Rue de la Paix 15</p>
                <p>1000 Bruxelles</p>
                <p>Belgique</p>
              </div>
              <motion.a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                className="mt-4 flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700"
              >
                {language === 'fr' ? 'Voir sur la carte' : language === 'de' ? 'Auf der Karte ansehen' : 'View on map'}
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-4">
                {language === 'fr' ? 'Suivez-nous' : language === 'de' ? 'Folgen Sie uns' : 'Follow us'}
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 ${social.color} transition-colors`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-12 text-center"
        >
          <CheckCircle className="w-16 h-16 mx-auto mb-4 text-indigo-600" />
          <h3 className="text-2xl mb-4">
            {language === 'fr' ? 'Consultez d\'abord notre FAQ' : 
             language === 'de' ? 'Schauen Sie zuerst in unsere FAQ' : 
             'Check our FAQ first'}
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            {language === 'fr' ? 'Vous trouverez peut-être la réponse à votre question dans notre foire aux questions' :
             language === 'de' ? 'Sie finden möglicherweise die Antwort auf Ihre Frage in unseren häufig gestellten Fragen' :
             'You might find the answer to your question in our frequently asked questions'}
          </p>
          <motion.a
            href="/faq"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            {language === 'fr' ? 'Voir la FAQ' : language === 'de' ? 'FAQ ansehen' : 'View FAQ'}
          </motion.a>
        </motion.div>
      </PageLayout>
    </div>
  );
}