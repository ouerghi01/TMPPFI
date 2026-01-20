import React from 'react';

interface PageBannerProps {
  title: string;
  description: string;
  gradient?: string;
  icon?: React.ReactNode;
  image?: string;
}

export function PageBanner({ 
  title, 
  description, 
  gradient = 'from-blue-600 to-purple-600',
  icon,
  image
}: PageBannerProps) {
  return (
    <div className={`bg-gradient-to-r ${gradient} text-white`}>
      {/* Centered Container with max-width */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1400px] px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Icon or Image */}
            {icon && (
              <div className="flex-shrink-0 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                {icon}
              </div>
            )}
            
            {image && (
              <div className="flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden">
                <img src={image} alt={title} className="w-full h-full object-cover" />
              </div>
            )}
            
            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">{title}</h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
                {description}
              </p>
            </div>
            
            {/* Decorative Elements */}
            <div className="hidden lg:block">
              <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}