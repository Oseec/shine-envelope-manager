
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
  precio_total: number;
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
        return 'bg-yellow-900/50 text-yellow-300 border-yellow-600/50';
      case 'en proceso':
        return 'bg-blue-900/50 text-blue-300 border-blue-600/50';
      case 'completado':
        return 'bg-green-900/50 text-green-300 border-green-600/50';
      case 'entregado':
        return 'bg-gray-700 text-gray-300 border-gray-600';
      default:
        return 'bg-gray-700 text-gray-300 border-gray-600';
    }
  };

  const getTipoIcon = (tipo: string) => {
    return tipo === 'grabado' ? '✍️' : '🔧';
  };

  const saldoPendiente = sobre.precio_total - sobre.abono;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border border-gray-700 bg-gray-800">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getTipoIcon(sobre.tipo)}</span>
            <div>
              <h3 className="font-semibold text-lg text-gray-100">#{sobre.id.slice(0, 8)}</h3>
              <p className="text-sm text-gray-400">{sobre.tipoReparacion}</p>
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
            <User className="h-4 w-4 text-purple-400" />
            <span className="text-gray-400">Cliente:</span>
          </div>
          <span className="font-medium text-gray-200">{sobre.cliente}</span>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-purple-400" />
            <span className="text-gray-400">Ingreso:</span>
          </div>
          <span className="text-gray-200">{format(sobre.fechaIngreso, 'dd/MM/yyyy')}</span>
          
          {sobre.fechaLimiteEntrega && (
            <>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-orange-500" />
                <span className="text-gray-400">Entrega:</span>
              </div>
              <span className="text-orange-400 font-medium">
                {format(sobre.fechaLimiteEntrega, 'dd/MM/yyyy')}
              </span>
            </>
          )}
          
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-400" />
            <span className="text-gray-400">Total:</span>
          </div>
          <span className="font-semibold text-green-400">${sobre.precio_total.toFixed(2)}</span>
        </div>

        {sobre.abono > 0 && (
          <div className="bg-green-900/30 p-3 rounded-lg border border-green-600/50">
            <div className="flex justify-between text-sm">
              <span className="text-green-400">Abono:</span>
              <span className="font-medium text-green-300">${sobre.abono.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-red-400">Saldo pendiente:</span>
              <span className="font-medium text-red-300">${saldoPendiente.toFixed(2)}</span>
            </div>
          </div>
        )}

        {sobre.descripcionDelGrabado && (
          <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-600/50">
            <p className="text-sm text-blue-300">
              <strong>Grabado:</strong> {sobre.descripcionDelGrabado}
            </p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(sobre)}
            className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Ver Detalles
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(sobre)}
            className="flex items-center gap-1 border-gray-600 text-gray-300 hover:bg-gray-700"
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
