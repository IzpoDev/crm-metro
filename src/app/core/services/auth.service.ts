import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthUser, LoginCredentials } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<AuthUser | null>;
  public currentUser: Observable<AuthUser | null>;
  private platformId = inject(PLATFORM_ID);
  private isBrowser: boolean;

  // Usuarios de ejemplo para el sistema
  private usuarios = [
    { usuario: 'cajero1', contrasena: 'cajero123', rol: 'Cajero', nombre: 'Juan Pérez' },
    { usuario: 'ejecutivo1', contrasena: 'ejecutivo123', rol: 'Ejecutivo', nombre: 'María González' },
    { usuario: 'supervisor1', contrasena: 'supervisor123', rol: 'Supervisor', nombre: 'Carlos Rodríguez' },
    { usuario: 'marketing1', contrasena: 'marketing123', rol: 'Marketing', nombre: 'Ana Torres' },
    { usuario: 'admin', contrasena: 'admin123', rol: 'Administrador', nombre: 'Admin Metro' }
  ];

  constructor(private router: Router) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    // Solo acceder a localStorage si estamos en el navegador
    let storedUser: AuthUser | null = null;
    if (this.isBrowser) {
      const storedUserString = localStorage.getItem('currentUser');
      if (storedUserString) {
        storedUser = JSON.parse(storedUserString);
      }
    }
    
    this.currentUserSubject = new BehaviorSubject<AuthUser | null>(storedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthUser | null {
    return this.currentUserSubject.value;
  }

  login(credentials: LoginCredentials): { success: boolean; message: string } {
    // Validar campos vacíos
    if (!credentials.usuario || !credentials.contrasena || !credentials.rol) {
      return {
        success: false,
        message: 'Por favor, complete todos los campos'
      };
    }

    // Buscar usuario
    const usuario = this.usuarios.find(
      u => u.usuario === credentials.usuario &&
           u.contrasena === credentials.contrasena &&
           u.rol === credentials.rol
    );

    if (usuario) {
      // Login exitoso
      const authUser: AuthUser = {
        usuario: usuario.usuario,
        rol: usuario.rol,
        nombre: usuario.nombre
      };

      // Solo guardar en localStorage si estamos en el navegador
      if (this.isBrowser) {
        localStorage.setItem('currentUser', JSON.stringify(authUser));
      }
      this.currentUserSubject.next(authUser);

      return {
        success: true,
        message: 'Login exitoso'
      };
    } else {
      return {
        success: false,
        message: 'Usuario, contraseña o rol incorrecto'
      };
    }
  }

  logout(): void {
    // Solo remover de localStorage si estamos en el navegador
    if (this.isBrowser) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.currentUserValue !== null;
  }
}
