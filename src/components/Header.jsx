import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, FileText, MapPin, Clock, Phone } from "lucide-react";
import { DarkModeToggle } from "./ui";
import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "../context/LanguageContext";
import { useRFQ } from "../context/RFQContext";

export default function Header({ dark, setDark }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();
  const { totalItems } = useRFQ();

  const NAV_LINKS = [
    { label: t("nav.home"), to: "/" },
    { label: t("nav.products"), to: "/products" },
    { label: t("nav.about"), to: "/about" },
    { label: t("nav.clients"), to: "/clients" },
    { label: t("nav.contact"), to: "/contact" },
  ];

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 24);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === "/";
  const isTransparent = isHome && !scrolled && !open;

  const isActive = (to) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-gradient-to-b from-[#08111c]/80 to-transparent border-b border-white/10"
          : dark
          ? "bg-[#08111c]/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/30"
          : "bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm"
      }`}
    >
      {/* Top B2B Utility Bar (Desktop) */}
      <div
        className={`hidden lg:block border-b text-[11px] transition-all duration-300 ${
          scrolled ? "h-0 overflow-hidden opacity-0 border-none" : "h-8 opacity-100"
        } ${
          isTransparent
            ? "border-white/10 text-slate-300"
            : dark
            ? "border-white/5 bg-[#050b12] text-slate-400"
            : "border-slate-100 bg-[#f6f4ef] text-slate-600"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin size={11} className="text-[#b58e4c]" />
              {t("topbar.location")}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={11} className="text-[#b58e4c]" />
              {t("topbar.hours")}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="tel:+62881037366555"
              className="flex items-center gap-1.5 hover:text-[#b58e4c] transition-colors font-medium"
            >
              <Phone size={11} className="text-[#b58e4c]" />
              +62 8810-3736-6555
            </a>
            <span className="opacity-30">|</span>
            <a
              href="mailto:kawanbaik.bali@gmail.com"
              className="hover:text-[#b58e4c] transition-colors font-medium"
            >
              kawanbaik.bali@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[72px]">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img
              src="/logo.png"
              alt="PT Kawan Baik Bali"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
            />
            <div className="text-left">
              <p
                className={`font-extrabold text-sm sm:text-[15px] leading-tight tracking-tight transition-colors ${
                  isTransparent
                    ? "text-white"
                    : dark
                    ? "text-white"
                    : "text-[#0f2236]"
                }`}
              >
                PT Kawan Baik Bali
              </p>
              <p
                className={`text-[10px] font-semibold tracking-[0.18em] uppercase transition-colors ${
                  isTransparent
                    ? "text-[#d4b06a]"
                    : dark
                    ? "text-[#c9a55c]"
                    : "text-[#9a7638]"
                }`}
              >
                Hospitality Supply
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((l) => {
              const active = isActive(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`text-[13px] font-semibold transition-colors relative py-1 ${
                    isTransparent
                      ? active
                        ? "text-white"
                        : "text-white/75 hover:text-white"
                      : dark
                      ? active
                        ? "text-[#d4b06a]"
                        : "text-slate-300 hover:text-white"
                      : active
                      ? "text-[#0f2236]"
                      : "text-slate-600 hover:text-[#0f2236]"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#b58e4c] transition-all duration-200 ${
                      active ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2.5">
            <LanguageSelector dark={dark} transparentHeader={isTransparent} />
            <DarkModeToggle
              dark={dark}
              setDark={setDark}
              transparentHeader={isTransparent}
            />

            <Link
              to="/rfq"
              className={`ml-1 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 ${
                location.pathname === "/rfq"
                  ? "bg-[#b58e4c] text-white"
                  : isTransparent
                  ? "bg-white text-[#0f2236] hover:bg-[#f6f4ef]"
                  : dark
                  ? "bg-[#b58e4c] text-white hover:bg-[#a37d3c]"
                  : "bg-[#0f2236] text-white hover:bg-[#1a3552]"
              }`}
            >
              <FileText size={14} className={isTransparent && location.pathname !== "/rfq" ? "text-[#b58e4c]" : ""} />
              <span>{t("nav.rfq")}</span>
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold leading-none ${
                  totalItems > 0
                    ? "bg-[#b58e4c] text-white"
                    : isTransparent
                    ? "bg-slate-200 text-slate-700"
                    : "bg-white/15 text-white"
                }`}
              >
                {totalItems}
              </span>
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSelector dark={dark} transparentHeader={isTransparent} />

            <Link
              to="/rfq"
              aria-label={t("nav.rfq")}
              className={`relative inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-colors ${
                isTransparent
                  ? "bg-white/10 border-white/20 text-white"
                  : dark
                  ? "bg-white/5 border-white/10 text-white"
                  : "bg-slate-100 border-slate-200 text-[#0f2236]"
              }`}
            >
              <FileText size={14} className="text-[#b58e4c]" />
              <span>{totalItems}</span>
            </Link>

            <DarkModeToggle
              dark={dark}
              setDark={setDark}
              transparentHeader={isTransparent}
            />

            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label="Toggle Menu"
              className={`p-2 rounded-lg transition-colors ${
                isTransparent
                  ? "text-white hover:bg-white/10"
                  : dark
                  ? "text-white hover:bg-white/10"
                  : "text-[#0f2236] hover:bg-slate-100"
              }`}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden border-t overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        } ${
          dark
            ? "bg-[#08111c] border-white/10 text-white"
            : "bg-white border-slate-200 text-[#0f2236]"
        }`}
      >
        <div className="px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((l) => {
            const active = isActive(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`px-3.5 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between transition-colors ${
                  active
                    ? dark
                      ? "bg-[#b58e4c]/15 text-[#d4b06a]"
                      : "bg-slate-100 text-[#0f2236]"
                    : dark
                    ? "text-slate-300 hover:bg-white/5"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>{l.label}</span>
                {active && <span className="w-1.5 h-1.5 rounded-full bg-[#b58e4c]" />}
              </Link>
            );
          })}

          <div
            className={`my-2 border-t ${
              dark ? "border-white/10" : "border-slate-100"
            }`}
          />

          <Link
            to="/rfq"
            className="w-full py-3 px-4 rounded-lg bg-[#0f2236] dark:bg-[#b58e4c] text-white font-bold text-xs tracking-wide flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <FileText size={15} className="text-[#d4b06a] dark:text-white" />
              {t("nav.rfq")}
            </span>
            <span className="px-2 py-0.5 rounded bg-white/15 text-[11px]">
              {totalItems} item
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
