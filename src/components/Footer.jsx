import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ChevronRight, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

const QUICK_LINKS = [
  { label: "Home",       to: "/" },
  { label: "About Us",   to: "/about" },
  { label: "Products",   to: "/products" },
  { label: "Clients",    to: "/clients" },
  { label: "Contact",    to: "/contact" },
];

const PRODUCT_LINKS = [
  { label: "Personal Care Essentials", to: "/products/personal-care" },
  { label: "Comfort Items",            to: "/products/comfort-items" },
  { label: "Convenience Goods",        to: "/products/convenience-goods" },
  { label: "Eco Material",             to: "/products/eco-material" },
  { label: "Hotel Linen & Bedding",    to: "/products/hotel-linen-bedding" },
];

const SOCIAL = [
  { icon: <Instagram size={16} />, href: "https://www.instagram.com/kawanbaikbali/", label: "Instagram" },
  { icon: <Facebook size={16} />,  href: "https://www.facebook.com/share/1Hix42FsyX/",  label: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0d2137] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <img src="/logo.png" alt="PT Kawan Baik Bali Logo" className="w-9 h-9 sm:w-10 sm:h-10 object-contain" />
              <div>
                <p className="font-black text-sm sm:text-base leading-none">Kawan Baik Bali</p>
                <p className="text-amber-400 text-[9px] sm:text-[10px] tracking-widest uppercase font-medium">PT</p>
              </div>
            </div>
            <p className="text-white/40 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
              Bali's trusted hotel amenities supplier — delivering quality, luxury, and sustainability to properties across Indonesia.
            </p>
            <div className="flex gap-2.5 sm:gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-amber-500/20 hover:text-amber-400 hover:border-amber-500/30 transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-white/80 mb-4 sm:mb-5 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/40 text-sm hover:text-amber-400 transition-colors flex items-center gap-1.5 group">
                    <ChevronRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-white/80 mb-4 sm:mb-5 uppercase tracking-wider">Our Products</h4>
            <ul className="space-y-2 sm:space-y-3">
              {PRODUCT_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/40 text-sm hover:text-amber-400 transition-colors flex items-center gap-1.5 group">
                    <ChevronRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h4 className="font-bold text-xs sm:text-sm text-white/80 mb-4 sm:mb-5 uppercase tracking-wider">Contact Info</h4>
            <div className="space-y-3 sm:space-y-4">
              {[
                { icon: <Phone size={13} />,  text: "+62 8810-3736-6555",         href: "tel:+62881037366555" },
                { icon: <Mail size={13} />,   text: "kawanbaik.bali@gmail.com",   href: "mailto:kawanbaik.bali@gmail.com" },
                { icon: <MapPin size={13} />, text: "Kuta Utara, Badung, Bali 80361", href: "#" },
              ].map((c) => (
                <a key={c.text} href={c.href} className="flex items-start gap-2.5 sm:gap-3 text-white/40 text-sm hover:text-white/70 transition-colors group">
                  <span className="mt-0.5 text-amber-400/60 shrink-0">{c.icon}</span>
                  {c.text}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-white/30 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} PT Kawan Baik Bali. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6">
            <Link to="/privacy-policy" className="text-white/30 text-xs hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-white/30 text-xs hover:text-white/60 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
