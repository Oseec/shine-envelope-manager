
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface SobreFormProps {
  onSubmit: (sobre: any) => void;
  onCancel: () => void;
  editingSobre?: any;
}

const SobreForm: React.FC<SobreFormProps> = ({ onSubmit, onCancel, editingSobre }) => {
  const [formData, setFormData] = useState({
    idUbicacion: '',
    idArticulo: '',
    idTiposReparacion: '',
    precioTotal: '',
    tipoReparacion: '',
    idEstado: '1',
    fechaIngreso: new Date(),
    fechaEntrega: undefined as Date | undefined,
    idCliente: '',
    abono: '',
    saldoPendiente: '',
    tipo: 'reparacion',
    fechaLimiteEntrega: undefined as Date | undefined,
    idTipoLetra: '',
    descripcionDelGrabado: '',
    entregara: '',
    createdBy: '1',
    updatedBy: '1'
  });

  const estados = [
    { id: '1', nombre: 'Pendiente' },
    { id: '2', nombre: 'En Proceso' },
    { id: '3', nombre: 'Completado' },
    { id: '4', nombre: 'Entregado' }
  ];

  const tiposReparacion = [
    { id: '1', nombre: 'Soldadura' },
    { id: '2', nombre: 'Pulido' },
    { id: '3', nombre: 'Grabado' },
    { id: '4', nombre: 'Engaste' },
    { id: '5', nombre: 'Restauración' }
  ];

  const clientes = [
    { id: '1', nombre: 'María González' },
    { id: '2', nombre: 'Juan Pérez' },
    { id: '3', nombre: 'Ana Rodríguez' },
    { id: '4', nombre: 'Carlos Martínez' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">💎</span>
          {editingSobre ? 'Editar Sobre' : 'Nuevo Sobre'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cliente */}
            <div className="space-y-2">
              <Label htmlFor="cliente">Cliente *</Label>
              <Select value={formData.idCliente} onValueChange={(value) => handleInputChange('idCliente', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clientes.map((cliente) => (
                    <SelectItem key={cliente.id} value={cliente.id}>
                      {cliente.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tipo */}
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Servicio *</Label>
              <Select value={formData.tipo} onValueChange={(value) => handleInputChange('tipo', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reparacion">Reparación</SelectItem>
                  <SelectItem value="grabado">Grabado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tipo de Reparación */}
            <div className="space-y-2">
              <Label htmlFor="tipoReparacion">Tipo de Reparación *</Label>
              <Select value={formData.idTiposReparacion} onValueChange={(value) => handleInputChange('idTiposReparacion', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo de reparación" />
                </SelectTrigger>
                <SelectContent>
                  {tiposReparacion.map((tipo) => (
                    <SelectItem key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Estado */}
            <div className="space-y-2">
              <Label htmlFor="estado">Estado *</Label>
              <Select value={formData.idEstado} onValueChange={(value) => handleInputChange('idEstado', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  {estados.map((estado) => (
                    <SelectItem key={estado.id} value={estado.id}>
                      {estado.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Precio Total */}
            <div className="space-y-2">
              <Label htmlFor="precioTotal">Precio Total *</Label>
              <Input
                id="precioTotal"
                type="number"
                step="0.01"
                value={formData.precioTotal}
                onChange={(e) => handleInputChange('precioTotal', e.target.value)}
                placeholder="0.00"
                required
              />
            </div>

            {/* Abono */}
            <div className="space-y-2">
              <Label htmlFor="abono">Abono</Label>
              <Input
                id="abono"
                type="number"
                step="0.01"
                value={formData.abono}
                onChange={(e) => handleInputChange('abono', e.target.value)}
                placeholder="0.00"
              />
            </div>

            {/* Fecha de Ingreso */}
            <div className="space-y-2">
              <Label>Fecha de Ingreso *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.fechaIngreso && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.fechaIngreso ? format(formData.fechaIngreso, "PPP") : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.fechaIngreso}
                    onSelect={(date) => handleInputChange('fechaIngreso', date)}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Fecha Límite de Entrega */}
            <div className="space-y-2">
              <Label>Fecha Límite de Entrega</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.fechaLimiteEntrega && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.fechaLimiteEntrega ? format(formData.fechaLimiteEntrega, "PPP") : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.fechaLimiteEntrega}
                    onSelect={(date) => handleInputChange('fechaLimiteEntrega', date)}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Descripción del Grabado */}
          {formData.tipo === 'grabado' && (
            <div className="space-y-2">
              <Label htmlFor="descripcionGrabado">Descripción del Grabado</Label>
              <Textarea
                id="descripcionGrabado"
                value={formData.descripcionDelGrabado}
                onChange={(e) => handleInputChange('descripcionDelGrabado', e.target.value)}
                placeholder="Describa los detalles del grabado..."
                rows={3}
              />
            </div>
          )}

          {/* Persona que entregará */}
          <div className="space-y-2">
            <Label htmlFor="entregara">Persona que entregará</Label>
            <Input
              id="entregara"
              value={formData.entregara}
              onChange={(e) => handleInputChange('entregara', e.target.value)}
              placeholder="Nombre de quien entregará el trabajo"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary-600">
              {editingSobre ? 'Actualizar' : 'Crear'} Sobre
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SobreForm;
