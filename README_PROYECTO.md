# Metro CRM - Sistema de Gestión de Clientes

Sistema CRM desarrollado en Angular para la gestión integral de clientes y relaciones comerciales de Supermercados Metro.

## 🚀 Características

- **Afiliación de Clientes**: Registro de nuevos clientes con validación de datos
- **Actualización de Datos**: Modificación de información de clientes existentes
- **Notificación de Ofertas**: Envío de comunicaciones y promociones personalizadas

## 📁 Estructura del Proyecto

```
metro-crm/
├── src/
│   ├── app/
│   │   ├── core/                    # Módulo core
│   │   │   ├── core-module.ts
│   │   │   └── core-routing-module.ts
│   │   ├── features/
│   │   │   └── crm/                 # Módulo CRM
│   │   │       ├── components/
│   │   │       │   ├── home/        # Página principal
│   │   │       │   ├── afiliar-cliente/
│   │   │       │   ├── actualizar-cliente/
│   │   │       │   └── notificar-oferta/
│   │   │       ├── models/          # Interfaces y modelos
│   │   │       │   └── cliente.model.ts
│   │   │       ├── services/        # Servicios
│   │   │       │   └── cliente.service.ts
│   │   │       ├── crm-module.ts
│   │   │       └── crm-routing-module.ts
│   │   ├── shared/                  # Componentes compartidos
│   │   │   ├── components/
│   │   │   │   ├── header/
│   │   │   │   └── footer/
│   │   │   └── shared-module.ts
│   │   ├── app.routes.ts
│   │   └── app.ts
│   ├── styles.css                   # Estilos globales
│   └── index.html
└── README.md
```

## 🛠️ Tecnologías Utilizadas

- **Angular 19** - Framework principal
- **TypeScript** - Lenguaje de programación
- **Reactive Forms** - Manejo de formularios
- **Font Awesome 6.4** - Iconografía
- **CSS Variables** - Tematización

## 📦 Instalación

1. Clonar el repositorio
```bash
git clone <repository-url>
cd metro-crm
```

2. Instalar dependencias
```bash
npm install
```

3. Iniciar el servidor de desarrollo
```bash
npm start
```

4. Abrir el navegador en `http://localhost:4200`

## 🎨 Componentes Principales

### Home Component
Página principal que muestra los tres módulos principales del sistema CRM.

**Ruta**: `/`

### Afiliar Cliente Component
Formulario para registrar nuevos clientes en el sistema.

**Ruta**: `/crm/afiliar`

**Características**:
- Validación de DNI (8 dígitos)
- Validación de email
- Verificación de duplicados
- Preferencias de comunicación

### Actualizar Cliente Component
Búsqueda y actualización de datos de clientes existentes.

**Ruta**: `/crm/actualizar`

**Características**:
- Búsqueda por DNI, nombre o teléfono
- Actualización de información personal
- Cambio de estado (activo/inactivo)
- Trazabilidad de cambios

### Notificar Oferta Component
Envío de comunicaciones y promociones a clientes.

**Ruta**: `/crm/notificar`

**Características**:
- Selección de clientes
- Elección de canal de comunicación
- Plantillas predefinidas
- Verificación de preferencias
- Historial de notificaciones

## 📝 Modelos de Datos

### Cliente
```typescript
interface Cliente {
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
```

### NotificacionOferta
```typescript
interface NotificacionOferta {
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
```

## 🎯 Servicios

### ClienteService
Servicio para la gestión de clientes y notificaciones.

**Métodos principales**:
- `afiliarCliente(cliente: Cliente)` - Registra un nuevo cliente
- `buscarCliente(criterio, valor)` - Busca un cliente específico
- `buscarClientes(termino)` - Busca múltiples clientes
- `actualizarCliente(dni, datos)` - Actualiza información del cliente
- `registrarNotificacion(notificacion)` - Registra una notificación enviada
- `obtenerHistorialNotificaciones()` - Obtiene el historial de notificaciones

## 🎨 Paleta de Colores

- **Primary**: #E31C23 (Rojo Metro)
- **Secondary**: #B71C1C (Rojo oscuro)
- **Metro**: #f5cd08 (Amarillo Metro)
- **Success**: #28a745 (Verde)
- **Background**: #F5F5F5 (Gris claro)

## 📱 Responsive Design

La aplicación es completamente responsive y se adapta a diferentes tamaños de pantalla:
- Desktop (> 768px)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🚀 Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Compila la aplicación para producción
- `npm test` - Ejecuta las pruebas unitarias
- `npm run lint` - Verifica el código con ESLint

## 📄 Licencia

© 2025 Cencosud - Supermercados Metro. Todos los derechos reservados.

## 👥 Contribuidores

Desarrollado para Supermercados Metro - Sistema de Gestión CRM
