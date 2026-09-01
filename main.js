/* ==========================================================
   Lo de Tito — lógica de la tienda (JS vainilla, sin build)
   ========================================================== */

/* ---------- Datos ---------- */
const SECTIONS = [
  { id: "ofertas", title: "Ofertas", subtitle: "Precios que bajan esta semana, mientras dure el stock." },
  { id: "tendencia", title: "Tendencia", subtitle: "Lo que más se está llevando la gente por estos días." },
  { id: "papa", title: "Regalos para papá", subtitle: "Ideas con onda para el papá que no pide nada." },
];

const PRODUCTS = [
  // Ofertas
  { id: 1, section: "ofertas", name: "Mochila urbana Nórdica", price: 52000, originalPrice: 74000, discount: 30, description: "Mochila de lona resistente al agua con compartimento acolchado para notebook de hasta 15”. Cierres YKK y bolsillo lateral para termo." },
  { id: 2, section: "ofertas", name: "Zapatillas running Aire", price: 41000, originalPrice: 74500, discount: 45, description: "Entresuela de espuma liviana pensada para asfalto. Malla transpirable y suela con tracción multidireccional." },
  { id: 3, section: "ofertas", name: "Auriculares inalámbricos Eco", price: 28000, originalPrice: 56000, discount: 50, description: "Bluetooth 5.3, cancelación de ruido pasiva y 30 horas de batería con el estuche de carga incluido." },
  { id: 4, section: "ofertas", name: "Billetera de cuero Trenzado", price: 19500, originalPrice: 26000, discount: 25, description: "Cuero vacuno curtido al tanino con trenzado artesanal. Ocho tarjeteros y compartimento para monedas." },
  { id: 5, section: "ofertas", name: "Campera rompeviento Tundra", price: 45500, originalPrice: 70000, discount: 35, description: "Tela cortaviento con costuras selladas y capucha desmontable. Se guarda en su propio bolsillo frontal." },
  { id: 6, section: "ofertas", name: "Reloj digital Vector", price: 33000, originalPrice: 55000, discount: 40, description: "Sumergible hasta 50 metros, cronómetro y luz nocturna. Malla de silicona antialérgica." },

  // Tendencia
  { id: 7, section: "tendencia", name: "Gorra técnica Sendero", price: 15800, description: "Gorra de seis paneles con tela repelente al agua y visera curva prearmada. Cierre trasero ajustable." },
  { id: 8, section: "tendencia", name: "Buzo oversize Bruma", price: 34200, description: "Algodón frisado de 380 gramos con corte oversize. Puños y cintura acanalados para mayor abrigo." },
  { id: 9, section: "tendencia", name: "Lentes de sol Horizonte", price: 26900, description: "Marco de acetato liviano con protección UV400 y lentes polarizadas antirreflejo." },
  { id: 10, section: "tendencia", name: "Cinturón reversible Dos Caras", price: 17400, description: "Un mismo cinturón, dos colores: girá la hebilla y cambiá de cuero negro a marrón en segundos." },
  { id: 11, section: "tendencia", name: "Termo acero Andes", price: 21300, description: "Acero inoxidable de doble pared al vacío. Mantiene la temperatura hasta 12 horas, pico cebador incluido." },
  { id: 12, section: "tendencia", name: "Riñonera urbana Cruce", price: 18700, description: "Cruza el pecho o la cintura. Compartimento acolchado para celular y salida para auriculares." },

  // Regalos para papá
  { id: 13, section: "papa", name: "Set de mate Completo", price: 29900, description: "Mate de calabaza forrado en cuero, bombilla de alpaca y termo de un litro, todo en su bolso de transporte." },
  { id: 14, section: "papa", name: "Kit de asado Parrillero", price: 38500, description: "Cuchillo, chaira, tenedor y pinzas con mango de madera de guayubira, presentados en estuche de lona." },
  { id: 15, section: "papa", name: "Combo Clásico cuero", price: 31200, description: "Billetera y cinturón a juego en cuero legítimo marrón, con caja de regalo lista para entregar." },
  { id: 16, section: "papa", name: "Navaja multiuso Explorador", price: 22600, description: "Doce funciones en acero inoxidable: hoja, sacacorchos, destornilladores y más, con cuerpo de acero cepillado." },
  { id: 17, section: "papa", name: "Camisa lino Relax", price: 36700, description: "Lino 100% transpirable de calce holgado, ideal para los mediodías de calor. Lavado a máquina sin problema." },
  { id: 18, section: "papa", name: "Grill portátil Fogón", price: 47800, description: "Parrilla plegable a carbón con patas plegables y bolso de traslado. Arma un asado en cualquier lado." },
];

