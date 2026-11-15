import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  FileText,
  Plus,
  Check,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { SEOHead, SectionLabel, ProductImage } from "../components/ui";
import {
  PRODUCT_CATEGORIES,
  PRODUCTS,
  getLocalizedCategory,
  getLocalizedProduct,
} from "../data";
import { useLanguage } from "../context/LanguageContext";
import { useRFQ } from "../context/RFQContext";
import ProductDetailPage from "./ProductDetailPage";

export default function CategoryPage({ dark }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const { addItem, isInRFQ } = useRFQ();

  const rawCategory = PRODUCT_CATEGORIES.find((c) => c.slug === slug);

  // Fallback: if /products/:slug matches a product slug directly, render ProductDetailPage
  if (!rawCategory) {
    const matchedProduct = PRODUCTS.find((p) => p.slug === slug);
    if (matchedProduct) {
      return <ProductDetailPage dark={dark} slugOverride={slug} />;
    }

    return (
      <main
        className={`min-h-screen pt-32 pb-20 flex items-center justify-center ${
          dark ? "bg-[#08111c] text-white" : "bg-[#faf8f5] text-[#0f2236]"
        }`}
      >
        <div className="text-center max-w-md px-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b58e4c] mb-2">
            404
          </p>
          <h1 className="text-2xl font-extrabold mb-4">
            {t("product.noResults")}
          </h1>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#b58e4c] text-white text-xs font-bold"
          >
            {t("common.backToProducts")}
          </Link>
        </div>
      </main>
    );
  }

  const category = getLocalizedCategory(rawCategory, lang);
  const categoryProducts = PRODUCTS.filter((p) => p.categorySlug === slug).map(
    (p) => getLocalizedProduct(p, lang)
  );
  const otherCategories = PRODUCT_CATEGORIES.filter((c) => c.slug !== slug).map(
    (c) => getLocalizedCategory(c, lang)
  );

  const bg = dark ? "bg-[#08111c]" : "bg-[#faf8f5]";
  const text = dark ? "text-white" : "text-[#0f2236]";
  const muted = dark ? "text-slate-400" : "text-slate-600";
  const cardBg = dark
    ? "bg-[#0e1b2b] border-white/10 hover:border-[#b58e4c]/50"
    : "bg-white border-slate-200/80 hover:border-[#b58e4c]/60";

  return (
    <>
      <SEOHead
        title={
          rawCategory.seo?.title ||
          `${category.name} — Hotel Amenities Supplier Bali | PT Kawan Baik Bali`
        }
        description={rawCategory.seo?.description || category.description}
        canonical={`https://www.kawanbaikbali.com/products/${category.slug}`}
        ogImage={`https://www.kawanbaikbali.com${category.image}`}
      />

      <main className={`min-h-screen ${bg} transition-colors pb-20`}>
        {/* Architectural Dark Category Banner */}
        <section className="relative pt-28 sm:pt-36 pb-14 bg-[#08111c] border-b border-white/10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-6">
              <Link to="/" className="hover:text-white transition-colors">
                {t("nav.home")}
              </Link>
              <ChevronRight size={12} />
              <Link to="/products" className="hover:text-white transition-colors">
                {t("nav.products")}
              </Link>
              <ChevronRight size={12} />
              <span className="text-[#d4b06a] font-semibold">
                {category.name}
              </span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <SectionLabel text={t("product.categoryTitle")} />
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
                  {category.name}
                </h1>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mb-6">
                  {category.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {(category.items || []).map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-md bg-white/[0.06] border border-white/10 text-slate-200 text-xs font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0e1b2b] h-56 sm:h-64">
                  <ProductImage
                    src={category.image}
                    alt={category.name}
                    dark={true}
                    priority={true}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Products Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className={`text-xl sm:text-2xl font-extrabold ${text}`}>
                {category.name}{" "}
                <span className={`text-sm font-medium ${muted}`}>
                  ({categoryProducts.length} {t("product.productsLabel")})
                </span>
              </h2>
            </div>
            <Link
              to="/products"
              className="text-xs font-bold text-[#b58e4c] hover:underline inline-flex items-center gap-1.5"
            >
              <span>← {t("common.backToProducts")}</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {categoryProducts.map((product) => {
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

                      {product.specs?.moq && (
                        <span
                          className={`inline-block px-2 py-0.5 rounded border text-[11px] font-medium ${
                            dark
                              ? "bg-white/[0.03] border-white/10 text-slate-300"
                              : "bg-[#faf8f5] border-slate-200 text-slate-700"
                          }`}
                        >
                          MOQ: {product.specs.moq}
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    className={`px-4 sm:px-5 py-3 border-t flex items-center justify-between gap-2 ${
                      dark
                        ? "border-white/10 bg-white/[0.01]"
                        : "border-slate-100 bg-[#faf8f5]/60"
                    }`}
                  >
                    <Link
                      to={`/products/detail/${product.slug}`}
                      className={`text-xs font-bold ${text} hover:text-[#b58e4c] transition-colors inline-flex items-center gap-1`}
                    >
                      <span>{t("product.viewDetails")}</span>
                      <ArrowRight size={12} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => addItem(product, 500, "custom")}
                      className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[11px] font-bold transition-all ${
                        inCart
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                          : "bg-[#0f2236] dark:bg-[#b58e4c] text-white hover:bg-[#b58e4c]"
                      }`}
                    >
                      {inCart ? (
                        <>
                          <Check size={12} />
                          <span>{t("product.addedShort")}</span>
                        </>
                      ) : (
                        <>
                          <Plus size={12} />
                          <span>{t("product.addShort")}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom Branding Banner */}
          <div className="mt-14 rounded-2xl bg-[#0f2236] border border-white/10 p-6 sm:p-10 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="flex flex-wrap gap-4 text-xs text-[#d4b06a] font-semibold mb-2">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={14} />
                  {t("product.customAvailable")}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={14} />
                  {t("product.localBali")}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold mb-2">
                {t("product.needCustomTitle")}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {t("product.needCustomDesc")}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                to="/rfq"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#b58e4c] hover:bg-[#c89f58] text-white font-bold text-xs sm:text-sm transition-colors"
              >
                <FileText size={15} />
                <span>{t("hero.requestQuote")}</span>
              </Link>
              <a
                href={`https://wa.me/62881037366555?text=${encodeURIComponent(
                  `Halo PT Kawan Baik Bali, saya ingin menanyakan katalog & harga untuk kategori ${category.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-xs sm:text-sm transition-colors"
              >
                <MessageCircle size={15} className="text-emerald-400" />
                <span>{t("product.enquireWa")}</span>
              </a>
            </div>
          </div>

          {/* Other Categories */}
          <div className="mt-16 pt-12 border-t border-slate-200/70 dark:border-white/10">
            <h3 className={`text-lg sm:text-xl font-extrabold ${text} mb-6`}>
              {t("product.otherCategories")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {otherCategories.map((c) => (
                <Link
                  key={c.slug}
                  to={`/products/${c.slug}`}
                  className={`group p-4 rounded-xl border transition-all flex items-center justify-between ${cardBg}`}
                >
                  <span className={`font-bold text-xs sm:text-sm ${text} group-hover:text-[#b58e4c] transition-colors`}>
                    {c.name}
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-[#b58e4c] shrink-0 group-hover:translate-x-0.5 transition-transform"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
