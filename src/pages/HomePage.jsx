import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  FileText,
  Plus,
  Check,
  ChevronDown,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { fadeUp } from "../animations";
import { Section, SectionLabel, SEOHead, ProductImage } from "../components/ui";
import {
  PRODUCT_CATEGORIES,
  PRODUCTS,
  getLocalizedCategory,
  getLocalizedProduct,
} from "../data";
import { useLanguage } from "../context/LanguageContext";
import { useRFQ } from "../context/RFQContext";

const FEATURED_CLIENTS = [
  { name: "Padma Resort Legian", img: "/clients/padma-resort-legian.jpg" },
  { name: "Lv8 Resort Hotel Canggu", img: "/clients/lv8-resort-hotel-canggu.jpg" },
  { name: "FuramaXclusive Seminyak", img: "/clients/furamaxclusive-ocean-beach-seminyak.jpg" },
  { name: "The Haven Seminyak", img: "/clients/the-haven-suite-hotel-villa-seminyak.jpg" },
  { name: "Golden Tulip Jineng Resort", img: "/clients/golden-tulip-jineng-resort-bali.jpg" },
  { name: "The 101 Bali Fontana", img: "/clients/the-101-hotel-fontana-seminyak.jpg" },
  { name: "Tijili Hotel Seminyak", img: "/clients/tijili-hotel-seminyak.jpg" },
  { name: "FuramaXclusive Villas Ubud", img: "/clients/furamaxclusive-villas-spa-ubud.jpg" },
];

const FEATURED_SLUGS = [
  "shampoo-conditioner-bungan-jepun",
  "vasanti-amenity-set",
  "eco-linen-amenity-set",
  "bath-towel-white-blue",
  "hotel-duvet-cover",
  "dental-kit",
  "hotel-slippers-woven-beige-linen",
  "payung-mazari-group-hitam-side",
];