/* ---------- Estado ---------- */
const state = {
  cart: {}, // { [productId]: qty }
  favorites: new Set(),
  panelView: null, // null | "cart" | "favorites"
  modalProductId: null,
  modalActiveShot: 0,
};

/* ---------- Utilidades ---------- */
const formatPrice = (n) => `$${n.toLocaleString("es-AR")}`;

// Fotos de reemplazo (aleatorias pero fijas por producto). Reemplazar por
// las fotos reales del producto cuando estén disponibles.
function photoUrl(id, variant = 0) {
  return `https://picsum.photos/seed/tito-${id}-${variant}/600/600`;
}

const ICONS = {
  heart: (active) => `
    <svg viewBox="0 0 24 24" fill="${active ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
      <path d="M12 20s-7-4.35-9.5-8.5C1 8 2.5 4.5 6 4.5c2 0 3.5 1.2 4 2.5.5-1.3 2-2.5 4-2.5 3.5 0 5 3.5 3.5 7C19 15.65 12 20 12 20z"></path>
    </svg>`,
  cart: () => `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.9h9.7a2 2 0 0 0 2-1.6L23 6H6"></path>
    </svg>`,
  plus: () => `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" class="w-3.5 h-3.5">
      <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>`,
  minus: () => `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" class="w-3.5 h-3.5">
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>`,
};

