import { Link } from "react-router-dom";
import { ChevronRight, MapPin, FileText, MessageCircle } from "lucide-react";
import { SEOHead, Section, SectionLabel, ProductImage } from "../components/ui";
import { useLanguage } from "../context/LanguageContext";

const CLIENT_PROPERTIES = [
  {
    name: "Padma Resort Legian",
    location: "Legian, Badung",
    type: "5-Star Beachfront Resort",
    img: "/clients/padma-resort-legian.jpg",
  },
  {
    name: "Lv8 Resort Hotel Canggu",
    location: "Canggu, Badung",
    type: "Beachfront Suite Resort",
    img: "/clients/lv8-resort-hotel-canggu.jpg",
  },
  {
    name: "FuramaXclusive Ocean Beach",
    location: "Seminyak, Badung",
    type: "Oceanfront Resort",
    img: "/clients/furamaxclusive-ocean-beach-seminyak.jpg",
  },
  {
    name: "FuramaXclusive Villas & Spa",
    location: "Ubud, Gianyar",
    type: "Luxury Pool Villas & Spa",
    img: "/clients/furamaxclusive-villas-spa-ubud.jpg",
  },
  {
    name: "The Haven Bali Seminyak",
    location: "Seminyak, Badung",
    type: "Suites, Hotel & Villas",
    img: "/clients/the-haven-suite-hotel-villa-seminyak.jpg",
  },
  {
    name: "Golden Tulip Jineng Resort",
    location: "Kuta, Badung",
    type: "4-Star Resort & Convention",
    img: "/clients/golden-tulip-jineng-resort-bali.jpg",
  },
  {
    name: "THE 1O1 Bali Fontana",
    location: "Seminyak, Badung",
    type: "Design Lifestyle Hotel",
    img: "/clients/the-101-hotel-fontana-seminyak.jpg",
  },
  {
    name: "Tijili Hotel Seminyak",
    location: "Seminyak, Badung",
    type: "Boutique Art Hotel",
    img: "/clients/tijili-hotel-seminyak.jpg",
  },
  {
    name: "Tijili Hotel Benoa",
    location: "Tanjung Benoa, Nusa Dua",
    type: "Beachfront Resort",
    img: "/clients/tijili-hotel-benoa.jpg",
  },
  {
    name: "The ONE Legian",
    location: "Legian, Badung",
    type: "4-Star Lifestyle Hotel",
    img: "/clients/the-one-legian.jpg",
  },
  {
    name: "The Grand Villandra Resort",
    location: "Legian, Badung",
    type: "Villas & Resort",
    img: "/clients/the-grand-villandra-resort.jpg",
  },
  {
    name: "The Mavila Private Villas",
    location: "Kuta / Seminyak",
    type: "Private Pool Villas",
    img: "/clients/the-mavila-private-villas.jpg",
  },
  {
    name: "Elevate Bali by Hanging Gardens",
    location: "Munduk, Buleleng",
    type: "Luxury Highland Resort",
    img: "/clients/elevate-munduk-bali.jpg",
  },
  {
    name: "Nusa Dua Bayview",
    location: "Nusa Dua, Badung",
    type: "Resort & Suites",
    img: "/clients/nusa-dua-bayview-hotel.jpg",
  },
  {
    name: "Metland Venya / Seva",
    location: "Seminyak, Badung",
    type: "Hospitality & Suites",
    img: "/clients/metland-seva-seminyak.jpg",
  },
  {
    name: "Fourteen Roses Boutique Hotel",
    location: "Legian, Badung",
    type: "Boutique Hotel & Spa",
    img: "/clients/fourteen-roses-boutique-hotel-spa.jpg",
  },
  {
    name: "Nadi Hotel Legian",
    location: "Legian, Badung",
    type: "City & Beach Hotel",
    img: "/clients/nadi-hotel-legian.jpg",
  },
  {
    name: "Devani Resort Sidemen",
    location: "Sidemen, Karangasem",
    type: "Valley View Boutique Resort",
    img: "/clients/devani-resort-sidemen.jpg",
  },
  {
    name: "Adi Assri Beach Resort & Spa",
    location: "Pemuteran, Buleleng",
    type: "Beachfront Eco Resort",
    img: "/clients/adi-assri-beach-resort-spa-pemuteran.jpg",
  },
];

export default function ClientsPage({ dark }) {
  const { t } = useLanguage();

  const bg = dark ? "bg-[#08111c]" : "bg-[#faf8f5]";
  const text = dark ? "text-white" : "text-[#0f2236]";
  const muted = dark ? "text-slate-400" : "text-slate-600";
  const cardBg = dark
    ? "bg-[#0e1b2b] border-white/10 hover:border-[#b58e4c]/50"
    : "bg-white border-slate-200/80 hover:border-[#b58e4c]/60";

  return (
    <>
      <SEOHead
        title={`${t("clients.eyebrow")} — PT Kawan Baik Bali | Hotel Amenities Supplier Bali`}
        description={t("clients.subtitle")}
        canonical="https://www.kawanbaikbali.com/clients"
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
                {t("nav.clients")}
              </span>
            </nav>

            <div className="max-w-3xl">
              <SectionLabel text={t("clients.eyebrow")} />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
                {t("clients.title")}
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {t("clients.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Client Portfolio Grid */}
        <Section className={`py-14 sm:py-20 ${bg}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <SectionLabel text={t("clients.featuredLabel")} />
              <h2
                className={`text-2xl sm:text-3xl font-extrabold ${text} tracking-tight`}
              >
                {t("clients.directoryTitle")}
              </h2>
              <p className={`text-xs sm:text-sm ${muted} mt-1.5`}>
                {t("clients.directorySubtitle")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {CLIENT_PROPERTIES.map((client) => (
              <div
                key={client.name}
                className={`group rounded-xl border overflow-hidden transition-all duration-300 ${cardBg}`}
              >
                <div className="relative h-48 overflow-hidden bg-[#050b12]">
                  <ProductImage
                    src={client.img}
                    alt={`${client.name} — ${client.location}`}
                    dark={dark}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08111c]/85 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 text-[11px] font-medium text-[#d4b06a]">
                    <MapPin size={12} />
                    <span>{client.location}</span>
                  </span>
                </div>
                <div className="p-4">
                  <h3 className={`font-bold text-sm sm:text-base ${text}`}>
                    {client.name}
                  </h3>
                  <p className={`text-xs ${muted} mt-0.5`}>{client.type}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Partnership CTA Box */}
          <div className="rounded-2xl bg-[#0f2236] border border-white/10 p-8 sm:p-12 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-xl">
              <SectionLabel text="PT Kawan Baik Bali" />
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                {t("clients.ctaTitle")}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {t("clients.ctaDesc")}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                to="/rfq"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#b58e4c] hover:bg-[#c89f58] text-white font-bold text-xs sm:text-sm transition-colors"
              >
                <FileText size={15} />
                <span>{t("hero.requestQuote")}</span>
              </Link>
              <a
                href="https://wa.me/62881037366555?text=Halo%20PT%20Kawan%20Baik%20Bali%2C%20saya%20ingin%20berkonsultasi%20mengenai%20pengadaan%20hotel%20amenities."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-xs sm:text-sm transition-colors"
              >
                <MessageCircle size={15} className="text-emerald-400" />
                <span>{t("common.whatsappFast")}</span>
              </a>
            </div>
          </div>
          </div>
        </Section>
      </main>
    </>
  );
}
