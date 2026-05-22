import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, Sun, Moon, MessageCircle, ChevronRight } from "lucide-react";
import { fadeUp, stagger } from "../animations";

// ─── SEO HEAD ─────────────────────────────────────────────────────────────────

export function SEOHead({ title, description, canonical, ogImage }) {
  useEffect(() => {
    document.title = title;

    const setMeta = (selector, attr, value) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        const [attrName, attrVal] = attr;
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    setMeta('meta[name="description"]', ["name", "description"], description);

    // Open Graph
    setMeta('meta[property="og:title"]',       ["property", "og:title"],       title);
    setMeta('meta[property="og:description"]', ["property", "og:description"], description);
    setMeta('meta[property="og:url"]',         ["property", "og:url"],         canonical || window.location.href);
    if (ogImage) setMeta('meta[property="og:image"]', ["property", "og:image"], ogImage);

    // Twitter
    setMeta('meta[name="twitter:title"]',       ["name", "twitter:title"],       title);
    setMeta('meta[name="twitter:description"]', ["name", "twitter:description"], description);

    // Canonical
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonical || window.location.href);
  }, [title, description, canonical, ogImage]);

  return null;
}

// ─── PRODUCT IMAGE ────────────────────────────────────────────────────────────

export function ProductImage({ src, alt, className = "", style = {}, dark }) {
  const [error, setError] = useState(false);

  if (src && !error) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
        style={{ objectFit: "cover", width: "100%", height: "100%", ...style }}
        onError={() => setError(true)}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center select-none ${className}`}
      style={{
        background: dark
          ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
          : "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)",
        ...style,
      }}
    >
      <div className="flex flex-col items-center gap-2 pointer-events-none">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: dark ? "rgba(196,164,76,0.15)" : "rgba(26,58,92,0.1)" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="5" width="18" height="14" rx="2" stroke={dark ? "#c9a84c" : "#1a3a5c"} strokeWidth="1.5" />
            <circle cx="8.5" cy="10.5" r="2" stroke={dark ? "#c9a84c" : "#1a3a5c"} strokeWidth="1.5" />
            <path d="M3 17l4-4 3 3 4-5 7 6" stroke={dark ? "#c9a84c" : "#1a3a5c"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="text-sm font-bold tracking-wider uppercase"
          style={{ color: dark ? "#c9a84c" : "#1a3a5c", opacity: 0.7 }}>
          {alt}
        </span>
      </div>
    </div>
  );
}

// ─── SECTION WRAPPER ──────────────────────────────────────────────────────────

export function Section({ id, className = "", children }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px -60px 0px" });
  return (
    <section
      id={id}
      className={className}
      ref={ref}
      style={{ contain: "layout style" }}
    >
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={stagger}
      >
        {children}
      </motion.div>
    </section>
  );
}

// ─── SECTION LABEL ────────────────────────────────────────────────────────────

export function SectionLabel({ text }) {
  return (
    <motion.div variants={fadeUp} className="flex items-center gap-3 justify-center mb-4">
      <div className="h-px w-8 bg-amber-500" />
      <span className="text-amber-600 text-xs font-bold tracking-[0.25em] uppercase">{text}</span>
      <div className="h-px w-8 bg-amber-500" />
    </motion.div>
  );
}

// ─── DARK MODE TOGGLE ─────────────────────────────────────────────────────────

export function DarkModeToggle({ dark, setDark }) {
  return (
    <button
      onClick={() => setDark(!dark)}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative w-12 h-6 rounded-full transition-all duration-300 flex items-center focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
        dark ? "bg-amber-500" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute left-0.5 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
          dark ? "translate-x-6 bg-[#0d2137]" : "translate-x-0 bg-white"
        }`}
      >
        {dark
          ? <Moon size={11} className="text-amber-400" />
          : <Sun size={11} className="text-amber-600" />
        }
      </span>
    </button>
  );
}

