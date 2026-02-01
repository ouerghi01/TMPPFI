import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, HelpCircle, Loader2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Badge } from '@/app/components/ui/badge';
import { Card } from '@/app/components/ui/card';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useAskAI, useAISuggestions, useAIQuickAnswers } from '@/app/hooks/useApi';
import type { AIMessageDTO, AISuggestionDTO, AIQuickAnswerDTO } from '@/app/types';

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AIMessageDTO[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [conversationId, setConversationId] = useState<string | undefined>();

  const { language, tLocal, t } = useLanguage();
  const askAI = useAskAI();
  const { data: suggestions } = useAISuggestions();
  const { data: quickAnswers } = useAIQuickAnswers();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || askAI.isPending) return;

    const userMessage: AIMessageDTO = {
      id: 'user_' + Date.now(),
      role: 'user',
      content: {
        fr: inputValue,
        de: inputValue,
        en: inputValue,
      },
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    try {
      const response = await askAI.mutateAsync({
        question: inputValue,
        language,
        conversationId,
      });

      setConversationId(response.conversationId);
      setMessages((prev) => [...prev, response.message]);
    } catch (error) {
      console.error('Error asking AI:', error);
    }
  };

  const handleQuickAnswer = (qa: AIQuickAnswerDTO) => {
    const userMessage: AIMessageDTO = {
      id: 'user_' + Date.now(),
      role: 'user',
      content: qa.question,
      timestamp: new Date().toISOString(),
    };

    const assistantMessage: AIMessageDTO = {
      id: 'assistant_' + Date.now(),
      role: 'assistant',
      content: qa.answer,
      timestamp: new Date().toISOString(),
    };

    setMessages([userMessage, assistantMessage]);
  };

  const handleSuggestionClick = (suggestion: AISuggestionDTO) => {
    if (suggestion.actionUrl) {
      window.location.href = suggestion.actionUrl;
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-110"
          aria-label={t('ai.openAssistant')}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
            </span>
          )}
        </Button>
      </div>

      {/* Side Panel */}
      {isOpen && (
        <div
          className="fixed inset-y-0 right-0 z-40 w-full sm:w-[440px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col"
          style={{ maxWidth: '100vw' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <h2 className="font-semibold">
                {language === 'fr' && 'Assistant CiviAgora'}
                {language === 'de' && 'CiviAgora-Assistent'}
                {language === 'en' && 'CiviAgora Assistant'}
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-blue-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            {messages.length === 0 ? (
              <div className="space-y-6">
                {/* Welcome Message */}
                <div className="text-center space-y-2 py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                    <Sparkles className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg">
                    {language === 'fr' && 'Bonjour ! Comment puis-je vous aider ?'}
                    {language === 'de' && 'Hallo! Wie kann ich Ihnen helfen?'}
                    {language === 'en' && 'Hello! How can I help you?'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'fr' && 'Posez-moi vos questions sur la démocratie participative'}
                    {language === 'de' && 'Stellen Sie mir Fragen zur partizipativen Demokratie'}
                    {language === 'en' && 'Ask me questions about participatory democracy'}
                  </p>
                </div>

                {/* Quick Answers */}
                {quickAnswers && quickAnswers.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <HelpCircle className="h-4 w-4" />
                      {language === 'fr' && 'Questions fréquentes'}
                      {language === 'de' && 'Häufige Fragen'}
                      {language === 'en' && 'Frequent questions'}
                    </div>
                    {quickAnswers.map((qa) => (
                      <button
                        key={qa.tags.join('-')}
                        onClick={() => handleQuickAnswer(qa)}
                        className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-sm group"
                      >
                        <span className="group-hover:text-blue-700">{tLocal(qa.question)}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Suggestions */}
                {suggestions && suggestions.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
                      {language === 'fr' && 'Recommandations pour vous'}
                      {language === 'de' && 'Empfehlungen für Sie'}
                      {language === 'en' && 'Recommendations for you'}
                    </div>
                    <div className="space-y-2">
                      {suggestions.map((suggestion) => (
                        <Card
                          key={suggestion.id}
                          className="p-3 hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-blue-300"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <div className="flex items-start gap-3">
                            <Badge
                              variant="secondary"
                              className={`text-xs shrink-0 ${suggestion.type === 'process' ? 'bg-blue-100 text-blue-700' :
                                  suggestion.type === 'action' ? 'bg-purple-100 text-purple-700' :
                                    'bg-green-100 text-green-700'
                                }`}
                            >
                              {suggestion.type === 'process' && (language === 'fr' ? 'Processus' : language === 'de' ? 'Prozess' : 'Process')}
                              {suggestion.type === 'action' && (language === 'fr' ? 'Vote' : language === 'de' ? 'Abstimmung' : 'Vote')}
                              {suggestion.type === 'resource' && (language === 'fr' ? 'Événement' : language === 'de' ? 'Veranstaltung' : 'Event')}
                            </Badge>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm text-gray-900">{tLocal(suggestion.title)}</h4>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg p-3 ${message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                        }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{tLocal(message.content)}</p>
                    </div>
                  </div>
                ))}
                {askAI.isPending && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <Loader2 className="h-5 w-5 animate-spin text-gray-600" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t bg-gray-50">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  language === 'fr'
                    ? 'Posez votre question...'
                    : language === 'de'
                      ? 'Stellen Sie Ihre Frage...'
                      : 'Ask your question...'
                }
                disabled={askAI.isPending}
                className="flex-1"
              />
              <Button type="submit" disabled={askAI.isPending || !inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {language === 'fr' && 'L\'assistant peut faire des erreurs. Vérifiez les informations importantes.'}
              {language === 'de' && 'Der Assistent kann Fehler machen. Überprüfen Sie wichtige Informationen.'}
              {language === 'en' && 'The assistant can make mistakes. Check important information.'}
            </p>
          </div>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}