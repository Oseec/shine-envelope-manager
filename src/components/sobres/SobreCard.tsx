
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Calendar, User, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

interface Sobre {
  id: string;
  cliente: string;
  tipo: string;
  tipoReparacion: string;
  estado: string;
  precioTotal: number;
  abono: number;
  fechaIngreso: Date;
  fechaLimiteEntrega?: Date;
  descripcionDelGrabado?: string;
}

interface SobreCardProps {
  sobre: Sobre;
  onEdit: (sobre: Sobre) => void;
  onView: (sobre: Sobre) => void;
}

const SobreCard: React.FC<SobreCardProps> = ({ sobre, onEdit, onView }) => {
  const getEstadoColor = (estado: string) => {
    switch (estado.toLowerCase()) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'en proceso':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completado':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'entregado':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTipoIcon = (tipo: string) => {
    return tipo === 'grabado' ? '✍️' : '🔧';
  };

  const saldoPendiente = sobre.precioTotal - sobre.abono;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getTipoIcon(sobre.tipo)}</span>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">#{sobre.id}</h3>
              <p className="text-sm text-gray-600">{sobre.tipoReparacion}</p>
            </div>
          </div>
          <Badge className={`${getEstadoColor(sobre.estado)} border`}>
            {sobre.estado}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            <span className="text-gray-600">Cliente:</span>
          </div>
          <span className="font-medium">{sobre.cliente}</span>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-gray-600">Ingreso:</span>
          </div>
          <span>{format(sobre.fechaIngreso, 'dd/MM/yyyy')}</span>
          
          {sobre.fechaLimiteEntrega && (
            <>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-orange-500" />
                <span className="text-gray-600">Entrega:</span>
              </div>
              <span className="text-orange-600 font-medium">
                {format(sobre.fechaLimiteEntrega, 'dd/MM/yyyy')}
              </span>
            </>
          )}
          
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="text-gray-600">Total:</span>
          </div>
          <span className="font-semibold text-green-600">${sobre.precioTotal.toFixed(2)}</span>
        </div>

        {sobre.abono > 0 && (
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="flex justify-between text-sm">
              <span className="text-green-700">Abono:</span>
              <span className="font-medium text-green-800">${sobre.abono.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-red-700">Saldo pendiente:</span>
              <span className="font-medium text-red-800">${saldoPendiente.toFixed(2)}</span>
            </div>
          </div>
        )}

        {sobre.descripcionDelGrabado && (
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Grabado:</strong> {sobre.descripcionDelGrabado}
            </p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(sobre)}
            className="flex-1"
          >
            Ver Detalles
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(sobre)}
            className="flex items-center gap-1"
          >
            <Edit className="h-4 w-4" />
            Editar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SobreCard;
