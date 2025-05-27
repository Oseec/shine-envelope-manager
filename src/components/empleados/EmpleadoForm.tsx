
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface EmpleadoFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  editingEmpleado?: any;
}

const EmpleadoForm: React.FC<EmpleadoFormProps> = ({ onSubmit, onCancel, editingEmpleado }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    puesto: '',
    telefono: '',
    email: '',
    direccion: '',
    fecha_ingreso: '',
    salario: '',
    estado: 'Activo',
    especialidad: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (editingEmpleado) {
      setFormData({
        nombre: editingEmpleado.nombre || '',
        apellido: editingEmpleado.apellido || '',
        puesto: editingEmpleado.puesto || '',
        telefono: editingEmpleado.telefono || '',
        email: editingEmpleado.email || '',
        direccion: editingEmpleado.direccion || '',
        fecha_ingreso: editingEmpleado.fecha_ingreso ? 
          new Date(editingEmpleado.fecha_ingreso).toISOString().split('T')[0] : '',
        salario: editingEmpleado.salario?.toString() || '',
        estado: editingEmpleado.estado || 'Activo',
        especialidad: editingEmpleado.especialidad || ''
      });
    }
  }, [editingEmpleado]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSubmit = {
        ...formData,
        salario: parseFloat(formData.salario) || null,
        fecha_ingreso: formData.fecha_ingreso || new Date().toISOString().split('T')[0]
      };

      if (editingEmpleado) {
        const { error } = await supabase
          .from('empleados')
          .update(dataToSubmit)
          .eq('id', editingEmpleado.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('empleados')
          .insert([dataToSubmit]);

        if (error) throw error;
      }

      toast({
        title: editingEmpleado ? "Empleado actualizado" : "Empleado creado",
        description: `El empleado ha sido ${editingEmpleado ? 'actualizado' : 'creado'} exitosamente.`,
      });

      onSubmit(dataToSubmit);
    } catch (error) {
      toast({
        title: "Error",
        description: `No se pudo ${editingEmpleado ? 'actualizar' : 'crear'} el empleado`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-bold text-gray-100">
            {editingEmpleado ? 'Editar Empleado' : 'Nuevo Empleado'}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel} className="text-gray-400 hover:text-gray-200">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombre" className="text-gray-200">Nombre *</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => handleChange('nombre', e.target.value)}
                  required
                  className="bg-gray-700 border-gray-600 text-gray-100"
                />
              </div>

              <div>
                <Label htmlFor="apellido" className="text-gray-200">Apellido *</Label>
                <Input
                  id="apellido"
                  value={formData.apellido}
                  onChange={(e) => handleChange('apellido', e.target.value)}
                  required
                  className="bg-gray-700 border-gray-600 text-gray-100"
                />
              </div>

              <div>
                <Label htmlFor="puesto" className="text-gray-200">Puesto *</Label>
                <Input
                  id="puesto"
                  value={formData.puesto}
                  onChange={(e) => handleChange('puesto', e.target.value)}
                  required
                  placeholder="Ej: Joyero Senior, Vendedor..."
                  className="bg-gray-700 border-gray-600 text-gray-100"
                />
              </div>

              <div>
                <Label htmlFor="telefono" className="text-gray-200">Teléfono</Label>
                <Input
                  id="telefono"
                  value={formData.telefono}
                  onChange={(e) => handleChange('telefono', e.target.value)}
                  placeholder="+1 234-567-8900"
                  className="bg-gray-700 border-gray-600 text-gray-100"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-200">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="empleado@joyeriakarina.com"
                  className="bg-gray-700 border-gray-600 text-gray-100"
                />
              </div>

              <div>
                <Label htmlFor="fecha_ingreso" className="text-gray-200">Fecha de Ingreso</Label>
                <Input
                  id="fecha_ingreso"
                  type="date"
                  value={formData.fecha_ingreso}
                  onChange={(e) => handleChange('fecha_ingreso', e.target.value)}
                  className="bg-gray-700 border-gray-600 text-gray-100"
                />
              </div>

              <div>
                <Label htmlFor="salario" className="text-gray-200">Salario</Label>
                <Input
                  id="salario"
                  type="number"
                  step="0.01"
                  value={formData.salario}
                  onChange={(e) => handleChange('salario', e.target.value)}
                  placeholder="2500.00"
                  className="bg-gray-700 border-gray-600 text-gray-100"
                />
              </div>

              <div>
                <Label htmlFor="estado" className="text-gray-200">Estado</Label>
                <Select value={formData.estado} onValueChange={(value) => handleChange('estado', value)}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="Activo">Activo</SelectItem>
                    <SelectItem value="Inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="direccion" className="text-gray-200">Dirección</Label>
              <Input
                id="direccion"
                value={formData.direccion}
                onChange={(e) => handleChange('direccion', e.target.value)}
                placeholder="Av. Principal 123, Ciudad"
                className="bg-gray-700 border-gray-600 text-gray-100"
              />
            </div>

            <div>
              <Label htmlFor="especialidad" className="text-gray-200">Especialidad</Label>
              <Textarea
                id="especialidad"
                value={formData.especialidad}
                onChange={(e) => handleChange('especialidad', e.target.value)}
                placeholder="Describe las especialidades del empleado..."
                className="bg-gray-700 border-gray-600 text-gray-100"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={loading} className="flex-1 bg-purple-600 hover:bg-purple-700">
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Guardando...' : (editingEmpleado ? 'Actualizar' : 'Crear')} Empleado
              </Button>
              <Button type="button" variant="outline" onClick={onCancel} className="border-gray-600 text-gray-300 hover:bg-gray-700">
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmpleadoForm;
