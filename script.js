// Base de datos simulada de clientes
const clientesDB = {
    '12345678': {
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
    '87654321': {
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
    '11223344': {
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
};

// Historial de notificaciones
const historialNotificaciones = [];

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    // ========== UC-CRM-01: AFILIAR CLIENTE ==========
    const afiliarForm = document.getElementById('afiliarForm');
    if (afiliarForm) {
        afiliarForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const dni = document.getElementById('dni').value.trim();
            const nombres = document.getElementById('nombres').value.trim();
            const apellidos = document.getElementById('apellidos').value.trim();
            const direccion = document.getElementById('direccion').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const contactoPrincipal = document.getElementById('contactoPrincipal').value;
            const aceptaPromociones = document.getElementById('aceptaPromociones').checked;
            const aceptaNotificaciones = document.getElementById('aceptaNotificaciones').checked;

            // Paso 4: Validar campos obligatorios
            if (!dni || !nombres || !apellidos || !direccion || !telefono || !correo || !contactoPrincipal) {
                mostrarError('errorMessage', 'Por favor complete todos los campos obligatorios marcados con (*)');
                return;
            }

            // Validar formato DNI
            if (dni.length !== 8 || !/^\d+$/.test(dni)) {
                mostrarError('errorMessage', 'El DNI debe contener exactamente 8 dígitos numéricos');
                return;
            }

            // Validar formato email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(correo)) {
                mostrarError('errorMessage', 'El formato del correo electrónico no es válido');
                return;
            }

            // Paso 6.1: Verificar si el cliente ya existe
            if (clientesDB[dni]) {
                if (confirm(`El cliente con DNI ${dni} ya está registrado en el sistema.\n\n¿Desea abrir su ficha existente?`)) {
                    // Redirigir a actualizar datos
                    window.location.href = `actualizar.html?dni=${dni}`;
                }
                return;
            }

            // Paso 8: Guardar cliente (simulado)
            const codigoCliente = 'CLI-' + String(Object.keys(clientesDB).length + 1).padStart(3, '0');
            const fechaActual = new Date().toLocaleDateString('es-PE');

            clientesDB[dni] = {
                codigo: codigoCliente,
                dni,
                nombres,
                apellidos,
                direccion,
                telefono,
                correo,
                contactoPrincipal,
                aceptaPromociones,
                aceptaNotificaciones,
                estado: 'activo',
                fechaRegistro: fechaActual,
                usuarioRegistro: 'CAJ-001'
            };

            // Paso 10: Mostrar mensaje de éxito
            alert(`✓ Cliente afiliado correctamente\n\nCódigo de Cliente: ${codigoCliente}\nNombre: ${nombres} ${apellidos}\nDNI: ${dni}\n\nFecha de registro: ${fechaActual}\nUsuario: CAJ-001`);

            afiliarForm.reset();
            ocultarError('errorMessage');
        });
    }

    // ========== UC-CRM-02: ACTUALIZAR DATOS DEL CLIENTE ==========
    const btnBuscar = document.getElementById('btnBuscar');
    if (btnBuscar) {
        btnBuscar.addEventListener('click', () => {
            const criterio = document.getElementById('criterio').value;
            const valorBusqueda = document.getElementById('valorBusqueda').value.trim().toLowerCase();

            if (!valorBusqueda) {
                alert('Por favor ingrese un valor de búsqueda');
                return;
            }

            // Paso 4: Buscar cliente
            let clienteEncontrado = null;
            let dniEncontrado = null;

            for (const [dni, cliente] of Object.entries(clientesDB)) {
                if (criterio === 'dni' && dni === valorBusqueda) {
                    clienteEncontrado = cliente;
                    dniEncontrado = dni;
                    break;
                } else if (criterio === 'nombre' &&
                    (cliente.nombres.toLowerCase().includes(valorBusqueda) ||
                        cliente.apellidos.toLowerCase().includes(valorBusqueda))) {
                    clienteEncontrado = cliente;
                    dniEncontrado = dni;
                    break;
                } else if (criterio === 'telefono' && cliente.telefono === valorBusqueda) {
                    clienteEncontrado = cliente;
                    dniEncontrado = dni;
                    break;
                }
            }

            // Paso 4.1: Cliente no encontrado
            if (!clienteEncontrado) {
                document.getElementById('errorBusqueda').style.display = 'block';
                document.getElementById('formularioActualizar').style.display = 'none';
                return;
            }

            // Cliente encontrado - mostrar formulario
            document.getElementById('errorBusqueda').style.display = 'none';
            document.getElementById('formularioActualizar').style.display = 'block';

            // Llenar formulario con datos actuales
            document.getElementById('codigoCliente').textContent = clienteEncontrado.codigo;
            document.getElementById('fechaRegistro').textContent = clienteEncontrado.fechaRegistro;
            document.getElementById('dniEdit').value = dniEncontrado;
            document.getElementById('nombresEdit').value = clienteEncontrado.nombres;
            document.getElementById('apellidosEdit').value = clienteEncontrado.apellidos;
            document.getElementById('direccionEdit').value = clienteEncontrado.direccion;
            document.getElementById('telefonoEdit').value = clienteEncontrado.telefono;
            document.getElementById('correoEdit').value = clienteEncontrado.correo;
            document.getElementById('contactoPrincipalEdit').value = clienteEncontrado.contactoPrincipal;
            document.getElementById('estadoEdit').value = clienteEncontrado.estado;
            document.getElementById('aceptaPromocionesEdit').checked = clienteEncontrado.aceptaPromociones;
            document.getElementById('aceptaNotificacionesEdit').checked = clienteEncontrado.aceptaNotificaciones;
        });
    }

    const actualizarForm = document.getElementById('actualizarForm');
    if (actualizarForm) {
        actualizarForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const dni = document.getElementById('dniEdit').value;
            const nombres = document.getElementById('nombresEdit').value.trim();
            const apellidos = document.getElementById('apellidosEdit').value.trim();
            const direccion = document.getElementById('direccionEdit').value.trim();
            const telefono = document.getElementById('telefonoEdit').value.trim();
            const correo = document.getElementById('correoEdit').value.trim();
            const contactoPrincipal = document.getElementById('contactoPrincipalEdit').value;
            const estado = document.getElementById('estadoEdit').value;
            const aceptaPromociones = document.getElementById('aceptaPromocionesEdit').checked;
            const aceptaNotificaciones = document.getElementById('aceptaNotificacionesEdit').checked;

            // Paso 6: Validar formato de datos
            if (!nombres || !apellidos || !direccion || !telefono || !correo) {
                mostrarError('errorValidacion', 'Todos los campos son obligatorios');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(correo)) {
                mostrarError('errorValidacion', 'El formato del correo electrónico no es válido');
                return;
            }

            // Paso 8: Actualizar datos
            clientesDB[dni] = {
                ...clientesDB[dni],
                nombres,
                apellidos,
                direccion,
                telefono,
                correo,
                contactoPrincipal,
                estado,
                aceptaPromociones,
                aceptaNotificaciones,
                fechaModificacion: new Date().toLocaleString('es-PE'),
                usuarioModificador: 'SUP-001'
            };

            // Paso 10: Mostrar mensaje de éxito
            alert(`✓ Datos actualizados correctamente\n\nCliente: ${nombres} ${apellidos}\nDNI: ${dni}\n\nFecha de modificación: ${new Date().toLocaleString('es-PE')}\nUsuario: SUP-001`);

            document.getElementById('formularioActualizar').style.display = 'none';
            document.getElementById('valorBusqueda').value = '';
            ocultarError('errorValidacion');
        });
    }

    const btnCancelar = document.getElementById('btnCancelar');
    if (btnCancelar) {
        btnCancelar.addEventListener('click', () => {
            document.getElementById('formularioActualizar').style.display = 'none';
            document.getElementById('valorBusqueda').value = '';
        });
    }

    // ========== UC-CRM-03: NOTIFICAR OFERTA O PROMOCIÓN ==========
    let clienteSeleccionadoGlobal = null;

    const btnBuscarCliente = document.getElementById('btnBuscarCliente');
    if (btnBuscarCliente) {
        btnBuscarCliente.addEventListener('click', () => {
            const busqueda = document.getElementById('buscarCliente').value.trim().toLowerCase();

            if (!busqueda) {
                alert('Por favor ingrese un criterio de búsqueda');
                return;
            }

            // Buscar clientes que coincidan
            const resultados = [];
            for (const [dni, cliente] of Object.entries(clientesDB)) {
                if (dni.includes(busqueda) ||
                    cliente.nombres.toLowerCase().includes(busqueda) ||
                    cliente.apellidos.toLowerCase().includes(busqueda) ||
                    cliente.telefono.includes(busqueda)) {
                    resultados.push({ dni, ...cliente });
                }
            }

            const resultadosDiv = document.getElementById('resultadosClientes');
            resultadosDiv.innerHTML = '';

            if (resultados.length === 0) {
                resultadosDiv.innerHTML = '<p class="text-light">No se encontraron clientes</p>';
                document.getElementById('listaClientes').style.display = 'block';
                return;
            }

            resultados.forEach(cliente => {
                const div = document.createElement('div');
                div.style.cssText = 'padding: 1rem; border: 1px solid var(--bg-color); border-radius: var(--radius); margin-bottom: 0.5rem; cursor: pointer; transition: background 0.3s;';
                div.innerHTML = `
                    <strong>${cliente.nombres} ${cliente.apellidos}</strong><br>
                    <small class="text-light">DNI: ${cliente.dni} | Tel: ${cliente.telefono}</small>
                `;
                div.addEventListener('click', () => seleccionarCliente(cliente.dni, cliente));
                div.addEventListener('mouseenter', () => div.style.background = '#f8f9fa');
                div.addEventListener('mouseleave', () => div.style.background = 'white');
                resultadosDiv.appendChild(div);
            });

            document.getElementById('listaClientes').style.display = 'block';
        });
    }

    function seleccionarCliente(dni, cliente) {
        clienteSeleccionadoGlobal = { dni, ...cliente };
        document.getElementById('nombreSeleccionado').textContent = `${cliente.nombres} ${cliente.apellidos}`;
        document.getElementById('dniSeleccionado').textContent = dni;
        document.getElementById('clienteSeleccionado').style.display = 'block';
        document.getElementById('formularioNotificacion').style.display = 'block';
        document.getElementById('listaClientes').style.display = 'none';

        // Cargar contacto principal
        actualizarContactoPrincipal();
    }

    const medioContactoSelect = document.getElementById('medioContacto');
    if (medioContactoSelect) {
        medioContactoSelect.addEventListener('change', actualizarContactoPrincipal);
    }

    function actualizarContactoPrincipal() {
        if (!clienteSeleccionadoGlobal) return;

        const medio = document.getElementById('medioContacto').value;
        const contactoInfo = document.getElementById('contactoInfo');

        if (medio) {
            let valor = '';
            if (medio === 'correo') valor = clienteSeleccionadoGlobal.correo;
            else if (medio === 'telefono' || medio === 'whatsapp' || medio === 'sms') valor = clienteSeleccionadoGlobal.telefono;

            document.getElementById('contactoPrincipalDisplay').textContent = clienteSeleccionadoGlobal.contactoPrincipal;
            document.getElementById('valorContacto').textContent = valor;
            contactoInfo.style.display = 'block';

            // Paso 6.2: Verificar preferencias
            verificarPreferencias(medio);
        } else {
            contactoInfo.style.display = 'none';
        }
    }

    function verificarPreferencias(medio) {
        const advertencia = document.getElementById('advertenciaPreferencias');
        const mensajeAdv = document.getElementById('mensajeAdvertencia');

        if (!clienteSeleccionadoGlobal.aceptaPromociones) {
            mensajeAdv.textContent = 'El cliente NO ha consentido recibir promociones. El envío será bloqueado por preferencia.';
            advertencia.style.display = 'block';
            return false;
        }

        if (medio !== clienteSeleccionadoGlobal.contactoPrincipal) {
            mensajeAdv.textContent = `El canal seleccionado (${medio}) no es el preferido del cliente (${clienteSeleccionadoGlobal.contactoPrincipal}). Se recomienda usar el canal principal.`;
            advertencia.style.display = 'block';
            return true;
        }

        advertencia.style.display = 'none';
        return true;
    }

    const notificarForm = document.getElementById('notificarForm');
    if (notificarForm) {
        notificarForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!clienteSeleccionadoGlobal) {
                alert('Debe seleccionar un cliente primero');
                return;
            }

            const medio = document.getElementById('medioContacto').value;
            const asunto = document.getElementById('asuntoMensaje').value.trim();
            const cuerpo = document.getElementById('cuerpoMensaje').value.trim();

            // Paso 6: Validar formato y preferencias
            if (!medio || !asunto || !cuerpo) {
                mostrarError('errorNotificacion', 'Complete todos los campos obligatorios');
                return;
            }

            // Verificar consentimiento
            if (!clienteSeleccionadoGlobal.aceptaPromociones) {
                alert('❌ Envío bloqueado por preferencia\n\nEl cliente no ha consentido recibir promociones. No se puede enviar la notificación.');
                return;
            }

            // Paso 8: Registrar notificación
            const notificacion = {
                fecha: new Date().toLocaleString('es-PE'),
                cliente: `${clienteSeleccionadoGlobal.nombres} ${clienteSeleccionadoGlobal.apellidos}`,
                dni: clienteSeleccionadoGlobal.dni,
                canal: medio,
                asunto,
                mensaje: cuerpo,
                estado: 'Enviado',
                tipo: document.getElementById('tipoOferta').value || 'Oferta personalizada'
            };

            historialNotificaciones.unshift(notificacion);

            // Mostrar en historial
            mostrarHistorialNotificaciones();

            alert(`✓ Notificación enviada correctamente\n\nCliente: ${notificacion.cliente}\nCanal: ${medio}\nFecha: ${notificacion.fecha}\n\nLa actividad ha sido registrada en el sistema CRM.`);

            notificarForm.reset();
            document.getElementById('formularioNotificacion').style.display = 'none';
            document.getElementById('clienteSeleccionado').style.display = 'none';
            document.getElementById('buscarCliente').value = '';
            clienteSeleccionadoGlobal = null;
        });
    }

    const btnCancelarNotif = document.getElementById('btnCancelarNotif');
    if (btnCancelarNotif) {
        btnCancelarNotif.addEventListener('click', () => {
            document.getElementById('formularioNotificacion').style.display = 'none';
            document.getElementById('clienteSeleccionado').style.display = 'none';
            document.getElementById('buscarCliente').value = '';
            clienteSeleccionadoGlobal = null;
        });
    }

    function mostrarHistorialNotificaciones() {
        const tabla = document.getElementById('tablaHistorial');
        const seccion = document.getElementById('historialNotificaciones');

        if (!tabla || historialNotificaciones.length === 0) return;

        tabla.innerHTML = '';
        historialNotificaciones.forEach(notif => {
            const row = document.createElement('tr');
            row.style.borderBottom = '1px solid var(--bg-color)';
            row.innerHTML = `
                <td style="padding: 1rem;">${notif.fecha}</td>
                <td style="padding: 1rem;">${notif.cliente} (${notif.dni})</td>
                <td style="padding: 1rem;"><span style="background: #e3f2fd; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.85rem;">${notif.canal}</span></td>
                <td style="padding: 1rem;">${notif.tipo}</td>
                <td style="padding: 1rem;"><span style="background: #e8f5e9; color: #2e7d32; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.85rem;">${notif.estado}</span></td>
            `;
            tabla.appendChild(row);
        });

        seccion.style.display = 'block';
    }

    // Funciones auxiliares
    function mostrarError(elementId, mensaje) {
        const errorDiv = document.getElementById(elementId);
        const errorText = document.getElementById(elementId.replace('Message', 'Text').replace('Busqueda', 'Text').replace('Validacion', 'ValidacionText').replace('Notificacion', 'NotificacionText'));
        if (errorText) errorText.textContent = mensaje;
        if (errorDiv) errorDiv.style.display = 'block';
    }

    function ocultarError(elementId) {
        const errorDiv = document.getElementById(elementId);
        if (errorDiv) errorDiv.style.display = 'none';
    }

    // Hacer funciones globales para plantillas
    window.seleccionarCliente = seleccionarCliente;
});

