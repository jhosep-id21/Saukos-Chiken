/* ==========================================================================
   SAUKOS CHIKEN - SISTEMA DE CARRITO Y PEDIDOS DIRECTO A WHATSAPP
   ========================================================================== */

const SAUKOS_PHONE = "51987654321"; // Reemplazar con el número oficial de Saukos Chiken

// Catálogo maestro de productos
const MENU_PRODUCTS = [
  {
    id: "p1",
    name: "1 Pollo a la Brasa Saukos Tradicional",
    category: "brasas",
    price: 68.00,
    oldPrice: 76.00,
    desc: "1 Pollo marinado con 14 hierbas andinas horneado a leña + crocantes papas fritas peruanas + ensalada clásica + salsas de la casa.",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=700&q=80",
    badge: "Más Pedido",
    popular: true
  },
  {
    id: "p2",
    name: "1/2 Pollo a la Brasa Clásico",
    category: "brasas",
    price: 38.00,
    oldPrice: 42.00,
    desc: "Medio pollo a las brasas de carbón y leña + generosa porción de papas fritas + ensalada fresca + ají pollero y vinagreta.",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=700&q=80",
    badge: "Recomendado",
    popular: true
  },
  {
    id: "p3",
    name: "1/4 de Pollo a la Brasa Personal",
    category: "brasas",
    price: 22.00,
    oldPrice: null,
    desc: "Pierna con encuentro o pecho con ala al gusto + papas fritas doradas + ensalada personal + ají y cremas de autor.",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=700&q=80",
    badge: "Personal",
    popular: false
  },
  {
    id: "p4",
    name: "Mega Combo Saukos Familiar",
    category: "combos",
    price: 89.90,
    oldPrice: 108.00,
    desc: "1 Pollo a la brasa entero + papas familiares + ensalada grande + 1 Jarra de Chicha Morada artesanal (1.5L) + 6 Tequeños a la brasa.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=700&q=80",
    badge: "Super Ahorro",
    popular: true
  },
  {
    id: "p5",
    name: "Dúo Brasero Pareja",
    category: "combos",
    price: 49.50,
    oldPrice: 58.00,
    desc: "1/2 Pollo a la brasa + papas fritas + 4 alitas en salsa BBQ ahumada + ensalada + 2 gaseosas o chichas personales.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80",
    badge: "Para 2",
    popular: true
  },
  {
    id: "p6",
    name: "Gran Parrilla Mixta Saukos",
    category: "parrillas",
    price: 64.00,
    oldPrice: 74.00,
    desc: "1/4 de pollo a la brasa + 2 palos de anticucho de corazón tiernos + chuleta parrillera + chorizo artesanal + papas doradas y choclo.",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=700&q=80",
    badge: "Parrillero",
    popular: false
  },
  {
    id: "p7",
    name: "Anticuchos Tradicionales (3 Palos)",
    category: "parrillas",
    price: 29.00,
    oldPrice: null,
    desc: "Corazón de res macerado en ají panca y especias a fuego vivo, acompañado de rodajas de papa dorada y choclo tierno desgranado.",
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=700&q=80",
    badge: "Especialidad",
    popular: false
  },
  {
    id: "p8",
    name: "Alitas Saukos x12 (BBQ / Acevichadas)",
    category: "broaster",
    price: 36.00,
    oldPrice: 42.00,
    desc: "12 alitas crocantes bañadas a elección entre salsa BBQ ahumada a la leña, Maracuyá picante o Acevichada cremosa + papas fritas.",
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=700&q=80",
    badge: "Crujiente",
    popular: true
  },
  {
    id: "p9",
    name: "Festín Broaster Saukos (4 Piezas)",
    category: "broaster",
    price: 34.00,
    oldPrice: null,
    desc: "4 presas de pollo extra crocantes con empanizado secreto de especias + papas fritas onduladas + ensalada de col agridulce + cremas.",
    image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=700&q=80",
    badge: "Broaster",
    popular: false
  },
  {
    id: "p10",
    name: "Chicha Morada Artesanal (1.5 Litros)",
    category: "bebidas",
    price: 15.00,
    oldPrice: null,
    desc: "Preparada a diario con maíz morado selecto, piña golden, manzana, membrillo, canela, clavo de olor y toque de limón.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80",
    badge: "Casera",
    popular: false
  },
  {
    id: "p11",
    name: "Porción Familiar de Papas Nativas",
    category: "guarniciones",
    price: 16.00,
    oldPrice: null,
    desc: "Generosa porción de papas peruanas seleccionadas, fritas al punto exacto con piel dorada y corazón suave y arenoso.",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80",
    badge: "Guarnición",
    popular: false
  },
  {
    id: "p12",
    name: "Tequeños Rellenos de Pollo a la Brasa (8 Und)",
    category: "guarniciones",
    price: 21.00,
    oldPrice: null,
    desc: "Masa wantán crocante rellena de jugoso pollo a la brasa deshilachado con queso fundido, servidos con guacamole y salsa tártara.",
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=700&q=80",
    badge: "Entrada",
    popular: false
  }
];

