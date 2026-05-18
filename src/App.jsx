import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Phone, Mail, Globe, MapPin, Menu, X, ChevronRight,
  Star, Shield, Leaf, Award, ArrowRight, Send,
  CheckCircle, Package, Sparkles, Heart, MessageCircle,
  Instagram, Facebook, Twitter, Linkedin,
  Shirt, Scissors, Wind, Coffee, Droplets, Sun, Moon
} from "lucide-react";

// ─── DARK MODE CONTEXT ────────────────────────────────────────────────────────

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });
  return [dark, setDark];
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Why Choose Us", href: "#why" },
  { label: "Contact", href: "#contact" },
];

const PRODUCT_CATEGORIES = [
  {
    id: 1,
    icon: <Droplets size={28} />,
    name: "Personal Care Essentials",
    description: "Premium shampoo, conditioner, shower gel, body lotion, and soap crafted for a luxurious in-room experience.",
    image: "/images/cat-personal-care.jpg",
    items: ["Shampoo", "Conditioner", "Shower Gel", "Body Lotion", "Bar Soap"],
    color: "#1a3a5c",
    accent: "#2c6e8a",
  },
  {
    id: 2,
    icon: <Shirt size={28} />,
    name: "Comfort Items",
    description: "Hotel-grade towels, plush bathrobes, and slippers designed to deliver superior softness and lasting durability.",
    image: "/images/cat-comfort.jpg",
    items: ["Bath Towels", "Bathrobe", "Hotel Slippers", "Face Towel", "Bath Mat"],
    color: "#c9a84c",
    accent: "#e0b84e",
  },
  {
    id: 3,
    icon: <Package size={28} />,
    name: "Convenience Goods",
    description: "Cotton buds, shower caps, combs, tissue, sewing kits, shoe shine, and all daily essentials guests expect.",
    image: "/images/cat-convenience.jpg",
    items: ["Cotton Buds", "Shower Cap", "Comb", "Tissue", "Sewing Kit"],
    color: "#2c6e8a",
    accent: "#3d8ca8",
  },
  {
    id: 4,
    icon: <Leaf size={28} />,
    name: "Eco-Friendly Solutions",
    description: "Sustainable, biodegradable amenity lines made from responsibly sourced materials — guests love them, the planet does too.",
    image: "/images/cat-eco.jpg",
    items: ["Bamboo Toothbrush", "Refillable Dispensers", "Natural Soap", "Organic Shampoo"],
    color: "#3a7d44",
    accent: "#4a9c56",
  },
];

const PRODUCTS = [
  { id: 1,  name: "Shampoo Classic",          category: "Personal Care",    image: "/images/prod-02-shampoo.jpg",      description: "Hair shampoo with green tea extract, 25ml — classic formula for daily hotel use." },
  { id: 2,  name: "Shampoo Aromatherapy",     category: "Personal Care",    image: "/images/prod-shampoo-botol.jpg",   description: "Aromatherapy shampoo with aloe vera extract, 25–30ml. Refreshing and nourishing." },
  { id: 3,  name: "Hair Conditioner",         category: "Personal Care",    image: "/images/prod-conditioner.jpg",     description: "Hair conditioner classic with green tea, 25ml. Leaves hair smooth and manageable." },
  { id: 4,  name: "Shower Gel Classic",       category: "Personal Care",    image: "/images/prod-06-shower-gel.jpg",   description: "Body shower gel with green tea, 25ml. Refreshing fragrance, gentle on skin." },
  { id: 5,  name: "Shower Gel Aromatherapy",  category: "Personal Care",    image: "/images/prod-06b-shower-gel.jpg",  description: "Aromatherapy shower gel, 30ml. POM-certified, produced locally in Bali." },
  { id: 6,  name: "Body Lotion Aromatherapy", category: "Personal Care",    image: "/images/prod-body-lotion.jpg",     description: "Moisturising body lotion with aromatherapy, 30ml. POM-certified, Bungan Jepun Bali." },
  { id: 7,  name: "Body Lotion Classic",      category: "Personal Care",    image: "/images/prod-body-lotion2.jpg",    description: "Body lotion classic with green tea, 25ml. Smooth and hydrating for daily use." },
  { id: 8,  name: "Bath Foam",                category: "Personal Care",    image: "/images/prod-bath-foam.jpg",       description: "Luxury bath foam in elegant blue bottle, 25ml. Fragrant and skin-friendly." },
  { id: 9,  name: "Liquid Soap",              category: "Personal Care",    image: "/images/prod-liquid-soap.jpg",     description: "Gentle liquid soap in premium bottle, 25ml. POM-certified, made in Indonesia." },
  { id: 10, name: "Bar Soap",                 category: "Personal Care",    image: "/images/prod-11-soap.jpg",         description: "Wrapped bar soap 15gr, HALAL-certified. Classic hotel presentation." },
  { id: 11, name: "Hotel Soap",               category: "Personal Care",    image: "/images/prod-hotel-soap.jpg",      description: "Hotel soap bar 25gr, premium pleated wrap. HALAL-certified, elegant finish." },
  { id: 12, name: "Bath Towel",               category: "Comfort Items",    image: null,                               description: "600 GSM 100% cotton bath towels with hotel-grade absorbency and durability." },
  { id: 13, name: "Bathrobe",                 category: "Comfort Items",    image: null,                               description: "Ultra-soft 100% cotton terry bathrobe. Custom embroidery available." },
  { id: 14, name: "Hotel Slippers",           category: "Comfort Items",    image: null,                               description: "Closed-toe or open-toe slippers with non-slip sole, elegant and durable." },
  { id: 15, name: "Cotton Buds",              category: "Convenience Goods",image: null,                               description: "100% pure cotton buds, safely designed and individually sealed." },
  { id: 16, name: "Shower Cap",               category: "Convenience Goods",image: null,                               description: "Waterproof PE shower cap, individually wrapped in elegant packaging." },
  { id: 17, name: "Eco Bamboo Kit",           category: "Eco-Friendly",     image: null,                               description: "Bamboo toothbrush + biodegradable packaging — the sustainable amenity guests love." },
];

