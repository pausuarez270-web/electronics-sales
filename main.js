const { useState, useRef } = React;
const { 
  Menu, X, ShoppingCart, Heart, Backpack, Footprints, Headphones, 
  Wallet, Wind, Watch, Compass, Shirt, Glasses, Repeat, Coffee, 
  Package, Flame, Box, ChevronLeft, ChevronRight, Plus, Minus 
} = lucide;

// --- Design Tokens ---
const INK = "#1F2A24";
const PAPER = "#F7F4EF";
const CARD = "#FFFFFF";
const MUTED = "#8B8578";
const TEAL = "#2F6F5E";
const OCHRE = "#D9A441";
const RUST = "#B5502C";
const SAGE = "#7C8B6F";
const ROSE = "#B98F86";
const RED = "#D72630";

// --- Product Data ---
const PRODUCTS = [
  // Ofertas
  { id: 1, section: "ofertas", name: "Mochila urbana Nórdica", price: 52000, originalPrice: 74000, discount: 30, icon: Backpack, tile: TEAL, description: "Mochila de lona resistente al agua con compartimento acolchado para notebook de hasta 15\". Cierres YKK y bolsillo lateral para termo." },
  { id: 2, section: "ofertas", name: "Zapatillas running Aire", price: 41000, originalPrice: 74500, discount: 43, icon: Footprints, tile: OCHRE, description: "Entresuela de espuma liviana pensada para asfalto. Malla transpirable y suela con tracción multidireccional." },
  { id: 3, section: "ofertas", name: "Auriculares inalámbricos Eco", price: 28000, originalPrice: 56000, discount: 50, icon: Headphones, tile: RUST, description: "Bluetooth 5.3, cancelación de ruido pasiva y 30 horas de batería con el estuche de carga incluido." },
  { id: 4, section: "ofertas", name: "Billetera de cuero Trenzado", price: 19500, originalPrice: 26000, discount: 25, icon: Wallet, tile: SAGE, description: "Cuero vacuno curtido al tanino con trenzado artesanal. Ocho tarjeteros y compartimento para monedas." },
  { id: 5, section: "ofertas", name: "Campera rompeviento Tundra", price: 45500, originalPrice: 70000, discount: 35, icon: Wind, tile: ROSE, description: "Tela cortaviento con costuras selladas y capucha desmontable. Se guarda en su propio bolsillo frontal." },
  { id: 6, section: "ofertas", name: "Reloj digital Vector", price: 33000, originalPrice: 55000, discount: 40, icon: Watch, tile: TEAL, description: "Sumergible hasta 50 metros, cronómetro y luz nocturna. Malla de silicona antialérgica." },

  // Tendencia
  { id: 7, section: "tendencia", name: "Gorra técnica Sendero", price: 15800, icon: Compass, tile: RUST, description: "Gorra de seis paneles con tela repelente al agua y visera curva prearmada. Cierre trasero ajustable." },
  { id: 8, section: "tendencia", name: "Buzo oversize Bruma", price: 34200, icon: Shirt, tile: SAGE, description: "Algodón frisado de 380 gramos con corte oversize. Puños y cintura acanalados para mayor abrigo." },
  { id: 9, section: "tendencia", name: "Lentes de sol Horizonte", price: 26900, icon: Glasses, tile: OCHRE, description: "Marco de acetato liviano con protección UV400 y lentes polarizadas antirreflejo." },
  { id: 10, section: "tendencia", name: "Cinturón reversible Dos Caras", price: 17400, icon: Repeat, tile: ROSE, description: "Un mismo cinturón, dos colores: girá la hebilla y cambia de cuero negro a marrón en segundos." },
  { id: 11, section: "tendencia", name: "Termo acero Andes", price: 21300, icon: Coffee, tile: TEAL, description: "Acero inoxidable de doble pared al vacío. Mantiene la temperatura hasta 12 horas, pico cebador incluido." },
  { id: 12, section: "tendencia", name: "Riñonera urbana Cruce", price: 18700, icon: Package, tile: RUST, description: "Cruza el pecho o la cintura. Compartimento acolchado para celular y salida para auriculares." },

  // Regalos para papá
  { id: 13, section: "papa", name: "Set de mate Completo", price: 29900, icon: Coffee, tile: SAGE, description: "Mate de calabaza forrado en cuero, bombilla de alpaca y termo de un litro, todo en su bolso de transporte." },
  { id: 14, section: "papa", name: "Kit de asado Parrillero", price: 38500, icon: Flame, tile: RUST, description: "Cuchillo, chaira, tenedor y pinzas con mango de madera de guayubira, presentados en estuche de lona." },
  { id: 15, section: "papa", name: "Combo Clásico cuero", price: 31200, icon: Wallet, tile: OCHRE, description: "Billetera y cinturón a juego en cuero legítimo marrón, con caja de regalo lista para entregar." },
  { id: 16, section: "papa", name: "Navaja multiuso Explorador", price: 22600, icon: Box, tile: TEAL, description: "Doce funciones en acero inoxidable: hoja, sacacorchos, destornilladores y más, con cuerpo de acero cepillado." },
  { id: 17, section: "papa", name: "Camisa lino Relax", price: 36700, icon: Shirt, tile: ROSE, description: "Lino 100% transpirable de calce holgado, ideal para los mediodías de calor. Lavado a máquina sin problema." },
  { id: 18, section: "papa", name: "Grill portátil Fogón", price: 47300, icon: Flame, tile: SAGE, description: "Parrilla plegable a carbón con patas plegables y bolso de traslado. Armá un asado en cualquier lado." }
];

