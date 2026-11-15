import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, ArrowUpRight } from "lucide-react";
import { PRODUCT_CATEGORIES, getLocalizedCategory } from "../data";
import { useLanguage } from "../context/LanguageContext";

const SOCIAL = [
  {
    icon: <Instagram size={15} />,
    href: "https://www.instagram.com/kawanbaikbali/",
    label: "Instagram",
  },
  {
    icon: <Facebook size={15} />,
    href: "https://www.facebook.com/share/1Hix42FsyX/",
    label: "Facebook",
  },
];

export default function Footer() {
  const { lang, t } = useLanguage();

  const QUICK_LINKS = [
    { label: t("nav.home"), to: "/" },
    { label: t("nav.products"), to: "/products" },
    { label: t("nav.rfq"), to: "/rfq" },
    { label: t("nav.about"), to: "/about" },
    { label: t("nav.clients"), to: "/clients" },
    { label: t("nav.contact"), to: "/contact" },
  ];

  return (
    <footer className="bg-[#08111c] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="PT Kawan Baik Bali"
                className="w-10 h-10 object-contain"
              />
              <div>
                <p className="font-extrabold text-base tracking-tight text-white">
                  PT Kawan Baik Bali
                </p>
                <p className="text-[#c9a55c] text-[10px] tracking-[0.2em] uppercase font-semibold">
                  Hospitality Supply Partner
                </p>
              </div>
            </Link>

            <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed max-w-sm">
              {t("footer.tagline")}
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-[#b58e4c] hover:text-white hover:border-[#b58e4c] transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-[11px] text-[#c9a55c] mb-4 uppercase tracking-[0.18em]">
              {t("footer.navigation")}
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-slate-300 text-xs sm:text-[13px] hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Product Lines (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-[11px] text-[#c9a55c] mb-4 uppercase tracking-[0.18em]">
              {t("footer.categories")}
            </h4>
            <ul className="space-y-2.5">
              {PRODUCT_CATEGORIES.map((cat) => {
                const loc = getLocalizedCategory(cat, lang);
                return (
                  <li key={cat.slug}>
                    <Link
                      to={`/products/${cat.slug}`}
                      className="text-slate-300 text-xs sm:text-[13px] hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      {loc.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 4: Head Office & Warehouse (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-[11px] text-[#c9a55c] mb-4 uppercase tracking-[0.18em]">
              {t("footer.headOffice")}
            </h4>
            <div className="space-y-3 text-xs sm:text-[13px] text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="text-[#c9a55c] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{t("common.address")}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-[#c9a55c] shrink-0" />
                <a
                  href="tel:+62881037366555"
                  className="hover:text-white transition-colors"
                >
                  +62 8810-3736-6555
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-[#c9a55c] shrink-0" />
                <a
                  href="mailto:kawanbaik.bali@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  kawanbaik.bali@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-400 text-xs pt-1">
                <Clock size={14} className="text-[#c9a55c] shrink-0" />
                <span>{t("common.officeHours")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} PT Kawan Baik Bali. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy-policy"
              className="hover:text-slate-200 transition-colors"
            >
              {t("footer.privacy")}
            </Link>
            <Link
              to="/terms-of-service"
              className="hover:text-slate-200 transition-colors"
            >
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