// Función global para cargar plantillas
function cargarPlantilla(tipo) {
    const plantillas = {
        'descuento': {
            asunto: '¡20% de descuento especial para ti!',
            cuerpo: 'Estimado cliente,\n\nTenemos una oferta exclusiva para ti: ¡20% de descuento en toda tu compra!\n\nVálido hasta fin de mes. No dejes pasar esta oportunidad.\n\n¡Te esperamos en Metro!'
        },
        '2x1': {
            asunto: 'Promoción 2x1 en productos seleccionados',
            cuerpo: 'Hola,\n\n¡Aprovecha nuestra promoción 2x1 en productos seleccionados!\n\nLleva dos y paga uno en categorías participantes.\n\nVisítanos y descubre todas las ofertas.\n\nSaludos,\nEquipo Metro'
        },
        'envio': {
            asunto: 'Envío gratis en tu próxima compra',
            cuerpo: 'Estimado cliente,\n\nDisfruta de envío gratis en tu próxima compra online.\n\nSin monto mínimo. Válido por tiempo limitado.\n\n¡Compra ahora en metro.com.pe!\n\nAtentamente,\nMetro'
        }
    };

    const plantilla = plantillas[tipo];
    if (plantilla) {
        document.getElementById('asuntoMensaje').value = plantilla.asunto;
        document.getElementById('cuerpoMensaje').value = plantilla.cuerpo;
    }
}
