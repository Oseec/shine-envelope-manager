
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Filter, Phone, Mail, MapPin } from 'lucide-react';

interface EmpleadosListProps {
  onCreateNew: () => void;
  onEdit: (empleado: any) => void;
  onView: (empleado: any) => void;
}

const EmpleadosList: React.FC<EmpleadosListProps> = ({ onCreateNew, onEdit, onView }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('all');

  // Datos de ejemplo
  const empleados = [
    {
      id: 'EMP001',
      nombre: 'María',
      apellido: 'González',
      puesto: 'Joyero Senior',
      telefono: '+1 234-567-8901',
      email: 'maria.gonzalez@joyeriakarina.com',
      direccion: 'Av. Principal 123, Ciudad',
      fechaIngreso: new Date('2020-03-15'),
      salario: 2500.00,
      estado: 'Activo',
      especialidad: 'Soldadura y Reparaciones'
    },
    {
      id: 'EMP002',
      nombre: 'Carlos',
      apellido: 'Martínez',
      puesto: 'Grabador',
      telefono: '+1 234-567-8902',
      email: 'carlos.martinez@joyeriakarina.com',
      direccion: 'Calle Secundaria 456, Ciudad',
      fechaIngreso: new Date('2021-07-10'),
      salario: 2200.00,
      estado: 'Activo',
      especialidad: 'Grabado en metales'
    },
    {
      id: 'EMP003',
      nombre: 'Ana',
      apellido: 'Rodríguez',
      puesto: 'Vendedora',
      telefono: '+1 234-567-8903',
      email: 'ana.rodriguez@joyeriakarina.com',
      direccion: 'Plaza Central 789, Ciudad',
      fechaIngreso: new Date('2019-11-20'),
      salario: 1800.00,
      estado: 'Activo',
      especialidad: 'Atención al cliente'
    }
  ];

  const filteredEmpleados = empleados.filter(empleado => {
    const matchesSearch = empleado.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         empleado.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         empleado.id.includes(searchTerm) ||
                         empleado.puesto.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEstado = filterEstado === 'all' || empleado.estado.toLowerCase() === filterEstado;
    
    return matchesSearch && matchesEstado;
  });

  return (
    <div className="space-y-4 md:space-y-6 px-2 md:px-0">
      {/* Header y botón de crear */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Gestión de Empleados</h2>
          <p className="text-gray-600 mt-1 text-sm md:text-base">Administra el personal de la joyería</p>
        </div>
        <Button 
          onClick={onCreateNew}
          className="bg-primary hover:bg-primary-600 flex items-center gap-2 w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Nuevo Empleado
        </Button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <div className="relative col-span-1 sm:col-span-2 lg:col-span-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar empleado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterEstado} onValueChange={setFilterEstado}>
            <SelectTrigger>
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="activo">Activo</SelectItem>
              <SelectItem value="inactivo">Inactivo</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="flex items-center gap-2 sm:col-span-2 lg:col-span-1">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filtros avanzados</span>
            <span className="sm:hidden">Filtros</span>
          </Button>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <div className="bg-green-50 p-3 md:p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-800 text-xs md:text-sm font-medium">Activos</p>
              <p className="text-lg md:text-2xl font-bold text-green-900">
                {empleados.filter(e => e.estado === 'Activo').length}
              </p>
            </div>
            <div className="text-green-500 text-xl md:text-2xl">👨‍💼</div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-3 md:p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-800 text-xs md:text-sm font-medium">Total</p>
              <p className="text-lg md:text-2xl font-bold text-blue-900">
                {empleados.length}
              </p>
            </div>
            <div className="text-blue-500 text-xl md:text-2xl">👥</div>
          </div>
        </div>

        <div className="bg-purple-50 p-3 md:p-4 rounded-lg border border-purple-200 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-800 text-xs md:text-sm font-medium">Especialistas</p>
              <p className="text-lg md:text-2xl font-bold text-purple-900">
                {empleados.filter(e => e.puesto.includes('Joyero') || e.puesto.includes('Grabador')).length}
              </p>
            </div>
            <div className="text-purple-500 text-xl md:text-2xl">💎</div>
          </div>
        </div>
      </div>

      {/* Lista de empleados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {filteredEmpleados.map((empleado) => (
          <div key={empleado.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-4 md:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {empleado.nombre} {empleado.apellido}
                </h3>
                <p className="text-primary font-medium text-sm">{empleado.puesto}</p>
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full mt-2">
                  ID: {empleado.id}
                </span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                empleado.estado === 'Activo' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {empleado.estado}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-3 w-3" />
                <span>{empleado.telefono}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-3 w-3" />
                <span className="truncate">{empleado.email}</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <MapPin className="h-3 w-3 mt-0.5" />
                <span className="text-xs">{empleado.direccion}</span>
              </div>
            </div>

            <div className="border-t pt-3 mb-4">
              <p className="text-xs text-gray-500 mb-1">Especialidad:</p>
              <p className="text-sm font-medium text-gray-700">{empleado.especialidad}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                onClick={() => onView(empleado)}
                variant="outline" 
                size="sm"
                className="flex-1 text-xs"
              >
                Ver Detalles
              </Button>
              <Button 
                onClick={() => onEdit(empleado)}
                size="sm"
                className="flex-1 bg-primary hover:bg-primary-600 text-xs"
              >
                Editar
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredEmpleados.length === 0 && (
        <div className="text-center py-8 md:py-12">
          <div className="text-4xl md:text-6xl mb-4">👨‍💼</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron empleados</h3>
          <p className="text-gray-600 text-sm md:text-base">
            {searchTerm || filterEstado !== 'all' 
              ? 'Intenta ajustar los filtros de búsqueda'
              : 'Registra tu primer empleado para comenzar'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default EmpleadosList;
