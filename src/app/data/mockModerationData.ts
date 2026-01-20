import { 
  ModerationItemDTO, 
  ModerationStatsDTO, 
  ModerationRuleDTO, 
  UserReportDTO 
} from '../types';

// ==================== Mock Moderation Items ====================

export const mockModerationItems: ModerationItemDTO[] = [
  {
    id: 'mod_001',
    contentType: 'comment',
    contentId: 'comment_001',
    processId: 'cons_001',
    processTitle: {
      fr: 'Aménagement du Parc Central',
      de: 'Gestaltung des Zentralparks',
      en: 'Central Park Development'
    },
    author: {
      id: 'user_001',
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      reputation: 85,
      warningsCount: 0
    },
    content: {
      text: {
        fr: 'Ce projet est complètement inutile et gaspille l\'argent public. Les responsables devraient avoir honte.',
        de: 'Dieses Projekt ist völlig nutzlos und verschwendet öffentliche Gelder. Die Verantwortlichen sollten sich schämen.',
        en: 'This project is completely useless and wastes public money. Those responsible should be ashamed.'
      }
    },
    status: 'pending',
    priority: 'high',
    themeId: 'theme_001',
    automatedFlags: [
      {
        ruleId: 'rule_002',
        ruleName: {
          fr: 'Contenu non constructif',
          de: 'Nicht konstruktiver Inhalt',
          en: 'Non-constructive content'
        },
        confidence: 82,
        reason: {
          fr: 'Le commentaire contient des termes négatifs sans proposition constructive',
          de: 'Der Kommentar enthält negative Begriffe ohne konstruktiven Vorschlag',
          en: 'The comment contains negative terms without constructive proposal'
        }
      }
    ],
    reportsCount: 2,
    moderationHistory: [],
    createdAt: '2026-01-13T10:30:00Z',
    submittedAt: '2026-01-13T10:30:00Z',
    dueDate: '2026-01-14T10:30:00Z'
  },
  {
    id: 'mod_002',
    contentType: 'proposal',
    contentId: 'prop_012',
    processId: 'cons_002',
    processTitle: {
      fr: 'Mobilité douce au centre-ville',
      de: 'Sanfte Mobilität in der Innenstadt',
      en: 'Soft mobility in the city center'
    },
    author: {
      id: 'user_002',
      name: 'Marie Lambert',
      email: 'marie.lambert@example.com',
      reputation: 92,
      warningsCount: 0
    },
    content: {
      title: {
        fr: 'Création de pistes cyclables protégées',
        de: 'Schaffung geschützter Radwege',
        en: 'Creation of protected bike lanes'
      },
      text: {
        fr: 'Je propose la création de pistes cyclables séparées et protégées le long des axes principaux du centre-ville, avec une signalisation claire et des zones de stationnement sécurisées pour vélos.',
        de: 'Ich schlage die Schaffung separater und geschützter Radwege entlang der Hauptachsen der Innenstadt vor, mit klarer Beschilderung und sicheren Fahrradparkzonen.',
        en: 'I propose the creation of separate and protected bike lanes along the main axes of the city center, with clear signage and secure bike parking areas.'
      }
    },
    status: 'pending',
    priority: 'low',
    themeId: 'theme_002',
    automatedFlags: [],
    reportsCount: 0,
    moderationHistory: [],
    createdAt: '2026-01-13T09:15:00Z',
    submittedAt: '2026-01-13T09:15:00Z',
    dueDate: '2026-01-14T09:15:00Z'
  },
  {
    id: 'mod_003',
    contentType: 'signalement',
    contentId: 'sig_005',
    author: {
      id: 'user_003',
      name: 'Pierre Martin',
      email: 'pierre.martin@example.com',
      reputation: 78,
      warningsCount: 1
    },
    content: {
      title: {
        fr: 'Danger sur le passage piéton Rue de la Gare',
        de: 'Gefahr am Fußgängerüberweg Bahnhofstraße',
        en: 'Danger at the pedestrian crossing on Station Street'
      },
      text: {
        fr: 'Le passage piéton devant la gare est très dangereux, surtout pour les enfants. Plusieurs accidents ont eu lieu. URGENT : action immédiate nécessaire pour la sécurité des enfants !',
        de: 'Der Fußgängerüberweg vor dem Bahnhof ist sehr gefährlich, besonders für Kinder. Mehrere Unfälle sind passiert. DRINGEND: Sofortiges Handeln für die Sicherheit der Kinder erforderlich!',
        en: 'The pedestrian crossing in front of the station is very dangerous, especially for children. Several accidents have occurred. URGENT: immediate action needed for child safety!'
      }
    },
    status: 'pending',
    priority: 'urgent',
    themeId: 'theme_002',
    automatedFlags: [
      {
        ruleId: 'rule_003',
        ruleName: {
          fr: 'Signalement prioritaire - sécurité',
          de: 'Prioritätsmeldung - Sicherheit',
          en: 'Priority report - safety'
        },
        confidence: 95,
        reason: {
          fr: 'Signalement concernant la sécurité publique et les enfants',
          de: 'Meldung zur öffentlichen Sicherheit und Kinder',
          en: 'Report concerning public safety and children'
        }
      }
    ],
    reportsCount: 0,
    moderationHistory: [],
    createdAt: '2026-01-13T07:45:00Z',
    submittedAt: '2026-01-13T07:45:00Z',
    dueDate: '2026-01-13T11:45:00Z'
  },
  {
    id: 'mod_004',
    contentType: 'comment',
    contentId: 'comment_002',
    processId: 'vote_001',
    processTitle: {
      fr: 'Budget participatif 2026',
      de: 'Bürgerhaushalt 2026',
      en: 'Participatory budget 2026'
    },
    author: {
      id: 'user_004',
      name: 'Sophie Dubois',
      email: 'sophie.dubois@example.com',
      reputation: 65,
      warningsCount: 2
    },
    content: {
      text: {
        fr: 'CLIQUEZ ICI pour gagner de l\'argent facilement! www.spam-site.com - Crypto monnaie garantie!',
        de: 'KLICKEN SIE HIER, um leicht Geld zu verdienen! www.spam-site.com - Kryptowährung garantiert!',
        en: 'CLICK HERE to earn money easily! www.spam-site.com - Cryptocurrency guaranteed!'
      }
    },
    status: 'flagged',
    priority: 'high',
    automatedFlags: [
      {
        ruleId: 'rule_004',
        ruleName: {
          fr: 'Détection de spam',
          de: 'Spam-Erkennung',
          en: 'Spam detection'
        },
        confidence: 98,
        reason: {
          fr: 'Contenu identifié comme spam avec lien suspect',
          de: 'Inhalt als Spam mit verdächtigem Link identifiziert',
          en: 'Content identified as spam with suspicious link'
        }
      }
    ],
    reportsCount: 3,
    moderationHistory: [],
    createdAt: '2026-01-13T06:20:00Z',
    submittedAt: '2026-01-13T06:20:00Z',
    dueDate: '2026-01-14T06:20:00Z'
  },
  {
    id: 'mod_005',
    contentType: 'petition',
    contentId: 'pet_003',
    author: {
      id: 'user_005',
      name: 'Luc Bernard',
      email: 'luc.bernard@example.com',
      reputation: 88,
      warningsCount: 0
    },
    content: {
      title: {
        fr: 'Pour une alimentation bio dans les cantines scolaires',
        de: 'Für Bio-Lebensmittel in Schulkantinen',
        en: 'For organic food in school canteens'
      },
      text: {
        fr: 'Nous demandons l\'introduction progressive d\'aliments biologiques et locaux dans toutes les cantines scolaires de la commune, avec un objectif de 50% de produits bio d\'ici 2027.',
        de: 'Wir fordern die schrittweise Einführung von biologischen und lokalen Lebensmitteln in allen Schulkantinen der Gemeinde, mit einem Ziel von 50% Bio-Produkten bis 2027.',
        en: 'We demand the gradual introduction of organic and local food in all school canteens in the municipality, with a target of 50% organic products by 2027.'
      }
    },
    status: 'pending',
    priority: 'medium',
    themeId: 'theme_003',
    automatedFlags: [],
    reportsCount: 0,
    moderationHistory: [],
    createdAt: '2026-01-13T08:30:00Z',
    submittedAt: '2026-01-13T08:30:00Z',
    dueDate: '2026-01-14T08:30:00Z'
  },
  {
    id: 'mod_006',
    contentType: 'annotation',
    contentId: 'annot_008',
    processId: 'leg_001',
    processTitle: {
      fr: 'Projet de loi Transition Énergétique 2026',
      de: 'Gesetzentwurf Energiewende 2026',
      en: 'Energy Transition Bill 2026'
    },
    author: {
      id: 'user_006',
      name: 'Claire Rousseau',
      email: 'claire.rousseau@example.com',
      reputation: 91,
      warningsCount: 0
    },
    content: {
      text: {
        fr: 'Cet article devrait préciser les mécanismes de financement pour les ménages à revenus modestes qui souhaitent installer des panneaux solaires.',
        de: 'Dieser Artikel sollte die Finanzierungsmechanismen für Haushalte mit geringem Einkommen präzisieren, die Solarmodule installieren möchten.',
        en: 'This article should specify the financing mechanisms for low-income households who wish to install solar panels.'
      }
    },
    status: 'pending',
    priority: 'low',
    themeId: 'theme_004',
    automatedFlags: [],
    reportsCount: 0,
    moderationHistory: [],
    createdAt: '2026-01-13T11:00:00Z',
    submittedAt: '2026-01-13T11:00:00Z',
    dueDate: '2026-01-14T11:00:00Z'
  },
  {
    id: 'mod_007',
    contentType: 'comment',
    contentId: 'comment_003',
    processId: 'cons_003',
    processTitle: {
      fr: 'Stratégie culturelle municipale',
      de: 'Kommunale Kulturstrategie',
      en: 'Municipal cultural strategy'
    },
    author: {
      id: 'user_007',
      name: 'Thomas Moreau',
      email: 'thomas.moreau@example.com',
      reputation: 72,
      warningsCount: 1
    },
    content: {
      text: {
        fr: 'Les propositions sont ridicules et montrent une incompétence totale. Vous êtes tous des idiots qui ne comprenez rien à la culture.',
        de: 'Die Vorschläge sind lächerlich und zeigen völlige Inkompetenz. Sie sind alle Idioten, die nichts von Kultur verstehen.',
        en: 'The proposals are ridiculous and show total incompetence. You are all idiots who understand nothing about culture.'
      }
    },
    status: 'flagged',
    priority: 'urgent',
    automatedFlags: [
      {
        ruleId: 'rule_001',
        ruleName: {
          fr: 'Détection de langage offensant',
          de: 'Erkennung beleidigender Sprache',
          en: 'Offensive language detection'
        },
        confidence: 96,
        reason: {
          fr: 'Langage offensant et injurieux détecté',
          de: 'Beleidigende und verletzende Sprache erkannt',
          en: 'Offensive and insulting language detected'
        }
      }
    ],
    reportsCount: 5,
    moderationHistory: [],
    createdAt: '2026-01-13T09:00:00Z',
    submittedAt: '2026-01-13T09:00:00Z',
    dueDate: '2026-01-13T13:00:00Z'
  },
  {
    id: 'mod_008',
    contentType: 'comment',
    contentId: 'comment_004',
    processId: 'cons_001',
    processTitle: {
      fr: 'Aménagement du Parc Central',
      de: 'Gestaltung des Zentralparks',
      en: 'Central Park Development'
    },
    author: {
      id: 'user_008',
      name: 'Isabelle Petit',
      email: 'isabelle.petit@example.com',
      reputation: 94,
      warningsCount: 0
    },
    content: {
      text: {
        fr: 'OK',
        de: 'OK',
        en: 'OK'
      }
    },
    status: 'pending',
    priority: 'low',
    automatedFlags: [
      {
        ruleId: 'rule_005',
        ruleName: {
          fr: 'Contenu trop court',
          de: 'Zu kurzer Inhalt',
          en: 'Content too short'
        },
        confidence: 100,
        reason: {
          fr: 'Contenu trop court pour être constructif (moins de 20 caractères)',
          de: 'Inhalt zu kurz, um konstruktiv zu sein (weniger als 20 Zeichen)',
          en: 'Content too short to be constructive (less than 20 characters)'
        }
      }
    ],
    reportsCount: 0,
    moderationHistory: [],
    createdAt: '2026-01-13T10:10:00Z',
    submittedAt: '2026-01-13T10:10:00Z',
    dueDate: '2026-01-14T10:10:00Z'
  },
  {
    id: 'mod_009',
    contentType: 'proposal',
    contentId: 'prop_013',
    processId: 'cons_004',
    processTitle: {
      fr: 'Plan numérique municipal',
      de: 'Kommunaler Digitalplan',
      en: 'Municipal digital plan'
    },
    author: {
      id: 'user_009',
      name: 'Antoine Garnier',
      email: 'antoine.garnier@example.com',
      reputation: 86,
      warningsCount: 0
    },
    content: {
      title: {
        fr: 'WiFi public gratuit dans tous les espaces publics',
        de: 'Kostenloses öffentliches WLAN in allen öffentlichen Räumen',
        en: 'Free public WiFi in all public spaces'
      },
      text: {
        fr: 'Installation de bornes WiFi gratuites et sécurisées dans tous les parcs, places publiques et bâtiments municipaux pour garantir l\'accès numérique à tous les citoyens.',
        de: 'Installation von kostenlosen und sicheren WLAN-Hotspots in allen Parks, öffentlichen Plätzen und Gemeindegebäuden, um allen Bürgern digitalen Zugang zu garantieren.',
        en: 'Installation of free and secure WiFi hotspots in all parks, public squares and municipal buildings to guarantee digital access to all citizens.'
      }
    },
    status: 'pending',
    priority: 'low',
    themeId: 'theme_006',
    automatedFlags: [],
    reportsCount: 0,
    moderationHistory: [],
    createdAt: '2026-01-13T07:20:00Z',
    submittedAt: '2026-01-13T07:20:00Z',
    dueDate: '2026-01-14T07:20:00Z'
  },
  {
    id: 'mod_010',
    contentType: 'comment',
    contentId: 'comment_005',
    processId: 'vote_002',
    processTitle: {
      fr: 'Référendum déchets et recyclage',
      de: 'Referendum Abfall und Recycling',
      en: 'Waste and recycling referendum'
    },
    author: {
      id: 'user_010',
      name: 'Sandrine Leroy',
      email: 'sandrine.leroy@example.com',
      reputation: 79,
      warningsCount: 0
    },
    content: {
      text: {
        fr: 'Je suis favorable à l\'augmentation du budget pour l\'éducation, mais je pense qu\'il faudrait également prévoir des investissements dans la formation continue des enseignants.',
        de: 'Ich befürworte die Erhöhung des Bildungsbudgets, denke aber, dass auch Investitionen in die Weiterbildung der Lehrkräfte eingeplant werden sollten.',
        en: 'I am in favor of increasing the education budget, but I think investments in continuing teacher training should also be planned.'
      }
    },
    status: 'pending',
    priority: 'medium',
    themeId: 'theme_005',
    automatedFlags: [],
    reportsCount: 0,
    moderationHistory: [],
    createdAt: '2026-01-13T04:55:00Z',
    submittedAt: '2026-01-13T04:55:00Z',
    dueDate: '2026-01-14T04:55:00Z'
  }
];

