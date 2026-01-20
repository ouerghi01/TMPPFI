import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface ErrorMessageProps {
  error?: Error | { message: string };
  onRetry?: () => void;
  title?: string;
}

export function ErrorMessage({ error, onRetry, title }: ErrorMessageProps) {
  const { language } = useLanguage();
  
  const defaultTitle = 
    language === 'fr' ? 'Erreur de chargement' :
    language === 'de' ? 'Ladefehler' :
    'Loading Error';
  
  const retryText =
    language === 'fr' ? 'Réessayer' :
    language === 'de' ? 'Erneut versuchen' :
    'Retry';
  
  return (
    <div className="py-12 flex items-center justify-center">
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title || defaultTitle}</AlertTitle>
        <AlertDescription className="mt-2">
          <p className="mb-4">{error?.message || 'Une erreur est survenue'}</p>
          {onRetry && (
            <Button 
              onClick={onRetry} 
              variant="outline" 
              size="sm"
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              {retryText}
            </Button>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
}
