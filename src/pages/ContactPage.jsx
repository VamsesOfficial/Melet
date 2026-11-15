import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { SEOHead, Section, SectionLabel } from "../components/ui";
import { useLanguage } from "../context/LanguageContext";
import { trackEvent } from "../utils/analytics";

export default function ContactPage({ dark }) {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    hotel: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    trackEvent("contact_submit", {
      hotel: form.hotel,
    });
    setSent(true);
    const text =
      `Halo PT Kawan Baik Bali,\n\n` +
      `• Nama: ${form.name}\n` +
      `• Hotel/Properti: ${form.hotel}\n` +
      `• Telepon/WA: ${form.phone}\n` +
      `• Email: ${form.email || "-"}\n\n` +
      `*Pesan / Kebutuhan:*\n${form.message}`;

    window.open(
      `https://wa.me/62881037366555?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
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
        title={`${t("contact.eyebrow")} — PT Kawan Baik Bali | Hotel Amenities Supplier Bali`}
        description={t("contact.subtitle")}
        canonical="https://www.kawanbaikbali.com/contact"
      />

      <main className={`min-h-screen ${bg} transition-colors`}>
        {/* Architectural Dark Header */}
        <section className="relative pt-28 sm:pt-36 pb-16 bg-[#08111c] border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
              <Link to="/" className="hover:text-white transition-colors">
                {t("nav.home")}
              </Link>
              <ChevronRight size={12} />
              <span className="text-[#d4b06a] font-semibold">
                {t("nav.contact")}
              </span>
            </nav>

            <div className="max-w-3xl">
              <SectionLabel text={t("contact.eyebrow")} />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
                {t("contact.title")}
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {t("contact.subtitle")}
              </p>
            </div>
          </div>
        </section>

        <Section className={`py-14 sm:py-20 ${bg}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left: Direct B2B Inquiry Form (7 cols) */}
            <form
              onSubmit={handleSubmit}
              className={`lg:col-span-7 p-6 sm:p-8 rounded-2xl border ${cardBg} space-y-4`}
            >
              <div>
                <h2 className={`font-extrabold text-xl ${text} mb-1`}>
                  {t("contact.formTitle")}
                </h2>
                <p className={`text-xs ${muted} leading-relaxed`}>
                  {t("contact.formSubtitle")}
                </p>
              </div>

              {sent && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-2.5 text-emerald-600 dark:text-emerald-300 text-xs font-medium">
                  <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                  <span>{t("contact.sentNotice")}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${text}`}>
                    {t("contact.nameLabel")} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="I Made Putra"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${text}`}>
                    {t("contact.hotelLabel")} *
                  </label>
                  <input
                    type="text"
                    name="hotel"
                    required
                    value={form.hotel}
                    onChange={handleChange}
                    placeholder="Hotel / Resort / Villa"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${text}`}>
                    {t("contact.phoneLabel")} *
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
                  <label className={`block text-xs font-semibold mb-1.5 ${text}`}>
                    {t("contact.emailLabel")}
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
                <label className={`block text-xs font-semibold mb-1.5 ${text}`}>
                  {t("contact.messageLabel")} *
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Contoh: Mohon informasi katalog & MOQ untuk sandal hotel custom logo (500 pasang) dan dental kit..."
                  className={inputCls}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-lg bg-[#b58e4c] hover:bg-[#c89f58] text-white font-bold text-xs sm:text-sm transition-colors inline-flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} />
                <span>{t("contact.submitBtn")}</span>
              </button>
            </form>

            {/* Right: Office Details & Embedded Kerobokan Map (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div className={`p-6 rounded-2xl border ${cardBg} space-y-5`}>
                <h3 className={`font-extrabold text-base ${text}`}>
                  {t("contact.officeTitle")} — PT Kawan Baik Bali
                </h3>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin
                      size={17}
                      className="text-[#b58e4c] shrink-0 mt-0.5"
                    />
                    <div>
                      <p className={`font-bold ${text}`}>Alamat Gudang & Kantor</p>
                      <p className={`${muted} mt-0.5 leading-relaxed`}>
                        {t("common.address")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone
                      size={17}
                      className="text-[#b58e4c] shrink-0 mt-0.5"
                    />
                    <div>
                      <p className={`font-bold ${text}`}>WhatsApp & Telepon B2B</p>
                      <a
                        href="https://wa.me/62881037366555"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#b58e4c] font-bold hover:underline mt-0.5 inline-block"
                      >
                        +62 8810-3736-6555
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail
                      size={17}
                      className="text-[#b58e4c] shrink-0 mt-0.5"
                    />
                    <div>
                      <p className={`font-bold ${text}`}>Email Resmi</p>
                      <a
                        href="mailto:kawanbaik.bali@gmail.com"
                        className="text-[#b58e4c] font-bold hover:underline mt-0.5 inline-block"
                      >
                        kawanbaik.bali@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock
                      size={17}
                      className="text-[#b58e4c] shrink-0 mt-0.5"
                    />
                    <div>
                      <p className={`font-bold ${text}`}>Jam Operasional</p>
                      <p className={`${muted} mt-0.5`}>
                        {t("common.officeHours")}
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=Kawan+Baik+Bali+Kerobokan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-2.5 px-4 rounded-lg border text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors ${
                    dark
                      ? "border-white/15 text-slate-200 hover:bg-white/5"
                      : "border-slate-200 text-[#0f2236] hover:bg-slate-50"
                  }`}
                >
                  <span>{t("contact.openMaps")}</span>
                  <ExternalLink size={13} />
                </a>
              </div>

              {/* Google Maps Embed */}
              <div className={`rounded-2xl overflow-hidden border h-64 ${cardBg}`}>
                <iframe
                  title={t("contact.mapTitle")}
                  src="https://www.google.com/maps?q=Kerobokan+Kaja,+Kuta+Utara,+Badung,+Bali&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
          </div>
        </Section>
      </main>
    </>
  );
}
