import React, { useState } from 'react';
import { X, Send, Sparkles, MessageCircle, Home, RotateCcw } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

interface FrequentQuestion {
  id: number;
  question: { fr: string; de: string; en: string };
  answer: { fr: string; de: string; en: string };
}

interface Recommendation {
  id: number;
  tag: { fr: string; de: string; en: string };
  tagColor: string;
  title: { fr: string; de: string; en: string };
}

type ViewType = 'menu' | 'conversation';

export function Chatbot() {
  const { language, tLocal } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [view, setView] = useState<ViewType>('menu');

  const frequentQuestions: FrequentQuestion[] = [
    {
      id: 1,
      question: {
        fr: 'Comment créer une pétition ?',
        de: 'Wie erstelle ich eine Petition?',
        en: 'How to create a petition?',
      },
      answer: {
        fr: "Pour créer une pétition, connectez-vous à votre compte, puis cliquez sur le bouton 'Nouvelle Pétition'. Remplissez le formulaire avec le titre, la description, l'objectif et les destinataires. Une fois soumise, votre pétition sera examinée par notre équipe de modération avant publication.",
        de: "Um eine Petition zu erstellen, melden Sie sich bei Ihrem Konto an und klicken Sie auf die Schaltfläche 'Neue Petition'. Füllen Sie das Formular mit Titel, Beschreibung, Ziel und Empfängern aus. Nach der Einreichung wird Ihre Petition von unserem Moderationsteam vor der Veröffentlichung geprüft.",
        en: "To create a petition, log in to your account, then click on the 'New Petition' button. Fill out the form with the title, description, objective and recipients. Once submitted, your petition will be reviewed by our moderation team before publication.",
      },
    },
    {
      id: 2,
      question: {
        fr: 'Comment fonctionne le vote électronique ?',
        de: 'Wie funktioniert die elektronische Abstimmung?',
        en: 'How does electronic voting work?',
      },
      answer: {
        fr: "Notre système de vote électronique est sécurisé et anonyme. Une fois que vous votez, votre choix est crypté et stocké de manière anonyme. Vous recevrez une confirmation de vote, mais personne ne pourra voir votre choix. Les résultats sont comptabilisés automatiquement et publiés à la clôture du vote.",
        de: "Unser elektronisches Abstimmungssystem ist sicher und anonymous. Sobald Sie abstimmen, wird Ihre Wahl verschlüsselt und anonym gespeichert. Sie erhalten eine Bestätigung Ihrer Abstimmung, aber niemand kann Ihre Wahl sehen. Die Ergebnisse werden automatisch gezählt und nach Abschluss der Abstimmung veröffentlicht.",
        en: "Our electronic voting system is secure and anonymous. Once you vote, your choice is encrypted and stored anonymously. You will receive a vote confirmation, but no one will be able to see your choice. Results are automatically tallied and published when voting closes.",
      },
    },
    {
      id: 3,
      question: {
        fr: 'Quels sont les critères du budget participatif ?',
        de: 'Was sind die Kriterien für den Bürgerhaushalt?',
        en: 'What are the participatory budget criteria?',
      },
      answer: {
        fr: "Le budget participatif permet aux citoyens de proposer et voter pour des projets locaux. Les critères incluent : projet d'intérêt général, faisabilité technique, coût raisonnable (généralement entre 5 000€ et 100 000€), impact positif sur la communauté. Tous les résidents de plus de 16 ans peuvent participer.",
        de: "Der Bürgerhaushalt ermöglicht es den Bürgern, lokale Projekte vorzuschlagen und darüber abzustimmen. Die Kriterien umfassen: Projekt von allgemeinem Interesse, technische Machbarkeit, angemessene Kosten (normalerweise zwischen 5.000€ und 100.000€), positive Auswirkungen auf die Gemeinschaft. Alle Einwohner über 16 Jahre können teilnehmen.",
        en: "The participatory budget allows citizens to propose and vote for local projects. Criteria include: project of general interest, technical feasibility, reasonable cost (generally between €5,000 and €100,000), positive impact on the community. All residents over 16 can participate.",
      },
    },
    {
      id: 4,
      question: {
        fr: 'Comment devenir bénévole pour la ville ?',
        de: 'Wie kann ich freiwillig für die Stadt arbeiten?',
        en: 'How to become a volunteer for the city?',
      },
      answer: {
        fr: "Pour devenir bénévole, visitez la section 'Engagement' de votre profil et consultez les opportunités disponibles. Vous pouvez aider lors d'événements, participer à des assemblées citoyennes, ou rejoindre des groupes de travail thématiques. Inscrivez-vous aux missions qui vous intéressent et notre équipe vous contactera.",
        de: "Um freiwillig zu arbeiten, besuchen Sie den Bereich 'Engagement' in Ihrem Profil und sehen Sie sich die verfügbaren Möglichkeiten an. Sie können bei Veranstaltungen helfen, an Bürgerversammlungen teilnehmen oder thematischen Arbeitsgruppen beitreten. Melden Sie sich für die Aufgaben an, die Sie interessieren, und unser Team wird Sie kontaktieren.",
        en: "To become a volunteer, visit the 'Engagement' section of your profile and check out the available opportunities. You can help at events, participate in citizen assemblies, or join thematic working groups. Sign up for the missions that interest you and our team will contact you.",
      },
    },
  ];

  const recommendations: Recommendation[] = [
    {
      id: 1,
      tag: { fr: 'Processus', de: 'Prozess', en: 'Process' },
      tagColor: 'bg-blue-100 text-blue-700',
      title: {
        fr: 'Nouvelle concertation sur le climat',
        de: 'Neue Klimakonsultation',
        en: 'New climate consultation',
      },
    },
    {
      id: 2,
      tag: { fr: 'Vote', de: 'Abstimmung', en: 'Vote' },
      tagColor: 'bg-purple-100 text-purple-700',
      title: {
        fr: 'Élisez le meilleur projet de quartier',
        de: 'Wählen Sie das beste Quartiersprojekt',
        en: 'Vote for the best neighborhood project',
      },
    },
    {
      id: 3,
      tag: { fr: 'Événement', de: 'Veranstaltung', en: 'Event' },
      tagColor: 'bg-green-100 text-green-700',
      title: {
        fr: "Atelier d'urbanisme : Centre-ville",
        de: 'Städtebau-Workshop: Stadtzentrum',
        en: 'Urban planning workshop: City center',
      },
    },
  ];

  const handleSend = () => {
    if (message.trim()) {
      // Add user message
      const userMessage: Message = {
        id: Date.now(),
        text: message,
        isUser: true,
      };
      
      setMessages((prev) => [...prev, userMessage]);
      setView('conversation');
      
      // Simulate AI response
      setTimeout(() => {
        const responses = {
          fr: "Je suis l'assistant CiviAgora. Je peux vous aider avec vos questions sur la démocratie participative. N'hésitez pas à cliquer sur les questions fréquentes pour obtenir des réponses détaillées.",
          de: "Ich bin der CiviAgora-Assistent. Ich kann Ihnen bei Fragen zur partizipativen Demokratie helfen. Zögern Sie nicht, auf die häufig gestellten Fragen zu klicken, um detaillierte Antworten zu erhalten.",
          en: "I'm the CiviAgora assistant. I can help you with your questions about participatory democracy. Feel free to click on the frequent questions to get detailed answers.",
        };
        
        const botMessage: Message = {
          id: Date.now() + 1,
          text: responses[language],
          isUser: false,
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 500);
      
      setMessage('');
    }
  };

  const handleQuestionClick = (question: FrequentQuestion) => {
    // Add user question
    const userMessage: Message = {
      id: Date.now(),
      text: tLocal(question.question),
      isUser: true,
    };
    
    // Add bot answer
    const botMessage: Message = {
      id: Date.now() + 1,
      text: tLocal(question.answer),
      isUser: false,
    };
    
    setMessages([userMessage, botMessage]);
    setView('conversation');
  };

  const handleBackToMenu = () => {
    setView('menu');
  };

  const handleNewConversation = () => {
    setMessages([]);
    setView('menu');
  };

  const getTitle = () => {
    if (language === 'fr') return 'Bonjour ! Comment puis-je vous aider ?';
    if (language === 'de') return 'Hallo! Wie kann ich Ihnen helfen?';
    return 'Hello! How can I help you?';
  };

  const getSubtitle = () => {
    if (language === 'fr') return 'Posez-moi vos questions sur la démocratie participative';
    if (language === 'de') return 'Stellen Sie mir Fragen zur partizipativen Demokratie';
    return 'Ask me your questions about participatory democracy';
  };

  return (
    <>
      {/* Floating Trigger Button - Positioned to avoid overlap */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        aria-label={isOpen ? (language === 'fr' ? "Fermer l'assistant" : language === 'de' ? 'Assistenten schließen' : 'Close assistant') : (language === 'fr' ? "Ouvrir l'assistant" : language === 'de' ? 'Assistenten öffnen' : 'Open assistant')}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chatbot Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-[400px] h-[600px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold mb-1">
                  {getTitle()}
                </h2>
                <p className="text-xs text-blue-100 leading-relaxed">
                  {getSubtitle()}
                </p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2 mt-3">
              {view === 'conversation' && (
                <button
                  onClick={handleBackToMenu}
                  className="flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-medium"
                >
                  <Home className="w-4 h-4" />
                  {language === 'fr' ? 'Menu' : language === 'de' ? 'Menü' : 'Menu'}
                </button>
              )}
              {messages.length > 0 && (
                <button
                  onClick={handleNewConversation}
                  className="flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-medium"
                >
                  <RotateCcw className="w-4 h-4" />
                  {language === 'fr' ? 'Recommencer' : language === 'de' ? 'Neu starten' : 'Restart'}
                </button>
              )}
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
            {view === 'menu' ? (
              <>
                {/* Frequent Questions Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                    {language === 'fr' ? 'Questions fréquentes' : language === 'de' ? 'Häufige Fragen' : 'Frequent questions'}
                  </h3>
                  <div className="space-y-2">
                    {frequentQuestions.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleQuestionClick(item)}
                        className="w-full text-left px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-150 text-sm text-gray-700 hover:text-blue-700"
                      >
                        {tLocal(item.question)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recommendations Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
                    {language === 'fr' ? 'Recommandations pour vous' : language === 'de' ? 'Empfehlungen für Sie' : 'Recommendations for you'}
                  </h3>
                  <div className="space-y-3">
                    {recommendations.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all duration-150 cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${item.tagColor}`}
                          >
                            {tLocal(item.tag)}
                          </span>
                          <p className="flex-1 text-sm text-gray-700 font-medium">
                            {tLocal(item.title)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Messages Display */}
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg px-4 py-3 ${
                          msg.isUser
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-900 border border-gray-200'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Actions in Conversation */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                    {language === 'fr' ? 'Besoin d\'autre chose ?' : language === 'de' ? 'Brauchen Sie noch etwas?' : 'Need something else?'}
                  </h3>
                  <div className="space-y-2">
                    {frequentQuestions.slice(0, 2).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleQuestionClick(item)}
                        className="w-full text-left px-3 py-2 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-150 text-xs text-gray-700 hover:text-blue-700"
                      >
                        {tLocal(item.question)}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer - Input Area (Fixed at bottom, no overlap) */}
          <div className="border-t border-gray-200 bg-white p-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={language === 'fr' ? 'Posez votre question...' : language === 'de' ? 'Stellen Sie Ihre Frage...' : 'Ask your question...'}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className="flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
                aria-label={language === 'fr' ? 'Envoyer' : language === 'de' ? 'Senden' : 'Send'}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}