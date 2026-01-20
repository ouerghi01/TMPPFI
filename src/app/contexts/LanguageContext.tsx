import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { LocalizedString } from '../types';

export type Language = 'fr' | 'de' | 'en';

interface Translations {
  [key: string]: {
    fr: string;
    de: string;
    en: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': { fr: 'Accueil', de: 'Startseite', en: 'Home' },
  'nav.consultations': { fr: 'Concertations', de: 'Konsultationen', en: 'Consultations' },
  'nav.legislativeConsultations': { fr: 'Consultations Législatives', de: 'Gesetzgebungsberatungen', en: 'Legislative Consultations' },
  'nav.assemblies': { fr: 'Assemblées', de: 'Versammlungen', en: 'Assemblies' },
  'nav.petitions': { fr: 'Pétitions', de: 'Petitionen', en: 'Petitions' },
  'nav.conferences': { fr: 'Conférences', de: 'Konferenzen', en: 'Conferences' },
  'nav.votes': { fr: 'Votes & Référendum', de: 'Abstimmungen & Referendum', en: 'Votes & Referendum' },
  'nav.themes': { fr: 'Thèmes', de: 'Themen', en: 'Themes' },
  'nav.resources': { fr: 'Ressources', de: 'Ressourcen', en: 'Resources' },
  'nav.help': { fr: 'Aide', de: 'Hilfe', en: 'Help' },
  'nav.profile': { fr: 'Mon Profil', de: 'Mein Profil', en: 'My Profile' },
  
  // Footer
  'footer.platform': { fr: 'Plateforme', de: 'Plattform', en: 'Platform' },
  'footer.resources': { fr: 'Ressources', de: 'Ressourcen', en: 'Resources' },
  'footer.legal': { fr: 'Mentions légales', de: 'Rechtliches', en: 'Legal' },
  'footer.description': { fr: 'Plateforme de démocratie participative pour les collectivités et leurs citoyens. Ensemble, construisons l\'avenir de nos territoires.', de: 'Plattform für partizipative Demokratie für Gemeinden und ihre Bürger. Gemeinsam gestalten wir die Zukunft unserer Regionen.', en: 'Participatory democracy platform for communities and their citizens. Together, let\'s build the future of our territories.' },
  'footer.howItWorks': { fr: 'Comment ça marche', de: 'Wie es funktioniert', en: 'How it works' },
  'footer.faq': { fr: 'FAQ', de: 'FAQ', en: 'FAQ' },
  'footer.guides': { fr: 'Guides', de: 'Leitfäden', en: 'Guides' },
  'footer.support': { fr: 'Support', de: 'Unterstützung', en: 'Support' },
  'footer.ivrAccess': { fr: 'Accès téléphonique (IVR)', de: 'Telefonzugang (IVR)', en: 'Phone access (IVR)' },
  'footer.privacy': { fr: 'Confidentialité', de: 'Datenschutz', en: 'Privacy' },
  'footer.terms': { fr: 'Conditions d\'utilisation', de: 'Nutzungsbedingungen', en: 'Terms of use' },
  'footer.accessibility': { fr: 'Accessibilité', de: 'Zugänglichkeit', en: 'Accessibility' },
  'footer.cookies': { fr: 'Cookies', de: 'Cookies', en: 'Cookies' },
  'footer.newsletter': { fr: 'Newsletter', de: 'Newsletter', en: 'Newsletter' },
  'footer.emailPlaceholder': { fr: 'Votre email', de: 'Ihre E-Mail', en: 'Your email' },
  'footer.subscribe': { fr: 'S\'abonner', de: 'Abonnieren', en: 'Subscribe' },
  'footer.madeWith': { fr: 'Créé avec', de: 'Erstellt mit', en: 'Made with' },
  'footer.forCitizens': { fr: 'pour les citoyens', de: 'für die Bürger', en: 'for citizens' },
  'footer.rightsReserved': { fr: 'Tous droits réservés', de: 'Alle Rechte vorbehalten', en: 'All rights reserved' },
  'footer.secureData': { fr: 'Données sécurisées', de: 'Sichere Daten', en: 'Secure data' },
  'footer.gdprCompliant': { fr: 'Conforme RGPD', de: 'DSGVO-konform', en: 'GDPR compliant' },
  'footer.support247': { fr: 'Support 24/7', de: 'Support 24/7', en: '24/7 Support' },
  'footer.backOffice': { fr: 'Back-office', de: 'Back-Office', en: 'Back-office' },
  'footer.saasBackOffice': { fr: 'Back-office SaaS', de: 'SaaS Back-Office', en: 'SaaS Back-office' },
  
  // Common
  'common.filter': { fr: 'Filtrer', de: 'Filtern', en: 'Filter' },
  'common.search': { fr: 'Rechercher', de: 'Suchen', en: 'Search' },
  'common.all': { fr: 'Tous', de: 'Alle', en: 'All' },
  'common.active': { fr: 'Actif', de: 'Aktiv', en: 'Active' },
  'common.closed': { fr: 'Fermé', de: 'Geschlossen', en: 'Closed' },
  'common.upcoming': { fr: 'À venir', de: 'Kommend', en: 'Upcoming' },
  'common.participate': { fr: 'Participer', de: 'Teilnehmen', en: 'Participate' },
  'common.viewDetails': { fr: 'Voir les détails', de: 'Details ansehen', en: 'View details' },
  'common.signatures': { fr: 'signatures', de: 'Unterschriften', en: 'signatures' },
  'common.participants': { fr: 'participants', de: 'Teilnehmer', en: 'participants' },
  'common.save': { fr: 'Enregistrer', de: 'Speichern', en: 'Save' },
  'common.cancel': { fr: 'Annuler', de: 'Abbrechen', en: 'Cancel' },
  'common.edit': { fr: 'Modifier', de: 'Bearbeiten', en: 'Edit' },
  
  // Profile
  'profile.title': { fr: 'Mon Profil', de: 'Mein Profil', en: 'My Profile' },
  'profile.personalInfo': { fr: 'Informations personnelles', de: 'Persönliche Informationen', en: 'Personal information' },
  'profile.preferences': { fr: 'Préférences', de: 'Einstellungen', en: 'Preferences' },
  'profile.history': { fr: 'Historique', de: 'Verlauf', en: 'History' },
  'profile.firstName': { fr: 'Prénom', de: 'Vorname', en: 'First name' },
  'profile.lastName': { fr: 'Nom', de: 'Nachname', en: 'Last name' },
  'profile.email': { fr: 'Email', de: 'E-Mail', en: 'Email' },
  'profile.phone': { fr: 'Téléphone', de: 'Telefon', en: 'Phone' },
  'profile.address': { fr: 'Adresse', de: 'Adresse', en: 'Address' },
  'profile.city': { fr: 'Ville', de: 'Stadt', en: 'City' },
  'profile.postalCode': { fr: 'Code postal', de: 'Postleitzahl', en: 'Postal code' },
  'profile.bio': { fr: 'Biographie', de: 'Biografie', en: 'Biography' },
  'profile.language': { fr: 'Langue préférée', de: 'Bevorzugte Sprache', en: 'Preferred language' },
  'profile.notifications': { fr: 'Notifications', de: 'Benachrichtigungen', en: 'Notifications' },
  'profile.emailNotifications': { fr: 'Notifications par email', de: 'E-Mail-Benachrichtigungen', en: 'Email notifications' },
  'profile.smsNotifications': { fr: 'Notifications par SMS', de: 'SMS-Benachrichtigungen', en: 'SMS notifications' },
  'profile.favoriteThemes': { fr: 'Thèmes favoris', de: 'Lieblingsthemen', en: 'Favorite themes' },
  'profile.participationHistory': { fr: 'Historique de participation', de: 'Teilnahmeverlauf', en: 'Participation history' },
  'profile.updated': { fr: 'Profil mis à jour avec succès', de: 'Profil erfolgreich aktualisiert', en: 'Profile updated successfully' },
  'profile.activeCitizen': { fr: 'Citoyen actif', de: 'Aktiver Bürger', en: 'Active citizen' },
  'profile.participations': { fr: 'participations', de: 'Teilnahmen', en: 'participations' },
  
  // Themes
  'theme.environment': { fr: 'Environnement & climat', de: 'Umwelt & Klima', en: 'Environment & climate' },
  'theme.urban': { fr: 'Urbanisme & logement', de: 'Städtebau & Wohnen', en: 'Urban planning & housing' },
  'theme.mobility': { fr: 'Mobilité & transport', de: 'Mobilität & Verkehr', en: 'Mobility & transport' },
  'theme.education': { fr: 'Éducation & jeunesse', de: 'Bildung & Jugend', en: 'Education & youth' },
  'theme.health': { fr: 'Santé', de: 'Gesundheit', en: 'Health' },
  'theme.culture': { fr: 'Culture', de: 'Kultur', en: 'Culture' },
  'theme.governance': { fr: 'Gouvernance locale', de: 'Lokale Governance', en: 'Local governance' },
  'theme.economy': { fr: 'Économie & emploi', de: 'Wirtschaft & Beschäftigung', en: 'Economy & employment' },
  
  // Dashboard
  'dashboard.welcome': { fr: 'Bienvenue sur la plateforme', de: 'Willkommen auf der Plattform', en: 'Welcome to the platform' },
  'dashboard.myParticipations': { fr: 'Mes participations', de: 'Meine Teilnahmen', en: 'My participations' },
  'dashboard.activeProcesses': { fr: 'Processus en cours', de: 'Laufende Prozesse', en: 'Active processes' },
  
  // Status
  'status.open': { fr: 'Ouvert', de: 'Offen', en: 'Open' },
  'status.closed': { fr: 'Fermé', de: 'Geschlossen', en: 'Closed' },
  'status.pending': { fr: 'En attente', de: 'Ausstehend', en: 'Pending' },
  'status.accepted': { fr: 'Accepté', de: 'Akzeptiert', en: 'Accepted' },
  'status.rejected': { fr: 'Rejeté', de: 'Abgelehnt', en: 'Rejected' },
  'status.inProgress': { fr: 'En cours', de: 'In Bearbeitung', en: 'In progress' },
  'status.completed': { fr: 'Terminé', de: 'Abgeschlossen', en: 'Completed' },
  
  // Resources Pages
  'resources.title': { fr: 'Ressources', de: 'Ressourcen', en: 'Resources' },
  'resources.subtitle': { fr: 'Tout ce dont vous avez besoin pour participer activement', de: 'Alles, was Sie für eine aktive Teilnahme benötigen', en: 'Everything you need to participate actively' },
  'resources.overview': { fr: 'Vue d\'ensemble des ressources', de: 'Ressourcenübersicht', en: 'Resources overview' },
  
  // How it works
  'howItWorks.title': { fr: 'Comment ça marche', de: 'Wie es funktioniert', en: 'How it works' },
  'howItWorks.subtitle': { fr: 'Découvrez comment participer à la démocratie locale', de: 'Erfahren Sie, wie Sie an der lokalen Demokratie teilnehmen können', en: 'Discover how to participate in local democracy' },
  'howItWorks.step1Title': { fr: 'Créez votre compte', de: 'Erstellen Sie Ihr Konto', en: 'Create your account' },
  'howItWorks.step1Desc': { fr: 'Inscrivez-vous gratuitement en quelques minutes pour accéder à tous les outils de participation', de: 'Melden Sie sich kostenlos in wenigen Minuten an, um auf alle Beteiligungsinstrumente zuzugreifen', en: 'Sign up for free in a few minutes to access all participation tools' },
  'howItWorks.step2Title': { fr: 'Explorez les processus', de: 'Entdecken Sie die Prozesse', en: 'Explore processes' },
  'howItWorks.step2Desc': { fr: 'Découvrez les consultations, assemblées, pétitions et votes en cours dans votre collectivité', de: 'Entdecken Sie laufende Konsultationen, Versammlungen, Petitionen und Abstimmungen in Ihrer Gemeinde', en: 'Discover ongoing consultations, assemblies, petitions and votes in your community' },
  'howItWorks.step3Title': { fr: 'Participez activement', de: 'Aktiv teilnehmen', en: 'Participate actively' },
  'howItWorks.step3Desc': { fr: 'Exprimez vos idées, votez, signez des pétitions et contribuez aux débats', de: 'Äußern Sie Ihre Ideen, stimmen Sie ab, unterzeichnen Sie Petitionen und tragen Sie zu Debatten bei', en: 'Express your ideas, vote, sign petitions and contribute to debates' },
  'howItWorks.step4Title': { fr: 'Suivez l\'impact', de: 'Folgen Sie der Wirkung', en: 'Track the impact' },
  'howItWorks.step4Desc': { fr: 'Recevez des notifications et consultez les résultats des processus participatifs', de: 'Erhalten Sie Benachrichtigungen und sehen Sie die Ergebnisse der partizipativen Prozesse', en: 'Receive notifications and view the results of participatory processes' },
  
  // FAQ
  'faq.title': { fr: 'Questions fréquentes', de: 'Häufig gestellte Fragen', en: 'Frequently Asked Questions' },
  'faq.subtitle': { fr: 'Trouvez des réponses à vos questions', de: 'Finden Sie Antworten auf Ihre Fragen', en: 'Find answers to your questions' },
  'faq.general': { fr: 'Questions générales', de: 'Allgemeine Fragen', en: 'General questions' },
  'faq.participation': { fr: 'Participation', de: 'Teilnahme', en: 'Participation' },
  'faq.technical': { fr: 'Questions techniques', de: 'Technische Fragen', en: 'Technical questions' },
  'faq.security': { fr: 'Sécurité & confidentialité', de: 'Sicherheit & Datenschutz', en: 'Security & privacy' },
  
  // Guides
  'guides.title': { fr: 'Guides pratiques', de: 'Praktische Leitfäden', en: 'Practical guides' },
  'guides.subtitle': { fr: 'Apprenez à utiliser la plateforme efficacement', de: 'Lernen Sie, die Plattform effektiv zu nutzen', en: 'Learn how to use the platform effectively' },
  'guides.getting-started': { fr: 'Guide de démarrage', de: 'Einstiegsanleitung', en: 'Getting started guide' },
  'guides.consultations': { fr: 'Guide des concertations', de: 'Konsultationsleitfaden', en: 'Consultations guide' },
  'guides.petitions': { fr: 'Guide des pétitions', de: 'Petitionsleitfaden', en: 'Petitions guide' },
  'guides.voting': { fr: 'Guide du vote', de: 'Abstimmungsleitfaden', en: 'Voting guide' },
  
  // Support
  'support.title': { fr: 'Support & assistance', de: 'Support & Unterstützung', en: 'Support & assistance' },
  'support.subtitle': { fr: 'Nous sommes là pour vous aider', de: 'Wir sind für Sie da', en: 'We are here to help you' },
  'support.contactUs': { fr: 'Contactez-nous', de: 'Kontaktieren Sie uns', en: 'Contact us' },
  'support.email': { fr: 'Par email', de: 'Per E-Mail', en: 'By email' },
  'support.phone': { fr: 'Par téléphone', de: 'Per Telefon', en: 'By phone' },
  'support.chat': { fr: 'Chat en direct', de: 'Live-Chat', en: 'Live chat' },
  'support.ticketSystem': { fr: 'Système de tickets', de: 'Ticketsystem', en: 'Ticket system' },
  'support.openTicket': { fr: 'Ouvrir un ticket', de: 'Ticket öffnen', en: 'Open a ticket' },
  'support.viewTickets': { fr: 'Voir mes tickets', de: 'Meine Tickets anzeigen', en: 'View my tickets' },
  
  // Legal Notice
  'legal.title': { fr: 'Mentions légales', de: 'Impressum', en: 'Legal Notice' },
  'legal.subtitle': { fr: 'Informations légales et éditoriales', de: 'Rechtliche und redaktionelle Informationen', en: 'Legal and editorial information' },
  'legal.publisher': { fr: 'Éditeur', de: 'Herausgeber', en: 'Publisher' },
  'legal.hosting': { fr: 'Hébergement', de: 'Hosting', en: 'Hosting' },
  'legal.contact': { fr: 'Contact', de: 'Kontakt', en: 'Contact' },
  'legal.directorship': { fr: 'Direction de la publication', de: 'Redaktionsleitung', en: 'Editorial direction' },
  'legal.intellectual': { fr: 'Propriété intellectuelle', de: 'Geistiges Eigentum', en: 'Intellectual property' },
  'legal.licenses': { fr: 'Licences et crédits', de: 'Lizenzen und Credits', en: 'Licenses and credits' },
  
  // Privacy Policy
  'privacy.title': { fr: 'Politique de confidentialité', de: 'Datenschutzerklärung', en: 'Privacy Policy' },
  'privacy.subtitle': { fr: 'Protection de vos données personnelles', de: 'Schutz Ihrer personenbezogenen Daten', en: 'Protection of your personal data' },
  'privacy.intro': { fr: 'Introduction', de: 'Einführung', en: 'Introduction' },
  'privacy.dataCollected': { fr: 'Données collectées', de: 'Gesammelte Daten', en: 'Data collected' },
  'privacy.dataUsage': { fr: 'Utilisation des données', de: 'Datennutzung', en: 'Data usage' },
  'privacy.dataStorage': { fr: 'Stockage des données', de: 'Datenspeicherung', en: 'Data storage' },
  'privacy.rights': { fr: 'Vos droits', de: 'Ihre Rechte', en: 'Your rights' },
  'privacy.security': { fr: 'Sécurité', de: 'Sicherheit', en: 'Security' },
  'privacy.contact': { fr: 'Contact DPO', de: 'Kontakt DSB', en: 'DPO Contact' },
  
  // Terms of Service
  'terms.title': { fr: 'Conditions d\'utilisation', de: 'Nutzungsbedingungen', en: 'Terms of Service' },
  'terms.subtitle': { fr: 'Règles d\'utilisation de la plateforme', de: 'Nutzungsregeln der Plattform', en: 'Platform usage rules' },
  'terms.acceptance': { fr: 'Acceptation des conditions', de: 'Akzeptanz der Bedingungen', en: 'Acceptance of terms' },
  'terms.userAccount': { fr: 'Compte utilisateur', de: 'Benutzerkonto', en: 'User account' },
  'terms.serviceDescription': { fr: 'Description des services', de: 'Dienstleistungsbeschreibung', en: 'Service description' },
  'terms.userObligations': { fr: 'Obligations de l\'utilisateur', de: 'Pflichten des Nutzers', en: 'User obligations' },
  'terms.prohibitedUse': { fr: 'Usages interdits', de: 'Verbotene Nutzung', en: 'Prohibited use' },
  'terms.liability': { fr: 'Responsabilité', de: 'Haftung', en: 'Liability' },
  'terms.modification': { fr: 'Modification des conditions', de: 'Änderung der Bedingungen', en: 'Modification of terms' },
  
  // Accessibility
  'accessibility.title': { fr: 'Accessibilité', de: 'Zugänglichkeit', en: 'Accessibility' },
  'accessibility.subtitle': { fr: 'Notre engagement pour une plateforme accessible à tous', de: 'Unser Engagement für eine für alle zugängliche Plattform', en: 'Our commitment to an accessible platform for all' },
  'accessibility.commitment': { fr: 'Notre engagement', de: 'Unser Engagement', en: 'Our commitment' },
  'accessibility.standards': { fr: 'Normes et conformité', de: 'Standards und Konformität', en: 'Standards and compliance' },
  'accessibility.features': { fr: 'Fonctionnalités d\'accessibilité', de: 'Barrierefreiheitsfunktionen', en: 'Accessibility features' },
  'accessibility.keyboard': { fr: 'Navigation au clavier', de: 'Tastaturnavigation', en: 'Keyboard navigation' },
  'accessibility.screenReader': { fr: 'Compatibilité lecteurs d\'écran', de: 'Bildschirmleser-Kompatibilität', en: 'Screen reader compatibility' },
  'accessibility.contrast': { fr: 'Contraste et lisibilité', de: 'Kontrast und Lesbarkeit', en: 'Contrast and readability' },
  'accessibility.feedback': { fr: 'Signaler un problème', de: 'Problem melden', en: 'Report an issue' },
  
  // Cookies
  'cookies.title': { fr: 'Politique des cookies', de: 'Cookie-Richtlinie', en: 'Cookie Policy' },
  'cookies.subtitle': { fr: 'Comment nous utilisons les cookies', de: 'Wie wir Cookies verwenden', en: 'How we use cookies' },
  'cookies.whatAre': { fr: 'Qu\'est-ce qu\'un cookie ?', de: 'Was ist ein Cookie?', en: 'What is a cookie?' },
  'cookies.types': { fr: 'Types de cookies utilisés', de: 'Verwendete Cookie-Typen', en: 'Types of cookies used' },
  'cookies.essential': { fr: 'Cookies essentiels', de: 'Essentielle Cookies', en: 'Essential cookies' },
  'cookies.functional': { fr: 'Cookies fonctionnels', de: 'Funktionale Cookies', en: 'Functional cookies' },
  'cookies.analytics': { fr: 'Cookies analytiques', de: 'Analyse-Cookies', en: 'Analytics cookies' },
  'cookies.preferences': { fr: 'Gestion des préférences', de: 'Einstellungsverwaltung', en: 'Preferences management' },
  'cookies.manage': { fr: 'Gérer les cookies', de: 'Cookies verwalten', en: 'Manage cookies' },
  
  // Newsletter
  'newsletter.title': { fr: 'Newsletter', de: 'Newsletter', en: 'Newsletter' },
  'newsletter.subtitle': { fr: 'Restez informé de l\'actualité démocratique', de: 'Bleiben Sie über demokratische Neuigkeiten informiert', en: 'Stay informed about democratic news' },
  'newsletter.benefits': { fr: 'Avantages de l\'abonnement', de: 'Vorteile des Abonnements', en: 'Subscription benefits' },
  'newsletter.frequency': { fr: 'Fréquence d\'envoi', de: 'Versandfrequenz', en: 'Sending frequency' },
  'newsletter.content': { fr: 'Contenu de la newsletter', de: 'Newsletter-Inhalt', en: 'Newsletter content' },
  'newsletter.subscribe': { fr: 'S\'abonner à la newsletter', de: 'Newsletter abonnieren', en: 'Subscribe to newsletter' },
  'newsletter.unsubscribe': { fr: 'Se désabonner', de: 'Abmelden', en: 'Unsubscribe' },
  'newsletter.preferences': { fr: 'Préférences d\'abonnement', de: 'Abonnementeinstellungen', en: 'Subscription preferences' },
  'newsletter.privacy': { fr: 'Confidentialité des données', de: 'Datenschutz', en: 'Data privacy' },
  'newsletter.success': { fr: 'Abonnement confirmé !', de: 'Abonnement bestätigt!', en: 'Subscription confirmed!' },
  
  // AI Assistant
  'ai.openAssistant': { fr: 'Ouvrir l\'assistant', de: 'Assistent öffnen', en: 'Open assistant' },
  'ai.closeAssistant': { fr: 'Fermer l\'assistant', de: 'Assistent schließen', en: 'Close assistant' },
  'ai.askQuestion': { fr: 'Posez votre question...', de: 'Stellen Sie Ihre Frage...', en: 'Ask your question...' },
  'ai.welcome': { fr: 'Bonjour ! Comment puis-je vous aider ?', de: 'Hallo! Wie kann ich Ihnen helfen?', en: 'Hello! How can I help you?' },
  'ai.subtitle': { fr: 'Posez-moi vos questions sur la démocratie participative', de: 'Stellen Sie mir Fragen zur partizipativen Demokratie', en: 'Ask me questions about participatory democracy' },
  'ai.frequentQuestions': { fr: 'Questions fréquentes', de: 'Häufige Fragen', en: 'Frequent questions' },
  'ai.recommendations': { fr: 'Recommandations pour vous', de: 'Empfehlungen für Sie', en: 'Recommendations for you' },
  'ai.disclaimer': { fr: 'L\'assistant peut faire des erreurs. Vérifiez les informations importantes.', de: 'Der Assistent kann Fehler machen. Überprüfen Sie wichtige Informationen.', en: 'The assistant can make mistakes. Check important information.' },
  'ai.thinking': { fr: 'Réflexion en cours...', de: 'Denkt nach...', en: 'Thinking...' },
  'ai.suggestions': { fr: 'Suggestions', de: 'Vorschläge', en: 'Suggestions' },
  'ai.relatedContent': { fr: 'Contenu connexe', de: 'Verwandter Inhalt', en: 'Related content' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  tLocal: (localizedString: LocalizedString | string | undefined) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const tLocal = (localizedString: LocalizedString | string | undefined): string => {
    if (!localizedString) return '';
    if (typeof localizedString === 'string') return localizedString;
    return localizedString[language] || localizedString.fr || localizedString.en || localizedString.de || '';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tLocal }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}