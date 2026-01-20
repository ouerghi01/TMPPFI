import React from 'react';
import { Inbox } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  const { language } = useLanguage();
  
  const defaultTitle = 
    language === 'fr' ? 'Aucune donnée disponible' :
    language === 'de' ? 'Keine Daten verfügbar' :
    'No data available';
  
  const defaultDescription = 
    language === 'fr' ? 'Il n\'y a aucun élément à afficher pour le moment.' :
    language === 'de' ? 'Es gibt derzeit keine Elemente anzuzeigen.' :
    'There are no items to display at this time.';
  
  return (
    <div className="py-16 flex flex-col items-center justify-center text-center">
      <div className="mb-4 text-gray-400">
        {icon || <Inbox className="w-16 h-16" />}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {title || defaultTitle}
      </h3>
      <p className="text-sm text-gray-500 max-w-md">
        {description || defaultDescription}
      </p>
    </div>
  );
}