/* ---------- Render: cards de producto y carruseles ---------- */
function cardTemplate(p) {
  const isFav = state.favorites.has(p.id);
  return `
    <div class="shrink-0 w-48 sm:w-56 snap-start">
      <div class="product-card bg-white rounded-2xl overflow-hidden border border-[#E7E2D7] cursor-pointer transition-shadow hover:shadow-lg" data-id="${p.id}">
        <div class="relative aspect-square">
          <img src="${photoUrl(p.id)}" alt="${p.name}" loading="lazy" class="w-full h-full object-cover" />
          ${p.discount ? `<span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white bg-reddis">-${p.discount}% OFF</span>` : ""}
        </div>
        <div class="p-4">
          <h3 class="text-sm font-medium leading-snug mb-1">${p.name}</h3>
          <div class="flex items-baseline gap-2 mb-3">
            <span class="font-semibold">${formatPrice(p.price)}</span>
            ${p.originalPrice ? `<span class="text-xs line-through text-muted">${formatPrice(p.originalPrice)}</span>` : ""}
          </div>
          <div class="flex items-center justify-end gap-2">
            <button class="favorite-btn w-9 h-9 rounded-full border border-[#E7E2D7] flex items-center justify-center ${isFav ? "text-rust" : "text-muted"}" data-id="${p.id}" aria-label="Marcar como favorito">
              ${ICONS.heart(isFav)}
            </button>
            <button class="add-cart-btn w-9 h-9 rounded-full bg-ink flex items-center justify-center text-white" data-id="${p.id}" aria-label="Agregar al carrito">
              ${ICONS.cart()}
            </button>
          </div>
        </div>
      </div>
    </div>`;
}

function renderSections() {
  SECTIONS.forEach((section) => {
    const track = document.querySelector(`[data-section="${section.id}"] .carousel-track`);
    const products = PRODUCTS.filter((p) => p.section === section.id);
    track.innerHTML = products.map(cardTemplate).join("");
  });
}

function scrollCarousel(track, dir) {
  track.scrollBy({ left: dir * 260, behavior: "smooth" });
}

/* ---------- Favoritos ---------- */
function toggleFavorite(id) {
  if (state.favorites.has(id)) {
    state.favorites.delete(id);
  } else {
    state.favorites.add(id);
  }
  updateFavoriteButtons(id);
  if (state.panelView === "favorites") renderSidePanel();
  if (state.modalProductId === id) updateModalFavoriteButton();
}

function updateFavoriteButtons(id) {
  const isFav = state.favorites.has(id);
  document.querySelectorAll(`.favorite-btn[data-id="${id}"]`).forEach((btn) => {
    btn.classList.toggle("text-rust", isFav);
    btn.classList.toggle("text-muted", !isFav);
    btn.innerHTML = ICONS.heart(isFav);
  });
}

/* ---------- Carrito ---------- */
function addToCart(id) {
  state.cart[id] = (state.cart[id] || 0) + 1;
  updateCartBadge();
  if (state.panelView === "cart") renderSidePanel();
}

function decrementCart(id) {
  if (!state.cart[id]) return;
  state.cart[id] -= 1;
  if (state.cart[id] <= 0) delete state.cart[id];
  updateCartBadge();
  if (state.panelView === "cart") renderSidePanel();
}

function updateCartBadge() {
  const count = Object.values(state.cart).reduce((a, b) => a + b, 0);
  const badge = document.getElementById("cartCount");
  badge.textContent = count;
  badge.classList.toggle("hidden", count === 0);
}

/* ---------- Panel lateral (carrito / favoritos) ---------- */
function openSidePanel(view) {
  state.panelView = view;
  document.getElementById("sidePanelTitle").textContent = view === "favorites" ? "Mis favoritos" : "Tu carrito";
  renderSidePanel();

  document.getElementById("sidePanelRoot").classList.remove("pointer-events-none");
  document.getElementById("sidePanelOverlay").classList.remove("opacity-0", "pointer-events-none");
  document.getElementById("sidePanelPanel").classList.remove("translate-x-full");
}

function closeSidePanel() {
  state.panelView = null;
  document.getElementById("sidePanelOverlay").classList.add("opacity-0", "pointer-events-none");
  document.getElementById("sidePanelPanel").classList.add("translate-x-full");
  document.getElementById("sidePanelRoot").classList.add("pointer-events-none");
}

function favoriteRowTemplate(p) {
  return `
    <div class="flex gap-3">
      <div class="w-16 h-16 rounded-xl overflow-hidden shrink-0">
        <img src="${photoUrl(p.id)}" alt="${p.name}" class="w-full h-full object-cover" />
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium truncate">${p.name}</p>
        <p class="text-sm mb-2 text-muted">${formatPrice(p.price)}</p>
        <div class="flex items-center gap-2">
          <button class="panel-add-cart-btn text-xs px-3 py-1.5 rounded-full text-white font-medium bg-ink" data-id="${p.id}">Agregar al carrito</button>
          <button class="panel-remove-fav-btn w-7 h-7 rounded-full border border-[#E7E2D7] flex items-center justify-center text-rust shrink-0" data-id="${p.id}" aria-label="Quitar de favoritos">
            ${ICONS.heart(true)}
          </button>
        </div>
      </div>
    </div>`;
}

function cartRowTemplate(item) {
  return `
    <div class="flex gap-3">
      <div class="w-16 h-16 rounded-xl overflow-hidden shrink-0">
        <img src="${photoUrl(item.id)}" alt="${item.name}" class="w-full h-full object-cover" />
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium truncate">${item.name}</p>
        <p class="text-sm mb-2 text-muted">${formatPrice(item.price)}</p>
        <div class="flex items-center gap-3">
          <button class="panel-decrement-btn w-7 h-7 rounded-full border border-[#E7E2D7] flex items-center justify-center" data-id="${item.id}" aria-label="Restar unidad">${ICONS.minus()}</button>
          <span class="text-sm w-4 text-center">${item.qty}</span>
          <button class="panel-increment-btn w-7 h-7 rounded-full border border-[#E7E2D7] flex items-center justify-center" data-id="${item.id}" aria-label="Sumar unidad">${ICONS.plus()}</button>
        </div>
      </div>
    </div>`;
}

function renderSidePanel() {
  const content = document.getElementById("sidePanelContent");
  const footer = document.getElementById("sidePanelFooter");

  if (state.panelView === "favorites") {
    const items = PRODUCTS.filter((p) => state.favorites.has(p.id));
    footer.classList.add("hidden");
    content.innerHTML = items.length
      ? items.map(favoriteRowTemplate).join("")
      : `<p class="text-sm text-muted">Todavía no marcaste ningún favorito. Tocá el corazón en un producto para guardarlo acá.</p>`;
    return;
  }

  if (state.panelView === "cart") {
    const items = Object.entries(state.cart).map(([id, qty]) => ({
      ...PRODUCTS.find((p) => p.id === Number(id)),
      qty,
    }));
    if (!items.length) {
      footer.classList.add("hidden");
      content.innerHTML = `<p class="text-sm text-muted">Tu carrito está vacío. Elegí algo lindo para empezar.</p>`;
    } else {
      footer.classList.remove("hidden");
      content.innerHTML = items.map(cartRowTemplate).join("");
      const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
      document.getElementById("sidePanelTotal").textContent = formatPrice(total);
    }
  }
}

/* ---------- Modal de detalle ---------- */
function openModal(id) {
  state.modalProductId = id;
  state.modalActiveShot = 0;
  renderModal();

  document.getElementById("modalRoot").classList.remove("pointer-events-none");
  document.getElementById("modalOverlay").classList.remove("opacity-0", "pointer-events-none");
  document.getElementById("modalPanel").classList.remove("opacity-0", "scale-95", "pointer-events-none");
}

function closeModal() {
  state.modalProductId = null;
  document.getElementById("modalOverlay").classList.add("opacity-0", "pointer-events-none");
  document.getElementById("modalPanel").classList.add("opacity-0", "scale-95", "pointer-events-none");
  document.getElementById("modalRoot").classList.add("pointer-events-none");
}

function renderModal() {
  const p = PRODUCTS.find((pr) => pr.id === state.modalProductId);
  if (!p) return;
  const section = SECTIONS.find((s) => s.id === p.section);

  document.getElementById("modalCategory").textContent = section ? section.title : "";
  document.getElementById("modalName").textContent = p.name;
  document.getElementById("modalPrice").textContent = formatPrice(p.price);
  document.getElementById("modalDescription").textContent = p.description;

  const originalEl = document.getElementById("modalOriginalPrice");
  if (p.originalPrice) {
    originalEl.textContent = formatPrice(p.originalPrice);
    originalEl.classList.remove("hidden");
  } else {
    originalEl.classList.add("hidden");
  }

  const discountEl = document.getElementById("modalDiscountLabel");
  if (p.discount) {
    discountEl.textContent = `-${p.discount}%`;
    discountEl.classList.remove("hidden");
  } else {
    discountEl.classList.add("hidden");
  }

  const mainImg = document.getElementById("modalMainImage");
  mainImg.src = photoUrl(p.id, state.modalActiveShot);
  mainImg.alt = p.name;

  const thumbs = document.getElementById("modalThumbs");
  thumbs.innerHTML = [0, 1, 2, 3]
    .map(
      (i) => `
      <button class="modal-thumb-btn rounded-xl overflow-hidden aspect-square border-2 ${i === state.modalActiveShot ? "border-ink" : "border-[#E7E2D7]"}" data-variant="${i}">
        <img src="${photoUrl(p.id, i)}" alt="${p.name} — foto ${i + 1}" class="w-full h-full object-cover" />
      </button>`
    )
    .join("");

  updateModalFavoriteButton();
}

function updateModalFavoriteButton() {
  const p = PRODUCTS.find((pr) => pr.id === state.modalProductId);
  if (!p) return;
  const isFav = state.favorites.has(p.id);
  const btn = document.getElementById("modalFavoriteBtn");
  btn.classList.toggle("is-favorite", isFav);
  btn.innerHTML = `${ICONS.heart(isFav)} <span>${isFav ? "En favoritos" : "Favorito"}</span>`;
}

function setModalShot(i) {
  const p = PRODUCTS.find((pr) => pr.id === state.modalProductId);
  if (!p) return;
  state.modalActiveShot = i;
  document.getElementById("modalMainImage").src = photoUrl(p.id, i);
  document.querySelectorAll(".modal-thumb-btn").forEach((btn, idx) => {
    btn.classList.toggle("border-ink", idx === i);
    btn.classList.toggle("border-[#E7E2D7]", idx !== i);
  });
}

/* ---------- Drawer (menú lateral izquierdo) ---------- */
function openDrawer() {
  document.getElementById("drawerRoot").classList.remove("pointer-events-none");
  document.getElementById("drawerOverlay").classList.remove("opacity-0", "pointer-events-none");
  document.getElementById("drawerPanel").classList.remove("-translate-x-full");
}

function closeDrawer() {
  document.getElementById("drawerOverlay").classList.add("opacity-0", "pointer-events-none");
  document.getElementById("drawerPanel").classList.add("-translate-x-full");
  document.getElementById("drawerRoot").classList.add("pointer-events-none");
}

/* ---------- Inicialización y listeners ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderSections();
  updateCartBadge();

  // Header
  document.getElementById("hamburgerBtn").addEventListener("click", openDrawer);
  document.getElementById("cartBtn").addEventListener("click", () => openSidePanel("cart"));

  // Drawer
  document.getElementById("closeDrawerBtn").addEventListener("click", closeDrawer);
  document.getElementById("drawerOverlay").addEventListener("click", closeDrawer);
  document.getElementById("closeDrawerFromNav").addEventListener("click", closeDrawer);
  document.getElementById("favoritesNavBtn").addEventListener("click", () => {
    closeDrawer();
    openSidePanel("favorites");
  });
  document.querySelectorAll(".drawer-nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.scrollTo;
      closeDrawer();
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    });
  });

  // Panel lateral
  document.getElementById("closeSidePanelBtn").addEventListener("click", closeSidePanel);
  document.getElementById("sidePanelOverlay").addEventListener("click", closeSidePanel);

  // Modal
  document.getElementById("closeModalBtn").addEventListener("click", closeModal);
  document.getElementById("modalOverlay").addEventListener("click", closeModal);
  document.getElementById("modalAddToCartBtn").addEventListener("click", () => addToCart(state.modalProductId));
  document.getElementById("modalFavoriteBtn").addEventListener("click", () => toggleFavorite(state.modalProductId));

  // Flechas de los carruseles
  document.querySelectorAll(".carousel-prev").forEach((btn) => {
    const track = btn.closest(".relative").querySelector(".carousel-track");
    btn.addEventListener("click", () => scrollCarousel(track, -1));
  });
  document.querySelectorAll(".carousel-next").forEach((btn) => {
    const track = btn.closest(".relative").querySelector(".carousel-track");
    btn.addEventListener("click", () => scrollCarousel(track, 1));
  });

  // Delegación de eventos para elementos generados dinámicamente
  document.addEventListener("click", (e) => {
    const favBtn = e.target.closest(".favorite-btn");
    if (favBtn) {
      e.stopPropagation();
      toggleFavorite(Number(favBtn.dataset.id));
      return;
    }

    const addCartBtn = e.target.closest(".add-cart-btn");
    if (addCartBtn) {
      e.stopPropagation();
      addToCart(Number(addCartBtn.dataset.id));
      return;
    }

    const panelAddCartBtn = e.target.closest(".panel-add-cart-btn");
    if (panelAddCartBtn) {
      addToCart(Number(panelAddCartBtn.dataset.id));
      return;
    }

    const panelRemoveFavBtn = e.target.closest(".panel-remove-fav-btn");
    if (panelRemoveFavBtn) {
      toggleFavorite(Number(panelRemoveFavBtn.dataset.id));
      return;
    }

    const panelIncrementBtn = e.target.closest(".panel-increment-btn");
    if (panelIncrementBtn) {
      addToCart(Number(panelIncrementBtn.dataset.id));
      return;
    }

    const panelDecrementBtn = e.target.closest(".panel-decrement-btn");
    if (panelDecrementBtn) {
      decrementCart(Number(panelDecrementBtn.dataset.id));
      return;
    }

    const thumbBtn = e.target.closest(".modal-thumb-btn");
    if (thumbBtn) {
      setModalShot(Number(thumbBtn.dataset.variant));
      return;
    }

    const card = e.target.closest(".product-card");
    if (card) {
      openModal(Number(card.dataset.id));
      return;
    }
  });

  // Cerrar con Escape lo que esté abierto
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (state.modalProductId !== null) closeModal();
    else if (state.panelView !== null) closeSidePanel();
    else closeDrawer();
  });
});
// Arrancar la aplicación al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    renderSections();
    updateCartBadge();
});
