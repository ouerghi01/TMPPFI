// Mock data for the participatory democracy platform

export interface ParticipatoryProcess {
  id: string;
  title: string;
  description: string;
  themeId: string;
  status: 'active' | 'closed' | 'upcoming';
  startDate: string;
  endDate: string;
  participants: number;
  steps: ProcessStep[];
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'completed' | 'active' | 'upcoming';
}

export interface Consultation {
  id: string;
  title: string;
  description: string;
  themeId: string;
  type: 'meeting' | 'debate' | 'proposal';
  status: 'open' | 'closed' | 'upcoming';
  date: string;
  location?: string;
  participants: number;
  supports?: number;
}

export interface Assembly {
  id: string;
  title: string;
  description: string;
  themeId: string;
  members: number;
  nextMeeting: string;
  meetings: AssemblyMeeting[];
}

export interface AssemblyMeeting {
  id: string;
  title: string;
  date: string;
  agenda: string[];
  documents: string[];
}

export interface Petition {
  id: string;
  title: string;
  description: string;
  themeId: string;
  target: number;
  current: number;
  status: 'open' | 'closed' | 'threshold_reached';
  startDate: string;
  endDate: string;
  author: string;
}

export interface Conference {
  id: string;
  title: string;
  description: string;
  themeId: string;
  date: string;
  location: string;
  speakers: string[];
  sessions: number;
  registered: number;
  capacity: number;
}

export interface Vote {
  id: string;
  title: string;
  question: string;
  themeId: string;
  type: 'referendum' | 'consultation';
  status: 'open' | 'closed' | 'upcoming';
  startDate: string;
  endDate: string;
  options: VoteOption[];
  participants?: number;
}

export interface VoteOption {
  id: string;
  text: string;
  votes?: number;
}

// Mock Participatory Processes
export const participatoryProcesses: ParticipatoryProcess[] = [
  {
    id: 'p1',
    title: 'Plan Climat Local 2030',
    description: 'Processus participatif pour définir les objectifs climat de la commune',
    themeId: 'environment',
    status: 'active',
    startDate: '2025-01-15',
    endDate: '2025-06-30',
    participants: 245,
    steps: [
      {
        id: 's1',
        title: 'Phase d\'information',
        description: 'Présentation des enjeux climatiques',
        startDate: '2025-01-15',
        endDate: '2025-02-15',
        status: 'completed',
      },
      {
        id: 's2',
        title: 'Concertation citoyenne',
        description: 'Recueil des propositions des citoyens',
        startDate: '2025-02-16',
        endDate: '2025-04-30',
        status: 'active',
      },
      {
        id: 's3',
        title: 'Vote final',
        description: 'Validation du plan d\'action',
        startDate: '2025-05-01',
        endDate: '2025-06-30',
        status: 'upcoming',
      },
    ],
  },
  {
    id: 'p2',
    title: 'Réaménagement du Centre-Ville',
    description: 'Co-construction du projet d\'aménagement urbain',
    themeId: 'urban',
    status: 'active',
    startDate: '2025-02-01',
    endDate: '2025-08-31',
    participants: 387,
    steps: [
      {
        id: 's4',
        title: 'Diagnostic partagé',
        description: 'Analyse de l\'existant avec les habitants',
        startDate: '2025-02-01',
        endDate: '2025-03-31',
        status: 'active',
      },
      {
        id: 's5',
        title: 'Ateliers de co-création',
        description: 'Définition des aménagements souhaités',
        startDate: '2025-04-01',
        endDate: '2025-06-30',
        status: 'upcoming',
      },
    ],
  },
];

// Mock Consultations
export const consultations: Consultation[] = [
  {
    id: 'c1',
    title: 'Débat : Mobilité douce en ville',
    description: 'Discussion sur le développement des pistes cyclables et piétonnes',
    themeId: 'mobility',
    type: 'debate',
    status: 'open',
    date: '2025-02-15',
    participants: 156,
  },
  {
    id: 'c2',
    title: 'Proposition : Cantine bio locale',
    description: 'Mise en place d\'une cantine scolaire 100% bio et locale',
    themeId: 'education',
    type: 'proposal',
    status: 'open',
    date: '2025-01-20',
    participants: 89,
    supports: 234,
  },
  {
    id: 'c3',
    title: 'Rencontre : Forum des associations culturelles',
    description: 'Rencontre avec les acteurs culturels locaux',
    themeId: 'culture',
    type: 'meeting',
    status: 'upcoming',
    date: '2025-03-10',
    location: 'Maison de la Culture',
    participants: 45,
  },
];

