import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Phone, MessageSquare, Voicemail, Info } from 'lucide-react';

const translations = {
  fr: {
    title: 'Accès universel par téléphone',
    description: 'Participez aux consultations, votes et pétitions directement par téléphone ou SMS. Accessible à tous, sans connexion internet.',
    phone: 'Appelez le',
    sms: 'Envoyez SMS au',
    automated: 'Appel automatisé disponible',
    learnMore: 'En savoir plus',
    languages: 'Disponible en français, allemand et anglais',
  },
  de: {
    title: 'Universeller Zugang per Telefon',
    description: 'Nehmen Sie an Konsultationen, Abstimmungen und Petitionen direkt per Telefon oder SMS teil. Für alle zugänglich, ohne Internetverbindung.',
    phone: 'Anrufen',
    sms: 'SMS senden an',
    automated: 'Automatisierter Anruf verfügbar',
    learnMore: 'Mehr erfahren',
    languages: 'Verfügbar auf Französisch, Deutsch und Englisch',
  },
  en: {
    title: 'Universal access by phone',
    description: 'Participate in consultations, votes and petitions directly by phone or SMS. Accessible to all, no internet connection required.',
    phone: 'Call',
    sms: 'Send SMS to',
    automated: 'Automated call available',
    learnMore: 'Learn more',
    languages: 'Available in French, German and English',
  }
};

export function IVRAccessBanner() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center gap-3 text-blue-600">
            <div className="bg-blue-100 p-3 rounded-full">
              <Phone className="size-8" />
            </div>
          </div>
          
          <div className="flex-1 space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              {t.title}
              <Info className="size-4 text-blue-500" />
            </h3>
            <p className="text-gray-700">{t.description}</p>
            
            <div className="flex flex-wrap gap-4 mt-3">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="size-4 text-blue-600" />
                <span className="font-medium text-blue-900">{t.phone} +41 22 327 2000</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MessageSquare className="size-4 text-green-600" />
                <span className="font-medium text-green-900">{t.sms} +41 79 555 0000</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Voicemail className="size-4 text-purple-600" />
                <span className="font-medium text-purple-900">{t.automated}</span>
              </div>
            </div>
            
            <p className="text-xs text-gray-600 italic mt-2">{t.languages}</p>
          </div>
          
          <Link to="/ivr-access">
            <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
              {t.learnMore}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}