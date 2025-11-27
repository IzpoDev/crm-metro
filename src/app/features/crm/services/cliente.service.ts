import { Injectable } from '@angular/core';
import { Cliente, NotificacionOferta } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private clientesDB: Map<string, Cliente> = new Map();
  private historialNotificaciones: NotificacionOferta[] = [];

  constructor() {
    this.inicializarDatosEjemplo();
  }

  private inicializarDatosEjemplo(): void {
    const clientesEjemplo: Cliente[] = [
      {
        codigo: 'CLI-001',
        dni: '12345678',
        nombres: 'Juan Carlos',
        apellidos: 'Pérez García',
        direccion: 'Av. Javier Prado 123, San Isidro',
        telefono: '987654321',
        correo: 'juan.perez@email.com',
        contactoPrincipal: 'correo',
        aceptaPromociones: true,
        aceptaNotificaciones: true,
        estado: 'activo',
        fechaRegistro: '15/03/2024',
        usuarioRegistro: 'CAJ-001'
      },
      {
        codigo: 'CLI-002',
        dni: '87654321',
        nombres: 'María Elena',
        apellidos: 'González López',
        direccion: 'Calle Los Olivos 456, Miraflores',
        telefono: '912345678',
        correo: 'maria.gonzalez@email.com',
        contactoPrincipal: 'whatsapp',
        aceptaPromociones: false,
        aceptaNotificaciones: true,
        estado: 'activo',
        fechaRegistro: '22/05/2024',
        usuarioRegistro: 'CAJ-002'
      },
      {
        codigo: 'CLI-003',
        dni: '11223344',
        nombres: 'Carlos Alberto',
        apellidos: 'Rodríguez Sánchez',
        direccion: 'Av. La Molina 789, La Molina',
        telefono: '998877665',
        correo: 'carlos.rodriguez@email.com',
        contactoPrincipal: 'telefono',
        aceptaPromociones: true,
        aceptaNotificaciones: false,
        estado: 'activo',
        fechaRegistro: '10/01/2024',
        usuarioRegistro: 'EJE-001'
      }
    ];

    clientesEjemplo.forEach(cliente => {
      this.clientesDB.set(cliente.dni, cliente);
    });
  }

  afiliarCliente(cliente: Cliente): { success: boolean; mensaje: string; codigo?: string } {
    if (this.clientesDB.has(cliente.dni)) {
      return {
        success: false,
        mensaje: 'El cliente con ese DNI ya está registrado en el sistema'
      };
    }

    const codigo = `CLI-${String(this.clientesDB.size + 1).padStart(3, '0')}`;
    const fechaActual = new Date().toLocaleDateString('es-PE');

    const nuevoCliente: Cliente = {
      ...cliente,
      codigo,
      estado: 'activo',
      fechaRegistro: fechaActual,
      usuarioRegistro: 'CAJ-001'
    };

    this.clientesDB.set(cliente.dni, nuevoCliente);

    return {
      success: true,
      mensaje: 'Cliente afiliado correctamente',
      codigo
    };
  }

  buscarCliente(criterio: 'dni' | 'nombre' | 'telefono', valor: string): Cliente | null {
    const valorLower = valor.toLowerCase();

    for (const [dni, cliente] of this.clientesDB.entries()) {
      if (criterio === 'dni' && dni === valor) {
        return cliente;
      } else if (criterio === 'nombre') {
        const nombreCompleto = `${cliente.nombres} ${cliente.apellidos}`.toLowerCase();
        if (nombreCompleto.includes(valorLower)) {
          return cliente;
        }
      } else if (criterio === 'telefono' && cliente.telefono === valor) {
        return cliente;
      }
    }

    return null;
  }

  buscarClientes(termino: string): Cliente[] {
    const terminoLower = termino.toLowerCase();
    const resultados: Cliente[] = [];

    for (const cliente of this.clientesDB.values()) {
      const nombreCompleto = `${cliente.nombres} ${cliente.apellidos}`.toLowerCase();
      if (
        cliente.dni.includes(termino) ||
        nombreCompleto.includes(terminoLower) ||
        cliente.telefono.includes(termino)
      ) {
        resultados.push(cliente);
      }
    }

    return resultados;
  }

  actualizarCliente(dni: string, datosActualizados: Partial<Cliente>): boolean {
    const cliente = this.clientesDB.get(dni);
    if (!cliente) {
      return false;
    }

    const clienteActualizado = {
      ...cliente,
      ...datosActualizados,
      dni: cliente.dni, // El DNI no puede cambiar
      codigo: cliente.codigo, // El código no puede cambiar
    };

    this.clientesDB.set(dni, clienteActualizado);
    return true;
  }

  registrarNotificacion(notificacion: NotificacionOferta): void {
    const id = this.historialNotificaciones.length + 1;
    this.historialNotificaciones.push({ ...notificacion, id });
  }

  obtenerHistorialNotificaciones(): NotificacionOferta[] {
    return [...this.historialNotificaciones];
  }

  obtenerTodosClientes(): Cliente[] {
    return Array.from(this.clientesDB.values());
  }
}
