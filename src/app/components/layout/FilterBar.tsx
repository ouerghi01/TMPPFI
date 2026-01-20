import React from 'react';
import { Card, CardContent } from '../ui/card';

interface FilterBarProps {
  children: React.ReactNode;
}

/**
 * Standardized filter bar component
 * Consistent spacing and styling across all pages
 */
export function FilterBar({ children }: FilterBarProps) {
  return (
    <Card className="border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