// ==================== Mock Moderation Statistics ====================

export const mockModerationStats: ModerationStatsDTO = {
  overview: {
    totalPending: 6,
    totalApproved: 156,
    totalRejected: 23,
    totalFlagged: 2,
    averageProcessingTime: 47, // minutes
    slaCompliance: 94.5 // percentage
  },
  byPriority: {
    urgent: 2,
    high: 2,
    medium: 4,
    low: 2
  },
  byContentType: {
    proposals: 4,
    comments: 4,
    petitions: 1,
    signalements: 1,
    annotations: 1,
    pollResponses: 0,
    userProfiles: 0
  },
  byModerator: [
    {
      moderatorId: 'mod_001',
      moderatorName: 'Sophie Martin',
      approved: 89,
      rejected: 12,
      avgProcessingTime: 42
    },
    {
      moderatorId: 'mod_002',
      moderatorName: 'Marc Dubois',
      approved: 67,
      rejected: 11,
      avgProcessingTime: 51
    }
  ],
  trends: [
    {
      date: '2026-01-07',
      pending: 12,
      approved: 18,
      rejected: 3,
      flagged: 2
    },
    {
      date: '2026-01-08',
      pending: 15,
      approved: 22,
      rejected: 4,
      flagged: 1
    },
    {
      date: '2026-01-09',
      pending: 8,
      approved: 25,
      rejected: 2,
      flagged: 1
    },
    {
      date: '2026-01-10',
      pending: 11,
      approved: 19,
      rejected: 5,
      flagged: 0
    },
    {
      date: '2026-01-11',
      pending: 6,
      approved: 21,
      rejected: 3,
      flagged: 2
    },
    {
      date: '2026-01-12',
      pending: 9,
      approved: 23,
      rejected: 4,
      flagged: 1
    },
    {
      date: '2026-01-13',
      pending: 6,
      approved: 28,
      rejected: 2,
      flagged: 2
    }
  ],
  automatedDetection: {
    totalFlagged: 87,
    truePositives: 76,
    falsePositives: 11,
    accuracy: 87.4
  }
};

