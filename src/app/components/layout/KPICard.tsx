import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

interface KPICardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  variant?: 'blue' | 'green' | 'purple' | 'orange' | 'indigo' | 'emerald' | 'pink' | 'cyan';
  /**
   * Card type defines visual hierarchy:
   * - 'primary': Main KPIs - clean white background, colored icon container
   * - 'secondary': Supporting metrics - subtle background tint
   * - 'insight': Contextual info - neutral with minimal color accent
   */
  type?: 'primary' | 'secondary' | 'insight';
  /**
   * Optional secondary value or subtitle
   */
  subtitle?: string | React.ReactNode;
}

const variantStyles = {
  blue: {
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    accentBorder: 'border-l-blue-500',
    subtleBg: 'bg-blue-50/50',
    textAccent: 'text-blue-700',
  },
  green: {
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    accentBorder: 'border-l-green-500',
    subtleBg: 'bg-green-50/50',
    textAccent: 'text-green-700',
  },
  purple: {
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    accentBorder: 'border-l-purple-500',
    subtleBg: 'bg-purple-50/50',
    textAccent: 'text-purple-700',
  },
  orange: {
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    accentBorder: 'border-l-orange-500',
    subtleBg: 'bg-orange-50/50',
    textAccent: 'text-orange-700',
  },
  indigo: {
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    accentBorder: 'border-l-indigo-500',
    subtleBg: 'bg-indigo-50/50',
    textAccent: 'text-indigo-700',
  },
  emerald: {
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    accentBorder: 'border-l-emerald-500',
    subtleBg: 'bg-emerald-50/50',
    textAccent: 'text-emerald-700',
  },
  pink: {
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    accentBorder: 'border-l-pink-500',
    subtleBg: 'bg-pink-50/50',
    textAccent: 'text-pink-700',
  },
  cyan: {
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
    accentBorder: 'border-l-cyan-500',
    subtleBg: 'bg-cyan-50/50',
    textAccent: 'text-cyan-700',
  },
};

/**
 * Standardized KPI Card Component
 * 
 * Design System:
 * - Fixed dimensions and consistent spacing across all instances
 * - Uniform typography scale (label: text-sm, value: text-3xl)
 * - Icon positioned top-right with consistent size (12x12 container, 6x6 icon)
 * - Three visual types for hierarchy (primary, secondary, insight)
 * - Institutional color usage: subtle backgrounds, colored icons and accents
 * - Hover state with shadow elevation
 * - Responsive and accessible
 * 
 * Structure (invariant):
 * - Top-left: Label (text-sm, text-gray-600)
 * - Center-left: Main value (text-3xl, font-bold, text-gray-900)
 * - Top-right: Icon container (w-12 h-12, rounded-lg)
 * - Optional: Subtitle below value
 */
export function KPICard({ 
  label, 
  value, 
  icon: Icon, 
  variant = 'blue',
  type = 'primary',
  subtitle
}: KPICardProps) {
  const styles = variantStyles[variant];

  // Guard against invalid icon - check if it's a valid React component
  if (!Icon) {
    return null;
  }

  // Card styling based on type
  const cardStyles = {
    primary: 'bg-white border-gray-200 hover:shadow-md',
    secondary: `${styles.subtleBg} border-gray-200 hover:shadow-md`,
    insight: `bg-white border-l-4 ${styles.accentBorder} border-y border-r border-gray-200 hover:shadow-md`,
  };

  return (
    <Card className={`${cardStyles[type]} transition-all duration-300 h-full`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Label - Top left */}
            <p className="text-sm text-gray-600 mb-2 line-clamp-2 transition-colors duration-200">
              {label}
            </p>
            {/* Value - Center left, primary focus */}
            <p className={`font-bold text-gray-900 mb-1 leading-tight transition-all duration-300 ${type === 'insight' ? 'text-2xl line-clamp-2 animate-slide-in' : 'text-3xl truncate'}`}>
              {value}
            </p>
            {/* Optional subtitle */}
            {subtitle && (
              <p className={`text-xs ${type === 'insight' ? styles.textAccent : 'text-gray-500'} mt-2 transition-colors duration-200`}>
                {subtitle}
              </p>
            )}
          </div>
          {/* Icon - Top right, consistent position */}
          <div className={`w-12 h-12 rounded-lg ${styles.iconBg} flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-105`}>
            <Icon className={`w-6 h-6 ${styles.iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}