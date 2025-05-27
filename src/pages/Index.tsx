
import React, { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import SobresList from '@/components/sobres/SobresList';
import SobreForm from '@/components/sobres/SobreForm';
import EmpleadosList from '@/components/empleados/EmpleadosList';
import EmpleadoForm from '@/components/empleados/EmpleadoForm';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeTab, setActiveTab] = useState('sobres');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const { toast } = useToast();

  const handleCreateNew = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleView = (item: any) => {
    const itemType = activeTab === 'sobres' ? 'sobre' : 'empleado';
    const itemId = activeTab === 'sobres' ? item.id : item.id;
    const itemName = activeTab === 'sobres' ? item.cliente : `${item.nombre} ${item.apellido}`;
    
    toast({
      title: `Ver ${itemType}`,
      description: `Mostrando detalles de ${itemName}`,
    });
  };

  const handleSubmit = (data: any) => {
    const isEditing = editingItem !== null;
    const itemType = activeTab === 'sobres' ? 'sobre' : 'empleado';
    
    toast({
      title: `${itemType} ${isEditing ? 'actualizado' : 'creado'}`,
      description: `El ${itemType} ha sido ${isEditing ? 'actualizado' : 'creado'} exitosamente.`,
    });
    
    setShowForm(false);
    setEditingItem(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const renderContent = () => {
    if (activeTab === 'sobres') {
      if (showForm) {
        return (
          <SobreForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            editingSobre={editingItem}
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
    
    if (activeTab === 'empleados') {
      if (showForm) {
        return (
          <EmpleadoForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            editingEmpleado={editingItem}
          />
        );
      }
      return (
        <EmpleadosList
          onCreateNew={handleCreateNew}
          onEdit={handleEdit}
          onView={handleView}
        />
      );
    }
    
    return (
      <div className="text-center py-8 md:py-12 px-4">
        <div className="text-4xl md:text-6xl mb-4">🚧</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Sección en desarrollo</h3>
        <p className="text-gray-600 text-sm md:text-base">Esta funcionalidad estará disponible próximamente.</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-purple-50">
      <div className="container mx-auto px-2 md:px-4 py-4 md:py-8">
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
