import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { LocalizedString } from "../types"
import type { Language } from "../contexts/LanguageContext"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get localized string value from a LocalizedString object
 * @param localizedString - The LocalizedString object or a plain string
 * @param language - The current language
 * @returns The localized string in the specified language
 */
export function getLocalizedString(
  localizedString: LocalizedString | string | undefined,
  language: Language
): string {
  if (!localizedString) return '';
  if (typeof localizedString === 'string') return localizedString;
  return localizedString[language] || localizedString.fr || localizedString.en || localizedString.de || '';
}