const WHY_ITEMS = [
  { icon: <Award size={24} />, title: "Local Expertise", desc: "Deeply rooted in Bali's hospitality industry, we understand what hotels and resorts truly need to impress their guests." },
  { icon: <Sparkles size={24} />, title: "Clever Innovation", desc: "We continuously develop new amenity solutions — from refillable dispenser systems to eco packaging — staying ahead of industry trends." },
  { icon: <Shield size={24} />, title: "Exceptional Service", desc: "Dedicated account managers, flexible MOQ, fast delivery across Bali and all of Indonesia. Your deadlines are our priority." },
  { icon: <Leaf size={24} />, title: "Sustainable Commitment", desc: "We offer a full eco-friendly product line and partner with manufacturers who share our commitment to environmental responsibility." },
  { icon: <Star size={24} />, title: "Quality Assurance", desc: "Every product is quality-checked before delivery. We supply 5-star resorts, boutique hotels, and villa complexes across Bali." },
  { icon: <Heart size={24} />, title: "Trusted Partnership", desc: "We build long-term relationships — not just transactions. Our clients return because we genuinely care about their success." },
];

const STATS = [
  { value: "500+", label: "Hotels Served" },
  { value: "50+", label: "Product Lines" },
  { value: "10+", label: "Years Experience" },
  { value: "99%", label: "Client Satisfaction" },
];

// ─── ANIMATION VARIANTS ──────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } }),
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

// ─── PHOTO PLACEHOLDER ───────────────────────────────────────────────────────

function ProductImage({ src, alt, className = "", style = {}, dark }) {
  const [error, setError] = useState(false);

  if (src && !error) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={{ objectFit: "cover", width: "100%", height: "100%", ...style }}
        onError={() => setError(true)}
      />
    );
  }

  // Fallback placeholder
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

// ─── SECTION WRAPPER ─────────────────────────────────────────────────────────

