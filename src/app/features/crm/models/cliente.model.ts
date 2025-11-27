export interface Cliente {
  codigo?: string;
  dni: string;
  nombres: string;
  apellidos: string;
  direccion: string;
  telefono: string;
  correo: string;
  contactoPrincipal: 'telefono' | 'correo' | 'whatsapp';
  aceptaPromociones: boolean;
  aceptaNotificaciones: boolean;
  estado?: 'activo' | 'inactivo';
  fechaRegistro?: string;
  usuarioRegistro?: string;
}

export interface NotificacionOferta {
  id?: number;
  clienteDni: string;
  clienteNombre: string;
  medioContacto: 'telefono' | 'correo' | 'whatsapp';
  tipoOferta: string;
  asunto: string;
  mensaje: string;
  fechaEnvio: string;
  estado: 'enviado' | 'pendiente' | 'fallido';
}
