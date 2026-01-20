import React from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { PageBanner } from '@/app/components/PageBanner';
import { PageLayout } from '@/app/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Phone, MessageSquare, Voicemail, Users, Clock, Globe, Shield, CheckCircle, ArrowRight } from 'lucide-react';

const translations = {
  fr: {
    title: 'Accès Universel par Téléphone',
    subtitle: 'Participez aux décisions publiques par téléphone, sans connexion internet',
    whatIsIVR: 'Qu\'est-ce que l\'accès IVR ?',
    ivrDescription: 'Le système IVR (Interactive Voice Response) vous permet de participer aux consultations, votes et pétitions directement par téléphone ou SMS. Accessible à tous, sans ordinateur ni connexion internet.',
    howItWorks: 'Comment ça fonctionne ?',
    phoneAccess: 'Accès par téléphone',
    phoneDescription: 'Appelez notre numéro dédié et suivez les instructions vocales. Répondez aux questions en appuyant sur les touches de votre téléphone.',
    phoneSteps: [
      'Composez le +41 22 327 2000',
      'Choisissez votre langue (FR, DE, EN)',
      'Sélectionnez le type de participation',
      'Répondez aux questions guidées',
      'Confirmez vos réponses',
      'Recevez une confirmation vocale'
    ],
    smsAccess: 'Accès par SMS',
    smsDescription: 'Envoyez vos réponses par SMS pour une participation rapide et simple. Format court et codes faciles à retenir.',
    smsSteps: [
      'Envoyez un SMS au +41 79 555 0000',
      'Format : CODE + RÉPONSE (ex: VOTE A)',
      'Recevez une confirmation par SMS',
      'Votre vote est enregistré'
    ],
    automatedAccess: 'Appels automatisés',
    automatedDescription: 'Pour certaines campagnes, vous pourriez recevoir un appel automatisé vous invitant à participer. C\'est simple et rapide.',
    automatedSteps: [
      'Recevez un appel sur votre téléphone',
      'Écoutez le message d\'introduction',
      'Répondez aux questions par touches',
      'Votre participation est enregistrée'
    ],
    benefits: 'Avantages de l\'accès IVR',
    benefit1Title: 'Accessible à tous',
    benefit1Desc: 'Pas besoin d\'ordinateur, smartphone ou internet',
    benefit2Title: 'Multilingue',
    benefit2Desc: 'Disponible en français, allemand et anglais',
    benefit3Title: 'Rapide et simple',
    benefit3Desc: 'Participation en quelques minutes par téléphone',
    benefit4Title: 'Sécurisé et confidentiel',
    benefit4Desc: 'Vos données sont protégées et anonymisées',
    benefit5Title: 'Assistance disponible',
    benefit5Desc: 'Aide humaine disponible en cas de difficulté',
    benefit6Title: 'Sans coût',
    benefit6Desc: 'L\'appel est gratuit depuis la Suisse',
    participationTypes: 'Types de participation disponibles',
    consultations: 'Consultations publiques',
    consultationsDesc: 'Donnez votre avis sur les projets de votre commune',
    votes: 'Votes et scrutins',
    votesDesc: 'Participez aux votes démocratiques par téléphone',
    petitions: 'Signatures de pétitions',
    petitionsDesc: 'Signez des pétitions en quelques secondes par SMS',
    polls: 'Sondages',
    pollsDesc: 'Répondez à des enquêtes rapides par téléphone ou SMS',
    faq: 'Questions fréquentes',
    q1: 'L\'appel est-il gratuit ?',
    a1: 'Oui, l\'appel est gratuit depuis un téléphone fixe ou mobile en Suisse.',
    q2: 'Puis-je changer mes réponses ?',
    a2: 'Oui, tant que la consultation ou le vote est encore ouvert, vous pouvez rappeler pour modifier vos réponses.',
    q3: 'Mes données sont-elles sécurisées ?',
    a3: 'Absolument. Votre numéro de téléphone est anonymisé et vos réponses sont traitées de manière confidentielle selon les normes RGPD.',
    q4: 'Puis-je obtenir de l\'aide ?',
    a4: 'Oui, tapez 9 pendant l\'appel pour être mis en relation avec un opérateur qui pourra vous assister.',
    q5: 'Combien de temps dure un appel ?',
    a5: 'En moyenne, une participation complète prend entre 2 et 3 minutes.',
    q6: 'Puis-je utiliser mon téléphone fixe ?',
    a6: 'Oui, le système fonctionne aussi bien avec un téléphone fixe qu\'un mobile.',
    contact: 'Besoin d\'aide ?',
    contactDesc: 'Si vous avez des questions ou rencontrez des difficultés, notre équipe est là pour vous aider.',
    contactPhone: 'Téléphone',
    contactEmail: 'Email',
    contactHours: 'Du lundi au vendredi, 8h-18h',
  },
  de: {
    title: 'Universeller Zugang per Telefon',
    subtitle: 'Nehmen Sie an öffentlichen Entscheidungen per Telefon teil, ohne Internetverbindung',
    whatIsIVR: 'Was ist IVR-Zugang?',
    ivrDescription: 'Das IVR-System (Interactive Voice Response) ermöglicht es Ihnen, direkt per Telefon oder SMS an Konsultationen, Abstimmungen und Petitionen teilzunehmen. Für alle zugänglich, ohne Computer oder Internetverbindung.',
    howItWorks: 'Wie funktioniert es?',
    phoneAccess: 'Zugang per Telefon',
    phoneDescription: 'Rufen Sie unsere spezielle Nummer an und folgen Sie den Sprachanweisungen. Beantworten Sie die Fragen durch Drücken der Tasten Ihres Telefons.',
    phoneSteps: [
      'Wählen Sie +41 22 327 2000',
      'Wählen Sie Ihre Sprache (FR, DE, EN)',
      'Wählen Sie die Art der Teilnahme',
      'Beantworten Sie die geführten Fragen',
      'Bestätigen Sie Ihre Antworten',
      'Erhalten Sie eine Sprachbestätigung'
    ],
    smsAccess: 'Zugang per SMS',
    smsDescription: 'Senden Sie Ihre Antworten per SMS für eine schnelle und einfache Teilnahme. Kurzes Format und leicht zu merkende Codes.',
    smsSteps: [
      'Senden Sie eine SMS an +41 79 555 0000',
      'Format: CODE + ANTWORT (z.B. VOTE A)',
      'Erhalten Sie eine Bestätigung per SMS',
      'Ihre Stimme ist registriert'
    ],
    automatedAccess: 'Automatisierte Anrufe',
    automatedDescription: 'Bei bestimmten Kampagnen erhalten Sie möglicherweise einen automatisierten Anruf zur Teilnahme. Es ist einfach und schnell.',
    automatedSteps: [
      'Erhalten Sie einen Anruf auf Ihrem Telefon',
      'Hören Sie sich die Einführungsnachricht an',
      'Beantworten Sie Fragen per Tastendruck',
      'Ihre Teilnahme wird registriert'
    ],
    benefits: 'Vorteile des IVR-Zugangs',
    benefit1Title: 'Für alle zugänglich',
    benefit1Desc: 'Kein Computer, Smartphone oder Internet erforderlich',
    benefit2Title: 'Mehrsprachig',
    benefit2Desc: 'Verfügbar auf Französisch, Deutsch und Englisch',
    benefit3Title: 'Schnell und einfach',
    benefit3Desc: 'Teilnahme in wenigen Minuten per Telefon',
    benefit4Title: 'Sicher und vertraulich',
    benefit4Desc: 'Ihre Daten sind geschützt und anonymisiert',
    benefit5Title: 'Hilfe verfügbar',
    benefit5Desc: 'Menschliche Hilfe bei Schwierigkeiten verfügbar',
    benefit6Title: 'Kostenlos',
    benefit6Desc: 'Der Anruf ist aus der Schweiz kostenlos',
    participationTypes: 'Verfügbare Teilnahmearten',
    consultations: 'Öffentliche Konsultationen',
    consultationsDesc: 'Äußern Sie Ihre Meinung zu Projekten Ihrer Gemeinde',
    votes: 'Abstimmungen',
    votesDesc: 'Nehmen Sie per Telefon an demokratischen Abstimmungen teil',
    petitions: 'Petitionsunterschriften',
    petitionsDesc: 'Unterzeichnen Sie Petitionen in Sekunden per SMS',
    polls: 'Umfragen',
    pollsDesc: 'Beantworten Sie schnelle Umfragen per Telefon oder SMS',
    faq: 'Häufig gestellte Fragen',
    q1: 'Ist der Anruf kostenlos?',
    a1: 'Ja, der Anruf ist kostenlos von einem Festnetz- oder Mobiltelefon in der Schweiz.',
    q2: 'Kann ich meine Antworten ändern?',
    a2: 'Ja, solange die Konsultation oder Abstimmung noch offen ist, können Sie erneut anrufen, um Ihre Antworten zu ändern.',
    q3: 'Sind meine Daten sicher?',
    a3: 'Absolut. Ihre Telefonnummer wird anonymisiert und Ihre Antworten werden vertraulich gemäß DSGVO-Standards behandelt.',
    q4: 'Kann ich Hilfe bekommen?',
    a4: 'Ja, drücken Sie während des Anrufs 9, um mit einem Operator verbunden zu werden, der Ihnen helfen kann.',
    q5: 'Wie lange dauert ein Anruf?',
    a5: 'Im Durchschnitt dauert eine vollständige Teilnahme zwischen 2 und 3 Minuten.',
    q6: 'Kann ich mein Festnetztelefon verwenden?',
    a6: 'Ja, das System funktioniert sowohl mit Festnetz- als auch mit Mobiltelefonen.',
    contact: 'Brauchen Sie Hilfe?',
    contactDesc: 'Wenn Sie Fragen haben oder auf Schwierigkeiten stoßen, ist unser Team für Sie da.',
    contactPhone: 'Telefon',
    contactEmail: 'E-Mail',
    contactHours: 'Montag bis Freitag, 8-18 Uhr',
  },
  en: {
    title: 'Universal Access by Phone',
    subtitle: 'Participate in public decisions by phone, without internet connection',
    whatIsIVR: 'What is IVR access?',
    ivrDescription: 'The IVR (Interactive Voice Response) system allows you to participate in consultations, votes and petitions directly by phone or SMS. Accessible to all, without computer or internet connection.',
    howItWorks: 'How does it work?',
    phoneAccess: 'Phone access',
    phoneDescription: 'Call our dedicated number and follow the voice instructions. Answer questions by pressing the keys on your phone.',
    phoneSteps: [
      'Dial +41 22 327 2000',
      'Choose your language (FR, DE, EN)',
      'Select the participation type',
      'Answer the guided questions',
      'Confirm your answers',
      'Receive a voice confirmation'
    ],
    smsAccess: 'SMS access',
    smsDescription: 'Send your answers by SMS for quick and simple participation. Short format and easy-to-remember codes.',
    smsSteps: [
      'Send an SMS to +41 79 555 0000',
      'Format: CODE + ANSWER (e.g. VOTE A)',
      'Receive confirmation by SMS',
      'Your vote is registered'
    ],
    automatedAccess: 'Automated calls',
    automatedDescription: 'For certain campaigns, you may receive an automated call inviting you to participate. It\'s simple and quick.',
    automatedSteps: [
      'Receive a call on your phone',
      'Listen to the introduction message',
      'Answer questions by key press',
      'Your participation is registered'
    ],
    benefits: 'Benefits of IVR access',
    benefit1Title: 'Accessible to all',
    benefit1Desc: 'No need for computer, smartphone or internet',
    benefit2Title: 'Multilingual',
    benefit2Desc: 'Available in French, German and English',
    benefit3Title: 'Quick and simple',
    benefit3Desc: 'Participation in a few minutes by phone',
    benefit4Title: 'Secure and confidential',
    benefit4Desc: 'Your data is protected and anonymized',
    benefit5Title: 'Assistance available',
    benefit5Desc: 'Human help available if you have difficulty',
    benefit6Title: 'Free of charge',
    benefit6Desc: 'The call is free from Switzerland',
    participationTypes: 'Available participation types',
    consultations: 'Public consultations',
    consultationsDesc: 'Give your opinion on your community\'s projects',
    votes: 'Votes and ballots',
    votesDesc: 'Participate in democratic votes by phone',
    petitions: 'Petition signatures',
    petitionsDesc: 'Sign petitions in seconds by SMS',
    polls: 'Surveys',
    pollsDesc: 'Answer quick surveys by phone or SMS',
    faq: 'Frequently asked questions',
    q1: 'Is the call free?',
    a1: 'Yes, the call is free from a landline or mobile phone in Switzerland.',
    q2: 'Can I change my answers?',
    a2: 'Yes, as long as the consultation or vote is still open, you can call back to modify your answers.',
    q3: 'Is my data secure?',
    a3: 'Absolutely. Your phone number is anonymized and your answers are processed confidentially according to GDPR standards.',
    q4: 'Can I get help?',
    a4: 'Yes, press 9 during the call to be connected to an operator who can assist you.',
    q5: 'How long does a call take?',
    a5: 'On average, a complete participation takes between 2 and 3 minutes.',
    q6: 'Can I use my landline phone?',
    a6: 'Yes, the system works with both landline and mobile phones.',
    contact: 'Need help?',
    contactDesc: 'If you have questions or encounter difficulties, our team is here to help.',
    contactPhone: 'Phone',
    contactEmail: 'Email',
    contactHours: 'Monday to Friday, 8am-6pm',
  }
};