// Estado del Carrito
class SaukosCart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('saukos_cart') || '[]');
    this.init();
  }

  init() {
    this.updateBadge();
    this.renderDrawer();
  }

  save() {
    localStorage.setItem('saukos_cart', JSON.stringify(this.items));
    this.updateBadge();
    this.renderDrawer();
  }

  addItem(productId) {
    const product = MENU_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = this.items.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      this.items[existingIndex].quantity += 1;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }

    this.save();
    window.showToast?.(`¡"${product.name}" agregado al pedido!`, 'success');
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.save();
    window.showToast?.('Producto eliminado del pedido', 'info');
  }

  changeQty(productId, delta) {
    const item = this.items.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeItem(productId);
    } else {
      this.save();
    }
  }

  clear() {
    this.items = [];
    this.save();
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  updateBadge() {
    const count = this.getCount();
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'flex' : 'none';
    });
    const mobileBadges = document.querySelectorAll('.cart-badge-mobile');
    mobileBadges.forEach(b => {
      b.textContent = count;
    });
  }

  renderDrawer() {
    const drawerBody = document.getElementById('cartDrawerBody');
    const subtotalEl = document.getElementById('cartSubtotal');
    const totalEl = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('cartCheckoutBtn');

    if (!drawerBody) return;

    if (this.items.length === 0) {
      drawerBody.innerHTML = `
        <div class="cart-empty-state">
          <i class="fa-solid fa-drumstick-bite"></i>
          <h4>Tu carrito está vacío</h4>
          <p>Explora nuestra carta y agrega tu pollo a la brasa o promo favorita.</p>
          <a href="#carta" class="btn btn-gold btn-sm" onclick="window.toggleCart(false)" style="margin-top: 1rem;">
            Ver la Carta
          </a>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = 'S/ 0.00';
      if (totalEl) totalEl.textContent = 'S/ 0.00';
      if (checkoutBtn) checkoutBtn.disabled = true;
      return;
    }

    let html = '';
    this.items.forEach(item => {
      const itemSubtotal = (item.price * item.quantity).toFixed(2);
      html += `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-price">S/ ${item.price.toFixed(2)} c/u</div>
            <div class="cart-qty-ctrl">
              <button class="qty-btn" onclick="saukosCart.changeQty('${item.id}', -1)">-</button>
              <span style="font-weight: 700; font-size: 0.85rem; min-width: 20px; text-align: center;">${item.quantity}</span>
              <button class="qty-btn" onclick="saukosCart.changeQty('${item.id}', 1)">+</button>
              <span style="margin-left: auto; font-weight: 800; font-size: 0.95rem; color: var(--primary-gold);">S/ ${itemSubtotal}</span>
            </div>
          </div>
          <button class="cart-item-remove" onclick="saukosCart.removeItem('${item.id}')" title="Quitar">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      `;
    });

    drawerBody.innerHTML = html;
    const total = this.getTotal().toFixed(2);
    if (subtotalEl) subtotalEl.textContent = `S/ ${total}`;
    if (totalEl) totalEl.textContent = `S/ ${total}`;
    if (checkoutBtn) checkoutBtn.disabled = false;
  }

  // Genera el pedido formal formateado a WhatsApp
  sendWhatsAppOrder(clientData) {
    if (this.items.length === 0) {
      alert("Por favor agrega al menos un plato a tu pedido.");
      return;
    }

    const { name, phone, orderType, address, reference, paymentMethod, notes } = clientData;
    const total = this.getTotal().toFixed(2);

    let message = `🍗 *¡NUEVO PEDIDO DESDE LA WEB - SAUKOS CHIKEN!* 🍗\n\n`;
    message += `👤 *Cliente:* ${name || 'Cliente Saukos'}\n`;
    message += `📱 *Teléfono:* ${phone || 'No especificado'}\n`;
    message += `🛵 *Modalidad:* ${orderType === 'delivery' ? 'Delivery a Domicilio' : 'Recojo en Tienda'}\n`;
    
    if (orderType === 'delivery') {
      message += `📍 *Dirección:* ${address}\n`;
      if (reference) message += `🧭 *Referencia:* ${reference}\n`;
    }
    
    message += `💳 *Método de Pago:* ${paymentMethod}\n`;
    if (notes) message += `📝 *Indicaciones/Cremas:* ${notes}\n`;
    
    message += `\n🛒 *DETALLE DEL PEDIDO:*\n`;
    message += `--------------------------------\n`;
    
    this.items.forEach((item, index) => {
      const sub = (item.price * item.quantity).toFixed(2);
      message += `${index + 1}. *${item.name}* x${item.quantity} = S/ ${sub}\n`;
    });
    
    message += `--------------------------------\n`;
    message += `💰 *TOTAL A PAGAR: S/ ${total}*\n\n`;
    message += `🔥 *Saukos Chiken:* ¡Por favor confírmenme el tiempo estimado de entrega!`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${SAUKOS_PHONE}?text=${encoded}`;
    
    window.open(whatsappUrl, '_blank');
  }
}

// Instancia global del carrito
const saukosCart = new SaukosCart();
window.saukosCart = saukosCart;
