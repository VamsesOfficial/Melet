import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Sun, Moon, ArrowUp } from "lucide-react";
import { fadeUp, stagger } from "../animations";

// ─── SEO HEAD WITH OPTIONAL JSON-LD SCHEMA ───────────────────────────────────

export function SEOHead({ title, description, canonical, ogImage, schema }) {
  useEffect(() => {
    if (title) document.title = title;

    const setMeta = (selector, attr, value) => {
      if (!value) return;
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
    setMeta('meta[property="og:title"]', ["property", "og:title"], title);
    setMeta('meta[property="og:description"]', ["property", "og:description"], description);
    setMeta('meta[property="og:url"]', ["property", "og:url"], canonical || window.location.href);
    if (ogImage) setMeta('meta[property="og:image"]', ["property", "og:image"], ogImage);

    setMeta('meta[name="twitter:title"]', ["name", "twitter:title"], title);
    setMeta('meta[name="twitter:description"]', ["name", "twitter:description"], description);

    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonical || window.location.href);

    // Dynamic route-level JSON-LD
    let scriptEl = document.getElementById("dynamic-route-schema");
    if (schema) {
      if (!scriptEl) {
        scriptEl = document.createElement("script");
        scriptEl.id = "dynamic-route-schema";
        scriptEl.type = "application/ld+json";
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(schema);
    } else if (scriptEl) {
      scriptEl.remove();
    }
  }, [title, description, canonical, ogImage, schema]);

  return null;
}

// ─── PRODUCT IMAGE WITH FALLBACK ─────────────────────────────────────────────

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
        background: dark ? "#0e1b2b" : "#f3f1ec",
        ...style,
      }}
    >
      <div className="flex flex-col items-center gap-2 px-4 text-center pointer-events-none">
        <span
          className="text-xs font-semibold tracking-wider uppercase"
          style={{ color: dark ? "#c9a55c" : "#0f2236", opacity: 0.65 }}
        >
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
    <section id={id} className={className} ref={ref}>
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

// ─── ARCHITECTURAL SECTION LABEL ──────────────────────────────────────────────

export function SectionLabel({ text, align = "left" }) {
  return (
    <motion.div
      variants={fadeUp}
      className={`flex items-center gap-3 mb-3 ${
        align === "center" ? "justify-center" : "justify-start"
      }`}
    >
      <span className="inline-block w-6 h-[1.5px] bg-[#b58e4c]" />
      <span className="text-[#b58e4c] text-[11px] font-bold tracking-[0.2em] uppercase">
        {text}
      </span>
    </motion.div>
  );
}

// ─── REFINED DARK MODE TOGGLE ─────────────────────────────────────────────────

export function DarkModeToggle({ dark, setDark, transparentHeader = false }) {
  return (
    <button
      type="button"
      onClick={() => setDark(!dark)}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-200 ${
        transparentHeader
          ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
          : dark
          ? "bg-white/5 border-white/10 text-slate-200 hover:bg-white/10"
          : "bg-slate-100/80 border-slate-200/80 text-slate-700 hover:bg-slate-200/70"
      }`}
    >
      {dark ? (
        <Sun size={14} className="text-[#d4b06a]" />
      ) : (
        <Moon size={14} className="text-slate-700" />
      )}
    </button>
  );
}

// ─── ROUTE SCROLL RESTORATION + BACK TO TOP BUTTON ───────────────────────────

export function ScrollToTop() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    let ticking = false;
    const fn = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setVisible(window.scrollY > 500);
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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-5 left-4 sm:left-6 z-40 w-10 h-10 rounded-lg bg-[#0f2236] border border-white/15 text-white shadow-lg hover:bg-[#b58e4c] transition-colors flex items-center justify-center"
        >
          <ArrowUp size={16} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