// Mock Assemblies
export const assemblies: Assembly[] = [
  {
    id: 'a1',
    title: 'Assemblée Citoyenne Climat',
    description: 'Assemblée permanente sur les questions environnementales',
    themeId: 'environment',
    members: 50,
    nextMeeting: '2025-02-20',
    meetings: [
      {
        id: 'm1',
        title: 'Réunion mensuelle - Février 2025',
        date: '2025-02-20',
        agenda: ['Bilan actions janvier', 'Préparation semaine du développement durable'],
        documents: ['CR_janvier_2025.pdf', 'Plan_action_2025.pdf'],
      },
    ],
  },
  {
    id: 'a2',
    title: 'Conseil de Quartier Nord',
    description: 'Assemblée de quartier pour les questions d\'urbanisme',
    themeId: 'urban',
    members: 35,
    nextMeeting: '2025-02-25',
    meetings: [],
  },
  {
    id: 'a3',
    title: 'Assemblée Citoyenne Numérique et Innovation',
    description: 'Assemblée dédiée à la transformation numérique de la commune et aux innovations technologiques au service des citoyens',
    themeId: 'governance',
    members: 42,
    nextMeeting: '2026-02-02',
    meetings: [
      {
        id: 'm3',
        title: 'Lancement de l\'assemblée numérique',
        date: '2025-11-15',
        agenda: ['Présentation des objectifs', 'Définition du cadre de travail', 'Constitution des groupes thématiques'],
        documents: ['Charte_numerique.pdf', 'Presentation_2025.pdf'],
      },
      {
        id: 'm4',
        title: 'Atelier participatif - Services en ligne',
        date: '2025-12-10',
        agenda: ['État des lieux des services numériques', 'Besoins des citoyens', 'Priorisation des développements'],
        documents: ['Enquete_besoins.pdf', 'Roadmap_2026.pdf'],
      },
    ],
  },
];

// Mock Petitions
export const petitions: Petition[] = [
  {
    id: 'pe1',
    title: 'Pour un parc urbain au centre-ville',
    description: 'Pétition pour la création d\'un espace vert de 2 hectares',
    themeId: 'urban',
    target: 1000,
    current: 847,
    status: 'open',
    startDate: '2025-01-10',
    endDate: '2025-04-10',
    author: 'Association Les Jardins Urbains',
  },
  {
    id: 'pe2',
    title: 'Gratuité des transports publics pour les jeunes',
    description: 'Demande de gratuité des transports en commun pour les moins de 25 ans',
    themeId: 'mobility',
    target: 500,
    current: 523,
    status: 'threshold_reached',
    startDate: '2024-12-01',
    endDate: '2025-03-01',
    author: 'Collectif Mobilité Jeunesse',
  },
];

// Mock Conferences
export const conferences: Conference[] = [
  {
    id: 'co1',
    title: 'Conférence : L\'économie circulaire en pratique',
    description: 'Journée d\'échanges sur les initiatives locales d\'économie circulaire',
    themeId: 'economy',
    date: '2025-03-15',
    location: 'Centre des Congrès',
    speakers: ['Dr. Marie Dubois', 'Jean Martin - Entrepreneur', 'Prof. Sophie Laurent'],
    sessions: 8,
    registered: 156,
    capacity: 200,
  },
  {
    id: 'co2',
    title: 'Forum : Innovation en santé publique',
    description: 'Présentation des nouvelles approches en prévention santé',
    themeId: 'health',
    date: '2025-04-05',
    location: 'Hôpital Universitaire',
    speakers: ['Dr. Pierre Renaud', 'Dr. Isabelle Chen'],
    sessions: 5,
    registered: 89,
    capacity: 150,
  },
];

// Mock Votes
export const votes: Vote[] = [
  {
    id: 'v1',
    title: 'Budget Participatif 2025',
    question: 'Quels projets souhaitez-vous voir financés par le budget participatif ?',
    themeId: 'governance',
    type: 'consultation',
    status: 'open',
    startDate: '2025-02-01',
    endDate: '2025-02-28',
    options: [
      { id: 'o1', text: 'Rénovation des écoles', votes: 234 },
      { id: 'o2', text: 'Pistes cyclables', votes: 189 },
      { id: 'o3', text: 'Espaces verts', votes: 156 },
      { id: 'o4', text: 'Équipements sportifs', votes: 123 },
    ],
    participants: 702,
  },
  {
    id: 'v2',
    title: 'Référendum : Zone piétonne centre-ville',
    question: 'Êtes-vous favorable à la piétonnisation totale du centre-ville ?',
    themeId: 'urban',
    type: 'referendum',
    status: 'upcoming',
    startDate: '2025-03-15',
    endDate: '2025-03-22',
    options: [
      { id: 'o5', text: 'Oui' },
      { id: 'o6', text: 'Non' },
      { id: 'o7', text: 'Abstention' },
    ],
  },
];