const SECTIONS = [
  { id: "ofertas", title: "Ofertas", subtitle: "Precios que bajan esta semana, mientras dure el stock." },
  { id: "tendencia", title: "Tendencia", subtitle: "Lo que más se está llevando la gente por estos días." },
  { id: "papa", title: "Regalos para papá", subtitle: "Ideas con onda para el papá que no pide nada." }
];

const formatPrice = (n) => `$${n.toLocaleString("es-AR")}`;

// Componente de Tarjeta de Producto
function ProductCard({ product, isFavorite, onToggleFavorite, addToCart, onOpen }) {
  return (
    <div 
      onClick={() => onOpen(product)}
      className="bg-white rounded-2xl overflow-hidden cursor-pointer border border-[#E7E207]/30 transition-shadow hover:shadow-lg flex flex-col justify-between"
    >
      <div className="relative aspect-square bg-gray-100">
        <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: product.tile }}>
          {React.createElement(product.icon, { size: 48, color: "#FFFFFF", strokeWidth: 1.5 })}
        </div>
        {product.discount && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: RED }}>
            -{product.discount}% OFF
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium leading-snug mb-1 text-[#1F2A24] truncate">{product.name}</h3>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="font-semibold text-base" style={{ color: INK }}>{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs line-through text-[#8B8578]">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        <div className="flex items-center justify-end gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(product.id); }}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-[#E7E207]/50 bg-white"
          >
            <Heart size={16} color={isFavorite ? RUST : MUTED} fill={isFavorite ? RUST : "none"} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); addToCart(product.id); }}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white bg-[#1F2A24]"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Carrusel Horizontal
function ProductCarousel({ products, favorites, onToggleFavorite, addToCart, onOpen }) {
  const trackRef = useRef(null);
  const scrollByCards = (dir) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir * 260, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div 
        ref={trackRef}
        className="no-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 mx-[-16px] px-4 sm:mx-[-32px] sm:px-8"
      >
        {products.map(product => (
          <div key={product.id} className="snap-start shrink-0 w-48 sm:w-56">
            <ProductCard 
              product={product} 
              isFavorite={favorites.has(product.id)}
              onToggleFavorite={onToggleFavorite}
              addToCart={addToCart}
              onOpen={onOpen}
            />
          </div>
        ))}
      </div>
      <button 
        onClick={() => scrollByCards(-1)}
        className="hidden sm:flex absolute -left-4 top-[38%] -translate-y-1/2 w-9 h-9 rounded-full items-center justify-center bg-white border border-[#E7E207] shadow-md z-10"
      >
        <ChevronLeft size={18} color={INK} />
      </button>
      <button 
        onClick={() => scrollByCards(1)}
        className="hidden sm:flex absolute -right-4 top-[38%] -translate-y-1/2 w-9 h-9 rounded-full items-center justify-center bg-white border border-[#E7E207] shadow-md z-10"
      >
        <ChevronRight size={18} color={INK} />
      </button>
    </div>
  );
}

