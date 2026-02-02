import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles, MessageSquare, ArrowUp, Compass, AlertCircle, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  useThemes,
  useConsultations,
  usePetitions,
  useVotes,
  useConferences,
  useAssemblies,
  useSignalements,
  useYouthPolls,
  useLegislativeConsultations,
} from '@/app/hooks/useApi';

// --- Types ---

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isError?: boolean;
  isPlaying?: boolean;
}

interface Suggestion {
  id: string;
  label: { fr: string; de: string; en: string };
  intent: string;
}

// --- Components ---

// Lightweight Markdown Renderer
const MarkdownRenderer = ({ content }: { content: string }) => {
  const parseMarkdown = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Headings
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={key++} className="text-base font-semibold text-gray-900 mt-4 mb-2">
            {parseInline(line.substring(4))}
          </h3>
        );
        continue;
      }
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={key++} className="text-lg font-semibold text-gray-900 mt-5 mb-2">
            {parseInline(line.substring(3))}
          </h2>
        );
        continue;
      }

      // Bullet lists
      if (line.startsWith('• ') || line.startsWith('- ')) {
        elements.push(
          <div key={key++} className="flex gap-2 my-1">
            <span className="text-gray-400 mt-0.5">•</span>
            <span className="flex-1">{parseInline(line.substring(2))}</span>
          </div>
        );
        continue;
      }

      // Code blocks
      if (line.startsWith('```')) {
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        elements.push(
          <pre key={key++} className="bg-gray-100 rounded-lg p-3 my-3 overflow-x-auto text-xs font-mono">
            <code>{codeLines.join('\n')}</code>
          </pre>
        );
        continue;
      }

      // Empty lines
      if (line.trim() === '') {
        elements.push(<div key={key++} className="h-2" />);
        continue;
      }

      // Regular paragraphs
      elements.push(
        <p key={key++} className="my-1.5 leading-relaxed">
          {parseInline(line)}
        </p>
      );
    }

    return elements;
  };

  const parseInline = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    let current = '';
    let i = 0;
    let key = 0;

    while (i < text.length) {
      // Bold **text**
      if (text.substring(i, i + 2) === '**') {
        if (current) {
          parts.push(<span key={key++}>{current}</span>);
          current = '';
        }
        i += 2;
        let bold = '';
        while (i < text.length && text.substring(i, i + 2) !== '**') {
          bold += text[i];
          i++;
        }
        parts.push(<strong key={key++} className="font-semibold text-gray-900">{bold}</strong>);
        i += 2;
        continue;
      }

      // Italic *text*
      if (text[i] === '*' && text[i + 1] !== '*') {
        if (current) {
          parts.push(<span key={key++}>{current}</span>);
          current = '';
        }
        i++;
        let italic = '';
        while (i < text.length && text[i] !== '*') {
          italic += text[i];
          i++;
        }
        parts.push(<em key={key++} className="italic text-gray-700">{italic}</em>);
        i++;
        continue;
      }

      // Inline code `text`
      if (text[i] === '`') {
        if (current) {
          parts.push(<span key={key++}>{current}</span>);
          current = '';
        }
        i++;
        let code = '';
        while (i < text.length && text[i] !== '`') {
          code += text[i];
          i++;
        }
        parts.push(
          <code key={key++} className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono text-gray-800">
            {code}
          </code>
        );
        i++;
        continue;
      }

      current += text[i];
      i++;
    }

    if (current) {
      parts.push(<span key={key++}>{current}</span>);
    }

    return parts;
  };

  return <div className="markdown-content">{parseMarkdown(content)}</div>;
};

