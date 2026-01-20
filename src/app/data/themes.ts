/**
 * CiviAgora - Theme Configuration
 * 
 * This file exports theme data using the standardized ThemeDTO from /types/index.ts
 * Re-exports mockThemes from api-mock.ts for backward compatibility
 */

import type { ThemeDTO } from '../types';
import { mockThemes } from './api-mock';

// Legacy theme interface for backward compatibility
export interface Theme {
  id: string;
  name: string;
  nameDE?: string;
  nameEN?: string;
  descriptionFR?: string;
  descriptionDE?: string;
  descriptionEN?: string;
  color: string;
  icon: string;
}

// Export new standardized themes
export const themesDTO: ThemeDTO[] = mockThemes;

// Export legacy themes for backward compatibility with existing code
export const themes: Theme[] = mockThemes.map(theme => ({
  id: theme.id,
  name: theme.name.fr, // Default to French for legacy compatibility
  nameDE: theme.name.de,
  nameEN: theme.name.en,
  descriptionFR: theme.description.fr,
  descriptionDE: theme.description.de,
  descriptionEN: theme.description.en,
  color: theme.colorHex,
  icon: theme.icon,
}));

// Helper function to get theme by ID (returns legacy format)
export function getThemeById(id: string): Theme | undefined {
  return themes.find((theme) => theme.id === id);
}

// Helper function to get ThemeDTO by ID (returns new format)
export function getThemeDTOById(id: string): ThemeDTO | undefined {
  return themesDTO.find((theme) => theme.id === id);
}

// Helper function to get theme by slug
export function getThemeBySlug(slug: string): ThemeDTO | undefined {
  return themesDTO.find((theme) => theme.slug === slug);
}

// Helper function to get active themes only
export function getActiveThemes(): ThemeDTO[] {
  return themesDTO.filter((theme) => theme.active);
}

// Helper function to get themes sorted by display order
export function getThemesSorted(): ThemeDTO[] {
  return [...themesDTO].sort((a, b) => a.displayOrder - b.displayOrder);
}

// Export type for backward compatibility
export type { ThemeDTO };