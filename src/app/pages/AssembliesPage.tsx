import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { PageBanner } from '../components/PageBanner';
import { PageLayout } from '../components/layout/PageLayout';
import { KPICard } from '../components/layout/KPICard';
import { FilterBar } from '../components/layout/FilterBar';
import { FilterField } from '../components/layout/FilterField';
import { ContentGrid } from '../components/layout/ContentGrid';
import { ThemeTag } from '../components/ThemeTag';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Checkbox } from '../components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { useAssemblies, useThemes } from '../hooks/useApi';
import type { AssemblyDTO } from '../types';
import { Calendar, MapPin, Users, Filter, UserPlus, Clock, FileText, CheckCircle, TrendingUp, UserMinus } from 'lucide-react';
import { toast } from 'sonner';

export function AssembliesPage() {
  const { t, language, tLocal } = useLanguage();
  const { data: assemblies, isLoading, error } = useAssemblies();
  const [selectedAssembly, setSelectedAssembly] = useState<AssemblyDTO | null>(null);
  const [joinedAssemblies, setJoinedAssemblies] = useState<string[]>([]); // Track joined assemblies by ID
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    motivation: '',
    skills: '',
    availability: true
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.motivation) {
      toast.error(
        language === 'fr' ? 'Veuillez remplir tous les champs obligatoires' :
        language === 'de' ? 'Bitte füllen Sie alle Pflichtfelder aus' :
        'Please fill in all required fields'
      );
      return;
    }

    // Add assembly to joined list
    if (selectedAssembly) {
      setJoinedAssemblies(prev => [...prev, selectedAssembly.id]);
    }

    // Simuler l'inscription
    toast.success(
      language === 'fr' ? `Demande d'inscription envoyée pour "${tLocal(selectedAssembly.name)}" !` :
      language === 'de' ? `Beitrittsanfrage für "${tLocal(selectedAssembly.name)}" gesendet!` :
      `Membership request sent for "${tLocal(selectedAssembly.name)}"!`
    );

    // Réinitialiser le formulaire
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      motivation: '',
      skills: '',
      availability: true
    });
    setSelectedAssembly(null);
  };

  const handleLeaveAssembly = (assemblyId: string, assemblyTitle: string) => {
    // Remove assembly from joined list
    setJoinedAssemblies(prev => prev.filter(id => id !== assemblyId));
    
    toast.success(
      language === 'fr' ? `Adhésion annulée pour "${assemblyTitle}"` :
      language === 'de' ? `Mitgliedschaft für "${assemblyTitle}" gekündigt` :
      `Membership cancelled for "${assemblyTitle}"`
    );
  };

  // Calculate statistics
  const totalAssemblies = assemblies ? assemblies.length : 0;
  const totalMembers = assemblies ? assemblies.reduce((sum, a) => sum + a.totalMembers, 0) : 0;
  const upcomingMeetings = assemblies ? assemblies.filter(a => {
    if (!a.nextMeeting?.date) return false;
    const nextMeeting = new Date(a.nextMeeting.date);
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    return nextMeeting >= today && nextMeeting <= thirtyDaysFromNow;
  }).length : 0;
  const totalDecisions = assemblies ? assemblies.reduce((sum, a) => sum + (a.pastMeetings?.length || 0), 0) : 0;

  return (
    <div>
      <PageBanner
        title={
          language === 'fr' ? 'Assemblées citoyennes' :
          language === 'de' ? 'Bürgerversammlungen' :
          'Citizen Assemblies'
        }
        description={
          language === 'fr' ? 'Rejoignez les assemblées délibératives et contribuez aux décisions' :
          language === 'de' ? 'Nehmen Sie an den Beratungsversammlungen teil und tragen Sie zu Entscheidungen bei' :
          'Join deliberative assemblies and contribute to decisions'
        }
        gradient="from-orange-600 to-red-600"
        icon={<Users className="w-12 h-12 text-white" />}
      />
      
      <PageLayout className="py-8">
        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <KPICard
            label={
              language === 'fr' ? 'Total Assemblées' :
              language === 'de' ? 'Gesamt Versammlungen' :
              'Total Assemblies'
            }
            value={totalAssemblies}
            icon={Users}
            variant="orange"
          />

          <KPICard
            label={
              language === 'fr' ? 'Membres actifs' :
              language === 'de' ? 'Aktive Mitglieder' :
              'Active Members'
            }
            value={totalMembers.toLocaleString()}
            icon={TrendingUp}
            variant="blue"
          />

          <KPICard
            label={
              language === 'fr' ? 'Réunions à venir' :
              language === 'de' ? 'Kommende Treffen' :
              'Upcoming Meetings'
            }
            value={upcomingMeetings}
            icon={Calendar}
            variant="purple"
          />

          <KPICard
            label={
              language === 'fr' ? 'Décisions adoptées' :
              language === 'de' ? 'Beschlüsse gefasst' :
              'Decisions Adopted'
            }
            value={totalDecisions}
            icon={CheckCircle}
            variant="green"
          />
        </div>

        {/* Filter Bar - Placeholder with empty children */}
        <div className="mb-8">
          <p className="text-sm text-gray-600">
            {language === 'fr' && 'Filtrez par thème ou localisation pour trouver l\'assemblée qui vous correspond'}
            {language === 'de' && 'Filtern Sie nach Thema oder Standort, um die passende Versammlung zu finden'}
            {language === 'en' && 'Filter by theme or location to find the assembly that suits you'}
          </p>
        </div>

        {/* Assemblies List */}
        <div className="mb-8">
          <h2 className="text-2xl mb-6 text-gray-900">
            {language === 'fr' && 'Assemblées disponibles'}
            {language === 'de' && 'Verfügbare Versammlungen'}
            {language === 'en' && 'Available assemblies'}
          </h2>
        </div>
        <ContentGrid>
          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={tLocal('error.loadingData')} />}
          {assemblies && assemblies.map((assembly) => {
            const isJoined = joinedAssemblies.includes(assembly.id);
            const nextMeetingDate = new Date(assembly.nextMeeting?.date || '');
            const today = new Date();
            const canCancel = isJoined && nextMeetingDate > today; // Can only cancel if meeting hasn't happened yet
            
            return (
            <Card key={assembly.id} className="hover:shadow-lg transition-shadow flex flex-col h-full">
              <CardHeader className="flex-shrink-0">
                <div className="flex items-center justify-between mb-3">
                  <ThemeTag themeId={assembly.themeId} />
                  {isJoined && (
                    <Badge className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {language === 'fr' && 'Membre'}
                      {language === 'de' && 'Mitglied'}
                      {language === 'en' && 'Member'}
                    </Badge>
                  )}
                </div>
                <CardTitle className="line-clamp-2">{tLocal(assembly.name)}</CardTitle>
                <CardDescription className="text-base mt-2 line-clamp-3">{tLocal(assembly.description)}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <div className="space-y-4 flex-grow">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-5 h-5" />
                      <span>{assembly.totalMembers} membres</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FileText className="w-5 h-5" />
                      <span>{assembly.pastMeetings?.length || 0} réunions</span>
                    </div>
                  </div>

                  {/* Next meeting */}
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-900 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">
                        {language === 'fr' && 'Prochaine réunion'}
                        {language === 'de' && 'Nächstes Treffen'}
                        {language === 'en' && 'Next meeting'}
                      </span>
                    </div>
                    <p className="text-sm text-blue-700">
                      {nextMeetingDate.toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>

                  {/* Last meetings */}
                  {assembly.pastMeetings?.length && (
                    <div>
                      <div className="text-sm font-medium text-gray-900 mb-2">
                        {language === 'fr' && 'Réunions passées'}
                        {language === 'de' && 'Vergangene Treffen'}
                        {language === 'en' && 'Past meetings'}
                      </div>
                      {assembly.pastMeetings.slice(0, 2).map((meeting) => (
                        <div
                          key={meeting.id}
                          className="p-3 bg-gray-50 border border-gray-200 rounded mb-2"
                        >
                          <div className="font-medium text-sm line-clamp-1">{meeting.title}</div>
                          <div className="text-xs text-gray-600 mt-1">
                            {new Date(meeting.date).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Button aligned at bottom */}
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                  {!isJoined ? (
                    <Button 
                      className="w-full gap-2" 
                      onClick={() => setSelectedAssembly(assembly)}
                    >
                      <UserPlus className="w-4 h-4" />
                      {language === 'fr' && 'Rejoindre l\'assemblée'}
                      {language === 'de' && 'Der Versammlung beitreten'}
                      {language === 'en' && 'Join the assembly'}
                    </Button>
                  ) : canCancel ? (
                    <>
                      <Button 
                        variant="destructive"
                        className="w-full gap-2" 
                        onClick={() => handleLeaveAssembly(assembly.id, tLocal(assembly.name))}
                      >
                        <UserMinus className="w-4 h-4" />
                        {language === 'fr' && 'Annuler l\'adhésion'}
                        {language === 'de' && 'Mitgliedschaft kündigen'}
                        {language === 'en' && 'Cancel membership'}
                      </Button>
                      <p className="text-xs text-gray-600 text-center">
                        {language === 'fr' && 'Vous pouvez annuler avant la réunion'}
                        {language === 'de' && 'Sie können vor der Versammlung kündigen'}
                        {language === 'en' && 'You can cancel before the meeting'}
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
                        {language === 'fr' && 'Membre actif'}
                        {language === 'de' && 'Aktives Mitglied'}
                        {language === 'en' && 'Active member'}
                      </Button>
                      <p className="text-xs text-gray-500 text-center italic">
                        {language === 'fr' && 'La date de réunion est passée'}
                        {language === 'de' && 'Das Treffendatum ist abgelaufen'}
                        {language === 'en' && 'The meeting date has passed'}
                      </p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
            );
          })}
        </ContentGrid>

        {/* Join Assembly Dialog */}
        <Dialog open={!!selectedAssembly} onOpenChange={(open) => !open && setSelectedAssembly(null)}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {language === 'fr' && 'Rejoindre l\'assemblée'}
                {language === 'de' && 'Der Versammlung beitreten'}
                {language === 'en' && 'Join the assembly'}
              </DialogTitle>
              <DialogDescription className="text-base">
                {selectedAssembly && (
                  <span className="font-medium text-gray-900">{tLocal(selectedAssembly.name)}</span>
                )}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6 py-4">
                {/* Informations personnelles */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">
                    {language === 'fr' && 'Informations personnelles'}
                    {language === 'de' && 'Persönliche Informationen'}
                    {language === 'en' && 'Personal information'}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">
                        {language === 'fr' && 'Prénom *'}
                        {language === 'de' && 'Vorname *'}
                        {language === 'en' && 'First name *'}
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">
                        {language === 'fr' && 'Nom *'}
                        {language === 'de' && 'Nachname *'}
                        {language === 'en' && 'Last name *'}
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {language === 'fr' && 'Email *'}
                      {language === 'de' && 'E-Mail *'}
                      {language === 'en' && 'Email *'}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      {language === 'fr' && 'Téléphone (optionnel)'}
                      {language === 'de' && 'Telefon (optional)'}
                      {language === 'en' && 'Phone (optional)'}
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                </div>

                {/* Motivation */}
                <div className="space-y-2">
                  <Label htmlFor="motivation">
                    {language === 'fr' && 'Pourquoi souhaitez-vous rejoindre cette assemblée ? *'}
                    {language === 'de' && 'Warum möchten Sie dieser Versammlung beitreten? *'}
                    {language === 'en' && 'Why do you want to join this assembly? *'}
                  </Label>
                  <Textarea
                    id="motivation"
                    value={formData.motivation}
                    onChange={(e) => handleInputChange('motivation', e.target.value)}
                    placeholder={
                      language === 'fr' ? 'Décrivez votre motivation, vos intérêts pour cette thématique...' :
                      language === 'de' ? 'Beschreiben Sie Ihre Motivation, Ihre Interessen an diesem Thema...' :
                      'Describe your motivation, your interests in this topic...'
                    }
                    rows={4}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    {language === 'fr' && `${formData.motivation.length} caractères`}
                    {language === 'de' && `${formData.motivation.length} Zeichen`}
                    {language === 'en' && `${formData.motivation.length} characters`}
                  </p>
                </div>

                {/* Compétences */}
                <div className="space-y-2">
                  <Label htmlFor="skills">
                    {language === 'fr' && 'Compétences et expérience pertinente (optionnel)'}
                    {language === 'de' && 'Relevante Fähigkeiten und Erfahrung (optional)'}
                    {language === 'en' && 'Relevant skills and experience (optional)'}
                  </Label>
                  <Textarea
                    id="skills"
                    value={formData.skills}
                    onChange={(e) => handleInputChange('skills', e.target.value)}
                    placeholder={
                      language === 'fr' ? 'Ex: expertise professionnelle, expérience associative, formation...' :
                      language === 'de' ? 'Bsp: berufliche Expertise, Vereinserfahrung, Ausbildung...' :
                      'Ex: professional expertise, association experience, training...'
                    }
                    rows={3}
                  />
                </div>

                {/* Disponibilité */}
                <div className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <Checkbox
                    id="availability"
                    checked={formData.availability}
                    onCheckedChange={(checked) => handleInputChange('availability', !!checked)}
                  />
                  <div className="space-y-1 leading-none">
                    <Label
                      htmlFor="availability"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {language === 'fr' && 'Je confirme ma disponibilité pour participer aux réunions'}
                      {language === 'de' && 'Ich bestätige meine Verfügbarkeit zur Teilnahme an Treffen'}
                      {language === 'en' && 'I confirm my availability to attend meetings'}
                    </Label>
                    <p className="text-xs text-gray-600 mt-1">
                      {selectedAssembly && (
                        <>
                          {language === 'fr' && `Prochaine réunion : ${new Date(selectedAssembly.nextMeeting?.date || '').toLocaleDateString('fr-FR')}`}
                          {language === 'de' && `Nächstes Treffen: ${new Date(selectedAssembly.nextMeeting?.date || '').toLocaleDateString('de-DE')}`}
                          {language === 'en' && `Next meeting: ${new Date(selectedAssembly.nextMeeting?.date || '').toLocaleDateString('en-US')}`}
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {/* Informations légales */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-xs text-gray-700">
                    {language === 'fr' && '📋 Votre demande sera examinée par les coordinateurs de l\'assemblée. Vous recevrez une confirmation par email dans les 48 heures.'}
                    {language === 'de' && '📋 Ihr Antrag wird von den Koordinatoren der Versammlung geprüft. Sie erhalten innerhalb von 48 Stunden eine Bestätigung per E-Mail.'}
                    {language === 'en' && '📋 Your request will be reviewed by the assembly coordinators. You will receive confirmation by email within 48 hours.'}
                  </p>
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedAssembly(null)}
                >
                  {language === 'fr' && 'Annuler'}
                  {language === 'de' && 'Abbrechen'}
                  {language === 'en' && 'Cancel'}
                </Button>
                <Button type="submit" className="gap-2">
                  <UserPlus className="w-4 h-4" />
                  {language === 'fr' && 'Envoyer ma demande'}
                  {language === 'de' && 'Anfrage senden'}
                  {language === 'en' && 'Send my request'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* CTA */}
        <div className="mt-12 p-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
          <div className="max-w-2xl">
            <h2 className="text-2xl mb-4 text-gray-900">
              {language === 'fr' && 'Pourquoi rejoindre une assemblée ?'}
              {language === 'de' && 'Warum einer Versammlung beitreten?'}
              {language === 'en' && 'Why join an assembly?'}
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                • {language === 'fr' && 'Participez activement aux décisions de votre commune'}
                {language === 'de' && 'Nehmen Sie aktiv an den Entscheidungen Ihrer Gemeinde teil'}
                {language === 'en' && 'Actively participate in your community\'s decisions'}
              </p>
              <p>
                • {language === 'fr' && 'Échangez avec d\'autres citoyens engagés'}
                {language === 'de' && 'Tauschen Sie sich mit anderen engagierten Bürgern aus'}
                {language === 'en' && 'Exchange with other engaged citizens'}
              </p>
              <p>
                • {language === 'fr' && 'Contribuez à l\'élaboration de propositions concrètes'}
                {language === 'de' && 'Tragen Sie zur Entwicklung konkreter Vorschläge bei'}
                {language === 'en' && 'Contribute to developing concrete proposals'}
              </p>
              <p>
                • {language === 'fr' && 'Suivez les projets de votre thématique favorite'}
                {language === 'de' && 'Verfolgen Sie die Projekte Ihres Lieblingsthemas'}
                {language === 'en' && 'Follow projects in your favorite topic area'}
              </p>
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
}
