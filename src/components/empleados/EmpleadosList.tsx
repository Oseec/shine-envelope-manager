
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Filter, Phone, Mail, MapPin, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface EmpleadosListProps {
  onCreateNew: () => void;
  onEdit: (empleado: any) => void;
  onView: (empleado: any) => void;
}

const EmpleadosList: React.FC<EmpleadosListProps> = ({ onCreateNew, onEdit, onView }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('all');
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const fetchEmpleados = async () => {
    try {
      const { data, error } = await supabase
        .from('empleados')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEmpleados(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los empleados",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (empleado: any) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar a ${empleado.nombre} ${empleado.apellido}?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('empleados')
        .delete()
        .eq('id', empleado.id);

      if (error) throw error;

      toast({
        title: "Empleado eliminado",
        description: `${empleado.nombre} ${empleado.apellido} ha sido eliminado exitosamente.`,
      });

      fetchEmpleados();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el empleado",
        variant: "destructive",
      });
    }
  };

  const filteredEmpleados = empleados.filter(empleado => {
    const matchesSearch = empleado.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         empleado.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         empleado.id.includes(searchTerm) ||
                         empleado.puesto.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEstado = filterEstado === 'all' || empleado.estado.toLowerCase() === filterEstado;
    
    return matchesSearch && matchesEstado;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-400">Cargando empleados...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 px-2 md:px-0">
      {/* Header y botón de crear */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-100">Gestión de Empleados</h2>
          <p className="text-gray-400 mt-1 text-sm md:text-base">Administra el personal de la joyería</p>
        </div>
        <Button 
          onClick={onCreateNew}
          className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2 w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Nuevo Empleado
        </Button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-gray-800 p-3 md:p-4 rounded-lg border border-gray-700 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <div className="relative col-span-1 sm:col-span-2 lg:col-span-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar empleado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
            />
          </div>
          
          <Select value={filterEstado} onValueChange={setFilterEstado}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-100">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="activo">Activo</SelectItem>
              <SelectItem value="inactivo">Inactivo</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="flex items-center gap-2 sm:col-span-2 lg:col-span-1 border-gray-600 text-gray-300 hover:bg-gray-700">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filtros avanzados</span>
            <span className="sm:hidden">Filtros</span>
          </Button>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <div className="bg-green-900/30 p-3 md:p-4 rounded-lg border border-green-600/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-xs md:text-sm font-medium">Activos</p>
              <p className="text-lg md:text-2xl font-bold text-green-300">
                {empleados.filter(e => e.estado === 'Activo').length}
              </p>
            </div>
            <div className="text-green-500 text-xl md:text-2xl">👨‍💼</div>
          </div>
        </div>
        
        <div className="bg-blue-900/30 p-3 md:p-4 rounded-lg border border-blue-600/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-xs md:text-sm font-medium">Total</p>
              <p className="text-lg md:text-2xl font-bold text-blue-300">
                {empleados.length}
              </p>
            </div>
            <div className="text-blue-500 text-xl md:text-2xl">👥</div>
          </div>
        </div>

        <div className="bg-purple-900/30 p-3 md:p-4 rounded-lg border border-purple-600/50 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-xs md:text-sm font-medium">Especialistas</p>
              <p className="text-lg md:text-2xl font-bold text-purple-300">
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
          <div key={empleado.id} className="bg-gray-800 rounded-lg shadow-md border border-gray-700 p-4 md:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-100">
                  {empleado.nombre} {empleado.apellido}
                </h3>
                <p className="text-purple-400 font-medium text-sm">{empleado.puesto}</p>
                <span className="inline-block px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full mt-2">
                  ID: {empleado.id.slice(0, 8)}
                </span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                empleado.estado === 'Activo' 
                  ? 'bg-green-900/50 text-green-300' 
                  : 'bg-red-900/50 text-red-300'
              }`}>
                {empleado.estado}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              {empleado.telefono && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Phone className="h-3 w-3" />
                  <span>{empleado.telefono}</span>
                </div>
              )}
              {empleado.email && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Mail className="h-3 w-3" />
                  <span className="truncate">{empleado.email}</span>
                </div>
              )}
              {empleado.direccion && (
                <div className="flex items-start gap-2 text-sm text-gray-400">
                  <MapPin className="h-3 w-3 mt-0.5" />
                  <span className="text-xs">{empleado.direccion}</span>
                </div>
              )}
            </div>

            {empleado.especialidad && (
              <div className="border-t border-gray-700 pt-3 mb-4">
                <p className="text-xs text-gray-500 mb-1">Especialidad:</p>
                <p className="text-sm font-medium text-gray-300">{empleado.especialidad}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                onClick={() => onView(empleado)}
                variant="outline" 
                size="sm"
                className="flex-1 text-xs border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Ver Detalles
              </Button>
              <Button 
                onClick={() => onEdit(empleado)}
                size="sm"
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-xs"
              >
                Editar
              </Button>
              <Button 
                onClick={() => handleDelete(empleado)}
                variant="outline"
                size="sm"
                className="flex items-center gap-1 border-red-600 text-red-400 hover:bg-red-900/20"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredEmpleados.length === 0 && (
        <div className="text-center py-8 md:py-12">
          <div className="text-4xl md:text-6xl mb-4">👨‍💼</div>
          <h3 className="text-lg font-medium text-gray-100 mb-2">No se encontraron empleados</h3>
          <p className="text-gray-400 text-sm md:text-base">
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
