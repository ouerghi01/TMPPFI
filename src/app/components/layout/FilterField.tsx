import React from 'react';

interface FilterFieldProps {
  children: React.ReactNode;
  label: string;
}

/**
 * Standardized filter field wrapper
 */
export function FilterField({ children, label }: FilterFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
    </div>
  );
}
