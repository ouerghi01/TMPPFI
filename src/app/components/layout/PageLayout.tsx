import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Standard centered page layout with 12-column grid system
 * Max width: 1280px, centered on viewport
 */
export function PageLayout({ children, className = '' }: PageLayoutProps) {
  return (
    <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px] ${className}`}>
      {children}
    </div>
  );
}
