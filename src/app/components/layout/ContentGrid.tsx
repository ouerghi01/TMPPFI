import React from 'react';

interface ContentGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3;
}

/**
 * Standardized content grid for cards
 * Consistent responsive behavior
 */
export function ContentGrid({ children, columns = 2 }: ContentGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 lg:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {children}
    </div>
  );
}
