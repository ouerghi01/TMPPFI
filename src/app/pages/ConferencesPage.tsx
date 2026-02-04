import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { PageBanner } from '../components/PageBanner';
import { PageLayout } from '../components/layout/PageLayout';
import { KPICard } from '../components/layout/KPICard';
import { ThemeTag } from '../components/ThemeTag';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Textarea } from '../components/ui/textarea';
import { Separator } from '../components/ui/separator';
import { useConferences } from '../hooks/useApi';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import type { ConferenceDTO } from '../types';
import { Calendar, MapPin, Users, Mic, UserPlus, Clock, Award, Briefcase, GraduationCap, Mail, Linkedin, Twitter, Globe, FileText, TrendingUp, Info } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../components/ui/badge';
import { UserMinus } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import apiClient from '@/client';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from '../components/AuthModal';

// Speaker profile interface
interface SpeakerProfile {
  firstName: string;
  lastName: string;
  title: string;
  organization: string;
  bio: string;
  expertise: string[];
  education: string;
  achievements: string[];
  email?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

// Mock speaker profiles data
const speakerProfiles: { [key: string]: SpeakerProfile } = {
  'Dr. Marie Dupont': {
    firstName: 'Dr. Marie',
    lastName: 'Dupont',
    title: 'Experte en développement durable',
    organization: 'Institut Fédéral de l\'Environnement',
    bio: 'Dr. Marie Dupont est une experte reconnue internationalement en développement durable avec plus de 15 ans d\'expérience dans la recherche et la mise en œuvre de politiques environnementales. Elle conseille les gouvernements et organisations sur les stratégies de transition écologique.',
    expertise: ['Développement durable', 'Politiques environnementales', 'Transition énergétique', 'Économie circulaire'],
    education: 'Doctorat en Sciences de l\'Environnement, EPFL',
    achievements: [
      'Auteure de 3 livres sur la transition écologique',
      'Conseillère auprès de l\'ONU pour le climat',
      'Prix de l\'Innovation Environnementale 2023'
    ],
    email: 'marie.dupont@ife.ch',
    linkedin: 'https://linkedin.com/in/mariedupont',
    twitter: '@marie_dupont'
  },
  'Prof. Jean Martin': {
    firstName: 'Prof. Jean',
    lastName: 'Martin',
    title: 'Professeur d\'Urbanisme',
    organization: 'Université Libre de Bruxelles',
    bio: 'Prof. Jean Martin est spécialiste de l\'urbanisme durable et de l\'aménagement du territoire. Ses recherches portent sur les villes intelligentes et la mobilité urbaine. Il a participé à de nombreux projets de réaménagement urbain en Belgique et en Europe.',
    expertise: ['Urbanisme durable', 'Villes intelligentes', 'Mobilité urbaine', 'Aménagement du territoire'],
    education: 'Professeur titulaire, Université Libre de Bruxelles',
    achievements: [
      'Directeur du Centre de Recherche en Urbanisme',
      '20+ publications scientifiques internationales',
      'Consultant pour 15 villes européennes'
    ],
    linkedin: 'https://linkedin.com/in/jeanmartin',
    website: 'https://urbanisme.ulb.be/jmartin'
  },
  'Sophie Bernard': {
    firstName: 'Sophie',
    lastName: 'Bernard',
    title: 'Directrice Innovation Mobilité',
    organization: 'STIB-MIVB Bruxelles',
    bio: 'Sophie Bernard dirige le département innovation de la STIB-MIVB. Elle pilote des projets de mobilité douce et de transport intelligent. Passionnée par l\'amélioration de l\'expérience usager et la réduction de l\'empreinte carbone des transports.',
    expertise: ['Mobilité douce', 'Transport public', 'Innovation transport', 'Expérience utilisateur'],
    education: 'Master en Gestion de Projets, Solvay Brussels School',
    achievements: [
      'Lancement du système de vélos en libre-service',
      'Réduction de 30% des émissions de CO2',
      'Prix de la Mobilité Durable 2022'
    ],
    email: 's.bernard@stib.be',
    linkedin: 'https://linkedin.com/in/sophiebernard'
  },
  'Marc Lehmann': {
    firstName: 'Marc',
    lastName: 'Lehmann',
    title: 'Architecte en Chef',
    organization: 'Ville de Bruxelles',
    bio: 'Marc Lehmann est architecte en chef de la Ville de Bruxelles. Il supervise les projets d\'aménagement urbain et veille à l\'intégration harmonieuse des nouveaux développements dans le tissu urbain existant. Expert en architecture durable et patrimoine.',
    expertise: ['Architecture durable', 'Aménagement urbain', 'Patrimoine', 'Conception bioclimatique'],
    education: 'Architecte ULB, Master en Architecture Durable',
    achievements: [
      'Responsable de 50+ projets urbains',
      'Prix d\'Excellence en Architecture 2021',
      'Membre de l\'Ordre des Architectes de Belgique'
    ],
    website: 'https://bruxelles.be/architecture'
  },
  'Dr. Claire Rossier': {
    firstName: 'Dr. Claire',
    lastName: 'Rossier',
    title: 'Experte en Éducation',
    organization: 'Département de l\'Instruction Publique',
    bio: 'Dr. Claire Rossier est une experte en pédagogie et innovation éducative. Elle travaille sur l\'intégration des technologies numériques dans l\'enseignement et le développement de méthodes pédagogiques inclusives.',
    expertise: ['Pédagogie innovante', 'Éducation numérique', 'Inclusion scolaire', 'Formation continue'],
    education: 'Doctorat en Sciences de l\'Éducation',
    achievements: [
      'Développement de 10 programmes pédagogiques',
      'Formatrice de 500+ enseignants',
      'Publication: "L\'école de demain"'
    ],
    email: 'c.rossier@vd.ch'
  },
  'Thomas Müller': {
    firstName: 'Thomas',
    lastName: 'Müller',
    title: 'Chef de Service Santé Publique',
    organization: 'Région de Bruxelles-Capitale',
    bio: 'Thomas Müller dirige le service de santé publique de la Région de Bruxelles-Capitale. Il coordonne les politiques de prévention et de promotion de la santé. Expert en épidémiologie et santé communautaire.',
    expertise: ['Santé publique', 'Prévention', 'Épidémiologie', 'Politiques de santé'],
    education: 'Master en Santé Publique, Université Libre de Bruxelles',
    achievements: [
      'Gestion de campagnes de vaccination',
      'Coordination COVID-19 pour la région',
      'Programme de prévention primé'
    ],
    linkedin: 'https://linkedin.com/in/thomasmuller'
  },
  'Laura Fontaine': {
    firstName: 'Laura',
    lastName: 'Fontaine',
    title: 'Directrice Culturelle',
    organization: 'Fondation pour la Culture',
    bio: 'Laura Fontaine est directrice de la Fondation pour la Culture. Elle développe des programmes culturels innovants et promeut l\'accès à la culture pour tous. Spécialiste en médiation culturelle et gestion d\'institutions.',
    expertise: ['Médiation culturelle', 'Programmation événementielle', 'Politiques culturelles', 'Mécénat'],
    education: 'Master en Management Culturel, Université Libre de Bruxelles',
    achievements: [
      'Organisation de 100+ événements culturels',
      'Augmentation de 40% de la fréquentation',
      'Prix de la Médiation Culturelle 2023'
    ],
    email: 'l.fontaine@culture.ch',
    website: 'https://fondationculture.ch'
  },
  'Pierre Dubois': {
    firstName: 'Pierre',
    lastName: 'Dubois',
    title: 'Expert en Gouvernance',
    organization: 'Institut de Recherche en Administration Publique',
    bio: 'Pierre Dubois est chercheur spécialisé en gouvernance et participation citoyenne. Ses travaux portent sur les nouvelles formes de démocratie participative et la transparence administrative.',
    expertise: ['Gouvernance', 'Démocratie participative', 'Transparence', 'Administration publique'],
    education: 'Doctorat en Sciences Politiques',
    achievements: [
      'Auteur de "Démocratie 2.0"',
      'Consultant pour 20+ communes',
      'Expert ONU en gouvernance locale'
    ],
    linkedin: 'https://linkedin.com/in/pierredubois',
    twitter: '@p_dubois'
  },
  'Isabelle Wagner': {
    firstName: 'Isabelle',
    lastName: 'Wagner',
    title: 'Économiste',
    organization: 'Chambre de Commerce',
    bio: 'Isabelle Wagner est économiste à la Chambre de Commerce. Elle analyse les tendances économiques locales et conseille les entreprises sur leur développement. Spécialiste en économie régionale et entrepreneuriat.',
    expertise: ['Économie régionale', 'Entrepreneuriat', 'Développement économique', 'Innovation'],
    education: 'Doctorat en Sciences Économiques, Université de Zurich',
    achievements: [
      'Conseil à 200+ entreprises',
      'Rapports économiques trimestriels',
      'Programme de soutien aux PME'
    ],
    email: 'i.wagner@ccvd.ch',
    linkedin: 'https://linkedin.com/in/isabellewagner'
  }
};

export function ConferencesPage() {
  const { t, language, tLocal } = useLanguage();
  const navigate = useNavigate();
  const { data: conferences_use, isLoading, error } = useConferences();
  const [conferences, setConferences] = useState<any[]>([]);
  const [selectedConference, setSelectedConference] = useState<ConferenceDTO | null>(null);
  const [selectedSpeaker, setSelectedSpeaker] = useState<SpeakerProfile | null>(null);
  const [registeredConferences, setRegisteredConferences] = useState<string[]>([]); // Track registered conferences by ID
  const { isLoggedIn } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    motivation: '',
    specialNeeds: '',
    newsletter: false,
    acceptTerms: false
  });
  useEffect(() => {
    if (conferences_use) {
      setConferences(conferences_use);
    }
  }, [conferences_use]);
  useEffect(() => {
    const fetchRegisteredConferences = async () => {
      try {
        const response = await apiClient.get('/conferences/my-registrations');
        if (response.status === 200) {
          setRegisteredConferences(response.data);
        }
      } catch (error) {
        console.error('Error fetching registered conferences:', error);
      }
    };
    if (isLoggedIn) {
      fetchRegisteredConferences();
    }
  }, [isLoggedIn]);
  const handleInputChange = (field: string, value: string | boolean) => {
    setRegistrationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSpeakerClick = (speakerName: string) => {
    const profile = speakerProfiles[speakerName];
    if (profile) {
      setSelectedSpeaker(profile);
    }
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!registrationData.firstName || !registrationData.lastName ||
      !registrationData.email || !registrationData.phone ||
      !registrationData.motivation || !registrationData.acceptTerms) {
      toast.error(
        language === 'fr' ? 'Veuillez remplir tous les champs obligatoires et accepter les conditions' :
          language === 'de' ? 'Bitte füllen Sie alle Pflichtfelder aus und akzeptieren Sie die Bedingungen' :
            'Please fill in all required fields and accept the terms'
      );
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registrationData.email)) {
      toast.error(
        language === 'fr' ? 'Veuillez entrer une adresse email valide' :
          language === 'de' ? 'Bitte geben Sie eine gültige E-Mail-Adresse ein' :
            'Please enter a valid email address'
      );
      return;
    }
    const response = await apiClient.post(`/conferences/${selectedConference?.id}`, registrationData);
    if (response.status === 201) {
      toast.success(
        language === 'fr' ? `Votre inscription à \"${selectedConference ? tLocal(selectedConference.title) : ''}\" est confirmée ! Vous recevrez un email de confirmation.` :
          language === 'de' ? `Ihre Anmeldung zu \"${selectedConference ? tLocal(selectedConference.title) : ''}\" ist bestätigt! Sie erhalten eine Bestätigungs-E-Mail.` :
            `Your registration for \"${selectedConference ? tLocal(selectedConference.title) : ''}\" is confirmed! You will receive a confirmation email.`
      );
      setConferences(prev => prev.map(conf => conf.id === selectedConference?.id ? response.data : conf));

    } else {
      toast.error(
        language === 'fr' ? 'Erreur lors de l\'inscription' :
          language === 'de' ? 'Fehler bei der Anmeldung' :
            'Error during registration'
      );
      return;
    }

    // Add conference ID to registeredConferences
    if (selectedConference) {
      setRegisteredConferences(prev => [...prev, selectedConference.id]);
    }

    // Reset form
    setRegistrationData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      organization: '',
      motivation: '',
      specialNeeds: '',
      newsletter: false,
      acceptTerms: false
    });
    setSelectedConference(null);
  };

  const handleCancelRegistration = async (conferenceId: string, conferenceTitle: string) => {
    // Remove conference from registered list
    try {
      const response = await apiClient.delete(`/conferences/${conferenceId}`);
      if (response.status === 200) {
        setRegisteredConferences(prev => prev.filter(id => id !== conferenceId));
        setConferences(prev => prev.map(conf => conf.id === conferenceId ? response.data : conf));

        toast.success(
          language === 'fr' ? `Inscription annulée pour "${conferenceTitle}"` :
            language === 'de' ? `Anmeldung für "${conferenceTitle}" storniert` :
              `Registration cancelled for "${conferenceTitle}"`
        );
      } else {
        toast.error(
          language === 'fr' ? 'Erreur lors de l\'annulation' :
            language === 'de' ? 'Fehler bei der Stornierung' :
              'Error during cancellation'
        );
        return;
      }
    } catch (error) {
      toast.error(
        language === 'fr' ? 'Erreur lors de l\'annulation' :
          language === 'de' ? 'Fehler bei der Stornierung' :
            'Error during cancellation'
      );
      return;
    }
  };

  // Calculate statistics
  const totalEvents = conferences ? conferences.length : 0;
  const uniqueSpeakers = conferences ? new Set(conferences.flatMap(c => c.speakers?.filter((s: any) => s).map((s: any) => s.id) || [])).size : 0;
  const totalSeatsReserved = conferences ? conferences.reduce((sum, c) => sum + c.registeredCount, 0) : 0;
  const totalCapacity = conferences ? conferences.reduce((sum, c) => sum + c.capacity, 0) : 0;
  const seatsReservedPercent = totalCapacity > 0
    ? Math.round((totalSeatsReserved / totalCapacity) * 100)
    : 0;
  const upcomingSessions = conferences ? conferences.reduce((sum, c) => sum + c.sessions.length, 0) : 0;

  return (
    <div>
      <PageBanner
        title={
          language === 'fr' ? 'Conférences & Forums' :
            language === 'de' ? 'Konferenzen & Foren' :
              'Conferences & Forums'
        }
        description={
          language === 'fr' ? 'Participez aux événements et rencontrez les experts de votre commune' :
            language === 'de' ? 'Nehmen Sie an Veranstaltungen teil und treffen Sie die Experten Ihrer Gemeinde' :
              'Participate in events and meet experts from your community'
        }
        gradient="from-indigo-600 to-purple-600"
        icon={<Mic className="w-12 h-12 text-white" />}
      />

      <PageLayout className="py-8">
        {/* KPI Cards - Standard 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <KPICard
            label={
              language === 'fr' ? 'Total Événements' :
                language === 'de' ? 'Gesamt Veranstaltungen' :
                  'Total Events Hosted'
            }
            value={totalEvents}
            icon={FileText}
            variant="purple"
            type="primary"
          />

          <KPICard
            label={
              language === 'fr' ? 'Experts invités' :
                language === 'de' ? 'Experten-Referenten' :
                  'Expert Speakers'
            }
            value={uniqueSpeakers}
            icon={Users}
            variant="indigo"
            type="primary"
          />

          <KPICard
            label={
              language === 'fr' ? 'Places réservées' :
                language === 'de' ? 'Reservierte Plätze' :
                  'Seats Reserved'
            }
            value={`${seatsReservedPercent}%`}
            icon={TrendingUp}
            variant="cyan"
            type="secondary"
          />

          <KPICard
            label={
              language === 'fr' ? 'Sessions à venir' :
                language === 'de' ? 'Kommende Sitzungen' :
                  'Upcoming Sessions'
            }
            value={upcomingSessions}
            icon={Mic}
            variant="pink"
            type="primary"
          />
        </div>

        {/* Conferences List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage error={error} />}
          {conferences && conferences.map((conference) => {
            const availableSpots = conference.capacity - conference.registeredCount;
            const fillRate = (conference.registeredCount / conference.capacity) * 100;
            const isRegistered = registeredConferences.includes(conference.id);
            const conferenceDate = new Date(conference.endDate);
            const today = new Date();
            const canCancel = isRegistered && conferenceDate > today; // Can only cancel if conference hasn't happened yet

            return (
              <Card key={conference.id} className="hover:shadow-lg transition-shadow flex flex-col h-full">
                <CardHeader className="flex-shrink-0">
                  <div className="flex items-center justify-between mb-3">
                    <ThemeTag themeId={conference.themeId} />
                    {isRegistered && (
                      <Badge className="bg-purple-600 hover:bg-purple-700">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {language === 'fr' && 'Inscrit'}
                        {language === 'de' && 'Angemeldet'}
                        {language === 'en' && 'Registered'}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="line-clamp-2">{tLocal(conference.title)}</CardTitle>
                  <CardDescription className="text-base mt-2 line-clamp-3">
                    {tLocal(conference.description)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <div className="space-y-4 flex-grow">
                    {/* Conference details */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-5 h-5" />
                        <span>
                          {conferenceDate.toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-5 h-5" />
                        <span>
                          {language === 'fr' && '14h00 - 18h00'}
                          {language === 'de' && '14:00 - 18:00 Uhr'}
                          {language === 'en' && '2:00 PM - 6:00 PM'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-5 h-5" />
                        <span>{conference.location.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mic className="w-5 h-5" />
                        <span>
                          {conference.sessions.length}
                          {language === 'fr' && ' sessions au programme'}
                          {language === 'de' && ' Sitzungen im Programm'}
                          {language === 'en' && ' sessions scheduled'}
                        </span>
                      </div>
                    </div>

                    {/* Speakers */}
                    {conference.speakers.length > 0 && (
                      <div>
                        <div className="text-sm font-medium text-gray-900 mb-2">
                          {language === 'fr' && 'Intervenants'}
                          {language === 'de' && 'Referenten'}
                          {language === 'en' && 'Speakers'}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {conference.speakers.filter((s: any) => s).slice(0, 3).map((speaker: any, idx: number) => {
                            // Speaker is a ConferenceSpeakerDTO object with firstName, lastName, and id
                            const speakerName = `${speaker.name}`;
                            // Use the actual speaker ID from the DTO
                            const speakerId = speaker.id;

                            return (
                              <button
                                key={idx}
                                onClick={() => navigate(`/speakers/${speakerId}`)}
                                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors cursor-pointer line-clamp-1"
                              >
                                {speakerName}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Registration stats */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">
                          {conference.registeredCount} / {conference.capacity}
                          {language === 'fr' && ' places réservées'}
                          {language === 'de' && ' Plätze reserviert'}
                          {language === 'en' && ' seats reserved'}
                        </span>
                        <span className="font-medium">{fillRate.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${fillRate >= 90 ? 'bg-red-600' : fillRate >= 70 ? 'bg-orange-600' : 'bg-green-600'
                            }`}
                          style={{ width: `${fillRate}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {availableSpots}
                        {language === 'fr' && ' places restantes'}
                        {language === 'de' && ' Plätze verfügbar'}
                        {language === 'en' && ' seats available'}
                      </div>
                    </div>
                  </div>

                  {/* Button aligned at bottom */}
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full gap-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                      onClick={() => navigate(`/conferences/${conference.id}`)}
                    >
                      <Info className="w-4 h-4" />
                      {language === 'fr' && 'Voir les détails'}
                      {language === 'de' && 'Details anzeigen'}
                      {language === 'en' && 'View details'}
                    </Button>
                    {!isRegistered ? (
                      availableSpots > 0 ? (
                        <Button
                          onClick={() => {
                            if (!isLoggedIn) {
                              setAuthModalOpen(true);
                              return;
                            }
                            setSelectedConference(conference)
                          }}
                          className="w-full gap-2"
                        >
                          <UserPlus className="w-4 h-4" />
                          {language === 'fr' && 'S\'inscrire à la conférence'}
                          {language === 'de' && 'Zur Konferenz anmelden'}
                          {language === 'en' && 'Register for conference'}
                        </Button>
                      ) : (
                        <div className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-500 text-center">
                          {language === 'fr' && 'Complet'}
                          {language === 'de' && 'Ausgebucht'}
                          {language === 'en' && 'Full'}
                        </div>
                      )
                    ) : canCancel ? (
                      <>
                        <Button
                          onClick={() => handleCancelRegistration(conference.id, tLocal(conference.title))}
                          variant="destructive"
                          className="w-full gap-2"
                        >
                          <UserMinus className="w-4 h-4" />
                          {language === 'fr' && 'Annuler mon inscription'}
                          {language === 'de' && 'Anmeldung stornieren'}
                          {language === 'en' && 'Cancel registration'}
                        </Button>
                        <p className="text-xs text-gray-600 text-center">
                          {language === 'fr' && 'Vous pouvez annuler avant la date de la conférence'}
                          {language === 'de' && 'Sie können vor dem Konferenzdatum stornieren'}
                          {language === 'en' && 'You can cancel before the conference date'}
                        </p>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="secondary"
                          className="w-full gap-2"
                          disabled
                        >
                          <CheckCircle className="w-4 h-4" />
                          {language === 'fr' && 'Participant confirmé'}
                          {language === 'de' && 'Teilnahme bestätigt'}
                          {language === 'en' && 'Confirmed participant'}
                        </Button>
                        <p className="text-xs text-gray-500 text-center italic">
                          {language === 'fr' && 'La conférence a déjà eu lieu'}
                          {language === 'de' && 'Die Konferenz hat bereits stattgefunden'}
                          {language === 'en' && 'The conference has already taken place'}
                        </p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
        {/* Speaker Profile Dialog */}
        <Dialog open={!!selectedSpeaker} onOpenChange={(open) => !open && setSelectedSpeaker(null)}>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            {selectedSpeaker && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedSpeaker.firstName} {selectedSpeaker.lastName}</DialogTitle>
                  <DialogDescription className="text-base">
                    <span className="font-medium text-gray-900">{tLocal(selectedSpeaker.title)}</span>
                    <br />
                    <span className="text-gray-600">{selectedSpeaker.organization}</span>
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  {/* Bio */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      {language === 'fr' && 'Biographie'}
                      {language === 'de' && 'Biografie'}
                      {language === 'en' && 'Biography'}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{selectedSpeaker.bio}</p>
                  </div>

                  <Separator />

                  {/* Expertise */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-purple-600" />
                      {language === 'fr' && 'Domaines d\'expertise'}
                      {language === 'de' && 'Fachgebiete'}
                      {language === 'en' && 'Areas of expertise'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSpeaker.expertise.map((exp, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full border border-purple-200"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Education */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-green-600" />
                      {language === 'fr' && 'Formation'}
                      {language === 'de' && 'Ausbildung'}
                      {language === 'en' && 'Education'}
                    </h3>
                    <p className="text-sm text-gray-700">{selectedSpeaker.education}</p>
                  </div>

                  <Separator />

                  {/* Achievements */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-orange-600" />
                      {language === 'fr' && 'Réalisations principales'}
                      {language === 'de' && 'Hauptleistungen'}
                      {language === 'en' && 'Main achievements'}
                    </h3>
                    <ul className="space-y-2">
                      {selectedSpeaker.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-orange-600 mt-1">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact & Social */}
                  {(selectedSpeaker.email || selectedSpeaker.linkedin || selectedSpeaker.twitter || selectedSpeaker.website) && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">
                          {language === 'fr' && 'Contact & Réseaux'}
                          {language === 'de' && 'Kontakt & Netzwerke'}
                          {language === 'en' && 'Contact & Networks'}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {selectedSpeaker.email && (
                            <Button variant="outline" size="sm" className="gap-2">
                              <Mail className="w-4 h-4" />
                              Email
                            </Button>
                          )}
                          {selectedSpeaker.linkedin && (
                            <Button variant="outline" size="sm" className="gap-2">
                              <Linkedin className="w-4 h-4 text-blue-600" />
                              LinkedIn
                            </Button>
                          )}
                          {selectedSpeaker.twitter && (
                            <Button variant="outline" size="sm" className="gap-2">
                              <Twitter className="w-4 h-4 text-blue-400" />
                              Twitter
                            </Button>
                          )}
                          {selectedSpeaker.website && (
                            <Button variant="outline" size="sm" className="gap-2">
                              <Globe className="w-4 h-4 text-gray-600" />
                              Website
                            </Button>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <DialogFooter>
                  <Button onClick={() => setSelectedSpeaker(null)}>
                    {language === 'fr' && 'Fermer'}
                    {language === 'de' && 'Schließen'}
                    {language === 'en' && 'Close'}
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Registration Dialog */}
        <Dialog open={!!selectedConference} onOpenChange={(open) => !open && setSelectedConference(null)}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {language === 'fr' && 'Inscription à la conférence'}
                {language === 'de' && 'Konferenzanmeldung'}
                {language === 'en' && 'Conference registration'}
              </DialogTitle>
              <DialogDescription className="text-base">
                {selectedConference && (
                  <span className="font-medium text-gray-900">{tLocal(selectedConference.title)}</span>
                )}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleRegistration}>
              <div className="space-y-5 py-4">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">
                    {language === 'fr' && 'Informations personnelles'}
                    {language === 'de' && 'Persönliche Informationen'}
                    {language === 'en' && 'Personal information'}
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reg-firstName">
                        {language === 'fr' && 'Prénom *'}
                        {language === 'de' && 'Vorname *'}
                        {language === 'en' && 'First name *'}
                      </Label>
                      <Input
                        id="reg-firstName"
                        value={registrationData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-lastName">
                        {language === 'fr' && 'Nom *'}
                        {language === 'de' && 'Nachname *'}
                        {language === 'en' && 'Last name *'}
                      </Label>
                      <Input
                        id="reg-lastName"
                        value={registrationData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-email">
                      {language === 'fr' && 'Email *'}
                      {language === 'de' && 'E-Mail *'}
                      {language === 'en' && 'Email *'}
                    </Label>
                    <Input
                      id="reg-email"
                      type="email"
                      value={registrationData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder={
                        language === 'fr' ? 'votre.email@exemple.com' :
                          language === 'de' ? 'ihre.email@beispiel.com' :
                            'your.email@example.com'
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-phone">
                      {language === 'fr' && 'Téléphone *'}
                      {language === 'de' && 'Telefon *'}
                      {language === 'en' && 'Phone *'}
                    </Label>
                    <Input
                      id="reg-phone"
                      type="tel"
                      value={registrationData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+41 XX XXX XX XX"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-organization">
                      {language === 'fr' && 'Organisation / Entreprise (optionnel)'}
                      {language === 'de' && 'Organisation / Unternehmen (optional)'}
                      {language === 'en' && 'Organization / Company (optional)'}
                    </Label>
                    <Input
                      id="reg-organization"
                      value={registrationData.organization}
                      onChange={(e) => handleInputChange('organization', e.target.value)}
                    />
                  </div>
                </div>

                {/* Motivation */}
                <div className="space-y-2">
                  <Label htmlFor="reg-motivation">
                    {language === 'fr' && 'Pourquoi souhaitez-vous participer ? *'}
                    {language === 'de' && 'Warum möchten Sie teilnehmen? *'}
                    {language === 'en' && 'Why do you want to participate? *'}
                  </Label>
                  <Textarea
                    id="reg-motivation"
                    value={registrationData.motivation}
                    onChange={(e) => handleInputChange('motivation', e.target.value)}
                    placeholder={
                      language === 'fr' ? 'Expliquez brièvement votre intérêt pour cette conférence...' :
                        language === 'de' ? 'Erklären Sie kurz Ihr Interesse an dieser Konferenz...' :
                          'Briefly explain your interest in this conference...'
                    }
                    rows={4}
                    required
                  />
                </div>

                {/* Special Needs */}
                <div className="space-y-2">
                  <Label htmlFor="reg-specialNeeds">
                    {language === 'fr' && 'Besoins spéciaux / Accessibilité (optionnel)'}
                    {language === 'de' && 'Besondere Bedürfnisse / Barrierefreiheit (optional)'}
                    {language === 'en' && 'Special needs / Accessibility (optional)'}
                  </Label>
                  <Textarea
                    id="reg-specialNeeds"
                    value={registrationData.specialNeeds}
                    onChange={(e) => handleInputChange('specialNeeds', e.target.value)}
                    placeholder={
                      language === 'fr' ? 'Régime alimentaire, accessibilité PMR, interprétation...' :
                        language === 'de' ? 'Diät, Barrierefreiheit, Dolmetschen...' :
                          'Dietary requirements, wheelchair access, interpretation...'
                    }
                    rows={2}
                  />
                </div>

                {/* Newsletter */}
                <div className="flex items-start space-x-3 pt-2">
                  <Checkbox
                    id="reg-newsletter"
                    checked={registrationData.newsletter}
                    onCheckedChange={(checked) => handleInputChange('newsletter', !!checked)}
                  />
                  <Label
                    htmlFor="reg-newsletter"
                    className="text-sm font-normal cursor-pointer"
                  >
                    {language === 'fr' && 'Je souhaite recevoir la newsletter et les informations sur les futures conférences'}
                    {language === 'de' && 'Ich möchte den Newsletter und Informationen über zukünftige Konferenzen erhalten'}
                    {language === 'en' && 'I want to receive the newsletter and information about future conferences'}
                  </Label>
                </div>

                {/* Accept Terms */}
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="reg-acceptTerms"
                    checked={registrationData.acceptTerms}
                    onCheckedChange={(checked) => handleInputChange('acceptTerms', !!checked)}
                    required
                  />
                  <Label
                    htmlFor="reg-acceptTerms"
                    className="text-sm font-normal cursor-pointer"
                  >
                    {language === 'fr' && 'J\'accepte les conditions d\'utilisation et je confirme ma participation *'}
                    {language === 'de' && 'Ich akzeptiere die Nutzungsbedingungen und bestätige meine Teilnahme *'}
                    {language === 'en' && 'I accept the terms of use and confirm my participation *'}
                  </Label>
                </div>

                {/* Conference Info */}
                {selectedConference && (
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 space-y-2">
                    <p className="text-sm font-semibold text-purple-900">
                      {language === 'fr' && '📅 Détails de la conférence'}
                      {language === 'de' && '📅 Konferenzdetails'}
                      {language === 'en' && '📅 Conference details'}
                    </p>
                    <div className="text-xs text-purple-800 space-y-1">
                      <p>
                        <strong>
                          {language === 'fr' && 'Date : '}
                          {language === 'de' && 'Datum: '}
                          {language === 'en' && 'Date: '}
                        </strong>
                        {new Date(selectedConference.startDate).toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                      <p>
                        <strong>
                          {language === 'fr' && 'Lieu : '}
                          {language === 'de' && 'Ort: '}
                          {language === 'en' && 'Location: '}
                        </strong>
                        {selectedConference.location.name}
                      </p>
                      <p>
                        <strong>
                          {language === 'fr' && 'Horaires : '}
                          {language === 'de' && 'Zeiten: '}
                          {language === 'en' && 'Schedule: '}
                        </strong>
                        {language === 'fr' && '14h00 - 18h00'}
                        {language === 'de' && '14:00 - 18:00 Uhr'}
                        {language === 'en' && '2:00 PM - 6:00 PM'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-800">
                    {language === 'fr' && '📧 Un email de confirmation avec tous les détails pratiques vous sera envoyé après votre inscription.'}
                    {language === 'de' && '📧 Nach Ihrer Anmeldung erhalten Sie eine Bestätigungs-E-Mail mit allen praktischen Details.'}
                    {language === 'en' && '📧 A confirmation email with all practical details will be sent to you after registration.'}
                  </p>
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedConference(null)}
                >
                  {language === 'fr' && 'Annuler'}
                  {language === 'de' && 'Abbrechen'}
                  {language === 'en' && 'Cancel'}
                </Button>
                <Button type="submit" className="gap-2">
                  <UserPlus className="w-4 h-4" />
                  {language === 'fr' && 'Confirmer l\'inscription'}
                  {language === 'de' && 'Anmeldung bestätigen'}
                  {language === 'en' && 'Confirm registration'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* CTA */}
        <div className="mt-12 p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <div className="max-w-2xl">
            <h2 className="text-2xl mb-4 text-gray-900">
              {language === 'fr' && 'Format des conférences'}
              {language === 'de' && 'Konferenzformat'}
              {language === 'en' && 'Conference format'}
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                • {language === 'fr' && 'Sessions de présentation par des experts'}
                {language === 'de' && 'Präsentationssitzungen von Experten'}
                {language === 'en' && 'Presentation sessions by experts'}
              </p>
              <p>
                • {language === 'fr' && 'Ateliers participatifs et tables rondes'}
                {language === 'de' && 'Partizipative Workshops und Roundtables'}
                {language === 'en' && 'Participatory workshops and roundtables'}
              </p>
              <p>
                • {language === 'fr' && 'Questions-réponses avec les intervenants'}
                {language === 'de' && 'Fragen und Antworten mit den Referenten'}
                {language === 'en' && 'Q&A sessions with speakers'}
              </p>
              <p>
                • {language === 'fr' && 'Networking avec les autres participants'}
                {language === 'de' && 'Networking mit anderen Teilnehmern'}
                {language === 'en' && 'Networking with other participants'}
              </p>
              <p>
                • {language === 'fr' && 'Documentation et ressources disponibles après l\'événement'}
                {language === 'de' && 'Dokumentation und Ressourcen nach der Veranstaltung verfügbar'}
                {language === 'en' && 'Documentation and resources available after the event'}
              </p>
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
}
