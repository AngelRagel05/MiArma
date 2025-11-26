# MiArma - Portfolio de Paisajes de Ciencia Ficción

Este proyecto consiste en una **Landing Page** interactiva y responsive diseñada para un artista digital conceptual ("MiArma"). El desarrollo se ha dividido en dos fases: preparación de activos multimedia y desarrollo frontend con HTML5, CSS3 y JavaScript Vanilla.

---

## 📋 Tabla de Contenidos

1. [Descripción del Proyecto](#-descripción-del-proyecto)
2. [Fase 1: Optimización de Recursos Multimedia](#-fase-1-optimización-de-recursos-multimedia)
3. [Fase 2: Desarrollo e Interactividad](#-fase-2-desarrollo-e-interactividad)
4. [Licencia y Propiedad Intelectual](#-licencia-y-propiedad-intelectual)
5. [Estructura de Archivos](#-estructura-de-archivos)
6. [Tecnologías Utilizadas](#-tecnologías-utilizadas)
7. [Verificación Cross-Browser y Cross-Device](#-verificación-cross-browser-y-cross-device)
8. [Instalación y Uso](#-instalación-y-uso)

---

## 🎨 Descripción del Proyecto

El sitio web sirve como escaparate para obras de arte digital con temática de ciencia ficción y paisajes espaciales. Se ha priorizado la **accesibilidad**, el **rendimiento** (carga rápida de imágenes optimizadas) y una **experiencia de usuario fluida** mediante ventanas modales y galerías dinámicas.

### Características principales:
- ✨ Imagen hero con overlay de presentación
- 🎬 Modal de vídeo interactivo con controles accesibles
- 🖼️ Galería de imágenes con sistema de miniaturas interactivas
- 🎵 Audio de presentación integrado
- 📱 Diseño completamente responsive
- ♿ Accesibilidad WCAG (atributos ARIA, navegación por teclado)
- 📄 Página de créditos y atribuciones

---

## 🎥 Fase 1: Optimización de Recursos Multimedia

En esta fase se buscaron, seleccionaron y optimizaron todos los recursos multimedia con **licencias Creative Commons** desde **Pixabay**.

### 1. Imagen Principal (Hero Image) y Logo

**Imagen Hero:**
- **Fuente:** Pixabay - Autor: Joshgmit
- **Tratamiento:** Redimensionada a 1920px de ancho, optimizada en formato JPG
- **Peso final:** < 250 KB
- **Ubicación:** `assets/img/hero.jpg`

**Logo:**
- **Formato:** SVG (escalable, fondo transparente)
- **Ubicación:** `assets/img/logo.svg`

### 2. Galería de Trabajos

Se seleccionaron **6 imágenes** de temática espacial y ciencia ficción:

| Archivo | Autor | Dimensiones | Optimización |
|---------|-------|-------------|--------------|
| `obraPrincipal.jpg` | Mikkehouse | 1920px ancho | Imagen principal de galería |
| `img1.jpg` | WikiImages | 400x250px | Miniatura optimizada |
| `img2.jpg` | Mikkehouse | 400x250px | Miniatura optimizada |
| `img3.jpg` | Noel_Bauza | 400x250px | Miniatura optimizada |
| `img4.jpg` | Willgard | 400x250px | Miniatura optimizada |
| `img5.jpg` | Willgard | 400x250px | Miniatura optimizada |
| `img6.jpg` | josephwoodall2 | 400x250px | Miniatura optimizada |

**Tratamiento:**
- Versiones completas optimizadas a 1920px de ancho
- Miniaturas redimensionadas a 400x250px para carga rápida
- Formato JPG con compresión optimizada

### 3. Vídeo y Audio de Presentación

**Vídeo:**
- **Fuente:** Pixabay - Autor: spacetrip
- **Duración:** ~10-15 segundos
- **Formato:** MP4 (H.264)
- **Peso final:** < 3 MB
- **Ubicación:** `assets/video/video.mp4`

**Audio:**
- **Duración:** 15 segundos
- **Formato:** MP3 a 128 kbps
- **Ubicación:** `assets/audio/audio.mp3`

### 4. Animación para Botón de Contacto

- **Tipo:** GIF animado
- **Uso:** Botón de contacto interactivo
- **Ubicación:** `assets/img/soporte-telefonico.gif`

---

## 💻 Fase 2: Desarrollo e Interactividad

### 1. Maquetación Base e Integración Multimedia

**HTML5 Semántico:**
- Estructura con etiquetas semánticas: `<header>`, `<main>`, `<section>`, `<footer>`
- Navegación accesible con `<nav>` y atributos `aria-label`
- Todos los elementos multimedia integrados con atributos `alt` descriptivos

**Elementos integrados:**
- Imagen hero con overlay de texto
- Logo SVG en el header
- Vídeo en modal con controles nativos
- Audio con controles en la sección "Sobre MiArma"
- Galería de 6 imágenes con miniaturas

### 2. Estilos y Feedback Visual con CSS

**Sistema de diseño:**
```css
:root {
  --max-width: 1100px;
  --accent: #8ea7ff;
  --bg: #0b0f1a;
  --card: #0f1724;
  --glass: rgba(255, 255, 255, 0.04);
  --radius: 12px;
  --ease: 250ms cubic-bezier(.2, .9, .3, 1);
}
```

**Características de estilo:**
- 🎨 Paleta de colores oscura con acentos azules
- ✨ Efectos glassmorphism y blur
- 🔄 Transiciones suaves en todos los elementos interactivos
- 🎯 Pseudo-clases `:hover`, `:focus`, `:focus-visible` para feedback visual
- 📐 Border-radius consistente para elementos
- 🌊 Gradientes sutiles en fondos

**Elementos interactivos con feedback:**
- Enlaces de navegación con línea animada inferior
- Botones con elevación en hover (`translateY(-3px)`)
- Miniaturas con borde de color acento
- Modal con backdrop blur

### 3. Galería de Imágenes Interactiva (JavaScript)

**Funcionalidad:**
```javascript
// Sistema de intercambio de imágenes
thumbs.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const full = btn.getAttribute("data-full");
    mainImage.src = full;
    mainImage.alt = thumbImg.alt;
  });
});
```

**Características:**
- Click en miniatura reemplaza la imagen principal
- Feedback visual con clase `active` en miniatura seleccionada
- Atributo `aria-busy` durante la carga
- Navegación por teclado soportada

### 4. Modal para el Vídeo (JavaScript)

**Implementación:**
- Botón "Ver Reel" abre modal overlay
- Modal con fondo oscuro semitransparente (backdrop)
- Vídeo con controles nativos HTML5
- Botón de cierre (X) en esquina superior derecha
- Click fuera del contenido cierra el modal
- Tecla ESC cierra el modal

**Accesibilidad:**
```javascript
// Trampa de foco dentro del modal
modal.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    // Mantiene el foco dentro del modal
  }
  if (e.key === "Escape") {
    closeModal();
  }
});
```

**Características:**
- Pausa automática del vídeo al cerrar
- Restauración del foco al elemento que abrió el modal
- Atributos ARIA: `aria-modal="true"`, `aria-hidden`, `role="dialog"`
- Bloqueo de scroll del body cuando el modal está abierto

### 5. Botón de Contacto Animado

**Funcionalidad:**
```javascript
contactBtn.addEventListener("click", () => {
  const email = "ismaelvargasduque14@alumnos.ilerna.com";
  window.location.href = `mailto:${email}?subject=...&body=...`;
});
```

- GIF animado como elemento visual
- Abre cliente de correo con asunto y cuerpo predefinidos
- Efecto hover con elevación

---

## 📜 Licencia y Propiedad Intelectual

### Licencia Elegida para el Proyecto

**Este proyecto está licenciado bajo [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)**

**Creative Commons Atribución-NoComercial-CompartirIgual 4.0 Internacional**

### Justificación de la Elección

He elegido la licencia **CC BY-NC-SA 4.0** por las siguientes razones:

1. **Atribución (BY):** Requiere que cualquier persona que use mi trabajo dé el crédito apropiado, lo cual es justo y promueve el reconocimiento del autor original.

2. **No Comercial (NC):** Protege mi trabajo de ser usado con fines comerciales sin mi permiso. Como proyecto educativo y portfolio personal, quiero mantener control sobre el uso comercial.

3. **Compartir Igual (SA):** Cualquier obra derivada debe compartirse bajo la misma licencia, lo que garantiza que las mejoras o modificaciones permanezcan abiertas y accesibles para la comunidad.

### Análisis de Compatibilidad

**¿Por qué las licencias de los assets permiten usar CC BY-NC-SA 4.0?**

Todos los recursos multimedia utilizados provienen de **Pixabay** con su **Licencia de Contenido Pixabay**, que es equivalente a **CC0 (Dominio Público)**:

- ✅ **Pixabay License:** Permite uso comercial y no comercial, con o sin atribución
- ✅ **CC0 (Dominio Público):** No tiene restricciones, permite cualquier uso
- ✅ **Compatibilidad:** CC0 es compatible con CUALQUIER licencia Creative Commons, incluyendo BY-NC-SA

**Cadena de compatibilidad:**
```
Pixabay (CC0-like) → Permite cualquier licencia
    ↓
Mi proyecto (CC BY-NC-SA 4.0) → ✅ Compatible
```

Como los assets originales no tienen restricciones (CC0), puedo aplicar la licencia que desee a mi obra derivada sin conflictos legales.

### Acreditación de Recursos

Todos los recursos multimedia están debidamente acreditados en la página [`credits.html`](html/credits.html), que incluye:

- Nombre del archivo
- Autor original
- URL de origen
- Tipo de licencia con enlace

**Acceso:** El enlace "Créditos y Licencias" está visible en el footer de todas las páginas.

### Escenario Hipotético: CC BY-SA

**Pregunta:** *"Si una de las imágenes de la galería hubiera tenido una licencia Creative Commons Atribución-CompartirIgual (CC BY-SA), ¿qué licencia estarías obligado a usar para tu landing page? ¿Por qué?"*

**Respuesta:**

Si una imagen tuviera licencia **CC BY-SA**, estaría **obligado** a usar una licencia compatible con ShareAlike para toda mi landing page.

**Opciones compatibles:**
- ✅ **CC BY-SA 4.0** (misma licencia)
- ✅ **CC BY-NC-SA 4.0** (añade restricción NC, compatible con SA)
- ❌ **NO podría usar:** CC BY, CC BY-NC, o licencias sin SA

**Razón:**

La cláusula **ShareAlike (SA)** es "viral" o "copyleft": obliga a que cualquier obra derivada que incorpore el contenido SA se distribuya bajo la misma licencia o una compatible.

**Análisis:**
```
Imagen original: CC BY-SA
    ↓ (incorporada en)
Mi landing page: DEBE ser CC BY-SA o compatible
    ↓
Obras derivadas futuras: TAMBIÉN deben ser CC BY-SA
```

Esto garantiza que el contenido permanezca abierto y libre, pero **limita mi libertad** de elegir licencia. Por ejemplo:

- ❌ No podría añadir restricción NC sin mantener SA
- ❌ No podría usar licencias propietarias
- ❌ No podría eliminar la obligación de compartir igual

**Conclusión:** La cláusula SA es poderosa para mantener el contenido abierto, pero reduce la flexibilidad del creador de obras derivadas. Por eso es importante verificar las licencias antes de incorporar assets externos.

---

## 📁 Estructura de Archivos

```
MiArma/
├── index.html              # Página principal
├── README.md               # Este archivo
├── assets/                 # Recursos multimedia
│   ├── img/               # Imágenes optimizadas
│   │   ├── hero.jpg       # Imagen principal (1920px, <250KB)
│   │   ├── logo.svg       # Logo vectorial
│   │   ├── obraPrincipal.jpg
│   │   ├── img1.jpg       # Miniaturas 400x250px
│   │   ├── img2.jpg
│   │   ├── img3.jpg
│   │   ├── img4.jpg
│   │   ├── img5.jpg
│   │   ├── img6.jpg
│   │   ├── soporte-telefonico.gif  # GIF animado contacto
│   │   └── botonContact.gif
│   ├── video/
│   │   └── video.mp4      # Vídeo H.264, <3MB
│   └── audio/
│       └── audio.mp3      # Audio 128kbps, 15s
├── css/
│   ├── style.css          # Estilos principales y responsive
│   └── credits.css        # Estilos para página de créditos
├── js/
│   └── main.js            # Lógica de galería y modal
└── html/
    └── credits.html       # Página de atribuciones
```

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con variables CSS, flexbox, transiciones
- **JavaScript (Vanilla)** - Interactividad sin frameworks

### Características CSS
- Variables CSS (Custom Properties)
- Flexbox para layouts
- Media queries para responsive design
- Pseudo-clases para interactividad
- Transiciones y transformaciones
- Backdrop-filter (glassmorphism)

### Características JavaScript
- Event listeners (click, keydown)
- DOM manipulation
- Focus management (accesibilidad)
- Modal con trampa de foco
- Navegación por teclado

### Accesibilidad
- Atributos ARIA (`aria-label`, `aria-hidden`, `aria-modal`, `aria-live`)
- Roles semánticos (`role="dialog"`, `role="button"`)
- Navegación por teclado completa
- Focus visible (`:focus-visible`)
- Textos alternativos en todas las imágenes

---

## ✅ Verificación Cross-Browser y Cross-Device

### Navegadores Probados

El sitio ha sido verificado en los siguientes navegadores:

| Navegador | Versión | Estado | Notas |
|-----------|---------|--------|-------|
| **Google Chrome** | 120+ | ✅ Funcional | Todas las características operativas |
| **Mozilla Firefox** | 121+ | ✅ Funcional | Modal, galería y audio funcionan correctamente |
| **Microsoft Edge** | 120+ | ✅ Funcional | Basado en Chromium, compatibilidad completa |

**Funcionalidades verificadas:**
- ✅ Galería interactiva (click en miniaturas)
- ✅ Modal de vídeo (abrir/cerrar con botón, ESC, click fuera)
- ✅ Audio con controles nativos
- ✅ Navegación por teclado (Tab, Enter, ESC)
- ✅ Efectos hover y focus
- ✅ Transiciones CSS
- ✅ Backdrop-filter (glassmorphism)

### Dispositivos y Responsive Design

**Probado con DevTools (F12) en:**

| Dispositivo | Resolución | Estado | Observaciones |
|-------------|------------|--------|---------------|
| **Desktop** | 1920x1080 | ✅ Óptimo | Diseño completo, todas las características |
| **Tablet** | 768x1024 | ✅ Usable | Miniaturas con scroll horizontal |
| **Mobile** | 375x667 | ✅ Usable | Layout adaptado, botones táctiles optimizados |

**Breakpoints CSS:**
```css
@media (max-width: 640px) {
  /* Ajustes para móviles */
}

@media (max-width: 420px) {
  /* Ajustes para pantallas muy pequeñas */
}
```

**Características responsive:**
- 📱 Miniaturas con scroll horizontal en móvil
- 🖼️ Imágenes escalables (max-width: 100%)
- 🎬 Modal adaptado a viewport pequeño
- 👆 Áreas táctiles de 44x44px mínimo (accesibilidad móvil)
- 📐 Padding y márgenes ajustados por breakpoint

---

## 🚀 Instalación y Uso

### Requisitos Previos
- Navegador web moderno (Chrome, Firefox, Edge)
- No requiere servidor web (puede abrirse localmente)

### Instalación

1. **Clonar o descargar el proyecto:**
   ```bash
   git clone [<repository-url>](https://github.com/AngelRagel05/MiArma)
   cd MiArma
   ```

2. **Abrir en navegador:**
   - Opción 1: Doble click en `index.html`
   - Opción 2: Usar servidor local (recomendado):
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Node.js (con npx)
     npx serve
     ```
   - Navegar a `http://localhost:8000`

### Uso

1. **Navegación:**
   - Usa el menú superior para navegar entre secciones
   - Click en "Créditos" en el footer para ver atribuciones

2. **Galería:**
   - Click en cualquier miniatura para ver la imagen completa
   - Las imágenes se intercambian en el visor principal

3. **Vídeo:**
   - Click en "Ver Reel" para abrir el modal
   - Usa los controles del vídeo o presiona ESC para cerrar

4. **Contacto:**
   - Click en el botón animado para abrir tu cliente de correo

---

## 📝 Notas Adicionales

### Optimizaciones Implementadas

- ✅ Imágenes optimizadas para web (<250KB hero, miniaturas ligeras)
- ✅ Vídeo comprimido H.264 (<3MB)
- ✅ Audio optimizado a 128kbps
- ✅ SVG para logo (escalable, sin pérdida de calidad)
- ✅ Lazy loading considerado para imágenes (atributo `loading="lazy"`)

### Accesibilidad (WCAG 2.1)

- ✅ Contraste de colores adecuado
- ✅ Navegación por teclado completa
- ✅ Textos alternativos descriptivos
- ✅ Atributos ARIA para tecnologías asistivas
- ✅ Focus visible en todos los elementos interactivos
- ✅ Áreas táctiles mínimas de 44x44px

### Rendimiento

- ✅ CSS minificado en producción (recomendado)
- ✅ JavaScript sin dependencias externas
- ✅ Carga asíncrona de scripts (`defer`)
- ✅ Imágenes optimizadas en formato/tamaño

---

## 👤 Autores

**MiArma** - Artista Digital  
[Ismael Vargas Duque](https://github.com/IsmaVargass)  
[Ángel Jiménez Ragel](https://github.com/AngelRagel05)

---

## 📄 Licencia

Este proyecto está licenciado bajo **CC BY-NC-SA 4.0** - ver la sección [Licencia y Propiedad Intelectual](#-licencia-y-propiedad-intelectual) para más detalles.

[![CC BY-NC-SA 4.0](https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

**Creative Commons Atribución-NoComercial-CompartirIgual 4.0 Internacional**

---

**Última actualización:** Noviembre 2025