// ==================== Mock Moderation Rules ====================

export const mockModerationRules: ModerationRuleDTO[] = [
  {
    id: 'rule_001',
    name: {
      fr: 'Détection de langage offensant',
      de: 'Erkennung beleidigender Sprache',
      en: 'Offensive language detection'
    },
    description: {
      fr: 'Détecte automatiquement les propos offensants, injurieux ou discriminatoires',
      de: 'Erkennt automatisch beleidigende, verletzende oder diskriminierende Aussagen',
      en: 'Automatically detects offensive, insulting or discriminatory statements'
    },
    type: 'profanity',
    enabled: true,
    severity: 'high',
    action: 'flag',
    conditions: {
      keywords: ['offensant', 'injure', 'discrimination', 'haine'],
      threshold: 80
    },
    appliesTo: ['comment', 'proposal', 'annotation'],
    stats: {
      totalMatches: 45,
      truePositives: 38,
      falsePositives: 7,
      lastTriggered: '2026-01-13T08:45:00Z'
    },
    createdAt: '2025-12-01T00:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z',
    createdBy: 'admin_001'
  },
  {
    id: 'rule_002',
    name: {
      fr: 'Contenu non constructif',
      de: 'Nicht konstruktiver Inhalt',
      en: 'Non-constructive content'
    },
    description: {
      fr: 'Identifie les contenus sans argumentation ou purement négatifs',
      de: 'Identifiziert Inhalte ohne Argumentation oder rein negativen Inhalt',
      en: 'Identifies content without argumentation or purely negative'
    },
    type: 'custom',
    enabled: true,
    severity: 'medium',
    action: 'flag',
    conditions: {
      pattern: '(n\'importe quoi|inutile|ridicule)',
      threshold: 75
    },
    appliesTo: ['comment', 'annotation'],
    stats: {
      totalMatches: 32,
      truePositives: 28,
      falsePositives: 4,
      lastTriggered: '2026-01-12T13:00:00Z'
    },
    createdAt: '2025-12-01T00:00:00Z',
    updatedAt: '2026-01-08T14:30:00Z',
    createdBy: 'admin_001'
  },
  {
    id: 'rule_003',
    name: {
      fr: 'Signalement prioritaire - sécurité',
      de: 'Prioritätsmeldung - Sicherheit',
      en: 'Priority report - safety'
    },
    description: {
      fr: 'Priorise automatiquement les signalements concernant la sécurité publique',
      de: 'Priorisiert automatisch Meldungen zur öffentlichen Sicherheit',
      en: 'Automatically prioritizes reports concerning public safety'
    },
    type: 'keyword',
    enabled: true,
    severity: 'urgent',
    action: 'escalate',
    conditions: {
      keywords: ['sécurité', 'danger', 'urgent', 'accident', 'risque', 'enfant'],
      threshold: 70
    },
    appliesTo: ['signalement'],
    stats: {
      totalMatches: 18,
      truePositives: 17,
      falsePositives: 1,
      lastTriggered: '2026-01-13T05:45:00Z'
    },
    createdAt: '2025-12-01T00:00:00Z',
    updatedAt: '2026-01-05T09:00:00Z',
    createdBy: 'admin_001'
  },
  {
    id: 'rule_004',
    name: {
      fr: 'Détection de spam',
      de: 'Spam-Erkennung',
      en: 'Spam detection'
    },
    description: {
      fr: 'Détecte les contenus répétitifs ou comportant des liens suspects',
      de: 'Erkennt sich wiederholende Inhalte oder Inhalte mit verdächtigen Links',
      en: 'Detects repetitive content or content with suspicious links'
    },
    type: 'spam',
    enabled: true,
    severity: 'medium',
    action: 'auto_reject',
    conditions: {
      pattern: '(http://|www\\.|bitcoin|crypto|gagner de l\'argent)',
      threshold: 85
    },
    appliesTo: ['comment', 'proposal', 'petition', 'annotation'],
    stats: {
      totalMatches: 12,
      truePositives: 11,
      falsePositives: 1,
      lastTriggered: '2026-01-11T19:22:00Z'
    },
    createdAt: '2025-12-01T00:00:00Z',
    updatedAt: '2026-01-09T11:15:00Z',
    createdBy: 'admin_001'
  },
  {
    id: 'rule_005',
    name: {
      fr: 'Contenu trop court',
      de: 'Zu kurzer Inhalt',
      en: 'Content too short'
    },
    description: {
      fr: 'Signale les contenus trop courts pour être constructifs',
      de: 'Markiert zu kurze Inhalte, um konstruktiv zu sein',
      en: 'Flags content too short to be constructive'
    },
    type: 'length',
    enabled: true,
    severity: 'low',
    action: 'notify',
    conditions: {
      minLength: 20
    },
    appliesTo: ['comment', 'annotation'],
    stats: {
      totalMatches: 67,
      truePositives: 52,
      falsePositives: 15,
      lastTriggered: '2026-01-13T11:08:00Z'
    },
    createdAt: '2025-12-01T00:00:00Z',
    updatedAt: '2026-01-07T16:45:00Z',
    createdBy: 'admin_001'
  }
];

