
import React from 'react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'sobres', label: 'Gestión de Sobres', icon: '📦' },
    { id: 'clientes', label: 'Clientes', icon: '👥' },
    { id: 'articulos', label: 'Artículos', icon: '💎' },
    { id: 'reportes', label: 'Reportes', icon: '📊' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 mb-6">
      <div className="flex space-x-1 p-1">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
              activeTab === tab.id 
                ? 'bg-primary text-white shadow-md' 
                : 'text-gray-600 hover:text-primary hover:bg-primary/10'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            {tab.label}
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
