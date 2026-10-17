# 🍗 Saukos Chiken — Pollos & Parrillas a la Leña y Carbón

Plataforma web corporativa y sistema de pedidos en línea para **Saukos Chiken**, pollería y restaurante peruano especializado en el auténtico pollo a la brasa marinado con 14 hierbas andinas, fuego de leña y carbón de algarrobo, papas nativas doradas y cremas artesanales.

---

## 📌 Descripción del Proyecto

El sitio web de **Saukos Chiken** está diseñado como una plataforma interactiva, responsiva y de carga ultra-rápida orientada a la conversión de ventas mediante atención directa por WhatsApp, combinando presencia de marca corporativa, comercio electrónico ligero y cumplimiento normativo legal peruano (INDECOPI).

El usuario puede explorar toda la carta gastronómica, filtrar por categorías, armar su pedido en un carrito de compras en tiempo real y enviarlo directamente formateado al WhatsApp del restaurante con todos los datos necesarios para delivery o recojo en tienda.

---

## ✨ Características Principales

### 🛒 1. Catálogo Dinámico & Carrito de Compras
* **Filtrado por Categorías:** Clasificación por *Pollos a la Brasa*, *Combos & Promos*, *Parrillas & Anticuchos*, *Broaster & Alitas*, *Guarniciones & Entradas* y *Bebidas & Chicha*.
* **Barra de chips táctil:** En móviles, la barra de filtros se desplaza horizontalmente de forma suave, similar a apps de delivery (Rappi, PedidosYa).
* **Carrito Interactivo (Drawer):** Panel lateral deslizable para añadir, aumentar/disminuir cantidades, eliminar productos y visualizar el subtotal y total en tiempo real.

### 📲 2. Sistema de Checkout directo a WhatsApp (Click-to-Chat)
* Modal ergonómico para registrar:
  * Nombre y teléfono del comensal.
  * Tipo de entrega: *Delivery a Domicilio* o *Recojo en Tienda*.
  * Dirección de entrega y punto de referencia.
  * Método de pago: *Efectivo*, *Yape / Plin* o *Tarjeta POS*.
  * Notas especiales y preferencias de salsas / cremas.
* Genera automáticamente un mensaje estructurado y codificado enviado al WhatsApp oficial del restaurante (`+51 941 188 724`).

### 📱 3. Diseño 100% Responsivo & Optimizado
* Adaptado con media queries para monitores grandes, laptops, tablets (iPad) y teléfonos móviles (desde pantallas ultra compactas de 320px como iPhone SE hasta smartphones modernos).
* Barra flotante inferior de acceso rápido (`.mobile-sticky-bar`) con botón directo a la Carta, Carrito de Pedidos y WhatsApp.
* Botón flotante pulsante de WhatsApp con espacio de seguridad para dispositivos con muesca o barra gestual iOS (`safe-area-inset-bottom`).

### 🏛️ 4. Cumplimiento Legal e Información Institucional
* **[Libro de Reclamaciones Virtual](libro-de-reclamaciones.html):** Plataforma virtual oficial conforme a la Ley N° 29571 y D.S. N° 011-2011-PCM de INDECOPI, con formulario de Hoja de Reclamación (Reclamo / Queja) y generación de constancia digital.
* **[Políticas & Términos](politicas.html):** Documentación sobre Política de Privacidad, Tratamiento de Datos Personales (Ley N° 29733) y Términos y Condiciones de uso del servicio.
* **[Blog Gastronómico](blog.html):** Artículos y notas sobre la cultura del pollo a la brasa, secretos del marinado andino, el ají pollero y la papa nativa peruana, con caja de suscripción a promociones.

---

## 📂 Estructura de Archivos

```plaintext
Polleria_SaukoChiken/
│
├── index.html                    # Página principal / Landing corporativa y Carta interactiva
├── blog.html                     # Revista culinaria y artículos sobre brasas peruanas
├── libro-de-reclamaciones.html   # Libro de Reclamaciones virtual conforme a INDECOPI
├── politicas.html                # Políticas de privacidad y protección de datos
├── .gitignore                    # Reglas de exclusión de archivos temporales de Git
├── README.md                     # Documentación general del proyecto
│
├── css/
│   └── style.css                 # Estilos globales, paleta corporativa y diseño responsivo
│
├── js/
│   ├── cart.js                   # Catálogo maestro de productos, carrito de compras y WhatsApp
│   └── main.js                   # Control de navegación, menú hamburguesa, filtros y modales
│
└── assets/
    └── images/                   # Logotipos, insignias, favicons y recursos gráficos
```

---

## 🛠️ Tecnologías Empleadas

* **HTML5 Semántico:** Estructura limpia y accesible orientada al posicionamiento SEO local y metaetiquetas Open Graph para redes sociales.
* **CSS3 Moderno:** Variables nativas (`:root`), Flexbox, CSS Grid adaptable (`minmax`), tipografía fluida (`clamp()`) y soporte para alturas dinámicas (`100dvh`).
* **JavaScript Vanilla (ES6+):** Código modular nativo sin librerías pesadas (cero dependencias externas para garantizar máxima velocidad de carga).
* **Font Awesome 6.5.1:** Iconografía vectorial para menús, botones y componentes.
* **Google Fonts:** Tipografías corporativas *Montserrat* (títulos) y *Poppins* (lectura).

---

## 🚀 Cómo Ejecutar el Proyecto Localmente

Al ser un proyecto estático sin dependencias obligatorias de servidor, puedes ejecutarlo de varias maneras:

### Opción 1: Apertura directa
1. Descarga o clona el repositorio.
2. Haz doble clic en `index.html` para abrirlo en cualquier navegador web moderno (Chrome, Edge, Firefox, Safari).

### Opción 2: Con un servidor local ligero
Si utilizas **Visual Studio Code**:
* Instala la extensión **Live Server** y haz clic derecho en `index.html` -> *"Open with Live Server"*.

O mediante la terminal usando **Python**:
```bash
# Con Python 3
python -m http.server 8000
```
Luego ingresa a `http://localhost:8000` en tu navegador.

O usando **Node.js (npx)**:
```bash
npx serve
```

---

## 🏢 Información de la Empresa

* **Razón Social:** SAUKOS CHIKEN S.A.C.
* **RUC:** --------------
* **Teléfono / WhatsApp:** [+51 999 999 999](https://wa.me/51999999999)
* **Dirección:** Av. Los Libertadores 1420, Cajamarca-Perú
* **Horario de Atención:** Lunes a Domingo de 11:30 AM a 11:00 PM