// ==================== Mock User Reports ====================

export const mockUserReports: UserReportDTO[] = [
  {
    id: 'report_001',
    reportedContentType: 'comment',
    reportedContentId: 'comment_003',
    reportedBy: {
      id: 'user_010',
      name: 'Alice Dupont'
    },
    reportedUser: {
      id: 'user_003',
      name: 'Jean Martin'
    },
    reason: 'offensive',
    description: 'Ce commentaire contient des propos offensants envers d\'autres participants',
    status: 'under_review',
    createdAt: '2026-01-13T09:00:00Z'
  },
  {
    id: 'report_002',
    reportedContentType: 'comment',
    reportedContentId: 'comment_003',
    reportedBy: {
      id: 'user_011',
      name: 'Bernard Lefevre'
    },
    reportedUser: {
      id: 'user_003',
      name: 'Jean Martin'
    },
    reason: 'inappropriate',
    description: 'Contenu inapproprié et non respect de la charte',
    status: 'resolved',
    resolution: {
      resolvedBy: 'mod_002',
      action: 'content_rejected',
      comment: 'Le contenu a été rejeté suite aux signalements',
      resolvedAt: '2026-01-12T15:30:00Z'
    },
    createdAt: '2026-01-13T09:15:00Z'
  },
  {
    id: 'report_003',
    reportedContentType: 'comment',
    reportedContentId: 'comment_005',
    reportedBy: {
      id: 'user_012',
      name: 'Catherine Moreau'
    },
    reportedUser: {
      id: 'user_005',
      name: 'Sophie Petit'
    },
    reason: 'spam',
    description: 'Commentaire non constructif et répétitif',
    status: 'resolved',
    resolution: {
      resolvedBy: 'mod_002',
      action: 'content_rejected',
      comment: 'Contenu rejeté pour non-respect de la charte de participation',
      resolvedAt: '2026-01-12T15:30:00Z'
    },
    createdAt: '2026-01-12T13:30:00Z'
  },
  {
    id: 'report_004',
    reportedContentType: 'proposal',
    reportedContentId: 'prop_015',
    reportedBy: {
      id: 'user_013',
      name: 'Daniel Rousseau'
    },
    reportedUser: {
      id: 'user_015',
      name: 'Patrick Legrand'
    },
    reason: 'misinformation',
    description: 'La proposition contient des informations erronées et non vérifiées',
    status: 'new',
    createdAt: '2026-01-13T10:45:00Z'
  },
  {
    id: 'report_005',
    reportedContentType: 'petition',
    reportedContentId: 'pet_008',
    reportedBy: {
      id: 'user_014',
      name: 'Marie Lambert'
    },
    reportedUser: {
      id: 'user_016',
      name: 'Nicolas Bertrand'
    },
    reason: 'other',
    description: 'La pétition pourrait être formulée de manière plus neutre pour être plus inclusive',
    status: 'dismissed',
    resolution: {
      resolvedBy: 'mod_001',
      action: 'no_action',
      comment: 'Le contenu respecte la charte bien qu\'il puisse être amélioré',
      resolvedAt: '2026-01-12T17:10:00Z'
    },
    createdAt: '2026-01-12T16:20:00Z'
  }
];
