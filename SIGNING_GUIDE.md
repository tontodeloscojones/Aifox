# Guía de Firma para AIFox Extension

Esta guía explica cómo firmar la extensión AIFox para distribución en Firefox.

## 🔐 Opciones de Firma

### Opción 1: Distribución en AMO (Recomendada)

#### Ventajas
- ✅ Firma automática gratuita
- ✅ Distribución oficial en Mozilla Add-ons
- ✅ Actualizaciones automáticas
- ✅ Mayor confianza de usuarios
- ✅ Estadísticas de uso

#### Proceso
1. **Preparar la extensión**:
   ```bash
   cd extension
   zip -r aifox-extension-amo.xpi .
   ```

2. **Crear cuenta de desarrollador**:
   - Ve a [addons.mozilla.org](https://addons.mozilla.org)
   - Registrarse como desarrollador
   - Verificar email

3. **Subir extensión**:
   - Developer Hub → "Submit a New Add-on"
   - Seleccionar "On this site" para AMO
   - Subir `aifox-extension-amo.xpi`

4. **Completar información**:
   - Nombre: "AIFox"
   - Categoría: "Productivity"
   - Descripción: Ver sección "Descripción AMO" abajo
   - Capturas de pantalla
   - Política de privacidad

5. **Revisión automática**:
   - Mozilla revisa automáticamente
   - Proceso toma 1-3 días
   - Si pasa, se publica automáticamente

### Opción 2: Distribución Propia con Firma

#### Ventajas
- ✅ Control total sobre distribución
- ✅ Firma oficial de Mozilla
- ✅ Funciona en Firefox release
- ❌ Sin actualizaciones automáticas
- ❌ Usuarios deben confiar en fuente externa

#### Proceso
1. **Obtener credenciales API**:
   - Ve a [addons.mozilla.org/developers/addon/api/key/](https://addons.mozilla.org/developers/addon/api/key/)
   - Genera JWT issuer y secret
   - Guarda las credenciales de forma segura

2. **Instalar web-ext**:
   ```bash
   npm install -g web-ext
   ```

3. **Firmar la extensión**:
   ```bash
   cd extension
   web-ext sign \
     --api-key=your-jwt-issuer \
     --api-secret=your-jwt-secret \
     --channel=unlisted
   ```

4. **Resultado**:
   - Genera archivo XPI firmado
   - Válido para Firefox release
   - Distribuir manualmente

### Opción 3: Solo Desarrollo (Sin Firma)

#### Para testing y desarrollo únicamente

1. **Firefox Developer Edition**:
   - Descargar [Firefox Developer Edition](https://www.mozilla.org/firefox/developer/)
   - Cargar extensión sin firma

2. **Configurar Firefox Release**:
   ```
   about:config
   xpinstall.signatures.required = false
   ```
   ⚠️ **Solo para desarrollo, compromete seguridad**

## 📝 Información para AMO

### Descripción Corta
```
Access 300+ AI applications and manage prompts with AIFox - your AI productivity companion for Firefox.
```

### Descripción Completa
```
AIFox is a comprehensive Firefox extension that brings the power of AI to your browser with two main features:

🤖 AI Applications Index
• Browse 300+ carefully curated AI applications
• Organized in 8 categories: Writing, Images, Code, Audio, Video, Assistants, Business, Education
• Smart search and advanced filtering
• Direct links to applications with detailed information
• Popularity ratings and pricing details

📝 Advanced Prompt Manager
• Create, edit, and organize personal prompts
• Discover community-shared prompts
• Support for GPT-4, Claude, Gemini, and more
• Tag-based organization and search
• Import/export functionality
• Favorites and rating system

🎨 Modern Interface
• Integrated sidebar panel
• Quick-access popup
• Responsive design with dark/light mode
• Keyboard shortcuts (Ctrl+Shift+A for sidebar)
• Context menu integration

Perfect for developers, content creators, professionals, and students who want quick access to AI tools and efficient prompt management.

Privacy-focused: All data stored locally in your browser. No external servers contacted without explicit user action.

Open source project available on GitHub.
```

### Etiquetas Sugeridas
```
ai, artificial-intelligence, productivity, prompts, chatgpt, claude, tools, sidebar, developer-tools, writing
```

### Categorías
- Primary: Productivity
- Secondary: Developer Tools

## 🖼️ Capturas de Pantalla Necesarias

Para AMO necesitas capturas de pantalla. Voy a crear instrucciones:

### Capturas Requeridas
1. **Sidebar principal** - Vista del índice de aplicaciones AI
2. **Gestor de prompts** - Vista de "Mis Prompts"
3. **Búsqueda en acción** - Mostrando filtros y resultados
4. **Popup** - Vista del popup de acceso rápido
5. **Prompt editor** - Modal de creación/edición de prompts

### Especificaciones
- Resolución: 1280x800 o superior
- Formato: PNG o JPG
- Máximo 10MB por imagen
- Mínimo 3 capturas, máximo 10

## 🔒 Política de Privacidad

```markdown
# AIFox Privacy Policy

## Data Collection
AIFox does not collect, transmit, or store any personal data on external servers.

## Local Storage
- User prompts are stored locally in Firefox's extension storage
- Application preferences stored locally
- No data leaves your browser without explicit user action

## External Links
- Extension provides links to third-party AI applications
- Users are responsible for privacy policies of linked services
- No tracking or analytics on link clicks

## Permissions Used
- storage: Save user prompts and settings locally
- tabs: Open AI application links in new tabs
- clipboardWrite: Copy prompts to clipboard
- contextMenus: Add right-click menu options

## Contact
For privacy questions: [GitHub Issues](https://github.com/tontodeloscojones/Aifox/issues)

Last updated: [Current Date]
```

## 🚀 Pasos Recomendados

### Para Máxima Adopción (Recomendado)
1. **Publicar en AMO** primero
2. **Obtener usuarios** y feedback
3. **Iterar** basado en comentarios
4. **Mantener** versión actualizada

### Para Control Total
1. **Firma con API** para distribución propia
2. **Crear página web** para descargas
3. **Documentar** proceso de instalación
4. **Manejar** actualizaciones manualmente

## 📋 Checklist Pre-Firma

- [ ] Extensión funciona correctamente
- [ ] Manifest.json completo y válido
- [ ] Iconos en todos los tamaños requeridos
- [ ] Descripción y metadata preparados
- [ ] Capturas de pantalla tomadas
- [ ] Política de privacidad escrita
- [ ] Código revisado para seguridad
- [ ] Testing en diferentes versiones de Firefox

## 🆘 Solución de Problemas

### Error: "Package could not be parsed"
- Verificar que manifest.json es válido
- Comprobar que todos los archivos referenciados existen
- Revisar permisos en manifest

### Error: "Validation failed"
- Revisar logs de validación
- Corregir errores de código
- Verificar compatibilidad con WebExtensions API

### Rechazo en Revisión
- Leer comentarios del revisor
- Corregir problemas identificados
- Resubmitir con cambios documentados

## 📞 Soporte

- **Mozilla Developer Hub**: [developer.mozilla.org](https://developer.mozilla.org)
- **AMO Developer Guide**: [extensionworkshop.com](https://extensionworkshop.com)
- **GitHub Issues**: Para problemas específicos de AIFox