import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginCredentials } from '../../../../core/models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  showError: boolean = false;
  returnUrl: string = '/';

  roles = [
    { value: 'Cajero', label: 'Cajero' },
    { value: 'Ejecutivo', label: 'Ejecutivo' },
    { value: 'Supervisor', label: 'Supervisor' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Administrador', label: 'Administrador' }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Si ya está autenticado, redirigir al home
    if (this.authService.currentUserValue) {
      this.router.navigate(['/home']);
    }

    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      rol: ['', Validators.required]
    });

    // Obtener la URL de retorno desde los parámetros de consulta
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.mostrarError('Por favor, complete todos los campos');
      return;
    }

    const credentials: LoginCredentials = this.loginForm.value;
    const resultado = this.authService.login(credentials);

    if (resultado.success) {
      // Login exitoso, redirigir
      this.router.navigate([this.returnUrl]);
    } else {
      // Mostrar error
      this.mostrarError(resultado.message);
    }
  }

  private mostrarError(mensaje: string): void {
    this.errorMessage = mensaje;
    this.showError = true;
    
    // Ocultar el error después de 5 segundos
    setTimeout(() => {
      this.showError = false;
    }, 5000);
  }
}
