
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, X } from 'lucide-react';

interface EmpleadoFormProps {
  onSubmit: (empleadoData: any) => void;
  onCancel: () => void;
  editingEmpleado?: any;
}

const EmpleadoForm: React.FC<EmpleadoFormProps> = ({ onSubmit, onCancel, editingEmpleado }) => {
  const [formData, setFormData] = useState({
    nombre: editingEmpleado?.nombre || '',
    apellido: editingEmpleado?.apellido || '',
    puesto: editingEmpleado?.puesto || '',
    telefono: editingEmpleado?.telefono || '',
    email: editingEmpleado?.email || '',
    direccion: editingEmpleado?.direccion || '',
    salario: editingEmpleado?.salario || '',
    especialidad: editingEmpleado?.especialidad || '',
    estado: editingEmpleado?.estado || 'Activo'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto px-2 md:px-0">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4 md:p-6">
          <div className="flex items-center gap-3">
            <Button
              onClick={onCancel}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 p-1 md:p-2"
            >
              <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <div>
              <h2 className="text-xl md:text-2xl font-bold">
                {editingEmpleado ? 'Editar Empleado' : 'Nuevo Empleado'}
              </h2>
              <p className="text-primary-100 mt-1 text-sm md:text-base">
                {editingEmpleado 
                  ? `Modificando datos de ${editingEmpleado.nombre} ${editingEmpleado.apellido}` 
                  : 'Registra un nuevo miembro del equipo'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
          {/* Información Personal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Personal</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nombre">Nombre *</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    placeholder="Nombre del empleado"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="apellido">Apellido *</Label>
                  <Input
                    id="apellido"
                    value={formData.apellido}
                    onChange={(e) => handleInputChange('apellido', e.target.value)}
                    placeholder="Apellido del empleado"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="telefono">Teléfono *</Label>
                  <Input
                    id="telefono"
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => handleInputChange('telefono', e.target.value)}
                    placeholder="+1 234-567-8900"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="empleado@joyeriakarina.com"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Laboral</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="puesto">Puesto *</Label>
                  <Select value={formData.puesto} onValueChange={(value) => handleInputChange('puesto', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el puesto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Joyero Senior">Joyero Senior</SelectItem>
                      <SelectItem value="Joyero Junior">Joyero Junior</SelectItem>
                      <SelectItem value="Grabador">Grabador</SelectItem>
                      <SelectItem value="Vendedor">Vendedor</SelectItem>
                      <SelectItem value="Cajero">Cajero</SelectItem>
                      <SelectItem value="Supervisor">Supervisor</SelectItem>
                      <SelectItem value="Gerente">Gerente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="salario">Salario Mensual *</Label>
                  <Input
                    id="salario"
                    type="number"
                    step="0.01"
                    value={formData.salario}
                    onChange={(e) => handleInputChange('salario', e.target.value)}
                    placeholder="2500.00"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="especialidad">Especialidad</Label>
                  <Input
                    id="especialidad"
                    value={formData.especialidad}
                    onChange={(e) => handleInputChange('especialidad', e.target.value)}
                    placeholder="Ej: Soldadura y reparaciones"
                  />
                </div>

                <div>
                  <Label htmlFor="estado">Estado</Label>
                  <Select value={formData.estado} onValueChange={(value) => handleInputChange('estado', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Activo">Activo</SelectItem>
                      <SelectItem value="Inactivo">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Dirección */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dirección</h3>
            <div>
              <Label htmlFor="direccion">Dirección completa</Label>
              <Input
                id="direccion"
                value={formData.direccion}
                onChange={(e) => handleInputChange('direccion', e.target.value)}
                placeholder="Av. Principal 123, Colonia, Ciudad, CP"
              />
            </div>
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex items-center gap-2 sm:flex-1"
            >
              <X className="h-4 w-4" />
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary-600 flex items-center gap-2 sm:flex-1"
            >
              <Save className="h-4 w-4" />
              {editingEmpleado ? 'Actualizar Empleado' : 'Registrar Empleado'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmpleadoForm;
