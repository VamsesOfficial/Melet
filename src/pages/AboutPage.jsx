import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  ArrowRight,
  FileText,
  MapPin,
  Clock,
  Phone,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Music,
} from "lucide-react";
import { SEOHead, Section, SectionLabel, ProductImage } from "../components/ui";
import { GALLERY_PHOTOS } from "../data";
import { useLanguage } from "../context/LanguageContext";

const PLAYLIST = [
  { id: "n61ULEU7CO0", title: "Bali Hospitality Morning", artist: "PT Kawan Baik Bali Studio" },
  { id: "jfKfPfyJRdk", title: "Tropical Resort Ambience", artist: "Acoustic Instrumental" },
  { id: "rUxyKA_-grg", title: "Kerobokan Workshop Sessions", artist: "Warm Lounge" },
];

function VibePlayer({ dark }) {
  const { t } = useLanguage();
  const [playing, setPlaying] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const iframeRef = useRef(null);

  const current = PLAYLIST[trackIdx];

  return (
    <div
      className={`rounded-2xl p-6 sm:p-8 border transition-colors ${
        dark
          ? "bg-[#0e1b2b] border-white/10"
          : "bg-white border-slate-200/80 shadow-sm"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setPlaying(!playing)}
            aria-label={playing ? "Pause" : "Play"}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
              playing
                ? "bg-[#b58e4c] text-white"
                : dark
                ? "bg-white/10 text-white hover:bg-white/15"
                : "bg-[#0f2236] text-white hover:bg-[#16304b]"
            }`}
          >
            {playing ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          </button>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b58e4c] block">
              {t("about.vibeEyebrow")}
            </span>
            <h3
              className={`font-extrabold text-sm sm:text-base ${
                dark ? "text-white" : "text-[#0f2236]"
              }`}
            >
              {t("about.vibeTitle")}
            </h3>
            <p
              className={`text-xs ${
                dark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {current.title} — {current.artist}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setTrackIdx((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
              setPlaying(true);
            }}
            aria-label="Previous track"
            className={`p-2.5 rounded-lg border transition-colors ${
              dark
                ? "border-white/10 text-slate-300 hover:bg-white/5"
                : "border-slate-200 text-slate-600 hover:bg-slate-100"
            }`}
          >
            <SkipBack size={15} />
          </button>
          <button
            type="button"
            onClick={() => {
              setTrackIdx((prev) => (prev + 1) % PLAYLIST.length);
              setPlaying(true);
            }}
            aria-label="Next track"
            className={`p-2.5 rounded-lg border transition-colors ${
              dark
                ? "border-white/10 text-slate-300 hover:bg-white/5"
                : "border-slate-200 text-slate-600 hover:bg-slate-100"
            }`}
          >
            <SkipForward size={15} />
          </button>
          <span
            className={`px-3 py-2 rounded-lg border text-xs font-semibold inline-flex items-center gap-1.5 ${
              dark
                ? "border-white/10 text-slate-300"
                : "border-slate-200 text-slate-600"
            }`}
          >
            <Music size={13} className="text-[#b58e4c]" />
            <span>
              0{trackIdx + 1} / 0{PLAYLIST.length}
            </span>
          </span>
        </div>
      </div>

      {playing && (
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${current.id}?autoplay=1&loop=1`}
          allow="autoplay"
          className="hidden"
          title="Background Audio"
        />
      )}
    </div>
  );
}

