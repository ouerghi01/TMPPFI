import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PageLayout } from '../components/layout/PageLayout';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search,
  User,
  Lock,
  MessageSquare,
  Settings,
  FileQuestion
} from 'lucide-react';

export function FAQPage() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const categories = [
    { id: 'all', icon: FileQuestion, label: { fr: 'Toutes', de: 'Alle', en: 'All' } },
    { id: 'general', icon: HelpCircle, label: t('faq.general') },
    { id: 'participation', icon: MessageSquare, label: t('faq.participation') },
    { id: 'technical', icon: Settings, label: t('faq.technical') },
    { id: 'security', icon: Lock, label: t('faq.security') }
  ];

  const faqData = {
    general: [
      {
        id: 'g1',
        question: {
          fr: 'Qu\'est-ce que CiviAgora ?',
          de: 'Was ist CiviAgora?',
          en: 'What is CiviAgora?'
        },
        answer: {
          fr: 'CiviAgora est une plateforme de démocratie participative qui permet aux citoyens de s\'engager activement dans les décisions qui façonnent leur territoire. Elle offre différents outils : consultations publiques, assemblées citoyennes, pétitions, conférences et votes référendaires.',
          de: 'CiviAgora ist eine Plattform für partizipative Demokratie, die es Bürgern ermöglicht, sich aktiv an Entscheidungen zu beteiligen, die ihre Region gestalten. Sie bietet verschiedene Werkzeuge: öffentliche Konsultationen, Bürgerversammlungen, Petitionen, Konferenzen und Referendumsabstimmungen.',
          en: 'CiviAgora is a participatory democracy platform that enables citizens to actively engage in decisions that shape their territory. It offers various tools: public consultations, citizen assemblies, petitions, conferences, and referendum votes.'
        }
      },
      {
        id: 'g2',
        question: {
          fr: 'Comment créer un compte ?',
          de: 'Wie erstelle ich ein Konto?',
          en: 'How do I create an account?'
        },
        answer: {
          fr: 'Pour créer un compte, cliquez sur "Connexion" en haut à droite, puis sélectionnez "S\'inscrire". Vous devrez fournir une adresse email valide, créer un mot de passe sécurisé et confirmer votre identité. Le processus est gratuit et ne prend que quelques minutes.',
          de: 'Um ein Konto zu erstellen, klicken Sie oben rechts auf "Anmelden" und wählen Sie dann "Registrieren". Sie müssen eine gültige E-Mail-Adresse angeben, ein sicheres Passwort erstellen und Ihre Identität bestätigen. Der Vorgang ist kostenlos und dauert nur wenige Minuten.',
          en: 'To create an account, click "Login" in the top right, then select "Sign up". You will need to provide a valid email address, create a secure password, and confirm your identity. The process is free and takes only a few minutes.'
        }
      },
      {
        id: 'g3',
        question: {
          fr: 'La plateforme est-elle gratuite ?',
          de: 'Ist die Plattform kostenlos?',
          en: 'Is the platform free?'
        },
        answer: {
          fr: 'Oui, CiviAgora est entièrement gratuite pour tous les citoyens. Il n\'y a aucun frais d\'inscription ni de coûts cachés. Notre mission est de rendre la participation démocratique accessible à tous.',
          de: 'Ja, CiviAgora ist für alle Bürger völlig kostenlos. Es gibt keine Registrierungsgebühren oder versteckte Kosten. Unsere Mission ist es, demokratische Teilhabe für alle zugänglich zu machen.',
          en: 'Yes, CiviAgora is completely free for all citizens. There are no registration fees or hidden costs. Our mission is to make democratic participation accessible to everyone.'
        }
      },
      {
        id: 'g4',
        question: {
          fr: 'Qui peut utiliser la plateforme ?',
          de: 'Wer kann die Plattform nutzen?',
          en: 'Who can use the platform?'
        },
        answer: {
          fr: 'Tous les résidents de la collectivité peuvent utiliser CiviAgora. Certaines fonctionnalités (comme le vote) peuvent nécessiter une vérification d\'identité supplémentaire pour garantir l\'intégrité du processus démocratique.',
          de: 'Alle Einwohner der Gemeinde können CiviAgora nutzen. Einige Funktionen (wie das Abstimmen) erfordern möglicherweise eine zusätzliche Identitätsüberprüfung, um die Integrität des demokratischen Prozesses zu gewährleisten.',
          en: 'All residents of the community can use CiviAgora. Some features (such as voting) may require additional identity verification to ensure the integrity of the democratic process.'
        }
      }
    ],
    participation: [
      {
        id: 'p1',
        question: {
          fr: 'Comment participer à une consultation ?',
          de: 'Wie nehme ich an einer Konsultation teil?',
          en: 'How do I participate in a consultation?'
        },
        answer: {
          fr: 'Accédez à la section "Concertations", sélectionnez une consultation active qui vous intéresse, lisez les informations et documents fournis, puis soumettez votre contribution via le formulaire dédié. Vous pouvez également commenter les propositions d\'autres participants.',
          de: 'Gehen Sie zum Bereich "Konsultationen", wählen Sie eine aktive Konsultation aus, die Sie interessiert, lesen Sie die bereitgestellten Informationen und Dokumente und reichen Sie dann Ihren Beitrag über das entsprechende Formular ein. Sie können auch die Vorschläge anderer Teilnehmer kommentieren.',
          en: 'Go to the "Consultations" section, select an active consultation that interests you, read the provided information and documents, then submit your contribution via the dedicated form. You can also comment on other participants\' proposals.'
        }
      },
      {
        id: 'p2',
        question: {
          fr: 'Comment créer une pétition ?',
          de: 'Wie erstelle ich eine Petition?',
          en: 'How do I create a petition?'
        },
        answer: {
          fr: 'Dans la section "Pétitions", cliquez sur "Créer une pétition". Remplissez le formulaire en détaillant votre demande, fixez un objectif de signatures et soumettez-la pour modération. Une fois approuvée, elle sera publiée et vous pourrez la partager.',
          de: 'Klicken Sie im Bereich "Petitionen" auf "Petition erstellen". Füllen Sie das Formular aus, indem Sie Ihr Anliegen detailliert beschreiben, legen Sie ein Unterschriftenziel fest und reichen Sie es zur Moderation ein. Nach der Genehmigung wird sie veröffentlicht und Sie können sie teilen.',
          en: 'In the "Petitions" section, click "Create a petition". Fill out the form detailing your request, set a signature goal, and submit it for moderation. Once approved, it will be published and you can share it.'
        }
      },
      {
        id: 'p3',
        question: {
          fr: 'Mes contributions sont-elles anonymes ?',
          de: 'Sind meine Beiträge anonym?',
          en: 'Are my contributions anonymous?'
        },
        answer: {
          fr: 'Cela dépend du processus. Certaines consultations permettent les contributions anonymes, tandis que d\'autres nécessitent une identification pour garantir la transparence. Les paramètres de confidentialité sont clairement indiqués pour chaque processus.',
          de: 'Das hängt vom Prozess ab. Einige Konsultationen erlauben anonyme Beiträge, während andere eine Identifizierung erfordern, um Transparenz zu gewährleisten. Die Datenschutzeinstellungen sind für jeden Prozess klar angegeben.',
          en: 'It depends on the process. Some consultations allow anonymous contributions, while others require identification to ensure transparency. Privacy settings are clearly indicated for each process.'
        }
      },
      {
        id: 'p4',
        question: {
          fr: 'Comment signer une pétition ?',
          de: 'Wie unterschreibe ich eine Petition?',
          en: 'How do I sign a petition?'
        },
        answer: {
          fr: 'Trouvez la pétition dans la liste, lisez son contenu et les objectifs, puis cliquez sur "Signer". Vous devrez confirmer votre signature par email. Votre signature sera comptabilisée immédiatement.',
          de: 'Finden Sie die Petition in der Liste, lesen Sie ihren Inhalt und die Ziele und klicken Sie dann auf "Unterschreiben". Sie müssen Ihre Unterschrift per E-Mail bestätigen. Ihre Unterschrift wird sofort gezählt.',
          en: 'Find the petition in the list, read its content and objectives, then click "Sign". You will need to confirm your signature by email. Your signature will be counted immediately.'
        }
      },
      {
        id: 'p5',
        question: {
          fr: 'Comment voter sur une proposition ?',
          de: 'Wie stimme ich über einen Vorschlag ab?',
          en: 'How do I vote on a proposal?'
        },
        answer: {
          fr: 'Accédez à la section "Votes & Référendums", sélectionnez le vote actif, lisez attentivement les options et leurs implications, puis faites votre choix. Votre vote est sécurisé, confidentiel et ne peut être modifié une fois soumis.',
          de: 'Gehen Sie zum Bereich "Abstimmungen & Referenden", wählen Sie die aktive Abstimmung aus, lesen Sie die Optionen und ihre Auswirkungen sorgfältig durch und treffen Sie dann Ihre Wahl. Ihre Stimme ist sicher, vertraulich und kann nach der Abgabe nicht mehr geändert werden.',
          en: 'Go to the "Votes & Referendums" section, select the active vote, carefully read the options and their implications, then make your choice. Your vote is secure, confidential, and cannot be changed once submitted.'
        }
      }
    ],
    technical: [
      {
        id: 't1',
        question: {
          fr: 'Quels navigateurs sont supportés ?',
          de: 'Welche Browser werden unterstützt?',
          en: 'Which browsers are supported?'
        },
        answer: {
          fr: 'CiviAgora fonctionne sur tous les navigateurs modernes : Chrome, Firefox, Safari, Edge (versions récentes). Nous recommandons de maintenir votre navigateur à jour pour une expérience optimale.',
          de: 'CiviAgora funktioniert auf allen modernen Browsern: Chrome, Firefox, Safari, Edge (aktuelle Versionen). Wir empfehlen, Ihren Browser auf dem neuesten Stand zu halten, um ein optimales Erlebnis zu gewährleisten.',
          en: 'CiviAgora works on all modern browsers: Chrome, Firefox, Safari, Edge (recent versions). We recommend keeping your browser up to date for an optimal experience.'
        }
      },
      {
        id: 't2',
        question: {
          fr: 'L\'application est-elle disponible sur mobile ?',
          de: 'Ist die App auf Mobilgeräten verfügbar?',
          en: 'Is the app available on mobile?'
        },
        answer: {
          fr: 'Oui, CiviAgora est entièrement responsive et fonctionne parfaitement sur smartphones et tablettes. Vous pouvez y accéder via votre navigateur mobile sans installer d\'application.',
          de: 'Ja, CiviAgora ist vollständig responsiv und funktioniert perfekt auf Smartphones und Tablets. Sie können über Ihren mobilen Browser darauf zugreifen, ohne eine App installieren zu müssen.',
          en: 'Yes, CiviAgora is fully responsive and works perfectly on smartphones and tablets. You can access it via your mobile browser without installing an app.'
        }
      },
      {
        id: 't3',
        question: {
          fr: 'J\'ai oublié mon mot de passe, que faire ?',
          de: 'Ich habe mein Passwort vergessen, was soll ich tun?',
          en: 'I forgot my password, what should I do?'
        },
        answer: {
          fr: 'Sur la page de connexion, cliquez sur "Mot de passe oublié", entrez votre email, et vous recevrez un lien pour réinitialiser votre mot de passe. Le lien est valable 24 heures.',
          de: 'Klicken Sie auf der Anmeldeseite auf "Passwort vergessen", geben Sie Ihre E-Mail-Adresse ein und Sie erhalten einen Link zum Zurücksetzen Ihres Passworts. Der Link ist 24 Stunden gültig.',
          en: 'On the login page, click "Forgot password", enter your email, and you will receive a link to reset your password. The link is valid for 24 hours.'
        }
      },
      {
        id: 't4',
        question: {
          fr: 'Comment puis-je recevoir des notifications ?',
          de: 'Wie kann ich Benachrichtigungen erhalten?',
          en: 'How can I receive notifications?'
        },
        answer: {
          fr: 'Accédez à vos paramètres de compte, section "Notifications". Vous pouvez choisir de recevoir des alertes par email, SMS ou notifications push pour les sujets et processus qui vous intéressent.',
          de: 'Gehen Sie zu Ihren Kontoeinstellungen, Abschnitt "Benachrichtigungen". Sie können wählen, ob Sie Benachrichtigungen per E-Mail, SMS oder Push-Benachrichtigungen für Themen und Prozesse erhalten möchten, die Sie interessieren.',
          en: 'Go to your account settings, "Notifications" section. You can choose to receive alerts by email, SMS, or push notifications for topics and processes that interest you.'
        }
      }
    ],
    security: [
      {
        id: 's1',
        question: {
          fr: 'Mes données personnelles sont-elles sécurisées ?',
          de: 'Sind meine persönlichen Daten sicher?',
          en: 'Are my personal data secure?'
        },
        answer: {
          fr: 'Absolument. Nous utilisons un chiffrement SSL/TLS pour toutes les communications, vos mots de passe sont hachés avec des algorithmes modernes, et nous sommes conformes au RGPD. Vos données ne sont jamais vendues à des tiers.',
          de: 'Absolut. Wir verwenden SSL/TLS-Verschlüsselung für alle Kommunikationen, Ihre Passwörter werden mit modernen Algorithmen gehasht und wir sind DSGVO-konform. Ihre Daten werden niemals an Dritte verkauft.',
          en: 'Absolutely. We use SSL/TLS encryption for all communications, your passwords are hashed with modern algorithms, and we are GDPR compliant. Your data is never sold to third parties.'
        }
      },
      {
        id: 's2',
        question: {
          fr: 'Comment est garantie la confidentialité des votes ?',
          de: 'Wie wird die Vertraulichkeit der Abstimmungen gewährleistet?',
          en: 'How is the confidentiality of votes guaranteed?'
        },
        answer: {
          fr: 'Nous utilisons un système de vote électronique sécurisé avec chiffrement de bout en bout. Les votes sont anonymisés et il est techniquement impossible de relier un vote à son auteur. Les résultats sont audités par des organismes indépendants.',
          de: 'Wir verwenden ein sicheres elektronisches Abstimmungssystem mit Ende-zu-Ende-Verschlüsselung. Die Stimmen werden anonymisiert und es ist technisch unmöglich, eine Stimme mit ihrem Autor zu verknüpfen. Die Ergebnisse werden von unabhängigen Stellen geprüft.',
          en: 'We use a secure electronic voting system with end-to-end encryption. Votes are anonymized and it is technically impossible to link a vote to its author. Results are audited by independent organizations.'
        }
      },
      {
        id: 's3',
        question: {
          fr: 'Puis-je supprimer mon compte ?',
          de: 'Kann ich mein Konto löschen?',
          en: 'Can I delete my account?'
        },
        answer: {
          fr: 'Oui, vous pouvez supprimer votre compte à tout moment depuis les paramètres. Vos données personnelles seront supprimées définitivement, conformément au droit à l\'oubli du RGPD. Les contributions publiques anonymisées peuvent être conservées pour l\'intégrité des processus.',
          de: 'Ja, Sie können Ihr Konto jederzeit in den Einstellungen löschen. Ihre persönlichen Daten werden gemäß dem Recht auf Vergessenwerden der DSGVO endgültig gelöscht. Anonymisierte öffentliche Beiträge können zur Wahrung der Integrität der Prozesse aufbewahrt werden.',
          en: 'Yes, you can delete your account at any time from the settings. Your personal data will be permanently deleted in accordance with the GDPR right to be forgotten. Anonymized public contributions may be retained for process integrity.'
        }
      },
      {
        id: 's4',
        question: {
          fr: 'Comment sont vérifiées les identités ?',
          de: 'Wie werden Identitäten überprüft?',
          en: 'How are identities verified?'
        },
        answer: {
          fr: 'Pour les processus officiels (votes, pétitions), nous utilisons des méthodes de vérification d\'identité conformes aux standards gouvernementaux : validation d\'email, numéro de téléphone, et dans certains cas, vérification de documents d\'identité.',
          de: 'Für offizielle Prozesse (Abstimmungen, Petitionen) verwenden wir Identitätsüberprüfungsmethoden, die den Regierungsstandards entsprechen: E-Mail-Validierung, Telefonnummer und in einigen Fällen Überprüfung von Ausweisdokumenten.',
          en: 'For official processes (votes, petitions), we use identity verification methods that comply with government standards: email validation, phone number, and in some cases, identity document verification.'
        }
      }
    ]
  };

  const filteredFAQs = Object.entries(faqData).reduce((acc, [category, questions]) => {
    if (activeCategory !== 'all' && category !== activeCategory) return acc;
    
    const filtered = questions.filter(q => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        q.question[language].toLowerCase().includes(query) ||
        q.answer[language].toLowerCase().includes(query)
      );
    });
    
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {} as typeof faqData);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white">
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
              <HelpCircle className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {t('faq.title')}
            </motion.h1>
            
            <motion.p 
              className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {t('faq.subtitle')}
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={language === 'fr' ? 'Rechercher une question...' : language === 'de' ? 'Eine Frage suchen...' : 'Search for a question...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white placeholder-blue-200 focus:outline-none focus:bg-white/20 focus:border-white/50 transition-all"
                />
              </div>
            </motion.div>
          </motion.div>
        </PageLayout>
      </div>

      <PageLayout className="py-16">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              const label = typeof category.label === 'string' ? category.label : category.label[language];
              
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-blue-50/50 border border-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {Object.entries(filteredFAQs).map(([category, questions]) => (
            <div key={category}>
              {questions.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="mb-4"
                >
                  <button
                    onClick={() => setOpenQuestion(openQuestion === faq.id ? null : faq.id)}
                    className="w-full bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-left border border-gray-100"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                          <HelpCircle className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg mb-2 pr-8">{faq.question[language]}</h3>
                          <AnimatePresence>
                            {openQuestion === faq.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <p className="text-gray-600 leading-relaxed pt-2">
                                  {faq.answer[language]}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: openQuestion === faq.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className="w-6 h-6 text-gray-400" />
                      </motion.div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          ))}

          {Object.keys(filteredFAQs).length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl text-gray-600 mb-2">
                {language === 'fr' ? 'Aucune question trouvée' : language === 'de' ? 'Keine Fragen gefunden' : 'No questions found'}
              </h3>
              <p className="text-gray-500">
                {language === 'fr' ? 'Essayez un autre terme de recherche ou contactez notre support' : language === 'de' ? 'Versuchen Sie einen anderen Suchbegriff oder kontaktieren Sie unseren Support' : 'Try a different search term or contact our support'}
              </p>
            </motion.div>
          )}
        </div>

        {/* Contact Support CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-12 text-center"
        >
          <User className="w-16 h-16 mx-auto mb-4 text-blue-600" />
          <h3 className="text-2xl mb-4">
            {language === 'fr' ? 'Vous ne trouvez pas votre réponse ?' : language === 'de' ? 'Finden Sie Ihre Antwort nicht?' : 'Can\'t find your answer?'}
          </h3>
          <p className="text-gray-600 mb-6">
            {language === 'fr' ? 'Notre équipe de support est là pour vous aider' : language === 'de' ? 'Unser Support-Team ist für Sie da' : 'Our support team is here to help you'}
          </p>
          <motion.a
            href="/support"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            {language === 'fr' ? 'Contacter le support' : language === 'de' ? 'Support kontaktieren' : 'Contact support'}
          </motion.a>
        </motion.div>
      </PageLayout>
    </div>
  );
}