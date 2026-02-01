import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { X } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface Filter {
  type: 'select' | 'text';
  label: string;
  value: string;
  onChange: (value: string) => void;
  options?: FilterOption[];
  placeholder?: string;
}

interface FilterBarProps {
  children?: React.ReactNode;
  filters?: Filter[];
  onReset?: () => void;
}

/**
 * Standardized filter bar component
 * Consistent spacing and styling across all pages
 */
export function FilterBar({ children, filters, onReset }: FilterBarProps) {
  return (
    <Card className="border-gray-200 shadow-sm">
      <CardContent className="p-6">
        {filters ? (
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              {filters.map((filter, index) => {
                if (filter.type === 'select') {
                  return (
                    <div key={index} className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">{filter.label}</label>
                      <Select
                        value={filter.value === '' ? 'ALL' : filter.value}
                        onValueChange={(val) => filter.onChange(val === 'ALL' ? '' : val)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={filter.label} />
                        </SelectTrigger>
                        <SelectContent>
                          {filter.options?.map((option) => (
                            <SelectItem key={option.value || 'ALL'} value={option.value || 'ALL'}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  );
                }
                return null;
              })}
            </div>
            {onReset && (
              <Button variant="outline" onClick={onReset} className="w-full md:w-auto shrink-0">
                <X className="w-4 h-4 mr-2" />
                Reset
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
