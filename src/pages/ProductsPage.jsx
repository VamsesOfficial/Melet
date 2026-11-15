import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  FileText,
  Plus,
  Check,
  Search,
  X,
  MessageCircle,
} from "lucide-react";
import { SEOHead, SectionLabel, ProductImage } from "../components/ui";
import {
  PRODUCTS,
  PRODUCT_CATEGORIES,
  getLocalizedProduct,
  getLocalizedCategory,
} from "../data";
import { useLanguage } from "../context/LanguageContext";
import { useRFQ } from "../context/RFQContext";

export default function ProductsPage({ dark }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialQuery = searchParams.get("q") || "";

  const [filter, setFilter] = useState(initialCategory);
  const [query, setQuery] = useState(initialQuery);

  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const { addItem, isInRFQ, totalItems } = useRFQ();

  useEffect(() => {
    const qParam = searchParams.get("q");
    if (qParam !== null) setQuery(qParam);
  }, [searchParams]);

  const localizedProducts = PRODUCTS.map((p) => getLocalizedProduct(p, lang));

  const filtered = localizedProducts.filter((p) => {
    const matchesCategory = filter === "All" || p.categorySlug === filter;
    if (!matchesCategory) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.categoryDisplay.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q)
    );
  });

  const bg = dark ? "bg-[#08111c]" : "bg-[#faf8f5]";
  const text = dark ? "text-white" : "text-[#0f2236]";
  const muted = dark ? "text-slate-400" : "text-slate-600";
  const cardBg = dark
    ? "bg-[#0e1b2b] border-white/10 hover:border-[#b58e4c]/50"
    : "bg-white border-slate-200/80 hover:border-[#b58e4c]/60";

  return (
    <>
      <SEOHead
        title={`${t("product.allProducts")} | PT Kawan Baik Bali`}
        description="Complete B2B catalog of hotel amenities in Bali: shampoo, shower gel, bar soap, hotel slippers, cotton bath towels, bed linen, dental kits, bamboo eco amenities & custom golf umbrellas."
        canonical="https://www.kawanbaikbali.com/products"
        ogImage="https://www.kawanbaikbali.com/og-image.jpeg"
      />

      <main className={`min-h-screen pt-28 sm:pt-36 pb-20 ${bg} transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs mb-6">
            <Link to="/" className={`${muted} hover:text-[#b58e4c] transition-colors`}>
              {t("nav.home")}
            </Link>
            <ChevronRight size={12} className={muted} />
            <span className={`font-semibold ${text}`}>{t("nav.products")}</span>
          </nav>

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200/70 dark:border-white/10">
            <div className="max-w-2xl">
              <SectionLabel text={t("product.catEyebrow")} />
              <h1 className={`text-3xl sm:text-4xl font-extrabold ${text} tracking-tight mb-3`}>
                {t("product.allProducts")}
              </h1>
              <p className={`${muted} text-xs sm:text-sm leading-relaxed`}>
                {t("product.catalogSubtitle")}
              </p>
            </div>

            {/* Search Input */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="relative">
                <Search
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("product.searchPlaceholder")}
                  className={`w-full pl-9 pr-8 py-2.5 rounded-lg border text-xs font-medium focus:outline-none focus:border-[#b58e4c] transition-colors ${
                    dark
                      ? "bg-[#0e1b2b] border-white/10 text-white placeholder:text-slate-500"
                      : "bg-white border-slate-200 text-[#0f2236] placeholder:text-slate-400"
                  }`}
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Category Filter Bar */}
          <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              <button
                type="button"
                onClick={() => setFilter("All")}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors shrink-0 border ${
                  filter === "All"
                    ? "bg-[#0f2236] dark:bg-[#b58e4c] text-white border-transparent"
                    : dark
                    ? "bg-[#0e1b2b] border-white/10 text-slate-300 hover:border-white/25"
                    : "bg-white border-slate-200/90 text-slate-700 hover:border-slate-300"
                }`}
              >
                {t("product.filterAll")} ({PRODUCTS.length})
              </button>

              {PRODUCT_CATEGORIES.map((cat) => {
                const locCat = getLocalizedCategory(cat, lang);
                const count = PRODUCTS.filter((p) => p.categorySlug === cat.slug).length;
                const active = filter === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => setFilter(active ? "All" : cat.slug)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors shrink-0 border ${
                      active
                        ? "bg-[#0f2236] dark:bg-[#b58e4c] text-white border-transparent"
                        : dark
                        ? "bg-[#0e1b2b] border-white/10 text-slate-300 hover:border-white/25"
                        : "bg-white border-slate-200/90 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {locCat.name} ({count})
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 text-xs shrink-0">
              <span className={muted}>
                {t("product.showingCount")} <strong className={text}>{filtered.length}</strong>{" "}
                {t("product.productsLabel")}
              </span>
              {filter !== "All" && (
                <Link
                  to={`/products/${filter}`}
                  className="font-bold text-[#b58e4c] hover:underline inline-flex items-center gap-1"
                >
                  <span>{t("home.exploreCategory")}</span>
                  <ArrowRight size={12} />
                </Link>
              )}
            </div>
          </div>

          {/* Product Grid */}
          {filtered.length === 0 ? (
            <div
              className={`rounded-2xl border p-12 text-center my-6 ${
                dark ? "bg-[#0e1b2b] border-white/10" : "bg-white border-slate-200"
              }`}
            >
              <p className={`text-sm font-semibold ${text} mb-4`}>
                {t("product.noResults")}
              </p>
              <button
                type="button"
                onClick={() => {
                  setFilter("All");
                  setQuery("");
                }}
                className="px-5 py-2.5 rounded-lg bg-[#b58e4c] text-white text-xs font-bold"
              >
                {t("product.resetFilter")}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((product) => {
                const inCart = isInRFQ(product.slug);

                return (
                  <div
                    key={product.id}
                    className={`group rounded-xl border overflow-hidden transition-all duration-200 flex flex-col justify-between ${cardBg}`}
                  >
                    <div>
                      <div
                        onClick={() => navigate(`/products/detail/${product.slug}`)}
                        className={`relative h-52 overflow-hidden cursor-pointer ${
                          dark ? "bg-[#050b12]" : "bg-[#f4f1ea]"
                        }`}
                      >
                        <ProductImage
                          src={product.image}
                          alt={product.name}
                          dark={dark}
                          className="w-full h-full object-contain p-3.5 group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded text-[10px] font-semibold bg-[#08111c]/80 text-white backdrop-blur-sm">
                          {product.categoryDisplay}
                        </span>
                      </div>

                      <div className="p-4 sm:p-5">
                        <Link
                          to={`/products/detail/${product.slug}`}
                          className={`font-bold text-sm sm:text-[15px] ${text} hover:text-[#b58e4c] transition-colors block leading-snug mb-1.5`}
                        >
                          {product.name}
                        </Link>
                        <p className={`text-xs ${muted} leading-relaxed line-clamp-2 mb-3`}>
                          {product.description}
                        </p>

                        {product.specs && (
                          <div className="flex flex-wrap gap-1.5 text-[11px]">
                            {product.specs.moq && (
                              <span
                                className={`px-2 py-0.5 rounded border font-medium ${
                                  dark
                                    ? "bg-white/[0.03] border-white/10 text-slate-300"
                                    : "bg-[#faf8f5] border-slate-200 text-slate-700"
                                }`}
                              >
                                MOQ: {product.specs.moq}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      className={`px-4 sm:px-5 py-3.5 border-t flex items-center justify-between gap-2 ${
                        dark ? "border-white/5" : "border-slate-100"
                      }`}
                    >
                      <Link
                        to={`/products/detail/${product.slug}`}
                        className={`text-xs font-bold ${text} hover:text-[#b58e4c] inline-flex items-center gap-1 transition-colors`}
                      >
                        <span>{t("product.viewDetails")}</span>
                        <ArrowRight size={12} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => addItem(product, 500, "custom")}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${
                          inCart
                            ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                            : dark
                            ? "bg-[#b58e4c] text-white hover:bg-[#a37d3c]"
                            : "bg-[#0f2236] text-white hover:bg-[#b58e4c]"
                        }`}
                      >
                        {inCart ? (
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
          )}

          {/* Custom Packaging & RFQ Footer Banner */}
          <div
            className={`mt-16 p-6 sm:p-8 rounded-2xl border flex flex-col lg:flex-row lg:items-center justify-between gap-6 ${
              dark
                ? "bg-[#0e1b2b] border-white/10"
                : "bg-white border-slate-200/90"
            }`}
          >
            <div className="max-w-xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#b58e4c] mb-1.5">
                OEM & Private Label Hospitality Supply
              </p>
              <h3 className={`text-lg sm:text-xl font-extrabold ${text} mb-1.5`}>
                {t("product.needCustomTitle")}
              </h3>
              <p className={`text-xs sm:text-sm ${muted} leading-relaxed`}>
                {t("product.needCustomDesc")}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                to="/rfq"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#b58e4c] hover:bg-[#a37d3c] text-white font-bold text-xs sm:text-sm transition-colors"
              >
                <FileText size={15} />
                <span>
                  {t("nav.rfq")} ({totalItems})
                </span>
              </Link>
              <a
                href="https://wa.me/62881037366555?text=Hello%20PT%20Kawan%20Baik%20Bali%2C%20I%20would%20like%20to%20request%20your%20product%20catalogue%20and%20price%20list."
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg border font-bold text-xs sm:text-sm transition-colors ${
                  dark
                    ? "border-white/15 text-white hover:bg-white/5"
                    : "border-[#0f2236] text-[#0f2236] hover:bg-slate-50"
                }`}
              >
                <MessageCircle size={15} />
                <span>{t("common.whatsappFast")}</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
