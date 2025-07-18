# 🔐 Pasos Rápidos para Firmar AIFox

## ✅ Archivos Listos para Firma

Ya tienes los archivos XPI preparados en el directorio `dist/`:

- **`aifox-extension-amo.xpi`** (45KB) - Para Mozilla Add-ons Store
- **`aifox-extension-self-hosted.xpi`** (45KB) - Para distribución propia

## 🚀 Opción 1: Publicar en Mozilla Add-ons (Recomendado)

### Paso 1: Crear Cuenta
1. Ve a [addons.mozilla.org](https://addons.mozilla.org)
2. Haz clic en "Register" o "Log in"
3. Crea una cuenta de desarrollador

### Paso 2: Subir Extensión
1. Ve a [Developer Hub](https://addons.mozilla.org/developers/)
2. Haz clic en "Submit a New Add-on"
3. Selecciona "On this site" (para AMO)
4. Sube el archivo `dist/aifox-extension-amo.xpi`

### Paso 3: Completar Información
```
Nombre: AIFox
Slug: aifox
Categoría: Productivity
Descripción corta: Access 300+ AI applications and manage prompts with AIFox - your AI productivity companion for Firefox.

Descripción completa:
AIFox is a comprehensive Firefox extension that brings the power of AI to your browser with two main features:

🤖 AI Applications Index
• Browse 300+ carefully curated AI applications
• Organized in 8 categories: Writing, Images, Code, Audio, Video, Assistants, Business, Education
• Smart search and advanced filtering
• Direct links to applications with detailed information

📝 Advanced Prompt Manager
• Create, edit, and organize personal prompts
• Discover community-shared prompts
• Support for GPT-4, Claude, Gemini, and more
• Tag-based organization and search
• Import/export functionality

🎨 Modern Interface
• Integrated sidebar panel with keyboard shortcuts
• Quick-access popup and context menu integration
• Responsive design with dark/light mode support

Perfect for developers, content creators, professionals, and students who want quick access to AI tools and efficient prompt management.

Privacy-focused: All data stored locally in your browser.
```

### Paso 4: Política de Privacidad
```
AIFox Privacy Policy

Data Collection: AIFox does not collect, transmit, or store any personal data on external servers.

Local Storage: User prompts and preferences are stored locally in Firefox's extension storage. No data leaves your browser without explicit user action.

External Links: Extension provides links to third-party AI applications. Users are responsible for privacy policies of linked services.

Permissions Used:
- storage: Save user prompts and settings locally
- tabs: Open AI application links in new tabs  
- clipboardWrite: Copy prompts to clipboard
- contextMenus: Add right-click menu options

Contact: GitHub Issues for privacy questions
```

### Paso 5: Esperar Revisión
- Mozilla revisa automáticamente (1-3 días)
- Si pasa, se publica automáticamente
- Recibirás email de confirmación

## 🏠 Opción 2: Distribución Propia con Firma

### Paso 1: Obtener Credenciales API
1. Ve a [AMO API Keys](https://addons.mozilla.org/developers/addon/api/key/)
2. Genera JWT issuer y secret
3. Guarda las credenciales de forma segura

### Paso 2: Instalar web-ext
```bash
npm install -g web-ext
```

### Paso 3: Configurar Variables de Entorno
```bash
export AMO_JWT_ISSUER='your-jwt-issuer-here'
export AMO_JWT_SECRET='your-jwt-secret-here'
```

### Paso 4: Firmar la Extensión
```bash
cd extension
web-ext sign \
  --api-key=$AMO_JWT_ISSUER \
  --api-secret=$AMO_JWT_SECRET \
  --channel=unlisted
```

### Paso 5: Distribuir
- Obtienes un XPI firmado
- Distribúyelo en tu sitio web
- Los usuarios pueden instalarlo directamente

## 🧪 Opción 3: Solo para Desarrollo (Sin Firma)

### Firefox Developer Edition
1. Descarga [Firefox Developer Edition](https://www.mozilla.org/firefox/developer/)
2. Ve a `about:debugging`
3. "This Firefox" → "Load Temporary Add-on"
4. Selecciona `extension/manifest.json`

### Firefox Release (Solo Desarrollo)
```
about:config
xpinstall.signatures.required = false
```
⚠️ **Solo para desarrollo, compromete la seguridad**

## 📋 Checklist Pre-Firma

- [x] ✅ Extensión funcional completa
- [x] ✅ Manifest.json válido
- [x] ✅ Iconos en todos los tamaños (16, 32, 48, 128px)
- [x] ✅ Archivos XPI preparados (45KB cada uno)
- [ ] 📝 Capturas de pantalla para AMO (opcional pero recomendado)
- [ ] 📝 Cuenta de desarrollador en Mozilla
- [ ] 📝 Descripción y metadata preparados

## 🎯 Recomendación

**Para máxima adopción**: Usa la **Opción 1 (AMO)** porque:
- ✅ Firma automática gratuita
- ✅ Distribución oficial
- ✅ Actualizaciones automáticas
- ✅ Mayor confianza de usuarios
- ✅ Estadísticas de uso

**Para control total**: Usa la **Opción 2** si necesitas:
- Control sobre el proceso de distribución
- Versiones beta o experimentales
- Distribución en canales privados

## 🆘 Problemas Comunes

### "Package could not be parsed"
- Verificar que manifest.json es válido JSON
- Comprobar que todos los archivos referenciados existen

### "Validation failed"
- Revisar logs de validación en AMO
- Corregir errores de código JavaScript
- Verificar permisos en manifest

### Rechazo en Revisión
- Leer comentarios del revisor cuidadosamente
- Corregir problemas identificados
- Resubmitir con cambios documentados

## 📞 Soporte

- **Mozilla Developer Hub**: [developer.mozilla.org](https://developer.mozilla.org)
- **Extension Workshop**: [extensionworkshop.com](https://extensionworkshop.com)
- **AIFox Issues**: [GitHub Issues](https://github.com/tontodeloscojones/Aifox/issues)

---

**¡Tu extensión AIFox está lista para ser firmada y distribuida! 🦊🔐**