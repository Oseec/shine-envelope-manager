
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Filter } from 'lucide-react';
import SobreCard from './SobreCard';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SobresListProps {
  onCreateNew: () => void;
  onEdit: (sobre: any) => void;
  onView: (sobre: any) => void;
}

const SobresList: React.FC<SobresListProps> = ({ onCreateNew, onEdit, onView }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('all');
  const [filterTipo, setFilterTipo] = useState('all');
  const [sobres, setSobres] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSobres();
  }, []);

  const fetchSobres = async () => {
    try {
      const { data, error } = await supabase
        .from('sobres')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSobres(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los sobres",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredSobres = sobres.filter(sobre => {
    const matchesSearch = sobre.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sobre.id.includes(searchTerm) ||
                         (sobre.tipo_reparacion && sobre.tipo_reparacion.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesEstado = filterEstado === 'all' || sobre.estado.toLowerCase() === filterEstado;
    const matchesTipo = filterTipo === 'all' || sobre.tipo === filterTipo;
    
    return matchesSearch && matchesEstado && matchesTipo;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-400">Cargando sobres...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header y botón de crear */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Gestión de Sobres</h2>
          <p className="text-gray-400 mt-1">Administra los trabajos de reparación y grabado</p>
        </div>
        <Button 
          onClick={onCreateNew}
          className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Nuevo Sobre
        </Button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por cliente, ID o tipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
            />
          </div>
          
          <Select value={filterEstado} onValueChange={setFilterEstado}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-100">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="en proceso">En Proceso</SelectItem>
              <SelectItem value="completado">Completado</SelectItem>
              <SelectItem value="entregado">Entregado</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterTipo} onValueChange={setFilterTipo}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-100">
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="all">Todos los tipos</SelectItem>
              <SelectItem value="reparacion">Reparación</SelectItem>
              <SelectItem value="grabado">Grabado</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="flex items-center gap-2 border-gray-600 text-gray-300 hover:bg-gray-700">
            <Filter className="h-4 w-4" />
            Filtros avanzados
          </Button>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-yellow-900/30 p-4 rounded-lg border border-yellow-600/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-400 text-sm font-medium">Pendientes</p>
              <p className="text-2xl font-bold text-yellow-300">
                {sobres.filter(s => s.estado === 'Pendiente').length}
              </p>
            </div>
            <div className="text-yellow-500 text-2xl">⏳</div>
          </div>
        </div>
        
        <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-600/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">En Proceso</p>
              <p className="text-2xl font-bold text-blue-300">
                {sobres.filter(s => s.estado === 'En Proceso').length}
              </p>
            </div>
            <div className="text-blue-500 text-2xl">🔄</div>
          </div>
        </div>

        <div className="bg-green-900/30 p-4 rounded-lg border border-green-600/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">Completados</p>
              <p className="text-2xl font-bold text-green-300">
                {sobres.filter(s => s.estado === 'Completado').length}
              </p>
            </div>
            <div className="text-green-500 text-2xl">✅</div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Entregados</p>
              <p className="text-2xl font-bold text-gray-300">
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
            sobre={{
              ...sobre,
              fechaIngreso: new Date(sobre.fecha_ingreso),
              fechaLimiteEntrega: sobre.fecha_limite_entrega ? new Date(sobre.fecha_limite_entrega) : undefined,
              tipoReparacion: sobre.tipo_reparacion || sobre.tipo,
              descripcionDelGrabado: sobre.descripcion_grabado
            }}
            onEdit={onEdit}
            onView={onView}
          />
        ))}
      </div>

      {filteredSobres.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-100 mb-2">No se encontraron sobres</h3>
          <p className="text-gray-400">
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
