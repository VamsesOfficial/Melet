import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageCircle, ChevronRight, Package, Droplets, Shirt, Leaf, Images, BedDouble } from "lucide-react";
import { fadeUp, stagger } from "../animations";
import { Section, SectionLabel, SEOHead, ProductImage, ProductModal } from "../components/ui";
import { PRODUCTS, PRODUCT_CATEGORIES } from "../data";

const CAT_ICONS = { "personal-care": <Droplets size={18}/>, "comfort-items": <Shirt size={18}/>, "convenience-goods": <Package size={18}/>, "eco-friendly": <Leaf size={18}/>, "hotel-linen-bedding": <BedDouble size={18}/> };

export default function ProductsPage({ dark }) {
  const [filter, setFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const categories = ["All", ...PRODUCT_CATEGORIES.map(c => c.name)];
  const filtered = filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  const text = dark ? "text-white" : "text-[#1a3a5c]";
  const muted = dark ? "text-white/50" : "text-slate-500";
  const cardBg = dark ? "bg-[#071526] border-white/10" : "bg-white border-slate-100";
  const tagBg = dark ? "bg-amber-400/20 text-amber-300" : "bg-white/90 text-[#1a3a5c]";
  const filterActive = dark ? "bg-amber-500 text-white shadow-md" : "bg-[#1a3a5c] text-white shadow-md";
  const filterInactive = dark ? "bg-white/10 text-white/60 hover:bg-white/20" : "bg-slate-100 text-slate-600 hover:bg-slate-200";

  return (
    <>
      <SEOHead
        title="Hotel Amenities Products Bali | Shampoo, Towels, Eco-Friendly | PT Kawan Baik Bali"
        description="Lihat semua produk hotel amenities PT Kawan Baik Bali: personal care, comfort items, convenience goods & eco-friendly solutions. HALAL certified, POM certified. Supplier 500+ hotel di Bali & Indonesia."
        canonical="https://www.kawanbaikbali.com/products"
        ogImage="https://www.kawanbaikbali.com/og-image.jpeg"
      />

      {/* Page Hero */}
      <div className={`pt-24 sm:pt-28 pb-10 sm:pb-14 ${dark ? "bg-[#071526]" : "bg-[#f8f9fc]"} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs mb-6">
            <Link to="/" className={`${muted} hover:text-amber-500 transition-colors`}>Home</Link>
            <ChevronRight size={12} className={muted} />
            <span className="text-amber-500 font-semibold">Products</span>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-amber-500" />
              <span className="text-amber-600 text-xs font-bold tracking-[0.25em] uppercase">Our Products</span>
              <div className="h-px w-8 bg-amber-500" />
            </motion.div>
            <motion.h1 variants={fadeUp} className={`text-3xl sm:text-4xl lg:text-5xl font-black ${text} mb-4`}>
              All Hotel Amenities
            </motion.h1>
            <motion.p variants={fadeUp} className={`${muted} max-w-2xl text-sm sm:text-base`}>
              Quality hotel amenities trusted by 500+ hotels and resorts across Bali and Indonesia. Filter by category to find exactly what you need.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Category Cards */}
      <div className={`py-10 ${dark ? "bg-[#071526]" : "bg-[#f8f9fc]"} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {PRODUCT_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                to={`/products/${cat.slug}`}
                className={`group p-4 rounded-xl border text-center hover:-translate-y-1 transition-all duration-200 ${
                  dark ? "bg-[#0d1f33] border-white/10 hover:border-amber-500/40" : "bg-white border-slate-100 hover:border-amber-300"
                }`}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 text-white" style={{ backgroundColor: cat.color }}>
                  {CAT_ICONS[cat.slug]}
                </div>
                <p className={`font-bold text-xs sm:text-sm ${text} leading-tight`}>{cat.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <Section id="all-products" className={`py-10 sm:py-16 ${dark ? "bg-[#0d1f33]" : "bg-white"} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 justify-center mb-8 sm:mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  filter === cat ? filterActive : filterInactive
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {filtered.map((product) => (
              <div
                key={product.id}
                className={`group rounded-2xl sm:rounded-3xl overflow-hidden ${cardBg} border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-[transform,box-shadow] duration-200 cursor-pointer`}
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative h-40 sm:h-52 overflow-hidden" style={{ background: dark ? "#0a1828" : "#e8eef4" }}>
                  <ProductImage src={product.image} alt={product.name} dark={dark} className="w-full h-full group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3">
                    <span className={`text-[9px] sm:text-[10px] font-bold ${tagBg} px-2 py-0.5 sm:py-1 rounded-full shadow`}>
                      {product.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-white text-[10px] sm:text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full bg-black/50 border border-white/20">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <h2 className={`font-bold ${text} text-sm mb-1 leading-tight`}>{product.name}</h2>
                  <p className={`${muted} text-xs leading-relaxed mb-2 sm:mb-3 line-clamp-2`}>{product.description}</p>

                  {/* Action buttons row */}
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                      className="text-xs font-bold text-amber-600 hover:text-amber-500 flex items-center gap-1 group/link"
                    >
                      Enquire Now <ArrowRight size={11} className="transition-transform group-hover/link:translate-x-1" />
                    </button>

                    {/* View All Photos button — only shown if product has gallery */}
                    {product.gallery && product.gallery.length > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/products/${product.slug}/gallery`);
                        }}
                        className={`flex items-center gap-1 text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-lg transition-all duration-150 ${
                          dark
                            ? "bg-white/10 text-white/70 hover:bg-amber-500/20 hover:text-amber-300"
                            : "bg-slate-100 text-slate-500 hover:bg-amber-50 hover:text-amber-600"
                        }`}
                      >
                        <Images size={11} />
                        View All
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="mt-10 sm:mt-12 text-center">
            <a
              href="https://wa.me/62881037366555?text=Hello%2C%20I%20would%20like%20to%20see%20your%20full%20product%20catalogue."
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border-2 font-bold hover:-translate-y-0.5 transition-all duration-200 text-sm sm:text-base ${
                dark
                  ? "border-amber-500 text-amber-400 hover:bg-amber-500/10"
                  : "border-[#1a3a5c] text-[#1a3a5c] hover:bg-[#1a3a5c] hover:text-white"
              }`}
            >
              <MessageCircle size={16} />
              Request Full Catalogue
            </a>
          </motion.div>
        </div>
      </Section>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} dark={dark} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
    </>
  );
}