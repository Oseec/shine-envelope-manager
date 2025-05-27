
import React, { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import SobresList from '@/components/sobres/SobresList';
import SobreForm from '@/components/sobres/SobreForm';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeTab, setActiveTab] = useState('sobres');
  const [showForm, setShowForm] = useState(false);
  const [editingSobre, setEditingSobre] = useState(null);
  const { toast } = useToast();

  const handleCreateNew = () => {
    setEditingSobre(null);
    setShowForm(true);
  };

  const handleEdit = (sobre: any) => {
    setEditingSobre(sobre);
    setShowForm(true);
  };

  const handleView = (sobre: any) => {
    toast({
      title: "Ver Sobre",
      description: `Mostrando detalles del sobre #${sobre.id} para ${sobre.cliente}`,
    });
  };

  const handleSubmit = (sobreData: any) => {
    if (editingSobre) {
      toast({
        title: "Sobre actualizado",
        description: "El sobre ha sido actualizado exitosamente.",
      });
    } else {
      toast({
        title: "Sobre creado",
        description: "El nuevo sobre ha sido creado exitosamente.",
      });
    }
    setShowForm(false);
    setEditingSobre(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSobre(null);
  };

  const renderContent = () => {
    if (activeTab === 'sobres') {
      if (showForm) {
        return (
          <SobreForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            editingSobre={editingSobre}
          />
        );
      }
      return (
        <SobresList
          onCreateNew={handleCreateNew}
          onEdit={handleEdit}
          onView={handleView}
        />
      );
    }
    
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🚧</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Sección en desarrollo</h3>
        <p className="text-gray-600">Esta funcionalidad estará disponible próximamente.</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <Header 
          title="Joyería Karina" 
          subtitle="Sistema de Gestión - Desde 1996"
        />
        
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="animate-fade-in">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
