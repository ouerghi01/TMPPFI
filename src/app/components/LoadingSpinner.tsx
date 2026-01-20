import React from 'react';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LoadingSpinnerProps {
  message?: string;
  fullPage?: boolean;
}

export function LoadingSpinner({ message, fullPage = false }: LoadingSpinnerProps) {
  const { language } = useLanguage();
  
  const defaultMessage = 
    language === 'fr' ? 'Chargement...' :
    language === 'de' ? 'Laden...' :
    'Loading...';
  
  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      <p className="text-sm text-gray-500">
        {message || defaultMessage}
      </p>
    </div>
  );
  
  if (fullPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {content}
      </div>
    );
  }
  
  return (
    <div className="py-12 flex items-center justify-center">
      {content}
    </div>
  );
}