// ─── SCROLL TO TOP ────────────────────────────────────────────────────────────

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let ticking = false;
    const fn = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setVisible(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-xl hover:shadow-amber-500/40 hover:-translate-y-1 transition-all flex items-center justify-center"
          style={{ willChange: "transform, opacity" }}
        >
          <ChevronRight size={18} className="-rotate-90" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── PRODUCT MODAL ────────────────────────────────────────────────────────────

export function ProductModal({ product, dark, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 999,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "12px", background: "rgba(4, 12, 24, 0.82)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative", width: "100%", maxWidth: "680px",
          maxHeight: "92dvh", overflowY: "auto", overflowX: "hidden",
          borderRadius: "28px",
          background: dark
            ? "linear-gradient(160deg, rgba(13,27,52,0.97) 0%, rgba(7,18,38,0.99) 100%)"
            : "linear-gradient(160deg, rgba(248,250,255,0.97) 0%, rgba(235,242,255,0.99) 100%)",
          border: dark
            ? "1px solid rgba(201,168,76,0.18)"
            : "1px solid rgba(201,168,76,0.25)",
          boxShadow: dark
            ? "0 32px 80px rgba(0,0,0,0.65), 0 0 0 0.5px rgba(201,168,76,0.10) inset"
            : "0 32px 80px rgba(10,30,60,0.22), 0 0 0 0.5px rgba(201,168,76,0.15) inset",
          WebkitOverflowScrolling: "touch", scrollbarWidth: "none",
        }}
      >
        <button onClick={onClose} aria-label="Close"
          style={{
            position: "absolute", top: "14px", right: "14px", zIndex: 30,
            width: "34px", height: "34px", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.18)",
            backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
            cursor: "pointer",
          }}
        >
          <X size={15} color="#fff" />
        </button>

        <div style={{ position: "relative", borderRadius: "28px 28px 0 0", overflow: "hidden", background: dark ? "#0a1828" : "#e8eef4" }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ display: "block", width: "100%", height: "auto", maxHeight: "70dvh", objectFit: "contain" }}
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <div style={{ position: "absolute", bottom: "12px", left: "14px" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              background: "rgba(201,168,76,0.22)", border: "1px solid rgba(201,168,76,0.50)",
              color: "#e8c96a", fontSize: "10px", fontWeight: 700,
              letterSpacing: "0.20em", textTransform: "uppercase",
              padding: "5px 12px", borderRadius: "100px",
            }}>
              {product.category}
            </span>
          </div>
        </div>

        <div style={{ padding: "clamp(20px, 4vw, 32px)", display: "flex", flexDirection: "column", gap: "18px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <div style={{ width: "20px", height: "1.5px", background: "linear-gradient(90deg, #c9a84c, #e0b84e)" }} />
              <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: "#c9a84c" }}>
                {product.category}
              </span>
            </div>
            <h2 style={{ margin: 0, fontSize: "clamp(20px, 4vw, 26px)", fontWeight: 900, lineHeight: 1.18, color: dark ? "#fff" : "#0d1f33", letterSpacing: "-0.01em" }}>
              {product.name}
            </h2>
          </div>

          <div style={{ height: "1px", background: dark ? "linear-gradient(90deg, rgba(201,168,76,0.2), rgba(255,255,255,0.04), rgba(201,168,76,0.12))" : "linear-gradient(90deg, rgba(201,168,76,0.3), rgba(26,58,92,0.06), rgba(201,168,76,0.2))" }} />

          <p style={{ margin: 0, fontSize: "clamp(13px, 2vw, 15px)", lineHeight: 1.70, color: dark ? "rgba(255,255,255,0.62)" : "rgba(13,31,51,0.68)" }}>
            {product.description}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {["Hotel Grade", "Indonesia Made", "In Stock"].map((tag) => (
              <span key={tag} style={{
                fontSize: "10px", fontWeight: 700,
                color: dark ? "rgba(255,255,255,0.45)" : "rgba(13,31,51,0.45)",
                background: dark ? "rgba(255,255,255,0.06)" : "rgba(13,31,51,0.05)",
                border: dark ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(13,31,51,0.09)",
                padding: "4px 10px", borderRadius: "100px", letterSpacing: "0.06em",
              }}>
                {tag}
              </span>
            ))}
          </div>

          <div style={{ height: "1px", background: dark ? "rgba(255,255,255,0.06)" : "rgba(13,31,51,0.07)" }} />

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <a
              href={`https://wa.me/62881037366555?text=Hi,%20I%20am%20interested%20in%20${encodeURIComponent(product.name)}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                flex: 1, minWidth: "140px", display: "inline-flex", alignItems: "center", justifyContent: "center",
                gap: "8px", padding: "13px 20px", borderRadius: "16px", fontWeight: 800, fontSize: "13px",
                color: "#fff", background: "linear-gradient(135deg, #c9a84c 0%, #e8c76a 50%, #c9a84c 100%)",
                border: "none", cursor: "pointer", textDecoration: "none",
                boxShadow: "0 6px 24px rgba(201,168,76,0.35)", letterSpacing: "0.01em",
              }}
            >
              <MessageCircle size={15} />
              Enquire Now
            </a>
            <button onClick={onClose}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                gap: "7px", padding: "13px 20px", borderRadius: "16px", fontWeight: 700, fontSize: "13px",
                cursor: "pointer",
                background: dark ? "rgba(255,255,255,0.07)" : "rgba(13,31,51,0.06)",
                border: dark ? "1px solid rgba(255,255,255,0.13)" : "1px solid rgba(13,31,51,0.11)",
                color: dark ? "rgba(255,255,255,0.65)" : "rgba(13,31,51,0.60)",
              }}
            >
              <X size={13} />
              Close
            </button>
          </div>
        </div>

        <div style={{ height: "3px", background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.45), rgba(201,168,76,0.25), transparent)", borderRadius: "0 0 28px 28px" }} />
      </motion.div>
    </motion.div>
  );
}