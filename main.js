// --- Datos de productos ---
const PRODUCTS = [
    { id: 1, section: "ofertas", name: "Mochila urbana Nordica", price: 52000, originalPrice: 74000, discount: 30 },
    { id: 2, section: "ofertas", name: "Zapatillas running Air", price: 41000, originalPrice: 56000, discount: 27 },
    { id: 3, section: "ofertas", name: "Auriculares inalambricos Eco", price: 28000, originalPrice: 45000, discount: 38 },
    { id: 4, section: "ofertas", name: "Billetera de cuero Trenzado", price: 19500, originalPrice: 26000, discount: 25 },
    { id: 5, section: "tendencia", name: "Reloj digital Vector", price: 33000, originalPrice: 55000, discount: 40 },
    { id: 6, section: "tendencia", name: "Campera rompeviento Tundra", price: 45500, originalPrice: 70000, discount: 35 },
    { id: 7, section: "tendencia", name: "Riñonera urbana Cruce", price: 18700, originalPrice: 24700, discount: 24 },
    { id: 8, section: "papa", name: "Set de mate Completo", price: 29900, originalPrice: 38500, discount: 22 },
    { id: 9, section: "papa", name: "Kit de asado Parrillero", price: 38500, originalPrice: 47800, discount: 19 }
];

// --- Formato de moneda ---
const formatPrice = (n) => $${n.toLocaleString("es-AR")};

// --- Renderizar productos en sus contenedores ---
function renderProducts() {
    const secciones = ["ofertas", "tendencia", "papa"];

    secciones.forEach((seccionId) => {
        const contenedor = document.getElementById(container-${seccionId});
        if (!contenedor) return;

        const prods = PRODUCTS.filter(p => p.section === seccionId);

        contenedor.innerHTML = prods.map(p => `
            <div class="bg-white rounded-2xl p-4 shadow-md border border-gray-100 flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div>
                    <div class="relative bg-gray-100 rounded-xl overflow-hidden mb-3 aspect-square flex items-center justify-center">
                        <span class="text-xs font-bold text-gray-400 uppercase">Tecnologics</span>
                        ${p.discount ? <span class="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">-${p.discount}%</span> : ""}
                    </div>
                    <h3 class="font-bold text-gray-900 text-base mb-1">${p.name}</h3>
                </div>
                <div>
                    <div class="flex items-baseline gap-2 mb-3">
                        <span class="text-lg font-bold text-teal-600">${formatPrice(p.price)}</span>
                        ${p.originalPrice ? <span class="text-xs text-gray-400 line-through">${formatPrice(p.originalPrice)}</span> : ""}
                    </div>
                    <button onclick="alert('¡Producto agregado al carrito!')" class="w-full bg-gray-900 text-white py-2 rounded-xl text-sm font-medium hover:bg-teal-600 transition-colors">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        `).join("");
    });
}

// --- Inicializar cuando cargue la página ---
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
});
