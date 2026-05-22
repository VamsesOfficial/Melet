import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, ChevronLeft, ChevronRight as ChevronRightIcon, MessageCircle, Images } from "lucide-react";
import { fadeUp } from "../animations";
import { SEOHead } from "../components/ui";
import { PRODUCTS } from "../data";

// ─────────────────────────────────────────────────────────────────────────────
// LIGHTBOX — full-screen photo viewer with prev/next navigation
// ─────────────────────────────────────────────────────────────────────────────
function Lightbox({ photos, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  const prev = () => setCurrent((c) => (c - 1 + photos.length) % photos.length);
  const next = () => setCurrent((c) => (c + 1) % photos.length);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape") onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        onClick={onClose}
      >
        <X size={20} />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/50 text-sm font-medium tabular-nums">
        {current + 1} / {photos.length}
      </div>

      {/* Prev */}
      <button
        className="absolute left-3 sm:left-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        onClick={(e) => { e.stopPropagation(); prev(); }}
      >
        <ChevronLeft size={20} />
      </button>

      {/* Image */}
      <motion.img
        key={current}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        src={photos[current].src}
        alt={photos[current].caption || `Photo ${current + 1}`}
        className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Next */}
      <button
        className="absolute right-3 sm:right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        onClick={(e) => { e.stopPropagation(); next(); }}
      >
        <ChevronRightIcon size={20} />
      </button>

      {/* Caption */}
      {photos[current].caption && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium text-center px-4">
          {photos[current].caption}
        </div>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MASONRY GRID — CSS column-based masonry
// ─────────────────────────────────────────────────────────────────────────────
function MasonryGrid({ photos, onPhotoClick, dark }) {
  return (
    <div
      className="w-full"
      style={{
        columnCount: "var(--cols)",
        columnGap: "12px",
        // responsive column count via CSS custom property
      }}
    >
      <style>{`
        :root { --cols: 2; }
        @media (min-width: 640px)  { :root { --cols: 3; } }
        @media (min-width: 1024px) { :root { --cols: 4; } }
      `}</style>

      {photos.map((photo, i) => (
        <motion.div
          key={i}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: i * 0.04 }}
          className="break-inside-avoid mb-3 group cursor-pointer relative overflow-hidden rounded-xl sm:rounded-2xl"
          onClick={() => onPhotoClick(i)}
        >
          <img
            src={photo.src}
            alt={photo.caption || `Photo ${i + 1}`}
            loading="lazy"
            className="w-full h-auto block group-hover:scale-105 transition-transform duration-300"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-end p-3">
            {photo.caption && (
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-white text-xs font-medium leading-tight">
                {photo.caption}
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function ProductGalleryPage({ dark }) {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Find the product by slug
  const product = PRODUCTS.find((p) => p.slug === productSlug);

  const text  = dark ? "text-white" : "text-[#1a3a5c]";
  const muted = dark ? "text-white/50" : "text-slate-500";
  const bgPage  = dark ? "bg-[#071526]" : "bg-[#f8f9fc]";
  const bgGrid  = dark ? "bg-[#0d1f33]" : "bg-white";

  // ── Product not found ──────────────────────────────────────────────────────
  if (!product) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${bgPage}`}>
        <div className="text-center">
          <Images size={48} className={`${muted} mx-auto mb-4`} />
          <p className={`${text} font-bold text-lg mb-2`}>Product not found</p>
          <button
            onClick={() => navigate("/products")}
            className="mt-4 text-amber-500 font-semibold text-sm hover:underline"
          >
            ← Back to Products
          </button>
        </div>
      </div>
    );
  }

  // ── No gallery photos ──────────────────────────────────────────────────────
  const photos = product.gallery || [];

  if (photos.length === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${bgPage}`}>
        <div className="text-center">
          <Images size={48} className={`${muted} mx-auto mb-4`} />
          <p className={`${text} font-bold text-lg mb-2`}>No photos yet</p>
          <p className={`${muted} text-sm mb-6`}>Gallery for "{product.name}" is coming soon.</p>
          <button
            onClick={() => navigate("/products")}
            className="text-amber-500 font-semibold text-sm hover:underline"
          >
            ← Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${product.name} — Photo Gallery | PT Kawan Baik Bali`}
        description={`Lihat semua foto ${product.name}. Hotel amenities berkualitas dari PT Kawan Baik Bali, supplier 500+ hotel di Bali & Indonesia.`}
        canonical={`https://www.kawanbaikbali.com/products/${product.slug}/gallery`}
        ogImage={photos[0]?.src || "https://www.kawanbaikbali.com/og-image.jpeg"}
      />

      {/* ── Hero / Header ─────────────────────────────────────────────────── */}
      <div className={`pt-24 sm:pt-28 pb-10 sm:pb-14 ${bgPage} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs mb-6 flex-wrap">
            <Link to="/" className={`${muted} hover:text-amber-500 transition-colors`}>Home</Link>
            <ChevronRight size={12} className={muted} />
            <Link to="/products" className={`${muted} hover:text-amber-500 transition-colors`}>Products</Link>
            <ChevronRight size={12} className={muted} />
            <span className="text-amber-500 font-semibold truncate">{product.name}</span>
            <ChevronRight size={12} className="text-amber-500" />
            <span className="text-amber-500 font-semibold">Gallery</span>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-amber-500" />
              <span className="text-amber-600 text-xs font-bold tracking-[0.25em] uppercase">Photo Gallery</span>
              <div className="h-px w-8 bg-amber-500" />
            </motion.div>

            <motion.h1 variants={fadeUp} className={`text-3xl sm:text-4xl lg:text-5xl font-black ${text} mb-3`}>
              {product.name}
            </motion.h1>

            <motion.p variants={fadeUp} className={`${muted} text-sm sm:text-base mb-1`}>
              {photos.length} photo{photos.length !== 1 ? "s" : ""} · Click any photo to view full size
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* ── Masonry Grid ──────────────────────────────────────────────────── */}
      <div className={`pb-16 sm:pb-24 ${bgGrid} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <MasonryGrid
            photos={photos}
            onPhotoClick={(i) => setLightboxIndex(i)}
            dark={dark}
          />
        </div>

        {/* CTA */}
        <motion.div variants={fadeUp} className="mt-10 sm:mt-14 text-center">
          <a
            href={`https://wa.me/62881037366555?text=Hello%2C%20I%20am%20interested%20in%20${encodeURIComponent(product.name)}.`}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold hover:-translate-y-0.5 transition-all duration-200 text-sm sm:text-base ${
              dark
                ? "bg-amber-500 text-white hover:bg-amber-400"
                : "bg-[#1a3a5c] text-white hover:bg-[#16324f]"
            }`}
          >
            <MessageCircle size={16} />
            Enquire About {product.name}
          </a>
        </motion.div>
      </div>

      {/* ── Lightbox ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={photos}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}