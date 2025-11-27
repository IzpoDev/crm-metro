import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent, FooterComponent } from '../../../../shared';
import { ClienteService } from '../../services/cliente.service';
import { Cliente, NotificacionOferta } from '../../models/cliente.model';

interface PlantillaOferta {
  asunto: string;
  cuerpo: string;
}

@Component({
  selector: 'app-notificar-oferta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './notificar-oferta.component.html',
  styleUrls: ['./notificar-oferta.component.css']
})
export class NotificarOfertaComponent {
  buscarForm: FormGroup;
  notificarForm: FormGroup;
  clienteSeleccionado: Cliente | null = null;
  clientesEncontrados: Cliente[] = [];
  showListaClientes: boolean = false;
  showAdvertencia: boolean = false;
  mensajeAdvertencia: string = '';
  showError: boolean = false;
  errorMessage: string = '';
  historialNotificaciones: NotificacionOferta[] = [];
  showHistorial: boolean = false;

  plantillas: { [key: string]: PlantillaOferta } = {
    descuento: {
      asunto: '¡20% de descuento especial para ti!',
      cuerpo: 'Estimado cliente,\n\nTenemos una oferta exclusiva para ti: ¡20% de descuento en toda tu compra!\n\nVálido hasta fin de mes. No dejes pasar esta oportunidad.\n\n¡Te esperamos en Metro!'
    },
    '2x1': {
      asunto: 'Promoción 2x1 en productos seleccionados',
      cuerpo: 'Hola,\n\n¡Aprovecha nuestra promoción 2x1 en productos seleccionados!\n\nLleva dos y paga uno en categorías participantes.\n\nVisítanos y descubre todas las ofertas.\n\nSaludos,\nEquipo Metro'
    },
    envio: {
      asunto: 'Envío gratis en tu próxima compra',
      cuerpo: 'Estimado cliente,\n\nDisfruta de envío gratis en tu próxima compra online.\n\nSin monto mínimo. Válido por tiempo limitado.\n\n¡Compra ahora en metro.com.pe!\n\nAtentamente,\nMetro'
    }
  };

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService
  ) {
    this.buscarForm = this.fb.group({
      buscarCliente: ['', Validators.required]
    });

    this.notificarForm = this.fb.group({
      medioContacto: ['', Validators.required],
      tipoOferta: [''],
      asuntoMensaje: ['', Validators.required],
      cuerpoMensaje: ['', Validators.required]
    });

    this.notificarForm.get('medioContacto')?.valueChanges.subscribe(() => {
      this.verificarPreferencias();
    });
  }

  onBuscarCliente(): void {
    const termino = this.buscarForm.value.buscarCliente;
    if (!termino) return;

    this.clientesEncontrados = this.clienteService.buscarClientes(termino);
    this.showListaClientes = this.clientesEncontrados.length > 0;
  }

  seleccionarCliente(cliente: Cliente): void {
    this.clienteSeleccionado = cliente;
    this.showListaClientes = false;
    this.verificarPreferencias();
  }

  verificarPreferencias(): void {
    if (!this.clienteSeleccionado) return;

    const medio = this.notificarForm.value.medioContacto;
    
    if (!this.clienteSeleccionado.aceptaPromociones) {
      this.showAdvertencia = true;
      this.mensajeAdvertencia = 'El cliente no ha autorizado recibir promociones. El envío puede estar restringido.';
    } else if (medio && medio !== this.clienteSeleccionado.contactoPrincipal) {
      this.showAdvertencia = true;
      this.mensajeAdvertencia = 'El medio seleccionado no es el preferido por el cliente. Se recomienda usar su medio principal.';
    } else {
      this.showAdvertencia = false;
    }
  }

  cargarPlantilla(tipo: string): void {
    const plantilla = this.plantillas[tipo];
    if (plantilla) {
      this.notificarForm.patchValue({
        asuntoMensaje: plantilla.asunto,
        cuerpoMensaje: plantilla.cuerpo
      });
    }
  }

  onEnviarNotificacion(): void {
    if (this.notificarForm.invalid || !this.clienteSeleccionado) {
      this.mostrarError('Por favor, complete todos los campos requeridos');
      return;
    }

    const formValue = this.notificarForm.value;
    const notificacion: NotificacionOferta = {
      clienteDni: this.clienteSeleccionado.dni,
      clienteNombre: `${this.clienteSeleccionado.nombres} ${this.clienteSeleccionado.apellidos}`,
      medioContacto: formValue.medioContacto,
      tipoOferta: formValue.tipoOferta || 'General',
      asunto: formValue.asuntoMensaje,
      mensaje: formValue.cuerpoMensaje,
      fechaEnvio: new Date().toLocaleDateString('es-PE'),
      estado: 'enviado'
    };

    this.clienteService.registrarNotificacion(notificacion);
    
    alert(`✓ Notificación enviada correctamente\n\nCliente: ${notificacion.clienteNombre}\nMedio: ${notificacion.medioContacto}\nAsunto: ${notificacion.asunto}`);
    
    this.cargarHistorial();
    this.cancelar();
  }

  cancelar(): void {
    this.clienteSeleccionado = null;
    this.buscarForm.reset();
    this.notificarForm.reset();
    this.showListaClientes = false;
    this.showAdvertencia = false;
    this.showError = false;
  }

  cargarHistorial(): void {
    this.historialNotificaciones = this.clienteService.obtenerHistorialNotificaciones();
    this.showHistorial = this.historialNotificaciones.length > 0;
  }

  private mostrarError(mensaje: string): void {
    this.errorMessage = mensaje;
    this.showError = true;
  }
}
