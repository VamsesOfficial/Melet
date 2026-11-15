import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Plus,
  Trash2,
  MessageCircle,
  Mail,
  Printer,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { SEOHead, SectionLabel, ProductImage } from "../components/ui";
import { PRODUCTS, getLocalizedProduct } from "../data";
import { useLanguage } from "../context/LanguageContext";
import { useRFQ } from "../context/RFQContext";
import { trackEvent } from "../utils/analytics";

export default function RFQPage({ dark }) {
  const { lang, t } = useLanguage();
  const { items, addItem, updateItem, removeItem, clearItems } = useRFQ();

  const allProducts = PRODUCTS.map((p) => getLocalizedProduct(p, lang));
  const [selectedSlug, setSelectedSlug] = useState(allProducts[0]?.slug || "");
  const [quickQty, setQuickQty] = useState(500);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    role: "Purchasing / Procurement",
    property: "",
    rooms: "",
    location: "",
    phone: "",
    email: "",
    deliveryDate: "",
    extraNotes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    const prod = allProducts.find((p) => p.slug === selectedSlug);
    if (prod) {
      addItem(prod, Number(quickQty) || 500, "custom", "");
    }
  };

  const formatBranding = (code) => {
    if (code === "plain") return t("rfq.brandPlain");
    if (code === "eco") return t("rfq.brandEco");
    return t("rfq.brandCustom");
  };

  const buildRFQText = () => {
    const itemLines =
      items.length > 0
        ? items
            .map(
              (item, idx) =>
                `${idx + 1}. ${item.name} — Qty: ${item.quantity} ${
                  item.unit || "pcs"
                } | ${formatBranding(item.branding)}${
                  item.notes ? ` | Note: ${item.notes}` : ""
                }`
            )
            .join("\n")
        : "(General Catalog & Wholesale Price List Inquiry)";

    return (
      `Halo PT Kawan Baik Bali,\n` +
      `Berikut Permintaan Penawaran Harga Resmi (RFQ):\n\n` +
      `*IDENTITAS PROPERTI & PEMOHON*\n` +
      `• Nama: ${form.fullName} (${form.role})\n` +
      `• Properti: ${form.property}\n` +
      `• Jumlah Kamar: ${form.rooms || "-"}\n` +
      `• Lokasi Pengiriman: ${form.location}\n` +
      `• Telepon/WA: ${form.phone}\n` +
      `• Email: ${form.email || "-"}\n` +
      `• Target Pengiriman: ${form.deliveryDate || "Fleksibel"}\n\n` +
      `*DAFTAR PRODUK YANG DIMINTA (${items.length} Item)*\n` +
      `${itemLines}\n\n` +
      (form.extraNotes ? `*CATATAN TAMBAHAN*\n${form.extraNotes}\n\n` : "") +
      `Mohon dikirimkan rincian Quotation grosir beserta MOQ. Terima kasih.`
    );
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    trackEvent("generate_lead", {
      method: "whatsapp_rfq",
      items_count: items.length,
      property: form.property,
    });
    setSubmitted(true);
    const msg = buildRFQText();
    window.open(
      `https://wa.me/62881037366555?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleSendEmail = () => {
    trackEvent("generate_lead", {
      method: "email_rfq",
      items_count: items.length,
      property: form.property,
    });
    setSubmitted(true);
    const subject = `RFQ Hotel Amenities — ${form.property || "Hospitality Inquiry"}`;
    const body = buildRFQText();
    window.location.href = `mailto:kawanbaik.bali@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const bg = dark ? "bg-[#08111c]" : "bg-[#faf8f5]";
  const text = dark ? "text-white" : "text-[#0f2236]";
  const muted = dark ? "text-slate-400" : "text-slate-600";
  const cardBg = dark
    ? "bg-[#0e1b2b] border-white/10"
    : "bg-white border-slate-200/80";
  const inputCls = `w-full px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm focus:outline-none focus:border-[#b58e4c] transition-colors ${
    dark
      ? "bg-[#08111c] border-white/15 text-white placeholder:text-slate-500"
      : "bg-[#faf8f5] border-slate-300 text-[#0f2236] placeholder:text-slate-400"
  }`;

  return (
    <>
      <SEOHead
        title={`${t("rfq.title")} | PT Kawan Baik Bali`}
        description={t("rfq.subtitle")}
        canonical="https://www.kawanbaikbali.com/rfq"
      />

      <main className={`min-h-screen pt-28 sm:pt-36 pb-20 ${bg} transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs mb-6">
            <Link to="/" className={`${muted} hover:text-[#b58e4c] transition-colors`}>
              {t("nav.home")}
            </Link>
            <ChevronRight size={12} className={muted} />
            <span className={`font-semibold ${text}`}>{t("nav.rfq")}</span>
          </nav>

          {/* Header */}
          <div className="max-w-3xl mb-10">
            <SectionLabel text={t("rfq.eyebrow")} />
            <h1
              className={`text-3xl sm:text-4xl font-extrabold ${text} tracking-tight mb-3`}
            >
              {t("rfq.title")}
            </h1>
            <p className={`${muted} text-xs sm:text-sm leading-relaxed`}>
              {t("rfq.subtitle")}
            </p>
          </div>

          {submitted && (
            <div className="mb-8 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3 text-emerald-600 dark:text-emerald-300 text-xs sm:text-sm font-medium">
              <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
              <span>{t("rfq.submittedBanner")}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Quick Add + RFQ Item Table (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Quick Add Bar */}
              <form
                onSubmit={handleQuickAdd}
                className={`p-5 rounded-xl border ${cardBg}`}
              >
                <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#b58e4c] mb-3">
                  + {t("rfq.quickAddTitle")}
                </label>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <select
                    value={selectedSlug}
                    onChange={(e) => setSelectedSlug(e.target.value)}
                    className={`flex-1 ${inputCls}`}
                  >
                    {allProducts.map((p) => (
                      <option key={p.id} value={p.slug}>
                        {p.name} ({p.categoryDisplay})
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="1"
                      value={quickQty}
                      onChange={(e) => setQuickQty(e.target.value)}
                      className={`w-28 font-bold text-center ${inputCls}`}
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-lg bg-[#0f2236] dark:bg-[#b58e4c] text-white text-xs font-bold whitespace-nowrap hover:bg-[#b58e4c] transition-colors inline-flex items-center gap-1.5"
                    >
                      <Plus size={14} />
                      <span>{t("rfq.quickAddBtn")}</span>
                    </button>
                  </div>
                </div>
              </form>

              {/* Selected Items List */}
              <div className={`rounded-xl border overflow-hidden ${cardBg}`}>
                <div
                  className={`px-5 py-4 border-b flex items-center justify-between ${
                    dark ? "border-white/10" : "border-slate-200/80"
                  }`}
                >
                  <h2 className={`font-extrabold text-sm sm:text-base ${text}`}>
                    {t("rfq.tableItem")} ({items.length})
                  </h2>
                  {items.length > 0 && (
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className={`text-xs font-semibold inline-flex items-center gap-1 ${muted} hover:text-[#b58e4c]`}
                      >
                        <Printer size={13} />
                        <span className="hidden sm:inline">{t("rfq.printSummary")}</span>
                      </button>
                      <button
                        type="button"
                        onClick={clearItems}
                        className="text-xs font-semibold text-red-500 hover:underline"
                      >
                        {t("rfq.clearCart")}
                      </button>
                    </div>
                  )}
                </div>

                {items.length === 0 ? (
                  <div className="p-10 text-center">
                    <ShoppingBag
                      size={32}
                      className="mx-auto mb-3 text-[#b58e4c]/70"
                    />
                    <h3 className={`font-bold text-base ${text} mb-1.5`}>
                      {t("rfq.emptyTitle")}
                    </h3>
                    <p className={`text-xs ${muted} max-w-md mx-auto mb-6`}>
                      {t("rfq.emptyDesc")}
                    </p>
                    <Link
                      to="/products"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#b58e4c] text-white text-xs font-bold"
                    >
                      <span>{t("rfq.browseCatalog")}</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                ) : (
                  <div
                    className={`divide-y ${
                      dark ? "divide-white/10" : "divide-slate-200/70"
                    }`}
                  >
                    {items.map((item) => {
                      const localizedItem =
                        allProducts.find((p) => p.slug === item.slug) || item;

                      return (
                        <div key={item.slug} className="p-4 sm:p-5 space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3.5 min-w-0">
                              <Link
                                to={`/products/detail/${item.slug}`}
                                className={`w-16 h-16 rounded-lg overflow-hidden shrink-0 border ${
                                  dark
                                    ? "bg-[#050b12] border-white/10"
                                    : "bg-[#f4f1ea] border-slate-200"
                                }`}
                              >
                                <ProductImage
                                  src={item.image}
                                  alt={localizedItem.name}
                                  dark={dark}
                                  className="w-full h-full object-contain p-1.5"
                                />
                              </Link>
                              <div className="min-w-0">
                                <Link
                                  to={`/products/detail/${item.slug}`}
                                  className={`font-bold text-sm ${text} hover:text-[#b58e4c] transition-colors block truncate`}
                                >
                                  {localizedItem.name}
                                </Link>
                                <span className={`text-[11px] ${muted}`}>
                                  {localizedItem.categoryDisplay || item.category}
                                </span>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeItem(item.slug)}
                              aria-label={t("rfq.tableAction")}
                              className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 pt-1">
                            <div className="sm:col-span-3">
                              <label className={`block text-[10px] uppercase font-semibold mb-1 ${muted}`}>
                                {t("rfq.tableQuantity")}
                              </label>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                  updateItem(item.slug, {
                                    quantity: Number(e.target.value) || 1,
                                  })
                                }
                                className={`font-bold ${inputCls}`}
                              />
                            </div>

                            <div className="sm:col-span-4">
                              <label className={`block text-[10px] uppercase font-semibold mb-1 ${muted}`}>
                                {t("rfq.tableBranding")}
                              </label>
                              <select
                                value={item.branding || "custom"}
                                onChange={(e) =>
                                  updateItem(item.slug, {
                                    branding: e.target.value,
                                  })
                                }
                                className={inputCls}
                              >
                                <option value="custom">{t("rfq.brandCustom")}</option>
                                <option value="plain">{t("rfq.brandPlain")}</option>
                                <option value="eco">{t("rfq.brandEco")}</option>
                              </select>
                            </div>

                            <div className="sm:col-span-5">
                              <label className={`block text-[10px] uppercase font-semibold mb-1 ${muted}`}>
                                {t("rfq.tableNotes")}
                              </label>
                              <input
                                type="text"
                                value={item.notes || ""}
                                onChange={(e) =>
                                  updateItem(item.slug, { notes: e.target.value })
                                }
                                placeholder={t("rfq.tableNotesPlaceholder")}
                                className={inputCls}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Property & Contact Form (5 cols) */}
            <div className="lg:col-span-5">
              <form
                onSubmit={handleSendWhatsApp}
                className={`p-6 sm:p-7 rounded-2xl border ${cardBg} space-y-4`}
              >
                <div>
                  <h2 className={`font-extrabold text-lg ${text} mb-1`}>
                    {t("rfq.formTitle")}
                  </h2>
                  <p className={`text-xs ${muted} leading-relaxed`}>
                    {t("rfq.directNotice")}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${text}`}>
                      {t("rfq.fullName")} *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="I Made Putra"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${text}`}>
                      {t("rfq.role")}
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      placeholder="Purchasing / GM"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${text}`}>
                      {t("rfq.property")} *
                    </label>
                    <input
                      type="text"
                      name="property"
                      required
                      value={form.property}
                      onChange={handleChange}
                      placeholder="Hotel / Resort / Villa"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${text}`}>
                      {t("rfq.rooms")}
                    </label>
                    <input
                      type="text"
                      name="rooms"
                      value={form.rooms}
                      onChange={handleChange}
                      placeholder="45 Rooms / 12 Villas"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${text}`}>
                      {t("rfq.location")} *
                    </label>
                    <input
                      type="text"
                      name="location"
                      required
                      value={form.location}
                      onChange={handleChange}
                      placeholder="Seminyak, Ubud, Canggu..."
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${text}`}>
                      {t("rfq.deliveryDate")}
                    </label>
                    <input
                      type="text"
                      name="deliveryDate"
                      value={form.deliveryDate}
                      onChange={handleChange}
                      placeholder="Immediate / Next Month"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${text}`}>
                      {t("rfq.phone")} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+62 812..."
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${text}`}>
                      {t("rfq.email")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="purchasing@hotel.com"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-semibold mb-1 ${text}`}>
                    {t("rfq.extraNotes")}
                  </label>
                  <textarea
                    name="extraNotes"
                    rows={3}
                    value={form.extraNotes}
                    onChange={handleChange}
                    placeholder={t("rfq.extraNotesPlaceholder")}
                    className={inputCls}
                  />
                </div>

                <div className="pt-2 space-y-2.5">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-5 rounded-lg bg-[#b58e4c] hover:bg-[#c89f58] text-white font-bold text-xs sm:text-sm transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={16} />
                    <span>{t("rfq.sendWhatsApp")}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSendEmail}
                    className={`w-full py-3 px-5 rounded-lg border font-bold text-xs transition-colors inline-flex items-center justify-center gap-2 ${
                      dark
                        ? "border-white/15 text-slate-200 hover:bg-white/5"
                        : "border-slate-300 text-[#0f2236] hover:bg-slate-100"
                    }`}
                  >
                    <Mail size={14} />
                    <span>{t("rfq.sendEmail")}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
