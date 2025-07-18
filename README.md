# AIFox - Firefox Extension

Una extensión completa de Firefox que proporciona acceso a las 300 mejores aplicaciones de inteligencia artificial y un gestor de prompts avanzado.

## 🚀 Descarga e Instalación

### Descarga Directa
- **Archivo XPI**: [`aifox-extension.xpi`](./aifox-extension.xpi) (48KB)
- **Guía de Instalación**: [`INSTALLATION_GUIDE.md`](./INSTALLATION_GUIDE.md)
- **README de la Extensión**: [`EXTENSION_README.md`](./EXTENSION_README.md)

### Instalación Rápida
1. Descarga `aifox-extension.xpi`
2. Abre Firefox y ve a `about:debugging`
3. Haz clic en "This Firefox" → "Load Temporary Add-on"
4. Selecciona el archivo `.xpi` descargado
5. ¡Listo! La extensión estará disponible en tu barra de herramientas

## ✨ Características Principales

### 🤖 Índice de Aplicaciones de IA
- **300+ aplicaciones** cuidadosamente seleccionadas
- **8 categorías**: Escritura, Imágenes, Código, Audio, Video, Asistentes, Business, Educación
- **Búsqueda inteligente** por nombre, descripción o etiquetas
- **Filtros avanzados** por categoría y popularidad
- **Enlaces directos** a cada aplicación
- **Información detallada**: precios, popularidad, etiquetas

### 📝 Gestor de Prompts Avanzado
- **Crear y editar** prompts personales
- **Descubrir prompts** de la comunidad
- **Sistema de favoritos** y valoraciones
- **Compatibilidad** con GPT-4, Claude, Gemini y más
- **Organización** por categorías y etiquetas
- **Importar/exportar** colecciones
- **Búsqueda** por contenido, categoría o modelo

### 🎨 Interfaz Moderna
- **Panel lateral** integrado en Firefox
- **Popup** para acceso rápido
- **Diseño responsive** y elegante
- **Modo oscuro/claro** automático
- **Atajos de teclado**: `Ctrl+Shift+A` (sidebar), `Ctrl+Shift+P` (prompts)
- **Menús contextuales** integrados

## 📦 Estructura del Proyecto

```
extension/
├── manifest.json              # Configuración de la extensión
├── background.js              # Script de fondo
├── popup/                     # Interfaz del popup
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── sidebar/                   # Panel lateral principal
│   ├── sidebar.html
│   ├── sidebar.css
│   └── sidebar.js
├── components/                # Componentes modulares
│   ├── ai-apps-index/        # Gestor de aplicaciones IA
│   ├── prompt-manager/       # Gestor de prompts
│   └── shared/               # Utilidades compartidas
└── icons/                    # Iconos de la extensión
    ├── icon-16.png
    ├── icon-32.png
    ├── icon-48.png
    └── icon-128.png
```

## 🎯 Casos de Uso

### 👨‍💻 Para Desarrolladores
- Acceso rápido a GitHub Copilot, Cursor, Replit
- Prompts optimizados para generación de código
- Herramientas de debugging y documentación

### ✍️ Para Creadores de Contenido
- ChatGPT, Claude, Jasper para escritura
- Midjourney, DALL-E, Stable Diffusion para imágenes
- Prompts para diferentes tipos de contenido

### 💼 Para Profesionales
- Herramientas de productividad y análisis
- Prompts para presentaciones y reportes
- Automatización de tareas empresariales

### 🎓 Para Estudiantes y Educadores
- Herramientas de investigación y aprendizaje
- Prompts educativos y de estudio
- Asistentes para tareas académicas

## 📋 Requisitos del Sistema

- **Firefox 109.0** o superior
- **Sistema Operativo**: Windows, macOS, Linux
- **Permisos requeridos**:
  - `storage`: Para guardar prompts y configuraciones
  - `tabs`: Para abrir enlaces de aplicaciones
  - `clipboardWrite`: Para copiar prompts
  - `contextMenus`: Para menús contextuales

## 🔧 Desarrollo

### Kit de Desarrollo Incluido

Este repositorio también contiene un kit completo para generar la extensión:

- **`firefox_extension_prompt.md`**: Prompt para ChatGPT/Claude
- **`ai_applications_structure.js`**: Estructura de datos de aplicaciones
- **`prompt_manager_structure.js`**: Estructura del gestor de prompts
- **`manifest_example.json`**: Ejemplo de manifest
- **`recomendaciones_tecnicas.md`**: Mejores prácticas
- **`ui_examples.md`**: Ejemplos de interfaz

### Compilar desde el Código Fuente

```bash
# Clonar el repositorio
git clone https://github.com/tontodeloscojones/Aifox.git
cd Aifox

# Crear el archivo XPI
cd extension
zip -r ../aifox-extension.xpi .
```

### Desarrollo Local

```bash
# Cargar en Firefox para desarrollo
# 1. Abrir about:debugging
# 2. Hacer clic en "Load Temporary Add-on"
# 3. Seleccionar extension/manifest.json
```

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas!

1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** tus cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Abre** un Pull Request

### Áreas de Contribución

- 🆕 Nuevas aplicaciones de IA para el índice
- 📝 Prompts públicos para la comunidad
- 🐛 Corrección de bugs y mejoras
- 🎨 Mejoras de UI/UX
- 📚 Documentación y traducciones

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT**. Ver [`LICENSE`](./LICENSE) para más detalles.

## 🆘 Soporte y Ayuda

### Documentación
- **[Guía de Instalación](./INSTALLATION_GUIDE.md)**: Instrucciones detalladas
- **[README de la Extensión](./EXTENSION_README.md)**: Documentación técnica
- **[Solución de Problemas](./INSTALLATION_GUIDE.md#troubleshooting)**: Problemas comunes

### Reportar Problemas
Si encuentras algún problema:

1. **Revisa** la documentación y problemas conocidos
2. **Crea** un issue en GitHub incluyendo:
   - Versión de Firefox
   - Pasos para reproducir el problema
   - Capturas de pantalla si es relevante
   - Mensajes de error de la consola

### Contacto
- **GitHub Issues**: Para bugs y solicitudes de features
- **Discussions**: Para preguntas generales y ideas

## 🌟 Roadmap

### Versión 1.1 (Próximamente)
- [ ] Sincronización en la nube
- [ ] Más aplicaciones de IA (objetivo: 500+)
- [ ] Prompts colaborativos en tiempo real
- [ ] Integración con APIs de IA

### Versión 1.2
- [ ] Soporte para Chrome/Edge
- [ ] Marketplace de prompts
- [ ] Análisis de uso y estadísticas
- [ ] Temas personalizables

## 🏆 Reconocimientos

- **Comunidad de Firefox** por las APIs de extensiones
- **Desarrolladores de IA** por crear herramientas increíbles
- **Contribuidores** que hacen posible este proyecto

---

**¡Desarrollado con ❤️ para la comunidad de Firefox y entusiastas de la IA!**

[![Firefox](https://img.shields.io/badge/Firefox-109%2B-orange?logo=firefox)](https://www.mozilla.org/firefox/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/Version-1.0.0-green.svg)](./extension/manifest.json)
[![Size](https://img.shields.io/badge/Size-48KB-lightgrey.svg)](./aifox-extension.xpi)