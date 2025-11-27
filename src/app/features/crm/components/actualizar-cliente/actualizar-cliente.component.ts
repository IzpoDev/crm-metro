import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent, FooterComponent } from '../../../../shared';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-actualizar-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './actualizar-cliente.component.html',
  styleUrls: ['./actualizar-cliente.component.css']
})
export class ActualizarClienteComponent {
  buscarForm: FormGroup;
  actualizarForm: FormGroup;
  clienteEncontrado: Cliente | null = null;
  showErrorBusqueda: boolean = false;
  showErrorValidacion: boolean = false;
  errorValidacionMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService
  ) {
    this.buscarForm = this.fb.group({
      criterio: ['dni'],
      valorBusqueda: ['', Validators.required]
    });

    this.actualizarForm = this.fb.group({
      dni: [{ value: '', disabled: true }],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contactoPrincipal: ['', Validators.required],
      estado: ['', Validators.required],
      aceptaPromociones: [false],
      aceptaNotificaciones: [false]
    });
  }

  onBuscar(): void {
    if (this.buscarForm.invalid) {
      return;
    }

    const criterio = this.buscarForm.value.criterio as 'dni' | 'nombre' | 'telefono';
    const valor = this.buscarForm.value.valorBusqueda;

    const cliente = this.clienteService.buscarCliente(criterio, valor);

    if (cliente) {
      this.clienteEncontrado = cliente;
      this.showErrorBusqueda = false;
      this.actualizarForm.patchValue(cliente);
    } else {
      this.clienteEncontrado = null;
      this.showErrorBusqueda = true;
    }
  }

  onActualizar(): void {
    if (this.actualizarForm.invalid || !this.clienteEncontrado) {
      this.mostrarErrorValidacion('Por favor, complete todos los campos obligatorios correctamente');
      return;
    }

    const datosActualizados = this.actualizarForm.getRawValue();
    const exito = this.clienteService.actualizarCliente(
      this.clienteEncontrado.dni,
      datosActualizados
    );

    if (exito) {
      alert(`✓ Datos del cliente actualizados correctamente\n\nCódigo: ${this.clienteEncontrado.codigo}\nNombre: ${datosActualizados.nombres} ${datosActualizados.apellidos}`);
      this.cancelar();
    } else {
      this.mostrarErrorValidacion('Error al actualizar los datos del cliente');
    }
  }

  cancelar(): void {
    this.clienteEncontrado = null;
    this.buscarForm.reset({ criterio: 'dni' });
    this.actualizarForm.reset();
    this.showErrorBusqueda = false;
    this.showErrorValidacion = false;
  }

  private mostrarErrorValidacion(mensaje: string): void {
    this.errorValidacionMessage = mensaje;
    this.showErrorValidacion = true;
  }
}
