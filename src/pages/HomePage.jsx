import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowRight, MessageCircle, CheckCircle, Package,
  Leaf, Award, Sparkles, Shield, Star, Heart,
  Droplets, Shirt, ChevronRight
} from "lucide-react";
import { fadeUp, stagger } from "../animations";
import { Section, SectionLabel, SEOHead, ProductImage } from "../components/ui";
import { PRODUCT_CATEGORIES, PRODUCTS, WHY_ITEMS, GALLERY_PHOTOS } from "../data";

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero({ dark }) {
  const navigate = useNavigate();
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/hero.jpeg"
          alt="Gapura Bali — Hotel Amenities Supplier Bali | PT Kawan Baik Bali"
          className="w-full h-full object-cover"
          style={{
            minHeight: "100vh",
            objectPosition: "center 30%",
          }}
          loading="eager"
          fetchPriority="high"
        />
        {/* Gradient kiri — lebih tipis agar foto tetap cerah */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2137]/70 via-[#0d2137]/25 to-transparent" />
        {/* Gradient bawah tipis */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2137]/50 via-transparent to-transparent" />
      </div>

      <div className="absolute top-24 right-4 sm:right-10 lg:right-32 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 rounded-full border border-amber-400/20 animate-pulse" />
      <div className="absolute top-32 right-10 sm:right-20 lg:right-40 w-20 sm:w-32 lg:w-40 h-20 sm:h-32 lg:h-40 rounded-full border border-amber-400/10" />

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
            className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] tracking-tight mb-5 sm:mb-6"
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
            Enhancing guest experiences with quality, luxury, and sustainability
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-row flex-wrap gap-3 sm:gap-4"
          >
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold shadow-xl shadow-amber-900/30 hover:shadow-amber-500/50 hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
            >
              View Products <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full border-2 border-white/40 text-white font-bold hover:bg-white/10 hover:border-white/70 hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT SNIPPET ────────────────────────────────────────────────────────────

function AboutSnippet({ dark }) {
  const bg = dark ? "bg-[#0d1f33]" : "bg-white";
  const text = dark ? "text-white" : "text-[#1a3a5c]";
  const muted = dark ? "text-white/60" : "text-slate-600";
  const cardBg = dark ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-100";

  return (
    <Section id="about-snippet" className={`py-16 sm:py-20 lg:py-32 ${bg} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div variants={fadeUp} className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[3/4] shadow-2xl">
              <video
                src="/view_products.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a5c]/30 via-transparent" />
            </div>
          </motion.div>

          <div className="order-1 lg:order-2">
            <SectionLabel text="About Us" />
            <motion.h2 variants={fadeUp} className={`text-3xl sm:text-3xl lg:text-4xl xl:text-5xl font-black ${text} leading-tight mb-5 sm:mb-6`}>
              Bali's Most Trusted Hotel
              <span className="text-amber-500"> Amenities Partner</span>
            </motion.h2>
            <motion.div variants={fadeUp} className={`space-y-4 ${muted} leading-relaxed text-sm sm:text-base`}>
              <p>
                <strong className={text}>PT Kawan Baik Bali</strong> is a leading hospitality supply company headquartered in Bali, Indonesia. We specialise in providing comprehensive hotel amenities for hotels, resorts, villas, and spas across the archipelago.
              </p>
              <p>
                We believe the right amenities tell your guests: <em>"We care."</em> Our mission is to help every property deliver that experience — affordably, reliably, and beautifully.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-6 sm:mt-8">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-bold text-sm group"
                style={{ color: dark ? "#f59e0b" : "#1a3a5c" }}
              >
                Learn More About Us
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── FEATURED CATEGORIES ──────────────────────────────────────────────────────

function FeaturedCategories({ dark }) {
  const bg = dark ? "bg-[#071526]" : "bg-[#f8f9fc]";
  const text = dark ? "text-white" : "text-[#1a3a5c]";
  const muted = dark ? "text-white/50" : "text-slate-500";
  const cardBg = dark ? "bg-[#0d1f33] shadow-black/30" : "bg-white shadow-slate-200/80";
  const tagBg = dark ? "bg-white/10 text-white/70" : "bg-slate-100 text-slate-600";

  return (
    <Section id="categories" className={`py-16 sm:py-20 lg:py-32 ${bg} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <SectionLabel text="What We Offer" />
          <motion.h2 variants={fadeUp} className={`text-3xl sm:text-3xl lg:text-5xl font-black ${text} leading-tight`}>
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
              className={`group rounded-2xl sm:rounded-3xl overflow-hidden ${cardBg} shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer`}
              style={{ willChange: "transform" }}
            >
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div
                  className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white"
                  style={{ backgroundColor: cat.color }}
                >
                  {i === 0 ? <Droplets size={22} /> : i === 1 ? <Shirt size={22} /> : i === 2 ? <Package size={22} /> : <Leaf size={22} />}
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <h3 className={`font-black ${text} text-base mb-2 leading-tight`}>{cat.name}</h3>
                <p className={`${muted} text-sm leading-relaxed mb-3 sm:mb-4`}>{cat.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-3 sm:mb-4">
                  {cat.items.slice(0, 3).map((item) => (
                    <span key={item} className={`text-xs font-semibold ${tagBg} px-2 py-0.5 rounded-full`}>{item}</span>
                  ))}
                  {cat.items.length > 3 && (
                    <span className={`text-xs font-semibold ${tagBg} px-2 py-0.5 rounded-full`}>+{cat.items.length - 3}</span>
                  )}
                </div>
                <Link
                  to={`/products/${cat.slug}`}
                  className="flex items-center gap-1 text-sm font-bold group/btn"
                  style={{ color: cat.color }}
                >
                  Explore
                  <ChevronRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="mt-10 sm:mt-12 text-center">
          <Link
            to="/products"
            className={`inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border-2 font-bold hover:-translate-y-0.5 transition-all duration-200 text-sm sm:text-base ${
              dark
                ? "border-amber-500 text-amber-400 hover:bg-amber-500/10"
                : "border-[#1a3a5c] text-[#1a3a5c] hover:bg-[#1a3a5c] hover:text-white"
            }`}
          >
            View All Products <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </Section>
  );
}


// ─── MAP SECTION ─────────────────────────────────────────────────────────────

function MapSection({ dark }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const text = dark ? "text-white" : "text-[#1a3a5c]";
  const muted = dark ? "text-white/50" : "text-slate-500";

  return (
    <Section
      id="location"
      className={`py-14 sm:py-20 transition-colors duration-300 ${dark ? "bg-[#0d1f33]" : "bg-[#f8f9fc]"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          {/* Text side */}
          <div>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-amber-500" />
              <span className="text-amber-600 text-xs font-bold tracking-[0.25em] uppercase">Our Location</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className={`text-3xl sm:text-4xl font-black ${text} leading-tight mb-4`}>
              Visit Our Office<br />in Bali
            </motion.h2>
            <motion.p variants={fadeUp} className={`${muted} text-sm sm:text-base leading-relaxed mb-6`}>
              Kami berlokasi di Kerobokan Kaja, Kuta Utara — mudah dijangkau dari kawasan Seminyak, Canggu, dan Denpasar. Tim kami siap menyambut kunjungan Anda untuk diskusi kebutuhan hotel amenities.
            </motion.p>
            <motion.div variants={fadeUp} className="space-y-3">
              <div className={`flex items-start gap-3 text-sm ${muted}`}>
                <span className="text-amber-500 mt-0.5">📍</span>
                <span>Blk. A3 No.31, Kerobokan Kaja, Kec. Kuta Utara,<br />Kabupaten Badung, Bali 80361</span>
              </div>
              <div className={`flex items-center gap-3 text-sm ${muted}`}>
                <span className="text-amber-500">📞</span>
                <a href="tel:+62881037366555" className="hover:text-amber-500 transition-colors">+62 8810 3736 6555</a>
              </div>
              <div className={`flex items-center gap-3 text-sm ${muted}`}>
                <span className="text-amber-500">✉️</span>
                <a href="mailto:kawanbaik.bali@gmail.com" className="hover:text-amber-500 transition-colors">kawanbaik.bali@gmail.com</a>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-7">
              <a
                href="https://maps.google.com/?q=Kawan+Baik+Bali"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 font-bold text-sm hover:-translate-y-0.5 transition-all duration-200 ${
                  dark
                    ? "border-amber-500 text-amber-400 hover:bg-amber-500/10"
                    : "border-[#1a3a5c] text-[#1a3a5c] hover:bg-[#1a3a5c] hover:text-white"
                }`}
              >
                Open in Google Maps <ArrowRight size={14} />
              </a>
            </motion.div>
          </div>

          {/* Map side */}
          <motion.div variants={fadeUp} className="w-full">
            <div className={`rounded-2xl overflow-hidden shadow-xl border ${dark ? "border-white/10" : "border-slate-200"}`} style={{ height: "380px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.6160619548473!2d115.16478057433676!3d-8.632806687760878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd239002f2a6e75%3A0xbc7b96b8221e62de!2sKawan%20Baik%20Bali!5e0!3m2!1sid!2sid!4v1779453064729!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kawan Baik Bali Office Location"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}

// ─── CTA SECTION ─────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <Section id="cta" className="py-16 sm:py-24 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)", backgroundSize: "40px 40px"}} />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.h2 variants={fadeUp} className="text-3xl sm:text-3xl lg:text-5xl font-black text-white leading-tight mb-4">
          Ready to Transform Your
          <br />Guest Experience?
        </motion.h2>
        <motion.p variants={fadeUp} className="text-white/80 text-sm sm:text-lg mb-8 sm:mb-10 max-w-xl mx-auto">
          Contact us today for a personalised quote. Fast response, no obligation — just a friendly conversation about your needs.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-row flex-wrap gap-3 sm:gap-4 justify-center">
          <a
            href="https://wa.me/62881037366555?text=Hello%20PT%20Kawan%20Baik%20Bali%2C%20I%20would%20like%20to%20discuss%20hotel%20amenities%20supply."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white text-amber-600 font-black shadow-2xl shadow-amber-900/30 hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
          >
            <MessageCircle size={18} />
            Chat on WhatsApp
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border-2 border-white text-white font-black hover:bg-white hover:text-amber-600 transition-all duration-300 text-sm sm:text-base"
          >
            Send Enquiry
          </Link>
        </motion.div>
      </div>
    </Section>
  );
}


// ─── CLIENTS BANNER ───────────────────────────────────────────────────────────

function ClientsBanner({ dark }) {
  const bg   = dark ? "bg-[#0a1929]"  : "bg-[#f0f4f8]";
  const text = dark ? "text-white"    : "text-[#1a3a5c]";
  const muted = dark ? "text-white/50" : "text-slate-500";

  return (
    <section className={`py-14 sm:py-16 transition-colors duration-300 ${bg}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-amber-500" />
            <span className="text-amber-600 text-xs font-bold tracking-[0.25em] uppercase">Our Clients</span>
            <div className="h-px w-8 bg-amber-500" />
          </motion.div>
          <motion.h2 variants={fadeUp} className={`text-3xl sm:text-4xl font-black ${text} mb-3`}>
            Hotel & Resort di Bali<br className="hidden sm:block" /> yang Mempercayai Kami
          </motion.h2>
          <motion.p variants={fadeUp} className={`${muted} text-sm sm:text-base mb-8`}>
            Kami bangga melayani berbagai hotel dan resort di Bali — dari properti butik hingga hotel berbintang. Kepercayaan klien adalah prioritas utama kami.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/clients"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1a3a5c] text-white font-black text-sm hover:bg-amber-500 hover:-translate-y-1 transition-all duration-300 shadow-lg"
            >
              Lihat Semua Klien Kami <ArrowRight size={16} />
            </Link>
            <Link
              to="/about#vibe"
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 font-black text-sm hover:-translate-y-1 transition-all duration-300 ${
                dark
                  ? "border-amber-500 text-amber-400 hover:bg-amber-500/10"
                  : "border-[#1a3a5c] text-[#1a3a5c] hover:bg-[#1a3a5c] hover:text-white"
              }`}
            >
              🎵 Our Vibe
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────

export default function HomePage({ dark }) {
  return (
    <>
      <SEOHead
        title="Hotel Amenities Supplier in Bali | PT Kawan Baik Bali"
        description="PT Kawan Baik Bali — trusted hotel amenities & hospitality supplier in Bali, Indonesia. We supply toiletries, towels, bathrobes, slippers & eco-friendly amenities to 500+ hotels across Bali. Fast delivery, flexible MOQ."
        canonical="https://www.kawanbaikbali.com/"
        ogImage="https://www.kawanbaikbali.com/og-image.jpeg"
      />
      <main>
        <Hero dark={dark} />
        <AboutSnippet dark={dark} />
        <FeaturedCategories dark={dark} />
        <ClientsBanner dark={dark} />
        <MapSection dark={dark} />
        <CTASection />
      </main>
    </>
  );
}
