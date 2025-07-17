# Ejemplos de Interfaz de Usuario para AIFox

Este documento proporciona descripciones detalladas de cómo debería verse la interfaz de usuario de la extensión AIFox.

## Panel Lateral Principal

El panel lateral debería tener una estructura similar a esta:

```
+-----------------------------------------------+
| AIFox                                [⚙️] [✖️] |
+-----------------------------------------------+
| [🔍] Buscar...                               |
+-----------------------------------------------+
| [📱 Aplicaciones] | [📝 Prompts]              |
+-----------------------------------------------+
|                                               |
|  CATEGORÍAS                                   |
|  ├─ 📝 Escritura                              |
|  ├─ 🖼️ Imágenes                               |
|  ├─ 💻 Código                                 |
|  ├─ 🔊 Audio                                  |
|  ├─ 🎬 Video                                  |
|  ├─ 🤖 Asistentes                             |
|  ├─ 📊 Negocios                               |
|  └─ 🎓 Educación                              |
|                                               |
|  APLICACIONES                                 |
|  +-----------------------------------+        |
|  | ChatGPT                    ⭐⭐⭐⭐⭐ |        |
|  | Asistente conversacional de OpenAI |        |
|  | #asistente #escritura #código      |        |
|  | Freemium                           |        |
|  +-----------------------------------+        |
|                                               |
|  +-----------------------------------+        |
|  | Midjourney                 ⭐⭐⭐⭐⭐ |        |
|  | Generador de imágenes por IA       |        |
|  | #imágenes #arte #diseño            |        |
|  | Pago                               |        |
|  +-----------------------------------+        |
|                                               |
|  +-----------------------------------+        |
|  | GitHub Copilot             ⭐⭐⭐⭐⭐ |        |
|  | Asistente de programación          |        |
|  | #código #programación #desarrollo  |        |
|  | Pago                               |        |
|  +-----------------------------------+        |
|                                               |
+-----------------------------------------------+
```

## Gestor de Prompts

La interfaz del gestor de prompts debería verse así:

```
+-----------------------------------------------+
| AIFox                                [⚙️] [✖️] |
+-----------------------------------------------+
| [🔍] Buscar prompts...                        |
+-----------------------------------------------+
| [📱 Aplicaciones] | [📝 Prompts]              |
+-----------------------------------------------+
| [Mis Prompts] | [Descubrir] | [Favoritos]     |
+-----------------------------------------------+
|                                               |
|  MIS PROMPTS                                  |
|  [+ Nuevo Prompt]                             |
|                                               |
|  +-----------------------------------+        |
|  | Análisis detallado de código      |        |
|  | Categoría: Programación           |        |
|  | Modelo: GPT-4                     |        |
|  | #código #análisis #debugging      |        |
|  | Privado                           |        |
|  | [Editar] [Compartir] [Eliminar]   |        |
|  +-----------------------------------+        |
|                                               |
|  +-----------------------------------+        |
|  | Generador de planes de estudio    |        |
|  | Categoría: Educación              |        |
|  | Modelo: Claude                    |        |
|  | #educación #planificación         |        |
|  | Público - 42 ⬆️                   |        |
|  | [Editar] [Dejar de compartir]     |        |
|  +-----------------------------------+        |
|                                               |
+-----------------------------------------------+
```

## Editor de Prompts

El editor de prompts debería tener esta estructura:

```
+-----------------------------------------------+
| AIFox - Editor de Prompts            [✖️]     |
+-----------------------------------------------+
| Título:                                       |
| [                                      ]      |
|                                               |
| Categoría:                                    |
| [Programación ▼]                              |
|                                               |
| Modelo de IA:                                 |
| [GPT-4 ▼]                                     |
|                                               |
| Etiquetas:                                    |
| [                                      ]      |
| Separadas por comas (ej: código, análisis)    |
|                                               |
| Contenido:                                    |
| +-----------------------------------+         |
| |                                   |         |
| |                                   |         |
| |                                   |         |
| |                                   |         |
| |                                   |         |
| +-----------------------------------+         |
|                                               |
| Visibilidad:                                  |
| (○) Privado  (○) Público                      |
|                                               |
| [Cancelar]                [Guardar]           |
+-----------------------------------------------+
```

## Descubrimiento de Prompts

La sección de descubrimiento de prompts debería verse así:

```
+-----------------------------------------------+
| AIFox                                [⚙️] [✖️] |
+-----------------------------------------------+
| [🔍] Buscar prompts...                        |
+-----------------------------------------------+
| [📱 Aplicaciones] | [📝 Prompts]              |
+-----------------------------------------------+
| [Mis Prompts] | [Descubrir] | [Favoritos]     |
+-----------------------------------------------+
|                                               |
|  FILTROS                                      |
|  Categoría: [Todas ▼]                         |
|  Modelo: [Todos ▼]                            |
|  Idioma: [Todos ▼]                            |
|  Ordenar por: [Popularidad ▼]                 |
|                                               |
|  PROMPTS POPULARES                            |
|                                               |
|  +-----------------------------------+        |
|  | Comprehensive Research Assistant  |        |
|  | Por: ResearchPro                  |        |
|  | Categoría: Research               |        |
|  | Modelo: GPT-4                     |        |
|  | #research #academic               |        |
|  | 328 ⬆️ · 1205 👁️ · 189 📋         |        |
|  | [Ver] [Copiar] [Favorito]         |        |
|  +-----------------------------------+        |
|                                               |
|  +-----------------------------------+        |
|  | Análisis DAFO empresarial         |        |
|  | Por: EstrategaDigital             |        |
|  | Categoría: Business               |        |
|  | Modelo: Claude                    |        |
|  | #estrategia #negocios             |        |
|  | 156 ⬆️ · 720 👁️ · 98 📋           |        |
|  | [Ver] [Copiar] [Favorito]         |        |
|  +-----------------------------------+        |
|                                               |
+-----------------------------------------------+
```

## Configuración

La pantalla de configuración debería tener esta estructura:

```
+-----------------------------------------------+
| AIFox - Configuración               [✖️]      |
+-----------------------------------------------+
|                                               |
|  GENERAL                                      |
|  Tema:                                        |
|  (○) Claro  (○) Oscuro  (○) Sistema           |
|                                               |
|  Abrir panel lateral al iniciar:              |
|  [✓] Activado  [ ] Desactivado                |
|                                               |
|  APLICACIONES DE IA                           |
|  Mostrar aplicaciones por defecto:            |
|  [Todas ▼]                                    |
|                                               |
|  Ordenar aplicaciones por:                    |
|  [Popularidad ▼]                              |
|                                               |
|  GESTOR DE PROMPTS                            |
|  Sincronización de prompts:                   |
|  [✓] Activado  [ ] Desactivado                |
|                                               |
|  Cuenta:                                      |
|  [No conectado] [Iniciar sesión]              |
|                                               |
|  ATAJOS DE TECLADO                            |
|  Abrir panel lateral:                         |
|  [Ctrl+Shift+A]                               |
|                                               |
|  Abrir gestor de prompts:                     |
|  [Ctrl+Shift+P]                               |
|                                               |
|  [Restaurar valores predeterminados]          |
|                                               |
+-----------------------------------------------+
```

## Diseño Responsive

La extensión debe adaptarse a diferentes anchos del panel lateral:

- **Panel estrecho** (menos de 300px): Mostrar elementos en una sola columna, ocultar información secundaria
- **Panel medio** (300-500px): Mostrar elementos en una o dos columnas según el contenido
- **Panel ancho** (más de 500px): Mostrar elementos en dos o tres columnas para aprovechar el espacio

## Temas

La extensión debe soportar dos temas principales:

### Tema Claro
- Fondo: Blanco (#FFFFFF)
- Texto principal: Negro (#212121)
- Texto secundario: Gris oscuro (#757575)
- Acentos: Azul (#1A73E8)
- Tarjetas: Blanco con sombras suaves
- Bordes: Gris claro (#E0E0E0)

### Tema Oscuro
- Fondo: Gris muy oscuro (#202124)
- Texto principal: Blanco (#FFFFFF)
- Texto secundario: Gris claro (#BDBDBD)
- Acentos: Azul claro (#8AB4F8)
- Tarjetas: Gris oscuro (#2A2A2A)
- Bordes: Gris (#3C4043)

## Animaciones y Transiciones

- Transiciones suaves entre pestañas (300ms)
- Animación de expansión/colapso para categorías (200ms)
- Efecto de hover en tarjetas (escala ligera y sombra)
- Animación de carga para búsquedas y filtros