
import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-8 px-6 mb-8 rounded-lg shadow-lg diamond-pattern">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-white transform rotate-45"></div>
        </div>
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          {subtitle && <p className="text-primary-100 mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

export default Header;
