import React from 'react';

interface PublicLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function PublicLayout({ children, className = '' }: PublicLayoutProps) {
  return (
    <div className="w-full flex justify-center">
      <div className={`w-full max-w-[1400px] px-6 lg:px-8 ${className}`}>
        {children}
      </div>
    </div>
  );
}
