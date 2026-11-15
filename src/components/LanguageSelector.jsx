import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Globe, ChevronDown, Check, FileText, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useRFQ } from "../context/RFQContext";

export function LanguageSelector({ dark, transparentHeader = false }) {
  const { lang, setLanguage, supportedLanguages, currentLangMeta } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Select Language"
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 ${
          transparentHeader
            ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
            : dark
            ? "bg-white/5 border-white/10 text-slate-200 hover:bg-white/10"
            : "bg-slate-100/80 border-slate-200/80 text-slate-800 hover:bg-slate-200/70"
        }`}
      >
        <Globe size={13} className="text-[#b58e4c]" />
        <span className="uppercase tracking-wider font-bold text-[11px]">
          {currentLangMeta.short}
        </span>
        <ChevronDown
          size={12}
          className={`opacity-70 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className={`absolute right-0 mt-2 w-52 rounded-xl shadow-2xl border py-1.5 z-50 backdrop-blur-xl transition-all duration-200 ${
            dark
              ? "bg-[#0e1b2b]/95 border-white/10 text-white shadow-black/70"
              : "bg-white/98 border-slate-200 text-slate-800 shadow-slate-900/10"
          }`}
        >
          <div
            className={`px-3.5 py-1.5 border-b text-[10px] font-bold uppercase tracking-widest ${
              dark ? "border-white/10 text-slate-400" : "border-slate-100 text-slate-400"
            }`}
          >
            Select Language
          </div>
          {supportedLanguages.map((item) => {
            const active = lang === item.code;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => {
                  setLanguage(item.code);
                  setOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
                  active
                    ? dark
                      ? "bg-[#b58e4c]/15 text-[#d4b06a] font-semibold"
                      : "bg-[#b58e4c]/10 text-[#0f2236] font-semibold"
                    : dark
                    ? "hover:bg-white/5 text-slate-300"
                    : "hover:bg-slate-50 text-slate-700"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className={`w-6 text-center py-0.5 rounded text-[10px] font-bold tracking-wider ${
                      active
                        ? "bg-[#b58e4c] text-white"
                        : dark
                        ? "bg-white/10 text-slate-300"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.short}
                  </span>
                  <span>{item.label}</span>
                </span>
                {active && <Check size={13} className="text-[#b58e4c]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function RFQToast({ toast: propToast, onDismiss, dark }) {
  const { t } = useLanguage();
  const { toast: ctxToast, setToast } = useRFQ();
  const toast = propToast !== undefined ? propToast : ctxToast;
  const handleDismiss = onDismiss || (() => setToast(null));
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 max-w-sm w-[calc(100vw-2rem)] sm:w-auto">
      <div
        className={`flex items-center justify-between gap-4 px-4 py-3.5 rounded-xl border shadow-2xl backdrop-blur-md ${
          dark
            ? "bg-[#0e1b2b]/95 border-[#b58e4c]/40 text-white shadow-black/70"
            : "bg-[#0f2236] border-[#b58e4c]/40 text-white shadow-slate-900/25"
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#b58e4c]/20 border border-[#b58e4c]/40 text-[#d4b06a] flex items-center justify-center shrink-0">
            <FileText size={15} />
          </div>
          <div className="text-xs min-w-0">
            <p className="font-semibold text-white truncate">{toast}</p>
            <p className="text-[11px] text-slate-300">{t("rfq.addedToast")}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/rfq"
            onClick={handleDismiss}
            className="px-3 py-1.5 rounded-lg bg-[#b58e4c] hover:bg-[#a07b3d] text-white text-[11px] font-semibold transition-colors whitespace-nowrap"
          >
            {t("rfq.viewCart")}
          </Link>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Close notification"
            className="p-1 text-slate-400 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