function Section({ id, className = "", children }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function SectionLabel({ text, dark }) {
  return (
    <motion.div variants={fadeUp} className="flex items-center gap-3 justify-center mb-4">
      <div className="h-px w-8 bg-amber-500" />
      <span className="text-amber-600 text-xs font-bold tracking-[0.25em] uppercase">{text}</span>
      <div className="h-px w-8 bg-amber-500" />
    </motion.div>
  );
}

// ─── DARK MODE TOGGLE ────────────────────────────────────────────────────────

function DarkModeToggle({ dark, setDark }) {
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

// ─── HEADER ───────────────────────────────────────────────────────────────────

function Header({ dark, setDark }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    setActive(href);
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const bgScrolled = dark
    ? "bg-[#0d1f33]/95 backdrop-blur-md shadow-lg shadow-black/30"
    : "bg-white/95 backdrop-blur-md shadow-lg shadow-navy-900/5";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? bgScrolled : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <button onClick={() => handleNav("#home")} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#1a3a5c] to-[#2c6e8a] flex items-center justify-center shadow-md">
              <span className="text-amber-400 font-black text-base sm:text-lg leading-none">K</span>
            </div>
            <div className="text-left">
              <p className={`font-black text-sm sm:text-base leading-none tracking-tight transition-colors ${
                scrolled ? (dark ? "text-white" : "text-[#1a3a5c]") : "text-white"
              }`}>
                Kawan Baik
              </p>
              <p className={`text-[9px] sm:text-[10px] font-medium tracking-widest uppercase transition-colors ${
                scrolled ? (dark ? "text-amber-400" : "text-amber-600") : "text-amber-300"
              }`}>
                Bali
              </p>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className={`text-sm font-medium transition-colors relative group ${
                  scrolled
                    ? dark
                      ? (active === l.href ? "text-amber-400" : "text-white/60 hover:text-white")
                      : (active === l.href ? "text-[#1a3a5c]" : "text-slate-500 hover:text-[#1a3a5c]")
                    : (active === l.href ? "text-white" : "text-white/70 hover:text-white")
                }`}
              >
                {l.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-amber-500 transition-all duration-300 ${active === l.href ? "w-full" : "w-0 group-hover:w-full"}`} />
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            <DarkModeToggle dark={dark} setDark={setDark} />
            <a
              href="https://wa.me/62881037366555?text=Hello%20PT%20Kawan%20Baik%20Bali%2C%20I%20would%20like%20to%20request%20a%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-bold shadow-md hover:shadow-amber-500/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              <MessageCircle size={14} />
              <span>Request Quote</span>
            </a>
          </div>

          {/* Mobile right side */}
          <div className="flex lg:hidden items-center gap-2">
            <DarkModeToggle dark={dark} setDark={setDark} />
            <button
              onClick={() => setOpen(!open)}
              className={`p-2 rounded-lg transition-colors ${
                scrolled
                  ? dark ? "text-white hover:bg-white/10" : "text-[#1a3a5c] hover:bg-slate-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden border-t shadow-xl ${
              dark ? "bg-[#0d1f33] border-white/10" : "bg-white border-slate-100"
            }`}
          >
            <div className="px-4 py-5 flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.href}
                  onClick={() => handleNav(l.href)}
                  className={`text-left px-4 py-3 rounded-xl font-medium transition-colors text-sm ${
                    dark
                      ? "text-white hover:bg-white/10"
                      : "text-[#1a3a5c] hover:bg-slate-50"
                  }`}
                >
                  {l.label}
                </button>
              ))}
              <a
                href="https://wa.me/62881037366555"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 text-center px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-sm"
              >
                Request Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero({ dark }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
     <div className="absolute inset-0 z-0">
   <img
      src="/hero.jpeg"
      alt="Hero Background"
      className="w-full h-full object-cover"
      style={{ minHeight: "100vh" }}
    />
    
  <div className="absolute inset-0 bg-gradient-to-r from-[#0d2137]/90 via-[#1a3a5c]/75 to-[#1a3a5c]/30 pointer-events-none" />
  <div className="absolute inset-0 bg-gradient-to-t from-[#0d2137]/60 via-transparent to-transparent pointer-events-none" />
</div>

      {/* Decorative */}
      <div className="absolute top-24 right-4 sm:right-10 lg:right-32 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 rounded-full border border-amber-400/20 animate-pulse pointer-events-none" />
      <div className="absolute top-32 right-10 sm:right-20 lg:right-40 w-20 sm:w-32 lg:w-40 h-20 sm:h-32 lg:h-40 rounded-full border border-amber-400/10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 sm:pt-24 sm:pb-36">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center gap-3 mb-5 sm:mb-6"
          >
            <div className="h-px w-10 bg-amber-400" />
            <span className="text-amber-400 text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase">PT Kawan Baik Bali</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] tracking-tight mb-5 sm:mb-6"
          >
            Premium Hotel
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
              Amenities
            </span>
            <br />
            Supplier in Bali
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-base sm:text-lg lg:text-xl text-white/75 leading-relaxed mb-8 sm:mb-10 max-w-xl"
          >
            Enhancing guest experiences with quality, luxury, and sustainability — trusted by 500+ hotels across Bali and Indonesia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4"
          >
            <button
              onClick={() => document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold shadow-xl shadow-amber-900/30 hover:shadow-amber-500/50 hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
            >
              View Products <ArrowRight size={16} />
            </button>
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full border-2 border-white/40 text-white font-bold hover:bg-white/10 hover:border-white/70 hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
            >
              Contact Us
            </button>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="bg-white/10 backdrop-blur-md border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="text-center"
                >
                  <p className="text-xl sm:text-2xl lg:text-3xl font-black text-amber-400">{s.value}</p>
                  <p className="text-white/60 text-[10px] sm:text-xs font-medium mt-0.5">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────

function About({ dark }) {
  const bg = dark ? "bg-[#0d1f33]" : "bg-white";
  const text = dark ? "text-white" : "text-[#1a3a5c]";
  const muted = dark ? "text-white/60" : "text-slate-600";
  const cardBg = dark ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-100";
  const floatBg = dark ? "bg-[#0d1f33]" : "bg-white";

  return (
    <Section id="about" className={`py-16 sm:py-20 lg:py-32 ${bg} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image placeholder */}
          <motion.div variants={fadeUp} className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
              <ProductImage src={null} alt="About PT Kawan Baik Bali" dark={dark} className="w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a5c]/40 via-transparent" />
            </div>
            {/* Floating card */}
            <motion.div
              variants={fadeUp}
              custom={0.3}
              className={`absolute -bottom-5 -right-3 sm:-bottom-6 sm:-right-4 lg:-right-8 ${floatBg} rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-5 max-w-[160px] sm:max-w-[200px]`}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-100 flex items-center justify-center">
                  <CheckCircle size={16} className="text-amber-600" />
                </div>
                <div>
                  <p className={`font-black ${text} text-base sm:text-lg leading-none`}>ISO</p>
                  <p className={`text-xs ${muted}`}>Certified</p>
                </div>
              </div>
              <p className={`text-[10px] sm:text-[11px] ${muted} leading-snug`}>Quality-assured products for every property.</p>
            </motion.div>
            <div className="absolute -top-5 -left-5 w-20 h-20 rounded-2xl bg-[#1a3a5c]/5 -z-10" />
          </motion.div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <SectionLabel text="About Us" dark={dark} />
            <motion.h2 variants={fadeUp} className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black ${text} leading-tight mb-5 sm:mb-6`}>
              Bali's Most Trusted Hotel
              <span className="text-amber-500"> Amenities Partner</span>
            </motion.h2>
            <motion.div variants={fadeUp} className={`space-y-4 ${muted} leading-relaxed text-sm sm:text-base`}>
              <p>
                <strong className={text}>PT Kawan Baik Bali</strong> is a leading hospitality supply company headquartered in Bali, Indonesia. We specialise in providing comprehensive hotel amenities and hospitality equipment for hotels, resorts, villas, serviced apartments, and spas across the archipelago.
              </p>
              <p>
                Founded with a commitment to quality and partnership, we have grown to serve over 500 properties — from boutique guesthouses to 5-star international resorts.
              </p>
              <p>
                We believe the right amenities tell your guests: <em>"We care."</em> Our mission is to help every property in Indonesia deliver that experience — affordably, reliably, and beautifully.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-6 sm:mt-8 grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
              {[
                { label: "Our Mission", desc: "Deliver quality hospitality products that elevate guest experiences." },
                { label: "Our Vision", desc: "To be Indonesia's No.1 hotel amenities partner by 2030." },
              ].map((item) => (
                <div key={item.label} className={`p-4 rounded-xl sm:rounded-2xl ${cardBg} border`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <p className={`font-bold ${text} text-sm`}>{item.label}</p>
                  </div>
                  <p className={`${muted} text-xs sm:text-sm leading-snug`}>{item.desc}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-6 sm:mt-8">
              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 text-[#1a3a5c] dark:text-amber-400 font-bold text-sm group"
                style={{ color: dark ? "#f59e0b" : "#1a3a5c" }}
              >
                Get in Touch
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── PRODUCT CATEGORIES ───────────────────────────────────────────────────────

function ProductCategories({ dark }) {
  const bg = dark ? "bg-[#071526]" : "bg-[#f8f9fc]";
  const text = dark ? "text-white" : "text-[#1a3a5c]";
  const muted = dark ? "text-white/50" : "text-slate-500";
  const cardBg = dark ? "bg-[#0d1f33] shadow-black/30" : "bg-white shadow-slate-200/80";
  const tagBg = dark ? "bg-white/10 text-white/70" : "bg-slate-100 text-slate-600";

  return (
    <Section id="categories" className={`py-16 sm:py-20 lg:py-32 ${bg} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <SectionLabel text="What We Offer" dark={dark} />
          <motion.h2 variants={fadeUp} className={`text-2xl sm:text-3xl lg:text-5xl font-black ${text} leading-tight`}>
            Product Categories
          </motion.h2>
          <motion.p variants={fadeUp} className={`mt-3 sm:mt-4 ${muted} max-w-xl mx-auto text-sm sm:text-base`}>
            Four core categories covering every hotel amenity need — from personal care to sustainable alternatives.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PRODUCT_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              variants={fadeUp}
              custom={i}
              className={`group rounded-2xl sm:rounded-3xl overflow-hidden ${cardBg} shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer`}
            >
              {/* Photo placeholder */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <ProductImage src={cat.image} alt={cat.name} dark={dark} className="w-full h-full group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div
                  className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white"
                  style={{ backgroundColor: cat.color }}
                >
                  {cat.icon}
                </div>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-5">
                <h3 className={`font-black ${text} text-sm sm:text-base mb-2 leading-tight`}>{cat.name}</h3>
                <p className={`${muted} text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4`}>{cat.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-3 sm:mb-4">
                  {cat.items.slice(0, 3).map((item) => (
                    <span key={item} className={`text-[10px] font-semibold ${tagBg} px-2 py-0.5 rounded-full`}>{item}</span>
                  ))}
                  {cat.items.length > 3 && (
                    <span className={`text-[10px] font-semibold ${tagBg} px-2 py-0.5 rounded-full`}>+{cat.items.length - 3}</span>
                  )}
                </div>
                <button
                  onClick={() => document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" })}
                  className="flex items-center gap-1 text-sm font-bold group/btn"
                  style={{ color: cat.color }}
                >
                  Learn More
                  <ChevronRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── FEATURED PRODUCTS ────────────────────────────────────────────────────────

function FeaturedProducts({ dark }) {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(PRODUCTS.map((p) => p.category))];
  const filtered = filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  const bg = dark ? "bg-[#0d1f33]" : "bg-white";
  const text = dark ? "text-white" : "text-[#1a3a5c]";
  const muted = dark ? "text-white/50" : "text-slate-500";
  const cardBg = dark ? "bg-[#071526] border-white/10" : "bg-white border-slate-100";
  const tagBg = dark ? "bg-amber-400/20 text-amber-300" : "bg-white/90 text-[#1a3a5c]";
  const filterActive = dark
    ? "bg-amber-500 text-white shadow-md"
    : "bg-[#1a3a5c] text-white shadow-md";
  const filterInactive = dark
    ? "bg-white/10 text-white/60 hover:bg-white/20"
    : "bg-slate-100 text-slate-600 hover:bg-slate-200";

  return (
    <Section id="products" className={`py-16 sm:py-20 lg:py-32 ${bg} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <SectionLabel text="Our Products" dark={dark} />
          <motion.h2 variants={fadeUp} className={`text-2xl sm:text-3xl lg:text-5xl font-black ${text} leading-tight`}>
            Featured Products
          </motion.h2>
          <motion.p variants={fadeUp} className={`mt-3 sm:mt-4 ${muted} max-w-xl mx-auto text-sm sm:text-base`}>
            Quality amenities trusted by leading hotels. Filter by category to explore our full range.
          </motion.p>
        </div>

        {/* Filter tabs */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-2 justify-center mb-8 sm:mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                filter === cat ? filterActive : filterInactive
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className={`group rounded-xl sm:rounded-2xl overflow-hidden ${cardBg} border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400`}
              >
                <div className="relative h-40 sm:h-52 overflow-hidden">
                  <ProductImage src={product.image} alt={product.name} dark={dark} className="w-full h-full group-hover:scale-105 transition-transform duration-600" />
                  <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3">
                    <span className={`text-[9px] sm:text-[10px] font-bold ${tagBg} backdrop-blur-sm px-2 py-0.5 sm:py-1 rounded-full shadow`}>
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className={`font-bold ${text} text-xs sm:text-sm mb-1 leading-tight`}>{product.name}</h3>
                  <p className={`${muted} text-[10px] sm:text-xs leading-relaxed mb-2 sm:mb-3`}>{product.description}</p>
                  <a
                    href={`https://wa.me/62881037366555?text=Hi,%20I%20am%20interested%20in%20${encodeURIComponent(product.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] sm:text-xs font-bold text-amber-600 hover:text-amber-500 flex items-center gap-1 group/link"
                  >
                    Enquire Now <ArrowRight size={11} className="transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div variants={fadeUp} className="mt-10 sm:mt-12 text-center">
          <a
            href="https://wa.me/62881037366555?text=Hello%2C%20I%20would%20like%20to%20see%20your%20full%20product%20catalogue."
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border-2 font-bold hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base ${
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
  );
}

// ─── WHY CHOOSE US ────────────────────────────────────────────────────────────

function WhyChooseUs({ dark }) {
  return (
    <Section id="why" className="py-16 sm:py-20 lg:py-32 bg-[#1a3a5c] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-white/[0.02] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-amber-500/5 translate-y-1/2 -translate-x-1/4" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <motion.div variants={fadeUp} className="flex items-center gap-3 justify-center mb-4">
            <div className="h-px w-8 bg-amber-400/60" />
            <span className="text-amber-400 text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase">Why Choose Us</span>
            <div className="h-px w-8 bg-amber-400/60" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl lg:text-5xl font-black text-white leading-tight">
            The Kawan Baik
            <span className="text-amber-400"> Difference</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 sm:mt-4 text-white/50 max-w-xl mx-auto text-sm sm:text-base">
            We don't just supply products — we build partnerships that help your property shine.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {WHY_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              custom={i}
              className="group p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.09] hover:border-amber-400/30 transition-all duration-400"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/20 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 sm:mb-5 group-hover:bg-amber-500/30 transition-colors">
                {item.icon}
              </div>
              <h3 className="font-black text-white text-base sm:text-lg mb-2">{item.title}</h3>
              <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CTA() {
  return (
    <Section id="cta" className="py-16 sm:py-24 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px"}} />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl lg:text-5xl font-black text-white leading-tight mb-4">
          Ready to Transform Your
          <br />Guest Experience?
        </motion.h2>
        <motion.p variants={fadeUp} className="text-white/80 text-sm sm:text-lg mb-8 sm:mb-10 max-w-xl mx-auto">
          Contact us today for a personalised quote. Fast response, no obligation — just a friendly conversation about your needs.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
          <a
            href="https://wa.me/62881037366555?text=Hello%20PT%20Kawan%20Baik%20Bali%2C%20I%20would%20like%20to%20discuss%20hotel%20amenities%20supply."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white text-amber-600 font-black shadow-2xl shadow-amber-900/30 hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
          >
            <MessageCircle size={18} />
            Chat on WhatsApp
          </a>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border-2 border-white text-white font-black hover:bg-white hover:text-amber-600 transition-all duration-300 text-sm sm:text-base"
          >
            Send Enquiry
          </button>
        </motion.div>
      </div>
    </Section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────

function Contact({ dark }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", hotel: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Hello PT Kawan Baik Bali,%0AName: ${form.name}%0AEmail: ${form.email}%0APhone: ${form.phone}%0AHotel/Property: ${form.hotel}%0AMessage: ${form.message}`;
    window.open(`https://wa.me/62881037366555?text=${msg}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  const bg = dark ? "bg-[#071526]" : "bg-[#f8f9fc]";
  const text = dark ? "text-white" : "text-[#1a3a5c]";
  const muted = dark ? "text-white/50" : "text-slate-500";
  const cardBg = dark ? "bg-[#0d1f33] border-white/10" : "bg-white border-slate-100";
  const inputStyle = dark
    ? "bg-[#071526] border-white/15 text-white placeholder:text-white/25 focus:border-amber-400 focus:ring-amber-400/10"
    : "bg-white border-slate-200 text-slate-800 placeholder:text-slate-300 focus:border-[#1a3a5c] focus:ring-[#1a3a5c]/10";
  const labelStyle = dark ? "text-white/50" : "text-slate-600";
  const formBg = dark ? "bg-[#0d1f33]" : "bg-white";

  const CONTACT_INFO = [
    { icon: <Phone size={18} />, label: "Phone", value: "+62 8810 3736 6555", href: "tel:+62881037366555" },
    { icon: <Mail size={18} />, label: "Email", value: "hello@kawanbaikbali.com", href: "mailto:hello@kawanbaikbali.com" },
    { icon: <Globe size={18} />, label: "Website", value: "www.kawanbaikbali.com", href: "https://kawanbaikbali.com" },
    { icon: <MapPin size={18} />, label: "Address", value: "Blk. A3 No.31, Kerobokan Kaja, Kec. Kuta Utara, Kabupaten Badung, Bali 80361", href: "#" },
  ];

  return (
    <Section id="contact" className={`py-16 sm:py-20 lg:py-32 ${bg} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <SectionLabel text="Get In Touch" dark={dark} />
          <motion.h2 variants={fadeUp} className={`text-2xl sm:text-3xl lg:text-5xl font-black ${text}`}>
            Contact Us
          </motion.h2>
          <motion.p variants={fadeUp} className={`mt-3 sm:mt-4 ${muted} max-w-xl mx-auto text-sm sm:text-base`}>
            Ready to elevate your guest experience? Our team responds within 24 hours.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Info */}
          <div>
            <motion.div variants={fadeUp} className="grid grid-cols-1 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {CONTACT_INFO.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className={`flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl ${cardBg} border shadow-sm hover:shadow-md hover:border-amber-200 transition-all group`}
                >
                  <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    dark ? "bg-white/5 text-amber-400 group-hover:bg-amber-500/20" : "bg-[#1a3a5c]/5 text-[#1a3a5c] group-hover:bg-amber-50 group-hover:text-amber-600"
                  }`}>
                    {c.icon}
                  </div>
                  <div>
                    <p className={`text-[10px] sm:text-xs font-semibold ${muted} uppercase tracking-wide`}>{c.label}</p>
                    <p className={`font-semibold ${text} text-xs sm:text-sm mt-0.5`}>{c.value}</p>
                  </div>
                </a>
              ))}
            </motion.div>

            {/* Map */}
            <motion.div variants={fadeUp} className="rounded-xl sm:rounded-2xl overflow-hidden shadow-md h-48 sm:h-56 bg-slate-200">
              <iframe
                title="PT Kawan Baik Bali Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63113.85610286814!2d115.09525772167969!3d-8.632811999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd239002f2a6e75%3A0xbc7b96b8221e62de!2sKawan%20Baik%20Bali!5e0!3m2!1sid!2sid!4v1779019519297!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>

          {/* Form */}
          <motion.div variants={fadeUp} className={`${formBg} rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8`}>
            <h3 className={`font-black ${text} text-lg sm:text-xl mb-5 sm:mb-6`}>Send Us a Message</h3>

            {sent && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs sm:text-sm font-medium"
              >
                <CheckCircle size={16} /> Message sent! We'll get back to you soon.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {[
                { name: "name", label: "Full Name", placeholder: "John Smith", type: "text" },
                { name: "email", label: "Email Address", placeholder: "john@hotel.com", type: "email" },
                { name: "phone", label: "Phone Number", placeholder: "+62 812-xxxx-xxxx", type: "tel" },
                { name: "hotel", label: "Hotel / Property Name", placeholder: "The Grand Bali Resort", type: "text" },
              ].map((field) => (
                <div key={field.name}>
                  <label className={`block text-[10px] sm:text-xs font-semibold ${labelStyle} mb-1.5 uppercase tracking-wide`}>{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    onChange={handleChange}
                    required={field.name === "name" || field.name === "email"}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 transition-all ${inputStyle}`}
                  />
                </div>
              ))}
              <div>
                <label className={`block text-[10px] sm:text-xs font-semibold ${labelStyle} mb-1.5 uppercase tracking-wide`}>Message</label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us about your amenity requirements..."
                  value={form.message}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 transition-all resize-none ${inputStyle}`}
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#1a3a5c] to-[#2c6e8a] text-white font-bold shadow-lg shadow-[#1a3a5c]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm"
              >
                <Send size={14} />
                Send via WhatsApp
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer({ dark }) {
  const QUICK_LINKS = ["Home", "About Us", "Products", "Why Choose Us", "Contact"];
  const PRODUCTS_LINKS = ["Personal Care", "Comfort Items", "Convenience Goods", "Eco-Friendly"];
  const SOCIAL = [
    { icon: <Instagram size={16} />, href: "https://www.instagram.com/kawanbaikbali/", label: "Instagram" },
    { icon: <Facebook size={16} />, href: "https://www.facebook.com/share/1Hix42FsyX/", label: "Facebook" },
    { icon: <Linkedin size={16} />, href: "#", label: "LinkedIn" },
    { icon: <Twitter size={16} />, href: "#", label: "Twitter" },
  ];

  return (
    <footer className="bg-[#0d2137] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#1a3a5c] to-[#2c6e8a] border border-white/10 flex items-center justify-center">
                <span className="text-amber-400 font-black text-base sm:text-lg">K</span>
              </div>
              <div>
                <p className="font-black text-sm sm:text-base leading-none">Kawan Baik Bali</p>
                <p className="text-amber-400 text-[9px] sm:text-[10px] tracking-widest uppercase font-medium">PT</p>
              </div>
            </div>
            <p className="text-white/40 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
              Bali's trusted hotel amenities supplier — delivering quality, luxury, and sustainability to properties across Indonesia.
            </p>
            <div className="flex gap-2.5 sm:gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-amber-500/20 hover:text-amber-400 hover:border-amber-500/30 transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-white/80 mb-4 sm:mb-5 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {QUICK_LINKS.map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase().replace(" ", "-")}`} className="text-white/40 text-xs sm:text-sm hover:text-amber-400 transition-colors flex items-center gap-1.5 group">
                    <ChevronRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-white/80 mb-4 sm:mb-5 uppercase tracking-wider">Our Products</h4>
            <ul className="space-y-2 sm:space-y-3">
              {PRODUCTS_LINKS.map((l) => (
                <li key={l}>
                  <a href="#categories" className="text-white/40 text-xs sm:text-sm hover:text-amber-400 transition-colors flex items-center gap-1.5 group">
                    <ChevronRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <h4 className="font-bold text-xs sm:text-sm text-white/80 mb-4 sm:mb-5 uppercase tracking-wider">Contact Info</h4>
            <div className="space-y-3 sm:space-y-4">
              {[
                { icon: <Phone size={13} />, text: "+62 8810-3736-6555", href: "tel:+62881037366555" },
                { icon: <Mail size={13} />, text: "hello@kawanbaikbali.com", href: "mailto:hello@kawanbaikbali.com" },
                { icon: <MapPin size={13} />, text: "Kuta utara, Badung, Bali 80361", href: "#" },
              ].map((c) => (
                <a key={c.text} href={c.href} className="flex items-start gap-2.5 sm:gap-3 text-white/40 text-xs sm:text-sm hover:text-white/70 transition-colors group">
                  <span className="mt-0.5 text-amber-400/60 shrink-0">{c.icon}</span>
                  {c.text}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-white/30 text-[10px] sm:text-xs text-center sm:text-left">
            © {new Date().getFullYear()} PT Kawan Baik Bali. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6">
            {["Privacy Policy", "Terms of Service"].map((l) => (
              <a key={l} href="#" className="text-white/30 text-[10px] sm:text-xs hover:text-white/60 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── SCROLL TO TOP ────────────────────────────────────────────────────────────

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", fn);
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
        >
          <ChevronRight size={18} className="-rotate-90" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [dark, setDark] = useDarkMode();

  return (
    <div
      className="min-h-screen font-sans antialiased transition-colors duration-300"
      style={{ fontFamily: "'Outfit', 'DM Sans', sans-serif", background: dark ? "#071526" : "#ffffff" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        html { scroll-behavior: smooth; }
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; }
        ::selection { background: #c9a84c; color: #fff; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${dark ? "#071526" : "#f0f0f0"}; }
        ::-webkit-scrollbar-thumb { background: ${dark ? "#c9a84c" : "#1a3a5c"}; border-radius: 10px; }

        /* Responsive xs breakpoint helper */
        @media (min-width: 480px) {
          .xs\\:flex-row { flex-direction: row; }
          .xs\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
      `}</style>
      <Header dark={dark} setDark={setDark} />
      <main>
        <Hero dark={dark} />
        <About dark={dark} />
        <ProductCategories dark={dark} />
        <FeaturedProducts dark={dark} />
        <WhyChooseUs dark={dark} />
        <CTA />
        <Contact dark={dark} />
      </main>
      <Footer dark={dark} />
      <ScrollToTop />
    </div>
  );
}