// Modal de Detalle
function ProductModal({ product, isFavorite, onToggleFavorite, addToCart, onClose }) {
  if (!product) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 flex items-center justify-center shadow">
          <X size={18} />
        </button>
        <div className="w-full md:w-1/2 aspect-square flex items-center justify-center" style={{ backgroundColor: product.tile }}>
          {React.createElement(product.icon, { size: 80, color: "#FFFFFF", strokeWidth: 1.5 })}
        </div>
        <div className="p-6 md:w-1/2 flex flex-col justify-between overflow-y-auto">
          <div>
            <span className="text-xs uppercase tracking-wide text-[#8B8578]">
              {SECTIONS.find(s => s.id === product.section)?.title}
            </span>
            <h2 className="text-2xl font-bold mt-1 mb-3 text-[#1F2A24]" style={{ fontFamily: 'Faustina, serif' }}>
              {product.name}
            </h2>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-semibold" style={{ color: INK }}>{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-sm line-through text-[#8B8578]">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            <p className="text-sm leading-relaxed text-gray-600 mb-6">{product.description}</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => addToCart(product.id)}
              className="flex-1 rounded-full py-3 bg-[#1F2A24] text-white font-medium flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} /> Agregar al carrito
            </button>
            <button 
              onClick={() => onToggleFavorite(product.id)}
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center"
            >
              <Heart size={20} color={isFavorite ? RUST : INK} fill={isFavorite ? RUST : "none"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// App Principal
function App() {
  const [favorites, setFavorites] = useState(new Set());
  const [cart, setCart] = useState({});
  const [activeModalProduct, setActiveModalProduct] = useState(null);

  const toggleFavorite = (id) => {
    const newFavs = new Set(favorites);
    if (newFavs.has(id)) newFavs.delete(id);
    else newFavs.add(id);
    setFavorites(newFavs);
  };

  const addToCart = (id) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const totalCartItems = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 bg-[#F7F4EF]/90 backdrop-blur z-30 px-6 py-4 flex justify-between items-center border-b border-gray-200/50 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <button className="p-1"><Menu size={22} /></button>
          <h1 className="text-xl font-bold tracking-tight" style={{ fontFamily: 'Faustina, serif' }}>Lo de Tito</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2">
            <Heart size={22} />
            {favorites.size > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#B5502C] text-white text-[10px] flex items-center justify-center">
                {favorites.size}
              </span>
            )}
          </button>
          <button className="relative p-2">
            <ShoppingCart size={22} />
            {totalCartItems > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#1F2A24] text-white text-[10px] flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1" style={{ fontFamily: 'Faustina, serif' }}>
            Cosas buenas, cerca de casa.
          </h2>
          <p className="text-sm text-[#8B8578]">Una selección chica, pensada de a poco — no un catálogo infinito.</p>
        </div>

        {SECTIONS.map(section => {
          const sectionProducts = PRODUCTS.filter(p => p.section === section.id);
          return (
            <section key={section.id} className="mb-10">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-[#1F2A24]">{section.title}</h3>
                <p className="text-xs text-[#8B8578]">{section.subtitle}</p>
              </div>
              

<ProductCarousel 
                products={sectionProducts}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                addToCart={addToCart}
                onOpen={setActiveModalProduct}
              />
            </section>
          );
        })}
      </main>

      <ProductModal 
        product={activeModalProduct}
        isFavorite={activeModalProduct ? favorites.has(activeModalProduct.id) : false}
        onToggleFavorite={toggleFavorite}
        addToCart={addToCart}
        onClose={() => setActiveModalProduct(null)}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);