
import React from 'react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'sobres', label: 'Gestión de Sobres', icon: '📦', shortLabel: 'Sobres' },
    { id: 'empleados', label: 'Empleados', icon: '👨‍💼', shortLabel: 'Empleados' },
    { id: 'clientes', label: 'Clientes', icon: '👥', shortLabel: 'Clientes' },
    { id: 'articulos', label: 'Artículos', icon: '💎', shortLabel: 'Artículos' },
    { id: 'reportes', label: 'Reportes', icon: '📊', shortLabel: 'Reportes' },
  ];

  return (
    <nav className="bg-gray-800 border-b border-gray-700 mb-4 md:mb-6 rounded-lg">
      <div className="overflow-x-auto">
        <div className="flex space-x-1 p-1 min-w-max md:min-w-0 md:justify-center">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 rounded-md transition-all text-xs md:text-sm whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-purple-600 text-white shadow-md hover:bg-purple-700' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <span className="text-sm md:text-lg">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.shortLabel}</span>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
