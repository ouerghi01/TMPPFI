import React from 'react';
import { getThemeById } from '../data/themes';
import { useLanguage } from '../contexts/LanguageContext';

interface ThemeTagProps {
  themeId: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export function ThemeTag({ themeId, size = 'md', showIcon = true }: ThemeTagProps) {
  const theme = getThemeById(themeId);
  const { t, language } = useLanguage();

  if (!theme) return null;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  };

  // Use theme name directly, as it's already a string in the legacy format
  const themeName = language === 'fr' ? theme.name : 
                    language === 'de' ? (theme.nameDE || theme.name) :
                    (theme.nameEN || theme.name);

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${sizeClasses[size]}`}
      style={{
        backgroundColor: `${theme.color}20`,
        color: theme.color,
        border: `1px solid ${theme.color}40`,
      }}
    >
      {showIcon && <span>{theme.icon}</span>}
      <span>{themeName}</span>
    </span>
  );
}