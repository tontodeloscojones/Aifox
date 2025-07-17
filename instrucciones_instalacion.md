# Instrucciones de Instalación Manual para AIFox

Esta guía te ayudará a instalar la extensión AIFox en Firefox mediante el proceso de "sideloading" (instalación manual).

## Requisitos Previos

- Firefox versión 109.0 o superior
- Todos los archivos de la extensión AIFox descargados y descomprimidos en una carpeta

## Pasos para la Instalación

### 1. Habilitar el Modo Desarrollador en Firefox

1. Abre Firefox
2. En la barra de direcciones, escribe: `about:debugging`
3. Haz clic en "Este Firefox" en el menú lateral izquierdo
4. Verás la sección "Extensiones temporales" donde podrás cargar extensiones no firmadas

### 2. Cargar la Extensión

1. En la página "about:debugging", haz clic en el botón "Cargar complemento temporal..."
2. Navega hasta la carpeta donde descomprimiste los archivos de AIFox
3. Selecciona el archivo `manifest.json` y haz clic en "Abrir"
4. La extensión AIFox se cargará y aparecerá en la lista de extensiones temporales

### 3. Verificar la Instalación

1. Deberías ver el icono de AIFox en la barra de herramientas de Firefox
2. Haz clic en el icono para abrir el popup de la extensión
3. Para abrir el panel lateral, puedes:
   - Usar el atajo de teclado `Ctrl+Shift+A` (o `Cmd+Shift+A` en macOS)
   - Hacer clic derecho en cualquier página y seleccionar "Abrir panel lateral de AIFox" en el menú contextual
   - Hacer clic en el botón correspondiente en el popup de la extensión

### 4. Consideraciones Importantes

- **Instalación Temporal**: Las extensiones cargadas mediante este método son temporales y se eliminarán cuando cierres Firefox
- **Persistencia de Datos**: Los datos guardados (como tus prompts personalizados) se mantendrán en el almacenamiento local incluso después de recargar la extensión
- **Actualizaciones**: Para actualizar la extensión, deberás eliminarla y cargarla nuevamente siguiendo estos mismos pasos

### 5. Solución de Problemas Comunes

#### La extensión no aparece después de cargarla
- Verifica que seleccionaste el archivo `manifest.json` correcto
- Asegúrate de que la estructura de archivos de la extensión está completa
- Comprueba que no hay errores en la consola de depuración (visible en about:debugging)

#### El panel lateral no se abre
- Verifica que Firefox está actualizado a la versión 109.0 o superior
- Comprueba que la extensión tiene los permisos necesarios
- Intenta reiniciar Firefox y cargar la extensión nuevamente

#### Los datos no se guardan
- Verifica que la extensión tiene el permiso de "storage" en el manifest.json
- Comprueba si hay errores relacionados con el almacenamiento en la consola de depuración

## Instalación Permanente (Para Desarrolladores)

Si eres desarrollador y deseas una instalación más permanente para pruebas, puedes seguir estos pasos adicionales:

1. Abre Firefox y ve a `about:config`
2. Busca la preferencia `xpinstall.signatures.required` y cámbiala a `false`
3. Empaqueta la extensión en un archivo .xpi (puedes usar herramientas como web-ext)
4. Instala el archivo .xpi arrastrándolo a una ventana de Firefox

**Nota**: Este método solo funciona en Firefox Developer Edition o Firefox Nightly, no en la versión regular de Firefox.

## Recursos Adicionales

- [Documentación de Mozilla sobre desarrollo de extensiones](https://developer.mozilla.org/es/docs/Mozilla/Add-ons/WebExtensions)
- [Herramienta web-ext para desarrollo de extensiones](https://github.com/mozilla/web-ext)
- [Foro de soporte para desarrolladores de Mozilla](https://discourse.mozilla.org/c/add-ons/development/)