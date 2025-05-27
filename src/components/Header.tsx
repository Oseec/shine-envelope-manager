
import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 md:py-8 px-4 md:px-6 mb-4 md:mb-8 rounded-lg shadow-lg diamond-pattern">
      <div className="flex items-center gap-3 md:gap-4">
        <div className="w-8 h-8 md:w-12 md:h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <div className="w-4 h-4 md:w-6 md:h-6 border-2 border-white transform rotate-45"></div>
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-xl md:text-3xl font-bold truncate">{title}</h1>
          {subtitle && <p className="text-primary-100 mt-1 text-sm md:text-base">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

export default Header;