export default function AboutPage({ dark }) {
  const { t } = useLanguage();
  const pillars = t("about.pillars") || [];
  const segments = t("about.segments") || [];

  const bg = dark ? "bg-[#08111c]" : "bg-[#faf8f5]";
  const text = dark ? "text-white" : "text-[#0f2236]";
  const muted = dark ? "text-slate-400" : "text-slate-600";
  const cardBg = dark
    ? "bg-[#0e1b2b] border-white/10"
    : "bg-white border-slate-200/80";

  return (
    <>
      <SEOHead
        title={`${t("about.eyebrow")} — PT Kawan Baik Bali | Hotel Amenities Supplier Bali`}
        description={t("about.subtitle")}
        canonical="https://www.kawanbaikbali.com/about"
      />

      <main className={`min-h-screen ${bg} transition-colors`}>
        {/* Dark Architectural Header */}
        <section className="relative pt-28 sm:pt-36 pb-16 bg-[#08111c] border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
              <Link to="/" className="hover:text-white transition-colors">
                {t("nav.home")}
              </Link>
              <ChevronRight size={12} />
              <span className="text-[#d4b06a] font-semibold">
                {t("nav.about")}
              </span>
            </nav>

            <div className="max-w-3xl">
              <SectionLabel text={t("about.eyebrow")} />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
                {t("about.title")}
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {t("about.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* 01 / Company Background & Story */}
        <Section className={`py-14 sm:py-20 ${bg}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <SectionLabel text={t("about.storyEyebrow")} />
              <h2
                className={`text-2xl sm:text-3xl font-extrabold ${text} tracking-tight`}
              >
                {t("about.storyTitle")}
              </h2>
              <p className={`${muted} text-sm sm:text-base leading-relaxed`}>
                {t("about.storyP1")}
              </p>
              <p className={`${muted} text-sm sm:text-base leading-relaxed`}>
                {t("about.storyP2")}
              </p>
              <p className={`${muted} text-sm sm:text-base leading-relaxed`}>
                {t("about.storyP3")}
              </p>

              {/* Headquarters Summary Box */}
              <div
                className={`mt-4 p-5 rounded-xl border grid grid-cols-1 sm:grid-cols-2 gap-4 ${cardBg}`}
              >
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-[#b58e4c] shrink-0 mt-0.5" />
                  <div>
                    <p className={`text-xs font-bold ${text}`}>
                      PT Kawan Baik Bali
                    </p>
                    <p className={`text-xs ${muted} mt-0.5`}>
                      {t("common.address")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock size={16} className="text-[#b58e4c] shrink-0 mt-0.5" />
                  <div>
                    <p className={`text-xs font-bold ${text}`}>
                      {t("contact.officeTitle")}
                    </p>
                    <p className={`text-xs ${muted} mt-0.5`}>
                      {t("common.officeHours")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {GALLERY_PHOTOS.map((src, idx) => (
                  <div
                    key={src}
                    className={`rounded-xl overflow-hidden border h-48 sm:h-56 ${
                      dark
                        ? "bg-[#050b12] border-white/10"
                        : "bg-[#f4f1ea] border-slate-200/80"
                    } ${idx % 2 === 1 ? "sm:translate-y-4" : ""}`}
                  >
                    <ProductImage
                      src={src}
                      alt={`PT Kawan Baik Bali Hospitality Product ${idx + 1}`}
                      dark={dark}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </Section>

        {/* 02 / 6 Operational Pillars */}
        <Section
          className={`py-14 sm:py-20 ${
            dark
              ? "bg-[#050b12] border-y border-white/10"
              : "bg-[#f3efe8] border-y border-slate-200/70"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <SectionLabel text={t("about.pillarsEyebrow")} />
            <h2
              className={`text-2xl sm:text-3xl font-extrabold ${text} tracking-tight`}
            >
              {t("about.pillarsTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.isArray(pillars) &&
              pillars.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-xl border transition-all ${cardBg} hover:border-[#b58e4c]/50`}
                >
                  <span className="inline-block font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#b58e4c]/15 text-[#b58e4c] mb-4">
                    {item.code || `0${idx + 1}`}
                  </span>
                  <h3 className={`font-bold text-base sm:text-lg ${text} mb-2`}>
                    {item.title}
                  </h3>
                  <p className={`text-xs sm:text-sm ${muted} leading-relaxed`}>
                    {item.desc}
                  </p>
                </div>
              ))}
          </div>
          </div>
        </Section>

        {/* 03 / Property Segments We Serve */}
        <Section className={`py-14 sm:py-20 ${bg}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
            <div>
              <SectionLabel text={t("about.segmentsEyebrow")} />
              <h2
                className={`text-2xl sm:text-3xl font-extrabold ${text} tracking-tight`}
              >
                {t("about.segmentsTitle")}
              </h2>
            </div>
            <Link
              to="/rfq"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#b58e4c] hover:bg-[#c89f58] text-white text-xs font-bold transition-colors self-start lg:self-auto"
            >
              <FileText size={14} />
              <span>{t("hero.requestQuote")}</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {Array.isArray(segments) &&
              segments.map((seg, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-xl border ${cardBg}`}
                >
                  <span className="font-mono text-xs font-bold text-[#b58e4c]">
                    0{idx + 1}
                  </span>
                  <h3 className={`font-bold text-base ${text} mt-1.5 mb-2`}>
                    {seg.title}
                  </h3>
                  <p className={`text-xs ${muted} leading-relaxed`}>
                    {seg.desc}
                  </p>
                </div>
              ))}
          </div>

          {/* 04 / Studio Vibe Player */}
          <VibePlayer dark={dark} />
          </div>
        </Section>
      </main>
    </>
  );
}
