
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Filter } from 'lucide-react';
import SobreCard from './SobreCard';

interface SobresListProps {
  onCreateNew: () => void;
  onEdit: (sobre: any) => void;
  onView: (sobre: any) => void;
}

const SobresList: React.FC<SobresListProps> = ({ onCreateNew, onEdit, onView }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('all');
  const [filterTipo, setFilterTipo] = useState('all');

  // Datos de ejemplo
  const sobres = [
    {
      id: '001',
      cliente: 'María González',
      tipo: 'reparacion',
      tipoReparacion: 'Soldadura',
      estado: 'En Proceso',
      precioTotal: 150.00,
      abono: 50.00,
      fechaIngreso: new Date('2024-01-15'),
      fechaLimiteEntrega: new Date('2024-01-25'),
    },
    {
      id: '002',
      cliente: 'Juan Pérez',
      tipo: 'grabado',
      tipoReparacion: 'Grabado',
      estado: 'Pendiente',
      precioTotal: 80.00,
      abono: 0,
      fechaIngreso: new Date('2024-01-18'),
      fechaLimiteEntrega: new Date('2024-01-28'),
      descripcionDelGrabado: 'Grabado de nombres en anillo de boda'
    },
    {
      id: '003',
      cliente: 'Ana Rodríguez',
      tipo: 'reparacion',
      tipoReparacion: 'Pulido',
      estado: 'Completado',
      precioTotal: 120.00,
      abono: 120.00,
      fechaIngreso: new Date('2024-01-10'),
      fechaLimiteEntrega: new Date('2024-01-20'),
    },
    {
      id: '004',
      cliente: 'Carlos Martínez',
      tipo: 'reparacion',
      tipoReparacion: 'Engaste',
      estado: 'Entregado',
      precioTotal: 300.00,
      abono: 300.00,
      fechaIngreso: new Date('2024-01-05'),
      fechaLimiteEntrega: new Date('2024-01-15'),
    }
  ];

  const filteredSobres = sobres.filter(sobre => {
    const matchesSearch = sobre.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sobre.id.includes(searchTerm) ||
                         sobre.tipoReparacion.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEstado = filterEstado === 'all' || sobre.estado.toLowerCase() === filterEstado;
    const matchesTipo = filterTipo === 'all' || sobre.tipo === filterTipo;
    
    return matchesSearch && matchesEstado && matchesTipo;
  });

  return (
    <div className="space-y-6">
      {/* Header y botón de crear */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Sobres</h2>
          <p className="text-gray-600 mt-1">Administra los trabajos de reparación y grabado</p>
        </div>
        <Button 
          onClick={onCreateNew}
          className="bg-primary hover:bg-primary-600 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Nuevo Sobre
        </Button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por cliente, ID o tipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterEstado} onValueChange={setFilterEstado}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="en proceso">En Proceso</SelectItem>
              <SelectItem value="completado">Completado</SelectItem>
              <SelectItem value="entregado">Entregado</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterTipo} onValueChange={setFilterTipo}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tipos</SelectItem>
              <SelectItem value="reparacion">Reparación</SelectItem>
              <SelectItem value="grabado">Grabado</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros avanzados
          </Button>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-800 text-sm font-medium">Pendientes</p>
              <p className="text-2xl font-bold text-yellow-900">
                {sobres.filter(s => s.estado === 'Pendiente').length}
              </p>
            </div>
            <div className="text-yellow-500 text-2xl">⏳</div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-800 text-sm font-medium">En Proceso</p>
              <p className="text-2xl font-bold text-blue-900">
                {sobres.filter(s => s.estado === 'En Proceso').length}
              </p>
            </div>
            <div className="text-blue-500 text-2xl">🔄</div>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-800 text-sm font-medium">Completados</p>
              <p className="text-2xl font-bold text-green-900">
                {sobres.filter(s => s.estado === 'Completado').length}
              </p>
            </div>
            <div className="text-green-500 text-2xl">✅</div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-800 text-sm font-medium">Entregados</p>
              <p className="text-2xl font-bold text-gray-900">
                {sobres.filter(s => s.estado === 'Entregado').length}
              </p>
            </div>
            <div className="text-gray-500 text-2xl">📦</div>
          </div>
        </div>
      </div>

      {/* Lista de sobres */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSobres.map((sobre) => (
          <SobreCard
            key={sobre.id}
            sobre={sobre}
            onEdit={onEdit}
            onView={onView}
          />
        ))}
      </div>

      {filteredSobres.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron sobres</h3>
          <p className="text-gray-600">
            {searchTerm || filterEstado !== 'all' || filterTipo !== 'all' 
              ? 'Intenta ajustar los filtros de búsqueda'
              : 'Crea tu primer sobre para comenzar'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default SobresList;
