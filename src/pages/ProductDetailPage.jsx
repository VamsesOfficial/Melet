import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Plus,
  Check,
  MessageCircle,
  FileText,
  CheckCircle2,
  ArrowRight,
  Images,
  X,
} from "lucide-react";
import { SEOHead, ProductImage } from "../components/ui";
import {
  PRODUCTS,
  PRODUCT_CATEGORIES,
  getLocalizedProduct,
  getLocalizedCategory,
} from "../data";
import { useLanguage } from "../context/LanguageContext";
import { useRFQ } from "../context/RFQContext";
import { trackEvent } from "../utils/analytics";

const QTY_PRESETS = [200, 500, 1000, 2500];

export default function ProductDetailPage({ dark, slugOverride }) {
  const { productSlug } = useParams();
  const activeSlug = slugOverride || productSlug;
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const { addItem, isInRFQ } = useRFQ();

  const rawProduct = PRODUCTS.find((p) => p.slug === activeSlug);
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [qty, setQty] = useState(500);
  const [branding, setBranding] = useState("custom");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setSelectedPhotoIdx(0);
    if (rawProduct) {
      trackEvent("view_item", {
        item_id: rawProduct.slug,
        item_name: rawProduct.name,
        item_category: rawProduct.category,
      });
    }
  }, [rawProduct]);

  const bg = dark ? "bg-[#08111c]" : "bg-[#faf8f5]";
  const text = dark ? "text-white" : "text-[#0f2236]";
  const muted = dark ? "text-slate-400" : "text-slate-600";
  const cardBg = dark
    ? "bg-[#0e1b2b] border-white/10"
    : "bg-white border-slate-200/80";

  if (!rawProduct) {
    return (
      <main
        className={`min-h-screen pt-32 pb-20 flex items-center justify-center ${bg}`}
      >
        <div className="text-center max-w-md px-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b58e4c] mb-2">
            404
          </p>
          <h1 className={`text-2xl font-extrabold ${text} mb-4`}>
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

  const product = getLocalizedProduct(rawProduct, lang);
  const rawCategory = PRODUCT_CATEGORIES.find(
    (c) => c.slug === product.categorySlug
  );
  const category = getLocalizedCategory(rawCategory, lang);

  const allPhotos = [
    { src: product.image, caption: product.name },
    ...(product.gallery || []),
  ];
  const activePhoto = allPhotos[selectedPhotoIdx] || allPhotos[0];

  const relatedProducts = PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.slug !== product.slug
  )
    .slice(0, 4)
    .map((p) => getLocalizedProduct(p, lang));

  const inCart = isInRFQ(product.slug);

  const handleAddRFQ = (e) => {
    e.preventDefault();
    addItem(product, qty, branding, notes);
  };

  const waUrl = `https://wa.me/62881037366555?text=${encodeURIComponent(
    `Halo PT Kawan Baik Bali, saya tertarik meminta penawaran harga (RFQ) untuk:\n` +
      `• Produk: ${product.name}\n` +
      `• Estimasi Kuantitas: ${qty} pcs\n` +
      `• Tipe Kemasan: ${
        branding === "custom" ? t("rfq.brandCustom") : t("rfq.brandPlain")
      }\n` +
      (notes ? `• Catatan: ${notes}\n` : "") +
      `\nMohon informasi harga grosir & MOQ.`
  )}`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `https://www.kawanbaikbali.com${product.image}`,
    sku: `KBB-${String(product.id).padStart(3, "0")}`,
    brand: {
      "@type": "Brand",
      name: "PT Kawan Baik Bali",
    },
    manufacturer: {
      "@type": "Organization",
      name: "PT Kawan Baik Bali",
    },
    category: product.categoryDisplay,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "PT Kawan Baik Bali",
      },
    },
  };

  return (
    <>
      <SEOHead
        title={`${product.name} | Hotel Amenities Supplier Bali | PT Kawan Baik Bali`}
        description={`${product.description} Supplier hotel amenities di Bali — PT Kawan Baik Bali.`}
        canonical={`https://www.kawanbaikbali.com/products/detail/${product.slug}`}
        ogImage={`https://www.kawanbaikbali.com${product.image}`}
        schema={productSchema}
      />

      <main className={`min-h-screen pt-28 sm:pt-36 pb-20 ${bg} transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-xs mb-8">
            <Link to="/" className={`${muted} hover:text-[#b58e4c] transition-colors`}>
              {t("nav.home")}
            </Link>
            <ChevronRight size={12} className={muted} />
            <Link
              to="/products"
              className={`${muted} hover:text-[#b58e4c] transition-colors`}
            >
              {t("nav.products")}
            </Link>
            {category && (
              <>
                <ChevronRight size={12} className={muted} />
                <Link
                  to={`/products/${category.slug}`}
                  className={`${muted} hover:text-[#b58e4c] transition-colors`}
                >
                  {category.name}
                </Link>
              </>
            )}
            <ChevronRight size={12} className={muted} />
            <span className={`font-semibold ${text}`}>{product.name}</span>
          </nav>

          {/* Main 12-Col Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Image Gallery (6 cols) */}
            <div className="lg:col-span-6 lg:sticky lg:top-28">
              <div
                onClick={() => setLightboxOpen(true)}
                className={`relative rounded-2xl border overflow-hidden h-80 sm:h-[440px] cursor-zoom-in flex items-center justify-center ${
                  dark
                    ? "bg-[#050b12] border-white/10"
                    : "bg-[#f4f1ea] border-slate-200/80"
                }`}
              >
                <ProductImage
                  src={activePhoto.src}
                  alt={activePhoto.caption || product.name}
                  dark={dark}
                  priority={true}
                  className="w-full h-full object-contain p-6"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded bg-[#08111c]/80 text-white text-[11px] font-mono font-semibold backdrop-blur-sm">
                  SKU: KBB-{String(product.id).padStart(3, "0")}
                </span>
              </div>

              {allPhotos.length > 1 && (
                <div className="mt-3 flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
                  {allPhotos.map((photo, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedPhotoIdx(idx)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        selectedPhotoIdx === idx
                          ? "border-[#b58e4c]"
                          : dark
                          ? "border-white/10 opacity-60 hover:opacity-100"
                          : "border-slate-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <ProductImage
                        src={photo.src}
                        alt={photo.caption || product.name}
                        dark={dark}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}

                  {product.gallery?.length > 0 && (
                    <Link
                      to={`/products/${product.slug}/gallery`}
                      className={`px-3.5 h-20 rounded-xl border flex flex-col items-center justify-center gap-1 text-[11px] font-bold shrink-0 transition-colors ${
                        dark
                          ? "bg-[#0e1b2b] border-white/10 text-[#d4b06a] hover:border-[#b58e4c]"
                          : "bg-white border-slate-200 text-[#0f2236] hover:border-[#b58e4c]"
                      }`}
                    >
                      <Images size={16} className="text-[#b58e4c]" />
                      <span>{t("product.viewAllPhotos")}</span>
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Right: Specifications & B2B RFQ Builder (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <Link
                  to={`/products/${product.categorySlug}`}
                  className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-[#b58e4c] mb-2"
                >
                  {product.categoryDisplay}
                </Link>
                <h1
                  className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold ${text} tracking-tight mb-3`}
                >
                  {product.name}
                </h1>
                <p className={`${muted} text-sm sm:text-base leading-relaxed`}>
                  {product.description}
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  t("product.customAvailable"),
                  t("product.localBali"),
                  t("product.qualityChecked"),
                ].map((badge) => (
                  <div
                    key={badge}
                    className={`p-3 rounded-lg border flex items-start gap-2 text-xs font-medium ${cardBg} ${text}`}
                  >
                    <CheckCircle2
                      size={14}
                      className="text-[#b58e4c] shrink-0 mt-0.5"
                    />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>

              {/* Specifications Table */}
              {product.specs && (
                <div className={`rounded-xl border overflow-hidden ${cardBg}`}>
                  <div
                    className={`px-5 py-3.5 border-b text-xs font-bold uppercase tracking-wider ${
                      dark
                        ? "bg-white/[0.02] border-white/10 text-slate-200"
                        : "bg-[#faf8f5] border-slate-200/80 text-[#0f2236]"
                    }`}
                  >
                    {t("product.specs")}
                  </div>
                  <dl
                    className={`divide-y text-xs sm:text-sm ${
                      dark ? "divide-white/10" : "divide-slate-200/70"
                    }`}
                  >
                    {Object.entries(product.specs).map(([key, val]) => (
                      <div
                        key={key}
                        className="grid grid-cols-1 sm:grid-cols-3 px-5 py-3 gap-1 sm:gap-4"
                      >
                        <dt className={`font-semibold ${muted}`}>
                          {t(`product.specLabels.${key}`, key)}
                        </dt>
                        <dd className={`sm:col-span-2 font-semibold ${text}`}>
                          {val}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {/* B2B Order & RFQ Configuration Card */}
              <form
                onSubmit={handleAddRFQ}
                className={`p-5 sm:p-6 rounded-2xl border ${cardBg} space-y-4`}
              >
                <div className="flex items-center justify-between">
                  <h2 className={`font-extrabold text-sm sm:text-base ${text}`}>
                    {t("product.addToRfq")}
                  </h2>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#b58e4c]/15 text-[#b58e4c]">
                    B2B Quotation
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-xs font-bold mb-1.5 ${text}`}
                    >
                      {t("rfq.tableQuantity")} (pcs)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value) || 100)}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-bold focus:outline-none focus:border-[#b58e4c] ${
                        dark
                          ? "bg-[#08111c] border-white/15 text-white"
                          : "bg-[#faf8f5] border-slate-300 text-[#0f2236]"
                      }`}
                    />
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {QTY_PRESETS.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setQty(preset)}
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold border transition-colors ${
                            qty === preset
                              ? "bg-[#b58e4c] text-white border-[#b58e4c]"
                              : dark
                              ? "border-white/10 text-slate-400 hover:text-white"
                              : "border-slate-200 text-slate-600 hover:border-slate-400"
                          }`}
                        >
                          {preset.toLocaleString()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      className={`block text-xs font-bold mb-1.5 ${text}`}
                    >
                      {t("rfq.tableBranding")}
                    </label>
                    <select
                      value={branding}
                      onChange={(e) => setBranding(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#b58e4c] ${
                        dark
                          ? "bg-[#08111c] border-white/15 text-white"
                          : "bg-[#faf8f5] border-slate-300 text-[#0f2236]"
                      }`}
                    >
                      <option value="custom">{t("rfq.brandCustom")}</option>
                      <option value="plain">{t("rfq.brandPlain")}</option>
                      <option value="eco">{t("rfq.brandEco")}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${text}`}>
                    {t("rfq.tableNotes")}
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={t("rfq.tableNotesPlaceholder")}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm focus:outline-none focus:border-[#b58e4c] ${
                      dark
                        ? "bg-[#08111c] border-white/15 text-white placeholder:text-slate-500"
                        : "bg-[#faf8f5] border-slate-300 text-[#0f2236] placeholder:text-slate-400"
                    }`}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <button
                    type="submit"
                    className={`flex-1 py-3 px-5 rounded-lg font-bold text-xs sm:text-sm transition-all inline-flex items-center justify-center gap-2 ${
                      inCart
                        ? "bg-emerald-600 text-white hover:bg-emerald-500"
                        : "bg-[#0f2236] dark:bg-[#b58e4c] text-white hover:bg-[#b58e4c]"
                    }`}
                  >
                    {inCart ? <Check size={16} /> : <Plus size={16} />}
                    <span>
                      {inCart ? t("product.inRfq") : t("product.addToRfq")}
                    </span>
                  </button>

                  {inCart && (
                    <Link
                      to="/rfq"
                      className="py-3 px-4 rounded-lg bg-[#b58e4c] text-white font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-1.5"
                    >
                      <FileText size={15} />
                      <span>{t("rfq.viewCart")}</span>
                    </Link>
                  )}

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`py-3 px-5 rounded-lg border font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-colors ${
                      dark
                        ? "border-white/15 text-white hover:bg-white/5"
                        : "border-slate-300 text-[#0f2236] hover:bg-slate-100"
                    }`}
                  >
                    <MessageCircle size={15} className="text-emerald-500" />
                    <span>{t("product.enquireWa")}</span>
                  </a>
                </div>
              </form>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20 pt-12 border-t border-slate-200/70 dark:border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl sm:text-2xl font-extrabold ${text}`}>
                  {t("product.relatedProducts")}
                </h2>
                <Link
                  to={`/products/${product.categorySlug}`}
                  className="text-xs font-bold text-[#b58e4c] hover:underline inline-flex items-center gap-1"
                >
                  <span>{t("home.exploreCategory")}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => navigate(`/products/detail/${rel.slug}`)}
                    className={`group rounded-xl border overflow-hidden cursor-pointer transition-all ${cardBg} hover:border-[#b58e4c]/60`}
                  >
                    <div
                      className={`h-44 overflow-hidden ${
                        dark ? "bg-[#050b12]" : "bg-[#f4f1ea]"
                      }`}
                    >
                      <ProductImage
                        src={rel.image}
                        alt={rel.name}
                        dark={dark}
                        className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3
                        className={`font-bold text-sm ${text} group-hover:text-[#b58e4c] transition-colors line-clamp-1`}
                      >
                        {rel.name}
                      </h3>
                      <p className={`text-xs ${muted} mt-1 line-clamp-1`}>
                        {rel.specs?.moq ? `MOQ: ${rel.specs.moq}` : rel.categoryDisplay}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Lightbox Modal */}
        {lightboxOpen && (
          <div
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full flex flex-col items-center"
            >
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="self-end mb-3 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X size={18} />
              </button>
              <img
                src={activePhoto.src}
                alt={activePhoto.caption || product.name}
                className="max-h-[78vh] w-auto object-contain rounded-xl"
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
}
