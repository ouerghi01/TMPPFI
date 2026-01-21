import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useSpeaker } from '../hooks/useApi';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { LoadingSpinner } from '../components/LoadingSpinner';
import {
  ArrowLeft,
  Award,
  Briefcase,
  Mail,
  Linkedin,
  Twitter,
  Globe,
  Users,
} from 'lucide-react';

export function SpeakerDetailPage() {
  const { speakerId } = useParams<{ speakerId: string }>();
  const navigate = useNavigate();
  const { language, tLocal } = useLanguage();

  // Fetch speaker data from API
  const { data: speaker, isLoading, error } = useSpeaker(speakerId || '');

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !speaker) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/conferences')}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {language === 'fr' && 'Retour aux conférences'}
          {language === 'de' && 'Zurück zu den Konferenzen'}
          {language === 'en' && 'Back to conferences'}
        </Button>
        <p className="text-center text-gray-600">
          {language === 'fr' && 'Intervenant non trouvé'}
          {language === 'de' && 'Referent nicht gefunden'}
          {language === 'en' && 'Speaker not found'}
        </p>
      </div>
    );
  }

  const speakerName = `${speaker.name}`;
  const speakerTitle = tLocal(speaker.title);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate('/conferences')}
        className="mb-6 gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        {language === 'fr' && 'Retour aux conférences'}
        {language === 'de' && 'Zurück zu den Konferenzen'}
        {language === 'en' && 'Back to conferences'}
      </Button>

      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 mb-8 text-white">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {speaker.avatar ? (
              <img
                src={speaker.avatar}
                alt={speakerName}
                className="w-32 h-32 rounded-full object-cover border-4 border-white/20"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl font-bold">
                {speaker.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-4xl mb-2">{speakerName}</h1>
            <p className="text-xl mb-1 text-blue-100">{speakerTitle}</p>
            <p className="text-lg text-blue-200 flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              {speaker.organization}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Biography */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                {language === 'fr' && 'Biographie'}
                {language === 'de' && 'Biografie'}
                {language === 'en' && 'Biography'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{tLocal(speaker.bio)}</p>
            </CardContent>
          </Card>

          {/* Expertise */}
          {speaker.expertise && speaker.expertise.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  {language === 'fr' && 'Domaines d\'expertise'}
                  {language === 'de' && 'Fachgebiete'}
                  {language === 'en' && 'Areas of expertise'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {speaker.expertise.map((exp, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full border border-purple-200"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact & Social */}
          {speaker.socialLinks && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === 'fr' && 'Contact & Réseaux'}
                  {language === 'de' && 'Kontakt & Netzwerke'}
                  {language === 'en' && 'Contact & Networks'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {speaker.socialLinks.linkedin && (
                    <a
                      href={speaker.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span className="text-sm">LinkedIn</span>
                    </a>
                  )}
                  {speaker.socialLinks.twitter && (
                    <a
                      href={speaker.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-500 transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                      <span className="text-sm">{speaker.socialLinks.twitter}</span>
                    </a>
                  )}
                  {speaker.socialLinks.website && (
                    <a
                      href={speaker.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-700 transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                      <span className="text-sm">Website</span>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Info */}
          <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
            <CardHeader>
              <CardTitle className="text-lg">
                {language === 'fr' && 'À propos'}
                {language === 'de' && 'Über'}
                {language === 'en' && 'About'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">
                    {language === 'fr' && 'Organisation'}
                    {language === 'de' && 'Organisation'}
                    {language === 'en' && 'Organization'}
                  </p>
                  <p>{speaker.organization}</p>
                </div>
                {speaker.expertise && speaker.expertise.length > 0 && (
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      {language === 'fr' && 'Expertise principale'}
                      {language === 'de' && 'Hauptfachgebiet'}
                      {language === 'en' && 'Main expertise'}
                    </p>
                    <p>{speaker.expertise[0]}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
