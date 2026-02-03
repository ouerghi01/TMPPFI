/**
 * CiviAgora Platform - Realistic Mock API Data
 * 
 * This file contains production-ready mock data that exactly matches
 * the TypeScript DTOs defined in /src/app/types/index.ts
 * 
 * All data represents realistic API responses suitable for development,
 * testing, and demonstration purposes.
 */

import type {
  UserDTO,
  ThemeDTO,
  ConsultationDTO,
  ConsultationSummaryDTO,
  PetitionDTO,
  PetitionSummaryDTO,
  VoteDTO,
  VoteSummaryDTO,
  AssemblyDTO,
  AssemblySummaryDTO,
  ConferenceDTO,
  ConferenceSummaryDTO,
  SpeakerDTO,
  NotificationDTO,
  ActivityDTO,
  DashboardStatsDTO,
  ParticipationHistoryDTO,
  LocalizedString,
  LegislativeConsultationDTO,
  ModerationItemDTO,
  ModerationStatsDTO,
  ModerationRuleDTO,
  UserReportDTO,
  LegislativeConsultationSummaryDTO,
  ArticleDTO,
  ArticleAnnotationDTO,
  LegislativeSummaryDTO,
  YouthPollDTO,
  YouthSpaceStatsDTO,
} from '../types';

// Import moderation mock data
import {
  mockModerationItems,
  mockModerationStats,
  mockModerationRules,
  mockUserReports
} from './mockModerationData';

// Re-export moderation data for direct imports
export {
  mockModerationItems,
  mockModerationStats,
  mockModerationRules,
  mockUserReports
};

// ==================== Mock Users ====================

export const mockUsers: UserDTO[] = [
  {
    id: 'usr_001',
    email: 'marie.dubois@email.com',
    firstName: 'Marie',
    lastName: 'Dubois',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    role: 'citizen',
    status: 'active',
    emailVerified: true,
    phoneNumber: '+33 6 12 34 56 78',
    address: {
      street: '15 rue de la République',
      city: 'Lyon',
      postalCode: '69001',
      country: 'France',
      region: 'Auvergne-Rhône-Alpes',
    },
    preferences: {
      language: 'fr',
      theme: 'light',
      emailNotifications: true,
      pushNotifications: true,
      favoriteThemes: ['env', 'urb', 'edu'],
      newsDigest: 'weekly',
    },
    stats: {
      totalParticipations: 47,
      petitionsSigned: 12,
      votesParticipated: 8,
      consultationsAttended: 15,
      commentsPosted: 23,
      proposalsSubmitted: 5,
    },
    createdAt: '2023-03-15T10:30:00Z',
    updatedAt: '2026-01-09T14:22:00Z',
    lastLoginAt: '2026-01-09T09:15:00Z',
  },
  {
    id: 'usr_002',
    email: 'thomas.mueller@email.com',
    firstName: 'Thomas',
    lastName: 'Müller',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    role: 'citizen',
    status: 'active',
    emailVerified: true,
    address: {
      city: 'Zürich',
      postalCode: '8001',
      country: 'Switzerland',
    },
    preferences: {
      language: 'de',
      theme: 'system',
      emailNotifications: true,
      pushNotifications: false,
      favoriteThemes: ['eco', 'soc'],
      newsDigest: 'monthly',
    },
    stats: {
      totalParticipations: 23,
      petitionsSigned: 8,
      votesParticipated: 5,
      consultationsAttended: 7,
      commentsPosted: 11,
      proposalsSubmitted: 2,
    },
    createdAt: '2024-06-20T08:00:00Z',
    updatedAt: '2026-01-08T16:45:00Z',
    lastLoginAt: '2026-01-08T11:30:00Z',
  },
];

export const mockCurrentUser: UserDTO = mockUsers[0];

// ==================== Mock Themes ====================

export const mockThemes: ThemeDTO[] = [
  {
    id: 'env',
    slug: 'environnement',
    name: {
      fr: 'Environnement & Climat',
      de: 'Umwelt & Klima',
      en: 'Environment & Climate',
    },
    description: {
      fr: 'Transition écologique, énergies renouvelables, biodiversité',
      de: 'Ökologischer Wandel, erneuerbare Energien, Biodiversität',
      en: 'Ecological transition, renewable energy, biodiversity',
    },
    icon: '🌱',
    color: 'text-green-600',
    colorHex: '#16a34a',
    active: true,
    displayOrder: 1,
    stats: {
      consultations: 45,
      petitions: 28,
      votes: 12,
      assemblies: 3,
      participants: 12450,
    },
    createdAt: '2023-01-10T00:00:00Z',
    updatedAt: '2026-01-05T00:00:00Z',
  },
  {
    id: 'urb',
    slug: 'urbanisme',
    name: {
      fr: 'Urbanisme & Mobilité',
      de: 'Stadtplanung & Mobilität',
      en: 'Urban Planning & Mobility',
    },
    description: {
      fr: 'Aménagement urbain, transports, espaces publics',
      de: 'Stadtentwicklung, Verkehr, öffentliche Räume',
      en: 'Urban development, transportation, public spaces',
    },
    icon: '🏙️',
    color: 'text-blue-600',
    colorHex: '#2563eb',
    active: true,
    displayOrder: 2,
    stats: {
      consultations: 38,
      petitions: 22,
      votes: 9,
      assemblies: 2,
      participants: 9830,
    },
    createdAt: '2023-01-10T00:00:00Z',
    updatedAt: '2026-01-05T00:00:00Z',
  },
  {
    id: 'eco',
    slug: 'economie',
    name: {
      fr: 'Économie & Emploi',
      de: 'Wirtschaft & Beschäftigung',
      en: 'Economy & Employment',
    },
    description: {
      fr: 'Développement économique, commerce local, formation',
      de: 'Wirtschaftsentwicklung, lokaler Handel, Ausbildung',
      en: 'Economic development, local business, training',
    },
    icon: '💼',
    color: 'text-purple-600',
    colorHex: '#9333ea',
    active: true,
    displayOrder: 3,
    stats: {
      consultations: 32,
      petitions: 18,
      votes: 7,
      assemblies: 2,
      participants: 7650,
    },
    createdAt: '2023-01-10T00:00:00Z',
    updatedAt: '2026-01-05T00:00:00Z',
  },
  {
    id: 'edu',
    slug: 'education',
    name: {
      fr: 'Éducation & Jeunesse',
      de: 'Bildung & Jugend',
      en: 'Education & Youth',
    },
    description: {
      fr: 'Écoles, activités jeunesse, éducation populaire',
      de: 'Schulen, Jugendaktivitäten, Volksbildung',
      en: 'Schools, youth activities, popular education',
    },
    icon: '📚',
    color: 'text-orange-600',
    colorHex: '#ea580c',
    active: true,
    displayOrder: 4,
    stats: {
      consultations: 29,
      petitions: 15,
      votes: 6,
      assemblies: 1,
      participants: 6420,
    },
    createdAt: '2023-01-10T00:00:00Z',
    updatedAt: '2026-01-05T00:00:00Z',
  },
  {
    id: 'soc',
    slug: 'social',
    name: {
      fr: 'Social & Santé',
      de: 'Soziales & Gesundheit',
      en: 'Social & Health',
    },
    description: {
      fr: 'Services sociaux, santé publique, solidarité',
      de: 'Sozialdienste, öffentliche Gesundheit, Solidarität',
      en: 'Social services, public health, solidarity',
    },
    icon: '🏥',
    color: 'text-red-600',
    colorHex: '#dc2626',
    active: true,
    displayOrder: 5,
    stats: {
      consultations: 26,
      petitions: 20,
      votes: 5,
      assemblies: 2,
      participants: 8920,
    },
    createdAt: '2023-01-10T00:00:00Z',
    updatedAt: '2026-01-05T00:00:00Z',
  },
  {
    id: 'cul',
    slug: 'culture',
    name: {
      fr: 'Culture & Patrimoine',
      de: 'Kultur & Erbe',
      en: 'Culture & Heritage',
    },
    description: {
      fr: 'Événements culturels, patrimoine, bibliothèques',
      de: 'Kulturveranstaltungen, Kulturerbe, Bibliotheken',
      en: 'Cultural events, heritage, libraries',
    },
    icon: '🎭',
    color: 'text-pink-600',
    colorHex: '#db2777',
    active: true,
    displayOrder: 6,
    stats: {
      consultations: 21,
      petitions: 12,
      votes: 4,
      assemblies: 1,
      participants: 5340,
    },
    createdAt: '2023-01-10T00:00:00Z',
    updatedAt: '2026-01-05T00:00:00Z',
  },
  {
    id: 'sec',
    slug: 'securite',
    name: {
      fr: 'Sécurité & Prévention',
      de: 'Sicherheit & Prävention',
      en: 'Security & Prevention',
    },
    description: {
      fr: 'Sécurité publique, prévention, gestion des risques',
      de: 'Öffentliche Sicherheit, Prävention, Risikomanagement',
      en: 'Public safety, prevention, risk management',
    },
    icon: '🛡️',
    color: 'text-teal-600',
    colorHex: '#0d9488',
    active: true,
    displayOrder: 7,
    stats: {
      consultations: 18,
      petitions: 14,
      votes: 3,
      assemblies: 1,
      participants: 4780,
    },
    createdAt: '2023-01-10T00:00:00Z',
    updatedAt: '2026-01-05T00:00:00Z',
  },
  {
    id: 'num',
    slug: 'numerique',
    name: {
      fr: 'Numérique & Innovation',
      de: 'Digital & Innovation',
      en: 'Digital & Innovation',
    },
    description: {
      fr: 'Transformation numérique, innovation, smart city',
      de: 'Digitale Transformation, Innovation, Smart City',
      en: 'Digital transformation, innovation, smart city',
    },
    icon: '💻',
    color: 'text-yellow-600',
    colorHex: '#ca8a04',
    active: true,
    displayOrder: 8,
    stats: {
      consultations: 24,
      petitions: 9,
      votes: 5,
      assemblies: 1,
      participants: 6120,
    },
    createdAt: '2023-01-10T00:00:00Z',
    updatedAt: '2026-01-05T00:00:00Z',
  },
  {
    id: 'youth',
    slug: 'jeunesse',
    name: {
      fr: '🌟 Espace Jeunesse',
      de: '🌟 Jugendraum',
      en: '🌟 Youth Space',
    },
    description: {
      fr: 'Micro-sondages et initiatives dédiées aux jeunes de 12 à 25 ans',
      de: 'Mikro-Umfragen und Initiativen für Jugendliche von 12 bis 25 Jahren',
      en: 'Micro-polls and initiatives dedicated to young people aged 12 to 25',
    },
    icon: '✨',
    color: 'text-purple-600',
    colorHex: '#9333ea',
    active: true,
    displayOrder: 9,
    stats: {
      consultations: 0,
      petitions: 0,
      votes: 0,
      assemblies: 0,
      participants: 2847,
    },
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2026-01-13T00:00:00Z',
  },
];

// ==================== Mock Consultations ====================

