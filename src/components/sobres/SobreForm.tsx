
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

interface SobreFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  editingSobre?: any;
}

const SobreForm: React.FC<SobreFormProps> = ({ onSubmit, onCancel, editingSobre }) => {
  const [formData, setFormData] = useState({
    cliente: '',
    tipo: 'reparacion',
    tipo_reparacion: '',
    descripcion_grabado: '',
    estado: 'Pendiente',
    precio_total: '',
    abono: '',
    fecha_limite_entrega: '',
    notas: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (editingSobre) {
      setFormData({
        cliente: editingSobre.cliente || '',
        tipo: editingSobre.tipo || 'reparacion',
        tipo_reparacion: editingSobre.tipo_reparacion || '',
        descripcion_grabado: editingSobre.descripcion_grabado || '',
        estado: editingSobre.estado || 'Pendiente',
        precio_total: editingSobre.precio_total?.toString() || '',
        abono: editingSobre.abono?.toString() || '',
        fecha_limite_entrega: editingSobre.fecha_limite_entrega ? 
          new Date(editingSobre.fecha_limite_entrega).toISOString().split('T')[0] : '',
        notas: editingSobre.notas || ''
      });
    }
  }, [editingSobre]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSubmit = {
        ...formData,
        precio_total: parseFloat(formData.precio_total) || 0,
        abono: parseFloat(formData.abono) || 0,
        fecha_limite_entrega: formData.fecha_limite_entrega || null
      };

      if (editingSobre) {
        const { error } = await supabase
          .from('sobres')
          .update(dataToSubmit)
          .eq('id', editingSobre.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('sobres')
          .insert([dataToSubmit]);

        if (error) throw error;
      }

      toast({
        title: editingSobre ? "Sobre actualizado" : "Sobre creado",
        description: `El sobre ha sido ${editingSobre ? 'actualizado' : 'creado'} exitosamente.`,
      });

      onSubmit(dataToSubmit);
    } catch (error) {
      toast({
        title: "Error",
        description: `No se pudo ${editingSobre ? 'actualizar' : 'crear'} el sobre`,
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
            {editingSobre ? 'Editar Sobre' : 'Nuevo Sobre'}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel} className="text-gray-400 hover:text-gray-200">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cliente" className="text-gray-200">Cliente *</Label>
                <Input
                  id="cliente"
                  value={formData.cliente}
                  onChange={(e) => handleChange('cliente', e.target.value)}
                  required
                  className="bg-gray-700 border-gray-600 text-gray-100"
                />
              </div>

              <div>
                <Label htmlFor="tipo" className="text-gray-200">Tipo *</Label>
                <Select value={formData.tipo} onValueChange={(value) => handleChange('tipo', value)}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="reparacion">Reparación</SelectItem>
                    <SelectItem value="grabado">Grabado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.tipo === 'reparacion' && (
                <div>
                  <Label htmlFor="tipo_reparacion" className="text-gray-200">Tipo de Reparación</Label>
                  <Input
                    id="tipo_reparacion"
                    value={formData.tipo_reparacion}
                    onChange={(e) => handleChange('tipo_reparacion', e.target.value)}
                    placeholder="Ej: Soldadura, Pulido, Engaste..."
                    className="bg-gray-700 border-gray-600 text-gray-100"
                  />
                </div>
              )}

              {formData.tipo === 'grabado' && (
                <div>
                  <Label htmlFor="descripcion_grabado" className="text-gray-200">Descripción del Grabado</Label>
                  <Input
                    id="descripcion_grabado"
                    value={formData.descripcion_grabado}
                    onChange={(e) => handleChange('descripcion_grabado', e.target.value)}
                    placeholder="Describe el grabado..."
                    className="bg-gray-700 border-gray-600 text-gray-100"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="estado" className="text-gray-200">Estado</Label>
                <Select value={formData.estado} onValueChange={(value) => handleChange('estado', value)}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="En Proceso">En Proceso</SelectItem>
                    <SelectItem value="Completado">Completado</SelectItem>
                    <SelectItem value="Entregado">Entregado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="precio_total" className="text-gray-200">Precio Total *</Label>
                <Input
                  id="precio_total"
                  type="number"
                  step="0.01"
                  value={formData.precio_total}
                  onChange={(e) => handleChange('precio_total', e.target.value)}
                  required
                  className="bg-gray-700 border-gray-600 text-gray-100"
                />
              </div>

              <div>
                <Label htmlFor="abono" className="text-gray-200">Abono</Label>
                <Input
                  id="abono"
                  type="number"
                  step="0.01"
                  value={formData.abono}
                  onChange={(e) => handleChange('abono', e.target.value)}
                  className="bg-gray-700 border-gray-600 text-gray-100"
                />
              </div>

              <div>
                <Label htmlFor="fecha_limite_entrega" className="text-gray-200">Fecha Límite de Entrega</Label>
                <Input
                  id="fecha_limite_entrega"
                  type="date"
                  value={formData.fecha_limite_entrega}
                  onChange={(e) => handleChange('fecha_limite_entrega', e.target.value)}
                  className="bg-gray-700 border-gray-600 text-gray-100"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notas" className="text-gray-200">Notas Adicionales</Label>
              <Textarea
                id="notas"
                value={formData.notas}
                onChange={(e) => handleChange('notas', e.target.value)}
                placeholder="Notas adicionales sobre el trabajo..."
                className="bg-gray-700 border-gray-600 text-gray-100"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={loading} className="flex-1 bg-purple-600 hover:bg-purple-700">
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Guardando...' : (editingSobre ? 'Actualizar' : 'Crear')} Sobre
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

export default SobreForm;
