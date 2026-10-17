/* ==========================================================================
   SAUKOS CHIKEN - SCRIPT PRINCIPAL & INTERACCIONES
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  renderMenuGrid('all');
  initFilterButtons();
  initFAQ();
  initDeliveryCalculator();
  initContactForm();
  initCartCheckoutModal();
});

// 1. BARRA DE NAVEGACIÓN & RESPONSIVE
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = hamburger.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    // Cerrar al dar click en un enlace
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }
}

// 2. RENDERIZADO DE LA CARTA & FILTROS
function renderMenuGrid(category = 'all') {
  const grid = document.getElementById('menuGrid');
  if (!grid || typeof MENU_PRODUCTS === 'undefined') return;

  const filtered = category === 'all' 
    ? MENU_PRODUCTS 
    : MENU_PRODUCTS.filter(p => p.category === category);

  grid.innerHTML = filtered.map(item => `
    <article class="dish-card" data-category="${item.category}">
      <div class="dish-img-wrap">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <span class="dish-badge ${item.badge === 'Super Ahorro' ? 'promo' : ''}">
          ${item.badge}
        </span>
      </div>
      <div class="dish-content">
        <div class="dish-header">
          <h3 class="dish-title">${item.name}</h3>
          <div class="dish-price">S/ ${item.price.toFixed(2)}</div>
        </div>
        <p class="dish-desc">${item.desc}</p>
        <div class="dish-features">
          <span class="dish-pill"><i class="fa-solid fa-fire text-orange"></i> Carbón & Leña</span>
          <span class="dish-pill"><i class="fa-solid fa-clock text-gold"></i> Recién Hecho</span>
          <span class="dish-pill"><i class="fa-solid fa-pepper-hot text-red"></i> Con Cremas</span>
        </div>
        <div class="dish-footer">
          <button class="btn btn-gold btn-sm" onclick="saukosCart.addItem('${item.id}')">
            <i class="fa-solid fa-cart-plus"></i> Agregar
          </button>
          <button class="btn btn-whatsapp btn-sm" onclick="quickWhatsAppOrder('${item.id}')" title="Pedir este plato directamente a WhatsApp">
            <i class="fa-brands fa-whatsapp"></i> Pedir
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

function initFilterButtons() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');
      renderMenuGrid(cat);
    });
  });
}

function quickWhatsAppOrder(productId) {
  const product = MENU_PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const msg = `¡Hola Saukos Chiken! 🔥 Quiero pedir: *${product.name}* (S/ ${product.price.toFixed(2)}). ¿Tienen disponibilidad inmediata para delivery o recojo?`;
  const url = `https://wa.me/${SAUKOS_PHONE}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}
window.quickWhatsAppOrder = quickWhatsAppOrder;

// 3. CONTROL DEL DRAWER DEL CARRITO
window.toggleCart = function(forceState) {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartDrawerOverlay');
  if (!drawer || !overlay) return;

  const isActive = drawer.classList.contains('active');
  const targetState = forceState !== undefined ? forceState : !isActive;

  if (targetState) {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
};

// 4. MODAL DE FINALIZACIÓN DE PEDIDO
function initCartCheckoutModal() {
  const checkoutBtn = document.getElementById('cartCheckoutBtn');
  const modal = document.getElementById('checkoutModal');
  const closeBtn = document.getElementById('closeCheckoutModalBtn');
  const form = document.getElementById('checkoutForm');
  const orderTypeSelect = document.getElementById('modalOrderType');
  const addressGroup = document.getElementById('modalAddressGroup');

  if (checkoutBtn && modal) {
    checkoutBtn.addEventListener('click', () => {
      window.toggleCart(false);
      modal.style.display = 'flex';
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  // Cerrar al click afuera
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Mostrar u ocultar dirección según tipo
  if (orderTypeSelect && addressGroup) {
    orderTypeSelect.addEventListener('change', () => {
      if (orderTypeSelect.value === 'recojo') {
        addressGroup.style.display = 'none';
        const addrInput = addressGroup.querySelector('input');
        if (addrInput) addrInput.removeAttribute('required');
      } else {
        addressGroup.style.display = 'block';
        const addrInput = addressGroup.querySelector('input');
        if (addrInput) addrInput.setAttribute('required', 'true');
      }
    });
  }

  // Procesar envío de formulario hacia WhatsApp
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const clientData = {
        name: document.getElementById('checkoutName')?.value || '',
        phone: document.getElementById('checkoutPhone')?.value || '',
        orderType: document.getElementById('modalOrderType')?.value || 'delivery',
        address: document.getElementById('checkoutAddress')?.value || '',
        reference: document.getElementById('checkoutReference')?.value || '',
        paymentMethod: document.getElementById('checkoutPayment')?.value || 'Yape/Plin',
        notes: document.getElementById('checkoutNotes')?.value || ''
      };

      saukosCart.sendWhatsAppOrder(clientData);
      modal.style.display = 'none';
      showToast('¡Redirigiendo a WhatsApp con tu pedido!', 'success');
    });
  }
}

// 5. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// 6. CALCULADORA DE ZONAS DE DELIVERY
function initDeliveryCalculator() {
  const select = document.getElementById('zoneSelect');
  const resultBox = document.getElementById('zoneResult');

  const zoneRates = {
    "centro": { time: "25-35 min", cost: "Gratis (o S/ 3.00)", note: "Cobertura express prioritaria a 5 minutos del local." },
    "norte": { time: "30-45 min", cost: "S/ 5.00", note: "Reparto en caja térmica sellada garantizando calor de brasa." },
    "sur": { time: "35-50 min", cost: "S/ 6.00", note: "Envío directo en moto propia con seguimiento por WhatsApp." },
    "este": { time: "40-50 min", cost: "S/ 7.00", note: "Cobertura completa hasta la última cuadra." },
    "especial": { time: "A coordinar", cost: "A cotizar", note: "Para eventos y grandes pedidos corporativos con transporte dedicado." }
  };

  if (select && resultBox) {
    select.addEventListener('change', () => {
      const val = select.value;
      if (!val || !zoneRates[val]) {
        resultBox.innerHTML = `<p style="color: var(--text-dim);">Selecciona una zona para consultar cobertura, tiempos y costo estimado de envío.</p>`;
        return;
      }

      const z = zoneRates[val];
      resultBox.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <strong style="color: var(--primary-gold); font-size: 1rem;">Zona Seleccionada: ${select.options[select.selectedIndex].text}</strong>
          <span style="background: var(--primary-red); color: #fff; font-size: 0.75rem; padding: 0.2rem 0.6rem; border-radius: 99px;">
            ${z.time}
          </span>
        </div>
        <p style="font-size: 0.88rem; color: var(--text-light); margin-bottom: 0.3rem;">
          <strong>Costo de Delivery:</strong> ${z.cost}
        </p>
        <p style="font-size: 0.8rem; color: var(--text-muted);">
          <i class="fa-solid fa-circle-check text-green" style="color: var(--accent-green); margin-right: 0.3rem;"></i>
          ${z.note}
        </p>
      `;
    });
  }
}

// 7. FORMULARIO DE CONTACTO RÁPIDO & RESERVAS
function initContactForm() {
  const form = document.getElementById('quickContactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]')?.value || '';
    const phone = form.querySelector('[name="phone"]')?.value || '';
    const message = form.querySelector('[name="message"]')?.value || '';

    // Enviar a WhatsApp o mostrar confirmación
    const text = `¡Hola Saukos Chiken! 👋 Soy ${name} (Tel: ${phone}). ${message}`;
    const url = `https://wa.me/${SAUKOS_PHONE}?text=${encodeURIComponent(text)}`;
    
    showToast('¡Gracias por tu mensaje! Te contactaremos al instante.', 'success');
    window.open(url, '_blank');
    form.reset();
  });
}

// 8. SISTEMA GLOBAL DE NOTIFICACIONES TOAST
window.showToast = function(message, type = 'gold') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let icon = '<i class="fa-solid fa-bell text-gold"></i>';
  if (type === 'success') {
    icon = '<i class="fa-solid fa-circle-check" style="color: var(--accent-green);"></i>';
  } else if (type === 'error') {
    icon = '<i class="fa-solid fa-triangle-exclamation text-red"></i>';
  }

  toast.innerHTML = `${icon} <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
};