const StreamingText = ({ text, speed = 15 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    if (!text) return;

    const intervalId = setInterval(() => {
      setDisplayedText((prev) => {
        if (index < text.length) {
          index++;
          return text.slice(0, index);
        }
        clearInterval(intervalId);
        return text;
      });
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return <MarkdownRenderer content={displayedText} />;
};

// --- Main Chatbot Component ---

export function Chatbot() {
  const { language, tLocal } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSpeakingId, setCurrentSpeakingId] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);

  // --- Data Hooks ---
  const { data: themes } = useThemes();
  const { data: consultations } = useConsultations();
  const { data: petitions } = usePetitions();
  const { data: votes } = useVotes();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: conferences } = useConferences();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: assemblies } = useAssemblies();
  const { data: signalements } = useSignalements();
  const { data: youthPolls } = useYouthPolls();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: legislative } = useLegislativeConsultations();

  // --- Gemini API Setup ---
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // --- Scroll to Bottom ---
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  // --- Focus Input on Open ---
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // --- Cleanup Speech on Unmount ---
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // --- Sync State with Speech ---
  useEffect(() => {
    if (!window.speechSynthesis) return;

    if (!isOpen) {
      stopSpeech();
      return;
    }

    if (isMuted) {
      // Pause engine if currently speaking
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
      }
    } else {
      // Resume engine if it was paused by global mute
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    }
  }, [isMuted, isOpen]);

  // --- TTS Helper Functions ---
  const stripMarkdown = (text: string): string => {
    return text
      .replace(/```[\s\S]*?```/g, '')        // Remove code blocks entirely
      .replace(/`(.+?)`/g, '$1')             // Inline code
      .replace(/\*\*\*(.+?)\*\*\*/g, '$1')   // Bold + Italic (***)
      .replace(/\*\*(.+?)\*\*/g, '$1')       // Bold (**)
      .replace(/__(.+?)__/g, '$1')           // Bold (__)
      .replace(/\*(.+?)\*/g, '$1')           // Italic (*)
      .replace(/_(.+?)_/g, '$1')             // Italic (_)
      .replace(/^#{1,6}\s+/gm, '')           // Headings
      .replace(/^[•\-\*]\s+/gm, '')          // List markers at line starts
      .replace(/\[(.+?)\]\(.+?\)/g, '$1')    // Links: keep [text], remove (url)
      .replace(/\n\s*\n/g, '\n')             // Collapse multiple newlines
      .trim();
  };

  const speakMessage = (messageId: number, text: string) => {
    if (!window.speechSynthesis) return;

    // Cancel any ongoing speech to start fresh
    window.speechSynthesis.cancel();

    const cleanText = stripMarkdown(text);
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    speechSynthRef.current = utterance;

    // Set language based on current UI language
    const langMap: Record<string, string> = {
      fr: 'fr-FR',
      de: 'de-DE',
      en: 'en-US',
    };
    utterance.lang = langMap[language] || 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Select natural voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith(utterance.lang));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setCurrentSpeakingId(messageId);
      setMessages(prev => prev.map(m =>
        m.id === messageId ? { ...m, isPlaying: true } : { ...m, isPlaying: false }
      ));
    };

    utterance.onend = () => {
      setCurrentSpeakingId(null);
      setMessages(prev => prev.map(m => ({ ...m, isPlaying: false })));
    };

    utterance.onerror = () => {
      setCurrentSpeakingId(null);
      setMessages(prev => prev.map(m => ({ ...m, isPlaying: false })));
    };

    window.speechSynthesis.speak(utterance);

    // If we are globally muted, immediately pause the engine so it queues up
    if (isMuted) {
      window.speechSynthesis.pause();
    }
  };

  const togglePlayPause = (messageId: number, text: string) => {
    if (currentSpeakingId === messageId && window.speechSynthesis.speaking) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else {
        window.speechSynthesis.pause();
      }
    } else {
      speakMessage(messageId, text);
    }
  };

  const stopSpeech = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setCurrentSpeakingId(null);
      setMessages(prev => prev.map(m => ({ ...m, isPlaying: false })));
    }
  };

  // --- Helper: Build Context for AI ---
  const buildContext = () => {
    const contextParts = [];

    if (themes?.length) {
      contextParts.push(`Themes: ${themes.map(t => tLocal(t.name)).join(', ')}`);
    }
    if (consultations?.length) {
      const active = consultations.filter(c => c.status === 'OPEN').map(c => `${tLocal(c.title)} (ID: ${c.id})`);
      if (active.length) contextParts.push(`Active Consultations: ${active.join('; ')}`);
    }
    if (petitions?.length) {
      const active = petitions.filter(p => p.status === 'OPEN').map(p => `${tLocal(p.title)} (${p.currentSignatures} signatures)`);
      if (active.length) contextParts.push(`Active Petitions: ${active.join('; ')}`);
    }
    if (votes?.length) {
      const active = votes.filter(v => v.status === 'OPEN').map(v => tLocal(v.title));
      if (active.length) contextParts.push(`Active Votes: ${active.join('; ')}`);
    }
    if (youthPolls?.length) {
      const active = youthPolls.filter(y => y.status === 'OPEN').map(y => tLocal(y.title));
      if (active.length) contextParts.push(`Youth Polls: ${active.join('; ')}`);
    }
    contextParts.push(`Total Reports (Signalements): ${signalements?.length || 0}`);

    return contextParts.join('\n');
  };

  // --- Logic: Fallback (Regex) ---
  const generateFallbackResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    const noData = language === 'fr' ? "Aucune donnée disponible." : "No data available.";

    if (lowerQuery.includes('theme') || lowerQuery.includes('topic')) {
      if (!themes?.length) return noData;
      return (language === 'fr' ? "Thèmes disponibles :\n" : "Available themes:\n") + themes.map(t => "• " + tLocal(t.name)).join('\n');
    }
    if (lowerQuery.includes('consultation')) {
      const active = consultations?.filter(c => c.status === 'OPEN') || [];
      if (!active.length) return noData;
      return (language === 'fr' ? "Consultations en cours :\n" : "Open consultations:\n") + active.map(c => "• " + tLocal(c.title)).join('\n');
    }
    // ... Simplified fallback for other cases
    return language === 'fr'
      ? "Je n'ai pas compris. Essayez de demander 'Quelles sont les consultations ?' ou ajoutez une clé API Gemini pour plus d'intelligence."
      : "I didn't understand. Try asking 'What are the consultations?' or add a Gemini API Key for more intelligence.";
  };

  // --- Logic: Gemini Call ---
  const callGemini = async (query: string): Promise<string> => {
    if (!apiKey) return generateFallbackResponse(query);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);

      const functionDeclarations = [
        { name: "get_themes", description: "Get the thematic areas available in the city (Environment, Transport, etc.)." },
        { name: "get_consultations", description: "Retrieve public consultations, including their status, titles, and dates." },
        { name: "get_petitions", description: "Get citizen petitions and their current signature counts." },
        { name: "get_votes", description: "Get information about public votes, referendums, and elections." },
        { name: "get_conferences", description: "Retrieve info on public conferences, topics, and speakers." },
        { name: "get_assemblies", description: "Retrieve info about citizen assemblies and working groups." },
        { name: "get_signalements", description: "Get urban reports (signalements) like cleanliness or safety issues and stats." },
        { name: "get_youth_polls", description: "Retrieve polls and processes specifically focused on youth engagement." },
        { name: "get_legislative_consultations", description: "Get details about legislative texts and laws under consultation." }
      ];

      const model = genAI.getGenerativeModel({
        model: "gemini-3-flash-preview",
        tools: [{ functionDeclarations }],
        systemInstruction: `You are the CiviAgora assistant. Help citizens engage with their local democracy.
          Use Markdown. Be concise and friendly. Language: ${language} (REPLY IN THIS LANGUAGE).
          Use the provided tools to fetch real-time city data if the user query is about consultations, petitions, votes, themes, etc.
          Data objects contain translations in 'fr', 'de', and 'en' - always prioritize the '${language}' version when presenting information.
          If tools return no data, inform the user clearly.`
      });

      const chat = model.startChat();
      let result = await chat.sendMessage(query);
      let response = result.response;

      let functionCalls = response.functionCalls();

      // Execute function calls if requested by the LLM
      while (functionCalls && functionCalls.length > 0) {
        const toolHandlers: Record<string, () => any> = {
          get_themes: () => themes,
          get_consultations: () => consultations,
          get_petitions: () => petitions,
          get_votes: () => votes,
          get_conferences: () => conferences,
          get_assemblies: () => assemblies,
          get_signalements: () => signalements,
          get_youth_polls: () => youthPolls,
          get_legislative_consultations: () => legislative,
        };

        const functionResponses = functionCalls.map(call => ({
          functionResponse: {
            name: call.name,
            response: { content: toolHandlers[call.name]?.() || { error: "Data source not found" } }
          }
        }));

        const finalResult = await chat.sendMessage(functionResponses);
        response = finalResult.response;
        functionCalls = response.functionCalls();
      }

      return response.text();

    } catch (error) {
      console.error("Gemini API Error:", error);
      return generateFallbackResponse(query);
    }
  };

  // --- Interaction Handlers ---

  const handleSend = async (overrideText?: string | React.MouseEvent | React.KeyboardEvent) => {
    const textToSend = typeof overrideText === 'string' ? overrideText : message;
    if (!textToSend || typeof textToSend !== 'string' || !textToSend.trim()) return;

    // Stop any ongoing speech when user sends a new message
    stopSpeech();

    const userMsg: Message = {
      id: Date.now(),
      text: textToSend,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!overrideText) setMessage('');
    setIsTyping(true);

    try {
      // Decide whether to use AI or fallback
      let replyText = "";

      if (apiKey) {
        replyText = await callGemini(textToSend);
      } else {
        // Artificial delay for fallback
        await new Promise(r => setTimeout(r, 600));
        replyText = generateFallbackResponse(textToSend);
      }

      setIsTyping(false);
      const botMsg: Message = {
        id: Date.now() + 1,
        text: replyText,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);

      // Auto-play voice after response is complete (with slight delay)
      if (!isMuted) {
        setTimeout(() => {
          speakMessage(botMsg.id, replyText);
        }, 500);
      }

    } catch (e) {
      setIsTyping(false);
    }
  };

  const handleSuggestion = (text: string) => {
    setMessage(text);
    // Explicitly call handleSend with the text for immediate submission
    handleSend(text).then(() => {
      setMessage(''); // Clear after successful send
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Generate dynamic suggestions if possible
  const getSuggestions = (): Suggestion[] => {
    const base: Suggestion[] = [
      { id: '1', label: { fr: 'Consultations en cours', de: 'Laufende Konsultationen', en: 'Current consultations' }, intent: 'consultation' },
      { id: '2', label: { fr: 'Voir les pétitions', de: 'Petitionen ansehen', en: 'See petitions' }, intent: 'petition' },
    ];

    // If we have specific data, add a specific suggestion
    if (votes && votes.length > 0) {
      base.push({ id: '3', label: { fr: 'Votes récents', de: 'Letzte Abstimmungen', en: 'Recent votes' }, intent: 'vote' });
    } else {
      base.push({ id: '3', label: { fr: 'Espace Jeunesse', de: 'Jugendbereich', en: 'Youth Space' }, intent: 'youth' });
    }
    return base;
  };

  const suggestions = getSuggestions();

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center transition-all duration-300 shadow-xl 
          ${isOpen
            ? 'w-12 h-12 bg-white text-gray-800 rounded-full border border-gray-200 hover:bg-gray-50'
            : 'w-14 h-14 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-2xl hover:scale-105 hover:shadow-2xl hover:from-indigo-500 hover:to-indigo-600'
          }`}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Sparkles className="w-6 h-6 animate-pulse" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-[5.5rem] right-4 md:right-6 z-40 flex flex-col w-[calc(100vw-2rem)] md:w-[420px] h-[600px] max-h-[80vh] 
                        bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden font-sans animate-in slide-in-from-bottom-5 fade-in duration-300 origin-bottom-right">

          {/* Header */}
          <div className="flex-none flex items-center justify-between px-6 py-4 border-b border-gray-50 bg-white/80 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-50 to-indigo-50 flex items-center justify-center border border-indigo-100">
                <Sparkles className="w-4 h-4 text-indigo-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 tracking-tight">
                  {language === 'fr' ? 'Assistant CiviAgora' : language === 'de' ? 'CiviAgora Assistent' : 'CiviAgora Assistant'}
                </h3>
                <div className="flex items-center gap-2">
                  <p className="text-[10px] uppercase tracking-wider text-green-600 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Online
                  </p>
                  {!apiKey && (
                    <span className="text-[10px] text-orange-500 flex items-center gap-1" title="Missing API Key">
                      <AlertCircle className="w-3 h-3" />
                      Local Mode
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-gray-400 hover:text-indigo-500 transition-colors p-1"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              {messages.length > 0 && (
                <button
                  onClick={() => setMessages([])}
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {language === 'fr' ? 'Effacer' : 'Clear'}
                </button>
              )}
            </div>
          </div>

          {/* Chat Surface */}
          <div className="flex-1 overflow-y-auto px-6 py-4 bg-white scroll-smooth relative">

            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-0 animate-in fade-in duration-700 slide-in-from-bottom-4 fill-mode-forwards delay-100">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-2 rotate-3 hover:rotate-6 transition-transform duration-500">
                  <Compass className="w-8 h-8 text-blue-500" />
                </div>
                <div className="max-w-[280px]">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {language === 'fr' ? 'Bonjour !' : language === 'de' ? 'Hallo!' : 'Hello!'}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {apiKey
                      ? (language === 'fr' ? 'Je suis connecté aux données de la ville. Posez-moi une question !' : 'I am connected to city data. Ask me a question!')
                      : (language === 'fr' ? 'Mode hors-ligne limité. Ajoutez une clé API Gemini pour une expérience complète.' : 'Limited offline mode. Add a Gemini API Key for full experience.')
                    }
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2 w-full max-w-[260px]">
                  {suggestions.map(s => (
                    <button
                      key={s.id}
                      onClick={() => handleSuggestion(tLocal(s.label))}
                      className="px-4 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-xl text-xs font-medium text-gray-600 transition-all text-left flex items-center justify-between group"
                    >
                      {tLocal(s.label)}
                      <ArrowUp className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity rotate-45" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-8 pb-4">
              {messages.map((msg, idx) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.isUser ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                >
                  <div className="flex items-center gap-2 mb-1 px-1">
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">
                      {msg.isUser ? 'You' : 'AI'}
                    </span>
                    {!msg.isUser && (
                      <button
                        onClick={() => togglePlayPause(msg.id, msg.text)}
                        className="text-gray-300 hover:text-indigo-500 transition-colors p-0.5"
                      >
                        {msg.isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      </button>
                    )}
                  </div>

                  <div className={`max-w-[85%] text-sm md:text-[15px] leading-relaxed relative 
                    ${msg.isUser
                      ? 'bg-[#F0F4F8] text-gray-800 px-5 py-3.5 rounded-2xl rounded-tr-sm font-medium'
                      : 'text-gray-700 px-1 font-normal'
                    }`}
                  >
                    {msg.isUser ? msg.text : (
                      (idx === messages.length - 1 && !isTyping) || (idx === messages.length - 2 && isTyping)
                        ? <StreamingText text={msg.text} />
                        : <MarkdownRenderer content={msg.text} />
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex flex-col items-start animate-in fade-in duration-200">
                  <span className="text-[10px] font-bold text-gray-300 mb-1 px-1 uppercase tracking-wider">AI</span>
                  <div className="flex items-center gap-1 h-6 px-1">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          </div>

          <div className="flex-none p-4 md:p-5 bg-white">
            <div className="relative flex items-center bg-gray-50 hover:bg-white focus-within:bg-white rounded-[2rem] border border-gray-200 focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-100 transition-all duration-200">
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={language === 'fr' ? 'Demandez quelque chose...' : 'Ask me anything...'}
                className="flex-1 bg-transparent border-none text-gray-800 placeholder-gray-400 text-sm px-6 py-4 focus:ring-0"
              />
              <button
                onClick={() => handleSend()}
                disabled={!message.trim()}
                className="absolute right-2 p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 rounded-full text-white transition-all duration-200 transform active:scale-95 flex items-center justify-center shadow-md disabled:shadow-none"
              >
                {message.trim() ? <ArrowUp className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
              </button>
            </div>
            <div className="text-center mt-2 flex items-center justify-center gap-2">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <p className="text-[9px] text-gray-400">
                Powered by Gemini AI
              </p>
            </div>
          </div>
        </div >
      )
      }
    </>
  );
}