export default function IVRAccessPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const benefits = [
    { icon: Users, title: t.benefit1Title, desc: t.benefit1Desc, color: 'blue' },
    { icon: Globe, title: t.benefit2Title, desc: t.benefit2Desc, color: 'green' },
    { icon: Clock, title: t.benefit3Title, desc: t.benefit3Desc, color: 'purple' },
    { icon: Shield, title: t.benefit4Title, desc: t.benefit4Desc, color: 'orange' },
    { icon: Phone, title: t.benefit5Title, desc: t.benefit5Desc, color: 'red' },
    { icon: CheckCircle, title: t.benefit6Title, desc: t.benefit6Desc, color: 'teal' },
  ];

  const participationTypes = [
    { title: t.consultations, desc: t.consultationsDesc, icon: MessageSquare, color: 'blue' },
    { title: t.votes, desc: t.votesDesc, icon: CheckCircle, color: 'green' },
    { title: t.petitions, desc: t.petitionsDesc, icon: Phone, color: 'purple' },
    { title: t.polls, desc: t.pollsDesc, icon: MessageSquare, color: 'orange' },
  ];

  const faqs = [
    { q: t.q1, a: t.a1 },
    { q: t.q2, a: t.a2 },
    { q: t.q3, a: t.a3 },
    { q: t.q4, a: t.a4 },
    { q: t.q5, a: t.a5 },
    { q: t.q6, a: t.a6 },
  ];

  return (
    <div>
      <PageBanner
        title={t.title}
        description={t.subtitle}
        gradient="from-blue-600 to-indigo-600"
        icon={<Phone className="w-12 h-12 text-white" />}
      />

      <PageLayout className="py-8">
        {/* Introduction */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">{t.whatIsIVR}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-lg">{t.ivrDescription}</p>
          </CardContent>
        </Card>

        {/* How it works */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.howItWorks}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phone Access */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 p-3 rounded-full">
                    <Phone className="size-6 text-white" />
                  </div>
                  <CardTitle className="text-blue-900">{t.phoneAccess}</CardTitle>
                </div>
                <CardDescription className="text-blue-800">{t.phoneDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2">
                  {t.phoneSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <Badge className="bg-blue-600 shrink-0">{index + 1}</Badge>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* SMS Access */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-green-600 p-3 rounded-full">
                    <MessageSquare className="size-6 text-white" />
                  </div>
                  <CardTitle className="text-green-900">{t.smsAccess}</CardTitle>
                </div>
                <CardDescription className="text-green-800">{t.smsDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2">
                  {t.smsSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <Badge className="bg-green-600 shrink-0">{index + 1}</Badge>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* Automated Access */}
            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-purple-600 p-3 rounded-full">
                    <Voicemail className="size-6 text-white" />
                  </div>
                  <CardTitle className="text-purple-900">{t.automatedAccess}</CardTitle>
                </div>
                <CardDescription className="text-purple-800">{t.automatedDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2">
                  {t.automatedSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <Badge className="bg-purple-600 shrink-0">{index + 1}</Badge>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.benefits}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <benefit.icon className={`size-6 text-${benefit.color}-600 mt-1`} />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                      <p className="text-sm text-gray-600">{benefit.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Participation Types */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.participationTypes}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {participationTypes.map((type, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <type.icon className={`size-6 text-${type.color}-600`} />
                    <CardTitle>{type.title}</CardTitle>
                  </div>
                  <CardDescription>{type.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.faq}</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ArrowRight className="size-5 text-blue-600" />
                    {faq.q}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="text-2xl">{t.contact}</CardTitle>
            <CardDescription className="text-base">{t.contactDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <Phone className="size-6 text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900">{t.contactPhone}</div>
                  <div className="text-gray-600">+41 22 327 2000</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="size-6 text-green-600" />
                <div>
                  <div className="font-medium text-gray-900">{t.contactEmail}</div>
                  <div className="text-gray-600">support@civiagora.ch</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="size-6 text-purple-600" />
                <div>
                  <div className="font-medium text-gray-900">{t.contactHours}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </PageLayout>
    </div>
  );
}