// ─── 00. HERO ────────────────────────────────────────────────────────────────
function Hero() {
  const { t } = useLanguage();
  const metrics = t("hero.metrics") || [];

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden bg-[#08111c]">
      {/* Background image with architectural dark grading */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero.jpeg"
          alt="PT Kawan Baik Bali — Hotel Amenities Supplier in Bali"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08111c]/95 via-[#08111c]/80 to-[#08111c]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08111c] via-transparent to-[#08111c]/40" />
      </div>

      {/* Main Hero Copy */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-16">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-white/10 border border-white/15 backdrop-blur-sm mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a55c]" />
            <span className="text-[#e0c280] text-[11px] font-bold tracking-[0.18em] uppercase">
              {t("hero.eyebrow")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.12] tracking-tight mb-6"
          >
            {t("hero.titleLine1")}
            <span className="block text-[#d4b06a] font-serif-editorial italic font-normal mt-1">
              {t("hero.titleLine2")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base lg:text-[17px] text-slate-300 leading-relaxed mb-9 max-w-2xl"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3.5"
          >
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#b58e4c] hover:bg-[#a37d3c] text-white font-bold text-xs sm:text-sm tracking-wide transition-all"
            >
              <span>{t("hero.viewProducts")}</span>
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/rfq"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg border border-white/25 bg-white/5 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm tracking-wide backdrop-blur-sm transition-all"
            >
              <FileText size={15} className="text-[#d4b06a]" />
              <span>{t("hero.requestQuote")}</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom Operational Specification Bar */}
      <div className="relative z-10 border-t border-white/10 bg-[#08111c]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {Array.isArray(metrics) &&
              metrics.map((m, idx) => (
                <div
                  key={idx}
                  className={`${
                    idx > 0 ? "lg:border-l lg:border-white/10 lg:pl-8" : ""
                  }`}
                >
                  <p className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                    {m.value}
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                    {m.label}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CLIENT TRUST STRIP ──────────────────────────────────────────────────────
function ClientTrustStrip({ dark }) {
  const { t } = useLanguage();
  const bg = dark ? "bg-[#0b1623] border-white/10" : "bg-white border-slate-200/80";
  const text = dark ? "text-white" : "text-[#0f2236]";
  const muted = dark ? "text-slate-400" : "text-slate-500";

  return (
    <section className={`py-10 sm:py-12 border-b transition-colors ${bg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-7">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#b58e4c]">
              {t("home.clientsEyebrow")}
            </p>
            <h2 className={`text-lg sm:text-xl font-bold ${text} mt-0.5`}>
              {t("home.clientsTitle")}
            </h2>
          </div>
          <Link
            to="/clients"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#b58e4c] hover:underline shrink-0"
          >
            <span>{t("home.clientsLink")}</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {FEATURED_CLIENTS.map((client) => (
            <Link
              key={client.name}
              to="/clients"
              title={client.name}
              className={`h-20 rounded-xl border p-3 flex items-center justify-center transition-all ${
                dark
                  ? "bg-white/[0.03] border-white/10 hover:border-[#b58e4c]/40"
                  : "bg-[#faf8f5] border-slate-200/70 hover:border-[#b58e4c]/50"
              }`}
            >
              <img
                src={client.img}
                alt={client.name}
                loading="lazy"
                className="max-h-full max-w-full object-contain"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 01. PRODUCT CATEGORIES GRID ─────────────────────────────────────────────
function CategoriesSection({ dark }) {
  const { lang, t } = useLanguage();
  const bg = dark ? "bg-[#08111c]" : "bg-[#faf8f5]";
  const text = dark ? "text-white" : "text-[#0f2236]";
  const muted = dark ? "text-slate-400" : "text-slate-600";
  const cardBg = dark
    ? "bg-[#0e1b2b] border-white/10 hover:border-[#b58e4c]/50"
    : "bg-white border-slate-200/80 hover:border-[#b58e4c]/60";

  return (
    <Section id="categories" className={`py-16 sm:py-24 ${bg} transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <SectionLabel text={t("home.catEyebrow")} />
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold ${text} tracking-tight`}>
              {t("home.catTitle")}
            </h2>
          </div>
          <p className={`${muted} text-xs sm:text-sm max-w-md leading-relaxed`}>
            {t("home.catSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {PRODUCT_CATEGORIES.map((cat, idx) => {
            const locCat = getLocalizedCategory(cat, lang);
            const itemCount = PRODUCTS.filter((p) => p.categorySlug === cat.slug).length;

            return (
              <motion.div
                key={cat.id}
                variants={fadeUp}
                className={`group rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${cardBg}`}
              >
                <div>
                  <Link
                    to={`/products/${cat.slug}`}
                    className="block relative h-52 overflow-hidden bg-slate-900"
                  >
                    <img
                      src={cat.image}
                      alt={locCat.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08111c]/80 via-transparent to-transparent" />
                    <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded bg-[#08111c]/75 backdrop-blur-sm border border-white/15 text-[10px] font-bold tracking-widest text-[#d4b06a] uppercase">
                      0{idx + 1} · {itemCount} SKU
                    </div>
                  </Link>

                  <div className="p-5 sm:p-6">
                    <Link to={`/products/${cat.slug}`}>
                      <h3 className={`font-bold ${text} text-lg mb-2 group-hover:text-[#b58e4c] transition-colors`}>
                        {locCat.name}
                      </h3>
                    </Link>
                    <p className={`${muted} text-xs sm:text-[13px] leading-relaxed mb-4 line-clamp-2`}>
                      {locCat.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {locCat.items.slice(0, 4).map((item) => (
                        <span
                          key={item}
                          className={`text-[11px] font-medium px-2.5 py-0.5 rounded border ${
                            dark
                              ? "bg-white/[0.03] border-white/10 text-slate-300"
                              : "bg-[#faf8f5] border-slate-200/80 text-slate-600"
                          }`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  className={`px-5 sm:px-6 py-3.5 border-t flex items-center justify-between ${
                    dark ? "border-white/5 bg-white/[0.01]" : "border-slate-100 bg-slate-50/50"
                  }`}
                >
                  <Link
                    to={`/products/${cat.slug}`}
                    className={`text-xs font-bold ${text} group-hover:text-[#b58e4c] inline-flex items-center gap-1.5 transition-colors`}
                  >
                    <span>{t("home.exploreCategory")}</span>
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// ─── 02. FEATURED PRODUCTS (READY FOR QUOTATION) ────────────────────────────
function FeaturedProductsSection({ dark }) {
  const { lang, t } = useLanguage();
  const { addItem, isInRFQ } = useRFQ();
  const navigate = useNavigate();

  const featuredProducts = FEATURED_SLUGS.map((slug) =>
    PRODUCTS.find((p) => p.slug === slug)
  ).filter(Boolean);

  const bg = dark ? "bg-[#0b1623]" : "bg-white";
  const text = dark ? "text-white" : "text-[#0f2236]";
  const muted = dark ? "text-slate-400" : "text-slate-600";
  const cardBg = dark
    ? "bg-[#0e1b2b] border-white/10 hover:border-[#b58e4c]/40"
    : "bg-white border-slate-200/80 hover:border-[#b58e4c]/50";

  return (
    <Section className={`py-16 sm:py-24 border-y ${dark ? "border-white/10" : "border-slate-200/70"} ${bg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <SectionLabel text={t("home.featuredEyebrow")} />
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold ${text} tracking-tight`}>
              {t("home.featuredTitle")}
            </h2>
            <p className={`${muted} text-xs sm:text-sm mt-2 leading-relaxed`}>
              {t("home.featuredSubtitle")}
            </p>
          </div>
          <Link
            to="/products"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border text-xs font-bold shrink-0 transition-all ${
              dark
                ? "border-white/15 text-white hover:bg-white/5"
                : "border-[#0f2236] text-[#0f2236] hover:bg-[#0f2236] hover:text-white"
            }`}
          >
            <span>{t("home.viewAllCatalog")}</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map((rawItem) => {
            const item = getLocalizedProduct(rawItem, lang);
            const inQuote = isInRFQ(rawItem.slug);

            return (
              <div
                key={rawItem.id}
                className={`group rounded-xl border overflow-hidden transition-all duration-200 flex flex-col justify-between ${cardBg}`}
              >
                <div>
                  <div
                    onClick={() => navigate(`/products/detail/${rawItem.slug}`)}
                    className={`relative h-48 overflow-hidden cursor-pointer ${
                      dark ? "bg-[#08111c]" : "bg-[#f6f4ef]"
                    }`}
                  >
                    <ProductImage
                      src={rawItem.image}
                      alt={item.name}
                      dark={dark}
                      className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#08111c]/75 text-white backdrop-blur-sm">
                      {item.categoryDisplay}
                    </span>
                  </div>

                  <div className="p-4">
                    <Link
                      to={`/products/detail/${rawItem.slug}`}
                      className={`font-bold text-sm ${text} hover:text-[#b58e4c] transition-colors line-clamp-1 mb-1`}
                    >
                      {item.name}
                    </Link>
                    <p className={`text-xs ${muted} line-clamp-2 leading-relaxed mb-3`}>
                      {item.description}
                    </p>
                    {rawItem.specs?.moq && (
                      <p className="text-[11px] font-medium text-[#b58e4c]">
                        MOQ: {rawItem.specs.moq}
                      </p>
                    )}
                  </div>
                </div>

                <div
                  className={`px-4 py-3 border-t flex items-center justify-between gap-2 ${
                    dark ? "border-white/5" : "border-slate-100"
                  }`}
                >
                  <Link
                    to={`/products/detail/${rawItem.slug}`}
                    className={`text-xs font-semibold ${muted} hover:${text} transition-colors`}
                  >
                    {t("product.viewDetails")}
                  </Link>

                  <button
                    type="button"
                    onClick={() => addItem(rawItem, 500, "custom")}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${
                      inQuote
                        ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                        : dark
                        ? "bg-[#b58e4c] text-white hover:bg-[#a37d3c]"
                        : "bg-[#0f2236] text-white hover:bg-[#b58e4c]"
                    }`}
                  >
                    {inQuote ? (
                      <>
                        <Check size={12} /> {t("product.addedShort")}
                      </>
                    ) : (
                      <>
                        <Plus size={12} /> {t("product.addShort")}
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// ─── 03. B2B PROCUREMENT WORKFLOW (4 STEPS) ──────────────────────────────────
function ProcurementProcessSection({ dark }) {
  const { t } = useLanguage();
  const steps = t("home.processSteps") || [];
  const bg = dark ? "bg-[#08111c]" : "bg-[#faf8f5]";
  const text = dark ? "text-white" : "text-[#0f2236]";
  const muted = dark ? "text-slate-400" : "text-slate-600";

  return (
    <Section className={`py-16 sm:py-24 ${bg} transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <SectionLabel text={t("home.processEyebrow")} />
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold ${text} tracking-tight mb-3`}>
            {t("home.processTitle")}
          </h2>
          <p className={`${muted} text-xs sm:text-sm leading-relaxed`}>
            {t("home.processSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.isArray(steps) &&
            steps.map((s) => (
              <div
                key={s.step}
                className={`p-6 rounded-2xl border flex flex-col justify-between ${
                  dark
                    ? "bg-[#0e1b2b] border-white/10"
                    : "bg-white border-slate-200/80"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-serif-editorial italic text-[#b58e4c]">
                      Step {s.step}
                    </span>
                    <span
                      className={`w-8 h-[1px] ${
                        dark ? "bg-white/15" : "bg-slate-200"
                      }`}
                    />
                  </div>
                  <h3 className={`font-bold text-base ${text} mb-2.5`}>
                    {s.title}
                  </h3>
                  <p className={`text-xs sm:text-[13px] ${muted} leading-relaxed`}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Section>
  );
}

// ─── 04. COMPANY PROFILE & WAREHOUSE LOCATION ────────────────────────────────
function CompanyAndLocationSection({ dark }) {
  const { t } = useLanguage();
  const points = t("home.profilePoints") || [];
  const bg = dark ? "bg-[#0b1623]" : "bg-white";
  const text = dark ? "text-white" : "text-[#0f2236]";
  const muted = dark ? "text-slate-400" : "text-slate-600";

  return (
    <Section className={`py-16 sm:py-24 border-t ${dark ? "border-white/10" : "border-slate-200/70"} ${bg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Company Profile & Video (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <SectionLabel text={t("home.profileEyebrow")} />
              <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold ${text} tracking-tight mb-4`}>
                {t("home.profileTitle")}
              </h2>
              <div className={`space-y-3.5 text-xs sm:text-sm ${muted} leading-relaxed`}>
                <p>{t("home.profileP1")}</p>
                <p>{t("home.profileP2")}</p>
              </div>
            </div>

            <div className="space-y-2.5 pt-1">
              {Array.isArray(points) &&
                points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-[13px]">
                    <CheckCircle2 size={16} className="text-[#b58e4c] shrink-0 mt-0.5" />
                    <span className={text}>{pt}</span>
                  </div>
                ))}
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/about"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-colors ${
                  dark
                    ? "bg-[#b58e4c] text-white hover:bg-[#a37d3c]"
                    : "bg-[#0f2236] text-white hover:bg-[#1a3552]"
                }`}
              >
                <span>{t("common.readMore")}</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/contact"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border text-xs font-bold transition-colors ${
                  dark
                    ? "border-white/15 text-white hover:bg-white/5"
                    : "border-slate-300 text-[#0f2236] hover:bg-slate-50"
                }`}
              >
                <span>{t("common.contactUs")}</span>
              </Link>
            </div>
          </div>

          {/* Right: Kerobokan Warehouse Card + Map (5 cols) */}
          <div className="lg:col-span-5">
            <div
              className={`rounded-2xl border overflow-hidden ${
                dark ? "bg-[#0e1b2b] border-white/10" : "bg-[#faf8f5] border-slate-200/80"
              }`}
            >
              <div className="h-56 w-full bg-slate-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.6160619548473!2d115.16478057433676!3d-8.632806687760878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd239002f2a6e75%3A0xbc7b96b8221e62de!2sKawan%20Baik%20Bali!5e0!3m2!1sid!2sid!4v1779453064729!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="PT Kawan Baik Bali Location"
                />
              </div>
              <div className="p-5 sm:p-6 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b58e4c]">
                  {t("footer.headOffice")}
                </p>
                <h3 className={`font-bold text-base ${text}`}>
                  PT Kawan Baik Bali
                </h3>
                <div className={`space-y-2 text-xs ${muted}`}>
                  <p className="flex items-start gap-2">
                    <MapPin size={14} className="text-[#b58e4c] shrink-0 mt-0.5" />
                    <span>{t("common.address")}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone size={14} className="text-[#b58e4c] shrink-0" />
                    <a href="tel:+62881037366555" className="hover:underline">
                      +62 8810-3736-6555
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail size={14} className="text-[#b58e4c] shrink-0" />
                    <a href="mailto:kawanbaik.bali@gmail.com" className="hover:underline">
                      kawanbaik.bali@gmail.com
                    </a>
                  </p>
                </div>
                <div className="pt-2">
                  <a
                    href="https://maps.google.com/?q=Kawan+Baik+Bali"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#b58e4c] hover:underline"
                  >
                    <span>{t("contact.openMaps")}</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── 05. B2B PURCHASING FAQ SECTION ──────────────────────────────────────────
function FAQSection({ dark }) {
  const { t } = useLanguage();
  const faqs = t("home.faqs") || [];
  const [openIdx, setOpenIdx] = useState(0);

  const bg = dark ? "bg-[#08111c]" : "bg-[#faf8f5]";
  const text = dark ? "text-white" : "text-[#0f2236]";
  const muted = dark ? "text-slate-400" : "text-slate-600";

  return (
    <Section className={`py-16 sm:py-24 border-t ${dark ? "border-white/10" : "border-slate-200/70"} ${bg}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <SectionLabel text={t("home.faqEyebrow")} />
          <h2 className={`text-2xl sm:text-3xl font-extrabold ${text} tracking-tight`}>
            {t("home.faqTitle")}
          </h2>
        </div>

        <div className="space-y-3">
          {Array.isArray(faqs) &&
            faqs.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-xl border transition-colors ${
                    dark
                      ? "bg-[#0e1b2b] border-white/10"
                      : "bg-white border-slate-200/80"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4"
                  >
                    <span className={`font-bold text-xs sm:text-sm ${text}`}>
                      {item.q}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-[#b58e4c] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div
                      className={`px-5 pb-4 pt-1 text-xs sm:text-[13px] ${muted} leading-relaxed border-t ${
                        dark ? "border-white/5" : "border-slate-100"
                      }`}
                    >
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </Section>
  );
}

// ─── B2B CONSULTATION CTA ────────────────────────────────────────────────────
function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-20 bg-[#0f2236] border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d4b06a] mb-2">
              {t("home.ctaEyebrow")}
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-3">
              {t("home.ctaTitle")}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {t("home.ctaDesc")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/rfq"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#b58e4c] hover:bg-[#a37d3c] text-white font-bold text-xs sm:text-sm transition-colors"
            >
              <FileText size={16} />
              <span>{t("hero.requestQuote")}</span>
            </Link>
            <a
              href="https://wa.me/62881037366555?text=Hello%20PT%20Kawan%20Baik%20Bali%2C%20I%20would%20like%20to%20inquire%20about%20hotel%20amenities%20supply."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-white/25 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm transition-colors"
            >
              <MessageCircle size={16} />
              <span>{t("common.whatsappFast")}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
export default function HomePage({ dark }) {
  const { t } = useLanguage();
  const faqs = t("home.faqs") || [];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: Array.isArray(faqs)
      ? faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        }))
      : [],
  };

  return (
    <>
      <SEOHead
        title="Hotel Amenities Supplier in Bali | PT Kawan Baik Bali"
        description="PT Kawan Baik Bali — supplier hotel amenities & perlengkapan kamar hotel di Bali. Menyediakan toiletries, handuk hotel, sandal kamar, dry amenities & produk eco-friendly untuk hotel, resort & villa."
        canonical="https://www.kawanbaikbali.com/"
        ogImage="https://www.kawanbaikbali.com/og-image.jpeg"
        schema={faqSchema}
      />
      <main>
        <Hero />
        <ClientTrustStrip dark={dark} />
        <CategoriesSection dark={dark} />
        <FeaturedProductsSection dark={dark} />
        <ProcurementProcessSection dark={dark} />
        <CompanyAndLocationSection dark={dark} />
        <FAQSection dark={dark} />
        <CTASection />
      </main>
    </>
  );
}
