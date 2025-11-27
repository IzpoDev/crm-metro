import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent, FooterComponent } from '../../../../shared';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-afiliar-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './afiliar-cliente.component.html',
  styleUrls: ['./afiliar-cliente.component.css']
})
export class AfiliarClienteComponent {
  afiliarForm: FormGroup;
  errorMessage: string = '';
  showError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService
  ) {
    this.afiliarForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.maxLength(15)]],
      correo: ['', [Validators.required, Validators.email]],
      contactoPrincipal: ['', Validators.required],
      aceptaPromociones: [false],
      aceptaNotificaciones: [false]
    });
  }

  onSubmit(): void {
    if (this.afiliarForm.invalid) {
      this.mostrarError('Por favor, complete todos los campos obligatorios correctamente');
      return;
    }

    const clienteData: Cliente = this.afiliarForm.value;
    const resultado = this.clienteService.afiliarCliente(clienteData);

    if (resultado.success) {
      alert(`✓ Cliente afiliado correctamente\n\nCódigo de Cliente: ${resultado.codigo}\nNombre: ${clienteData.nombres} ${clienteData.apellidos}\nDNI: ${clienteData.dni}`);
      this.afiliarForm.reset();
      this.ocultarError();
    } else {
      this.mostrarError(resultado.mensaje);
    }
  }

  onReset(): void {
    this.afiliarForm.reset();
    this.ocultarError();
  }

  private mostrarError(mensaje: string): void {
    this.errorMessage = mensaje;
    this.showError = true;
  }

  private ocultarError(): void {
    this.showError = false;
    this.errorMessage = '';
  }
}