export const mockConsultations: ConsultationDTO[] = [
  {
    id: 'con_001',
    slug: 'amenagement-parc-central-2026',
    title: {
      fr: 'Réaménagement du Parc Central',
      de: 'Umgestaltung des Zentralparks',
      en: 'Central Park Redevelopment',
    },
    description: {
      fr: 'Participez à la refonte complète du Parc Central pour en faire un espace vert moderne, écologique et accessible à tous.',
      de: 'Beteiligen Sie sich an der kompletten Neugestaltung des Zentralparks zu einem modernen, ökologischen und für alle zugänglichen Grünraum.',
      en: 'Participate in the complete redesign of Central Park into a modern, ecological and accessible green space for all.',
    },
    themeId: 'urb',
    type: 'public_meeting',
    status: 'open',
    startDate: '2026-01-15T00:00:00Z',
    endDate: '2026-03-15T23:59:59Z',
    location: {
      name: 'Hôtel de Ville - Salle des Fêtes',
      address: '1 Place de la Mairie',
      city: 'Lyon',
      postalCode: '69001',
      coordinates: {
        lat: 45.7640,
        lng: 4.8357,
      },
    },
    isOnline: true,
    onlineLink: 'https://meet.civiagora.fr/parc-central-2026',
    capacity: 300,
    registeredParticipants: 187,
    author: {
      id: 'usr_admin_001',
      firstName: 'Sophie',
      lastName: 'Laurent',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      role: 'Responsable Urbanisme',
    },
    organizer: {
      id: 'org_001',
      name: {
        fr: 'Ville de Lyon',
        de: 'Stadt Lyon',
        en: 'City of Lyon',
      },
      type: 'municipal',
      logo: '/logos/ville-lyon.svg',
      website: 'https://www.lyon.fr',
    },
    tags: ['urbanisme', 'espaces verts', 'écologie', 'accessibilité'],
    documents: [
      {
        id: 'doc_001',
        title: 'Plan directeur du projet',
        filename: 'plan-directeur-parc-central.pdf',
        mimeType: 'application/pdf',
        size: 2457600,
        url: '/documents/plan-directeur-parc-central.pdf',
        uploadedAt: '2026-01-10T10:00:00Z',
        uploadedBy: {
          id: 'usr_admin_001',
          firstName: 'Sophie',
          lastName: 'Laurent',
          role: 'Responsable Urbanisme',
        },
      },
      {
        id: 'doc_002',
        title: 'Étude d\'impact environnemental',
        filename: 'etude-impact-environnemental.pdf',
        mimeType: 'application/pdf',
        size: 1843200,
        url: '/documents/etude-impact-environnemental.pdf',
        uploadedAt: '2026-01-10T10:15:00Z',
        uploadedBy: {
          id: 'usr_admin_001',
          firstName: 'Sophie',
          lastName: 'Laurent',
          role: 'Responsable Urbanisme',
        },
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1519643381401-22c77e60520e?w=1200&h=600&fit=crop',
      'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=1200&h=600&fit=crop',
    ],
    stats: {
      totalParticipants: 187,
      totalComments: 245,
      totalVotes: 342,
      totalIdeas: 67,
      engagementRate: 78.5,
    },
    phases: [
      {
        id: 'phase_001',
        title: {
          fr: 'Diagnostic et enjeux',
          de: 'Diagnose und Herausforderungen',
          en: 'Diagnosis and challenges',
        },
        description: {
          fr: 'Identification des besoins et des contraintes du site actuel',
          de: 'Ermittlung der Bedürfnisse und Einschränkungen des aktuellen Standorts',
          en: 'Identification of needs and constraints of the current site',
        },
        startDate: '2026-01-15T00:00:00Z',
        endDate: '2026-02-05T23:59:59Z',
        status: 'active',
        order: 1,
      },
      {
        id: 'phase_002',
        title: {
          fr: 'Co-création des propositions',
          de: 'Ko-Kreation von Vorschlägen',
          en: 'Co-creation of proposals',
        },
        description: {
          fr: 'Ateliers collaboratifs pour imaginer le parc de demain',
          de: 'Kollaborative Workshops zur Gestaltung des Parks von morgen',
          en: 'Collaborative workshops to design the park of tomorrow',
        },
        startDate: '2026-02-06T00:00:00Z',
        endDate: '2026-02-26T23:59:59Z',
        status: 'upcoming',
        order: 2,
      },
      {
        id: 'phase_003',
        title: {
          fr: 'Vote sur les orientations',
          de: 'Abstimmung über Richtlinien',
          en: 'Vote on guidelines',
        },
        description: {
          fr: 'Choix des orientations prioritaires par les citoyens',
          de: 'Auswahl der Prioritäten durch die Bürger',
          en: 'Citizens\' choice of priority guidelines',
        },
        startDate: '2026-02-27T00:00:00Z',
        endDate: '2026-03-15T23:59:59Z',
        status: 'upcoming',
        order: 3,
      },
    ],
    questions: [
      {
        id: 'q_001',
        question: {
          fr: 'Quels sont vos usages actuels du Parc Central ?',
          de: 'Wie nutzen Sie derzeit den Zentralpark?',
          en: 'What are your current uses of Central Park?',
        },
        type: 'multiple_choice',
        required: false,
        options: ['Promenade', 'Sport', 'Pique-nique', 'Jeux enfants', 'Lecture', 'Autre'],
        order: 1,
      },
      {
        id: 'q_002',
        question: {
          fr: 'Quels aménagements souhaiteriez-vous prioritairement ?',
          de: 'Welche Einrichtungen wünschen Sie sich vorrangig?',
          en: 'What facilities would you like as a priority?',
        },
        type: 'open',
        required: true,
        order: 2,
      },
    ],
    createdAt: '2026-01-05T00:00:00Z',
    updatedAt: '2026-01-09T14:30:00Z',
  },
  {
    id: 'con_002',
    slug: 'transition-energetique-quartier-confluence',
    title: {
      fr: 'Transition Énergétique du Quartier Confluence',
      de: 'Energiewende im Confluence-Viertel',
      en: 'Energy Transition in Confluence District',
    },
    description: {
      fr: 'Comment rendre le quartier Confluence 100% autonome en énergie renouvelable d\'ici 2030 ? Participez aux débats et proposez vos solutions.',
      de: 'Wie kann das Confluence-Viertel bis 2030 zu 100% energieautark mit erneuerbaren Energien werden? Nehmen Sie an Diskussionen teil und schlagen Sie Lösungen vor.',
      en: 'How to make the Confluence district 100% autonomous in renewable energy by 2030? Participate in debates and propose your solutions.',
    },
    themeId: 'env',
    type: 'online_debate',
    status: 'open',
    startDate: '2026-01-10T00:00:00Z',
    endDate: '2026-02-28T23:59:59Z',
    isOnline: true,
    onlineLink: 'https://forum.civiagora.fr/transition-energetique-confluence',
    registeredParticipants: 423,
    author: {
      id: 'usr_admin_002',
      firstName: 'Marc',
      lastName: 'Bernard',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      role: 'Responsable Environnement',
    },
    organizer: {
      id: 'org_001',
      name: {
        fr: 'Ville de Lyon',
        de: 'Stadt Lyon',
        en: 'City of Lyon',
      },
      type: 'municipal',
      logo: '/logos/ville-lyon.svg',
      website: 'https://www.lyon.fr',
    },
    tags: ['énergie', 'transition', 'renouvelable', 'climat'],
    documents: [
      {
        id: 'doc_003',
        title: 'Diagnostic énergétique du quartier',
        filename: 'diagnostic-energetique-confluence.pdf',
        mimeType: 'application/pdf',
        size: 3145728,
        url: '/documents/diagnostic-energetique-confluence.pdf',
        uploadedAt: '2026-01-08T09:00:00Z',
        uploadedBy: {
          id: 'usr_admin_002',
          firstName: 'Marc',
          lastName: 'Bernard',
          role: 'Responsable Environnement',
        },
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=600&fit=crop',
      'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1200&h=600&fit=crop',
    ],
    stats: {
      totalParticipants: 423,
      totalComments: 567,
      totalVotes: 892,
      totalIdeas: 134,
      engagementRate: 82.3,
    },
    phases: [
      {
        id: 'phase_004',
        title: {
          fr: 'Diagnostic partagé',
          de: 'Gemeinsame Diagnose',
          en: 'Shared diagnosis',
        },
        description: {
          fr: 'État des lieux de la consommation énergétique actuelle',
          de: 'Bestandsaufnahme des aktuellen Energieverbrauchs',
          en: 'Current energy consumption assessment',
        },
        startDate: '2026-01-10T00:00:00Z',
        endDate: '2026-01-24T23:59:59Z',
        status: 'completed',
        order: 1,
      },
      {
        id: 'phase_005',
        title: {
          fr: 'Débat sur les solutions',
          de: 'Debatte über Lösungen',
          en: 'Debate on solutions',
        },
        description: {
          fr: 'Discussion des différentes options technologiques et organisationnelles',
          de: 'Diskussion verschiedener technologischer und organisatorischer Optionen',
          en: 'Discussion of various technological and organizational options',
        },
        startDate: '2026-01-25T00:00:00Z',
        endDate: '2026-02-14T23:59:59Z',
        status: 'active',
        order: 2,
      },
      {
        id: 'phase_006',
        title: {
          fr: 'Élaboration du plan d\'action',
          de: 'Erstellung des Aktionsplans',
          en: 'Action plan development',
        },
        description: {
          fr: 'Construction collaborative d\'une feuille de route 2026-2030',
          de: 'Kollaborative Erstellung einer Roadmap 2026-2030',
          en: 'Collaborative construction of a 2026-2030 roadmap',
        },
        startDate: '2026-02-15T00:00:00Z',
        endDate: '2026-02-28T23:59:59Z',
        status: 'upcoming',
        order: 3,
      },
    ],
    questions: [],
    createdAt: '2026-01-02T00:00:00Z',
    updatedAt: '2026-01-09T10:15:00Z',
  },
];

export const mockConsultationSummaries: ConsultationSummaryDTO[] = mockConsultations.map(c => ({
  id: c.id,
  slug: c.slug,
  title: c.title,
  themeId: c.themeId,
  type: c.type,
  status: c.status,
  startDate: c.startDate,
  endDate: c.endDate,
  participants: c.registeredParticipants,
  commentsCount: c.stats.totalComments,
}));

// ==================== Mock Petitions ====================

export const mockPetitions: PetitionDTO[] = [
  {
    id: 'pet_001',
    slug: 'pistes-cyclables-securisees-centre-ville',
    title: {
      fr: 'Pour des pistes cyclables sécurisées en centre-ville',
      de: 'Für sichere Radwege in der Innenstadt',
      en: 'For safe bike lanes in the city center',
    },
    description: {
      fr: 'Demandons la création d\'un réseau complet de pistes cyclables protégées dans le centre-ville de Lyon pour encourager la mobilité douce.',
      de: 'Fordern wir die Schaffung eines vollständigen Netzes geschützter Radwege im Zentrum von Lyon, um sanfte Mobilität zu fördern.',
      en: 'Let\'s demand the creation of a complete network of protected bike lanes in Lyon city center to encourage soft mobility.',
    },
    content: {
      fr: 'Le centre-ville de Lyon manque cruellement d\'infrastructures cyclables sécurisées. Cette pétition vise à demander à la municipalité la mise en place d\'un réseau de 50km de pistes cyclables protégées d\'ici 2027.\n\nNos demandes :\n- Pistes cyclables séparées du trafic automobile\n- Signalisation claire et éclairage adapté\n- Connexion aux points d\'intérêt majeurs\n- Stationnement vélo sécurisé\n\nEnsemble, rendons Lyon plus respirable et accessible à tous !',
      de: 'Das Zentrum von Lyon leidet unter einem gravierenden Mangel an sicheren Radinfrastrukturen. Diese Petition zielt darauf ab, die Stadtverwaltung aufzufordern, bis 2027 ein Netz von 50 km geschützten Radwegen einzurichten.\n\nUnsere Forderungen:\n- Vom Autoverkehr getrennte Radwege\n- Klare Beschilderung und angepasste Beleuchtung\n- Anbindung an wichtige Sehenswürdigkeiten\n- Sichere Fahrradparkplätze\n\nGemeinsam machen wir Lyon atmungsaktiver und für alle zugänglich!',
      en: 'Lyon city center sorely lacks secure cycling infrastructure. This petition aims to ask the municipality to implement a 50km network of protected bike lanes by 2027.\n\nOur demands:\n- Bike lanes separated from car traffic\n- Clear signage and appropriate lighting\n- Connection to major points of interest\n- Secure bike parking\n\nTogether, let\'s make Lyon more breathable and accessible to all!',
    },
    themeId: 'urb',
    status: 'open',
    targetSignatures: 5000,
    currentSignatures: 3847,
    progressPercentage: 76.94,
    startDate: '2025-12-01T00:00:00Z',
    endDate: '2026-03-31T23:59:59Z',
    author: {
      id: 'usr_003',
      firstName: 'Claire',
      lastName: 'Moreau',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop',
      role: 'Citoyenne',
    },
    recipient: {
      id: 'rec_001',
      name: {
        fr: 'Maire de Lyon',
        de: 'Bürgermeister von Lyon',
        en: 'Mayor of Lyon',
      },
      type: 'mayor',
      position: {
        fr: 'Grégory Doucet - Maire de Lyon',
        de: 'Grégory Doucet - Bürgermeister von Lyon',
        en: 'Grégory Doucet - Mayor of Lyon',
      },
    },
    category: 'local',
    tags: ['vélo', 'mobilité', 'sécurité', 'transport'],
    images: [
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1200&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop',
    ],
    documents: [
      {
        id: 'doc_004',
        title: 'Carte du réseau cyclable proposé',
        filename: 'reseau-cyclable-propose.pdf',
        mimeType: 'application/pdf',
        size: 1024000,
        url: '/documents/reseau-cyclable-propose.pdf',
        uploadedAt: '2025-12-01T08:00:00Z',
        uploadedBy: {
          id: 'usr_003',
          firstName: 'Claire',
          lastName: 'Moreau',
          role: 'Citoyenne',
        },
      },
    ],
    milestones: [
      {
        id: 'mil_001',
        signatures: 1000,
        title: {
          fr: 'Premier palier',
          de: 'Erster Meilenstein',
          en: 'First milestone',
        },
        description: {
          fr: '1000 signatures atteintes',
          de: '1000 Unterschriften erreicht',
          en: '1000 signatures reached',
        },
        reached: true,
        reachedAt: '2025-12-15T14:23:00Z',
      },
      {
        id: 'mil_002',
        signatures: 2500,
        title: {
          fr: 'Demi-objectif',
          de: 'Halbziel',
          en: 'Half goal',
        },
        description: {
          fr: 'Moitié des signatures atteintes',
          de: 'Hälfte der Unterschriften erreicht',
          en: 'Half of signatures reached',
        },
        reached: true,
        reachedAt: '2026-01-03T09:45:00Z',
      },
      {
        id: 'mil_003',
        signatures: 5000,
        title: {
          fr: 'Objectif final',
          de: 'Endziel',
          en: 'Final goal',
        },
        description: {
          fr: 'Objectif de 5000 signatures atteint',
          de: 'Ziel von 5000 Unterschriften erreicht',
          en: '5000 signatures goal reached',
        },
        reached: false,
      },
    ],
    updates: [
      {
        id: 'upd_001',
        title: {
          fr: 'Rencontre avec l\'adjoint aux mobilités',
          de: 'Treffen mit dem Mobilitätsbeigeordneten',
          en: 'Meeting with the mobility deputy',
        },
        content: {
          fr: 'Nous avons rencontré l\'adjoint aux mobilités qui s\'est montré très intéressé par notre proposition. Une étude de faisabilité sera lancée si nous atteignons 5000 signatures.',
          de: 'Wir haben uns mit dem Mobilitätsbeigeordneten getroffen, der großes Interesse an unserem Vorschlag zeigte. Eine Machbarkeitsstudie wird eingeleitet, wenn wir 5000 Unterschriften erreichen.',
          en: 'We met with the mobility deputy who showed great interest in our proposal. A feasibility study will be launched if we reach 5000 signatures.',
        },
        author: {
          id: 'usr_003',
          firstName: 'Claire',
          lastName: 'Moreau',
          role: 'Citoyenne',
        },
        publishedAt: '2026-01-05T16:30:00Z',
      },
    ],
    hasSigned: false,
    createdAt: '2025-12-01T00:00:00Z',
    updatedAt: '2026-01-09T18:22:00Z',
  },
  {
    id: 'pet_002',
    slug: 'cantines-scolaires-bio-locales',
    title: {
      fr: 'Cantines scolaires 100% bio et locales',
      de: '100% Bio- und lokale Schulkantinen',
      en: '100% organic and local school canteens',
    },
    description: {
      fr: 'Exigeons que toutes les cantines scolaires proposent des repas 100% bio et issus de producteurs locaux d\'ici 2027.',
      de: 'Fordern wir, dass alle Schulkantinen bis 2027 100% Bio-Mahlzeiten von lokalen Produzenten anbieten.',
      en: 'Let\'s demand that all school canteens offer 100% organic meals from local producers by 2027.',
    },
    content: {
      fr: 'Nos enfants méritent une alimentation saine et durable. Cette pétition demande la conversion complète des cantines scolaires vers le bio et le local.\n\nNos revendications :\n- 100% d\'approvisionnement bio certifié\n- Circuits courts avec les producteurs régionaux\n- Menus équilibrés élaborés par des nutritionnistes\n- Réduction du gaspillage alimentaire\n- Formation du personnel de restauration\n\nPour la santé de nos enfants et de notre planète !',
      de: 'Unsere Kinder verdienen gesunde und nachhaltige Ernährung. Diese Petition fordert die vollständige Umstellung der Schulkantinen auf Bio und Lokal.\n\nUnsere Forderungen:\n- 100% zertifizierte Bio-Versorgung\n- Kurze Wege mit regionalen Produzenten\n- Ausgewogene Menüs von Ernährungsberatern\n- Reduzierung der Lebensmittelverschwendung\n- Schulung des Kantinenpersonals\n\nFür die Gesundheit unserer Kinder und unseres Planeten!',
      en: 'Our children deserve healthy and sustainable food. This petition calls for the complete conversion of school canteens to organic and local.\n\nOur demands:\n- 100% certified organic sourcing\n- Short supply chains with regional producers\n- Balanced menus developed by nutritionists\n- Food waste reduction\n- Training of catering staff\n\nFor the health of our children and our planet!',
    },
    themeId: 'edu',
    status: 'threshold_reached',
    targetSignatures: 3000,
    currentSignatures: 3542,
    progressPercentage: 118.07,
    startDate: '2025-11-15T00:00:00Z',
    endDate: '2026-02-15T23:59:59Z',
    author: {
      id: 'usr_004',
      firstName: 'Antoine',
      lastName: 'Leroy',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      role: 'Citoyen',
    },
    recipient: {
      id: 'rec_002',
      name: {
        fr: 'Conseil Municipal',
        de: 'Stadtrat',
        en: 'City Council',
      },
      type: 'council',
    },
    category: 'local',
    tags: ['éducation', 'alimentation', 'bio', 'santé'],
    images: [
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=600&fit=crop',
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&h=600&fit=crop',
    ],
    documents: [],
    milestones: [
      {
        id: 'mil_004',
        signatures: 1000,
        title: {
          fr: 'Premier palier',
          de: 'Erster Meilenstein',
          en: 'First milestone',
        },
        description: {
          fr: '1000 signatures',
          de: '1000 Unterschriften',
          en: '1000 signatures',
        },
        reached: true,
        reachedAt: '2025-11-28T10:15:00Z',
      },
      {
        id: 'mil_005',
        signatures: 3000,
        title: {
          fr: 'Objectif atteint !',
          de: 'Ziel erreicht!',
          en: 'Goal reached!',
        },
        description: {
          fr: 'Seuil de 3000 signatures franchi',
          de: 'Schwelle von 3000 Unterschriften überschritten',
          en: 'Threshold of 3000 signatures exceeded',
        },
        reached: true,
        reachedAt: '2026-01-07T15:42:00Z',
      },
    ],
    updates: [
      {
        id: 'upd_002',
        title: {
          fr: 'Objectif atteint - Présentation au Conseil Municipal',
          de: 'Ziel erreicht - Präsentation vor dem Stadtrat',
          en: 'Goal reached - Presentation to City Council',
        },
        content: {
          fr: 'Grâce à votre mobilisation, nous avons dépassé les 3000 signatures ! La pétition sera présentée au prochain Conseil Municipal le 25 janvier 2026. Merci à tous !',
          de: 'Dank Ihrer Mobilisierung haben wir 3000 Unterschriften überschritten! Die Petition wird am 25. Januar 2026 dem nächsten Stadtrat vorgelegt. Vielen Dank an alle!',
          en: 'Thanks to your mobilization, we exceeded 3000 signatures! The petition will be presented to the next City Council on January 25, 2026. Thank you all!',
        },
        author: {
          id: 'usr_004',
          firstName: 'Antoine',
          lastName: 'Leroy',
          role: 'Citoyen',
        },
        publishedAt: '2026-01-08T09:00:00Z',
      },
    ],
    hasSigned: true,
    createdAt: '2025-11-15T00:00:00Z',
    updatedAt: '2026-01-09T12:00:00Z',
  },
];

export const mockPetitionSummaries: PetitionSummaryDTO[] = mockPetitions.map(p => ({
  id: p.id,
  slug: p.slug,
  title: p.title,
  themeId: p.themeId,
  status: p.status,
  currentSignatures: p.currentSignatures,
  targetSignatures: p.targetSignatures,
  progressPercentage: p.progressPercentage,
  endDate: p.endDate,
}));

// ==================== Mock Votes ====================

export const mockVotes: VoteDTO[] = [
  {
    id: 'vote_001',
    slug: 'budget-participatif-2026',
    title: {
      fr: 'Budget Participatif 2026',
      de: 'Bürgerbeteiligungshaushalt 2026',
      en: 'Participatory Budget 2026',
    },
    description: {
      fr: 'Votez pour les projets qui bénéficieront d\'une partie du budget participatif de 2 millions d\'euros.',
      de: 'Stimmen Sie für die Projekte, die von einem Teil des Bürgerbeteiligungshaushalts von 2 Millionen Euro profitieren werden.',
      en: 'Vote for projects that will benefit from part of the 2 million euro participatory budget.',
    },
    question: {
      fr: 'Quels projets souhaitez-vous voir financés par le budget participatif 2026 ? (Choisissez jusqu\'à 3 projets)',
      de: 'Welche Projekte möchten Sie aus dem Bürgerbeteiligungshaushalt 2026 finanziert sehen? (Wählen Sie bis zu 3 Projekte)',
      en: 'Which projects do you want to see funded by the 2026 participatory budget? (Choose up to 3 projects)',
    },
    themeId: 'urb',
    type: 'consultation',
    votingMethod: 'multiple_choice',
    status: 'open',
    startDate: '2026-01-20T00:00:00Z',
    endDate: '2026-02-20T23:59:59Z',
    options: [
      {
        id: 'opt_001',
        label: {
          fr: 'Végétalisation des cours d\'école',
          de: 'Begrünung von Schulhöfen',
          en: 'Greening of school playgrounds',
        },
        description: {
          fr: 'Transformer 15 cours d\'école en îlots de fraîcheur avec arbres et espaces verts',
          de: 'Umwandlung von 15 Schulhöfen in Frischeinseln mit Bäumen und Grünflächen',
          en: 'Transform 15 school playgrounds into cool islands with trees and green spaces',
        },
        color: '#16a34a',
        order: 1,
        votes: 2847,
        percentage: 34.2,
      },
      {
        id: 'opt_002',
        label: {
          fr: 'Pistes cyclables sécurisées',
          de: 'Sichere Radwege',
          en: 'Safe bike lanes',
        },
        description: {
          fr: '10 km de nouvelles pistes cyclables protégées',
          de: '10 km neue geschützte Radwege',
          en: '10 km of new protected bike lanes',
        },
        color: '#2563eb',
        order: 2,
        votes: 3124,
        percentage: 37.5,
      },
      {
        id: 'opt_003',
        label: {
          fr: 'Rénovation de 5 aires de jeux',
          de: 'Renovierung von 5 Spielplätzen',
          en: 'Renovation of 5 playgrounds',
        },
        description: {
          fr: 'Modernisation et sécurisation des aires de jeux pour enfants',
          de: 'Modernisierung und Sicherung von Kinderspielplätzen',
          en: 'Modernization and securing of children\'s playgrounds',
        },
        color: '#ea580c',
        order: 3,
        votes: 1893,
        percentage: 22.7,
      },
      {
        id: 'opt_004',
        label: {
          fr: 'Création d\'un jardin partagé',
          de: 'Schaffung eines Gemeinschaftsgartens',
          en: 'Creation of a community garden',
        },
        description: {
          fr: 'Espace de 2000m² pour jardinage collectif et permaculture',
          de: '2000m² Fläche für gemeinschaftliches Gärtnern und Permakultur',
          en: '2000m² space for collective gardening and permaculture',
        },
        color: '#16a34a',
        order: 4,
        votes: 1456,
        percentage: 17.5,
      },
      {
        id: 'opt_005',
        label: {
          fr: 'Fontaines d\'eau potable publiques',
          de: 'Öffentliche Trinkwasserbrunnen',
          en: 'Public drinking water fountains',
        },
        description: {
          fr: 'Installation de 30 points d\'eau potable dans la ville',
          de: 'Installation von 30 Trinkwasserstellen in der Stadt',
          en: 'Installation of 30 drinking water points in the city',
        },
        color: '#0d9488',
        order: 5,
        votes: 892,
        percentage: 10.7,
      },
    ],
    eligibilityCriteria: {
      minAge: 16,
      requiredResidency: true,
    },
    isAnonymous: false,
    allowAbstention: true,
    requiresVerification: true,
    stats: {
      totalEligibleVoters: 45230,
      totalVotes: 8327,
      participationRate: 18.4,
      abstentions: 127,
    },
    hasVoted: false,
    organizer: {
      id: 'org_001',
      name: {
        fr: 'Ville de Lyon',
        de: 'Stadt Lyon',
        en: 'City of Lyon',
      },
      type: 'municipal',
      logo: '/logos/ville-lyon.svg',
      website: 'https://www.lyon.fr',
    },
    documents: [
      {
        id: 'doc_005',
        title: 'Guide du budget participatif',
        filename: 'guide-budget-participatif-2026.pdf',
        mimeType: 'application/pdf',
        size: 1536000,
        url: '/documents/guide-budget-participatif-2026.pdf',
        uploadedAt: '2026-01-15T10:00:00Z',
        uploadedBy: {
          id: 'usr_admin_001',
          firstName: 'Sophie',
          lastName: 'Laurent',
          role: 'Responsable Urbanisme',
        },
      },
    ],
    createdAt: '2026-01-10T00:00:00Z',
    updatedAt: '2026-01-09T20:15:00Z',
  },
  {
    id: 'vote_002',
    slug: 'referendum-parc-urbain',
    title: {
      fr: 'Référendum : Création du Parc Urbain du Confluent',
      de: 'Referendum: Schaffung des Stadtparks Confluent',
      en: 'Referendum: Creation of Confluent Urban Park',
    },
    description: {
      fr: 'Votez pour ou contre la création d\'un grand parc urbain de 12 hectares sur le site industriel désaffecté du Confluent.',
      de: 'Stimmen Sie für oder gegen die Schaffung eines großen 12 Hektar großen Stadtparks auf dem stillgelegten Industriegelände Confluent.',
      en: 'Vote for or against the creation of a large 12-hectare urban park on the disused Confluent industrial site.',
    },
    question: {
      fr: 'Êtes-vous favorable à la transformation du site industriel du Confluent en parc urbain écologique ?',
      de: 'Sind Sie für die Umwandlung des Industriestandorts Confluent in einen ökologischen Stadtpark?',
      en: 'Are you in favor of transforming the Confluent industrial site into an ecological urban park?',
    },
    themeId: 'env',
    type: 'referendum',
    votingMethod: 'single_choice',
    status: 'open',
    startDate: '2026-01-15T00:00:00Z',
    endDate: '2026-02-15T23:59:59Z',
    options: [
      {
        id: 'opt_ref_001',
        label: {
          fr: 'Oui, je suis favorable',
          de: 'Ja, ich bin dafür',
          en: 'Yes, I am in favor',
        },
        description: {
          fr: 'Créer un parc avec espaces verts, zones de biodiversité et équipements sportifs',
          de: 'Einen Park mit Grünflächen, Biodiversitätszonen und Sportanlagen schaffen',
          en: 'Create a park with green spaces, biodiversity zones and sports facilities',
        },
        color: '#16a34a',
        order: 1,
        votes: 12847,
        percentage: 64.2,
      },
      {
        id: 'opt_ref_002',
        label: {
          fr: 'Non, je suis contre',
          de: 'Nein, ich bin dagegen',
          en: 'No, I am against',
        },
        description: {
          fr: 'Privilégier un développement immobilier mixte sur ce site',
          de: 'Eine gemischte Immobilienentwicklung auf diesem Standort bevorzugen',
          en: 'Prefer mixed real estate development on this site',
        },
        color: '#dc2626',
        order: 2,
        votes: 5932,
        percentage: 29.6,
      },
      {
        id: 'opt_ref_003',
        label: {
          fr: 'Je m\'abstiens',
          de: 'Ich enthalte mich',
          en: 'I abstain',
        },
        description: {
          fr: 'Ne pas participer au vote',
          de: 'Nicht an der Abstimmung teilnehmen',
          en: 'Not participate in the vote',
        },
        color: '#9ca3af',
        order: 3,
        votes: 1241,
        percentage: 6.2,
      },
    ],
    eligibilityCriteria: {
      minAge: 18,
      requiredResidency: true,
    },
    isAnonymous: false,
    allowAbstention: true,
    requiresVerification: true,
    stats: {
      totalEligibleVoters: 52340,
      totalVotes: 20020,
      participationRate: 38.2,
      abstentions: 1241,
    },
    hasVoted: false,
    organizer: {
      id: 'org_001',
      name: {
        fr: 'Ville de Lyon',
        de: 'Stadt Lyon',
        en: 'City of Lyon',
      },
      type: 'municipal',
      logo: '/logos/ville-lyon.svg',
      website: 'https://www.lyon.fr',
    },
    documents: [
      {
        id: 'doc_ref_001',
        title: 'Étude d\'impact environnemental',
        filename: 'etude-impact-parc-confluent.pdf',
        mimeType: 'application/pdf',
        size: 3248000,
        url: '/documents/etude-impact-parc-confluent.pdf',
        uploadedAt: '2026-01-10T10:00:00Z',
        uploadedBy: {
          id: 'usr_admin_002',
          firstName: 'Marc',
          lastName: 'Dubois',
          role: 'Responsable Environnement',
        },
      },
      {
        id: 'doc_ref_002',
        title: 'Plans d\'aménagement',
        filename: 'plans-amenagement-parc.pdf',
        mimeType: 'application/pdf',
        size: 5120000,
        url: '/documents/plans-amenagement-parc.pdf',
        uploadedAt: '2026-01-12T14:30:00Z',
        uploadedBy: {
          id: 'usr_admin_002',
          firstName: 'Marc',
          lastName: 'Dubois',
          role: 'Responsable Environnement',
        },
      },
    ],
    createdAt: '2026-01-08T00:00:00Z',
    updatedAt: '2026-01-09T19:22:00Z',
  },
  {
    id: 'vote_003',
    slug: 'vote-horaires-bibliotheques',
    title: {
      fr: 'Vote : Nouveaux horaires des bibliothèques municipales',
      de: 'Abstimmung: Neue Öffnungszeiten der Stadtbibliotheken',
      en: 'Vote: New municipal library opening hours',
    },
    description: {
      fr: 'Choisissez la formule d\'ouverture des bibliothèques qui vous convient le mieux pour 2026.',
      de: 'Wählen Sie die Öffnungsformel der Bibliotheken, die Ihnen am besten passt für 2026.',
      en: 'Choose the library opening formula that suits you best for 2026.',
    },
    question: {
      fr: 'Quelle formule d\'horaires souhaitez-vous pour les bibliothèques municipales ?',
      de: 'Welche Öffnungszeitenformel wünschen Sie sich für die Stadtbibliotheken?',
      en: 'Which opening hours formula do you want for municipal libraries?',
    },
    themeId: 'cul',
    type: 'consultation',
    votingMethod: 'single_choice',
    status: 'open',
    startDate: '2026-01-12T00:00:00Z',
    endDate: '2026-02-05T23:59:59Z',
    options: [
      {
        id: 'opt_bib_001',
        label: {
          fr: 'Formule week-end',
          de: 'Wochenendformel',
          en: 'Weekend formula',
        },
        description: {
          fr: 'Ouverture samedi et dimanche 9h-19h, fermé lundi et mardi',
          de: 'Geöffnet Samstag und Sonntag 9-19 Uhr, geschlossen Montag und Dienstag',
          en: 'Open Saturday and Sunday 9am-7pm, closed Monday and Tuesday',
        },
        color: '#7c3aed',
        order: 1,
        votes: 2547,
        percentage: 42.8,
      },
      {
        id: 'opt_bib_002',
        label: {
          fr: 'Formule soirée',
          de: 'Abendformel',
          en: 'Evening formula',
        },
        description: {
          fr: 'Ouverture en semaine jusqu\'à 21h, fermé le dimanche',
          de: 'Wochentags bis 21 Uhr geöffnet, sonntags geschlossen',
          en: 'Open on weekdays until 9pm, closed on Sunday',
        },
        color: '#2563eb',
        order: 2,
        votes: 1893,
        percentage: 31.8,
      },
      {
        id: 'opt_bib_003',
        label: {
          fr: 'Formule équilibrée',
          de: 'Ausgewogene Formel',
          en: 'Balanced formula',
        },
        description: {
          fr: 'Ouverture 6 jours/7 avec horaires classiques 10h-18h',
          de: 'Geöffnet 6 Tage/Woche mit klassischen Öffnungszeiten 10-18 Uhr',
          en: 'Open 6 days/week with classic hours 10am-6pm',
        },
        color: '#16a34a',
        order: 3,
        votes: 1512,
        percentage: 25.4,
      },
    ],
    eligibilityCriteria: {
      minAge: 14,
      requiredResidency: true,
    },
    isAnonymous: true,
    allowAbstention: false,
    requiresVerification: false,
    stats: {
      totalEligibleVoters: 48200,
      totalVotes: 5952,
      participationRate: 12.3,
      abstentions: 0,
    },
    hasVoted: false,
    organizer: {
      id: 'org_001',
      name: {
        fr: 'Ville de Lyon',
        de: 'Stadt Lyon',
        en: 'City of Lyon',
      },
      type: 'municipal',
      logo: '/logos/ville-lyon.svg',
      website: 'https://www.lyon.fr',
    },
    documents: [],
    createdAt: '2026-01-05T00:00:00Z',
    updatedAt: '2026-01-09T18:45:00Z',
  },
  {
    id: 'vote_004',
    slug: 'consultation-mobilite-douce',
    title: {
      fr: 'Consultation : Plan Mobilités Douces 2026-2030',
      de: 'Konsultation: Plan Sanfte Mobilität 2026-2030',
      en: 'Consultation: Soft Mobility Plan 2026-2030',
    },
    description: {
      fr: 'Donnez votre avis sur les priorités du futur plan de développement des mobilités douces (vélo, marche, trottinettes).',
      de: 'Geben Sie Ihre Meinung zu den Prioritäten des zukünftigen Entwicklungsplans für sanfte Mobilität (Fahrrad, Gehen, Roller) ab.',
      en: 'Give your opinion on the priorities of the future soft mobility development plan (cycling, walking, scooters).',
    },
    question: {
      fr: 'Quelle action prioritaire pour développer les mobilités douces ? (Choisissez 2 actions)',
      de: 'Welche vorrangige Maßnahme zur Entwicklung sanfter Mobilität? (Wählen Sie 2 Aktionen)',
      en: 'What priority action to develop soft mobility? (Choose 2 actions)',
    },
    themeId: 'urb',
    type: 'consultation',
    votingMethod: 'multiple_choice',
    status: 'closed',
    startDate: '2025-11-01T00:00:00Z',
    endDate: '2025-12-15T23:59:59Z',
    options: [
      {
        id: 'opt_mob_001',
        label: {
          fr: 'Réseau express vélo',
          de: 'Fahrrad-Schnellnetz',
          en: 'Express bike network',
        },
        description: {
          fr: '50 km de voies cyclables express sécurisées et prioritaires',
          de: '50 km sichere und vorrangige Schnellradwege',
          en: '50 km of secure and priority express bike lanes',
        },
        color: '#2563eb',
        order: 1,
        votes: 8234,
        percentage: 38.5,
      },
      {
        id: 'opt_mob_002',
        label: {
          fr: 'Zones piétonnes élargies',
          de: 'Erweiterte Fußgängerzonen',
          en: 'Expanded pedestrian zones',
        },
        description: {
          fr: 'Piétonnisation de 15 rues commerçantes du centre-ville',
          de: 'Fußgängerzone von 15 Einkaufsstraßen in der Innenstadt',
          en: 'Pedestrianization of 15 shopping streets in the city center',
        },
        color: '#16a34a',
        order: 2,
        votes: 6847,
        percentage: 32.0,
      },
      {
        id: 'opt_mob_003',
        label: {
          fr: 'Stationnements vélos sécurisés',
          de: 'Sichere Fahrradstellplätze',
          en: 'Secure bike parking',
        },
        description: {
          fr: '200 abris vélos couverts et surveillés près des gares',
          de: '200 überdachte und überwachte Fahrradunterstände in Bahnhofsnähe',
          en: '200 covered and monitored bike shelters near train stations',
        },
        color: '#7c3aed',
        order: 3,
        votes: 5123,
        percentage: 23.9,
      },
      {
        id: 'opt_mob_004',
        label: {
          fr: 'Service de prêt gratuit',
          de: 'Kostenloser Verleihservice',
          en: 'Free loan service',
        },
        description: {
          fr: 'Système de prêt gratuit de vélos et trottinettes électriques',
          de: 'Kostenloses Verleihsystem für Fahrräder und Elektroroller',
          en: 'Free bike and electric scooter loan system',
        },
        color: '#ea580c',
        order: 4,
        votes: 3892,
        percentage: 18.2,
      },
    ],
    eligibilityCriteria: {
      minAge: 16,
      requiredResidency: true,
    },
    isAnonymous: false,
    allowAbstention: true,
    requiresVerification: true,
    stats: {
      totalEligibleVoters: 45230,
      totalVotes: 21398,
      participationRate: 47.3,
      abstentions: 547,
    },
    hasVoted: true,
    organizer: {
      id: 'org_001',
      name: {
        fr: 'Ville de Lyon',
        de: 'Stadt Lyon',
        en: 'City of Lyon',
      },
      type: 'municipal',
      logo: '/logos/ville-lyon.svg',
      website: 'https://www.lyon.fr',
    },
    documents: [
      {
        id: 'doc_mob_001',
        title: 'Résultats de la consultation',
        filename: 'resultats-consultation-mobilites-douces.pdf',
        mimeType: 'application/pdf',
        size: 2048000,
        url: '/documents/resultats-consultation-mobilites-douces.pdf',
        uploadedAt: '2025-12-20T10:00:00Z',
        uploadedBy: {
          id: 'usr_admin_001',
          firstName: 'Sophie',
          lastName: 'Laurent',
          role: 'Responsable Urbanisme',
        },
      },
    ],
    createdAt: '2025-10-25T00:00:00Z',
    updatedAt: '2025-12-20T10:30:00Z',
  },
];

export const mockVoteSummaries: VoteSummaryDTO[] = mockVotes.map(v => ({
  id: v.id,
  slug: v.slug,
  title: v.title,
  themeId: v.themeId,
  type: v.type,
  status: v.status,
  startDate: v.startDate,
  endDate: v.endDate,
  totalVotes: v.stats.totalVotes,
}));

// ==================== Mock Legislative Consultations ====================

export const mockLegislativeConsultations: LegislativeConsultationDTO[] = [
  {
    id: 'leg_001',
    slug: 'projet-loi-transition-energetique-2026',
    title: {
      fr: 'Projet de loi sur la transition énergétique',
      de: 'Gesetzentwurf zur Energiewende',
      en: 'Energy Transition Bill',
    },
    description: {
      fr: 'Consultation publique sur le projet de loi visant à accélérer la transition énergétique et réduire les émissions de CO2 de 55% d\'ici 2030.',
      de: 'Öffentliche Konsultation zum Gesetzentwurf zur Beschleunigung der Energiewende und Reduzierung der CO2-Emissionen um 55% bis 2030.',
      en: 'Public consultation on the bill aimed at accelerating the energy transition and reducing CO2 emissions by 55% by 2030.',
    },
    themeId: 'env',
    textType: 'law',
    referenceNumber: 'LEG-2026-01',
    status: 'open',
    startDate: '2026-01-10T00:00:00Z',
    endDate: '2026-02-28T23:59:59Z',
    author: {
      id: 'usr_admin_001',
      firstName: 'Commission',
      lastName: 'Législative',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop',
      role: 'admin',
    },
    organizer: {
      id: 'org_parliament',
      name: {
        fr: 'Parlement National',
        de: 'Nationales Parlament',
        en: 'National Parliament',
      },
      type: 'national',
      logo: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=200&h=200&fit=crop',
      website: 'https://parliament.gov',
    },
    articles: [], // Will be populated separately
    stats: {
      totalArticles: 12,
      totalAnnotations: 87,
      totalParticipants: 245,
      totalVotes: 342,
      articlesWithAnnotations: 11,
      averageAnnotationsPerArticle: 7.25,
      engagementRate: 75.5,
    },
    documents: [
      {
        id: 'doc_leg_001',
        title: 'Exposé des motifs complet',
        filename: 'expose-motifs-transition-energetique.pdf',
        mimeType: 'application/pdf',
        size: 2457600,
        url: '/documents/expose-motifs.pdf',
        uploadedAt: '2026-01-10T10:00:00Z',
        uploadedBy: {
          id: 'usr_admin_001',
          firstName: 'Commission',
          lastName: 'Législative',
          role: 'admin',
        },
      },
    ],
    tags: ['énergie', 'climat', 'renouvelable', 'CO2'],
    createdAt: '2026-01-05T09:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'leg_002',
    slug: 'reglement-mobilite-urbaine-durable',
    title: {
      fr: 'Règlement sur la mobilité urbaine durable',
      de: 'Verordnung über nachhaltige städtische Mobilität',
      en: 'Sustainable Urban Mobility Regulation',
    },
    description: {
      fr: 'Règlement municipal définissant les zones à faibles émissions et les infrastructures cyclables obligatoires dans le centre-ville.',
      de: 'Gemeindeverordnung zur Festlegung von emissionsarmen Zonen und obligatorischen Fahrradinfrastrukturen in der Innenstadt.',
      en: 'Municipal regulation defining low-emission zones and mandatory cycling infrastructure in the city center.',
    },
    themeId: 'tra',
    textType: 'regulation',
    referenceNumber: 'REG-2026-02',
    status: 'open',
    startDate: '2026-01-12T00:00:00Z',
    endDate: '2026-02-15T23:59:59Z',
    author: {
      id: 'usr_admin_002',
      firstName: 'Conseil',
      lastName: 'Municipal',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop',
      role: 'admin',
    },
    organizer: {
      id: 'org_municipality',
      name: {
        fr: 'Municipalité de Genève',
        de: 'Stadt Genf',
        en: 'City of Geneva',
      },
      type: 'municipal',
      logo: 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=200&h=200&fit=crop',
      website: 'https://ville-geneve.ch',
    },
    articles: [],
    stats: {
      totalArticles: 8,
      totalAnnotations: 54,
      totalParticipants: 178,
      totalVotes: 219,
      articlesWithAnnotations: 7,
      averageAnnotationsPerArticle: 6.75,
      engagementRate: 68.2,
    },
    documents: [],
    tags: ['mobilité', 'vélo', 'transport', 'ville'],
    createdAt: '2026-01-08T14:00:00Z',
    updatedAt: '2026-01-12T09:00:00Z',
  },
  {
    id: 'leg_003',
    slug: 'decret-protection-espaces-verts',
    title: {
      fr: 'Décret de protection des espaces verts urbains',
      de: 'Verordnung zum Schutz städtischer Grünflächen',
      en: 'Urban Green Spaces Protection Decree',
    },
    description: {
      fr: 'Décret cantonal établissant des mesures de protection et de développement des espaces verts en zone urbaine.',
      de: 'Kantonaler Erlass zur Festlegung von Schutz- und Entwicklungsmaßnahmen für Grünflächen im städtischen Gebiet.',
      en: 'Cantonal decree establishing protection and development measures for green spaces in urban areas.',
    },
    themeId: 'env',
    textType: 'decree',
    referenceNumber: 'DEC-2026-03',
    status: 'closed',
    startDate: '2025-12-01T00:00:00Z',
    endDate: '2026-01-10T23:59:59Z',
    author: {
      id: 'usr_admin_003',
      firstName: 'Département',
      lastName: 'Environnement',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop',
      role: 'admin',
    },
    organizer: {
      id: 'org_canton',
      name: {
        fr: 'Canton de Genève',
        de: 'Kanton Genf',
        en: 'Canton of Geneva',
      },
      type: 'regional',
      logo: 'https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=200&h=200&fit=crop',
      website: 'https://ge.ch',
    },
    articles: [],
    stats: {
      totalArticles: 6,
      totalAnnotations: 32,
      totalParticipants: 95,
      totalVotes: 124,
      articlesWithAnnotations: 6,
      averageAnnotationsPerArticle: 5.33,
      engagementRate: 62.8,
    },
    documents: [],
    tags: ['nature', 'biodiversité', 'parcs', 'urbanisme'],
    createdAt: '2025-11-25T10:00:00Z',
    updatedAt: '2026-01-10T23:59:59Z',
  },
];

export const mockArticles: ArticleDTO[] = [
  // Articles pour leg_001 - Transition énergétique
  {
    id: 'art_001_01',
    consultationId: 'leg_001',
    articleNumber: 'Article 1',
    title: {
      fr: 'Objectifs généraux',
      de: 'Allgemeine Ziele',
      en: 'General Objectives',
    },
    content: {
      fr: 'La présente loi vise à accélérer la transition énergétique en fixant des objectifs contraignants de réduction des émissions de gaz à effet de serre de 55% d\'ici 2030 et de neutralité carbone d\'ici 2050. Elle établit un cadre juridique pour le développement des énergies renouvelables et l\'amélioration de l\'efficacité énergétique dans tous les secteurs de l\'économie.',
      de: 'Dieses Gesetz zielt darauf ab, die Energiewende zu beschleunigen, indem verbindliche Ziele zur Reduzierung der Treibhausgasemissionen um 55% bis 2030 und zur Klimaneutralität bis 2050 festgelegt werden. Es schafft einen rechtlichen Rahmen für die Entwicklung erneuerbarer Energien und die Verbesserung der Energieeffizienz in allen Wirtschaftssektoren.',
      en: 'This law aims to accelerate the energy transition by setting binding targets to reduce greenhouse gas emissions by 55% by 2030 and achieve carbon neutrality by 2050. It establishes a legal framework for the development of renewable energies and improved energy efficiency across all economic sectors.',
    },
    order: 1,
    status: 'published',
    annotations: [],
    stats: {
      annotationsCount: 12,
      participantsCount: 35,
      totalVotes: 48,
      sentiment: {
        positive: 68,
        neutral: 25,
        negative: 7,
      },
    },
    createdAt: '2026-01-05T09:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'art_001_02',
    consultationId: 'leg_001',
    articleNumber: 'Article 2',
    title: {
      fr: 'Énergies renouvelables',
      de: 'Erneuerbare Energien',
      en: 'Renewable Energy',
    },
    content: {
      fr: 'Toute nouvelle construction à usage d\'habitation ou commercial doit intégrer au minimum 30% de sa consommation énergétique annuelle provenant de sources renouvelables (solaire, éolien, géothermique). Les bâtiments publics doivent atteindre 50% d\'ici 2027. Des subventions couvrant jusqu\'à 40% des coûts d\'installation sont mises à disposition pour les particuliers et PME.',
      de: 'Jeder Neubau für Wohn- oder Gewerbezwecke muss mindestens 30% seines jährlichen Energieverbrauchs aus erneuerbaren Quellen (Solar, Wind, Geothermie) beziehen. Öffentliche Gebäude müssen bis 2027 50% erreichen. Subventionen von bis zu 40% der Installationskosten stehen Privatpersonen und KMU zur Verfügung.',
      en: 'All new residential or commercial buildings must integrate at least 30% of their annual energy consumption from renewable sources (solar, wind, geothermal). Public buildings must reach 50% by 2027. Subsidies covering up to 40% of installation costs are available for individuals and SMEs.',
    },
    order: 2,
    status: 'published',
    annotations: [],
    stats: {
      annotationsCount: 18,
      participantsCount: 42,
      totalVotes: 65,
      sentiment: {
        positive: 55,
        neutral: 30,
        negative: 15,
      },
    },
    createdAt: '2026-01-05T09:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'art_001_03',
    consultationId: 'leg_001',
    articleNumber: 'Article 3',
    title: {
      fr: 'Rénovation énergétique',
      de: 'Energetische Sanierung',
      en: 'Energy Renovation',
    },
    content: {
      fr: 'Les propriétaires de bâtiments construits avant 2000 doivent réaliser un audit énergétique avant le 31 décembre 2027 et mettre en œuvre un plan de rénovation permettant d\'améliorer la performance énergétique d\'au moins 40% d\'ici 2030. Un fonds de 500 millions d\'euros est créé pour accompagner financièrement ces travaux.',
      de: 'Eigentümer von vor 2000 errichteten Gebäuden müssen bis zum 31. Dezember 2027 ein Energieaudit durchführen und einen Sanierungsplan umsetzen, der die Energieeffizienz bis 2030 um mindestens 40% verbessert. Ein Fonds von 500 Millionen Euro wird geschaffen, um diese Arbeiten finanziell zu unterstützen.',
      en: 'Owners of buildings constructed before 2000 must complete an energy audit by December 31, 2027 and implement a renovation plan to improve energy performance by at least 40% by 2030. A fund of 500 million euros is created to financially support these works.',
    },
    order: 3,
    status: 'published',
    annotations: [],
    stats: {
      annotationsCount: 23,
      participantsCount: 51,
      totalVotes: 78,
      sentiment: {
        positive: 42,
        neutral: 35,
        negative: 23,
      },
    },
    createdAt: '2026-01-05T09:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z',
  },
  // Articles pour leg_002 - Mobilité urbaine
  {
    id: 'art_002_01',
    consultationId: 'leg_002',
    articleNumber: 'Article 1',
    title: {
      fr: 'Zone à faibles émissions',
      de: 'Emissionsarme Zone',
      en: 'Low Emission Zone',
    },
    content: {
      fr: 'Le centre-ville est désigné comme zone à faibles émissions (ZFE). À partir du 1er janvier 2027, seuls les véhicules respectant les normes Euro 6 ou équivalent électrique/hydrogène peuvent y circuler. Des dérogations temporaires peuvent être accordées pour les véhicules de service public et les résidents sous conditions.',
      de: 'Die Innenstadt wird als emissionsarme Zone (LEZ) ausgewiesen. Ab dem 1. Januar 2027 dürfen nur noch Fahrzeuge, die die Euro-6-Norm oder ein elektrisches/Wasserstoff-Äquivalent erfüllen, dort verkehren. Vorübergehende Ausnahmen können für öffentliche Dienstleistungsfahrzeuge und Anwohner unter Bedingungen gewährt werden.',
      en: 'The city center is designated as a low emission zone (LEZ). From January 1, 2027, only vehicles meeting Euro 6 standards or electric/hydrogen equivalent may circulate. Temporary exemptions may be granted for public service vehicles and residents under conditions.',
    },
    order: 1,
    status: 'published',
    annotations: [],
    stats: {
      annotationsCount: 15,
      participantsCount: 38,
      totalVotes: 52,
      sentiment: {
        positive: 60,
        neutral: 22,
        negative: 18,
      },
    },
    createdAt: '2026-01-08T14:00:00Z',
    updatedAt: '2026-01-12T09:00:00Z',
  },
  {
    id: 'art_002_02',
    consultationId: 'leg_002',
    articleNumber: 'Article 2',
    title: {
      fr: 'Infrastructures cyclables',
      de: 'Fahrradinfrastruktur',
      en: 'Cycling Infrastructure',
    },
    content: {
      fr: 'Toute rue principale du centre-ville doit être équipée de pistes cyclables sécurisées et séparées de la circulation automobile d\'ici 2028. Un réseau continu de 50 km doit être créé, comprenant des stations de réparation publiques tous les 2 km et des parkings à vélos sécurisés à proximité des transports publics.',
      de: 'Jede Hauptstraße in der Innenstadt muss bis 2028 mit sicheren, vom Autoverkehr getrennten Radwegen ausgestattet werden. Ein durchgehendes Netz von 50 km muss geschaffen werden, mit öffentlichen Reparaturstationen alle 2 km und gesicherten Fahrradparkplätzen in der Nähe öffentlicher Verkehrsmittel.',
      en: 'Every main street in the city center must be equipped with secure cycle paths separated from car traffic by 2028. A continuous network of 50 km must be created, including public repair stations every 2 km and secure bike parking near public transport.',
    },
    order: 2,
    status: 'published',
    annotations: [],
    stats: {
      annotationsCount: 19,
      participantsCount: 44,
      totalVotes: 67,
      sentiment: {
        positive: 72,
        neutral: 18,
        negative: 10,
      },
    },
    createdAt: '2026-01-08T14:00:00Z',
    updatedAt: '2026-01-12T09:00:00Z',
  },
];

export const mockArticleAnnotations: ArticleAnnotationDTO[] = [
  // Annotations pour Article 1 de leg_001
  {
    id: 'ann_001',
    articleId: 'art_001_01',
    author: {
      id: 'usr_001',
      firstName: 'Marie',
      lastName: 'Dubois',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      role: 'citizen',
    },
    content: 'L\'objectif de 55% de réduction est ambitieux mais réaliste. Il serait pertinent d\'ajouter des objectifs intermédiaires tous les 5 ans pour assurer un suivi régulier de la progression.',
    position: {
      start: 45,
      end: 142,
      highlightedText: 'objectifs contraignants de réduction des émissions de gaz à effet de serre de 55% d\'ici 2030',
    },
    votes: {
      upvotes: 24,
      downvotes: 3,
      score: 21,
    },
    hasUpvoted: false,
    hasDownvoted: false,
    status: 'highlighted',
    tags: ['objectifs', 'suivi'],
    createdAt: '2026-01-11T14:23:00Z',
    updatedAt: '2026-01-11T14:23:00Z',
  },
  {
    id: 'ann_002',
    articleId: 'art_001_01',
    author: {
      id: 'usr_002',
      firstName: 'Jean',
      lastName: 'Martin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      role: 'citizen',
    },
    content: 'Comment garantir que ces objectifs seront respectés par tous les secteurs économiques ? Il faudrait prévoir des sanctions en cas de non-respect.',
    votes: {
      upvotes: 18,
      downvotes: 7,
      score: 11,
    },
    hasUpvoted: true,
    hasDownvoted: false,
    status: 'published',
    tags: ['sanctions', 'conformité'],
    createdAt: '2026-01-11T15:45:00Z',
    updatedAt: '2026-01-11T15:45:00Z',
  },
  // Annotations pour Article 2 de leg_001
  {
    id: 'ann_003',
    articleId: 'art_001_02',
    author: {
      id: 'usr_003',
      firstName: 'Sophie',
      lastName: 'Bernard',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      role: 'citizen',
    },
    content: 'Les subventions de 40% sont insuffisantes pour les ménages à revenus modestes. Il faudrait envisager un barème progressif allant jusqu\'à 70% pour les plus précaires.',
    position: {
      start: 245,
      end: 337,
      highlightedText: 'Des subventions couvrant jusqu\'à 40% des coûts d\'installation',
    },
    votes: {
      upvotes: 32,
      downvotes: 8,
      score: 24,
    },
    hasUpvoted: false,
    hasDownvoted: false,
    status: 'highlighted',
    tags: ['subventions', 'justice sociale'],
    createdAt: '2026-01-12T09:12:00Z',
    updatedAt: '2026-01-12T09:12:00Z',
  },
  {
    id: 'ann_004',
    articleId: 'art_001_02',
    author: {
      id: 'usr_004',
      firstName: 'Thomas',
      lastName: 'Petit',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      role: 'citizen',
    },
    content: 'Excellente initiative ! Mais il faudrait également simplifier les démarches administratives pour accéder à ces subventions.',
    votes: {
      upvotes: 15,
      downvotes: 2,
      score: 13,
    },
    hasUpvoted: false,
    hasDownvoted: false,
    status: 'published',
    createdAt: '2026-01-12T10:34:00Z',
    updatedAt: '2026-01-12T10:34:00Z',
  },
  // Annotations pour Article 3 de leg_001
  {
    id: 'ann_005',
    articleId: 'art_001_03',
    author: {
      id: 'usr_005',
      firstName: 'Isabelle',
      lastName: 'Fontaine',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop',
      role: 'citizen',
    },
    content: 'Le délai de 2027 pour l\'audit est trop court. Beaucoup de propriétaires ne pourront pas respecter cette échéance. Je propose 2028.',
    position: {
      start: 65,
      end: 126,
      highlightedText: 'réaliser un audit énergétique avant le 31 décembre 2027',
    },
    votes: {
      upvotes: 28,
      downvotes: 12,
      score: 16,
    },
    hasUpvoted: false,
    hasDownvoted: false,
    status: 'published',
    tags: ['délai', 'faisabilité'],
    createdAt: '2026-01-12T11:45:00Z',
    updatedAt: '2026-01-12T11:45:00Z',
  },
  {
    id: 'ann_006',
    articleId: 'art_001_03',
    author: {
      id: 'usr_006',
      firstName: 'Pierre',
      lastName: 'Rousseau',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      role: 'citizen',
    },
    content: 'Le fonds de 500 millions est-il suffisant compte tenu du nombre de bâtiments concernés ? Une étude d\'impact financier serait bienvenue.',
    position: {
      start: 228,
      end: 264,
      highlightedText: 'fonds de 500 millions d\'euros',
    },
    votes: {
      upvotes: 21,
      downvotes: 5,
      score: 16,
    },
    hasUpvoted: true,
    hasDownvoted: false,
    status: 'published',
    tags: ['budget', 'financement'],
    createdAt: '2026-01-12T14:20:00Z',
    updatedAt: '2026-01-12T14:20:00Z',
  },
];

export const mockLegislativeSummaries: LegislativeSummaryDTO[] = [
  {
    id: 'sum_leg_001',
    consultationId: 'leg_001',
    overview: {
      fr: 'Le projet de loi sur la transition énergétique fixe des objectifs ambitieux de réduction des émissions de CO2 et établit un cadre complet pour le développement des énergies renouvelables. La consultation a généré un engagement significatif avec 245 participants et 87 annotations sur 12 articles. Les discussions révèlent un soutien global aux objectifs, mais des préoccupations importantes concernant les délais de mise en œuvre et l\'adéquation des financements.',
      de: 'Der Gesetzentwurf zur Energiewende legt ehrgeizige Ziele zur Reduzierung der CO2-Emissionen fest und schafft einen umfassenden Rahmen für die Entwicklung erneuerbarer Energien. Die Konsultation hat mit 245 Teilnehmern und 87 Anmerkungen zu 12 Artikeln ein erhebliches Engagement erzeugt. Die Diskussionen zeigen eine allgemeine Unterstützung für die Ziele, aber wichtige Bedenken hinsichtlich der Umsetzungsfristen und der Angemessenheit der Finanzierung.',
      en: 'The Energy Transition Bill sets ambitious CO2 emission reduction targets and establishes a comprehensive framework for renewable energy development. The consultation generated significant engagement with 245 participants and 87 annotations across 12 articles. Discussions reveal broad support for the objectives, but significant concerns about implementation timelines and funding adequacy.',
    },
    keyArticles: [
      {
        articleId: 'art_001_01',
        articleNumber: 'Article 1',
        summary: {
          fr: 'Définit les objectifs généraux de réduction de 55% des émissions d\'ici 2030. Les participants soutiennent l\'ambition mais demandent des objectifs intermédiaires et des mécanismes de contrôle renforcés.',
          de: 'Legt die allgemeinen Ziele einer Reduzierung der Emissionen um 55% bis 2030 fest. Die Teilnehmer unterstützen den Ehrgeiz, fordern jedoch Zwischenziele und verstärkte Kontrollmechanismen.',
          en: 'Defines general objectives of 55% emission reduction by 2030. Participants support the ambition but call for intermediate targets and strengthened monitoring mechanisms.',
        },
        controversyLevel: 'low',
        topConcerns: [
          {
            fr: 'Nécessité d\'objectifs intermédiaires',
            de: 'Notwendigkeit von Zwischenzielen',
            en: 'Need for intermediate targets',
          },
          {
            fr: 'Mécanismes de suivi et sanctions',
            de: 'Überwachungs- und Sanktionsmechanismen',
            en: 'Monitoring and penalty mechanisms',
          },
        ],
      },
      {
        articleId: 'art_001_02',
        articleNumber: 'Article 2',
        summary: {
          fr: 'Impose 30% d\'énergies renouvelables pour les nouvelles constructions avec subventions de 40%. Les annotations révèlent des inquiétudes sur l\'accessibilité financière pour les ménages modestes.',
          de: 'Erfordert 30% erneuerbare Energien für Neubauten mit 40% Subventionen. Anmerkungen zeigen Bedenken hinsichtlich der finanziellen Zugänglichkeit für einkommensschwache Haushalte.',
          en: 'Requires 30% renewable energy for new buildings with 40% subsidies. Annotations reveal concerns about financial accessibility for low-income households.',
        },
        controversyLevel: 'medium',
        topConcerns: [
          {
            fr: 'Subventions insuffisantes pour revenus modestes',
            de: 'Unzureichende Subventionen für niedrige Einkommen',
            en: 'Insufficient subsidies for low incomes',
          },
          {
            fr: 'Complexité des démarches administratives',
            de: 'Komplexität der Verwaltungsverfahren',
            en: 'Complexity of administrative procedures',
          },
        ],
      },
      {
        articleId: 'art_001_03',
        articleNumber: 'Article 3',
        summary: {
          fr: 'Exige des audits énergétiques avant 2027 pour les bâtiments anciens. C\'est l\'article le plus controversé avec des préoccupations majeures sur les délais et le budget du fonds de 500M€.',
          de: 'Erfordert Energieaudits vor 2027 für alte Gebäude. Dies ist der umstrittenste Artikel mit großen Bedenken hinsichtlich der Fristen und des Budgets des 500-Millionen-Euro-Fonds.',
          en: 'Requires energy audits before 2027 for old buildings. This is the most controversial article with major concerns about timelines and the 500M€ fund budget.',
        },
        controversyLevel: 'high',
        topConcerns: [
          {
            fr: 'Délai 2027 jugé trop court',
            de: 'Frist 2027 als zu kurz angesehen',
            en: '2027 deadline deemed too short',
          },
          {
            fr: 'Suffisance du fonds de 500M€',
            de: 'Angemessenheit des 500-Millionen-Euro-Fonds',
            en: 'Adequacy of 500M€ fund',
          },
        ],
      },
    ],
    participationInsights: {
      mostDiscussedArticles: ['art_001_03', 'art_001_02', 'art_001_01'],
      commonThemes: [
        {
          fr: 'Justice sociale et accessibilité financière',
          de: 'Soziale Gerechtigkeit und finanzielle Zugänglichkeit',
          en: 'Social justice and financial accessibility',
        },
        {
          fr: 'Faisabilité des délais proposés',
          de: 'Machbarkeit der vorgeschlagenen Fristen',
          en: 'Feasibility of proposed timelines',
        },
        {
          fr: 'Mécanismes de contrôle et sanctions',
          de: 'Kontroll- und Sanktionsmechanismen',
          en: 'Control and penalty mechanisms',
        },
      ],
      sentimentTrend: 'mixed',
    },
    recommendations: [
      {
        fr: 'Envisager un barème progressif de subventions basé sur les revenus des ménages',
        de: 'Erwägung einer progressiven Subventionsskala basierend auf Haushaltseinkommen',
        en: 'Consider a progressive subsidy scale based on household income',
      },
      {
        fr: 'Prolonger le délai pour les audits énergétiques jusqu\'en 2028',
        de: 'Verlängerung der Frist für Energieaudits bis 2028',
        en: 'Extend the deadline for energy audits until 2028',
      },
      {
        fr: 'Ajouter des objectifs intermédiaires tous les 5 ans avec mécanismes de suivi',
        de: 'Hinzufügung von Zwischenzielen alle 5 Jahre mit Überwachungsmechanismen',
        en: 'Add intermediate targets every 5 years with monitoring mechanisms',
      },
      {
        fr: 'Réaliser une étude d\'impact financier détaillée pour le fonds de rénovation',
        de: 'Durchführung einer detaillierten finanziellen Folgenabschätzung für den Renovierungsfonds',
        en: 'Conduct a detailed financial impact study for the renovation fund',
      },
    ],
    generatedAt: '2026-01-13T08:00:00Z',
  },
];

export const mockLegislativeConsultationSummaries: LegislativeConsultationSummaryDTO[] =
  mockLegislativeConsultations.map(lc => ({
    id: lc.id,
    slug: lc.slug,
    title: lc.title,
    textType: lc.textType,
    themeId: lc.themeId,
    status: lc.status,
    startDate: lc.startDate,
    endDate: lc.endDate,
    articlesCount: lc.stats.totalArticles,
    annotationsCount: lc.stats.totalAnnotations,
    participantsCount: lc.stats.totalParticipants,
  }));

// Populate articles in legislative consultations
mockLegislativeConsultations[0].articles = mockArticles.filter(a => a.consultationId === 'leg_001');
mockLegislativeConsultations[1].articles = mockArticles.filter(a => a.consultationId === 'leg_002');

// Populate annotations in articles
mockArticles.forEach(article => {
  article.annotations = mockArticleAnnotations.filter(ann => ann.articleId === article.id);
});

// Populate summary in legislative consultation
mockLegislativeConsultations[0].summary = mockLegislativeSummaries[0];

// ==================== Mock Assemblies ====================

export const mockAssemblies: AssemblyDTO[] = [
  {
    id: 'asm_001',
    slug: 'conseil-citoyen-environnement',
    name: {
      fr: 'Conseil Citoyen pour l\'Environnement',
      de: 'Bürgerrat für Umwelt',
      en: 'Citizens\' Council for the Environment',
    },
    description: {
      fr: 'Instance participative dédiée aux questions environnementales et à la transition écologique de la ville.',
      de: 'Partizipatives Gremium für Umweltfragen und den ökologischen Wandel der Stadt.',
      en: 'Participatory body dedicated to environmental issues and the city\'s ecological transition.',
    },
    themeId: 'env',
    type: 'citizens_council',
    status: 'active',
    foundedDate: '2024-03-01T00:00:00Z',
    totalMembers: 24,
    members: [
      {
        id: 'mem_001',
        user: {
          id: 'usr_005',
          firstName: 'Isabelle',
          lastName: 'Fontaine',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop',
          role: 'Présidente',
        },
        role: 'president',
        joinedAt: '2024-03-01T00:00:00Z',
        bio: {
          fr: 'Ingénieure environnement, engagée dans la transition écologique depuis 15 ans',
          de: 'Umweltingenieurin, seit 15 Jahren im ökologischen Wandel engagiert',
          en: 'Environmental engineer, committed to ecological transition for 15 years',
        },
        expertise: ['énergie renouvelable', 'gestion des déchets', 'biodiversité'],
      },
      {
        id: 'mem_002',
        user: {
          id: 'usr_006',
          firstName: 'Pierre',
          lastName: 'Rousseau',
          avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop',
          role: 'Vice-Président',
        },
        role: 'vice_president',
        joinedAt: '2024-03-01T00:00:00Z',
        bio: {
          fr: 'Agriculteur urbain et formateur en permaculture',
          de: 'Urbaner Landwirt und Ausbilder für Permakultur',
          en: 'Urban farmer and permaculture trainer',
        },
        expertise: ['agriculture urbaine', 'permaculture', 'alimentation durable'],
      },
    ],
    nextMeeting: {
      id: 'meet_001',
      assemblyId: 'asm_001',
      title: {
        fr: 'Séance ordinaire - Janvier 2026',
        de: 'Ordentliche Sitzung - Januar 2026',
        en: 'Regular session - January 2026',
      },
      description: {
        fr: 'Ordre du jour : Bilan des actions 2025, Plan d\'action 2026, Discussion sur le projet de forêt urbaine',
        de: 'Tagesordnung: Bilanz der Maßnahmen 2025, Aktionsplan 2026, Diskussion über das städtische Waldprojekt',
        en: 'Agenda: 2025 actions review, 2026 action plan, Discussion on urban forest project',
      },
      date: '2026-01-22T18:00:00Z',
      duration: 120,
      location: {
        name: 'Maison de la Métropole',
        address: '20 Rue du Lac',
        city: 'Lyon',
        postalCode: '69003',
      },
      isOnline: true,
      onlineLink: 'https://meet.civiagora.fr/conseil-environnement',
      status: 'scheduled',
      agenda: [
        {
          id: 'agi_001',
          title: {
            fr: 'Bilan des actions 2025',
            de: 'Bilanz der Maßnahmen 2025',
            en: '2025 actions review',
          },
          duration: 30,
          order: 1,
          presenter: {
            id: 'usr_005',
            firstName: 'Isabelle',
            lastName: 'Fontaine',
            role: 'Présidente',
          },
        },
        {
          id: 'agi_002',
          title: {
            fr: 'Plan d\'action 2026',
            de: 'Aktionsplan 2026',
            en: '2026 action plan',
          },
          duration: 45,
          order: 2,
        },
        {
          id: 'agi_003',
          title: {
            fr: 'Projet de forêt urbaine - Discussion',
            de: 'Städtisches Waldprojekt - Diskussion',
            en: 'Urban forest project - Discussion',
          },
          duration: 45,
          order: 3,
        },
      ],
      documents: [],
      createdAt: '2026-01-05T00:00:00Z',
    },
    upcomingMeetings: [],
    pastMeetings: [
      {
        id: 'past_meet_001',
        assemblyId: 'asm_001',
        title: 'Séance ordinaire - Décembre 2025',
        date: '2025-12-15T18:00:00Z',
        duration: 120,
        location: {
          name: 'Maison de la Métropole',
          address: '20 Rue du Lac',
          city: 'Lyon',
          postalCode: '69003',
        },
        status: 'completed',
        attendeesCount: 21,
        decisionsCount: 3,
      },
      {
        id: 'past_meet_002',
        assemblyId: 'asm_001',
        title: 'Séance extraordinaire - Novembre 2025',
        date: '2025-11-20T18:00:00Z',
        duration: 90,
        location: {
          name: 'Maison de la Métropole',
          address: '20 Rue du Lac',
          city: 'Lyon',
          postalCode: '69003',
        },
        status: 'completed',
        attendeesCount: 18,
        decisionsCount: 2,
      },
      {
        id: 'past_meet_003',
        assemblyId: 'asm_001',
        title: 'Séance ordinaire - Octobre 2025',
        date: '2025-10-18T18:00:00Z',
        duration: 120,
        location: {
          name: 'Maison de la Métropole',
          address: '20 Rue du Lac',
          city: 'Lyon',
          postalCode: '69003',
        },
        status: 'completed',
        attendeesCount: 22,
        decisionsCount: 4,
      },
    ],
    workingGroups: [
      {
        id: 'wg_001',
        name: {
          fr: 'Groupe Énergie',
          de: 'Energiegruppe',
          en: 'Energy Group',
        },
        description: {
          fr: 'Travail sur la transition énergétique et les énergies renouvelables',
          de: 'Arbeit an der Energiewende und erneuerbaren Energien',
          en: 'Work on energy transition and renewable energies',
        },
        lead: {
          id: 'usr_007',
          firstName: 'Julien',
          lastName: 'Mercier',
          role: 'Responsable',
        },
        members: [
          {
            id: 'usr_008',
            firstName: 'Anne',
            lastName: 'Dupont',
            role: 'Membre',
          },
          {
            id: 'usr_009',
            firstName: 'Marc',
            lastName: 'Simon',
            role: 'Membre',
          },
        ],
        focus: {
          fr: 'Solaire photovoltaïque et éolien urbain',
          de: 'Photovoltaik und städtische Windenergie',
          en: 'Solar photovoltaic and urban wind power',
        },
        status: 'active',
        createdAt: '2024-04-15T00:00:00Z',
      },
      {
        id: 'wg_002',
        name: {
          fr: 'Groupe Biodiversité',
          de: 'Biodiversitätsgruppe',
          en: 'Biodiversity Group',
        },
        description: {
          fr: 'Protection et développement de la biodiversité urbaine',
          de: 'Schutz und Entwicklung der städtischen Biodiversität',
          en: 'Protection and development of urban biodiversity',
        },
        lead: {
          id: 'usr_006',
          firstName: 'Pierre',
          lastName: 'Rousseau',
          role: 'Responsable',
        },
        members: [
          {
            id: 'usr_010',
            firstName: 'Sophie',
            lastName: 'Martin',
            role: 'Membre',
          },
        ],
        focus: {
          fr: 'Corridors écologiques et jardins de pluie',
          de: 'Ökologische Korridore und Regengärten',
          en: 'Ecological corridors and rain gardens',
        },
        status: 'active',
        createdAt: '2024-05-01T00:00:00Z',
      },
    ],
    documents: [],
    stats: {
      totalMeetings: 18,
      totalDecisions: 42,
      averageAttendance: 87.5,
      activeWorkingGroups: 2,
    },
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2026-01-09T00:00:00Z',
    title: undefined
  },
  {
    id: 'asm_002',
    slug: 'comite-budget-participatif',
    name: {
      fr: 'Comité du Budget Participatif',
      de: 'Ausschuss für Bürgerbeteiligung',
      en: 'Participatory Budget Committee',
    },
    description: {
      fr: 'Instance délibérative chargée de la gestion et du suivi du budget participatif citoyen.',
      de: 'Beratungsgremium für die Verwaltung und Überwachung des partizipativen Bürgerhaushalts.',
      en: 'Deliberative body responsible for managing and monitoring the citizen participatory budget.',
    },
    themeId: 'eco',
    type: 'participatory_budget_committee',
    status: 'active',
    foundedDate: '2023-09-15T00:00:00Z',
    totalMembers: 18,
    members: [
      {
        id: 'mem_003',
        user: {
          id: 'usr_011',
          firstName: 'Laurent',
          lastName: 'Petit',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
          role: 'Président',
        },
        role: 'president',
        joinedAt: '2023-09-15T00:00:00Z',
        bio: {
          fr: 'Expert-comptable et ancien conseiller municipal, spécialisé en finances publiques',
          de: 'Buchprüfer und ehemaliger Stadtrat, spezialisiert auf öffentliche Finanzen',
          en: 'Chartered accountant and former city councillor, specialized in public finance',
        },
        expertise: ['finances publiques', 'gestion budgétaire', 'économie locale'],
      },
      {
        id: 'mem_004',
        user: {
          id: 'usr_012',
          firstName: 'Nadia',
          lastName: 'Benali',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
          role: 'Vice-Présidente',
        },
        role: 'vice_president',
        joinedAt: '2023-09-15T00:00:00Z',
        bio: {
          fr: 'Entrepreneure sociale et militante associative depuis 10 ans',
          de: 'Sozialunternehmerin und Vereinsaktivistin seit 10 Jahren',
          en: 'Social entrepreneur and community activist for 10 years',
        },
        expertise: ['économie sociale', 'solidarité', 'innovation sociale'],
      },
    ],
    nextMeeting: {
      id: 'meet_002',
      assemblyId: 'asm_002',
      title: {
        fr: 'Examen des projets citoyens - Session Février',
        de: 'Prüfung der Bürgerprojekte - Sitzung Februar',
        en: 'Citizens Projects Review - February Session',
      },
      description: {
        fr: 'Évaluation et sélection des projets citoyens soumis pour le budget participatif 2026',
        de: 'Bewertung und Auswahl der für den partizipativen Haushalt 2026 eingereichten Bürgerprojekte',
        en: 'Evaluation and selection of citizen projects submitted for the 2026 participatory budget',
      },
      date: '2026-02-05T19:00:00Z',
      duration: 150,
      location: {
        name: 'Salle du Conseil Municipal',
        address: '1 Place de la Mairie',
        city: 'Lyon',
        postalCode: '69001',
      },
      isOnline: true,
      onlineLink: 'https://meet.civiagora.fr/budget-participatif',
      status: 'scheduled',
      agenda: [
        {
          id: 'agi_004',
          title: {
            fr: 'Présentation des 15 projets finalistes',
            de: 'Vorstellung der 15 Finalistenprojekte',
            en: 'Presentation of 15 finalist projects',
          },
          duration: 60,
          order: 1,
        },
        {
          id: 'agi_005',
          title: {
            fr: 'Évaluation technique et financière',
            de: 'Technische und finanzielle Bewertung',
            en: 'Technical and financial evaluation',
          },
          duration: 60,
          order: 2,
        },
        {
          id: 'agi_006',
          title: {
            fr: 'Vote de présélection',
            de: 'Vorauswahlabstimmung',
            en: 'Pre-selection vote',
          },
          duration: 30,
          order: 3,
        },
      ],
      documents: [],
      createdAt: '2026-01-03T00:00:00Z',
    },
    upcomingMeetings: [],
    pastMeetings: [
      {
        id: 'past_meet_004',
        assemblyId: 'asm_002',
        title: 'Session extraordinaire - Décembre 2025',
        date: '2025-12-10T19:00:00Z',
        duration: 150,
        location: {
          name: 'Salle du Conseil Municipal',
          address: '1 Place de la Mairie',
          city: 'Lyon',
          postalCode: '69001',
        },
        status: 'completed',
        attendeesCount: 17,
        decisionsCount: 5,
      },
      {
        id: 'past_meet_005',
        assemblyId: 'asm_002',
        title: 'Examen budget 2026 - Novembre 2025',
        date: '2025-11-15T19:00:00Z',
        duration: 180,
        location: {
          name: 'Salle du Conseil Municipal',
          address: '1 Place de la Mairie',
          city: 'Lyon',
          postalCode: '69001',
        },
        status: 'completed',
        attendeesCount: 16,
        decisionsCount: 8,
      },
    ],
    workingGroups: [
      {
        id: 'wg_003',
        name: {
          fr: 'Commission Évaluation',
          de: 'Bewertungskommission',
          en: 'Evaluation Commission',
        },
        description: {
          fr: 'Analyse technique et financière des projets soumis',
          de: 'Technische und finanzielle Analyse der eingereichten Projekte',
          en: 'Technical and financial analysis of submitted projects',
        },
        lead: {
          id: 'usr_013',
          firstName: 'Philippe',
          lastName: 'Garnier',
          role: 'Responsable',
        },
        members: [
          {
            id: 'usr_014',
            firstName: 'Céline',
            lastName: 'Morel',
            role: 'Membre',
          },
        ],
        focus: {
          fr: 'Faisabilité technique et estimation budgétaire',
          de: 'Technische Machbarkeit und Budgetschätzung',
          en: 'Technical feasibility and budget estimation',
        },
        status: 'active',
        createdAt: '2023-10-01T00:00:00Z',
      },
    ],
    documents: [],
    stats: {
      totalMeetings: 24,
      totalDecisions: 86,
      averageAttendance: 92.3,
      activeWorkingGroups: 1,
    },
    createdAt: '2023-09-15T00:00:00Z',
    updatedAt: '2026-01-09T00:00:00Z',
  },
  {
    id: 'asm_003',
    slug: 'conseil-quartier-mobilite',
    name: {
      fr: 'Conseil de Quartier - Mobilités Douces',
      de: 'Stadtteilrat - Sanfte Mobilität',
      en: 'Neighborhood Council - Soft Mobility',
    },
    description: {
      fr: 'Conseil de quartier dédié aux enjeux de mobilité douce, piétonnisation et partage de l\'espace public.',
      de: 'Stadtteilrat für sanfte Mobilität, Fußgängerzonen und gemeinsame Nutzung des öffentlichen Raums.',
      en: 'Neighborhood council dedicated to soft mobility, pedestrianization and public space sharing.',
    },
    themeId: 'urb',
    type: 'neighborhood_council',
    status: 'active',
    foundedDate: '2024-06-01T00:00:00Z',
    totalMembers: 15,
    members: [
      {
        id: 'mem_005',
        user: {
          id: 'usr_015',
          firstName: 'Amandine',
          lastName: 'Leclerc',
          avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop',
          role: 'Présidente',
        },
        role: 'president',
        joinedAt: '2024-06-01T00:00:00Z',
        bio: {
          fr: 'Architecte urbaniste spécialisée en aménagement d\'espaces publics',
          de: 'Stadtplanerin spezialisiert auf öffentliche Raumgestaltung',
          en: 'Urban architect specialized in public space planning',
        },
        expertise: ['urbanisme', 'mobilité urbaine', 'espaces publics'],
      },
      {
        id: 'mem_006',
        user: {
          id: 'usr_016',
          firstName: 'David',
          lastName: 'Charpentier',
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
          role: 'Vice-Président',
        },
        role: 'vice_president',
        joinedAt: '2024-06-01T00:00:00Z',
        bio: {
          fr: 'Cycliste quotidien et membre actif d\'associations de promotion du vélo',
          de: 'Täglicher Radfahrer und aktives Mitglied von Fahrradförderungsvereinen',
          en: 'Daily cyclist and active member of cycling promotion associations',
        },
        expertise: ['vélo', 'sécurité routière', 'mobilité douce'],
      },
    ],
    nextMeeting: {
      id: 'meet_003',
      assemblyId: 'asm_003',
      title: {
        fr: 'Réunion mensuelle - Janvier 2026',
        de: 'Monatliche Sitzung - Januar 2026',
        en: 'Monthly meeting - January 2026',
      },
      description: {
        fr: 'Suivi du projet de zone piétonne et discussion sur l\'extension du réseau cyclable',
        de: 'Nachverfolgung des Fußgängerzonenprojekts und Diskussion über den Ausbau des Radwegenetzes',
        en: 'Follow-up on pedestrian zone project and discussion on cycling network extension',
      },
      date: '2026-01-18T17:30:00Z',
      duration: 90,
      location: {
        name: 'Centre Social du Quartier',
        address: '45 Avenue de la République',
        city: 'Lyon',
        postalCode: '69002',
      },
      isOnline: false,
      status: 'scheduled',
      agenda: [
        {
          id: 'agi_007',
          title: {
            fr: 'Avancement zone piétonne rue Mercière',
            de: 'Fortschritt der Fußgängerzone Rue Mercière',
            en: 'Progress on Mercière Street pedestrian zone',
          },
          duration: 40,
          order: 1,
          presenter: {
            id: 'usr_015',
            firstName: 'Amandine',
            lastName: 'Leclerc',
            role: 'Présidente',
          },
        },
        {
          id: 'agi_008',
          title: {
            fr: 'Extension pistes cyclables - Concertation',
            de: 'Ausbau Radwege - Beratung',
            en: 'Cycle paths extension - Consultation',
          },
          duration: 50,
          order: 2,
        },
      ],
      documents: [],
      createdAt: '2026-01-04T00:00:00Z',
    },
    upcomingMeetings: [],
    pastMeetings: [
      {
        id: 'past_meet_006',
        assemblyId: 'asm_003',
        title: 'Réunion mensuelle - Décembre 2025',
        date: '2025-12-18T17:30:00Z',
        duration: 90,
        location: {
          name: 'Centre Social du Quartier',
          address: '45 Avenue de la République',
          city: 'Lyon',
          postalCode: '69002',
        },
        status: 'completed',
        attendeesCount: 13,
        decisionsCount: 2,
      },
      {
        id: 'past_meet_007',
        assemblyId: 'asm_003',
        title: 'Réunion mensuelle - Novembre 2025',
        date: '2025-11-16T17:30:00Z',
        duration: 90,
        location: {
          name: 'Centre Social du Quartier',
          address: '45 Avenue de la République',
          city: 'Lyon',
          postalCode: '69002',
        },
        status: 'completed',
        attendeesCount: 14,
        decisionsCount: 3,
      },
    ],
    workingGroups: [
      {
        id: 'wg_004',
        name: {
          fr: 'Groupe Vélo',
          de: 'Fahrradgruppe',
          en: 'Cycling Group',
        },
        description: {
          fr: 'Développement des infrastructures cyclables et services vélo',
          de: 'Entwicklung von Radinfrastruktur und Fahrraddienstleistungen',
          en: 'Development of cycling infrastructure and bike services',
        },
        lead: {
          id: 'usr_016',
          firstName: 'David',
          lastName: 'Charpentier',
          role: 'Responsable',
        },
        members: [
          {
            id: 'usr_017',
            firstName: 'Emma',
            lastName: 'Bernard',
            role: 'Membre',
          },
          {
            id: 'usr_018',
            firstName: 'Lucas',
            lastName: 'Girard',
            role: 'Membre',
          },
        ],
        focus: {
          fr: 'Pistes cyclables sécurisées et stationnements vélo',
          de: 'Sichere Radwege und Fahrradparkplätze',
          en: 'Safe bike lanes and bicycle parking',
        },
        status: 'active',
        createdAt: '2024-07-01T00:00:00Z',
      },
      {
        id: 'wg_005',
        name: {
          fr: 'Groupe Piétons',
          de: 'Fußgängergruppe',
          en: 'Pedestrians Group',
        },
        description: {
          fr: 'Amélioration des cheminements piétons et accessibilité',
          de: 'Verbesserung von Fußwegen und Barrierefreiheit',
          en: 'Improvement of pedestrian pathways and accessibility',
        },
        lead: {
          id: 'usr_015',
          firstName: 'Amandine',
          lastName: 'Leclerc',
          role: 'Responsable',
        },
        members: [
          {
            id: 'usr_019',
            firstName: 'Marie',
            lastName: 'Leroy',
            role: 'Membre',
          },
        ],
        focus: {
          fr: 'Zones piétonnes et trottoirs élargis',
          de: 'Fußgängerzonen und breitere Bürgersteige',
          en: 'Pedestrian zones and widened sidewalks',
        },
        status: 'active',
        createdAt: '2024-07-01T00:00:00Z',
      },
    ],
    documents: [],
    stats: {
      totalMeetings: 8,
      totalDecisions: 19,
      averageAttendance: 83.7,
      activeWorkingGroups: 2,
    },
    createdAt: '2024-06-01T00:00:00Z',
    updatedAt: '2026-01-09T00:00:00Z',
  },
  {
    id: 'asm_004',
    slug: 'conseil-jeunes-education',
    name: {
      fr: 'Conseil Municipal des Jeunes',
      de: 'Jugendgemeinderat',
      en: 'Youth Municipal Council',
    },
    description: {
      fr: 'Instance de participation démocratique pour les jeunes de 14 à 25 ans sur les questions d\'éducation, culture et vie citoyenne.',
      de: 'Demokratisches Beteiligungsgremium für junge Menschen von 14 bis 25 Jahren zu Bildungs-, Kultur- und Bürgerfragen.',
      en: 'Democratic participation body for young people aged 14 to 25 on education, culture and civic life issues.',
    },
    themeId: 'edu',
    type: 'youth_council',
    status: 'active',
    foundedDate: '2023-01-10T00:00:00Z',
    totalMembers: 21,
    members: [
      {
        id: 'mem_007',
        user: {
          id: 'usr_020',
          firstName: 'Léa',
          lastName: 'Martinez',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
          role: 'Présidente',
        },
        role: 'president',
        joinedAt: '2024-09-01T00:00:00Z',
        bio: {
          fr: 'Étudiante en sciences politiques, engagée dans le mouvement lycéen',
          de: 'Studentin der Politikwissenschaft, engagiert in der Schülerbewegung',
          en: 'Political science student, involved in the high school movement',
        },
        expertise: ['participation jeunesse', 'éducation', 'engagement citoyen'],
      },
      {
        id: 'mem_008',
        user: {
          id: 'usr_021',
          firstName: 'Noah',
          lastName: 'Lefebvre',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
          role: 'Vice-Président',
        },
        role: 'vice_president',
        joinedAt: '2024-09-01T00:00:00Z',
        bio: {
          fr: 'Apprenti en communication, passionné de culture et d\'événementiel',
          de: 'Auszubildender in Kommunikation, begeistert von Kultur und Eventmanagement',
          en: 'Communication apprentice, passionate about culture and event management',
        },
        expertise: ['événementiel', 'culture', 'médias sociaux'],
      },
    ],
    nextMeeting: {
      id: 'meet_004',
      assemblyId: 'asm_004',
      title: {
        fr: 'Assemblée Plénière - Janvier 2026',
        de: 'Vollversammlung - Januar 2026',
        en: 'Plenary Assembly - January 2026',
      },
      description: {
        fr: 'Organisation du festival culturel de printemps et lancement du projet "Jeunes Ambassadeurs"',
        de: 'Organisation des Frühlingskulturfestivals und Start des Projekts "Junge Botschafter"',
        en: 'Organization of spring cultural festival and launch of "Young Ambassadors" project',
      },
      date: '2026-01-25T14:00:00Z',
      duration: 120,
      location: {
        name: 'Maison des Jeunes',
        address: '12 Rue des Écoles',
        city: 'Lyon',
        postalCode: '69003',
      },
      isOnline: true,
      onlineLink: 'https://meet.civiagora.fr/conseil-jeunes',
      status: 'scheduled',
      agenda: [
        {
          id: 'agi_009',
          title: {
            fr: 'Festival culturel de printemps - Planning',
            de: 'Frühlingskulturfestival - Planung',
            en: 'Spring cultural festival - Planning',
          },
          duration: 50,
          order: 1,
          presenter: {
            id: 'usr_021',
            firstName: 'Noah',
            lastName: 'Lefebvre',
            role: 'Vice-Président',
          },
        },
        {
          id: 'agi_010',
          title: {
            fr: 'Projet "Jeunes Ambassadeurs" - Présentation',
            de: 'Projekt "Junge Botschafter" - Präsentation',
            en: '"Young Ambassadors" project - Presentation',
          },
          duration: 40,
          order: 2,
        },
        {
          id: 'agi_011',
          title: {
            fr: 'Questions diverses et propositions',
            de: 'Verschiedene Fragen und Vorschläge',
            en: 'Miscellaneous questions and proposals',
          },
          duration: 30,
          order: 3,
        },
      ],
      documents: [],
      createdAt: '2026-01-06T00:00:00Z',
    },
    upcomingMeetings: [],
    pastMeetings: [
      {
        id: 'past_meet_008',
        assemblyId: 'asm_004',
        title: 'Assemblée Plénière - Décembre 2025',
        date: '2025-12-14T14:00:00Z',
        duration: 120,
        location: {
          name: 'Maison des Jeunes',
          address: '12 Rue des Écoles',
          city: 'Lyon',
          postalCode: '69003',
        },
        status: 'completed',
        attendeesCount: 19,
        decisionsCount: 4,
      },
      {
        id: 'past_meet_009',
        assemblyId: 'asm_004',
        title: 'Réunion de travail - Novembre 2025',
        date: '2025-11-09T14:00:00Z',
        duration: 90,
        location: {
          name: 'Maison des Jeunes',
          address: '12 Rue des Écoles',
          city: 'Lyon',
          postalCode: '69003',
        },
        status: 'completed',
        attendeesCount: 16,
        decisionsCount: 2,
      },
    ],
    workingGroups: [
      {
        id: 'wg_006',
        name: {
          fr: 'Commission Culture & Événements',
          de: 'Kommission Kultur & Veranstaltungen',
          en: 'Culture & Events Commission',
        },
        description: {
          fr: 'Organisation d\'événements culturels et de loisirs pour les jeunes',
          de: 'Organisation kultureller und Freizeitveranstaltungen für junge Menschen',
          en: 'Organization of cultural and leisure events for young people',
        },
        lead: {
          id: 'usr_021',
          firstName: 'Noah',
          lastName: 'Lefebvre',
          role: 'Responsable',
        },
        members: [
          {
            id: 'usr_022',
            firstName: 'Chloé',
            lastName: 'Dubois',
            role: 'Membre',
          },
          {
            id: 'usr_023',
            firstName: 'Hugo',
            lastName: 'Roux',
            role: 'Membre',
          },
        ],
        focus: {
          fr: 'Festivals, concerts et expositions jeunesse',
          de: 'Festivals, Konzerte und Jugendausstellungen',
          en: 'Youth festivals, concerts and exhibitions',
        },
        status: 'active',
        createdAt: '2023-03-01T00:00:00Z',
      },
      {
        id: 'wg_007',
        name: {
          fr: 'Commission Éducation & Orientation',
          de: 'Kommission Bildung & Beratung',
          en: 'Education & Guidance Commission',
        },
        description: {
          fr: 'Amélioration des services d\'orientation et d\'accompagnement scolaire',
          de: 'Verbesserung der Beratungs- und Schulbegleitungsdienste',
          en: 'Improvement of guidance and school support services',
        },
        lead: {
          id: 'usr_020',
          firstName: 'Léa',
          lastName: 'Martinez',
          role: 'Responsable',
        },
        members: [
          {
            id: 'usr_024',
            firstName: 'Maxime',
            lastName: 'Blanc',
            role: 'Membre',
          },
        ],
        focus: {
          fr: 'Soutien scolaire et information sur l\'orientation',
          de: 'Schulunterstützung und Beratung zur Orientierung',
          en: 'School support and guidance information',
        },
        status: 'active',
        createdAt: '2023-03-01T00:00:00Z',
      },
    ],
    documents: [],
    stats: {
      totalMeetings: 32,
      totalDecisions: 78,
      averageAttendance: 79.4,
      activeWorkingGroups: 2,
    },
    createdAt: '2023-01-10T00:00:00Z',
    updatedAt: '2026-01-09T00:00:00Z',
  },
];

export const mockAssemblySummaries: AssemblySummaryDTO[] = mockAssemblies.map(a => ({
  id: a.id,
  slug: a.slug,
  name: a.name,
  themeId: a.themeId,
  type: a.type,
  totalMembers: a.totalMembers,
  nextMeetingDate: a.nextMeeting?.date,
}));

// ==================== Mock Conferences ====================

export const mockSpeakers: SpeakerDTO[] = [
  {
    id: 'spk_001',
    firstName: 'Jean',
    lastName: 'Jouzel',
    title: {
      fr: 'Climatologue, Vice-Président du GIEC',
      de: 'Klimatologe, Vizepräsident des IPCC',
      en: 'Climatologist, Vice-President of the IPCC',
    },
    organization: 'CNRS',
    bio: {
      fr: 'Climatologue français, ancien vice-président du GIEC, médaille d\'or du CNRS. Expert reconnu du réchauffement climatique.',
      de: 'Französischer Klimatologe, ehemaliger Vizepräsident des IPCC, CNRS-Goldmedaillenträger. Anerkannter Experte für globale Erwärmung.',
      en: 'French climatologist, former vice-president of the IPCC, CNRS gold medal. Recognized expert on global warming.',
    },
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop',
    expertise: ['climatologie', 'glaciologie', 'changement climatique'],
    socialLinks: {
      website: 'https://exemple.fr/jean-jouzel',
    },
    sessions: ['ses_001', 'ses_002'],
  },
  {
    id: 'spk_002',
    firstName: 'Valérie',
    lastName: 'Masson-Delmotte',
    title: {
      fr: 'Paléoclimatologue, Co-présidente du GIEC',
      de: 'Paläoklimatologin, Co-Vorsitzende des IPCC',
      en: 'Paleoclimatologist, Co-Chair of the IPCC',
    },
    organization: 'CEA',
    bio: {
      fr: 'Directrice de recherche au CEA, co-présidente du groupe de travail I du GIEC. Spécialiste des climats passés et du changement climatique.',
      de: 'Forschungsdirektorin am CEA, Co-Vorsitzende der Arbeitsgruppe I des IPCC. Spezialistin für vergangene Klimate und Klimawandel.',
      en: 'Research director at CEA, co-chair of IPCC Working Group I. Specialist in past climates and climate change.',
    },
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop',
    expertise: ['paléoclimatologie', 'climat', 'glaciologie'],
    socialLinks: {
      twitter: '@valmasdel',
    },
    sessions: ['ses_001', 'ses_003'],
  },
  {
    id: 'spk_003',
    firstName: 'Marie',
    lastName: 'Dubois',
    title: {
      fr: 'Experte en Économie Circulaire',
      de: 'Expertin für Kreislaufwirtschaft',
      en: 'Circular Economy Expert',
    },
    organization: 'Institut d\'Économie Durable',
    bio: {
      fr: 'Dr. Marie Dubois est une pionnière reconnue de l\'économie circulaire en Europe francophone. Avec plus de 20 ans d\'expérience, elle accompagne les entreprises et collectivités dans leur transformation vers des modèles économiques durables.',
      de: 'Dr. Marie Dubois ist eine anerkannte Pionierin der Kreislaufwirtschaft im frankophonen Europa. Mit über 20 Jahren Erfahrung begleitet sie Unternehmen und Gemeinden bei ihrer Transformation zu nachhaltigen Wirtschaftsmodellen.',
      en: 'Dr. Marie Dubois is a recognized pioneer of the circular economy in Francophone Europe. With over 20 years of experience, she supports companies and communities in their transformation to sustainable economic models.',
    },
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop',
    expertise: ['économie circulaire', 'gestion des déchets', 'écoconception', 'durabilité'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/mariedubois',
      twitter: '@dr_dubois_eco',
      website: 'https://mariedubois-research.com',
    },
    sessions: [],
  },
  {
    id: 'spk_004',
    firstName: 'Sophie',
    lastName: 'Laurent',
    title: {
      fr: 'Professeure en Écologie Industrielle',
      de: 'Professorin für Industrielle Ökologie',
      en: 'Professor of Industrial Ecology',
    },
    organization: 'Université de Lausanne',
    bio: {
      fr: 'Prof. Sophie Laurent est titulaire de la Chaire d\'Écologie Industrielle à l\'Université de Lausanne. Ses recherches portent sur l\'analyse de cycle de vie, l\'écoconception et les stratégies de décarbonation industrielle.',
      de: 'Prof. Sophie Laurent ist Inhaberin des Lehrstuhls für Industrielle Ökologie an der Universität Lausanne. Ihre Forschung konzentriert sich auf Lebenszyklusanalyse, Ökodesign und industrielle Dekarbonisierungsstrategien.',
      en: 'Prof. Sophie Laurent holds the Chair of Industrial Ecology at the University of Lausanne. Her research focuses on life cycle analysis, eco-design and industrial decarbonization strategies.',
    },
    avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=150&h=150&fit=crop',
    expertise: ['écologie industrielle', 'analyse de cycle de vie', 'écoconception', 'décarbonation'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sophielaurent',
      twitter: '@prof_slaurent',
      website: 'https://unil.ch/ecologie-industrielle',
    },
    sessions: [],
  },
  {
    id: 'spk_005',
    firstName: 'Pierre',
    lastName: 'Renaud',
    title: {
      fr: 'Médecin & Expert en Santé Publique',
      de: 'Arzt & Experte für öffentliche Gesundheit',
      en: 'Physician & Public Health Expert',
    },
    organization: 'Centre Hospitalier Universitaire Vaudois (CHUV)',
    bio: {
      fr: 'Dr. Pierre Renaud est médecin infectiologue et expert en santé publique au CHUV. Il dirige le département de médecine préventive et coordonne les programmes de vaccination et de prévention des maladies infectieuses.',
      de: 'Dr. Pierre Renaud ist Infektiologe und Experte für öffentliche Gesundheit am CHUV. Er leitet die Abteilung für Präventivmedizin und koordiniert Impf- und Infektionskrankheitspräventionsprogramme.',
      en: 'Dr. Pierre Renaud is an infectious disease physician and public health expert at CHUV. He heads the preventive medicine department and coordinates vaccination and infectious disease prevention programs.',
    },
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop',
    expertise: ['infectiologie', 'épidémiologie', 'médecine préventive', 'santé publique', 'vaccination'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/pierrerenaud',
    },
    sessions: [],
  },
  {
    id: 'spk_006',
    firstName: 'Isabelle',
    lastName: 'Chen',
    title: {
      fr: 'Chercheuse en Neurosciences & Santé Mentale',
      de: 'Forscherin für Neurowissenschaften & psychische Gesundheit',
      en: 'Neuroscience & Mental Health Researcher',
    },
    organization: 'Institut des Neurosciences de Genève',
    bio: {
      fr: 'Dr. Isabelle Chen est une chercheuse de renommée internationale spécialisée en neurosciences cognitives et santé mentale. Ses travaux portent sur les mécanismes cérébraux du stress et de l\'anxiété.',
      de: 'Dr. Isabelle Chen ist eine international renommierte Forscherin, spezialisiert auf kognitive Neurowissenschaften und psychische Gesundheit. Ihre Arbeit konzentriert sich auf die Gehirnmechanismen von Stress und Angst.',
      en: 'Dr. Isabelle Chen is an internationally renowned researcher specializing in cognitive neuroscience and mental health. Her work focuses on the brain mechanisms of stress and anxiety.',
    },
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop',
    expertise: ['neurosciences cognitives', 'santé mentale', 'gestion du stress', 'neuroplasticité'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/isabellechen',
      twitter: '@dr_ichen',
      website: 'https://neurosciences.unige.ch/chen-lab',
    },
    sessions: [],
  },
];

export const mockConferences: ConferenceDTO[] = [
  {
    id: 'conf_001',
    slug: 'forum-climat-2026',
    title: {
      fr: 'Forum Climat 2026 - Agir Ensemble',
      de: 'Klimaforum 2026 - Gemeinsam Handeln',
      en: 'Climate Forum 2026 - Acting Together',
    },
    description: {
      fr: 'Deux jours de conférences, ateliers et rencontres autour des enjeux climatiques et des solutions locales.',
      de: 'Zwei Tage Konferenzen, Workshops und Treffen rund um Klimafragen und lokale Lösungen.',
      en: 'Two days of conferences, workshops and meetings around climate issues and local solutions.',
    },
    themeId: 'env',
    status: 'registration_open',
    startDate: '2026-03-15T08:00:00Z',
    endDate: '2026-03-16T18:00:00Z',
    location: {
      name: 'Palais des Congrès de Lyon',
      address: '50 Quai Charles de Gaulle',
      city: 'Lyon',
      postalCode: '69006',
      coordinates: {
        lat: 45.7831,
        lng: 4.8544,
      },
    },
    isHybrid: true,
    onlineLink: 'https://live.civiagora.fr/forum-climat-2026',
    capacity: 500,
    registeredCount: 342,
    speakers: mockSpeakers,
    sessions: [
      {
        id: 'ses_001',
        conferenceId: 'conf_001',
        title: {
          fr: 'Conférence d\'ouverture : L\'urgence climatique',
          de: 'Eröffnungsvortrag: Der Klimanotstand',
          en: 'Opening conference: The climate emergency',
        },
        description: {
          fr: 'État des lieux scientifique du changement climatique et des enjeux pour nos territoires.',
          de: 'Wissenschaftlicher Stand des Klimawandels und Herausforderungen für unsere Regionen.',
          en: 'Scientific state of climate change and challenges for our territories.',
        },
        type: 'keynote',
        date: '2026-03-15T09:00:00Z',
        startTime: '09:00',
        endTime: '10:30',
        duration: 90,
        room: 'Grand Amphithéâtre',
        speakers: [mockSpeakers[0], mockSpeakers[1]],
        capacity: 500,
        registeredCount: 342,
        isRecorded: true,
        tags: ['climat', 'science', 'urgence'],
      },
      {
        id: 'ses_002',
        conferenceId: 'conf_001',
        title: {
          fr: 'Atelier : Solutions énergétiques locales',
          de: 'Workshop: Lokale Energielösungen',
          en: 'Workshop: Local energy solutions',
        },
        description: {
          fr: 'Découverte des initiatives locales en matière d\'énergies renouvelables.',
          de: 'Entdeckung lokaler Initiativen im Bereich erneuerbare Energien.',
          en: 'Discovery of local initiatives in renewable energy.',
        },
        type: 'workshop',
        date: '2026-03-15T11:00:00Z',
        startTime: '11:00',
        endTime: '12:30',
        duration: 90,
        room: 'Salle A',
        speakers: [],
        capacity: 50,
        registeredCount: 38,
        isRecorded: false,
        tags: ['énergie', 'renouvelable', 'local'],
      },
    ],
    sponsors: [
      {
        id: 'spo_001',
        name: 'Métropole de Lyon',
        logo: '/logos/metropole-lyon.svg',
        tier: 'platinum',
        website: 'https://www.grandlyon.com',
      },
      {
        id: 'spo_002',
        name: 'Région Auvergne-Rhône-Alpes',
        logo: '/logos/region-ara.svg',
        tier: 'gold',
        website: 'https://www.auvergnerhonealpes.fr',
      },
    ],
    organizer: {
      id: 'org_001',
      name: {
        fr: 'Ville de Lyon',
        de: 'Stadt Lyon',
        en: 'City of Lyon',
      },
      type: 'municipal',
      logo: '/logos/ville-lyon.svg',
      website: 'https://www.lyon.fr',
    },
    registrationDeadline: '2026-03-10T23:59:59Z',
    tags: ['climat', 'environnement', 'transition'],
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&h=600&fit=crop',
    ],
    documents: [],
    agenda: [
      {
        date: '2026-03-15T00:00:00Z',
        sessions: [
          {
            id: 'ses_001',
            conferenceId: 'conf_001',
            title: {
              fr: 'Conférence d\'ouverture : L\'urgence climatique',
              de: 'Eröffnungsvortrag: Der Klimanotstand',
              en: 'Opening conference: The climate emergency',
            },
            description: {
              fr: 'État des lieux scientifique du changement climatique.',
              de: 'Wissenschaftlicher Stand des Klimawandels.',
              en: 'Scientific state of climate change.',
            },
            type: 'keynote',
            date: '2026-03-15T09:00:00Z',
            startTime: '09:00',
            endTime: '10:30',
            duration: 90,
            room: 'Grand Amphithéâtre',
            speakers: [mockSpeakers[0], mockSpeakers[1]],
            isRecorded: true,
            tags: ['climat'],
          },
        ],
      },
    ],
    hasRegistered: false,
    createdAt: '2025-11-01T00:00:00Z',
    updatedAt: '2026-01-09T00:00:00Z',
  },
  {
    id: 'conf_002',
    slug: 'innovation-democratique-locale',
    title: {
      fr: 'Innovation Démocratique Locale',
      de: 'Lokale demokratische Innovation',
      en: 'Local Democratic Innovation',
    },
    description: {
      fr: 'Journée de rencontres et d\'échanges sur les nouvelles pratiques de participation citoyenne et de démocratie locale.',
      de: 'Tag der Begegnungen und Austausch über neue Praktiken der Bürgerbeteiligung und lokalen Demokratie.',
      en: 'Day of meetings and exchanges on new practices of citizen participation and local democracy.',
    },
    themeId: 'soc',
    status: 'registration_open',
    startDate: '2026-02-22T09:00:00Z',
    endDate: '2026-02-22T18:00:00Z',
    location: {
      name: 'Hôtel de Ville de Lyon',
      address: '1 Place de la Comédie',
      city: 'Lyon',
      postalCode: '69001',
      coordinates: {
        lat: 45.7675,
        lng: 4.8357,
      },
    },
    isHybrid: true,
    onlineLink: 'https://live.civiagora.fr/innovation-democratique',
    capacity: 200,
    registeredCount: 156,
    speakers: [mockSpeakers[2]],
    sessions: [
      {
        id: 'ses_demo_001',
        conferenceId: 'conf_002',
        title: {
          fr: 'Table ronde : Réinventer la démocratie participative',
          de: 'Podiumsdiskussion: Partizipative Demokratie neu erfinden',
          en: 'Round table: Reinventing participatory democracy',
        },
        description: {
          fr: 'Retours d\'expérience de collectivités pionnières en matière de participation citoyenne.',
          de: 'Erfahrungsberichte von Pioniergemeinden in Sachen Bürgerbeteiligung.',
          en: 'Feedback from pioneering communities in citizen participation.',
        },
        type: 'panel',
        date: '2026-02-22T10:00:00Z',
        startTime: '10:00',
        endTime: '11:30',
        duration: 90,
        room: 'Salle des Conférences',
        speakers: [mockSpeakers[2]],
        capacity: 200,
        registeredCount: 156,
        isRecorded: true,
        tags: ['démocratie', 'participation', 'innovation'],
      },
      {
        id: 'ses_demo_002',
        conferenceId: 'conf_002',
        title: {
          fr: 'Atelier pratique : Organiser une consultation citoyenne',
          de: 'Praktischer Workshop: Eine Bürgerkonsultation organisieren',
          en: 'Practical workshop: Organizing a citizen consultation',
        },
        description: {
          fr: 'Méthodologie et outils pour organiser une consultation citoyenne réussie.',
          de: 'Methodik und Werkzeuge zur Organisation einer erfolgreichen Bürgerkonsultation.',
          en: 'Methodology and tools to organize a successful citizen consultation.',
        },
        type: 'workshop',
        date: '2026-02-22T14:00:00Z',
        startTime: '14:00',
        endTime: '16:00',
        duration: 120,
        room: 'Salle de Réunion 1',
        speakers: [],
        capacity: 40,
        registeredCount: 35,
        isRecorded: false,
        tags: ['méthode', 'consultation', 'pratique'],
      },
    ],
    sponsors: [
      {
        id: 'spo_003',
        name: 'Ministère de la Cohésion des Territoires',
        logo: '/logos/ministere-territoires.svg',
        tier: 'platinum',
        website: 'https://www.cohesion-territoires.gouv.fr',
      },
    ],
    organizer: {
      id: 'org_001',
      name: {
        fr: 'Ville de Lyon',
        de: 'Stadt Lyon',
        en: 'City of Lyon',
      },
      type: 'municipal',
      logo: '/logos/ville-lyon.svg',
      website: 'https://www.lyon.fr',
    },
    registrationDeadline: '2026-02-20T23:59:59Z',
    tags: ['démocratie', 'participation', 'innovation', 'local'],
    images: [
      'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&h=600&fit=crop',
    ],
    documents: [],
    agenda: [
      {
        date: '2026-02-22T00:00:00Z',
        sessions: [
          {
            id: 'ses_demo_001',
            conferenceId: 'conf_002',
            title: {
              fr: 'Table ronde : Réinventer la démocratie participative',
              de: 'Podiumsdiskussion: Partizipative Demokratie neu erfinden',
              en: 'Round table: Reinventing participatory democracy',
            },
            description: {
              fr: 'Retours d\'expérience de collectivités pionnières.',
              de: 'Erfahrungsberichte von Pioniergemeinden.',
              en: 'Feedback from pioneering communities.',
            },
            type: 'panel',
            date: '2026-02-22T10:00:00Z',
            startTime: '10:00',
            endTime: '11:30',
            duration: 90,
            room: 'Salle des Conférences',
            speakers: [mockSpeakers[2]],
            isRecorded: true,
            tags: ['démocratie'],
          },
        ],
      },
    ],
    hasRegistered: false,
    createdAt: '2025-12-01T00:00:00Z',
    updatedAt: '2026-01-09T00:00:00Z',
  },
  {
    id: 'conf_003',
    slug: 'assises-economie-circulaire',
    title: {
      fr: 'Assises de l\'Économie Circulaire',
      de: 'Tagung der Kreislaufwirtschaft',
      en: 'Circular Economy Conference',
    },
    description: {
      fr: 'Conférence dédiée aux acteurs de l\'économie circulaire, du réemploi et de la réduction des déchets.',
      de: 'Konferenz für Akteure der Kreislaufwirtschaft, Wiederverwendung und Abfallreduzierung.',
      en: 'Conference dedicated to circular economy, reuse and waste reduction actors.',
    },
    themeId: 'eco',
    status: 'upcoming',
    startDate: '2026-04-10T09:00:00Z',
    endDate: '2026-04-11T17:00:00Z',
    location: {
      name: 'Centre de Congrès Part-Dieu',
      address: '5 Rue de Bonnel',
      city: 'Lyon',
      postalCode: '69003',
      coordinates: {
        lat: 45.7607,
        lng: 4.8567,
      },
    },
    isHybrid: false,
    onlineLink: '',
    capacity: 300,
    registeredCount: 87,
    speakers: [mockSpeakers[3]],
    sessions: [
      {
        id: 'ses_eco_001',
        conferenceId: 'conf_003',
        title: {
          fr: 'Keynote : L\'économie circulaire, moteur de transition',
          de: 'Hauptvortrag: Kreislaufwirtschaft als Übergangsmotor',
          en: 'Keynote: Circular economy as a transition driver',
        },
        description: {
          fr: 'Vision stratégique de l\'économie circulaire comme levier de transformation économique.',
          de: 'Strategische Vision der Kreislaufwirtschaft als Hebel für wirtschaftlichen Wandel.',
          en: 'Strategic vision of circular economy as a lever for economic transformation.',
        },
        type: 'keynote',
        date: '2026-04-10T09:30:00Z',
        startTime: '09:30',
        endTime: '11:00',
        duration: 90,
        room: 'Auditorium Principal',
        speakers: [mockSpeakers[3]],
        capacity: 300,
        registeredCount: 87,
        isRecorded: true,
        tags: ['économie', 'circulaire', 'transition'],
      },
      {
        id: 'ses_eco_002',
        conferenceId: 'conf_003',
        title: {
          fr: 'Atelier : Réduire les déchets en entreprise',
          de: 'Workshop: Abfall im Unternehmen reduzieren',
          en: 'Workshop: Reducing waste in business',
        },
        description: {
          fr: 'Bonnes pratiques et outils pour mettre en place une démarche zéro déchet.',
          de: 'Best Practices und Tools zur Umsetzung eines Zero-Waste-Ansatzes.',
          en: 'Best practices and tools to implement a zero waste approach.',
        },
        type: 'workshop',
        date: '2026-04-10T14:00:00Z',
        startTime: '14:00',
        endTime: '16:00',
        duration: 120,
        room: 'Salle B',
        speakers: [],
        capacity: 50,
        registeredCount: 42,
        isRecorded: false,
        tags: ['déchets', 'entreprise', 'zéro déchet'],
      },
    ],
    sponsors: [
      {
        id: 'spo_004',
        name: 'ADEME',
        logo: '/logos/ademe.svg',
        tier: 'platinum',
        website: 'https://www.ademe.fr',
      },
      {
        id: 'spo_005',
        name: 'CCI Lyon Métropole',
        logo: '/logos/cci-lyon.svg',
        tier: 'gold',
        website: 'https://www.lyon-metropole.cci.fr',
      },
    ],
    organizer: {
      id: 'org_001',
      name: {
        fr: 'Ville de Lyon',
        de: 'Stadt Lyon',
        en: 'City of Lyon',
      },
      type: 'municipal',
      logo: '/logos/ville-lyon.svg',
      website: 'https://www.lyon.fr',
    },
    registrationDeadline: '2026-04-05T23:59:59Z',
    tags: ['économie', 'circulaire', 'déchets', 'réemploi'],
    images: [
      'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&h=600&fit=crop',
    ],
    documents: [],
    agenda: [
      {
        date: '2026-04-10T00:00:00Z',
        sessions: [
          {
            id: 'ses_eco_001',
            conferenceId: 'conf_003',
            title: {
              fr: 'Keynote : L\'économie circulaire, moteur de transition',
              de: 'Hauptvortrag: Kreislaufwirtschaft als Übergangsmotor',
              en: 'Keynote: Circular economy as a transition driver',
            },
            description: {
              fr: 'Vision stratégique de l\'économie circulaire.',
              de: 'Strategische Vision der Kreislaufwirtschaft.',
              en: 'Strategic vision of circular economy.',
            },
            type: 'keynote',
            date: '2026-04-10T09:30:00Z',
            startTime: '09:30',
            endTime: '11:00',
            duration: 90,
            room: 'Auditorium Principal',
            speakers: [mockSpeakers[3]],
            isRecorded: true,
            tags: ['économie'],
          },
        ],
      },
    ],
    hasRegistered: false,
    createdAt: '2025-12-15T00:00:00Z',
    updatedAt: '2026-01-09T00:00:00Z',
  },
  {
    id: 'conf_004',
    slug: 'rencontres-education-numerique',
    title: {
      fr: 'Rencontres Éducation & Numérique',
      de: 'Treffen Bildung & Digital',
      en: 'Education & Digital Meetings',
    },
    description: {
      fr: 'Conférence sur les enjeux du numérique éducatif, la formation et l\'inclusion numérique des jeunes.',
      de: 'Konferenz über digitale Bildung, Ausbildung und digitale Inklusion junger Menschen.',
      en: 'Conference on digital education issues, training and digital inclusion of young people.',
    },
    themeId: 'edu',
    status: 'registration_open',
    startDate: '2026-03-05T09:00:00Z',
    endDate: '2026-03-05T17:00:00Z',
    location: {
      name: 'Campus Lyon Tech',
      address: '43 Boulevard du 11 Novembre 1918',
      city: 'Villeurbanne',
      postalCode: '69100',
      coordinates: {
        lat: 45.7831,
        lng: 4.8694,
      },
    },
    isHybrid: true,
    onlineLink: 'https://live.civiagora.fr/education-numerique',
    capacity: 250,
    registeredCount: 198,
    speakers: [mockSpeakers[0]],
    sessions: [
      {
        id: 'ses_edu_001',
        conferenceId: 'conf_004',
        title: {
          fr: 'Conférence : Le numérique au service de la pédagogie',
          de: 'Konferenz: Digital im Dienste der Pädagogik',
          en: 'Conference: Digital technology for pedagogy',
        },
        description: {
          fr: 'Comment le numérique peut transformer les pratiques pédagogiques et l\'apprentissage.',
          de: 'Wie digitale Technologie pädagogische Praktiken und das Lernen transformieren kann.',
          en: 'How digital technology can transform pedagogical practices and learning.',
        },
        type: 'conference',
        date: '2026-03-05T10:00:00Z',
        startTime: '10:00',
        endTime: '11:30',
        duration: 90,
        room: 'Amphi A',
        speakers: [mockSpeakers[0]],
        capacity: 250,
        registeredCount: 198,
        isRecorded: true,
        tags: ['éducation', 'numérique', 'pédagogie'],
      },
      {
        id: 'ses_edu_002',
        conferenceId: 'conf_004',
        title: {
          fr: 'Atelier : Inclusion numérique des jeunes',
          de: 'Workshop: Digitale Inklusion junger Menschen',
          en: 'Workshop: Digital inclusion of young people',
        },
        description: {
          fr: 'Stratégies et actions pour réduire la fracture numérique chez les jeunes.',
          de: 'Strategien und Maßnahmen zur Verringerung der digitalen Kluft bei jungen Menschen.',
          en: 'Strategies and actions to reduce the digital divide among young people.',
        },
        type: 'workshop',
        date: '2026-03-05T14:00:00Z',
        startTime: '14:00',
        endTime: '15:30',
        duration: 90,
        room: 'Salle 301',
        speakers: [],
        capacity: 40,
        registeredCount: 38,
        isRecorded: false,
        tags: ['inclusion', 'jeunesse', 'fracture numérique'],
      },
    ],
    sponsors: [
      {
        id: 'spo_006',
        name: 'Académie de Lyon',
        logo: '/logos/academie-lyon.svg',
        tier: 'platinum',
        website: 'https://www.ac-lyon.fr',
      },
    ],
    organizer: {
      id: 'org_001',
      name: {
        fr: 'Ville de Lyon',
        de: 'Stadt Lyon',
        en: 'City of Lyon',
      },
      type: 'municipal',
      logo: '/logos/ville-lyon.svg',
      website: 'https://www.lyon.fr',
    },
    registrationDeadline: '2026-03-03T23:59:59Z',
    tags: ['éducation', 'numérique', 'jeunesse', 'inclusion'],
    images: [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=600&fit=crop',
    ],
    documents: [],
    agenda: [
      {
        date: '2026-03-05T00:00:00Z',
        sessions: [
          {
            id: 'ses_edu_001',
            conferenceId: 'conf_004',
            title: {
              fr: 'Conférence : Le numérique au service de la pédagogie',
              de: 'Konferenz: Digital im Dienste der Pädagogik',
              en: 'Conference: Digital technology for pedagogy',
            },
            description: {
              fr: 'Comment le numérique peut transformer l\'apprentissage.',
              de: 'Wie digitale Technologie das Lernen transformieren kann.',
              en: 'How digital technology can transform learning.',
            },
            type: 'conference',
            date: '2026-03-05T10:00:00Z',
            startTime: '10:00',
            endTime: '11:30',
            duration: 90,
            room: 'Amphi A',
            speakers: [mockSpeakers[0]],
            isRecorded: true,
            tags: ['éducation'],
          },
        ],
      },
    ],
    hasRegistered: false,
    createdAt: '2025-11-20T00:00:00Z',
    updatedAt: '2026-01-09T00:00:00Z',
  },
];

export const mockConferenceSummaries: ConferenceSummaryDTO[] = mockConferences.map(c => ({
  id: c.id,
  slug: c.slug,
  title: c.title,
  themeId: c.themeId,
  status: c.status,
  startDate: c.startDate,
  endDate: c.endDate,
  speakersCount: c.speakers.length,
  registeredCount: c.registeredCount,
}));

// ==================== Mock Notifications ====================

export const mockNotifications: NotificationDTO[] = [

];

// ==================== Mock Activities ====================

export const mockActivities: ActivityDTO[] = [
  {
    id: 'act_001',
    userId: 'usr_001',
    type: 'petition_signed',
    title: {
      fr: 'Pétition signée',
      de: 'Petition unterzeichnet',
      en: 'Petition signed',
    },
    description: {
      fr: 'Vous avez signé la pétition "Cantines scolaires bio"',
      de: 'Sie haben die Petition "Bio-Schulkantinen" unterzeichnet',
      en: 'You signed the petition "Organic school canteens"',
    },
    themeId: 'edu',
    resourceId: 'pet_002',
    resourceType: 'petition',
    createdAt: '2026-01-08T11:30:00Z',
  },
  {
    id: 'act_002',
    userId: 'usr_001',
    type: 'comment_posted',
    title: {
      fr: 'Commentaire publié',
      de: 'Kommentar veröffentlicht',
      en: 'Comment posted',
    },
    description: {
      fr: 'Vous avez commenté la consultation "Parc Central"',
      de: 'Sie haben die Konsultation "Zentralpark" kommentiert',
      en: 'You commented on the consultation "Central Park"',
    },
    themeId: 'urb',
    resourceId: 'con_001',
    resourceType: 'consultation',
    createdAt: '2026-01-07T15:45:00Z',
  },
];

// ==================== Mock Dashboard Stats ====================

export const mockDashboardStats: DashboardStatsDTO = {
  overview: {
    activeConsultations: 12,
    openPetitions: 28,
    ongoingVotes: 3,
    totalParticipants: 45230,
  },
  trends: {
    participationGrowth: 23.5,
    consultationsGrowth: 15.2,
    petitionsGrowth: 8.7,
    votesGrowth: -5.3,
  },
  byTheme: mockThemes.map(t => t.stats),
  recentActivity: mockActivities,
  upcomingEvents: [
    {
      id: 'evt_001',
      type: 'vote',
      title: {
        fr: 'Vote Budget Participatif 2026',
        de: 'Abstimmung Bürgerbeteiligungshaushalt 2026',
        en: 'Participatory Budget 2026 Vote',
      },
      date: '2026-01-20T00:00:00Z',
      themeId: 'urb',
    },
    {
      id: 'evt_002',
      type: 'assembly_meeting',
      title: {
        fr: 'Conseil Citoyen Environnement',
        de: 'Bürgerrat Umwelt',
        en: 'Citizens\' Council Environment',
      },
      date: '2026-01-22T18:00:00Z',
      themeId: 'env',
    },
    {
      id: 'evt_003',
      type: 'conference',
      title: {
        fr: 'Forum Climat 2026',
        de: 'Klimaforum 2026',
        en: 'Climate Forum 2026',
      },
      date: '2026-03-15T08:00:00Z',
      themeId: 'env',
    },
  ],
};

// ==================== Mock Participation History ====================

export const mockParticipationHistory: ParticipationHistoryDTO = {
  consultations: [
    {
      consultation: mockConsultationSummaries[0],
      participatedAt: '2026-01-07T15:45:00Z',
      commentsCount: 3,
      ideasSubmitted: 1,
    },
  ],
  petitions: [
    {
      petition: mockPetitionSummaries[1],
      signedAt: '2026-01-08T11:30:00Z',
      comment: 'Excellente initiative pour nos enfants !',
    },
  ],
  votes: [],
  assemblies: [],
  conferences: [],
};

// ==================== Mock Signalements ====================

export const mockSignalements: import('../types').SignalementDTO[] = [
  {
    id: 'sig_001',
    title: {
      fr: 'Nid-de-poule dangereux avenue de la Liberté',
      de: 'Gefährliches Schlagloch in der Avenue de la Liberté',
      en: 'Dangerous pothole on Avenue de la Liberté',
    },
    description: {
      fr: 'Un nid-de-poule important s\'est formé sur l\'avenue de la Liberté, à proximité du numéro 45. Il représente un danger pour les cyclistes et les véhicules.',
      de: 'Ein großes Schlagloch hat sich in der Avenue de la Liberté in der Nähe der Nummer 45 gebildet. Es stellt eine Gefahr für Radfahrer und Fahrzeuge dar.',
      en: 'A large pothole has formed on Avenue de la Liberté, near number 45. It poses a danger to cyclists and vehicles.',
    },
    category: 'infrastructure',
    status: 'in_progress',
    priority: 'high',
    themeId: 'urb',
    location: {
      name: 'Avenue de la Liberté',
      address: '45 Avenue de la Liberté',
      city: 'Lyon',
      postalCode: '69003',
      coordinates: {
        lat: 45.7597,
        lng: 4.8422,
      },
    },
    images: [
      'https://images.unsplash.com/photo-1625586762398-8e1df5e2e9cb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1615920442910-4f28e09d407d?w=800&h=600&fit=crop',
    ],
    author: {
      id: 'usr_001',
      firstName: 'Marie',
      lastName: 'Dubois',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      role: 'citizen',
    },
    assignedTo: {
      id: 'usr_admin_001',
      firstName: 'Jean',
      lastName: 'Martin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      role: 'moderator',
    },
    upvotes: 47,
    hasUpvoted: false,
    history: [
      {
        id: 'hist_001',
        signalementId: 'sig_001',
        status: 'submitted',
        comment: {
          fr: 'Signalement reçu et enregistré',
          de: 'Meldung empfangen und registriert',
          en: 'Report received and registered',
        },
        updatedBy: {
          id: 'system',
          firstName: 'Système',
          lastName: 'CiviAgora',
          role: 'system',
        },
        createdAt: '2026-01-05T10:30:00Z',
      },
      {
        id: 'hist_002',
        signalementId: 'sig_001',
        status: 'under_review',
        comment: {
          fr: 'Prise en charge par le service voirie',
          de: 'Übernahme durch die Straßenbauabteilung',
          en: 'Taken over by the road maintenance department',
        },
        updatedBy: {
          id: 'usr_admin_001',
          firstName: 'Jean',
          lastName: 'Martin',
          role: 'moderator',
        },
        createdAt: '2026-01-06T09:15:00Z',
      },
      {
        id: 'hist_003',
        signalementId: 'sig_001',
        status: 'in_progress',
        comment: {
          fr: 'Intervention planifiée pour la semaine du 20 janvier',
          de: 'Intervention für die Woche vom 20. Januar geplant',
          en: 'Intervention scheduled for the week of January 20th',
        },
        updatedBy: {
          id: 'usr_admin_001',
          firstName: 'Jean',
          lastName: 'Martin',
          role: 'moderator',
        },
        createdAt: '2026-01-08T14:30:00Z',
      },
    ],
    createdAt: '2026-01-05T10:30:00Z',
    updatedAt: '2026-01-08T14:30:00Z',
  },
  {
    id: 'sig_002',
    title: {
      fr: 'Conteneur de tri sélectif endommagé',
      de: 'Beschädigter Wertstoffbehälter',
      en: 'Damaged recycling container',
    },
    description: {
      fr: 'Le conteneur de tri sélectif situé rue Victor Hugo est endommagé et ne ferme plus correctement. Des déchets se répandent aux alentours.',
      de: 'Der Wertstoffbehälter in der Rue Victor Hugo ist beschädigt und schließt nicht mehr richtig. Abfälle verstreuen sich in der Umgebung.',
      en: 'The recycling container located on Rue Victor Hugo is damaged and no longer closes properly. Waste is spreading around.',
    },
    category: 'cleanliness',
    status: 'resolved',
    priority: 'medium',
    themeId: 'env',
    location: {
      name: 'Rue Victor Hugo',
      address: '12 Rue Victor Hugo',
      city: 'Lyon',
      postalCode: '69002',
      coordinates: {
        lat: 45.7545,
        lng: 4.8287,
      },
    },
    images: [
      'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800&h=600&fit=crop',
    ],
    author: {
      id: 'usr_002',
      firstName: 'Thomas',
      lastName: 'Müller',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      role: 'citizen',
    },
    assignedTo: {
      id: 'usr_admin_002',
      firstName: 'Sophie',
      lastName: 'Dupont',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      role: 'moderator',
    },
    upvotes: 23,
    hasUpvoted: true,
    history: [
      {
        id: 'hist_004',
        signalementId: 'sig_002',
        status: 'submitted',
        updatedBy: {
          id: 'system',
          firstName: 'Système',
          lastName: 'CiviAgora',
          role: 'system',
        },
        createdAt: '2026-01-03T08:20:00Z',
      },
      {
        id: 'hist_005',
        signalementId: 'sig_002',
        status: 'under_review',
        updatedBy: {
          id: 'usr_admin_002',
          firstName: 'Sophie',
          lastName: 'Dupont',
          role: 'moderator',
        },
        createdAt: '2026-01-03T11:00:00Z',
      },
      {
        id: 'hist_006',
        signalementId: 'sig_002',
        status: 'in_progress',
        comment: {
          fr: 'Nouveau conteneur commandé',
          de: 'Neuer Behälter bestellt',
          en: 'New container ordered',
        },
        updatedBy: {
          id: 'usr_admin_002',
          firstName: 'Sophie',
          lastName: 'Dupont',
          role: 'moderator',
        },
        createdAt: '2026-01-04T10:00:00Z',
      },
      {
        id: 'hist_007',
        signalementId: 'sig_002',
        status: 'resolved',
        comment: {
          fr: 'Conteneur remplacé et zone nettoyée',
          de: 'Behälter ersetzt und Bereich gereinigt',
          en: 'Container replaced and area cleaned',
        },
        updatedBy: {
          id: 'usr_admin_002',
          firstName: 'Sophie',
          lastName: 'Dupont',
          role: 'moderator',
        },
        createdAt: '2026-01-07T15:45:00Z',
      },
    ],
    createdAt: '2026-01-03T08:20:00Z',
    updatedAt: '2026-01-07T15:45:00Z',
    resolvedAt: '2026-01-07T15:45:00Z',
  },
  {
    id: 'sig_003',
    title: {
      fr: 'Éclairage public défaillant',
      de: 'Defekte Straßenbeleuchtung',
      en: 'Faulty street lighting',
    },
    description: {
      fr: 'Plusieurs lampadaires sont éteints sur le boulevard des Arts depuis plusieurs jours, créant une zone peu sûre la nuit.',
      de: 'Mehrere Straßenlaternen sind seit mehreren Tagen auf dem Boulevard des Arts aus und schaffen einen unsicheren Bereich bei Nacht.',
      en: 'Several street lights have been off on Boulevard des Arts for several days, creating an unsafe area at night.',
    },
    category: 'safety',
    status: 'under_review',
    priority: 'high',
    themeId: 'sec',
    location: {
      name: 'Boulevard des Arts',
      address: 'Boulevard des Arts',
      city: 'Lyon',
      postalCode: '69005',
      coordinates: {
        lat: 45.7628,
        lng: 4.8198,
      },
    },
    images: [
      'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&h=600&fit=crop',
    ],
    author: {
      id: 'usr_003',
      firstName: 'Emma',
      lastName: 'Garcia',
      role: 'citizen',
    },
    assignedTo: {
      id: 'usr_admin_003',
      firstName: 'Pierre',
      lastName: 'Laurent',
      role: 'moderator',
    },
    upvotes: 65,
    hasUpvoted: false,
    history: [
      {
        id: 'hist_008',
        signalementId: 'sig_003',
        status: 'submitted',
        updatedBy: {
          id: 'system',
          firstName: 'Système',
          lastName: 'CiviAgora',
          role: 'system',
        },
        createdAt: '2026-01-10T19:30:00Z',
      },
      {
        id: 'hist_009',
        signalementId: 'sig_003',
        status: 'under_review',
        comment: {
          fr: 'Signalement transmis au service électricité',
          de: 'Meldung an die Elektrizitätsabteilung weitergeleitet',
          en: 'Report forwarded to the electricity department',
        },
        updatedBy: {
          id: 'usr_admin_003',
          firstName: 'Pierre',
          lastName: 'Laurent',
          role: 'moderator',
        },
        createdAt: '2026-01-11T08:45:00Z',
      },
    ],
    createdAt: '2026-01-10T19:30:00Z',
    updatedAt: '2026-01-11T08:45:00Z',
  },
  {
    id: 'sig_004',
    title: {
      fr: 'Graffitis sur monument historique',
      de: 'Graffiti auf historischem Denkmal',
      en: 'Graffiti on historical monument',
    },
    description: {
      fr: 'Des graffitis ont été appliqués sur la façade du monument aux morts, nécessitant un nettoyage urgent.',
      de: 'Graffiti wurden an der Fassade des Kriegerdenkmals angebracht und erfordern eine dringende Reinigung.',
      en: 'Graffiti has been applied to the facade of the war memorial, requiring urgent cleaning.',
    },
    category: 'public_space',
    status: 'submitted',
    priority: 'urgent',
    themeId: 'cul',
    location: {
      name: 'Place de la République',
      address: 'Place de la République',
      city: 'Lyon',
      postalCode: '69001',
      coordinates: {
        lat: 45.7640,
        lng: 4.8357,
      },
    },
    images: [
      'https://images.unsplash.com/photo-1569847388862-c2b37c17e075?w=800&h=600&fit=crop',
    ],
    author: {
      id: 'usr_004',
      firstName: 'Lucas',
      lastName: 'Bernard',
      role: 'citizen',
    },
    upvotes: 89,
    hasUpvoted: false,
    history: [
      {
        id: 'hist_010',
        signalementId: 'sig_004',
        status: 'submitted',
        updatedBy: {
          id: 'system',
          firstName: 'Système',
          lastName: 'CiviAgora',
          role: 'system',
        },
        createdAt: '2026-01-13T07:15:00Z',
      },
    ],
    createdAt: '2026-01-13T07:15:00Z',
    updatedAt: '2026-01-13T07:15:00Z',
  },
  {
    id: 'sig_005',
    title: {
      fr: 'Nuisances sonores chantier',
      de: 'Lärmbelästigung Baustelle',
      en: 'Construction site noise nuisance',
    },
    description: {
      fr: 'Le chantier rue des Fleurs génère des nuisances sonores excessives en dehors des horaires autorisés (avant 7h et après 20h).',
      de: 'Die Baustelle in der Rue des Fleurs verursacht außerhalb der zulässigen Zeiten (vor 7 Uhr und nach 20 Uhr) übermäßige Lärmbelästigung.',
      en: 'The construction site on Rue des Fleurs generates excessive noise nuisance outside authorized hours (before 7am and after 8pm).',
    },
    category: 'noise',
    status: 'in_progress',
    priority: 'medium',
    themeId: 'env',
    location: {
      name: 'Rue des Fleurs',
      address: '28 Rue des Fleurs',
      city: 'Lyon',
      postalCode: '69004',
      coordinates: {
        lat: 45.7712,
        lng: 4.8405,
      },
    },
    images: [],
    author: {
      id: 'usr_005',
      firstName: 'Léa',
      lastName: 'Martin',
      role: 'citizen',
    },
    assignedTo: {
      id: 'usr_admin_004',
      firstName: 'Marc',
      lastName: 'Leroy',
      role: 'moderator',
    },
    upvotes: 32,
    hasUpvoted: false,
    history: [
      {
        id: 'hist_011',
        signalementId: 'sig_005',
        status: 'submitted',
        updatedBy: {
          id: 'system',
          firstName: 'Système',
          lastName: 'CiviAgora',
          role: 'system',
        },
        createdAt: '2026-01-09T21:30:00Z',
      },
      {
        id: 'hist_012',
        signalementId: 'sig_005',
        status: 'under_review',
        updatedBy: {
          id: 'usr_admin_004',
          firstName: 'Marc',
          lastName: 'Leroy',
          role: 'moderator',
        },
        createdAt: '2026-01-10T09:00:00Z',
      },
      {
        id: 'hist_013',
        signalementId: 'sig_005',
        status: 'in_progress',
        comment: {
          fr: 'Contrôle effectué, entreprise contactée pour rappel des règles',
          de: 'Kontrolle durchgeführt, Unternehmen kontaktiert zur Erinnerung an die Regeln',
          en: 'Check carried out, company contacted to remind them of the rules',
        },
        updatedBy: {
          id: 'usr_admin_004',
          firstName: 'Marc',
          lastName: 'Leroy',
          role: 'moderator',
        },
        createdAt: '2026-01-11T14:20:00Z',
      },
    ],
    createdAt: '2026-01-09T21:30:00Z',
    updatedAt: '2026-01-11T14:20:00Z',
  },
  {
    id: 'sig_006',
    title: {
      fr: 'Banc public cassé',
      de: 'Kaputte öffentliche Bank',
      en: 'Broken public bench',
    },
    description: {
      fr: 'Le banc situé dans le parc municipal est cassé, avec une latte manquante, rendant impossible son utilisation.',
      de: 'Die Bank im städtischen Park ist kaputt, eine Latte fehlt, was ihre Nutzung unmöglich macht.',
      en: 'The bench located in the municipal park is broken, with a missing slat, making it impossible to use.',
    },
    category: 'public_space',
    status: 'resolved',
    priority: 'low',
    themeId: 'urb',
    location: {
      name: 'Parc Municipal',
      address: 'Parc Municipal',
      city: 'Lyon',
      postalCode: '69006',
      coordinates: {
        lat: 45.7685,
        lng: 4.8512,
      },
    },
    images: [
      'https://images.unsplash.com/photo-1565034946487-077786996e27?w=800&h=600&fit=crop',
    ],
    author: {
      id: 'usr_006',
      firstName: 'Antoine',
      lastName: 'Rousseau',
      role: 'citizen',
    },
    assignedTo: {
      id: 'usr_admin_005',
      firstName: 'Julie',
      lastName: 'Moreau',
      role: 'moderator',
    },
    upvotes: 12,
    hasUpvoted: false,
    history: [
      {
        id: 'hist_014',
        signalementId: 'sig_006',
        status: 'submitted',
        updatedBy: {
          id: 'system',
          firstName: 'Système',
          lastName: 'CiviAgora',
          role: 'system',
        },
        createdAt: '2025-12-28T11:20:00Z',
      },
      {
        id: 'hist_015',
        signalementId: 'sig_006',
        status: 'under_review',
        updatedBy: {
          id: 'usr_admin_005',
          firstName: 'Julie',
          lastName: 'Moreau',
          role: 'moderator',
        },
        createdAt: '2025-12-29T08:30:00Z',
      },
      {
        id: 'hist_016',
        signalementId: 'sig_006',
        status: 'in_progress',
        updatedBy: {
          id: 'usr_admin_005',
          firstName: 'Julie',
          lastName: 'Moreau',
          role: 'moderator',
        },
        createdAt: '2026-01-02T10:00:00Z',
      },
      {
        id: 'hist_017',
        signalementId: 'sig_006',
        status: 'resolved',
        comment: {
          fr: 'Banc réparé',
          de: 'Bank repariert',
          en: 'Bench repaired',
        },
        updatedBy: {
          id: 'usr_admin_005',
          firstName: 'Julie',
          lastName: 'Moreau',
          role: 'moderator',
        },
        createdAt: '2026-01-05T16:00:00Z',
      },
    ],
    createdAt: '2025-12-28T11:20:00Z',
    updatedAt: '2026-01-05T16:00:00Z',
    resolvedAt: '2026-01-05T16:00:00Z',
  },
];

export const mockGeoSignalements: any[] = mockSignalements.map(sig => ({
  id: sig.id,
  title: sig.title,
  description: sig.description,
  category: sig.category,
  status: sig.status,
  priority: sig.priority,
  upvotes: sig.upvotes,
  location: {
    lat: sig.location.coordinates?.lat || 0,
    lng: sig.location.coordinates?.lng || 0,
    address: sig.location.address,
    city: sig.location.city,
  },
  createdAt: sig.createdAt,
}));

export const mockSignalementStats: import('../types').SignalementStatsDTO = {
  total: mockSignalements.length,
  byStatus: {
    submitted: mockSignalements.filter(s => s.status === 'submitted').length,
    under_review: mockSignalements.filter(s => s.status === 'under_review').length,
    in_progress: mockSignalements.filter(s => s.status === 'in_progress').length,
    resolved: mockSignalements.filter(s => s.status === 'resolved').length,
    rejected: mockSignalements.filter(s => s.status === 'rejected').length,
    archived: mockSignalements.filter(s => s.status === 'archived').length,
  },
  byCategory: {
    infrastructure: mockSignalements.filter(s => s.category === 'infrastructure').length,
    cleanliness: mockSignalements.filter(s => s.category === 'cleanliness').length,
    safety: mockSignalements.filter(s => s.category === 'safety').length,
    environment: mockSignalements.filter(s => s.category === 'environment').length,
    public_space: mockSignalements.filter(s => s.category === 'public_space').length,
    transport: mockSignalements.filter(s => s.category === 'transport').length,
    noise: mockSignalements.filter(s => s.category === 'noise').length,
    other: mockSignalements.filter(s => s.category === 'other').length,
  },
  averageResolutionTime: 4.5,
  resolutionRate: 33.3,
};

// ==================== AI Assistant Mock Data ====================

export const mockAIQuickAnswers: import('../types').AIQuickAnswerDTO[] = [
  {
    question: {
      fr: "Comment créer une pétition ?",
      de: "Wie erstelle ich eine Petition?",
      en: "How do I create a petition?"
    },
    answer: {
      fr: "Pour créer une pétition, connectez-vous à votre compte, puis cliquez sur le bouton 'Nouvelle Pétition'. Remplissez le formulaire avec le titre, la description, l'objectif et les destinataires. Une fois soumise, votre pétition sera examinée par notre équipe de modération avant publication.",
      de: "Um eine Petition zu erstellen, melden Sie sich bei Ihrem Konto an und klicken Sie auf die Schaltfläche 'Neue Petition'. Füllen Sie das Formular mit Titel, Beschreibung, Ziel und Empfängern aus. Nach der Einreichung wird Ihre Petition von unserem Moderationsteam geprüft, bevor sie veröffentlicht wird.",
      en: "To create a petition, log in to your account and click the 'New Petition' button. Fill out the form with the title, description, goal, and recipients. Once submitted, your petition will be reviewed by our moderation team before publication."
    },
    category: 'platform',
    tags: ['petition', 'creation', 'guide']
  },
  {
    question: {
      fr: "Comment fonctionne le vote électronique ?",
      de: "Wie funktioniert die elektronische Abstimmung?",
      en: "How does electronic voting work?"
    },
    answer: {
      fr: "Notre système de vote électronique est sécurisé et anonyme. Une fois que vous votez, votre choix est crypté et stocké de manière anonyme. Vous recevrez une confirmation de vote, mais personne ne pourra voir votre choix. Les résultats sont comptabilisés automatiquement et publiés à la clôture du vote.",
      de: "Unser elektronisches Abstimmungssystem ist sicher und anonym. Sobald Sie abstimmen, wird Ihre Wahl verschlüsselt und anonym gespeichert. Sie erhalten eine Abstimmungsbestätigung, aber niemand kann Ihre Wahl sehen. Die Ergebnisse werden automatisch gezählt und nach Abschluss der Abstimmung veröffentlicht.",
      en: "Our electronic voting system is secure and anonymous. Once you vote, your choice is encrypted and stored anonymously. You'll receive a voting confirmation, but no one can see your choice. Results are automatically tallied and published at the close of voting."
    },
    category: 'participation',
    tags: ['vote', 'security', 'anonymity']
  },
  {
    question: {
      fr: "Quels sont les critères du budget participatif ?",
      de: "Was sind die Kriterien für den Bürgerhaushalt?",
      en: "What are the criteria for participatory budgeting?"
    },
    answer: {
      fr: "Le budget participatif permet aux citoyens de proposer et voter pour des projets locaux. Les critères incluent : projet d'intérêt général, faisabilité technique, coût raisonnable (généralement entre 5 000€ et 100 000€), impact positif sur la communauté. Tous les résidents de plus de 16 ans peuvent participer.",
      de: "Der Bürgerhaushalt ermöglicht es den Bürgern, lokale Projekte vorzuschlagen und darüber abzustimmen. Die Kriterien umfassen: Projekt von allgemeinem Interesse, technische Machbarkeit, angemessene Kosten (normalerweise zwischen 5.000 € und 100.000 €), positive Auswirkungen auf die Gemeinschaft. Alle Einwohner über 16 Jahren können teilnehmen.",
      en: "Participatory budgeting allows citizens to propose and vote on local projects. Criteria include: project of general interest, technical feasibility, reasonable cost (typically between €5,000 and €100,000), positive community impact. All residents over 16 can participate."
    },
    category: 'participation',
    tags: ['budget', 'criteria', 'participatory']
  },
  {
    question: {
      fr: "Comment devenir bénévole pour la ville ?",
      de: "Wie werde ich Freiwilliger für die Stadt?",
      en: "How do I become a volunteer for the city?"
    },
    answer: {
      fr: "Pour devenir bénévole, visitez la section 'Engagement' de votre profil et consultez les opportunités disponibles. Vous pouvez aider lors d'événements, participer à des assemblées citoyennes, ou rejoindre des groupes de travail thématiques. Inscrivez-vous aux missions qui vous intéressent et notre équipe vous contactera.",
      de: "Um Freiwilliger zu werden, besuchen Sie den Bereich 'Engagement' in Ihrem Profil und sehen Sie sich die verfügbaren Möglichkeiten an. Sie können bei Veranstaltungen helfen, an Bürgerversammlungen teilnehmen oder thematischen Arbeitsgruppen beitreten. Melden Sie sich für die Missionen an, die Sie interessieren, und unser Team wird Sie kontaktieren.",
      en: "To become a volunteer, visit the 'Engagement' section of your profile and check available opportunities. You can help at events, participate in citizen assemblies, or join thematic working groups. Sign up for missions that interest you and our team will contact you."
    },
    category: 'engagement',
    tags: ['volunteer', 'engagement', 'community']
  }
];

export const mockAISuggestions: import('../types').AISuggestionDTO[] = [
  {
    id: 'sug_001',
    type: 'process',
    title: {
      fr: "Nouvelle concertation sur le climat",
      de: "Neue Konsultation zum Klima",
      en: "New consultation on climate"
    },
    description: {
      fr: "Participez à la concertation sur la transition écologique de votre ville",
      de: "Nehmen Sie an der Konsultation zum ökologischen Wandel Ihrer Stadt teil",
      en: "Participate in the consultation on your city's ecological transition"
    },
    relevanceScore: 0.95,
    actionUrl: '/consultations/transition-ecologique-2026',
    actionLabel: {
      fr: "Voir la concertation",
      de: "Konsultation ansehen",
      en: "View consultation"
    }
  },
  {
    id: 'sug_002',
    type: 'action',
    title: {
      fr: "Élisez le meilleur projet de quartier",
      de: "Wählen Sie das beste Quartiersprojekt",
      en: "Vote for the best neighborhood project"
    },
    description: {
      fr: "Votez pour le projet qui transformera votre quartier",
      de: "Stimmen Sie für das Projekt, das Ihr Viertel transformieren wird",
      en: "Vote for the project that will transform your neighborhood"
    },
    relevanceScore: 0.88,
    actionUrl: '/votes',
    actionLabel: {
      fr: "Voter maintenant",
      de: "Jetzt abstimmen",
      en: "Vote now"
    }
  },
  {
    id: 'sug_003',
    type: 'resource',
    title: {
      fr: "Atelier d'urbanisme : Centre-ville",
      de: "Stadtplanungs-Workshop: Innenstadt",
      en: "Urban planning workshop: City center"
    },
    description: {
      fr: "Participez à l'atelier sur le réaménagement du centre-ville",
      de: "Nehmen Sie am Workshop zur Neugestaltung der Innenstadt teil",
      en: "Participate in the workshop on city center redevelopment"
    },
    relevanceScore: 0.82,
    actionUrl: '/conferences',
    actionLabel: {
      fr: "S'inscrire",
      de: "Registrieren",
      en: "Register"
    }
  }
];

export const mockAIConversations: import('../types').AIConversationDTO[] = [];

export const mockAISummary: import('../types').AISummaryDTO = {
  id: 'sum_001',
  entityType: 'consultation',
  entityId: 'cons_001',
  summary: {
    fr: "Cette concertation porte sur l'aménagement d'un nouveau parc urbain dans le quartier sud. Les citoyens peuvent proposer des idées pour les espaces verts, les aires de jeux, et les équipements sportifs.",
    de: "Diese Konsultation befasst sich mit der Gestaltung eines neuen Stadtparks im südlichen Viertel. Bürger können Ideen für Grünflächen, Spielplätze und Sporteinrichtungen vorschlagen.",
    en: "This consultation concerns the development of a new urban park in the southern district. Citizens can propose ideas for green spaces, playgrounds, and sports facilities."
  },
  keyPoints: [
    {
      fr: "Budget de 2M€ alloué au projet",
      de: "Budget von 2 Mio. € für das Projekt",
      en: "Budget of €2M allocated to the project"
    }
  ],
  relevantThemes: ['thm_environment', 'thm_urban'],
  participationLevel: {
    current: 342,
    target: 500,
    percentage: 68.4
  },
  createdAt: new Date().toISOString()
};

export const mockAIExplanation: import('../types').AIExplanationDTO = {
  id: 'exp_001',
  topic: {
    fr: "Qu'est-ce qu'une concertation publique ?",
    de: "Was ist eine öffentliche Konsultation?",
    en: "What is a public consultation?"
  },
  explanation: {
    fr: "Une concertation publique est un processus démocratique permettant aux citoyens de s'exprimer sur un projet ou une politique publique avant sa mise en œuvre.",
    de: "Eine öffentliche Konsultation ist ein demokratischer Prozess, der es Bürgern ermöglicht, sich zu einem Projekt oder einer öffentlichen Politik zu äußern.",
    en: "A public consultation is a democratic process allowing citizens to express themselves on a project or public policy before its implementation."
  },
  difficulty: 'beginner',
  createdAt: new Date().toISOString()
};

// ==================== Mock Youth Polls ====================

export const mockYouthPolls: YouthPollDTO[] = [
  {
    id: 'yp_001',
    title: {
      fr: 'Ton avis sur les espaces jeunes',
      de: 'Deine Meinung zu Jugendräumen',
      en: 'Your opinion on youth spaces',
    },
    description: {
      fr: 'Aide-nous à créer des lieux qui te ressemblent ! Dis-nous ce que tu attends des espaces dédiés aux jeunes dans notre commune.',
      de: 'Hilf uns, Orte zu schaffen, die dir entsprechen! Sag uns, was du von den Jugendräumen in unserer Gemeinde erwartest.',
      en: 'Help us create spaces that reflect you! Tell us what you expect from youth spaces in our community.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop',
    themeId: 'youth',
    themeName: {
      fr: 'Jeunesse',
      de: 'Jugend',
      en: 'Youth',
    },
    organizer: {
      id: 'org_001',
      name: {
        fr: 'Service Jeunesse Municipal',
        de: 'Gemeindlicher Jugenddienst',
        en: 'Municipal Youth Service',
      },
      type: 'municipal',
      logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&h=100&fit=crop',
    },
    status: 'active',
    targetAge: '16-18',
    questions: [
      {
        id: 'q_001',
        question: {
          fr: 'Quel type d\'espace préfères-tu ?',
          de: 'Welche Art von Raum bevorzugst du?',
          en: 'What type of space do you prefer?',
        },
        type: 'single_choice',
        required: true,
        options: [
          {
            id: 'opt_001',
            text: {
              fr: 'Espace sportif 🏀',
              de: 'Sportraum 🏀',
              en: 'Sports space 🏀',
            },
            emoji: '🏀',
            voteCount: 245,
            percentage: 35,
          },
          {
            id: 'opt_002',
            text: {
              fr: 'Espace créatif 🎨',
              de: 'Kreativer Raum 🎨',
              en: 'Creative space 🎨',
            },
            emoji: '🎨',
            voteCount: 189,
            percentage: 27,
          },
          {
            id: 'opt_003',
            text: {
              fr: 'Espace détente 🎮',
              de: 'Entspannungsraum 🎮',
              en: 'Chill space 🎮',
            },
            emoji: '🎮',
            voteCount: 156,
            percentage: 22,
          },
          {
            id: 'opt_004',
            text: {
              fr: 'Espace étude 📚',
              de: 'Lernraum 📚',
              en: 'Study space 📚',
            },
            emoji: '📚',
            voteCount: 112,
            percentage: 16,
          },
        ],
      },
      {
        id: 'q_002',
        question: {
          fr: 'Quels équipements sont importants pour toi ? (3 max)',
          de: 'Welche Ausstattung ist dir wichtig? (max. 3)',
          en: 'What equipment is important to you? (max 3)',
        },
        type: 'multiple_choice',
        required: true,
        options: [
          {
            id: 'opt_005',
            text: {
              fr: 'WiFi gratuit',
              de: 'Kostenloses WLAN',
              en: 'Free WiFi',
            },
            voteCount: 523,
          },
          {
            id: 'opt_006',
            text: {
              fr: 'Consoles de jeux',
              de: 'Spielkonsolen',
              en: 'Game consoles',
            },
            voteCount: 412,
          },
          {
            id: 'opt_007',
            text: {
              fr: 'Matériel artistique',
              de: 'Künstlerbedarf',
              en: 'Art supplies',
            },
            voteCount: 298,
          },
          {
            id: 'opt_008',
            text: {
              fr: 'Équipement sportif',
              de: 'Sportgeräte',
              en: 'Sports equipment',
            },
            voteCount: 356,
          },
          {
            id: 'opt_009',
            text: {
              fr: 'Espace cuisine',
              de: 'Küchenbereich',
              en: 'Kitchen area',
            },
            voteCount: 287,
          },
        ],
        maxSelections: 3,
      },
      {
        id: 'q_003',
        question: {
          fr: 'Comment évalues-tu les espaces jeunes actuels ?',
          de: 'Wie bewertest du die aktuellen Jugendräume?',
          en: 'How do you rate the current youth spaces?',
        },
        type: 'rating',
        required: false,
        options: [],
        minRating: 1,
        maxRating: 5,
      },
    ],
    totalResponses: 702,
    estimatedDuration: 3,
    createdAt: '2025-12-15T10:00:00Z',
    startDate: '2026-01-01T00:00:00Z',
    endDate: '2026-02-15T23:59:59Z',
    publishedAt: '2026-01-01T00:00:00Z',
    tags: ['espaces', 'jeunesse', 'loisirs'],
    featured: true,
    gamificationPoints: 50,
    hasUserResponded: false,
  },
  {
    id: 'yp_002',
    title: {
      fr: 'Transports scolaires : dis-nous tout !',
      de: 'Schulbusse: Sag uns alles!',
      en: 'School transport: tell us everything!',
    },
    description: {
      fr: 'On veut améliorer les transports scolaires. Partage ton expérience quotidienne avec nous !',
      de: 'Wir wollen den Schulverkehr verbessern. Teile deine tägliche Erfahrung mit uns!',
      en: 'We want to improve school transport. Share your daily experience with us!',
    },
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=400&fit=crop',
    themeId: 'urb',
    themeName: {
      fr: 'Urbanisme & Mobilité',
      de: 'Stadtplanung & Mobilität',
      en: 'Urban Planning & Mobility',
    },
    organizer: {
      id: 'org_001',
      name: {
        fr: 'Service Jeunesse Municipal',
        de: 'Gemeindlicher Jugenddienst',
        en: 'Municipal Youth Service',
      },
      type: 'municipal',
    },
    status: 'active',
    targetAge: '12-15',
    questions: [
      {
        id: 'q_004',
        question: {
          fr: 'Comment vas-tu à l\'école ?',
          de: 'Wie kommst du zur Schule?',
          en: 'How do you get to school?',
        },
        type: 'single_choice',
        required: true,
        options: [
          {
            id: 'opt_010',
            text: {
              fr: 'Bus scolaire 🚌',
              de: 'Schulbus 🚌',
              en: 'School bus 🚌',
            },
            emoji: '🚌',
            voteCount: 312,
            percentage: 52,
          },
          {
            id: 'opt_011',
            text: {
              fr: 'À pied 🚶',
              de: 'Zu Fuß 🚶',
              en: 'On foot 🚶',
            },
            emoji: '🚶',
            voteCount: 145,
            percentage: 24,
          },
          {
            id: 'opt_012',
            text: {
              fr: 'À vélo 🚲',
              de: 'Mit dem Fahrrad 🚲',
              en: 'By bike 🚲',
            },
            emoji: '🚲',
            voteCount: 89,
            percentage: 15,
          },
          {
            id: 'opt_013',
            text: {
              fr: 'En voiture 🚗',
              de: 'Mit dem Auto 🚗',
              en: 'By car 🚗',
            },
            emoji: '🚗',
            voteCount: 54,
            percentage: 9,
          },
        ],
      },
      {
        id: 'q_005',
        question: {
          fr: 'Es-tu satisfait(e) de ton trajet ?',
          de: 'Bist du mit deiner Fahrt zufrieden?',
          en: 'Are you satisfied with your journey?',
        },
        type: 'emoji',
        required: true,
        options: [
          {
            id: 'opt_014',
            text: {
              fr: 'Très content 😄',
              de: 'Sehr zufrieden 😄',
              en: 'Very happy 😄',
            },
            emoji: '😄',
            voteCount: 78,
            percentage: 13,
          },
          {
            id: 'opt_015',
            text: {
              fr: 'Content 🙂',
              de: 'Zufrieden 🙂',
              en: 'Happy 🙂',
            },
            emoji: '🙂',
            voteCount: 234,
            percentage: 39,
          },
          {
            id: 'opt_016',
            text: {
              fr: 'Moyen 😐',
              de: 'Mittel 😐',
              en: 'Okay 😐',
            },
            emoji: '😐',
            voteCount: 189,
            percentage: 31,
          },
          {
            id: 'opt_017',
            text: {
              fr: 'Pas content 😞',
              de: 'Unzufrieden 😞',
              en: 'Unhappy 😞',
            },
            emoji: '😞',
            voteCount: 99,
            percentage: 17,
          },
        ],
      },
      {
        id: 'q_005b',
        question: {
          fr: 'Qu\'est-ce qui pourrait améliorer ton trajet ? (plusieurs choix possibles)',
          de: 'Was könnte deine Fahrt verbessern? (Mehrfachauswahl)',
          en: 'What could improve your journey? (multiple choices)',
        },
        type: 'multiple_choice',
        required: false,
        maxSelections: 3,
        options: [
          {
            id: 'opt_017a',
            text: {
              fr: 'Plus de fréquence ⏰',
              de: 'Mehr Fahrten ⏰',
              en: 'More frequency ⏰',
            },
            emoji: '⏰',
            voteCount: 289,
          },
          {
            id: 'opt_017b',
            text: {
              fr: 'Moins d\'attente ⏱️',
              de: 'Weniger Wartezeit ⏱️',
              en: 'Less waiting ⏱️',
            },
            emoji: '⏱️',
            voteCount: 312,
          },
          {
            id: 'opt_017c',
            text: {
              fr: 'Bus plus confortables 🛋️',
              de: 'Komfortablere Busse 🛋️',
              en: 'More comfortable buses 🛋️',
            },
            emoji: '🛋️',
            voteCount: 234,
          },
          {
            id: 'opt_017d',
            text: {
              fr: 'Nouveaux arrêts 📍',
              de: 'Neue Haltestellen 📍',
              en: 'New stops 📍',
            },
            emoji: '📍',
            voteCount: 178,
          },
          {
            id: 'opt_017e',
            text: {
              fr: 'Pistes cyclables sécurisées 🚴',
              de: 'Sichere Radwege 🚴',
              en: 'Safe bike lanes 🚴',
            },
            emoji: '🚴',
            voteCount: 267,
          },
        ],
      },
    ],
    totalResponses: 600,
    estimatedDuration: 3,
    createdAt: '2025-12-20T10:00:00Z',
    startDate: '2026-01-05T00:00:00Z',
    endDate: '2026-01-31T23:59:59Z',
    publishedAt: '2026-01-05T00:00:00Z',
    tags: ['transport', 'école', 'mobilité'],
    featured: true,
    gamificationPoints: 30,
    hasUserResponded: false,
  },
  {
    id: 'yp_003',
    title: {
      fr: 'Événements culturels : qu\'est-ce qui te plaît ?',
      de: 'Kulturelle Veranstaltungen: Was gefällt dir?',
      en: 'Cultural events: what do you like?',
    },
    description: {
      fr: 'Aide-nous à organiser des événements qui te passionnent vraiment !',
      de: 'Hilf uns, Veranstaltungen zu organisieren, die dich wirklich begeistern!',
      en: 'Help us organize events that you\'re really passionate about!',
    },
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=400&fit=crop',
    themeId: 'cul',
    themeName: {
      fr: 'Culture',
      de: 'Kultur',
      en: 'Culture',
    },
    organizer: {
      id: 'org_002',
      name: {
        fr: 'Service Culturel',
        de: 'Kulturamt',
        en: 'Cultural Service',
      },
      type: 'municipal',
    },
    status: 'active',
    targetAge: '19-25',
    questions: [
      {
        id: 'q_006',
        question: {
          fr: 'Quels types d\'événements t\'intéressent ? (plusieurs choix possibles)',
          de: 'Welche Art von Veranstaltungen interessiert dich? (Mehrfachauswahl)',
          en: 'What types of events interest you? (multiple choices)',
        },
        type: 'multiple_choice',
        required: true,
        options: [
          {
            id: 'opt_018',
            text: {
              fr: 'Concerts live 🎵',
              de: 'Live-Konzerte 🎵',
              en: 'Live concerts 🎵',
            },
            emoji: '🎵',
            voteCount: 489,
          },
          {
            id: 'opt_019',
            text: {
              fr: 'Festivals 🎪',
              de: 'Festivals 🎪',
              en: 'Festivals 🎪',
            },
            emoji: '🎪',
            voteCount: 412,
          },
          {
            id: 'opt_020',
            text: {
              fr: 'Expositions 🎨',
              de: 'Ausstellungen 🎨',
              en: 'Exhibitions 🎨',
            },
            emoji: '🎨',
            voteCount: 234,
          },
          {
            id: 'opt_021',
            text: {
              fr: 'Cinéma en plein air 🎬',
              de: 'Open-Air-Kino 🎬',
              en: 'Outdoor cinema 🎬',
            },
            emoji: '🎬',
            voteCount: 356,
          },
          {
            id: 'opt_022',
            text: {
              fr: 'Théâtre 🎭',
              de: 'Theater 🎭',
              en: 'Theater 🎭',
            },
            emoji: '🎭',
            voteCount: 178,
          },
          {
            id: 'opt_023',
            text: {
              fr: 'Soirées gaming 🎮',
              de: 'Gaming-Abende 🎮',
              en: 'Gaming nights 🎮',
            },
            emoji: '🎮',
            voteCount: 298,
          },
        ],
        maxSelections: 5,
      },
      {
        id: 'q_006b',
        question: {
          fr: 'Quelle fréquence d\'événements préfères-tu ?',
          de: 'Welche Veranstaltungshäufigkeit bevorzugst du?',
          en: 'What frequency of events do you prefer?',
        },
        type: 'single_choice',
        required: true,
        options: [
          {
            id: 'opt_023a',
            text: {
              fr: 'Chaque semaine 📅',
              de: 'Jede Woche 📅',
              en: 'Every week 📅',
            },
            emoji: '📅',
            voteCount: 145,
            percentage: 28,
          },
          {
            id: 'opt_023b',
            text: {
              fr: 'Toutes les deux semaines 🗓️',
              de: 'Alle zwei Wochen 🗓️',
              en: 'Every two weeks 🗓️',
            },
            emoji: '🗓️',
            voteCount: 234,
            percentage: 45,
          },
          {
            id: 'opt_023c',
            text: {
              fr: 'Une fois par mois 📆',
              de: 'Einmal pro Monat 📆',
              en: 'Once a month 📆',
            },
            emoji: '📆',
            voteCount: 144,
            percentage: 27,
          },
        ],
      },
      {
        id: 'q_006c',
        question: {
          fr: 'Serais-tu intéressé(e) pour aider à organiser des événements ?',
          de: 'Würdest du bei der Organisation von Veranstaltungen helfen?',
          en: 'Would you be interested in helping organize events?',
        },
        type: 'yes_no',
        required: false,
        options: [
          {
            id: 'opt_023d',
            text: {
              fr: 'Oui, volontiers ! 🙌',
              de: 'Ja, gerne! 🙌',
              en: 'Yes, gladly! 🙌',
            },
            emoji: '🙌',
            voteCount: 198,
            percentage: 38,
          },
          {
            id: 'opt_023e',
            text: {
              fr: 'Non, merci 🙅',
              de: 'Nein, danke 🙅',
              en: 'No, thank you 🙅',
            },
            emoji: '🙅',
            voteCount: 325,
            percentage: 62,
          },
        ],
      },
    ],
    totalResponses: 523,
    estimatedDuration: 2,
    createdAt: '2025-11-30T10:00:00Z',
    startDate: '2025-12-15T00:00:00Z',
    endDate: '2026-01-30T23:59:59Z',
    publishedAt: '2025-12-15T00:00:00Z',
    tags: ['culture', 'événements', 'loisirs'],
    featured: false,
    gamificationPoints: 25,
    hasUserResponded: false,
  },
  {
    id: 'yp_004',
    title: {
      fr: 'Apprentissage et orientation',
      de: 'Lernen und Orientierung',
      en: 'Learning and career guidance',
    },
    description: {
      fr: 'Ton avis sur les dispositifs d\'aide à l\'orientation et à la formation professionnelle',
      de: 'Deine Meinung zu den Berufsberatungs- und Ausbildungshilfen',
      en: 'Your opinion on career guidance and vocational training support',
    },
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop',
    themeId: 'edu',
    themeName: {
      fr: 'Éducation',
      de: 'Bildung',
      en: 'Education',
    },
    organizer: {
      id: 'org_001',
      name: {
        fr: 'Service Jeunesse Municipal',
        de: 'Gemeindlicher Jugenddienst',
        en: 'Municipal Youth Service',
      },
      type: 'municipal',
    },
    status: 'active',
    targetAge: '16-18',
    questions: [
      {
        id: 'q_007',
        question: {
          fr: 'As-tu besoin d\'aide pour ton orientation ?',
          de: 'Brauchst du Hilfe bei deiner Berufsorientierung?',
          en: 'Do you need help with career guidance?',
        },
        type: 'yes_no',
        required: true,
        options: [
          {
            id: 'opt_024',
            text: {
              fr: 'Oui, beaucoup',
              de: 'Ja, sehr',
              en: 'Yes, a lot',
            },
            voteCount: 234,
            percentage: 58,
          },
          {
            id: 'opt_025',
            text: {
              fr: 'Non, ça va',
              de: 'Nein, es geht',
              en: 'No, I\'m fine',
            },
            voteCount: 168,
            percentage: 42,
          },
        ],
      },
      {
        id: 'q_007b',
        question: {
          fr: 'Quel type de formation t\'intéresse le plus ?',
          de: 'Welche Art von Ausbildung interessiert dich am meisten?',
          en: 'What type of training interests you most?',
        },
        type: 'single_choice',
        required: true,
        options: [
          {
            id: 'opt_025a',
            text: {
              fr: 'Formation professionnelle 🛠️',
              de: 'Berufsausbildung 🛠️',
              en: 'Vocational training 🛠️',
            },
            emoji: '🛠️',
            voteCount: 156,
            percentage: 39,
          },
          {
            id: 'opt_025b',
            text: {
              fr: 'Études universitaires 🎓',
              de: 'Universitätsstudium 🎓',
              en: 'University studies 🎓',
            },
            emoji: '🎓',
            voteCount: 178,
            percentage: 44,
          },
          {
            id: 'opt_025c',
            text: {
              fr: 'Apprentissage en entreprise 💼',
              de: 'Ausbildung im Unternehmen 💼',
              en: 'Company apprenticeship 💼',
            },
            emoji: '💼',
            voteCount: 68,
            percentage: 17,
          },
        ],
      },
      {
        id: 'q_007c',
        question: {
          fr: 'Quels services d\'orientation souhaiterais-tu ? (plusieurs choix possibles)',
          de: 'Welche Beratungsdienste wünschst du dir? (Mehrfachauswahl)',
          en: 'What guidance services would you like? (multiple choices)',
        },
        type: 'multiple_choice',
        required: false,
        maxSelections: 3,
        options: [
          {
            id: 'opt_025d',
            text: {
              fr: 'Rencontres avec des professionnels 👥',
              de: 'Treffen mit Fachleuten 👥',
              en: 'Meet professionals 👥',
            },
            emoji: '👥',
            voteCount: 267,
          },
          {
            id: 'opt_025e',
            text: {
              fr: 'Stages découverte 🔍',
              de: 'Schnupperpraktika 🔍',
              en: 'Discovery internships 🔍',
            },
            emoji: '🔍',
            voteCount: 312,
          },
          {
            id: 'opt_025f',
            text: {
              fr: 'Ateliers CV et motivation ✍️',
              de: 'CV- und Motivations-Workshops ✍️',
              en: 'CV and motivation workshops ✍️',
            },
            emoji: '✍️',
            voteCount: 198,
          },
          {
            id: 'opt_025g',
            text: {
              fr: 'Conseils personnalisés 💬',
              de: 'Persönliche Beratung 💬',
              en: 'Personalized advice 💬',
            },
            emoji: '💬',
            voteCount: 289,
          },
        ],
      },
    ],
    totalResponses: 402,
    estimatedDuration: 1,
    createdAt: '2025-11-01T10:00:00Z',
    startDate: '2025-11-15T00:00:00Z',
    endDate: '2025-12-31T23:59:59Z',
    publishedAt: '2025-11-15T00:00:00Z',
    tags: ['orientation', 'formation', 'éducation'],
    featured: false,
    gamificationPoints: 20,
    hasUserResponded: false,
  },
  {
    id: 'yp_005',
    title: {
      fr: '🎮 Jeux vidéo et e-sport',
      de: '🎮 Videospiele und E-Sport',
      en: '🎮 Video games and e-sports',
    },
    description: {
      fr: 'Aimerais-tu des tournois e-sport et compétitions gaming dans ta commune ?',
      de: 'Möchtest du E-Sport-Turniere und Gaming-Wettbewerbe in deiner Gemeinde?',
      en: 'Would you like e-sports tournaments and gaming competitions in your community?',
    },
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop',
    themeId: 'youth',
    themeName: {
      fr: 'Jeunesse',
      de: 'Jugend',
      en: 'Youth',
    },
    organizer: {
      id: 'org_001',
      name: {
        fr: 'Service Jeunesse Municipal',
        de: 'Gemeindlicher Jugenddienst',
        en: 'Municipal Youth Service',
      },
      type: 'municipal',
    },
    status: 'active',
    targetAge: '16-18',
    questions: [
      {
        id: 'q_008',
        question: {
          fr: 'Aimerais-tu qu\'on organise des tournois e-sport ?',
          de: 'Möchtest du, dass wir E-Sport-Turniere organisieren?',
          en: 'Would you like us to organize e-sports tournaments?',
        },
        type: 'yes_no',
        required: true,
        options: [
          {
            id: 'opt_026',
            text: {
              fr: 'Oui 👍',
              de: 'Ja 👍',
              en: 'Yes 👍',
            },
            emoji: '👍',
            voteCount: 387,
            percentage: 78,
          },
          {
            id: 'opt_027',
            text: {
              fr: 'Non 👎',
              de: 'Nein 👎',
              en: 'No 👎',
            },
            emoji: '👎',
            voteCount: 109,
            percentage: 22,
          },
        ],
      },
      {
        id: 'q_009',
        question: {
          fr: 'Quels jeux préfères-tu ? (3 max)',
          de: 'Welche Spiele bevorzugst du? (max. 3)',
          en: 'Which games do you prefer? (max 3)',
        },
        type: 'multiple_choice',
        required: false,
        maxSelections: 3,
        options: [
          {
            id: 'opt_028',
            text: {
              fr: 'League of Legends 🎮',
              de: 'League of Legends 🎮',
              en: 'League of Legends 🎮',
            },
            emoji: '🎮',
            voteCount: 234,
          },
          {
            id: 'opt_029',
            text: {
              fr: 'Valorant 🔫',
              de: 'Valorant 🔫',
              en: 'Valorant 🔫',
            },
            emoji: '🔫',
            voteCount: 198,
          },
          {
            id: 'opt_030',
            text: {
              fr: 'FIFA/FC ⚽',
              de: 'FIFA/FC ⚽',
              en: 'FIFA/FC ⚽',
            },
            emoji: '⚽',
            voteCount: 312,
          },
          {
            id: 'opt_031',
            text: {
              fr: 'Fortnite 🏝️',
              de: 'Fortnite 🏝️',
              en: 'Fortnite 🏝️',
            },
            emoji: '🏝️',
            voteCount: 156,
          },
        ],
      },
    ],
    totalResponses: 496,
    estimatedDuration: 1,
    createdAt: '2026-01-01T08:00:00Z',
    startDate: '2026-01-10T00:00:00Z',
    endDate: '2026-02-28T23:59:59Z',
    publishedAt: '2026-01-10T00:00:00Z',
    tags: ['gaming', 'e-sport', 'loisirs'],
    featured: true,
    gamificationPoints: 40,
    hasUserResponded: false,
  },
  {
    id: 'yp_006',
    title: {
      fr: '🌍 Climat : ton engagement',
      de: '🌍 Klima: Dein Engagement',
      en: '🌍 Climate: your commitment',
    },
    description: {
      fr: 'Que fais-tu pour l\'environnement ? Partage tes actions et idées !',
      de: 'Was tust du für die Umwelt? Teile deine Aktionen und Ideen!',
      en: 'What are you doing for the environment? Share your actions and ideas!',
    },
    imageUrl: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800&h=400&fit=crop',
    themeId: 'env',
    themeName: {
      fr: 'Environnement',
      de: 'Umwelt',
      en: 'Environment',
    },
    organizer: {
      id: 'org_003',
      name: {
        fr: 'Service Environnement',
        de: 'Umweltamt',
        en: 'Environmental Service',
      },
      type: 'municipal',
    },
    status: 'active',
    targetAge: 'all',
    questions: [
      {
        id: 'q_010',
        question: {
          fr: 'À quelle fréquence tries-tu tes déchets ?',
          de: 'Wie oft trennst du deinen Müll?',
          en: 'How often do you sort your waste?',
        },
        type: 'single_choice',
        required: true,
        options: [
          {
            id: 'opt_032',
            text: {
              fr: 'Toujours ♻️',
              de: 'Immer ♻️',
              en: 'Always ♻️',
            },
            emoji: '♻���',
            voteCount: 423,
            percentage: 62,
          },
          {
            id: 'opt_033',
            text: {
              fr: 'Souvent 🗑️',
              de: 'Oft 🗑️',
              en: 'Often 🗑️',
            },
            emoji: '🗑️',
            voteCount: 189,
            percentage: 28,
          },
          {
            id: 'opt_034',
            text: {
              fr: 'Parfois 🤷',
              de: 'Manchmal 🤷',
              en: 'Sometimes 🤷',
            },
            emoji: '🤷',
            voteCount: 68,
            percentage: 10,
          },
        ],
      },
      {
        id: 'q_011',
        question: {
          fr: 'Quelles actions aimerais-tu que la commune soutienne ?',
          de: 'Welche Aktionen soll die Gemeinde unterstützen?',
          en: 'What actions would you like the community to support?',
        },
        type: 'multiple_choice',
        required: true,
        options: [
          {
            id: 'opt_035',
            text: {
              fr: 'Ateliers de réparation 🔧',
              de: 'Reparaturwerkstätten 🔧',
              en: 'Repair workshops 🔧',
            },
            emoji: '🔧',
            voteCount: 312,
          },
          {
            id: 'opt_036',
            text: {
              fr: 'Vélos en libre-service 🚲',
              de: 'Fahrradverleih 🚲',
              en: 'Bike sharing 🚲',
            },
            emoji: '🚲',
            voteCount: 456,
          },
          {
            id: 'opt_037',
            text: {
              fr: 'Jardins partagés 🌱',
              de: 'Gemeinschaftsgärten 🌱',
              en: 'Community gardens 🌱',
            },
            emoji: '🌱',
            voteCount: 389,
          },
          {
            id: 'opt_038',
            text: {
              fr: 'Clean-up days 🧹',
              de: 'Aufräumtage 🧹',
              en: 'Clean-up days 🧹',
            },
            emoji: '🧹',
            voteCount: 267,
          },
        ],
      },
    ],
    totalResponses: 680,
    estimatedDuration: 2,
    createdAt: '2026-01-05T12:00:00Z',
    startDate: '2026-01-12T00:00:00Z',
    endDate: '2026-03-01T23:59:59Z',
    publishedAt: '2026-01-12T00:00:00Z',
    tags: ['environnement', 'climat', 'écologie'],
    featured: false,
    gamificationPoints: 35,
    hasUserResponded: false,
  },
];

export const mockYouthSpaceStats: YouthSpaceStatsDTO = {
  totalPolls: 6,
  activePolls: 6,
  totalParticipants: 2847,
  totalPointsDistributed: 105,
  completedPolls: 1,
  upcomingPolls: 2,
};

// ==================== Mock IVR Data ====================

export const mockIVRResponses: import('../types').IVRResponseDTO[] = [
  {
    id: 'ivr_resp_001',
    channel: 'phone',
    phoneNumber: '***-***-4521',
    participationType: 'consultation',
    processId: 'cons_001',
    processTitle: {
      fr: 'Aménagement du parc urbain',
      de: 'Gestaltung des Stadtparks',
      en: 'Urban park development'
    },
    responses: [
      {
        questionId: 'q_001',
        questionText: {
          fr: 'Souhaitez-vous plus d\'espaces verts ?',
          de: 'Möchten Sie mehr Grünflächen?',
          en: 'Do you want more green spaces?'
        },
        answer: 'Oui',
        answeredAt: '2026-01-10T14:32:10Z'
      },
      {
        questionId: 'q_002',
        questionText: {
          fr: 'Priorité pour les aires de jeux ?',
          de: 'Priorität für Spielplätze?',
          en: 'Priority for playgrounds?'
        },
        answer: 'Très important',
        answeredAt: '2026-01-10T14:32:45Z'
      }
    ],
    status: 'completed',
    language: 'fr',
    duration: 145,
    completedAt: '2026-01-10T14:34:35Z',
    createdAt: '2026-01-10T14:32:00Z',
    region: 'Genève',
    demographicData: {
      ageRange: '51-65',
      accessibilityNeeds: true
    }
  },
  {
    id: 'ivr_resp_002',
    channel: 'sms',
    phoneNumber: '***-***-7893',
    participationType: 'vote',
    processId: 'vote_001',
    processTitle: {
      fr: 'Budget participatif 2026',
      de: 'Partizipatives Budget 2026',
      en: 'Participatory budget 2026'
    },
    responses: [
      {
        questionId: 'q_vote_001',
        questionText: {
          fr: 'Quel projet soutenez-vous ?',
          de: 'Welches Projekt unterstützen Sie?',
          en: 'Which project do you support?'
        },
        answer: 'Projet A - Pistes cyclables',
        answeredAt: '2026-01-11T09:15:20Z'
      }
    ],
    status: 'completed',
    language: 'fr',
    duration: 65,
    completedAt: '2026-01-11T09:16:25Z',
    createdAt: '2026-01-11T09:15:00Z',
    region: 'Lausanne'
  },
  {
    id: 'ivr_resp_003',
    channel: 'automated_call',
    phoneNumber: '***-***-2341',
    participationType: 'petition',
    processId: 'pet_001',
    processTitle: {
      fr: 'Pour un air plus pur',
      de: 'Für sauberere Luft',
      en: 'For cleaner air'
    },
    responses: [
      {
        questionId: 'q_sign',
        questionText: {
          fr: 'Souhaitez-vous signer cette pétition ?',
          de: 'Möchten Sie diese Petition unterzeichnen?',
          en: 'Do you wish to sign this petition?'
        },
        answer: 'Oui',
        answeredAt: '2026-01-12T16:20:15Z'
      }
    ],
    status: 'completed',
    language: 'de',
    duration: 45,
    completedAt: '2026-01-12T16:21:00Z',
    createdAt: '2026-01-12T16:20:00Z',
    region: 'Zürich',
    demographicData: {
      ageRange: '65+',
      accessibilityNeeds: true
    }
  },
  {
    id: 'ivr_resp_004',
    channel: 'phone',
    phoneNumber: '***-***-9876',
    participationType: 'poll',
    processId: 'yp_001',
    processTitle: {
      fr: 'Sondage sur les transports scolaires',
      de: 'Umfrage zu Schultransporten',
      en: 'Survey on school transport'
    },
    responses: [
      {
        questionId: 'q_transport_001',
        questionText: {
          fr: 'Utilisez-vous les transports scolaires ?',
          de: 'Nutzen Sie Schultransporte?',
          en: 'Do you use school transport?'
        },
        answer: 'Non',
        answeredAt: '2026-01-09T11:45:10Z'
      }
    ],
    status: 'partial',
    language: 'fr',
    duration: 25,
    createdAt: '2026-01-09T11:45:00Z',
    region: 'Fribourg'
  },
  {
    id: 'ivr_resp_005',
    channel: 'sms',
    phoneNumber: '***-***-5544',
    participationType: 'consultation',
    processId: 'cons_002',
    processTitle: {
      fr: 'Nouvelle bibliothèque municipale',
      de: 'Neue Stadtbibliothek',
      en: 'New municipal library'
    },
    responses: [
      {
        questionId: 'q_lib_001',
        questionText: {
          fr: 'Fréquence de visite souhaitée ?',
          de: 'Gewünschte Besuchshäufigkeit?',
          en: 'Desired visit frequency?'
        },
        answer: 'Hebdomadaire',
        answeredAt: '2026-01-13T10:30:00Z'
      },
      {
        questionId: 'q_lib_002',
        questionText: {
          fr: 'Services prioritaires ?',
          de: 'Prioritäre Dienstleistungen?',
          en: 'Priority services?'
        },
        answer: 'Espace numérique',
        answeredAt: '2026-01-13T10:31:15Z'
      }
    ],
    status: 'completed',
    language: 'en',
    duration: 95,
    completedAt: '2026-01-13T10:31:35Z',
    createdAt: '2026-01-13T10:30:00Z',
    region: 'Bern',
    demographicData: {
      ageRange: '36-50'
    }
  }
];

export const mockIVRStats: import('../types').IVRStatsDTO = {
  totalResponses: 347,
  completedResponses: 312,
  partialResponses: 28,
  abandonedResponses: 7,
  byChannel: {
    phone: 189,
    sms: 121,
    automated_call: 37
  },
  byLanguage: {
    fr: 198,
    de: 112,
    en: 37
  },
  byParticipationType: {
    consultation: 145,
    vote: 87,
    petition: 64,
    poll: 38,
    survey: 13
  },
  averageDuration: 127,
  peakHours: [
    { hour: 9, responseCount: 42 },
    { hour: 10, responseCount: 38 },
    { hour: 14, responseCount: 35 },
    { hour: 16, responseCount: 41 },
    { hour: 18, responseCount: 47 },
    { hour: 19, responseCount: 39 }
  ],
  geographicDistribution: [
    { region: 'Genève', count: 98, percentage: 28.2 },
    { region: 'Lausanne', count: 76, percentage: 21.9 },
    { region: 'Zürich', count: 64, percentage: 18.4 },
    { region: 'Bern', count: 52, percentage: 15.0 },
    { region: 'Fribourg', count: 34, percentage: 9.8 },
    { region: 'Neuchâtel', count: 23, percentage: 6.6 }
  ],
  accessibilityImpact: {
    totalAccessibilityUsers: 142,
    percentageOfTotal: 40.9
  },
  timeSeriesData: [
    { date: '2026-01-06', responses: 18 },
    { date: '2026-01-07', responses: 24 },
    { date: '2026-01-08', responses: 31 },
    { date: '2026-01-09', responses: 28 },
    { date: '2026-01-10', responses: 42 },
    { date: '2026-01-11', responses: 36 },
    { date: '2026-01-12', responses: 39 },
    { date: '2026-01-13', responses: 45 }
  ]
};

export const mockIVRCampaigns: import('../types').IVRCampaignDTO[] = [
  {
    id: 'ivr_camp_001',
    name: {
      fr: 'Campagne parc urbain',
      de: 'Stadtpark-Kampagne',
      en: 'Urban park campaign'
    },
    description: {
      fr: 'Sensibilisation téléphonique pour la consultation sur le nouveau parc',
      de: 'Telefonische Sensibilisierung für die Konsultation zum neuen Park',
      en: 'Phone outreach for the new park consultation'
    },
    participationType: 'consultation',
    processId: 'cons_001',
    channels: ['phone', 'automated_call'],
    status: 'active',
    startDate: '2026-01-10T00:00:00Z',
    endDate: '2026-01-31T23:59:59Z',
    targetAudience: {
      regions: ['Genève', 'Lausanne'],
      ageRanges: ['51-65', '65+'],
      languages: ['fr', 'de']
    },
    script: [
      {
        language: 'fr',
        greeting: 'Bonjour, vous êtes contacté par la commune de Genève pour une consultation sur le nouveau parc urbain.',
        questions: [
          {
            id: 'q_001',
            text: 'Souhaitez-vous plus d\'espaces verts dans le parc ?',
            type: 'yes_no'
          },
          {
            id: 'q_002',
            text: 'Quelle est votre priorité ? Tapez 1 pour aires de jeux, 2 pour espaces sportifs, 3 pour zones de détente',
            type: 'choice',
            options: ['Aires de jeux', 'Espaces sportifs', 'Zones de détente']
          }
        ],
        closing: 'Merci pour votre participation. Vos réponses aideront à créer un parc qui répond à vos besoins.'
      },
      {
        language: 'de',
        greeting: 'Guten Tag, Sie werden von der Gemeinde Genf für eine Konsultation zum neuen Stadtpark kontaktiert.',
        questions: [
          {
            id: 'q_001',
            text: 'Möchten Sie mehr Grünflächen im Park?',
            type: 'yes_no'
          },
          {
            id: 'q_002',
            text: 'Was ist Ihre Priorität? Drücken Sie 1 für Spielplätze, 2 für Sportbereiche, 3 für Ruhezonen',
            type: 'choice',
            options: ['Spielplätze', 'Sportbereiche', 'Ruhezonen']
          }
        ],
        closing: 'Vielen Dank für Ihre Teilnahme. Ihre Antworten helfen dabei, einen Park zu schaffen, der Ihren Bedürfnissen entspricht.'
      }
    ],
    stats: {
      totalCalls: 250,
      completedCalls: 189,
      responses: 189
    },
    createdAt: '2026-01-05T10:00:00Z',
    updatedAt: '2026-01-13T15:30:00Z'
  },
  {
    id: 'ivr_camp_002',
    name: {
      fr: 'Budget participatif - SMS',
      de: 'Partizipatives Budget - SMS',
      en: 'Participatory budget - SMS'
    },
    description: {
      fr: 'Campagne SMS pour voter sur les projets du budget participatif',
      de: 'SMS-Kampagne zur Abstimmung über partizipative Budgetprojekte',
      en: 'SMS campaign to vote on participatory budget projects'
    },
    participationType: 'vote',
    processId: 'vote_001',
    channels: ['sms'],
    status: 'active',
    startDate: '2026-01-08T00:00:00Z',
    endDate: '2026-01-20T23:59:59Z',
    targetAudience: {
      regions: ['Lausanne', 'Fribourg'],
      languages: ['fr', 'en']
    },
    script: [
      {
        language: 'fr',
        greeting: 'Commune de Lausanne - Vote budget participatif',
        questions: [
          {
            id: 'q_vote_001',
            text: 'Quel projet soutenez-vous ? Répondez A (pistes cyclables), B (parc enfants) ou C (bibliothèque)',
            type: 'choice',
            options: ['A - Pistes cyclables', 'B - Parc enfants', 'C - Bibliothèque']
          }
        ],
        closing: 'Merci ! Votre vote a été enregistré.'
      }
    ],
    stats: {
      totalCalls: 180,
      completedCalls: 156,
      responses: 156
    },
    createdAt: '2026-01-03T09:00:00Z',
    updatedAt: '2026-01-13T14:20:00Z'
  }
];

export const mockIVRProcessSummaries: import('../types').IVRProcessSummaryDTO[] = [
  {
    processId: 'cons_001',
    processType: 'consultation',
    processTitle: {
      fr: 'Aménagement du parc urbain',
      de: 'Gestaltung des Stadtparks',
      en: 'Urban park development'
    },
    totalIVRResponses: 145,
    totalOnlineResponses: 342,
    ivrPercentage: 29.8,
    responsesByChannel: [
      { channel: 'phone', count: 89, percentage: 61.4 },
      { channel: 'automated_call', count: 37, percentage: 25.5 },
      { channel: 'sms', count: 19, percentage: 13.1 }
    ],
    topRegions: [
      { region: 'Genève', count: 67 },
      { region: 'Lausanne', count: 45 },
      { region: 'Fribourg', count: 33 }
    ],
    insights: [
      {
        fr: '40% des participants IVR sont des personnes à besoins d\'accessibilité',
        de: '40% der IVR-Teilnehmer sind Menschen mit Zugänglichkeitsbedürfnissen',
        en: '40% of IVR participants are people with accessibility needs'
      },
      {
        fr: 'Taux de complétion IVR: 92% (vs 78% en ligne)',
        de: 'IVR-Abschlussrate: 92% (vs. 78% online)',
        en: 'IVR completion rate: 92% (vs 78% online)'
      },
      {
        fr: 'Pic de participation par téléphone: 18h-19h',
        de: 'Spitzenzeiten für Telefonteilnahme: 18-19 Uhr',
        en: 'Peak phone participation: 6-7 PM'
      }
    ]
  },
  {
    processId: 'vote_001',
    processType: 'vote',
    processTitle: {
      fr: 'Budget participatif 2026',
      de: 'Partizipatives Budget 2026',
      en: 'Participatory budget 2026'
    },
    totalIVRResponses: 87,
    totalOnlineResponses: 1243,
    ivrPercentage: 6.5,
    responsesByChannel: [
      { channel: 'sms', count: 67, percentage: 77.0 },
      { channel: 'phone', count: 20, percentage: 23.0 }
    ],
    topRegions: [
      { region: 'Lausanne', count: 52 },
      { region: 'Genève', count: 23 },
      { region: 'Bern', count: 12 }
    ],
    insights: [
      {
        fr: 'SMS privilégié pour les votes rapides (77% des réponses IVR)',
        de: 'SMS bevorzugt für schnelle Abstimmungen (77% der IVR-Antworten)',
        en: 'SMS preferred for quick votes (77% of IVR responses)'
      },
      {
        fr: 'Durée moyenne de vote par SMS: 65 secondes',
        de: 'Durchschnittliche SMS-Abstimmungszeit: 65 Sekunden',
        en: 'Average SMS voting time: 65 seconds'
      }
    ]
  }
];

// ==================== Export all mock data ====================

export const mockApiData = {
  users: mockUsers,
  currentUser: mockCurrentUser,
  themes: mockThemes,
  consultations: mockConsultations,
  consultationSummaries: mockConsultationSummaries,
  petitions: mockPetitions,
  petitionSummaries: mockPetitionSummaries,
  votes: mockVotes,
  voteSummaries: mockVoteSummaries,
  assemblies: mockAssemblies,
  assemblySummaries: mockAssemblySummaries,
  conferences: mockConferences,
  conferenceSummaries: mockConferenceSummaries,
  speakers: mockSpeakers,
  notifications: mockNotifications,
  activities: mockActivities,
  dashboardStats: mockDashboardStats,
  participationHistory: mockParticipationHistory,
  signalements: mockSignalements,
  geoSignalements: mockGeoSignalements,
  signalementStats: mockSignalementStats,
  aiQuickAnswers: mockAIQuickAnswers,
  aiSuggestions: mockAISuggestions,
  aiConversations: mockAIConversations,
  aiSummary: mockAISummary,
  aiExplanation: mockAIExplanation,
  legislativeConsultations: mockLegislativeConsultations,
  legislativeConsultationSummaries: mockLegislativeConsultationSummaries,
  articles: mockArticles,
  articleAnnotations: mockArticleAnnotations,
  legislativeSummaries: mockLegislativeSummaries,
  youthPolls: mockYouthPolls,
  youthSpaceStats: mockYouthSpaceStats,
  ivrResponses: mockIVRResponses,
  ivrStats: mockIVRStats,
  ivrCampaigns: mockIVRCampaigns,
  ivrProcessSummaries: mockIVRProcessSummaries,
  moderationItems: mockModerationItems,
  moderationStats: mockModerationStats,
  moderationRules: mockModerationRules,
  userReports: mockUserReports,
};
