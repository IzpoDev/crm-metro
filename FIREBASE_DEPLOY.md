# 🚀 Guía de Despliegue en Firebase Hosting

## 📋 Pasos para configurar Firebase Hosting con GitHub Actions

### 1️⃣ Crear un proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Agregar proyecto"
3. Nombra tu proyecto como: **`metro-crm-project`** (o el nombre que prefieras)
4. Sigue los pasos hasta completar la creación

### 2️⃣ Inicializar Firebase en el proyecto local

Ejecuta en tu terminal:

```bash
firebase login
firebase init hosting
```

Cuando te pregunte:
- **What do you want to use as your public directory?** → `dist/metro-crm/browser`
- **Configure as a single-page app?** → `Yes`
- **Set up automatic builds and deploys with GitHub?** → `No` (lo haremos manualmente)
- **File dist/metro-crm/browser/index.html already exists. Overwrite?** → `No`

### 3️⃣ Generar la Service Account Key de Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto
3. Ve a **⚙️ Project Settings** → **Service accounts**
4. Haz clic en **"Generate new private key"**
5. Descarga el archivo JSON (guárdalo en un lugar seguro)

### 4️⃣ Configurar el Secret en GitHub

1. Ve a tu repositorio en GitHub: https://github.com/IzpoDev/crm-metro
2. Ve a **Settings** → **Secrets and variables** → **Actions**
3. Haz clic en **"New repository secret"**
4. Crea un secret con:
   - **Name:** `FIREBASE_SERVICE_ACCOUNT_METRO_CRM`
   - **Value:** Pega todo el contenido del archivo JSON que descargaste

### 5️⃣ Actualizar el Project ID en los archivos

Si tu proyecto de Firebase tiene un ID diferente a `metro-crm-project`, actualiza:

**`.firebaserc`:**
```json
{
  "projects": {
    "default": "TU-PROJECT-ID"
  }
}
```

**`.github/workflows/firebase-hosting.yml`:**
```yaml
projectId: TU-PROJECT-ID
```

### 6️⃣ Hacer Push a GitHub

```bash
git add .
git commit -m "Configure Firebase Hosting with GitHub Actions"
git push origin main
```

### 7️⃣ Verificar el Despliegue

1. Ve a tu repositorio en GitHub
2. Haz clic en la pestaña **"Actions"**
3. Verás el workflow ejecutándose
4. Una vez completado, tu app estará desplegada en: `https://TU-PROJECT-ID.web.app`

## 🔄 Despliegues Automáticos

Cada vez que hagas push a la rama `main`, GitHub Actions:
1. ✅ Instala las dependencias
2. ✅ Construye la aplicación Angular
3. ✅ Despliega automáticamente a Firebase Hosting

## 🧪 Despliegue Manual (opcional)

Si quieres desplegar manualmente:

```bash
npm run build
firebase deploy
```

## 📊 Credenciales de Prueba

- **Cajero:** cajero1 / cajero123
- **Ejecutivo:** ejecutivo1 / ejecutivo123
- **Admin:** admin / admin123

---

## 🛠️ Comandos Útiles

```bash
# Ver logs de Firebase
firebase hosting:channel:list

# Ver el sitio desplegado
firebase open hosting:site

# Desplegar a un canal de prueba
firebase hosting:channel:deploy preview
```

## 📝 Notas Importantes

⚠️ **Importante:** El archivo de service account (`.json`) **NUNCA** debe subirse a GitHub. Solo se usa el contenido como secret en GitHub Actions.

✅ Los archivos ya están configurados en este proyecto:
- `firebase.json` - Configuración de hosting
- `.firebaserc` - Project ID de Firebase
- `.github/workflows/firebase-hosting.yml` - GitHub Actions workflow
